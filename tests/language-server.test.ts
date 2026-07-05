// Spawns the built @yummacss/language-server binary and drives it over
// real stdio JSON-RPC framing - run `pnpm --filter @yummacss/language-server build`
// first if dist/cli.mjs is missing or stale.
import { type ChildProcessWithoutNullStreams, spawn } from "node:child_process";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const serverPath = join(
	__dirname,
	"..",
	"packages",
	"language-server",
	"dist",
	"cli.mjs",
);
const fixtureDir = join(__dirname, "fixtures", "plugin-app");

class LspClient {
	private buffer = Buffer.alloc(0);
	private nextId = 1;
	private pending = new Map<number, (result: unknown) => void>();
	private notifications: { method: string; params: unknown }[] = [];

	constructor(private process: ChildProcessWithoutNullStreams) {
		this.process.stdout.on("data", (chunk: Buffer) => {
			this.buffer = Buffer.concat([this.buffer, chunk]);
			this.drain();
		});
	}

	private drain() {
		while (true) {
			const text = this.buffer.toString("utf-8");
			const headerEnd = text.indexOf("\r\n\r\n");
			if (headerEnd === -1) return;

			const header = text.slice(0, headerEnd);
			const lengthMatch = header.match(/Content-Length: (\d+)/i);
			if (!lengthMatch) return;
			const length = Number(lengthMatch[1]);

			const bodyStart = headerEnd + 4;
			const totalBytes = Buffer.byteLength(text.slice(0, bodyStart)) + length;
			if (this.buffer.length < totalBytes) return;

			const body = this.buffer
				.slice(Buffer.byteLength(text.slice(0, bodyStart)), totalBytes)
				.toString("utf-8");
			this.buffer = this.buffer.slice(totalBytes);

			const message = JSON.parse(body);
			if (message.id !== undefined && this.pending.has(message.id)) {
				this.pending.get(message.id)?.(message.result);
				this.pending.delete(message.id);
			} else if (message.method) {
				this.notifications.push({
					method: message.method,
					params: message.params,
				});
			}
		}
	}

	private send(message: Record<string, unknown>) {
		const body = JSON.stringify(message);
		const header = `Content-Length: ${Buffer.byteLength(body, "utf-8")}\r\n\r\n`;
		this.process.stdin.write(header + body);
	}

	request(method: string, params: unknown): Promise<unknown> {
		const id = this.nextId++;
		return new Promise((resolve) => {
			this.pending.set(id, resolve);
			this.send({ jsonrpc: "2.0", id, method, params });
		});
	}

	notify(method: string, params: unknown) {
		this.send({ jsonrpc: "2.0", method, params });
	}

	async waitForNotification(
		method: string,
		predicate: (params: any) => boolean = () => true,
		timeoutMs = 5000,
	): Promise<unknown> {
		const deadline = Date.now() + timeoutMs;
		while (Date.now() < deadline) {
			const found = this.notifications.find(
				(n) => n.method === method && predicate(n.params),
			);
			if (found) return found.params;
			await new Promise((r) => setTimeout(r, 20));
		}
		throw new Error(`Timed out waiting for notification "${method}"`);
	}
}

describe("@yummacss/language-server", () => {
	let proc: ChildProcessWithoutNullStreams;
	let client: LspClient;

	beforeAll(async () => {
		proc = spawn(process.execPath, [serverPath, "--stdio"], {
			stdio: ["pipe", "pipe", "pipe"],
		});
		client = new LspClient(proc);

		await client.request("initialize", {
			processId: null,
			rootUri: pathToFileURL(fixtureDir).href,
			capabilities: {},
			workspaceFolders: [
				{ uri: pathToFileURL(fixtureDir).href, name: "fixture" },
			],
		});
		client.notify("initialized", {});
	}, 15000);

	afterAll(() => {
		proc.kill();
	});

	it("should complete the initialize handshake", () => {
		// beforeAll already awaited the response - reaching this point
		// means the server replied with a well-formed InitializeResult.
		expect(proc.exitCode).toBeNull();
	});

	it("should return hover info for a known class", async () => {
		const uri = "file:///hover-test.tsx";
		client.notify("textDocument/didOpen", {
			textDocument: {
				uri,
				languageId: "typescriptreact",
				version: 1,
				text: '<div className="d-f">',
			},
		});

		const hover = (await client.request("textDocument/hover", {
			textDocument: { uri },
			position: { line: 0, character: 18 },
		})) as { contents: { value: string } } | null;

		expect(hover?.contents.value).toContain("display: flex;");
	});

	it("should publish an unknown-class diagnostic with a suggestion", async () => {
		const uri = "file:///diagnostics-test.tsx";
		client.notify("textDocument/didOpen", {
			textDocument: {
				uri,
				languageId: "typescriptreact",
				version: 1,
				text: '<div className="d-f gap-4">',
			},
		});

		const params = (await client.waitForNotification(
			"textDocument/publishDiagnostics",
			(p) => p.uri === uri,
		)) as { uri: string; diagnostics: { message: string; code: string }[] };

		expect(params.uri).toBe(uri);
		const unknown = params.diagnostics.find((d) => d.code === "unknown_class");
		expect(unknown?.message).toContain('"gap-4"');
		expect(unknown?.message).toContain("g-4");
	});

	it("should sort classes via textDocument/formatting", async () => {
		const uri = "file:///format-test.tsx";
		client.notify("textDocument/didOpen", {
			textDocument: {
				uri,
				languageId: "typescriptreact",
				version: 1,
				text: '<div className="c-white d-f">',
			},
		});

		const edits = (await client.request("textDocument/formatting", {
			textDocument: { uri },
			options: { tabSize: 2, insertSpaces: true },
		})) as { newText: string }[];

		expect(edits).toHaveLength(1);
		expect(edits[0]?.newText).toContain("d-f c-white");
	});
});

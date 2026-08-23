import { mkdtempSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { isAbsolute, join } from "node:path";
import { loadConfig, scan } from "@yummacss/nitro";
import { afterAll, describe, expect, it } from "vitest";

const fixtureDir = join(__dirname, "fixtures", "plugin-app");
const tempDirs: string[] = [];

function makeTempDir(): string {
	const dir = mkdtempSync(join(tmpdir(), "yumma-loader-"));
	tempDirs.push(dir);
	return dir;
}

afterAll(() => {
	for (const dir of tempDirs) {
		rmSync(dir, { recursive: true, force: true });
	}
});

describe("loadConfig", () => {
	it("should parse an inline config without touching the filesystem", async () => {
		const { config, path } = await loadConfig({
			config: { source: ["src/**/*.tsx"], prefix: "ui-" },
		});

		expect(path).toBeNull();
		expect(config.source).toEqual(["src/**/*.tsx"]);
		expect(config.prefix).toBe("ui-");
		expect(config.normalize).toBe(true);
	});

	it("should load yumma.config.mjs from cwd", async () => {
		const { config, path } = await loadConfig({ cwd: fixtureDir });

		expect(path).toBe(join(fixtureDir, "yumma.config.mjs"));
		expect(config.source).toEqual(["src/**/*.tsx"]);
		expect(config.safelist).toEqual(["c:white"]);
	});

	it("should load a config from an explicit relative path", async () => {
		const { config } = await loadConfig({
			cwd: join(fixtureDir, "src"),
			path: "../yumma.config.mjs",
		});

		expect(config.source).toEqual(["src/**/*.tsx"]);
	});

	it("should throw when the config file is missing", async () => {
		await expect(loadConfig({ cwd: makeTempDir() })).rejects.toThrow();
	});

	it("should throw when the config file is invalid", async () => {
		const dir = makeTempDir();
		writeFileSync(
			join(dir, "yumma.config.mjs"),
			"export default { source: 'not-an-array' };",
		);

		await expect(loadConfig({ cwd: dir })).rejects.toThrow();
	});

	it("should pick up config edits in long-running processes", async () => {
		const dir = makeTempDir();
		const configPath = join(dir, "yumma.config.mjs");

		writeFileSync(configPath, "export default { prefix: 'a-' };");
		const first = await loadConfig({ cwd: dir });
		expect(first.config.prefix).toBe("a-");

		writeFileSync(configPath, "export default { prefix: 'b-' };");
		// Force a different mtime in case both writes land in the same tick.
		const later = new Date(Date.now() + 1000);
		utimesSync(configPath, later, later);

		const second = await loadConfig({ cwd: dir });
		expect(second.config.prefix).toBe("b-");
	});
});

describe("scan", () => {
	it("should return used classes and absolute file paths", async () => {
		const { classes, files } = await scan(["src/**/*.tsx"], {
			cwd: fixtureDir,
		});

		expect(classes.has("d:f")).toBe(true);
		expect(classes.has("ai:c")).toBe(true);
		expect(classes.has("bg:red-5")).toBe(true);
		expect(classes.has("p:4")).toBe(true);
		expect(classes.has("m:2")).toBe(true);

		expect(files).toHaveLength(2);
		for (const file of files) {
			expect(isAbsolute(file)).toBe(true);
		}
		expect(files.some((file) => file.endsWith("App.tsx"))).toBe(true);
		expect(files.some((file) => file.endsWith("Button.tsx"))).toBe(true);
	});
});

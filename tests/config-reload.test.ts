import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadConfig } from "@yummacss/nitro";
import { afterAll, describe, expect, it } from "vitest";

const dir = mkdtempSync(join(tmpdir(), "yumma-reload-"));
const configPath = join(dir, "yumma.config.mjs");

const write = (colors: Record<string, string>) =>
	writeFileSync(
		configPath,
		`export default { source: ["./src/**/*.tsx"], theme: { colors: ${JSON.stringify(colors)} } };`,
	);

afterAll(() => rmSync(dir, { recursive: true, force: true }));

describe("config reload", () => {
	it("picks up edits without a fresh process", async () => {
		write({ brand: "#111111" });
		const first = await loadConfig({ cwd: dir });
		expect(first.config.theme?.colors?.brand).toBe("#111111");

		write({ brand: "#222222" });
		const second = await loadConfig({ cwd: dir });
		expect(second.config.theme?.colors?.brand).toBe("#222222");
	});

	it("survives two edits inside the same millisecond", async () => {
		// The cache key is the file's mtime. Two writes close enough together
		// to share an mtime would collide and serve the stale module.
		write({ brand: "#333333" });
		await loadConfig({ cwd: dir });
		write({ brand: "#444444" });
		const after = await loadConfig({ cwd: dir });
		expect(after.config.theme?.colors?.brand).toBe("#444444");
	});

	it("reports the config path so callers can watch it", async () => {
		write({ brand: "#555555" });
		const { path } = await loadConfig({ cwd: dir });
		expect(path).toBe(configPath);
	});
});

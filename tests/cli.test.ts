import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { configSource } from "../packages/cli/src/commands/init";
import { base } from "../packages/cli/src/commands/watch";

const dirs: string[] = [];
afterEach(() => {
	for (const dir of dirs.splice(0))
		rmSync(dir, { recursive: true, force: true });
});

function project(...folders: string[]): string {
	const dir = mkdtempSync(join(tmpdir(), "yummacss-"));
	dirs.push(dir);
	for (const folder of folders) mkdirSync(join(dir, folder));
	return dir;
}

describe("watch base", () => {
	it("watches the folder a glob starts in", () => {
		expect(base("./src/**/*.tsx")).toBe("src");
		expect(base("app/components/*.{ts,tsx}")).toBe("app/components");
		expect(base("*.html")).toBe(".");
	});
});

describe("init config", () => {
	it("points at src, and writes the CSS beside it", () => {
		const config = configSource(project("src"));
		expect(config).toContain(`source: ["./src/**/*.{js,jsx,ts,tsx,mdx,html}"]`);
		expect(config).toContain(`output: "./src/styles.css"`);
	});

	it("covers app and components when there is no src", () => {
		expect(configSource(project("app", "components"))).toContain(
			`source: ["./app/**/*.{js,jsx,ts,tsx,mdx,html}", "./components/**/*.{js,jsx,ts,tsx,mdx,html}"]`,
		);
	});
});

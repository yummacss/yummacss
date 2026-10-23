import { readFileSync } from "node:fs";
import { describe, expect, it } from "vite-plus/test";
import { extractConfigKeys, extractReference } from "@/utils/search-reference";

const page = (path: string) => readFileSync(`src/content/${path}.mdx`, "utf8");

describe("search reference", () => {
	it("finds the CLI's flags under the section that documents them", () => {
		expect(
			extractReference(page("docs/configuration")).find(
				(e) => e.title === "--allow",
			)?.description,
		).toMatch(/· yummacss lint$/);
	});

	it("finds the lint flags and the bundler plugins' options", () => {
		expect(
			extractReference(page("docs/configuration")).map((e) => e.title),
		).toContain("--allow");
		expect(
			extractReference(page("docs/installation")).map((e) => e.title),
		).toEqual(expect.arrayContaining(["config", "configPath", "cwd"]));
	});

	it("names every yumma.config.mjs key under Setting up a project", () => {
		const keys = extractConfigKeys(page("docs/configuration")).map(
			(entry) => entry.title,
		);
		expect(keys).toEqual(
			expect.arrayContaining([
				"source",
				"output",
				"safelist",
				"theme.states",
				"theme.keyframes",
			]),
		);
		expect(keys).not.toContain("build");
	});

	it("skips tables that list classes rather than things to type", () => {
		expect(extractReference(page("docs/naming-convention"))).toEqual([]);
	});
});

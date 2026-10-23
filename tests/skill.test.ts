import { readFileSync } from "node:fs";
import { join } from "node:path";
import { validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vite-plus/test";

const skill = readFileSync(
	join(import.meta.dirname, "../skills/yummacss/SKILL.md"),
	"utf8",
);

// the classes the skill shows, as `code` with a colon and no space or slash prefix
const shown = [...skill.matchAll(/`([^`\s]+)`/g)]
	.map(([, code = ""]) => code)
	.filter((code) => /^[@a-z][^:]*::?[^:]/.test(code) && !code.includes("//"));

// the skill shows these as what not to write
const wrong = ["w:37px"];

describe("agent skill", () => {
	it("names itself after its folder and says when to use it", () => {
		expect(skill).toMatch(/^---\nname: yummacss\ndescription: .+\n/);
	});

	it("shows only classes Yumma CSS generates", () => {
		const classes = shown.filter((code) => !wrong.includes(code));
		expect(classes.length).toBeGreaterThan(10);
		expect(validateClasses(classes, {} as never).invalid).toEqual([]);
	});

	it("shows as wrong only what is", () => {
		expect(validateClasses(wrong, {} as never).invalid).toEqual(wrong);
	});
});

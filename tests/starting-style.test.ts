import { generator, validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

describe("@starting-style", () => {
	const config = { buildOptions: { reset: false } } as never;

	it("wraps the rule in a starting-style block", () => {
		const css = generator(new Set(["@st:o:0"]), config);

		expect(css).toMatch(
			/@starting-style \{\n {2}\.\\@st\\:o\\:0 \{\n {4}opacity: 0;/,
		);
	});

	it("stacks with a pseudo class", () => {
		const css = generator(new Set(["@st:h:o:0"]), config);

		expect(css).toContain("@starting-style");
		expect(css).toContain(":hover");
	});

	it("is canon", () => {
		expect(validateClasses(["@st:o:0"], {} as never).invalid).toEqual([]);
	});
});

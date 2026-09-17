import { coreUtils } from "@yummacss/core";
import { generator, validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

describe("prefers-reduced-motion", () => {
	const config = { buildOptions: { reset: false } } as never;

	it("wraps the rule in the reduce query", () => {
		const css = generator(new Set(["@prm:tp:none"]), config);

		expect(css).toContain("@media (prefers-reduced-motion: reduce)");
		expect(css).toContain(".\\@prm\\:tp\\:none");
		expect(css).toContain("transition-property: none");
	});

	it("stacks with a pseudo class, the way the width queries do", () => {
		const css = generator(new Set(["@prm:h:o:0"]), config);

		expect(css).toContain("@media (prefers-reduced-motion: reduce)");
		expect(css).toContain(":hover");
	});

	it("leaves an unprefixed class alone", () => {
		const css = generator(new Set(["tp:none"]), config);

		expect(css).not.toContain("prefers-reduced-motion");
	});

	it("is the only non-width media query besides pointer", () => {
		const { mediaQueries } = coreUtils().display.variants ?? {};
		const prefixes = (mediaQueries ?? []).map((q) => q.prefix);

		expect(prefixes).toContain("prm");
		expect(prefixes).toContain("pc");
	});
});

describe("canon", () => {
	it("accepts the prefix and still refuses an unknown one", () => {
		expect(validateClasses(["@prm:tp:none"], {} as never).invalid).toEqual([]);
		expect(validateClasses(["@zz:tp:none"], {} as never).invalid).toEqual([
			"@zz:tp:none",
		]);
	});

	it("refuses a bracket in a class name", () => {
		expect(validateClasses(["[data-open]:o-0"], {} as never).invalid).toEqual([
			"[data-open]:o-0",
		]);
	});
});

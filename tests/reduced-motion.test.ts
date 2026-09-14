import { coreUtils } from "@yummacss/core";
import { generator } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

/**
 * `@rm:` is the one media variant that is not a width. It exists so an
 * animation can be switched off in utilities rather than in a stylesheet
 * beside them.
 */
describe("prefers-reduced-motion", () => {
	const config = { buildOptions: { reset: false } } as never;

	it("wraps the rule in the reduce query", () => {
		const css = generator(new Set(["@rm:tp-none"]), config);

		expect(css).toContain("@media (prefers-reduced-motion: reduce)");
		expect(css).toContain(".\\@rm\\:tp-none");
		expect(css).toContain("transition-property: none");
	});

	it("stacks with a pseudo class, the way the width queries do", () => {
		const css = generator(new Set(["@rm:h:o-0"]), config);

		expect(css).toContain("@media (prefers-reduced-motion: reduce)");
		expect(css).toContain(":hover");
	});

	it("leaves an unprefixed class alone", () => {
		const css = generator(new Set(["tp-none"]), config);

		expect(css).not.toContain("prefers-reduced-motion");
	});

	it("is the only non-width media query besides pointer", () => {
		const { mediaQueries } = coreUtils().display.variants ?? {};
		const prefixes = (mediaQueries ?? []).map((q) => q.prefix);

		expect(prefixes).toContain("rm");
		expect(prefixes).toContain("pc");
	});
});

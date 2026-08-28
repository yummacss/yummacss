import { acceptsNegative, coreUtils } from "@yummacss/core";
import { generator, validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

const config = { buildOptions: { reset: false } };

/** The reset preamble is always emitted, so length alone proves nothing. */
const baseline = generator(new Set<string>(), config as never).length;

function css(className: string): string | null {
	const out = generator(new Set([className]), config as never);
	return out.length > baseline ? out.slice(baseline).trim() : null;
}

describe("Negative values", () => {
	const utils = coreUtils();

	/** A numeric step the utility's own scale actually has. */
	const numericKey = (values: Record<string, string>) =>
		Object.keys(values).find((k) => /^\d+$/.test(k) && k !== "0");

	// Asserted as "exists and differs from the positive form" rather than
	// "contains a leading minus". Two families make the naive version wrong:
	// `letter-spacing`'s scale is already negative, so negating `ls-1`
	// (`-.05em`) yields `.05em`, and a transform puts its sign inside the
	// parens - `transform: skew(-1deg)`.
	it("generates a distinct rule for every property that accepts a negative", () => {
		const broken: string[] = [];
		for (const [, u] of Object.entries(utils)) {
			if (!acceptsNegative(u.properties)) continue;
			const key = numericKey(u.values as Record<string, string>);
			if (!key) continue;
			const negative = css(`${u.prefix}--${key}`);
			const positive = css(`${u.prefix}-${key}`);
			if (!negative || negative === positive) {
				broken.push(`${u.prefix}--${key}`);
			}
		}
		expect(broken).toEqual([]);
	});

	it("emits nothing where the property rejects a negative", () => {
		const leaked: string[] = [];
		for (const [, u] of Object.entries(utils)) {
			if (acceptsNegative(u.properties)) continue;
			const key = numericKey(u.values as Record<string, string>);
			if (!key) continue;
			const className = `${u.prefix}--${key}`;
			const rule = css(className);
			if (rule) leaked.push(`${className} -> ${rule.replace(/\s+/g, " ")}`);
		}
		expect(leaked).toEqual([]);
	});

	// The cases that motivated the fix, named so a regression says what broke.
	it.each([
		["w--1", "width"],
		["h--1", "height"],
		["p--1", "padding"],
		["br--9999", "border-radius"],
		["bw--1", "border-width"],
		["lh--1", "line-height"],
		["fw--100", "font-weight"],
		["tdu--50", "transition-duration"],
		["fg--1", "flex-grow"],
		["g--1", "gap"],
		["ow--1", "outline-width"],
		["sp--1", "scroll-padding"],
	])("%s is not a class (%s rejects negatives)", (className) => {
		expect(css(className)).toBeNull();
	});

	it.each([
		["m--1", "margin: -.25rem"],
		["mt--1", "margin-top: -.25rem"],
		["t--1", "top: -.25rem"],
		["zi--10", "z-index: -10"],
		["or--1", "order: -1"],
		["sm--1", "scroll-margin: -.25rem"],
		["oo--1", "outline-offset: -1px"],
		["ti--1", "text-indent: -1px"],
	])("%s still generates %s", (className, declaration) => {
		expect(css(className)).toContain(declaration);
	});

	// Legal and easy to "fix" by mistake.
	it("keeps negative grid line numbers, which count back from the end", () => {
		expect(css("gcs--1")).toContain("grid-column-start: -1");
		expect(css("gre--1")).toContain("grid-row-end: -1");
	});

	it("keeps negative scale, which mirrors", () => {
		expect(css("s--10")).toContain("scale: -.1");
	});

	// A leading `-` on something with no number to negate is not a class. It
	// used to be a silent second spelling of the positive one.
	it.each([
		"m--auto",
		"w--auto",
		"bg--red-1",
		"h--dvh",
		"m--100%",
	])("%s is not a silent alias of its positive form", (className) => {
		expect(css(className)).toBeNull();
	});

	it("leaves the positive forms of those alone", () => {
		expect(css("m-auto")).toContain("margin: auto");
		expect(css("bg-red-1")).toContain("background-color:");
	});

	// `validateClasses` resolves through the same `generateCSSRule`, so canon
	// reports these without a second list to keep in step. Asserted rather
	// than assumed, because that shared path is the only thing holding it.
	it("reports illegal negatives as unknown to canon", () => {
		const { valid, invalid } = validateClasses(
			["w--1", "p--1", "br--9999", "m--1", "t--1", "zi--10", "bg--red-1"],
			{} as never,
		);
		expect(invalid.sort()).toEqual(["bg--red-1", "br--9999", "p--1", "w--1"]);
		expect(valid.sort()).toEqual(["m--1", "t--1", "zi--10"]);
	});
});

import { ConfigSchema, generator, validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

const config = {
	buildOptions: { reset: false },
	theme: { states: { closing: "[data-ending-style]", open: "[open]" } },
} as never;

describe("theme.states", () => {
	it("appends the configured selector", () => {
		const css = generator(new Set(["closing:o:0"]), config);

		expect(css).toContain(".closing\\:o\\:0[data-ending-style]");
		expect(css).toContain("opacity: 0");
	});

	it("stacks with a pseudo class and an at-rule", () => {
		const css = generator(new Set(["@md:h:open:bg:red"]), config);

		expect(css).toContain("@media (min-width: 48rem)");
		expect(css).toContain(":hover[open]");
	});

	it("sits under stacked at-rules", () => {
		const css = generator(new Set(["@md:@prm:closing:o:0"]), config);

		expect(css).toMatch(
			/@media \(min-width: 48rem\) \{\n {2}@media \(prefers-reduced-motion: reduce\) \{\n {4}\.[^{]*\[data-ending-style\] \{/,
		);
	});

	it("is canon only when configured", () => {
		expect(validateClasses(["closing:o:0"], config).invalid).toEqual([]);
		expect(validateClasses(["closing:o:0"], {} as never).invalid).toEqual([
			"closing:o:0",
		]);
	});

	it("ships no states of its own", () => {
		expect(
			generator(new Set(["open:o:0"]), {
				buildOptions: { reset: false },
			} as never),
		).not.toContain("[open]");
	});
});

describe("theme.states in the schema", () => {
	const parse = (states: Record<string, string>) =>
		ConfigSchema.safeParse({ theme: { states } }).success;

	it("accepts an attribute or a pseudo class", () => {
		expect(parse({ closing: "[data-ending-style]" })).toBe(true);
		expect(parse({ target: ":target" })).toBe(true);
	});

	it("refuses a name a built-in variant already has", () => {
		expect(parse({ h: "[data-hovering]" })).toBe(false);
	});

	it("refuses a name a utility already has", () => {
		expect(parse({ o: "[data-open]" })).toBe(false);
		expect(parse({ bg: "[data-open]" })).toBe(false);
	});

	it("refuses a selector that would not append", () => {
		expect(parse({ closing: "data-ending-style" })).toBe(false);
		expect(parse({ Closing: "[data-ending-style]" })).toBe(false);
	});
});

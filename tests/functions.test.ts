import { generator, validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";
import { tokenizer } from "../packages/nitro/src/tokenizer";

const config = { buildOptions: { reset: false } } as never;
const css = (className: string) => generator(new Set([className]), config);

describe("css function values", () => {
	it("writes calc() with the spaces CSS needs", () => {
		expect(css("max-h:calc(100dvh-5rem)")).toContain(
			"max-height: calc(100dvh - 5rem);",
		);
	});

	it("passes clamp(), min() and max() through", () => {
		expect(css("max-w:clamp(40rem,80vw,96rem)")).toContain(
			"max-width: clamp(40rem,80vw,96rem);",
		);
		expect(css("w:min(100%,calc(100vw-2rem))")).toContain(
			"width: min(100%,calc(100vw - 2rem));",
		);
	});

	it("leaves a custom property name alone", () => {
		expect(css("h:var(--accordion-panel-height)")).toContain(
			"height: var(--accordion-panel-height);",
		);
		expect(css("w:calc(100%-var(--gutter-size))")).toContain(
			"width: calc(100% - var(--gutter-size));",
		);
	});

	it("keeps a dash inside a keyword and a leading minus", () => {
		expect(css("w:max(min-content,10rem)")).toContain(
			"width: max(min-content,10rem);",
		);
		expect(css("m:calc(-1*var(--gap))")).toContain(
			"margin: calc(-1*var(--gap));",
		);
	});

	it("takes var() on a colour", () => {
		expect(css("c:var(--brand)")).toContain("color: var(--brand);");
	});

	it("escapes the selector", () => {
		expect(css("max-h:calc(100dvh-5rem)")).toContain(
			".max-h\\:calc\\(100dvh-5rem\\)",
		);
	});

	it("refuses math where a length makes no sense, and unknown functions", () => {
		const { invalid } = validateClasses(
			["d:calc(1+1)", "w:attr(width)", "w:calc(100%", "w:37px"],
			config,
		);
		expect(invalid).toEqual([
			"d:calc(1+1)",
			"w:attr(width)",
			"w:calc(100%",
			"w:37px",
		]);
	});

	it("is found in source", () => {
		expect(
			tokenizer(
				'<div className="p:4 max-h:calc(100dvh-5rem) w:min(100%,calc(100vw-2rem))" />',
				"a.tsx",
			),
		).toEqual([
			"p:4",
			"max-h:calc(100dvh-5rem)",
			"w:min(100%,calc(100vw-2rem))",
		]);
	});

	it("still ignores a call in code", () => {
		expect(tokenizer("const x = foo(a:b)", "a.ts")).toEqual([]);
	});
});

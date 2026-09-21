import { generator } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

const config = { buildOptions: { reset: false } };

const css = (className: string) =>
	generator(new Set([className]), config as never);

describe("tp:c", () => {
	it("leaves outline-color alone", () => {
		// the ring's width and style are not transitioned, so animating only its
		// colour makes it appear in currentColor and fade to the real one
		expect(css("tp:c")).not.toContain("outline-color");
	});

	it("still carries the colours that are always painted", () => {
		const out = css("tp:c");
		for (const property of [
			"color",
			"background-color",
			"border-color",
			"text-decoration-color",
			"fill",
			"stroke",
		]) {
			expect(out).toContain(property);
		}
	});

	it("leaves tp:a alone, which is every property by definition", () => {
		expect(css("tp:a")).toContain("transition-property: all");
	});
});

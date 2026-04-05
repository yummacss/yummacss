import {
	mediaQueries,
	opacity,
	pseudoClasses,
	pseudoElements,
} from "@yummacss/core";
import { describe, expect, it } from "vitest";

describe("Variant Exports", () => {
	it("should export mediaQueries as an array", () => {
		// console.log(
		// 	"Media Queries Structure:",
		// 	JSON.stringify(mediaQueries, null, 2),
		// );
		expect(Array.isArray(mediaQueries)).toBe(true);
		expect(mediaQueries.length).toBeGreaterThan(0);
		expect(mediaQueries[0]).toHaveProperty("prefix");
		expect(mediaQueries[0]).toHaveProperty("value");
	});

	it("should export opacity as an array", () => {
		// console.log("Opacity Structure:", JSON.stringify(opacity, null, 2));
		expect(Array.isArray(opacity)).toBe(true);
		expect(opacity.length).toBeGreaterThan(0);
	});

	it("should export pseudoClasses as an array", () => {
		// console.log(
		// 	"Pseudo Classes Structure:",
		// 	JSON.stringify(pseudoClasses, null, 2),
		// );
		expect(Array.isArray(pseudoClasses)).toBe(true);
		expect(pseudoClasses.length).toBeGreaterThan(0);
	});

	it("should export pseudoElements as an array", () => {
		// console.log(
		// 	"Pseudo Elements Structure:",
		// 	JSON.stringify(pseudoElements, null, 2),
		// );
		expect(Array.isArray(pseudoElements)).toBe(true);
		expect(pseudoElements.length).toBeGreaterThan(0);
	});
});

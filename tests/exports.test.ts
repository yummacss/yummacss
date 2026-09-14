import {
	mediaQueries,
	opacity,
	pseudoClasses,
	pseudoElements,
} from "@yummacss/core";
import { describe, expect, it } from "vitest";

describe("Variant Exports", () => {
	it("should export mediaQueries as an array", () => {
		expect(Array.isArray(mediaQueries)).toBe(true);
		expect(mediaQueries.length).toBeGreaterThan(0);
		expect(mediaQueries[0]).toHaveProperty("prefix");
		expect(mediaQueries[0]).toHaveProperty("value");
	});

	it("should export opacity as an array", () => {
		expect(Array.isArray(opacity)).toBe(true);
		expect(opacity.length).toBeGreaterThan(0);
	});

	it("should export pseudoClasses as an array", () => {
		expect(Array.isArray(pseudoClasses)).toBe(true);
		expect(pseudoClasses.length).toBeGreaterThan(0);
	});

	it("should export pseudoElements as an array", () => {
		expect(Array.isArray(pseudoElements)).toBe(true);
		expect(pseudoElements.length).toBeGreaterThan(0);
	});
});

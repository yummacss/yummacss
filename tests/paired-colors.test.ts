import { createColors, generateShades, isColorPair } from "@yummacss/core";
import { generator } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

const pair = { light: "#ffffff", dark: "#111214" };

describe("Paired theme colors", () => {
	it("identifies pairs without misreading plain strings", () => {
		expect(isColorPair(pair)).toBe(true);
		expect(isColorPair("#bec6f2")).toBe(false);
		expect(isColorPair({ light: "#fff" } as never)).toBe(false);
	});

	it("emits light-dark() for the base of a paired color", () => {
		const colors = createColors({ surface: pair });
		expect(colors.surface).toBe("light-dark(#ffffff, #111214)");
	});

	it("scales both sides independently, pairing shade for shade", () => {
		const colors = createColors({ surface: pair });
		const light = generateShades(pair.light);
		const dark = generateShades(pair.dark);

		// shades[0] is the lightest step, which maps to the `-1` suffix.
		expect(colors["surface-1"]).toBe(`light-dark(${light[0]}, ${dark[0]})`);
		expect(colors["surface-12"]).toBe(`light-dark(${light[12]}, ${dark[12]})`);
	});

	it("produces the full 13-step scale for a pair", () => {
		const colors = createColors({ surface: pair });
		const keys = Object.keys(colors).filter((k) => k.startsWith("surface"));
		expect(keys).toHaveLength(13);
		for (const key of keys) {
			expect(colors[key]).toMatch(
				/^light-dark\(#[0-9a-f]{6}, #[0-9a-f]{6}\)$/i,
			);
		}
	});

	it("leaves plain string colors exactly as they were", () => {
		const colors = createColors({ brand: "#bec6f2" });
		expect(colors.brand).toBe("#bec6f2");
		expect(colors["brand-1"]).toMatch(/^#[0-9a-f]{6}$/i);
		// Default palette is untouched by the presence of a pair elsewhere.
		const withPair = createColors({ brand: "#bec6f2", surface: pair });
		expect(withPair.brand).toBe(colors.brand);
		expect(withPair["blue-4"]).toBe(colors["blue-4"]);
	});

	it("generates usable CSS through the generator", () => {
		const css = generator(new Set(["bg-surface", "c-surface-3"]), {
			buildOptions: { reset: false },
			theme: { colors: { surface: pair } },
		} as never);
		expect(css).toContain("background-color: light-dark(#ffffff, #111214);");
		expect(css).toMatch(/color:\s*light-dark\(#[0-9a-f]{6}, #[0-9a-f]{6}\);/i);
	});
});

describe("color-scheme emission", () => {
	it("declares color-scheme when the theme contains a pair", () => {
		const css = generator(new Set(["bg-surface"]), {
			normalize: false,
			theme: { colors: { surface: pair } },
		} as never);
		expect(css).toContain("color-scheme: light dark;");
	});

	it("stays out of the output when no color is paired", () => {
		const css = generator(new Set(["bg-brand"]), {
			normalize: false,
			theme: { colors: { brand: "#bec6f2" } },
		} as never);
		expect(css).not.toContain("color-scheme");
	});

	it("stays out of the output when there is no theme at all", () => {
		const css = generator(new Set(["bg:blue"]), { normalize: false } as never);
		expect(css).not.toContain("color-scheme");
	});

	it("is not confused by the percentage config key", () => {
		const css = generator(new Set(["bg-brand"]), {
			normalize: false,
			theme: {
				colors: { brand: "#bec6f2", percentage: { light: 10, dark: 10 } },
			},
		} as never);
		expect(css).not.toContain("color-scheme");
	});
});

describe("color-scheme utility", () => {
	const config = { normalize: false } as never;

	it("generates each value", () => {
		const css = generator(new Set(["cs:l", "cs:d", "cs:ld"]), config);
		expect(css).toMatch(/\.cs-l\s*\{\s*color-scheme:\s*light;/);
		expect(css).toMatch(/\.cs-d\s*\{\s*color-scheme:\s*dark;/);
		expect(css).toMatch(/\.cs-ld\s*\{\s*color-scheme:\s*light dark;/);
	});

	it("still resolves corner-shape on the shared cs prefix", () => {
		const css = generator(new Set(["cs:s", "cs:r", "cs:b", "cs:n"]), config);
		expect(css).toMatch(/\.cs-s\s*\{\s*corner-shape:\s*squircle;/);
		expect(css).toMatch(/\.cs-n\s*\{\s*corner-shape:\s*notch;/);
		expect(css).not.toContain("color-scheme");
	});
});

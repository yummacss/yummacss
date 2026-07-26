import { generator } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

const config = { buildOptions: { reset: false } } as any;

describe("Opacity suffix", () => {
	it("wraps color values in color-mix() rather than appending hex alpha", () => {
		const css = generator(new Set(["bg-blue/50"]), config);
		expect(css).toContain(".bg-blue\\/50");
		expect(css).toMatch(
			/background-color:\s*color-mix\(in srgb, #[0-9a-f]{6} 50%, transparent\);/i,
		);
		// The previous 8-digit hex representation must not survive anywhere.
		expect(css).not.toMatch(/#[0-9a-f]{8}\b/i);
	});

	it("emits 0% rather than collapsing to a bare color", () => {
		const css = generator(new Set(["bg-blue/0"]), config);
		expect(css).toMatch(
			/background-color:\s*color-mix\(in srgb, #[0-9a-f]{6} 0%, transparent\);/i,
		);
	});

	it("composes with variant prefixes", () => {
		const css = generator(new Set(["h:bg-blue/50"]), config);
		expect(css).toContain(":hover");
		expect(css).toMatch(/color-mix\(in srgb, #[0-9a-f]{6} 50%, transparent\)/i);
	});

	it("leaves non-color values untouched", () => {
		// Wrapping a length in color-mix() would emit invalid CSS, so a suffix
		// on a non-color utility has to stay a no-op.
		const css = generator(new Set(["m-4/50"]), config);
		expect(css).not.toContain("color-mix");
	});

	// The reason this change exists: hex alpha could never have been appended
	// to a functional color value.
	it("applies to light-dark() colors, which hex alpha could not", () => {
		const css = generator(new Set(["bg-surface/50"]), {
			buildOptions: { reset: false },
			theme: { colors: { surface: { light: "#ffffff", dark: "#111214" } } },
		} as never);
		expect(css).toContain(
			"color-mix(in srgb, light-dark(#ffffff, #111214) 50%, transparent)",
		);
	});
});

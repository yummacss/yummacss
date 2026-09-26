import { ConfigSchema, generator, validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

const config = {
	buildOptions: { reset: false },
	theme: {
		keyframes: {
			spin: "to { rotate: 360deg; }",
			"fade-in": "from { opacity: 0; }",
		},
	},
} as never;

describe("theme.keyframes", () => {
	it("emits the keyframes a class uses, and only those", () => {
		const css = generator(new Set(["an:spin"]), config);

		expect(css).toContain("animation-name: spin;");
		expect(css).toContain("@keyframes spin {\n  to { rotate: 360deg; }\n}");
		expect(css).not.toContain("fade-in");
	});

	it("emits them once, whatever the variants", () => {
		const css = generator(
			new Set(["an:spin", "@md:an:spin", "h:an:spin"]),
			config,
		);

		expect(css.match(/@keyframes spin/g)).toHaveLength(1);
	});

	it("is canon only when configured", () => {
		expect(validateClasses(["an:fade-in"], config).invalid).toEqual([]);
		expect(validateClasses(["an:fade-in"], {} as never).invalid).toEqual([
			"an:fade-in",
		]);
	});

	it("ships no keyframes of its own", () => {
		const css = generator(new Set(["an:none"]), {
			buildOptions: { reset: false },
		} as never);

		expect(css).toContain("animation-name: none;");
		expect(css).not.toContain("@keyframes");
	});

	it("refuses none as a name", () => {
		expect(
			ConfigSchema.safeParse({ theme: { keyframes: { none: "to {}" } } })
				.success,
		).toBe(false);
	});
});

describe("animation utilities", () => {
	const css = (c: string) =>
		generator(new Set([c]), { buildOptions: { reset: false } } as never);

	it("share the transition scale and keywords", () => {
		expect(css("adu:250")).toContain("animation-duration: 250ms;");
		expect(css("ad:100")).toContain("animation-delay: 100ms;");
		expect(css("atf:l")).toContain("animation-timing-function: linear;");
		expect(css("aic:inf")).toContain("animation-iteration-count: infinite;");
	});
});

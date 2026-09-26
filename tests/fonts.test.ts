import { ConfigSchema, generator, validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

const config = {
	buildOptions: { reset: false },
	theme: {
		fonts: { display: '"Esteban", serif', m: "ui-monospace, monospace" },
	},
} as never;

describe("theme.fonts", () => {
	it("generates ff:<name>", () => {
		expect(generator(new Set(["ff:display"]), config)).toContain(
			'font-family: "Esteban", serif;',
		);
	});

	it("replaces a default it collides with", () => {
		expect(generator(new Set(["ff:m"]), config)).toContain(
			"font-family: ui-monospace, monospace;",
		);
	});

	it("is canon only when configured", () => {
		expect(validateClasses(["ff:display"], config).invalid).toEqual([]);
		expect(validateClasses(["ff:display"], {} as never).invalid).toEqual([
			"ff:display",
		]);
	});

	it("refuses a name that is not lower case", () => {
		expect(
			ConfigSchema.safeParse({ theme: { fonts: { Display: "serif" } } })
				.success,
		).toBe(false);
	});
});

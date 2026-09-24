import { generator, validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

const config = { buildOptions: { reset: false } } as never;

describe("container queries", () => {
	it("wraps @c:sm: in a container query at the sm width", () => {
		const css = generator(new Set(["@c:sm:fs:xl"]), config);

		expect(css).toContain("@container (min-width: 40rem)");
		expect(css).toContain(".\\@c\\:sm\\:fs\\:xl");
	});

	it("follows a configured screen", () => {
		const css = generator(new Set(["@c:3xl:d:g"]), {
			...(config as object),
			theme: { screens: { "3xl": "112rem" } },
		} as never);

		expect(css).toContain("@container (min-width: 112rem)");
	});

	it("marks the container with ct:", () => {
		expect(generator(new Set(["ct:is"]), config)).toContain(
			"container-type: inline-size;",
		);
	});

	it("is canon, and a bare @c: is not", () => {
		expect(validateClasses(["@c:md:h:o:0"], config).invalid).toEqual([]);
		expect(validateClasses(["@c:fs:xl"], config).invalid).toEqual(["@c:fs:xl"]);
	});
});

import { coreUtils } from "@yummacss/core";
import { generator } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

describe("breakpoints", () => {
	const config = { buildOptions: { reset: false } } as never;

	it("has a query for every t-shirt width alias", () => {
		const { mediaQueries } = coreUtils().display.variants ?? {};
		const widths = (mediaQueries ?? [])
			.filter((query) => query.value.includes("min-width"))
			.map((query) => query.prefix);

		expect(widths).toEqual(["xs", "sm", "md", "lg", "xl", "xxl"]);
	});

	it("emits xs at 32rem", () => {
		const css = generator(new Set(["@xs:d-f"]), config);

		expect(css).toContain("@media (min-width: 32rem)");
		expect(css).toContain(".\\@xs\\:d-f");
	});

	it("emits the queries widest last", () => {
		const css = generator(new Set(["@xxl:d-g", "@xs:d-f", "@sm:d-b"]), config);
		const order = [...css.matchAll(/min-width: (\d+)rem/g)].map((m) =>
			Number(m[1]),
		);

		expect(order).toEqual([...order].sort((a, b) => a - b));
	});
});

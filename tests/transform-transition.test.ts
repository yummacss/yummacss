import { generator } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

const config = { buildOptions: { reset: false } };

const css = (className: string) =>
	generator(new Set([className]), config as never);

describe("tp:t", () => {
	it("covers the standalone transform properties", () => {
		// s:, ro: and the like set scale and rotate, not transform
		expect(css("tp:t")).toContain(
			"transition-property: transform, translate, scale, rotate",
		);
	});
});

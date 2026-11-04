import { colorTheme } from "@yummacss/core";
import { describe, expect, it } from "vite-plus/test";
import { COLOR_GROUPS } from "../src/utils/colors";

describe("palette groups", () => {
	it("hold every family in core's order", () => {
		expect(COLOR_GROUPS.flatMap((group) => group.families)).toEqual(
			Object.keys(colorTheme),
		);
	});
});

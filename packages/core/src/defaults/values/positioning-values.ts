import { createValues } from "@/helpers/create-values";
import { topRightBottomLeft } from "../variables";

export const topRightBottomLeftValues: Record<string, string> = {
	...createValues({
		base: topRightBottomLeft,
		unit: "rem",
		min: 0,
		max: 100,
	}),
	auto: "auto",
	"100%": "100%",
	"50%": "50%",
};

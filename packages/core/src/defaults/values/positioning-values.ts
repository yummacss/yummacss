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
	full: "100%",
	half: "50%",
};

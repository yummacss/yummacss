import { createValues } from "@/helpers/create-values";
import { borderRadius, borderSpacing, borderWidth } from "../variables";

export const borderRadiusValues: Record<string, string> = {
	...createValues({
		base: borderRadius,
		unit: "rem",
		min: 0,
		max: 8,
	}),
	full: "100%",
	half: "50%",
	pill: "9999px",
	px: "1px",
};

export const borderSpacingValues: Record<string, string> = {
	...createValues({
		base: borderSpacing,
		unit: "rem",
		min: 0,
		max: 8,
	}),
	px: "1px",
};

export const borderWidthValues: Record<string, string> = createValues({
	base: borderWidth,
	unit: "px",
	min: 0,
	max: 8,
});

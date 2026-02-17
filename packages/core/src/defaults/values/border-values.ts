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
	vh: "100vh",
	vw: "100vw",
	vi: "100vi",
	vb: "100vb",
	svh: "100svh",
	svw: "100svw",
	lvh: "100lvh",
	lvw: "100lvw",
	vmin: "100vmin",
	vmax: "100vmax",
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

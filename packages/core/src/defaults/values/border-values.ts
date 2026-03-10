import { createValues } from "@/helpers/create-values";
import { borderRadius, borderWidth } from "../variables";

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
	auto: "auto",
	xs: "0.125rem",
	sm: "0.25rem",
	md: "0.5rem",
	lg: "1rem",
	xl: "1.5rem",
	"xxl": "2rem",
	"3xl": "3rem",
	px: "1px",
};

export const borderWidthValues: Record<string, string> = createValues({
	base: borderWidth,
	unit: "px",
	min: 0,
	max: 8,
});

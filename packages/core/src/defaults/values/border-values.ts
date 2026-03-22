import { createValues } from "@/helpers/create-values";
import {
	borderRadius3xl,
	borderRadiusLg,
	borderRadiusMd,
	borderRadiusSm,
	borderRadiusXl,
	borderRadiusXs,
	borderRadiusXxl,
	borderSpacing,
	borderWidth,
} from "../variables";

export const borderRadiusValues: Record<string, string> = {
	0: "0",
	xs: `${borderRadiusXs}rem`,
	sm: `${borderRadiusSm}rem`,
	md: `${borderRadiusMd}rem`,
	lg: `${borderRadiusLg}rem`,
	xl: `${borderRadiusXl}rem`,
	xxl: `${borderRadiusXxl}rem`,
	"3xl": `${borderRadius3xl}rem`,
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

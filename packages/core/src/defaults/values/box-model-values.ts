import { createValues } from "@/helpers/create-values";
import { height, margin, padding, width } from "../variables";

const extraUtils = {
	"10%": "10%",
	"20%": "20%",
	"30%": "30%",
	"40%": "40%",
	"50%": "50%",
	"60%": "60%",
	"70%": "70%",
	"80%": "80%",
	"90%": "90%",
	"100%": "100%",
	auto: "auto",
	dvh: "100dvh",
	dvw: "100dvw",
	fc: "fit-content",
	lg: "64rem",
	lvh: "100lvh",
	lvw: "100lvw",
	max: "max-content",
	md: "48rem",
	min: "min-content",
	px: "1px",
	s: "stretch",
	sm: "40rem",
	svh: "100svh",
	svw: "100svw",
	vb: "100vb",
	vh: "100vh",
	vi: "100vi",
	vmax: "100vmax",
	vmin: "100vmin",
	vw: "100vw",
	xl: "80rem",
	xs: "32rem",
	xxl: "96rem",
};

export const heightValues: Record<string, string> = {
	...createValues({
		base: height,
		unit: "rem",
		min: 0,
		max: 384,
	}),
	...extraUtils,
};

export const widthValues: Record<string, string> = {
	...createValues({
		base: width,
		unit: "rem",
		min: 0,
		max: 384,
	}),
	...extraUtils,
};

export const marginValues: Record<string, string> = {
	...createValues({
		base: margin,
		unit: "rem",
		min: 0,
		max: 384,
	}),
	auto: "auto",
	px: "1px",
};

export const paddingValues: Record<string, string> = {
	...createValues({
		base: padding,
		unit: "rem",
		min: 0,
		max: 384,
	}),
	auto: "auto",
	px: "1px",
};

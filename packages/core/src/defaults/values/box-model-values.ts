import { createValues } from "@/helpers/create-values";
import { height, margin, padding, width } from "../variables";

export const heightValues: Record<string, string> = {
	...createValues({
		base: height,
		unit: "rem",
		min: 0,
		max: 100,
	}),
	auto: "auto",
	dvh: "100dvh",
	dvw: "100dvw",
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
	fc: "fit-content",
	full: "100%",
	half: "50%",
	max: "max-content",
	min: "min-content",
	px: "1px",
	s: "stretch",
	xs: "32rem",
	sm: "40rem",
	md: "48rem",
	lg: "64rem",
	xl: "80rem",
	xxl: "96rem",
};

export const widthValues: Record<string, string> = {
	...createValues({
		base: width,
		unit: "rem",
		min: 0,
		max: 100,
	}),
	auto: "auto",
	dvh: "100dvh",
	dvw: "100dvw",
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
	fc: "fit-content",
	full: "100%",
	half: "50%",
	max: "max-content",
	min: "min-content",
	px: "1px",
	s: "stretch",
	xs: "32rem",
	sm: "40rem",
	md: "48rem",
	lg: "64rem",
	xl: "80rem",
	xxl: "96rem",
};

export const marginValues: Record<string, string> = {
	...createValues({
		base: margin,
		unit: "rem",
		min: 0,
		max: 100,
	}),
	auto: "auto",
	px: "1px",
};

export const paddingValues: Record<string, string> = {
	...createValues({
		base: padding,
		unit: "rem",
		min: 0,
		max: 100,
	}),
	auto: "auto",
	px: "1px",
};

import { createValues } from "@/helpers/create-values";
import { dimension, height, margin, padding, width } from "../variables";

export const dimensionValues: Record<string, string> = {
	...createValues({
		base: dimension,
		unit: "rem",
		min: 0,
		max: 100,
	}),
	auto: "auto",
	dvh: "100dvh",
	dvw: "100dvw",
	vh: "100vh",
	vw: "100vw",
	fc: "fit-content",
	full: "100%",
	half: "50%",
	max: "max-content",
	min: "min-content",
	px: "1px",
	s: "stretch",
	sm: "40rem",
	md: "48rem",
	lg: "64rem",
	xl: "80rem",
	xxl: "96rem",
};

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
	fc: "fit-content",
	full: "100%",
	half: "50%",
	max: "max-content",
	min: "min-content",
	px: "1px",
	s: "stretch",
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
	fc: "fit-content",
	full: "100%",
	half: "50%",
	max: "max-content",
	min: "min-content",
	px: "1px",
	s: "stretch",
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

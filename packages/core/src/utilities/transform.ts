import { variants } from "@/defaults/variants/stacks";
import { createValues } from "@/helpers/create-values";
import type { Utilities } from "@/interfaces";

const ratios: Record<string, string> = {
	"0": "0",
	"5": ".05",
	"10": ".1",
	"15": ".15",
	"20": ".2",
	"25": ".25",
	"30": ".3",
	"35": ".35",
	"40": ".4",
	"45": ".45",
	"50": ".5",
	"55": ".55",
	"60": ".6",
	"65": ".65",
	"70": ".7",
	"75": ".75",
	"80": ".8",
	"85": ".85",
	"90": ".9",
	"95": ".95",
	"100": "1",
};

const scaleX = (v: string) => `${v} 1`;
const scaleY = (v: string) => `1 ${v}`;
const scaleZ = (v: string) => `1 1 ${v}`;

const wrapRatios = (wrap: (v: string) => string) =>
	Object.fromEntries(Object.entries(ratios).map(([k, v]) => [k, wrap(v)]));

const skew = (v: string) => `skew(${v})`;
const skewX = (v: string) => `skewX(${v})`;
const skewY = (v: string) => `skewY(${v})`;
const translateXY = (v: string) => `${v} ${v}`;
const translateX = (v: string) => `translateX(${v})`;
const translateY = (v: string) => `translateY(${v})`;

export const transform: Utilities = {
	rotate: {
		prefix: "ro",
		properties: ["rotate"],
		slug: "rotate",
		values: createValues({
			base: 5,
			unit: "deg",
			min: 0,
			max: 360,
		}),
		variants,
	},

	scale: {
		prefix: "s",
		properties: ["scale"],
		slug: "scale",
		values: ratios,
		variants,
	},

	"scale-x": {
		prefix: "sx",
		properties: ["scale"],
		slug: "scale-x",
		values: wrapRatios(scaleX),
		wrap: scaleX,
		variants,
	},

	"scale-y": {
		prefix: "sy",
		properties: ["scale"],
		slug: "scale-y",
		values: wrapRatios(scaleY),
		wrap: scaleY,
		variants,
	},

	"scale-z": {
		prefix: "sz",
		properties: ["scale"],
		slug: "scale-z",
		values: wrapRatios(scaleZ),
		wrap: scaleZ,
		variants,
	},

	skew: {
		prefix: "ts",
		properties: ["transform"],
		slug: "skew",
		wrap: skew,
		values: {
			"1": "skew(1deg)",
			"2": "skew(2deg)",
			"3": "skew(3deg)",
			"6": "skew(6deg)",
			"12": "skew(12deg)",
		},
		variants,
	},

	"skew-x": {
		prefix: "tsx",
		properties: ["transform"],
		slug: "skew-x",
		wrap: skewX,
		values: {
			"1": "skewX(1deg)",
			"2": "skewX(2deg)",
			"3": "skewX(3deg)",
			"6": "skewX(6deg)",
			"12": "skewX(12deg)",
		},
		variants,
	},

	"skew-y": {
		prefix: "tsy",
		properties: ["transform"],
		slug: "skew-y",
		wrap: skewY,
		values: {
			"1": "skewY(1deg)",
			"2": "skewY(2deg)",
			"3": "skewY(3deg)",
			"6": "skewY(6deg)",
			"12": "skewY(12deg)",
		},
		variants,
	},

	"transform-origin": {
		prefix: "tor",
		properties: ["transform-origin"],
		slug: "transform-origin",
		values: {
			b: "bottom",
			bl: "0 100%",
			br: "100% 100%",
			c: "center",
			l: "0",
			r: "100%",
			t: "top",
			tl: "0 0",
			tr: "100% 0",
		},
		variants,
	},

	translate: {
		prefix: "tr",
		properties: ["translate"],
		slug: "translate",
		wrap: translateXY,
		values: createValues({
			base: 0.25,
			unit: "rem",
			min: 0,
			max: 100,
			wrapper: translateXY,
			extras: { full: "100% 100%", half: "50% 50%" },
		}),
		variants,
	},

	"translate-x": {
		prefix: "ttx",
		properties: ["transform"],
		slug: "translate-x",
		wrap: translateX,
		values: createValues({
			base: 0.25,
			unit: "rem",
			min: 0,
			max: 100,
			wrapper: translateX,
			extras: { full: translateX("100%"), half: translateX("50%") },
		}),
		variants,
	},

	"translate-y": {
		prefix: "tty",
		properties: ["transform"],
		slug: "translate-y",
		wrap: translateY,
		values: createValues({
			base: 0.25,
			unit: "rem",
			min: 0,
			max: 100,
			wrapper: translateY,
			extras: { full: translateY("100%"), half: translateY("50%") },
		}),
		variants,
	},
};

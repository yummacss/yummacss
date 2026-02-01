import { standardPreset } from "@/defaults/variants/presets";
import { createValues } from "@/helpers/create-values";
import type { Utilities } from "@/interfaces";

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
		variants: standardPreset,
	},

	scale: {
		prefix: "t-s",
		properties: ["transform"],
		slug: "scale",
		values: {
			"0": "scale(0%)",
			"10": "scale(10%)",
			"20": "scale(20%)",
			"30": "scale(30%)",
			"40": "scale(40%)",
			"50": "scale(50%)",
			"60": "scale(60%)",
			"70": "scale(70%)",
			"80": "scale(80%)",
			"90": "scale(90%)",
			"100": "scale(100%)",
		},
		variants: standardPreset,
	},

	"scale-x": {
		prefix: "t-sx",
		properties: ["transform"],
		slug: "scale-x",
		values: {
			"0": "scaleX(0%)",
			"10": "scaleX(10%)",
			"20": "scaleX(20%)",
			"30": "scaleX(30%)",
			"40": "scaleX(40%)",
			"50": "scaleX(50%)",
			"60": "scaleX(60%)",
			"70": "scaleX(70%)",
			"80": "scaleX(80%)",
			"90": "scaleX(90%)",
			"100": "scaleX(100%)",
		},
		variants: standardPreset,
	},

	"scale-y": {
		prefix: "t-sy",
		properties: ["transform"],
		slug: "scale-y",
		values: {
			"0": "scaleY(0%)",
			"10": "scaleY(10%)",
			"20": "scaleY(20%)",
			"30": "scaleY(30%)",
			"40": "scaleY(40%)",
			"50": "scaleY(50%)",
			"60": "scaleY(60%)",
			"70": "scaleY(70%)",
			"80": "scaleY(80%)",
			"90": "scaleY(90%)",
			"100": "scaleY(100%)",
		},
		variants: standardPreset,
	},

	skew: {
		prefix: "t-sk",
		properties: ["transform"],
		slug: "skew",
		values: {
			"1": "skew(1deg)",
			"2": "skew(2deg)",
			"3": "skew(3deg)",
			"6": "skew(6deg)",
			"12": "skew(12deg)",
		},
		variants: standardPreset,
	},

	"skew-x": {
		prefix: "t-skx",
		properties: ["transform"],
		slug: "skew-x",
		values: {
			"1": "skewX(1deg)",
			"2": "skewX(2deg)",
			"3": "skewX(3deg)",
			"6": "skewX(6deg)",
			"12": "skewX(12deg)",
		},
		variants: standardPreset,
	},

	"skew-y": {
		prefix: "t-sky",
		properties: ["transform"],
		slug: "skew-y",
		values: {
			"1": "skewY(1deg)",
			"2": "skewY(2deg)",
			"3": "skewY(3deg)",
			"6": "skewY(6deg)",
			"12": "skewY(12deg)",
		},
		variants: standardPreset,
	},

	"transform-origin": {
		prefix: "t-o",
		properties: ["transform-origin"],
		slug: "transform-origin",
		values: {
			b: "bottom",
			bl: "bottom left",
			br: "bottom right",
			c: "center",
			l: "left",
			r: "right",
			t: "top",
			tl: "top left",
			tr: "top right",
		},
		variants: standardPreset,
	},

	"translate-x": {
		prefix: "t-tx",
		properties: ["transform"],
		slug: "translate-x",
		values: createValues({
			base: 0.25,
			unit: "rem",
			min: 0,
			max: 100,
			wrapper: (v) => `translateX(${v})`,
			extras: { full: "translateX(100%)", half: "translateX(50%)" },
		}),
		variants: standardPreset,
	},

	"translate-y": {
		prefix: "t-ty",
		properties: ["transform"],
		slug: "translate-y",
		values: createValues({
			base: 0.25,
			unit: "rem",
			min: 0,
			max: 100,
			wrapper: (v) => `translateY(${v})`,
			extras: { full: "translateY(100%)", half: "translateY(50%)" },
		}),
		variants: standardPreset,
	},
};

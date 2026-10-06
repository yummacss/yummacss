import { variants } from "@/defaults/variants/stacks";
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
		variants,
	},

	scale: {
		prefix: "s",
		properties: ["scale"],
		slug: "scale",
		values: {
			"0": "0",
			"10": ".1",
			"20": ".2",
			"30": ".3",
			"40": ".4",
			"50": ".5",
			"60": ".6",
			"70": ".7",
			"80": ".8",
			"90": ".9",
			"100": "1",
		},
		variants,
	},

	"scale-x": {
		prefix: "sx",
		properties: ["scale"],
		slug: "scale-x",
		values: {
			"0": "0",
			"10": ".1",
			"20": ".2",
			"30": ".3",
			"40": ".4",
			"50": ".5",
			"60": ".6",
			"70": ".7",
			"80": ".8",
			"90": ".9",
			"100": "1",
		},
		variants,
	},

	"scale-y": {
		prefix: "sy",
		properties: ["scale"],
		slug: "scale-y",
		values: {
			"0": "0",
			"10": ".1",
			"20": ".2",
			"30": ".3",
			"40": ".4",
			"50": ".5",
			"60": ".6",
			"70": ".7",
			"80": ".8",
			"90": ".9",
			"100": "1",
		},
		variants,
	},

	"scale-z": {
		prefix: "sz",
		properties: ["scale"],
		slug: "scale-z",
		values: {
			"0": "0",
			"10": ".1",
			"20": ".2",
			"30": ".3",
			"40": ".4",
			"50": ".5",
			"60": ".6",
			"70": ".7",
			"80": ".8",
			"90": ".9",
			"100": "1",
		},
		variants,
	},

	skew: {
		prefix: "ts",
		properties: ["transform"],
		slug: "skew",
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
		values: createValues({
			base: 0.25,
			unit: "rem",
			min: 0,
			max: 100,
			wrapper: (v) => `${v} ${v}`,
			extras: { full: "100% 100%", half: "50% 50%" },
		}),
		variants,
	},

	"translate-x": {
		prefix: "ttx",
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
		variants,
	},

	"translate-y": {
		prefix: "tty",
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
		variants,
	},
};

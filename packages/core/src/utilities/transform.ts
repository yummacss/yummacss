import { base } from "@/defaults/variants/stacks";
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
		variants: base,
	},

	scale: {
		prefix: "s",
		properties: ["scale"],
		slug: "scale",
		values: {
			"0": "0%",
			"10": "10%",
			"20": "20%",
			"30": "30%",
			"40": "40%",
			"50": "50%",
			"60": "60%",
			"70": "70%",
			"80": "80%",
			"90": "90%",
			"100": "100%",
		},
		variants: base,
	},

	"scale-x": {
		prefix: "sx",
		properties: ["scale"],
		slug: "scale-x",
		values: {
			"0": "0% 1",
			"10": "10% 1",
			"20": "20% 1",
			"30": "30% 1",
			"40": "40% 1",
			"50": "50% 1",
			"60": "60% 1",
			"70": "70% 1",
			"80": "80% 1",
			"90": "90% 1",
			"100": "100% 1",
		},
		variants: base,
	},

	"scale-y": {
		prefix: "sy",
		properties: ["scale"],
		slug: "scale-y",
		values: {
			"0": "1 0%",
			"10": "1 10%",
			"20": "1 20%",
			"30": "1 30%",
			"40": "1 40%",
			"50": "1 50%",
			"60": "1 60%",
			"70": "1 70%",
			"80": "1 80%",
			"90": "1 90%",
			"100": "1 100%",
		},
		variants: base,
	},

	"scale-z": {
		prefix: "sz",
		properties: ["scale"],
		slug: "scale-z",
		values: {
			"0": "1 1 0%",
			"10": "1 1 10%",
			"20": "1 1 20%",
			"30": "1 1 30%",
			"40": "1 1 40%",
			"50": "1 1 50%",
			"60": "1 1 60%",
			"70": "1 1 70%",
			"80": "1 1 80%",
			"90": "1 1 90%",
			"100": "1 1 100%",
		},
		variants: base,
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
		variants: base,
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
		variants: base,
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
		variants: base,
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
		variants: base,
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
		variants: base,
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
		variants: base,
	},
};

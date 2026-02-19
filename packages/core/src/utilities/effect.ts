import {
	blurValues,
	boxShadowInsetValues,
	boxShadowOutsetValues,
	grayscaleValues,
} from "@/defaults/values";
import { base } from "@/defaults/variants/stacks";
import type { Utilities } from "@/interfaces";

export const effect: Utilities = {
	"backdrop-blur": {
		prefix: "bf-b",
		properties: ["backdrop-filter"],
		slug: "backdrop-blur",
		values: blurValues,
		variants: base,
	},

	"backdrop-grayscale": {
		prefix: "bf-g",
		properties: ["backdrop-filter"],
		slug: "backdrop-grayscale",
		values: grayscaleValues,
		variants: base,
	},

	blur: {
		prefix: "f-b",
		properties: ["filter"],
		slug: "blur",
		values: blurValues,
		variants: base,
	},

	"box-shadow-outset": {
		prefix: "bs-o",
		properties: ["box-shadow"],
		slug: "box-shadow#outset",
		values: boxShadowOutsetValues,
		variants: base,
	},

	"box-shadow-inset": {
		prefix: "bs-i",
		properties: ["box-shadow"],
		slug: "box-shadow#inset",
		values: boxShadowInsetValues,
		variants: base,
	},

	grayscale: {
		prefix: "f-g",
		properties: ["filter"],
		slug: "grayscale",
		values: grayscaleValues,
		variants: base,
	},

	"mix-blend-mode": {
		prefix: "mbm",
		properties: ["mix-blend-mode"],
		slug: "mix-blend-mode",
		values: {
			n: "normal",
			m: "multiply",
			s: "screen",
			o: "overlay",
			d: "darken",
			l: "lighten",
			cd: "color-dodge",
			cb: "color-burn",
			hl: "hard-light",
			sl: "soft-light",
			df: "difference",
			e: "exclusion",
			h: "hue",
			st: "saturation",
			c: "color",
			lu: "luminosity",
			pd: "plus-darker",
			pl: "plus-lighter",
		},
		variants: base,
	},

	opacity: {
		prefix: "o",
		properties: ["opacity"],
		slug: "opacity",
		values: {
			0: "0",
			10: "0.1",
			20: "0.2",
			30: "0.3",
			40: "0.4",
			50: "0.5",
			60: "0.6",
			70: "0.7",
			80: "0.8",
			90: "0.9",
			100: "1",
		},
		variants: base,
	},
};

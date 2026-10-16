import {
	blurValues,
	boxShadowInsetValues,
	boxShadowOutsetValues,
	grayscaleValues,
} from "@/defaults/values";
import { variants } from "@/defaults/variants/stacks";
import type { Utilities } from "@/interfaces";

const blur = (v: string) => `blur(${v})`;
const grayscale = (v: string) => `grayscale(${v})`;

export const effect: Utilities = {
	"backdrop-blur": {
		prefix: "bf-b",
		properties: ["backdrop-filter"],
		slug: "backdrop-blur",
		wrap: blur,
		values: blurValues,
		variants,
	},

	"backdrop-grayscale": {
		prefix: "bf-g",
		properties: ["backdrop-filter"],
		slug: "backdrop-grayscale",
		wrap: grayscale,
		values: grayscaleValues,
		variants,
	},

	blur: {
		prefix: "f-b",
		properties: ["filter"],
		slug: "blur",
		wrap: blur,
		values: blurValues,
		variants,
	},

	"box-shadow-outset": {
		prefix: "bs-o",
		properties: ["box-shadow"],
		slug: "box-shadow#outset",
		values: boxShadowOutsetValues,
		variants,
	},

	"box-shadow-inset": {
		prefix: "bs-i",
		properties: ["box-shadow"],
		slug: "box-shadow#inset",
		values: boxShadowInsetValues,
		variants,
	},

	grayscale: {
		prefix: "fgr",
		properties: ["filter"],
		slug: "grayscale",
		wrap: grayscale,
		values: grayscaleValues,
		variants,
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
		variants,
	},

	opacity: {
		prefix: "o",
		properties: ["opacity"],
		slug: "opacity",
		values: {
			0: "0",
			10: ".1",
			20: ".2",
			30: ".3",
			40: ".4",
			50: ".5",
			60: ".6",
			70: ".7",
			80: ".8",
			90: ".9",
			100: "1",
		},
		variants,
	},
};

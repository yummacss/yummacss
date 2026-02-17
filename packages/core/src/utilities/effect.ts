import { blurValues } from "@/defaults/values";
import {
	boxShadowLg,
	boxShadowMd,
	boxShadowSm,
	boxShadowXl,
	boxShadowXs,
	grayscale,
} from "@/defaults/variables";
import { standard } from "@/defaults/variants/presets";
import type { Utilities } from "@/interfaces";

export const effect: Utilities = {
	"backdrop-blur": {
		prefix: "bf-b",
		properties: ["backdrop-filter"],
		slug: "backdrop-blur",
		values: blurValues,
		variants: standard,
	},

	blur: {
		prefix: "f-b",
		properties: ["filter"],
		slug: "blur",
		values: blurValues,
		variants: standard,
	},

	"box-shadow": {
		prefix: "bsh",
		properties: ["box-shadow"],
		slug: "box-shadow",
		values: {
			none: "none",
			xs: boxShadowXs,
			sm: boxShadowSm,
			md: boxShadowMd,
			lg: boxShadowLg,
			xl: boxShadowXl,
		},
		variants: standard,
	},

	grayscale: {
		prefix: "f-g",
		properties: ["filter"],
		slug: "grayscale",
		values: {
			0: `grayscale(${grayscale * 0}%)`,
			10: `grayscale(${grayscale}%)`,
			20: `grayscale(${grayscale * 2}%)`,
			30: `grayscale(${grayscale * 3}%)`,
			40: `grayscale(${grayscale * 4}%)`,
			50: `grayscale(${grayscale * 5}%)`,
			60: `grayscale(${grayscale * 6}%)`,
			70: `grayscale(${grayscale * 7}%)`,
			80: `grayscale(${grayscale * 8}%)`,
			90: `grayscale(${grayscale * 9}%)`,
			100: `grayscale(100%)`,
		},
		variants: standard,
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
		variants: standard,
	},
};

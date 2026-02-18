import { blurValues, grayscaleValues } from "@/defaults/values";
import {
	boxShadowLg,
	boxShadowMd,
	boxShadowSm,
	boxShadowXl,
	boxShadowXs,
} from "@/defaults/variables";
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
		variants: base,
	},

	grayscale: {
		prefix: "f-g",
		properties: ["filter"],
		slug: "grayscale",
		values: grayscaleValues,
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

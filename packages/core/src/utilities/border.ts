import {
	borderRadiusValues,
	borderSpacingValues,
	borderWidthValues,
} from "@/defaults/values";
import { standard } from "@/defaults/variants/presets";
import type { Utilities } from "@/interfaces";

export const border: Utilities = {
	"border-collapse": {
		prefix: "bc",
		properties: ["border-collapse"],
		slug: "border-collapse",
		values: {
			c: "collapse",
			s: "separate",
		},
		variants: standard,
	},

	"border-radius": {
		prefix: "br",
		properties: ["border-radius"],
		slug: "border-radius",
		values: borderRadiusValues,
		variants: standard,
	},

	"border-bottom-radius": {
		prefix: "br-b",
		properties: ["border-bottom-left-radius", "border-bottom-right-radius"],
		slug: "border-radius#bottom-radius",
		values: borderRadiusValues,
		variants: standard,
	},

	"border-left-radius": {
		prefix: "br-l",
		properties: ["border-bottom-left-radius", "border-top-left-radius"],
		slug: "border-radius#left-radius",
		values: borderRadiusValues,
		variants: standard,
	},

	"border-right-radius": {
		prefix: "br-r",
		properties: ["border-bottom-right-radius", "border-top-right-radius"],
		slug: "border-radius#right-radius",
		values: borderRadiusValues,
		variants: standard,
	},

	"border-bottom-left-radius": {
		prefix: "br-bl",
		properties: ["border-bottom-left-radius"],
		slug: "border-radius#bottom-left-radius",
		values: borderRadiusValues,
		variants: standard,
	},

	"border-bottom-right-radius": {
		prefix: "br-br",
		properties: ["border-bottom-right-radius"],
		slug: "border-radius#bottom-right-radius",
		values: borderRadiusValues,
		variants: standard,
	},

	"border-top-radius": {
		prefix: "br-t",
		properties: ["border-top-left-radius", "border-top-right-radius"],
		slug: "border-radius#top-radius",
		values: borderRadiusValues,
		variants: standard,
	},

	"border-top-left-radius": {
		prefix: "br-tl",
		properties: ["border-top-left-radius"],
		slug: "border-radius#top-left-radius",
		values: borderRadiusValues,
		variants: standard,
	},

	"border-top-right-radius": {
		prefix: "br-tr",
		properties: ["border-top-right-radius"],
		slug: "border-radius#top-right-radius",
		values: borderRadiusValues,
		variants: standard,
	},

	"border-spacing": {
		prefix: "bs",
		properties: ["border-spacing"],
		slug: "border-spacing",
		values: borderSpacingValues,
		variants: standard,
	},

	"border-style": {
		prefix: "bs",
		properties: ["border-style"],
		slug: "border-style",
		values: {
			none: "none",
			d: "dashed",
			s: "solid",
		},
		variants: standard,
	},

	"border-width": {
		prefix: "bw",
		properties: ["border-width"],
		slug: "border-width",
		values: borderWidthValues,
		variants: standard,
	},

	"border-bottom-width": {
		prefix: "bbw",
		properties: ["border-bottom-width"],
		slug: "border-bottom-radius",
		values: borderWidthValues,
		variants: standard,
	},

	"border-left-width": {
		prefix: "blw",
		properties: ["border-left-width"],
		slug: "border-width#left-width",
		values: borderWidthValues,
		variants: standard,
	},

	"border-right-width": {
		prefix: "brw",
		properties: ["border-right-width"],
		slug: "border-width#right-width",
		values: borderWidthValues,
		variants: standard,
	},

	"border-top-width": {
		prefix: "btw",
		properties: ["border-top-width"],
		slug: "border-width#top-width",
		values: borderWidthValues,
		variants: standard,
	},
};

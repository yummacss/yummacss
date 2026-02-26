import {
	borderRadiusValues,
	borderSpacingValues,
	borderWidthValues,
} from "@/defaults/values";
import { base } from "@/defaults/variants/stacks";
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
		variants: base,
	},

	"border-radius": {
		prefix: "br",
		properties: ["border-radius"],
		slug: "border-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-bottom-radius": {
		prefix: "bbr",
		properties: ["border-bottom-left-radius", "border-bottom-right-radius"],
		slug: "border-radius#bottom-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-left-radius": {
		prefix: "blr",
		properties: ["border-bottom-left-radius", "border-top-left-radius"],
		slug: "border-radius#left-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-right-radius": {
		prefix: "brr",
		properties: ["border-bottom-right-radius", "border-top-right-radius"],
		slug: "border-radius#right-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-bottom-left-radius": {
		prefix: "bblr",
		properties: ["border-bottom-left-radius"],
		slug: "border-radius#bottom-left-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-bottom-right-radius": {
		prefix: "bbrr",
		properties: ["border-bottom-right-radius"],
		slug: "border-radius#bottom-right-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-top-radius": {
		prefix: "btr",
		properties: ["border-top-left-radius", "border-top-right-radius"],
		slug: "border-radius#top-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-top-left-radius": {
		prefix: "btlr",
		properties: ["border-top-left-radius"],
		slug: "border-radius#top-left-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-top-right-radius": {
		prefix: "btrr",
		properties: ["border-top-right-radius"],
		slug: "border-radius#top-right-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-block-end-radius": {
		prefix: "bber",
		properties: ["border-end-start-radius", "border-end-end-radius"],
		slug: "border-radius#block-end-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-inline-start-radius": {
		prefix: "bisr",
		properties: ["border-start-start-radius", "border-end-start-radius"],
		slug: "border-radius#inline-start-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-inline-end-radius": {
		prefix: "bier",
		properties: ["border-start-end-radius", "border-end-end-radius"],
		slug: "border-radius#inline-end-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-end-start-radius": {
		prefix: "besr",
		properties: ["border-end-start-radius"],
		slug: "border-radius#end-start-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-end-end-radius": {
		prefix: "beer",
		properties: ["border-end-end-radius"],
		slug: "border-radius#end-end-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-block-start-radius": {
		prefix: "bbsr",
		properties: ["border-start-start-radius", "border-start-end-radius"],
		slug: "border-radius#block-start-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-start-start-radius": {
		prefix: "bssr",
		properties: ["border-start-start-radius"],
		slug: "border-radius#start-start-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-start-end-radius": {
		prefix: "bser",
		properties: ["border-start-end-radius"],
		slug: "border-radius#start-end-radius",
		values: borderRadiusValues,
		variants: base,
	},

	"border-spacing": {
		prefix: "bs",
		properties: ["border-spacing"],
		slug: "border-spacing",
		values: borderSpacingValues,
		variants: base,
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
		variants: base,
	},

	"border-width": {
		prefix: "bw",
		properties: ["border-width"],
		slug: "border-width",
		values: borderWidthValues,
		variants: base,
	},

	"border-bottom-width": {
		prefix: "bbw",
		properties: ["border-bottom-width"],
		slug: "border-width#bottom-width",
		values: borderWidthValues,
		variants: base,
	},

	"border-left-width": {
		prefix: "blw",
		properties: ["border-left-width"],
		slug: "border-width#left-width",
		values: borderWidthValues,
		variants: base,
	},

	"border-right-width": {
		prefix: "brw",
		properties: ["border-right-width"],
		slug: "border-width#right-width",
		values: borderWidthValues,
		variants: base,
	},

	"border-top-width": {
		prefix: "btw",
		properties: ["border-top-width"],
		slug: "border-width#top-width",
		values: borderWidthValues,
		variants: base,
	},

	"border-block-end-width": {
		prefix: "bbew",
		properties: ["border-block-end-width"],
		slug: "border-width#block-end-width",
		values: borderWidthValues,
		variants: base,
	},

	"border-block-start-width": {
		prefix: "bbsw",
		properties: ["border-block-start-width"],
		slug: "border-width#block-start-width",
		values: borderWidthValues,
		variants: base,
	},

	"border-inline-end-width": {
		prefix: "biew",
		properties: ["border-inline-end-width"],
		slug: "border-width#inline-end-width",
		values: borderWidthValues,
		variants: base,
	},

	"border-inline-start-width": {
		prefix: "bisw",
		properties: ["border-inline-start-width"],
		slug: "border-width#inline-start-width",
		values: borderWidthValues,
		variants: base,
	},

	"border-block-width": {
		prefix: "byw",
		properties: ["border-block-width"],
		slug: "border-width#block-width",
		values: borderWidthValues,
		variants: base,
	},

	"border-inline-width": {
		prefix: "bxw",
		properties: ["border-inline-width"],
		slug: "border-width#inline-width",
		values: borderWidthValues,
		variants: base,
	},
};

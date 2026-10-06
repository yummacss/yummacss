import {
	borderRadiusValues,
	borderSpacingValues,
	borderWidthValues,
	cornerShapeValues,
} from "@/defaults/values";
import { variants } from "@/defaults/variants/stacks";
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
		variants,
	},

	"border-radius": {
		prefix: "br",
		properties: ["border-radius"],
		slug: "border-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-bottom-radius": {
		prefix: "bbr",
		properties: ["border-bottom-right-radius", "border-bottom-left-radius"],
		slug: "border-radius#bottom-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-left-radius": {
		prefix: "blr",
		properties: ["border-top-left-radius", "border-bottom-left-radius"],
		slug: "border-radius#left-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-right-radius": {
		prefix: "brr",
		properties: ["border-top-right-radius", "border-bottom-right-radius"],
		slug: "border-radius#right-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-bottom-left-radius": {
		prefix: "bblr",
		properties: ["border-bottom-left-radius"],
		slug: "border-radius#bottom-left-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-bottom-right-radius": {
		prefix: "bbrr",
		properties: ["border-bottom-right-radius"],
		slug: "border-radius#bottom-right-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-top-radius": {
		prefix: "btr",
		properties: ["border-top-left-radius", "border-top-right-radius"],
		slug: "border-radius#top-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-top-left-radius": {
		prefix: "btlr",
		properties: ["border-top-left-radius"],
		slug: "border-radius#top-left-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-top-right-radius": {
		prefix: "btrr",
		properties: ["border-top-right-radius"],
		slug: "border-radius#top-right-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-block-end-radius": {
		prefix: "bber",
		properties: ["border-end-end-radius", "border-end-start-radius"],
		slug: "border-radius#block-end-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-inline-start-radius": {
		prefix: "bisr",
		properties: ["border-start-start-radius", "border-end-start-radius"],
		slug: "border-radius#inline-start-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-inline-end-radius": {
		prefix: "bier",
		properties: ["border-start-end-radius", "border-end-end-radius"],
		slug: "border-radius#inline-end-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-end-start-radius": {
		prefix: "besr",
		properties: ["border-end-start-radius"],
		slug: "border-radius#end-start-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-end-end-radius": {
		prefix: "beer",
		properties: ["border-end-end-radius"],
		slug: "border-radius#end-end-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-block-start-radius": {
		prefix: "bbsr",
		properties: ["border-start-start-radius", "border-start-end-radius"],
		slug: "border-radius#block-start-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-start-start-radius": {
		prefix: "bssr",
		properties: ["border-start-start-radius"],
		slug: "border-radius#start-start-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-start-end-radius": {
		prefix: "bser",
		properties: ["border-start-end-radius"],
		slug: "border-radius#start-end-radius",
		values: borderRadiusValues,
		variants,
	},

	"border-spacing": {
		prefix: "bs",
		properties: ["border-spacing"],
		slug: "border-spacing",
		values: borderSpacingValues,
		variants,
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
		variants,
	},

	"border-width": {
		prefix: "bw",
		properties: ["border-width"],
		slug: "border-width",
		values: borderWidthValues,
		variants,
	},

	"border-bottom-width": {
		prefix: "bbw",
		properties: ["border-bottom-width"],
		slug: "border-width#bottom-width",
		values: borderWidthValues,
		variants,
	},

	"border-left-width": {
		prefix: "blw",
		properties: ["border-left-width"],
		slug: "border-width#left-width",
		values: borderWidthValues,
		variants,
	},

	"border-right-width": {
		prefix: "brw",
		properties: ["border-right-width"],
		slug: "border-width#right-width",
		values: borderWidthValues,
		variants,
	},

	"border-top-width": {
		prefix: "btw",
		properties: ["border-top-width"],
		slug: "border-width#top-width",
		values: borderWidthValues,
		variants,
	},

	"border-block-end-width": {
		prefix: "bbew",
		properties: ["border-block-end-width"],
		slug: "border-width#block-end-width",
		values: borderWidthValues,
		variants,
	},

	"border-block-start-width": {
		prefix: "bbsw",
		properties: ["border-block-start-width"],
		slug: "border-width#block-start-width",
		values: borderWidthValues,
		variants,
	},

	"border-inline-end-width": {
		prefix: "biew",
		properties: ["border-inline-end-width"],
		slug: "border-width#inline-end-width",
		values: borderWidthValues,
		variants,
	},

	"border-inline-start-width": {
		prefix: "bisw",
		properties: ["border-inline-start-width"],
		slug: "border-width#inline-start-width",
		values: borderWidthValues,
		variants,
	},

	"border-block-width": {
		prefix: "byw",
		properties: ["border-block-width"],
		slug: "border-width#block-width",
		values: borderWidthValues,
		variants,
	},

	"border-inline-width": {
		prefix: "bxw",
		properties: ["border-inline-width"],
		slug: "border-width#inline-width",
		values: borderWidthValues,
		variants,
	},

	"corner-shape": {
		prefix: "cs",
		properties: ["corner-shape"],
		slug: "corner-shape",
		values: cornerShapeValues,
		variants,
	},

	"corner-block-end-shape": {
		prefix: "cbes",
		properties: ["corner-block-end-shape"],
		slug: "corner-shape#block-end",
		values: cornerShapeValues,
		variants,
	},

	"corner-block-start-shape": {
		prefix: "cbss",
		properties: ["corner-block-start-shape"],
		slug: "corner-shape#block-start",
		values: cornerShapeValues,
		variants,
	},

	"corner-bottom-left-shape": {
		prefix: "cbls",
		properties: ["corner-bottom-left-shape"],
		slug: "corner-shape#bottom-left",
		values: cornerShapeValues,
		variants,
	},

	"corner-bottom-right-shape": {
		prefix: "cbrs",
		properties: ["corner-bottom-right-shape"],
		slug: "corner-shape#bottom-right",
		values: cornerShapeValues,
		variants,
	},

	"corner-bottom-shape": {
		prefix: "cbs",
		properties: ["corner-bottom-shape"],
		slug: "corner-shape#bottom",
		values: cornerShapeValues,
		variants,
	},

	"corner-end-end-shape": {
		prefix: "cees",
		properties: ["corner-end-end-shape"],
		slug: "corner-shape#end-end",
		values: cornerShapeValues,
		variants,
	},

	"corner-end-start-shape": {
		prefix: "cests",
		properties: ["corner-end-start-shape"],
		slug: "corner-shape#end-start",
		values: cornerShapeValues,
		variants,
	},

	"corner-inline-end-shape": {
		prefix: "cies",
		properties: ["corner-inline-end-shape"],
		slug: "corner-shape#inline-end",
		values: cornerShapeValues,
		variants,
	},

	"corner-inline-start-shape": {
		prefix: "ciss",
		properties: ["corner-inline-start-shape"],
		slug: "corner-shape#inline-start",
		values: cornerShapeValues,
		variants,
	},

	"corner-left-shape": {
		prefix: "cls",
		properties: ["corner-left-shape"],
		slug: "corner-shape#left",
		values: cornerShapeValues,
		variants,
	},

	"corner-right-shape": {
		prefix: "crs",
		properties: ["corner-right-shape"],
		slug: "corner-shape#right",
		values: cornerShapeValues,
		variants,
	},

	"corner-start-end-shape": {
		prefix: "cses",
		properties: ["corner-start-end-shape"],
		slug: "corner-shape#start-end",
		values: cornerShapeValues,
		variants,
	},

	"corner-start-start-shape": {
		prefix: "csss",
		properties: ["corner-start-start-shape"],
		slug: "corner-shape#start-start",
		values: cornerShapeValues,
		variants,
	},

	"corner-top-left-shape": {
		prefix: "ctls",
		properties: ["corner-top-left-shape"],
		slug: "corner-shape#top-left",
		values: cornerShapeValues,
		variants,
	},

	"corner-top-right-shape": {
		prefix: "ctrs",
		properties: ["corner-top-right-shape"],
		slug: "corner-shape#top-right",
		values: cornerShapeValues,
		variants,
	},

	"corner-top-shape": {
		prefix: "cts",
		properties: ["corner-top-shape"],
		slug: "corner-shape#top",
		values: cornerShapeValues,
		variants,
	},
};

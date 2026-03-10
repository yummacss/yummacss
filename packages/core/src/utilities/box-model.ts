import {
	heightValues,
	marginValues,
	paddingValues,
	widthValues,
} from "@/defaults/values";
import { base } from "@/defaults/variants/stacks";
import type { Utilities } from "@/interfaces";

export const boxModel: Utilities = {
	"aspect-ratio": {
		prefix: "ar",
		properties: ["aspect-ratio"],
		slug: "aspect-ratio",
		values: {
			auto: "auto",
			"1/1": "1",
			"1/2": "1 / 2",
			"2/1": "2",
			"2/3": "2 / 3",
			"3/2": "3 / 2",
			"3/4": "3 / 4",
			"4/3": "4 / 3",
			"4/5": "4 / 5",
			"5/4": "5 / 4",
			"5/7": "5 / 7",
			"7/5": "7 / 5",
			"9/16": "9 / 16",
			"16/9": "16 / 9",
			"21/9": "21 / 9",
			"9/21": "9 / 21",
		},
		variants: base,
	},

	"box-sizing": {
		prefix: "bs",
		properties: ["box-sizing"],
		slug: "box-sizing",
		values: {
			bb: "border-box",
			cb: "content-box",
		},
		variants: base,
	},

	height: {
		prefix: "h",
		properties: ["height"],
		slug: "height",
		values: heightValues,
		variants: base,
	},

	"max-height": {
		prefix: "max-h",
		properties: ["max-height"],
		slug: "height#max-height",
		values: heightValues,
		variants: base,
	},

	"min-height": {
		prefix: "min-h",
		properties: ["min-height"],
		slug: "height#min-height",
		values: heightValues,
		variants: base,
	},

	margin: {
		prefix: "m",
		properties: ["margin"],
		slug: "margin",
		values: marginValues,
		variants: base,
	},

	"margin-block-end": {
		prefix: "mbe",
		properties: ["margin-block-end"],
		slug: "margin#block-end",
		values: marginValues,
		variants: base,
	},

	"margin-block-start": {
		prefix: "mbs",
		properties: ["margin-block-start"],
		slug: "margin#block-start",
		values: marginValues,
		variants: base,
	},

	"margin-bottom": {
		prefix: "mb",
		properties: ["margin-bottom"],
		slug: "margin#bottom",
		values: marginValues,
		variants: base,
	},

	"margin-inline-end": {
		prefix: "mie",
		properties: ["margin-inline-end"],
		slug: "margin#inline-end",
		values: marginValues,
		variants: base,
	},

	"margin-inline-start": {
		prefix: "mis",
		properties: ["margin-inline-start"],
		slug: "margin#inline-start",
		values: marginValues,
		variants: base,
	},

	"margin-left": {
		prefix: "ml",
		properties: ["margin-left"],
		slug: "margin#left",
		values: marginValues,
		variants: base,
	},

	"margin-right": {
		prefix: "mr",
		properties: ["margin-right"],
		slug: "margin#right",
		values: marginValues,
		variants: base,
	},

	"margin-top": {
		prefix: "mt",
		properties: ["margin-top"],
		slug: "margin#top",
		values: marginValues,
		variants: base,
	},

	"margin-inline": {
		prefix: "mx",
		properties: ["margin-inline"],
		slug: "margin#margin-inline",
		values: marginValues,
		variants: base,
	},

	"margin-block": {
		prefix: "my",
		properties: ["margin-block"],
		slug: "margin#margin-block",
		values: marginValues,
		variants: base,
	},

	padding: {
		prefix: "p",
		properties: ["padding"],
		slug: "padding",
		values: paddingValues,
		variants: base,
	},

	"padding-block-end": {
		prefix: "pbe",
		properties: ["padding-block-end"],
		slug: "padding#block-end",
		values: paddingValues,
		variants: base,
	},

	"padding-block-start": {
		prefix: "pbs",
		properties: ["padding-block-start"],
		slug: "padding#block-start",
		values: paddingValues,
		variants: base,
	},

	"padding-bottom": {
		prefix: "pb",
		properties: ["padding-bottom"],
		slug: "padding#bottom",
		values: paddingValues,
		variants: base,
	},

	"padding-inline-end": {
		prefix: "pie",
		properties: ["padding-inline-end"],
		slug: "padding#inline-end",
		values: paddingValues,
		variants: base,
	},

	"padding-inline-start": {
		prefix: "pis",
		properties: ["padding-inline-start"],
		slug: "padding#inline-start",
		values: paddingValues,
		variants: base,
	},

	"padding-left": {
		prefix: "pl",
		properties: ["padding-left"],
		slug: "padding#left",
		values: paddingValues,
		variants: base,
	},

	"padding-right": {
		prefix: "pr",
		properties: ["padding-right"],
		slug: "padding#right",
		values: paddingValues,
		variants: base,
	},

	"padding-top": {
		prefix: "pt",
		properties: ["padding-top"],
		slug: "padding#top",
		values: paddingValues,
		variants: base,
	},

	"padding-inline": {
		prefix: "px",
		properties: ["padding-inline"],
		slug: "padding#padding-inline",
		values: paddingValues,
		variants: base,
	},

	"padding-block": {
		prefix: "py",
		properties: ["padding-block"],
		slug: "padding#padding-block",
		values: paddingValues,
		variants: base,
	},

	width: {
		prefix: "w",
		properties: ["width"],
		slug: "width",
		values: widthValues,
		variants: base,
	},

	"max-width": {
		prefix: "max-w",
		properties: ["max-width"],
		slug: "width#max-width",
		values: widthValues,
		variants: base,
	},

	"min-width": {
		prefix: "min-w",
		properties: ["min-width"],
		slug: "width#min-width",
		values: widthValues,
		variants: base,
	},
};

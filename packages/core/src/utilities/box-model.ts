import {
	heightValues,
	marginValues,
	paddingValues,
	widthValues,
} from "@/defaults/values";
import { standardPreset } from "@/defaults/variants/presets";
import type { Utilities } from "@/interfaces";

export const boxModel: Utilities = {
	"box-sizing": {
		prefix: "bs",
		properties: ["box-sizing"],
		slug: "box-sizing",
		values: {
			bb: "border-box",
			cb: "content-box",
		},
		variants: standardPreset,
	},

	height: {
		prefix: "h",
		properties: ["height"],
		slug: "height",
		values: heightValues,
		variants: standardPreset,
	},

	"max-height": {
		prefix: "max-h",
		properties: ["max-height"],
		slug: "height#max-height",
		values: heightValues,
		variants: standardPreset,
	},

	"min-height": {
		prefix: "min-h",
		properties: ["min-height"],
		slug: "height#min-height",
		values: heightValues,
		variants: standardPreset,
	},

	margin: {
		prefix: "m",
		properties: ["margin"],
		slug: "margin",
		values: marginValues,
		variants: standardPreset,
	},

	"margin-block-end": {
		prefix: "mbe",
		properties: ["margin-block-end"],
		slug: "margin#block-end",
		values: marginValues,
		variants: standardPreset,
	},

	"margin-block-start": {
		prefix: "mbs",
		properties: ["margin-block-start"],
		slug: "margin#block-start",
		values: marginValues,
		variants: standardPreset,
	},

	"margin-bottom": {
		prefix: "mb",
		properties: ["margin-bottom"],
		slug: "margin#bottom",
		values: marginValues,
		variants: standardPreset,
	},

	"margin-inline-end": {
		prefix: "mie",
		properties: ["margin-inline-end"],
		slug: "margin#inline-end",
		values: marginValues,
		variants: standardPreset,
	},

	"margin-inline-start": {
		prefix: "mis",
		properties: ["margin-inline-start"],
		slug: "margin#inline-start",
		values: marginValues,
		variants: standardPreset,
	},

	"margin-left": {
		prefix: "ml",
		properties: ["margin-left"],
		slug: "margin#left",
		values: marginValues,
		variants: standardPreset,
	},

	"margin-right": {
		prefix: "mr",
		properties: ["margin-right"],
		slug: "margin#right",
		values: marginValues,
		variants: standardPreset,
	},

	"margin-top": {
		prefix: "mt",
		properties: ["margin-top"],
		slug: "margin#top",
		values: marginValues,
		variants: standardPreset,
	},

	"margin-inline": {
		prefix: "mx",
		properties: ["margin-inline"],
		slug: "margin#margin-inline",
		values: marginValues,
		variants: standardPreset,
	},

	"margin-block": {
		prefix: "my",
		properties: ["margin-block"],
		slug: "margin#margin-block",
		values: marginValues,
		variants: standardPreset,
	},

	padding: {
		prefix: "p",
		properties: ["padding"],
		slug: "padding",
		values: paddingValues,
		variants: standardPreset,
	},

	"padding-block-end": {
		prefix: "pbe",
		properties: ["padding-block-end"],
		slug: "padding#block-end",
		values: paddingValues,
		variants: standardPreset,
	},

	"padding-block-start": {
		prefix: "pbs",
		properties: ["padding-block-start"],
		slug: "padding#block-start",
		values: paddingValues,
		variants: standardPreset,
	},

	"padding-bottom": {
		prefix: "pb",
		properties: ["padding-bottom"],
		slug: "padding#bottom",
		values: paddingValues,
		variants: standardPreset,
	},

	"padding-inline-end": {
		prefix: "pie",
		properties: ["padding-inline-end"],
		slug: "padding#inline-end",
		values: paddingValues,
		variants: standardPreset,
	},

	"padding-inline-start": {
		prefix: "pis",
		properties: ["padding-inline-start"],
		slug: "padding#inline-start",
		values: paddingValues,
		variants: standardPreset,
	},

	"padding-left": {
		prefix: "pl",
		properties: ["padding-left"],
		slug: "padding#left",
		values: paddingValues,
		variants: standardPreset,
	},

	"padding-right": {
		prefix: "pr",
		properties: ["padding-right"],
		slug: "padding#right",
		values: paddingValues,
		variants: standardPreset,
	},

	"padding-top": {
		prefix: "pt",
		properties: ["padding-top"],
		slug: "padding#top",
		values: paddingValues,
		variants: standardPreset,
	},

	"padding-inline": {
		prefix: "px",
		properties: ["padding-inline"],
		slug: "padding#padding-inline",
		values: paddingValues,
		variants: standardPreset,
	},

	"padding-block": {
		prefix: "py",
		properties: ["padding-block"],
		slug: "padding#padding-block",
		values: paddingValues,
		variants: standardPreset,
	},

	width: {
		prefix: "w",
		properties: ["width"],
		slug: "width",
		values: widthValues,
		variants: standardPreset,
	},

	"max-width": {
		prefix: "max-w",
		properties: ["max-width"],
		slug: "width#max-width",
		values: widthValues,
		variants: standardPreset,
	},

	"min-width": {
		prefix: "min-w",
		properties: ["min-width"],
		slug: "width#min-width",
		values: widthValues,
		variants: standardPreset,
	},
};

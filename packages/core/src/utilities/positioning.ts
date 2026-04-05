import { topRightBottomLeftValues } from "@/defaults/values";
import { base } from "@/defaults/variants/stacks";
import type { Utilities } from "@/interfaces";

export const positioning: Utilities = {
	bottom: {
		prefix: "b",
		properties: ["bottom"],
		slug: "bottom",
		values: topRightBottomLeftValues,
		variants: base,
	},

	inset: {
		prefix: "i",
		properties: ["inset"],
		slug: "inset",
		values: topRightBottomLeftValues,
		variants: base,
	},

	"inset-x": {
		prefix: "ix",
		properties: ["left", "right"],
		slug: "inset-x",
		values: topRightBottomLeftValues,
		variants: base,
	},

	"inset-y": {
		prefix: "iy",
		properties: ["top", "bottom"],
		slug: "inset-y",
		values: topRightBottomLeftValues,
		variants: base,
	},

	left: {
		prefix: "l",
		properties: ["left"],
		slug: "left",
		values: topRightBottomLeftValues,
		variants: base,
	},

	right: {
		prefix: "r",
		properties: ["right"],
		slug: "right",
		values: topRightBottomLeftValues,
		variants: base,
	},

	top: {
		prefix: "t",
		properties: ["top"],
		slug: "top",
		values: topRightBottomLeftValues,
		variants: base,
	},

	"object-fit": {
		prefix: "of",
		properties: ["object-fit"],
		slug: "object-fit",
		values: {
			c: "cover",
			f: "fill",
			none: "none",
			sd: "scale-down",
		},
		variants: base,
	},

	"object-position": {
		prefix: "op",
		properties: ["object-position"],
		slug: "object-position",
		values: {
			b: "bottom",
			c: "center",
			l: "left",
			lb: "left bottom",
			lt: "left top",
			r: "right",
			rb: "right bottom",
			rt: "right top",
			t: "top",
		},
		variants: base,
	},

	overflow: {
		prefix: "o",
		properties: ["overflow"],
		slug: "overflow",
		values: {
			auto: "auto",
			c: "clip",
			h: "hidden",
			s: "scroll",
			v: "visible",
		},
		variants: base,
	},

	"overflow-x": {
		prefix: "ox",
		properties: ["overflow-x"],
		slug: "overflow-x",
		values: {
			auto: "auto",
			c: "clip",
			h: "hidden",
			s: "scroll",
			v: "visible",
		},
		variants: base,
	},

	"overflow-y": {
		prefix: "oy",
		properties: ["overflow-y"],
		slug: "overflow-y",
		values: {
			auto: "auto",
			c: "clip",
			h: "hidden",
			s: "scroll",
			v: "visible",
		},
		variants: base,
	},

	position: {
		prefix: "p",
		properties: ["position"],
		slug: "position",
		values: {
			a: "absolute",
			f: "fixed",
			r: "relative",
			s: "static",
			st: "sticky",
		},
		variants: base,
	},

	visibility: {
		prefix: "v",
		properties: ["visibility"],
		slug: "visibility",
		values: {
			c: "collapse",
			h: "hidden",
			v: "visible",
		},
		variants: base,
	},

	"z-index": {
		prefix: "zi",
		properties: ["z-index"],
		slug: "z-index",
		values: {
			"0": "0",
			"10": "10",
			"20": "20",
			"30": "30",
			"40": "40",
			"50": "50",
			"60": "60",
			"70": "70",
			"80": "80",
			"90": "90",
			"9999": "9999",
			auto: "auto",
		},
		variants: base,
	},
};

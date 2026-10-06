import { topRightBottomLeftValues } from "@/defaults/values";
import { variants } from "@/defaults/variants/stacks";
import type { Utilities } from "@/interfaces";

export const positioning: Utilities = {
	bottom: {
		prefix: "b",
		properties: ["bottom"],
		slug: "bottom",
		values: topRightBottomLeftValues,
		variants,
	},

	inset: {
		prefix: "i",
		properties: ["inset"],
		slug: "inset",
		values: topRightBottomLeftValues,
		variants,
	},

	"inset-x": {
		prefix: "ix",
		properties: ["left", "right"],
		slug: "inset-x",
		values: topRightBottomLeftValues,
		variants,
	},

	"inset-y": {
		prefix: "iy",
		properties: ["top", "bottom"],
		slug: "inset-y",
		values: topRightBottomLeftValues,
		variants,
	},

	left: {
		prefix: "l",
		properties: ["left"],
		slug: "left",
		values: topRightBottomLeftValues,
		variants,
	},

	right: {
		prefix: "r",
		properties: ["right"],
		slug: "right",
		values: topRightBottomLeftValues,
		variants,
	},

	top: {
		prefix: "t",
		properties: ["top"],
		slug: "top",
		values: topRightBottomLeftValues,
		variants,
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
		variants,
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
		variants,
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
		variants,
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
		variants,
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
		variants,
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
		variants,
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
		variants,
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
		variants,
	},
};

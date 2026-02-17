import { topRightBottomLeftValues } from "@/defaults/values";
import { standard } from "@/defaults/variants/presets";
import { createValues } from "@/helpers/create-values";
import type { Utilities } from "@/interfaces";

export const positioning: Utilities = {
	"aspect-ratio": {
		prefix: "ar",
		properties: ["aspect-ratio"],
		slug: "aspect-ratio",
		values: {
			auto: "auto",
			"1/1": "1/1",
			"1/2": "1/2",
			"2/1": "2/1",
			"2/3": "2/3",
			"3/2": "3/2",
			"3/4": "3/4",
			"4/3": "4/3",
			"4/5": "4/5",
			"5/4": "5/4",
			"5/7": "5/7",
			"7/5": "7/5",
			"9/16": "9/16",
			"16/9": "16/9",
			"21/9": "21/9",
			"9/21": "9/21",
		},
		variants: standard,
	},

	clear: {
		prefix: "cl",
		properties: ["clear"],
		slug: "clear",
		values: {
			b: "both",
			ie: "inline-end",
			is: "inline-start",
			l: "left",
			none: "none",
			r: "right",
		},
		variants: standard,
	},

	columns: {
		prefix: "c",
		properties: ["columns"],
		slug: "columns",
		values: createValues({
			base: 1,
			min: 1,
			max: 16,
		}),
		variants: standard,
	},

	bottom: {
		prefix: "b",
		properties: ["bottom"],
		slug: "bottom",
		values: topRightBottomLeftValues,
		variants: standard,
	},

	inset: {
		prefix: "i",
		properties: ["inset"],
		slug: "inset",
		values: topRightBottomLeftValues,
		variants: standard,
	},

	"inset-x": {
		prefix: "ix",
		properties: ["left", "right"],
		slug: "inset-x",
		values: topRightBottomLeftValues,
		variants: standard,
	},

	"inset-y": {
		prefix: "iy",
		properties: ["top", "bottom"],
		slug: "inset-y",
		values: topRightBottomLeftValues,
		variants: standard,
	},

	isolation: {
		prefix: "is",
		properties: ["isolation"],
		slug: "isolation",
		values: {
			auto: "auto",
			i: "isolate",
		},
		variants: standard,
	},

	left: {
		prefix: "l",
		properties: ["left"],
		slug: "left",
		values: topRightBottomLeftValues,
		variants: standard,
	},

	right: {
		prefix: "r",
		properties: ["right"],
		slug: "right",
		values: topRightBottomLeftValues,
		variants: standard,
	},

	top: {
		prefix: "t",
		properties: ["top"],
		slug: "top",
		values: topRightBottomLeftValues,
		variants: standard,
	},

	display: {
		prefix: "d",
		properties: ["display"],
		slug: "display",
		values: {
			b: "block",
			f: "flex",
			fr: "flow-root",
			g: "grid",
			i: "inline",
			ib: "inline-block",
			if: "inline-flex",
			ig: "inline-grid",
			it: "inline-table",
			none: "none",
			t: "table",
			tc: "table-cell",
			tco: "table-column",
			tr: "table-row",
		},
		variants: standard,
	},

	float: {
		prefix: "fl",
		properties: ["float"],
		slug: "float",
		values: {
			ie: "inline-end",
			is: "inline-start",
			l: "left",
			none: "none",
			r: "right",
		},
		variants: standard,
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
		variants: standard,
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
		variants: standard,
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
		variants: standard,
	},

	"overflow-x": {
		prefix: "o-x",
		properties: ["overflow-x"],
		slug: "overflow-x",
		values: {
			auto: "auto",
			c: "clip",
			h: "hidden",
			s: "scroll",
			v: "visible",
		},
		variants: standard,
	},

	"overflow-y": {
		prefix: "o-y",
		properties: ["overflow-y"],
		slug: "overflow-y",
		values: {
			auto: "auto",
			c: "clip",
			h: "hidden",
			s: "scroll",
			v: "visible",
		},
		variants: standard,
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
		variants: standard,
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
		variants: standard,
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
			auto: "auto",
		},
		variants: standard,
	},
};

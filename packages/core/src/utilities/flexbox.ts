import { flexGrowShrinkValues } from "@/defaults/values";
import { flexBasis } from "@/defaults/variables";
import { base } from "@/defaults/variants/stacks";
import { createValues } from "@/helpers/create-values";
import type { Utilities } from "@/interfaces";

export const flexbox: Utilities = {
	"align-content": {
		prefix: "ac",
		properties: ["align-content"],
		slug: "align-content",
		values: {
			b: "baseline",
			c: "center",
			fe: "flex-end",
			fs: "flex-start",
			n: "normal",
			s: "stretch",
			sa: "space-around",
			sb: "space-between",
			se: "space-evenly",
		},
		variants: base,
	},

	"align-items": {
		prefix: "ai",
		properties: ["align-items"],
		slug: "align-items",
		values: {
			b: "baseline",
			c: "center",
			fe: "flex-end",
			fs: "flex-start",
			s: "stretch",
		},
		variants: base,
	},

	"align-self": {
		prefix: "as",
		properties: ["align-self"],
		slug: "align-self",
		values: {
			auto: "auto",
			b: "baseline",
			c: "center",
			fe: "flex-end",
			fs: "flex-start",
			s: "stretch",
		},
		variants: base,
	},

	"flex-basis": {
		prefix: "fb",
		properties: ["flex-basis"],
		slug: "flex-basis",
		values: {
			...createValues({
				base: flexBasis,
				unit: "rem",
				min: 0,
				max: 100,
			}),
			auto: "auto",
			full: "100%",
			half: "50%",
		},
		variants: base,
	},

	"flex-direction": {
		prefix: "fd",
		properties: ["flex-direction"],
		slug: "flex-direction",
		values: {
			c: "column",
			cr: "column-reverse",
			r: "row",
			rr: "row-reverse",
		},
		variants: base,
	},

	"flex-grow": {
		prefix: "fg",
		properties: ["flex-grow"],
		slug: "flex-grow",
		values: flexGrowShrinkValues,
		variants: base,
	},

	"flex-shrink": {
		prefix: "fs",
		properties: ["flex-shrink"],
		slug: "flex-shrink",
		values: flexGrowShrinkValues,
		variants: base,
	},

	"flex-wrap": {
		prefix: "fw",
		properties: ["flex-wrap"],
		slug: "flex-wrap",
		values: {
			nw: "nowrap",
			w: "wrap",
			wr: "wrap-reverse",
		},
		variants: base,
	},

	flex: {
		prefix: "f",
		properties: ["flex"],
		slug: "flex",
		values: {
			"1": "1",
			"2": "2",
			"3": "3",
			"4": "4",
			"5": "5",
			"6": "6",
			auto: "auto",
			none: "none",
		},
		variants: base,
	},

	"justify-content": {
		prefix: "jc",
		properties: ["justify-content"],
		slug: "justify-content",
		values: {
			c: "center",
			fe: "flex-end",
			fs: "flex-start",
			n: "normal",
			s: "stretch",
			sa: "space-around",
			sb: "space-between",
			se: "space-evenly",
		},
		variants: base,
	},

	"justify-items": {
		prefix: "ji",
		properties: ["justify-items"],
		slug: "justify-items",
		values: {
			c: "center",
			e: "end",
			s: "start",
			st: "stretch",
		},
		variants: base,
	},

	"justify-self": {
		prefix: "js",
		properties: ["justify-self"],
		slug: "justify-self",
		values: {
			auto: "auto",
			c: "center",
			e: "end",
			s: "start",
			st: "stretch",
		},
		variants: base,
	},

	order: {
		prefix: "or",
		properties: ["order"],
		slug: "order",
		values: {
			l: "-9999",
			"0": "0",
			"1": "1",
			"2": "2",
			"3": "3",
			"4": "4",
			"5": "5",
			"6": "6",
			"7": "7",
			"8": "8",
			"9": "9",
			"10": "10",
			f: "9999",
		},
		variants: base,
	},
};

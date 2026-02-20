import { base } from "@/defaults/variants/stacks";
import { createValues } from "@/helpers/create-values";
import type { Utilities } from "@/interfaces";

export const layout: Utilities = {
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
		variants: base,
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
		variants: base,
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
		variants: base,
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
		variants: base,
	},

	isolation: {
		prefix: "is",
		properties: ["isolation"],
		slug: "isolation",
		values: {
			auto: "auto",
			i: "isolate",
		},
		variants: base,
	},
};

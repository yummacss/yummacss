import {
	gapValues,
	gridAutoValues,
	gridValues,
	repeatValues,
	spanValues,
} from "@/defaults/values";
import { variants } from "@/defaults/variants/stacks";
import type { Utilities } from "@/interfaces";

export const grid: Utilities = {
	"column-gap": {
		prefix: "cg",
		properties: ["column-gap"],
		slug: "column-gap",
		values: gapValues,
		variants,
	},

	gap: {
		prefix: "g",
		properties: ["gap"],
		slug: "gap",
		values: gapValues,
		variants,
	},

	"grid-auto-columns": {
		prefix: "gac",
		properties: ["grid-auto-columns"],
		slug: "grid-auto-columns",
		values: gridAutoValues,
		variants,
	},

	"grid-auto-flow": {
		prefix: "gaf",
		properties: ["grid-auto-flow"],
		slug: "grid-auto-flow",
		values: {
			c: "column",
			cd: "column dense",
			d: "dense",
			r: "row",
			rd: "row dense",
		},
		variants,
	},

	"grid-auto-rows": {
		prefix: "gar",
		properties: ["grid-auto-rows"],
		slug: "grid-auto-rows",
		values: gridAutoValues,
		variants,
	},

	"grid-column": {
		prefix: "gc-s",
		properties: ["grid-column"],
		slug: "grid-column",
		values: spanValues,
		variants,
	},

	"grid-column-end": {
		prefix: "gce",
		properties: ["grid-column-end"],
		slug: "grid-column-end",
		values: gridValues,
		variants,
	},

	"grid-column-start": {
		prefix: "gcs",
		properties: ["grid-column-start"],
		slug: "grid-column-start",
		values: gridValues,
		variants,
	},

	"grid-row": {
		prefix: "gr-s",
		properties: ["grid-row"],
		slug: "grid-row",
		values: spanValues,
		variants,
	},

	"grid-row-end": {
		prefix: "gre",
		properties: ["grid-row-end"],
		slug: "grid-row-end",
		values: gridValues,
		variants,
	},

	"grid-row-start": {
		prefix: "grs",
		properties: ["grid-row-start"],
		slug: "grid-row-start",
		values: gridValues,
		variants,
	},

	"grid-template-columns": {
		prefix: "gtc",
		properties: ["grid-template-columns"],
		slug: "grid-template-columns",
		values: repeatValues,
		variants,
	},

	"grid-template-rows": {
		prefix: "gtr",
		properties: ["grid-template-rows"],
		slug: "grid-template-rows",
		values: repeatValues,
		variants,
	},

	"place-content": {
		prefix: "pc",
		properties: ["place-content"],
		slug: "place-content",
		values: {
			bs: "baseline start",
			c: "center",
			e: "end",
			s: "start",
			sa: "space-around",
			sb: "space-between",
			se: "space-evenly",
			ss: "stretch stretch",
		},
		variants,
	},

	"place-items": {
		prefix: "pi",
		properties: ["place-items"],
		slug: "place-items",
		values: {
			b: "baseline",
			c: "center",
			e: "end",
			s: "start",
			ss: "stretch stretch",
		},
		variants,
	},

	"place-self": {
		prefix: "ps",
		properties: ["place-self"],
		slug: "place-self",
		values: {
			auto: "auto",
			c: "center",
			e: "end",
			s: "start",
			st: "stretch",
		},
		variants,
	},

	"row-gap": {
		prefix: "rg",
		properties: ["row-gap"],
		slug: "row-gap",
		values: gapValues,
		variants,
	},
};

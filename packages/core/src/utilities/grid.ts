import {
	gapValues,
	gridAutoValues,
	gridValues,
	repeatValues,
	spanValues,
} from "@/defaults/values";
import { standard } from "@/defaults/variants/presets";
import type { Utilities } from "@/interfaces";

export const grid: Utilities = {
	"column-gap": {
		prefix: "cg",
		properties: ["column-gap"],
		slug: "column-gap",
		values: gapValues,
		variants: standard,
	},

	gap: {
		prefix: "g",
		properties: ["gap"],
		slug: "gap",
		values: gapValues,
		variants: standard,
	},

	"grid-auto-columns": {
		prefix: "gac",
		properties: ["grid-auto-columns"],
		slug: "grid-auto-columns",
		values: gridAutoValues,
		variants: standard,
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
		variants: standard,
	},

	"grid-auto-rows": {
		prefix: "gar",
		properties: ["grid-auto-rows"],
		slug: "grid-auto-rows",
		values: gridAutoValues,
		variants: standard,
	},

	"grid-column": {
		prefix: "gc-s",
		properties: ["grid-column"],
		slug: "grid-column",
		values: spanValues,
		variants: standard,
	},

	"grid-column-end": {
		prefix: "gce",
		properties: ["grid-column-end"],
		slug: "grid-column-end",
		values: gridValues,
		variants: standard,
	},

	"grid-column-start": {
		prefix: "gcs",
		properties: ["grid-column-start"],
		slug: "grid-column-start",
		values: gridValues,
		variants: standard,
	},

	"grid-row": {
		prefix: "gr-s",
		properties: ["grid-row"],
		slug: "grid-row",
		values: spanValues,
		variants: standard,
	},

	"grid-row-end": {
		prefix: "gre",
		properties: ["grid-row-end"],
		slug: "grid-row-end",
		values: gridValues,
		variants: standard,
	},

	"grid-row-start": {
		prefix: "grs",
		properties: ["grid-row-start"],
		slug: "grid-row-start",
		values: gridValues,
		variants: standard,
	},

	"grid-template-columns": {
		prefix: "gtc",
		properties: ["grid-template-columns"],
		slug: "grid-template-columns",
		values: repeatValues,
		variants: standard,
	},

	"grid-template-rows": {
		prefix: "gtr",
		properties: ["grid-template-rows"],
		slug: "grid-template-rows",
		values: repeatValues,
		variants: standard,
	},

	"place-content": {
		prefix: "pc",
		properties: ["place-content"],
		slug: "place-content",
		values: {
			b: "baseline",
			c: "center",
			e: "end",
			s: "start",
			sa: "space-around",
			sb: "space-between",
			se: "space-evenly",
			st: "stretch",
		},
		variants: standard,
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
			st: "stretch",
		},
		variants: standard,
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
		variants: standard,
	},

	"row-gap": {
		prefix: "rg",
		properties: ["row-gap"],
		slug: "row-gap",
		values: gapValues,
		variants: standard,
	},
};

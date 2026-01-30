import { gapValues, repeatValues, spanValues } from "@/defaults/values";
import { standardPreset } from "@/defaults/variants/presets";
import { createValues } from "@/helpers/create-values";
import type { Utilities } from "@/interfaces";

export const grid: Utilities = {
	"column-gap": {
		prefix: "cg",
		properties: ["column-gap"],
		slug: "column-gap",
		values: gapValues,
		variants: standardPreset,
	},

	gap: {
		prefix: "g",
		properties: ["gap"],
		slug: "gap",
		values: gapValues,
		variants: standardPreset,
	},

	"grid-auto-columns": {
		prefix: "gac",
		properties: ["grid-auto-columns"],
		slug: "grid-auto-columns",
		values: {
			auto: "auto",
			max: "max-content",
			min: "min-content",
		},
		variants: standardPreset,
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
		variants: standardPreset,
	},

	"grid-auto-rows": {
		prefix: "gar",
		properties: ["grid-auto-rows"],
		slug: "grid-auto-rows",
		values: {
			auto: "auto",
			max: "max-content",
			min: "min-content",
		},
		variants: standardPreset,
	},

	"grid-column": {
		prefix: "gc-s",
		properties: ["grid-column"],
		slug: "grid-column",
		values: spanValues,
		variants: standardPreset,
	},

	"grid-column-end": {
		prefix: "gce",
		properties: ["grid-column-end"],
		slug: "grid-column-end",
		values: createValues({
			base: 1,
			min: 1,
			max: 16,
		}),
		variants: standardPreset,
	},

	"grid-column-start": {
		prefix: "gcs",
		properties: ["grid-column-start"],
		slug: "grid-column-start",
		values: createValues({
			base: 1,
			min: 1,
			max: 16,
		}),
		variants: standardPreset,
	},

	"grid-row": {
		prefix: "gr-s",
		properties: ["grid-row"],
		slug: "grid-row",
		values: spanValues,
		variants: standardPreset,
	},

	"grid-row-end": {
		prefix: "gre",
		properties: ["grid-row-end"],
		slug: "grid-row-end",
		values: createValues({
			base: 1,
			min: 1,
			max: 16,
		}),
		variants: standardPreset,
	},

	"grid-row-start": {
		prefix: "grs",
		properties: ["grid-row-start"],
		slug: "grid-row-start",
		values: createValues({
			base: 1,
			min: 1,
			max: 16,
		}),
		variants: standardPreset,
	},

	"grid-template-columns": {
		prefix: "gtc",
		properties: ["grid-template-columns"],
		slug: "grid-template-columns",
		values: repeatValues,
		variants: standardPreset,
	},

	"grid-template-rows": {
		prefix: "gtr",
		properties: ["grid-template-rows"],
		slug: "grid-template-rows",
		values: repeatValues,
		variants: standardPreset,
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
		variants: standardPreset,
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
		variants: standardPreset,
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
		variants: standardPreset,
	},

	"row-gap": {
		prefix: "rg",
		properties: ["row-gap"],
		slug: "row-gap",
		values: gapValues,
		variants: standardPreset,
	},
};

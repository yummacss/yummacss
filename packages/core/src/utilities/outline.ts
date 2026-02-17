import { outlineOffset, outlineWidth } from "@/defaults/variables";
import { standard } from "@/defaults/variants/presets";
import { createValues } from "@/helpers/create-values";
import type { Utilities } from "@/interfaces";

export const outline: Utilities = {
	"outline-offset": {
		prefix: "oo",
		properties: ["outline-offset"],
		slug: "outline-offset",
		values: createValues({
			base: outlineOffset,
			unit: "px",
			min: 0,
			max: 4,
		}),
		variants: standard,
	},

	"outline-style": {
		prefix: "os",
		properties: ["outline-style"],
		slug: "outline-style",
		values: {
			none: "none",
			d: "dashed",
			s: "solid",
		},
		variants: standard,
	},

	"outline-width": {
		prefix: "ow",
		properties: ["outline-width"],
		slug: "outline-width",
		values: createValues({
			base: outlineWidth,
			unit: "px",
			min: 0,
			max: 4,
		}),
		variants: standard,
	},
};

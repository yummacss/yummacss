import { outlineOffset, outlineWidth } from "@/defaults/variables";
import { variants } from "@/defaults/variants/stacks";
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
		variants,
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
		variants,
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
		variants,
	},
};

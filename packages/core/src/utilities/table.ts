import { base } from "@/defaults/variants/stacks";
import type { Utilities } from "@/interfaces";

export const table: Utilities = {
	"caption-side": {
		prefix: "cs",
		properties: ["caption-side"],
		slug: "caption-side",
		values: {
			t: "top",
			b: "bottom",
		},
		variants: base,
	},

	"table-layout": {
		prefix: "tl",
		properties: ["table-layout"],
		slug: "table-layout",
		values: {
			a: "auto",
			f: "fixed",
		},
		variants: base,
	},
};

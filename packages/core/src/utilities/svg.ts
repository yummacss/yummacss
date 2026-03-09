import { base } from "@/defaults/variants/stacks";
import type { Utilities } from "@/interfaces";
export const svg: Utilities = {
	"stroke-width": {
		prefix: "sw",
		properties: ["stroke-width"],
		slug: "stroke-width",
		values: {
			"0": "0",
			"2": ".2",
			"4": ".4",
			"6": ".6",
			"8": ".8",
			"10": "1",
		},
		variants: base,
	},
};

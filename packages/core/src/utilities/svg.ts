import { base } from "@/defaults/variants/stacks";
import type { Utilities } from "@/interfaces";
export const svg: Utilities = {
	"stroke-width": {
		prefix: "sw",
		properties: ["stroke-width"],
		slug: "stroke-width",
		values: {
			"0": "0",
			"2": ".2px", 
			"4": ".4px", 
			"6": ".6px", 
			"8": ".8px", 
			"10": "1px"
		},
		variants: base,
	},
};

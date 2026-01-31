import { createValues } from "@/helpers/create-values";

export const flexGrowShrinkValues: Record<string, string> = {
	...createValues({
		base: 1,
		min: 0,
		max: 8,
	}),
};

import { createValues } from "@/helpers/create-values";

export const transitionValues: Record<string, string> = {
	...createValues({
		base: 50,
		unit: "ms",
		min: 0,
		max: 20,
	}),
};

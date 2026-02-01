import { createValues } from "@/helpers/create-values";

/**
 * Millisecond-based transition values.
 * Keys directly represent the millisecond value (e.g., "150" = 150ms).
 * Scale: 0 to 1000ms in steps of 50.
 */
export const transitionValues = createValues({
	base: 1,
	unit: "ms",
	min: 0,
	max: 1000,
	step: 50,
	keyAsValue: true,
});

import { createValues } from "@/helpers/create-values";

export const transitionValues = createValues({
	base: 1,
	unit: "ms",
	min: 0,
	max: 1000,
	step: 50,
	keyAsValue: true,
});

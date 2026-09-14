import { createColors } from "@/helpers/create-colors";
import { black, current, transparent, white } from "../variables";

const colors = createColors();

export const colorValues = {
	...colors,
	black,
	current,
	transparent,
	white,
};

export const colorSchemeValues: Record<string, string> = {
	d: "dark",
	l: "light",
	ld: "light dark",
};

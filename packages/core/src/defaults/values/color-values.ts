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

/**
 * `normal` is deliberately absent: it would want the `n` prefix, which
 * `corner-shape` already uses on the shared `cs` utility prefix.
 */
export const colorSchemeValues: Record<string, string> = {
	d: "dark",
	l: "light",
	ld: "light dark",
};

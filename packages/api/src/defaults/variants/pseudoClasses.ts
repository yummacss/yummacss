import type { PseudoClass } from "@/interfaces/variant";

export const pseudoClasses: PseudoClass[] = [
	{ prefix: "a", value: ":active" },
	{ prefix: "f", value: ":focus" },
	{ prefix: "fv", value: ":focus-visible" },
	{ prefix: "fw", value: ":focus-within" },
	{ prefix: "h", value: ":hover" },
];

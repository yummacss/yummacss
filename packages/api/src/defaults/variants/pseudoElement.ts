import type { PseudoElement } from "@/interfaces/variant";

export const pseudoElements: PseudoElement[] = [
	{ prefix: "a", value: "::after" },
	{ prefix: "b", value: "::before" },
	{ prefix: "p", value: "::placeholder" },
	{ prefix: "s", value: "::selection" },
];

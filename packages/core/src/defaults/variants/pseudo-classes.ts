import type { PseudoClass } from "@/interfaces/variants";

export const pseudoClasses: PseudoClass[] = [
	{ prefix: "a", value: ":active" },
	{ prefix: "c", value: ":checked" },
	{ prefix: "d", value: ":disabled" },
	{ prefix: "e", value: ":empty" },
	{ prefix: "f", value: ":focus" },
	{ prefix: "fc", value: ":first-child" },
	{ prefix: "fv", value: ":focus-visible" },
	{ prefix: "fw", value: ":focus-within" },
	{ prefix: "h", value: ":hover" },
	{ prefix: "i", value: ":invalid" },
	{ prefix: "in", value: ":indeterminate" },
	{ prefix: "lc", value: ":last-child" },
	{ prefix: "nc", value: ":nth-child" },
	{ prefix: "r", value: ":required" },
	{ prefix: "ro", value: ":read-only" },
	{ prefix: "v", value: ":valid" },
];

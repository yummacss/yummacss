import type { MediaQuery } from "@/interfaces/variants";

export const mediaQueries: MediaQuery[] = [
	{ prefix: "pc", value: "@media (pointer: coarse)" },
	{ prefix: "sm", value: "@media (width >= 40rem)" },
	{ prefix: "md", value: "@media (width >= 48rem)" },
	{ prefix: "lg", value: "@media (width >= 64rem)" },
	{ prefix: "xl", value: "@media (width >= 80rem)" },
	{ prefix: "xxl", value: "@media (width >= 96rem)" },
];

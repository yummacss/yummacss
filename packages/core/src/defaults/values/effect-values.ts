import { blur } from "../variables";

export const blurValues: Record<string, string> = {
	none: `blur(${blur * 0}px)`,
	xs: `blur(${blur}px)`,
	sm: `blur(${blur * 2}px)`,
	md: `blur(${blur * 4}px)`,
	lg: `blur(${blur * 8}px)`,
	xl: `blur(${blur * 16}px)`,
};

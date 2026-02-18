import { blur, grayscale } from "../variables";

export const blurValues: Record<string, string> = {
	none: `blur(${blur * 0}px)`,
	xs: `blur(${blur}px)`,
	sm: `blur(${blur * 2}px)`,
	md: `blur(${blur * 4}px)`,
	lg: `blur(${blur * 8}px)`,
	xl: `blur(${blur * 16}px)`,
};

export const grayscaleValues: Record<string, string> = {
	0: `grayscale(${grayscale * 0}%)`,
	10: `grayscale(${grayscale}%)`,
	20: `grayscale(${grayscale * 2}%)`,
	30: `grayscale(${grayscale * 3}%)`,
	40: `grayscale(${grayscale * 4}%)`,
	50: `grayscale(${grayscale * 5}%)`,
	60: `grayscale(${grayscale * 6}%)`,
	70: `grayscale(${grayscale * 7}%)`,
	80: `grayscale(${grayscale * 8}%)`,
	90: `grayscale(${grayscale * 9}%)`,
	100: `grayscale(100%)`,
};

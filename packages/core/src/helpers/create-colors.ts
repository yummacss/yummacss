import {
	clampChroma,
	converter,
	modeHsl,
	modeHwb,
	modeLab,
	modeLch,
	modeOklab,
	modeOklch,
	modeRgb,
	type Oklch,
	useMode,
} from "culori/fn";
import { colorTheme } from "@/defaults/theme";

/** A theme color that differs per color scheme, compiled to `light-dark()`. */
export type ColorPair = { light: string; dark: string };
/** A theme color: one value, or a `{ light, dark }` pair. */
export type ColorValue = string | ColorPair;

/** Whether a theme color is a pair rather than a single value. */
export const isColorPair = (value: ColorValue): value is ColorPair =>
	typeof value === "object" &&
	value !== null &&
	typeof (value as ColorPair).light === "string" &&
	typeof (value as ColorPair).dark === "string";

// only the color spaces a CSS color can be written in, so the rest stay out of the bundle
for (const mode of [
	modeRgb,
	modeHsl,
	modeHwb,
	modeLab,
	modeLch,
	modeOklab,
	modeOklch,
]) {
	useMode(mode);
}
const oklch = converter("oklch");

const LIGHTEST = 0.97;
const DARKEST = 0.22;

const trim = (n: number): string =>
	n
		.toFixed(3)
		.replace(/\.?0+$/, "")
		.replace(/^0\./, ".")
		.replace(/^-0\./, "-.") || "0";

/** Writes a color as a short `oklch()`, with alpha only when it is not opaque. */
const format = ({ l, c, h, alpha }: Oklch): string => {
	const hue = c < 0.0005 || h === undefined ? 0 : Math.round(h);
	const a = alpha !== undefined && alpha < 1 ? ` / ${trim(alpha)}` : "";
	return `oklch(${trim(l)} ${trim(c)} ${hue}${a})`;
};

/**
 * Builds the 13 shades for a color in OKLCH: six lighter, the color itself,
 * six darker, each half evenly spaced in lightness, with chroma easing toward
 * the ends. The percentages scale how far the ends travel; 14 is the default.
 */
export const generateShades = (
	color: string,
	lightPercentage: number = 14,
	darkPercentage: number = 14,
): string[] => {
	const base = oklch(color);
	if (!base) throw new Error(`Yumma CSS could not read the color "${color}"`);
	const lightest = Math.min(
		base.l + (LIGHTEST - base.l) * (lightPercentage / 14),
		1,
	);
	const darkest = Math.max(
		base.l + (DARKEST - base.l) * (darkPercentage / 14),
		0,
	);

	return Array.from({ length: 13 }, (_, i) => {
		if (i === 6) return format(base);
		const t = i < 6 ? (6 - i) / 6 : (i - 6) / 6;
		const end = i < 6 ? lightest : darkest;
		const shade = clampChroma(
			{
				mode: "oklch",
				l: base.l + (end - base.l) * t,
				c: (base.c ?? 0) * (1 - 0.75 * t * t),
				h: base.h,
				alpha: base.alpha,
			},
			"oklch",
		);
		return format(shade);
	});
};

/** Builds both sides of a pair step for step, so shade N is a `light-dark()`. */
export const generatePairedShades = (
	pair: ColorPair,
	lightPercentage?: number,
	darkPercentage?: number,
): string[] => {
	const light = generateShades(pair.light, lightPercentage, darkPercentage);
	const dark = generateShades(pair.dark, lightPercentage, darkPercentage);

	return light.map((shade, i) => `light-dark(${shade}, ${dark[i]})`);
};

/**
 * Merges a theme's colors over the defaults and expands every one into its
 * shades. A key that collides replaces the default rather than merging with it.
 */
export const createColors = (
	userColors?: Record<string, ColorValue>,
	lightPercentage?: number,
	darkPercentage?: number,
) => {
	const colors: Record<string, string> = {};
	const mergedTheme: Record<string, ColorValue> = {
		...colorTheme,
		...userColors,
	};

	Object.entries(mergedTheme).forEach(([colorName, colorValue]) => {
		const shades = isColorPair(colorValue)
			? generatePairedShades(colorValue, lightPercentage, darkPercentage)
			: generateShades(colorValue, lightPercentage, darkPercentage);

		for (let i = 0; i < 6; i++) {
			const variantKey = `${colorName}-${i + 1}`;
			const shade = shades[i];
			if (shade) {
				colors[variantKey] = shade;
			}
		}

		const baseShade = shades[6];
		if (baseShade) {
			colors[colorName] = baseShade;
		}

		for (let i = 7; i < 13; i++) {
			const variantKey = `${colorName}-${i}`;
			const shade = shades[i];
			if (shade) {
				colors[variantKey] = shade;
			}
		}
	});

	return colors;
};

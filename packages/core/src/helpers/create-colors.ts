import {
	clampChroma,
	converter,
	formatCss,
	interpolate,
	modeHsl,
	modeHwb,
	modeLab,
	modeLch,
	modeOklab,
	modeOklch,
	modeRgb,
	type Oklch,
	round,
	samples,
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

const toThousandths = round(3);

/** A shade as CSS, rounded to what a screen can show and held inside sRGB. */
const toCss = (color: Oklch): string => {
	const { l, c, h, alpha } = clampChroma(color, "oklch") as Oklch;
	return formatCss({
		mode: "oklch",
		l: toThousandths(l),
		c: toThousandths(c),
		h: h === undefined ? undefined : Math.round(h),
		alpha,
	}) as string;
};

/**
 * Builds the 13 shades for a color in OKLCH: six lighter, the color itself,
 * six darker, each half evenly spaced in lightness, with chroma held until
 * sRGB cannot show it. The percentages scale how far the ends travel; 14 is the default.
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

	// each half is a straight OKLCH ramp from the base; toCss lowers chroma only where sRGB runs out
	const toward = (l: number) => interpolate([base, { ...base, l }], "oklch");
	const lighter = samples(7).slice(1).reverse().map(toward(lightest));
	const darker = samples(7).slice(1).map(toward(darkest));

	return [...lighter, base, ...darker].map(toCss);
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

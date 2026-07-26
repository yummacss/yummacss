import tinycolor from "tinycolor2";
import { colorTheme } from "@/defaults/theme";

/**
 * A theme color is either a single value, or a light/dark pair that resolves
 * per color scheme via CSS `light-dark()`.
 */
export type ColorPair = { light: string; dark: string };
export type ColorValue = string | ColorPair;

export const isColorPair = (value: ColorValue): value is ColorPair =>
	typeof value === "object" &&
	value !== null &&
	typeof (value as ColorPair).light === "string" &&
	typeof (value as ColorPair).dark === "string";

/**
 * Mixes a base color toward white & black to produce the 13-step scale.
 *
 * Mixing happens in sRGB, which keeps hue stable (under 10 degrees of drift
 * across every default hue) but spaces lightness unevenly on light-native
 * hues - yellow's largest step is over five times its smallest. Moving to
 * OKLCH would even that out, and is deliberately contained here: nothing
 * outside this function knows how a shade is derived.
 */
export const generateShades = (
	color: string,
	lightPercentage: number = 14,
	darkPercentage: number = 14,
): string[] => {
	const shades: string[] = [];

	for (let i = 1; i <= 6; i++) {
		const weight = (7 - i) * lightPercentage;
		const mixedColor = tinycolor.mix(color, "white", weight);
		shades.push(mixedColor.toHexString());
	}

	shades.push(tinycolor(color).toHexString());

	for (let i = 1; i <= 6; i++) {
		const weight = i * darkPercentage;
		const mixedColor = tinycolor.mix(color, "black", weight);
		shades.push(mixedColor.toHexString());
	}

	return shades;
};

/**
 * Builds the 13-step scale for a light/dark pair by scaling each side
 * independently & pairing the results step for step, so `surface-3` is the
 * third light shade in a light scheme & the third dark shade in a dark one.
 *
 * Shades are only emitted for classes that are actually used, so a pair that
 * is only ever referenced by its base name costs nothing extra.
 */
export const generatePairedShades = (
	pair: ColorPair,
	lightPercentage?: number,
	darkPercentage?: number,
): string[] => {
	const light = generateShades(pair.light, lightPercentage, darkPercentage);
	const dark = generateShades(pair.dark, lightPercentage, darkPercentage);

	return light.map((shade, i) => `light-dark(${shade}, ${dark[i]})`);
};

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

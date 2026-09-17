import tinycolor from "tinycolor2";
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

/**
 * Builds the 13 shades for a color: six mixed toward white, the color itself,
 * then six toward black. The percentages tune how far each end travels.
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

import tinycolor from "tinycolor2";
import { colorTheme } from "@/defaults/theme";

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

export const createColors = (
	userColors?: Record<string, string>,
	lightPercentage?: number,
	darkPercentage?: number,
) => {
	const colors: Record<string, string> = {};
	const mergedTheme = { ...colorTheme, ...userColors };

	Object.entries(mergedTheme).forEach(([colorName, colorValue]) => {
		const shades = generateShades(colorValue, lightPercentage, darkPercentage);

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

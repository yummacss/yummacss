import { colorTheme } from "@/defaults/theme";

interface Lab {
	L: number;
	a: number;
	b: number;
}

const toLinear = (channel: number): number => {
	const v = channel / 255;
	return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const toChannel = (value: number): number => {
	const c =
		value <= 0.0031308 ? value * 12.92 : 1.055 * value ** (1 / 2.4) - 0.055;
	return Math.round(Math.min(1, Math.max(0, c)) * 255);
};

const hexToLab = (hex: string): Lab => {
	let n = hex.trim().replace("#", "");
	if (n.length === 3) n = n[0] + n[0] + n[1] + n[1] + n[2] + n[2];
	const r = toLinear(Number.parseInt(n.slice(0, 2), 16));
	const g = toLinear(Number.parseInt(n.slice(2, 4), 16));
	const b = toLinear(Number.parseInt(n.slice(4, 6), 16));
	const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
	const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
	const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
	return {
		L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
		a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
		b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
	};
};

const labToHex = ({ L, a, b }: Lab): string => {
	const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
	const channels = [
		toChannel(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
		toChannel(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
		toChannel(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
	];
	return `#${channels.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
};

const mix = (from: Lab, to: Lab, t: number): Lab => ({
	L: from.L + (to.L - from.L) * t,
	a: from.a + (to.a - from.a) * t,
	b: from.b + (to.b - from.b) * t,
});

const WHITE: Lab = { L: 1, a: 0, b: 0 };
const BLACK: Lab = { L: 0, a: 0, b: 0 };

export type ColorPair = { light: string; dark: string };
export type ColorValue = string | ColorPair;

export const isColorPair = (value: ColorValue): value is ColorPair =>
	typeof value === "object" &&
	value !== null &&
	typeof (value as ColorPair).light === "string" &&
	typeof (value as ColorPair).dark === "string";

export const generateShades = (
	color: string,
	lightPercentage: number = 14,
	darkPercentage: number = 14,
): string[] => {
	const base = hexToLab(color);
	const shades: string[] = [];

	for (let i = 1; i <= 6; i++) {
		shades.push(labToHex(mix(base, WHITE, ((7 - i) * lightPercentage) / 100)));
	}

	shades.push(labToHex(base));

	for (let i = 1; i <= 6; i++) {
		shades.push(labToHex(mix(base, BLACK, (i * darkPercentage) / 100)));
	}

	return shades;
};

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

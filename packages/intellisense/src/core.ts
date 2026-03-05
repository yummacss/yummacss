import { coreUtils } from "@yummacss/core";
import tinycolor from "tinycolor2";

export interface UtilityInfo {
	cssValue: string;
	slug: string;
	properties: string[];
}

export interface RgbaColor {
	r: number;
	g: number;
	b: number;
	a: number;
}

export interface Suggestion {
	label: string;
	insertText: string;
	detail: string;
	isColor: boolean;
}

export function buildUtilityMap(): Map<string, UtilityInfo> {
	const map = new Map<string, UtilityInfo>();
	const allUtils = coreUtils();

	Object.values(allUtils).forEach((util: any) => {
		const slug = util.slug || "";
		const properties = util.properties || [];

		Object.entries(util.values).forEach(([suffix, cssValue]) => {
			const fullClass =
				suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
			map.set(fullClass, {
				cssValue: String(cssValue),
				slug,
				properties,
			});
		});
	});

	return map;
}

export function isHexColor(cssValue: string): boolean {
	return tinycolor(cssValue).isValid() && cssValue.trim().startsWith("#");
}

export function hexToRgba(cssValue: string): RgbaColor | null {
	const color = tinycolor(cssValue);
	if (!color.isValid()) return null;

	const { r, g, b, a } = color.toRgb();
	return { r: r / 255, g: g / 255, b: b / 255, a };
}

export function getSuggestions(): Suggestion[] {
	const allUtils = coreUtils();
	const suggestions: Suggestion[] = [];

	Object.values(allUtils).forEach((util: any) => {
		Object.entries(util.values as Record<string, string>).forEach(
			([suffix, cssValue]) => {
				const fullClass =
					suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
				const cssProperty: string = util.properties[0];

				suggestions.push({
					label: fullClass,
					insertText: fullClass,
					detail: `${cssProperty}: ${cssValue};`,
					isColor: isHexColor(String(cssValue)),
				});
			},
		);
	});

	return suggestions;
}

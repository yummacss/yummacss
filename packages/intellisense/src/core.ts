import { coreUtils, createColors } from "@yummacss/core";
// `/browser`, never the root entry: that one re-exports loadConfig & scan and
// so reaches node:fs, and this module is in the Monaco adapter's browser graph.
// Type-only, so nothing is emitted either way, but the import path is load
// bearing if it ever stops being type-only.
import type { Config } from "@yummacss/nitro/browser";
import tinycolor from "tinycolor2";

/**
 * Derived from nitro's Config rather than restated.
 *
 * This was a hand-maintained copy declaring `colors?: Record<string, string>`,
 * which stopped matching when 3.29 added paired `{ light, dark }` colors. Every
 * call site passing a real Config failed to typecheck, while the consumers
 * below already cast to `any`, so the runtime was correct the whole time and
 * only the declaration was wrong. Deriving it means the next theme change
 * cannot reintroduce the drift.
 */
export type IntellisenseConfig = Pick<Config, "theme">;

/**
 * The user's `theme.colors` exactly as nitro types it: plain values, paired
 * `{ light, dark }` values, and the `percentage` tuning key alongside them.
 * Helpers take this rather than restating `Record<string, string>`.
 */
export type ThemeColors = NonNullable<NonNullable<Config["theme"]>["colors"]>;

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

function mergeCustomColors(
	utils: Record<string, any>,
	colors: ThemeColors,
): Record<string, any> {
	const { percentage, ...userColors } = colors as any;
	if (Object.keys(userColors).length === 0) return utils;

	const customColors = createColors(
		userColors,
		percentage?.light,
		percentage?.dark,
	);

	const merged: Record<string, any> = {};
	for (const [key, util] of Object.entries(utils)) {
		if ("black" in util.values && "white" in util.values) {
			merged[key] = { ...util, values: { ...util.values, ...customColors } };
		} else {
			merged[key] = util;
		}
	}
	return merged;
}

export function buildUtilityMap(
	config?: IntellisenseConfig,
): Map<string, UtilityInfo> {
	const map = new Map<string, UtilityInfo>();
	let allUtils = coreUtils();

	if (config?.theme?.colors) {
		allUtils = mergeCustomColors(allUtils, config.theme.colors);
	}

	Object.values(allUtils).forEach((util: any) => {
		const slug = util.slug || "";
		const properties = util.properties || [];

		Object.entries(util.values).forEach(([suffix, cssValue]) => {
			const fullClass =
				suffix === "" ? util.prefix : `${util.prefix}:${suffix}`;
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
	if (!Number.isNaN(Number(cssValue))) return false;
	return tinycolor(cssValue).isValid() && cssValue.trim().startsWith("#");
}

export function hexToRgba(cssValue: string): RgbaColor | null {
	if (!Number.isNaN(Number(cssValue))) return null;

	const color = tinycolor(cssValue);
	if (!color.isValid()) return null;

	const { r, g, b, a } = color.toRgb();
	return { r: r / 255, g: g / 255, b: b / 255, a };
}

export function getSuggestions(config?: IntellisenseConfig): Suggestion[] {
	let allUtils = coreUtils();
	const suggestions: Suggestion[] = [];

	if (config?.theme?.colors) {
		allUtils = mergeCustomColors(allUtils, config.theme.colors);
	}

	Object.values(allUtils).forEach((util: any) => {
		Object.entries(util.values as Record<string, string>).forEach(
			([suffix, cssValue]) => {
				const fullClass =
					suffix === "" ? util.prefix : `${util.prefix}:${suffix}`;
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

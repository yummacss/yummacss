import {
	backgroundUtils,
	borderUtils,
	boxModelUtils,
	colorUtils,
	createColors,
	effectUtils,
	flexboxUtils,
	fontUtils,
	gridUtils,
	interactivityUtils,
	layoutUtils,
	outlineUtils,
	positioningUtils,
	textUtils,
	transformUtils,
	transitionUtils,
} from "@yummacss/core";
import { CLASS_ATTR_REGEX, extractClassContent } from "./constants";
import type { IntellisenseConfig } from "./core";

enum Category {
	Layout = 0,
	Positioning = 1,
	FlexboxGrid = 2,
	BoxModel = 3,
	Background = 4,
	Colors = 5,
	BorderOutline = 6,
	Typography = 7,
	Effects = 8,
	Transition = 9,
	Interactivity = 10,
	Unknown = 11,
	OrphanVariant = 12,
}

function mergeColorsIntoUtils(
	utils: Record<string, any>,
	colors: Record<string, string>,
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

function buildMaps(config?: IntellisenseConfig): {
	prefixCategoryMap: Map<string, Category>;
	colorIndexMap: Map<string, number>;
} {
	const prefixCategoryMap = new Map<string, Category>();
	const colorIndexMap = new Map<string, number>();

	let colorUtilsMerged = colorUtils();
	let bgUtilsMerged = backgroundUtils();
	let borderUtilsMerged = borderUtils();
	let outlineUtilsMerged = outlineUtils();

	if (config?.theme?.colors) {
		colorUtilsMerged = mergeColorsIntoUtils(
			colorUtilsMerged,
			config.theme.colors,
		);
		bgUtilsMerged = mergeColorsIntoUtils(bgUtilsMerged, config.theme.colors);
		borderUtilsMerged = mergeColorsIntoUtils(
			borderUtilsMerged,
			config.theme.colors,
		);
		outlineUtilsMerged = mergeColorsIntoUtils(
			outlineUtilsMerged,
			config.theme.colors,
		);
	}

	const groups: [Record<string, any>, Category][] = [
		[layoutUtils(), Category.Layout],
		[positioningUtils(), Category.Positioning],
		[flexboxUtils(), Category.FlexboxGrid],
		[gridUtils(), Category.FlexboxGrid],
		[boxModelUtils(), Category.BoxModel],
		[bgUtilsMerged, Category.Background],
		[colorUtilsMerged, Category.Colors],
		[borderUtilsMerged, Category.BorderOutline],
		[outlineUtilsMerged, Category.BorderOutline],
		[fontUtils(), Category.Typography],
		[textUtils(), Category.Typography],
		[transformUtils(), Category.Typography],
		[effectUtils(), Category.Effects],
		[transitionUtils(), Category.Transition],
		[interactivityUtils(), Category.Interactivity],
	];

	Object.values(colorUtilsMerged).forEach((util: any, index: number) => {
		colorIndexMap.set(util.prefix, index);
	});

	for (const [utils, category] of groups) {
		Object.values(utils).forEach((util: any) => {
			for (const suffix of Object.keys(util.values)) {
				const fullClass =
					suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
				if (!prefixCategoryMap.has(fullClass)) {
					prefixCategoryMap.set(fullClass, category);
				}
			}
			if (!prefixCategoryMap.has(util.prefix)) {
				prefixCategoryMap.set(util.prefix, category);
			}
		});
	}

	return { prefixCategoryMap, colorIndexMap };
}

let { prefixCategoryMap, colorIndexMap } = buildMaps();

export function updateSortConfig(config?: IntellisenseConfig): void {
	const maps = buildMaps(config);
	prefixCategoryMap = maps.prefixCategoryMap;
	colorIndexMap = maps.colorIndexMap;
}

function getCategoryOrder(cls: string): Category {
	if (prefixCategoryMap.has(cls)) return prefixCategoryMap.get(cls)!;

	const parts = cls.split("-");
	for (let i = parts.length - 1; i >= 1; i--) {
		const prefix = parts.slice(0, i).join("-");
		if (prefixCategoryMap.has(prefix)) return prefixCategoryMap.get(prefix)!;
	}

	if (prefixCategoryMap.has(parts[0]!))
		return prefixCategoryMap.get(parts[0]!)!;

	return Category.Unknown;
}

function getColorSubOrder(cls: string): number {
	const parts = cls.split("-");
	for (let i = parts.length; i >= 1; i--) {
		const prefix = parts.slice(0, i).join("-");
		if (colorIndexMap.has(prefix)) return colorIndexMap.get(prefix)!;
	}
	return 99;
}

function parseVariant(cls: string): { base: string; variant: string | null } {
	const colonIndex = cls.lastIndexOf(":");
	if (colonIndex === -1) return { base: cls, variant: null };
	return {
		base: cls.slice(colonIndex + 1),
		variant: cls.slice(0, colonIndex),
	};
}

function findMatchingBase(
	variantBase: string,
	baseSet: Set<string>,
): string | null {
	if (baseSet.has(variantBase)) return variantBase;

	const parts = variantBase.split("-");
	for (let i = parts.length - 1; i >= 1; i--) {
		const candidate = parts.slice(0, i).join("-");
		if (baseSet.has(candidate)) return candidate;
	}

	return null;
}

export function sortUtilities(classString: string): string {
	const classes = classString.split(/\s+/).filter((c) => c.trim() !== "");
	if (classes.length === 0) return classString;

	const baseClasses: string[] = [];
	const variantClasses: string[] = [];

	for (const cls of classes) {
		const { variant } = parseVariant(cls);
		if (variant !== null) variantClasses.push(cls);
		else baseClasses.push(cls);
	}

	const baseSet = new Set(baseClasses);
	const variantsByBase = new Map<string, string[]>();
	const orphanVariants: string[] = [];

	for (const cls of variantClasses) {
		const { base } = parseVariant(cls);
		const matchingBase = findMatchingBase(base, baseSet);
		if (matchingBase) {
			const existing = variantsByBase.get(matchingBase) ?? [];
			existing.push(cls);
			variantsByBase.set(matchingBase, existing);
		} else {
			orphanVariants.push(cls);
		}
	}

	const sortedBases = [...baseClasses].sort((a, b) => {
		const catA = getCategoryOrder(a);
		const catB = getCategoryOrder(b);
		if (catA !== catB) return catA - catB;
		if (catA === Category.Colors)
			return getColorSubOrder(a) - getColorSubOrder(b);
		return 0;
	});

	const result: string[] = [];
	for (const base of sortedBases) {
		result.push(base);
		const variants = variantsByBase.get(base);
		if (variants) result.push(...variants);
	}

	result.push(...orphanVariants);
	return result.join(" ");
}

export function sortUtilityClasses(text: string): string {
	const regex = new RegExp(CLASS_ATTR_REGEX.source, "g");
	return text.replace(regex, (...args) => {
		const match = args[0] as string;
		const fakeMatch = [
			match,
			args[1],
			args[2],
			args[3],
			args[4],
			args[5],
		] as unknown as RegExpExecArray;
		const classContent = extractClassContent(fakeMatch);
		if (!classContent) return match;
		const sorted = sortUtilities(classContent);
		return match.replace(classContent, sorted);
	});
}

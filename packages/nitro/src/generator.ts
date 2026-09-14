import {
	acceptsNegative,
	type ColorValue,
	coreUtils,
	createColors,
	defaultMediaQueries,
	isColorPair,
	type Utilities,
	type Utility,
} from "@yummacss/core";
import type { Config } from "./config/schema";
import { normalizeCSS } from "./normalize";

export function generator(usedClasses: Set<string>, config: Config): string {
	const cssBlocks: string[] = [];

	if (config.safelist) {
		for (const className of config.safelist) {
			const finalClass =
				config.prefix && !className.startsWith(config.prefix)
					? config.prefix + className
					: className;
			usedClasses.add(finalClass);
		}
	}

	if (config.normalize ?? true) {
		cssBlocks.push(normalizeCSS);
	}

	const colorScheme = buildColorScheme(config);
	if (colorScheme) {
		cssBlocks.push(colorScheme);
	}

	const util = generateUtil(usedClasses, config);
	if (util) {
		cssBlocks.push(util);
	}

	return cssBlocks.join("\n\n");
}

function buildColorScheme(config: Config): string | null {
	const colors = config.theme?.colors;
	if (!colors) return null;

	const hasPair = Object.entries(colors).some(
		([key, value]) => key !== "percentage" && isColorPair(value as ColorValue),
	);

	return hasPair ? ":root {\n  color-scheme: light dark;\n}" : null;
}

function buildUtils(config: Config): Record<string, Utility> {
	const baseUtils = coreUtils();
	const utils: Record<string, Utility> = { ...baseUtils };

	let customColors: Record<string, string> | null = null;
	if (config.theme?.colors) {
		const { percentage, ...userColors } = config.theme.colors as any;
		customColors = createColors(
			userColors,
			percentage?.light,
			percentage?.dark,
		);
	}

	const mergedMediaQueries: { prefix: string; value: string }[] = [
		...defaultMediaQueries,
	];
	if (config.theme?.screens) {
		const userScreens = Object.entries(config.theme.screens).map(
			([prefix, width]) => ({
				prefix,
				value: `@media (min-width: ${width})`,
			}),
		);
		for (const qs of userScreens) {
			const idx = mergedMediaQueries.findIndex((q) => q.prefix === qs.prefix);
			if (idx !== -1) mergedMediaQueries[idx] = qs;
			else mergedMediaQueries.push(qs);
		}
	}

	for (const [key, util] of Object.entries(utils)) {
		let modified = false;
		const newUtil = { ...util };

		if (
			customColors &&
			"black" in newUtil.values &&
			"white" in newUtil.values
		) {
			newUtil.values = { ...newUtil.values, ...customColors };
			modified = true;
		}

		if (config.theme?.screens && newUtil.variants) {
			newUtil.variants = {
				...newUtil.variants,
				mediaQueries: mergedMediaQueries,
			};
			modified = true;
		}

		if (modified) {
			utils[key] = newUtil;
		}
	}

	return utils;
}

export interface ValidationResult {
	valid: string[];
	invalid: string[];
}

export function validateClasses(
	classNames: Iterable<string>,
	config: Config,
): ValidationResult {
	const utils = buildUtils(config);
	const safelist = new Set<string>();
	for (const entry of config.safelist ?? []) {
		safelist.add(entry);
		if (config.prefix && !entry.startsWith(config.prefix)) {
			safelist.add(config.prefix + entry);
		}
	}

	const valid: string[] = [];
	const invalid: string[] = [];

	for (const originalClassName of classNames) {
		if (safelist.has(originalClassName)) {
			valid.push(originalClassName);
			continue;
		}

		let className = originalClassName;
		if (config.prefix) {
			if (!className.startsWith(config.prefix)) {
				invalid.push(originalClassName);
				continue;
			}
			className = className.slice(config.prefix.length);
		}

		if (generateCSSRule(className, utils, originalClassName)) {
			valid.push(originalClassName);
		} else {
			invalid.push(originalClassName);
		}
	}

	return { valid, invalid };
}

function levenshtein(a: string, b: string, max: number): number {
	if (Math.abs(a.length - b.length) > max) return max + 1;

	const row: number[] = Array.from({ length: b.length + 1 }, (_, j) => j);

	for (let i = 1; i <= a.length; i++) {
		let diagonal = row[0] ?? 0;
		let best = i;
		row[0] = i;

		for (let j = 1; j <= b.length; j++) {
			const previous = row[j] ?? 0;
			const value = Math.min(
				previous + 1,
				(row[j - 1] ?? 0) + 1,
				diagonal + (a[i - 1] === b[j - 1] ? 0 : 1),
			);
			row[j] = value;
			diagonal = previous;
			if (value < best) best = value;
		}

		if (best > max) return max + 1;
	}

	return row[b.length] ?? 0;
}

function isSubsequence(needle: string, haystack: string): boolean {
	let i = 0;
	for (const char of haystack) {
		if (char === needle[i]) i++;
		if (i === needle.length) return true;
	}
	return needle.length === 0;
}

function commonPrefixLength(a: string, b: string): number {
	let n = 0;
	while (n < a.length && n < b.length && a[n] === b[n]) {
		n++;
	}
	return n;
}

function compareScores(a: number[], b: number[]): number {
	for (let i = 0; i < a.length; i++) {
		const diff = (a[i] ?? 0) - (b[i] ?? 0);
		if (diff !== 0) return diff;
	}
	return 0;
}

export function suggestClasses(
	classNames: Iterable<string>,
	config: Config = {},
): Map<string, string> {
	const utils = buildUtils(config);
	const candidates: string[] = [];
	for (const util of Object.values(utils)) {
		for (const key of Object.keys(util.values)) {
			candidates.push(key === "base" ? util.prefix : `${util.prefix}-${key}`);
		}
	}
	const candidateSet = new Set(candidates);

	const tentative = new Map<string, string[]>();

	for (const originalClassName of classNames) {
		let className = originalClassName;
		let variantPrefix = "";
		let opacitySuffix = "";

		const lastColon = className.lastIndexOf(":");
		if (lastColon !== -1) {
			variantPrefix = className.slice(0, lastColon + 1);
			className = className.slice(lastColon + 1);
		}

		const opacityMatch = className.match(/\/\d+$/);
		if (opacityMatch) {
			opacitySuffix = opacityMatch[0];
			className = className.slice(0, -opacitySuffix.length);
		}

		let prefix = "";
		if (config.prefix) {
			prefix = config.prefix;
			if (className.startsWith(prefix)) {
				className = className.slice(prefix.length);
			} else if (candidateSet.has(className)) {
				tentative.set(originalClassName, [
					variantPrefix + prefix + className + opacitySuffix,
					variantPrefix + prefix + className,
				]);
				continue;
			}
		}

		if (!className) continue;

		const maxDistance = className.length <= 4 ? 1 : 2;
		let best: string | undefined;
		let bestScore = [maxDistance + 1, 1, 1, 0];

		for (const candidate of candidates) {
			const distance = levenshtein(className, candidate, maxDistance);
			if (distance === 0 || distance > maxDistance) continue;

			const score = [
				distance,
				isSubsequence(candidate, className) ||
				isSubsequence(className, candidate)
					? 0
					: 1,
				candidate[0] === className[0] ? 0 : 1,
				-commonPrefixLength(candidate, className),
			];

			const comparison = compareScores(score, bestScore);
			if (
				comparison < 0 ||
				(comparison === 0 && best !== undefined && candidate < best)
			) {
				bestScore = score;
				best = candidate;
			}
		}

		if (best !== undefined) {
			tentative.set(originalClassName, [
				variantPrefix + prefix + best + opacitySuffix,
				variantPrefix + prefix + best,
			]);
		}
	}

	const options = Array.from(tentative.values()).flat();
	const { valid } = validateClasses(options, config);
	const validSet = new Set(valid);

	const suggestions = new Map<string, string>();
	for (const [className, candidatesForClass] of tentative) {
		const match = candidatesForClass.find((option) => validSet.has(option));
		if (match) {
			suggestions.set(className, match);
		}
	}

	return suggestions;
}

function generateUtil(usedClasses: Set<string>, config: Config): string {
	const utils = buildUtils(config);

	const cssRules: string[] = [];
	const mediaQueryRules: Map<string, string[]> = new Map();
	const processedClasses = new Set<string>();

	const sortedClasses = Array.from(usedClasses).sort();

	for (const originalClassName of sortedClasses) {
		let classNameToProcess = originalClassName;
		if (config.prefix && classNameToProcess.startsWith(config.prefix)) {
			classNameToProcess = classNameToProcess.slice(config.prefix.length);
		} else if (config.prefix) {
			continue;
		}

		if (processedClasses.has(originalClassName)) continue;

		const res = generateCSSRule(classNameToProcess, utils, originalClassName);
		if (res) {
			if (res.mediaQuery) {
				const existing = mediaQueryRules.get(res.mediaQuery) || [];
				existing.push(res.rule);
				mediaQueryRules.set(res.mediaQuery, existing);
			} else {
				cssRules.push(res.rule);
			}
			processedClasses.add(originalClassName);
		}
	}

	const sortedMediaQueries = Array.from(mediaQueryRules.entries()).sort(
		([a], [b]) => a.localeCompare(b),
	);

	for (const [mediaQuery, rules] of sortedMediaQueries) {
		const indented = rules.map((r) => r.replace(/^/gm, "  ")).join("\n\n");
		cssRules.push(`${mediaQuery} {\n${indented}\n}`);
	}

	return cssRules.join("\n\n");
}

function tryGenerateRule(
	className: string,
	util: Utility,
	originalClassName: string,
): { rule: string; mediaQuery?: string } | null {
	const { properties, variants, prefix, values } = util;
	let currentClassName = className;
	let mediaQuery: string | undefined;
	let pseudoClasses = "";
	let pseudoElements = "";
	let opacityValue = "";

	let foundPrefix = true;
	while (foundPrefix) {
		foundPrefix = false;

		if (variants?.mediaQueries) {
			for (const mq of variants.mediaQueries) {
				if (currentClassName.startsWith(`@${mq.prefix}:`)) {
					mediaQuery = mq.value;
					currentClassName = currentClassName.slice(mq.prefix.length + 2);
					foundPrefix = true;
					break;
				}
			}
		}

		if (foundPrefix) continue;

		if (variants?.pseudoElements) {
			for (const pe of variants.pseudoElements) {
				if (currentClassName.startsWith(`${pe.prefix}::`)) {
					pseudoElements += pe.value;
					currentClassName = currentClassName.slice(pe.prefix.length + 2);
					foundPrefix = true;
					break;
				}
			}
		}

		if (foundPrefix) continue;

		if (variants?.pseudoClasses) {
			for (const pc of variants.pseudoClasses) {
				if (
					currentClassName.startsWith(`${pc.prefix}:`) &&
					!currentClassName.startsWith(`${pc.prefix}::`)
				) {
					pseudoClasses += pc.value;
					currentClassName = currentClassName.slice(pc.prefix.length + 1);
					foundPrefix = true;
					break;
				}
			}
		}
	}

	if (variants?.opacity) {
		for (const op of variants.opacity) {
			if (currentClassName.endsWith(`/${op.prefix}`)) {
				opacityValue = op.value;
				currentClassName = currentClassName.slice(0, -(op.prefix.length + 1));
				break;
			}
		}
	}

	if (
		!currentClassName.startsWith(`${prefix}-`) &&
		currentClassName !== prefix
	) {
		return null;
	}

	const valuePart =
		currentClassName === prefix
			? ""
			: currentClassName.slice(prefix.length + 1);

	let isNegative = false;
	let cleanValuePart = valuePart;
	if (valuePart.startsWith("-")) {
		isNegative = true;
		cleanValuePart = valuePart.slice(1);
	}

	const propertyValue =
		values[cleanValuePart === "" ? "base" : cleanValuePart] ||
		values[cleanValuePart];

	if (!propertyValue) return null;

	let finalValue = propertyValue;
	if (isNegative) {
		if (!acceptsNegative(properties)) return null;
		const negated = negateValue(propertyValue);
		if (negated === null) return null;
		finalValue = negated;
	}

	const finalPropertyValue = opacityValue
		? applyOpacity(finalValue, opacityValue)
		: finalValue;

	const declarations = properties
		.map((prop) => `${prop}: ${finalPropertyValue};`)
		.join("\n  ");

	return {
		rule: `.${escapeCn(originalClassName)}${pseudoClasses}${pseudoElements} {\n  ${declarations}\n}`,
		mediaQuery,
	};
}

function isColorValue(value: string): boolean {
	return /^#[0-9a-f]{6}$/i.test(value) || value.startsWith("light-dark(");
}

function applyOpacity(value: string, percentage: string): string {
	if (!isColorValue(value)) return value;
	return `color-mix(in srgb, ${value} ${percentage}, transparent)`;
}

function negateValue(value: string): string | null {
	if (/^-?[\d.]/.test(value)) {
		return value.startsWith("-") ? value.slice(1) : `-${value}`;
	}

	const functionMatch = value.match(/^([a-zA-Z]+\()(-?[\d.]+)(.*)$/);
	if (functionMatch) {
		const [, prefix = "", number = "", suffix = ""] = functionMatch;
		const negatedNumber = number.startsWith("-")
			? number.slice(1)
			: `-${number}`;
		return `${prefix}${negatedNumber}${suffix}`;
	}

	return null;
}

function escapeCn(className: string): string {
	return className
		.replace(/:/g, "\\:")
		.replace(/\//g, "\\/")
		.replace(/@/g, "\\@")
		.replace(/%/g, "\\%");
}

function generateCSSRule(
	className: string,
	utils: Utilities,
	originalClassName: string,
): { rule: string; mediaQuery?: string } | null {
	for (const [_, util] of Object.entries(utils)) {
		const result = tryGenerateRule(className, util, originalClassName);
		if (result) return result;
	}
	return null;
}

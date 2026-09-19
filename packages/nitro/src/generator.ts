import {
	acceptsNegative,
	type ColorValue,
	coreUtils,
	createColors,
	defaultMediaQueries,
	isColorPair,
	splitVariants,
	type Utilities,
	type Utility,
	valueRenames,
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

function renameFor(className: string): string | undefined {
	const match = className.match(/^([a-z]+)[-:](.+)$/);
	const prefix = match?.[1];
	const old = match?.[2];
	if (!prefix || !old) return undefined;
	const value = valueRenames[prefix]?.[old];
	return value ? `${prefix}:${value}` : undefined;
}

export function suggestClasses(
	classNames: Iterable<string>,
	config: Config = {},
): Map<string, string> {
	const utils = buildUtils(config);
	const candidates: string[] = [];
	for (const util of Object.values(utils)) {
		for (const key of Object.keys(util.values)) {
			candidates.push(key === "base" ? util.prefix : `${util.prefix}:${key}`);
		}
	}
	const candidateSet = new Set(candidates);

	const tentative = new Map<string, string[]>();

	for (const originalClassName of classNames) {
		let className = originalClassName;
		let variantPrefix = "";
		let opacitySuffix = "";

		const split = splitVariants(className);
		if (split.variants.length > 0) {
			variantPrefix = split.variants
				.map((v) => (v.endsWith("::") ? v : `${v}:`))
				.join("");
			className = split.base;
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

		// tt-n to tt:none is a rename, not a typo, so distance never reaches it
		const renamed = renameFor(className);
		if (renamed) {
			tentative.set(originalClassName, [
				variantPrefix + prefix + renamed + opacitySuffix,
				variantPrefix + prefix + renamed,
			]);
			continue;
		}

		const maxDistance = className.length <= 4 ? 1 : 2;

		const fold = (s: string) => s.replace(/:/g, "-");
		const folded = fold(className);
		let best: string | undefined;
		let bestScore = [maxDistance + 1, 1, 1, 0];

		for (const candidate of candidates) {
			const foldedCandidate = fold(candidate);
			const distance = levenshtein(folded, foldedCandidate, maxDistance);
			if (distance > maxDistance) continue;
			// folding leaves a 3.x class at distance zero from its 4.0 spelling,
			// which is the best suggestion there is, not the absence of one
			if (distance === 0 && candidate === className) continue;

			const score = [
				distance,
				isSubsequence(foldedCandidate, folded) ||
				isSubsequence(folded, foldedCandidate)
					? 0
					: 1,
				foldedCandidate[0] === folded[0] ? 0 : 1,
				-commonPrefixLength(foldedCandidate, folded),
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

interface Peeled {
	mediaQuery?: string;
	pseudoClasses: string;
	pseudoElements: string;
}

function peelVariant(
	className: string,
	variants: Utility["variants"],
	acc: Peeled,
): string | null {
	if (variants?.mediaQueries) {
		for (const mq of variants.mediaQueries) {
			if (className.startsWith(`@${mq.prefix}:`)) {
				acc.mediaQuery = mq.value;
				return className.slice(mq.prefix.length + 2);
			}
		}
	}

	if (variants?.pseudoElements) {
		for (const pe of variants.pseudoElements) {
			if (className.startsWith(`${pe.prefix}::`)) {
				acc.pseudoElements += pe.value;
				return className.slice(pe.prefix.length + 2);
			}
		}
	}

	if (variants?.pseudoClasses) {
		for (const pc of variants.pseudoClasses) {
			if (
				className.startsWith(`${pc.prefix}:`) &&
				!className.startsWith(`${pc.prefix}::`)
			) {
				acc.pseudoClasses += pc.value;
				return className.slice(pc.prefix.length + 1);
			}
		}
	}

	return null;
}

function matchValue(
	className: string,
	util: Utility,
): { value: string; opacity: string } | null {
	const { prefix, values, variants } = util;

	let body = className;
	let opacity = "";
	if (variants?.opacity) {
		for (const op of variants.opacity) {
			if (body.endsWith(`/${op.prefix}`)) {
				opacity = op.value;
				body = body.slice(0, -(op.prefix.length + 1));
				break;
			}
		}
	}

	if (!body.startsWith(`${prefix}:`) && body !== prefix) return null;

	const valuePart = body === prefix ? "" : body.slice(prefix.length + 1);
	const isNegative = valuePart.startsWith("-");
	const lookup = isNegative ? valuePart.slice(1) : valuePart;

	const propertyValue =
		values[lookup === "" ? "base" : lookup] || values[lookup];
	if (!propertyValue) return null;

	if (!isNegative) return { value: propertyValue, opacity };

	// a keyword has no sign to flip, so negateValue returns null and the class
	// is refused rather than silently emitting the positive value

	if (!acceptsNegative(util.properties)) return null;
	const negated = negateValue(propertyValue);
	if (negated === null) return null;

	return { value: negated, opacity };
}

function tryGenerateRule(
	className: string,
	util: Utility,
	originalClassName: string,
): { rule: string; mediaQuery?: string } | null {
	const { properties, variants } = util;
	const acc: Peeled = { pseudoClasses: "", pseudoElements: "" };

	let current = className;
	while (true) {
		const matched = matchValue(current, util);
		if (matched) {
			const finalValue = matched.opacity
				? applyOpacity(matched.value, matched.opacity)
				: matched.value;

			const declarations = properties
				.map((prop) => `${prop}: ${finalValue};`)
				.join("\n  ");

			return {
				rule: `.${escapeCn(originalClassName)}${acc.pseudoClasses}${acc.pseudoElements} {\n  ${declarations}\n}`,
				mediaQuery: acc.mediaQuery,
			};
		}

		const rest = peelVariant(current, variants, acc);
		if (rest === null) return null;
		current = rest;
	}
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

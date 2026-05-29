import {
	coreUtils,
	createColors,
	defaultMediaQueries,
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

	const util = generateUtil(usedClasses, config);
	if (util) {
		cssBlocks.push(util);
	}

	return cssBlocks.join("\n\n");
}

function generateUtil(usedClasses: Set<string>, config: Config): string {
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

	const cssRules: string[] = [];
	const mediaQueryRules: Map<string, string[]> = new Map();
	const processedClasses = new Set<string>();

	// to avoid CSS output being generated randomly when using build or watch tasks
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

	// sort media queries alphabetically
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

	// 1. Extract variants (prefixes)
	let foundPrefix = true;
	while (foundPrefix) {
		foundPrefix = false;

		// Handle media queries - require @ prefix (e.g. @sm:d-f)
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

		// Handle pseudo elements (uses :: separator) - Check this BEFORE pseudo classes
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

		// Handle pseudo classes (uses : separator) - Ensure it doesn't match ::
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

	// 2. Handle opacity (suffix)
	if (variants?.opacity) {
		for (const op of variants.opacity) {
			if (currentClassName.endsWith(`/${op.prefix}`)) {
				opacityValue = op.value;
				currentClassName = currentClassName.slice(0, -(op.prefix.length + 1));
				break;
			}
		}
	}

	// 3. Match base utility
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

	// 4. Handle negative values (e.g., m--1 -> margin: -0.25rem)
	let isNegative = false;
	let cleanValuePart = valuePart;
	if (valuePart.startsWith("-")) {
		isNegative = true;
		cleanValuePart = valuePart.slice(1); // Remove leading -
	}

	const propertyValue =
		values[cleanValuePart === "" ? "base" : cleanValuePart] ||
		values[cleanValuePart];

	if (!propertyValue) return null;

	// Apply negative sign if needed (only to numeric values)
	let finalValue = propertyValue;
	if (isNegative) {
		// Only apply negative to numeric values (starting with numbers or -)
		if (/^-?[\d.]/.test(propertyValue)) {
			finalValue = propertyValue.startsWith("-")
				? propertyValue.slice(1) // Remove existing negative
				: `-${propertyValue}`; // Add negative
		}
	}

	// 5. Apply opacity
	const finalPropertyValue =
		opacityValue && finalValue.startsWith("#") && finalValue.length === 7
			? `${finalValue}${opacityValue}`
			: finalValue;

	const declarations = properties
		.map((prop) => `${prop}: ${finalPropertyValue};`)
		.join("\n  ");

	return {
		rule: `.${escapeCn(originalClassName)}${pseudoClasses}${pseudoElements} {\n  ${declarations}\n}`,
		mediaQuery,
	};
}

// escape colons, slashes, @ symbols and percentage
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

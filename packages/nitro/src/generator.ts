import { coreUtils, type Utilities, type Utility } from "@yummacss/core";
import { baseStyles } from "./base-styles";
import type { Config } from "./config/schema";

export function generator(usedClasses: Set<string>, config: Config): string {
	const cssBlocks: string[] = [];

	if (config.buildOptions.reset) {
		cssBlocks.push(baseStyles);
	}

	const util = generateUtil(usedClasses);
	if (util) {
		cssBlocks.push(util);
	}

	return cssBlocks.join("\n\n");
}

function generateUtil(usedClasses: Set<string>): string {
	const utils = coreUtils();
	const cssRules: string[] = [];
	const mediaQueryRules: Map<string, string[]> = new Map();
	const processedClasses = new Set<string>();

	// to avoid CSS output being generated randomly when using build or watch tasks
	const sortedClasses = Array.from(usedClasses).sort();

	for (const className of sortedClasses) {
		if (processedClasses.has(className)) continue;

		const res = generateCSSRule(className, utils);
		if (res) {
			if (res.mediaQuery) {
				const existing = mediaQueryRules.get(res.mediaQuery) || [];
				existing.push(res.rule);
				mediaQueryRules.set(res.mediaQuery, existing);
			} else {
				cssRules.push(res.rule);
			}
			processedClasses.add(className);
		}
	}

	// sort media queries alphabetically
	const sortedMediaQueries = Array.from(mediaQueryRules.entries()).sort(
		([a], [b]) => a.localeCompare(b),
	);

	for (const [mediaQuery, rules] of sortedMediaQueries) {
		cssRules.push(`${mediaQuery} {\n${rules.join("\n")}\n}`);
	}

	return cssRules.join("\n");
}

function tryGenerateRule(
	className: string,
	util: Utility,
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

		// Handle container queries
		if (variants?.containerQueries) {
			for (const cq of variants.containerQueries) {
				if (currentClassName.startsWith(`${cq.prefix}:`)) {
					mediaQuery = cq.value;
					currentClassName = currentClassName.slice(cq.prefix.length + 1);
					foundPrefix = true;
					break;
				}
			}
		}

		if (foundPrefix) continue;

		// Handle media queries
		if (variants?.mediaQueries) {
			for (const mq of variants.mediaQueries) {
				if (currentClassName.startsWith(`${mq.prefix}:`)) {
					mediaQuery = mq.value;
					currentClassName = currentClassName.slice(mq.prefix.length + 1);
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
		if (/^-?\d/.test(propertyValue)) {
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
		rule: `.${escapeCn(className)}${pseudoClasses}${pseudoElements} {\n  ${declarations}\n}`,
		mediaQuery,
	};
}

// escape colons, slashes and @ symbols
function escapeCn(className: string): string {
	return className
		.replace(/:/g, "\\:")
		.replace(/\//g, "\\/")
		.replace(/@/g, "\\@");
}

function generateCSSRule(
	className: string,
	utils: Utilities,
): { rule: string; mediaQuery?: string } | null {
	for (const [_, util] of Object.entries(utils)) {
		const result = tryGenerateRule(className, util);
		if (result) return result;
	}
	return null;
}

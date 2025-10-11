import type { Config } from "@/config/schema";
import { baseCSS } from "@/reset/base";
import { coreUtils, type Utilities, type Utility } from "@yummacss/api";

export function generator(usedClasses: Set<string>, config: Config): string {
	const cssBlocks: string[] = [];

	if (config.buildOptions.reset) {
		cssBlocks.push(baseCSS);
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
	const { properties, variants } = util;

	// include media queries variants
	if (variants?.mediaQueries) {
		for (const mq of variants.mediaQueries) {
			if (className.startsWith(`${mq.prefix}:`)) {
				const baseClassName = className.slice(mq.prefix.length + 1);
				const res = tryGenerateBaseRule(baseClassName, util);
				if (res) {
					const declarations = properties
						.map((prop) => `${prop}: ${res.propertyValue};`)
						.join("\n");
					return {
						rule: `.${escapeCn(className)} {\n  ${declarations}\n  }`,
						mediaQuery: mq.value,
					};
				}
			}
		}
	}

	// include pseudo classes variants
	if (variants?.pseudoClasses) {
		for (const pc of variants.pseudoClasses) {
			if (className.startsWith(`${pc.prefix}:`)) {
				const baseClassName = className.slice(pc.prefix.length + 1);
				const res = tryGenerateBaseRule(baseClassName, util);
				if (res) {
					const declarations = properties
						.map((prop) => `${prop}: ${res.propertyValue};`)
						.join("\n");
					return {
						rule: `.${escapeCn(className)}${pc.value} {\n${declarations}\n}`,
					};
				}
			}
		}
	}

	// include opacity color variants
	if (variants?.opacity) {
		for (const op of variants.opacity) {
			if (className.endsWith(`/${op.prefix}`)) {
				const baseClassName = className.slice(0, -(op.prefix.length + 1));
				const res = tryGenerateBaseRule(baseClassName, util);
				if (res) {
					const modPropertyValue =
						res.propertyValue.startsWith("#") && res.propertyValue.length === 7
							? `${res.propertyValue}${op.value}`
							: res.propertyValue;
					const declarations = properties
						.map((prop) => `${prop}: ${modPropertyValue};`)
						.join("\n");
					return {
						rule: `.${escapeCn(className)} {\n${declarations}\n}`,
					};
				}
			}
		}
	}

	// try base rule
	const baseRule = tryGenerateBaseRule(className, util);
	if (baseRule) {
		const declarations = properties
			.map((prop) => `${prop}: ${baseRule.propertyValue};`)
			.join("\n");
		return {
			rule: `.${escapeCn(className)} {\n${declarations}\n}`,
		};
	}

	return null;
}

function tryGenerateBaseRule(
	className: string,
	util: Utility,
): { propertyValue: string } | null {
	const { prefix, values } = util;

	if (!className.startsWith(`${prefix}-`)) return null;

	const valuePart = className.slice(prefix.length + 1);
	const cssValue = values[valuePart];

	if (!cssValue) return null;

	return { propertyValue: cssValue };
}

// escape colons and slashes
function escapeCn(className: string): string {
	return className.replace(/:/g, "\\:").replace(/\//g, "\\/");
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

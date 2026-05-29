import {
	backgroundUtils,
	borderUtils,
	colorUtils,
	createColors,
	mediaQueries as defaultMediaQueries,
	opacity,
	outlineUtils,
	pseudoClasses,
	pseudoElements,
} from "@yummacss/core";
import { CLASS_ATTR_REGEX, extractClassContent } from "./constants";
import type { IntellisenseConfig } from "./core";
import { buildUtilityMap } from "./core";

export interface HoverContent {
	markdown: string;
	startIndex: number;
	endIndex: number;
}

function buildMediaVariants(
	config?: IntellisenseConfig,
): Record<string, string> {
	const variants: Record<string, string> = {};
	for (const m of defaultMediaQueries) variants[`@${m.prefix}`] = m.value;
	if (config?.theme?.screens) {
		for (const [prefix, width] of Object.entries(config.theme.screens)) {
			variants[`@${prefix}`] = `@media (min-width: ${width})`;
		}
	}
	return variants;
}

const pseudoClassVariants: Record<string, string> = {};
for (const p of pseudoClasses) pseudoClassVariants[p.prefix] = p.value;

const pseudoElementVariants: Record<string, string> = {};
for (const p of pseudoElements) pseudoElementVariants[p.prefix] = p.value;

const opacityVariants: Record<string, string> = {};
for (const o of opacity) opacityVariants[o.prefix] = o.value;

function buildColorMap(config?: IntellisenseConfig): Map<string, string> {
	const map = new Map<string, string>();

	for (const utils of [
		colorUtils(),
		backgroundUtils(),
		borderUtils(),
		outlineUtils(),
	]) {
		let mergedUtils = utils;
		if (config?.theme?.colors) {
			const { percentage, ...userColors } = config.theme.colors as any;
			if (Object.keys(userColors).length > 0) {
				const customColors = createColors(
					userColors,
					percentage?.light,
					percentage?.dark,
				);
				const m: Record<string, any> = {};
				for (const [key, util] of Object.entries(utils)) {
					if ("black" in util.values && "white" in util.values) {
						m[key] = {
							...util,
							values: { ...util.values, ...customColors },
						};
					} else {
						m[key] = util;
					}
				}
				mergedUtils = m as any;
			}
		}

		Object.values(mergedUtils).forEach((util: any) => {
			Object.entries(util.values as Record<string, string>).forEach(
				([suffix, cssValue]) => {
					const fullClass =
						suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
					map.set(fullClass, cssValue);
				},
			);
		});
	}

	return map;
}

function swatchSvg(color: string): string {
	const encoded = encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><rect width="12" height="12" rx="2" fill="${color}"/></svg>`,
	);
	return `![swatch](data:image/svg+xml,${encoded})`;
}

export function parseUtility(className: string): {
	variants: string[];
	baseUtility: string;
} {
	const parts = className.split(":");
	const baseUtility = parts.pop() ?? className;
	return { variants: parts, baseUtility };
}

export function getHoverMarkdown(
	className: string,
	config?: IntellisenseConfig,
): string | null {
	const { variants, baseUtility } = parseUtility(className);
	const utilityMap = buildUtilityMap(config);
	const info = utilityMap.get(baseUtility);
	if (!info) return null;

	const mediaVariants = buildMediaVariants(config);
	const colorMap = buildColorMap(config);
	let content = "";

	if (variants.length > 0) {
		const descriptions: string[] = [];

		for (const v of variants) {
			if (mediaVariants[v]) {
				descriptions.push(`**Media:** \`${mediaVariants[v]}\``);
			} else if (pseudoClassVariants[v]) {
				descriptions.push(`**Pseudo:** \`${pseudoClassVariants[v]}\``);
			} else if (pseudoElementVariants[v]) {
				descriptions.push(
					`**Pseudo element:** \`${pseudoElementVariants[v]}\``,
				);
			} else if (opacityVariants[v]) {
				descriptions.push(`**Opacity:** \`${opacityVariants[v]}\``);
			} else {
				descriptions.push(`**Variant:** \`${v}\``);
			}
		}

		content += `${descriptions.join("\n\n")}\n\n---\n\n`;
	}

	const color = colorMap.get(baseUtility);
	if (color) {
		content += `${swatchSvg(color)}\n\n`;
	}

	const cssDeclaration = info.properties
		.map((prop) => `${prop}: ${info.cssValue};`)
		.join("\n");

	content += `\`\`\`css\n${cssDeclaration}\n\`\`\``;

	if (info.slug) {
		content += `\n\n[Yumma CSS Reference](https://yummacss.com/docs/${info.slug})`;
	}

	return content;
}

export function findHoverTarget(
	line: string,
	cursorIndex: number,
	config?: IntellisenseConfig,
): { className: string; startIndex: number; endIndex: number } | null {
	const regex = new RegExp(CLASS_ATTR_REGEX.source, "g");
	const utilityMap = buildUtilityMap(config);
	let match: RegExpExecArray | null;

	match = regex.exec(line);
	while (match !== null) {
		const classContent = extractClassContent(match);
		if (!classContent) {
			match = regex.exec(line);
			continue;
		}
		const contentStart = match.index + match[0].indexOf(classContent);
		const classes = classContent.split(/\s+/);
		let searchFrom = 0;

		for (const cls of classes) {
			if (!cls) continue;
			const idx = classContent.indexOf(cls, searchFrom);
			const start = contentStart + idx;
			const end = start + cls.length;

			if (cursorIndex >= start && cursorIndex <= end) {
				const { baseUtility } = parseUtility(cls);
				if (utilityMap.has(baseUtility)) {
					return { className: cls, startIndex: start, endIndex: end };
				}
			}

			searchFrom = idx + cls.length;
		}

		match = regex.exec(line);
	}

	return null;
}

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
	splitVariants,
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
						suffix === "" ? util.prefix : `${util.prefix}:${suffix}`;
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
	// A variant is only peeled when what remains is not already a utility, or
	// `h:m:4` reads as two variants and `h:4` loses its height.
	const { variants, base: rest } = splitVariants(className);

	let baseUtility = rest;

	// Opacity is a `/50` suffix on the utility rather than a colon-separated
	// variant, so it has to be split off before the utility map lookup.
	const opacitySuffix = baseUtility.match(/\/(\d+)$/);
	if (opacitySuffix?.[1]) {
		baseUtility = baseUtility.slice(0, -opacitySuffix[0].length);
		variants.push(opacitySuffix[1]);
	}

	// Negative values are written `m--4`, but the utility map is keyed `m-4` -
	// the same normalisation the generator applies when it strips the sign.
	baseUtility = baseUtility.replace(/^([a-z-]+):-/, "$1:");

	return { variants, baseUtility };
}

/**
 * Resolves one variant token to its CSS meaning. Pseudo elements are matched
 * only in their `::` form, so an ambiguous prefix cannot silently resolve to
 * the pseudo class of the same name.
 */
function resolveVariant(
	variant: string,
	mediaVariants: Record<string, string>,
): { label: string; value: string } | null {
	if (variant.endsWith("::")) {
		const value = pseudoElementVariants[variant.slice(0, -2)];
		return value ? { label: "Pseudo element", value } : null;
	}
	if (mediaVariants[variant]) {
		return { label: "Media", value: mediaVariants[variant] };
	}
	if (pseudoClassVariants[variant]) {
		return { label: "Pseudo", value: pseudoClassVariants[variant] };
	}
	if (opacityVariants[variant]) {
		return { label: "Opacity", value: opacityVariants[variant] };
	}
	return null;
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

	const descriptions: string[] = [];
	for (const v of variants) {
		const resolved = resolveVariant(v, mediaVariants);
		// Unknown variant, e.g. @foobar:d-f where foobar is not a known screen.
		if (!resolved) return null;
		descriptions.push(`**${resolved.label}:** \`${resolved.value}\``);
	}

	let content = "";

	if (descriptions.length > 0) {
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
				const { variants, baseUtility } = parseUtility(cls);
				if (!utilityMap.has(baseUtility)) continue;
				const mediaVariants = buildMediaVariants(config);
				const allValid = variants.every(
					(v) => resolveVariant(v, mediaVariants) !== null,
				);
				if (!allValid) continue;
				return { className: cls, startIndex: start, endIndex: end };
			}

			searchFrom = idx + cls.length;
		}

		match = regex.exec(line);
	}

	return null;
}

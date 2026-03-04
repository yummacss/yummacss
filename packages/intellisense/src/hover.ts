import {
	backgroundUtils,
	borderUtils,
	colorUtils,
	mediaQueries,
	opacity,
	outlineUtils,
	pseudoClasses,
	pseudoElements,
} from "@yummacss/core";
import { buildUtilityMap } from "./core";

export interface HoverContent {
	markdown: string;
	startIndex: number;
	endIndex: number;
}

const utilityMap = buildUtilityMap();

// variant lookup tables built from @yummacss/core
const mediaVariants: Record<string, string> = {};
for (const m of mediaQueries) mediaVariants[m.prefix] = m.value;

const pseudoClassVariants: Record<string, string> = {};
for (const p of pseudoClasses) pseudoClassVariants[p.prefix] = p.value;

const pseudoElementVariants: Record<string, string> = {};
for (const p of pseudoElements) pseudoElementVariants[p.prefix] = p.value;

const opacityVariants: Record<string, string> = {};
for (const o of opacity) opacityVariants[o.prefix] = o.value;

function buildColorMap(): Map<string, string> {
	const map = new Map<string, string>();

	for (const utils of [
		colorUtils(),
		backgroundUtils(),
		borderUtils(),
		outlineUtils(),
	]) {
		Object.values(utils).forEach((util: any) => {
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

const colorMap = buildColorMap();

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

export function getHoverMarkdown(className: string): string | null {
	const { variants, baseUtility } = parseUtility(className);
	const info = utilityMap.get(baseUtility);
	if (!info) return null;

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
): { className: string; startIndex: number; endIndex: number } | null {
	const classRegex = /class(?:Name)?\s*=\s*["']([^"']+)["']/g;
	let match: RegExpExecArray | null;

	match = classRegex.exec(line);
	while (match !== null) {
		const classContent = match[1];
		if (!classContent) continue;
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

		match = classRegex.exec(line);
	}

	return null;
}

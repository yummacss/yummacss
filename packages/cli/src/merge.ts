import { BY_VALUE, PREFIXES } from "./merge-map";

/**
 * Merges Yumma class strings so the last one wins.
 *
 * Yumma utilities are single-class selectors. Stylesheet order wins over
 * `className`. `merge` drops the losing class.
 *
 * @example
 * merge("c-white", "c-accent")   // "c-accent"
 * merge("px-8 p-4")              // "p-4"
 * merge("p-4 px-8")              // "p-4 px-8", px says nothing about y
 * merge("d-f ai-c", isOpen && "c-accent")
 *
 * An unrecognised class is kept, so your own classes always survive.
 */

// Longest first, so `px` is matched before `p`.
const SORTED = Object.keys(PREFIXES).sort((a, b) => b.length - a.length);

// Core declares logical shorthands, which do not name what they cover. The
// only hand-written part.
const SHORTHANDS: Record<string, string[]> = {
	padding: ["padding-inline", "padding-block"],
	"padding-inline": ["padding-inline-start", "padding-inline-end"],
	"padding-block": ["padding-block-start", "padding-block-end"],
	margin: ["margin-inline", "margin-block"],
	"margin-inline": ["margin-inline-start", "margin-inline-end"],
	"margin-block": ["margin-block-start", "margin-block-end"],
	inset: ["top", "right", "bottom", "left"],
	gap: ["row-gap", "column-gap"],
	overflow: ["overflow-x", "overflow-y"],
	"border-width": ["border-block-width", "border-inline-width"],
	"border-color": ["border-block-color", "border-inline-color"],
	"border-radius": [
		"border-start-start-radius",
		"border-start-end-radius",
		"border-end-start-radius",
		"border-end-end-radius",
	],
};

function expand(property: string, into: Set<string>): void {
	const parts = SHORTHANDS[property];
	if (!parts) {
		into.add(property);
		return;
	}
	for (const part of parts) expand(part, into);
}

interface Resolved {
	variant: string;
	properties: Set<string>;
}

function resolve(className: string): Resolved | null {
	const colon = className.lastIndexOf(":");
	const variant = colon === -1 ? "" : className.slice(0, colon);
	const base = className.slice(colon + 1).split("/")[0];

	const prefix = SORTED.find(
		(candidate) => base === candidate || base.startsWith(`${candidate}-`),
	);
	if (!prefix) return null;

	const value = base.slice(prefix.length + 1);
	const properties = BY_VALUE[prefix]?.[value] ?? PREFIXES[prefix];

	const expanded = new Set<string>();
	for (const property of properties) expand(property, expanded);

	return { variant, properties: expanded };
}

export type ClassValue = string | false | null | undefined;

export function merge(...input: ClassValue[]): string {
	const classes = input.filter(Boolean).join(" ").split(/\s+/).filter(Boolean);

	// Drop a class only once everything it sets is covered. `px-8 p-4` loses
	// `px-8`; `p-4 px-8` keeps both.
	const kept: string[] = [];
	const covered = new Map<string, Set<string>>();

	for (let i = classes.length - 1; i >= 0; i--) {
		const className = classes[i];
		const resolved = resolve(className);

		if (!resolved) {
			kept.push(className);
			continue;
		}

		const seen = covered.get(resolved.variant) ?? new Set<string>();
		if ([...resolved.properties].every((property) => seen.has(property))) {
			continue;
		}

		for (const property of resolved.properties) seen.add(property);
		covered.set(resolved.variant, seen);
		kept.push(className);
	}

	return kept.reverse().join(" ");
}

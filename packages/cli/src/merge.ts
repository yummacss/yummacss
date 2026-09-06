import { BY_VALUE, PREFIXES } from "./merge-map";

/**
 * Merges Yumma class strings so the **last** one wins.
 *
 * Every Yumma utility is a single-class selector, so they all have equal
 * specificity and the browser picks whichever sits later in the generated
 * stylesheet - not the order you wrote them. `c-white c-accent` renders white.
 * `merge` drops the class that loses instead, so the later one takes effect.
 *
 * @example
 * merge("c-white", "c-accent")   // "c-accent"
 * merge("px-8 p-4")              // "p-4"
 * merge("p-4 px-8")              // "p-4 px-8" - px says nothing about y
 * merge("d-f ai-c", isOpen && "c-accent")
 *
 * A class it does not recognise is passed through untouched, so your own
 * classes and any utility newer than this build are always kept.
 */

// Longest first, so `px` is matched before `p`.
const SORTED = Object.keys(PREFIXES).sort((a, b) => b.length - a.length);

// Core declares logical shorthands, which do not name what they cover. The
// only part of the table written by hand.
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

	// Later wins, so walk backwards and drop a class only once everything it
	// sets is already covered. `px-8 p-4` loses `px-8`; `p-4 px-8` keeps both,
	// because `px-8` says nothing about the block axis.
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

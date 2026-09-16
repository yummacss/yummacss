import type { ColorValue } from "@yummacss/core";
import {
	coreUtils,
	createColors,
	mediaQueries,
	pseudoClasses,
	pseudoElements,
} from "@yummacss/core";

interface Utility {
	prefix: string;
	values: Record<string, string>;
}

function buildIndex(): Map<string, Set<string>> {
	const index = new Map<string, Set<string>>();

	for (const utility of Object.values(coreUtils()) as Utility[]) {
		const values = index.get(utility.prefix) ?? new Set<string>();
		for (const value of Object.keys(utility.values)) values.add(value);
		index.set(utility.prefix, values);
	}

	return index;
}

const INDEX = buildIndex();
const PREFIXES = [...INDEX.keys()].sort((a, b) => b.length - a.length);

const COLOR_PREFIXES = new Set(
	(Object.values(coreUtils()) as Utility[])
		.filter((u) => "red-1" in u.values)
		.map((u) => u.prefix),
);

let customColors = new Set<string>();

export function useThemeColors(colors: Record<string, ColorValue> | undefined) {
	customColors = new Set(Object.keys(createColors(colors ?? {})));
}

const MEDIA = new Set<string>(mediaQueries.map((v) => v.prefix));
const CLASSES = new Set<string>(pseudoClasses.map((v) => v.prefix));
const ELEMENTS = new Set<string>(pseudoElements.map((v) => v.prefix));

const VARIANT_RENAMES: Record<string, string> = { d: "di" };

const VALUE_RENAMES: Record<string, Record<string, string>> = {
	tt: { n: "none" },
	tl: { a: "auto" },
};

export type MigrationResult =
	| { ok: true; className: string; changed: boolean }
	| { ok: false; reason: string };

function splitVariants(className: string): { variants: string; base: string } {
	let rest = className;
	let variants = "";

	while (true) {
		const match = /^(@?[a-z]+)(::|:)/.exec(rest);
		if (!match) break;

		const [full, rawName = "", separator] = match;
		const media = rawName.startsWith("@");
		const name = media ? rawName.slice(1) : rawName;

		const known =
			separator === "::"
				? ELEMENTS.has(name)
				: media
					? MEDIA.has(name)
					: CLASSES.has(name);
		if (!known) break;

		const renamed = media ? rawName : (VARIANT_RENAMES[name] ?? name);
		variants += `${renamed}${separator}`;
		rest = rest.slice(full.length);
	}

	return { variants, base: rest };
}

function splitPrefix(
	base: string,
): { prefix: string; value: string } | undefined {
	for (const prefix of PREFIXES) {
		if (!base.startsWith(`${prefix}-`)) continue;

		const rest = base.slice(prefix.length + 1);
		const negative = rest.startsWith("-");
		const lookup = negative ? rest.slice(1) : rest;

		const renamed = VALUE_RENAMES[prefix]?.[lookup];
		if (renamed) return { prefix, value: negative ? `-${renamed}` : renamed };

		if (INDEX.get(prefix)?.has(lookup)) return { prefix, value: rest };

		if (COLOR_PREFIXES.has(prefix) && customColors.has(lookup)) {
			return { prefix, value: rest };
		}
	}

	if (INDEX.get(base)?.has("")) return { prefix: base, value: "" };

	return undefined;
}

function attempt(
	original: string,
	body: string,
	suffix: string,
): MigrationResult | undefined {
	const { variants, base } = splitVariants(body);
	if (!base) return undefined;

	const split = splitPrefix(base);
	if (!split) return undefined;

	const migrated = split.value
		? `${variants}${split.prefix}:${split.value}${suffix}`
		: `${variants}${split.prefix}${suffix}`;

	return { ok: true, className: migrated, changed: migrated !== original };
}

export function migrateClass(name: string): MigrationResult {
	const whole = attempt(name, name, "");
	if (whole) return whole;

	const slash = name.lastIndexOf("/");
	if (slash > 0) {
		const withOpacity = attempt(name, name.slice(0, slash), name.slice(slash));
		if (withOpacity) return withOpacity;
	}

	return { ok: false, reason: "not a known utility" };
}

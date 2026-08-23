import type { ColorValue } from "@yummacss/core";
import {
	coreUtils,
	createColors,
	mediaQueries,
	pseudoClasses,
	pseudoElements,
} from "@yummacss/core";

/**
 * Rewrites v3 class names into the v4 colon syntax.
 *
 * The split point cannot be found with a regex. Prefixes contain dashes
 * (`max-h`, `bs-o`), and 34 of them are shadowed by a longer prefix, so
 * `bs-i-sm` could be read as `bs` + `i-sm` or `bs-i` + `sm`. Only one of
 * those has a value the utility actually accepts, which is why every
 * candidate split is checked against the value table before it is used.
 */

interface Utility {
	prefix: string;
	values: Record<string, string>;
}

/** Prefixes longest first, so `max-h` is tried before `m`. */
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

/**
 * The utilities that take a color, found by asking which ones accept a palette
 * entry rather than by listing them. A custom color in `theme.colors` is a
 * valid value for exactly these, so without it every branded class in a real
 * project would be skipped as unrecognized.
 */
const COLOR_PREFIXES = new Set(
	(Object.values(coreUtils()) as Utility[])
		.filter((u) => "red-1" in u.values)
		.map((u) => u.prefix),
);

let customColors = new Set<string>();

/** Adds the colors a project's config defines, so its own classes migrate. */
export function useThemeColors(colors: Record<string, ColorValue> | undefined) {
	customColors = new Set(Object.keys(createColors(colors ?? {})));
}

const MEDIA = new Set<string>(mediaQueries.map((v) => v.prefix));
const CLASSES = new Set<string>(pseudoClasses.map((v) => v.prefix));
const ELEMENTS = new Set<string>(pseudoElements.map((v) => v.prefix));

/**
 * Decision #5. `d` is `display` under the colon syntax, so the `:disabled`
 * variant cannot keep it: `d:f` would be both `display: flex` and a disabled
 * `f` utility.
 */
const VARIANT_RENAMES: Record<string, string> = { d: "di" };

/**
 * Decision #22. `none` & `auto` are never abbreviated, and these two predate
 * the rule. Recorded as a value rename rather than a prefix one.
 */
const VALUE_RENAMES: Record<string, Record<string, string>> = {
	tt: { n: "none" },
	tl: { a: "auto" },
};

export type MigrationResult =
	| { ok: true; className: string; changed: boolean }
	| { ok: false; reason: string };

/** Leading `@sm:`, `h:` & `b::` segments, in whatever order they appear. */
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

/**
 * The one split where the remainder is a value the utility accepts.
 *
 * Negative values are read here too: `m--4` is the prefix `m`, the separator,
 * then `-4`. In v4 that stops being a special case & becomes `m:-4`.
 */
function splitPrefix(
	base: string,
): { prefix: string; value: string } | undefined {
	for (const prefix of PREFIXES) {
		if (!base.startsWith(`${prefix}-`)) continue;

		const rest = base.slice(prefix.length + 1);
		const negative = rest.startsWith("-");
		const lookup = negative ? rest.slice(1) : rest;

		// Renames are checked first: `n` is still a valid `tt` value today, so
		// looking it up before renaming would keep the abbreviation forever.
		const renamed = VALUE_RENAMES[prefix]?.[lookup];
		if (renamed) return { prefix, value: negative ? `-${renamed}` : renamed };

		if (INDEX.get(prefix)?.has(lookup)) return { prefix, value: rest };

		if (COLOR_PREFIXES.has(prefix) && customColors.has(lookup)) {
			return { prefix, value: rest };
		}
	}

	// A utility whose whole name is the prefix, e.g. `italic` style shorthands.
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
	// The whole name is tried before any suffix is split off, because a slash
	// is not always an opacity modifier: `ar-16/9` is one value, & splitting
	// it would leave `ar-16`, which is not a class.
	const whole = attempt(name, name, "");
	if (whole) return whole;

	const slash = name.lastIndexOf("/");
	if (slash > 0) {
		const withOpacity = attempt(name, name.slice(0, slash), name.slice(slash));
		if (withOpacity) return withOpacity;
	}

	return { ok: false, reason: "not a known utility" };
}

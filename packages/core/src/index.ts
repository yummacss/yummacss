import type { Utilities } from "./interfaces";
import { core } from "./utilities";
import { background } from "./utilities/background";
import { border } from "./utilities/border";
import { boxModel } from "./utilities/box-model";
import { color } from "./utilities/color";
import { effect } from "./utilities/effect";
import { flexbox } from "./utilities/flexbox";
import { font } from "./utilities/font";
import { grid } from "./utilities/grid";
import { interactivity } from "./utilities/interactivity";
import { layout } from "./utilities/layout";
import { outline } from "./utilities/outline";
import { positioning } from "./utilities/positioning";
import { text } from "./utilities/text";
import { transform } from "./utilities/transform";
import { transition } from "./utilities/transition";
import {
	mediaQueries as mqList,
	pseudoClasses as pcList,
	pseudoElements as peList,
} from "./variants";

// functions
export const coreUtils = (): Utilities => core;
export const backgroundUtils = (): Utilities => background;
export const borderUtils = (): Utilities => border;
export const boxModelUtils = (): Utilities => boxModel;
export const colorUtils = (): Utilities => color;
export const effectUtils = (): Utilities => effect;
export const flexboxUtils = (): Utilities => flexbox;
export const fontUtils = (): Utilities => font;
export const gridUtils = (): Utilities => grid;
export const interactivityUtils = (): Utilities => interactivity;
export const layoutUtils = (): Utilities => layout;
export const outlineUtils = (): Utilities => outline;
export const positioningUtils = (): Utilities => positioning;
export const textUtils = (): Utilities => text;
export const transformUtils = (): Utilities => transform;
export const transitionUtils = (): Utilities => transition;

// theme
export { colorTheme } from "./defaults/theme";
// variants
export { mediaQueries as defaultMediaQueries } from "./defaults/variants/media-queries";
// helpers
export {
	type ColorPair,
	type ColorValue,
	createColors,
	generatePairedShades,
	generateShades,
	isColorPair,
} from "./helpers/create-colors";
// types
export type * from "./interfaces";
export * from "./variants";

/**
 * Splits a class into its variants and the utility they wrap.
 *
 * 4.0 gives variants and utilities the same separator, so ten pseudo-class
 * prefixes now collide with a utility prefix: `h:` is both `:hover` and
 * `height`. Splitting on every colon reads `h:m:4` as two variants, and
 * splitting on the last one reads it as the variant `h:m:`. Neither is right.
 *
 * A variant is only peeled when what remains is not already a utility, which
 * makes `h:4` a height, `h:m:4` a margin under `:hover`, and `h:h:4` a height
 * under `:hover`.
 *
 * Pseudo elements keep their `::`, since `a` is `:active` as a pseudo class
 * and `::after` as a pseudo element.
 */
export function splitVariants(className: string): {
	variants: string[];
	base: string;
} {
	const utils = Object.values(coreUtils()) as {
		prefix: string;
		values: Record<string, string>;
	}[];

	const isUtility = (name: string) =>
		utils.some((u) => {
			if (!name.startsWith(`${u.prefix}:`)) return false;
			const value = name.slice(u.prefix.length + 1);
			const lookup = value.startsWith("-") ? value.slice(1) : value;
			return lookup in u.values;
		});

	const media = new Set<string>(mqList.map((v) => v.prefix));
	const classes = new Set<string>(pcList.map((v) => v.prefix));
	const elements = new Set<string>(peList.map((v) => v.prefix));

	const variants: string[] = [];
	let rest = className;

	while (!isUtility(rest)) {
		const match = /^(@?[a-z]+)(::|:)/.exec(rest);
		if (!match) break;

		const [full, raw = "", separator] = match;
		const isMedia = raw.startsWith("@");
		const name = isMedia ? raw.slice(1) : raw;

		const known =
			separator === "::"
				? elements.has(name)
				: isMedia
					? media.has(name)
					: classes.has(name);
		if (!known) break;

		variants.push(separator === "::" ? `${raw}::` : raw);
		rest = rest.slice(full.length);
	}

	return { variants, base: rest };
}

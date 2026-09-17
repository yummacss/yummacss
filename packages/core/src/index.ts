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

export { colorTheme } from "./defaults/theme";
export { mediaQueries as defaultMediaQueries } from "./defaults/variants/media-queries";
export {
	type ColorPair,
	type ColorValue,
	createColors,
	generatePairedShades,
	generateShades,
	isColorPair,
} from "./helpers/create-colors";
export { acceptsNegative } from "./helpers/negatable";
export type * from "./interfaces";
export * from "./variants";

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
		const match = /^(@?[a-z0-9]+)(::|:)/.exec(rest);
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

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
export {
	type ColorPair,
	type ColorValue,
	createColors,
	generatePairedShades,
	generateShades,
	isColorPair,
} from "./helpers/create-colors";
// helpers
export { acceptsNegative } from "./helpers/negatable";
// types
export type * from "./interfaces";
export * from "./variants";

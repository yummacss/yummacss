import { core } from "./core";
import { background } from "./core/background";
import { border } from "./core/border";
import { boxModel } from "./core/box-model";
import { color } from "./core/color";
import { effect } from "./core/effect";
import { flexbox } from "./core/flexbox";
import { font } from "./core/font";
import { grid } from "./core/grid";
import { interactivity } from "./core/interactivity";
import { outline } from "./core/outline";
import { positioning } from "./core/positioning";
import { svg } from "./core/svg";
import { table } from "./core/table";
import { text } from "./core/text";
import { transform } from "./core/transform";
import { Utilities } from "./interfaces";

// all utilities
export const coreUtils = (): Utilities => core;

// individual utilities
export const backgroundUtils = (): Utilities => background;
export const borderUtils = (): Utilities => border;
export const boxModelUtils = (): Utilities => boxModel;
export const colorUtils = (): Utilities => color;
export const effectUtils = (): Utilities => effect;
export const flexboxUtils = (): Utilities => flexbox;
export const fontUtils = (): Utilities => font;
export const gridUtils = (): Utilities => grid;
export const interactivityUtils = (): Utilities => interactivity;
export const outlineUtils = (): Utilities => outline;
export const positioningUtils = (): Utilities => positioning;
export const svgUtils = (): Utilities => svg;
export const tableUtils = (): Utilities => table;
export const textUtils = (): Utilities => text;
export const transformUtils = (): Utilities => transform;

// types
export type * from "./interfaces";

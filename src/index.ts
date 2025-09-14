import { allUtils } from "./core";
import { backgroundUtils } from "./core/background";
import { borderUtils } from "./core/border";
import { boxModelUtils } from "./core/box-model";
import { colorUtils } from "./core/color";
import { effectUtils } from "./core/effect";
import { flexboxUtils } from "./core/flexbox";
import { fontUtils } from "./core/font";
import { gridUtils } from "./core/grid";
import { interactivityUtils } from "./core/interactivity";
import { outlineUtils } from "./core/outline";
import { positioningUtils } from "./core/positioning";
import { svgUtils } from "./core/svg";
import { tableUtils } from "./core/table";
import { textUtils } from "./core/text";
import { transformUtils } from "./core/transform";
import { Utilities } from "./interfaces";

// functions
export const getAllUtils = (): Utilities => allUtils;
export const getBackgroundUtils = (): Utilities => backgroundUtils;
export const getBorderUtils = (): Utilities => borderUtils;
export const getBoxModelUtils = (): Utilities => boxModelUtils;
export const getColorUtils = (): Utilities => colorUtils;
export const getEffectUtils = (): Utilities => effectUtils;
export const getFlexboxUtils = (): Utilities => flexboxUtils;
export const getFontUtils = (): Utilities => fontUtils;
export const getGridUtils = (): Utilities => gridUtils;
export const getInteractivityUtils = (): Utilities => interactivityUtils;
export const getOutlineUtils = (): Utilities => outlineUtils;
export const getPositioningUtils = (): Utilities => positioningUtils;
export const getSvgUtils = (): Utilities => svgUtils;
export const getTableUtils = (): Utilities => tableUtils;
export const getTextUtils = (): Utilities => textUtils;
export const getTransformUtils = (): Utilities => transformUtils;

// types
export type * from "./interfaces";

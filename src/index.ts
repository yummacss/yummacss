import { allUtilities } from "./core";
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
import { UtilityMap } from "./interfaces";

// all utilities
export const getAllUtils = (): UtilityMap => allUtilities;

// api
export const getBackgroundUtils = (): UtilityMap => backgroundUtils;
export const getBorderUtils = (): UtilityMap => borderUtils;
export const getBoxModelUtils = (): UtilityMap => boxModelUtils;
export const getColorUtils = (): UtilityMap => colorUtils;
export const getEffectUtils = (): UtilityMap => effectUtils;
export const getFlexboxUtils = (): UtilityMap => flexboxUtils;
export const getFontUtils = (): UtilityMap => fontUtils;
export const getGridUtils = (): UtilityMap => gridUtils;
export const getInteractivityUtils = (): UtilityMap => interactivityUtils;
export const getOutlineUtils = (): UtilityMap => outlineUtils;
export const getPositioningUtils = (): UtilityMap => positioningUtils;
export const getSvgUtils = (): UtilityMap => svgUtils;
export const getTableUtils = (): UtilityMap => tableUtils;
export const getTextUtils = (): UtilityMap => textUtils;
export const getTransformUtils = (): UtilityMap => transformUtils;

// types
export * from "./interfaces";

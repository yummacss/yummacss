import { UtilityMap } from "./interfaces";
import { allUtilities } from "./core/utilities";
import { backgroundUtils } from "./core/utilities/background";
import { borderUtils } from "./core/utilities/border";
import { boxModelUtils } from "./core/utilities/box-model";
import { colorUtils } from "./core/utilities/color";
import { effectUtils } from "./core/utilities/effect";
import { flexboxUtils } from "./core/utilities/flexbox";
import { gridUtils } from "./core/utilities/grid";
import { interactivityUtils } from "./core/utilities/interactivity";
import { outlineUtils } from "./core/utilities/outline";
import { positioningUtils } from "./core/utilities/positioning";
import { svgUtils } from "./core/utilities/svg";
import { tableUtils } from "./core/utilities/table";
import { transformUtils } from "./core/utilities/transform";
import { typographyUtils } from "./core/utilities/typography";

// main
export const getAllUtils = (): UtilityMap => allUtilities;

// specific
export const getBackgroundUtils = (): UtilityMap => backgroundUtils;
export const getBorderUtils = (): UtilityMap => borderUtils;
export const getBoxModelUtils = (): UtilityMap => boxModelUtils;
export const getColorUtils = (): UtilityMap => colorUtils;
export const getEffectUtils = (): UtilityMap => effectUtils;
export const getFlexboxUtils = (): UtilityMap => flexboxUtils;
export const getGridUtils = (): UtilityMap => gridUtils;
export const getInteractivityUtils = (): UtilityMap => interactivityUtils;
export const getOutlineUtils = (): UtilityMap => outlineUtils;
export const getPositioningUtils = (): UtilityMap => positioningUtils;
export const getSvgUtils = (): UtilityMap => svgUtils;
export const getTableUtils = (): UtilityMap => tableUtils;
export const getTransformUtils = (): UtilityMap => transformUtils;
export const getTypographyUtils = (): UtilityMap => typographyUtils;

// types
export * from "./interfaces";

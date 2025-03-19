import { UtilityMap } from "@/interfaces";
import { backgroundUtils } from "./background";
import { borderUtils } from "./border";
import { colorUtils } from "./color";
import { flexboxUtils } from "./flexbox";
import { gridUtils } from "./grid";
import { outlineUtils } from "./outline";
import { positioningUtils } from "./positioning";
import { svgUtils } from "./svg";
import { transformUtils } from "./transform";
import { typographyUtils } from "./typography";

export const allUtilities: UtilityMap = {
  ...backgroundUtils,
  ...borderUtils,
  ...colorUtils,
  ...flexboxUtils,
  ...gridUtils,
  ...outlineUtils,
  ...positioningUtils,
  ...svgUtils,
  ...transformUtils,
  ...typographyUtils,
};

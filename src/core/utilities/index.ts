import { UtilityMap } from "@/interfaces";

import { backgroundUtils } from "./background";
import { borderUtils } from "./border";
import { boxModelUtils } from "./box-model";
import { colorUtils } from "./color";
import { effectUtils } from "./effect";
import { flexboxUtils } from "./flexbox";
import { gridUtils } from "./grid";
import { outlineUtils } from "./outline";
import { positioningUtils } from "./positioning";
import { svgUtils } from "./svg";
import { tableUtils } from "./table";
import { transformUtils } from "./transform";
import { typographyUtils } from "./typography";

export const allUtilities: UtilityMap = {
  ...backgroundUtils,
  ...borderUtils,
  ...boxModelUtils,
  ...colorUtils,
  ...effectUtils,
  ...flexboxUtils,
  ...gridUtils,
  ...outlineUtils,
  ...positioningUtils,
  ...svgUtils,
  ...tableUtils,
  ...transformUtils,
  ...typographyUtils,
};

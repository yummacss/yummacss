import { UtilityMap } from "@/interfaces";

import { backgroundUtils } from "./background";
import { borderUtils } from "./border";
import { boxModelUtils } from "./box-model";
import { colorUtils } from "./color";
import { effectUtils } from "./effect";
import { flexboxUtils } from "./flexbox";
import { fontUtils } from "./font";
import { gridUtils } from "./grid";
import { interactivityUtils } from "./interactivity";
import { outlineUtils } from "./outline";
import { positioningUtils } from "./positioning";
import { svgUtils } from "./svg";
import { tableUtils } from "./table";
import { textUtils } from "./text";
import { transformUtils } from "./transform";

export const allUtilities: UtilityMap = {
  ...backgroundUtils,
  ...borderUtils,
  ...boxModelUtils,
  ...colorUtils,
  ...effectUtils,
  ...flexboxUtils,
  ...fontUtils,
  ...gridUtils,
  ...interactivityUtils,
  ...outlineUtils,
  ...positioningUtils,
  ...svgUtils,
  ...tableUtils,
  ...textUtils,
  ...transformUtils,
};

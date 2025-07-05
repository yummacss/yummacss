import { UtilityMap } from "@/interfaces";
import { createValues } from "@/helpers/create-values";
import { YMA_OUTLINE_OFFSET, YMA_OUTLINE_WIDTH } from "@/constants/variables";

export const outlineUtils: UtilityMap = {
  "outline-offset": {
    prefix: "oo",
    properties: ["outline-offset"],
    slug: "outline-offset",
    values: createValues({
      base: YMA_OUTLINE_OFFSET,
      unit: "px",
      min: 0,
      max: 4,
    }),
  },

  "outline-style": {
    prefix: "os",
    properties: ["outline-style"],
    slug: "outline-style",
    values: {
      none: "none",
      d: "dashed",
      s: "solid",
    },
  },

  "outline-width": {
    prefix: "ow",
    properties: ["outline-width"],
    slug: "outline-width",
    values: createValues({
      base: YMA_OUTLINE_WIDTH,
      unit: "px",
      min: 0,
      max: 4,
    }),
  },
};

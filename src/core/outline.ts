import { YCSS_OUTLINE_OFFSET, YCSS_OUTLINE_WIDTH } from "@/constants/variables";
import { createValues } from "@/helpers/create-values";
import { UtilityMap } from "@/interfaces";

export const outlineUtils: UtilityMap = {
  "outline-offset": {
    prefix: "oo",
    properties: ["outline-offset"],
    slug: "outline-offset",
    values: createValues({
      base: YCSS_OUTLINE_OFFSET,
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
      base: YCSS_OUTLINE_WIDTH,
      unit: "px",
      min: 0,
      max: 4,
    }),
  },
};

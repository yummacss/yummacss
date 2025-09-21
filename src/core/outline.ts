import { outlineOffset, outlineWidth } from "@/defaults/variables";
import { createValues } from "@/helpers/create-values";
import { Utilities } from "@/interfaces";

export const outlineUtils: Utilities = {
  "outline-offset": {
    prefix: "oo",
    properties: ["outline-offset"],
    slug: "outline-offset",
    values: createValues({
      base: outlineOffset,
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
      base: outlineWidth,
      unit: "px",
      min: 0,
      max: 4,
    }),
  },
};

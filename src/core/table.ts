import { standardPreset } from "@/defaults/variants/preset";
import { Utilities } from "@/interfaces";

export const table: Utilities = {
  "caption-side": {
    prefix: "cs",
    properties: ["caption-side"],
    slug: "caption-side",
    values: {
      t: "top",
      b: "bottom",
    },
    variants: standardPreset,
  },

  "table-layout": {
    prefix: "tl",
    properties: ["table-layout"],
    slug: "table-layout",
    values: {
      a: "auto",
      f: "fixed",
    },
    variants: standardPreset,
  },
};

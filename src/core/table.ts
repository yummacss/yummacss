import { UtilityMap } from "@/interfaces";

export const tableUtils: UtilityMap = {
  "caption-side": {
    prefix: "cs",
    properties: ["caption-side"],
    slug: "caption-side",
    values: {
      t: "top",
      b: "bottom",
    },
  },

  "table-layout": {
    prefix: "tl",
    properties: ["table-layout"],
    slug: "table-layout",
    values: {
      a: "auto",
      f: "fixed",
    },
  },
};

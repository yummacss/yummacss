import { variantValues } from "@/defaults/variants/core";
import { Utilities } from "@/interfaces";
export const svg: Utilities = {
  "stroke-width": {
    prefix: "sw",
    properties: ["stroke-width"],
    slug: "stroke-width",
    values: {
      "0": "0",
      "2": "0.2",
      "4": "0.4",
      "6": "0.6",
      "8": "0.8",
      "1": "1",
    },
    variants: {
      ...variantValues,
    },
  },
};

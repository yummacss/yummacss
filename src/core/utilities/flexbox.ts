import { UtilityMap } from "@/interfaces";
import { createValues } from "@/helpers/create-values";
import { YMA_FLEX_BASIS } from "@/constants/variables";

export const flexboxUtils: UtilityMap = {
  "align-content": {
    prefix: "ac",
    properties: ["align-content"],
    slug: "align-content",
    values: {
      b: "baseline",
      c: "center",
      fe: "flex-end",
      fs: "flex-start",
      n: "normal",
      st: "stretch",
      sa: "space-around",
      sb: "space-between",
      se: "space-evenly",
    },
  },

  "align-items": {
    prefix: "ai",
    properties: ["align-items"],
    slug: "align-items",
    values: {
      b: "baseline",
      c: "center",
      fe: "flex-end",
      fs: "flex-start",
      st: "stretch",
    },
  },

  "align-self": {
    prefix: "as",
    properties: ["align-self"],
    slug: "align-self",
    values: {
      auto: "auto",
      b: "baseline",
      c: "center",
      fe: "flex-end",
      fs: "flex-start",
      st: "stretch",
    },
  },

  "flex-basis": {
    prefix: "fb",
    properties: ["flex-basis"],
    slug: "flex-basis",
    values: {
      ...createValues({
        base: YMA_FLEX_BASIS,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      full: "100%",
      half: "50%",
    },
  },

  "flex-direction": {
    prefix: "fd",
    properties: ["flex-direction"],
    slug: "flex-direction",
    values: {
      c: "column",
      cr: "column-reverse",
      r: "row",
      rr: "row-reverse",
    },
  },

  "flex-grow": {
    prefix: "fg",
    properties: ["flex-grow"],
    slug: "flex-grow",
    values: createValues({
      base: 1,
      min: 0,
      max: 8,
    }),
  },

  "flex-shrink": {
    prefix: "fs",
    properties: ["flex-shrink"],
    slug: "flex-shrink",
    values: createValues({
      base: 1,
      min: 0,
      max: 8,
    }),
  },

  "flex-wrap": {
    prefix: "fw",
    properties: ["flex-wrap"],
    slug: "flex-wrap",
    values: {
      nw: "nowrap",
      w: "wrap",
      wr: "wrap-reverse",
    },
  },

  flex: {
    prefix: "f",
    properties: ["flex"],
    slug: "flex",
    values: {
      "1": "1 1 0%",
      "2": "2 2 0%",
      "3": "3 3 0%",
      "4": "4 4 0%",
      "5": "5 5 0%",
      "6": "6 6 0%",
      auto: "1 1 auto",
      none: "none",
    },
  },

  "justify-content": {
    prefix: "jc",
    properties: ["justify-content"],
    slug: "justify-content",
    values: {
      c: "center",
      fe: "flex-end",
      fs: "flex-start",
      n: "normal",
      st: "stretch",
      sa: "space-around",
      sb: "space-between",
      se: "space-evenly",
    },
  },

  "justify-items": {
    prefix: "ji",
    properties: ["justify-items"],
    slug: "justify-items",
    values: {
      c: "center",
      e: "end",
      s: "start",
      st: "stretch",
    },
  },

  "justify-self": {
    prefix: "js",
    properties: ["justify-self"],
    slug: "justify-self",
    values: {
      auto: "auto",
      c: "center",
      e: "end",
      s: "start",
      st: "stretch",
    },
  },

  order: {
    prefix: "or",
    properties: ["order"],
    slug: "order",
    values: {
      l: "-9999",
      "0": "0",
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9",
      "10": "10",
      f: "9999",
    },
  },
};

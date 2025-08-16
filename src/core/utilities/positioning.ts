import { YMA_BOTTOM_LEFT_TOP_RIGHT } from "@/constants/variables";
import { createValues } from "@/helpers/create-values";
import { UtilityMap } from "@/interfaces";

export const positioningUtils: UtilityMap = {
  "aspect-ratio": {
    prefix: "ar",
    properties: ["aspect-ratio"],
    slug: "aspect-ratio",
    values: {
      auto: "auto",
      "1/1": "1/1",
      "1/2": "1/2",
      "16/9": "16/9",
      "2/1": "2/1",
      "2/3": "2/3",
      "3/2": "3/2",
      "9/16": "9/16",
    },
  },

  clear: {
    prefix: "cl",
    properties: ["clear"],
    slug: "clear",
    values: {
      b: "both",
      ie: "inline-end",
      is: "inline-start",
      l: "left",
      none: "none",
      r: "right",
    },
  },

  columns: {
    prefix: "c",
    properties: ["columns"],
    slug: "columns",
    values: createValues({
      base: 1,
      min: 1,
      max: 16,
    }),
  },

  bottom: {
    prefix: "bo",
    properties: ["bottom"],
    slug: "bottom",
    values: {
      ...createValues({
        base: YMA_BOTTOM_LEFT_TOP_RIGHT,
        unit: "rem",
        min: 0,
        max: 16,
      }),
      full: "100%",
      half: "50%",
    },
  },

  inset: {
    prefix: "i",
    properties: ["inset"],
    slug: "inset",
    values: {
      ...createValues({
        base: YMA_BOTTOM_LEFT_TOP_RIGHT,
        unit: "rem",
        min: 0,
        max: 16,
      }),
      full: "100%",
      half: "50%",
    },
  },

  "inset-x": {
    prefix: "ix",
    properties: ["left", "right"],
    slug: "inset-x",
    values: {
      ...createValues({
        base: YMA_BOTTOM_LEFT_TOP_RIGHT,
        unit: "rem",
        min: 0,
        max: 16,
      }),
      full: "100%",
      half: "50%",
    },
  },

  "inset-y": {
    prefix: "iy",
    properties: ["top", "bottom"],
    slug: "inset-y",
    values: {
      ...createValues({
        base: YMA_BOTTOM_LEFT_TOP_RIGHT,
        unit: "rem",
        min: 0,
        max: 16,
      }),
      full: "100%",
      half: "50%",
    },
  },

  isolation: {
    prefix: "i",
    properties: ["isolation"],
    slug: "isolation",
    values: {
      auto: "auto",
      i: "isolate",
    },
  },

  left: {
    prefix: "l",
    properties: ["left"],
    slug: "left",
    values: {
      ...createValues({
        base: YMA_BOTTOM_LEFT_TOP_RIGHT,
        unit: "rem",
        min: 0,
        max: 16,
      }),
      full: "100%",
      half: "50%",
    },
  },

  right: {
    prefix: "r",
    properties: ["right"],
    slug: "right",
    values: {
      ...createValues({
        base: YMA_BOTTOM_LEFT_TOP_RIGHT,
        unit: "rem",
        min: 0,
        max: 16,
      }),
      full: "100%",
      half: "50%",
    },
  },

  top: {
    prefix: "t",
    properties: ["top"],
    slug: "top",
    values: {
      ...createValues({
        base: YMA_BOTTOM_LEFT_TOP_RIGHT,
        unit: "rem",
        min: 0,
        max: 16,
      }),
      full: "100%",
      half: "50%",
    },
  },

  display: {
    prefix: "d",
    properties: ["display"],
    slug: "display",
    values: {
      b: "block",
      f: "flex",
      fr: "flow-root",
      g: "grid",
      i: "inline",
      ib: "inline-block",
      if: "inline-flex",
      ig: "inline-grid",
      it: "inline-table",
      none: "none",
      t: "table",
      tc: "table-cell",
      tco: "table-column",
      tr: "table-row",
    },
  },

  float: {
    prefix: "fl",
    properties: ["float"],
    slug: "float",
    values: {
      ie: "inline-end",
      is: "inline-start",
      l: "left",
      none: "none",
      r: "right",
    },
  },

  "object-fit": {
    prefix: "of",
    properties: ["object-fit"],
    slug: "object-fit",
    values: {
      c: "cover",
      f: "fill",
      none: "none",
      sd: "scale-down",
    },
  },

  "object-position": {
    prefix: "op",
    properties: ["object-position"],
    slug: "object-position",
    values: {
      b: "bottom",
      c: "center",
      l: "left",
      lb: "left bottom",
      lt: "left top",
      r: "right",
      rb: "right bottom",
      rt: "right top",
      t: "top",
    },
  },

  overflow: {
    prefix: "o",
    properties: ["overflow"],
    slug: "overflow",
    values: {
      auto: "auto",
      c: "clip",
      h: "hidden",
      s: "scroll",
      v: "visible",
    },
  },

  "overflow-x": {
    prefix: "o-x",
    properties: ["overflow-x"],
    slug: "overflow-x",
    values: {
      auto: "auto",
      c: "clip",
      h: "hidden",
      s: "scroll",
      v: "visible",
    },
  },

  "overflow-y": {
    prefix: "o-y",
    properties: ["overflow-y"],
    slug: "overflow-y",
    values: {
      auto: "auto",
      c: "clip",
      h: "hidden",
      s: "scroll",
      v: "visible",
    },
  },

  position: {
    prefix: "p",
    properties: ["position"],
    slug: "position",
    values: {
      a: "absolute",
      f: "fixed",
      r: "relative",
      s: "static",
      st: "sticky",
    },
  },

  visibility: {
    prefix: "v",
    properties: ["visibility"],
    slug: "visibility",
    values: {
      c: "collapse",
      h: "hidden",
      v: "visible",
    },
  },

  "z-index": {
    prefix: "zi",
    properties: ["z-index"],
    slug: "z-index",
    values: {
      "0": "0",
      "10": "10",
      "20": "20",
      "30": "30",
      "40": "40",
      "50": "50",
      "60": "60",
      "70": "70",
      "80": "80",
      "90": "90",
      auto: "auto",
    },
  },
};

import { margin, padding } from "@/defaults/variables";
import { defaultSet } from "@/defaults/variants/sets";
import { createValues } from "@/helpers/create-values";
import { Utilities } from "@/interfaces";

export const interactivity: Utilities = {
  appearance: {
    prefix: "a",
    properties: ["appearance"],
    slug: "appearance",
    values: {
      auto: "auto",
      none: "none",
    },
    variants: {
      ...defaultSet,
    },
  },

  cursor: {
    prefix: "c",
    properties: ["cursor"],
    slug: "cursor",
    values: {
      auto: "auto",
      ch: "crosshair",
      cr: "col-resize",
      d: "default",
      h: "help",
      m: "move",
      na: "not-allowed",
      ner: "ne-resize",
      neswr: "nesw-resize",
      none: "none",
      nr: "n-resize",
      nwr: "nw-resize",
      nwser: "nwse-resize",
      p: "pointer",
      pr: "progress",
      rs: "row-resize",
      ser: "se-resize",
      sr: "s-resize",
      swr: "sw-resize",
      t: "text",
      w: "wait",
      wr: "w-resize",
      zi: "zoom-in",
      zo: "zoom-out",
    },
    variants: {
      ...defaultSet,
    },
  },

  "field-sizing": {
    prefix: "fs",
    properties: ["field-sizing"],
    slug: "field-sizing",
    values: {
      f: "fixed",
      c: "content",
    },
    variants: {
      ...defaultSet,
    },
  },

  "pointer-events": {
    prefix: "pe",
    properties: ["pointer-events"],
    slug: "pointer-events",
    values: {
      auto: "auto",
      none: "none",
    },
    variants: {
      ...defaultSet,
    },
  },

  resize: {
    prefix: "r",
    properties: ["resize"],
    slug: "resize",
    values: {
      b: "both",
      h: "horizontal",
      none: "none",
      v: "vertical",
    },
    variants: {
      ...defaultSet,
    },
  },

  "scroll-behavior": {
    prefix: "sb",
    properties: ["scroll-behavior"],
    slug: "scroll-behavior",
    values: {
      auto: "auto",
      s: "smooth",
    },
    variants: {
      ...defaultSet,
    },
  },

  "scroll-margin": {
    prefix: "sm",
    properties: ["scroll-margin"],
    slug: "scroll-margin",
    values: createValues({
      base: margin,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-margin-bottom": {
    prefix: "smb",
    properties: ["scroll-margin-bottom"],
    slug: "scroll-margin/#bottom",
    values: createValues({
      base: margin,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-margin-inline-start": {
    prefix: "smis",
    properties: ["scroll-margin-inline-start"],
    slug: "scroll-margin/#inline-start",
    values: createValues({
      base: margin,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-margin-left": {
    prefix: "sml",
    properties: ["scroll-margin-left"],
    slug: "scroll-margin/#scroll-margin-left",
    values: createValues({
      base: margin,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-margin-right": {
    prefix: "smr",
    properties: ["scroll-margin-right"],
    slug: "scroll-margin/#scroll-margin-right",
    values: createValues({
      base: margin,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-margin-top": {
    prefix: "smt",
    properties: ["scroll-margin-top"],
    slug: "scroll-margin/#scroll-margin-top",
    values: createValues({
      base: margin,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-margin-inline-end": {
    prefix: "smie",
    properties: ["scroll-margin-inline-end"],
    slug: "scroll-margin/#scroll-margin-inline-end",
    values: createValues({
      base: margin,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-margin-x": {
    prefix: "smx",
    properties: ["scroll-margin-left", "scroll-margin-right"],
    slug: "scroll-margin/#scroll-margin-x",
    values: createValues({
      base: margin,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-margin-y": {
    prefix: "smy",
    properties: ["scroll-margin-bottom", "scroll-margin-top"],
    slug: "scroll-margin/#scroll-margin-y",
    values: createValues({
      base: margin,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-padding": {
    prefix: "sp",
    properties: ["scroll-padding"],
    slug: "scroll-padding",
    values: createValues({
      base: padding,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-padding-bottom": {
    prefix: "spb",
    properties: ["scroll-padding-bottom"],
    slug: "scroll-padding/#bottom",
    values: createValues({
      base: padding,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-padding-inline-start": {
    prefix: "spis",
    properties: ["scroll-padding-inline-start"],
    slug: "scroll-padding/#scroll-padding-inline-start",
    values: createValues({
      base: padding,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-padding-left": {
    prefix: "spl",
    properties: ["scroll-padding-left"],
    slug: "scroll-padding/#scroll-padding-left",
    values: createValues({
      base: padding,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-padding-right": {
    prefix: "spr",
    properties: ["scroll-padding-right"],
    slug: "scroll-padding/#scroll-padding-right",
    values: createValues({
      base: padding,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-padding-top": {
    prefix: "spt",
    properties: ["scroll-padding-top"],
    slug: "scroll-padding/#scroll-padding-top",
    values: createValues({
      base: padding,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-padding-inline-end": {
    prefix: "spie",
    properties: ["scroll-padding-inline-end"],
    slug: "scroll-padding/#scroll-padding-inline-end",
    values: createValues({
      base: padding,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-padding-x": {
    prefix: "spx",
    properties: ["scroll-padding-left", "scroll-padding-right"],
    slug: "scroll-padding/#scroll-padding-x",
    values: createValues({
      base: padding,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-padding-y": {
    prefix: "spy",
    properties: ["scroll-padding-bottom", "scroll-padding-top"],
    slug: "scroll-padding/#scroll-padding-y",
    values: createValues({
      base: padding,
      unit: "rem",
      min: 0,
      max: 100,
    }),
    variants: {
      ...defaultSet,
    },
  },

  "scroll-snap-align": {
    prefix: "ssa",
    properties: ["scroll-snap-align"],
    slug: "scroll-snap-align",
    values: {
      c: "center",
      e: "end",
      none: "none",
      s: "start",
    },
    variants: {
      ...defaultSet,
    },
  },

  "scroll-snap-stop": {
    prefix: "sss",
    properties: ["scroll-snap-stop"],
    slug: "scroll-snap-stop",
    values: {
      a: "always",
      n: "normal",
    },
    variants: {
      ...defaultSet,
    },
  },

  "scroll-snap-type": {
    prefix: "sst",
    properties: ["scroll-snap-type"],
    slug: "scroll-snap-type",
    values: {
      "b-m": "both mandatory",
      none: "none",
      "x-m": "x mandatory",
      "x-p": "x proximity",
      "y-m": "y mandatory",
      "y-p": "y proximity",
    },
    variants: {
      ...defaultSet,
    },
  },

  "user-select": {
    prefix: "us",
    properties: ["user-select"],
    slug: "user-select",
    values: {
      a: "all",
      auto: "auto",
      none: "none",
      t: "text",
    },
    variants: {
      ...defaultSet,
    },
  },
};

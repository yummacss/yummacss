import { UtilityMap } from "@/interfaces";
import { createValues } from "@/core/helpers/create-values";
import { YMA_BORDER, YMA_BORDER_RADIUS, YMA_BORDER_SPACING } from "@/constants/variables";

export const borderUtils: UtilityMap = {
  "border-collapse": {
    prefix: "bc",
    properties: ["border-collapse"],
    slug: "border-collapse",
    values: {
      c: "collapse",
      s: "separate",
    },
  },

  "border-radius": {
    prefix: "rad",
    properties: ["border-radius"],
    slug: "border-radius",
    values: {
      ...createValues({
        base: YMA_BORDER_RADIUS,
        unit: "rem",
        min: 0,
        max: 8,
      }),
      full: "100%",
      half: "50%",
    },
  },

  "border-bottom-radius": {
    prefix: "rad-b",
    properties: ["border-bottom-left-radius", "border-bottom-right-radius"],
    slug: "border-radius/#bottom-radius",
    values: createValues({
      base: YMA_BORDER_RADIUS,
      unit: "rem",
      min: 0,
      max: 8,
    }),
  },

  "border-left-radius": {
    prefix: "rad-l",
    properties: ["border-bottom-left-radius", "border-top-left-radius"],
    slug: "border-radius/#left-radius",
    values: createValues({
      base: YMA_BORDER_RADIUS,
      unit: "rem",
      min: 0,
      max: 8,
    }),
  },

  "border-right-radius": {
    prefix: "rad-r",
    properties: ["border-bottom-right-radius", "border-top-right-radius"],
    slug: "border-radius/#right-radius",
    values: createValues({
      base: YMA_BORDER_RADIUS,
      unit: "rem",
      min: 0,
      max: 8,
    }),
  },

  "border-bottom-left-radius": {
    prefix: "rad-bl",
    properties: ["border-bottom-left-radius"],
    slug: "border-radius/#bottom-left-radius",
    values: createValues({
      base: YMA_BORDER_RADIUS,
      unit: "rem",
      min: 0,
      max: 8,
    }),
  },

  "border-bottom-right-radius": {
    prefix: "rad-br",
    properties: ["border-bottom-right-radius"],
    slug: "border-radius/#bottom-right-radius",
    values: createValues({
      base: YMA_BORDER_RADIUS,
      unit: "rem",
      min: 0,
      max: 8,
    }),
  },

  "border-top-radius": {
    prefix: "rad-t",
    properties: ["border-top-left-radius", "border-top-right-radius"],
    slug: "border-radius/#top-radius",
    values: createValues({
      base: YMA_BORDER_RADIUS,
      unit: "rem",
      min: 0,
      max: 8,
    }),
  },

  "border-top-left-radius": {
    prefix: "rad-tl",
    properties: ["border-top-left-radius"],
    slug: "border-radius/#top-left-radius",
    values: createValues({
      base: YMA_BORDER_RADIUS,
      unit: "rem",
      min: 0,
      max: 8,
    }),
  },

  "border-top-right-radius": {
    prefix: "rad-tr",
    properties: ["border-top-right-radius"],
    slug: "border-radius/#top-right-radius",
    values: createValues({
      base: YMA_BORDER_RADIUS,
      unit: "rem",
      min: 0,
      max: 8,
    }),
  },

  "border-spacing": {
    prefix: "bs",
    properties: ["border-spacing"],
    slug: "border-spacing",
    values: createValues({
      base: YMA_BORDER_SPACING,
      unit: "rem",
      min: 0,
      max: 8,
    }),
  },

  "border-style": {
    prefix: "b",
    properties: ["border-style"],
    slug: "border-style",
    values: {
      none: "none",
      d: "dashed",
      s: "solid",
    },
  },

  "border-width": {
    prefix: "b",
    properties: ["border-width"],
    slug: "border-width",
    values: createValues({
      base: YMA_BORDER,
      unit: "px",
      min: 0,
      max: 8,
    }),
  },

  "border-bottom-width": {
    prefix: "bb",
    properties: ["border-bottom-width"],
    slug: "border-bottom-radius",
    values: createValues({
      base: YMA_BORDER,
      unit: "px",
      min: 0,
      max: 8,
    }),
  },

  "border-left-width": {
    prefix: "bl",
    properties: ["border-left-width"],
    slug: "border-width/#left-width",
    values: createValues({
      base: YMA_BORDER,
      unit: "px",
      min: 0,
      max: 8,
    }),
  },

  "border-right-width": {
    prefix: "br",
    properties: ["border-right-width"],
    slug: "border-width/#right-width",
    values: createValues({
      base: YMA_BORDER,
      unit: "px",
      min: 0,
      max: 8,
    }),
  },

  "border-top-width": {
    prefix: "bt",
    properties: ["border-top-width"],
    slug: "border-width/#top-width",
    values: createValues({
      base: YMA_BORDER,
      unit: "px",
      min: 0,
      max: 8,
    }),
  },
};

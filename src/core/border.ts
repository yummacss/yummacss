import { borderRadius, borderSpacing, borderWidth } from "@/defaults/variables";
import { mediaQueries, pseudoClasses } from "@/defaults/variants";
import { createValues } from "@/helpers/create-values";
import { Utilities } from "@/interfaces";

export const border: Utilities = {
  "border-collapse": {
    prefix: "bc",
    properties: ["border-collapse"],
    slug: "border-collapse",
    values: {
      c: "collapse",
      s: "separate",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-radius": {
    prefix: "rad",
    properties: ["border-radius"],
    slug: "border-radius",
    values: {
      ...createValues({
        base: borderRadius,
        unit: "rem",
        min: 0,
        max: 8,
      }),
      full: "100%",
      half: "50%",
      "9": "9999px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-bottom-radius": {
    prefix: "rad-b",
    properties: ["border-bottom-left-radius", "border-bottom-right-radius"],
    slug: "border-radius/#bottom-radius",
    values: {
      ...createValues({
        base: borderRadius,
        unit: "rem",
        min: 0,
        max: 8,
      }),
      full: "100%",
      half: "50%",
      "9": "9999px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-left-radius": {
    prefix: "rad-l",
    properties: ["border-bottom-left-radius", "border-top-left-radius"],
    slug: "border-radius/#left-radius",
    values: {
      ...createValues({
        base: borderRadius,
        unit: "rem",
        min: 0,
        max: 8,
      }),
      full: "100%",
      half: "50%",
      "9": "9999px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-right-radius": {
    prefix: "rad-r",
    properties: ["border-bottom-right-radius", "border-top-right-radius"],
    slug: "border-radius/#right-radius",
    values: {
      ...createValues({
        base: borderRadius,
        unit: "rem",
        min: 0,
        max: 8,
      }),
      full: "100%",
      half: "50%",
      "9": "9999px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-bottom-left-radius": {
    prefix: "rad-bl",
    properties: ["border-bottom-left-radius"],
    slug: "border-radius/#bottom-left-radius",
    values: {
      ...createValues({
        base: borderRadius,
        unit: "rem",
        min: 0,
        max: 8,
      }),
      full: "100%",
      half: "50%",
      "9": "9999px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-bottom-right-radius": {
    prefix: "rad-br",
    properties: ["border-bottom-right-radius"],
    slug: "border-radius/#bottom-right-radius",
    values: {
      ...createValues({
        base: borderRadius,
        unit: "rem",
        min: 0,
        max: 8,
      }),
      full: "100%",
      half: "50%",
      "9": "9999px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-top-radius": {
    prefix: "rad-t",
    properties: ["border-top-left-radius", "border-top-right-radius"],
    slug: "border-radius/#top-radius",
    values: {
      ...createValues({
        base: borderRadius,
        unit: "rem",
        min: 0,
        max: 8,
      }),
      full: "100%",
      half: "50%",
      "9": "9999px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-top-left-radius": {
    prefix: "rad-tl",
    properties: ["border-top-left-radius"],
    slug: "border-radius/#top-left-radius",
    values: {
      ...createValues({
        base: borderRadius,
        unit: "rem",
        min: 0,
        max: 8,
      }),
      full: "100%",
      half: "50%",
      "9": "9999px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-top-right-radius": {
    prefix: "rad-tr",
    properties: ["border-top-right-radius"],
    slug: "border-radius/#top-right-radius",
    values: {
      ...createValues({
        base: borderRadius,
        unit: "rem",
        min: 0,
        max: 8,
      }),
      full: "100%",
      half: "50%",
      "9": "9999px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-spacing": {
    prefix: "bs",
    properties: ["border-spacing"],
    slug: "border-spacing",
    values: createValues({
      base: borderSpacing,
      unit: "rem",
      min: 0,
      max: 8,
    }),
    variants: {
      pseudoClasses,
      mediaQueries,
    },
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
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-width": {
    prefix: "b",
    properties: ["border-width"],
    slug: "border-width",
    values: createValues({
      base: borderWidth,
      unit: "px",
      min: 0,
      max: 8,
    }),
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-bottom-width": {
    prefix: "bb",
    properties: ["border-bottom-width"],
    slug: "border-bottom-radius",
    values: createValues({
      base: borderWidth,
      unit: "px",
      min: 0,
      max: 8,
    }),
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-left-width": {
    prefix: "bl",
    properties: ["border-left-width"],
    slug: "border-width/#left-width",
    values: createValues({
      base: borderWidth,
      unit: "px",
      min: 0,
      max: 8,
    }),
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-right-width": {
    prefix: "br",
    properties: ["border-right-width"],
    slug: "border-width/#right-width",
    values: createValues({
      base: borderWidth,
      unit: "px",
      min: 0,
      max: 8,
    }),
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "border-top-width": {
    prefix: "bt",
    properties: ["border-top-width"],
    slug: "border-width/#top-width",
    values: createValues({
      base: borderWidth,
      unit: "px",
      min: 0,
      max: 8,
    }),
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
};

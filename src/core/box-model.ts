import { dimension, height, margin, padding, width } from "@/defaults/variables";
import { mediaQueries, pseudoClasses } from "@/defaults/variants";
import { createValues } from "@/helpers/create-values";
import { Utilities } from "@/interfaces";

export const boxModel: Utilities = {
  "box-sizing": {
    prefix: "bs",
    properties: ["box-sizing"],
    slug: "box-sizing",
    values: {
      bb: "border-box",
      cb: "content-box",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  dimension: {
    prefix: "d",
    properties: ["height", "width"],
    slug: "dimension",
    values: {
      ...createValues({
        base: dimension,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      dvw: "100dvw",
      vh: "100vh",
      vw: "100vw",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
      px: "1px",
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      xxl: "96rem",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "max-dimension": {
    prefix: "max-d",
    properties: ["max-height", "max-width"],
    slug: "dimension/#max-dimension",
    values: {
      ...createValues({
        base: dimension,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      dvw: "100dvw",
      vh: "100vh",
      vw: "100vw",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
      px: "1px",
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      xxl: "96rem",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "min-dimension": {
    prefix: "min-d",
    properties: ["min-height", "min-width"],
    slug: "dimension/#min-dimension",
    values: {
      ...createValues({
        base: dimension,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      dvw: "100dvw",
      vh: "100vh",
      vw: "100vw",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
      px: "1px",
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      xxl: "96rem",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  height: {
    prefix: "h",
    properties: ["height"],
    slug: "height",
    values: {
      ...createValues({
        base: height,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      dvw: "100dvw",
      vh: "100vh",
      vw: "100vw",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
      px: "1px",
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      xxl: "96rem",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "max-height": {
    prefix: "max-h",
    properties: ["max-height"],
    slug: "height/#max-height",
    values: {
      ...createValues({
        base: height,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      dvw: "100dvw",
      vh: "100vh",
      vw: "100vw",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
      px: "1px",
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      xxl: "96rem",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "min-height": {
    prefix: "min-h",
    properties: ["min-height"],
    slug: "height/#min-height",
    values: {
      ...createValues({
        base: height,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      dvw: "100dvw",
      vh: "100vh",
      vw: "100vw",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
      px: "1px",
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      xxl: "96rem",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  margin: {
    prefix: "m",
    properties: ["margin"],
    slug: "margin",
    values: {
      ...createValues({
        base: margin,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "margin-block-end": {
    prefix: "mbe",
    properties: ["margin-block-end"],
    slug: "margin/#block-end",
    values: {
      ...createValues({
        base: margin,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "margin-block-start": {
    prefix: "mbs",
    properties: ["margin-block-start"],
    slug: "margin/#block-start",
    values: {
      ...createValues({
        base: margin,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "margin-bottom": {
    prefix: "mb",
    properties: ["margin-bottom"],
    slug: "margin/#bottom",
    values: {
      ...createValues({
        base: margin,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "margin-inline-end": {
    prefix: "mie",
    properties: ["margin-inline-end"],
    slug: "margin/#inline-end",
    values: {
      ...createValues({
        base: margin,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "margin-inline-start": {
    prefix: "mis",
    properties: ["margin-inline-start"],
    slug: "margin/#inline-start",
    values: {
      ...createValues({
        base: margin,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "margin-left": {
    prefix: "ml",
    properties: ["margin-left"],
    slug: "margin/#left",
    values: {
      ...createValues({
        base: margin,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "margin-right": {
    prefix: "mr",
    properties: ["margin-right"],
    slug: "margin/#right",
    values: {
      ...createValues({
        base: margin,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "margin-top": {
    prefix: "mt",
    properties: ["margin-top"],
    slug: "margin/#top",
    values: {
      ...createValues({
        base: margin,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "margin-x": {
    prefix: "mx",
    properties: ["margin-left", "margin-right"],
    slug: "margin/#x-axis",
    values: {
      ...createValues({
        base: margin,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "margin-y": {
    prefix: "my",
    properties: ["margin-top", "margin-bottom"],
    slug: "margin/#y-axis",
    values: {
      ...createValues({
        base: margin,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  padding: {
    prefix: "p",
    properties: ["padding"],
    slug: "padding",
    values: {
      ...createValues({
        base: padding,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "padding-block-end": {
    prefix: "pbe",
    properties: ["padding-block-end"],
    slug: "padding/#block-end",
    values: {
      ...createValues({
        base: padding,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "padding-block-start": {
    prefix: "pbs",
    properties: ["padding-block-start"],
    slug: "padding/#block-start",
    values: {
      ...createValues({
        base: padding,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "padding-bottom": {
    prefix: "pb",
    properties: ["padding-bottom"],
    slug: "padding/#bottom",
    values: {
      ...createValues({
        base: padding,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "padding-inline-end": {
    prefix: "pie",
    properties: ["padding-inline-end"],
    slug: "padding/#inline-end",
    values: {
      ...createValues({
        base: padding,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "padding-inline-start": {
    prefix: "pis",
    properties: ["padding-inline-start"],
    slug: "padding/#inline-start",
    values: {
      ...createValues({
        base: padding,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "padding-left": {
    prefix: "pl",
    properties: ["padding-left"],
    slug: "padding/#left",
    values: {
      ...createValues({
        base: padding,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "padding-right": {
    prefix: "pr",
    properties: ["padding-right"],
    slug: "padding/#right",
    values: {
      ...createValues({
        base: padding,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "padding-top": {
    prefix: "pt",
    properties: ["padding-top"],
    slug: "padding/#top",
    values: {
      ...createValues({
        base: padding,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "padding-x": {
    prefix: "px",
    properties: ["padding-left", "padding-right"],
    slug: "padding/#x-axis",
    values: {
      ...createValues({
        base: padding,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "padding-y": {
    prefix: "py",
    properties: ["padding-top", "padding-bottom"],
    slug: "padding/#y-axis",
    values: {
      ...createValues({
        base: padding,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      px: "1px",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  width: {
    prefix: "w",
    properties: ["width"],
    slug: "width",
    values: {
      ...createValues({
        base: width,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      dvw: "100dvw",
      vh: "100vh",
      vw: "100vw",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
      px: "1px",
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      xxl: "96rem",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "max-width": {
    prefix: "max-w",
    properties: ["max-width"],
    slug: "width/#max-width",
    values: {
      ...createValues({
        base: width,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      dvw: "100dvw",
      vh: "100vh",
      vw: "100vw",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
      px: "1px",
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      xxl: "96rem",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },

  "min-width": {
    prefix: "min-w",
    properties: ["min-width"],
    slug: "width/#min-width",
    values: {
      ...createValues({
        base: width,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      dvw: "100dvw",
      vh: "100vh",
      vw: "100vw",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
      px: "1px",
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      xxl: "96rem",
    },
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
};

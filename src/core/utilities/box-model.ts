import { UtilityMap } from "@/interfaces";
import { createValues } from "@/core/helpers/create-values";
import { YMA_DIMENSION, YMA_HEIGHT, YMA_MARGIN, YMA_PADDING, YMA_WIDTH } from "@/constants/variables";

export const boxModelUtils: UtilityMap = {
  "box-sizing": {
    prefix: "bs",
    properties: ["box-sizing"],
    slug: "box-sizing",
    values: {
      bb: "border-box",
      cb: "content-box",
    },
  },

  dimension: {
    prefix: "d",
    properties: ["height", "width"],
    slug: "dimension",
    values: {
      ...createValues({
        base: YMA_DIMENSION,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
    },
  },

  "max-dimension": {
    prefix: "max-d",
    properties: ["max-height", "max-width"],
    slug: "dimension/#max-dimension",
    values: {
      ...createValues({
        base: YMA_DIMENSION,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
    },
  },

  "min-dimension": {
    prefix: "min-d",
    properties: ["min-height", "min-width"],
    slug: "dimension/#min-dimension",
    values: {
      ...createValues({
        base: YMA_DIMENSION,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
    },
  },

  height: {
    prefix: "h",
    properties: ["height"],
    slug: "height",
    values: {
      ...createValues({
        base: YMA_HEIGHT,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
    },
  },

  "max-height": {
    prefix: "max-h",
    properties: ["max-height"],
    slug: "height/#max-height",
    values: {
      ...createValues({
        base: YMA_HEIGHT,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
    },
  },

  "min-height": {
    prefix: "min-h",
    properties: ["min-height"],
    slug: "height/#min-height",
    values: {
      ...createValues({
        base: YMA_HEIGHT,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
    },
  },

  margin: {
    prefix: "m",
    properties: ["margin"],
    slug: "margin",
    values: {
      ...createValues({
        base: YMA_MARGIN,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "margin-block-end": {
    prefix: "mbe",
    properties: ["margin-block-end"],
    slug: "margin/#block-end",
    values: {
      ...createValues({
        base: YMA_MARGIN,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "margin-block-start": {
    prefix: "mbs",
    properties: ["margin-block-start"],
    slug: "margin/#block-start",
    values: {
      ...createValues({
        base: YMA_MARGIN,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "margin-bottom": {
    prefix: "mb",
    properties: ["margin-bottom"],
    slug: "margin/#bottom",
    values: {
      ...createValues({
        base: YMA_MARGIN,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "margin-inline-end": {
    prefix: "mie",
    properties: ["margin-inline-end"],
    slug: "margin/#inline-end",
    values: {
      ...createValues({
        base: YMA_MARGIN,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "margin-inline-start": {
    prefix: "mis",
    properties: ["margin-inline-start"],
    slug: "margin/#inline-start",
    values: {
      ...createValues({
        base: YMA_MARGIN,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "margin-left": {
    prefix: "ml",
    properties: ["margin-left"],
    slug: "margin/#left",
    values: {
      ...createValues({
        base: YMA_MARGIN,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "margin-right": {
    prefix: "mr",
    properties: ["margin-right"],
    slug: "margin/#right",
    values: {
      ...createValues({
        base: YMA_MARGIN,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "margin-top": {
    prefix: "mt",
    properties: ["margin-top"],
    slug: "margin/#top",
    values: {
      ...createValues({
        base: YMA_MARGIN,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "margin-x": {
    prefix: "mx",
    properties: ["margin-left", "margin-right"],
    slug: "margin/#x-axis",
    values: {
      ...createValues({
        base: YMA_MARGIN,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "margin-y": {
    prefix: "my",
    properties: ["margin-top", "margin-bottom"],
    slug: "margin/#y-axis",
    values: {
      ...createValues({
        base: YMA_MARGIN,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  padding: {
    prefix: "p",
    properties: ["padding"],
    slug: "padding",
    values: {
      ...createValues({
        base: YMA_PADDING,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "padding-block-end": {
    prefix: "pbe",
    properties: ["padding-block-end"],
    slug: "padding/#block-end",
    values: {
      ...createValues({
        base: YMA_PADDING,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "padding-block-start": {
    prefix: "pbs",
    properties: ["padding-block-start"],
    slug: "padding/#block-start",
    values: {
      ...createValues({
        base: YMA_PADDING,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "padding-bottom": {
    prefix: "pb",
    properties: ["padding-bottom"],
    slug: "padding/#bottom",
    values: {
      ...createValues({
        base: YMA_PADDING,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "padding-inline-end": {
    prefix: "pie",
    properties: ["padding-inline-end"],
    slug: "padding/#inline-end",
    values: {
      ...createValues({
        base: YMA_PADDING,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "padding-inline-start": {
    prefix: "pis",
    properties: ["padding-inline-start"],
    slug: "padding/#inline-start",
    values: {
      ...createValues({
        base: YMA_PADDING,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "padding-left": {
    prefix: "pl",
    properties: ["padding-left"],
    slug: "padding/#left",
    values: {
      ...createValues({
        base: YMA_PADDING,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "padding-right": {
    prefix: "pr",
    properties: ["padding-right"],
    slug: "padding/#right",
    values: {
      ...createValues({
        base: YMA_PADDING,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "padding-top": {
    prefix: "pt",
    properties: ["padding-top"],
    slug: "padding/#top",
    values: {
      ...createValues({
        base: YMA_PADDING,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "padding-x": {
    prefix: "px",
    properties: ["padding-left", "padding-right"],
    slug: "padding/#x-axis",
    values: {
      ...createValues({
        base: YMA_PADDING,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  "padding-y": {
    prefix: "py",
    properties: ["padding-top", "padding-bottom"],
    slug: "padding/#y-axis",
    values: {
      ...createValues({
        base: YMA_PADDING,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
    },
  },

  width: {
    prefix: "w",
    properties: ["width"],
    slug: "width",
    values: {
      ...createValues({
        base: YMA_WIDTH,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
    },
  },

  "max-width": {
    prefix: "max-w",
    properties: ["max-width"],
    slug: "width/#max-width",
    values: {
      ...createValues({
        base: YMA_WIDTH,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
    },
  },

  "min-width": {
    prefix: "min-w",
    properties: ["min-width"],
    slug: "width/#min-width",
    values: {
      ...createValues({
        base: YMA_WIDTH,
        unit: "rem",
        min: 0,
        max: 100,
      }),
      auto: "auto",
      dvh: "100dvh",
      fc: "fit-content",
      full: "100%",
      half: "50%",
      max: "max-content",
      min: "min-content",
    },
  },
};

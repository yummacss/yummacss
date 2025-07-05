import { UtilityMap } from "@/interfaces";
import { createValues } from "@/helpers/create-values";
import {
  YMA_DECORATION_THICKNESS,
  YMA_FONT_CHARTER,
  YMA_FONT_MONO,
  YMA_FONT_SIZE_2XL,
  YMA_FONT_SIZE_3XL,
  YMA_FONT_SIZE_4XL,
  YMA_FONT_SIZE_5XL,
  YMA_FONT_SIZE_6XL,
  YMA_FONT_SIZE_7XL,
  YMA_FONT_SIZE_8XL,
  YMA_FONT_SIZE_9XL,
  YMA_FONT_SIZE_MD,
  YMA_FONT_SIZE_LG,
  YMA_FONT_SIZE_SM,
  YMA_FONT_SIZE_XL,
  YMA_FONT_SIZE_XS,
  YMA_FONT_SYSTEM,
} from "@/constants/variables";

export const typographyUtils: UtilityMap = {
  "font-family": {
    prefix: "ff",
    properties: ["font-family"],
    slug: "font-family",
    values: {
      c: YMA_FONT_CHARTER,
      m: YMA_FONT_MONO,
      s: YMA_FONT_SYSTEM,
    },
  },

  "font-size": {
    prefix: "fs",
    properties: ["font-size"],
    slug: "font-size",
    values: {
      xs: `${YMA_FONT_SIZE_XS}rem`,
      sm: `${YMA_FONT_SIZE_SM}rem`,
      md: `${YMA_FONT_SIZE_MD}rem`,
      lg: `${YMA_FONT_SIZE_LG}rem`,
      xl: `${YMA_FONT_SIZE_XL}rem`,
      xxl: `${YMA_FONT_SIZE_2XL}rem`,
      "3xl": `${YMA_FONT_SIZE_3XL}rem`,
      "4xl": `${YMA_FONT_SIZE_4XL}rem`,
      "5xl": `${YMA_FONT_SIZE_5XL}rem`,
      "6xl": `${YMA_FONT_SIZE_6XL}rem`,
      "7xl": `${YMA_FONT_SIZE_7XL}rem`,
      "8xl": `${YMA_FONT_SIZE_8XL}rem`,
      "9xl": `${YMA_FONT_SIZE_9XL}rem`,
    },
  },

  "font-style": {
    prefix: "fs",
    properties: ["font-style"],
    slug: "font-style",
    values: {
      i: "italic",
      n: "normal",
    },
  },

  "font-weight": {
    prefix: "fw",
    properties: ["font-weight"],
    slug: "font-weight",
    values: {
      "100": "100",
      "200": "200",
      "300": "300",
      "400": "400",
      "500": "500",
      "600": "600",
      "700": "700",
      "800": "800",
      "900": "900",
    },
  },

  "letter-spacing": {
    prefix: "ls",
    properties: ["letter-spacing"],
    slug: "letter-spacing",
    values: {
      "0": "0em",
      "1": "-0.05em",
      "2": "-0.025em",
      "3": "0.025em",
      "4": "0.05em",
      "5": "0.1em",
    },
  },

  "line-height": {
    prefix: "lh",
    properties: ["line-height"],
    slug: "line-height",
    values: {
      "1": "1",
      "2": "1.25",
      "3": "1.375",
      "4": "1.5",
      "5": "1.625",
      "6": "2",
    },
  },

  "list-style-position": {
    prefix: "lsp",
    properties: ["list-style-position"],
    slug: "list-style-position",
    values: {
      i: "inside",
      o: "outside",
    },
  },

  "list-style-type": {
    prefix: "lst",
    properties: ["list-style-type"],
    slug: "list-style-type",
    values: {
      c: "circle",
      d: "disc",
      s: "square",
    },
  },

  "overflow-wrap": {
    prefix: "ow",
    properties: ["overflow-wrap"],
    slug: "overflow-wrap",
    values: {
      bw: "break-word",
      n: "normal",
    },
  },

  "text-align": {
    prefix: "ta",
    properties: ["text-align"],
    slug: "text-align",
    values: {
      c: "center",
      e: "end",
      j: "justify",
      ja: "justify-all",
      l: "left",
      mp: "match-parent",
      r: "right",
      s: "start",
    },
  },

  "text-decoration-line": {
    prefix: "tdl",
    properties: ["text-decoration-line"],
    slug: "text-decoration-line",
    values: {
      lt: "line-through",
      none: "none",
      o: "overline",
      u: "underline",
    },
  },

  "text-decoration-style": {
    prefix: "tds",
    properties: ["text-decoration-style"],
    slug: "text-decoration-style",
    values: {
      d: "dashed",
      s: "solid",
      w: "wavy",
    },
  },

  "text-decoration-thickness": {
    prefix: "tdt",
    properties: ["text-decoration-thickness"],
    slug: "text-decoration-thickness",
    values: {
      ...createValues({
        base: YMA_DECORATION_THICKNESS,
        unit: "rem",
        min: 0,
        max: 4,
      }),
      auto: "auto",
      ff: "from-font",
    },
  },

  "text-decoration": {
    prefix: "td",
    properties: ["text-decoration"],
    slug: "text-decoration",
    values: {
      none: "none",
      u: "underline",
    },
  },

  "text-indent": {
    prefix: "ti",
    properties: ["text-indent"],
    slug: "text-indent",
    values: {
      "0": "0px",
      "1": "1px",
      "2": "0.25rem",
      "3": "0.5rem",
      "4": "0.75rem",
    },
  },

  "text-overflow": {
    prefix: "to",
    properties: ["text-overflow"],
    slug: "text-overflow",
    values: {
      c: "clip",
      e: "ellipsis",
    },
  },

  "text-transform": {
    prefix: "tt",
    properties: ["text-transform"],
    slug: "text-transform",
    values: {
      c: "capitalize",
      l: "lowercase",
      n: "none",
      u: "uppercase",
    },
  },

  "text-underline-offset": {
    prefix: "tuo",
    properties: ["text-underline-offset"],
    slug: "text-underline-offset",
    values: {
      "0": "0px",
      "1": "1px",
      "2": "2px",
      "4": "4px",
      "8": "8px",
      auto: "auto",
    },
  },

  "text-wrap": {
    prefix: "tw",
    properties: ["text-wrap"],
    slug: "text-wrap",
    values: {
      b: "balance",
      n: "nowrap",
      p: "pretty",
      w: "wrap",
    },
  },

  "white-space": {
    prefix: "ws",
    properties: ["white-space"],
    slug: "white-space",
    values: {
      bs: "break-spaces",
      n: "normal",
      nw: "nowrap",
      p: "pre",
      pl: "pre-line",
      pw: "pre-wrap",
    },
  },
};

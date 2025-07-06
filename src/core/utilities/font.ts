import { UtilityMap } from "@/interfaces";
import {
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

export const fontUtils: UtilityMap = {
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
};

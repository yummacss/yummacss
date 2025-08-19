import {
  YCSS_FONT_CHARTER,
  YCSS_FONT_MONO,
  YCSS_FONT_SIZE_2XL,
  YCSS_FONT_SIZE_3XL,
  YCSS_FONT_SIZE_4XL,
  YCSS_FONT_SIZE_5XL,
  YCSS_FONT_SIZE_6XL,
  YCSS_FONT_SIZE_7XL,
  YCSS_FONT_SIZE_8XL,
  YCSS_FONT_SIZE_9XL,
  YCSS_FONT_SIZE_LG,
  YCSS_FONT_SIZE_MD,
  YCSS_FONT_SIZE_SM,
  YCSS_FONT_SIZE_XL,
  YCSS_FONT_SIZE_XS,
  YCSS_FONT_SYSTEM,
} from "@/constants/variables";
import { UtilityMap } from "@/interfaces";

export const fontUtils: UtilityMap = {
  "font-family": {
    prefix: "ff",
    properties: ["font-family"],
    slug: "font-family",
    values: {
      c: YCSS_FONT_CHARTER,
      m: YCSS_FONT_MONO,
      s: YCSS_FONT_SYSTEM,
    },
  },

  "font-size": {
    prefix: "fs",
    properties: ["font-size"],
    slug: "font-size",
    values: {
      xs: `${YCSS_FONT_SIZE_XS}rem`,
      sm: `${YCSS_FONT_SIZE_SM}rem`,
      md: `${YCSS_FONT_SIZE_MD}rem`,
      lg: `${YCSS_FONT_SIZE_LG}rem`,
      xl: `${YCSS_FONT_SIZE_XL}rem`,
      xxl: `${YCSS_FONT_SIZE_2XL}rem`,
      "3xl": `${YCSS_FONT_SIZE_3XL}rem`,
      "4xl": `${YCSS_FONT_SIZE_4XL}rem`,
      "5xl": `${YCSS_FONT_SIZE_5XL}rem`,
      "6xl": `${YCSS_FONT_SIZE_6XL}rem`,
      "7xl": `${YCSS_FONT_SIZE_7XL}rem`,
      "8xl": `${YCSS_FONT_SIZE_8XL}rem`,
      "9xl": `${YCSS_FONT_SIZE_9XL}rem`,
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

import {
  YCSS_BACKDROP_BLUR,
  YCSS_BLUR,
  YCSS_BOX_SHADOW_LG,
  YCSS_BOX_SHADOW_MD,
  YCSS_BOX_SHADOW_SM,
  YCSS_BOX_SHADOW_XL,
  YCSS_BOX_SHADOW_XS,
  YCSS_GRAYSCALE,
} from "@/constants/variables";
import { Utilities } from "@/interfaces";

export const effectUtils: Utilities = {
  "backdrop-blur": {
    prefix: "bf-b",
    properties: ["backdrop-filter"],
    slug: "backdrop-blur",
    values: {
      none: `blur(${YCSS_BACKDROP_BLUR * 0}px)`,
      xs: `blur(${YCSS_BACKDROP_BLUR}px)`,
      sm: `blur(${YCSS_BACKDROP_BLUR * 2}px)`,
      md: `blur(${YCSS_BACKDROP_BLUR * 4}px)`,
      lg: `blur(${YCSS_BACKDROP_BLUR * 8}px)`,
      xl: `blur(${YCSS_BACKDROP_BLUR * 16}px)`,
    },
  },

  blur: {
    prefix: "f-b",
    properties: ["filter"],
    slug: "blur",
    values: {
      none: `blur(${YCSS_BLUR * 0}px)`,
      xs: `blur(${YCSS_BLUR}px)`,
      sm: `blur(${YCSS_BLUR * 2}px)`,
      md: `blur(${YCSS_BLUR * 4}px)`,
      lg: `blur(${YCSS_BLUR * 8}px)`,
      xl: `blur(${YCSS_BLUR * 16}px)`,
    },
  },

  "box-shadow": {
    prefix: "bs",
    properties: ["box-shadow"],
    slug: "box-shadow",
    values: {
      none: "none",
      xs: YCSS_BOX_SHADOW_XS,
      sm: YCSS_BOX_SHADOW_SM,
      md: YCSS_BOX_SHADOW_MD,
      lg: YCSS_BOX_SHADOW_LG,
      xl: YCSS_BOX_SHADOW_XL,
    },
  },

  grayscale: {
    prefix: "f-g",
    properties: ["filter"],
    slug: "grayscale",
    values: {
      0: `grayscale(${YCSS_GRAYSCALE * 0}%)`,
      10: `grayscale(${YCSS_GRAYSCALE}%)`,
      20: `grayscale(${YCSS_GRAYSCALE * 2}%)`,
      30: `grayscale(${YCSS_GRAYSCALE * 3}%)`,
      40: `grayscale(${YCSS_GRAYSCALE * 4}%)`,
      50: `grayscale(${YCSS_GRAYSCALE * 5}%)`,
      60: `grayscale(${YCSS_GRAYSCALE * 6}%)`,
      70: `grayscale(${YCSS_GRAYSCALE * 7}%)`,
      80: `grayscale(${YCSS_GRAYSCALE * 8}%)`,
      90: `grayscale(${YCSS_GRAYSCALE * 9}%)`,
      100: `grayscale(100%)`,
    },
  },

  opacity: {
    prefix: "o",
    properties: ["opacity"],
    slug: "opacity",
    values: {
      0: "0",
      10: "0.1",
      20: "0.2",
      30: "0.3",
      40: "0.4",
      50: "0.5",
      60: "0.6",
      70: "0.7",
      80: "0.8",
      90: "0.9",
      100: "1",
    },
  },
};

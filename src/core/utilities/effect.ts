import { UtilityMap } from "@/interfaces";
import {
  YMA_BACKDROP_BLUR,
  YMA_BLUR,
  YMA_BOX_SHADOW_XS,
  YMA_BOX_SHADOW_SM,
  YMA_BOX_SHADOW_MD,
  YMA_BOX_SHADOW_LG,
  YMA_BOX_SHADOW_XL,
  YMA_GRAYSCALE,
} from "@/constants/variables";

export const effectUtils: UtilityMap = {
  "backdrop-blur": {
    prefix: "bf-b",
    properties: ["backdrop-filter"],
    slug: "backdrop-blur",
    values: {
      none: `blur(${YMA_BACKDROP_BLUR * 0}px)`,
      xs: `blur(${YMA_BACKDROP_BLUR}px)`,
      sm: `blur(${YMA_BACKDROP_BLUR * 2}px)`,
      md: `blur(${YMA_BACKDROP_BLUR * 4}px)`,
      lg: `blur(${YMA_BACKDROP_BLUR * 8}px)`,
      xl: `blur(${YMA_BACKDROP_BLUR * 16}px)`,
    },
  },

  blur: {
    prefix: "f-b",
    properties: ["filter"],
    slug: "blur",
    values: {
      none: `blur(${YMA_BLUR * 0}px)`,
      xs: `blur(${YMA_BLUR}px)`,
      sm: `blur(${YMA_BLUR * 2}px)`,
      md: `blur(${YMA_BLUR * 4}px)`,
      lg: `blur(${YMA_BLUR * 8}px)`,
      xl: `blur(${YMA_BLUR * 16}px)`,
    },
  },

  "box-shadow": {
    prefix: "bs",
    properties: ["box-shadow"],
    slug: "box-shadow",
    values: {
      none: "none",
      xs: YMA_BOX_SHADOW_XS,
      sm: YMA_BOX_SHADOW_SM,
      md: YMA_BOX_SHADOW_MD,
      lg: YMA_BOX_SHADOW_LG,
      xl: YMA_BOX_SHADOW_XL,
    },
  },

  grayscale: {
    prefix: "f-g",
    properties: ["filter"],
    slug: "grayscale",
    values: {
      0: `grayscale(${YMA_GRAYSCALE * 0}%)`,
      10: `grayscale(${YMA_GRAYSCALE}%)`,
      20: `grayscale(${YMA_GRAYSCALE * 2}%)`,
      30: `grayscale(${YMA_GRAYSCALE * 3}%)`,
      40: `grayscale(${YMA_GRAYSCALE * 4}%)`,
      50: `grayscale(${YMA_GRAYSCALE * 5}%)`,
      60: `grayscale(${YMA_GRAYSCALE * 6}%)`,
      70: `grayscale(${YMA_GRAYSCALE * 7}%)`,
      80: `grayscale(${YMA_GRAYSCALE * 8}%)`,
      90: `grayscale(${YMA_GRAYSCALE * 9}%)`,
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

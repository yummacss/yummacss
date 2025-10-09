import {
  backdropBlur,
  blur,
  boxShadowLg,
  boxShadowMd,
  boxShadowSm,
  boxShadowXl,
  boxShadowXs,
  grayscale,
} from "@/defaults/variables";
import { standardPreset } from "@/defaults/variants/preset";
import type { Utilities } from "@/interfaces";

export const effect: Utilities = {
  "backdrop-blur": {
    prefix: "bf-b",
    properties: ["backdrop-filter"],
    slug: "backdrop-blur",
    values: {
      none: `blur(${backdropBlur * 0}px)`,
      xs: `blur(${backdropBlur}px)`,
      sm: `blur(${backdropBlur * 2}px)`,
      md: `blur(${backdropBlur * 4}px)`,
      lg: `blur(${backdropBlur * 8}px)`,
      xl: `blur(${backdropBlur * 16}px)`,
    },
    variants: standardPreset,
  },

  blur: {
    prefix: "f-b",
    properties: ["filter"],
    slug: "blur",
    values: {
      none: `blur(${blur * 0}px)`,
      xs: `blur(${blur}px)`,
      sm: `blur(${blur * 2}px)`,
      md: `blur(${blur * 4}px)`,
      lg: `blur(${blur * 8}px)`,
      xl: `blur(${blur * 16}px)`,
    },
    variants: standardPreset,
  },

  "box-shadow": {
    prefix: "bs",
    properties: ["box-shadow"],
    slug: "box-shadow",
    values: {
      none: "none",
      xs: boxShadowXs,
      sm: boxShadowSm,
      md: boxShadowMd,
      lg: boxShadowLg,
      xl: boxShadowXl,
    },
    variants: standardPreset,
  },

  grayscale: {
    prefix: "f-g",
    properties: ["filter"],
    slug: "grayscale",
    values: {
      0: `grayscale(${grayscale * 0}%)`,
      10: `grayscale(${grayscale}%)`,
      20: `grayscale(${grayscale * 2}%)`,
      30: `grayscale(${grayscale * 3}%)`,
      40: `grayscale(${grayscale * 4}%)`,
      50: `grayscale(${grayscale * 5}%)`,
      60: `grayscale(${grayscale * 6}%)`,
      70: `grayscale(${grayscale * 7}%)`,
      80: `grayscale(${grayscale * 8}%)`,
      90: `grayscale(${grayscale * 9}%)`,
      100: `grayscale(100%)`,
    },
    variants: standardPreset,
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
    variants: standardPreset,
  },
};

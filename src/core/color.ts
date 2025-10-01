import { black, current, transparent, white } from "@/defaults/variables";
import { mediaQueries, pseudoClasses } from "@/defaults/variants";
import { createColors } from "@/helpers/create-colors";
import { Colors } from "@/interfaces";

const colors = createColors();

const defaultColors = {
  ...colors,
  black,
  current,
  transparent,
  white,
};

export const color: Colors = {
  "accent-color": {
    prefix: "ac",
    properties: ["accent-color"],
    slug: "accent-color",
    values: defaultColors,
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
  "background-color": {
    prefix: "bg",
    properties: ["background-color"],
    slug: "background-color",
    values: defaultColors,
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
  "border-color": {
    prefix: "bc",
    properties: ["border-color"],
    slug: "border-color",
    values: defaultColors,
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
  "border-bottom-color": {
    prefix: "bc-b",
    properties: ["border-bottom-color"],
    slug: "border-bottom-color",
    values: defaultColors,
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
  "border-left-color": {
    prefix: "bc-l",
    properties: ["border-left-color"],
    slug: "border-left-color",
    values: defaultColors,
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
  "border-right-color": {
    prefix: "bc-r",
    properties: ["border-right-color"],
    slug: "border-right-color",
    values: defaultColors,
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
  "border-top-color": {
    prefix: "bc-t",
    properties: ["border-top-color"],
    slug: "border-top-color",
    values: defaultColors,
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
  "caret-color": {
    prefix: "cc",
    properties: ["caret-color"],
    slug: "caret-color",
    values: defaultColors,
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
  color: {
    prefix: "tc",
    properties: ["color"],
    slug: "color",
    values: defaultColors,
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
  fill: {
    prefix: "f",
    properties: ["fill"],
    slug: "fill",
    values: defaultColors,
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
  "outline-color": {
    prefix: "oc",
    properties: ["outline-color"],
    slug: "outline-color",
    values: defaultColors,
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
  stroke: {
    prefix: "s",
    properties: ["stroke"],
    slug: "stroke",
    values: defaultColors,
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
  "text-decoration-color": {
    prefix: "tdc",
    properties: ["text-decoration-color"],
    slug: "text-decoration-color",
    values: defaultColors,
    variants: {
      pseudoClasses,
      mediaQueries,
    },
  },
};

import { black, current, transparent, white } from "@/defaults/variables";
import { opacitySet } from "@/defaults/variants/sets";
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
    variants: opacitySet,
  },
  "background-color": {
    prefix: "bg",
    properties: ["background-color"],
    slug: "background-color",
    values: defaultColors,
    variants: opacitySet,
  },
  "border-color": {
    prefix: "bc",
    properties: ["border-color"],
    slug: "border-color",
    values: defaultColors,
    variants: opacitySet,
  },
  "border-bottom-color": {
    prefix: "bc-b",
    properties: ["border-bottom-color"],
    slug: "border-bottom-color",
    values: defaultColors,
    variants: opacitySet,
  },
  "border-left-color": {
    prefix: "bc-l",
    properties: ["border-left-color"],
    slug: "border-left-color",
    values: defaultColors,
    variants: opacitySet,
  },
  "border-right-color": {
    prefix: "bc-r",
    properties: ["border-right-color"],
    slug: "border-right-color",
    values: defaultColors,
    variants: opacitySet,
  },
  "border-top-color": {
    prefix: "bc-t",
    properties: ["border-top-color"],
    slug: "border-top-color",
    values: defaultColors,
    variants: opacitySet,
  },
  "caret-color": {
    prefix: "cc",
    properties: ["caret-color"],
    slug: "caret-color",
    values: defaultColors,
    variants: opacitySet,
  },
  color: {
    prefix: "tc",
    properties: ["color"],
    slug: "color",
    values: defaultColors,
    variants: opacitySet,
  },
  fill: {
    prefix: "f",
    properties: ["fill"],
    slug: "fill",
    values: defaultColors,
    variants: opacitySet,
  },
  "outline-color": {
    prefix: "oc",
    properties: ["outline-color"],
    slug: "outline-color",
    values: defaultColors,
    variants: opacitySet,
  },
  stroke: {
    prefix: "s",
    properties: ["stroke"],
    slug: "stroke",
    values: defaultColors,
    variants: opacitySet,
  },
  "text-decoration-color": {
    prefix: "tdc",
    properties: ["text-decoration-color"],
    slug: "text-decoration-color",
    values: defaultColors,
    variants: opacitySet,
  },
};

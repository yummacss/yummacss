import { YCSS_COLOR_BLACK, YCSS_COLOR_CURRENT, YCSS_COLOR_TRANSPARENT, YCSS_COLOR_WHITE } from "@/constants/variables";
import { createColors } from "@/helpers/create-colors";
import { ColorUtilityMap } from "@/interfaces";

const colors = createColors();
const v = {
  ...colors,
  black: YCSS_COLOR_BLACK,
  white: YCSS_COLOR_WHITE,
  transparent: YCSS_COLOR_TRANSPARENT,
  current: YCSS_COLOR_CURRENT,
};

export const colorUtils: ColorUtilityMap = {
  "accent-color": {
    prefix: "ac",
    properties: ["accent-color"],
    slug: "accent-color",
    values: v,
  },
  "background-color": {
    prefix: "bg",
    properties: ["background-color"],
    slug: "background-color",
    values: v,
  },
  "border-color": {
    prefix: "bc",
    properties: ["border-color"],
    slug: "border-color",
    values: v,
  },
  "border-bottom-color": {
    prefix: "bc-b",
    properties: ["border-bottom-color"],
    slug: "border-bottom-color",
    values: v,
  },
  "border-left-color": {
    prefix: "bc-l",
    properties: ["border-left-color"],
    slug: "border-left-color",
    values: v,
  },
  "border-right-color": {
    prefix: "bc-r",
    properties: ["border-right-color"],
    slug: "border-right-color",
    values: v,
  },
  "border-top-color": {
    prefix: "bc-t",
    properties: ["border-top-color"],
    slug: "border-top-color",
    values: v,
  },
  "caret-color": {
    prefix: "cc",
    properties: ["caret-color"],
    slug: "caret-color",
    values: v,
  },
  color: {
    prefix: "tc",
    properties: ["color"],
    slug: "color",
    values: v,
  },
  fill: {
    prefix: "f",
    properties: ["fill"],
    slug: "fill",
    values: v,
  },
  "outline-color": {
    prefix: "oc",
    properties: ["outline-color"],
    slug: "outline-color",
    values: v,
  },
  stroke: {
    prefix: "s",
    properties: ["stroke"],
    slug: "stroke",
    values: v,
  },
  "text-decoration-color": {
    prefix: "tdc",
    properties: ["text-decoration-color"],
    slug: "text-decoration-color",
    values: v,
  },
};

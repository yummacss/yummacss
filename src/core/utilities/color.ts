import { ColorUtilityMap } from "@/interfaces";
import { createColors } from "@/helpers/create-colors";

const colors = createColors();

export const colorUtils: ColorUtilityMap = {
  "accent-color": {
    prefix: "ac",
    properties: ["accent-color"],
    slug: "accent-color",
    values: { ...colors, black: "black", white: "white", transparent: "transparent" },
  },
  "background-color": {
    prefix: "bg",
    properties: ["background-color"],
    slug: "background-color",
    values: { ...colors, black: "black", white: "white", transparent: "transparent" },
  },
  "border-color": {
    prefix: "bc",
    properties: ["border-color"],
    slug: "border-color",
    values: { ...colors, black: "black", white: "white", transparent: "transparent" },
  },
  "border-bottom-color": {
    prefix: "bc-b",
    properties: ["border-bottom-color"],
    slug: "border-bottom-color",
    values: { ...colors, black: "black", white: "white", transparent: "transparent" },
  },
  "border-left-color": {
    prefix: "bc-l",
    properties: ["border-left-color"],
    slug: "border-left-color",
    values: { ...colors, black: "black", white: "white", transparent: "transparent" },
  },
  "border-right-color": {
    prefix: "bc-r",
    properties: ["border-right-color"],
    slug: "border-right-color",
    values: { ...colors, black: "black", white: "white", transparent: "transparent" },
  },
  "border-top-color": {
    prefix: "bc-t",
    properties: ["border-top-color"],
    slug: "border-top-color",
    values: { ...colors, black: "black", white: "white", transparent: "transparent" },
  },
  "caret-color": {
    prefix: "cc",
    properties: ["caret-color"],
    slug: "caret-color",
    values: { ...colors, black: "black", white: "white", transparent: "transparent" },
  },
  color: {
    prefix: "tc",
    properties: ["color"],
    slug: "color",
    values: { ...colors, black: "black", white: "white", transparent: "transparent" },
  },
  fill: {
    prefix: "f",
    properties: ["fill"],
    slug: "fill",
    values: { ...colors, black: "black", white: "white", transparent: "transparent" },
  },
  "outline-color": {
    prefix: "oc",
    properties: ["outline-color"],
    slug: "outline-color",
    values: { ...colors, black: "black", white: "white", transparent: "transparent" },
  },
  stroke: {
    prefix: "s",
    properties: ["stroke"],
    slug: "stroke",
    values: { ...colors, black: "black", white: "white", transparent: "transparent" },
  },
  "text-decoration-color": {
    prefix: "tdc",
    properties: ["text-decoration-color"],
    slug: "text-decoration-color",
    values: { ...colors, black: "black", white: "white", transparent: "transparent" },
  },
};

import { colorSchemeValues, colorValues } from "@/defaults/values";
import { colorVariants, variants } from "@/defaults/variants/stacks";
import type { Colors } from "@/interfaces";

export const color: Colors = {
	"accent-color": {
		prefix: "ac",
		properties: ["accent-color"],
		slug: "accent-color",
		values: colorValues,
		variants: colorVariants,
	},
	"color-scheme": {
		prefix: "cs",
		properties: ["color-scheme"],
		slug: "color-scheme",
		values: colorSchemeValues,
		variants,
	},
	"background-color": {
		prefix: "bg",
		properties: ["background-color"],
		slug: "background-color",
		values: colorValues,
		variants: colorVariants,
	},
	"border-color": {
		prefix: "bc",
		properties: ["border-color"],
		slug: "border-color",
		values: colorValues,
		variants: colorVariants,
	},
	"border-bottom-color": {
		prefix: "bbc",
		properties: ["border-bottom-color"],
		slug: "border-bottom-color",
		values: colorValues,
		variants: colorVariants,
	},
	"border-left-color": {
		prefix: "blc",
		properties: ["border-left-color"],
		slug: "border-left-color",
		values: colorValues,
		variants: colorVariants,
	},
	"border-right-color": {
		prefix: "brc",
		properties: ["border-right-color"],
		slug: "border-right-color",
		values: colorValues,
		variants: colorVariants,
	},
	"border-top-color": {
		prefix: "btc",
		properties: ["border-top-color"],
		slug: "border-top-color",
		values: colorValues,
		variants: colorVariants,
	},
	"caret-color": {
		prefix: "cc",
		properties: ["caret-color"],
		slug: "caret-color",
		values: colorValues,
		variants: colorVariants,
	},
	color: {
		prefix: "c",
		properties: ["color"],
		slug: "color",
		values: colorValues,
		variants: colorVariants,
	},
	fill: {
		prefix: "f",
		properties: ["fill"],
		slug: "fill",
		values: colorValues,
		variants: colorVariants,
	},
	"outline-color": {
		prefix: "oc",
		properties: ["outline-color"],
		slug: "outline-color",
		values: colorValues,
		variants: colorVariants,
	},
	stroke: {
		prefix: "s",
		properties: ["stroke"],
		slug: "stroke",
		values: colorValues,
		variants: colorVariants,
	},
	"text-decoration-color": {
		prefix: "tdc",
		properties: ["text-decoration-color"],
		slug: "text-decoration-color",
		values: colorValues,
		variants: colorVariants,
	},
};

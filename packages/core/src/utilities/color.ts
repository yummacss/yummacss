import { colorValues } from "@/defaults/values";
import { all } from "@/defaults/variants/stacks";
import type { Colors } from "@/interfaces";

export const color: Colors = {
	"accent-color": {
		prefix: "ac",
		properties: ["accent-color"],
		slug: "accent-color",
		values: colorValues,
		variants: all,
	},
	"background-color": {
		prefix: "bg",
		properties: ["background-color"],
		slug: "background-color",
		values: colorValues,
		variants: all,
	},
	"border-color": {
		prefix: "bc",
		properties: ["border-color"],
		slug: "border-color",
		values: colorValues,
		variants: all,
	},
	"border-bottom-color": {
		prefix: "bbc",
		properties: ["border-bottom-color"],
		slug: "border-bottom-color",
		values: colorValues,
		variants: all,
	},
	"border-left-color": {
		prefix: "blc",
		properties: ["border-left-color"],
		slug: "border-left-color",
		values: colorValues,
		variants: all,
	},
	"border-right-color": {
		prefix: "brc",
		properties: ["border-right-color"],
		slug: "border-right-color",
		values: colorValues,
		variants: all,
	},
	"border-top-color": {
		prefix: "btc",
		properties: ["border-top-color"],
		slug: "border-top-color",
		values: colorValues,
		variants: all,
	},
	"caret-color": {
		prefix: "cc",
		properties: ["caret-color"],
		slug: "caret-color",
		values: colorValues,
		variants: all,
	},
	color: {
		prefix: "c",
		properties: ["color"],
		slug: "color",
		values: colorValues,
		variants: all,
	},
	fill: {
		prefix: "f",
		properties: ["fill"],
		slug: "fill",
		values: colorValues,
		variants: all,
	},
	"outline-color": {
		prefix: "oc",
		properties: ["outline-color"],
		slug: "outline-color",
		values: colorValues,
		variants: all,
	},
	stroke: {
		prefix: "s",
		properties: ["stroke"],
		slug: "stroke",
		values: colorValues,
		variants: all,
	},
	"text-decoration-color": {
		prefix: "tdc",
		properties: ["text-decoration-color"],
		slug: "text-decoration-color",
		values: colorValues,
		variants: all,
	},
};

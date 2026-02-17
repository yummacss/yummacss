import { colorValues } from "@/defaults/values";
import { withOpacity } from "@/defaults/variants/presets";
import type { Colors } from "@/interfaces";

export const color: Colors = {
	"accent-color": {
		prefix: "ac",
		properties: ["accent-color"],
		slug: "accent-color",
		values: colorValues,
		variants: withOpacity,
	},
	"background-color": {
		prefix: "bg",
		properties: ["background-color"],
		slug: "background-color",
		values: colorValues,
		variants: withOpacity,
	},
	"border-color": {
		prefix: "bc",
		properties: ["border-color"],
		slug: "border-color",
		values: colorValues,
		variants: withOpacity,
	},
	"border-bottom-color": {
		prefix: "bc-b",
		properties: ["border-bottom-color"],
		slug: "border-bottom-color",
		values: colorValues,
		variants: withOpacity,
	},
	"border-left-color": {
		prefix: "bc-l",
		properties: ["border-left-color"],
		slug: "border-left-color",
		values: colorValues,
		variants: withOpacity,
	},
	"border-right-color": {
		prefix: "bc-r",
		properties: ["border-right-color"],
		slug: "border-right-color",
		values: colorValues,
		variants: withOpacity,
	},
	"border-top-color": {
		prefix: "bc-t",
		properties: ["border-top-color"],
		slug: "border-top-color",
		values: colorValues,
		variants: withOpacity,
	},
	"caret-color": {
		prefix: "cc",
		properties: ["caret-color"],
		slug: "caret-color",
		values: colorValues,
		variants: withOpacity,
	},
	color: {
		prefix: "c",
		properties: ["color"],
		slug: "color",
		values: colorValues,
		variants: withOpacity,
	},
	fill: {
		prefix: "f",
		properties: ["fill"],
		slug: "fill",
		values: colorValues,
		variants: withOpacity,
	},
	"outline-color": {
		prefix: "oc",
		properties: ["outline-color"],
		slug: "outline-color",
		values: colorValues,
		variants: withOpacity,
	},
	stroke: {
		prefix: "s",
		properties: ["stroke"],
		slug: "stroke",
		values: colorValues,
		variants: withOpacity,
	},
	"text-decoration-color": {
		prefix: "tdc",
		properties: ["text-decoration-color"],
		slug: "text-decoration-color",
		values: colorValues,
		variants: withOpacity,
	},
};

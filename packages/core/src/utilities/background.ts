import { variants } from "@/defaults/variants/stacks";
import type { Utilities } from "@/interfaces";

// a light-to-dark layer, so it shades whatever background-color is set
const shade = (to: string) =>
	`linear-gradient(to ${to}, oklch(1 0 0 / .18), oklch(0 0 0 / .14))`;
const linearGradient = (v: string) => `linear-gradient(${v})`;

export const background: Utilities = {
	"background-attachment": {
		prefix: "ba",
		properties: ["background-attachment"],
		slug: "background-attachment",
		values: {
			f: "fixed",
			l: "local",
			s: "scroll",
		},
		variants,
	},

	"background-clip": {
		prefix: "bc",
		properties: ["background-clip"],
		slug: "background-clip",
		functions: false,
		values: {
			bb: "border-box",
			cb: "content-box",
			pb: "padding-box",
			t: "text",
		},
		variants,
	},

	"background-origin": {
		prefix: "bo",
		properties: ["background-origin"],
		slug: "background-origin",
		values: {
			bb: "border-box",
			cb: "content-box",
			pb: "padding-box",
		},
		variants,
	},

	"background-position": {
		prefix: "bp",
		properties: ["background-position"],
		slug: "background-position",
		values: {
			b: "bottom",
			c: "center",
			l: "0",
			lb: "0 100%",
			lt: "0 0",
			r: "100%",
			rb: "100% 100%",
			rt: "100% 0",
			t: "top",
		},
		variants,
	},

	"background-repeat": {
		prefix: "br",
		properties: ["background-repeat"],
		slug: "background-repeat",
		functions: false,
		values: {
			nr: "no-repeat",
			r: "repeat",
			ro: "round",
			rx: "repeat-x",
			ry: "repeat-y",
			s: "space",
		},
		variants,
	},

	"background-size": {
		prefix: "bs",
		properties: ["background-size"],
		slug: "background-size",
		functions: false,
		values: {
			auto: "auto",
			c: "cover",
			co: "contain",
		},
		variants,
	},

	"linear-gradient": {
		prefix: "bi-lg",
		properties: ["background-image"],
		slug: "linear-gradient",
		wrap: linearGradient,
		values: {
			b: shade("bottom"),
			l: shade("left"),
			none: "none",
			r: shade("right"),
			t: shade("top"),
		},
		variants,
	},
};

import { base } from "@/defaults/variants/stacks";
import type { Utilities } from "@/interfaces";

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
		variants: base,
	},

	"background-clip": {
		prefix: "bc",
		properties: ["background-clip"],
		slug: "background-clip",
		values: {
			bb: "border-box",
			cb: "content-box",
			pb: "padding-box",
			t: "text",
		},
		variants: base,
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
		variants: base,
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
		variants: base,
	},

	"background-repeat": {
		prefix: "br",
		properties: ["background-repeat"],
		slug: "background-repeat",
		values: {
			nr: "no-repeat",
			r: "repeat",
			ro: "round",
			rx: "repeat-x",
			ry: "repeat-y",
			s: "space",
		},
		variants: base,
	},

	"background-size": {
		prefix: "bs",
		properties: ["background-size"],
		slug: "background-size",
		values: {
			auto: "auto",
			c: "cover",
			co: "contain",
		},
		variants: base,
	},
};

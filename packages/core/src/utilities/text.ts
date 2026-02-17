import { decorationThickness } from "@/defaults/variables";
import { standard } from "@/defaults/variants/presets";
import { createValues } from "@/helpers/create-values";
import type { Utilities } from "@/interfaces";

export const text: Utilities = {
	"letter-spacing": {
		prefix: "ls",
		properties: ["letter-spacing"],
		slug: "letter-spacing",
		values: {
			"0": "0em",
			"1": "-0.05em",
			"2": "-0.025em",
			"3": "0.025em",
			"4": "0.05em",
			"5": "0.1em",
		},
		variants: standard,
	},

	"line-height": {
		prefix: "lh",
		properties: ["line-height"],
		slug: "line-height",
		values: {
			"1": "1",
			"2": "1.25",
			"3": "1.375",
			"4": "1.5",
			"5": "1.625",
			"6": "2",
		},
		variants: standard,
	},

	"list-style-position": {
		prefix: "lsp",
		properties: ["list-style-position"],
		slug: "list-style-position",
		values: {
			i: "inside",
			o: "outside",
		},
		variants: standard,
	},

	"list-style-type": {
		prefix: "lst",
		properties: ["list-style-type"],
		slug: "list-style-type",
		values: {
			c: "circle",
			d: "disc",
			s: "square",
		},
		variants: standard,
	},

	"tab-size": {
		prefix: "ts",
		properties: ["tab-size"],
		slug: "tab-size",
		values: {
			"0": "0",
			"2": "2",
			"4": "4",
			"8": "8",
		},
		variants: standard,
	},

	"overflow-wrap": {
		prefix: "ow",
		properties: ["overflow-wrap"],
		slug: "overflow-wrap",
		values: {
			bw: "break-word",
			n: "normal",
		},
		variants: standard,
	},

	"text-align": {
		prefix: "ta",
		properties: ["text-align"],
		slug: "text-align",
		values: {
			c: "center",
			e: "end",
			j: "justify",
			ja: "justify-all",
			l: "left",
			mp: "match-parent",
			r: "right",
			s: "start",
		},
		variants: standard,
	},

	"text-decoration-line": {
		prefix: "tdl",
		properties: ["text-decoration-line"],
		slug: "text-decoration-line",
		values: {
			lt: "line-through",
			none: "none",
			o: "overline",
			u: "underline",
		},
		variants: standard,
	},

	"text-decoration-style": {
		prefix: "tds",
		properties: ["text-decoration-style"],
		slug: "text-decoration-style",
		values: {
			d: "dashed",
			s: "solid",
			w: "wavy",
		},
		variants: standard,
	},

	"text-decoration-thickness": {
		prefix: "tdt",
		properties: ["text-decoration-thickness"],
		slug: "text-decoration-thickness",
		values: {
			...createValues({
				base: decorationThickness,
				unit: "px",
				min: 0,
				max: 4,
			}),
			auto: "auto",
			ff: "from-font",
		},
		variants: standard,
	},

	"text-decoration": {
		prefix: "td",
		properties: ["text-decoration"],
		slug: "text-decoration",
		values: {
			none: "none",
			u: "underline",
		},
		variants: standard,
	},

	"text-indent": {
		prefix: "ti",
		properties: ["text-indent"],
		slug: "text-indent",
		values: {
			"0": "0px",
			"1": "1px",
			"2": "0.25rem",
			"3": "0.5rem",
			"4": "0.75rem",
		},
		variants: standard,
	},

	"text-overflow": {
		prefix: "to",
		properties: ["text-overflow"],
		slug: "text-overflow",
		values: {
			c: "clip",
			e: "ellipsis",
		},
		variants: standard,
	},

	"text-transform": {
		prefix: "tt",
		properties: ["text-transform"],
		slug: "text-transform",
		values: {
			c: "capitalize",
			l: "lowercase",
			n: "none",
			u: "uppercase",
		},
		variants: standard,
	},

	"text-underline-offset": {
		prefix: "tuo",
		properties: ["text-underline-offset"],
		slug: "text-underline-offset",
		values: {
			"0": "0px",
			"1": "1px",
			"2": "2px",
			"4": "4px",
			"8": "8px",
			auto: "auto",
		},
		variants: standard,
	},

	"text-wrap": {
		prefix: "tw",
		properties: ["text-wrap"],
		slug: "text-wrap",
		values: {
			b: "balance",
			n: "nowrap",
			p: "pretty",
			w: "wrap",
		},
		variants: standard,
	},

	"white-space": {
		prefix: "ws",
		properties: ["white-space"],
		slug: "white-space",
		values: {
			bs: "break-spaces",
			n: "normal",
			nw: "nowrap",
			p: "pre",
			pl: "pre-line",
			pw: "pre-wrap",
		},
		variants: standard,
	},

	"vertical-align": {
		prefix: "va",
		properties: ["vertical-align"],
		slug: "vertical-align",
		values: {
			b: "bottom",
			ba: "baseline",
			m: "middle",
			s: "sub",
			su: "super",
			t: "top",
			tb: "text-bottom",
			tt: "text-top",
		},
		variants: standard,
	},

	"writing-mode": {
		prefix: "wm",
		properties: ["writing-mode"],
		slug: "writing-mode",
		values: {
			htb: "horizontal-tb",
			slr: "sideways-lr",
			srl: "sideways-rl",
			vlr: "vertical-lr",
			vrl: "vertical-rl",
		},
		variants: standard,
	},
};

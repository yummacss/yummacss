import { decorationThickness } from "@/defaults/variables";
import { base } from "@/defaults/variants/stacks";
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
		variants: base,
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
		variants: base,
	},

	"list-style-position": {
		prefix: "lsp",
		properties: ["list-style-position"],
		slug: "list-style-position",
		values: {
			i: "inside",
			o: "outside",
		},
		variants: base,
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
		variants: base,
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
		variants: base,
	},

	"overflow-wrap": {
		prefix: "ow",
		properties: ["overflow-wrap"],
		slug: "overflow-wrap",
		values: {
			bw: "break-word",
			n: "normal",
		},
		variants: base,
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
		variants: base,
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
		variants: base,
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
		variants: base,
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
		variants: base,
	},

	"text-decoration": {
		prefix: "td",
		properties: ["text-decoration"],
		slug: "text-decoration",
		values: {
			none: "none",
			u: "underline",
		},
		variants: base,
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
		variants: base,
	},

	"text-overflow": {
		prefix: "to",
		properties: ["text-overflow"],
		slug: "text-overflow",
		values: {
			c: "clip",
			e: "ellipsis",
		},
		variants: base,
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
		variants: base,
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
		variants: base,
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
		variants: base,
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
		variants: base,
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
		variants: base,
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
		variants: base,
	},

	"word-break": {
		prefix: "wb",
		properties: ["word-break"],
		slug: "word-break",
		values: {
			ap: "auto-phrase",
			ba: "break-all",
			ka: "keep-all",
			n: "normal",
		},
		variants: base,
	},
};

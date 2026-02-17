import { scrollMarginValues, scrollPaddingValues } from "@/defaults/values";
import { standard } from "@/defaults/variants/presets";
import type { Utilities } from "@/interfaces";

export const interactivity: Utilities = {
	appearance: {
		prefix: "a",
		properties: ["appearance"],
		slug: "appearance",
		values: {
			auto: "auto",
			none: "none",
		},
		variants: standard,
	},

	cursor: {
		prefix: "c",
		properties: ["cursor"],
		slug: "cursor",
		values: {
			a: "alias",
			as: "all-scroll",
			auto: "auto",
			c: "cell",
			ch: "crosshair",
			cm: "context-menu",
			co: "copy",
			cr: "col-resize",
			d: "default",
			er: "ew-resize",
			g: "grab",
			gr: "grabbing",
			h: "help",
			m: "move",
			na: "not-allowed",
			ner: "ne-resize",
			neswr: "nesw-resize",
			none: "none",
			nr: "n-resize",
			nsr: "ns-resize",
			nwr: "nw-resize",
			nwser: "nwse-resize",
			p: "pointer",
			pr: "progress",
			rs: "row-resize",
			ser: "se-resize",
			sr: "s-resize",
			swr: "sw-resize",
			t: "text",
			vt: "vertical-text",
			w: "wait",
			wr: "w-resize",
			zi: "zoom-in",
			zo: "zoom-out",
		},
		variants: standard,
	},

	"field-sizing": {
		prefix: "fs",
		properties: ["field-sizing"],
		slug: "field-sizing",
		values: {
			f: "fixed",
			c: "content",
		},
		variants: standard,
	},

	"pointer-events": {
		prefix: "pe",
		properties: ["pointer-events"],
		slug: "pointer-events",
		values: {
			auto: "auto",
			none: "none",
		},
		variants: standard,
	},

	resize: {
		prefix: "r",
		properties: ["resize"],
		slug: "resize",
		values: {
			b: "both",
			h: "horizontal",
			none: "none",
			v: "vertical",
		},
		variants: standard,
	},

	"scroll-behavior": {
		prefix: "sb",
		properties: ["scroll-behavior"],
		slug: "scroll-behavior",
		values: {
			auto: "auto",
			s: "smooth",
		},
		variants: standard,
	},

	"scroll-margin": {
		prefix: "sm",
		properties: ["scroll-margin"],
		slug: "scroll-margin",
		values: scrollMarginValues,
		variants: standard,
	},

	"scroll-margin-bottom": {
		prefix: "smb",
		properties: ["scroll-margin-bottom"],
		slug: "scroll-margin#bottom",
		values: scrollMarginValues,
		variants: standard,
	},

	"scroll-margin-inline-start": {
		prefix: "smis",
		properties: ["scroll-margin-inline-start"],
		slug: "scroll-margin#inline-start",
		values: scrollMarginValues,
		variants: standard,
	},

	"scroll-margin-left": {
		prefix: "sml",
		properties: ["scroll-margin-left"],
		slug: "scroll-margin#scroll-margin-left",
		values: scrollMarginValues,
		variants: standard,
	},

	"scroll-margin-right": {
		prefix: "smr",
		properties: ["scroll-margin-right"],
		slug: "scroll-margin#scroll-margin-right",
		values: scrollMarginValues,
		variants: standard,
	},

	"scroll-margin-top": {
		prefix: "smt",
		properties: ["scroll-margin-top"],
		slug: "scroll-margin#scroll-margin-top",
		values: scrollMarginValues,
		variants: standard,
	},

	"scroll-margin-inline-end": {
		prefix: "smie",
		properties: ["scroll-margin-inline-end"],
		slug: "scroll-margin#scroll-margin-inline-end",
		values: scrollMarginValues,
		variants: standard,
	},

	"scroll-margin-x": {
		prefix: "smx",
		properties: ["scroll-margin-left", "scroll-margin-right"],
		slug: "scroll-margin#scroll-margin-x",
		values: scrollMarginValues,
		variants: standard,
	},

	"scroll-margin-y": {
		prefix: "smy",
		properties: ["scroll-margin-bottom", "scroll-margin-top"],
		slug: "scroll-margin#scroll-margin-y",
		values: scrollMarginValues,
		variants: standard,
	},

	"scroll-padding": {
		prefix: "sp",
		properties: ["scroll-padding"],
		slug: "scroll-padding",
		values: scrollPaddingValues,
		variants: standard,
	},

	"scroll-padding-bottom": {
		prefix: "spb",
		properties: ["scroll-padding-bottom"],
		slug: "scroll-padding#bottom",
		values: scrollPaddingValues,
		variants: standard,
	},

	"scroll-padding-inline-start": {
		prefix: "spis",
		properties: ["scroll-padding-inline-start"],
		slug: "scroll-padding#scroll-padding-inline-start",
		values: scrollPaddingValues,
		variants: standard,
	},

	"scroll-padding-left": {
		prefix: "spl",
		properties: ["scroll-padding-left"],
		slug: "scroll-padding#scroll-padding-left",
		values: scrollPaddingValues,
		variants: standard,
	},

	"scroll-padding-right": {
		prefix: "spr",
		properties: ["scroll-padding-right"],
		slug: "scroll-padding#scroll-padding-right",
		values: scrollPaddingValues,
		variants: standard,
	},

	"scroll-padding-top": {
		prefix: "spt",
		properties: ["scroll-padding-top"],
		slug: "scroll-padding#scroll-padding-top",
		values: scrollPaddingValues,
		variants: standard,
	},

	"scroll-padding-inline-end": {
		prefix: "spie",
		properties: ["scroll-padding-inline-end"],
		slug: "scroll-padding#scroll-padding-inline-end",
		values: scrollPaddingValues,
		variants: standard,
	},

	"scroll-padding-x": {
		prefix: "spx",
		properties: ["scroll-padding-left", "scroll-padding-right"],
		slug: "scroll-padding#scroll-padding-x",
		values: scrollPaddingValues,
		variants: standard,
	},

	"scroll-padding-y": {
		prefix: "spy",
		properties: ["scroll-padding-bottom", "scroll-padding-top"],
		slug: "scroll-padding#scroll-padding-y",
		values: scrollPaddingValues,
		variants: standard,
	},

	"scroll-snap-align": {
		prefix: "ssa",
		properties: ["scroll-snap-align"],
		slug: "scroll-snap-align",
		values: {
			c: "center",
			e: "end",
			none: "none",
			s: "start",
		},
		variants: standard,
	},

	"scroll-snap-stop": {
		prefix: "sss",
		properties: ["scroll-snap-stop"],
		slug: "scroll-snap-stop",
		values: {
			a: "always",
			n: "normal",
		},
		variants: standard,
	},

	"scroll-snap-type": {
		prefix: "sst",
		properties: ["scroll-snap-type"],
		slug: "scroll-snap-type",
		values: {
			"b-m": "both mandatory",
			none: "none",
			"x-m": "x mandatory",
			"x-p": "x proximity",
			"y-m": "y mandatory",
			"y-p": "y proximity",
		},
		variants: standard,
	},

	"user-select": {
		prefix: "us",
		properties: ["user-select"],
		slug: "user-select",
		values: {
			a: "all",
			auto: "auto",
			none: "none",
			t: "text",
		},
		variants: standard,
	},

	"touch-action": {
		prefix: "ta",
		properties: ["touch-action"],
		slug: "touch-action",
		values: {
			auto: "auto",
			m: "manipulation",
			none: "none",
			pd: "pan-down",
			pl: "pan-left",
			pr: "pan-right",
			pu: "pan-up",
			px: "pan-x",
			py: "pan-y",
			pz: "pinch-zoom",
		},
		variants: standard,
	},
};

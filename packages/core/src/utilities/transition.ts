import { transitionValues } from "@/defaults/values";
import { standard } from "@/defaults/variants/presets";
import type { Utilities } from "@/interfaces";

export const transition: Utilities = {
	"transition-delay": {
		prefix: "td",
		properties: ["transition-delay"],
		slug: "transition-delay",
		values: transitionValues,
		variants: standard,
	},

	"transition-duration": {
		prefix: "tdu",
		properties: ["transition-duration"],
		slug: "transition-duration",
		values: transitionValues,
		variants: standard,
	},

	"transition-property": {
		prefix: "tp",
		properties: ["transition-property"],
		slug: "transition-property",
		values: {
			a: "all",
			bs: "box-shadow",
			c: "color, background-color, border-color, text-decoration-color, fill, stroke",
			d: "height, width",
			h: "height",
			none: "none",
			o: "opacity",
			t: "transform",
			w: "width",
		},
		variants: standard,
	},

	"transition-timing-function": {
		prefix: "ttf",
		properties: ["transition-timing-function"],
		slug: "transition-timing-function",
		values: {
			l: "linear",
			ei: "ease-in",
			eo: "ease-out",
			io: "ease-in-out",
		},
		variants: standard,
	},
};

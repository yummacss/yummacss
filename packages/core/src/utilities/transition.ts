import { transitionValues } from "@/defaults/values";
import { standardPreset } from "@/defaults/variants/presets";
import type { Utilities } from "@/interfaces";

export const transition: Utilities = {
	"transition-property": {
		prefix: "tp",
		properties: ["transition-property"],
		slug: "transition-property",
		values: {
			a: "all",
			bs: "box-shadow",
			c: "color, background-color, border-color, text-decoration-color, fill, stroke",
			none: "none",
			o: "opacity",
			t: "transform",
		},
		variants: standardPreset,
	},

	"transition-duration": {
		prefix: "td",
		properties: ["transition-duration"],
		slug: "transition-duration",
		values: transitionValues,
		variants: standardPreset,
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
		variants: standardPreset,
	},

	"transition-delay": {
		prefix: "trd",
		properties: ["transition-delay"],
		slug: "transition-delay",
		values: transitionValues,
		variants: standardPreset,
	},
};

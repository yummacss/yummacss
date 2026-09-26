import { transitionValues } from "@/defaults/values";
import { base } from "@/defaults/variants/stacks";
import type { Utilities } from "@/interfaces";

export const animation: Utilities = {
	"animation-delay": {
		prefix: "ad",
		properties: ["animation-delay"],
		slug: "animation-delay",
		values: transitionValues,
		variants: base,
	},

	"animation-duration": {
		prefix: "adu",
		properties: ["animation-duration"],
		slug: "animation-duration",
		values: transitionValues,
		variants: base,
	},

	"animation-iteration-count": {
		prefix: "aic",
		properties: ["animation-iteration-count"],
		slug: "animation-iteration-count",
		values: {
			1: "1",
			2: "2",
			3: "3",
			inf: "infinite",
		},
		variants: base,
	},

	// names come from theme.keyframes; none is the only one built in
	"animation-name": {
		prefix: "an",
		properties: ["animation-name"],
		slug: "animation-name",
		values: {
			none: "none",
		},
		variants: base,
	},

	"animation-timing-function": {
		prefix: "atf",
		properties: ["animation-timing-function"],
		slug: "animation-timing-function",
		values: {
			l: "linear",
			ei: "ease-in",
			eo: "ease-out",
			io: "ease-in-out",
		},
		variants: base,
	},
};

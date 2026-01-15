import {
	fontCharter,
	fontMono,
	fontSize3xl,
	fontSize4xl,
	fontSize5xl,
	fontSize6xl,
	fontSize7xl,
	fontSize8xl,
	fontSize9xl,
	fontSizeLg,
	fontSizeMd,
	fontSizeSm,
	fontSizeXl,
	fontSizeXs,
	fontSizeXxl,
	fontSystem,
} from "@/defaults/variables";
import { standardPreset } from "@/defaults/variants/preset";
import type { Utilities } from "@/interfaces";

export const font: Utilities = {
	"font-family": {
		prefix: "ff",
		properties: ["font-family"],
		slug: "font-family",
		values: {
			c: fontCharter,
			m: fontMono,
			s: fontSystem,
		},
		variants: standardPreset,
	},

	"font-size": {
		prefix: "fs",
		properties: ["font-size"],
		slug: "font-size",
		values: {
			xs: `${fontSizeXs}rem`,
			sm: `${fontSizeSm}rem`,
			md: `${fontSizeMd}rem`,
			lg: `${fontSizeLg}rem`,
			xl: `${fontSizeXl}rem`,
			xxl: `${fontSizeXxl}rem`,
			"3xl": `${fontSize3xl}rem`,
			"4xl": `${fontSize4xl}rem`,
			"5xl": `${fontSize5xl}rem`,
			"6xl": `${fontSize6xl}rem`,
			"7xl": `${fontSize7xl}rem`,
			"8xl": `${fontSize8xl}rem`,
			"9xl": `${fontSize9xl}rem`,
		},
		variants: standardPreset,
	},

	"font-style": {
		prefix: "fs",
		properties: ["font-style"],
		slug: "font-style",
		values: {
			i: "italic",
			n: "normal",
		},
		variants: standardPreset,
	},

	"font-weight": {
		prefix: "fw",
		properties: ["font-weight"],
		slug: "font-weight",
		values: {
			"100": "100",
			"200": "200",
			"300": "300",
			"400": "400",
			"500": "500",
			"600": "600",
			"700": "700",
			"800": "800",
			"900": "900",
		},
		variants: standardPreset,
	},
};

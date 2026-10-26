import type { CSSProperties } from "react";
import { colorTheme, generateShades } from "@yummacss/core";
import {
	formatHex,
	modeHsl,
	modeHwb,
	modeLab,
	modeLch,
	modeLrgb,
	modeOklab,
	modeOklch,
	modeRgb,
	useMode,
	wcagLuminance,
} from "culori/fn";

// the CSS color spaces, plus linear RGB for luminance
for (const mode of [
	modeRgb,
	modeLrgb,
	modeHsl,
	modeHwb,
	modeLab,
	modeLch,
	modeOklab,
	modeOklch,
]) {
	useMode(mode);
}

export { generateShades };

export const SHADE_LABELS = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"Base",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
];

export const LEGACY_SHADE_LABELS = [
	"6",
	"5",
	"4",
	"3",
	"2",
	"1",
	"Base",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
];

export const COLOR_FAMILIES: { name: string; color: string }[] = Object.entries(
	colorTheme,
).map(([name, color]) => ({
	name: name.charAt(0).toUpperCase() + name.slice(1),
	color,
}));

/** A color as uppercase hex, for copying. */
export const toHex = (color: string): string =>
	(formatHex(color) ?? color).toUpperCase();

/** Whether dark text reads better than white on the color. */
export const isLight = (color: string): boolean => wcagLuminance(color) > 0.179;

/** A swatch's color and edge as custom properties, for `bg:var(--swatch) bc:var(--edge)`. */
export function swatchStyle(color: string): CSSProperties {
	const luminance = wcagLuminance(color);

	// an edge only where the swatch would melt into the page: a pale one on the
	// light theme, a dark one on the dark theme
	const edge =
		luminance > 0.9
			? "light-dark(rgb(0 0 0 / 0.15), transparent)"
			: luminance < 0.1
				? "light-dark(transparent, rgb(255 255 255 / 0.15))"
				: "transparent";

	return { "--swatch": color, "--edge": edge } as CSSProperties;
}

/** The classes that draw a swatch from `swatchStyle`. */
export const SWATCH = "bg:var(--swatch) bw:1 bc:var(--edge)";

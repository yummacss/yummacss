import { colorTheme, generateShades } from "@yummacss/core";
import tinycolor from "tinycolor2";

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

export function getBorderColor(color: string): string {
	const luminance = tinycolor(color).getLuminance();

	// an edge only where the swatch would melt into the page: a pale one on the
	// light theme, a dark one on the dark theme
	if (luminance > 0.9) {
		return "1px solid light-dark(rgb(0 0 0 / 0.15), transparent)";
	}

	if (luminance < 0.1) {
		return "1px solid light-dark(transparent, rgb(255 255 255 / 0.15))";
	}

	return "none";
}

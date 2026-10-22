"use client";

import { colorTheme, generateShades } from "@yummacss/core";

const SURFACE: {
  name: string;
  property: string;
  darker?: boolean;
  shade?: number;
  alpha?: number;
}[] = [
  {
    name: "bg:slate-12",
    property: "background-color",
  },
  {
    name: "bc:slate-12",
    property: "border-color",
  },
  {
    name: "blc:slate-12",
    property: "border-left-color",
  },
  {
    name: "h:bg:slate-11",
    property: "background-color",
    darker: true,
  },
  { name: "f:slate-12", property: "fill" },
  { name: "c:slate-11", property: "color" },
  // `shade` indexes generateShades(), where Yumma's `slate-4` is [3].
  { name: "oc:focus/40", property: "outline-color", shade: 3, alpha: 0.6 },
  { name: "fv:oc:focus/40", property: "outline-color", shade: 3, alpha: 0.6 },
  { name: "fw:oc:focus/40", property: "outline-color", shade: 3, alpha: 0.6 },
  { name: "fv:bc:focus", property: "border-color" },
  { name: "fw:bc:focus", property: "border-color" },
  {
    name: "s:slate-12",
    property: "stroke",
  },
];

const STATES: Record<string, string> = {
  h: ":hover",
  fv: ":focus-visible",
  fw: ":focus-within",
};

// `h:bg:slate-11` is `.h\:bg\:slate-11:hover`, as the generator writes it.
function selectorOf(name: string): string {
  const state = STATES[name.split(":")[0]] ?? "";
  return `.${name.replace(/[:/]/g, "\\$&")}${state}`;
}

export const ACCENT_CLASSES = SURFACE.map((entry) => entry.name);

export const ACCENT_EXCLUDES = ["c:slate-12"];

export const ACCENTS = Object.keys(colorTheme);

export const DEFAULT_ACCENT = "slate";

const KEY = "yui:accent";

export function isAccent(value: unknown): value is string {
  return typeof value === "string" && ACCENTS.includes(value);
}

export function accentCss(family: string): string {
  if (family === DEFAULT_ACCENT || !isAccent(family)) return "";

  const shades = generateShades(colorTheme[family as keyof typeof colorTheme]);
  const base = accentShade(shades);

  return SURFACE.map(({ name, property, darker, shade, alpha }) => {
    const hex = shades[shade ?? (darker ? base + 1 : base)];
    const value = alpha ? hex + Math.round(alpha * 255).toString(16) : hex;
    return `${selectorOf(name)} { ${property}: ${value}; }`;
  }).join("\n");
}

/** Three shades of a family, light, base and dark, as the accent picker draws it. */
export function accentBars(family: string): string[] {
  const shades = generateShades(colorTheme[family as keyof typeof colorTheme]);
  return [shades[3], shades[6], shades[9]];
}

// The lightest shade from 6 up that keeps white text at 4.5:1.
export function accentShade(shades: string[]): number {
  let shade = 6;
  while (shade < 11 && contrastOnWhite(shades[shade]) < 4.5) shade += 1;
  return shade;
}

function contrastOnWhite(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 1.05 / (0.2126 * r + 0.7152 * g + 0.0722 * b + 0.05);
}

export function readAccent(): string {
  try {
    const stored = window.localStorage.getItem(KEY);
    return isAccent(stored) ? stored : DEFAULT_ACCENT;
  } catch {
    return DEFAULT_ACCENT;
  }
}

export function writeAccent(family: string): void {
  try {
    window.localStorage.setItem(KEY, family);
  } catch {}
}

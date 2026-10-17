// light or dark for the preview frame only, remembered like the accent
export const SCHEMES = ["light", "dark"] as const;
export type Scheme = (typeof SCHEMES)[number];

const KEY = "yui:scheme";

export function readScheme(): Scheme {
  try {
    return window.localStorage.getItem(KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function writeScheme(scheme: Scheme): void {
  try {
    window.localStorage.setItem(KEY, scheme);
  } catch {}
}

// the build lowers light-dark() to these two variables, so they flip with it
export function schemeCss(scheme: Scheme): string {
  const [light, dark] = scheme === "dark" ? [" ", "initial"] : ["initial", " "];
  return `html:root { color-scheme: ${scheme}; --lightningcss-light:${light}; --lightningcss-dark:${dark}; }`;
}

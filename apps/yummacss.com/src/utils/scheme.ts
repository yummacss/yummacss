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

// the build lowers light-dark() to these two variables, and the site's own
// stylesheet pins popups to light, so this wins on every element in the frame
export function schemeCss(scheme: Scheme): string {
  const [light, dark] = scheme === "dark" ? [" ", "initial"] : ["initial", " "];
  return `html:root, html:root * { color-scheme: ${scheme} !important; --lightningcss-light:${light} !important; --lightningcss-dark:${dark} !important; }`;
}

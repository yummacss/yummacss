import { normalizeCSS } from "@yummacss/nitro/browser";

const norm = (s) => s.replace(/\s+/g, " ").trim();

const RULES = new Map();
for (const [, selector, body] of normalizeCSS.matchAll(
  /([^{}]+)\{([^{}]*)\}/g,
)) {
  RULES.set(norm(selector), `${norm(selector)} {${body}}`);
}

export function normalizeSelectors() {
  return [...RULES.keys()];
}

export function parseSelectors(attr) {
  return attr.split(";").map(norm).filter(Boolean);
}

export function rulesFor(selectors) {
  const missing = selectors.filter((s) => !RULES.has(s));
  if (missing.length > 0) {
    throw new Error(
      `normalize: no such rule in the shipped reset: ${missing.join(" | ")}`,
    );
  }
  return selectors.map((s) => RULES.get(s)).join("\n\n");
}

export function fillNormalizeFences(source) {
  return source.replace(
    /```css normalize="([^"]+)"\n```/g,
    (_, attr) => `\`\`\`css\n${rulesFor(parseSelectors(attr))}\n\`\`\``,
  );
}

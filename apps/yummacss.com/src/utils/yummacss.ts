import * as core from "@yummacss/core";

export const categoryGetters = {
  animation: core.animationUtils,
  background: core.backgroundUtils,
  border: core.borderUtils,
  boxModel: core.boxModelUtils,
  color: core.colorUtils,
  effect: core.effectUtils,
  flexbox: core.flexboxUtils,
  font: core.fontUtils,
  grid: core.gridUtils,
  interactivity: core.interactivityUtils,
  layout: core.layoutUtils,
  outline: core.outlineUtils,
  positioning: core.positioningUtils,
  text: core.textUtils,
  transform: core.transformUtils,
  transition: core.transitionUtils,
} as const;

export type Category = keyof typeof categoryGetters;

export type ReferenceVariant =
  | "media"
  | "pseudo-class"
  | "pseudo-element"
  | "negative"
  | "opacity";

export interface ReferenceRow {
  className: string;
  details: string[];
}

export interface SummaryToken {
  id: string;
  text: string;
  punctuation?: boolean;
}

export interface ReferenceData {
  summary: SummaryToken[];
  rows: ReferenceRow[];
  noun: string;
}

interface VariantEntry {
  prefix: string;
  value: string;
}

interface Variants {
  pseudoClasses?: VariantEntry[];
  pseudoElements?: VariantEntry[];
  mediaQueries?: VariantEntry[];
  opacity?: VariantEntry[];
}

export function getPrefix(category: Category, name: string): string {
  try {
    const getter = categoryGetters[category];
    if (!getter) return name;

    const utils = getter();
    const util = utils[name];

    return util ? util.prefix : name;
  } catch (err) {
    console.error(`Failed to get prefix for ${category}:${name}`, err);
    return name;
  }
}

export function getValues(category: Category, name: string): string[] {
  try {
    const getter = categoryGetters[category];
    if (!getter) return [];
    const util = getter()[name];
    return util ? Object.keys(util.values) : [];
  } catch (err) {
    console.error(`Failed to get values for ${category}:${name}`, err);
    return [];
  }
}

const SUMMARY_BUDGET = 56;

function oneLine(parts: string[]): string[] {
  const out: string[] = [];
  let width = 0;

  for (const part of parts) {
    if (out.length > 0 && width + part.length + 2 > SUMMARY_BUDGET) {
      out.push("…");
      break;
    }
    out.push(part);
    width += part.length + 2;
  }

  return out;
}

function summarize(classNames: string[]): string[] {
  if (classNames.length <= 6) return oneLine(classNames);

  const stem = classNames.reduce((acc, c) => {
    let i = 0;
    while (i < acc.length && acc[i] === c[i]) i++;
    return acc.slice(0, i);
  });
  const isScale = (c: string) => /^\d+$/.test(c.slice(stem.length));

  const numeric = classNames.filter(isScale);
  const named = classNames.filter((c) => !isScale(c));
  const out: string[] = [];

  if (numeric.length > 2) {
    out.push(`${numeric[0]} … ${numeric.at(-1)}`);
  } else {
    out.push(...numeric);
  }

  const limit = numeric.length > 2 ? 2 : 3;
  out.push(...named.slice(0, limit));

  if (named.length > limit) out.push("…");
  return oneLine(out);
}

const SEPARATOR = ", ";
const ELISION = " … ";

function tokenize(parts: string[]): SummaryToken[] {
  const out: SummaryToken[] = [];
  const push = (text: string, punctuation?: boolean) =>
    out.push({ id: `${out.length}:${text}`, text, punctuation });

  parts.forEach((part, index) => {
    if (index > 0) push(SEPARATOR, true);

    if (part === "…") {
      push(part, true);
      return;
    }

    const [from, to] = part.split(ELISION);
    if (to === undefined) {
      push(part);
      return;
    }

    push(from as string);
    push(ELISION, true);
    push(to);
  });

  return out;
}

const PREFERRED = ["4", "8", "12", "16"];

function exampleClass(category: Category, name: string): string {
  const prefix = getPrefix(category, name);
  const values = getValues(category, name);
  const value =
    PREFERRED.find((v) => values.includes(v)) ??
    values[Math.floor(values.length / 2)];
  return value === undefined || value === "" ? prefix : `${prefix}:${value}`;
}

export function getReferenceData(
  category: Category,
  name: string,
  variant?: ReferenceVariant,
): ReferenceData | null {
  let util: ReturnType<(typeof categoryGetters)[Category]>[string] | undefined;
  try {
    util = categoryGetters[category]?.()[name];
  } catch (err) {
    console.error(`Failed to get utility ${category}:${name}`, err);
    return null;
  }
  if (!util) return null;

  const { prefix, properties, values, variants } = util as {
    prefix: string;
    properties: readonly string[];
    values: Record<string, string>;
    variants?: Variants;
  };

  const declare = (value: string) => properties.map((p) => `${p}: ${value};`);
  const base = exampleClass(category, name);

  const fromVariants = (
    entries: VariantEntry[] | undefined,
    toClass: (entry: VariantEntry) => string,
    noun: string,
  ): ReferenceData | null => {
    if (!entries || entries.length === 0) return null;
    const rows = entries.map((entry) => ({
      className: toClass(entry),
      details: [entry.value],
    }));
    return {
      summary: tokenize(summarize(rows.map((r) => r.className))),
      rows,
      noun,
    };
  };

  switch (variant) {
    case "media":
      return fromVariants(
        variants?.mediaQueries,
        (v) => `@${v.prefix}:${base}`,
        "media queries",
      );

    case "pseudo-class":
      return fromVariants(
        variants?.pseudoClasses,
        (v) => `${v.prefix}:${base}`,
        "pseudo classes",
      );

    case "pseudo-element":
      return fromVariants(
        variants?.pseudoElements,
        (v) => `${v.prefix}::${base}`,
        "pseudo elements",
      );

    case "opacity":
      return fromVariants(
        variants?.opacity,
        (v) => `${base}/${v.prefix}`,
        "steps",
      );

    case "negative": {
      const rows = Object.entries(values)
        .filter(([key]) => /^\d+$/.test(key) && Number(key) !== 0)
        .map(([key, value]) => ({
          className: `${prefix}:-${key}`,
          details: declare(`-${value}`),
        }));
      if (rows.length === 0) return null;
      return {
        summary: tokenize(summarize(rows.map((r) => r.className))),
        rows,
        noun: "utilities",
      };
    }

    default: {
      const rows = Object.entries(values).map(([key, value]) => ({
        className: key === "" ? prefix : `${prefix}:${key}`,
        details: declare(value),
      }));
      if (rows.length === 0) return null;
      return {
        summary: tokenize(summarize(rows.map((r) => r.className))),
        rows,
        noun: "utilities",
      };
    }
  }
}

export interface VariantGroup {
  title: string;
  /** One sentence under the heading; `code` in backticks. */
  description: string;
  lines: { className: string; text: string }[];
}

const pick = <T extends { prefix: string }>(entries: T[], want: string) =>
  entries.find((e) => e.prefix === want) ?? (entries[0] as T);

const MEDIA_TEXT: Record<string, string> = {
  pc: "On a touch screen.",
  prm: "With reduced motion on.",
  st: "On the first frame.",
};

const COMMON_STATES = ["h", "f", "fv", "a", "d", "fc"];

const sentence = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** Every kind of variant the utility takes, each with classes to copy. */
/** The lead under a page's Variants heading, its example built from the utility. */
export const variantsLead = (category: Category, name: string) =>
  `Prefix any class with a variant to apply it only under that condition. Variants stack, as in \`@md:h:${exampleClass(category, name)}\`.`;

export function variantGroups(
  category: Category,
  name: string,
  negative = false,
): VariantGroup[] {
  let util:
    | { prefix: string; values: Record<string, string>; variants?: Variants }
    | undefined;
  try {
    util = categoryGetters[category]?.()[name] as typeof util;
  } catch {
    return [];
  }
  if (!util) return [];

  const base = exampleClass(category, name);
  const v = util.variants ?? {};
  const media = v.mediaQueries ?? [];
  const out: VariantGroup[] = [];

  const widths = media.filter(
    (e) => /min-width/.test(e.value) && !e.prefix.startsWith("c:"),
  );
  if (widths.length) {
    out.push({
      title: "Breakpoints",
      description:
        "Apply a class from a viewport width up. Each breakpoint covers its width & every width above it.",
      lines: widths.map((e) => ({
        className: `@${e.prefix}:${base}`,
        text: `From ${e.value.match(/min-width: ([^)]+)/)?.[1]} up.`,
      })),
    });
  }

  const containers = media.filter((e) => e.prefix.startsWith("c:"));
  if (containers.length) {
    out.push({
      title: "Containers",
      description:
        "Apply a class from a container's width up, not the viewport's. Mark the parent with `ct:is` first.",
      lines: containers.map((e) => ({
        className: `@${e.prefix}:${base}`,
        text: `Container from ${e.value.match(/min-width: ([^)]+)/)?.[1]} up.`,
      })),
    });
  }

  const other = media.filter(
    (e) => !widths.includes(e) && !containers.includes(e),
  );
  if (other.length) {
    out.push({
      title: "Media",
      description:
        "Apply a class when the device or the page matches a condition, or on the first frame an element renders.",
      lines: other.map((e) => ({
        className: `@${e.prefix}:${base}`,
        text: MEDIA_TEXT[e.prefix] ?? `${e.value}.`,
      })),
    });
  }

  const states = v.pseudoClasses ?? [];
  if (states.length) {
    // the common ones first, then the rest in the generator's order
    const first = COMMON_STATES.flatMap((c) =>
      states.filter((e) => e.prefix === c),
    );
    out.push({
      title: "States",
      description:
        "Apply a class only while the element is in a state, such as hovered, focused or checked.",
      lines: [...first, ...states.filter((e) => !first.includes(e))].map(
        (e) => ({ className: `${e.prefix}:${base}`, text: `On ${e.value}.` }),
      ),
    });
  }

  if (v.pseudoElements?.length) {
    out.push({
      title: "Pseudo Elements",
      description:
        "Style a part of the element rather than the element itself, such as its placeholder or the selected text.",
      lines: v.pseudoElements.map((e) => ({
        className: `${e.prefix}::${base}`,
        text: `On ${e.value.replace(/^:+/, "::")}.`,
      })),
    });
  }

  if (v.opacity?.length) {
    const half = pick(v.opacity, "50");
    const steps = v.opacity.map((e) => Number(e.prefix));
    out.push({
      title: "Opacity",
      description: "Add a slash & a step after a color to set its opacity.",
      lines: [
        {
          className: `${base}/${half.prefix}`,
          text: sentence(
            `at ${half.value} opacity, in steps of ${steps[1] - steps[0]}.`,
          ),
        },
      ],
    });
  }

  const numeric = Object.keys(util.values).find(
    (k) => /^\d+$/.test(k) && Number(k) !== 0,
  );
  if (negative && numeric) {
    const key = PREFERRED.find((k) => k in util.values) ?? numeric;
    out.push({
      title: "Negative",
      description: "Put a minus after the colon to negate a value.",
      lines: [
        {
          className: `${util.prefix}:-${key}`,
          text: "A minus after the colon.",
        },
      ],
    });
  }

  return out;
}

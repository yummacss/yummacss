// A style rewrites a component file: its shape and size defaults and its
// *SHAPES tables. See the notes, "Component API as styles".

export const RADIUS = ["none", "small", "medium", "large", "extra"];

export const STYLES = {
  soft: {
    name: "Soft",
    radius: "large",
    allow: ["small", "medium", "large", "extra"],
    refused: { none: "Soft is rounded. No radius is a square." },
  },
  compact: {
    name: "Compact",
    radius: "small",
    size: "sm",
    allow: ["none", "small", "medium", "large"],
    refused: { extra: "At 30px tall, br:xl reads as a pill." },
  },
  squircle: {
    name: "Squircle",
    radius: "large",
    shape: "squircle",
    allow: ["medium", "large"],
    refused: {
      none: "A squircle with no radius is a square.",
      small: "Too small a radius for the curve to show.",
      extra: "br:3xl on a 36px control reads as a pill.",
    },
  },
};

export const DEFAULT_STYLE = "soft";

const SCALE = ["0", "xs", "sm", "md", "lg", "xl", "xxl", "3xl"];
const SHIFT = { none: -2, small: -2, medium: -1, large: 0, extra: 1 };

// the value a table holds today names the part, and the part bounds the shift
const BOUNDS = [
  { from: ["sm"], min: "xs", max: "md" },
  { from: ["md", "lg"], min: "xs", max: "xl" },
  { from: ["xl", "xxl", "3xl"], min: "sm", max: "3xl" },
];
// a squircle only ever loses radius: past its own it reads as a pill
const SQUIRCLE_MIN = "lg";

export function refusal(style, radius) {
  const entry = STYLES[style];
  if (!entry) return `There is no ${style} style.`;
  if (!RADIUS.includes(radius)) return `There is no ${radius} radius.`;
  if (entry.allow.includes(radius)) return null;
  return entry.refused[radius] ?? `${entry.name} does not take ${radius}.`;
}

function shift(value, radius, bounds) {
  const next = SCALE.indexOf(value) + SHIFT[radius];
  const lo = SCALE.indexOf(bounds.min);
  const hi = SCALE.indexOf(bounds.max);
  return SCALE[Math.min(Math.max(next, lo), hi)];
}

function shiftToken(value, radius, squircle) {
  if (!SCALE.includes(value) || value === "0") return value;
  const bounds = squircle
    ? { min: SQUIRCLE_MIN, max: value }
    : BOUNDS.find((entry) => entry.from.includes(value));
  return bounds ? shift(value, radius, bounds) : value;
}

// comments are left alone; a string with cs:s holds a squircle
const PIECES =
  /\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`/g;

function shiftClasses(source, radius) {
  return source.replace(PIECES, (piece) => {
    if (piece.startsWith("/")) return piece;
    const squircle = /\bcs:s\b/.test(piece);
    return piece.replace(
      /\bbr:([a-z0-9]+)\b/g,
      (_, value) => `br:${shiftToken(value, radius, squircle)}`,
    );
  });
}

function unionOf(source, type) {
  const found = source.match(new RegExp(`^type ${type} = ([^;]+);`, "m"));
  return found ? [...found[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]) : [];
}

export function applyStyle(source, style, radius) {
  const refused = refusal(style, radius);
  if (refused) throw new Error(refused);
  const entry = STYLES[style];

  let out = shiftClasses(source, radius);

  const shapes = unionOf(source, "Shape");
  const shape = radius === "none" ? "square" : (entry.shape ?? "rounded");
  if (shapes.includes(shape)) {
    out = out.replace(
      /^(\s*)(shape|iconShape) = "rounded",$/gm,
      `$1$2 = "${shape}",`,
    );
  }

  if (entry.size && unionOf(source, "Size").includes(entry.size)) {
    out = out.replace(/^(\s*)size = "md",$/gm, `$1size = "${entry.size}",`);
  }

  return out;
}

// the step a blocked pair falls back to: the nearest allowed, the default on a tie
export function nearestRadius(style, radius) {
  const spec = STYLES[style] ?? STYLES[DEFAULT_STYLE];
  if (spec.allow.includes(radius)) return radius;
  const at = RADIUS.indexOf(radius);
  if (at < 0) return spec.radius;
  const home = RADIUS.indexOf(spec.radius);
  return [...spec.allow].sort(
    (a, b) =>
      Math.abs(RADIUS.indexOf(a) - at) - Math.abs(RADIUS.indexOf(b) - at) ||
      Math.abs(RADIUS.indexOf(a) - home) - Math.abs(RADIUS.indexOf(b) - home),
  )[0];
}

// the shape and size defaults a style writes, for the props a component has
export function styleProps(props, style, radius) {
  const spec = STYLES[style] ?? STYLES[DEFAULT_STYLE];
  const shape = radius === "none" ? "square" : (spec.shape ?? "rounded");
  const out = {};
  for (const prop of props) {
    const values = prop.values ?? [];
    if (
      (prop.name === "shape" || prop.name === "iconShape") &&
      prop.default === "rounded" &&
      values.includes(shape)
    ) {
      out[prop.name] = shape;
    }
    if (
      prop.name === "size" &&
      spec.size &&
      prop.default === "md" &&
      values.includes(spec.size)
    ) {
      out.size = spec.size;
    }
  }
  return out;
}

const REM = {
  0: "0",
  xs: ".125rem",
  sm: ".25rem",
  md: ".375rem",
  lg: ".5rem",
  xl: ".75rem",
  xxl: "1rem",
  "3xl": "1.5rem",
};

// the preview's version of applyStyle: each radius class, redefined by value
export function radiusCss(style, radius) {
  if (refusal(style, radius)) return "";
  const rules = [];
  for (const value of SCALE) {
    const round = shiftToken(value, radius, false);
    if (round !== value) {
      rules.push(
        `.br\\:${value}:not(.cs\\:s) { border-radius: ${REM[round]}; }`,
      );
    }
    const squircle = shiftToken(value, radius, true);
    if (squircle !== value) {
      rules.push(`.br\\:${value}.cs\\:s { border-radius: ${REM[squircle]}; }`);
    }
  }
  return rules.join("\n");
}

// the CLI flags for a pair, empty for the default
export function styleFlags(style, radius) {
  const spec = STYLES[style] ?? STYLES[DEFAULT_STYLE];
  const flags = [];
  if (style !== DEFAULT_STYLE) flags.push(`--style ${style}`);
  if (radius !== spec.radius) flags.push(`--radius ${radius}`);
  return flags.join(" ");
}

import type { ChildExample } from "@/registry";
import { EXAMPLE_ICON_STYLE, type IconStyle } from "@/utils/icon-style";
import { importPath } from "@/utils/install.mjs";

export type PropValue = string | boolean | number;

export type TokenKind =
  | "command"
  | "argument"
  | "flag"
  | "keyword"
  | "punctuation"
  | "tag"
  | "attribute"
  | "operator"
  | "string"
  | "brace"
  | "value"
  | "text";

export interface Token {
  kind: TokenKind;
  text: string;
  id: string;
}

type Draft = Omit<Token, "id">;

export const TOKEN_COLORS: Record<TokenKind, string> = {
  command: "#F5FAFF",
  argument: "#BEC6F2",
  flag: "#DDA2F6",
  keyword: "#9595E3",
  punctuation: "#B9BED5",
  tag: "#85B1E0",
  attribute: "#DDA2F6",
  operator: "#93DDFB",
  string: "#BEC6F2",
  brace: "#9595E3",
  value: "#DDA2F6",
  text: "#B9BED5",
};

function identify(tokens: Draft[]): Token[] {
  return tokens.map((token, index) => ({
    ...token,
    id: `${index}-${token.kind}-${token.text}`,
  }));
}

export function componentName(id: string): string {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/** The registry id a component's name stands for: `ButtonGroup` is `button-group`. */
export function componentId(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function iconMarker(
  value: unknown,
): { name: string; size?: string; style?: IconStyle } | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }
  const keys = Object.keys(value);
  if (!keys.includes("$icon")) return null;
  if (keys.some((key) => !["$icon", "size", "style"].includes(key)))
    return null;
  const { $icon: name, size, style } = value as Record<string, unknown>;
  if (typeof name !== "string") return null;
  return {
    name,
    size: typeof size === "string" ? size : undefined,
    style: style === "outline" || style === "bold" ? style : undefined,
  };
}

// "style:name", so one icon in two styles imports from both barrels
function markedIcons(value: unknown): string[] {
  const marker = iconMarker(value);
  if (marker) {
    const style = marker.style ?? EXAMPLE_ICON_STYLE[marker.name] ?? "outline";
    return [`${style}:${marker.name}`];
  }
  if (Array.isArray(value)) return value.flatMap(markedIcons);
  if (typeof value === "object" && value !== null) {
    if ("$$typeof" in value) return [];
    return Object.values(value).flatMap(markedIcons);
  }
  return [];
}

export function tokensToText(tokens: Token[]): string {
  return tokens.map((token) => token.text).join("");
}

/** The `yumma.config.mjs` a component needs: its states, easings and keyframes, nothing else. */
export function buildConfig(config: {
  states: Record<string, string>;
  easings: Record<string, string>;
  keyframes: Record<string, string>;
}): Token[] {
  const out: Draft[] = [];
  const push = (kind: TokenKind, text: string) => out.push({ kind, text });

  const table = (name: string, entries: Record<string, string>) => {
    const keys = Object.keys(entries);
    if (!keys.length) return;
    push("text", "    ");
    push("attribute", name);
    push("punctuation", ": ");
    push("brace", "{");
    push("text", "\n");
    for (const key of keys) {
      push("text", "      ");
      // a name with a dash is a quoted key
      push("attribute", /^[a-z]+$/.test(key) ? key : JSON.stringify(key));
      push("punctuation", ": ");
      push("string", JSON.stringify(entries[key]));
      push("punctuation", ",");
      push("text", "\n");
    }
    push("text", "    ");
    push("brace", "}");
    push("punctuation", ",");
    push("text", "\n");
  };

  push("keyword", "import");
  push("text", " ");
  push("brace", "{");
  push("text", " defineConfig ");
  push("brace", "}");
  push("text", " ");
  push("keyword", "from");
  push("text", " ");
  push("string", '"yummacss"');
  push("punctuation", ";");
  push("text", "\n\n");
  push("keyword", "export default");
  push("text", " defineConfig");
  push("punctuation", "(");
  push("brace", "{");
  push("text", "\n  ");
  push("attribute", "source");
  push("punctuation", ": ");
  push("brace", "[");
  push("string", '"./src/**/*.{ts,tsx}"');
  push("brace", "]");
  push("punctuation", ",");
  push("text", "\n  ");
  push("attribute", "theme");
  push("punctuation", ": ");
  push("brace", "{");
  push("text", "\n");
  table("states", config.states);
  table("easings", config.easings);
  table("keyframes", config.keyframes);
  push("text", "  ");
  push("brace", "}");
  push("punctuation", ",");
  push("text", "\n");
  push("brace", "}");
  push("punctuation", ");");

  return identify(out);
}

/** The Example view's code: its imports, then the scene as JSX. */
export function buildScene(scene: ChildExample[]): Token[] {
  const nodes = flatChildren(scene);
  const tokens: Draft[] = [];
  const line = (names: string[], from: string, braces: boolean) => {
    tokens.push(
      { kind: "keyword", text: "import" },
      { kind: "text", text: " " },
    );
    // a long list of names takes a line each
    const wrap = braces && names.join(", ").length + from.length > 60;
    if (braces)
      tokens.push(
        { kind: "brace", text: "{" },
        { kind: "text", text: wrap ? "\n  " : " " },
      );
    tokens.push({ kind: "tag", text: names.join(wrap ? ",\n  " : ", ") });
    if (wrap) tokens.push({ kind: "punctuation", text: "," });
    if (braces)
      tokens.push(
        { kind: "text", text: wrap ? "\n" : " " },
        { kind: "brace", text: "}" },
      );
    tokens.push(
      { kind: "text", text: " " },
      { kind: "keyword", text: "from" },
      { kind: "text", text: " " },
      { kind: "string", text: `"${from}"` },
      { kind: "punctuation", text: ";" },
      { kind: "text", text: "\n" },
    );
  };

  const components = [
    ...new Set(
      nodes
        .map((node) => node.component)
        .filter((name): name is string => Boolean(name)),
    ),
  ].sort();
  for (const name of components)
    line([name], importPath(componentId(name)), false);

  const icons = [
    ...new Set(
      nodes.flatMap((node) => [
        ...markedIcons(node.props ?? {}),
        ...markedIcons(node.icon),
      ]),
    ),
  ].sort();
  for (const style of ["bold", "outline"] as const) {
    const named = icons
      .filter((icon) => icon.startsWith(`${style}:`))
      .map((icon) => icon.slice(style.length + 1));
    if (named.length) line(named, `@solar-icons/react/${style}`, true);
  }

  for (const node of scene) tokens.push(...childTokens(node, 0));
  return identify(tokens);
}

function flatChildren(nodes: ChildExample[] = []): ChildExample[] {
  return nodes.flatMap((node) => [
    node,
    ...(Array.isArray(node.children) ? flatChildren(node.children) : []),
  ]);
}

// one demo child as JSX, nested children indented a level deeper
function childTokens(child: ChildExample, depth: number): Draft[] {
  const pad = "  ".repeat(depth);
  const glyph = iconMarker(child.icon);
  if (glyph) {
    const out: Draft[] = [
      { kind: "text", text: `\n${pad}` },
      { kind: "punctuation", text: "<" },
      { kind: "tag", text: glyph.name },
    ];
    if (glyph.size)
      out.push(
        { kind: "text", text: " " },
        { kind: "attribute", text: "className" },
        { kind: "punctuation", text: "=" },
        { kind: "string", text: JSON.stringify(glyph.size) },
      );
    out.push({ kind: "punctuation", text: " />" });
    return out;
  }
  const tag = child.component ?? child.tag ?? "span";
  const out: Draft[] = [
    { kind: "text", text: `\n${pad}` },
    { kind: "punctuation", text: "<" },
    { kind: "tag", text: tag },
  ];

  const attributes: Draft[][] = [];
  if (child.className)
    attributes.push(attributeTokens("className", child.className, pad));
  for (const [key, value] of Object.entries(child.props ?? {}))
    attributes.push(attributeTokens(key, value, `${pad}  `));

  // a tag that runs long, or holds data over several lines, gets a prop a line
  const text =
    child.text ??
    (typeof child.children === "string" ? child.children : undefined);
  const opening =
    width(out) +
    attributes.reduce((sum, a) => sum + 1 + width(a), 0) +
    (text?.length ?? 0);
  const stacked =
    opening > 80 ||
    attributes.some((a) => a.some((t) => t.text.includes("\n")));
  for (const attribute of attributes)
    out.push(
      { kind: "text", text: stacked ? `\n${pad}  ` : " " },
      ...attribute,
    );
  if (stacked) out.push({ kind: "text", text: `\n${pad}` });

  const nested = Array.isArray(child.children) ? child.children : undefined;

  if (text === undefined && !nested) {
    out.push({ kind: "punctuation", text: stacked ? "/>" : " />" });
    return out;
  }
  out.push({ kind: "punctuation", text: ">" });
  if (nested) {
    for (const node of nested) out.push(...childTokens(node, depth + 1));
    out.push({ kind: "text", text: `\n${pad}` });
  } else if (stacked) {
    out.push({ kind: "text", text: `\n${pad}  ${text ?? ""}\n${pad}` });
  } else {
    out.push({ kind: "text", text: text ?? "" });
  }
  out.push(
    { kind: "punctuation", text: "</" },
    { kind: "tag", text: tag },
    { kind: "punctuation", text: ">" },
  );
  return out;
}

function width(tokens: Draft[]): number {
  return tokens.reduce((sum, token) => sum + token.text.length, 0);
}

function iconTokens(marker: { name: string; size?: string }): Draft[] {
  const out: Draft[] = [
    { kind: "punctuation", text: "<" },
    { kind: "tag", text: marker.name },
  ];
  if (marker.size)
    out.push(
      { kind: "text", text: " " },
      { kind: "attribute", text: "className" },
      { kind: "punctuation", text: "=" },
      { kind: "string", text: JSON.stringify(marker.size) },
    );
  out.push({ kind: "punctuation", text: " />" });
  return out;
}

function attributeTokens(key: string, value: unknown, indent: string): Draft[] {
  const name: Draft = { kind: "attribute", text: key };
  if (value === true) return [name];
  const equals: Draft = { kind: "punctuation", text: "=" };
  if (typeof value === "string")
    return [name, equals, { kind: "string", text: JSON.stringify(value) }];
  return [
    name,
    equals,
    { kind: "brace", text: "{" },
    ...valueTokens(value, indent),
    { kind: "brace", text: "}" },
  ];
}

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

// data the way a person writes it: short lists inline, longer ones a line each
function valueTokens(value: unknown, indent: string): Draft[] {
  const marker = iconMarker(value);
  if (marker) return iconTokens(marker);
  if (typeof value === "string")
    return [{ kind: "string", text: JSON.stringify(value) }];
  if (typeof value !== "object" || value === null)
    return [{ kind: "value", text: String(value) }];

  const inner = `${indent}  `;
  const isList = Array.isArray(value);
  const entries: Draft[][] = isList
    ? value.map((item) => valueTokens(item, inner))
    : Object.entries(value).map(([key, item]) => [
        IDENTIFIER.test(key)
          ? { kind: "attribute", text: key }
          : { kind: "string", text: JSON.stringify(key) },
        { kind: "punctuation", text: ": " },
        ...valueTokens(item, inner),
      ]);
  const [open, close] = isList ? ["[", "]"] : ["{", "}"];
  if (entries.length === 0)
    return [{ kind: "punctuation", text: open + close }];

  const flat = entries.every((entry) =>
    entry.every((t) => !t.text.includes("\n")),
  );
  const inline = entries.reduce((sum, entry) => sum + width(entry) + 2, 0);
  if (flat && inline <= 60) {
    const pad = isList ? "" : " ";
    const out: Draft[] = [{ kind: "punctuation", text: open + pad }];
    entries.forEach((entry, index) => {
      if (index) out.push({ kind: "punctuation", text: ", " });
      out.push(...entry);
    });
    out.push({ kind: "punctuation", text: pad + close });
    return out;
  }

  const out: Draft[] = [{ kind: "punctuation", text: open }];
  for (const entry of entries)
    out.push({ kind: "text", text: `\n${inner}` }, ...entry, {
      kind: "punctuation",
      text: ",",
    });
  out.push(
    { kind: "text", text: `\n${indent}` },
    { kind: "punctuation", text: close },
  );
  return out;
}

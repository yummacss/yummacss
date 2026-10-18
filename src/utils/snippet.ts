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
    if (braces)
      tokens.push({ kind: "brace", text: "{" }, { kind: "text", text: " " });
    tokens.push({ kind: "tag", text: names.join(", ") });
    if (braces)
      tokens.push({ kind: "text", text: " " }, { kind: "brace", text: "}" });
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

  if (child.className) {
    out.push(
      { kind: "text", text: " " },
      { kind: "attribute", text: "className" },
      { kind: "punctuation", text: "=" },
      { kind: "string", text: JSON.stringify(child.className) },
    );
  }
  for (const [key, value] of Object.entries(child.props ?? {})) {
    out.push({ kind: "text", text: " " }, { kind: "attribute", text: key });
    if (value === true) continue;
    out.push({ kind: "punctuation", text: "=" });
    const marker = iconMarker(value);
    if (marker) {
      out.push(
        { kind: "brace", text: "{" },
        { kind: "punctuation", text: "<" },
        { kind: "tag", text: marker.name },
      );
      if (marker.size)
        out.push(
          { kind: "text", text: " " },
          { kind: "attribute", text: "className" },
          { kind: "punctuation", text: "=" },
          { kind: "string", text: JSON.stringify(marker.size) },
        );
      out.push(
        { kind: "punctuation", text: " />" },
        { kind: "brace", text: "}" },
      );
      continue;
    }
    if (typeof value === "string") {
      out.push({ kind: "string", text: JSON.stringify(value) });
      continue;
    }
    out.push(
      { kind: "brace", text: "{" },
      { kind: "value", text: JSON.stringify(value) },
      { kind: "brace", text: "}" },
    );
  }

  const text =
    child.text ??
    (typeof child.children === "string" ? child.children : undefined);
  const nested = Array.isArray(child.children) ? child.children : undefined;

  if (text === undefined && !nested) {
    out.push({ kind: "punctuation", text: " />" });
    return out;
  }
  out.push({ kind: "punctuation", text: ">" });
  if (nested) {
    for (const node of nested) out.push(...childTokens(node, depth + 1));
    out.push({ kind: "text", text: `\n${pad}` });
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

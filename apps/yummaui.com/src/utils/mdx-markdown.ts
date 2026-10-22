import type { Nodes, Root, RootContent } from "mdast";
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import type { RegistryMeta } from "@/registry";
import { targetPath } from "@/utils/install.mjs";

export type RegistryResolver = (registryId: string) => string | null;

export type MetaResolver = (registryId: string) => RegistryMeta | null;

// Note & Warning, and the Admonition the ::: directives become
const CALLOUTS: Record<string, string> = {
  Note: "note",
  Warning: "warning",
};
const LABELS: Record<string, string> = {
  note: "Note",
  warning: "Warning",
};
function buildPropsTable(meta: RegistryMeta): string[] {
  if (!meta.props?.length) return [];

  const rows = meta.props.map((prop) => {
    const type = prop.typeName
      ? `\`${prop.typeName.replaceAll("|", "\\|")}\``
      : prop.type === "enum" && prop.values
        ? prop.values.map((value) => `\`"${value}"\``).join(" \\| ")
        : `\`${prop.type}\``;
    const fallback =
      prop.default === undefined ? "-" : `\`${JSON.stringify(prop.default)}\``;
    const description = (prop.description ?? "").replaceAll("|", "\\|");
    return `| \`${prop.name}\` | ${type} | ${fallback} | ${description} |`;
  });

  return [
    ...(meta.summary ? [meta.summary, ""] : []),
    "| Prop | Type | Default | Description |",
    "|------|------|---------|-------------|",
    ...rows,
  ];
}

function fencedBlock(source: string, lang: string, meta?: string): string[] {
  const body = source.replace(/\r\n/g, "\n").replace(/\s+$/, "");
  const longest = Math.max(
    0,
    ...[...body.matchAll(/^\s*(`{3,})/gm)].map((m) => m[1].length),
  );
  const fence = "`".repeat(Math.max(3, longest + 1));

  return [
    `${fence}${lang}${meta ? ` ${meta}` : ""}`,
    ...body.split("\n"),
    fence,
  ];
}

interface RenderOptions {
  resolveRegistry?: RegistryResolver;
  resolveMeta?: MetaResolver;
  registryId?: string;
}

type Element = MdxJsxFlowElement | MdxJsxTextElement;

// built once: attaching the plugins is most of the cost of a small parse
const mdx = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkMdx)
  .use(remarkGfm)
  .use(remarkDirective)
  .freeze();
const out = unified()
  .use(remarkGfm, { tablePipeAlign: false })
  .use(remarkDirective)
  .use(remarkStringify, { bullet: "-", emphasis: "*", fences: true, rule: "-" })
  .freeze();

// markdown we build is already final, so it goes in as written
const markdown = (lines: string[]): RootContent[] =>
  lines.length ? [{ type: "html", value: lines.join("\n") }] : [];

// a step's title, bold, remembering the title so a Stepper can number it
const title = (value: string): RootContent =>
  ({
    type: "paragraph",
    data: { title: value },
    children: [{ type: "strong", children: [{ type: "text", value }] }],
  }) as RootContent;

const text = (node: Nodes): string =>
  "value" in node
    ? String(node.value)
    : "children" in node
      ? node.children.map(text).join("")
      : "";

const PHRASING = new Set([
  "text",
  "link",
  "inlineCode",
  "emphasis",
  "strong",
  "delete",
  "break",
  "html",
  "image",
  "textDirective",
]);

// a one-line component holds loose inline pieces; they read as one paragraph
function blocks(nodes: RootContent[]): RootContent[] {
  if (!nodes.length || !nodes.every((node) => PHRASING.has(node.type))) {
    return nodes;
  }
  return [{ type: "paragraph", children: nodes } as RootContent];
}

function attrs(node: Element): Record<string, string> {
  const out: Record<string, string> = {};
  for (const attr of node.attributes) {
    if (attr.type === "mdxJsxAttribute" && typeof attr.value === "string") {
      out[attr.name] = attr.value;
    }
  }
  return out;
}

function component(
  node: Element,
  options: RenderOptions,
  source: string,
): RootContent[] {
  const name = node.name ?? "";
  const a = attrs(node);

  const registryId =
    a.registryId ??
    (name === "ComponentPlayground" ? options.registryId : undefined);
  if (registryId) {
    const lines: string[] = [];
    const code = options.resolveRegistry?.(registryId);
    if (code) {
      lines.push(
        ...fencedBlock(code, "tsx", `title="${targetPath(registryId)}"`),
      );
    }
    const meta = options.resolveMeta?.(registryId);
    if (meta) lines.push("", ...buildPropsTable(meta));
    return markdown(lines);
  }

  const children = blocks(
    convert(node.children as RootContent[], options, source),
  );

  if (name === "Stepper") {
    let step = 0;
    return children.map((child) =>
      child.data && "title" in child.data
        ? title(`${++step}. ${child.data.title}`)
        : child,
    );
  }
  if (name === "Step" && a.title) return [title(a.title), ...children];
  const callout =
    CALLOUTS[name] ?? (name === "Admonition" ? a.kind : undefined);
  if (callout) {
    const label = a.title ?? LABELS[callout] ?? "Note";
    return children.length
      ? [
          {
            type: "blockquote",
            children: [...markdown([`**${label}**`]), ...children],
          } as RootContent,
        ]
      : [];
  }
  if (name === "a" && a.href) {
    const [label, ...rest] = children
      .map(text)
      .map((s) => s.trim())
      .filter(Boolean);
    if (!label) return [];
    const detail = rest.join(" - ");
    return markdown([`- [${label}](${a.href})${detail ? ` - ${detail}` : ""}`]);
  }
  if (/^[A-Z]/.test(name) || name === "div") return children;

  // any other HTML element stays as written
  const { start, end } = node.position ?? {};
  return start && end
    ? [{ type: "html", value: source.slice(start.offset, end.offset) }]
    : children;
}

function convert(
  nodes: RootContent[],
  options: RenderOptions,
  source: string,
): RootContent[] {
  return nodes.flatMap((node): RootContent[] => {
    if (node.type === "mdxjsEsm" || node.type === "yaml") return [];
    if (
      node.type === "mdxFlowExpression" ||
      node.type === "mdxTextExpression"
    ) {
      return [];
    }
    if (
      node.type === "mdxJsxFlowElement" ||
      node.type === "mdxJsxTextElement"
    ) {
      return component(node, options, source);
    }
    if ("children" in node) {
      return [
        {
          ...node,
          children: convert(node.children as RootContent[], options, source),
        } as RootContent,
      ];
    }
    return [node];
  });
}

export function mdxToMarkdown(
  content: string,
  options: RenderOptions = {},
): string {
  const source = content.replace(/\r\n/g, "\n");
  const tree = mdx.parse(source) as Root;

  const children = convert(tree.children, options, source);

  return out.stringify({ type: "root", children }).trim();
}

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
import { baselineFor } from "@/utils/baseline";
import { BRAND_COLORS, type BrandProduct, brandFiles } from "@/utils/brand";
import { COLOR_FAMILIES, SHADE_LABELS } from "@/utils/colors";
import { targetPath } from "@/utils/install.mjs";
import { fillNormalizeFences } from "@/utils/normalize-rules.mjs";
import {
  type Category,
  categoryGetters,
  variantGroups,
  variantsLead,
} from "@/utils/yummacss";

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

function buildReferenceTable(category: Category, name: string): string[] {
  try {
    const getter = categoryGetters[category];
    if (!getter) return [];

    const utils = getter();
    const util = utils[name];
    if (!util) return [];

    const rows = Object.entries(util.values as Record<string, string>).map(
      ([suffix, value]) => {
        const cls = suffix === "" ? util.prefix : `${util.prefix}:${suffix}`;
        const props = (util.properties as string[]).join(", ");
        return `| \`${cls}\` | ${props} | \`${value}\` |`;
      },
    );

    return [
      "| Class | Properties | Value |",
      "|-------|------------|-------|",
      ...rows,
    ];
  } catch {
    return [];
  }
}

function buildBaseline(path: string): string[] {
  const baseline = baselineFor(path);
  if (!baseline) return [];

  const support = baseline.browsers
    .map((b) =>
      b.supported
        ? `${b.name} ${b.version}${b.desktopOnly ? " (desktop only)" : ""}`
        : `${b.name} unsupported`,
    )
    .join(" · ");

  return [`**${baseline.label}.** ${baseline.description}`, "", support];
}

function buildPalette(): string[] {
  return [
    "| Family | Base |",
    "|--------|------|",
    ...COLOR_FAMILIES.map((f) => `| ${f.name} | \`${f.color}\` |`),
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

const EXPRESSIONS: Record<string, string> = {
  "COLOR_FAMILIES.length": String(COLOR_FAMILIES.length),
  "SHADE_LABELS.length": String(SHADE_LABELS.length),
};

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

/** The strings in an expression attribute, e.g. names={["margin", "margin-top"]}. */
function expressionStrings(node: Element, attrName: string): string[] {
  const attr = node.attributes.find(
    (x) => x.type === "mdxJsxAttribute" && x.name === attrName,
  );
  const value = attr?.value;
  if (!value || typeof value !== "object") return [];
  return [...value.value.matchAll(/"([^"]+)"/g)].map((m) => m[1] as string);
}

const titleCase = (name: string) =>
  name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

function component(
  node: Element,
  options: RenderOptions,
  source: string,
): RootContent[] {
  const name = node.name ?? "";
  const a = attrs(node);

  if (name === "Baseline") return a.path ? markdown(buildBaseline(a.path)) : [];
  if (name === "Palette") {
    // a post's own colors, or the current palette when it names none
    const data = node.attributes.find(
      (attr) => attr.type === "mdxJsxAttribute" && attr.name === "data",
    );
    const listed =
      data?.value && typeof data.value === "object"
        ? [
            ...data.value.value.matchAll(
              /name:\s*"([^"]+)",\s*color:\s*"([^"]+)"/g,
            ),
          ]
        : [];
    return markdown(
      listed.length
        ? [
            "| Color | Value |",
            "|-------|-------|",
            ...listed.map(([, n, c]) => `| ${n} | \`${c}\` |`),
          ]
        : buildPalette(),
    );
  }
  if (name === "BrandMarks" && a.product) {
    return markdown(
      brandFiles(a.product as BrandProduct).map(
        ({ label, base }) =>
          `- ${label}: [SVG](/brand/${base}.svg), [PNG](/brand/${base}.png)`,
      ),
    );
  }
  if (name === "BrandColors") {
    return markdown([
      "| Color | Value |",
      "|-------|-------|",
      ...BRAND_COLORS.map(({ name, hex }) => `| ${name} | \`${hex}\` |`),
    ]);
  }
  if (name === "Reference") {
    if (!a.category) return [];
    const names = a.name ? [a.name] : expressionStrings(node, "names");
    // the twin keeps every class, a table per property
    return markdown(
      names.flatMap((n, i) => [
        ...(names.length > 1
          ? [...(i ? [""] : []), `### ${titleCase(n)}`, ""]
          : []),
        ...buildReferenceTable(a.category as Category, n),
      ]),
    );
  }
  if (name === "Variants") {
    if (!a.category || !a.name) return [];
    const negative = node.attributes.some(
      (attr) => attr.type === "mdxJsxAttribute" && attr.name === "negative",
    );
    return markdown([
      variantsLead(a.category as Category, a.name),
      ...variantGroups(a.category as Category, a.name, negative).flatMap(
        (group) => [
          "",
          `### ${group.title}`,
          "",
          group.description,
          "",
          "| Class | Applies |",
          "|-------|---------|",
          ...group.lines.map(
            (line) => `| \`${line.className}\` | ${line.text} |`,
          ),
        ],
      ),
    ]);
  }

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
      const value = EXPRESSIONS[node.value.trim()];
      return value ? [{ type: "text", value }] : [];
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
  const source = fillNormalizeFences(content.replace(/\r\n/g, "\n"));
  const tree = mdx.parse(source) as Root;

  const children = convert(tree.children, options, source);

  return out.stringify({ type: "root", children }).trim();
}

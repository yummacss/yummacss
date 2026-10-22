export function parseRanges(meta, key) {
  const regex = new RegExp(`${key}=\\{([^}]+)\\}`);
  const match = typeof meta === "string" ? meta.match(regex) : null;
  if (!match) return new Set();

  const set = new Set();
  for (const part of match[1].split(",")) {
    const trimmed = part.trim();
    const range = trimmed.match(/^(\d+)-(\d+)$/);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      for (let i = start; i <= end; i++) set.add(i);
    } else if (/^\d+$/.test(trimmed)) {
      set.add(Number(trimmed));
    }
  }
  return set;
}

export function parseWords(meta, titleValue) {
  if (typeof meta !== "string") return [];
  const words = [];
  const regex = /"([^"]+)"/g;
  for (const m of meta.matchAll(regex)) {
    words.push(m[1]);
  }
  return titleValue ? words.filter((w) => w !== titleValue) : words;
}

function splitByWords(text, words) {
  const escaped = words
    .slice()
    .sort((a, b) => b.length - a.length)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "g");

  const parts = [];
  let lastIndex = 0;
  for (const match of text.matchAll(regex)) {
    if (match.index > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, match.index),
        highlighted: false,
      });
    }
    parts.push({ text: match[0], highlighted: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), highlighted: false });
  }
  return parts;
}

function highlightWordsInNode(node, words, classes) {
  if (!node.children) return;

  const newChildren = [];
  for (const child of node.children) {
    if (child.type === "text" && words.some((w) => child.value.includes(w))) {
      for (const part of splitByWords(child.value, words)) {
        if (part.highlighted) {
          newChildren.push({
            type: "element",
            tagName: "span",
            properties: { className: classes.split(" ") },
            children: [{ type: "text", value: part.text }],
          });
        } else {
          newChildren.push({ type: "text", value: part.text });
        }
      }
    } else if (child.type === "element") {
      highlightWordsInNode(child, words, classes);
      newChildren.push(child);
    } else {
      newChildren.push(child);
    }
  }
  node.children = newChildren;
}

const LINE_CLASSES = "d:b mx:-4 px:4";
// the pre is the box that scrolls and takes focus, outlined like Scroller
export const PRE_CLASSES =
  "ox:auto px:4 py:4 fv:oc:accent fv:os:s fv:ow:2 fv:oo:-2";
const WORD_CLASSES = "bg:accent-dim/10 bw:1 bc:accent-dim/50";

function foldRegions(codeEl, foldLines) {
  const children = codeEl.children ?? [];

  const lines = [];
  for (const child of children) {
    if (child.type === "element" && child.tagName === "span") {
      lines.push([child]);
    } else if (lines.length) {
      lines[lines.length - 1].push(child);
    }
  }
  if (!lines.length) return;

  const output = [];
  for (let i = 0; i < lines.length; i++) {
    if (!foldLines.has(i + 1)) {
      output.push(...lines[i]);
      continue;
    }

    const body = [];
    while (i < lines.length && foldLines.has(i + 1)) body.push(...lines[i++]);
    i--;

    output.push({
      type: "element",
      tagName: "details",
      properties: { className: ["d:i"], "data-fold": "" },
      children: [
        {
          type: "element",
          tagName: "summary",
          properties: {
            className: ["d:i", "c:p", "us:none", "c:white/40", "h:c:white"],
          },
          children: [{ type: "text", value: "..." }],
        },
        { type: "text", value: "\n" },
        ...body,
      ],
    });
  }

  codeEl.children = output;
}

export function decorateCodeHast(pre, meta, title) {
  pre.properties = {
    ...pre.properties,
    class: [pre.properties?.class, PRE_CLASSES].filter(Boolean).join(" "),
  };
  const codeEl = pre.children?.find((c) => c.tagName === "code");
  if (!codeEl) return pre;

  const markLines = parseRanges(meta, "mark");
  const delLines = parseRanges(meta, "del");
  const insLines = parseRanges(meta, "ins");
  const foldLines = parseRanges(meta, "fold");
  const words = parseWords(meta, title);
  const hasLineHighlight = markLines.size || delLines.size || insLines.size;

  if (hasLineHighlight) {
    codeEl.children = (codeEl.children ?? []).filter(
      (c) => !(c.type === "text" && c.value === "\n"),
    );

    const lines = codeEl.children.filter(
      (c) => c.type === "element" && c.tagName === "span",
    );

    lines.forEach((lineNode, index) => {
      const lineNum = index + 1;
      let extra = "";

      if (delLines.has(lineNum)) {
        extra = `${LINE_CLASSES} bg:diff-remove/10`;
      } else if (insLines.has(lineNum)) {
        extra = `${LINE_CLASSES} bg:diff-add/10`;
      } else if (markLines.has(lineNum)) {
        extra = `${LINE_CLASSES} bg:accent-dim/10`;
      } else {
        extra = "d:b";
      }

      if (!lineNode.properties) lineNode.properties = {};
      const props = lineNode.properties;

      const asList = (v) =>
        Array.isArray(v)
          ? v
          : typeof v === "string"
            ? v.split(/\s+/).filter(Boolean)
            : [];
      const existing = [...asList(props.class), ...asList(props.className)];
      delete props.class;
      props.className = [...existing, ...extra.split(" ")];

      if (
        !lineNode.children ||
        lineNode.children.every((c) => c.type === "text" && c.value === "")
      ) {
        lineNode.children = [
          { type: "element", tagName: "br", properties: {}, children: [] },
        ];
      }
    });
  }

  if (foldLines.size) foldRegions(codeEl, foldLines);

  if (words.length) {
    highlightWordsInNode(codeEl, words, WORD_CLASSES);
  }

  if (pre.properties?.style) {
    pre.properties.style = String(pre.properties.style)
      .replace(/background(-color)?:[^;]+;?/gi, "")
      .trim();
  }

  return pre;
}

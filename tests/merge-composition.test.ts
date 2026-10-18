import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { merge } from "yummacss/merge";
import { rootDir } from "./helpers";

const CLASSY = /^[@a-z0-9:%._\-/#]+$/i;

const EXPECTED_DROPS = [
  "context-menu.tsx: bg:field",
  "file-upload.tsx: bc:red-5",
  "file-upload.tsx: bc:rim",
  "file-upload.tsx: bg:transparent",
  "popover.tsx: bg:raised",
  "select.tsx: bg:raised",
  "preview-card.tsx: td:none",
  "alert-dialog.tsx: fv:bc:slate-6",
  "alert-dialog.tsx: fv:oc:slate-4/60",
  "button.tsx: fv:bc:slate-6",
  "button.tsx: fv:oc:slate-4/60",
  "dialog.tsx: fv:bc:slate-6",
  "dialog.tsx: fv:oc:slate-4/60",
  "field.tsx: fv:bc:slate-6",
  "field.tsx: fv:oc:slate-4/60",
  "file-upload.tsx: fv:oc:slate-4/60",
  "textarea.tsx: fv:bc:slate-6",
  "textarea.tsx: fv:oc:slate-4/60",
  "toast.tsx: fv:bc:slate-6",
  "toast.tsx: fv:oc:slate-4/60",
  "tooltip.tsx: fv:bc:slate-6",
  "tooltip.tsx: fv:oc:slate-4/60",
  "file-upload.tsx: fv:oo:0",
  "toolbar.tsx: bg:transparent",
  "toolbar.tsx: bw:0",
  "badge.tsx: bg:transparent",
  "badge.tsx: c:label",
  "rating.tsx: c:na",
];

function topLevel(source: string, char: string, from = 0): number {
  let depth = 0;
  let quote: string | null = null;

  for (let i = from; i < source.length; i++) {
    const c = source[i];
    if (quote) {
      if (c === "\\") i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") quote = c;
    else if ("([{".includes(c)) depth++;
    else if (")]}".includes(c)) depth--;
    else if (c === char && depth === 0) return i;
  }

  return -1;
}

function splitArgs(source: string): string[] {
  const out: string[] = [];
  let start = 0;

  for (;;) {
    const comma = topLevel(source, ",", start);
    if (comma < 0) break;
    out.push(source.slice(start, comma));
    start = comma + 1;
  }
  out.push(source.slice(start));

  return out.map((part) => part.trim()).filter(Boolean);
}

function constants(source: string): Map<string, string[]> {
  const table = new Map<string, string[]>();

  for (const match of source.matchAll(
    /\bconst\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=\s*/g,
  )) {
    const start = (match.index ?? 0) + match[0].length;
    const first = source[start];
    let body: string;
    const extra: string[] = [];

    if (first === '"' || first === "'") {
      body = source.slice(start, source.indexOf(first, start + 1) + 1);
    } else if (first === "{") {
      let depth = 0;
      let i = start;
      for (; i < source.length; i++) {
        if (source[i] === "{") depth++;
        else if (source[i] === "}" && --depth === 0) break;
      }
      body = source.slice(start, i + 1);
    } else {
      const end = topLevel(source, ";", start);
      body = source.slice(start, end < 0 ? source.length : end);
      for (const [, before, after] of body.matchAll(
        /\?\s*([A-Z][A-Z0-9_]*)\s*:\s*""|\?\s*""\s*:\s*([A-Z][A-Z0-9_]*)/g,
      )) {
        for (const value of table.get(before ?? after) ?? []) extra.push(value);
      }
    }

    const strings = [...body.matchAll(/"([^"\n]*)"|'([^'\n]*)'/g)]
      .map((s) => s[1] ?? s[2])
      .filter((s) => s === "" || s.split(/\s+/).every((t) => CLASSY.test(t)));

    const values = [...strings, ...extra];
    table.set(match[1], values.length > 0 ? values : [""]);
  }

  return table;
}

function resolve(
  expression: string,
  table: Map<string, string[]>,
  depth = 0,
): string[] {
  const expr = expression.trim();
  if (depth > 4) return [""];

  const literal = /^"([^"\n]*)"$|^'([^'\n]*)'$/.exec(expr);
  if (literal) return [literal[1] ?? literal[2]];

  const question = topLevel(expr, "?");
  const colon = question < 0 ? -1 : topLevel(expr, ":", question + 1);
  if (colon > -1) {
    return [
      ...resolve(expr.slice(question + 1, colon), table, depth + 1),
      ...resolve(expr.slice(colon + 1), table, depth + 1),
    ];
  }

  if (expr.startsWith("`") && expr.endsWith("`")) {
    let acc = [""];
    for (const part of expr.slice(1, -1).split(/(\$\{[^{}]*\})/)) {
      const values = part.startsWith("${")
        ? resolve(part.slice(2, -1), table, depth + 1)
        : [part];
      acc = acc.flatMap((a) => values.map((v) => a + v)).slice(0, 40);
    }
    return acc;
  }

  const name = /^([A-Za-z_$][\w$]*)/.exec(expr);
  const known = name ? table.get(name[1]) : undefined;

  return known && known.length > 0 ? known : [""];
}

function mergeCalls(source: string): string[][] {
  const calls: string[][] = [];
  let from = 0;

  for (;;) {
    const open = source.indexOf("merge(", from);
    if (open < 0) return calls;

    let depth = 0;
    let end = open + 5;
    for (; end < source.length; end++) {
      if (source[end] === "(") depth++;
      else if (source[end] === ")" && --depth === 0) break;
    }

    const args = splitArgs(source.slice(open + 6, end));
    if (args.length > 1) calls.push(args);
    from = end;
  }
}

describe("merge across a component's arguments", () => {
  const dir = join(rootDir, "src/registry/ui");
  const files = readdirSync(dir).filter((file) => file.endsWith(".tsx"));

  const dropped = new Set<string>();
  let combinations = 0;

  for (const file of files) {
    const source = readFileSync(join(dir, file), "utf8");
    const table = constants(source);

    for (const args of mergeCalls(source)) {
      let acc: string[][] = [[]];
      for (const arg of args) {
        const values = [...new Set(resolve(arg, table))];
        acc = acc.flatMap((parts) => values.map((v) => [...parts, v]));
        if (acc.length > 3000) {
          acc = acc.slice(0, 3000);
          break;
        }
      }

      for (const parts of acc) {
        combinations++;
        const kept = new Set(merge(...parts).split(/\s+/));
        for (const token of parts.join(" ").split(/\s+/).filter(Boolean)) {
          if (!kept.has(token)) dropped.add(`${file}: ${token}`);
        }
      }
    }
  }

  it("drops only the overrides that are meant to win", () => {
    expect([...dropped].sort()).toEqual([...EXPECTED_DROPS].sort());
  });

  it("has combinations to merge", () => {
    expect(combinations).toBeGreaterThan(1500);
  });
});

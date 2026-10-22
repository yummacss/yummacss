import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contentPages, rootDir } from "./helpers";

const allPages = contentPages().map(({ slug, source }) => ({
  page: `ui/${slug}.mdx`,
  source,
}));

function prose(source: string): string[] {
  const withoutFrontmatter = source.replace(/^---\n[\s\S]*?\n---/, (block) =>
    block.replace(/[^\n]/g, ""),
  );

  let inFence = false;

  return withoutFrontmatter.split("\n").map((line) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      return "";
    }

    if (inFence) return "";
    if (/^\s*\|/.test(line)) return "";

    return line.replace(/<[^>]*>/g, " ");
  });
}

function findAll(
  pages: { page: string; source: string }[],
  pattern: RegExp,
): string[] {
  const hits: string[] = [];

  for (const { page, source } of pages) {
    prose(source).forEach((line, index) => {
      const match = line.match(pattern);
      if (match) hits.push(`${page}:${index + 1}  ${match[0].trim()}`);
    });
  }

  return hits;
}

describe("copywriting", () => {
  it("uses no em dashes", () => {
    expect(findAll(allPages, /.{0,30}—.{0,30}/)).toEqual([]);
  });

  it("uses no spaced hyphen as a dash", () => {
    expect(findAll(allPages, /\w\s+-\s+(?!>)\w.{0,20}/)).toEqual([]);
  });

  it("spells `cannot` as one word", () => {
    expect(findAll(allPages, /\bcan not\b/)).toEqual([]);
  });

  it("uses US spelling", () => {
    expect(
      findAll(
        allPages,
        /\b\w*(?:behaviour|colour|recognis|normalis|centre)\w*/i,
      ),
    ).toEqual([]);
  });

  it("never mentions Tailwind", () => {
    expect(findAll(allPages, /\btailwind\b/i)).toEqual([]);
  });

  it("uses no first person", () => {
    expect(findAll(allPages, /\b(?:we|we're|our|ours)\b/i)).toEqual([]);
  });

  it("leaves no trailing whitespace", () => {
    const dirty: string[] = [];

    for (const { page, source } of allPages) {
      source.split("\n").forEach((line, index) => {
        if (/[ \t]+$/.test(line)) dirty.push(`${page}:${index + 1}`);
      });
    }

    expect(dirty).toEqual([]);
  });

  // page titles stay Title Case; a heading capitalizes its first word, page
  // titles, the word before "utilities", names & acronyms
  it("writes headings in sentence case", () => {
    const names = new Set(
      "Yumma Vite Next.js Oxlint ESLint Claude Code Solar React PostCSS Turbopack Webpack Graphite Tactile Base Linux Windows PowerShell".split(
        " ",
      ),
    );
    const titles = allPages
      .map(({ source }) => source.match(/^title:\s*"?(.+?)"?\s*$/m)?.[1])
      .filter((title): title is string => Boolean(title))
      .sort((a, b) => b.length - a.length);

    const wrong: string[] = [];

    for (const { page, source } of allPages) {
      source.split("\n").forEach((line, index) => {
        const text =
          line.match(/^#{1,6}\s+(.*)$/)?.[1] ??
          line.match(/^\s*<Step title="([^"]*)"/)?.[1] ??
          line.match(/^:::\w+\[([^\]]*)\]/)?.[1];
        if (!text) return;

        let rest = text.replace(/`[^`]*`/g, "~");
        for (const title of titles) rest = rest.split(title).join("~");

        const words = rest.split(/\s+/);
        words.forEach((word, position) => {
          if (position === 0 || !/^[A-Z]/.test(word)) return;
          const bare = word.replace(/[,:?!()]|\.$/g, "");
          if (names.has(bare) || /^[A-Z0-9]{2,}s?$/.test(bare)) return;
          if (/^.+[A-Z]/.test(bare) && !bare.includes("-")) return;
          if (/^utilit/i.test(words[position + 1] ?? "")) return;
          wrong.push(`${page}:${index + 1}  ${text}  ->  "${word}"`);
        });
      });
    }

    expect(wrong).toEqual([]);
  });

  // the description leads a page, so the body opens with a heading, a table or a hint
  it("opens every page with a heading, not a paragraph", () => {
    const bad = allPages.filter(({ source }) => {
      const body = source
        .replace(/^---\n[\s\S]*?\n---/, "")
        .replace(/```[\s\S]*?```/g, "")
        .replace(/<([A-Z]\w*)\b[\s\S]*?<\/\1>/g, "")
        .replace(/:::[\s\S]*?:::/g, "")
        .replace(/^(import|export) .*$/gm, "");
      const lead = body.split(/^#{2,} /m)[0] ?? "";
      return lead
        .split(/\n\s*\n/)
        .some((block) => /^[A-Za-z`*[>]/.test(block.trim()));
    });
    expect(bad.map(({ page }) => page)).toEqual([]);
  });

  it("keeps every paragraph under 30 words", () => {
    const long: string[] = [];
    for (const { page, source } of allPages) {
      for (const block of prose(source)
        .join("\n")
        .split(/\n\s*\n/)) {
        const text = block.trim();
        if (!text || /^(#|-|\d+\.|:::|import |export )/.test(text)) continue;
        const words = text.split(/\s+/).length;
        if (words > 30)
          long.push(`${page}  ${words} words: ${text.slice(0, 60)}`);
      }
    }
    expect(long).toEqual([]);
  });

  it("gives every page a one-sentence description", () => {
    const bad: string[] = [];

    for (const { page, source } of allPages) {
      const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1];
      const raw = frontmatter?.match(/^description:\s*(.+)$/m)?.[1];

      if (!raw) {
        bad.push(`${page}  missing description`);
        continue;
      }

      const text = raw.trim().replace(/^["']|["']$/g, "");

      if (!/[.!?]$/.test(text)) bad.push(`${page}  unpunctuated: ${text}`);
      if (text.length > 120) bad.push(`${page}  ${text.length} chars: ${text}`);
    }

    expect(bad).toEqual([]);
  });
});

describe("shipped copy", () => {
  const registryDir = join(rootDir, "src/registry/ui");
  const metaDir = join(rootDir, "src/registry/meta");

  const strings: { where: string; text: string }[] = [];

  for (const file of readdirSync(registryDir).filter((f) =>
    f.endsWith(".tsx"),
  )) {
    const source = readFileSync(join(registryDir, file), "utf8");
    for (const [, prop, text] of source.matchAll(
      /^\s+([a-zA-Z]+) = "([^"]{3,})",?$/gm,
    )) {
      strings.push({ where: `${file}:${prop}`, text });
    }
  }

  for (const file of readdirSync(metaDir).filter((f) => f.endsWith(".json"))) {
    const meta = JSON.parse(readFileSync(join(metaDir, file), "utf8"));
    if (meta.summary)
      strings.push({ where: `${file}:summary`, text: meta.summary });
    for (const prop of meta.props ?? []) {
      if (prop.description) {
        strings.push({ where: `${file}:${prop.name}`, text: prop.description });
      }
      if (typeof prop.default === "string" && prop.default.length > 2) {
        strings.push({
          where: `${file}:${prop.name} default`,
          text: prop.default,
        });
      }
    }
  }

  function offenders(pattern: RegExp): string[] {
    return strings.flatMap(({ where, text }) => {
      const match = text.replace(/`[^`]*`/g, "~").match(pattern);
      return match ? [`${where}  ->  "${match[0]}"`] : [];
    });
  }

  it("has copy to check", () => {
    expect(strings.length).toBeGreaterThan(400);
  });

  it("uses no em dashes", () => {
    expect(offenders(/.{0,30}—.{0,30}/)).toEqual([]);
  });

  it("uses no spaced hyphen as a dash", () => {
    expect(offenders(/\w\s+-\s+(?!>)\w.{0,20}/)).toEqual([]);
  });

  it("spells `cannot` as one word", () => {
    expect(offenders(/\bcan not\b/)).toEqual([]);
  });

  it("uses US spelling", () => {
    expect(
      offenders(/\b\w*(?:behaviour|colour|recognis|normalis|centre)\w*/i),
    ).toEqual([]);
  });

  it("never mentions Tailwind", () => {
    expect(offenders(/\btailwind\b/i)).toEqual([]);
  });

  it("calls the focus indicator an outline", () => {
    expect(offenders(/\brings?\b/i)).toEqual([]);
  });

  it("spells an ellipsis as one character", () => {
    expect(offenders(/\.{3}/)).toEqual([]);
  });
});

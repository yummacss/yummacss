import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contentPages, rootDir } from "./helpers";

const indexPath = join(rootDir, "src/registry/index.ts");

const registryIds = new Set(
  [
    ...readFileSync(indexPath, "utf-8").matchAll(
      /^\s*"([^"]+)":\s*\(\)\s*=>\s*import\(/gm,
    ),
  ].map((match) => match[1]),
);

const PLAYGROUND = /<ComponentPlayground\b/;

const uiPages = contentPages("ui");

const KNOWN_UNLISTED: string[] = [
  "autocomplete-grouped",
  "autocomplete-helper",
  "autocomplete-icon-leading",
  "autocomplete-icon-trailing",
  "avatar-icon-fallback",
  "avatar-initial-fallback",
  "avatar-stack-compact",
  "combobox-grouped",
  "combobox-helper",
  "field-prefix",
  "field-suffix",
  "select-grouped",
  "skeleton-activity",
  "skeleton-filters",
  "skeleton-list",
  "skeleton-stats",
];

function referencedIds(): Set<string> {
  const ids = new Set<string>();

  for (const { slug, source } of uiPages) {
    if (PLAYGROUND.test(source)) ids.add(slug);
  }

  return ids;
}

describe("Yumma UI content", () => {
  it("previews only components that exist", () => {
    const broken = uiPages
      .filter(
        ({ slug, source }) => PLAYGROUND.test(source) && !registryIds.has(slug),
      )
      .map(({ slug }) => `${slug}.mdx -> ${slug}`);

    expect(broken).toEqual([]);
  });

  it("has a title and description on every page", () => {
    const incomplete = uiPages
      .filter(({ source }) => {
        const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
        if (!frontmatter) return true;
        return (
          !/^title:\s*\S/m.test(frontmatter[1]) ||
          !/^description:\s*\S/m.test(frontmatter[1])
        );
      })
      .map(({ slug }) => slug);

    expect(incomplete).toEqual([]);
  });

  it("tracks which components are not previewed anywhere", () => {
    const referenced = referencedIds();
    const unlisted = [...registryIds]
      .filter((id) => !referenced.has(id))
      .sort();

    expect(
      unlisted,
      "a component became orphaned or was wired up - update KNOWN_UNLISTED",
    ).toEqual(KNOWN_UNLISTED);
  });

  it("finds at least one preview", () => {
    expect(referencedIds().size).toBeGreaterThan(0);
  });

  it("flags a playground page in its own frontmatter", () => {
    const mismatched = uiPages
      .filter(({ source }) => {
        const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
        const flagged = /^playground:\s*true\s*$/m.test(frontmatter?.[1] ?? "");
        return flagged !== PLAYGROUND.test(source);
      })
      .map(({ slug }) => slug);

    expect(mismatched).toEqual([]);
  });

  it("puts a playground only where a schema backs it", () => {
    const unbacked = uiPages
      .filter(({ source }) => PLAYGROUND.test(source))
      .filter(({ slug }) => !registryIds.has(slug))
      .map(({ slug }) => slug);

    expect(unbacked).toEqual([]);
  });
});

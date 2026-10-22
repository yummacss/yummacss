import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { GUIDES } from "../src/config/sidebar";
import { targetPath } from "../src/utils/install.mjs";
import { mdxToMarkdown } from "../src/utils/mdx-markdown";
import { contentPages, rootDir } from "./helpers";

const resolveRegistry = (id: string) => {
  try {
    return readFileSync(join(rootDir, "src/registry/ui", `${id}.tsx`), "utf-8");
  } catch {
    return null;
  }
};

const resolveMeta = (id: string) => {
  try {
    return JSON.parse(
      readFileSync(join(rootDir, "src/registry/meta", `${id}.json`), "utf-8"),
    );
  } catch {
    return null;
  }
};

describe("Markdown routes", () => {
  const FLOOR = 400;

  it("renders a body for every guide", () => {
    const thin = contentPages()
      .filter(({ slug }) => GUIDES.includes(slug))
      .map(({ slug, source }) => ({
        slug,
        size: mdxToMarkdown(source).length,
      }))
      .filter(({ size }) => size < FLOOR);

    expect(thin).toEqual([]);
  });

  it("leaves no empty code fence in any page", () => {
    const empty = contentPages()
      .map(({ slug, source }) => ({
        slug,
        fences: (
          mdxToMarkdown(source, {
            resolveRegistry,
            resolveMeta,
            registryId: slug,
          }).match(/```[^\n]*\n```/g) ?? []
        ).length,
      }))
      .filter(({ fences }) => fences > 0);

    expect(empty).toEqual([]);
  });

  it("leaves no unrendered MDX in any page", () => {
    const leaking = contentPages()
      .map(({ slug, source }) => ({
        slug,
        body: mdxToMarkdown(source, {
          resolveRegistry,
          resolveMeta,
          registryId: slug,
        }),
      }))
      .map(({ slug, body }) => ({
        slug,
        bad: body
          .split(/```[\s\S]*?```/)
          .join("")
          .match(/^import\s.*\sfrom\s|\{[A-Z_][A-Za-z_.]*\}/m),
      }))
      .filter(({ bad }) => bad)
      .map(({ slug, bad }) => `${slug}: ${bad?.[0]}`);

    expect(leaking).toEqual([]);
  });

  it("renders named source and an API table for every UI component page", () => {
    const broken = contentPages()
      .filter(({ source }) => source.includes("<ComponentPlayground"))
      .map(({ slug, source }) => {
        const body = mdxToMarkdown(source, {
          resolveRegistry,
          resolveMeta,
          registryId: slug,
        });
        return {
          slug,
          fenced: body.includes("```"),
          named: body.includes(`\`\`\`tsx title="${targetPath(slug)}"`),
          api: body.includes("| Prop | Type | Default | Description |"),
        };
      })
      .filter(({ fenced, named, api }) => !fenced || !named || !api);

    expect(broken).toEqual([]);
  });
});

import { describe, expect, it } from "vitest";
import { mdxToMarkdown } from "../src/utils/mdx-markdown";
import { contentPages } from "./helpers";

describe("Markdown routes", () => {
  const FLOOR = 400;

  it("renders a body for every docs page", () => {
    const thin = contentPages("docs")
      .map(({ slug, source }) => ({
        slug,
        size: mdxToMarkdown(source).length,
      }))
      .filter(({ size }) => size < FLOOR);

    expect(thin).toEqual([]);
  });

  it("leaves no empty code fence in any page", () => {
    const empty = contentPages("docs")
      .map(({ slug, source }) => ({
        slug,
        fences: (mdxToMarkdown(source).match(/```[^\n]*\n```/g) ?? []).length,
      }))
      .filter(({ fences }) => fences > 0);

    expect(empty).toEqual([]);
  });

  it("renders browser support wherever the page shows it", () => {
    const missing = contentPages("docs")
      .filter(({ source }) => source.includes("<Baseline"))
      .map(({ slug, source }) => ({ slug, body: mdxToMarkdown(source) }))
      .filter(
        ({ body }) =>
          !/(Widely|Newly) available|Limited availability/.test(body),
      )
      .map(({ slug }) => slug);

    expect(missing).toEqual([]);
  });

  it("leaves no unrendered MDX in any page", () => {
    const leaking = contentPages("docs")
      .map(({ slug, source }) => ({
        slug,
        body: mdxToMarkdown(source),
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
});

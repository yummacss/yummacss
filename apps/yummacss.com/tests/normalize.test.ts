import { describe, expect, it } from "vitest";
import { mdxToMarkdown } from "../src/utils/mdx-markdown";
import {
  normalizeSelectors,
  parseSelectors,
  rulesFor,
} from "../src/utils/normalize-rules.mjs";
import { contentPages } from "./helpers";

const page = () => {
  const found = contentPages("docs").find(({ slug }) => slug === "normalize");
  if (!found) throw new Error("normalize.mdx is missing");
  return found.source;
};

const namedSelectors = (source: string) =>
  [...source.matchAll(/```css normalize="([^"]+)"/g)].flatMap(([, attr]) =>
    parseSelectors(attr),
  );

describe("Normalize page", () => {
  it("names every rule the shipped reset defines", () => {
    const named = new Set(namedSelectors(page()));
    const undocumented = normalizeSelectors().filter((s) => !named.has(s));

    expect(undocumented).toEqual([]);
  });

  it("carries every rule it names into the .md twin", () => {
    const source = page();
    const markdown = mdxToMarkdown(source);
    const missing = namedSelectors(source).filter(
      (selector) => !markdown.includes(rulesFor([selector])),
    );

    expect(missing).toEqual([]);
  });

  it("rejects a selector the reset does not define", () => {
    expect(() => rulesFor(["marquee"])).toThrow(/no such rule/);
  });
});

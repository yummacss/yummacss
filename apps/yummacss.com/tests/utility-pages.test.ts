import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { utilityPages } from "../src/utils/utility-pages.mjs";
import { categoryGetters } from "../src/utils/yummacss";
import { rootDir } from "./helpers";

describe("utility pages", () => {
  it("keeps a slug to one page, a row or a file", () => {
    const slugs = [
      ...utilityPages.map((page) => page.slug),
      ...readdirSync(join(rootDir, "src/content/docs"))
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, "")),
    ];
    expect(slugs.filter((slug, i) => slugs.indexOf(slug) !== i)).toEqual([]);
  });

  it("files each row under a category core has", () => {
    expect(
      utilityPages
        .map((page) => page.category)
        .filter((category) => !(category in categoryGetters)),
    ).toEqual([]);
  });
});

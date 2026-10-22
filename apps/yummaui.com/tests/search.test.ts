import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { extractReference } from "@/utils/search-reference";

const page = (path: string) => readFileSync(`src/content/${path}.mdx`, "utf8");

describe("search reference", () => {
  it("finds the CLI's flags under the section that documents them", () => {
    const entries = extractReference(page("ui/configuration"));
    expect(entries).toContainEqual({
      title: "-a, --all",
      description: "Add every component · yummaui add",
      anchor: "adding-components",
    });
    expect(entries).toContainEqual({
      title: "componentsDir",
      description:
        "Where components are written, relative to the project root · yummaui.json",
      anchor: "configuration-file",
    });
  });
});

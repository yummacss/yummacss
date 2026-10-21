import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ROLES } from "../src/utils/roles.mjs";
import config from "../yumma.config.mjs";
import { rootDir } from "./helpers";

// the colors the Yumma UI installation page tells people to add
function installed(): Record<string, { light: string; dark: string }> {
  const page = readFileSync(
    join(rootDir, "src/content/ui/installation.mdx"),
    "utf8",
  );
  const block = page.match(/colors: \{\n([\s\S]*?)\n\s*\},\n\s*\},/)?.[1] ?? "";
  return Object.fromEntries(
    [
      ...block.matchAll(
        /^\s*"?([a-z][a-z-]*)"?: \{ light: "([^"]+)", dark: "([^"]+)" \},$/gm,
      ),
    ].map(([, name, light, dark]) => [name, { light, dark }]),
  );
}

describe("role colors", () => {
  it("documents every role, light and dark, as the module defines it", () => {
    expect(installed()).toEqual(ROLES);
  });

  it("reaches the site config untouched by the site's own colors", () => {
    for (const [name, value] of Object.entries(ROLES))
      expect(config.theme?.colors?.[name]).toEqual(value);
  });
});

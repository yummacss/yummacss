import { readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { type Config, validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";
import { extractClasses } from "../scripts/extract-classes.mjs";
import { rootDir, tsxFilesIn } from "./helpers";

const config = (await import("../yumma.config.mjs")).default as Config;

const siteFiles = [
  ...tsxFilesIn(join(rootDir, "src/app")),
  ...tsxFilesIn(join(rootDir, "src/components")),
  join(rootDir, "src/mdx-components.tsx"),
];

// a class the site's own stylesheet defines
const ALLOWED = new Set(["footer-version"]);

function invalidIn(
  files: string[],
  read: (source: string) => Set<string>,
): string[] {
  const owners = new Map<string, string>();
  for (const file of files) {
    for (const className of read(readFileSync(file, "utf-8"))) {
      if (!ALLOWED.has(className)) {
        owners.set(className, relative(rootDir, file));
      }
    }
  }

  return validateClasses(owners.keys(), config).invalid.map(
    (c) => `${c} (${owners.get(c)})`,
  );
}

describe("Yumma CSS classes", () => {
  it("are all classes Yumma CSS generates", () => {
    expect(invalidIn(siteFiles, extractClasses)).toEqual([]);
  });
});

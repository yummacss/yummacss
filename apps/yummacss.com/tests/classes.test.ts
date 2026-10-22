import { readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { type Config, validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";
import { extractClasses } from "../scripts/extract-classes.mjs";
import { ROLES } from "../src/utils/roles.mjs";
import { rootDir, tsxFilesIn } from "./helpers";

const config = (await import("../yumma.config.mjs")).default as Config;

const registryDir = join(rootDir, "src/registry");
const registryFiles = tsxFilesIn(registryDir);
const siteFiles = [
  ...tsxFilesIn(join(rootDir, "src/app")),
  ...tsxFilesIn(join(rootDir, "src/components")),
  join(rootDir, "src/mdx-components.tsx"),
];

// a class the site's own stylesheet defines
const ALLOWED = new Set(["footer-version"]);

// the roles travel with the components: the CLI writes them into the config
const docsOnlyColors = Object.keys(config.theme?.colors ?? {}).filter(
  (color) => color !== "percentage" && !(color in ROLES),
);

function bare(className: string): string {
  return className
    .replace(/^@[a-z]+:/, "")
    .replace(/^[a-z]+::/, "")
    .replace(/^[a-z]+:/, "")
    .replace(/\/\d+$/, "");
}

function usesDocsOnlyColor(className: string): boolean {
  const stripped = bare(className);

  return docsOnlyColors.some(
    (color) =>
      stripped === color ||
      stripped.endsWith(`-${color}`) ||
      stripped.includes(`-${color}/`),
  );
}

const CLASS_LIKE = /^[a-z@][a-z0-9@:/%.-]*$/i;
const isClassLike = (token: string) =>
  CLASS_LIKE.test(token) && /[-:]/.test(token);

// classes outside a className attribute: in a class list string, and in a
// component's class maps (`const SIZES = { sm: "..." }`)
function literalClasses(source: string): Set<string> {
  const found = new Set<string>();
  for (const [, literal = ""] of source.matchAll(/"([^"\n]*)"/g)) {
    const tokens = literal.trim().split(/\s+/);
    if (tokens.length > 1 && tokens.every(isClassLike)) {
      for (const token of tokens) found.add(token);
    }
  }
  for (const match of source.matchAll(/const\s+[A-Z][A-Z0-9_]*[^=]*=\s*/g)) {
    const start = (match.index ?? 0) + match[0].length;
    let end = source.indexOf(";", start);
    if (source[start] === "{") {
      let depth = 0;
      for (end = start; end < source.length; end++) {
        if (source[end] === "{") depth++;
        else if (source[end] === "}" && --depth === 0) break;
      }
    }
    // a quoted object key, like "inline-end":, is not a class
    for (const [, open, literal = "", colon] of source
      .slice(start, end + 1)
      .matchAll(/([{,]\s*)?"([^"\n]*)"(\s*:)?/g)) {
      if (open && colon) continue;
      for (const token of literal.split(/\s+/)) {
        if (isClassLike(token)) found.add(token);
      }
    }
  }
  return found;
}

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
  it("are all classes Yumma CSS generates, in the registry and the site", () => {
    expect(invalidIn([...registryFiles, ...siteFiles], extractClasses)).toEqual(
      [],
    );
  });

  it("are all valid outside className in the registry", () => {
    expect(invalidIn(registryFiles, literalClasses)).toEqual([]);
  });

  it("in the registry do not depend on docs-only theme colors", () => {
    const offenders: string[] = [];

    for (const file of registryFiles) {
      for (const className of extractClasses(readFileSync(file, "utf-8"))) {
        if (usesDocsOnlyColor(className)) {
          offenders.push(`${className} (${relative(rootDir, file)})`);
        }
      }
    }

    expect(
      offenders,
      "registry components must use built-in Yumma CSS colors so they survive a paste",
    ).toEqual([]);
  });

  it("know which colors are docs-only", () => {
    expect(docsOnlyColors.length).toBeGreaterThan(0);
  });
});

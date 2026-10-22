import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { rootDir } from "./helpers";

const DIRECT = /from\s+["']@phosphor-icons\/react/;

function sources(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) out.push(...sources(path));
    else if (/\.tsx?$/.test(entry)) out.push(path);
  }
  return out;
}

describe("icons", () => {
  const src = join(rootDir, "src");
  const module = join(src, "icons.tsx");
  const site = sources(src).filter((file) => file !== module);

  it("routes every site import through the module", () => {
    const direct = site
      .filter((file) => DIRECT.test(readFileSync(file, "utf8")))
      .map((file) => relative(rootDir, file));

    expect(direct).toEqual([]);
  });

  it("re-exports every icon the site asks for", () => {
    const exported = new Set(
      readFileSync(module, "utf8").matchAll(
        /^export const ([A-Z][A-Za-z0-9]*) = (?:duotone|regular)\(/gm,
      ),
    );
    const names = new Set([...exported].map((match) => match[1]));

    const wanted = new Set<string>();
    for (const file of site) {
      const source = readFileSync(file, "utf8");
      for (const [, block] of source.matchAll(
        /import\s*\{([^}]*)\}\s*from\s*["']@\/icons["']/g,
      )) {
        for (const name of block.split(",")) {
          const trimmed = name.trim();
          if (trimmed) wanted.add(trimmed);
        }
      }
    }

    expect([...wanted].filter((name) => !names.has(name))).toEqual([]);
    expect(wanted.size).toBeGreaterThan(10);
  });
});

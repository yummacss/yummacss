import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { merge } from "yummacss/merge";
import { rootDir } from "./helpers";

const CLASS_STRING = /"([^"\n]{3,200})"|'([^'\n]{3,200})'|`([^`\n$]{3,200})`/g;

function classStrings(source: string): string[] {
  const found: string[] = [];

  for (const match of source.matchAll(CLASS_STRING)) {
    const raw = (match[1] ?? match[2] ?? match[3]).trim();
    const parts = raw.split(/\s+/);
    if (parts.length < 2) continue;
    if (!parts.every((part) => /^[@a-z0-9:%._\-/#]+$/i.test(part))) continue;
    found.push(raw);
  }

  return found;
}

describe("merge against the registry", () => {
  const dir = join(rootDir, "src/registry/ui");
  const files = readdirSync(dir).filter((file) => file.endsWith(".tsx"));

  it("drops nothing from a component's own classes", () => {
    const losses = files.flatMap((file) =>
      classStrings(readFileSync(join(dir, file), "utf8"))
        .map((raw) => ({ file, raw, merged: merge(raw) }))
        .filter(({ raw, merged }) => merged !== raw),
    );

    expect(losses).toEqual([]);
  });

  it("merges the className every component accepts", () => {
    const unmerged = files.filter((file) => {
      const source = readFileSync(join(dir, file), "utf8");
      return source.includes("className?") && !source.includes("merge(");
    });

    expect(unmerged).toEqual([]);
  });

  it("finds class strings to check", () => {
    const count = files.reduce(
      (n, file) =>
        n + classStrings(readFileSync(join(dir, file), "utf8")).length,
      0,
    );

    expect(count).toBeGreaterThan(600);
  });
});

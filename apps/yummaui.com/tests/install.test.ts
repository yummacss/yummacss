import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { addCommand, importPath, targetPath } from "../src/utils/install.mjs";
import { rootDir } from "./helpers";

const SOURCE = /\.(ts|tsx|mjs)$/;
const OWNER = join(rootDir, "src/utils/install.mjs");

const RETYPED = [/components\/ui\/\$\{/, /yummaui add \$\{/];

function sourceFilesIn(dir: string): string[] {
  const out: string[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...sourceFilesIn(full));
    else if (SOURCE.test(entry.name)) out.push(full);
  }

  return out;
}

describe("install paths", () => {
  it("spells what `yummaui init` defaults to", () => {
    expect(targetPath("button")).toBe("components/ui/button.tsx");
    expect(importPath("button")).toBe("@/components/ui/button");
    expect(addCommand("button")).toBe("yummaui add button");
    expect(addCommand("button", "--style compact")).toBe(
      "yummaui add button --style compact",
    );
  });

  it("is the only file that builds them", () => {
    const offenders: string[] = [];

    for (const file of [
      ...sourceFilesIn(join(rootDir, "src")),
      ...sourceFilesIn(join(rootDir, "scripts")),
    ]) {
      if (file === OWNER) continue;
      const source = readFileSync(file, "utf8");
      if (RETYPED.some((pattern) => pattern.test(source))) {
        offenders.push(file.slice(rootDir.length + 1));
      }
    }

    expect(offenders).toEqual([]);
  });
});

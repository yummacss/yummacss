import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");

export function tsxFilesIn(dir: string): string[] {
  const out: string[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...tsxFilesIn(full));
    } else if (entry.name.endsWith(".tsx")) {
      out.push(full);
    }
  }

  return out;
}

/** Every page, as its slug and source. */
export function contentPages() {
  const dir = join(rootDir, "src/content/ui");

  return readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
      source: readFileSync(join(dir, file), "utf-8").replace(/\r\n/g, "\n"),
    }));
}

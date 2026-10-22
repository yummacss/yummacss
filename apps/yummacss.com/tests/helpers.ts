import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { utilityPages, utilitySource } from "../src/utils/utility-pages.mjs";

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

/** Every page in a collection, the docs' utility pages included as their MDX. */
export function contentPages(collection: string) {
  const dir = join(rootDir, "src/content", collection);

  const files = readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
      source: readFileSync(join(dir, file), "utf-8").replace(/\r\n/g, "\n"),
    }));
  if (collection !== "docs") return files;

  return [
    ...files,
    ...utilityPages.map((page) => ({
      slug: page.slug,
      source: utilitySource(page),
    })),
  ];
}

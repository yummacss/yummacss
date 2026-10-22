import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { sidebarConfig } from "../src/config/sidebar.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = "src/content/ui";

const pages = readdirSync(join(root, dir))
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => file.replace(/\.mdx$/, ""));
const slugs = sidebarConfig.flatMap((section) => section.items);
const listed = new Set(slugs);

const problems = [];

for (const page of pages) {
  if (!listed.has(page)) {
    problems.push(`"${page}" exists in ${dir} but is not in the sidebar.`);
  }
}

for (const slug of slugs) {
  if (!pages.includes(slug)) {
    problems.push(`sidebar lists "${slug}" but no page has that slug.`);
  }
}

const seen = new Set();
for (const slug of slugs) {
  if (seen.has(slug)) {
    problems.push(`"${slug}" appears in the sidebar more than once.`);
  }
  seen.add(slug);
}

if (problems.length > 0) {
  console.error("Sidebar check failed:\n");
  for (const problem of problems) console.error(`  ${problem}`);
  console.error(
    "\nEvery page must appear in src/config/sidebar.ts exactly once.",
  );
  process.exit(1);
}

console.log(`Sidebar check passed: ${slugs.length} pages listed exactly once.`);

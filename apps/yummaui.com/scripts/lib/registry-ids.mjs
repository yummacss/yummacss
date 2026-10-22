import { readdirSync } from "node:fs";
import { basename } from "node:path";

export function componentSlugs(contentDir) {
  return readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => basename(file, ".mdx"))
    .sort((a, b) => b.length - a.length);
}

export function splitId(id, slugs) {
  const slug = slugs.find((s) => id === s || id.startsWith(`${s}-`));
  if (!slug) return { component: id, variant: "base", orphan: true };
  return {
    component: slug,
    variant: id === slug ? "base" : id.slice(slug.length + 1),
    orphan: false,
  };
}

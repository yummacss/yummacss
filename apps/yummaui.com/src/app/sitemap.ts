import { statSync } from "node:fs";
import { allUis } from "content-collections";
import type { MetadataRoute } from "next";
import { pagePath, UI_ORIGIN } from "@/utils/hosts";

export default function sitemap(): MetadataRoute.Sitemap {
  return allUis.map((ui) => ({
    url: `${UI_ORIGIN}${pagePath(ui._meta.path)}`,
    lastModified: statSync(`src/content/ui/${ui._meta.path}.mdx`).mtime,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
}

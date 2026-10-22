import { statSync } from "node:fs";
import { allUis } from "content-collections";
import type { MetadataRoute } from "next";
import { docs } from "@/utils/docs";
import { UI_ORIGIN } from "@/utils/hosts";

function getFileDate(slug: string, collection: string): Date {
  try {
    return statSync(`src/content/${collection}/${slug}.mdx`).mtime;
  } catch {
    // a utility page has no file of its own, so it dates from the table
    return collection === "docs"
      ? statSync("src/utils/utility-pages.mjs").mtime
      : new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yummacss.com";

  const docUrls = docs.map((doc) => ({
    url: `${baseUrl}/docs/${doc._meta.path}`,
    lastModified: getFileDate(doc._meta.path, "docs"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const uiUrls = allUis
    .filter((ui) => ui._meta.path !== "components")
    .map((ui) => ({
      url: `${UI_ORIGIN}/components/${ui._meta.path}`,
      lastModified: getFileDate(ui._meta.path, "ui"),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...docUrls, ...uiUrls];
}

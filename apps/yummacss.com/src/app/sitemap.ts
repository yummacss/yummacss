import { statSync } from "node:fs";
import type { MetadataRoute } from "next";
import { docs } from "@/utils/docs";

function getFileDate(slug: string): Date {
	try {
		return statSync(`src/content/docs/${slug}.mdx`).mtime;
	} catch {
		// a utility page has no file of its own, so it dates from the table
		return statSync("src/utils/utility-pages.mjs").mtime;
	}
}

export default function sitemap(): MetadataRoute.Sitemap {
	return docs.map((doc) => ({
		url: `https://yummacss.com/docs/${doc._meta.path}`,
		lastModified: getFileDate(doc._meta.path),
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));
}

import { extractProperties } from "@/utils/doc-properties";
import { docs } from "@/utils/docs";
import type { SearchIndex } from "@/utils/search-data";

export const dynamic = "force-static";

export function GET() {
	const index: SearchIndex = {
		docs: docs.map((doc) => ({
			title: doc.title,
			description: doc.description,
			path: `/docs/${doc._meta.path}`,
			category: "docs",
		})),
		properties: docs.flatMap((doc) =>
			extractProperties(doc.content ?? "")
				.filter((p) => p.name !== doc.slug)
				.map((p) => ({
					title: p.title,
					description: p.name,
					path: `/docs/${doc.slug}#${p.anchor}`,
					category: "docs",
				})),
		),
		reference: docs
			.map((doc) => ({ doc, base: `/docs/${doc._meta.path}` }))
			.flatMap(({ doc, base }) =>
				doc.reference.map((entry) => ({
					title: entry.title,
					description: entry.description.includes(" · ")
						? entry.description
						: `${entry.description} · ${doc.title}`,
					path: entry.anchor ? `${base}#${entry.anchor}` : base,
					category: "reference" as const,
				})),
			),
	};

	return Response.json(index);
}

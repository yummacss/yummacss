import { allDocs } from "content-collections";
import UtilityPage from "@/components/utility-page";
import { extractReference } from "@/utils/search-reference";
import { utilityBody, utilityPages } from "@/utils/utility-pages.mjs";

/** Every docs page: the MDX files, then the utility pages the table renders. */
export const docs = [
	...allDocs,
	...utilityPages.map((page) => {
		const content = utilityBody(page);
		return {
			title: page.title,
			description: page.description,
			content,
			slug: page.slug,
			_meta: { path: page.slug },
			mdx: () => UtilityPage({ page }),
			wordCount: content.split(/\s+/).length,
			reference: extractReference(content),
		};
	}),
];

export type Doc = (typeof docs)[number];

import { docs } from "@/utils/docs";
import { mdxToMarkdown } from "@/utils/mdx-markdown";

export const dynamic = "force-dynamic";

function renderDocMarkdown(doc: {
	title: string;
	description?: string;
	content?: string;
}): string {
	const body = mdxToMarkdown(doc.content ?? "");

	const lines = [`# ${doc.title}`, ""];
	if (doc.description) lines.push(doc.description, "");
	if (body) lines.push(body);

	return lines.join("\n");
}

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;
	const doc = docs.find((d) => d._meta.path === slug);

	if (!doc) {
		return new Response("Not found", { status: 404 });
	}

	const markdown = renderDocMarkdown(doc);

	return new Response(markdown, {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
			"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	});
}

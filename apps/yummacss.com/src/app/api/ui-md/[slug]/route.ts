import { allUis } from "content-collections";
import { mdxToMarkdown } from "@/utils/mdx-markdown";
import {
  resolveRegistryMeta,
  resolveRegistrySource,
} from "@/utils/registry-source";

export const dynamic = "force-dynamic";

function renderUiMarkdown(
  ui: { title: string; description?: string; content?: string },
  slug: string,
): string {
  const body = mdxToMarkdown(ui.content ?? "", {
    resolveRegistry: resolveRegistrySource,
    resolveMeta: resolveRegistryMeta,
    registryId: slug,
  });

  const lines = [`# ${ui.title}`, ""];
  if (ui.description) lines.push(ui.description, "");
  if (body) lines.push(body);

  return lines.join("\n");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const ui =
    slug === "components"
      ? undefined
      : allUis.find((u) => u._meta.path === slug);

  if (!ui) {
    return new Response("Not found", { status: 404 });
  }

  const markdown = renderUiMarkdown(ui, slug);

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

import { existsSync } from "node:fs";
import { join } from "node:path";
import { allUis } from "content-collections";
import { pagePath } from "@/utils/hosts";
import type { SearchIndex } from "@/utils/search-data";

export const dynamic = "force-static";

export function GET() {
  const index: SearchIndex = {
    pages: allUis.map((ui) => ({
      title: ui.title,
      description: ui.description,
      path: pagePath(ui._meta.path),
      category: "pages",
      // the link preview's screenshot, scripts/og-components.mjs
      preview: existsSync(
        join(process.cwd(), `public/og/ui/${ui._meta.path}.png`),
      )
        ? `/og/ui/${ui._meta.path}.png`
        : undefined,
    })),
    // one row per component that has the prop, matched on the name alone so that
    // typing a component's name does not list every prop it has
    props: allUis.flatMap((ui) =>
      ui.props.map((name) => ({
        title: name,
        description: ui.title,
        path: pagePath(ui._meta.path),
        category: "props" as const,
        terms: name,
      })),
    ),
    reference: allUis.flatMap((doc) =>
      doc.reference.map((entry) => {
        const base = pagePath(doc._meta.path);
        return {
          title: entry.title,
          description: entry.description.includes(" · ")
            ? entry.description
            : `${entry.description} · ${doc.title}`,
          path: entry.anchor ? `${base}#${entry.anchor}` : base,
          category: "reference" as const,
        };
      }),
    ),
  };

  return Response.json(index);
}

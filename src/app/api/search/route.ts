import { existsSync } from "node:fs";
import { join } from "node:path";
import { allUis } from "content-collections";
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
    components: allUis.map((ui) => ({
      title: ui.title,
      description: ui.description,
      path: `/components/${ui._meta.path}`,
      category: "ui-components",
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
        path: `/components/${ui._meta.path}`,
        category: "props" as const,
        terms: name,
      })),
    ),
    reference: [
      ...docs.map((doc) => ({ doc, base: `/docs/${doc._meta.path}` })),
      ...allUis.map((doc) => ({
        doc,
        base: `/components/${doc._meta.path}`,
      })),
    ].flatMap(({ doc, base }) =>
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

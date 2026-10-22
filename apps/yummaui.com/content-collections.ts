import { existsSync, readFileSync } from "node:fs";
import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from "@content-collections/core";
import type { ComponentType } from "react";
import { z } from "zod";
import { extractReference } from "./src/utils/search-reference";
import { badgeFor } from "./src/utils/since";

// prop names only, so search carries a short list rather than the whole meta
const propsOf = (id: string): string[] => {
  const file = `src/registry/meta/${id}.json`;
  if (!existsSync(file)) return [];
  const meta = JSON.parse(readFileSync(file, "utf8"));
  return (meta.props ?? []).map((prop: { name: string }) => prop.name);
};

const ui = defineCollection({
  name: "ui",
  directory: "src/content/ui",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    primitive: z.union([z.boolean(), z.string()]).optional(),
    since: z.string().optional(),
    added: z.string().optional(),
    playground: z.boolean().optional(),
    content: z.string().optional(),
  }),
  transform: (doc) => ({
    ...doc,
    mdx: createDefaultImport<ComponentType>(
      `@/content/ui/${doc._meta.path}.mdx`,
    ),
    slug: doc._meta.path,
    wordCount: doc.content?.split(/\s+/).length ?? 0,
    badge: badgeFor(doc),
    reference: extractReference(doc.content ?? ""),
    props: propsOf(doc._meta.path),
  }),
});

export default defineConfig({
  content: [ui],
  hooks: {
    // the collections import every page's MDX, so a client import must fail the build (the notes, "Menu bundle")
    writer: [
      ({ fileType, content }) => ({
        content:
          fileType === "javascript"
            ? content.replace("\n\n", '\n\nimport "server-only";\n')
            : content,
      }),
    ],
  },
});

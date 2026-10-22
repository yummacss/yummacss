import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from "@content-collections/core";
import type { ComponentType } from "react";
import { z } from "zod";
import {
  extractConfigKeys,
  extractReference,
} from "./src/utils/search-reference";
import { badgeFor } from "./src/utils/since";

const docs = defineCollection({
  name: "docs",
  directory: "src/content/docs",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    since: z.string().optional(),
    content: z.string().optional(),
  }),
  transform: (doc) => ({
    ...doc,
    mdx: createDefaultImport<ComponentType>(
      `@/content/docs/${doc._meta.path}.mdx`,
    ),
    slug: doc._meta.path,
    wordCount: doc.content?.split(/\s+/).length ?? 0,
    // worked out here so the client gets a string, not the version lookup behind it
    badge: badgeFor(doc),
    reference: [
      ...extractReference(doc.content ?? ""),
      ...(doc._meta.path === "configuration"
        ? extractConfigKeys(doc.content ?? "")
        : []),
    ],
  }),
});

export default defineConfig({
  content: [docs],
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

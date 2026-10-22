import { getRegistryTarget } from "@/registry";

/** Each component page's `primitive` frontmatter, by slug, so the client gets these and not the collection. */
export type Primitives = Record<string, boolean | string>;

export function primitiveSlug(
  primitives: Primitives,
  slug: string,
  installId?: string,
) {
  const primitive = primitives[slug];
  if (!primitive) return null;

  return typeof primitive === "string"
    ? primitive
    : getRegistryTarget(installId ?? slug).component;
}

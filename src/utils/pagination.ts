import { allUis } from "content-collections";
import { docs } from "@/utils/docs";
import { getAllSlugs, getAllUISlugs } from "@/utils/sidebar";

function inSidebarOrder<T extends { _meta: { path: string }; title: string }>(
  docs: T[],
  slugs: string[],
): T[] {
  const byPath = new Map(docs.map((doc) => [doc._meta.path, doc]));
  return slugs
    .map((slug) => byPath.get(slug))
    .filter((doc): doc is T => doc !== undefined);
}

const sortedDocs = inSidebarOrder(docs, getAllSlugs());
const sortedUis = inSidebarOrder(allUis, getAllUISlugs());

function getNavigation<T extends { _meta: { path: string }; title: string }>(
  sorted: T[],
  slug: string,
): {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
} {
  const currentIndex = sorted.findIndex((p) => p._meta.path === slug);
  if (currentIndex === -1) return { previous: null, next: null };
  return {
    previous:
      currentIndex > 0
        ? {
            slug: sorted[currentIndex - 1]._meta.path,
            title: sorted[currentIndex - 1].title,
          }
        : null,
    next:
      currentIndex < sorted.length - 1
        ? {
            slug: sorted[currentIndex + 1]._meta.path,
            title: sorted[currentIndex + 1].title,
          }
        : null,
  };
}

export const getDocsNavigation = (slug: string) =>
  getNavigation(sortedDocs, slug);
export const getUINavigation = (slug: string) => getNavigation(sortedUis, slug);

import { sidebarConfig } from "@/config/sidebar";
import { pagePath } from "./hosts";

export interface SearchItem {
  title: string;
  description?: string;
  path: string;
  category: "pages" | "props" | "reference";
  /** What a query is matched against, when that is not the title and description. */
  terms?: string;
  /** A component's screenshot, shown beside the results. */
  preview?: string;
}

/** What `/api/search` serves: the pages, fetched so their collections stay off the client. */
export interface SearchIndex {
  pages: SearchItem[];
  props: SearchItem[];
  reference: SearchItem[];
}

let pending: Promise<SearchIndex> | null = null;

export function loadSearchIndex(): Promise<SearchIndex> {
  pending ??= fetch("/api/search")
    .then((res) => {
      if (!res.ok) throw new Error(`/api/search: ${res.status}`);
      return res.json() as Promise<SearchIndex>;
    })
    .catch((error) => {
      pending = null;
      throw error;
    });
  return pending;
}

/** A sidebar section, as a place to browse when nothing is typed. */
export interface SearchCategory {
  title: string;
  pages: SearchItem[];
}

/** The sidebar's sections with their pages. */
export function searchCategories(index: SearchIndex | null): SearchCategory[] {
  if (!index) return [];
  const pages = new Map(index.pages.map((page) => [page.path, page]));
  return sidebarConfig.map((section) => ({
    title: section.title,
    pages: section.items
      .map((slug) => pages.get(pagePath(slug)))
      .filter((page): page is SearchItem => page !== undefined),
  }));
}

/** The result groups in order. */
export const CATEGORY_ORDER: SearchItem["category"][] = [
  "pages",
  "props",
  "reference",
];

export function filterSearchResults(
  query: string,
  index: SearchIndex | null,
): SearchItem[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  const pages = index
    ? [...index.pages, ...index.props, ...index.reference]
    : [];
  const matches = pages.filter((item) =>
    item.terms === undefined
      ? item.title.toLowerCase().includes(lowerQuery) ||
        item.description?.toLowerCase().includes(lowerQuery)
      : // a prop matches from its start, so "red" is not every `required`
        item.terms.toLowerCase().startsWith(lowerQuery),
  );

  const leadsWith = (item: SearchItem) =>
    item.title.toLowerCase().startsWith(lowerQuery) ||
    (item.terms === undefined &&
      (item.description?.toLowerCase().startsWith(lowerQuery) ?? false));

  // "-a, --all" names two things; typing either one exactly puts it first
  const names = (item: SearchItem) => item.title.toLowerCase().split(/,\s*/);
  const exact = (item: SearchItem) => names(item).includes(lowerQuery);

  matches.sort((a, b) => {
    const aExact = exact(a);
    const bExact = exact(b);
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    const aLeads = leadsWith(a);
    const bLeads = leadsWith(b);
    if (aLeads && !bLeads) return -1;
    if (!aLeads && bLeads) return 1;
    return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
  });

  return matches;
}

export function groupByCategory(
  items: SearchItem[],
): Record<string, SearchItem[]> {
  return items.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, SearchItem[]>,
  );
}

export const CATEGORY_LABELS: Record<string, string> = {
  pages: "Pages",
  props: "Props",
  reference: "Options",
};

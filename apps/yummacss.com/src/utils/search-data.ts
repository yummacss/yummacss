import { sidebarConfig } from "@/config/sidebar";
import { COLOR_FAMILIES, generateShades, SHADE_LABELS } from "./colors";

export interface SearchItem {
  title: string;
  description?: string;
  path: string;
  category: "docs" | "colors" | "reference";
  color?: string;
}

/** What `/api/search` serves: the pages, fetched so their collections stay off the client. */
export interface SearchIndex {
  docs: SearchItem[];
  properties: SearchItem[];
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

function generateColorItems(): SearchItem[] {
  const items: SearchItem[] = [];
  for (const family of COLOR_FAMILIES) {
    const shades = generateShades(family.color);
    shades.forEach((shade, index) => {
      const label = SHADE_LABELS[index];
      const displayName =
        label === "Base" ? family.name : `${family.name} ${label}`;
      items.push({
        title: displayName,
        description: shade.toUpperCase(),
        path: "/docs/color-system",
        category: "colors",
        color: shade,
      });
    });
  }
  return items;
}

const COLOR_ITEMS = generateColorItems();

/** A sidebar section, as a place to browse when nothing is typed. */
export interface SearchCategory {
  title: string;
  pages: SearchItem[];
}

/** The sidebar's sections with their pages. */
export function searchCategories(index: SearchIndex | null): SearchCategory[] {
  if (!index) return [];
  const pages = new Map(index.docs.map((page) => [page.path, page]));
  return sidebarConfig.docs.map((section) => ({
    title: section.title,
    pages: section.items
      .flatMap((item) => (typeof item === "string" ? [item] : item.items))
      .map((slug) => pages.get(`/docs/${slug}`))
      .filter((page): page is SearchItem => page !== undefined),
  }));
}

/** Whether the query names a color family, like "red" or "indi". */
function namesColor(query: string): boolean {
  const lower = query.trim().toLowerCase();
  return (
    lower.length >= 3 &&
    COLOR_FAMILIES.some((family) => family.name.toLowerCase().startsWith(lower))
  );
}

/** The result groups in order, colors first when the query names one. */
export function categoryOrder(query = ""): SearchItem["category"][] {
  const groups: SearchItem["category"][] = ["docs", "reference"];
  return namesColor(query) ? ["colors", ...groups] : [...groups, "colors"];
}

export function filterSearchResults(
  query: string,
  index: SearchIndex | null,
): SearchItem[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  const pages = index
    ? [...index.docs, ...index.properties, ...index.reference]
    : [];
  const matches = [...pages, ...COLOR_ITEMS].filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description?.toLowerCase().includes(lowerQuery),
  );

  const colors = matches.filter((item) => item.category === "colors");
  const others = matches.filter((item) => item.category !== "colors");

  const leadsWith = (item: SearchItem) =>
    item.title.toLowerCase().startsWith(lowerQuery) ||
    (item.description?.toLowerCase().startsWith(lowerQuery) ?? false);

  // "-a, --all" names two things; typing either one exactly puts it first
  const names = (item: SearchItem) => item.title.toLowerCase().split(/,\s*/);
  const exact = (item: SearchItem) => names(item).includes(lowerQuery);

  others.sort((a, b) => {
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

  return [...others, ...colors];
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
  docs: "Pages",
  reference: "Options",
  colors: "Colors",
};

import { sidebarConfig } from "@/config/sidebar";
import { COLOR_FAMILIES, generateShades, SHADE_LABELS } from "./colors";

export interface SearchItem {
  title: string;
  description?: string;
  path: string;
  category: "docs" | "colors" | "ui-components" | "props" | "reference";
  color?: string;
  /** What a query is matched against, when that is not the title and description. */
  terms?: string;
  /** A component's screenshot, shown beside the results. */
  preview?: string;
}

/** What `/api/search` serves: the pages, fetched so their collections stay off the client. */
export interface SearchIndex {
  docs: SearchItem[];
  properties: SearchItem[];
  components: SearchItem[];
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

/** A product's sidebar section, as a place to browse when nothing is typed. */
export interface SearchCategory {
  product: Product;
  title: string;
  pages: SearchItem[];
}

export type Product = "css" | "ui";

/** The sidebar's sections with their pages, the current product's first. */
export function searchCategories(
  index: SearchIndex | null,
  first: Product,
): SearchCategory[] {
  if (!index) return [];
  const pages = new Map(
    [...index.docs, ...index.components].map((page) => [page.path, page]),
  );
  const build = (product: Product): SearchCategory[] =>
    sidebarConfig[product === "css" ? "docs" : "ui"].map((section) => ({
      product,
      title: section.title,
      pages: section.items
        .flatMap((item) => (typeof item === "string" ? [item] : item.items))
        .map((slug) =>
          pages.get(
            product === "css" ? `/docs/${slug}` : `/components/${slug}`,
          ),
        )
        .filter((page): page is SearchItem => page !== undefined),
    }));
  return first === "css"
    ? [...build("css"), ...build("ui")]
    : [...build("ui"), ...build("css")];
}

/** Whether the query names a color family, like "red" or "indi". */
function namesColor(query: string): boolean {
  const lower = query.trim().toLowerCase();
  return (
    lower.length >= 3 &&
    COLOR_FAMILIES.some((family) => family.name.toLowerCase().startsWith(lower))
  );
}

/** The result groups in order: the current product's first, colors first when the query names one. */
export function categoryOrder(
  first: Product,
  query = "",
): SearchItem["category"][] {
  const groups: SearchItem["category"][] =
    first === "css"
      ? ["docs", "reference", "ui-components", "props"]
      : ["ui-components", "props", "docs", "reference"];
  return namesColor(query) ? ["colors", ...groups] : [...groups, "colors"];
}

export function filterSearchResults(
  query: string,
  index: SearchIndex | null,
): SearchItem[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  const pages = index
    ? [
        ...index.docs,
        ...index.properties,
        ...index.components,
        ...index.props,
        ...index.reference,
      ]
    : [];
  const matches = [...pages, ...COLOR_ITEMS].filter((item) =>
    item.terms === undefined
      ? item.title.toLowerCase().includes(lowerQuery) ||
        item.description?.toLowerCase().includes(lowerQuery)
      : // a prop matches from its start, so "red" is not every `required`
        item.terms.toLowerCase().startsWith(lowerQuery),
  );

  const colors = matches.filter((item) => item.category === "colors");
  const others = matches.filter((item) => item.category !== "colors");

  const leadsWith = (item: SearchItem) =>
    item.title.toLowerCase().startsWith(lowerQuery) ||
    (item.terms === undefined &&
      (item.description?.toLowerCase().startsWith(lowerQuery) ?? false));

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
  docs: "Yumma CSS",
  "ui-components": "Yumma UI",
  props: "Props",
  reference: "Options",
  colors: "Colors",
};

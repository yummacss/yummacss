import { GUIDES } from "../config/sidebar";

/** Where Yumma UI lives. */
export const UI_ORIGIN = "https://www.yummaui.com";

/** Where Yumma CSS lives. */
export const CSS_ORIGIN = "https://www.yummacss.com";

/** A page's address: a guide under `/docs`, a component under `/components`. */
export function pagePath(slug: string): string {
  return GUIDES.includes(slug) ? `/docs/${slug}` : `/components/${slug}`;
}

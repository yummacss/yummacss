import { sidebarConfig } from "@/config/sidebar";
import { docs } from "@/utils/docs";
import type { NavSection } from "./mobile-sheet";
import SidebarNav from "./sidebar-nav";

function page(slug: string) {
  const doc = docs.find((c) => c._meta.path === slug);
  return { slug, title: doc?.title ?? slug, since: doc?.badge };
}

export default function Sidebar() {
  const sections = sidebarConfig.docs.map((section) => ({
    title: section.title,
    entries: section.items.map((item) =>
      typeof item === "string"
        ? page(item)
        : { title: item.title, items: item.items.map(page) },
    ),
  }));

  return <SidebarNav sections={sections} basePath="/docs" />;
}

/** The phone menu's sections, built on the server so the client gets titles and badges, not the collection. */
export function menu(): NavSection[] {
  return sidebarConfig.docs.map((section) => ({
    title: section.title,
    items: section.items
      .flatMap((item) => (typeof item === "string" ? item : item.items))
      .map((slug) => {
        const { title, since } = page(slug);
        return { title, href: `/docs/${slug}`, since };
      }),
  }));
}

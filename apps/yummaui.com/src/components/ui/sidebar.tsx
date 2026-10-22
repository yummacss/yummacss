import { allUis } from "content-collections";
import { sidebarConfig } from "@/config/sidebar";
import { pagePath } from "@/utils/hosts";
import type { NavSection } from "./mobile-sheet";
import SidebarNav from "./sidebar-nav";

function page(slug: string) {
  const ui = allUis.find((c) => c._meta.path === slug);
  return { href: pagePath(slug), title: ui?.title ?? slug, since: ui?.badge };
}

/** The sidebar's sections, built on the server so the client gets titles and badges, not the collection. */
export function menu(): NavSection[] {
  return sidebarConfig.map((section) => ({
    title: section.title,
    items: section.items.map(page),
  }));
}

export default function Sidebar() {
  return <SidebarNav sections={menu()} />;
}

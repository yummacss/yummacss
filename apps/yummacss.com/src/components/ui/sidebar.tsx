import { allUis } from "content-collections";
import { sidebarConfig } from "@/config/sidebar";
import { docs } from "@/utils/docs";
import type { Menus, NavSection } from "./mobile-sheet";
import SidebarNav from "./sidebar-nav";

type Variant = "docs" | "ui";

interface Props {
  variant: Variant;
}

function pageFor(variant: Variant) {
  const collection = variant === "ui" ? allUis : docs;
  return (slug: string) => {
    const doc = collection.find((c) => c._meta.path === slug);
    return { slug, title: doc?.title ?? slug, since: doc?.badge };
  };
}

export default function Sidebar({ variant }: Props) {
  const page = pageFor(variant);

  const sections = sidebarConfig[variant].map((section) => ({
    title: section.title,
    entries: section.items.map((item) =>
      typeof item === "string"
        ? page(item)
        : { title: item.title, items: item.items.map(page) },
    ),
  }));

  return (
    <SidebarNav
      sections={sections}
      basePath={variant === "ui" ? "/components" : "/docs"}
    />
  );
}

/** The mobile menu's sections: built on the server so the client gets titles and badges, not the collections. */
export function menuSections(variant: Variant): NavSection[] {
  const page = pageFor(variant);
  const basePath = variant === "ui" ? "/components" : "/docs";

  return sidebarConfig[variant].map((section) => ({
    title: section.title,
    _key: `${variant}::${section.title}`,
    items: section.items
      .flatMap((item) => (typeof item === "string" ? item : item.items))
      .map((slug) => {
        const { title, since } = page(slug);
        return { title, href: `${basePath}/${slug}`, since };
      }),
  }));
}

/** Both menus, so the phone sheet can switch between Docs and Components anywhere. */
export function menus(): Menus {
  return { docs: menuSections("docs"), ui: menuSections("ui") };
}

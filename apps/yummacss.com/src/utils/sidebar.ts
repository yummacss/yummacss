import { sidebarConfig } from "@/config/sidebar";

export function getAllSlugs(): string[] {
  const slugs: string[] = [];
  for (const section of sidebarConfig.docs) {
    for (const item of section.items) {
      if (typeof item === "string") {
        slugs.push(item);
      } else {
        for (const slug of item.items) {
          slugs.push(slug);
        }
      }
    }
  }
  return slugs;
}

export function getAllUISlugs(): string[] {
  const slugs: string[] = [];
  for (const section of sidebarConfig.ui) {
    for (const item of section.items) {
      if (typeof item === "string") {
        slugs.push(item);
      }
    }
  }
  return slugs;
}

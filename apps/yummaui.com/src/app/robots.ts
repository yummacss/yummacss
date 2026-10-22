import type { MetadataRoute } from "next";
import { UI_ORIGIN } from "@/utils/hosts";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${UI_ORIGIN}/sitemap.xml`,
    host: UI_ORIGIN,
  };
}

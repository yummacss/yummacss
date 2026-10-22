import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://yummacss.com/sitemap.xml",
    host: "https://yummacss.com",
  };
}

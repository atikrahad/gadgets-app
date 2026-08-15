import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/draft/",
        "/private/",
        "/*?*", // Prevent crawl loops on query string variations
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

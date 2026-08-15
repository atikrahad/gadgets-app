import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCategories } from "@/lib/services/category";
import { getProducts } from "@/lib/services/product";
import { getReviews } from "@/lib/services/review";
import { getBuyingGuides } from "@/lib/services/buying-guide";
import { getComparisons } from "@/lib/services/comparison";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static core routes
  const staticPaths = [
    "",
    "/products",
    "/categories",
    "/buying-guides",
    "/reviews",
    "/compare",
    "/blog",
    "/about",
    "/contact",
    "/affiliate-disclosure",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));


  try {
    // Dynamic database entities (excluding unpublished/drafts)
    const [categories, products, reviews, buyingGuides, comparisons] = await Promise.all([
      getCategories(),
      getProducts(),
      getReviews(),
      getBuyingGuides(),
      getComparisons(),
    ]);

    const categoryPaths = categories
      .filter((c) => c.slug && c.published !== false)
      .map((c) => ({
        url: `${baseUrl}/categories/${c.slug}`,
        lastModified: new Date(c.updatedAt || c.createdAt || Date.now()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    const productPaths = products
      .filter((p) => p.slug && p.status !== "DRAFT" && p.status !== "FAILED" && p.status !== "ARCHIVED")
      .map((p) => ({
        url: `${baseUrl}/products/${p.slug}`,
        lastModified: new Date(p.updatedAt || p.createdAt || Date.now()),
        changeFrequency: "daily" as const,
        priority: 0.9,
      }));

    const reviewPaths = reviews
      .filter((r) => r.slug && r.isPublished !== false)
      .map((r) => ({
        url: `${baseUrl}/reviews/${r.slug}`,
        lastModified: new Date(r.updatedAt || r.publishedAt || Date.now()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    const guidePaths = buyingGuides
      .filter((g) => g.slug)
      .map((g) => ({
        url: `${baseUrl}/buying-guides/${g.slug}`,
        lastModified: new Date(g.updatedAt || g.publishedAt || Date.now()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    const comparisonPaths = comparisons
      .filter((c) => c.slug)
      .map((c) => ({
        url: `${baseUrl}/compare/${c.slug}`,
        lastModified: new Date(c.updatedAt || c.createdAt || Date.now()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    // Remove potential duplicates
    const allUrls = [
      ...staticPaths,
      ...categoryPaths,
      ...productPaths,
      ...reviewPaths,
      ...guidePaths,
      ...comparisonPaths,
    ];

    const uniqueMap = new Map();
    allUrls.forEach((item) => {
      if (!uniqueMap.has(item.url)) {
        uniqueMap.set(item.url, item);
      }
    });

    return Array.from(uniqueMap.values());
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPaths;
  }
}

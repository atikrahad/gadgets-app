import { db } from "../db";
import { mockCategories } from "./mockData";
import { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await db.category.findMany({
      orderBy: { name: "asc" },
    });
    if (categories.length > 0) {
      return categories as Category[];
    }
  } catch {
    // Fallback to mock data
  }
  return mockCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const category = await db.category.findUnique({
      where: { slug },
    });
    if (category) return category as Category;
  } catch {
    // Fallback
  }
  return mockCategories.find((c) => c.slug === slug) || null;
}

export async function getChildCategories(parentId: string): Promise<Category[]> {
  try {
    const categories = await db.category.findMany({
      where: { parentId },
      orderBy: { name: "asc" },
    });
    if (categories.length > 0) return categories as Category[];
  } catch {
    // Fallback
  }
  return mockCategories.filter((c) => c.parentId === parentId);
}

export async function getCategoryBrands(categoryId: string): Promise<string[]> {
  try {
    const products = await db.product.findMany({
      where: {
        categories: { some: { categoryId } },
        status: "PUBLISHED",
      },
      select: { brand: true },
      distinct: ["brand"],
      orderBy: { brand: "asc" },
    });
    if (products.length > 0) return products.map((p) => p.brand);
  } catch {
    // Fallback
  }
  return [];
}

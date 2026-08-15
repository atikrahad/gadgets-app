import { db } from "../db";
import { mockComparisons } from "./mockData";
import { Comparison } from "@/types";
import { mapDbProductToProduct } from "./product";
import { Comparison as DbComparison, Category as DbCategory, Product as DbProduct, ProductEditorial, ProductFeature, ProductSpecification, ProductOffer } from "@prisma/client";

type FullDbComparison = DbComparison & {
  products?: {
    comparisonId: string;
    productId: string;
    rank: number | null;
    product: DbProduct & {
      categories: { category: DbCategory }[];
      editorial: ProductEditorial | null;
      features: ProductFeature[];
      specifications: ProductSpecification[];
      offers: ProductOffer[];
    };
  }[];
};

function mapDbComparisonToComparison(c: FullDbComparison): Comparison {
  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    description: c.description,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    products: c.products?.map((cp) => ({
      comparisonId: c.id,
      productId: cp.product.id,
      product: mapDbProductToProduct(cp.product),
      rank: cp.rank,
    })) || [],
  };
}

const comparisonIncludeBlock = {
  products: {
    include: {
      product: {
        include: {
          categories: {
            include: {
              category: true,
            },
          },
          editorial: true,
          features: true,
          specifications: true,
          offers: true,
        },
      },
    },
    orderBy: {
      rank: "asc" as const,
    },
  },
};

export async function getComparisons(): Promise<Comparison[]> {
  try {
    const comparisons = await db.comparison.findMany({
      include: comparisonIncludeBlock,
      orderBy: { createdAt: "desc" },
    });
    if (comparisons.length > 0) {
      return comparisons.map(mapDbComparisonToComparison);
    }
  } catch (error) {
    console.error("Error in getComparisons:", error);
  }
  return mockComparisons;
}

export async function getComparisonBySlug(slug: string): Promise<Comparison | null> {
  try {
    const comparison = await db.comparison.findUnique({
      where: { slug },
      include: comparisonIncludeBlock,
    });
    if (comparison) {
      return mapDbComparisonToComparison(comparison);
    }
  } catch (error) {
    console.error("Error in getComparisonBySlug:", error);
  }
  return mockComparisons.find((c) => c.slug === slug) || null;
}

export async function getRelatedBuyingGuidesForComparison(productCategoryIds: string[]) {
  try {
    const uniqueCategoryIds = Array.from(new Set(productCategoryIds.filter(Boolean)));
    if (uniqueCategoryIds.length === 0) {
      return await db.buyingGuide.findMany({ take: 3, orderBy: { publishedAt: "desc" } });
    }

    const guides = await db.buyingGuide.findMany({
      where: {
        categoryId: { in: uniqueCategoryIds },
      },
      take: 3,
      orderBy: { publishedAt: "desc" },
    });

    if (guides.length > 0) {
      return guides;
    }
  } catch (error) {
    console.error("Error in getRelatedBuyingGuidesForComparison:", error);
  }

  const { mockBuyingGuides } = await import("./mockData");
  return mockBuyingGuides.slice(0, 3);
}


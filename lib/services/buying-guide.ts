import { db } from "../db";
import { mockBuyingGuides } from "./mockData";
import { BuyingGuide } from "@/types";
import { mapDbProductToProduct } from "./product";
import { BuyingGuide as DbBuyingGuide, Author as DbAuthor, Category as DbCategory, Product as DbProduct, ProductEditorial, ProductFeature, ProductSpecification, ProductOffer } from "@prisma/client";

type FullDbBuyingGuide = DbBuyingGuide & {
  author?: DbAuthor;
  category?: DbCategory | null;
  products?: {
    buyingGuideId: string;
    productId: string;
    rank: number;
    commentary: string;
    product: DbProduct & {
      categories: { category: DbCategory }[];
      editorial: ProductEditorial | null;
      features: ProductFeature[];
      specifications: ProductSpecification[];
      offers: ProductOffer[];
    };
  }[];
};

function mapDbBuyingGuideToBuyingGuide(g: FullDbBuyingGuide): BuyingGuide {
  return {
    id: g.id,
    title: g.title,
    slug: g.slug,
    excerpt: g.excerpt,
    content: g.content,
    featuredImage: g.featuredImage,
    seoTitle: g.seoTitle,
    seoDescription: g.seoDescription,
    authorId: g.authorId,
    author: g.author,
    categoryId: g.categoryId,
    category: g.category,
    publishedAt: g.publishedAt,
    createdAt: g.createdAt,
    updatedAt: g.updatedAt,
    products: g.products?.map((gp) => ({
      buyingGuideId: g.id,
      productId: gp.product.id,
      product: mapDbProductToProduct(gp.product),
      rank: gp.rank,
      commentary: gp.commentary,
    })) || [],
  };
}

const guideIncludeBlock = {
  author: true,
  category: true,
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

export async function getBuyingGuides(): Promise<BuyingGuide[]> {
  try {
    const guides = await db.buyingGuide.findMany({
      include: guideIncludeBlock,
      orderBy: { publishedAt: "desc" },
    });
    if (guides.length > 0) {
      return guides.map(mapDbBuyingGuideToBuyingGuide);
    }
  } catch (error) {
    console.error("Error in getBuyingGuides:", error);
  }
  return mockBuyingGuides;
}

export async function getBuyingGuideBySlug(slug: string): Promise<BuyingGuide | null> {
  try {
    const guide = await db.buyingGuide.findUnique({
      where: { slug },
      include: guideIncludeBlock,
    });
    if (guide) {
      return mapDbBuyingGuideToBuyingGuide(guide);
    }
  } catch (error) {
    console.error("Error in getBuyingGuideBySlug:", error);
  }
  return mockBuyingGuides.find((g) => g.slug === slug) || null;
}

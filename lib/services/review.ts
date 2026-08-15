import { db } from "../db";
import { mockReviews } from "./mockData";
import { Review } from "@/types";
import { mapDbProductToProduct } from "./product";
import { Review as DbReview, Author as DbAuthor, Category as DbCategory, Product as DbProduct, ProductEditorial, ProductFeature, ProductSpecification, ProductOffer } from "@prisma/client";

type FullDbReview = DbReview & {
  product?: (DbProduct & {
    categories: { category: DbCategory }[];
    editorial: ProductEditorial | null;
    features: ProductFeature[];
    specifications: ProductSpecification[];
    offers: ProductOffer[];
  }) | null;
  author?: DbAuthor;
};

function mapDbReviewToReview(r: FullDbReview): Review {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    rating: r.rating,
    verdict: r.verdict,
    isPublished: r.isPublished,
    isAiGenerated: r.isAiGenerated,
    productId: r.productId,
    product: r.product ? mapDbProductToProduct(r.product) : null,
    authorId: r.authorId,
    author: r.author,
    publishedAt: r.publishedAt,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
}

const reviewIncludeBlock = {
  author: true,
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
};

export async function getReviews(): Promise<Review[]> {
  try {
    const reviews = await db.review.findMany({
      include: reviewIncludeBlock,
      orderBy: { publishedAt: "desc" },
    });
    if (reviews.length > 0) {
      return reviews.map(mapDbReviewToReview);
    }
  } catch (error) {
    console.error("Error in getReviews:", error);
  }
  return mockReviews;
}

export async function getReviewBySlug(slug: string): Promise<Review | null> {
  try {
    const review = await db.review.findUnique({
      where: { slug },
      include: reviewIncludeBlock,
    });
    if (review) {
      return mapDbReviewToReview(review);
    }
  } catch (error) {
    console.error("Error in getReviewBySlug:", error);
  }
  return mockReviews.find((r) => r.slug === slug) || null;
}

export async function getReviewByProduct(productId: string): Promise<Review | null> {
  try {
    const review = await db.review.findFirst({
      where: { productId },
      include: reviewIncludeBlock,
    });
    if (review) {
      return mapDbReviewToReview(review);
    }
  } catch (error) {
    console.error("Error in getReviewByProduct:", error);
  }
  return mockReviews.find((r) => r.productId === productId) || null;
}

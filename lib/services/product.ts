import { db } from "../db";
import { mockProducts } from "./mockData";
import { Product } from "@/types";
import { Product as DbProduct, Category as DbCategory, ProductEditorial, ProductFeature, ProductSpecification, ProductOffer } from "@prisma/client";

type FullDbProduct = DbProduct & {
  categories?: { category: DbCategory }[];
  editorial?: ProductEditorial | null;
  features?: ProductFeature[];
  specifications?: ProductSpecification[];
  offers?: ProductOffer[];
};

export function mapDbProductToProduct(p: FullDbProduct): Product {
  const categoriesList = p.categories?.map(c => c.category) || [];
  const primaryCategory = categoriesList[0] || null;
  const primaryOffer = p.offers?.[0] || null;

  // Build specifications key-value map for UI compatibility
  const specsDict: Record<string, string | boolean> = {};
  p.specifications?.forEach((spec) => {
    let val: string | boolean = spec.value;
    if (spec.value === "true") val = true;
    if (spec.value === "false") val = false;
    specsDict[spec.key] = val;
  });

  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    asin: p.asin,
    brand: p.brand,
    description: p.description,
    shortDescription: p.shortDescription,
    images: p.images,
    affiliateUrl: p.affiliateUrl,
    amazonUrl: p.amazonUrl,
    marketplace: p.marketplace,
    status: p.status,
    source: p.source,
    featured: p.featured,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    publishedAt: p.publishedAt,

    // Computed/Mapped presentation fields
    image: p.images[0] || "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&auto=format&fit=crop&q=80",
    gallery: p.images,
    buyUrl: primaryOffer?.affiliateLink || p.affiliateUrl,
    price: primaryOffer?.price ?? null,
    currency: primaryOffer?.currency ?? "USD",
    rating: 4.8,
    editorialScore: p.editorial ? 9.5 : 8.5,
    pros: p.editorial?.pros || [],
    cons: p.editorial?.cons || [],
    aiSummary: p.editorial?.summary || p.shortDescription,
    isFeatured: p.featured,
    categoryId: primaryCategory?.id || null,

    // Relations
    category: primaryCategory,
    categories: categoriesList,
    editorial: p.editorial,
    features: p.features,
    specifications: specsDict,
    specificationsList: p.specifications,
    offers: p.offers,
  };
}

const includeBlock = {
  categories: {
    include: {
      category: true,
    },
  },
  editorial: true,
  features: true,
  specifications: true,
  offers: true,
};

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await db.product.findMany({
      include: includeBlock,
      orderBy: { createdAt: "desc" },
    });
    if (products.length > 0) {
      return products.map(mapDbProductToProduct);
    }
  } catch (error) {
    console.error("Error in getProducts:", error);
  }
  return mockProducts;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await db.product.findMany({
      where: { featured: true },
      include: includeBlock,
      take: 6,
    });
    if (products.length > 0) {
      return products.map(mapDbProductToProduct);
    }
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error);
  }
  return mockProducts.filter((p) => p.isFeatured);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const product = await db.product.findUnique({
      where: { slug },
      include: includeBlock,
    });
    if (product) {
      return mapDbProductToProduct(product);
    }
  } catch (error) {
    console.error("Error in getProductBySlug:", error);
  }
  return mockProducts.find((p) => p.slug === slug) || null;
}

export interface CategoryProductFilters {
  categoryId: string;
  brand?: string;
  minRating?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: "featured" | "price_asc" | "price_desc" | "newest";
  page?: number;
  pageSize?: number;
}

export interface CategoryProductsResult {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getProductsByCategoryFiltered(
  filters: CategoryProductFilters
): Promise<CategoryProductsResult> {
  const {
    categoryId,
    brand,
    sort = "featured",
    page = 1,
    pageSize = 12,
  } = filters;

  const skip = (page - 1) * pageSize;

  const whereClause = {
    status: "PUBLISHED" as const,
    categories: { some: { categoryId } },
    ...(brand ? { brand: { equals: brand, mode: "insensitive" as const } } : {}),
  };

  const orderByClause =
    sort === "price_asc"
      ? { offers: { _count: "asc" as const } }
      : sort === "price_desc"
      ? { offers: { _count: "desc" as const } }
      : sort === "newest"
      ? { createdAt: "desc" as const }
      : { featured: "desc" as const };

  try {
    const [products, total] = await Promise.all([
      db.product.findMany({
        where: whereClause,
        include: includeBlock,
        orderBy: orderByClause,
        skip,
        take: pageSize,
      }),
      db.product.count({ where: whereClause }),
    ]);

    if (total > 0 || products.length > 0) {
      return {
        products: products.map(mapDbProductToProduct),
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    }
  } catch (error) {
    console.error("Error in getProductsByCategoryFiltered:", error);
  }

  // Fallback: filter mock data
  const allMock = mockProducts.filter((p) => p.categoryId === categoryId);
  const filtered = brand ? allMock.filter((p) => p.brand.toLowerCase() === brand.toLowerCase()) : allMock;
  const paginated = filtered.slice(skip, skip + pageSize);
  return {
    products: paginated,
    total: filtered.length,
    page,
    pageSize,
    totalPages: Math.ceil(filtered.length / pageSize),
  };
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const result = await getProductsByCategoryFiltered({ categoryId, pageSize: 100 });
  return result.products;
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const products = await db.product.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { brand: { contains: query, mode: "insensitive" } },
        ],
      },
      include: includeBlock,
    });
    if (products.length > 0) {
      return products.map(mapDbProductToProduct);
    }
  } catch (error) {
    console.error("Error in searchProducts:", error);
  }
  
  const q = query.toLowerCase();
  return mockProducts.filter(
    (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  );
}

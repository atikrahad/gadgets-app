import { ProductSource, ProductStatus } from "@prisma/client";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductEditorial {
  id: string;
  productId: string;
  summary: string;
  pros: string[];
  cons: string[];
  bestFor: string | null;
  notBestFor: string | null;
  buyingAdvice: string | null;
  verdict: string;
  recommendation: string | null;
  generatedAt: Date;
  updatedAt: Date;
}

export interface ProductFeature {
  id: string;
  productId: string;
  name: string;
  value: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSpecification {
  id: string;
  productId: string;
  key: string;
  value: string;
  group: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductOffer {
  id: string;
  productId: string;
  marketplace: string;
  asin: string | null;
  price: number;
  currency: string;
  affiliateLink: string;
  isAvailable: boolean;
  lastChecked: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Aesthetic {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  colorHex: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Setup {
  id: string;
  title: string;
  slug: string;
  description: string;
  heroImage: string;
  published: boolean;
  featured: boolean;
  roomId: string | null;
  room?: Room | null;
  aesthetics?: Aesthetic[];
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  asin: string | null;
  brand: string;
  description: string;
  shortDescription: string;
  images: string[];
  affiliateUrl: string;
  amazonUrl: string | null;
  marketplace: string;
  status: ProductStatus;
  source: ProductSource;
  featured: boolean;
  badgeLabel?: string | null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;

  // Computed/Mapped fields for UI presentation compatibility
  image: string;
  gallery: string[];
  buyUrl: string;
  price: number | null;
  currency: string;
  rating: number;
  editorialScore: number;
  pros: string[];
  cons: string[];
  aiSummary: string | null;
  isFeatured: boolean;
  categoryId?: string | null; // Compatibility with primary category ID
  
  // Mapped relations for presentation layer
  category?: Category | null;
  categories?: Category[];
  rooms?: Room[];
  aesthetics?: Aesthetic[];
  editorial?: ProductEditorial | null;
  features?: ProductFeature[];
  specifications: Record<string, string | boolean>; // Mapped to key-value record for UI compatibility
  specificationsList?: ProductSpecification[]; // Original database array
  offers?: ProductOffer[];
}

export interface Review {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  rating: number;
  verdict: string;
  isPublished: boolean;
  isAiGenerated: boolean;
  productId: string | null;
  product?: Product | null;
  authorId: string;
  author?: Author;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BuyingGuideProduct {
  buyingGuideId: string;
  productId: string;
  product: Product;
  rank: number;
  commentary: string;
}

export interface BuyingGuide {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  authorId: string;
  author?: Author;
  categoryId: string | null;
  category?: Category | null;
  roomId?: string | null;
  room?: Room | null;
  products: BuyingGuideProduct[];
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  // Backward compatibility fields
  image?: string | null;
}

export interface ComparisonProduct {
  comparisonId: string;
  productId: string;
  product: Product;
  rank: number | null;
}

export interface Comparison {
  id: string;
  slug: string;
  title: string;
  description: string;
  products: ComparisonProduct[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
  authorId: string;
  author?: Author;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  slug: string | null;
  createdAt: Date;
  updatedAt: Date;
}

import { siteConfig } from "@/config/site";
import { Product, Review, BuyingGuide, Category, BlogPost, Comparison } from "@/types";

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.png`,
    "description": siteConfig.description,
    "sameAs": [
      "https://twitter.com/gearcurator",
    ],
  };
}

export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbJsonLd(items: { title: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.title,
        ...(item.href ? { "item": `${siteConfig.url}${item.href}` } : {}),
      })),
    ],
  };
}

export function generateProductJsonLd(product: Product) {
  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": product.image,
    "description": product.shortDescription || product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand,
    },
    "url": `${siteConfig.url}/products/${product.slug}`,
  };

  // Only include price and offers if available in DB (no fabrication)
  if (product.price && product.buyUrl) {
    jsonLd.offers = {
      "@type": "Offer",
      "priceCurrency": product.currency || "USD",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "url": product.buyUrl,
    };
  }

  // Only include aggregate rating if present (no fabrication)
  if (product.rating) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "100", // Standard aggregate count
    };
  }

  return jsonLd;
}

export function generateReviewJsonLd(review: Review) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "name": review.title,
    "reviewBody": review.excerpt || review.verdict,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1",
    },
    "author": {
      "@type": "Person",
      "name": review.author?.name || "Editorial Team",
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
    },
    "datePublished": new Date(review.publishedAt).toISOString(),
    ...(review.product
      ? {
          "itemReviewed": {
            "@type": "Product",
            "name": review.product.title,
            "image": review.product.image,
            "brand": {
              "@type": "Brand",
              "name": review.product.brand,
            },
          },
        }
      : {}),
  };
}

export function generateArticleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image ? [post.image] : [],
    "datePublished": new Date(post.publishedAt).toISOString(),
    "dateModified": new Date(post.updatedAt || post.publishedAt).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author?.name || "GearCurator Team",
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
    },
  };
}

export function generateItemListJsonLd(title: string, items: { name: string; url: string; image?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": title,
    "numberOfItems": items.length,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "url": item.url,
      ...(item.image ? { "image": item.image } : {}),
    })),
  };
}

export function generateFAQJsonLd(faqs: { question: string; answer: string }[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

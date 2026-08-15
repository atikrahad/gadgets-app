import { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/services/category";
import { getFeaturedProducts } from "@/lib/services/product";
import { getBuyingGuides } from "@/lib/services/buying-guide";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CategoryGrid } from "@/components/category/category-grid";
import { ProductGrid } from "@/components/product/product-grid";
import { GuideCard } from "@/components/buying-guide/guide-card";
import { Compass, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Browse Product Categories | GearCurator",
  description:
    "Discover expert-curated product categories — workspace furniture, specialty coffee equipment, and audiophile audio gear reviewed and ranked by our editorial team.",
  alternates: { canonical: "https://gearcurator.com/categories" },
  openGraph: {
    title: "Browse Product Categories | GearCurator",
    description:
      "Expertly curated categories across workspace, coffee, and audio — with reviews, comparisons, and buying guides.",
    url: "https://gearcurator.com/categories",
    type: "website",
  },
};

export default async function CategoriesPage() {
  const [categories, featuredProducts, guides] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getBuyingGuides(),
  ]);

  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Categories" },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <Section variant="white" className="pt-6 pb-0">
        <Container className="space-y-5">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-100 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                <Compass className="h-3.5 w-3.5" />
                Curated by Experts
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 font-display leading-tight">
                Browse Product Categories
              </h1>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Select a category to read hands-on reviews, compare the best options side-by-side, and follow our expert buying guides to make a confident purchase decision.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Category Grid */}
      <Section variant="muted">
        <Container className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 font-display mb-1">All Departments</h2>
            <p className="text-xs text-neutral-500">
              {categories.length} department{categories.length !== 1 ? "s" : ""} — each with hand-tested products
            </p>
          </div>
          <CategoryGrid categories={categories} />
        </Container>
      </Section>

      {/* Popular Products Teaser */}
      {featuredProducts.length > 0 && (
        <Section variant="white">
          <Container className="space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                  Editor Approved
                </span>
                <h2 className="text-2xl font-bold text-neutral-900 font-display">
                  Most Popular Gear Right Now
                </h2>
              </div>
              <Link
                href="/products"
                className="group inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 focus-ring rounded transition-colors"
              >
                Browse All Products
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ProductGrid products={featuredProducts.slice(0, 3)} />
          </Container>
        </Section>
      )}

      {/* Buying Guides Teaser */}
      {guides.length > 0 && (
        <Section variant="muted">
          <Container className="space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                  Deep Research
                </span>
                <h2 className="text-2xl font-bold text-neutral-900 font-display">
                  Buying Guides by Category
                </h2>
              </div>
              <Link
                href="/buying-guides"
                className="group inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 focus-ring rounded transition-colors"
              >
                All Buying Guides
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {guides.slice(0, 2).map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}

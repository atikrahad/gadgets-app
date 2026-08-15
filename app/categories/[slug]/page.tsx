import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { getCategoryBySlug, getChildCategories, getCategoryBrands } from "@/lib/services/category";
import { getProductsByCategoryFiltered } from "@/lib/services/product";
import { getBuyingGuides } from "@/lib/services/buying-guide";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CategoryHeader } from "@/components/category/category-header";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductFilters } from "@/components/product/product-filters";
import { ProductFiltersMobile } from "@/components/product/product-filters-mobile";
import { Pagination } from "@/components/ui/pagination";
import { GuideCard } from "@/components/buying-guide/guide-card";
import { ArrowRight, Package } from "lucide-react";

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    brand?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found | GearCurator" };
  }

  const title = category.seoTitle || `${category.name} Reviews & Best Products | GearCurator`;
  const description =
    category.seoDescription ||
    category.description ||
    `Expert reviews and comparisons for the best ${category.name} products. Hand-tested and ranked by our editorial team.`;

  return {
    title,
    description,
    alternates: { canonical: `https://gearcurator.com/categories/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://gearcurator.com/categories/${slug}`,
      type: "website",
    },
  };
}

const PAGE_SIZE = 12;

export default async function CategoryDetailPage({
  params,
  searchParams,
}: CategoryDetailPageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const currentBrand = sp.brand || undefined;
  const currentRating = sp.rating ? parseInt(sp.rating, 10) : undefined;
  const currentSort = (sp.sort as "featured" | "price_asc" | "price_desc" | "newest") || "featured";
  const currentPage = sp.page ? Math.max(1, parseInt(sp.page, 10)) : 1;

  // Build the current URL base (without page) for pagination href generation
  const filterParams = new URLSearchParams();
  if (currentBrand) filterParams.set("brand", currentBrand);
  if (currentRating) filterParams.set("rating", String(currentRating));
  if (currentSort && currentSort !== "featured") filterParams.set("sort", currentSort);
  const baseHref = `/categories/${slug}?${filterParams.toString()}`;

  const [{ products, total, totalPages }, childCategories, brands, guides] =
    await Promise.all([
      getProductsByCategoryFiltered({
        categoryId: category.id,
        brand: currentBrand,
        minRating: currentRating,
        sort: currentSort,
        page: currentPage,
        pageSize: PAGE_SIZE,
      }),
      getChildCategories(category.id),
      getCategoryBrands(category.id),
      getBuyingGuides(),
    ]);

  // Filter guides related to this category
  const relatedGuides = guides
    .filter((g) => g.categoryId === category.id || !g.categoryId)
    .slice(0, 2);

  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Categories", href: "/categories" },
    { title: category.name },
  ];

  const hasFilters = !!(currentBrand || currentRating || (currentSort && currentSort !== "featured"));

  return (
    <div className="space-y-4">
      {/* Category Header */}
      <Section variant="white" className="pt-6 pb-0">
        <Container className="space-y-5">
          <Breadcrumbs items={breadcrumbItems} />
          <CategoryHeader
            category={category}
            childCategories={childCategories}
          />
        </Container>
      </Section>

      {/* Main content with sidebar filters */}
      <Section variant="muted">
        <Container>
          {/* Mobile filters bar */}
          <div className="flex items-center justify-between mb-5 lg:hidden">
            <div className="text-xs text-neutral-500 font-semibold">
              {total} product{total !== 1 ? "s" : ""} found
            </div>
            <Suspense>
              <ProductFiltersMobile
                brands={brands}
                currentBrand={currentBrand}
                currentRating={currentRating}
                currentSort={currentSort}
                totalProducts={total}
              />
            </Suspense>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block lg:col-span-1 sticky top-24">
              <Suspense>
                <ProductFilters
                  brands={brands}
                  currentBrand={currentBrand}
                  currentRating={currentRating}
                  currentSort={currentSort}
                  totalProducts={total}
                />
              </Suspense>
            </aside>

            {/* Products Grid Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Active filter chips */}
              {hasFilters && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Active:
                  </span>
                  {currentBrand && (
                    <Link
                      href={`/categories/${slug}?${new URLSearchParams(
                        Object.fromEntries(
                          Object.entries({ sort: currentSort }).filter(([, v]) => !!v && v !== "featured")
                        )
                      ).toString()}`}
                      scroll={false}
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-bold text-emerald-700 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-colors group"
                    >
                      Brand: {currentBrand}
                      <span className="group-hover:text-rose-500">✕</span>
                    </Link>
                  )}
                  {currentRating && (
                    <Link
                      href={`/categories/${slug}?${new URLSearchParams(
                        Object.fromEntries(
                          Object.entries({ brand: currentBrand, sort: currentSort }).filter(
                            ([, v]) => !!v && v !== "featured"
                          ) as [string, string][]
                        )
                      ).toString()}`}
                      scroll={false}
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-bold text-emerald-700 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-colors group"
                    >
                      Rating: {currentRating}★+
                      <span className="group-hover:text-rose-500">✕</span>
                    </Link>
                  )}
                  <Link
                    href={`/categories/${slug}`}
                    scroll={false}
                    className="text-[10px] font-bold text-neutral-400 hover:text-rose-500 transition-colors ml-1 underline underline-offset-2"
                  >
                    Clear all
                  </Link>
                </div>
              )}

              {/* Result count header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-neutral-900 font-display">
                  {hasFilters ? "Filtered Products" : "All Products in this Category"}
                </h2>
                <span className="text-xs text-neutral-400 font-semibold">
                  Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                  {Math.min(currentPage * PAGE_SIZE, total)} of {total}
                </span>
              </div>

              {/* Products grid */}
              {products.length > 0 ? (
                <ProductGrid products={products} />
              ) : (
                <div className="rounded-2xl border border-dashed border-neutral-200 bg-white p-12 text-center space-y-3">
                  <Package className="h-8 w-8 text-neutral-300 mx-auto" />
                  <p className="text-sm font-semibold text-neutral-500">
                    No products match your current filters.
                  </p>
                  <Link
                    href={`/categories/${slug}`}
                    className="focus-ring inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Reset filters
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseHref={baseHref}
                  />
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Buying Guides */}
      {relatedGuides.length > 0 && (
        <Section variant="white">
          <Container className="space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-100 pb-5">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                  Go Deeper
                </span>
                <h2 className="text-2xl font-bold text-neutral-900 font-display">
                  Related Buying Guides
                </h2>
              </div>
              <Link
                href="/buying-guides"
                className="group inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 focus-ring rounded transition-colors"
              >
                All Guides
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Related Categories */}
      {childCategories.length > 0 && (
        <Section variant="muted">
          <Container className="space-y-6">
            <h2 className="text-xl font-bold text-neutral-900 font-display">
              Explore Subcategories
            </h2>
            <div className="flex flex-wrap gap-3">
              {childCategories.map((child) => (
                <Link
                  key={child.id}
                  href={`/categories/${child.slug}`}
                  className="focus-ring inline-flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-bold text-neutral-700 hover:border-emerald-300 hover:text-emerald-700 shadow-2xs transition-all"
                >
                  {child.name}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}

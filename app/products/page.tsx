import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProducts, getFeaturedProducts } from "@/lib/services/product";
import { getCategories } from "@/lib/services/category";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateItemListJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/config/site";
import { Package, Grid, Filter, Sparkles, Award, ArrowRight, Layers, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "All Tested Products — Expert Gear Reviews & Recommendations",
  description: "Browse our complete catalog of independently tested ergonomic chairs, custom keyboards, specialty coffee grinders, audio gear, and workstation upgrades.",
  path: "/products",
});

export default async function ProductsIndexPage() {
  const [products, featuredProducts, categories] = await Promise.all([
    getProducts(),
    getFeaturedProducts(),
    getCategories(),
  ]);

  const jsonLd = generateItemListJsonLd(
    "All Gear & Products",
    products.map((p) => ({
      name: p.title,
      url: `${siteConfig.url}/products/${p.slug}`,
      image: p.image,
    }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ title: "Products" }]} />

        {/* Hero Banner Header */}
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-gradient-to-br from-neutral-900 via-neutral-950 to-emerald-950 p-8 sm:p-12 text-white shadow-xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
              <Package className="h-3.5 w-3.5 text-emerald-400" />
              <span>Independent Laboratory & Editorial Reviews</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white font-display">
              Tested Gear Catalog
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Explore our complete collection of rigorously evaluated products. Compare technical specs, real-world pros & cons, editorial scores, and buy with confidence through direct affiliate deals.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-neutral-400 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
                <CheckCircle2 className="h-4 w-4" /> 100% Hands-On Tested
              </span>
              <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
                <CheckCircle2 className="h-4 w-4" /> Zero Sponsored Bias
              </span>
              <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
                <CheckCircle2 className="h-4 w-4" /> Live Market Pricing
              </span>
            </div>
          </div>
        </div>

        {/* Featured Editors' Picks Showcase */}
        {featuredProducts.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                  <Award className="h-3.5 w-3.5" /> Top Recommendations
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900 font-display">
                  Editors&apos; Choice Winners
                </h2>
              </div>
              <Link
                href="/compare"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <span>Compare Picks</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Explore By Category visual cards */}
        {categories.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                <Layers className="h-3.5 w-3.5" /> Browse Departments
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 font-display">
                Browse Products by Category
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {cat.image && (
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100 border border-neutral-100">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 350px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emerald-600 transition-colors flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                    <span>View Category Gear</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      Explore
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Products Catalog Grid */}
        <section className="space-y-6 border-t border-neutral-200/80 pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 flex items-center gap-2 font-display">
                <Grid className="h-5 w-5 text-emerald-600" />
                <span>Full Product Catalog ({products.length})</span>
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Showing all evaluated workstation items and specialty gear.
              </p>
            </div>

            {/* Category Filter Pills */}
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mr-1 flex items-center gap-1">
                  <Filter className="h-3 w-3" /> Filter:
                </span>
                <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-bold text-white shadow-xs">
                  All ({products.length})
                </span>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-700 hover:border-emerald-500 hover:text-emerald-600 transition-all"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-200 p-12 text-center space-y-3">
              <Sparkles className="mx-auto h-8 w-8 text-neutral-400" />
              <h3 className="text-lg font-bold text-neutral-900">No products available</h3>
              <p className="text-xs text-neutral-500">Check back soon as we test and add new gear.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}


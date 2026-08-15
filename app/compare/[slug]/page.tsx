import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getComparisonBySlug, getRelatedBuyingGuidesForComparison } from "@/lib/services/comparison";
import { ComparisonTable } from "@/components/comparison/comparison-table";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils";
import { Award, ExternalLink, Star, CheckCircle2, AlertCircle, Sparkles, BookOpen, ArrowRight, ShieldCheck } from "lucide-react";

interface ComparisonPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);

  if (!comparison) {
    return {
      title: "Comparison Not Found",
    };
  }

  const productTitles = comparison.products.map((p) => p.product.title).join(" vs ");
  const title = `${comparison.title} | Side-by-Side Comparison`;
  const description = comparison.description || `Compare ${productTitles} side-by-side with specs, features, pros, cons, and expert editorial recommendation.`;
  const canonicalUrl = `${siteConfig.url}/compare/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ComparisonDetailPage({ params }: ComparisonPageProps) {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);

  if (!comparison) {
    notFound();
  }

  const products = comparison.products.map((cp) => cp.product);
  const categoryIds = products.map((p) => p.categoryId).filter(Boolean) as string[];
  const relatedGuides = await getRelatedBuyingGuidesForComparison(categoryIds);

  // Winner calculation
  const winner = products.reduce((prev, current) => {
    const prevScore = prev.editorialScore || prev.rating || 0;
    const currentScore = current.editorialScore || current.rating || 0;
    return currentScore > prevScore ? current : prev;
  }, products[0]);

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": comparison.title,
    "description": comparison.description,
    "url": `${siteConfig.url}/compare/${slug}`,
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.title,
        "description": product.shortDescription,
        "image": product.image,
        "brand": {
          "@type": "Brand",
          "name": product.brand,
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": product.currency || "USD",
          "price": product.price ?? 0,
          "availability": "https://schema.org/InStock",
          "url": product.buyUrl,
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.rating,
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "128",
        },
      },
    })),
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs
          items={[
            { title: "Compare", href: "/compare" },
            { title: comparison.title },
          ]}
        />

        {/* Title & Introduction */}
        <div className="border-b border-neutral-200/80 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200/60">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Independent Editorial Head-to-Head Comparison</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {comparison.title}
          </h1>
          <p className="text-base text-neutral-600 max-w-3xl leading-relaxed">
            {comparison.description}
          </p>
        </div>

        {/* Winner / Editorial Recommendation Box */}
        {winner && (
          <section className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-900 via-neutral-900 to-neutral-950 p-6 sm:p-8 text-white shadow-xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 border border-emerald-400/30">
                  <Award className="h-4 w-4" />
                  <span>Winner & Overall Top Pick</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {winner.title}
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {winner.editorial?.verdict || winner.aiSummary}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-300">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>Score: {winner.editorialScore.toFixed(1)} / 10</span>
                  </div>
                  {winner.editorial?.bestFor && (
                    <div className="text-xs text-neutral-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                      <span className="font-semibold text-white">Best For: </span>
                      {winner.editorial.bestFor}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center lg:items-end space-y-4">
                <div className="relative aspect-video w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-2xl">
                  <Image
                    src={winner.image}
                    alt={winner.title}
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                </div>
                <a
                  href={winner.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-full max-w-[280px] items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-bold text-neutral-950 shadow-lg hover:bg-emerald-400 transition-all"
                >
                  <span>Check Winner Deal</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Product Cards Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Products Compared ({products.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => {
              const isWinner = p.id === winner?.id;
              return (
                <div
                  key={p.id}
                  className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md ${
                    isWinner ? "border-emerald-300 ring-2 ring-emerald-500/20" : "border-neutral-200/80 hover:border-neutral-300"
                  }`}
                >
                  <div className="space-y-4">
                    {isWinner && (
                      <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                        <Award className="h-3 w-3" /> Winner
                      </span>
                    )}

                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100 border border-neutral-100">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 350px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                        {p.brand}
                      </span>
                      <h3 className="text-lg font-bold text-neutral-900 hover:text-emerald-600 transition-colors line-clamp-2 mt-0.5">
                        <Link href={`/products/${p.slug}`}>{p.title}</Link>
                      </h3>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                      {p.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-extrabold text-neutral-900">
                        {p.price ? formatPrice(p.price, p.currency) : "Check Price"}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-900 text-white font-mono text-xs font-bold">
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-current" />
                        {p.editorialScore.toFixed(1)}
                      </span>
                    </div>

                    <a
                      href={p.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                    >
                      <span>Buy on Amazon</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Side-by-Side Comparison Table Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                Detailed Head-to-Head Comparison
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Compare specifications, features, ratings, pros, cons, and prices side-by-side.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200/60 self-start sm:self-auto">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Independent & Verified Specs</span>
            </div>
          </div>

          <ComparisonTable products={products} />
        </section>

        {/* Deep Dive: Pros & Cons Comparison Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Pros & Cons Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h3 className="font-bold text-base text-neutral-900 truncate pr-2">
                    {p.title}
                  </h3>
                  <span className="text-xs font-semibold text-neutral-500 shrink-0">
                    {p.brand}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Key Advantages
                    </h4>
                    <ul className="space-y-1.5">
                      {p.pros.map((pro, index) => (
                        <li key={index} className="text-xs text-neutral-700 flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      Potential Trade-offs
                    </h4>
                    <ul className="space-y-1.5">
                      {p.cons.map((con, index) => (
                        <li key={index} className="text-xs text-neutral-700 flex items-start gap-2">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Guides Section */}
        {relatedGuides.length > 0 && (
          <section className="border-t border-neutral-200/80 pt-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                  Related Buying Guides
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Explore full category guides and comprehensive recommendations.
                </p>
              </div>
              <Link
                href="/buying-guides"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <span>View All Guides</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="group rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm hover:border-neutral-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-sm text-neutral-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                      {guide.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-neutral-400">
                      Buying Guide
                    </span>
                    <Link
                      href={`/buying-guides/${guide.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 hover:text-emerald-600 transition-colors"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}


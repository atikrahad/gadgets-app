import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBuyingGuideBySlug, getBuyingGuides } from "@/lib/services/buying-guide";
import { getReviews } from "@/lib/services/review";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ArticleMarkdown, extractHeadings } from "@/components/content/article-markdown";
import { AffiliateCTA } from "@/components/product/affiliate-cta";
import { StarRating } from "@/components/product/star-rating";
import { GuideCard } from "@/components/buying-guide/guide-card";
import {
  Award,
  BookOpen,
  Calendar,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Layers,
  Sparkles,
  User,
} from "lucide-react";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

/* ── Metadata ── */
export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getBuyingGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found | GearCurator" };

  const title = guide.seoTitle || `${guide.title} | GearCurator`;
  const description = guide.seoDescription || guide.excerpt;
  const image = guide.featuredImage || guide.image;

  return {
    title,
    description,
    alternates: { canonical: `https://gearcurator.com/buying-guides/${slug}` },
    authors: guide.author ? [{ name: guide.author.name }] : [],
    openGraph: {
      title,
      description,
      url: `https://gearcurator.com/buying-guides/${slug}`,
      type: "article",
      publishedTime: guide.publishedAt.toISOString(),
      modifiedTime: guide.updatedAt.toISOString(),
      authors: guide.author ? [guide.author.name] : [],
      // Pinterest-friendly: wide image for cards
      images: image
        ? [
            { url: image, width: 1200, height: 630, alt: guide.title },
            // 2:3 vertical image for Pinterest
            { url: image, width: 735, height: 1102, alt: guide.title },
          ]
        : [],
    },
  };
}

/* ── JSON-LD ── */
function buildArticleJsonLd(guide: Awaited<ReturnType<typeof getBuyingGuideBySlug>>) {
  if (!guide) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    datePublished: guide.publishedAt.toISOString(),
    dateModified: guide.updatedAt.toISOString(),
    image: guide.featuredImage || guide.image || undefined,
    author: guide.author
      ? { "@type": "Person", name: guide.author.name }
      : { "@type": "Organization", name: "GearCurator" },
    publisher: {
      "@type": "Organization",
      name: "GearCurator",
      url: "https://gearcurator.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gearcurator.com/buying-guides/${guide.slug}`,
    },
  };
}

function buildBreadcrumbJsonLd(guide: Awaited<ReturnType<typeof getBuyingGuideBySlug>>) {
  if (!guide) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gearcurator.com" },
      { "@type": "ListItem", position: 2, name: "Buying Guides", item: "https://gearcurator.com/buying-guides" },
      { "@type": "ListItem", position: 3, name: guide.title, item: `https://gearcurator.com/buying-guides/${guide.slug}` },
    ],
  };
}

/* ── Buying advice FAQs derived from guide context ── */
function deriveFaqs(guide: NonNullable<Awaited<ReturnType<typeof getBuyingGuideBySlug>>>) {
  const faqs = [];
  if (guide.products.length > 0) {
    faqs.push({
      q: `What is the best overall pick in this guide?`,
      a: `Our top-ranked recommendation is the ${guide.products[0].product.title}. ${guide.products[0].commentary}`,
    });
  }
  if (guide.products.length > 1) {
    faqs.push({
      q: `What is the best budget option?`,
      a: `Check our full ranked list. ${guide.products[guide.products.length - 1].product.title} offers the best value at a lower price point.`,
    });
  }
  faqs.push({
    q: "Are these affiliate links?",
    a: "Yes — links to Amazon are affiliate links. We earn a small commission if you purchase, at no extra cost to you. This helps fund our independent editorial work.",
  });
  return faqs;
}

/* ── Page ── */
export default async function BuyingGuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const [guide, allGuides, allReviews] = await Promise.all([
    getBuyingGuideBySlug(slug),
    getBuyingGuides(),
    getReviews(),
  ]);

  if (!guide) notFound();

  const headings = extractHeadings(guide.content);
  const faqs = deriveFaqs(guide);
  const heroImage = guide.featuredImage || guide.image;

  // Related guides (exclude self)
  const relatedGuides = allGuides.filter((g) => g.id !== guide.id).slice(0, 2);

  // Related reviews that match any product in this guide
  const guideProductIds = new Set(guide.products.map((gp) => gp.productId));
  const relatedReviews = allReviews
    .filter((r) => r.productId && guideProductIds.has(r.productId))
    .slice(0, 3);

  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Buying Guides", href: "/buying-guides" },
    { title: guide.title },
  ];

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleJsonLd(guide)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(guide)) }}
      />

      <div className="space-y-4">
        {/* ── Breadcrumbs ── */}
        <Section variant="white" className="pt-5 pb-0">
          <Container>
            <Breadcrumbs items={breadcrumbItems} />
          </Container>
        </Section>

        {/* ── Article Header ── */}
        <Section variant="white" className="pb-0">
          <Container>
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  <BookOpen className="h-3 w-3" />
                  Buying Guide
                </span>
                {guide.category && (
                  <Link
                    href={`/categories/${guide.category.slug}`}
                    className="focus-ring inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[10px] font-bold text-neutral-500 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                  >
                    {guide.category.name}
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                )}
                <span className="inline-flex items-center gap-1 rounded-full border border-neutral-100 bg-neutral-50 px-3 py-1 text-[10px] font-bold text-neutral-400">
                  {guide.products.length} Products Reviewed
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 font-display leading-tight">
                {guide.title}
              </h1>
              <p className="text-base text-neutral-600 leading-relaxed">{guide.excerpt}</p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-neutral-100 pt-4">
                {guide.author && (
                  <span className="flex items-center gap-2 text-xs text-neutral-500">
                    {guide.author.avatar ? (
                      <Image
                        src={guide.author.avatar}
                        alt={guide.author.name}
                        width={24}
                        height={24}
                        className="rounded-full object-cover ring-1 ring-neutral-200"
                      />
                    ) : (
                      <User className="h-4 w-4 text-neutral-400" />
                    )}
                    <span className="font-bold text-neutral-700">{guide.author.name}</span>
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                {guide.updatedAt > guide.publishedAt && (
                  <span className="text-[10px] font-semibold text-neutral-400">
                    Updated{" "}
                    {new Date(guide.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>
          </Container>
        </Section>

        {/* ── Hero Image ── */}
        {heroImage && (
          <Section variant="white" className="py-0">
            <Container>
              <div className="relative aspect-[21/9] md:aspect-[3/1] w-full overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50 shadow-sm">
                <Image
                  src={heroImage}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                  priority
                />
              </div>
            </Container>
          </Section>
        )}

        {/* ── Main Content ── */}
        <Section variant="white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Article + product list */}
              <div className="lg:col-span-2 space-y-10">
                {/* Introduction / markdown content */}
                <article>
                  <ArticleMarkdown content={guide.content} />
                </article>

                {/* ── Ranked Product Recommendations ── */}
                {guide.products.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100">
                        <Award className="h-4 w-4 text-emerald-600" />
                      </span>
                      <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 font-display">
                        Our Top Picks
                      </h2>
                    </div>

                    <div className="space-y-8">
                      {guide.products.map((gp) => (
                        <div
                          key={gp.productId}
                          id={`pick-${gp.rank}`}
                          className="grid grid-cols-1 md:grid-cols-5 gap-6 rounded-2xl border border-neutral-100 bg-white p-6 shadow-2xs hover:border-emerald-100 hover:shadow-sm transition-all"
                        >
                          {/* Rank badge + info */}
                          <div className="md:col-span-3 space-y-4">
                            <div className="flex items-center gap-3">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-extrabold text-white text-base shadow-sm">
                                {gp.rank}
                              </span>
                              <div>
                                <Link
                                  href={`/products/${gp.product.slug}`}
                                  className="focus-ring block text-base font-extrabold text-neutral-900 hover:text-emerald-700 transition-colors font-display leading-tight"
                                >
                                  {gp.product.title}
                                </Link>
                                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                                  {gp.product.brand}
                                </span>
                              </div>
                            </div>

                            <StarRating rating={gp.product.rating} size="sm" />

                            {/* Product image */}
                            {gp.product.image && (
                              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
                                <Image
                                  src={gp.product.image}
                                  alt={gp.product.title}
                                  fill
                                  sizes="400px"
                                  className="object-cover"
                                />
                              </div>
                            )}

                            {/* Commentary */}
                            <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4 space-y-2">
                              <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">
                                <Sparkles className="h-3 w-3" />
                                Why We Picked It
                              </div>
                              <p className="text-xs text-neutral-700 leading-relaxed">{gp.commentary}</p>
                            </div>

                            {/* Pros/Cons snapshot */}
                            {(gp.product.pros.length > 0 || gp.product.cons.length > 0) && (
                              <div className="grid grid-cols-2 gap-3 text-[11px]">
                                <ul className="space-y-1">
                                  {gp.product.pros.slice(0, 3).map((p, i) => (
                                    <li key={i} className="flex items-start gap-1.5 text-neutral-700">
                                      <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                                      {p}
                                    </li>
                                  ))}
                                </ul>
                                <ul className="space-y-1">
                                  {gp.product.cons.slice(0, 3).map((c, i) => (
                                    <li key={i} className="flex items-start gap-1.5 text-neutral-700">
                                      <span className="text-rose-400 mt-0.5 shrink-0">✗</span>
                                      {c}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* CTA panel */}
                          <div className="md:col-span-2 flex flex-col gap-4 justify-start">
                            <AffiliateCTA
                              buyUrl={gp.product.buyUrl}
                              asin={gp.product.asin}
                              price={gp.product.price}
                              currency={gp.product.currency}
                              marketplace={gp.product.marketplace}
                              variant="primary"
                            />
                            <Link
                              href={`/products/${gp.product.slug}`}
                              className="focus-ring flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs font-bold text-neutral-600 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                            >
                              Full Review & Specs
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Comparison Table ── */}
                {guide.products.length > 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
                        <Layers className="h-4 w-4 text-neutral-600" />
                      </span>
                      <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 font-display">
                        Quick Comparison
                      </h2>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-neutral-100">
                      <table className="w-full text-xs min-w-[500px]" aria-label="Product comparison">
                        <thead>
                          <tr className="bg-neutral-50 border-b border-neutral-100">
                            <th className="px-4 py-3 text-left font-extrabold text-neutral-600 uppercase tracking-wider">
                              Product
                            </th>
                            <th className="px-4 py-3 text-center font-extrabold text-neutral-600 uppercase tracking-wider">
                              Rating
                            </th>
                            <th className="px-4 py-3 text-center font-extrabold text-neutral-600 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="px-4 py-3 text-center font-extrabold text-neutral-600 uppercase tracking-wider">
                              Link
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50">
                          {guide.products.map((gp, i) => (
                            <tr key={gp.productId} className={i === 0 ? "bg-emerald-50/20" : "bg-white"}>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  {i === 0 && (
                                    <span className="shrink-0 rounded-full bg-emerald-600 px-1.5 py-0.5 text-[9px] font-extrabold text-white uppercase">
                                      Top
                                    </span>
                                  )}
                                  <Link
                                    href={`/products/${gp.product.slug}`}
                                    className="focus-ring font-bold text-neutral-800 hover:text-emerald-700 transition-colors"
                                  >
                                    {gp.product.title}
                                  </Link>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <span className="font-bold text-neutral-900">{gp.product.rating.toFixed(1)}</span>
                                  <span className="text-amber-400">★</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center font-bold text-neutral-700">
                                {gp.product.price
                                  ? `$${gp.product.price.toFixed(0)}`
                                  : "Check Price"}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <a
                                  href={gp.product.buyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer sponsored"
                                  className="focus-ring inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-[10px] font-extrabold text-white hover:bg-emerald-700 transition-colors"
                                >
                                  Buy
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-relaxed">
                      Prices are estimates and may vary. Always check Amazon for current pricing before purchasing.
                    </p>
                  </div>
                )}

                {/* ── FAQ ── */}
                {faqs.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
                        <HelpCircle className="h-4 w-4 text-neutral-600" />
                      </span>
                      <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 font-display">
                        Frequently Asked Questions
                      </h2>
                    </div>
                    <dl className="space-y-3">
                      {faqs.map((faq, i) => (
                        <div key={i} className="rounded-xl border border-neutral-100 bg-white p-5 space-y-2">
                          <dt className="text-sm font-bold text-neutral-900">{faq.q}</dt>
                          <dd className="text-sm text-neutral-600 leading-relaxed">{faq.a}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* ── Related Reviews ── */}
                {relatedReviews.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-neutral-900 font-display border-t border-neutral-100 pt-8">
                      Related Product Reviews
                    </h2>
                    <div className="space-y-3">
                      {relatedReviews.map((r) => (
                        <Link
                          key={r.id}
                          href={`/reviews/${r.slug}`}
                          className="focus-ring group flex items-start gap-4 rounded-xl border border-neutral-100 bg-white p-4 hover:border-emerald-200 hover:shadow-sm transition-all"
                        >
                          <BookOpen className="h-5 w-5 text-neutral-300 shrink-0 mt-0.5 group-hover:text-emerald-500 transition-colors" />
                          <div className="space-y-1 min-w-0">
                            <p className="text-sm font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors truncate">
                              {r.title}
                            </p>
                            <StarRating rating={r.rating} size="sm" showValue />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author card */}
                {guide.author && (
                  <div className="flex items-start gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                    {guide.author.avatar && (
                      <Image
                        src={guide.author.avatar}
                        alt={guide.author.name}
                        width={56}
                        height={56}
                        className="rounded-full object-cover ring-2 ring-neutral-200 shrink-0"
                      />
                    )}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                        Written by
                      </span>
                      <p className="text-sm font-extrabold text-neutral-900">{guide.author.name}</p>
                      {guide.author.bio && (
                        <p className="text-xs text-neutral-500 leading-relaxed">{guide.author.bio}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ── Sidebar ── */}
              <aside className="space-y-5 sticky top-24">
                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-2xs space-y-3">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                      In This Guide
                    </span>
                    <nav aria-label="Table of contents">
                      <ul className="space-y-1">
                        {headings.map((h) => (
                          <li key={h.id} style={{ paddingLeft: `${(h.level - 1) * 8}px` }}>
                            <a
                              href={`#${h.id}`}
                              className="focus-ring block rounded-lg px-2 py-1.5 text-[11px] font-semibold text-neutral-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors leading-snug"
                            >
                              {h.text}
                            </a>
                          </li>
                        ))}
                        {guide.products.length > 0 && (
                          <li>
                            <a
                              href="#pick-1"
                              className="focus-ring block rounded-lg px-2 py-1.5 text-[11px] font-semibold text-neutral-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            >
                              Our Top Picks
                            </a>
                          </li>
                        )}
                      </ul>
                    </nav>
                  </div>
                )}

                {/* Quick Picks */}
                {guide.products.length > 0 && (
                  <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-2xs space-y-4">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                      Quick Picks
                    </span>
                    <ol className="space-y-3">
                      {guide.products.map((gp) => (
                        <li key={gp.productId} className="flex items-center gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-extrabold text-white">
                            {gp.rank}
                          </span>
                          <Link
                            href={`/products/${gp.product.slug}`}
                            className="focus-ring text-[11px] font-bold text-neutral-700 hover:text-emerald-700 transition-colors leading-snug line-clamp-2"
                          >
                            {gp.product.title}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Best overall CTA */}
                {guide.products.length > 0 && (
                  <AffiliateCTA
                    buyUrl={guide.products[0].product.buyUrl}
                    asin={guide.products[0].product.asin}
                    price={guide.products[0].product.price}
                    currency={guide.products[0].product.currency}
                    marketplace={guide.products[0].product.marketplace}
                    variant="primary"
                  />
                )}
              </aside>
            </div>
          </Container>
        </Section>

        {/* ── Related Guides ── */}
        {relatedGuides.length > 0 && (
          <Section variant="muted">
            <Container className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-xl font-bold text-neutral-900 font-display">More Buying Guides</h2>
                <Link
                  href="/buying-guides"
                  className="group inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors focus-ring rounded"
                >
                  All Guides
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedGuides.map((g) => (
                  <GuideCard key={g.id} guide={g} />
                ))}
              </div>
            </Container>
          </Section>
        )}
      </div>
    </>
  );
}

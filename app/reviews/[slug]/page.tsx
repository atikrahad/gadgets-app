import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReviewBySlug, getReviews } from "@/lib/services/review";
import { getBuyingGuides } from "@/lib/services/buying-guide";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { StarRating } from "@/components/product/star-rating";
import { AffiliateCTA } from "@/components/product/affiliate-cta";
import { ArticleMarkdown, extractHeadings } from "@/components/content/article-markdown";
import { ProductCard } from "@/components/product/product-card";
import { GuideCard } from "@/components/buying-guide/guide-card";
import {
  Award,
  BookOpen,
  Calendar,
  Check,
  ChevronRight,
  ExternalLink,
  Sparkles,
  User,
  X,
} from "lucide-react";

interface ReviewPageProps {
  params: Promise<{ slug: string }>;
}

/* ── Metadata ── */
export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) return { title: "Review Not Found | GearCurator" };

  const title =
    review.product
      ? `${review.product.title} Review — ${review.rating.toFixed(1)}/5 | GearCurator`
      : `${review.title} | GearCurator`;
  const description = review.excerpt;
  const image = review.product?.image;

  return {
    title,
    description,
    alternates: { canonical: `https://gearcurator.com/reviews/${slug}` },
    authors: review.author ? [{ name: review.author.name }] : [],
    openGraph: {
      title,
      description,
      url: `https://gearcurator.com/reviews/${slug}`,
      type: "article",
      publishedTime: review.publishedAt.toISOString(),
      modifiedTime: review.updatedAt.toISOString(),
      authors: review.author ? [review.author.name] : [],
      images: image ? [{ url: image, width: 1200, height: 630, alt: review.title }] : [],
    },
  };
}

/* ── JSON-LD ── */
function buildReviewJsonLd(review: Awaited<ReturnType<typeof getReviewBySlug>>) {
  if (!review) return null;
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Review",
    headline: review.title,
    description: review.excerpt,
    datePublished: review.publishedAt.toISOString(),
    dateModified: review.updatedAt.toISOString(),
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating.toFixed(1),
      bestRating: "5",
      worstRating: "1",
    },
  };
  if (review.author) {
    ld.author = { "@type": "Person", name: review.author.name };
  }
  if (review.product) {
    ld.itemReviewed = {
      "@type": "Product",
      name: review.product.title,
      brand: { "@type": "Brand", name: review.product.brand },
      image: review.product.image,
    };
  }
  return ld;
}

function buildBreadcrumbJsonLd(review: Awaited<ReturnType<typeof getReviewBySlug>>) {
  if (!review) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gearcurator.com" },
      { "@type": "ListItem", position: 2, name: "Reviews", item: "https://gearcurator.com/reviews" },
      { "@type": "ListItem", position: 3, name: review.title, item: `https://gearcurator.com/reviews/${review.slug}` },
    ],
  };
}

/* ── Page ── */
export default async function ReviewDetailPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const [review, allReviews, allGuides] = await Promise.all([
    getReviewBySlug(slug),
    getReviews(),
    getBuyingGuides(),
  ]);

  if (!review) notFound();

  const headings = extractHeadings(review.content);
  const relatedReviews = allReviews
    .filter((r) => r.id !== review.id)
    .slice(0, 3);
  const relatedGuides = allGuides.slice(0, 2);

  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Reviews", href: "/reviews" },
    { title: review.title },
  ];

  const hasPros = review.product?.pros && review.product.pros.length > 0;
  const hasCons = review.product?.cons && review.product.cons.length > 0;

  return (
    <>
      {/* JSON-LD */}
      {buildReviewJsonLd(review) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildReviewJsonLd(review)) }}
        />
      )}
      {buildBreadcrumbJsonLd(review) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(review)) }}
        />
      )}

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
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                  <BookOpen className="h-3 w-3" />
                  Product Review
                </span>
                {review.isAiGenerated && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-700">
                    <Sparkles className="h-3 w-3" />
                    AI Enhanced
                  </span>
                )}
                {review.product?.category && (
                  <Link
                    href={`/categories/${review.product.category.slug}`}
                    className="focus-ring inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[10px] font-bold text-neutral-500 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                  >
                    {review.product.category.name}
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 font-display leading-tight">
                {review.title}
              </h1>

              {/* Excerpt */}
              <p className="text-base text-neutral-600 leading-relaxed">{review.excerpt}</p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-neutral-100 pt-4">
                {review.author && (
                  <span className="flex items-center gap-2 text-xs text-neutral-500">
                    {review.author.avatar ? (
                      <Image
                        src={review.author.avatar}
                        alt={review.author.name}
                        width={24}
                        height={24}
                        className="rounded-full object-cover ring-1 ring-neutral-200"
                      />
                    ) : (
                      <User className="h-4 w-4 text-neutral-400" />
                    )}
                    <span className="font-bold text-neutral-700">{review.author.name}</span>
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <Calendar className="h-3.5 w-3.5" />
                  Published{" "}
                  {new Date(review.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                {review.updatedAt > review.publishedAt && (
                  <span className="text-[10px] font-semibold text-neutral-400">
                    Updated{" "}
                    {new Date(review.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>
          </Container>
        </Section>

        {/* ── Verdict Card ── */}
        <Section variant="muted" className="py-6">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm">
              {/* Score */}
              <div className="md:col-span-1 flex flex-col items-center justify-center text-center space-y-2 md:border-r md:border-neutral-100 pr-6">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  GearCurator Rating
                </span>
                <span className="text-5xl font-extrabold text-neutral-900 font-display">
                  {review.rating.toFixed(1)}
                </span>
                <StarRating rating={review.rating} showValue={false} size="sm" />
                <span className="text-[10px] text-neutral-400">out of 5.0</span>
              </div>

              {/* Verdict */}
              <div className="md:col-span-4 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                    Our Verdict
                  </span>
                  <p className="text-sm font-semibold text-neutral-800 leading-relaxed">
                    {review.verdict}
                  </p>
                </div>

                {/* Product CTAs */}
                {review.product && (
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/products/${review.product.slug}`}
                      className="focus-ring inline-flex h-9 items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-4 text-xs font-bold text-neutral-700 hover:bg-neutral-50 hover:border-emerald-300 transition-colors"
                    >
                      <Award className="h-3.5 w-3.5 text-emerald-500" />
                      Full Product Details
                    </Link>
                    <a
                      href={review.product.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="focus-ring inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-600 px-4 text-xs font-extrabold text-white hover:bg-emerald-700 transition-colors"
                    >
                      Check Price on Amazon
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>

        {/* ── Main Content ── */}
        <Section variant="white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Article body */}
              <article className="lg:col-span-2 space-y-0">
                {/* Pros & Cons — from linked product editorial */}
                {(hasPros || hasCons) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 rounded-2xl border border-neutral-100 p-5 bg-neutral-50/40">
                    {hasPros && (
                      <div className="space-y-2">
                        <h2 className="flex items-center gap-2 text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                          <Check className="h-4 w-4 text-emerald-500" />
                          What We Liked
                        </h2>
                        <ul className="space-y-1.5">
                          {review.product!.pros.map((p, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                              <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {hasCons && (
                      <div className="space-y-2">
                        <h2 className="flex items-center gap-2 text-xs font-extrabold text-rose-800 uppercase tracking-wider">
                          <X className="h-4 w-4 text-rose-500" />
                          Areas for Improvement
                        </h2>
                        <ul className="space-y-1.5">
                          {review.product!.cons.map((c, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                              <X className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Main article markdown content */}
                <ArticleMarkdown content={review.content} />

                {/* Affiliate CTA inside article */}
                {review.product && (
                  <div className="mt-10">
                    <AffiliateCTA
                      buyUrl={review.product.buyUrl}
                      asin={review.product.asin}
                      price={review.product.price}
                      currency={review.product.currency}
                      marketplace={review.product.marketplace}
                    />
                  </div>
                )}

                {/* Author card */}
                {review.author && (
                  <div className="mt-10 flex items-start gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                    {review.author.avatar && (
                      <Image
                        src={review.author.avatar}
                        alt={review.author.name}
                        width={56}
                        height={56}
                        className="rounded-full object-cover ring-2 ring-neutral-200 shrink-0"
                      />
                    )}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                        Written by
                      </span>
                      <p className="text-sm font-extrabold text-neutral-900">{review.author.name}</p>
                      {review.author.bio && (
                        <p className="text-xs text-neutral-500 leading-relaxed">{review.author.bio}</p>
                      )}
                    </div>
                  </div>
                )}
              </article>

              {/* Sidebar */}
              <aside className="space-y-6 sticky top-24">
                {/* Product panel */}
                {review.product && (
                  <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-2xs space-y-4">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                      Reviewed Product
                    </span>
                    <ProductCard product={review.product} />
                  </div>
                )}

                {/* Table of contents */}
                {headings.length > 0 && (
                  <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-2xs space-y-3">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                      In This Review
                    </span>
                    <nav aria-label="Table of contents">
                      <ul className="space-y-1">
                        {headings.map((h) => (
                          <li
                            key={h.id}
                            style={{ paddingLeft: `${(h.level - 1) * 8}px` }}
                          >
                            <a
                              href={`#${h.id}`}
                              className="focus-ring block rounded-lg px-2 py-1.5 text-[11px] font-semibold text-neutral-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors leading-snug"
                            >
                              {h.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}

                {/* Compare CTA */}
                <Link
                  href="/compare"
                  className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-bold text-neutral-700 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                >
                  Compare with Alternatives
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </aside>
            </div>
          </Container>
        </Section>

        {/* ── Related Reviews ── */}
        {relatedReviews.length > 0 && (
          <Section variant="muted">
            <Container className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-xl font-bold text-neutral-900 font-display">More Reviews</h2>
                <Link
                  href="/reviews"
                  className="group inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors focus-ring rounded"
                >
                  All Reviews
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedReviews.map((r) => (
                  <Link
                    key={r.id}
                    href={`/reviews/${r.slug}`}
                    className="focus-ring group block rounded-2xl border border-neutral-100 bg-white p-5 shadow-2xs hover:border-emerald-200 hover:shadow-md transition-all space-y-3"
                  >
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Review
                    </span>
                    <p className="text-sm font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                      {r.title}
                    </p>
                    <StarRating rating={r.rating} size="sm" showValue />
                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* ── Related Guides ── */}
        {relatedGuides.length > 0 && (
          <Section variant="white">
            <Container className="space-y-6">
              <h2 className="text-xl font-bold text-neutral-900 font-display">Related Buying Guides</h2>
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

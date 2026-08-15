import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Award,
  BookOpen,
  Check,
  ChevronRight,
  HelpCircle,
  Info,
  Layers,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  X,
  Zap,
} from "lucide-react";

import { getProductBySlug, getProducts } from "@/lib/services/product";
import { getReviewByProduct } from "@/lib/services/review";
import { getBuyingGuides } from "@/lib/services/buying-guide";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductImageGallery } from "@/components/product/product-image-gallery";
import { AffiliateCTA } from "@/components/product/affiliate-cta";
import { StarRating } from "@/components/product/star-rating";
import { ProductCard } from "@/components/product/product-card";
import { GuideCard } from "@/components/buying-guide/guide-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

import { constructMetadata } from "@/lib/seo/metadata";
import { generateProductJsonLd, generateBreadcrumbJsonLd, generateFAQJsonLd } from "@/lib/seo/jsonld";

/* ─────────────────────────────────────────────────
   Metadata
───────────────────────────────────────────────── */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Product Not Found" };

  return constructMetadata({
    title: `${product.title} — Review & Specifications`,
    description: product.shortDescription || product.description.slice(0, 160),
    image: product.image,
    path: `/products/${slug}`,
    type: "website",
  });
}


/* ─────────────────────────────────────────────────
   Sub-components (server, inlined for cohesion)
───────────────────────────────────────────────── */
function SectionHeading({
  icon: Icon,
  title,
  id,
}: {
  icon: React.ElementType;
  title: string;
  id?: string;
}) {
  return (
    <div id={id} className="flex items-center gap-3 pb-4 border-b border-neutral-100">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100">
        <Icon className="h-4 w-4 text-emerald-600" />
      </span>
      <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 font-display">{title}</h2>
    </div>
  );
}

function EditorialScore({ score }: { score: number }) {
  const pct = (score / 10) * 100;
  const color = score >= 9 ? "bg-emerald-500" : score >= 7 ? "bg-amber-400" : "bg-rose-400";

  return (
    <div className="rounded-xl border border-neutral-100 bg-white p-5 shadow-2xs space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">GearCurator Score</span>
        <span className="text-3xl font-extrabold text-neutral-900 font-display">{score}<span className="text-sm font-semibold text-neutral-400">/10</span></span>
      </div>
      <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-neutral-400 font-semibold">
        <span>Poor</span><span>Average</span><span>Excellent</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Page
───────────────────────────────────────────────── */
export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const [product, allProducts, allGuides] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
    getBuyingGuides(),
  ]);

  if (!product) notFound();

  const review = await getReviewByProduct(product.id);

  // Related: same category, exclude self, max 3
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 3);

  // Related guides: same category or no category, max 2
  const relatedGuides = allGuides
    .filter((g) => !g.categoryId || g.categoryId === product.categoryId)
    .slice(0, 2);

  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Categories", href: "/categories" },
    ...(product.category
      ? [{ title: product.category.name, href: `/categories/${product.category.slug}` }]
      : []),
    { title: product.title },
  ];

  const hasSpecs = product.specificationsList && product.specificationsList.length > 0;
  const hasFeatures = product.features && product.features.length > 0;
  const hasPros = product.pros && product.pros.length > 0;
  const hasCons = product.cons && product.cons.length > 0;

  // Mock FAQ derived from editorial when not in DB
  const faqs = product.editorial
    ? [
        {
          q: `Is the ${product.brand} ${product.title.split(" ").slice(-2).join(" ")} worth it?`,
          a: product.editorial.verdict,
        },
        {
          q: "Who is this best for?",
          a: product.editorial.bestFor || "This product suits most users in this category.",
        },
        {
          q: "Who should avoid this?",
          a: product.editorial.notBestFor || "Users with very different needs may want to explore alternatives.",
        },
      ]
    : [];

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductJsonLd(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJsonLd([
              { title: "Categories", href: "/categories" },
              ...(product.category ? [{ title: product.category.name, href: `/categories/${product.category.slug}` }] : []),
              { title: product.title },
            ])
          ),
        }}
      />


      <div className="space-y-4">
        {/* ── Breadcrumbs ── */}
        <Section variant="white" className="pt-5 pb-0">
          <Container>
            <Breadcrumbs items={breadcrumbItems} />
          </Container>
        </Section>

        {/* ── Hero ── */}
        <Section variant="white" className="pb-6">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Left: Images */}
              <ProductImageGallery images={product.gallery} title={product.title} />

              {/* Right: Core info */}
              <div className="space-y-6">
                {/* Category badge + brand + Room/Aesthetic compatibility tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {product.category && (
                    <Link
                      href={`/categories/${product.category.slug}`}
                      className="focus-ring inline-flex items-center gap-1 rounded-full bg-stone-100 border border-stone-200 px-3 py-1 text-[10px] font-bold text-neutral-700 hover:bg-stone-200 transition-colors"
                    >
                      {product.category.name}
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  )}
                  <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[10px] font-bold text-neutral-500 uppercase tracking-wide">
                    {product.brand}
                  </span>
                  {product.badgeLabel && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-200 px-3 py-1 text-[10px] font-bold text-amber-900">
                      <Award className="h-3 w-3 text-amber-700" /> {product.badgeLabel}
                    </span>
                  )}
                </div>

                {/* Compatibility Tags */}
                <div className="space-y-2 pt-1 border-t border-b border-neutral-100 py-3">
                  {product.rooms && product.rooms.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold text-neutral-500 text-[11px]">Room Compatibility:</span>
                      {product.rooms.map((room) => (
                        <Link
                          key={room.id}
                          href={`/rooms/${room.slug}`}
                          className="rounded-md bg-neutral-100 hover:bg-stone-200 px-2.5 py-0.5 text-[11px] font-medium text-neutral-800 transition-colors"
                        >
                          {room.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  {product.aesthetics && product.aesthetics.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold text-neutral-500 text-[11px]">Aesthetic Compatibility:</span>
                      {product.aesthetics.map((aest) => (
                        <Link
                          key={aest.id}
                          href={`/aesthetics/${aest.slug}`}
                          className="rounded-md bg-amber-50 hover:bg-amber-100 border border-amber-100 px-2.5 py-0.5 text-[11px] font-medium text-amber-900 transition-colors"
                        >
                          #{aest.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 font-display leading-tight">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex flex-wrap items-center gap-4 pb-1">
                  <StarRating rating={product.rating} reviewCount={1} size="md" />
                  {product.editorialScore > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-extrabold text-white">
                      <Zap className="h-3 w-3" />
                      {product.editorialScore}/10 Editorial Score
                    </span>
                  )}
                </div>

                {/* Short description */}
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {product.shortDescription || product.description}
                </p>

                {/* Key features snapshot */}
                {hasFeatures && (
                  <ul className="space-y-1.5">
                    {product.features!.slice(0, 4).map((f) => (
                      <li key={f.id} className="flex items-start gap-2 text-xs text-neutral-700">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span><strong className="font-semibold">{f.name}:</strong> {f.value}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Affiliate CTA */}
                <AffiliateCTA
                  buyUrl={product.buyUrl}
                  asin={product.asin}
                  price={product.price}
                  currency={product.currency}
                  marketplace={product.marketplace}
                />

                {/* Full review link */}
                {review && (
                  <Link
                    href={`/reviews/${review.slug}`}
                    className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-3 text-sm font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    Read Our Full Hands-On Review
                  </Link>
                )}
              </div>
            </div>
          </Container>
        </Section>

        {/* ── Editorial Score Bar (full-width accent) ── */}
        {product.editorialScore > 0 && (
          <Section variant="muted" className="py-4">
            <Container>
              <div className="max-w-sm">
                <EditorialScore score={product.editorialScore} />
              </div>
            </Container>
          </Section>
        )}

        {/* ── Content Sections ── */}
        <Section variant="white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content column */}
              <div className="lg:col-span-2 space-y-12">

                {/* Overview */}
                <div className="space-y-4">
                  <SectionHeading icon={Info} title="Overview" id="overview" />
                  <p className="text-sm text-neutral-700 leading-relaxed">{product.description}</p>
                  {product.aiSummary && product.aiSummary !== product.description && (
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-5 space-y-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                        <Sparkles className="h-3.5 w-3.5" />
                        Editorial Summary
                      </div>
                      <p className="text-sm text-neutral-700 leading-relaxed">{product.aiSummary}</p>
                    </div>
                  )}
                </div>

                {/* Key Features */}
                {hasFeatures && (
                  <div className="space-y-4">
                    <SectionHeading icon={Zap} title="Key Features" id="features" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features!.map((f) => (
                        <div
                          key={f.id}
                          className="flex items-start gap-3 rounded-xl border border-neutral-100 bg-neutral-50 p-4"
                        >
                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          </span>
                          <div className="space-y-0.5">
                            <p className="text-xs font-extrabold text-neutral-900">{f.name}</p>
                            <p className="text-xs text-neutral-500 leading-snug">{f.value}</p>
                            {f.description && (
                              <p className="text-[10px] text-neutral-400 leading-snug">{f.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pros & Cons */}
                {(hasPros || hasCons) && (
                  <div className="space-y-4">
                    <SectionHeading icon={Layers} title="Pros & Cons" id="pros-cons" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {hasPros && (
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/20 p-5 space-y-3">
                          <h3 className="flex items-center gap-2 text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                            <ThumbsUp className="h-4 w-4 text-emerald-500" />
                            What We Loved
                          </h3>
                          <ul className="space-y-2">
                            {product.pros.map((pro, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {hasCons && (
                        <div className="rounded-xl border border-rose-100 bg-rose-50/20 p-5 space-y-3">
                          <h3 className="flex items-center gap-2 text-xs font-extrabold text-rose-800 uppercase tracking-wider">
                            <ThumbsDown className="h-4 w-4 text-rose-500" />
                            Areas for Improvement
                          </h3>
                          <ul className="space-y-2">
                            {product.cons.map((con, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                                <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Who Is It For / Who Should Avoid */}
                {product.editorial && (
                  <div className="space-y-4">
                    <SectionHeading icon={Award} title="Is This Right for You?" id="who-for" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.editorial.bestFor && (
                        <div className="rounded-xl border border-emerald-100 bg-white p-5 space-y-2">
                          <h3 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                            ✓ Best For
                          </h3>
                          <p className="text-sm text-neutral-700 leading-relaxed">
                            {product.editorial.bestFor}
                          </p>
                        </div>
                      )}
                      {product.editorial.notBestFor && (
                        <div className="rounded-xl border border-rose-100 bg-white p-5 space-y-2">
                          <h3 className="text-xs font-extrabold text-rose-700 uppercase tracking-wider">
                            ✗ Not Ideal For
                          </h3>
                          <p className="text-sm text-neutral-700 leading-relaxed">
                            {product.editorial.notBestFor}
                          </p>
                        </div>
                      )}
                    </div>
                    {product.editorial.buyingAdvice && (
                      <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-5 space-y-2">
                        <h3 className="text-xs font-extrabold text-neutral-600 uppercase tracking-wider">
                          💡 Buying Advice
                        </h3>
                        <p className="text-sm text-neutral-700 leading-relaxed">
                          {product.editorial.buyingAdvice}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Editorial Verdict */}
                {product.editorial?.verdict && (
                  <div className="space-y-4">
                    <SectionHeading icon={Award} title="Editorial Verdict" id="verdict" />
                    <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-emerald-600" />
                        <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">
                          Our Recommendation
                        </span>
                        {product.editorial.recommendation && (
                          <span className="ml-auto inline-flex items-center rounded-full bg-emerald-600 px-3 py-0.5 text-[10px] font-extrabold text-white uppercase tracking-wide">
                            {product.editorial.recommendation}
                          </span>
                        )}
                      </div>
                      <blockquote className="text-sm text-neutral-800 leading-relaxed font-medium border-l-2 border-emerald-300 pl-4">
                        {product.editorial.verdict}
                      </blockquote>
                    </div>
                  </div>
                )}

                {/* Specifications Table */}
                {hasSpecs && (
                  <div className="space-y-4">
                    <SectionHeading icon={Layers} title="Full Specifications" id="specs" />
                    <div className="overflow-hidden rounded-xl border border-neutral-100">
                      <table className="w-full text-xs" aria-label={`${product.title} specifications`}>
                        <tbody className="divide-y divide-neutral-50">
                          {product.specificationsList!.map((spec) => (
                            <tr key={spec.id} className="odd:bg-neutral-50/50 even:bg-white hover:bg-emerald-50/30 transition-colors">
                              <td className="px-4 py-3 font-semibold text-neutral-500 w-40 lg:w-52 shrink-0 align-top capitalize">
                                {spec.group && (
                                  <span className="block text-[10px] font-bold text-neutral-300 uppercase tracking-wider mb-0.5">
                                    {spec.group}
                                  </span>
                                )}
                                {spec.key}
                              </td>
                              <td className="px-4 py-3 font-semibold text-neutral-800">
                                {spec.value === "true" ? "✓ Yes" : spec.value === "false" ? "✗ No" : spec.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* FAQ */}
                {faqs.length > 0 && (
                  <div className="space-y-4">
                    <SectionHeading icon={HelpCircle} title="Frequently Asked Questions" id="faq" />
                    <dl className="space-y-4">
                      {faqs.map((faq, i) => (
                        <div key={i} className="rounded-xl border border-neutral-100 p-5 space-y-2">
                          <dt className="text-sm font-bold text-neutral-900">{faq.q}</dt>
                          <dd className="text-sm text-neutral-600 leading-relaxed">{faq.a}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>

              {/* ── Sidebar ── */}
              <aside className="space-y-6">
                {/* Sticky CTA */}
                <div className="sticky top-24 space-y-6">
                  <AffiliateCTA
                    buyUrl={product.buyUrl}
                    asin={product.asin}
                    price={product.price}
                    currency={product.currency}
                    marketplace={product.marketplace}
                    variant="primary"
                  />

                  {/* Quick Spec summary */}
                  {hasSpecs && (
                    <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4 space-y-3">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                        Quick Specs
                      </span>
                      <dl className="space-y-2">
                        {product.specificationsList!.slice(0, 6).map((spec) => (
                          <div key={spec.id} className="flex justify-between gap-2 text-[11px]">
                            <dt className="font-semibold text-neutral-500 truncate capitalize">{spec.key}</dt>
                            <dd className="font-bold text-neutral-800 text-right shrink-0">
                              {spec.value === "true" ? "Yes" : spec.value === "false" ? "No" : spec.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      {product.specificationsList!.length > 6 && (
                        <a
                          href="#specs"
                          className="focus-ring block text-center text-[10px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                          View all {product.specificationsList!.length} specs ↓
                        </a>
                      )}
                    </div>
                  )}

                  {/* Compare CTA */}
                  <Link
                    href="/compare"
                    className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-xs font-bold text-neutral-700 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                  >
                    <Layers className="h-4 w-4" />
                    Compare with Alternatives
                  </Link>
                </div>
              </aside>
            </div>
          </Container>
        </Section>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <Section variant="muted">
            <Container className="space-y-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                    You Might Also Like
                  </span>
                  <h2 className="text-2xl font-bold text-neutral-900 font-display">
                    Related Products
                  </h2>
                </div>
                {product.category && (
                  <Link
                    href={`/categories/${product.category.slug}`}
                    className="group inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors focus-ring rounded"
                  >
                    Browse all in {product.category.name}
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((rp) => (
                  <ProductCard key={rp.id} product={rp} />
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* ── Related Guides ── */}
        {relatedGuides.length > 0 && (
          <Section variant="white">
            <Container className="space-y-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                    Do Your Research
                  </span>
                  <h2 className="text-2xl font-bold text-neutral-900 font-display">
                    Related Buying Guides
                  </h2>
                </div>
                <Link
                  href="/buying-guides"
                  className="group inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors focus-ring rounded"
                >
                  All Guides
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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
      </div>
    </>
  );
}

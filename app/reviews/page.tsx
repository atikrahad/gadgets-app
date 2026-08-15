import { Metadata } from "next";
import Link from "next/link";
import { getReviews } from "@/lib/services/review";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ReviewCard } from "@/components/review/review-card";
import { Star, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Hands-On Product Reviews | GearCurator",
  description:
    "Independent, hands-on reviews of workspace gear, specialty coffee, and audiophile audio equipment — tested for weeks, rated honestly.",
  alternates: { canonical: "https://gearcurator.com/reviews" },
  openGraph: {
    title: "Hands-On Product Reviews | GearCurator",
    description: "Real-world testing. Honest ratings. No sponsored bias.",
    url: "https://gearcurator.com/reviews",
    type: "website",
  },
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Reviews" },
  ];

  return (
    <div className="space-y-4">
      <Section variant="white" className="pt-6 pb-0">
        <Container className="space-y-5">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-100 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-[10px] font-bold text-amber-700 uppercase tracking-widest">
                <Star className="h-3.5 w-3.5" />
                Editorial Reviews
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 font-display leading-tight">
                Hands-On Product Reviews
              </h1>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-xl">
                We spend weeks testing each product in real-world conditions. Every review includes an independent rating, pros and cons, and a clear verdict — no sponsored fluff.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3">
              <Clock className="h-4 w-4 text-neutral-400" />
              <span className="text-xs font-bold text-neutral-600">
                {reviews.length} review{reviews.length !== 1 ? "s" : ""} published
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Review list */}
            <div className="lg:col-span-2 space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-neutral-200 bg-white p-12 text-center">
                  <p className="text-sm font-semibold text-neutral-500">
                    No reviews published yet. Check back soon.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-5 sticky top-24">
              <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-2xs space-y-4">
                <h2 className="text-xs font-extrabold text-neutral-900 uppercase tracking-widest">
                  Our Review Process
                </h2>
                <ul className="space-y-3">
                  {[
                    "Minimum 4 weeks of daily use",
                    "Blind scoring — no brand influence",
                    "Real-world test conditions",
                    "Compared against direct alternatives",
                    "Updated if product changes",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[10px] font-extrabold text-emerald-700">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5 space-y-3">
                <h2 className="text-xs font-extrabold text-neutral-900 uppercase tracking-widest">
                  Need to compare?
                </h2>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  View side-by-side comparisons to find which product fits your exact needs.
                </p>
                <Link
                  href="/compare"
                  className="focus-ring inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Go to Comparisons
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-2xs space-y-3">
                <h2 className="text-xs font-extrabold text-neutral-900 uppercase tracking-widest">
                  Looking for advice?
                </h2>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Our buying guides break down exactly what to look for in a product category.
                </p>
                <Link
                  href="/buying-guides"
                  className="focus-ring inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Browse Buying Guides
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}

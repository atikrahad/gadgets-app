import { Metadata } from "next";
import Link from "next/link";
import { getBuyingGuides } from "@/lib/services/buying-guide";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { GuideCard } from "@/components/buying-guide/guide-card";
import { ArrowRight, BookOpen, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Expert Buying Guides | GearCurator",
  description:
    "In-depth buying guides for workspace furniture, specialty coffee equipment, and audiophile audio gear. Researched, tested, and ranked by our editorial team.",
  alternates: { canonical: "https://gearcurator.com/buying-guides" },
  openGraph: {
    title: "Expert Buying Guides | GearCurator",
    description: "Researched buying guides — find the best products in every category.",
    url: "https://gearcurator.com/buying-guides",
    type: "website",
  },
};

export default async function BuyingGuidesPage() {
  const guides = await getBuyingGuides();

  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Buying Guides" },
  ];

  const [featured, rest] = guides.length > 0
    ? [guides[0], guides.slice(1)]
    : [null, []];

  return (
    <div className="space-y-4">
      <Section variant="white" className="pt-6 pb-0">
        <Container className="space-y-5">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-100 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                <BookOpen className="h-3.5 w-3.5" />
                Expert Guides
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 font-display leading-tight">
                Buying Guides
              </h1>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-xl">
                Not sure where to start? Our editors research, test, and rank the top options so you can make a confident decision without spending hours online.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3">
              <Lightbulb className="h-4 w-4 text-neutral-400" />
              <span className="text-xs font-bold text-neutral-600">
                {guides.length} guide{guides.length !== 1 ? "s" : ""} published
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured guide */}
      {featured && (
        <Section variant="muted" className="py-6">
          <Container>
            <div className="mb-4">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                Featured Guide
              </span>
            </div>
            <GuideCard guide={featured} variant="featured" />
          </Container>
        </Section>
      )}

      {/* Rest of guides */}
      {rest.length > 0 && (
        <Section variant="white">
          <Container className="space-y-6">
            <h2 className="text-xl font-bold text-neutral-900 font-display">All Buying Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rest.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Empty state */}
      {guides.length === 0 && (
        <Section variant="muted">
          <Container>
            <div className="rounded-2xl border border-dashed border-neutral-200 bg-white p-16 text-center space-y-3">
              <BookOpen className="h-8 w-8 text-neutral-300 mx-auto" />
              <p className="text-sm font-semibold text-neutral-500">
                No buying guides published yet. Check back soon.
              </p>
            </div>
          </Container>
        </Section>
      )}

      {/* CTA to reviews */}
      <Section variant="muted" className="py-8">
        <Container>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Want hands-on opinions?</p>
              <p className="text-lg font-extrabold text-neutral-900 font-display">Read our in-depth product reviews</p>
              <p className="text-sm text-neutral-500">Individual product ratings with detailed breakdowns.</p>
            </div>
            <Link
              href="/reviews"
              className="focus-ring inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-extrabold text-white hover:bg-emerald-700 transition-colors shrink-0"
            >
              Browse Reviews
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}

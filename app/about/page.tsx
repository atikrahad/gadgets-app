import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Heart, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Editorial Standards",
  description: "Learn about GearCurator's mission, independent testing methodology, and our strict editorial standards for product reviews.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      <Breadcrumbs items={[{ title: "About" }]} />

      <div className="space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          About GearCurator
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-3xl">
          GearCurator was founded with a simple objective: to build a trustworthy, independent space on the internet for buying recommendations. We don&apos;t accept sponsorships, and we write rigorous, hands-on reviews of workspace and technical gear that we believe in.
        </p>
      </div>

      {/* Philosophy cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-neutral-100 bg-white p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-sm text-neutral-900">100% Independent</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            We purchase or verify every item we review. Our ratings and evaluations are never influenced by manufacturer incentives.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-100 bg-white p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Heart className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-sm text-neutral-900">Reader-Supported</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            We earn affiliate fees when you purchase through our links. This allows us to remain fully independent without intrusive banner ads.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-100 bg-white p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-sm text-neutral-900">Clear Explanations</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Our reviews provide direct pros and cons, transparent specs, and explicit scores so you can scan and compare efficiently.
          </p>
        </div>
      </div>

      {/* Editorial Standards section */}
      <section id="standards" className="border-t border-neutral-100 pt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Editorial Standards</h2>
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
          We maintain a clean boundary between commerce and curation. Our writing team has years of professional experience testing, debugging, and building. If a product does not pass our baseline quality score, we don&apos;t recommend it. We keep our evaluations transparent and always link to alternative choices.
        </p>
      </section>
    </div>
  );
}

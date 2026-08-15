import { Metadata } from "next";
import Link from "next/link";
import { getComparisons } from "@/lib/services/comparison";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ArrowRight, Columns } from "lucide-react";

export const metadata: Metadata = {
  title: "Side-by-Side Gear Comparisons",
  description: "Compare technical specifications, editorial scores, pros, cons, and pricing for the top gear options side-by-side to make the right choice.",
};

export default async function ComparisonsPage() {
  const comparisons = await getComparisons();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs items={[{ title: "Compare" }]} />

      <div className="border-b border-neutral-100 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Product Comparisons
        </h1>
        <p className="mt-2 text-sm text-neutral-500 max-w-2xl leading-relaxed">
          Stuck between two options? Compare their ratings, key features, and real-world performance indicators side-by-side.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {comparisons.map((comp) => (
          <div
            key={comp.id}
            className="group rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm hover:border-neutral-200 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Columns className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emerald-600 transition-colors">
                {comp.title}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                {comp.description}
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-neutral-50 flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-400">
                {comp.products.length} Products Compared
              </span>
              <Link
                href={`/compare/${comp.slug}`}
                className="inline-flex h-8 items-center justify-center gap-1 rounded-md bg-neutral-900 px-3 text-xs font-bold text-white hover:bg-neutral-800 transition-colors"
              >
                <span>View Comparison</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

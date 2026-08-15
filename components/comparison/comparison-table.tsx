import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Star, Check, X, ExternalLink, Award, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface ComparisonTableProps {
  products: Product[];
}

export function ComparisonTable({ products }: ComparisonTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-200 p-8 text-center text-neutral-500">
        <p className="text-sm">No products selected for comparison.</p>
      </div>
    );
  }

  // Collect all unique specification keys across all products
  const allSpecKeys = Array.from(
    new Set(
      products.flatMap((p) => Object.keys(p.specifications))
    )
  );

  // Identify winner (highest rating / editorial score)
  const winnerId = products.reduce((prev, current) => {
    const prevScore = prev.editorialScore || prev.rating || 0;
    const currentScore = current.editorialScore || current.rating || 0;
    return currentScore > prevScore ? current : prev;
  }, products[0])?.id;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm">
      {/* Scroll Hint indicator for mobile */}
      <div className="block lg:hidden bg-neutral-900 text-white text-[11px] font-medium py-2 px-4 text-center">
        ← Scroll horizontally to compare all products →
      </div>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-300">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-neutral-200/80 bg-neutral-50/80">
              <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-neutral-500 w-44 sm:w-56 sticky left-0 z-20 bg-neutral-50 backdrop-blur border-r border-neutral-200/60 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                Criteria
              </th>
              {products.map((p) => {
                const isWinner = p.id === winnerId;
                return (
                  <th
                    key={p.id}
                    className={`p-4 sm:p-5 min-w-[240px] sm:min-w-[280px] max-w-[340px] align-top transition-colors ${
                      isWinner ? "bg-emerald-50/30" : ""
                    }`}
                  >
                    <div className="space-y-3">
                      {isWinner && (
                        <div className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                          <Award className="h-3.5 w-3.5" />
                          <span>Winner / Top Pick</span>
                        </div>
                      )}

                      {/* Product Thumbnail */}
                      <Link href={`/products/${p.slug}`} className="group block">
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-200/60 bg-neutral-100">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes="(max-width: 768px) 240px, 280px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <h3 className="mt-3 font-bold text-sm sm:text-base text-neutral-900 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {p.title}
                        </h3>
                      </Link>

                      <div className="text-xs text-neutral-500 font-medium">
                        {p.brand}
                      </div>

                      {/* Quick CTA */}
                      <a
                        href={p.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                      >
                        <span>Buy on Amazon</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200/60 text-xs sm:text-sm">
            {/* Editorial Recommendation / Verdict */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-neutral-900 bg-neutral-50/50 sticky left-0 z-10 border-r border-neutral-200/60 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                Editorial Verdict
              </td>
              {products.map((p) => (
                <td key={p.id} className="p-4 sm:p-5 text-neutral-700 leading-relaxed font-medium">
                  {p.editorial?.verdict || p.aiSummary}
                </td>
              ))}
            </tr>

            {/* Editorial Score & Rating */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-neutral-900 bg-neutral-50/50 sticky left-0 z-10 border-r border-neutral-200/60 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                Rating & Score
              </td>
              {products.map((p) => (
                <td key={p.id} className="p-4 sm:p-5">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900 px-2.5 py-1 text-xs font-mono font-bold text-white">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        {p.editorialScore.toFixed(1)} / 10
                      </span>
                      <span className="text-xs text-neutral-500 font-semibold">Editorial Score</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-neutral-600">
                      <span>User Rating:</span>
                      <span className="font-bold text-neutral-900">{p.rating} ★</span>
                    </div>
                  </div>
                </td>
              ))}
            </tr>

            {/* Price Row */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-neutral-900 bg-neutral-50/50 sticky left-0 z-10 border-r border-neutral-200/60 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                Price
              </td>
              {products.map((p) => (
                <td key={p.id} className="p-4 sm:p-5">
                  <span className="text-lg font-black text-neutral-900">
                    {p.price ? formatPrice(p.price, p.currency) : "Check Price"}
                  </span>
                </td>
              ))}
            </tr>

            {/* Best For Row */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-neutral-900 bg-neutral-50/50 sticky left-0 z-10 border-r border-neutral-200/60 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                Best For
              </td>
              {products.map((p) => (
                <td key={p.id} className="p-4 sm:p-5">
                  <div className="inline-flex items-start gap-1.5 rounded-lg bg-emerald-50 p-2.5 text-xs text-emerald-900 font-medium">
                    <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{p.editorial?.bestFor || p.shortDescription}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Key Features */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-neutral-900 bg-neutral-50/50 sticky left-0 z-10 border-r border-neutral-200/60 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                Key Features
              </td>
              {products.map((p) => (
                <td key={p.id} className="p-4 sm:p-5">
                  {p.features && p.features.length > 0 ? (
                    <ul className="space-y-1.5">
                      {p.features.map((feat) => (
                        <li key={feat.id} className="text-xs text-neutral-700">
                          <span className="font-semibold text-neutral-900">{feat.name}:</span> {feat.value}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-xs text-neutral-400">See specifications</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Pros Row */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-neutral-900 bg-neutral-50/50 sticky left-0 z-10 border-r border-neutral-200/60 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                Pros
              </td>
              {products.map((p) => (
                <td key={p.id} className="p-4 sm:p-5">
                  <ul className="space-y-2">
                    {p.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Cons Row */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-neutral-900 bg-neutral-50/50 sticky left-0 z-10 border-r border-neutral-200/60 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                Cons
              </td>
              {products.map((p) => (
                <td key={p.id} className="p-4 sm:p-5">
                  <ul className="space-y-2">
                    {p.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-neutral-700">
                        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Dynamic Specifications Rows */}
            {allSpecKeys.map((key) => (
              <tr key={key}>
                <td className="p-4 sm:p-5 font-bold text-neutral-900 bg-neutral-50/50 sticky left-0 z-10 border-r border-neutral-200/60 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                  {key}
                </td>
                {products.map((p) => {
                  const val = p.specifications[key];
                  return (
                    <td key={p.id} className="p-4 sm:p-5 text-neutral-700 font-medium">
                      {val === true ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                          <Check className="h-4 w-4 text-emerald-600" /> Yes
                        </span>
                      ) : val === false ? (
                        <span className="inline-flex items-center gap-1 text-red-600 font-bold">
                          <X className="h-4 w-4 text-red-500" /> No
                        </span>
                      ) : (
                        String(val ?? "—")
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Bottom CTA Row */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-neutral-900 bg-neutral-50/50 sticky left-0 z-10 border-r border-neutral-200/60 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                Affiliate Deal
              </td>
              {products.map((p) => (
                <td key={p.id} className="p-4 sm:p-5">
                  <a
                    href={p.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all hover:shadow-lg"
                  >
                    <span>View Deal on Amazon</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}


import React from "react";
import { Sparkles } from "lucide-react";
import { ProductRating } from "./product-rating";
import { cn } from "@/lib/utils";

interface VerdictCardProps extends React.HTMLAttributes<HTMLDivElement> {
  editorialScore?: number;
  verdict: string;
  recommendation?: string | null;
  bestFor?: string | null;
  notBestFor?: string | null;
}

export function VerdictCard({
  editorialScore,
  verdict,
  recommendation,
  bestFor,
  notBestFor,
  className,
  ...props
}: VerdictCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border-l-4 border-l-emerald-500 border border-neutral-100 bg-white p-6 md:p-8 shadow-sm space-y-6",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-50 pb-4">
        <div>
          <h3 className="text-xl font-bold text-neutral-900 font-display flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Editorial Verdict
          </h3>
          {recommendation && (
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mt-0.5">
              {recommendation}
            </p>
          )}
        </div>
        {editorialScore !== undefined && editorialScore > 0 && (
          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Editorial Score</span>
              <ProductRating rating={editorialScore / 2} max={5} className="mt-0.5" />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-base font-extrabold text-white">
              {editorialScore.toFixed(1)}
            </div>
          </div>
        )}
      </div>

      <p className="text-sm font-semibold text-neutral-800 leading-relaxed italic">
        &ldquo;{verdict}&rdquo;
      </p>

      {(bestFor || notBestFor) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-50 text-xs">
          {bestFor && (
            <div className="space-y-1">
              <span className="font-bold text-neutral-900 uppercase tracking-wider text-[10px] text-emerald-700 block">
                Best For
              </span>
              <p className="text-neutral-600 leading-relaxed">{bestFor}</p>
            </div>
          )}
          {notBestFor && (
            <div className="space-y-1">
              <span className="font-bold text-neutral-900 uppercase tracking-wider text-[10px] text-rose-700 block">
                Not Ideal For
              </span>
              <p className="text-neutral-600 leading-relaxed">{notBestFor}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

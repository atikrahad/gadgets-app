import React from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface AffiliateCTAProps {
  buyUrl: string;
  asin?: string | null;
  price?: number | null;
  currency?: string;
  marketplace?: string;
  variant?: "primary" | "secondary" | "compact";
  className?: string;
}

export function AffiliateCTA({
  buyUrl,
  asin,
  price,
  currency = "USD",
  marketplace = "US",
  variant = "primary",
  className,
}: AffiliateCTAProps) {
  const ukUrl = asin
    ? `https://www.amazon.co.uk/dp/${asin}/?tag=gearcuratoruk-21`
    : null;
  const caUrl = asin
    ? `https://www.amazon.ca/dp/${asin}/?tag=gearcuratorca-20`
    : null;

  if (variant === "compact") {
    return (
      <a
        href={buyUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={cn(
          "focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white hover:bg-emerald-700 transition-colors shadow-sm",
          className
        )}
      >
        Check Price on Amazon
        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
      </a>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm space-y-4",
        className
      )}
    >
      {/* Price display */}
      <div className="space-y-0.5">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
          Estimated Price
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-neutral-900 font-display">
            {price ? formatPrice(price, currency) : "Check Price"}
          </span>
          <span className="text-[10px] font-bold text-neutral-400 uppercase">({marketplace})</span>
        </div>
        <p className="text-[10px] text-neutral-400 leading-relaxed">
          Price may vary. Always verify the current price on Amazon before purchasing.
        </p>
      </div>

      {/* Primary CTA */}
      <a
        href={buyUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="focus-ring flex w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md"
        aria-label={`Check current price on Amazon (opens in new tab)`}
      >
        <span>Check Price on Amazon</span>
        <ExternalLink className="h-4 w-4 shrink-0" />
      </a>

      {/* Regional links */}
      {(ukUrl || caUrl) && (
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider shrink-0">
            Also on:
          </span>
          <div className="flex gap-2">
            {ukUrl && (
              <a
                href={ukUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="focus-ring inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[10px] font-bold text-neutral-600 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
              >
                Amazon UK
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {caUrl && (
              <a
                href={caUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="focus-ring inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[10px] font-bold text-neutral-600 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
              >
                Amazon CA
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Affiliate disclosure */}
      <div className="flex items-start gap-2 rounded-xl bg-neutral-50 border border-neutral-100 p-3">
        <ShieldCheck className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
        <p className="text-[10px] text-neutral-500 leading-relaxed">
          <strong className="text-neutral-600">Affiliate Disclosure:</strong> We earn a small commission if you purchase through our links at no extra cost to you. This helps fund our independent reviews.
        </p>
      </div>
    </div>
  );
}

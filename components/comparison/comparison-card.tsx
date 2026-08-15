import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Comparison } from "@/types";
import { ArrowRight, Columns } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  comparison: Comparison;
}

export function ComparisonCard({ comparison, className, ...props }: ComparisonCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-neutral-100 bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full space-y-4",
        className
      )}
      {...props}
    >
      <div className="space-y-3">
        {/* Header Metadata */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          <Columns className="h-3.5 w-3.5 text-emerald-500" />
          <span>Product Face-off</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emerald-600 transition-colors font-display leading-snug">
          <Link href={comparison?.slug ? `/compare/${comparison.slug}` : "/compare"} className="focus-ring rounded">
            {comparison?.title || "Product Comparison"}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">
          {comparison?.description}
        </p>

        {/* Compared Items mini strip */}
        <div className="flex items-center gap-2.5 pt-2">
          {comparison?.products?.slice(0, 3).map((cp, idx) => (
            <div
              key={cp?.product?.id || idx}
              className="relative h-10 w-10 rounded-lg overflow-hidden bg-neutral-50 border border-neutral-100 shrink-0"
              title={cp?.product?.title}
            >
              {cp?.product?.image && (
                <Image
                  src={cp.product.image}
                  alt={cp.product.title || "Product"}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              )}
              {cp?.rank && (
                <div className="absolute bottom-0 right-0 bg-neutral-900 text-white text-[8px] font-bold h-4 w-4 rounded-tl flex items-center justify-center">
                  #{cp.rank}
                </div>
              )}
            </div>
          ))}
          {(comparison?.products?.length || 0) > 3 && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-50 border border-neutral-100 text-[10px] font-bold text-neutral-400">
              +{(comparison?.products?.length || 0) - 3}
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-50 flex items-center justify-between">
        <Link
          href={comparison?.slug ? `/compare/${comparison.slug}` : "/compare"}
          className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 transition-colors focus-ring rounded"
        >
          View Comparison Table
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

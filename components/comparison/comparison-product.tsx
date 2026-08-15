import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { WinnerBadge } from "./winner-badge";
import { ProductRating } from "../product/product-rating";
import { ProductPrice } from "../product/product-price";
import { ProductCTA } from "../product/product-cta";
import { cn } from "@/lib/utils";

interface ComparisonProductProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  rank?: number | null;
  isWinner?: boolean;
  commentary?: string;
}

export function ComparisonProduct({
  product,
  rank,
  isWinner = false,
  commentary,
  className,
  ...props
}: ComparisonProductProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white p-5 md:p-6 transition-all shadow-sm space-y-4 relative overflow-hidden",
        isWinner ? "border-amber-300 ring-2 ring-amber-500/10" : "border-neutral-100",
        className
      )}
      {...props}
    >
      {/* Absolute background winner glow */}
      {isWinner && (
        <div className="absolute top-0 right-0 h-24 w-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
      )}

      <div className="flex flex-col sm:flex-row gap-5">
        {/* Thumbnail Image */}
        <div className="relative aspect-video sm:aspect-square w-full sm:w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-50 border border-neutral-100 shadow-2xs">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, 112px"
            className="object-cover"
          />
          {rank !== undefined && rank !== null && (
            <div className="absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white shadow-sm">
              #{rank}
            </div>
          )}
        </div>

        {/* Content details */}
        <div className="flex-grow space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{product.brand}</span>
            {isWinner && <WinnerBadge text="Best Overall" />}
          </div>

          <h4 className="text-base font-extrabold text-neutral-900 font-display leading-snug">
            <Link href={`/products/${product.slug}`} className="hover:text-emerald-600 transition-colors focus-ring rounded">
              {product.title}
            </Link>
          </h4>

          <div className="flex items-center gap-3">
            <ProductRating rating={product.rating} max={5} />
            <span className="text-neutral-200 font-light">•</span>
            <span className="text-xs font-bold text-neutral-500">
              Score: <strong className="text-neutral-800">{product.editorialScore.toFixed(1)}</strong>
            </span>
          </div>

          <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Purchase & Price Action panel */}
        <div className="sm:border-l sm:border-neutral-100 sm:pl-5 flex flex-col justify-between shrink-0 gap-4 sm:w-48 text-center sm:text-left">
          <ProductPrice price={product.price} currency={product.currency} marketplace={product.marketplace} size="md" />
          <ProductCTA buyUrl={product.buyUrl} asin={product.asin} marketplace={product.marketplace} variant="secondary" className="py-2.5 text-xs rounded-xl" />
        </div>
      </div>

      {commentary && (
        <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100/50 text-xs text-neutral-600 leading-relaxed">
          <strong className="text-neutral-900 block mb-1">Editor&apos;s Assessment:</strong>
          {commentary}
        </div>
      )}
    </div>
  );
}

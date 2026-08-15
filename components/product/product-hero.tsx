import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { ProductRating } from "./product-rating";
import { ProductPrice } from "./product-price";
import { ProductCTA } from "./product-cta";
import { ProductBadge } from "./product-badge";
import { cn } from "@/lib/utils";

interface ProductHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}

export function ProductHero({ product, className, ...props }: ProductHeroProps) {
  const primaryBadgeVariant = product.featured ? "editors-choice" : "default";

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start", className)} {...props}>
      {/* Product Image Gallery Block */}
      <div className="lg:col-span-7 space-y-4">
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 1024px) 100vw, 700px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Product Details Control Panel */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="text-neutral-300 font-light">|</span>
            <ProductBadge variant={primaryBadgeVariant} />
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 font-display leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-4">
            <ProductRating rating={product.rating} showText />
            {product.editorialScore > 0 && (
              <>
                <span className="text-neutral-200 font-light">•</span>
                <span className="text-xs font-semibold text-neutral-500">
                  Editorial Score: <strong className="text-neutral-800">{product.editorialScore.toFixed(1)}</strong>
                </span>
              </>
            )}
          </div>
        </div>

        <p className="text-sm text-neutral-600 leading-relaxed">
          {product.shortDescription || product.description}
        </p>

        <div className="p-5 rounded-2xl border border-neutral-100 bg-white shadow-2xs space-y-4">
          <ProductPrice
            price={product.price}
            currency={product.currency}
            marketplace={product.marketplace}
            size="lg"
            showDisclaimer
          />
          <ProductCTA
            buyUrl={product.buyUrl}
            asin={product.asin}
            marketplace={product.marketplace}
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
}

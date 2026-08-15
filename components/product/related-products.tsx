import React from "react";
import { ProductCard } from "./product-card";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface RelatedProductsProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
  title?: string;
}

export function RelatedProducts({ products, title = "Recommended Products", className, ...props }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className={cn("space-y-6", className)} {...props}>
      {title && (
        <h3 className="text-xl font-bold text-neutral-900 font-display">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} showReviewLink={true} />
        ))}
      </div>
    </div>
  );
}

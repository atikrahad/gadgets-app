import { Product } from "@/types";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  showReviewLinks?: boolean;
}

export function ProductGrid({ products, showReviewLinks = true }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-200 p-12 text-center text-neutral-500">
        <p className="text-sm font-medium">No products found matching the criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} showReviewLink={showReviewLinks} />
      ))}
    </div>
  );
}

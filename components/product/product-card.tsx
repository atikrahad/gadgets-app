import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Star, ExternalLink } from "lucide-react";

interface ProductCardProps {
  product: Product;
  showReviewLink?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Product Image Wrapper */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={product.isFeatured}
        />
        
        {/* Editorial Label / Badge */}
        {product.badgeLabel && (
          <div className="absolute left-3 top-3 rounded-full bg-neutral-900/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-200 backdrop-blur-md shadow-xs">
            {product.badgeLabel}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Aesthetic & Room Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.rooms && product.rooms.map((room) => (
              <span key={room.id} className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600">
                {room.name}
              </span>
            ))}
            {product.aesthetics && product.aesthetics.slice(0, 2).map((aest) => (
              <span key={aest.id} className="rounded-md bg-amber-50/80 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                #{aest.name}
              </span>
            ))}
          </div>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-base font-bold font-display tracking-tight text-neutral-900 group-hover:text-stone-700 transition-colors">
            <Link href={`/products/${product.slug}`}>
              {product.title}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
            {product.shortDescription || product.description}
          </p>
        </div>

        {/* Price & Amazon CTA */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
          <div>
            {product.price ? (
              <span className="text-base font-extrabold text-slate-900 font-display">
                {formatPrice(product.price, product.currency)}
              </span>
            ) : (
              <span className="text-xs font-medium text-slate-400">Curated Tech</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Details
            </Link>
            <a
              href={product.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-3.5 text-[11px] font-bold text-white hover:from-emerald-500 hover:to-teal-500 transition-all shadow-sm shadow-emerald-600/20"
            >
              <span>Get Product</span>
              <ExternalLink className="h-3 w-3 text-emerald-200" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


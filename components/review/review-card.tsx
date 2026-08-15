import Link from "next/link";
import Image from "next/image";
import { Review } from "@/types";
import { Star, Clock, User, ArrowRight } from "lucide-react";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm transition-all hover:border-neutral-200 hover:shadow-md flex flex-col md:flex-row h-full">
      {/* Product Image Panel (Left) */}
      {review.product?.image && (
        <div className="relative aspect-video md:aspect-square md:w-56 overflow-hidden bg-neutral-50 shrink-0">
          <Image
            src={review.product.image}
            alt={review.title}
            fill
            sizes="(max-width: 768px) 100vw, 250px"
            className="object-cover transition-transform duration-500 group-hover:scale-103"
          />
        </div>
      )}

      {/* Review Content Panel (Right/Main) */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase font-bold tracking-wider text-neutral-400">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {review.author?.name}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(review.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold tracking-tight text-neutral-900 group-hover:text-emerald-600 transition-colors leading-snug">
            <Link href={`/reviews/${review.slug}`}>
              {review.title}
            </Link>
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-xs font-semibold text-neutral-700">Rating: {review.rating.toFixed(1)} / 5</span>
          </div>

          {/* Excerpt */}
          <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">
            {review.excerpt}
          </p>
        </div>

        {/* Action Link */}
        <div className="mt-6 pt-4 border-t border-neutral-50 flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 transition-colors">
            Read Full Review
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

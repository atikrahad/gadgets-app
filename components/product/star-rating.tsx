import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number; // 0–5
  maxRating?: number;
  reviewCount?: number | null;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  reviewCount,
  size = "md",
  showValue = true,
  className,
}: StarRatingProps) {
  const filled = Math.round(rating);
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4.5 w-4.5",
    lg: "h-5 w-5",
  };
  const textClasses = {
    sm: "text-[11px]",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              i < filled ? "fill-amber-400 text-amber-400" : "text-neutral-200 fill-neutral-200"
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className={cn("font-bold text-neutral-700", textClasses[size])}>
          {rating.toFixed(1)}
          <span className="font-normal text-neutral-400"> / {maxRating}</span>
        </span>
      )}
      {reviewCount != null && (
        <span className={cn("text-neutral-400", textClasses[size])}>
          ({reviewCount.toLocaleString()} {reviewCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}

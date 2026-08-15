import React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  max?: number;
  showText?: boolean;
}

export function ProductRating({ rating, max = 5, showText = true, className, ...props }: ProductRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const roundedRating = Math.round(rating * 10) / 10;
  
  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role="img"
      aria-label={`Rated ${roundedRating} out of ${max} stars`}
      {...props}
    >
      <div className="flex items-center gap-0.5 text-amber-500">
        {Array.from({ length: max }).map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className="h-4 w-4 fill-current shrink-0" aria-hidden="true" />;
          }
          if (i === fullStars && hasHalf) {
            return <StarHalf key={i} className="h-4 w-4 fill-current shrink-0" aria-hidden="true" />;
          }
          return <Star key={i} className="h-4 w-4 text-neutral-200 shrink-0" aria-hidden="true" />;
        })}
      </div>
      {showText && (
        <span className="text-xs font-bold text-neutral-600 leading-none">
          {roundedRating} / {max}
        </span>
      )}
    </div>
  );
}

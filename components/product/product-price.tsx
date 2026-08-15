import React from "react";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductPriceProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number | null;
  currency?: string;
  marketplace?: string;
  size?: "sm" | "md" | "lg";
  showDisclaimer?: boolean;
}

export function ProductPrice({
  price,
  currency = "USD",
  marketplace = "US",
  size = "md",
  showDisclaimer = false,
  className,
  ...props
}: ProductPriceProps) {
  if (price === null) {
    return (
      <div className={cn("text-neutral-500 font-semibold", size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm")} {...props}>
        Check Price
      </div>
    );
  }

  const formatted = formatPrice(price, currency);

  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      <div className="flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-extrabold tracking-tight text-neutral-900 font-display",
            size === "sm" && "text-sm",
            size === "md" && "text-xl",
            size === "lg" && "text-3xl"
          )}
        >
          {formatted}
        </span>
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          ({marketplace})
        </span>
      </div>
      {showDisclaimer && (
        <span className="text-[9px] text-neutral-400 leading-normal">
          *Price estimated. Subject to change.
        </span>
      )}
    </div>
  );
}

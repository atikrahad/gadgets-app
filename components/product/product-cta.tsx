import React from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCTAProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  buyUrl: string;
  asin?: string | null;
  marketplace?: string;
  variant?: "primary" | "secondary" | "outline";
  text?: string;
  showDisclaimer?: boolean;
}

export function ProductCTA({
  buyUrl,
  variant = "primary",
  text,
  showDisclaimer = true,
  className,
  ...props
}: ProductCTAProps) {
  const defaultText = variant === "primary" ? "Check Price on Amazon" : "View Deal";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <a
        href={buyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "focus-ring inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold transition-all duration-200 uppercase tracking-wider text-center shadow-xs",
          variant === "primary" && "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md",
          variant === "secondary" && "bg-neutral-900 text-white hover:bg-neutral-850 hover:shadow-md",
          variant === "outline" && "bg-transparent text-neutral-800 border border-neutral-200 hover:bg-neutral-50",
          className
        )}
        {...props}
      >
        <span>{text || defaultText}</span>
        <ExternalLink className="h-4 w-4 shrink-0" />
      </a>
      {showDisclaimer && (
        <span className="text-[10px] text-neutral-400 text-center leading-relaxed">
          As an Amazon Associate we earn from qualifying purchases.
        </span>
      )}
    </div>
  );
}

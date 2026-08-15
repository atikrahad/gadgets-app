import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseHref: string; // e.g. /categories/home-office?brand=sony
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseHref,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const url = new URL(baseHref, "https://x.com");
    url.searchParams.set("page", String(page));
    return `${url.pathname}?${url.searchParams.toString()}`;
  };

  // Generate visible page numbers (max 5 slots)
  const pages: (number | "ellipsis")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      {/* Prev */}
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          scroll={false}
          className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:border-emerald-300 hover:text-emerald-600 transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-100 bg-neutral-50 text-neutral-300 cursor-not-allowed">
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {pages.map((p, idx) =>
        p === "ellipsis" ? (
          <span
            key={`ellipsis-${idx}`}
            className="inline-flex h-9 w-9 items-center justify-center text-xs text-neutral-400"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            scroll={false}
            className={cn(
              "focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-colors border",
              p === currentPage
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white text-neutral-600 border-neutral-200 hover:border-emerald-300 hover:text-emerald-600"
            )}
            aria-label={`Page ${p}`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          scroll={false}
          className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:border-emerald-300 hover:text-emerald-600 transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-100 bg-neutral-50 text-neutral-300 cursor-not-allowed">
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}

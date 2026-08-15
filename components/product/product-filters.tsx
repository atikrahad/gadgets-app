"use client";

import React, { useCallback, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  brands: string[];
  currentBrand?: string;
  currentRating?: number;
  currentSort?: string;
  totalProducts: number;
  className?: string;
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured First" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const RATING_OPTIONS = [
  { value: 4, label: "4★ & above" },
  { value: 3, label: "3★ & above" },
];

export function ProductFilters({
  brands,
  currentBrand,
  currentRating,
  currentSort,
  totalProducts,
  className,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      // Always reset to page 1 when a filter changes
      params.delete("page");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams]
  );

  const clearAllFilters = useCallback(() => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  }, [router, pathname]);

  const hasActiveFilters = !!(currentBrand || currentRating || (currentSort && currentSort !== "featured"));

  return (
    <aside
      className={cn(
        "rounded-2xl border border-neutral-100 bg-white p-5 shadow-2xs space-y-6",
        isPending && "opacity-60 pointer-events-none transition-opacity duration-200",
        className
      )}
      aria-label="Product filters"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-extrabold text-neutral-900 font-display uppercase tracking-wider">
          <SlidersHorizontal className="h-4 w-4 text-emerald-500" />
          Filter Products
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="focus-ring inline-flex items-center gap-1 rounded-full text-[10px] font-bold text-neutral-500 hover:text-rose-500 transition-colors px-2 py-1"
            aria-label="Clear all filters"
          >
            <X className="h-3 w-3" />
            Clear All
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="space-y-2.5">
        <label
          htmlFor="sort-select"
          className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest"
        >
          Sort By
        </label>
        <div className="relative">
          <select
            id="sort-select"
            value={currentSort || "featured"}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="focus-ring w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 pr-8 text-xs font-semibold text-neutral-800 cursor-pointer hover:border-emerald-300 transition-colors"
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
        </div>
      </div>

      {/* Brand Filter */}
      {brands.length > 0 && (
        <div className="space-y-2.5">
          <p className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            Brand
          </p>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => updateParam("brand", null)}
              className={cn(
                "focus-ring text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors",
                !currentBrand
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  : "text-neutral-600 hover:bg-neutral-50"
              )}
            >
              All Brands
            </button>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => updateParam("brand", currentBrand === brand ? null : brand)}
                className={cn(
                  "focus-ring text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors",
                  currentBrand === brand
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                    : "text-neutral-600 hover:bg-neutral-50"
                )}
                aria-pressed={currentBrand === brand}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Rating Filter */}
      <div className="space-y-2.5">
        <p className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
          Min. Rating
        </p>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => updateParam("rating", null)}
            className={cn(
              "focus-ring text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors",
              !currentRating
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                : "text-neutral-600 hover:bg-neutral-50"
            )}
          >
            Any Rating
          </button>
          {RATING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                updateParam("rating", currentRating === opt.value ? null : String(opt.value))
              }
              className={cn(
                "focus-ring text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors",
                currentRating === opt.value
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  : "text-neutral-600 hover:bg-neutral-50"
              )}
              aria-pressed={currentRating === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-neutral-100 text-[10px] text-neutral-400 text-center">
        {totalProducts} product{totalProducts !== 1 ? "s" : ""} found
      </div>
    </aside>
  );
}

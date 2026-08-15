"use client";

import React, { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductFilters } from "./product-filters";

interface ProductFiltersMobileProps {
  brands: string[];
  currentBrand?: string;
  currentRating?: number;
  currentSort?: string;
  totalProducts: number;
}

export function ProductFiltersMobile(props: ProductFiltersMobileProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="focus-ring inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-bold text-neutral-700 hover:border-emerald-300 hover:text-emerald-700 transition-colors shadow-2xs"
        aria-expanded={open}
        aria-controls="mobile-filters-panel"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters & Sort
        {(props.currentBrand || props.currentRating || props.currentSort) && (
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
            •
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <aside
        id="mobile-filters-panel"
        role="dialog"
        aria-label="Product filters"
        aria-modal="true"
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[90vw] overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
          <span className="text-sm font-extrabold text-neutral-900 font-display">
            Filters & Sort
          </span>
          <button
            onClick={() => setOpen(false)}
            className="focus-ring rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 transition-colors"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <ProductFilters {...props} />
        </div>
      </aside>
    </>
  );
}

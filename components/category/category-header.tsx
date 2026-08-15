import React from "react";
import Link from "next/link";
import { Category } from "@/types";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  category: Category;
  childCategories?: Category[];
}

export function CategoryHeader({
  category,
  childCategories = [],
  className,
  ...props
}: CategoryHeaderProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-neutral-100 bg-white p-6 md:p-8 shadow-sm space-y-6 overflow-hidden relative",
        className
      )}
      {...props}
    >
      {/* Editorial glowing circle mesh background */}
      <div className="absolute right-0 top-0 h-48 w-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="space-y-3 max-w-2xl relative z-10">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          <Link href="/categories" className="hover:text-emerald-600 transition-colors focus-ring rounded">
            Categories
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-neutral-500">{category.name}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 font-display">
          {category.name}
        </h1>

        {category.description && (
          <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
            {category.description}
          </p>
        )}
      </div>

      {/* Child Subcategories display */}
      {childCategories.length > 0 && (
        <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-3 relative z-10">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mr-1">
            Subcategories:
          </span>
          {childCategories.map((child) => (
            <Link
              key={child.id}
              href={`/categories/${child.slug}`}
              className="inline-flex items-center rounded-xl bg-neutral-50 border border-neutral-100 hover:border-emerald-200 hover:bg-emerald-50/20 px-3.5 py-1.5 text-xs font-bold text-neutral-600 hover:text-emerald-700 transition-all focus-ring"
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

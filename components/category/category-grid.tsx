import React from "react";
import { CategoryCard } from "./category-card";
import { Category } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[];
}

export function CategoryGrid({ categories, className, ...props }: CategoryGridProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
      {...props}
    >
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

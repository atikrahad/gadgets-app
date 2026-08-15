import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative block aspect-16/10 overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-100 shadow-sm transition-all hover:shadow-md"
    >
      {/* Background Image */}
      {category.image && (
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-103"
        />
      )}

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* Details Container */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white">
        <h3 className="text-xl font-bold tracking-tight mb-2 flex items-center gap-1.5 group-hover:text-emerald-300 transition-colors">
          <span>{category.name}</span>
          <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
        </h3>
        {category.description && (
          <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  );
}

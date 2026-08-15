import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Author, Category } from "@/types";
import { Clock, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  excerpt: string;
  category?: Category | null;
  author?: Author | null;
  publishedAt: Date;
  readTime?: string;
}

export function ArticleHeader({
  title,
  excerpt,
  category,
  author,
  publishedAt,
  readTime = "5 min read",
  className,
  ...props
}: ArticleHeaderProps) {
  return (
    <div className={cn("space-y-6 max-w-3xl", className)} {...props}>
      {category && (
        <Link
          href={`/categories/${category.slug}`}
          className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 border border-emerald-100 hover:bg-emerald-100 transition-colors"
        >
          {category.name}
        </Link>
      )}

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 font-display leading-tight">
        {title}
      </h1>

      <p className="text-base md:text-lg text-neutral-500 leading-relaxed font-medium">
        {excerpt}
      </p>

      <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-400 font-bold uppercase tracking-wider border-y border-neutral-100 py-4">
        {author && (
          <div className="flex items-center gap-2">
            {author.avatar ? (
              <div className="relative h-6 w-6 overflow-hidden rounded-full border border-neutral-200">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
            ) : (
              <User className="h-4 w-4" />
            )}
            <span>By {author.name}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>
            {new Date(publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  );
}

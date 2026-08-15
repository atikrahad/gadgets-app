import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RelatedArticlesProps extends React.HTMLAttributes<HTMLDivElement> {
  articles: BlogPost[];
  title?: string;
}

export function RelatedArticles({ articles, title = "Related Articles", className, ...props }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className={cn("space-y-6", className)} {...props}>
      {title && (
        <h3 className="text-xl font-bold text-neutral-900 font-display">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.slice(0, 2).map((post) => (
          <article
            key={post.id}
            className="group flex flex-col md:flex-row gap-4 overflow-hidden rounded-2xl border border-neutral-100 bg-white p-4 shadow-2xs hover:shadow-xs transition-shadow h-full"
          >
            {post.image && (
              <div className="relative aspect-video md:aspect-square w-full md:w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-50">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                />
              </div>
            )}
            <div className="flex flex-col justify-between flex-grow space-y-2">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                  <Clock className="h-3 w-3" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-emerald-600 transition-colors leading-snug line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="focus-ring rounded">
                    {post.title}
                  </Link>
                </h4>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="text-[10px] font-bold text-emerald-600 group-hover:text-emerald-700 inline-flex items-center gap-0.5 mt-2"
              >
                Read Article <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

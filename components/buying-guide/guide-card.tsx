import Link from "next/link";
import Image from "next/image";
import { BuyingGuide } from "@/types";
import { Clock, Tag, ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuideCardProps {
  guide: BuyingGuide;
  /** "featured" renders a wider horizontal hero layout; default is the standard card */
  variant?: "default" | "featured";
}

export function GuideCard({ guide, variant = "default" }: GuideCardProps) {
  const heroImage = guide.featuredImage || guide.image;

  if (variant === "featured") {
    return (
      <article className="group overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm hover:border-emerald-200 hover:shadow-md transition-all">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          {heroImage && (
            <div className="relative aspect-video md:aspect-auto md:min-h-64 overflow-hidden bg-neutral-50">
              <Image
                src={heroImage}
                alt={guide.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          {/* Content */}
          <div className="p-8 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                <BookOpen className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-600">Buying Guide</span>
                <span className="text-neutral-300">•</span>
                <Tag className="h-3 w-3" />
                <span>{guide.products.length} Products</span>
              </div>

              <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900 group-hover:text-emerald-700 transition-colors leading-tight font-display">
                <Link href={`/buying-guides/${guide.slug}`} className="focus-ring">
                  {guide.title}
                </Link>
              </h3>

              <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">{guide.excerpt}</p>
            </div>

            <div className="flex items-center justify-between border-t border-neutral-50 pt-4">
              <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                <Clock className="h-3 w-3" />
                {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <Link
                href={`/buying-guides/${guide.slug}`}
                className="focus-ring inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white hover:bg-emerald-700 transition-colors"
              >
                Read Guide
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all hover:border-neutral-200 hover:shadow-md flex flex-col h-full"
      )}
    >
      {/* Feature Banner */}
      {heroImage && (
        <div className="relative aspect-16/9 w-full overflow-hidden bg-neutral-50">
          <Image
            src={heroImage}
            alt={guide.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Details Section */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-neutral-400">
            <Clock className="h-3 w-3" />
            <span>
              {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-neutral-300">•</span>
            <Tag className="h-3 w-3" />
            <span>{guide.products.length} Products Curated</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-emerald-600 transition-colors leading-snug">
            <Link href={`/buying-guides/${guide.slug}`} className="focus-ring">
              {guide.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">{guide.excerpt}</p>
        </div>

        {/* Action button */}
        <div className="pt-4 border-t border-neutral-50 flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 transition-colors">
            View Buying Guide
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

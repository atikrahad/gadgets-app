import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
  className?: string;
}

export function ProductImageGallery({ images, title, className }: ProductImageGalleryProps) {
  const primary = images[0] || "/placeholder-product.jpg";
  const thumbs = images.slice(1, 5); // max 4 thumbnails

  return (
    <div className={cn("space-y-3", className)}>
      {/* Primary image */}
      <div className="relative aspect-[4/3] md:aspect-square w-full overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50 shadow-sm">
        <Image
          src={primary}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 550px"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail strip */}
      {thumbs.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {thumbs.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50 hover:border-emerald-300 transition-colors cursor-pointer"
            >
              <Image
                src={src}
                alt={`${title} — photo ${i + 2}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { Author } from "@/types";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  author: Author;
}

export function AuthorCard({ author, className, ...props }: AuthorCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5",
        className
      )}
      {...props}
    >
      {/* Avatar Container */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-neutral-100 shadow-2xs">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-50 text-neutral-400">
            <User className="h-8 w-8" />
          </div>
        )}
      </div>

      {/* Author Bio details */}
      <div className="space-y-2 text-center sm:text-left">
        <div>
          <h4 className="text-base font-extrabold text-neutral-900 font-display">
            {author.name}
          </h4>
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Verified Reviewer / Expert
          </p>
        </div>
        {author.bio && (
          <p className="text-xs text-neutral-500 leading-relaxed max-w-xl">
            {author.bio}
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TOCItem {
  id: string;
  text: string;
}

interface TableOfContentsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TOCItem[];
}

export function TableOfContents({ items, className, ...props }: TableOfContentsProps) {
  if (!items || items.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of floating header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={cn("rounded-2xl border border-neutral-100 bg-white p-5 shadow-2xs space-y-4", className)}
      aria-label="Table of contents"
      {...props}
    >
      <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
        <List className="h-4 w-4 text-emerald-500" />
        Table of Contents
      </h3>
      <ul className="space-y-2.5 text-xs font-bold text-neutral-600">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="hover:text-emerald-600 transition-colors leading-relaxed block focus-ring rounded"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

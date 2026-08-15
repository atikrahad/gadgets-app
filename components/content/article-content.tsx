import React from "react";
import { cn } from "@/lib/utils";

interface ArticleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

export function ArticleContent({ content, className, ...props }: ArticleContentProps) {
  // Simple markdown renderer for styling demo
  const renderParagraphs = (text: string) => {
    return text.split("\n\n").map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Handle Headings
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-xl font-bold text-neutral-900 mt-8 mb-3 font-display">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-2xl font-extrabold text-neutral-900 mt-10 mb-4 border-b border-neutral-100 pb-2 font-display">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }

      // Handle Unordered Lists
      if (trimmed.startsWith("- ")) {
        const listItems = trimmed.split("\n").map((li, i) => (
          <li key={i} className="ml-5 list-disc pl-1 mb-2">
            {li.replace("- ", "")}
          </li>
        ));
        return (
          <ul key={idx} className="my-4 text-sm text-neutral-600 leading-relaxed list-inside">
            {listItems}
          </ul>
        );
      }

      // Default Paragraph
      return (
        <p key={idx} className="text-sm md:text-base text-neutral-600 leading-relaxed mb-5">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className={cn("prose prose-emerald max-w-none text-neutral-700", className)} {...props}>
      {renderParagraphs(content)}
    </div>
  );
}

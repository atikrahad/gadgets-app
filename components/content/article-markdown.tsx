import React from "react";

/**
 * Renders a simple subset of Markdown into styled React elements.
 * Supports: h2, h3, h4, bullet lists, bold, and paragraphs.
 * Used by both Review and BuyingGuide detail pages.
 */
export function ArticleMarkdown({ content }: { content: string }) {
  const blocks = content.split("\n\n").filter((b) => b.trim().length > 0);

  return (
    <div className="space-y-0">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();

        if (trimmed.startsWith("#### ")) {
          return (
            <h5
              key={idx}
              id={slugify(trimmed.replace("#### ", ""))}
              className="text-base font-extrabold text-neutral-900 mt-6 mb-2 font-display"
            >
              {trimmed.replace("#### ", "")}
            </h5>
          );
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h4
              key={idx}
              id={slugify(trimmed.replace("### ", ""))}
              className="text-lg font-extrabold text-neutral-900 mt-8 mb-3 font-display"
            >
              {trimmed.replace("### ", "")}
            </h4>
          );
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h3
              key={idx}
              id={slugify(trimmed.replace("## ", ""))}
              className="text-xl font-extrabold text-neutral-900 mt-10 mb-4 pb-2 border-b border-neutral-100 font-display"
            >
              {trimmed.replace("## ", "")}
            </h3>
          );
        }

        if (trimmed.startsWith("# ")) {
          return (
            <h2
              key={idx}
              id={slugify(trimmed.replace("# ", ""))}
              className="text-2xl font-extrabold text-neutral-900 mt-12 mb-5 pb-3 border-b border-neutral-100 font-display"
            >
              {trimmed.replace("# ", "")}
            </h2>
          );
        }

        // Bullet list
        if (trimmed.match(/^[-*•]\s/m)) {
          const lines = trimmed.split("\n").filter((l) => l.trim());
          return (
            <ul key={idx} className="my-4 space-y-1.5 pl-2">
              {lines.map((line, li) => (
                <li key={li} className="flex items-start gap-2 text-sm text-neutral-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span className="leading-relaxed">{inlineFormat(line.replace(/^[-*•]\s+/, ""))}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Numbered list
        if (trimmed.match(/^\d+\.\s/m)) {
          const lines = trimmed.split("\n").filter((l) => l.trim());
          return (
            <ol key={idx} className="my-4 space-y-1.5 pl-2 list-none counter-reset-item">
              {lines.map((line, li) => (
                <li key={li} className="flex items-start gap-3 text-sm text-neutral-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[10px] font-extrabold text-emerald-700">
                    {li + 1}
                  </span>
                  <span className="leading-relaxed">{inlineFormat(line.replace(/^\d+\.\s+/, ""))}</span>
                </li>
              ))}
            </ol>
          );
        }

        // Blockquote
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote
              key={idx}
              className="my-5 border-l-4 border-emerald-300 bg-emerald-50/40 pl-5 pr-4 py-3 rounded-r-xl"
            >
              <p className="text-sm text-neutral-700 leading-relaxed italic">
                {inlineFormat(trimmed.replace(/^>\s?/gm, ""))}
              </p>
            </blockquote>
          );
        }

        return (
          <p key={idx} className="my-4 text-sm text-neutral-700 leading-relaxed">
            {inlineFormat(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

/** Render inline bold / italic markers */
function inlineFormat(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-neutral-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic text-neutral-600">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Extract heading blocks from markdown to build a table of contents */
export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  return content
    .split("\n")
    .filter((line) => line.match(/^#{1,4}\s/))
    .map((line) => {
      const level = line.match(/^(#{1,4})/)?.[1].length || 2;
      const text = line.replace(/^#{1,4}\s/, "");
      return { id: slugify(text), text, level };
    });
}

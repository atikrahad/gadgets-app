import React from "react";
import { Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  buttonText?: string;
  link?: string;
}

export function ContentCTA({
  title = "Get the Best Workspace Gear Guides",
  description = "Sign up for our newsletter to get weekly hand-curated gear guides, exclusive deals, and deep-dive product reviews directly in your inbox.",
  buttonText = "Subscribe Now",
  link = "#",
  className,
  ...props
}: ContentCTAProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-100 bg-neutral-900 text-white p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative",
        className
      )}
      {...props}
    >
      {/* Decorative backdrop mesh */}
      <div className="absolute right-0 top-0 h-40 w-40 bg-emerald-500/10 rounded-full blur-2xl" />
      <div className="absolute left-1/3 bottom-0 h-32 w-32 bg-indigo-500/10 rounded-full blur-2xl" />

      <div className="space-y-2 max-w-xl z-10 text-center md:text-left">
        <h3 className="text-xl font-bold font-display tracking-tight flex items-center justify-center md:justify-start gap-2">
          <Mail className="h-5 w-5 text-emerald-400" />
          {title}
        </h3>
        <p className="text-xs text-neutral-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="z-10 w-full md:w-auto">
        <a
          href={link}
          className="focus-ring inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-5 text-xs font-bold text-white hover:bg-emerald-600 transition-colors uppercase tracking-wider shadow-sm w-full md:w-auto"
        >
          <span>{buttonText}</span>
          <ArrowRight className="h-4 w-4 shrink-0" />
        </a>
      </div>
    </div>
  );
}

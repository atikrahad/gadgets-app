"use client";

import React, { useState } from "react";
import { FAQ as FAQType } from "@/types";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQProps extends React.HTMLAttributes<HTMLDivElement> {
  faqs: FAQType[];
  title?: string;
}

export function FAQ({ faqs, title = "Frequently Asked Questions", className, ...props }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-6 max-w-3xl", className)} {...props}>
      {title && (
        <h3 className="text-xl font-bold text-neutral-900 font-display">
          {title}
        </h3>
      )}
      <div className="divide-y divide-neutral-100 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={faq.id || idx} className="py-3.5 first:pt-1 last:pb-1">
              <button
                onClick={() => toggleFAQ(idx)}
                className="flex w-full items-start justify-between gap-4 text-left font-bold text-neutral-900 text-sm hover:text-emerald-600 transition-colors py-2 focus-ring rounded"
                aria-expanded={isOpen}
              >
                <span className="flex items-start gap-2.5 leading-snug">
                  <HelpCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-neutral-400 shrink-0 transition-transform duration-200 mt-0.5",
                    isOpen && "rotate-180 text-emerald-500"
                  )}
                />
              </button>
              
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isOpen ? "max-h-80 opacity-100 mt-2" : "max-h-0 opacity-0"
                )}
              >
                <p className="text-xs md:text-sm text-neutral-500 leading-relaxed pl-6.5 pr-4 pb-2">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

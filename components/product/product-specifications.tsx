import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductSpecificationsProps extends React.HTMLAttributes<HTMLDivElement> {
  specifications: Record<string, string | boolean>;
  title?: string;
}

export function ProductSpecifications({
  specifications,
  title = "Technical Specifications",
  className,
  ...props
}: ProductSpecificationsProps) {
  if (!specifications || Object.keys(specifications).length === 0) return null;

  return (
    <div className={cn("rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm", className)} {...props}>
      {title && (
        <h3 className="text-lg font-bold text-neutral-900 mb-4 font-display">
          {title}
        </h3>
      )}
      <div className="overflow-hidden rounded-xl border border-neutral-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-100 text-[10px] uppercase font-bold tracking-wider text-neutral-400">
              <th className="px-4 py-3">Parameter</th>
              <th className="px-4 py-3">Specification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50 text-xs">
            {Object.entries(specifications).map(([key, val]) => (
              <tr key={key} className="hover:bg-neutral-50/50 transition-colors">
                <td className="px-4 py-3.5 font-bold text-neutral-500 w-1/3">{key}</td>
                <td className="px-4 py-3.5 font-semibold text-neutral-950">
                  {typeof val === "boolean" ? (
                    val ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600">
                        <Check className="h-4 w-4" /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500">
                        <X className="h-4 w-4" /> No
                      </span>
                    )
                  ) : (
                    String(val)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

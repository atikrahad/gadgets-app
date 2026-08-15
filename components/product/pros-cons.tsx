import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProsConsProps extends React.HTMLAttributes<HTMLDivElement> {
  pros: string[];
  cons: string[];
}

export function ProsCons({ pros, cons, className, ...props }: ProsConsProps) {
  const hasPros = pros && pros.length > 0;
  const hasCons = cons && cons.length > 0;

  if (!hasPros && !hasCons) return null;

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)} {...props}>
      {/* Pros Panel */}
      {hasPros && (
        <div className="rounded-2xl border border-emerald-100/50 bg-emerald-50/20 p-6">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800 mb-4 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <Check className="h-3.5 w-3.5" />
            </span>
            Key Advantages (Pros)
          </h4>
          <ul className="space-y-3">
            {pros.map((pro, index) => (
              <li key={index} className="flex gap-2.5 text-xs text-neutral-700 leading-relaxed">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cons Panel */}
      {hasCons && (
        <div className="rounded-2xl border border-rose-100/50 bg-rose-50/20 p-6">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-rose-800 mb-4 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500/10 text-rose-600">
              <X className="h-3.5 w-3.5" />
            </span>
            Considerations (Cons)
          </h4>
          <ul className="space-y-3">
            {cons.map((con, index) => (
              <li key={index} className="flex gap-2.5 text-xs text-neutral-700 leading-relaxed">
                <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

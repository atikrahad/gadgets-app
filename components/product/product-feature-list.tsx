import React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  id?: string;
  name: string;
  value: string;
  description?: string | null;
}

interface ProductFeatureListProps extends React.HTMLAttributes<HTMLDivElement> {
  features: FeatureItem[];
  layout?: "list" | "grid";
}

export function ProductFeatureList({ features, layout = "list", className, ...props }: ProductFeatureListProps) {
  if (!features || features.length === 0) return null;

  return (
    <div
      className={cn(
        "gap-6",
        layout === "grid" ? "grid grid-cols-1 md:grid-cols-2" : "flex flex-col",
        className
      )}
      {...props}
    >
      {features.map((feature, idx) => (
        <div
          key={feature.id || idx}
          className="flex gap-3.5 p-4 rounded-xl border border-neutral-100 bg-white/50 shadow-2xs hover:shadow-xs transition-shadow"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="text-sm font-bold text-neutral-900 leading-snug">
              {feature.name}:{" "}
              <span className="font-semibold text-neutral-700">{feature.value}</span>
            </div>
            {feature.description && (
              <p className="text-xs text-neutral-500 leading-relaxed">
                {feature.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

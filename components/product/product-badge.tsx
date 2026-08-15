import React from "react";
import { Award, Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "editors-choice" | "best-value" | "premium-pick" | "default";

interface ProductBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  text?: string;
}

export function ProductBadge({ variant = "default", text, className, ...props }: ProductBadgeProps) {
  const getBadgeConfig = () => {
    switch (variant) {
      case "editors-choice":
        return {
          icon: <Award className="h-3 w-3 shrink-0" />,
          label: text || "Editor's Choice",
          classes: "bg-emerald-50 text-emerald-700 border-emerald-200/50 hover:bg-emerald-100",
        };
      case "best-value":
        return {
          icon: <Zap className="h-3 w-3 shrink-0" />,
          label: text || "Best Value",
          classes: "bg-indigo-50 text-indigo-700 border-indigo-200/50 hover:bg-indigo-100",
        };
      case "premium-pick":
        return {
          icon: <ShieldCheck className="h-3 w-3 shrink-0" />,
          label: text || "Premium Pick",
          classes: "bg-amber-50 text-amber-850 border-amber-200/50 hover:bg-amber-100",
        };
      default:
        return {
          icon: null,
          label: text || "Editorial Choice",
          classes: "bg-neutral-50 text-neutral-600 border-neutral-200/50 hover:bg-neutral-100",
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors shadow-2xs",
        config.classes,
        className
      )}
      {...props}
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
}

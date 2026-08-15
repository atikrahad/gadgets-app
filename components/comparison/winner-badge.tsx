import React from "react";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface WinnerBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
}

export function WinnerBadge({ text = "Winner / Editors Choice", className, ...props }: WinnerBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 bg-amber-500 text-white rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest shadow-sm select-none border border-amber-600/20",
        className
      )}
      {...props}
    >
      <Trophy className="h-3 w-3 shrink-0" />
      <span>{text}</span>
    </span>
  );
}

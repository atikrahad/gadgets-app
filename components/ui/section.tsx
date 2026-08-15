import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: "default" | "muted" | "white";
}

export function Section({ children, variant = "default", className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "py-12 md:py-16 lg:py-20",
        variant === "muted" && "bg-neutral-50 border-y border-neutral-100",
        variant === "white" && "bg-white border-y border-neutral-100",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

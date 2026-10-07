import type { ReactNode } from "react";
import { cn } from "./cn";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent-tint px-4 py-1.5 text-sm font-medium text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}

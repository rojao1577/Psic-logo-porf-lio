import type { ReactNode } from "react";
import { cn } from "./cn";

export function IconCircle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full bg-accent-tint text-accent",
        className,
      )}
    >
      {children}
    </div>
  );
}

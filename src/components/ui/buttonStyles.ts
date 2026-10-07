import { cn } from "./cn";

export type ButtonVariant = "solid" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  solid: "bg-accent text-white hover:bg-accent-dark",
  outline: "border border-accent text-accent hover:bg-accent hover:text-white",
};

export function buttonClasses(variant: ButtonVariant = "solid", className?: string) {
  return cn(base, variants[variant], className);
}

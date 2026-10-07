import type { AnchorHTMLAttributes } from "react";
import { buttonClasses, type ButtonVariant } from "./buttonStyles";

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
}

export function LinkButton({ variant = "solid", className, ...props }: LinkButtonProps) {
  return <a className={buttonClasses(variant, className)} {...props} />;
}

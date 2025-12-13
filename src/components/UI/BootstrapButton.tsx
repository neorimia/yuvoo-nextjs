import * as React from "react";
import { cn } from "@/lib/utils";

export interface BootstrapButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "grey";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

/**
 * Bootstrap Button Component
 *
 * Replaces shadcn/ui Button with Bootstrap `bd-btn` pattern.
 *
 * @example
 * ```tsx
 * <BootstrapButton variant="primary" onClick={handleClick}>
 *   Click me
 * </BootstrapButton>
 * ```
 */
export function BootstrapButton({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  ...props
}: BootstrapButtonProps) {
  const variantClasses = {
    primary: "",
    secondary: "bd-btn-secondary",
    outline: "bd-btn-outline",
    danger: "bd-btn-danger",
    grey: "bd-btn-grey",
  };

  const sizeClasses = {
    sm: "bd-btn-sm",
    md: "",
    lg: "bd-btn-lg",
  };

  return (
    <button
      className={cn("bd-btn", variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      <span className="bd-btn-inner">
        <span className="bd-btn-normal">{isLoading ? "Se încarcă..." : children}</span>
        <span className="bd-btn-hover">{isLoading ? "Se încarcă..." : children}</span>
      </span>
    </button>
  );
}

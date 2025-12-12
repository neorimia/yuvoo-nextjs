import * as React from "react";
import { cn } from "@/lib/utils";

export interface BootstrapAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  dismissible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
}

/**
 * Bootstrap Alert Component
 *
 * Replaces shadcn/ui Alert with Bootstrap alert pattern.
 *
 * @example
 * ```tsx
 * <BootstrapAlert variant="danger" dismissible onDismiss={handleDismiss}>
 *   Error message here
 * </BootstrapAlert>
 * ```
 */
export function BootstrapAlert({
  className,
  variant = "primary",
  dismissible = false,
  onDismiss,
  children,
  ...props
}: BootstrapAlertProps) {
  const variantClasses = {
    primary: "alert-primary",
    secondary: "alert-secondary",
    success: "alert-success",
    danger: "alert-danger",
    warning: "alert-warning",
    info: "alert-info",
  };

  return (
    <div
      className={cn(
        "alert",
        variantClasses[variant],
        dismissible && "alert-dismissible fade show",
        className
      )}
      role="alert"
      {...props}
    >
      {children}
      {dismissible && onDismiss && (
        <button type="button" className="btn-close" aria-label="Close" onClick={onDismiss} />
      )}
    </div>
  );
}

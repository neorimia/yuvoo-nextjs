import * as React from "react";
import { cn } from "@/lib/utils";

export interface BootstrapProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  min?: number;
  max?: number;
  variant?: "primary" | "success" | "info" | "warning" | "danger";
  striped?: boolean;
  animated?: boolean;
  showLabel?: boolean;
  label?: string;
}

/**
 * Bootstrap Progress Component
 *
 * Replaces shadcn/ui Progress with Bootstrap progress bar pattern.
 *
 * @example
 * ```tsx
 * <BootstrapProgress value={50} variant="primary" showLabel />
 * ```
 */
export function BootstrapProgress({
  className,
  value,
  min = 0,
  max = 100,
  variant = "primary",
  striped = false,
  animated = false,
  showLabel = false,
  label,
  ...props
}: BootstrapProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variantClasses = {
    primary: "bg-primary",
    success: "bg-success",
    info: "bg-info",
    warning: "bg-warning",
    danger: "bg-danger",
  };

  return (
    <div
      className={cn("progress", className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      {...props}
    >
      <div
        className={cn(
          "progress-bar",
          variantClasses[variant],
          striped && "progress-bar-striped",
          animated && "progress-bar-animated"
        )}
        style={{ width: `${percentage}%` }}
      >
        {showLabel && (label || `${Math.round(percentage)}%`)}
      </div>
    </div>
  );
}

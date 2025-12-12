import * as React from "react";
import { cn } from "@/lib/utils";

export interface BootstrapTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

/**
 * Bootstrap Textarea Component
 *
 * Replaces shadcn/ui Textarea with Bootstrap form-control pattern.
 *
 * @example
 * ```tsx
 * <BootstrapTextarea
 *   placeholder="Enter your message"
 *   rows={4}
 * />
 * ```
 */
export function BootstrapTextarea({ className, error, ...props }: BootstrapTextareaProps) {
  return <textarea className={cn("form-control", error && "is-invalid", className)} {...props} />;
}

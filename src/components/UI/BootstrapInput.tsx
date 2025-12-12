import * as React from "react";
import { cn } from "@/lib/utils";

export interface BootstrapInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: boolean;
  wrapperClassName?: string;
}

/**
 * Bootstrap Input Component
 *
 * Replaces shadcn/ui Input with Bootstrap `login__input` pattern.
 *
 * @example
 * ```tsx
 * <BootstrapInput
 *   type="email"
 *   placeholder="Email"
 *   icon={<EmailIcon />}
 * />
 * ```
 */
export function BootstrapInput({
  className,
  icon,
  error,
  wrapperClassName,
  ...props
}: BootstrapInputProps) {
  return (
    <div className={cn("login__input", wrapperClassName)}>
      <input className={cn(className, error && "is-invalid")} {...props} />
      {icon && <span>{icon}</span>}
    </div>
  );
}

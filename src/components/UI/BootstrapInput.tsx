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
 * Bootstrap-styled input component with support for icons and error states.
 * Uses Bootstrap `form-control` class for consistent styling.
 *
 * @example
 * ```tsx
 * <BootstrapInput
 *   type="email"
 *   placeholder="Email"
 *   icon={<EmailIcon />}
 *   error={hasError}
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
  const inputClasses = cn(
    "form-control",
    error && "is-invalid",
    icon && "ps-5", // Add left padding when icon is present
    className
  );

  return (
    <div className={cn("position-relative", wrapperClassName)}>
      {icon && (
        <span className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted">
          {icon}
        </span>
      )}
      <input className={inputClasses} {...props} />
    </div>
  );
}

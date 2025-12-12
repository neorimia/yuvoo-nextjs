import * as React from "react";
import { cn } from "@/lib/utils";

export interface BootstrapSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: Array<{ value: string; label: string }>;
}

/**
 * Bootstrap Select Component
 *
 * Replaces shadcn/ui Select with Bootstrap form-select pattern.
 * For more advanced select needs, use NiceSelect component.
 *
 * @example
 * ```tsx
 * <BootstrapSelect
 *   options={[
 *     { value: "1", label: "Option 1" },
 *     { value: "2", label: "Option 2" }
 *   ]}
 * />
 * ```
 */
export function BootstrapSelect({ className, error, options, ...props }: BootstrapSelectProps) {
  return (
    <select className={cn("form-select", error && "is-invalid", className)} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

/**
 * TimeIntervalField Component
 *
 * Reusable time interval picker component with Bootstrap styling.
 * Uses timepicker-ui-react for a better time selection experience.
 * Automatically formats the interval as "HH:MM-HH:MM" for form submission.
 *
 * Features:
 * - Start and end time selection with professional time pickers
 * - Automatic format conversion (HH:MM-HH:MM)
 * - React Hook Form integration
 * - Validation support
 * - Error display
 * - Loading states
 * - Accessibility attributes
 * - Bootstrap styling
 * - SSR compatible with Next.js
 *
 * @example
 * ```tsx
 * const { control, formState: { errors } } = useForm();
 *
 * <TimeIntervalField
 *   name="schedule.0.time"
 *   control={control}
 *   error={errors.schedule?.[0]?.time}
 *   label="Interval orar"
 *   required
 *   isLoading={isLoading}
 * />
 * ```
 *
 * The component stores the value as "17:00-18:30" format in the form,
 * but uses time pickers for better UX.
 */

"use client";

import { FieldError, Control, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamically import Timepicker to avoid SSR issues
const Timepicker = dynamic(() => import("timepicker-ui-react").then((mod) => mod.Timepicker), {
  ssr: false,
  loading: () => <div className="form-control" style={{ height: "38px" }} />,
});

interface TimeIntervalFieldProps {
  /** Field name (for React Hook Form) */
  name: string;
  /** React Hook Form control function */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  /** Validation error */
  error?: FieldError;
  /** Field label */
  label?: string;
  /** Is field required? */
  required?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Optional help text */
  helpText?: string;
  /** Optional description */
  description?: string;
  /** Optional custom class name */
  className?: string;
  /** Optional wrapper class name */
  wrapperClassName?: string;
}

/**
 * Parse time interval string (e.g., "17:00-18:30") into start and end times
 */
function parseTimeInterval(interval: string): { startTime: string; endTime: string } {
  if (!interval || !interval.includes("-")) {
    return { startTime: "", endTime: "" };
  }
  const [start, end] = interval.split("-").map((t) => t.trim());
  return { startTime: start || "", endTime: end || "" };
}

/**
 * Format start and end times into interval string (e.g., "17:00-18:30")
 */
function formatTimeInterval(startTime: string, endTime: string): string {
  if (!startTime && !endTime) return "";
  if (!startTime || !endTime) return startTime || endTime;
  return `${startTime}-${endTime}`;
}

export function TimeIntervalField({
  name,
  control,
  error,
  label = "Interval orar",
  required = false,
  isLoading = false,
  helpText,
  description,
  className = "",
  wrapperClassName = "",
}: TimeIntervalFieldProps) {
  const hasError = !!error;
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before rendering Timepicker (SSR safety)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={cn(wrapperClassName)}>
      {/* Label - only show if provided */}
      {label && (
        <label htmlFor={`${name}-start`} className="d-block text-xs fw-medium text-body mb-2">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}

      {/* Description */}
      {description && <p className="small text-secondary mb-2">{description}</p>}

      {/* Time Range Picker */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const intervalValue = field.value || "";
          const { startTime, endTime } = parseTimeInterval(intervalValue);

          // Format time from timepicker-ui data format to HH:MM string
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const formatTimeFromData = (data: any) => {
            const hour = data?.hour !== undefined ? String(data.hour).padStart(2, "0") : "00";
            const minutes =
              data?.minutes !== undefined ? String(data.minutes).padStart(2, "0") : "00";
            return `${hour}:${minutes}`;
          };

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const handleStartTimeUpdate = (data: any) => {
            const formattedTime = formatTimeFromData(data);
            const newInterval = formatTimeInterval(formattedTime, endTime);
            field.onChange(newInterval);
          };

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const handleEndTimeUpdate = (data: any) => {
            const formattedTime = formatTimeFromData(data);
            const newInterval = formatTimeInterval(startTime, formattedTime);
            field.onChange(newInterval);
          };

          return (
            <div className="d-flex align-items-start gap-3">
              {/* Start Time */}
              <div className="flex-fill">
                <label htmlFor={`${name}-start`} className="visually-hidden">
                  Ora de început
                </label>
                {isMounted ? (
                  <div className={cn("timepicker-ui", hasError && "is-invalid")}>
                    <Timepicker
                      value={startTime}
                      onUpdate={handleStartTimeUpdate}
                      disabled={isLoading}
                      className={cn("w-100", className)}
                      options={{
                        clock: {
                          type: "24h",
                          autoSwitchToMinutes: true,
                        },
                        ui: {
                          theme: "basic",
                          mobile: true,
                          cssClass: "yuvoo-timepicker",
                        },
                      }}
                      id={`${name}-start`}
                    />
                  </div>
                ) : (
                  <div className="form-control" style={{ height: "38px" }} />
                )}
                <p className="mt-1 text-xs text-secondary">De la</p>
              </div>

              {/* Separator */}
              <div className="d-flex align-items-center" style={{ paddingTop: "0.75rem" }}>
                <span className="text-muted fw-bold">-</span>
              </div>

              {/* End Time */}
              <div className="flex-fill">
                <label htmlFor={`${name}-end`} className="visually-hidden">
                  Ora de sfârșit
                </label>
                {isMounted ? (
                  <div className={cn("timepicker-ui", hasError && "is-invalid")}>
                    <Timepicker
                      value={endTime}
                      onUpdate={handleEndTimeUpdate}
                      disabled={isLoading}
                      className={cn("w-100", className)}
                      options={{
                        clock: {
                          type: "24h",
                          autoSwitchToMinutes: true,
                        },
                        ui: {
                          theme: "basic",
                          mobile: true,
                          cssClass: "yuvoo-timepicker",
                        },
                      }}
                      id={`${name}-end`}
                    />
                  </div>
                ) : (
                  <div className="form-control" style={{ height: "38px" }} />
                )}
                <p className="mt-1 text-xs text-secondary">Până la</p>
              </div>
            </div>
          );
        }}
      />

      {/* Error Message */}
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-danger" role="alert">
          {error.message}
        </p>
      )}

      {/* Help Text */}
      {!error && helpText && (
        <p id={`${name}-help`} className="mt-1 text-xs text-secondary">
          {helpText}
        </p>
      )}
    </div>
  );
}

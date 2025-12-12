/**
 * ServerErrorAlert Component
 *
 * Reusable server error display component.
 * Provides consistent error messaging across all onboarding forms.
 */

"use client";

interface ServerErrorAlertProps {
  /** Error message to display */
  error: string | null;
  /** Optional custom class name */
  className?: string;
}

export function ServerErrorAlert({ error, className = "" }: ServerErrorAlertProps) {
  if (!error) return null;

  return (
    <div
      className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <span className="text-red-500 text-xl shrink-0" aria-hidden="true">
          ⚠️
        </span>
        <div className="flex-1">
          <h4 className="font-semibold text-red-900 mb-1">Eroare</h4>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    </div>
  );
}

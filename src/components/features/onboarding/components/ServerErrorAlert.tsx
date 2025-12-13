/**
 * ServerErrorAlert Component
 *
 * Reusable server error display component.
 * Provides consistent error messaging across all onboarding forms.
 */

"use client";

import { BootstrapAlert } from "@/components/UI/bootstrap-index";
import { AlertCircle } from "lucide-react";

interface ServerErrorAlertProps {
  /** Error message to display */
  error: string | null;
  /** Optional custom class name */
  className?: string;
}

export function ServerErrorAlert({ error, className = "" }: ServerErrorAlertProps) {
  if (!error) return null;

  return (
    <BootstrapAlert variant="danger" className={className}>
      <AlertCircle className="h-4 w-4 me-2" />
      <div>
        <h4 className="fw-semibold text-danger mb-1">Eroare</h4>
        <p className="small text-danger">{error}</p>
      </div>
    </BootstrapAlert>
  );
}

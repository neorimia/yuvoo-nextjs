"use client";
/**
 * useOnboardingForm Hook
 *
 * Shared hook for onboarding form submission logic.
 * Reduces code duplication across all onboarding forms.
 * Integrates with localStorage to clear saved form data on successful submission.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clearFormData } from "./useOnboardingLocalStorage";

interface UseOnboardingFormOptions<T> {
  /** Server action to call on submit */
  onSubmitAction: (data: T) => Promise<{ success: boolean; error?: string; data?: unknown }>;
  /** Route to navigate to on success */
  onSuccessRoute: string;
  /** User role for localStorage key (e.g., "doctor", "club_admin", "parent") */
  role: string;
  /** Onboarding step number (1-based) for localStorage key */
  stepNumber: number;
  /** Optional data transformer before submission */
  transformData?: (data: T) => T;
  /** Optional callback on success */
  onSuccess?: (result: { success: boolean; data?: unknown }) => void;
  /** Optional callback on error */
  onError?: (error: string) => void;
}

export function useOnboardingForm<T>({
  onSubmitAction,
  onSuccessRoute,
  role,
  stepNumber,
  transformData,
  onSuccess,
  onError,
}: UseOnboardingFormOptions<T>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (data: T) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // Transform data if transformer provided
      const formData = transformData ? transformData(data) : data;

      const result = await onSubmitAction(formData);

      if (result.success) {
        // Clear localStorage on successful submission
        clearFormData(role, stepNumber);

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(result);
        }

        // Navigate to next step
        router.push(onSuccessRoute);
      } else {
        const errorMessage =
          result.error || "A apărut o eroare neașteptată. Te rugăm să încerci din nou.";
        setServerError(errorMessage);

        // Call error callback if provided
        if (onError) {
          onError(errorMessage);
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "A apărut o eroare neașteptată. Te rugăm să încerci din nou.";
      setServerError(errorMessage);

      // Call error callback if provided
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading,
    serverError,
    setServerError,
  };
}

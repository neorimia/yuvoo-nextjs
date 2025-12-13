"use client";
/**
 * useOnboardingForm Hook
 *
 * Shared hook for onboarding form submission logic.
 * Reduces code duplication across all onboarding forms.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UseOnboardingFormOptions<T> {
  /** Server action to call on submit */
  onSubmitAction: (data: T) => Promise<{ success: boolean; error?: string; data?: unknown }>;
  /** Route to navigate to on success */
  onSuccessRoute: string;
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

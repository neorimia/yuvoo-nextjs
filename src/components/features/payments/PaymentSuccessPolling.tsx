/**
 * Payment Success Polling Component
 *
 * Client component that polls for report access token availability.
 * Handles webhook delay by checking periodically for access token.
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";

interface PaymentSuccessPollingProps {
  quizId: string;
  paymentId: string;
  maxAttempts?: number;
  intervalMs?: number;
}

/**
 * Payment Success Polling
 *
 * Polls for report access token and redirects when available.
 */
export default function PaymentSuccessPolling({
  quizId,
  paymentId,
  maxAttempts = 10,
  intervalMs = 2000,
}: PaymentSuccessPollingProps) {
  const router = useRouter();
  const [attempts, setAttempts] = useState(0);
  const [isPolling, setIsPolling] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);

  useEffect(() => {
    if (!isPolling || attempts >= maxAttempts) {
      setIsPolling(false);
      return;
    }

    const pollForAccessToken = async () => {
      try {
        // Call API to check for access token
        const response = await fetch(`/api/payments/${paymentId}/access-token`);

        if (response.ok) {
          const data = await response.json();

          if (data.accessToken) {
            // Access token available - redirect to report
            setError(null);
            setConsecutiveErrors(0);
            router.push(routes.quiz.report(data.accessToken));
            setIsPolling(false);
            return;
          }

          // Reset error count on successful API call (even if no token yet)
          setConsecutiveErrors(0);
        } else {
          // API error - increment consecutive error count
          const newErrorCount = consecutiveErrors + 1;
          setConsecutiveErrors(newErrorCount);

          // If multiple consecutive errors, show error message
          if (newErrorCount >= 3) {
            const errorData = await response.json().catch(() => ({}));
            setError(
              errorData.error ||
                "Eroare la verificarea accesului. Te rugăm să verifici email-ul pentru link-ul către raport."
            );
          }
        }

        // Increment attempts and continue polling
        setAttempts((prev) => prev + 1);
      } catch (error) {
        console.error("[Payment Success Polling] Error:", error);
        const newErrorCount = consecutiveErrors + 1;
        setConsecutiveErrors(newErrorCount);

        // If multiple consecutive errors, show error message
        if (newErrorCount >= 3) {
          setError(
            "Eroare de conexiune. Te rugăm să verifici email-ul pentru link-ul către raport sau să reîncarci pagina."
          );
        }

        // Continue polling on error (might be temporary)
        setAttempts((prev) => prev + 1);
      }
    };

    // Initial check
    pollForAccessToken();

    // Set up interval for polling
    const interval = setInterval(() => {
      if (attempts < maxAttempts && isPolling) {
        pollForAccessToken();
      } else {
        clearInterval(interval);
        setIsPolling(false);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [quizId, paymentId, attempts, maxAttempts, intervalMs, isPolling, router, consecutiveErrors]);

  // Show error if multiple consecutive errors occurred
  if (error) {
    return (
      <div className="alert alert-warning mb-4" role="alert" aria-live="polite">
        <i className="bi bi-exclamation-triangle me-2" aria-hidden="true"></i>
        <strong>Atenție</strong>
        <p className="mb-2 mt-2">{error}</p>
        <p className="mb-0 small">
          Vei primi un email cu link-ul către raportul complet în câteva momente. Poți accesa
          raportul oricând folosind link-ul din email.
        </p>
      </div>
    );
  }

  // Show polling status
  if (isPolling && attempts < maxAttempts) {
    return (
      <div className="alert alert-info mb-4" role="alert">
        <div className="d-flex align-items-center justify-content-center">
          <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
            <span className="visually-hidden">Se procesează...</span>
          </div>
          <span>
            Se pregătește accesul la raport... ({attempts + 1}/{maxAttempts})
          </span>
        </div>
      </div>
    );
  }

  // Polling completed but no access token yet
  return (
    <div className="alert alert-warning mb-4" role="alert" aria-live="polite">
      <i className="bi bi-info-circle me-2" aria-hidden="true"></i>
      <strong>Accesul este în curs de procesare.</strong>
      <p className="mb-0 mt-2 small">
        Vei primi un email cu link-ul către raportul complet în câteva momente. Poți accesa raportul
        oricând folosind link-ul din email.
      </p>
    </div>
  );
}

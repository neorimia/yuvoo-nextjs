/**
 * Payment Form Wrapper Component
 *
 * Wraps PaymentForm with StripeProvider.
 * Creates payment intent and provides clientSecret to StripeProvider.
 */

"use client";

import { useState, useEffect } from "react";
import { StripeProvider } from "@/components/providers/StripeProvider";
import PaymentForm from "./PaymentForm";
import { createPaymentAction } from "@/app/actions/payments";
import { trackEvent } from "@/lib/analytics/tracking";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";

interface PaymentFormWrapperProps {
  quizId: string;
}

/**
 * Payment Form Wrapper
 *
 * Creates payment intent and provides StripeProvider with clientSecret.
 */
export default function PaymentFormWrapper({ quizId }: PaymentFormWrapperProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create payment intent on mount
  useEffect(() => {
    async function initializePayment() {
      try {
        setIsLoading(true);
        setError(null);

        const result = await createPaymentAction({ quizId });

        if (!result.success) {
          setError(result.error || "Eroare la inițializarea plății. Te rugăm să încerci din nou.");
          setIsLoading(false);
          return;
        }

        if (!result.clientSecret) {
          setError("Eroare: Client secret lipsă. Te rugăm să încerci din nou.");
          setIsLoading(false);
          return;
        }

        setClientSecret(result.clientSecret);

        // Track payment creation
        if (result.payment) {
          trackEvent(PostHogEvents.PAYMENT_CREATED, {
            [PostHogProperties.QUIZ_ID]: quizId,
            [PostHogProperties.PAYMENT_ID]: result.payment.id,
            [PostHogProperties.PAYMENT_AMOUNT]: result.payment.amount,
          });
        }
      } catch (err) {
        console.error("[Payment Form Wrapper] Error initializing payment:", err);
        setError("Eroare la inițializarea plății. Te rugăm să încerci din nou.");
      } finally {
        setIsLoading(false);
      }
    }

    initializePayment();
  }, [quizId]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Se încarcă...</span>
        </div>
        <p className="mt-2 text-muted">Se pregătește plata...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle me-2" aria-hidden="true"></i>
        {error}
      </div>
    );
  }

  // Render StripeProvider with clientSecret and PaymentForm
  if (!clientSecret) {
    return (
      <div className="alert alert-warning" role="alert">
        <i className="bi bi-exclamation-triangle me-2" aria-hidden="true"></i>
        Eroare: Client secret lipsă. Te rugăm să reîncărci pagina.
      </div>
    );
  }

  return (
    <StripeProvider clientSecret={clientSecret}>
      <PaymentForm quizId={quizId} initialClientSecret={clientSecret} />
    </StripeProvider>
  );
}

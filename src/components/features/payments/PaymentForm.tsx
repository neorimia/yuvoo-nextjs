/**
 * Payment Form Component
 *
 * Client component for Stripe payment processing.
 * Uses Stripe Elements for secure payment collection.
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentAction } from "@/app/actions/payments";
import { routes } from "@/lib/routes";
import { trackEvent } from "@/lib/analytics/tracking";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";

interface PaymentFormProps {
  quizId: string;
  initialClientSecret?: string;
  onPaymentCreated?: (clientSecret: string) => void;
}

/**
 * Payment Form
 *
 * Handles Stripe payment processing with Elements.
 */
export default function PaymentForm({
  quizId,
  initialClientSecret,
  onPaymentCreated,
}: PaymentFormProps) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(initialClientSecret || null);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  // If initialClientSecret is provided, use it and skip payment creation
  // Otherwise, create payment intent on mount (fallback for direct usage)
  useEffect(() => {
    // If we already have a clientSecret from props, skip creation
    if (initialClientSecret) {
      setClientSecret(initialClientSecret);
      return;
    }

    async function initializePayment() {
      try {
        setIsLoading(true);
        setError(null);

        const result = await createPaymentAction({ quizId });

        if (!result.success) {
          if ("reportAccessToken" in result && result.reportAccessToken) {
            router.replace(routes.quiz.report(result.reportAccessToken));
            return;
          }
          if ("redirectToResults" in result && result.redirectToResults && result.quizId) {
            router.replace(routes.quiz.paymentSuccess(result.quizId));
            return;
          }
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
        if (result.payment) {
          setPaymentId(result.payment.id);
        }

        // Notify parent component
        if (onPaymentCreated && result.clientSecret) {
          onPaymentCreated(result.clientSecret);
        }

        // Track payment creation
        if (result.payment) {
          trackEvent(PostHogEvents.PAYMENT_CREATED, {
            [PostHogProperties.QUIZ_ID]: quizId,
            [PostHogProperties.PAYMENT_ID]: result.payment.id,
            [PostHogProperties.PAYMENT_AMOUNT]: result.payment.amount,
          });
        }
      } catch (err) {
        console.error("[Payment Form] Error initializing payment:", err);
        setError("Eroare la inițializarea plății. Te rugăm să încerci din nou.");
      } finally {
        setIsLoading(false);
      }
    }

    initializePayment();
  }, [quizId, initialClientSecret, onPaymentCreated, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setError("Plata nu este încă pregătită. Te rugăm să aștepți.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Submit elements to validate form (required before confirmPayment)
      const { error: submitError } = await elements.submit();

      if (submitError) {
        // Form validation failed
        setError(submitError.message || "Te rugăm să completezi toate câmpurile corect.");
        setIsLoading(false);
        return;
      }

      // Step 2: Confirm payment with Stripe (after successful form submission)
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}${routes.quiz.paymentSuccess(quizId)}`,
        },
        redirect: "if_required", // Only redirect if required (3D Secure, etc.)
      });

      if (confirmError) {
        // Payment failed
        setError(confirmError.message || "Plata a eșuat. Te rugăm să încerci din nou.");
        setIsLoading(false);

        // Track payment failure
        trackEvent(PostHogEvents.PAYMENT_FAILED, {
          [PostHogProperties.QUIZ_ID]: quizId,
          [PostHogProperties.PAYMENT_ID]: paymentId || "unknown",
          error: confirmError.message || "Unknown error",
        });

        return;
      }

      // Payment succeeded
      if (paymentIntent?.status === "succeeded") {
        // Track payment completion
        trackEvent(PostHogEvents.PAYMENT_COMPLETED, {
          [PostHogProperties.QUIZ_ID]: quizId,
          [PostHogProperties.PAYMENT_ID]: paymentId || paymentIntent.id,
          [PostHogProperties.PAYMENT_AMOUNT]: paymentIntent.amount,
        });

        // Redirect to success page
        router.push(routes.quiz.paymentSuccess(quizId));
      } else {
        // Payment requires additional action (3D Secure, etc.)
        // Stripe will handle redirect automatically
        setError("Plata necesită verificare suplimentară. Vei fi redirecționat automat.");
      }
    } catch (err) {
      console.error("[Payment Form] Error processing payment:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Eroare la procesarea plății. Te rugăm să încerci din nou."
      );
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form" aria-busy={isLoading}>
      {error && (
        <div className="alert alert-danger mb-4" role="alert" aria-live="polite">
          <i className="bi bi-exclamation-triangle me-2" aria-hidden="true"></i>
          {error}
        </div>
      )}

      {isLoading && !clientSecret && !initialClientSecret && (
        <div className="text-center py-4">
          <div className="spinner-border text-yuvoo-primary" role="status">
            <span className="visually-hidden">Se încarcă...</span>
          </div>
          <p className="mt-2 text-muted">Se pregătește plata...</p>
        </div>
      )}

      {clientSecret && (
        <>
          <div className="mb-4">
            <PaymentElement />
          </div>

          <button
            type="submit"
            className="btn btn-yuvoo-primary w-100 py-3"
            disabled={!stripe || !elements || isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Se procesează plata...
              </>
            ) : (
              <>
                <i className="bi bi-lock-fill me-2"></i>
                Plătește 39 lei
              </>
            )}
          </button>

          <p className="text-center text-muted small mt-3 mb-0">
            <i className="bi bi-shield-check text-success me-1"></i>
            Plata este securizată și procesată de Stripe. Nu stocăm datele tale de card.
          </p>
        </>
      )}
    </form>
  );
}

/**
 * Stripe Provider Component
 *
 * Provides Stripe Elements context to child components.
 * Wraps payment forms with Stripe Elements provider.
 */

"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with publishable key (client-side only)
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!stripePublishableKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable is not set");
}

const stripePromise = loadStripe(stripePublishableKey);

interface StripeProviderProps {
  children: React.ReactNode;
  clientSecret?: string;
}

/**
 * Stripe Elements Provider
 *
 * Wraps payment forms with Stripe Elements context.
 * Provides Stripe instance to child components.
 */
export function StripeProvider({ children, clientSecret }: StripeProviderProps) {
  const options = clientSecret
    ? {
        clientSecret,
        appearance: {
          theme: "stripe" as const,
          variables: {
            colorPrimary: "#00BBAE",
            colorBackground: "#ffffff",
            colorText: "#1B1B1B",
            colorDanger: "#dc3545",
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            spacingUnit: "4px",
            borderRadius: "6px",
          },
        },
      }
    : undefined;

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}

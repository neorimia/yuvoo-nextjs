/**
 * Stripe Client Configuration
 *
 * Stripe payment provider integration.
 * Handles payment processing for one-time payments.
 */

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is not set");
}

/**
 * Stripe client instance
 *
 * Initialize Stripe with secret key from environment variables.
 * Uses test mode if STRIPE_SECRET_KEY starts with "sk_test_".
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

/**
 * Check if Stripe is in test mode
 */
export function isStripeTestMode(): boolean {
  return process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_") ?? false;
}

/**
 * Get Stripe publishable key
 */
export function getStripePublishableKey(): string {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable is not set");
  }
  return key;
}

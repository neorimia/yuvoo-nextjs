/**
 * Strip Stripe redirect params from URL on payment success page
 *
 * When returning from Stripe/Klarna redirect, the URL contains
 * payment_intent, payment_intent_client_secret, redirect_status.
 * Removing them on mount:
 * - Avoids leaving the client secret in the URL (security)
 * - May prevent React hook mismatch (error #310) if Stripe or shared
 *   chunk reacts to these params and changes the component tree
 */

"use client";

import { useEffect } from "react";

const STRIPE_PARAMS = ["payment_intent", "payment_intent_client_secret", "redirect_status"];

export default function StripStripeParamsFromUrl() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    let hasStripeParams = false;
    for (const key of STRIPE_PARAMS) {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key);
        hasStripeParams = true;
      }
    }
    if (hasStripeParams) {
      const cleanUrl = url.pathname + (url.search || "");
      window.history.replaceState(window.history.state, "", cleanUrl);
    }
  }, []);

  return null;
}

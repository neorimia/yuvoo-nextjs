"use client";

import React, { useEffect, useState } from "react";
import { unsubscribeWithTokenAction } from "@/app/actions/email";

interface UnsubscribeTokenHandlerProps {
  token: string;
}

/**
 * Unsubscribe Token Handler Component
 *
 * Handles token-based unsubscription from email links.
 * Automatically processes the token and shows success/error message.
 */
export default function UnsubscribeTokenHandler({ token }: UnsubscribeTokenHandlerProps) {
  const [status, setStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
    error?: string;
  }>({
    loading: true,
  });

  useEffect(() => {
    async function processUnsubscribe() {
      try {
        const result = await unsubscribeWithTokenAction(token);
        setStatus({
          loading: false,
          success: result.success,
          message: result.message,
          error: result.error,
        });
      } catch {
        setStatus({
          loading: false,
          success: false,
          error: "A apărut o eroare neașteptată. Te rugăm să încerci din nou.",
        });
      }
    }

    processUnsubscribe();
  }, [token]);

  if (status.loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-yuvoo-primary" role="status">
          <span className="visually-hidden">Se procesează...</span>
        </div>
        <p className="mt-3" style={{ color: "#424242" }}>
          Se procesează dezabonarea...
        </p>
      </div>
    );
  }

  if (status.success) {
    return (
      <div className="alert alert-success" role="alert">
        <h5 className="alert-heading">Dezabonare reușită!</h5>
        <p className="mb-0">{status.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="alert alert-danger" role="alert">
        <h5 className="alert-heading">Eroare la dezabonare</h5>
        <p className="mb-3">{status.error}</p>
        <p className="mb-0" style={{ fontSize: "14px" }}>
          Poți încerca să te dezabonezi folosind formularul de mai jos.
        </p>
      </div>
    </div>
  );
}

/**
 * Report Download Button Component
 *
 * Button to download report as PDF.
 */

"use client";

import React, { useState } from "react";
import { trackEvent } from "@/lib/analytics/tracking";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";

interface ReportDownloadButtonProps {
  accessToken: string;
  quizId: string;
}

/**
 * Report Download Button
 *
 * Downloads report as PDF from API endpoint.
 */
export default function ReportDownloadButton({ accessToken, quizId }: ReportDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Call PDF download API
      const response = await fetch(`/api/reports/${accessToken}/download`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        let errorMessage = errorData.error || "Eroare la generarea PDF-ului";

        // Provide more specific error messages based on status code
        if (response.status === 403) {
          errorMessage =
            "Acces refuzat. Te rugăm să verifici că ai acces la acest raport sau să contactezi suportul.";
        } else if (response.status === 404) {
          errorMessage = "Raportul nu a fost găsit. Te rugăm să contactezi suportul.";
        } else if (response.status === 500) {
          errorMessage =
            "Eroare la server. Te rugăm să încerci din nou în câteva momente sau să contactezi suportul.";
        } else if (response.status === 503) {
          errorMessage =
            "Serviciul este temporar indisponibil. Te rugăm să încerci din nou în câteva momente.";
        }

        setError(errorMessage);
        return;
      }

      // Get PDF blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `raport-yuvoo-${quizId.slice(0, 8)}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Track successful PDF download
      trackEvent(PostHogEvents.REPORT_ACCESSED, {
        [PostHogProperties.QUIZ_ID]: quizId,
        [PostHogProperties.ACCESS_TOKEN]: accessToken,
        pdfDownloaded: true,
      });
    } catch (error) {
      console.error("[Report Download] Error:", error);
      let errorMessage = "Eroare la descărcarea raportului. Te rugăm să încerci din nou.";

      if (error instanceof Error) {
        // Network errors
        if (error.message.includes("fetch") || error.message.includes("network")) {
          errorMessage =
            "Eroare de conexiune. Te rugăm să verifici conexiunea la internet și să încerci din nou.";
        } else if (error.message.includes("timeout")) {
          errorMessage =
            "Timpul de așteptare a expirat. Te rugăm să încerci din nou sau să contactezi suportul.";
        } else {
          // Use original message if it's already in Romanian, otherwise use generic message
          const isRomanianError =
            error.message.includes("Eroare") ||
            error.message.includes("Te rugăm") ||
            error.message.includes("Acces");
          errorMessage = isRomanianError ? error.message : errorMessage;
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        onClick={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Se pregătește...
          </>
        ) : (
          <>
            <i className="bi bi-download me-2"></i>
            Descarcă Raportul PDF
          </>
        )}
      </button>
    </div>
  );
}

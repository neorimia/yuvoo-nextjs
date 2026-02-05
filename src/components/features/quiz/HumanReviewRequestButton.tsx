/**
 * Human Review Request Button
 *
 * GDPR Art. 22 Compliance:
 * - Provides mechanism to request human review of AI-generated recommendations
 * - Creates support ticket / sends notification to Yuvoo team
 * - Records request in audit trail
 *
 * All text in Romanian as per project requirements.
 */

"use client";

import React, { useState } from "react";
import { requestHumanReviewAction } from "@/app/actions/human-review";

interface HumanReviewRequestButtonProps {
  /** Quiz ID for the review request */
  quizId: string;
  /** Optional class name for styling */
  className?: string;
  /** Button variant */
  variant?: "primary" | "outline" | "link";
  /** Show as full-width button */
  fullWidth?: boolean;
}

/**
 * HumanReviewRequestButton - GDPR Art. 22 compliant human review request
 *
 * Allows users to request human oversight of AI-generated recommendations.
 * Creates a support ticket and notifies the Yuvoo team.
 */
export function HumanReviewRequestButton({
  quizId,
  className = "",
  variant = "outline",
  fullWidth = false,
}: HumanReviewRequestButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");

  const handleRequestReview = async () => {
    if (!reason.trim()) {
      setError("Te rugăm să specifici motivul solicitării.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await requestHumanReviewAction({
        quizId,
        reason: reason.trim(),
        additionalContext: undefined, // Optional field
      });

      if (result.success && result.data) {
        setIsSubmitted(true);
        setShowModal(false);
      } else {
        setError(result.error || "Eroare la trimiterea solicitării.");
      }
    } catch (err) {
      console.error("Error requesting human review:", err);
      setError("Eroare la trimiterea solicitării. Te rugăm să încerci din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  // Button class based on variant
  const buttonClass =
    variant === "primary"
      ? "btn-yuvoo-primary"
      : variant === "link"
        ? "btn-link text-decoration-none"
        : "btn-outline-secondary";

  // If already submitted, show success state
  if (isSubmitted) {
    return (
      <div className={`human-review-success ${className}`}>
        <div className="alert alert-success d-flex align-items-center gap-2" role="alert">
          <i className="bi bi-check-circle-fill" />
          <div>
            <strong>Solicitare trimisă!</strong>
            <p className="mb-0 small">
              Echipa noastră va revizui recomandările și te va contacta în maxim 7 zile lucrătoare.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Request Button */}
      <button
        type="button"
        className={`btn ${buttonClass} ${fullWidth ? "w-100" : ""} ${className}`}
        onClick={() => setShowModal(true)}
        disabled={isLoading}
      >
        <i className="bi bi-person-lines-fill me-2" />
        Solicită Revizuire Umană
      </button>

      {/* Modal for reason input */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-person-check me-2" />
                  Solicită Revizuire Umană
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setError(null);
                  }}
                  aria-label="Închide"
                  disabled={isLoading}
                />
              </div>
              <div className="modal-body">
                {/* Info about Art. 22 */}
                <div className="alert alert-info mb-3">
                  <small>
                    <strong>GDPR Art. 22</strong> - Ai dreptul să soliciți revizuirea oricărei
                    decizii automatizate de către o persoană umană. Echipa noastră va analiza
                    recomandările generate pentru copilul tău.
                  </small>
                </div>

                {/* Reason textarea */}
                <div className="mb-3">
                  <label htmlFor="review-reason" className="form-label">
                    De ce dorești revizuirea? <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="review-reason"
                    className={`form-control ${error && !reason.trim() ? "is-invalid" : ""}`}
                    rows={4}
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Exemplu: Consider că recomandările nu iau în considerare corect condiția medicală a copilului meu..."
                    disabled={isLoading}
                  />
                  <div className="form-text">
                    Specifică motivul pentru a ne ajuta să înțelegem mai bine situația.
                  </div>
                </div>

                {/* Error display */}
                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    <i className="bi bi-exclamation-triangle me-2" />
                    {error}
                  </div>
                )}

                {/* What happens next */}
                <div className="small text-muted">
                  <strong>Ce se întâmplă după trimitere:</strong>
                  <ul className="mb-0 mt-1">
                    <li>Vei primi un email de confirmare</li>
                    <li>Echipa noastră va analiza chestionarul și răspunsurile</li>
                    <li>Vei primi un răspuns în maxim 7 zile lucrătoare</li>
                    <li>
                      Pentru situații urgente, contactează-ne la{" "}
                      <a href="mailto:gdpr@yuvoo.ro">gdpr@yuvoo.ro</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setError(null);
                  }}
                  disabled={isLoading}
                >
                  Anulează
                </button>
                <button
                  type="button"
                  className="btn btn-yuvoo-primary"
                  onClick={handleRequestReview}
                  disabled={isLoading || !reason.trim()}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      />
                      Se trimite...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send me-2" />
                      Trimite Solicitarea
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HumanReviewRequestButton;

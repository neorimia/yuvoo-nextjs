"use client";

import React, { useState, useEffect, useRef } from "react";
import FeedbackForm from "./FeedbackForm";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Bootstrap Modal type
interface BootstrapModal {
  show: () => void;
  hide: () => void;
  dispose: () => void;
}

// Use the actual Bootstrap namespace type from @types/bootstrap
// The bootstrap module exports the namespace directly
type BootstrapNamespace =
  typeof import("bootstrap") extends Promise<infer T>
    ? T extends { default: infer U }
      ? U
      : T
    : typeof import("bootstrap");

declare global {
  interface Window {
    bootstrap?: BootstrapNamespace;
  }
}

/**
 * FeedbackModal Component
 *
 * Bootstrap modal containing the feedback form.
 * Respects Yuvoo brand guidelines.
 */
const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalInstanceRef = useRef<BootstrapModal | null>(null);

  // Wait for Bootstrap to be available
  const waitForBootstrap = (): Promise<BootstrapNamespace> => {
    return new Promise((resolve, reject) => {
      // Check if Bootstrap is already available
      if (window.bootstrap) {
        resolve(window.bootstrap);
        return;
      }

      // Try to dynamically import Bootstrap if not available
      import("bootstrap/dist/js/bootstrap.bundle.min")
        .then((bootstrapModule) => {
          // Bootstrap 5.3.3 should expose itself to window.bootstrap
          // If not, try to access it from the module
          if (window.bootstrap) {
            resolve(window.bootstrap);
            return;
          }

          // Try to get Bootstrap from the module
          // Bootstrap module can have default export or be the module itself
          const bootstrap =
            (bootstrapModule as { default?: BootstrapNamespace }).default ||
            (bootstrapModule as unknown as BootstrapNamespace);
          if (bootstrap && bootstrap.Modal) {
            // Expose to window for future use
            // Type assertion needed because Bootstrap module type is complex
            window.bootstrap = bootstrap as BootstrapNamespace;
            resolve(bootstrap);
          } else {
            reject(new Error("Bootstrap Modal not found in module"));
          }
        })
        .catch((error) => {
          console.error("Failed to import Bootstrap:", error);
          reject(error);
        });

      // Fallback: Poll for window.bootstrap (in case it's loaded elsewhere)
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max (50 * 100ms)

      const checkBootstrap = setInterval(() => {
        attempts++;

        if (window.bootstrap) {
          clearInterval(checkBootstrap);
          resolve(window.bootstrap);
          return;
        }

        if (attempts >= maxAttempts) {
          clearInterval(checkBootstrap);
          // Don't reject here, let the import handle it
        }
      }, 100);
    });
  };

  // Handle Bootstrap modal show/hide
  useEffect(() => {
    if (!modalRef.current) return;

    const showModal = async () => {
      try {
        const bootstrap = await waitForBootstrap();
        if (!modalRef.current) return;

        // Dispose existing instance if any
        const existingInstance = bootstrap.Modal.getInstance(modalRef.current);
        if (existingInstance) {
          existingInstance.dispose();
        }

        // Create new modal instance
        const modal = new bootstrap.Modal(modalRef.current, {
          backdrop: true,
          keyboard: true,
        });
        modalInstanceRef.current = modal;
        modal.show();
      } catch (error) {
        console.error("Failed to show modal:", error);
      }
    };

    const hideModal = async () => {
      try {
        const bootstrap = await waitForBootstrap();
        if (!modalRef.current) return;

        const modalInstance = bootstrap.Modal.getInstance(modalRef.current);
        if (modalInstance) {
          modalInstance.hide();
          modalInstanceRef.current = null;
        }
      } catch (error) {
        console.error("Failed to hide modal:", error);
      }
    };

    if (isOpen) {
      // Reset form state when modal opens
      setIsSubmitted(false);
      showModal();

      // Handle modal hidden event
      const handleHidden = () => {
        setIsSubmitted(false);
        modalInstanceRef.current = null;
        onClose();
      };
      const currentModalElement = modalRef.current;
      currentModalElement.addEventListener("hidden.bs.modal", handleHidden);

      return () => {
        if (currentModalElement) {
          currentModalElement.removeEventListener("hidden.bs.modal", handleHidden);
        }
      };
    } else {
      hideModal();
    }
  }, [isOpen, onClose]);

  const handleSubmit = async (data: { email: string; message: string; type?: string }) => {
    setIsLoading(true);
    try {
      // Import server action dynamically
      const { submitFeedback } = await import("@/app/actions/feedback");

      // Submit feedback
      const result = await submitFeedback(data);

      if (!result.success) {
        throw new Error(result.error || "Eroare la trimiterea feedback-ului");
      }

      setIsSubmitted(true);

      // Close modal after 2 seconds
      setTimeout(() => {
        if (modalInstanceRef.current) {
          modalInstanceRef.current.hide();
          modalInstanceRef.current = null;
        }
        setIsSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      const errorMessage =
        error instanceof Error ? error.message : "A apărut o eroare. Te rugăm să încerci din nou.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={modalRef}
      className="modal fade"
      id="feedbackModal"
      tabIndex={-1}
      aria-labelledby="feedbackModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="feedbackModalLabel">
              Trimite-ne feedback-ul tău
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Închide"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {isSubmitted ? (
              <div className="text-center py-4">
                <div className="mb-3">
                  <i
                    className="flaticon-check"
                    style={{ fontSize: "48px", color: "var(--bd-theme-1)" }}
                  ></i>
                </div>
                <h4 className="mb-2">Mulțumim pentru feedback!</h4>
                <p className="text-muted">
                  Mesajul tău ne ajută să îmbunătățim Yuvoo. Apreciem timpul acordat!
                </p>
              </div>
            ) : (
              <FeedbackForm onSubmit={handleSubmit} isLoading={isLoading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;

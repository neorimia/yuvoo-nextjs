/**
 * Lead Submission Modal Component
 *
 * Modal for parents to express interest in a club.
 * Shows form to submit lead information.
 */

"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLeadSchema } from "@/lib/validations/leads";
import { submitLeadAction } from "@/app/actions/leads";
import type { CreateLeadInput } from "@/types/leads";

interface LeadSubmissionModalProps {
  clubId: string;
  clubName: string;
  sportType?: string | null;
  locationId?: string | null;
  isOpen: boolean;
  onClose: () => void;
  variant?: "primary" | "secondary";
}

type LeadFormData = Omit<CreateLeadInput, "clubId" | "sportType" | "locationId" | "ipAddress">;

const LeadSubmissionModal: React.FC<LeadSubmissionModalProps> = ({
  clubId,
  clubName,
  sportType,
  locationId,
  isOpen,
  onClose,
  variant = "primary",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(
      createLeadSchema.omit({ clubId: true, sportType: true, locationId: true, ipAddress: true })
    ),
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
      setSubmitSuccess(false);
      setSubmitError(null);
    }
  }, [isOpen, reset]);

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const result = await submitLeadAction({
        ...data,
        clubId,
        sportType: sportType || null,
        locationId: locationId || null,
      });

      if (result.success) {
        setSubmitSuccess(true);
        reset();
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
        }, 3000);
      } else {
        setSubmitError(result.error || "Eroare la trimiterea cererii");
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "A apărut o eroare neașteptată. Te rugăm să încerci din nou."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Bootstrap modal backdrop */}
      {isOpen && <div className="modal-backdrop fade show" onClick={onClose}></div>}
      <div
        className="modal fade show"
        style={{ display: "block", zIndex: 1055 }}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="leadModalLabel"
        aria-modal="true"
        onClick={(e) => {
          // Close on backdrop click
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mb-0" id="leadModalLabel">
                {variant === "secondary" ? "Trimite un mesaj prin Yuvoo" : "Sunt interesat"}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
                disabled={isSubmitting}
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-4 text-muted">
                {variant === "secondary" ? (
                  <>
                    Trimite un mesaj către <strong>{clubName}</strong>. Contactul este gratuit —
                    datele clubului sunt deja afișate mai sus.
                  </>
                ) : (
                  <>
                    Trimite interesul tău către <strong>{clubName}</strong>. Contactul este gratuit
                    — clubul va primi datele tale de contact.
                  </>
                )}
              </p>

              {submitSuccess ? (
                <div className="alert alert-success d-flex align-items-center" role="alert">
                  <i className="fa-regular fa-check-circle me-2 fs-5"></i>
                  <div>
                    <strong>Interes trimis către club!</strong>
                    <p className="mb-0 mt-1 small">
                      Clubul a primit datele tale de contact. Poți contacta clubul direct folosind
                      informațiile de mai sus.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  {submitError && (
                    <div className="alert alert-danger" role="alert">
                      <i className="fa-regular fa-exclamation-circle me-2"></i>
                      {submitError}
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="parentName" className="form-label">
                      Nume părinte <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="parentName"
                      className={`form-control ${errors.parentName ? "is-invalid" : ""}`}
                      {...register("parentName")}
                      placeholder="Introdu numele tău complet"
                      disabled={isSubmitting}
                    />
                    {errors.parentName && (
                      <div className="invalid-feedback">{errors.parentName.message as string}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="parentEmail" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="parentEmail"
                      className={`form-control ${errors.parentEmail ? "is-invalid" : ""}`}
                      {...register("parentEmail")}
                      placeholder="exemplu@email.com"
                      disabled={isSubmitting}
                    />
                    {errors.parentEmail && (
                      <div className="invalid-feedback">{errors.parentEmail.message as string}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="parentPhone" className="form-label">
                      Telefon <span className="text-muted small">(opțional, dar recomandat)</span>
                    </label>
                    <input
                      type="tel"
                      id="parentPhone"
                      className={`form-control ${errors.parentPhone ? "is-invalid" : ""}`}
                      {...register("parentPhone")}
                      placeholder="07XX XXX XXX"
                      disabled={isSubmitting}
                    />
                    {errors.parentPhone && (
                      <div className="invalid-feedback">{errors.parentPhone.message as string}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="childAge" className="form-label">
                      Vârsta copilului <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      id="childAge"
                      className={`form-control ${errors.childAge ? "is-invalid" : ""}`}
                      {...register("childAge", { valueAsNumber: true })}
                      placeholder="Ex: 7"
                      min={1}
                      max={18}
                      disabled={isSubmitting}
                    />
                    {errors.childAge && (
                      <div className="invalid-feedback">{errors.childAge.message as string}</div>
                    )}
                    <small className="form-text text-muted">
                      Vârsta copilului pentru care cauți activitate
                    </small>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">
                      Mesaj scurt <span className="text-muted small">(opțional)</span>
                    </label>
                    <textarea
                      id="message"
                      className={`form-control ${errors.message ? "is-invalid" : ""}`}
                      {...register("message")}
                      rows={3}
                      placeholder="Ai întrebări sau informații suplimentare pentru club?"
                      disabled={isSubmitting}
                    ></textarea>
                    {errors.message && (
                      <div className="invalid-feedback">{errors.message.message as string}</div>
                    )}
                  </div>

                  <div className="d-flex gap-2 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-yuvoo-secondary"
                      onClick={onClose}
                      disabled={isSubmitting}
                    >
                      Anulează
                    </button>
                    <button type="submit" className="btn btn-yuvoo-primary" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Se trimite...
                        </>
                      ) : (
                        <>
                          <i className="fa-regular fa-paper-plane me-2"></i>
                          Trimite interesul
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadSubmissionModal;

"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { submitContactForm } from "@/app/actions/contact";

interface FormData {
  firstName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy: boolean;
}

interface DoctorsContactModalProps {
  modalId: string;
}

/**
 * Doctors Contact Modal
 *
 * Contact form modal for doctors landing page.
 * Allows doctors to express interest in becoming Verified Pediatric Experts.
 */
export default function DoctorsContactModal({ modalId }: DoctorsContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      subject: "Interesat în rolul de Expert Pediatric Verificat",
    },
  });

  // Cleanup backdrop and restore scroll when modal is closed
  useEffect(() => {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) return;

    const handleHidden = () => {
      // Remove backdrop if it still exists
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.remove();
      }

      // Remove modal-open class from body
      document.body.classList.remove("modal-open");

      // Reset body styles that Bootstrap adds to prevent scrolling
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
      document.body.style.overflowX = "";
      document.body.style.overflowY = "";

      // Also check for any inline styles that might block scrolling
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "";
      }
    };

    // Also handle the hide event to ensure cleanup happens
    const handleHide = () => {
      // Pre-cleanup if needed
    };

    modalElement.addEventListener("hidden.bs.modal", handleHidden);
    modalElement.addEventListener("hide.bs.modal", handleHide);

    return () => {
      modalElement.removeEventListener("hidden.bs.modal", handleHidden);
      modalElement.removeEventListener("hide.bs.modal", handleHide);

      // Final cleanup on unmount
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
      document.body.style.overflowX = "";
      document.body.style.overflowY = "";

      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.remove();
      }
    };
  }, [modalId]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const result = await submitContactForm(data);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            "Mesajul tău a fost trimis cu succes! Te vom contacta în cel mai scurt timp pentru a discuta despre rolul de Expert Pediatric Verificat.",
        });
        reset();
        // Auto-close modal after 3 seconds on success
        setTimeout(() => {
          const modalElement = document.getElementById(modalId);
          if (modalElement) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Bootstrap = (window as { bootstrap?: any }).bootstrap;
            if (Bootstrap) {
              // Get or create modal instance
              let modal = Bootstrap.Modal.getInstance(modalElement);
              if (!modal) {
                modal = new Bootstrap.Modal(modalElement, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                });
              }

              // Hide the modal (backdrop cleanup is handled by useEffect event listener)
              modal.hide();
            }
          }
        }, 3000);
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.error ||
            "A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou.",
        });
      }
    } catch (_error) {
      setSubmitStatus({
        type: "error",
        message:
          "A apărut o eroare neașteptată. Te rugăm să încerci din nou sau să ne contactezi direct.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex={-1}
      aria-labelledby={`${modalId}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${modalId}Label`}>
              Devino Expert Pediatric Verificat
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-4">
              <p style={{ fontSize: "16px", color: "#424242", marginBottom: "20px" }}>
                Completează formularul de mai jos și te vom contacta în cel mai scurt timp pentru a
                discuta despre rolul de Expert Pediatric Verificat.
              </p>
              <div
                style={{
                  fontSize: "14px",
                  color: "#6B6B6B",
                  backgroundColor: "#EBFFFE",
                  padding: "15px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              >
                <strong>Rolul tău ca Expert Pediatric Verificat:</strong>
                <ul style={{ marginBottom: 0, paddingLeft: "20px", marginTop: "10px" }}>
                  <li>Contribui la validarea responsabilă a recomandărilor</li>
                  <li>Oferi context medical pentru părinți</li>
                  <li>Ajuți la prevenirea deciziilor greșite în sportul copiilor</li>
                  <li>Apari ca expert recomandat în platformă</li>
                </ul>
              </div>
            </div>

            <form id="doctors-contact-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="bd-contact-input mb-30">
                    <input
                      {...register("firstName", { required: "Numele complet este obligatoriu" })}
                      id="firstName"
                      type="text"
                      placeholder="Nume complet"
                      className={errors.firstName ? "is-invalid" : ""}
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback d-block">{errors.firstName.message}</div>
                    )}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="bd-contact-input mb-30">
                    <input
                      {...register("email", {
                        required: "Adresa de email este obligatorie",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Adresa de email nu este validă",
                        },
                      })}
                      id="email"
                      type="email"
                      placeholder="Adresa de email"
                      className={errors.email ? "is-invalid" : ""}
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block">{errors.email.message}</div>
                    )}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="bd-contact-input mb-30">
                    <input
                      {...register("phone", {
                        required: "Numărul de telefon este obligatoriu",
                        pattern: {
                          value: /^(\+40|0)[0-9]{9}$/,
                          message:
                            "Numărul de telefon nu este valid (ex: +40700000000 sau 0700000000)",
                        },
                      })}
                      id="phoneNumber"
                      type="tel"
                      placeholder="Număr de telefon (ex: +40700000000)"
                      className={errors.phone ? "is-invalid" : ""}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback d-block">{errors.phone.message}</div>
                    )}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="bd-contact-input mb-30">
                    <input
                      {...register("subject", { required: "Subiectul este obligatoriu" })}
                      id="subject"
                      type="text"
                      placeholder="Subiect"
                      className={errors.subject ? "is-invalid" : ""}
                    />
                    {errors.subject && (
                      <div className="invalid-feedback d-block">{errors.subject.message}</div>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="bd-contact-input mb-30">
                    <textarea
                      {...register("message", {
                        required: "Mesajul este obligatoriu",
                      })}
                      id="message"
                      placeholder="Mesajul tău (ex: Specializarea ta, experiența pediatrică, de ce dorești să contribui)"
                      rows={4}
                      className={errors.message ? "is-invalid" : ""}
                    ></textarea>
                    {errors.message && (
                      <div className="invalid-feedback d-block">{errors.message.message}</div>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="bd-contact-agree d-flex align-items-start mb-30">
                    <input
                      {...register("privacy", {
                        required: "Trebuie să accepți politica de confidențialitate",
                      })}
                      id="privacy-check"
                      type="checkbox"
                      className="me-2 "
                    />
                    <label htmlFor="privacy-check" className="bd-contact-agree-label">
                      Accept{" "}
                      <Link href={routes.privacy} className="text-yuvoo-primary">
                        politica de confidențialitate
                      </Link>{" "}
                      și sunt de acord cu procesarea datelor mele conform GDPR.
                    </label>
                  </div>
                  {errors.privacy && (
                    <div className="invalid-feedback d-block mb-20">{errors.privacy.message}</div>
                  )}
                </div>

                <div className="col-12">
                  {/* Success/Error messages */}
                  {submitStatus.type === "success" && (
                    <div className="alert alert-success mb-30" role="alert">
                      <i className="fa-solid fa-check-circle me-2"></i>
                      {submitStatus.message}
                    </div>
                  )}
                  {submitStatus.type === "error" && (
                    <div className="alert alert-danger mb-30" role="alert">
                      <i className="fa-solid fa-exclamation-circle me-2"></i>
                      {submitStatus.message}
                    </div>
                  )}

                  <div className="bd-contact-agree-btn">
                    <button type="submit" className="bd-btn" disabled={isSubmitting}>
                      <span className="bd-btn-inner">
                        <span className="bd-btn-normal">
                          <i
                            className={`fa-solid ${isSubmitting ? "fa-spinner fa-spin" : "fa-paper-plane"} me-2`}
                          ></i>
                          {isSubmitting ? "Se trimite..." : "Trimite cererea"}
                        </span>
                        <span className="bd-btn-hover">
                          <i
                            className={`fa-solid ${isSubmitting ? "fa-spinner fa-spin" : "fa-paper-plane"} me-2`}
                          ></i>
                          {isSubmitting ? "Se trimite..." : "Trimite cererea"}
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

const ContactForm: React.FC = () => {
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
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const result = await submitContactForm(data);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Mesajul tău a fost trimis cu succes! Te vom contacta în cel mai scurt timp.",
        });
        reset();
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 5000);
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
    <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
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
            {errors.email && <div className="invalid-feedback d-block">{errors.email.message}</div>}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="bd-contact-input mb-30">
            <input
              {...register("phone", {
                required: "Numărul de telefon este obligatoriu",
                pattern: {
                  value: /^(\+40|0)[0-9]{9}$/,
                  message: "Numărul de telefon nu este valid (ex: +40700000000 sau 0700000000)",
                },
              })}
              id="phoneNumber"
              type="tel"
              placeholder="Număr de telefon (ex: +40700000000)"
              className={errors.phone ? "is-invalid" : ""}
            />
            {errors.phone && <div className="invalid-feedback d-block">{errors.phone.message}</div>}
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
              {...register("message", { required: "Mesajul este obligatoriu" })}
              id="message"
              placeholder="Mesajul tău"
              rows={6}
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
              className="me-2"
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
                  {isSubmitting ? "Se trimite..." : "Trimite mesajul"}
                </span>
                <span className="bd-btn-hover">
                  <i
                    className={`fa-solid ${isSubmitting ? "fa-spinner fa-spin" : "fa-paper-plane"} me-2`}
                  ></i>
                  {isSubmitting ? "Se trimite..." : "Trimite mesajul"}
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import ErrorMsg from "@/components/Form/ErrorMassage";
import { submitWaitlistAction } from "@/app/actions/waitlist";

type FormData = {
  email: string;
  userType: "parent" | "club" | "doctor" | null;
  name?: string;
};

interface EarlyAccessFormProps {
  onSubmitSuccess?: () => void;
}

/**
 * Early Access Form Component
 *
 * Simple email collection form for early access signup.
 * Used in modals for parents, clubs, and doctors.
 */
export default function EarlyAccessForm({ onSubmitSuccess }: EarlyAccessFormProps) {
  const pathname = usePathname();
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
      // Create FormData for Server Action
      const formData = new FormData();
      formData.append("email", data.email);
      if (data.name) {
        formData.append("name", data.name);
      }
      if (data.userType) {
        formData.append("userType", data.userType as string);
      }
      if (pathname) {
        formData.append("source", pathname);
      }

      // Call Server Action
      const result = await submitWaitlistAction(formData);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Mulțumim! Te vom contacta în curând.",
        });
        reset();

        // Auto-close modal after 2 seconds on success
        if (onSubmitSuccess) {
          setTimeout(() => {
            onSubmitSuccess();
          }, 2000);
        }
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "A apărut o eroare. Te rugăm să încerci din nou.",
        });
      }
    } catch (_error) {
      setSubmitStatus({
        type: "error",
        message: "A apărut o eroare. Te rugăm să încerci din nou.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="early-access-form" onSubmit={handleSubmit(onSubmit)}>
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

      <div className="row">
        <div className="col-12">
          <div className="bd-contact-input mb-30">
            <input
              {...register("name", {
                required: false,
              })}
              id="name"
              type="text"
              placeholder="Nume complet (opțional)"
              className={errors.name ? "is-invalid" : ""}
              disabled={isSubmitting || submitStatus.type === "success"}
            />
            {errors.name && <div className="invalid-feedback d-block">{errors.name.message}</div>}
          </div>
        </div>
        <div className="col-12"></div>
        <div className="bd-contact-input mb-30">
          <select
            {...register("userType", { required: "Tipul de utilizator este obligatoriu" })}
            id="userType"
            className={errors.userType ? "is-invalid" : ""}
            disabled={isSubmitting || submitStatus.type === "success"}
          >
            <option value="">Selectează tipul de utilizator</option>
            <option value="parent">Părinte</option>
            <option value="club">Club sportiv</option>
            <option value="doctor">Medic</option>
          </select>
          {errors.userType && (
            <div className="invalid-feedback d-block">{errors.userType.message}</div>
          )}
        </div>
      </div>

      <div className="col-12">
        <div className="bd-contact-input mb-30">
          <input
            {...register("email", {
              required: "Adresa de email este obligatorie",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Adresa de email nu este validă",
              },
            })}
            id="email"
            type="email"
            placeholder="Adresa de email"
            className={errors.email ? "is-invalid" : ""}
            disabled={isSubmitting || submitStatus.type === "success"}
          />
          {errors.email && <ErrorMsg error={errors.email.message} />}
        </div>
      </div>

      <div className="col-12">
        <div className="bd-contact-agree-btn">
          <button
            type="submit"
            className="bd-btn"
            disabled={isSubmitting || submitStatus.type === "success"}
          >
            <span className="bd-btn-inner">
              <span className="bd-btn-normal">
                <i
                  className={`fa-solid ${
                    isSubmitting ? "fa-spinner fa-spin" : "fa-paper-plane"
                  } me-2`}
                ></i>
                {isSubmitting
                  ? "Se trimite..."
                  : submitStatus.type === "success"
                    ? "Trimis"
                    : "Trimite"}
              </span>
              <span className="bd-btn-hover">
                <i
                  className={`fa-solid ${
                    isSubmitting ? "fa-spinner fa-spin" : "fa-paper-plane"
                  } me-2`}
                ></i>
                {isSubmitting
                  ? "Se trimite..."
                  : submitStatus.type === "success"
                    ? "Trimis"
                    : "Trimite"}
              </span>
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}

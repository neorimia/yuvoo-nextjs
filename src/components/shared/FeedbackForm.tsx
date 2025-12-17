"use client";

import React from "react";
import { useForm } from "react-hook-form";
import ErrorMsg from "@/components/Form/ErrorMassage";

interface FeedbackFormData {
  email: string;
  message: string;
  type?: "bug" | "suggestion" | "general";
}

interface FeedbackFormProps {
  onSubmit: (data: FeedbackFormData) => void | Promise<void>;
  isLoading?: boolean;
}

/**
 * FeedbackForm Component
 *
 * Simple feedback form for beta users to provide feedback.
 * Respects Yuvoo brand guidelines with Romanian labels.
 */
const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeedbackFormData>({
    defaultValues: {
      type: "general",
    },
  });

  const handleFormSubmit = async (data: FeedbackFormData) => {
    await onSubmit(data);
    reset(); // Reset form after successful submission
  };

  return (
    <form id="feedback-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="bd-contact-input mb-30">
            <label htmlFor="email" className="form-label">
              Email (opțional)
            </label>
            <input
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Adresa de email nu este validă",
                },
              })}
              id="email"
              type="email"
              placeholder="email@exemplu.ro"
              disabled={isLoading}
            />
            <ErrorMsg error={errors?.email?.message} />
          </div>
        </div>

        <div className="col-12">
          <div className="bd-contact-input mb-30">
            <label htmlFor="type" className="form-label">
              Tip feedback
            </label>
            <select {...register("type")} id="type" className="form-select" disabled={isLoading}>
              <option value="general">Feedback general</option>
              <option value="bug">Raportare problemă</option>
              <option value="suggestion">Sugestie îmbunătățire</option>
            </select>
          </div>
        </div>

        <div className="col-12">
          <div className="bd-contact-input mb-30">
            <label htmlFor="message" className="form-label">
              Mesajul tău <span className="text-danger">*</span>
            </label>
            <textarea
              {...register("message", {
                required: "Te rugăm să scrii un mesaj",
                minLength: {
                  value: 10,
                  message: "Mesajul trebuie să aibă cel puțin 10 caractere",
                },
              })}
              id="message"
              placeholder="Spune-ne ce gândești despre Yuvoo, ce funcționalități ai vrea să vedem sau ce probleme ai întâmpinat..."
              rows={5}
              disabled={isLoading}
            ></textarea>
            <ErrorMsg error={errors?.message?.message} />
          </div>
        </div>

        <div className="col-12">
          <div className="bd-contact-agree-btn">
            <button type="submit" className="bd-btn" disabled={isLoading}>
              <span className="bd-btn-inner">
                <span className="bd-btn-normal">
                  {isLoading ? "Se trimite..." : "Trimite feedback"}
                </span>
                <span className="bd-btn-hover">
                  {isLoading ? "Se trimite..." : "Trimite feedback"}
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FeedbackForm;

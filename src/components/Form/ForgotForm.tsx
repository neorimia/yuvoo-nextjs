"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { forgotPasswordAction } from "@/app/actions/auth";
import ErrorMsg from "./ErrorMassage";
import { EmailSvgIcon } from "../SVG";

type ForgotFormData = {
  email: string;
};

const ForgotForm = () => {
  const [isPending, startTransition] = useTransition();
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotFormData>();

  const onSubmit = async (data: ForgotFormData) => {
    setAuthError(null);
    setSuccessMessage(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", data.email);

      const result = await forgotPasswordAction(formData);

      if (result.success) {
        setSuccessMessage(result.message || "Link-ul de resetare a fost trimis cu succes!");
        reset(); // Clear form
      } else {
        setAuthError(result.error || "Eroare la trimiterea email-ului");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {authError && (
        <div className="mb-20">
          <ErrorMsg error={authError} />
        </div>
      )}

      {successMessage && (
        <div className="mb-20">
          <div className="alert alert-success" role="alert">
            <i className="fa-regular fa-circle-check me-2"></i>
            {successMessage}
          </div>
        </div>
      )}

      <div className="login__input-wrapper">
        <div className="login__input-item">
          <div className="login__input">
            <input
              {...register("email", {
                required: "Adresa de email este obligatorie",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Format de email invalid",
                },
              })}
              id="emailAddress"
              type="email"
              placeholder="Adresă de email"
              disabled={isPending || !!successMessage}
            />
            <span>
              <EmailSvgIcon />
            </span>
          </div>
          <ErrorMsg error={errors.email?.message} />
        </div>
      </div>
      <div className="login__btn text-center">
        <button type="submit" className="bd-btn" disabled={isPending || !!successMessage}>
          <span className="bd-btn-inner">
            <span className="bd-btn-normal">
              {isPending ? "Se trimite..." : successMessage ? "Trimis" : "Trimite link de resetare"}
            </span>
            <span className="bd-btn-hover">
              {isPending ? "Se trimite..." : successMessage ? "Trimis" : "Trimite link de resetare"}
            </span>
          </span>
        </button>
      </div>
    </form>
  );
};

export default ForgotForm;

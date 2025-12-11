"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useStackApp } from "@stackframe/stack";
import ErrorMsg from "./ErrorMassage";
import { EmailSvgIcon } from "../SVG";
import { getErrorMessage } from "@/lib/auth/errors";

type ForgotFormData = {
  email: string;
};

const ForgotForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotFormData>();
  const stackApp = useStackApp();

  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true);
    setAuthError(null);
    setSuccessMessage(null);

    try {
      await stackApp.sendForgotPasswordEmail(data.email);

      // Show success message
      setSuccessMessage(
        "Link-ul de resetare a parolei a fost trimis la adresa ta de email. Verifică căsuța poștală."
      );
      reset(); // Clear form
    } catch (error) {
      // Handle error
      const errorMessage = getErrorMessage(error);
      setAuthError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading || !!successMessage}
            />
            <span>
              <EmailSvgIcon />
            </span>
          </div>
          <ErrorMsg error={errors.email?.message} />
        </div>
      </div>
      <div className="login__btn text-center">
        <button type="submit" className="bd-btn" disabled={isLoading || !!successMessage}>
          <span className="bd-btn-inner">
            <span className="bd-btn-normal">
              {isLoading ? "Se trimite..." : successMessage ? "Trimis" : "Trimite link de resetare"}
            </span>
            <span className="bd-btn-hover">
              {isLoading ? "Se trimite..." : successMessage ? "Trimis" : "Trimite link de resetare"}
            </span>
          </span>
        </button>
      </div>
    </form>
  );
};

export default ForgotForm;

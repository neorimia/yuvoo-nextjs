"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { resetPasswordAction } from "@/app/actions/auth";
import ErrorMsg from "./ErrorMassage";
import { EyeCutSvgIcon, LockSvgIcon } from "../SVG";

type ResetPasswordFormData = {
  password: string;
  passwordConfirmation: string;
};

const ResetPasswordForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const password = watch("password");

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setAuthError(
        "Link-ul de resetare este invalid sau a expirat. Te rugăm să soliciți un link nou."
      );
      return;
    }

    // Validate password confirmation
    if (data.password !== data.passwordConfirmation) {
      setAuthError("Parolele nu se potrivesc. Te rugăm să verifici.");
      return;
    }

    setAuthError(null);
    setSuccessMessage(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("password", data.password);
      formData.append("passwordConfirmation", data.passwordConfirmation);

      const result = await resetPasswordAction(formData);

      if (result.success) {
        setSuccessMessage(
          "Parola a fost resetată cu succes! Vei fi redirecționat la pagina de autentificare."
        );
        // Redirect after 2 seconds
        setTimeout(() => {
          if (result.redirect) {
            router.push(result.redirect);
          }
        }, 2000);
      } else {
        setAuthError(result.error || "Eroare la resetarea parolei");
      }
    });
  };

  // If no token, show error
  if (!token) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="fa-regular fa-circle-xmark me-2"></i>
        Link-ul de resetare este invalid sau lipsește. Te rugăm să soliciți un link nou de resetare.
      </div>
    );
  }

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
          <div className="login__input-item-inner p-relative">
            <div className="login__input">
              <input
                {...register("password", {
                  required: "Parola este obligatorie",
                  minLength: {
                    value: 6,
                    message: "Parola trebuie să aibă cel puțin 6 caractere",
                  },
                })}
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Parola nouă"
                autoComplete="new-password"
                disabled={isPending || !!successMessage}
              />
              <span>
                <LockSvgIcon />
              </span>
            </div>
            <span
              className="login-input-eye"
              onClick={() => setShowPass(!showPass)}
              style={{ cursor: isPending || successMessage ? "not-allowed" : "pointer" }}
            >
              {showPass ? <i className="fa-regular fa-eye"></i> : <EyeCutSvgIcon />}
            </span>
          </div>
          <ErrorMsg error={errors.password?.message} />
        </div>
        <div className="login__input-item">
          <div className="login__input-item-inner p-relative">
            <div className="login__input">
              <input
                {...register("passwordConfirmation", {
                  required: "Confirmarea parolei este obligatorie",
                  minLength: {
                    value: 6,
                    message: "Parola trebuie să aibă cel puțin 6 caractere",
                  },
                  validate: (value) => value === password || "Parolele nu se potrivesc",
                })}
                id="passwordConfirmation"
                type={showConPass ? "text" : "password"}
                placeholder="Confirmă parola nouă"
                autoComplete="new-password"
                disabled={isPending || !!successMessage}
              />
              <span>
                <LockSvgIcon />
              </span>
            </div>
            <span
              className="login-input-eye"
              onClick={() => setShowConPass(!showConPass)}
              style={{ cursor: isPending || successMessage ? "not-allowed" : "pointer" }}
            >
              {showConPass ? <i className="fa-regular fa-eye"></i> : <EyeCutSvgIcon />}
            </span>
          </div>
          <ErrorMsg error={errors.passwordConfirmation?.message} />
        </div>
      </div>
      <div className="login__btn text-center">
        <button type="submit" className="bd-btn" disabled={isPending || !!successMessage}>
          <span className="bd-btn-inner">
            <span className="bd-btn-normal">
              {isPending ? "Se resetează..." : successMessage ? "Resetat" : "Resetează parola"}
            </span>
            <span className="bd-btn-hover">
              {isPending ? "Se resetează..." : successMessage ? "Resetat" : "Resetează parola"}
            </span>
          </span>
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;

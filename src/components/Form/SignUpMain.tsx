"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useStackApp } from "@stackframe/stack";
import ErrorMsg from "./ErrorMassage";
import { EmailSvgIcon, EyeCutSvgIcon, LockSvgIcon } from "../SVG";
import { routes } from "@/lib/routes";
import { getErrorMessage } from "@/lib/auth/errors";

type SignUpFormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const SignUpForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();
  const stackApp = useStackApp();
  const router = useRouter();

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setAuthError(null);

    // Validate password confirmation
    if (data.password !== data.passwordConfirmation) {
      setAuthError("Parolele nu se potrivesc. Te rugăm să verifici.");
      setIsLoading(false);
      return;
    }

    try {
      await stackApp.signUpWithCredential({
        email: data.email,
        password: data.password,
      });

      // Redirect to dashboard after successful signup
      router.push(routes.parent.dashboard);
      router.refresh(); // Refresh to update server-side session
    } catch (error) {
      // Handle authentication error
      const errorMessage = getErrorMessage(error);
      setAuthError(errorMessage);
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
              disabled={isLoading}
            />
            <span>
              <EmailSvgIcon />
            </span>
          </div>
          <ErrorMsg error={errors.email?.message} />
        </div>
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
                placeholder="Parola ta"
                autoComplete="new-password"
                disabled={isLoading}
              />
              <span>
                <LockSvgIcon />
              </span>
            </div>
            <span
              className="login-input-eye"
              onClick={() => setShowPass(!showPass)}
              style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
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
                id="PasswordConfirmation"
                type={showConPass ? "text" : "password"}
                placeholder="Confirmă parola"
                autoComplete="new-password"
                disabled={isLoading}
              />
              <span>
                <LockSvgIcon />
              </span>
            </div>
            <span
              className="login-input-eye"
              onClick={() => setShowConPass(!showConPass)}
              style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              {showConPass ? <i className="fa-regular fa-eye"></i> : <EyeCutSvgIcon />}
            </span>
          </div>
          <ErrorMsg error={errors.passwordConfirmation?.message} />
        </div>
      </div>
      <div className="login__btn text-center">
        <button type="submit" className="bd-btn" disabled={isLoading}>
          <span className="bd-btn-inner">
            <span className="bd-btn-normal">
              {isLoading ? "Se înregistrează..." : "Înregistrare"}
            </span>
            <span className="bd-btn-hover">
              {isLoading ? "Se înregistrează..." : "Înregistrare"}
            </span>
          </span>
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;

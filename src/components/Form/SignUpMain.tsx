"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signUpAction } from "@/app/actions/auth";
import ErrorMsg from "./ErrorMassage";
import { EmailSvgIcon, EyeCutSvgIcon, LockSvgIcon } from "../SVG";

type SignUpFormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const SignUpForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    setAuthError(null);

    // Validate password confirmation
    if (data.password !== data.passwordConfirmation) {
      setAuthError("Parolele nu se potrivesc. Te rugăm să verifici.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("passwordConfirmation", data.passwordConfirmation);

      const result = await signUpAction(formData);

      if (result.success && result.redirect) {
        router.push(result.redirect);
        router.refresh();
      } else {
        setAuthError(result.error || "Eroare la înregistrare");
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
              disabled={isPending}
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
                disabled={isPending}
              />
              <span>
                <LockSvgIcon />
              </span>
            </div>
            <span
              className="login-input-eye"
              onClick={() => setShowPass(!showPass)}
              style={{ cursor: isPending ? "not-allowed" : "pointer" }}
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
                disabled={isPending}
              />
              <span>
                <LockSvgIcon />
              </span>
            </div>
            <span
              className="login-input-eye"
              onClick={() => setShowConPass(!showConPass)}
              style={{ cursor: isPending ? "not-allowed" : "pointer" }}
            >
              {showConPass ? <i className="fa-regular fa-eye"></i> : <EyeCutSvgIcon />}
            </span>
          </div>
          <ErrorMsg error={errors.passwordConfirmation?.message} />
        </div>
      </div>
      <div className="login__btn text-center">
        <button type="submit" className="bd-btn" disabled={isPending}>
          <span className="bd-btn-inner">
            <span className="bd-btn-normal">
              {isPending ? "Se înregistrează..." : "Înregistrare"}
            </span>
            <span className="bd-btn-hover">
              {isPending ? "Se înregistrează..." : "Înregistrare"}
            </span>
          </span>
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;

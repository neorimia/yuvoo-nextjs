"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useStackApp } from "@stackframe/stack";
import ErrorMsg from "./ErrorMassage";
import { EmailSvgIcon, EyeCutSvgIcon, LockSvgIcon } from "../SVG";
import { routes } from "@/lib/routes";
import { getErrorMessage } from "@/lib/auth/errors";

type SignInFormData = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const stackApp = useStackApp();
  const router = useRouter();

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      await stackApp.signInWithCredential({
        email: data.email,
        password: data.password,
      });

      // Redirect to dashboard after successful login
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
                autoComplete="current-password"
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
      </div>

      <div className="login__option mb-25 d-sm-flex justify-content-between">
        <div className="login__remember">
          <input type="checkbox" id="tp-remember" disabled={isLoading} />
          <label htmlFor="tp-remember">Ține-mă minte</label>
        </div>
        <div className="login__forgot">
          <Link href={routes.forgotPassword} onClick={(e) => isLoading && e.preventDefault()}>
            ai uitat parola?
          </Link>
        </div>
      </div>
      <div className="login__btn text-center">
        <button type="submit" className="bd-btn" disabled={isLoading}>
          <span className="bd-btn-inner">
            <span className="bd-btn-normal">
              {isLoading ? "Se autentifică..." : "Autentificare"}
            </span>
            <span className="bd-btn-hover">
              {isLoading ? "Se autentifică..." : "Autentificare"}
            </span>
          </span>
        </button>
      </div>
    </form>
  );
};

export default SignInForm;

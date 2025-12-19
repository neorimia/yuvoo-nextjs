"use client";

import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import ErrorMsg from "./ErrorMassage";
import { EmailSvgIcon, EyeCutSvgIcon, LockSvgIcon } from "../SVG";
import { routes } from "@/lib/routes";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";
import { getErrorMessage } from "@/lib/auth/errors";

type SignInFormData = {
  email: string;
  password: string;
};

interface SignInFormProps {
  redirectUrl?: string;
}

const SignInForm: React.FC<SignInFormProps> = ({ redirectUrl }) => {
  const [showPass, setShowPass] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    setAuthError(null);

    startTransition(async () => {
      try {
        // Use API route for sign-in to ensure server-side redirect configuration is used
        // This ensures proper cookie handling and redirect to /auth/redirect proxy
        const response = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            redirectUrl: redirectUrl, // Pass custom redirect if provided
          }),
        });

        // Check response status
        // If it's a redirect (303, 307, 302), the browser will follow it automatically
        // If it's 200 (success), we manually navigate to the redirect proxy
        // If it's an error (400, 401, 500), we parse the error message
        if (response.status === 303 || response.status === 307 || response.status === 302) {
          // Redirect response - browser will follow it automatically
          // Track event and let browser handle navigation
          trackEvent(PostHogEvents.USER_LOGGED_IN);
          return;
        }

        if (response.ok) {
          // Success response (200) - navigate to redirect proxy manually
          // This handles the case where NEXT_REDIRECT doesn't result in a proper redirect response
          trackEvent(PostHogEvents.USER_LOGGED_IN);
          window.location.href = routes.authRedirect;
          return;
        }

        // Error response - parse JSON to get error message
        // Check if response has content before parsing
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          try {
            const text = await response.text();
            if (text) {
              const result = JSON.parse(text);
              setAuthError(result.error || "Eroare la autentificare");
            } else {
              setAuthError("Eroare la autentificare. Te rugăm să încerci din nou.");
            }
          } catch (parseError) {
            console.error("Error parsing JSON response:", parseError);
            setAuthError("Eroare la autentificare. Te rugăm să încerci din nou.");
          }
        } else {
          // Response is not JSON, use status text or default error
          const statusText = response.statusText || "Eroare la autentificare";
          setAuthError(`${statusText}. Te rugăm să încerci din nou.`);
        }
      } catch (error) {
        console.error("Sign in error:", error);
        setAuthError(getErrorMessage(error));
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
                autoComplete="current-password"
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
      </div>

      <div className="login__option mb-25 d-sm-flex justify-content-between">
        <div className="login__remember">
          <input type="checkbox" id="tp-remember" disabled={isPending} />
          <label htmlFor="tp-remember">Ține-mă minte</label>
        </div>
        <div className="login__forgot">
          <Link href={routes.forgotPassword} onClick={(e) => isPending && e.preventDefault()}>
            ai uitat parola?
          </Link>
        </div>
      </div>
      <div className="login__btn text-center">
        <button type="submit" className="bd-btn" disabled={isPending}>
          <span className="bd-btn-inner">
            <span className="bd-btn-normal">
              {isPending ? "Se autentifică..." : "Autentificare"}
            </span>
            <span className="bd-btn-hover">
              {isPending ? "Se autentifică..." : "Autentificare"}
            </span>
          </span>
        </button>
      </div>
    </form>
  );
};

export default SignInForm;

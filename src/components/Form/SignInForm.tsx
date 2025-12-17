"use client";

import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signInAction } from "@/app/actions/auth";
import ErrorMsg from "./ErrorMassage";
import { EmailSvgIcon, EyeCutSvgIcon, LockSvgIcon } from "../SVG";
import { routes } from "@/lib/routes";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";

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
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    setAuthError(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await signInAction(formData, redirectUrl);

      if (result.success && result.redirect) {
        // Track login event client-side and identify user
        trackEvent(PostHogEvents.USER_LOGGED_IN);

        // Note: User identification will happen after redirect when session is available
        // We identify in a useEffect after successful login redirect

        router.push(result.redirect);
        router.refresh();
      } else {
        setAuthError(result.error || "Eroare la autentificare");
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

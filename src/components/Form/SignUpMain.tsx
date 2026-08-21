"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { signUpAction } from "@/app/actions/auth";
import ErrorMsg from "./ErrorMassage";
import { EmailSvgIcon, EyeCutSvgIcon, LockSvgIcon } from "../SVG";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";
import { routes } from "@/lib/routes";
import Link from "next/link";

type SignUpFormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
  role: "parent" | "club_admin" | "doctor";
  consent: boolean;
};

type SignUpRole = SignUpFormData["role"];

const VALID_ROLES: SignUpRole[] = ["parent", "club_admin", "doctor"];

function parseRoleFromUrl(roleParam: string | null): SignUpRole | undefined {
  if (roleParam && VALID_ROLES.includes(roleParam as SignUpRole)) {
    return roleParam as SignUpRole;
  }
  return undefined;
}

const SignUpForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleFromUrl = parseRoleFromUrl(searchParams.get("role"));
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    defaultValues: {
      role: roleFromUrl,
    },
  });

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
      formData.append("role", data.role);

      const result = await signUpAction(formData);

      if (result.success && result.redirect) {
        // Track signup event client-side
        trackEvent(PostHogEvents.USER_SIGNED_UP);

        // Note: User identification will happen after redirect when session is available

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
        <div className="login__input-item">
          <label htmlFor="role" className="form-label mb-3 fw-semibold">
            Tip cont <span className="text-danger">*</span>
          </label>
          <div className="yuvoo-radio-group d-flex flex-column gap-3">
            <div className="yuvoo-radio-wrapper form-check">
              <input
                {...register("role", {
                  required: "Te rugăm să alegi tipul de cont",
                })}
                className="yuvoo-radio form-check-input"
                type="radio"
                name="role"
                id="role-parent"
                value="parent"
                disabled={isPending}
              />
              <label className="form-check-label yuvoo-radio-label" htmlFor="role-parent">
                <span className="yuvoo-radio-title">Părinte</span>
                <span className="yuvoo-radio-description">
                  Caută sporturi și cluburi pentru copilul meu
                </span>
              </label>
            </div>
            <div className="yuvoo-radio-wrapper form-check">
              <input
                {...register("role")}
                className="yuvoo-radio form-check-input"
                type="radio"
                name="role"
                id="role-club"
                value="club_admin"
                disabled={isPending}
              />
              <label className="form-check-label yuvoo-radio-label" htmlFor="role-club">
                <span className="yuvoo-radio-title">Club sportiv</span>
                <span className="yuvoo-radio-description">
                  Gestionez un club sportiv pentru copii
                </span>
              </label>
            </div>
            <div className="yuvoo-radio-wrapper form-check">
              <input
                {...register("role")}
                className="yuvoo-radio form-check-input"
                type="radio"
                name="role"
                id="role-doctor"
                value="doctor"
                disabled={isPending}
              />
              <label className="form-check-label yuvoo-radio-label" htmlFor="role-doctor">
                <span className="yuvoo-radio-title">Doctor</span>
                <span className="yuvoo-radio-description">Sunt specialist pediatric</span>
              </label>
            </div>
          </div>
          <ErrorMsg error={errors.role?.message} />
        </div>
        <div className="login__input-item">
          <div className="form-check d-flex align-items-start yuvoo-checkbox-wrapper">
            <input
              {...register("consent", {
                required: "Trebuie să accepți termenii și condițiile pentru a continua",
              })}
              className="form-check-input mt-1 yuvoo-checkbox"
              type="checkbox"
              id="consent-check"
              disabled={isPending}
            />
            <label className="form-check-label ms-2" htmlFor="consent-check">
              Sunt de acord cu{" "}
              <Link
                href={routes.terms}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yuvoo-primary-hover focus-yuvoo-primary"
                style={{ textDecoration: "underline" }}
              >
                termenii și condițiile
              </Link>{" "}
              și{" "}
              <Link
                href={routes.privacy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yuvoo-primary-hover focus-yuvoo-primary"
                style={{ textDecoration: "underline" }}
              >
                politica de confidențialitate
              </Link>
              <span className="text-danger">*</span>
            </label>
          </div>
          <ErrorMsg error={errors.consent?.message} />
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

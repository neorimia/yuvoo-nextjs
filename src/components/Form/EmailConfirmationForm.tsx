"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStackApp } from "@stackframe/stack";
import { routes } from "@/lib/routes";
import { getErrorMessage } from "@/lib/auth/errors";

const EmailConfirmationForm = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stackApp = useStackApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError(
          "Link-ul de verificare este invalid sau lipsește. Te rugăm să soliciți un link nou."
        );
        setIsVerifying(false);
        return;
      }

      try {
        const result = await stackApp.verifyEmail(token);

        // Check if verification was successful
        if ("status" in result && result.status === "ok") {
          setIsSuccess(true);
          setIsVerifying(false);

          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push(routes.login);
          }, 3000);
        } else {
          // Handle error case
          const error = result.error as
            | { humanReadableMessage?: string; message?: string }
            | undefined;
          const errorMsg =
            error?.humanReadableMessage || error?.message || "Eroare la verificarea email-ului";
          throw new Error(errorMsg);
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [token, stackApp, router]);

  if (isVerifying) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Se verifică...</span>
        </div>
        <p className="mt-3">Se verifică adresa de email...</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="alert alert-success text-center" role="alert">
        <i className="fa-regular fa-circle-check fa-3x mb-3"></i>
        <h4 className="alert-heading mb-3">Email verificat cu succes!</h4>
        <p className="mb-3">
          Adresa ta de email a fost verificată cu succes. Vei fi redirecționat la pagina de
          autentificare în câteva secunde.
        </p>
        <p className="mb-0">
          <a href={routes.login} className="alert-link">
            Sau click aici pentru a te autentifica acum
          </a>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        <i className="fa-regular fa-circle-xmark fa-3x mb-3"></i>
        <h4 className="alert-heading mb-3">Eroare la verificare</h4>
        <p className="mb-3">{error}</p>
        <div className="d-flex flex-column gap-2 align-items-center">
          <a href={routes.register} className="btn btn-outline-primary">
            Creează un cont nou
          </a>
          <a href={routes.login} className="btn btn-link">
            Mergi la autentificare
          </a>
        </div>
      </div>
    );
  }

  return null;
};

export default EmailConfirmationForm;

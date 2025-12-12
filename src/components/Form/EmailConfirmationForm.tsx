import React from "react";
import { redirect } from "next/navigation";
import { verifyEmailAction } from "@/app/actions/auth";
import { routes } from "@/lib/routes";

interface EmailConfirmationFormProps {
  token: string | null;
}

const EmailConfirmationForm = async ({ token }: EmailConfirmationFormProps) => {
  if (!token) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        <i className="fa-regular fa-circle-xmark fa-3x mb-3"></i>
        <h4 className="alert-heading mb-3">Eroare la verificare</h4>
        <p className="mb-3">
          Link-ul de verificare este invalid sau lipsește. Te rugăm să soliciți un link nou.
        </p>
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

  const result = await verifyEmailAction(token);

  if (result.success && result.redirect) {
    // Redirect to login after successful verification
    redirect(result.redirect);
  }

  // If there's an error, show it
  return (
    <div className="alert alert-danger text-center" role="alert">
      <i className="fa-regular fa-circle-xmark fa-3x mb-3"></i>
      <h4 className="alert-heading mb-3">Eroare la verificare</h4>
      <p className="mb-3">{result.error || "Eroare la verificarea email-ului"}</p>
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
};

export default EmailConfirmationForm;

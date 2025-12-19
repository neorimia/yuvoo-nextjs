import React from "react";
import { redirect } from "next/navigation";
import { verifyEmailAction } from "@/app/actions/auth";
import { routes } from "@/lib/routes";

interface EmailConfirmationFormProps {
  token: string | null;
  verified?: boolean;
  error?: string | null;
}

const EmailConfirmationForm = async ({ token, verified, error }: EmailConfirmationFormProps) => {
  // If email was already verified (via handler route), show success message
  if (verified) {
    return (
      <div className="alert alert-success text-center" role="alert">
        <i className="fa-regular fa-circle-check fa-3x mb-3"></i>
        <h4 className="alert-heading mb-3">Email verificat cu succes!</h4>
        <p className="mb-3">
          Email-ul tău a fost verificat cu succes. Poți să te autentifici acum.
        </p>
        <div className="d-flex flex-column gap-2 align-items-center">
          <a href={routes.login} className="btn btn-yuvoo-primary">
            Mergi la autentificare
          </a>
        </div>
      </div>
    );
  }

  // If there's an error from the handler route, show it
  if (error) {
    let errorMessage = "Eroare la verificarea email-ului";
    if (error === "missing_code") {
      errorMessage =
        "Link-ul de verificare este invalid sau lipsește. Te rugăm să soliciți un link nou.";
    } else if (error === "verification_failed") {
      errorMessage =
        "Verificarea email-ului a eșuat. Te rugăm să încerci din nou sau să soliciți un link nou.";
    } else if (error === "verification_error") {
      errorMessage = "A apărut o eroare la verificarea email-ului. Te rugăm să încerci din nou.";
    } else if (error === "unexpected_error") {
      errorMessage = "A apărut o eroare neașteptată. Te rugăm să încerci din nou.";
    }

    return (
      <div className="alert alert-danger text-center" role="alert">
        <i className="fa-regular fa-circle-xmark fa-3x mb-3"></i>
        <h4 className="alert-heading mb-3">Eroare la verificare</h4>
        <p className="mb-3">{errorMessage}</p>
        <div className="d-flex flex-column gap-2 align-items-center">
          <a href={routes.login} className="btn btn-yuvoo-primary">
            Mergi la autentificare
          </a>
          <a href={routes.register} className="btn btn-link text-yuvoo-primary">
            Creează un cont nou
          </a>
        </div>
      </div>
    );
  }

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

  if (result.success) {
    // Redirect to login after successful verification
    if (result.redirect) {
      redirect(result.redirect);
    }

    // If there's a success message but no redirect (shouldn't happen, but handle it)
    return (
      <div className="alert alert-success text-center" role="alert">
        <i className="fa-regular fa-circle-check fa-3x mb-3"></i>
        <h4 className="alert-heading mb-3">Email verificat cu succes!</h4>
        <p className="mb-3">
          {result.message || "Email-ul tău a fost verificat. Poți să te autentifici acum."}
        </p>
        <div className="d-flex flex-column gap-2 align-items-center">
          <a href={routes.login} className="btn btn-primary">
            Mergi la autentificare
          </a>
        </div>
      </div>
    );
  }

  // If there's an error, show it
  return (
    <div className="alert alert-danger text-center" role="alert">
      <i className="fa-regular fa-circle-xmark fa-3x mb-3"></i>
      <h4 className="alert-heading mb-3">Eroare la verificare</h4>
      <p className="mb-3">{result.error || "Eroare la verificarea email-ului"}</p>
      <div className="d-flex flex-column gap-2 align-items-center">
        <a href={routes.login} className="btn btn-outline-primary">
          Mergi la autentificare
        </a>
        <a href={routes.register} className="btn btn-link">
          Creează un cont nou
        </a>
      </div>
    </div>
  );
};

export default EmailConfirmationForm;

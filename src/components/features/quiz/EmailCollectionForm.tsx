/**
 * Email Collection Form Component
 *
 * Client component for collecting email address after quiz completion.
 */

"use client";

import { useState, useTransition } from "react";
import { collectEmailAction } from "@/app/actions/quiz/collect-email";
import { routes } from "@/lib/routes";
import LocationDropdown from "@/components/shared/LocationDropdown";

interface EmailCollectionFormProps {
  quizId: string;
}

/**
 * Email Collection Form
 *
 * Collects email address and redirects to teaser page.
 */
export default function EmailCollectionForm({ quizId }: EmailCollectionFormProps) {
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Email-ul este obligatoriu");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Email-ul introdus nu este valid");
      return;
    }

    if (!location.trim()) {
      setError("Locația este obligatorie");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("quizId", quizId);
      formData.append("email", email.trim());
      formData.append("location", location.trim());

      const result = await collectEmailAction(formData);

      if (!result.success && result.error) {
        setError(result.error);
      }
      // If successful, redirect happens in the server action
    });
  };

  return (
    <form onSubmit={handleSubmit} className="email-collection-form" aria-busy={isPending}>
      {/* Error Summary */}
      {error && (
        <div className="alert alert-danger mb-3" role="alert" aria-live="polite">
          <i className="bi bi-exclamation-triangle me-2" aria-hidden="true"></i>
          {error}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-semibold">
          Adresa ta de email <span className="text-danger">*</span>
        </label>
        <input
          type="email"
          className={`form-control ${error && !email.trim() ? "is-invalid" : ""}`}
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nume@exemplu.com"
          required
          disabled={isPending}
          autoComplete="email"
          autoFocus
          aria-describedby="email-help email-error"
          aria-invalid={error && !email.trim() ? "true" : "false"}
        />
        {error && !email.trim() && (
          <div id="email-error" className="invalid-feedback d-block" role="alert">
            {error}
          </div>
        )}
        <div id="email-help" className="form-text">
          Vom trimite recomandarea personalizată la această adresă.
        </div>
      </div>

      <div className="mb-3">
        <LocationDropdown
          value={location}
          onChange={setLocation}
          label="Orașul tău"
          required
          disabled={isPending}
          error={error && !location.trim() ? "Locația este obligatorie" : null}
          id="location"
          name="location"
          showHelpText={true}
        />
      </div>

      <button
        type="submit"
        className="btn btn-yuvoo-primary w-100 py-2"
        disabled={isPending || !email.trim() || !location.trim()}
        aria-label={isPending ? "Se procesează..." : "Vezi recomandarea"}
      >
        {isPending ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Se procesează...
          </>
        ) : (
          <>
            <i className="bi bi-arrow-right me-2" aria-hidden="true"></i>
            Vezi Recomandarea
          </>
        )}
      </button>

      <p className="text-center text-muted small mt-3 mb-0">
        Prin continuare, confirmi că ai citit și ești de acord cu{" "}
        <a
          href={routes.privacy}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none"
        >
          Politica de confidențialitate
        </a>
        .
      </p>
    </form>
  );
}

/**
 * Email Collection Form Component
 *
 * Client component for collecting email address after quiz completion.
 * On success, shows next-steps UI (check email, etc.) instead of redirecting.
 */

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { collectEmailAction } from "@/app/actions/quiz/collect-email";
import { routes } from "@/lib/routes";
import LocationDropdown from "@/components/shared/LocationDropdown";

interface EmailCollectionFormProps {
  quizId: string;
  /** Used for social proof when quizCount >= 100. Omit to hide. */
  quizCount?: number;
}

/**
 * Email Collection Form
 *
 * Collects email address. On success, shows next-steps UI with check-email
 * instructions and CTA to view the teaser.
 */
export default function EmailCollectionForm({ quizId, quizCount }: EmailCollectionFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

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

      try {
        const result = await collectEmailAction(formData);

        if (result.success && result.redirectUrl) {
          setSubmittedEmail(email.trim());
          setRedirectUrl(result.redirectUrl);
          setSubmitted(true);
        } else if (!result.success && result.error) {
          setError(result.error);
        }
      } catch (err) {
        // Handle NEXT_REDIRECT error (shouldn't happen with new pattern, but catch just in case)
        if (err && typeof err === "object" && "digest" in err) {
          const digest = (err as { digest?: string }).digest;
          if (digest?.startsWith("NEXT_REDIRECT")) {
            return;
          }
        }
        setError("Eroare la procesarea email-ului. Te rugăm să încerci din nou.");
      }
    });
  };

  const handleViewRecommendation = () => {
    if (redirectUrl) router.push(redirectUrl);
  };

  if (submitted) {
    return (
      <div className="email-collection-success" role="status" aria-live="polite">
        <div className="text-center mb-4">
          <div
            className="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3"
            style={{ width: "80px", height: "80px" }}
            aria-hidden="true"
          >
            <i
              className="bi bi-envelope-check-fill text-success"
              style={{ fontSize: "2.5rem" }}
            ></i>
          </div>
          <h2 className="h4 fw-bold mb-3">Verifică email-ul</h2>
          <p className="text-muted mb-0">
            Ți-am trimis recomandarea personalizată la{" "}
            <strong className="text-dark">{submittedEmail}</strong>. Verifică căsuța de primire și,
            dacă nu apare în câteva minute, dosarul <strong>Spam</strong> sau{" "}
            <strong>Promoții</strong>.
          </p>
        </div>

        <div className="alert alert-info mb-4" role="alert">
          <strong className="d-block mb-2">Următorii pași:</strong>
          <ol className="mb-0 ps-3">
            <li>Deschide email-ul de la Yuvoo</li>
            <li>Click pe link pentru a vedea recomandarea în browser</li>
            <li>Poți reveni oricând folosind link-ul din email</li>
          </ol>
        </div>

        <div className="d-flex flex-column gap-2">
          <button
            type="button"
            className="btn btn-yuvoo-primary py-2"
            onClick={handleViewRecommendation}
            aria-label="Vezi recomandarea acum"
          >
            <i className="bi bi-arrow-right me-2" aria-hidden="true"></i>
            Vezi recomandarea acum
          </button>
          <Link
            href={routes.home}
            className="btn btn-outline-secondary py-2"
            aria-label="Înapoi la prima pagină"
          >
            <i className="bi bi-house me-2" aria-hidden="true"></i>
            Înapoi la prima pagină
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="text-center mb-4">
        <div className="mb-3">
          <i
            className="bi bi-envelope-check text-success"
            style={{ fontSize: "3rem" }}
            aria-hidden="true"
          ></i>
        </div>
        <h1 className="h3 fw-bold mb-3">Vezi recomandarea personalizată pentru copilul tău</h1>
        <p className="text-muted mb-0">
          Pe baza răspunsurilor tale, am identificat sportul cel mai potrivit pentru copilul tău.
          Introdu email-ul tău pentru a vedea imediat recomandarea personalizată.
        </p>
      </div>

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
            Vei vedea recomandarea personalizată imediat după introducerea email-ului.
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

      {/* Trust Indicators */}
      <div className="mt-4 pt-4 border-top">
        <div className="row g-3 text-center">
          <div className="col-12 col-md-4">
            <div className="d-flex flex-column align-items-center">
              <i
                className="bi bi-shield-check text-success mb-2"
                style={{ fontSize: "1.5rem" }}
                aria-hidden="true"
              ></i>
              <small className="text-muted">Date protejate, nu partajăm cu terți</small>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="d-flex flex-column align-items-center">
              <i
                className="bi bi-clock text-primary mb-2"
                style={{ fontSize: "1.5rem" }}
                aria-hidden="true"
              ></i>
              <small className="text-muted">Rezultate instant</small>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="d-flex flex-column align-items-center">
              <i
                className="bi bi-gift text-warning mb-2"
                style={{ fontSize: "1.5rem" }}
                aria-hidden="true"
              ></i>
              <small className="text-muted">Previzualizare gratuită</small>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      {quizCount !== undefined && quizCount >= 100 && (
        <div className="text-center mb-3 mt-3">
          <p className="text-muted small mb-0">
            <i className="bi bi-people-fill text-primary me-2" aria-hidden="true"></i>
            Peste {quizCount.toLocaleString("ro-RO")} părinți au folosit deja serviciul nostru
            pentru a găsi sportul potrivit
          </p>
        </div>
      )}
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { updateEmailPreferencesAction } from "@/app/actions/email";
import { requireAuth } from "@/modules/auth/auth.service";
import { BootstrapButton } from "@/components/UI/BootstrapButton";

interface EmailPreferencesFormProps {
  initialPreferences?: {
    quizResults?: boolean;
    clubUpdates?: boolean;
    doctorUpdates?: boolean;
    newsletter?: boolean;
    marketing?: boolean;
    unsubscribed?: boolean;
  };
}

/**
 * Email Preferences Form Component
 *
 * Client component for managing email notification preferences.
 */
export default function EmailPreferencesForm({ initialPreferences }: EmailPreferencesFormProps) {
  const [preferences, setPreferences] = useState({
    quizResults: initialPreferences?.quizResults ?? true,
    clubUpdates: initialPreferences?.clubUpdates ?? true,
    doctorUpdates: initialPreferences?.doctorUpdates ?? true,
    newsletter: initialPreferences?.newsletter ?? true,
    marketing: initialPreferences?.marketing ?? false,
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Get user ID on mount
  useEffect(() => {
    async function getUser() {
      try {
        const user = await requireAuth();
        setUserId(user.id);
      } catch (error) {
        console.error("[Email Preferences] Auth error:", error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  // Server action wrapper - must match useFormState signature: (prevState, formData) => Promise
  async function handleSubmit(
    prevState: { success: boolean; error?: string; message?: string } | null,
    formData: FormData
  ) {
    if (!userId) {
      return { success: false, error: "Trebuie să fii autentificat." };
    }

    const prefs = {
      quizResults: formData.get("quizResults") === "true",
      clubUpdates: formData.get("clubUpdates") === "true",
      doctorUpdates: formData.get("doctorUpdates") === "true",
      newsletter: formData.get("newsletter") === "true",
      marketing: formData.get("marketing") === "true",
    };

    return await updateEmailPreferencesAction(userId, prefs);
  }

  const [state, formAction] = useFormState(handleSubmit, null);

  const handleCheckboxChange = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) {
    return <div className="text-center py-4">Se încarcă...</div>;
  }

  if (!userId) {
    return (
      <div className="alert alert-danger" role="alert">
        Trebuie să fii autentificat pentru a gestiona preferințele de email.
      </div>
    );
  }

  return (
    <form action={formAction} className="bd-contact-form">
      <input type="hidden" name="quizResults" value={preferences.quizResults.toString()} />
      <input type="hidden" name="clubUpdates" value={preferences.clubUpdates.toString()} />
      <input type="hidden" name="doctorUpdates" value={preferences.doctorUpdates.toString()} />
      <input type="hidden" name="newsletter" value={preferences.newsletter.toString()} />
      <input type="hidden" name="marketing" value={preferences.marketing.toString()} />

      <div className="mb-4">
        <h3 className="h5 mb-3" style={{ color: "#1B1B1B" }}>
          Tipuri de emailuri
        </h3>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="quizResults"
            checked={preferences.quizResults}
            onChange={() => handleCheckboxChange("quizResults")}
          />
          <label className="form-check-label" htmlFor="quizResults" style={{ color: "#424242" }}>
            <strong>Rapoarte de recomandări sportive</strong>
            <br />
            <small style={{ color: "#6B6B6B" }}>
              Primește rapoarte detaliate cu recomandările personalizate după completarea quiz-ului.
            </small>
          </label>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="clubUpdates"
            checked={preferences.clubUpdates}
            onChange={() => handleCheckboxChange("clubUpdates")}
          />
          <label className="form-check-label" htmlFor="clubUpdates" style={{ color: "#424242" }}>
            <strong>Actualizări despre cluburi</strong>
            <br />
            <small style={{ color: "#6B6B6B" }}>
              Primește notificări despre cluburi noi, evenimente și oferte speciale.
            </small>
          </label>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="doctorUpdates"
            checked={preferences.doctorUpdates}
            onChange={() => handleCheckboxChange("doctorUpdates")}
          />
          <label className="form-check-label" htmlFor="doctorUpdates" style={{ color: "#424242" }}>
            <strong>Actualizări despre doctori</strong>
            <br />
            <small style={{ color: "#6B6B6B" }}>
              Primește notificări despre doctori noi și disponibilități.
            </small>
          </label>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="newsletter"
            checked={preferences.newsletter}
            onChange={() => handleCheckboxChange("newsletter")}
          />
          <label className="form-check-label" htmlFor="newsletter" style={{ color: "#424242" }}>
            <strong>Newsletter</strong>
            <br />
            <small style={{ color: "#6B6B6B" }}>
              Primește newsletter-ul nostru cu sfaturi, articole și noutăți despre sporturi pentru
              copii.
            </small>
          </label>
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="marketing"
            checked={preferences.marketing}
            onChange={() => handleCheckboxChange("marketing")}
          />
          <label className="form-check-label" htmlFor="marketing" style={{ color: "#424242" }}>
            <strong>Comunicări de marketing</strong>
            <br />
            <small style={{ color: "#6B6B6B" }}>
              Primește oferte speciale, promoții și comunicări de marketing (opțional).
            </small>
          </label>
        </div>
      </div>

      {state?.error && (
        <div className="alert alert-danger mb-3" role="alert">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="alert alert-success mb-3" role="alert">
          {state.message || "Preferințele tale au fost actualizate cu succes!"}
        </div>
      )}

      <div className="bd-contact-btn">
        <BootstrapButton type="submit" variant="primary" className="bd-btn bd-btn-2">
          Salvează preferințele
        </BootstrapButton>
      </div>

      <div className="mt-4 pt-4" style={{ borderTop: "1px solid #E6E6E6" }}>
        <p style={{ color: "#6B6B6B", fontSize: "14px", lineHeight: "22px" }}>
          <strong>Notă:</strong> Vei continua să primești emailuri importante legate de contul tău
          (confirmări de rezervări, notificări de securitate, resetare parolă, etc.), indiferent de
          preferințele de mai sus.
        </p>
      </div>
    </form>
  );
}

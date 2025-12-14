/**
 * Preferences Question Component (Question 6)
 *
 * Collects child's preferences for sports activities.
 * Indoor/Outdoor, Team/Individual, Time availability, Budget.
 */

"use client";

import React, { memo } from "react";
import { useQuiz } from "../QuizContext";
import QuestionWrapper from "../QuestionWrapper";

const PreferencesQuestion = memo(function PreferencesQuestion() {
  const { answers, setAnswer, errors } = useQuiz();

  const preferences = answers.preferences || {
    indoor: false,
    outdoor: false,
    team: false,
    individual: false,
    timeAvailability: undefined,
    budgetConsiderations: undefined,
  };

  const updatePreference = (key: keyof typeof preferences, value: boolean | string | undefined) => {
    setAnswer("preferences", {
      ...preferences,
      [key]: value,
    });
  };

  return (
    <QuestionWrapper
      title="Preferințele copilului tău"
      description="Ultimul pas! Preferințele pentru locație (interior/exterior) și tipul de activitate (echipă/individual) ne ajută să finalizăm recomandările perfecte. Poți selecta ambele opțiuni dacă copilul tău este deschis la ambele."
      helpText="Selectează cel puțin o preferință pentru fiecare categorie. Poți selecta ambele opțiuni dacă sunt relevante."
      error={errors.preferences}
    >
      {/* Location preferences */}
      <div className="mb-4">
        <label className="form-label fw-semibold">
          Locație preferată <span className="text-danger">*</span>
        </label>
        <p className="text-muted small mb-2">Unde preferă copilul tău să practice sportul?</p>
        <div className="row g-3">
          <div className="col-6">
            <button
              type="button"
              className={`btn w-100 h-100 p-3 p-md-4 position-relative ${preferences.indoor ? "btn-yuvoo-primary" : "btn-yuvoo-outline-primary"}`}
              onClick={() => updatePreference("indoor", !preferences.indoor)}
              aria-pressed={preferences.indoor}
            >
              <i className="bi bi-house-door fs-3 d-block mb-2"></i>
              <div className="fw-semibold">Interior</div>
              <small className={preferences.indoor ? "text-white-50" : "text-muted"}>
                Săli, bazine acoperite
              </small>
              {preferences.indoor && (
                <i className="bi bi-check-circle-fill position-absolute top-0 end-0 m-2 fs-5 text-white"></i>
              )}
            </button>
          </div>
          <div className="col-6">
            <button
              type="button"
              className={`btn w-100 h-100 p-3 p-md-4 position-relative ${preferences.outdoor ? "btn-yuvoo-primary" : "btn-yuvoo-outline-primary"}`}
              onClick={() => updatePreference("outdoor", !preferences.outdoor)}
              aria-pressed={preferences.outdoor}
            >
              <i className="bi bi-tree fs-3 d-block mb-2"></i>
              <div className="fw-semibold">Exterior</div>
              <small className={preferences.outdoor ? "text-white-50" : "text-muted"}>
                Terenuri, parcuri
              </small>
              {preferences.outdoor && (
                <i className="bi bi-check-circle-fill position-absolute top-0 end-0 m-2 fs-5 text-white"></i>
              )}
            </button>
          </div>
        </div>
        {!preferences.indoor && !preferences.outdoor && (
          <div className="alert alert-danger d-flex align-items-center gap-2 mt-3 mb-0 py-2 shadow-sm">
            <i className="bi bi-exclamation-circle-fill flex-shrink-0"></i>
            <small className="mb-0">Selectează cel puțin o locație preferată</small>
          </div>
        )}
      </div>

      {/* Team/Individual preferences */}
      <div className="mb-4">
        <label className="form-label fw-semibold">
          Tipul de activitate <span className="text-danger">*</span>
        </label>
        <p className="text-muted small mb-2">
          Preferă copilul tău activități de echipă sau individuale?
        </p>
        <div className="row g-3">
          <div className="col-6">
            <button
              type="button"
              className={`btn w-100 h-100 p-3 p-md-4 position-relative ${preferences.team ? "btn-yuvoo-primary" : "btn-yuvoo-outline-primary"}`}
              onClick={() => updatePreference("team", !preferences.team)}
              aria-pressed={preferences.team}
            >
              <i className="bi bi-people fs-3 d-block mb-2"></i>
              <div className="fw-semibold">Echipă</div>
              <small className={preferences.team ? "text-white-50" : "text-muted"}>
                Fotbal, baschet, volei
              </small>
              {preferences.team && (
                <i className="bi bi-check-circle-fill position-absolute top-0 end-0 m-2 fs-5 text-white"></i>
              )}
            </button>
          </div>
          <div className="col-6">
            <button
              type="button"
              className={`btn w-100 h-100 p-3 p-md-4 position-relative ${preferences.individual ? "btn-yuvoo-primary" : "btn-yuvoo-outline-primary"}`}
              onClick={() => updatePreference("individual", !preferences.individual)}
              aria-pressed={preferences.individual}
            >
              <i className="bi bi-person fs-3 d-block mb-2"></i>
              <div className="fw-semibold">Individual</div>
              <small className={preferences.individual ? "text-white-50" : "text-muted"}>
                Tenis, înot, gimnastică
              </small>
              {preferences.individual && (
                <i className="bi bi-check-circle-fill position-absolute top-0 end-0 m-2 fs-5 text-white"></i>
              )}
            </button>
          </div>
        </div>
        {!preferences.team && !preferences.individual && (
          <div className="alert alert-danger d-flex align-items-center gap-2 mt-3 mb-0 py-2 shadow-sm">
            <i className="bi bi-exclamation-circle-fill flex-shrink-0"></i>
            <small className="mb-0">Selectează cel puțin un tip de activitate</small>
          </div>
        )}
      </div>

      {/* Time availability (optional) */}
      <div className="mb-4">
        <label htmlFor="timeAvailability" className="form-label fw-semibold">
          Disponibilitate de timp (opțional)
        </label>
        <input
          type="text"
          className="form-control"
          id="timeAvailability"
          name="timeAvailability"
          value={preferences.timeAvailability || ""}
          onChange={(e) => updatePreference("timeAvailability", e.target.value || undefined)}
          placeholder="Ex: 2-3 ore pe săptămână, preferabil seara"
          maxLength={200}
          aria-describedby="time-help"
        />
        <div id="time-help" className="form-text">
          Câte ore pe săptămână poate dedica copilul tău activităților sportive?
        </div>
      </div>

      {/* Budget considerations (optional) */}
      <div className="mb-3">
        <label htmlFor="budgetConsiderations" className="form-label fw-semibold">
          Considerații de buget (opțional)
        </label>
        <input
          type="text"
          className="form-control"
          id="budgetConsiderations"
          name="budgetConsiderations"
          value={preferences.budgetConsiderations || ""}
          onChange={(e) => updatePreference("budgetConsiderations", e.target.value || undefined)}
          placeholder="Ex: buget moderat, până în 300 RON/lună"
          maxLength={200}
          aria-describedby="budget-help"
        />
        <div id="budget-help" className="form-text">
          Informații despre bugetul disponibil pentru activități sportive.
        </div>
      </div>
    </QuestionWrapper>
  );
});

export default PreferencesQuestion;

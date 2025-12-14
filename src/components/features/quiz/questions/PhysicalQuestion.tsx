/**
 * Physical Build Question Component (Question 5)
 *
 * Collects child's physical build and optional considerations.
 */

"use client";

import React, { memo } from "react";
import { useQuiz } from "../QuizContext";
import QuestionWrapper from "../QuestionWrapper";

type PhysicalBuild = "slim" | "average" | "athletic";

interface BuildOption {
  value: PhysicalBuild;
  label: string;
  icon: string;
  description: string;
}

const BUILD_OPTIONS: BuildOption[] = [
  {
    value: "slim",
    label: "Subțire",
    icon: "🌱",
    description: "Constituție subțire, uneori fragil",
  },
  {
    value: "average",
    label: "Mediu",
    icon: "⭐",
    description: "Constituție medie, echilibrată",
  },
  {
    value: "athletic",
    label: "Atletic",
    icon: "💪",
    description: "Constituție atletică, musculară",
  },
];

const PhysicalQuestion = memo(function PhysicalQuestion() {
  const { answers, setAnswer, errors } = useQuiz();

  const handleBuildChange = (build: PhysicalBuild) => {
    setAnswer("physicalBuild", build);
  };

  const handleConsiderationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setAnswer("physicalConsiderations", value || undefined);
  };

  return (
    <QuestionWrapper
      title="Cum ai descrie constituția fizică a copilului tău?"
      description="Această informație ne ajută să recomandăm sporturi potrivite pentru tipul fizic al copilului."
      helpText="Alege constituția care descrie cel mai bine copilul tău. Informațiile sunt confidențiale."
      error={errors.physicalBuild}
    >
      {/* Physical build selection */}
      <div className="mb-4">
        <label className="form-label fw-semibold">
          Constituție fizică <span className="text-danger">*</span>
        </label>
        <div className="row g-3">
          {BUILD_OPTIONS.map((option) => (
            <div key={option.value} className="col-12 col-md-4">
              <button
                type="button"
                className={`btn w-100 h-100 p-3 ${
                  answers.physicalBuild === option.value ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleBuildChange(option.value)}
                aria-pressed={answers.physicalBuild === option.value}
              >
                <div className="text-center">
                  <span className="fs-1 d-block mb-2" role="img" aria-label={option.label}>
                    {option.icon}
                  </span>
                  <div className="fw-semibold mb-1">{option.label}</div>
                  <small
                    className={
                      answers.physicalBuild === option.value ? "text-white-50" : "text-muted"
                    }
                  >
                    {option.description}
                  </small>
                </div>
                {answers.physicalBuild === option.value && (
                  <i className="bi bi-check-circle-fill position-absolute top-0 end-0 m-2 text-white"></i>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Physical considerations (optional) */}
      <div className="mb-3">
        <label htmlFor="physicalConsiderations" className="form-label fw-semibold">
          Considerații fizice (opțional)
        </label>
        <textarea
          className="form-control"
          id="physicalConsiderations"
          name="physicalConsiderations"
          rows={3}
          value={answers.physicalConsiderations || ""}
          onChange={handleConsiderationsChange}
          placeholder="Adaugă orice detalii relevante despre sănătatea sau condițiile fizice ale copilului (ex: astigmatism, alergii, etc.)"
          maxLength={500}
          aria-describedby="considerations-help"
        />
        <div id="considerations-help" className="form-text">
          <i className="bi bi-shield-check me-1"></i>
          Informații confidențiale. Maximum 500 caractere.
        </div>
        {answers.physicalConsiderations && (
          <div className="text-end">
            <small className="text-muted">
              {answers.physicalConsiderations.length}/500 caractere
            </small>
          </div>
        )}
      </div>
    </QuestionWrapper>
  );
});

export default PhysicalQuestion;

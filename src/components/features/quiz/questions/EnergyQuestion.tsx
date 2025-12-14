/**
 * Energy Question Component (Question 2)
 *
 * Collects child's energy level (low, medium, high, very_high).
 */

"use client";

import React, { memo } from "react";
import { useQuiz } from "../QuizContext";
import QuestionWrapper from "../QuestionWrapper";

type EnergyLevel = "low" | "medium" | "high" | "very_high";

interface EnergyOption {
  value: EnergyLevel;
  label: string;
  icon: string;
  description: string;
}

const ENERGY_OPTIONS: EnergyOption[] = [
  {
    value: "low",
    label: "Scăzut",
    icon: "🌙",
    description: "Preferă activități liniștite și relaxante",
  },
  {
    value: "medium",
    label: "Mediu",
    icon: "⚡",
    description: "Echilibru între activitate și odihnă",
  },
  {
    value: "high",
    label: "Ridicat",
    icon: "🔥",
    description: "Mereu activ și energic",
  },
  {
    value: "very_high",
    label: "Foarte ridicat",
    icon: "🚀",
    description: "Energie nelimitată, greu de obosit",
  },
];

const EnergyQuestion = memo(function EnergyQuestion() {
  const { answers, setAnswer, errors } = useQuiz();

  const handleEnergyChange = (level: EnergyLevel) => {
    setAnswer("energyLevel", level);
  };

  return (
    <QuestionWrapper
      title="Cât de energic este copilul tău?"
      description="Nivelul de energie ne ajută să recomandăm sporturi cu intensitatea potrivită."
      error={errors.energyLevel}
    >
      <div className="energy-options">
        <div className="row g-3">
          {ENERGY_OPTIONS.map((option) => (
            <div key={option.value} className="col-12 col-md-6">
              <button
                type="button"
                className={`btn w-100 h-100 p-3 text-start ${
                  answers.energyLevel === option.value ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleEnergyChange(option.value)}
                aria-pressed={answers.energyLevel === option.value}
              >
                <div className="d-flex align-items-start">
                  <span className="fs-2 me-3" role="img" aria-label={option.label}>
                    {option.icon}
                  </span>
                  <div>
                    <div className="fw-semibold mb-1">{option.label}</div>
                    <small className="text-muted">{option.description}</small>
                  </div>
                </div>
                {answers.energyLevel === option.value && (
                  <i className="bi bi-check-circle-fill position-absolute top-0 end-0 m-2 text-white"></i>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </QuestionWrapper>
  );
});

export default EnergyQuestion;

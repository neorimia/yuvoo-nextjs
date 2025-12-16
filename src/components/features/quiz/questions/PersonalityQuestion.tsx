/**
 * Personality Question Component (Question 3)
 *
 * Collects child's personality traits (multiple selection).
 */

"use client";

import React, { memo } from "react";
import { useQuiz } from "../QuizContext";
import QuestionWrapper from "../QuestionWrapper";

interface PersonalityTrait {
  value: string;
  label: string;
  icon: string;
  description: string;
}

const PERSONALITY_TRAITS: PersonalityTrait[] = [
  {
    value: "extrovert",
    label: "Extrovert",
    icon: "👥",
    description: "Îi place să fie înconjurat de oameni",
  },
  {
    value: "introvert",
    label: "Introvert",
    icon: "📚",
    description: "Preferă activități liniștite și timp singur",
  },
  {
    value: "competitiv",
    label: "Competitiv",
    icon: "🏆",
    description: "Îi place să câștige și să fie cel mai bun",
  },
  {
    value: "cooperant",
    label: "Cooperant",
    icon: "🤝",
    description: "Lucrează bine în echipă și este empatic",
  },
  {
    value: "persistent",
    label: "Persistent",
    icon: "💪",
    description: "Nu renunță ușor, continuă până reușește",
  },
  {
    value: "creativ",
    label: "Creativ",
    icon: "🎨",
    description: "Își folosește imaginația",
  },
  {
    value: "aventuros",
    label: "Aventuros",
    icon: "🧗",
    description: "Îi place să încerce lucruri noi și provocări",
  },
  {
    value: "prudent",
    label: "Prudent",
    icon: "🛡️",
    description: "Preferă siguranța, evită riscurile",
  },
  {
    value: "analitic",
    label: "Analitic",
    icon: "🔍",
    description: "Gândește logic și strategic",
  },
  {
    value: "sensibil",
    label: "Sensibil",
    icon: "🌸",
    description: "Simte lucrurile intens, sensibil la critici",
  },
];

const PersonalityQuestion = memo(function PersonalityQuestion() {
  const { answers, setAnswer, errors } = useQuiz();

  const personality = answers.personality || [];

  const toggleTrait = (trait: string) => {
    const newPersonality = personality.includes(trait)
      ? personality.filter((t) => t !== trait)
      : [...personality, trait];

    setAnswer("personality", newPersonality);
  };

  return (
    <QuestionWrapper
      title="Ce trăsături descriu cel mai bine copilul tău?"
      description="Personalitatea copilului tău joacă un rol important în alegerea sportului potrivit. Un copil extrovertit s-ar putea simți mai bine într-un sport de echipă, în timp ce unul mai analitic ar putea prefera sporturi strategice."
      helpText="Selectează cel puțin o trăsătură. Poți selecta până la 10 trăsături care descriu cel mai bine copilul tău. Este normal ca copiii să aibă trăsături aparent contradictorii (de exemplu, extrovert la școală dar introvert acasă)."
      error={errors.personality}
    >
      <div className="personality-traits">
        <div className="row g-3">
          {PERSONALITY_TRAITS.map((trait) => {
            const isSelected = personality.includes(trait.value);

            return (
              <div key={trait.value} className="col-12 col-md-6">
                <button
                  type="button"
                  className={`btn w-100 h-100 p-3 p-md-4 text-start position-relative ${
                    isSelected ? "btn-yuvoo-primary" : "btn-outline-secondary"
                  }`}
                  onClick={() => toggleTrait(trait.value)}
                  aria-pressed={isSelected}
                >
                  <div className="d-flex align-items-start">
                    <span className="fs-3 me-3" role="img" aria-label={trait.label}>
                      {trait.icon}
                    </span>
                    <div className="flex-grow-1">
                      <div className="fw-semibold mb-1">{trait.label}</div>
                      <small className={isSelected ? "text-white-80" : "text-muted"}>
                        {trait.description}
                      </small>
                    </div>
                  </div>
                  {isSelected && (
                    <i className="bi bi-check-circle-fill position-absolute top-0 end-0 m-2 fs-5 text-white"></i>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Selection counter */}
        {personality.length > 0 && (
          <div className="mt-3 text-center">
            <small className="text-muted">
              {personality.length}{" "}
              {personality.length === 1 ? "trăsătură selectată" : "trăsături selectate"}
            </small>
          </div>
        )}
      </div>
    </QuestionWrapper>
  );
});

export default PersonalityQuestion;

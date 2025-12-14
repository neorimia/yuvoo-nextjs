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
    description: "Lucrează bine în echipă",
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
    description: "Îi place să încerce lucruri noi",
  },
  {
    value: "analitic",
    label: "Analitic",
    icon: "🔍",
    description: "Gândește logic și strategic",
  },
  {
    value: "empatic",
    label: "Empatic",
    icon: "❤️",
    description: "Înțelege sentimentele altora",
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
      description="Selectează una sau mai multe trăsături de personalitate."
      helpText="Selectează cel puțin o trăsătură. Poți selecta până la 10 trăsături."
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
                  className={`btn w-100 h-100 p-3 text-start position-relative ${
                    isSelected ? "btn-primary" : "btn-outline-secondary"
                  }`}
                  onClick={() => toggleTrait(trait.value)}
                  aria-pressed={isSelected}
                >
                  <div className="d-flex align-items-start">
                    <span className="fs-3 me-3" role="img" aria-label={trait.label}>
                      {trait.icon}
                    </span>
                    <div>
                      <div className="fw-semibold mb-1">{trait.label}</div>
                      <small className={isSelected ? "text-white-50" : "text-muted"}>
                        {trait.description}
                      </small>
                    </div>
                  </div>
                  {isSelected && (
                    <i className="bi bi-check-circle-fill position-absolute top-0 end-0 m-2 text-white"></i>
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

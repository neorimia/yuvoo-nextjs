/**
 * Age Question Component (Question 1)
 *
 * Collects child's age (4-14) and optional gender.
 */

"use client";

import React, { memo } from "react";
import { useQuiz } from "../QuizContext";
import QuestionWrapper from "../QuestionWrapper";
import RangeInput from "@/components/shared/RangeInput";

const AgeQuestion = memo(function AgeQuestion() {
  const { answers, setAnswer, errors } = useQuiz();

  const handleGenderChange = (gender: "male" | "female" | "other") => {
    setAnswer("gender", gender);
  };

  return (
    <QuestionWrapper
      title="Câți ani are copilul tău?"
      description="Vârsta este esențială pentru a recomanda sporturi potrivite pentru etapa de dezvoltare a copilului tău. Fiecare vârstă are nevoi și abilități specifice."
      helpText="Acceptăm copii cu vârste între 4 și 14 ani."
      error={errors.age}
    >
      {/* Child name (optional) - for personalization in report */}
      <div className="mb-4">
        <label htmlFor="childName" className="form-label fw-semibold">
          Numele copilului (opțional)
        </label>
        <input
          id="childName"
          type="text"
          className="form-control"
          placeholder="Ex: Maria, Andrei"
          maxLength={100}
          value={answers.childName ?? ""}
          onChange={(e) => setAnswer("childName", e.target.value.trim() || undefined)}
          aria-describedby="childNameHelp"
        />
        <div id="childNameHelp" className="form-text">
          Folosim numele doar pentru a personaliza raportul (ex: „Recomandări pentru Maria”).
        </div>
      </div>

      {/* Age input - Range slider */}
      <RangeInput
        id="age"
        name="age"
        label="Vârsta"
        min={4}
        max={14}
        step={1}
        value={answers.age || 4}
        onChange={(value) => setAnswer("age", value)}
        required
        error={errors.age}
        helpText="Glisează pentru a selecta vârsta (4-14 ani)."
        valueSuffix="ani"
        minLabel="4 ani"
        maxLabel="14 ani"
      />

      {/* Gender selection (optional) */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Gen (opțional)</label>
        <div className="d-flex gap-2 flex-wrap">
          <button
            type="button"
            className={`btn ${answers.gender === "male" ? "btn-yuvoo-primary" : "btn-yuvoo-outline-primary"}`}
            onClick={() => handleGenderChange("male")}
            aria-pressed={answers.gender === "male"}
          >
            <i className="bi bi-person me-2"></i>
            Băiat
          </button>
          <button
            type="button"
            className={`btn ${answers.gender === "female" ? "btn-yuvoo-primary" : "btn-yuvoo-outline-primary"}`}
            onClick={() => handleGenderChange("female")}
            aria-pressed={answers.gender === "female"}
          >
            <i className="bi bi-person-dress me-2"></i>
            Fată
          </button>
          <button
            type="button"
            className={`btn ${answers.gender === "other" ? "btn-yuvoo-primary" : "btn-yuvoo-outline-primary"}`}
            onClick={() => handleGenderChange("other")}
            aria-pressed={answers.gender === "other"}
          >
            <i className="bi bi-person-circle me-2"></i>
            Altul
          </button>
        </div>
        <div className="form-text">
          Această informație este opțională și ne ajută să personalizăm recomandările.
        </div>
      </div>
    </QuestionWrapper>
  );
});

export default AgeQuestion;

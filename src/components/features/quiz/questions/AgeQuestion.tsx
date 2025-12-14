/**
 * Age Question Component (Question 1)
 *
 * Collects child's age (4-14) and optional gender.
 */

"use client";

import React, { memo } from "react";
import { useQuiz } from "../QuizContext";
import QuestionWrapper from "../QuestionWrapper";

const AgeQuestion = memo(function AgeQuestion() {
  const { answers, setAnswer, setAnswers, errors } = useQuiz();

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty input (for clearing)
    if (inputValue === "") {
      // Clear the age - use setAnswers to remove the field
      // TypeScript: PartialQuizAnswers allows undefined for age
      setAnswers({ age: undefined });
      return;
    }

    // Parse and validate
    const value = parseInt(inputValue, 10);
    if (!isNaN(value) && value >= 4 && value <= 14) {
      setAnswer("age", value);
    }
    // If invalid, don't update (prevents invalid values)
  };

  const handleAgeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    // Clear invalid values on blur
    if (isNaN(value) || value < 4 || value > 14) {
      // TypeScript: PartialQuizAnswers allows undefined for age
      setAnswers({ age: undefined });
    }
  };

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
      {/* Age input */}
      <div className="mb-4">
        <label htmlFor="age" className="form-label fw-semibold">
          Vârsta <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          className={`form-control form-control-lg ${errors.age ? "is-invalid" : ""}`}
          id="age"
          name="age"
          min={4}
          max={14}
          step={1}
          value={answers.age || ""}
          onChange={handleAgeChange}
          onBlur={handleAgeBlur}
          placeholder="Introdu vârsta (4-14 ani)"
          required
          aria-describedby="age-help"
          aria-invalid={errors.age ? "true" : "false"}
        />
        <div id="age-help" className="form-text">
          <i className="bi bi-info-circle me-1"></i>
          Introdu vârsta în ani (minimum 4, maximum 14).
        </div>
      </div>

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

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
  const { answers, setAnswer, errors } = useQuiz();

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setAnswer("age", value);
    }
  };

  const handleGenderChange = (gender: "male" | "female" | "other") => {
    setAnswer("gender", gender);
  };

  return (
    <QuestionWrapper
      title="Câți ani are copilul tău?"
      description="Vârsta copilului ne ajută să oferim recomandări potrivite pentru dezvoltarea sa."
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
          value={answers.age || ""}
          onChange={handleAgeChange}
          placeholder="Introdu vârsta (4-14 ani)"
          required
          aria-describedby="age-help"
        />
        <div id="age-help" className="form-text">
          Introdu vârsta în ani (minimum 4, maximum 14).
        </div>
      </div>

      {/* Gender selection (optional) */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Gen (opțional)</label>
        <div className="d-flex gap-2 flex-wrap">
          <button
            type="button"
            className={`btn ${answers.gender === "male" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handleGenderChange("male")}
            aria-pressed={answers.gender === "male"}
          >
            <i className="bi bi-person me-2"></i>
            Băiat
          </button>
          <button
            type="button"
            className={`btn ${answers.gender === "female" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handleGenderChange("female")}
            aria-pressed={answers.gender === "female"}
          >
            <i className="bi bi-person-dress me-2"></i>
            Fată
          </button>
          <button
            type="button"
            className={`btn ${answers.gender === "other" ? "btn-primary" : "btn-outline-primary"}`}
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

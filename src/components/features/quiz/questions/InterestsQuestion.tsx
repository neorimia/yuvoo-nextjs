/**
 * Interests Question Component (Question 4)
 *
 * Collects child's interests, hobbies, and previous sports experience.
 */

"use client";

import React, { useState, memo } from "react";
import { useQuiz } from "../QuizContext";
import QuestionWrapper from "../QuestionWrapper";

interface Interest {
  value: string;
  label: string;
  icon: string;
}

const COMMON_INTERESTS: Interest[] = [
  { value: "sporturi", label: "Sporturi", icon: "⚽" },
  { value: "arte", label: "Arte și desen", icon: "🎨" },
  { value: "muzica", label: "Muzică", icon: "🎵" },
  { value: "dans", label: "Dans", icon: "💃" },
  { value: "citit", label: "Citit", icon: "📚" },
  { value: "jocuri-video", label: "Jocuri video", icon: "🎮" },
  { value: "natura", label: "Activități în natură", icon: "🌳" },
  { value: "stiinta", label: "Știință și experimente", icon: "🔬" },
  { value: "constructii", label: "Construcții (Lego, etc.)", icon: "🧱" },
  { value: "animale", label: "Animale", icon: "🐕" },
  { value: "tehnologie", label: "Tehnologie", icon: "💻" },
  { value: "aventura", label: "Aventură", icon: "🗺️" },
];

const COMMON_SPORTS: Interest[] = [
  { value: "fotbal", label: "Fotbal", icon: "⚽" },
  { value: "baschet", label: "Baschet", icon: "🏀" },
  { value: "inot", label: "Înot", icon: "🏊" },
  { value: "tenis", label: "Tenis", icon: "🎾" },
  { value: "dans", label: "Dans", icon: "💃" },
  { value: "gimnastica", label: "Gimnastică", icon: "🤸" },
  { value: "arte-martiale", label: "Arte marțiale", icon: "🥋" },
  { value: "atletism", label: "Atletism", icon: "🏃" },
];

const InterestsQuestion = memo(function InterestsQuestion() {
  const { answers, setAnswer, errors } = useQuiz();
  const [customInterest, setCustomInterest] = useState("");
  const [customSport, setCustomSport] = useState("");

  const interests = answers.interests || [];
  const previousSports = answers.previousSports || [];

  const toggleInterest = (interest: string) => {
    const newInterests = interests.includes(interest)
      ? interests.filter((i) => i !== interest)
      : [...interests, interest];

    setAnswer("interests", newInterests);
  };

  const toggleSport = (sport: string) => {
    const newSports = previousSports.includes(sport)
      ? previousSports.filter((s) => s !== sport)
      : [...previousSports, sport];

    setAnswer("previousSports", newSports);
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !interests.includes(customInterest.trim())) {
      setAnswer("interests", [...interests, customInterest.trim()]);
      setCustomInterest("");
    }
  };

  const addCustomSport = () => {
    if (customSport.trim() && !previousSports.includes(customSport.trim())) {
      setAnswer("previousSports", [...previousSports, customSport.trim()]);
      setCustomSport("");
    }
  };

  return (
    <QuestionWrapper
      title="Ce îi place să facă copilului tău?"
      description="Selectează interesele și hobby-urile copilului tău."
      helpText="Selectează cel puțin un interes. Poți adăuga și altele personalizate."
      error={errors.interests}
    >
      {/* Interests section */}
      <div className="mb-4">
        <label className="form-label fw-semibold">
          Interese și hobby-uri <span className="text-danger">*</span>
        </label>
        <div className="row g-2">
          {COMMON_INTERESTS.map((interest) => {
            const isSelected = interests.includes(interest.value);
            return (
              <div key={interest.value} className="col-6 col-md-4">
                <button
                  type="button"
                  className={`btn w-100 ${isSelected ? "btn-primary" : "btn-outline-secondary"} btn-sm`}
                  onClick={() => toggleInterest(interest.value)}
                  aria-pressed={isSelected}
                >
                  <span role="img" aria-label={interest.label} className="me-1">
                    {interest.icon}
                  </span>
                  {interest.label}
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom interest input */}
        <div className="mt-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Adaugă alt interes..."
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomInterest())}
            />
            <button type="button" className="btn btn-outline-secondary" onClick={addCustomInterest}>
              <i className="bi bi-plus-lg"></i> Adaugă
            </button>
          </div>
        </div>

        {interests.length > 0 && (
          <div className="mt-2">
            <small className="text-muted">{interests.length} selectate</small>
          </div>
        )}
      </div>

      {/* Previous sports section */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Sporturi încercate anterior (opțional)</label>
        <div className="row g-2">
          {COMMON_SPORTS.map((sport) => {
            const isSelected = previousSports.includes(sport.value);
            return (
              <div key={sport.value} className="col-6 col-md-4">
                <button
                  type="button"
                  className={`btn w-100 ${isSelected ? "btn-success" : "btn-outline-secondary"} btn-sm`}
                  onClick={() => toggleSport(sport.value)}
                  aria-pressed={isSelected}
                >
                  <span role="img" aria-label={sport.label} className="me-1">
                    {sport.icon}
                  </span>
                  {sport.label}
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom sport input */}
        <div className="mt-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Adaugă alt sport..."
              value={customSport}
              onChange={(e) => setCustomSport(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSport())}
            />
            <button type="button" className="btn btn-outline-secondary" onClick={addCustomSport}>
              <i className="bi bi-plus-lg"></i> Adaugă
            </button>
          </div>
        </div>

        {previousSports.length > 0 && (
          <div className="mt-2">
            <small className="text-success">{previousSports.length} sport(uri) anterior(e)</small>
          </div>
        )}
      </div>
    </QuestionWrapper>
  );
});

export default InterestsQuestion;

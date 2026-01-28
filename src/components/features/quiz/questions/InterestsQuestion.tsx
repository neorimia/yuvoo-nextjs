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
  const whyStoppedSports = answers.whyStoppedSports || [];

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

  const toggleWhyStoppedReason = (reason: string) => {
    const updated = whyStoppedSports.includes(reason)
      ? whyStoppedSports.filter((r) => r !== reason)
      : [...whyStoppedSports, reason];

    setAnswer("whyStoppedSports", updated.length > 0 ? updated : undefined);

    // Clear injury details if "injury" is deselected
    if (reason === "injury" && !updated.includes("injury")) {
      setAnswer("injuryDetails", undefined);
    }
  };

  // Get current injury details
  const injuryDetails = answers.injuryDetails || {
    type: undefined,
    when: undefined,
    healed: undefined,
    restrictions: undefined,
  };

  const updateInjuryDetail = <K extends keyof typeof injuryDetails>(
    key: K,
    value: (typeof injuryDetails)[K]
  ) => {
    setAnswer("injuryDetails", {
      ...injuryDetails,
      [key]: value,
    });
  };

  const _addCustomInterest = () => {
    if (customInterest.trim() && !interests.includes(customInterest.trim())) {
      setAnswer("interests", [...interests, customInterest.trim()]);
      setCustomInterest("");
    }
  };

  const _addCustomSport = () => {
    if (customSport.trim() && !previousSports.includes(customSport.trim())) {
      setAnswer("previousSports", [...previousSports, customSport.trim()]);
      setCustomSport("");
    }
  };

  return (
    <QuestionWrapper
      title="Ce îi place să facă copilului tău?"
      description="Interesele actuale ale copilului tău ne ajută să înțelegem ce tipuri de activități îi aduc bucurie. Acestea pot fi un indiciu excelent pentru sporturile care ar putea să-l pasioneze."
      helpText="Selectează cel puțin un interes. Poți adăuga și altele personalizate dacă nu le găsești în listă."
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
              <div key={interest.value} className="col-md-4">
                <button
                  type="button"
                  className={`btn w-100 ${isSelected ? "btn-yuvoo-primary" : "btn-outline-secondary"} btn-sm`}
                  style={{ minHeight: "40px" }}
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

        {/* Hide for MVP */}
        {/* Custom interest input */}
        {/*<div className="mt-3">*/}
        {/*  <div className="input-group">*/}
        {/*    <input*/}
        {/*      type="text"*/}
        {/*      className="form-control"*/}
        {/*      placeholder="Adaugă alt interes..."*/}
        {/*      value={customInterest}*/}
        {/*      onChange={(e) => setCustomInterest(e.target.value)}*/}
        {/*      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomInterest())}*/}
        {/*    />*/}
        {/*    <button type="button" className="btn btn-outline-secondary" onClick={addCustomInterest}>*/}
        {/*      <i className="bi bi-plus-lg"></i> Adaugă*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*{interests.length > 0 && (*/}
        {/*  <div className="mt-2">*/}
        {/*    <small className="text-muted">{interests.length} selectate</small>*/}
        {/*  </div>*/}
        {/*)}*/}
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
                  style={{ minHeight: "40px" }}
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

        {/* Hide for MVP */}
        {/* Custom sport input */}
        {/*<div className="mt-3">*/}
        {/*  <div className="input-group">*/}
        {/*    <input*/}
        {/*      type="text"*/}
        {/*      className="form-control"*/}
        {/*      placeholder="Adaugă alt sport..."*/}
        {/*      value={customSport}*/}
        {/*      onChange={(e) => setCustomSport(e.target.value)}*/}
        {/*      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSport())}*/}
        {/*    />*/}
        {/*    <button type="button" className="btn btn-outline-secondary" onClick={addCustomSport}>*/}
        {/*      <i className="bi bi-plus-lg"></i> Adaugă*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*{previousSports.length > 0 && (*/}
        {/*  <div className="mt-2">*/}
        {/*    <small className="text-success">{previousSports.length} sport(uri) anterior(e)</small>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>

      {/* Why stopped sports (conditional - only if previousSports selected) */}
      {previousSports.length > 0 && (
        <div className="mb-3">
          <label className="form-label fw-semibold">
            De ce a încetat sporturile anterioare? (opțional)
          </label>
          <p className="text-muted small mb-2">
            Înțelegerea motivelor ne ajută să recomandăm sporturi care evită aceleași probleme.
          </p>
          <div className="row g-2">
            {[
              { value: "bored", label: "S-a plictisit / Nu i-a plăcut" },
              { value: "too-difficult", label: "A fost prea dificil" },
              { value: "injury", label: "Accidentare" },
              { value: "conflict", label: "Conflict cu antrenorul sau colegii" },
              { value: "cost", label: "Costuri prea mari" },
              { value: "schedule", label: "Program incompatibil" },
              { value: "other", label: "Alt motiv" },
            ].map((reason) => {
              const isSelected = whyStoppedSports.includes(reason.value);
              return (
                <div key={reason.value} className="col-12 col-md-6">
                  <button
                    type="button"
                    className={`btn w-100 text-start btn-sm ${
                      isSelected ? "btn-info" : "btn-outline-secondary"
                    }`}
                    onClick={() => toggleWhyStoppedReason(reason.value)}
                    aria-pressed={isSelected}
                  >
                    <i
                      className={`bi ${isSelected ? "bi-check-square-fill" : "bi-square"} me-2`}
                    ></i>
                    {reason.label}
                  </button>
                </div>
              );
            })}
          </div>
          {whyStoppedSports.length > 0 && (
            <div className="mt-2">
              <small className="text-info">
                {whyStoppedSports.length}{" "}
                {whyStoppedSports.length === 1 ? "motiv selectat" : "motive selectate"}
              </small>
            </div>
          )}
        </div>
      )}

      {/* Injury Details Form (conditional - only if "injury" selected) */}
      {whyStoppedSports.includes("injury") && (
        <div className="mb-3 p-3 bg-light rounded border border-warning">
          <div className="d-flex align-items-center gap-2 mb-3">
            <i className="bi bi-exclamation-triangle-fill text-warning fs-5"></i>
            <h6 className="mb-0 fw-semibold">Detalii despre accidentare</h6>
          </div>
          <p className="text-muted small mb-3">
            Aceste informații ne ajută să recomandăm sporturi sigure și să evităm accidentări
            similare.
          </p>

          {/* Injury Type */}
          <div className="mb-3">
            <label htmlFor="injuryType" className="form-label fw-semibold">
              Tip accidentare
            </label>
            <select
              className="form-select"
              id="injuryType"
              value={injuryDetails.type || ""}
              onChange={(e) =>
                updateInjuryDetail("type", e.target.value as typeof injuryDetails.type)
              }
            >
              <option value="">Selectează tipul...</option>
              <option value="fracture">Fractură</option>
              <option value="growth-plate">Fractură placa de creștere</option>
              <option value="dislocation">Luxație</option>
              <option value="sprain">Entorsă</option>
              <option value="concussion">Contuzie</option>
              <option value="other">Altele</option>
            </select>
          </div>

          {/* When it happened */}
          <div className="mb-3">
            <label htmlFor="injuryWhen" className="form-label fw-semibold">
              Când s-a întâmplat?
            </label>
            <select
              className="form-select"
              id="injuryWhen"
              value={injuryDetails.when || ""}
              onChange={(e) =>
                updateInjuryDetail("when", e.target.value as typeof injuryDetails.when)
              }
            >
              <option value="">Selectează...</option>
              <option value="<1month">Mai puțin de 1 lună</option>
              <option value="1-3months">1-3 luni</option>
              <option value="3-6months">3-6 luni</option>
              <option value="6-12months">6-12 luni</option>
              <option value=">1year">Mai mult de 1 an</option>
            </select>
          </div>

          {/* Fully healed */}
          <div className="mb-3">
            <label className="form-label fw-semibold mb-2">A fost rezolvată complet?</label>
            <div className="d-flex gap-2 flex-wrap">
              <button
                type="button"
                className={`btn ${
                  injuryDetails.healed === true ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => updateInjuryDetail("healed", true)}
                aria-pressed={injuryDetails.healed === true}
              >
                <i className="bi bi-check-circle me-2"></i>
                Da
              </button>
              <button
                type="button"
                className={`btn ${
                  injuryDetails.healed === false ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={() => updateInjuryDetail("healed", false)}
                aria-pressed={injuryDetails.healed === false}
              >
                <i className="bi bi-x-circle me-2"></i>
                Nu
              </button>
              <button
                type="button"
                className={`btn ${
                  injuryDetails.healed === null || injuryDetails.healed === undefined
                    ? "btn-secondary"
                    : "btn-outline-secondary"
                }`}
                onClick={() => updateInjuryDetail("healed", null)}
                aria-pressed={injuryDetails.healed === null || injuryDetails.healed === undefined}
              >
                <i className="bi bi-question-circle me-2"></i>
                Neclar
              </button>
            </div>
          </div>

          {/* Current restrictions */}
          <div className="mb-0">
            <label className="form-label fw-semibold mb-2">
              Există restricții medicale curente?
            </label>
            <div className="d-flex gap-2">
              <button
                type="button"
                className={`btn ${
                  injuryDetails.restrictions === true ? "btn-warning" : "btn-outline-warning"
                }`}
                onClick={() => updateInjuryDetail("restrictions", true)}
                aria-pressed={injuryDetails.restrictions === true}
              >
                <i className="bi bi-exclamation-triangle me-2"></i>
                Da
              </button>
              <button
                type="button"
                className={`btn ${
                  injuryDetails.restrictions === false ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => updateInjuryDetail("restrictions", false)}
                aria-pressed={injuryDetails.restrictions === false}
              >
                <i className="bi bi-check-circle me-2"></i>
                Nu
              </button>
            </div>
            {injuryDetails.restrictions === true && (
              <div className="alert alert-warning d-flex align-items-start gap-2 mt-2 mb-0 py-2">
                <i className="bi bi-info-circle-fill flex-shrink-0 mt-1"></i>
                <small className="mb-0">
                  Restricțiile medicale vor fi luate în considerare în recomandările noastre. Vă
                  recomandăm să consultați un medic înainte de a începe un nou sport.
                </small>
              </div>
            )}
          </div>
        </div>
      )}
    </QuestionWrapper>
  );
});

export default InterestsQuestion;

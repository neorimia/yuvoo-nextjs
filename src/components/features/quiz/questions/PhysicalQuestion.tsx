/**
 * Physical Build Question Component (Question 5)
 *
 * Collects child's physical build, coordination level, and medical safety screening.
 */

"use client";

import React, { memo, useEffect } from "react";
import { useQuiz } from "../QuizContext";
import QuestionWrapper from "../QuestionWrapper";

type PhysicalBuild = "slim" | "average" | "athletic";
type CoordinationLevel = "excellent" | "good" | "developing" | "challenges";

interface BuildOption {
  value: PhysicalBuild;
  label: string;
  icon: string;
  description: string;
}

interface CoordinationOption {
  value: CoordinationLevel;
  label: string;
  description: string;
}

const BUILD_OPTIONS: BuildOption[] = [
  {
    value: "slim",
    label: "Subțire",
    icon: "🌱",
    description: "Constituție mai subțire",
  },
  {
    value: "average",
    label: "Mediu",
    icon: "⭐",
    description: "Constituție medie",
  },
  {
    value: "athletic",
    label: "Atletic",
    icon: "💪",
    description: "Constituție atletică",
  },
];

const COORDINATION_OPTIONS: CoordinationOption[] = [
  {
    value: "excellent",
    label: "Foarte bine coordonat",
    description: "Excelează la activități care necesită coordonare",
  },
  {
    value: "good",
    label: "Coordonare bună",
    description: "Se descurcă bine la majoritatea activităților fizice",
  },
  {
    value: "developing",
    label: "Încă dezvoltă coordonarea",
    description: "Își dezvoltă abilitățile motorii pe măsură ce crește",
  },
  {
    value: "challenges",
    label: "Dificultăți de coordonare",
    description: "Are nevoie de mai mult timp pentru a stăpâni mișcările",
  },
];

const PhysicalQuestion = memo(function PhysicalQuestion() {
  const { answers, setAnswer, errors } = useQuiz();

  const handleBuildChange = (build: PhysicalBuild) => {
    setAnswer("physicalBuild", build);
  };

  const handleCoordinationChange = (coordination: CoordinationLevel) => {
    setAnswer("coordinationLevel", coordination);
  };

  const toggleHealthCondition = (condition: string) => {
    // Prevent manual toggling of asthma and joint-pain (handled by severity dropdowns)
    if (condition === "asthma" || condition === "joint-pain") {
      return;
    }

    const current = answers.healthConditions || [];
    const updated = current.includes(condition)
      ? current.filter((c) => c !== condition)
      : [...current, condition];
    setAnswer("healthConditions", updated.length > 0 ? updated : undefined);
  };

  const handleConsiderationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setAnswer("physicalConsiderations", value || undefined);
  };

  const healthConditions = answers.healthConditions || [];
  const hasHealthConditions = healthConditions.length > 0;

  // Sync severity levels with healthConditions array for backward compatibility
  useEffect(() => {
    const currentConditions = answers.healthConditions || [];
    const newConditions = [...currentConditions];

    // Sync asthma severity
    const hasAsthmaInConditions = newConditions.includes("asthma");
    const shouldHaveAsthma = answers.asthmaSeverity && answers.asthmaSeverity !== "none";

    if (shouldHaveAsthma && !hasAsthmaInConditions) {
      newConditions.push("asthma");
    } else if (!shouldHaveAsthma && hasAsthmaInConditions) {
      const index = newConditions.indexOf("asthma");
      if (index > -1) newConditions.splice(index, 1);
    }

    // Sync joint pain severity
    const hasJointPainInConditions = newConditions.includes("joint-pain");
    const shouldHaveJointPain = answers.jointPainSeverity && answers.jointPainSeverity !== "none";

    if (shouldHaveJointPain && !hasJointPainInConditions) {
      newConditions.push("joint-pain");
    } else if (!shouldHaveJointPain && hasJointPainInConditions) {
      const index = newConditions.indexOf("joint-pain");
      if (index > -1) newConditions.splice(index, 1);
    }

    // Only update if there's a change to avoid infinite loops
    if (JSON.stringify(newConditions.sort()) !== JSON.stringify(currentConditions.sort())) {
      setAnswer("healthConditions", newConditions.length > 0 ? newConditions : undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers.asthmaSeverity, answers.jointPainSeverity]);

  return (
    <QuestionWrapper
      title="Sănătate și abilități fizice"
      description="Pentru a recomanda sporturi sigure și potrivite, avem nevoie să înțelegem nivelul de coordonare și orice considerații medicale. Toate informațiile sunt confidențiale."
      helpText="Informațiile despre sănătate ne ajută să recomandăm sporturi sigure și adaptate nevoilor copilului tău."
      error={errors.physicalBuild || errors.coordinationLevel}
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
                className={`btn w-100 h-100 p-3 p-md-4 position-relative ${
                  answers.physicalBuild === option.value
                    ? "btn-yuvoo-primary"
                    : "btn-yuvoo-outline-primary"
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
                      answers.physicalBuild === option.value ? "text-white-80" : "text-muted"
                    }
                  >
                    {option.description}
                  </small>
                </div>
                {answers.physicalBuild === option.value && (
                  <i className="bi bi-check-circle-fill position-absolute top-0 end-0 m-2 fs-5 text-white"></i>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Coordination level selection */}
      <div className="mb-4">
        <label className="form-label fw-semibold">
          Nivel de coordonare <span className="text-danger">*</span>
        </label>
        <p className="text-muted small mb-2">
          Cât de bine se descurcă copilul tău la activități care necesită coordonare (prindere
          minge, echilibru, alergare, etc.)?
        </p>
        <div className="row g-2">
          {COORDINATION_OPTIONS.map((option) => (
            <div key={option.value} className="col-12 col-md-6">
              <button
                type="button"
                className={`btn w-100 text-start p-3 ${
                  answers.coordinationLevel === option.value
                    ? "btn-yuvoo-primary"
                    : "btn-outline-secondary"
                }`}
                onClick={() => handleCoordinationChange(option.value)}
                aria-pressed={answers.coordinationLevel === option.value}
              >
                <div className="fw-semibold mb-1">{option.label}</div>
                <small
                  className={
                    answers.coordinationLevel === option.value ? "text-white-80" : "text-muted"
                  }
                >
                  {option.description}
                </small>
                {answers.coordinationLevel === option.value && (
                  <i className="bi bi-check-circle-fill position-absolute top-0 end-0 m-2"></i>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Health conditions screening */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Considerații medicale (opțional)</label>
        <p className="text-muted small mb-2">
          Selectează dacă copilul are una dintre aceste condiții. Dacă medicul a recomandat
          restricții pentru activități fizice, te rugăm să menționezi mai jos.
        </p>

        {/* Asthma Severity Dropdown */}
        <div className="mb-3">
          <label htmlFor="asthmaSeverity" className="form-label fw-semibold">
            Astm sau probleme respiratorii
          </label>
          <select
            className="form-select"
            id="asthmaSeverity"
            value={answers.asthmaSeverity || "none"}
            onChange={(e) =>
              setAnswer("asthmaSeverity", e.target.value as "none" | "mild" | "moderate" | "severe")
            }
          >
            <option value="none">Fără astm</option>
            <option value="mild">Astm ușor (controlat cu medicație, fără simptome zilnice)</option>
            <option value="moderate">
              Astm moderat (simptome ocazionale, folosește inhaler înainte de sport)
            </option>
            <option value="severe">
              Astm sever (spitalizare în ultimul an sau simptome frecvente)
            </option>
          </select>

          {/* Follow-up question for inhaler use */}
          {answers.asthmaSeverity && answers.asthmaSeverity !== "none" && (
            <div className="mt-3">
              <label className="form-label fw-semibold">
                Copilul folosește inhaler înainte de activități fizice?
              </label>
              <div className="d-flex gap-2 flex-wrap">
                <button
                  type="button"
                  className={`btn ${
                    answers.inhalerUse === "yes" ? "btn-success" : "btn-outline-success"
                  }`}
                  onClick={() => setAnswer("inhalerUse", "yes")}
                  aria-pressed={answers.inhalerUse === "yes"}
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Da
                </button>
                <button
                  type="button"
                  className={`btn ${
                    answers.inhalerUse === "no" ? "btn-danger" : "btn-outline-danger"
                  }`}
                  onClick={() => setAnswer("inhalerUse", "no")}
                  aria-pressed={answers.inhalerUse === "no"}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Nu
                </button>
                <button
                  type="button"
                  className={`btn ${
                    answers.inhalerUse === "sometimes" ? "btn-warning" : "btn-outline-warning"
                  }`}
                  onClick={() => setAnswer("inhalerUse", "sometimes")}
                  aria-pressed={answers.inhalerUse === "sometimes"}
                >
                  <i className="bi bi-question-circle me-2"></i>
                  Ocazional
                </button>
              </div>
              <div className="form-text mt-1">
                <i className="bi bi-info-circle me-1"></i>
                Această informație ne ajută să recomandăm sporturi potrivite și să asigurăm că
                copilul are acces la medicație când este necesar.
              </div>
            </div>
          )}
        </div>

        {/* Joint Pain Severity Dropdown */}
        <div className="mb-3">
          <label htmlFor="jointPainSeverity" className="form-label fw-semibold">
            Dureri articulare sau osoase
          </label>
          <select
            className="form-select"
            id="jointPainSeverity"
            value={answers.jointPainSeverity || "none"}
            onChange={(e) =>
              setAnswer(
                "jointPainSeverity",
                e.target.value as "none" | "mild" | "moderate" | "severe"
              )
            }
          >
            <option value="none">Fără dureri articulare</option>
            <option value="mild">Dureri ușoare ocazionale (după efort intens)</option>
            <option value="moderate">
              Dureri moderate frecvente (afectează activitățile zilnice ocazional)
            </option>
            <option value="severe">
              Dureri severe persistente (afectează activitățile zilnice)
            </option>
          </select>
          {answers.jointPainSeverity && answers.jointPainSeverity !== "none" && (
            <div className="form-text mt-1">
              <i className="bi bi-info-circle me-1"></i>
              Durerile articulare pot indica nevoia de evaluare ortopedică pentru a identifica
              sporturile potrivite.
            </div>
          )}
        </div>

        {/* Other health conditions (checkboxes) */}
        <div className="mb-2">
          <label className="form-label fw-semibold">Alte condiții medicale</label>
          <div className="row g-2">
            {[
              { value: "allergies", label: "Alergii severe (poți specifica mai jos)" },
              { value: "vision", label: "Probleme de vedere (necesită ochelari)" },
              { value: "hearing", label: "Probleme de auz" },
              { value: "recent-injury", label: "Accidentare recentă (ultimele 3 luni)" },
              { value: "chronic-condition", label: "Condiție cronică (diabet, epilepsie, etc.)" },
              { value: "doctor-restrictions", label: "Medicul a recomandat restricții" },
            ].map((condition) => {
              const isSelected = healthConditions.includes(condition.value);
              return (
                <div key={condition.value} className="col-12 col-md-6">
                  <button
                    type="button"
                    className={`btn w-100 text-start btn-sm ${
                      isSelected ? "btn-warning" : "btn-outline-secondary"
                    }`}
                    style={{ minHeight: "40px" }}
                    onClick={() => toggleHealthCondition(condition.value)}
                    aria-pressed={isSelected}
                  >
                    <i
                      className={`bi ${isSelected ? "bi-check-square-fill" : "bi-square"} me-2`}
                    ></i>
                    {condition.label}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {hasHealthConditions && (
          <div className="alert alert-info d-flex align-items-start gap-2 mt-3 mb-0 py-2">
            <i className="bi bi-info-circle-fill flex-shrink-0 mt-1"></i>
            <small className="mb-0">
              Recomandările noastre vor ține cont de aceste aspecte. Pentru condiții medicale
              serioase, te încurajăm să consulți un medic pediatru înainte de a începe un nou sport.
            </small>
          </div>
        )}
      </div>

      {/* Physical considerations (optional - detailed notes) */}
      <div className="mb-3">
        <label htmlFor="physicalConsiderations" className="form-label fw-semibold">
          Detalii suplimentare (opțional)
        </label>
        <textarea
          className="form-control"
          id="physicalConsiderations"
          name="physicalConsiderations"
          rows={3}
          value={answers.physicalConsiderations || ""}
          onChange={handleConsiderationsChange}
          placeholder="Exemplu: 'Are astm ușor, controlat cu medicație' sau 'Medicul a recomandat să evite sporturile de contact pentru încă 2 luni din cauza unei accidentări'"
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

/**
 * Critical Health Screening Question Component (Question 5)
 *
 * Screens for absolute contraindications (cardiac symptoms, concussion history)
 * that require medical evaluation before any sport recommendations.
 * This question appears BEFORE the general health question (PhysicalQuestion).
 */

"use client";

import React, { memo, useMemo } from "react";
import { useQuiz } from "../QuizContext";
import QuestionWrapper from "../QuestionWrapper";

type CriticalHealthAnswer = "yes" | "no" | "unknown";

const CriticalHealthScreeningQuestion = memo(function CriticalHealthScreeningQuestion() {
  const { answers, setAnswer, errors } = useQuiz();

  // Get current critical health answers or initialize (memoized to prevent unnecessary re-renders)
  const criticalHealth = useMemo(
    () =>
      answers.criticalHealth || {
        cardiacSymptoms: undefined,
        cardiacFamilyHistory: undefined,
        recentConcussion: undefined,
        multipleConcussions: undefined,
      },
    [answers.criticalHealth]
  );

  const handleCardiacSymptomsChange = (value: CriticalHealthAnswer) => {
    setAnswer("criticalHealth", {
      ...criticalHealth,
      cardiacSymptoms: value === "yes",
    });
  };

  const handleCardiacFamilyHistoryChange = (value: CriticalHealthAnswer) => {
    setAnswer("criticalHealth", {
      ...criticalHealth,
      cardiacFamilyHistory: value === "yes",
    });
  };

  const handleRecentConcussionChange = (value: CriticalHealthAnswer) => {
    setAnswer("criticalHealth", {
      ...criticalHealth,
      recentConcussion: value === "yes",
    });
  };

  const handleMultipleConcussionsChange = (value: CriticalHealthAnswer) => {
    setAnswer("criticalHealth", {
      ...criticalHealth,
      multipleConcussions: value === "yes",
    });
  };

  // Check if any critical condition is detected
  const hasCriticalCondition = useMemo(() => {
    return (
      criticalHealth.cardiacSymptoms === true ||
      criticalHealth.cardiacFamilyHistory === true ||
      criticalHealth.recentConcussion === true ||
      criticalHealth.multipleConcussions === true
    );
  }, [criticalHealth]);

  // Determine which specialist is needed
  const requiredSpecialist = useMemo(() => {
    if (criticalHealth.cardiacSymptoms || criticalHealth.cardiacFamilyHistory) {
      return "cardiolog";
    }
    if (criticalHealth.recentConcussion || criticalHealth.multipleConcussions) {
      return "neurolog";
    }
    return null;
  }, [criticalHealth]);

  const renderAnswerButton = (
    value: CriticalHealthAnswer,
    currentValue: boolean | undefined,
    onChange: (value: CriticalHealthAnswer) => void,
    label: string
  ) => {
    let isSelected = false;
    if (value === "yes") {
      isSelected = currentValue === true;
    } else if (value === "no") {
      isSelected = currentValue === false;
    } else if (value === "unknown") {
      isSelected = currentValue === undefined;
    }

    return (
      <button
        type="button"
        className={`btn ${isSelected ? "btn-yuvoo-primary" : "btn-outline-secondary"} flex-fill`}
        onClick={() => onChange(value)}
        aria-pressed={isSelected}
      >
        {label}
      </button>
    );
  };

  return (
    <QuestionWrapper
      title="Screening medical critic"
      description="Înainte de a continua, vă rugăm să răspundeți la câteva întrebări importante despre sănătatea copilului. Aceste informații ne ajută să identificăm condiții care necesită evaluare medicală înainte de recomandări sportive."
      helpText="Toate informațiile sunt confidențiale și folosite exclusiv pentru a oferi recomandări sigure."
      error={errors.criticalHealth}
    >
      {/* Cardiac Screening Section */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <i className="bi bi-heart-pulse-fill text-danger fs-4"></i>
          <h5 className="mb-0 fw-semibold">Screening cardiac</h5>
        </div>

        {/* Cardiac Symptoms Question */}
        <div className="mb-3">
          <label className="form-label fw-semibold mb-2">
            Copilul a avut vreodată durere în piept, palpitații sau leșin la efort fizic?
          </label>
          <p className="text-muted small mb-2">
            Aceste simptome pot indica probleme cardiace care necesită evaluare medicală.
          </p>
          <div className="d-flex gap-2 flex-wrap">
            {renderAnswerButton(
              "yes",
              criticalHealth.cardiacSymptoms,
              handleCardiacSymptomsChange,
              "Da"
            )}
            {renderAnswerButton(
              "no",
              criticalHealth.cardiacSymptoms,
              handleCardiacSymptomsChange,
              "Nu"
            )}
            {renderAnswerButton(
              "unknown",
              criticalHealth.cardiacSymptoms,
              handleCardiacSymptomsChange,
              "Nu sunt sigur/ă"
            )}
          </div>
        </div>

        {/* Cardiac Family History Question */}
        <div className="mb-3">
          <label className="form-label fw-semibold mb-2">
            Există istoric familial de moarte cardiacă sub 50 ani?
          </label>
          <p className="text-muted small mb-2">
            Istoricul familial de probleme cardiace poate indica risc genetic.
          </p>
          <div className="d-flex gap-2 flex-wrap">
            {renderAnswerButton(
              "yes",
              criticalHealth.cardiacFamilyHistory,
              handleCardiacFamilyHistoryChange,
              "Da"
            )}
            {renderAnswerButton(
              "no",
              criticalHealth.cardiacFamilyHistory,
              handleCardiacFamilyHistoryChange,
              "Nu"
            )}
            {renderAnswerButton(
              "unknown",
              criticalHealth.cardiacFamilyHistory,
              handleCardiacFamilyHistoryChange,
              "Nu sunt sigur/ă"
            )}
          </div>
        </div>
      </div>

      {/* Concussion Screening Section */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <i className="bi bi-shield-exclamation text-warning fs-4"></i>
          <h5 className="mb-0 fw-semibold">Screening concuzie</h5>
        </div>

        {/* Recent Concussion Question */}
        <div className="mb-3">
          <label className="form-label fw-semibold mb-2">
            Copilul a avut concuzie în ultimele 3 luni?
          </label>
          <p className="text-muted small mb-2">
            Concuziile recente necesită vindecare completă înainte de sporturi de contact.
          </p>
          <div className="d-flex gap-2 flex-wrap">
            {renderAnswerButton(
              "yes",
              criticalHealth.recentConcussion,
              handleRecentConcussionChange,
              "Da"
            )}
            {renderAnswerButton(
              "no",
              criticalHealth.recentConcussion,
              handleRecentConcussionChange,
              "Nu"
            )}
            {renderAnswerButton(
              "unknown",
              criticalHealth.recentConcussion,
              handleRecentConcussionChange,
              "Nu sunt sigur/ă"
            )}
          </div>
        </div>

        {/* Multiple Concussions Question */}
        <div className="mb-3">
          <label className="form-label fw-semibold mb-2">
            Copilul a avut 2 sau mai multe concuzii în ultimii 2 ani?
          </label>
          <p className="text-muted small mb-2">
            Concuziile multiple cresc riscul de probleme neurologice și necesită evaluare
            specializată.
          </p>
          <div className="d-flex gap-2 flex-wrap">
            {renderAnswerButton(
              "yes",
              criticalHealth.multipleConcussions,
              handleMultipleConcussionsChange,
              "Da"
            )}
            {renderAnswerButton(
              "no",
              criticalHealth.multipleConcussions,
              handleMultipleConcussionsChange,
              "Nu"
            )}
            {renderAnswerButton(
              "unknown",
              criticalHealth.multipleConcussions,
              handleMultipleConcussionsChange,
              "Nu sunt sigur/ă"
            )}
          </div>
        </div>
      </div>

      {/* Warning Alert - Shown when critical condition detected */}
      {hasCriticalCondition && (
        <div
          className="alert alert-warning d-flex align-items-start gap-3 mb-0 shadow-sm"
          role="alert"
          style={{
            borderLeft: "5px solid #ffc107",
            backgroundColor: "#fffbf0",
            animation: "fadeIn 0.3s ease-in",
          }}
        >
          <i className="bi bi-exclamation-triangle-fill fs-3 flex-shrink-0 mt-1 text-warning"></i>
          <div className="flex-grow-1">
            <strong className="d-block mb-2 text-warning fs-6">
              ⚠️ Evaluare medicală recomandată
            </strong>
            <p className="mb-2">
              {requiredSpecialist === "cardiolog" && (
                <>
                  Simptomele cardiace detectate necesită evaluare cardiologică pediatrică înainte de
                  orice activitate sportivă. Acesta este un pas important pentru siguranța
                  copilului.
                </>
              )}
              {requiredSpecialist === "neurolog" && (
                <>
                  Istoricul de concuzie necesită evaluare neurologică pediatrică înainte de a
                  continua cu activități sportive. Vindecarea completă este esențială pentru
                  siguranță.
                </>
              )}
              {!requiredSpecialist && (
                <>
                  Condițiile detectate necesită evaluare medicală specializată înainte de orice
                  activitate sportivă. Recomandările noastre vor ține cont de aceste aspecte.
                </>
              )}
            </p>
            <p className="mb-0 small">
              <strong>Puteți continua</strong> cu chestionarul, dar vă recomandăm să consultați un{" "}
              {requiredSpecialist === "cardiolog" && "cardiolog pediatric"}
              {requiredSpecialist === "neurolog" && "neurolog pediatric"}
              {!requiredSpecialist && "specialist medical"} înainte de a începe orice sport nou.
            </p>
          </div>
        </div>
      )}

      {/* Info Box - Always shown */}
      <div className="alert alert-info d-flex align-items-start gap-2 mt-3 mb-0 py-2">
        <i className="bi bi-info-circle-fill flex-shrink-0 mt-1"></i>
        <small className="mb-0">
          Aceste întrebări ne ajută să identificăm condiții care necesită atenție medicală specială.
          Recomandările noastre vor exclude sporturile nesigure și vor sugera consultare medicală
          când este necesar.
        </small>
      </div>
    </QuestionWrapper>
  );
});

export default CriticalHealthScreeningQuestion;

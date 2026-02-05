"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import {
  CONSENT_TYPES,
  CONSENT_TEXTS,
  CURRENT_PRIVACY_POLICY_VERSION,
  type ConsentType,
} from "@/lib/consent/constants";

// ============================================================================
// Constants
// ============================================================================

const SESSION_STORAGE_KEY = "yuvoo_quiz_consents";
const ANIMATION_DURATION = 300; // ms

// ============================================================================
// Types
// ============================================================================

export interface QuizConsents {
  childDataRecommendations: boolean;
  healthDataRecommendations: boolean;
  shareWithClubs: boolean;
  specialistSuggestions: boolean;
  marketingCommunications: boolean;
}

interface QuizConsentSectionProps {
  onConsentsChange: (consents: QuizConsents, allRequiredGranted: boolean) => void;
  onContinue: () => void;
  initialConsents?: Partial<QuizConsents>;
  disabled?: boolean;
  /** Persist consent state to sessionStorage for recovery on page refresh */
  persistToSession?: boolean;
  /** Show policy version info section */
  showPolicyVersion?: boolean;
  /** Callback when user expands a consent item for more details (analytics) */
  onConsentExpanded?: (consentType: ConsentType) => void;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Map consent state to consent types for server action
 */
export function mapConsentsToTypes(consents: QuizConsents): ConsentType[] {
  const granted: ConsentType[] = [];
  if (consents.childDataRecommendations) {
    granted.push(CONSENT_TYPES.CHILD_DATA_RECOMMENDATIONS);
  }
  if (consents.healthDataRecommendations) {
    granted.push(CONSENT_TYPES.HEALTH_DATA_RECOMMENDATIONS);
  }
  if (consents.shareWithClubs) {
    granted.push(CONSENT_TYPES.SHARE_WITH_CLUBS);
  }
  if (consents.specialistSuggestions) {
    granted.push(CONSENT_TYPES.SPECIALIST_SUGGESTIONS);
  }
  if (consents.marketingCommunications) {
    granted.push(CONSENT_TYPES.MARKETING_COMMUNICATIONS);
  }
  return granted;
}

/**
 * Check if all required consents are granted
 */
export function areRequiredConsentsGranted(consents: QuizConsents): boolean {
  return (
    consents.childDataRecommendations &&
    consents.healthDataRecommendations &&
    consents.shareWithClubs
  );
}

// ============================================================================
// Component
// ============================================================================

/**
 * QuizConsentSection - GDPR-compliant consent collection before quiz
 *
 * Features:
 * - Granular consent for each processing purpose (GDPR Art. 7)
 * - Explicit consent for health data (GDPR Art. 9(2)(a))
 * - AI/automated decision-making disclosure (GDPR Art. 22)
 * - Clear separation of required and optional consents
 * - Policy version tracking for audit trail
 * - Session persistence for recovery on page refresh
 * - Focus management for accessibility
 * - All text in Romanian
 */
export function QuizConsentSection({
  onConsentsChange,
  onContinue,
  initialConsents = {},
  disabled = false,
  persistToSession = true,
  showPolicyVersion = true,
  onConsentExpanded,
}: QuizConsentSectionProps) {
  // Refs for accessibility focus management
  const firstErrorRef = useRef<HTMLInputElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const continueButtonRef = useRef<HTMLButtonElement>(null);

  // Initialize state from sessionStorage or props
  const [consents, setConsents] = useState<QuizConsents>(() => {
    // Try to restore from sessionStorage first
    if (persistToSession && typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as Partial<QuizConsents>;
          return {
            childDataRecommendations:
              parsed.childDataRecommendations ?? initialConsents.childDataRecommendations ?? false,
            healthDataRecommendations:
              parsed.healthDataRecommendations ??
              initialConsents.healthDataRecommendations ??
              false,
            shareWithClubs: parsed.shareWithClubs ?? initialConsents.shareWithClubs ?? false,
            specialistSuggestions:
              parsed.specialistSuggestions ?? initialConsents.specialistSuggestions ?? false,
            marketingCommunications:
              parsed.marketingCommunications ?? initialConsents.marketingCommunications ?? false,
          };
        }
      } catch {
        // Ignore sessionStorage errors
      }
    }
    // Fall back to initial consents
    return {
      childDataRecommendations: initialConsents.childDataRecommendations ?? false,
      healthDataRecommendations: initialConsents.healthDataRecommendations ?? false,
      shareWithClubs: initialConsents.shareWithClubs ?? false,
      specialistSuggestions: initialConsents.specialistSuggestions ?? false,
      marketingCommunications: initialConsents.marketingCommunications ?? false,
    };
  });

  const [showErrors, setShowErrors] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const allRequiredGranted = areRequiredConsentsGranted(consents);

  // Persist to sessionStorage when consents change
  useEffect(() => {
    if (persistToSession && typeof window !== "undefined") {
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(consents));
      } catch {
        // Ignore sessionStorage errors
      }
    }
  }, [consents, persistToSession]);

  // Focus first error when validation fails
  useEffect(() => {
    if (showErrors && !allRequiredGranted) {
      // Focus the error summary for screen readers
      errorSummaryRef.current?.focus();

      // After animation, focus first unchecked required consent
      setTimeout(() => {
        const firstUnchecked = document.querySelector<HTMLInputElement>(
          ".consent-checkbox-item.border-danger input[type='checkbox']"
        );
        firstUnchecked?.focus();
      }, ANIMATION_DURATION);
    }
  }, [showErrors, allRequiredGranted]);

  const handleChange = useCallback(
    (key: keyof QuizConsents, value: boolean) => {
      const updated = { ...consents, [key]: value };
      setConsents(updated);
      onConsentsChange(updated, areRequiredConsentsGranted(updated));

      // Clear error state if user checks the box
      if (value && showErrors) {
        const stillHasErrors = !areRequiredConsentsGranted(updated);
        if (!stillHasErrors) {
          setShowErrors(false);
        }
      }
    },
    [consents, onConsentsChange, showErrors]
  );

  const handleContinue = useCallback(() => {
    if (!allRequiredGranted) {
      setShowErrors(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
      return;
    }

    // Clear sessionStorage on successful continue
    if (persistToSession && typeof window !== "undefined") {
      try {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      } catch {
        // Ignore sessionStorage errors
      }
    }

    onContinue();
  }, [allRequiredGranted, onContinue, persistToSession]);

  // Handle consent expansion for analytics
  const handleConsentExpanded = useCallback(
    (consentType: ConsentType) => {
      onConsentExpanded?.(consentType);
    },
    [onConsentExpanded]
  );

  return (
    <div className="quiz-consent-section">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="mb-3">
          <i
            className="bi bi-shield-check"
            style={{ fontSize: "3rem", color: "var(--yuvoo-primary, #6366f1)" }}
          />
        </div>
        <h2 className="h4 mb-2">Protecția datelor copilului tău</h2>
        <p className="text-muted">
          Înainte de a începe chestionarul, te rugăm să citești și să accepți modul în care vom
          folosi datele copilului tău pentru a genera recomandări personalizate.
        </p>
      </div>

      {/* AI Transparency Notice */}
      <div className="alert alert-info mb-4">
        <div className="d-flex">
          <i className="bi bi-robot me-3" style={{ fontSize: "1.5rem" }} />
          <div>
            <strong>Recomandări generate cu AI</strong>
            <p className="mb-0 small">
              Yuvoo folosește inteligența artificială pentru a analiza răspunsurile tale și a genera
              recomandări sportive personalizate. Ai dreptul să soliciți o revizuire umană a
              oricărei recomandări.{" "}
              <Link href={routes.privacy} target="_blank" className="alert-link">
                Află mai multe
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Required Consents */}
      <div className="consent-section mb-4">
        <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-asterisk text-danger" />
          Consimțământuri obligatorii
          <span className="badge bg-danger">Necesare pentru serviciu</span>
        </h6>

        {/* Child Data Consent */}
        <ConsentCheckboxItem
          id="consent-child-data"
          checked={consents.childDataRecommendations}
          onChange={(v) => handleChange("childDataRecommendations", v)}
          disabled={disabled}
          required
          error={
            showErrors && !consents.childDataRecommendations
              ? "Acest consimțământ este obligatoriu pentru a continua"
              : undefined
          }
          consentType={CONSENT_TYPES.CHILD_DATA_RECOMMENDATIONS}
          onExpanded={handleConsentExpanded}
          inputRef={!consents.childDataRecommendations ? firstErrorRef : undefined}
        />

        {/* Health Data Consent */}
        <ConsentCheckboxItem
          id="consent-health-data"
          checked={consents.healthDataRecommendations}
          onChange={(v) => handleChange("healthDataRecommendations", v)}
          disabled={disabled}
          required
          error={
            showErrors && !consents.healthDataRecommendations
              ? "Acest consimțământ este obligatoriu pentru a continua"
              : undefined
          }
          consentType={CONSENT_TYPES.HEALTH_DATA_RECOMMENDATIONS}
          onExpanded={handleConsentExpanded}
          inputRef={
            consents.childDataRecommendations && !consents.healthDataRecommendations
              ? firstErrorRef
              : undefined
          }
        />

        {/* Club Sharing Consent */}
        <ConsentCheckboxItem
          id="consent-share-clubs"
          checked={consents.shareWithClubs}
          onChange={(v) => handleChange("shareWithClubs", v)}
          disabled={disabled}
          required
          error={
            showErrors && !consents.shareWithClubs
              ? "Acest consimțământ este obligatoriu pentru a continua"
              : undefined
          }
          consentType={CONSENT_TYPES.SHARE_WITH_CLUBS}
          onExpanded={handleConsentExpanded}
          inputRef={
            consents.childDataRecommendations &&
            consents.healthDataRecommendations &&
            !consents.shareWithClubs
              ? firstErrorRef
              : undefined
          }
        />
      </div>

      {/* Optional Consents */}
      <div className="consent-section mb-4">
        <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-plus-circle text-secondary" />
          Consimțământuri opționale
          <span className="badge bg-secondary">Nu afectează serviciul</span>
        </h6>

        {/* Specialist Suggestions */}
        <ConsentCheckboxItem
          id="consent-specialist"
          checked={consents.specialistSuggestions}
          onChange={(v) => handleChange("specialistSuggestions", v)}
          disabled={disabled}
          consentType={CONSENT_TYPES.SPECIALIST_SUGGESTIONS}
          onExpanded={handleConsentExpanded}
        />

        {/* Marketing Communications */}
        <ConsentCheckboxItem
          id="consent-marketing"
          checked={consents.marketingCommunications}
          onChange={(v) => handleChange("marketingCommunications", v)}
          disabled={disabled}
          consentType={CONSENT_TYPES.MARKETING_COMMUNICATIONS}
          onExpanded={handleConsentExpanded}
        />
      </div>

      {/* Policy Version Info */}
      {showPolicyVersion && (
        <div className="consent-policy-info bg-light rounded p-3 mb-4">
          <div className="d-flex align-items-start gap-2">
            <i className="bi bi-info-circle text-muted mt-1" aria-hidden="true" />
            <div className="small text-muted">
              <p className="mb-1">
                <strong>Versiunea politicii:</strong> {CURRENT_PRIVACY_POLICY_VERSION}
              </p>
              <p className="mb-1">
                Poți retrage orice consimțământ oricând din{" "}
                <Link href={routes.parent.settings}>setările contului</Link> sau contactându-ne la{" "}
                <a href="mailto:gdpr@yuvoo.ro">gdpr@yuvoo.ro</a>.
              </p>
              <p className="mb-0">
                Citește{" "}
                <Link href={routes.privacy} target="_blank">
                  Politica de confidențialitate
                </Link>{" "}
                și{" "}
                <Link href={routes.gdpr} target="_blank">
                  GDPR pentru părinți
                </Link>{" "}
                pentru detalii complete.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Summary - with live region for screen readers */}
      {showErrors && !allRequiredGranted && (
        <div
          ref={errorSummaryRef}
          className={`alert alert-danger mb-4 ${isAnimating ? "animate-shake" : ""}`}
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
        >
          <i className="bi bi-exclamation-triangle me-2" aria-hidden="true" />
          Te rugăm să accepți toate consimțământurile obligatorii pentru a continua.
        </div>
      )}

      {/* Continue Button */}
      <div className="d-grid">
        <button
          ref={continueButtonRef}
          id="consent-continue-btn"
          type="button"
          className={`btn btn-yuvoo-primary btn-lg ${disabled ? "btn-disabled" : ""}`}
          onClick={handleContinue}
          disabled={disabled}
          aria-describedby={showErrors && !allRequiredGranted ? "consent-error-summary" : undefined}
        >
          <i className="bi bi-arrow-right me-2" aria-hidden="true" />
          Continuă cu chestionarul
        </button>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-4px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(4px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .consent-checkbox-item {
          transition:
            border-color 0.2s ease,
            background-color 0.2s ease;
        }
        .consent-checkbox-item:hover:not(.border-danger) {
          border-color: var(--yuvoo-primary, #6366f1) !important;
          background-color: rgba(99, 102, 241, 0.02);
        }
        .consent-checkbox-item.border-danger {
          animation: pulse-border 1s ease-in-out;
        }
        @keyframes pulse-border {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.1);
          }
        }
      `}</style>
    </div>
  );
}

// ============================================================================
// Sub-component
// ============================================================================

interface ConsentCheckboxItemProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  consentType: ConsentType;
  onExpanded?: (consentType: ConsentType) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

function ConsentCheckboxItem({
  id,
  checked,
  onChange,
  disabled = false,
  required = false,
  error,
  consentType,
  onExpanded,
  inputRef,
}: ConsentCheckboxItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const consentText = CONSENT_TEXTS[consentType];

  const handleToggleExpand = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    if (newExpanded && onExpanded) {
      onExpanded(consentType);
    }
  };

  return (
    <div
      className={`consent-checkbox-item border rounded p-3 mb-3 ${error ? "border-danger" : ""} ${checked ? "border-success bg-opacity-5" : ""}`}
      style={{
        transition: "border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <div className="form-check d-flex align-items-start">
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          name={id}
          className={`form-check-input mt-1 ${error ? "is-invalid" : ""} ${checked ? " border-success" : ""}`}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          aria-describedby={`${id}-description ${id}-legal`}
          aria-invalid={!!error}
          aria-required={required}
          style={{
            cursor: disabled ? "not-allowed" : "pointer",
            transition: "background-color 0.2s ease, border-color 0.2s ease",
            minHeight: "20px",
            minWidth: "20px",
          }}
        />
        <div className="ms-2 flex-grow-1">
          <label
            className={`form-check-label fw-medium ${disabled ? "text-muted" : ""}`}
            htmlFor={id}
            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
          >
            {consentText.label}
            {required && (
              <span className="text-danger ms-1" aria-label="obligatoriu">
                *
              </span>
            )}
            {checked && (
              <i className="bi bi-check-circle-fill text-success ms-2" aria-hidden="true" />
            )}
          </label>

          {/* Collapsible description */}
          <div
            id={`${id}-description`}
            className={`text-muted small mt-1 ${isExpanded ? "" : "text-truncate-2"}`}
            style={{
              overflow: isExpanded ? "visible" : "hidden",
              maxHeight: isExpanded ? "none" : "3em",
              transition: "max-height 0.3s ease",
            }}
          >
            {consentText.description}
          </div>

          {/* Expand/collapse button */}
          <button
            type="button"
            className="btn btn-link btn-sm p-0 text-decoration-none text-muted"
            onClick={handleToggleExpand}
            aria-expanded={isExpanded}
            aria-controls={`${id}-description`}
          >
            <small>
              {isExpanded ? (
                <>
                  <i className="bi bi-chevron-up me-1" aria-hidden="true" />
                  Mai puțin
                </>
              ) : (
                <>
                  <i className="bi bi-chevron-down me-1" aria-hidden="true" />
                  Mai multe detalii
                </>
              )}
            </small>
          </button>

          {/* Legal basis - always visible when expanded */}
          {isExpanded && (
            <p id={`${id}-legal`} className="text-muted small mb-0 mt-2">
              <i className="bi bi-shield-check me-1" aria-hidden="true" />
              <em>Baza legală: {consentText.legalBasis}</em>
            </p>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-danger small mt-2 ms-4" role="alert" aria-live="polite">
          <i className="bi bi-exclamation-circle me-1" aria-hidden="true" />
          {error}
        </div>
      )}
    </div>
  );
}

export default QuizConsentSection;

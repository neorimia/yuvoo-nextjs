"use client";

import React, { useState, useCallback } from "react";
import { ConsentCheckbox } from "./ConsentCheckbox";
import {
  CONSENT_TEXTS,
  CONSENT_TYPES,
  CURRENT_PRIVACY_POLICY_VERSION,
  type ConsentType,
} from "@/lib/consent/constants";
import { routes } from "@/lib/routes";
import Link from "next/link";

/**
 * Consent state for health data processing
 */
export interface HealthDataConsents {
  childDataRecommendations: boolean;
  healthDataRecommendations: boolean;
  shareWithClubs: boolean;
  specialistSuggestions: boolean;
  marketingCommunications: boolean;
}

/**
 * Mapping from state keys to consent type enum values
 */
const CONSENT_KEY_MAP: Record<keyof HealthDataConsents, ConsentType> = {
  childDataRecommendations: CONSENT_TYPES.CHILD_DATA_RECOMMENDATIONS,
  healthDataRecommendations: CONSENT_TYPES.HEALTH_DATA_RECOMMENDATIONS,
  shareWithClubs: CONSENT_TYPES.SHARE_WITH_CLUBS,
  specialistSuggestions: CONSENT_TYPES.SPECIALIST_SUGGESTIONS,
  marketingCommunications: CONSENT_TYPES.MARKETING_COMMUNICATIONS,
};

interface HealthDataConsentFormProps {
  /** Callback when any consent changes */
  onConsentsChange: (consents: HealthDataConsents) => void;
  /** Initial consent states */
  initialConsents?: Partial<HealthDataConsents>;
  /** Whether to show optional consent section */
  showOptional?: boolean;
  /** Whether all checkboxes are disabled */
  disabled?: boolean;
  /** Error messages keyed by consent field */
  errors?: Partial<Record<keyof HealthDataConsents, string>>;
  /** Callback for validating required consents */
  onValidate?: (isValid: boolean, missingConsents: string[]) => void;
}

/**
 * HealthDataConsentForm - GDPR-compliant consent collection form
 *
 * Collects granular consent for:
 * - Child data processing (required)
 * - Health data processing (required)
 * - Club data sharing (required)
 * - Specialist suggestions (optional)
 * - Marketing communications (optional)
 *
 * GDPR Requirements:
 * - Art. 6: Legal basis for processing
 * - Art. 7: Conditions for consent
 * - Art. 9(2)(a): Explicit consent for health data
 */
export function HealthDataConsentForm({
  onConsentsChange,
  initialConsents = {},
  showOptional = true,
  disabled = false,
  errors = {},
  onValidate,
}: HealthDataConsentFormProps) {
  const [consents, setConsents] = useState<HealthDataConsents>({
    childDataRecommendations: initialConsents.childDataRecommendations ?? false,
    healthDataRecommendations: initialConsents.healthDataRecommendations ?? false,
    shareWithClubs: initialConsents.shareWithClubs ?? false,
    specialistSuggestions: initialConsents.specialistSuggestions ?? false,
    marketingCommunications: initialConsents.marketingCommunications ?? false,
  });

  const validateConsents = useCallback(
    (currentConsents: HealthDataConsents) => {
      const requiredFields: (keyof HealthDataConsents)[] = [
        "childDataRecommendations",
        "healthDataRecommendations",
        "shareWithClubs",
      ];

      const missingConsents = requiredFields.filter((field) => !currentConsents[field]);

      const isValid = missingConsents.length === 0;

      if (onValidate) {
        onValidate(
          isValid,
          missingConsents.map((field) => CONSENT_TEXTS[CONSENT_KEY_MAP[field]].label)
        );
      }

      return isValid;
    },
    [onValidate]
  );

  const handleChange = useCallback(
    (key: keyof HealthDataConsents, value: boolean) => {
      const updated = { ...consents, [key]: value };
      setConsents(updated);
      onConsentsChange(updated);
      validateConsents(updated);
    },
    [consents, onConsentsChange, validateConsents]
  );

  /**
   * Check if all required consents are granted
   */
  const areRequiredConsentsGranted =
    consents.childDataRecommendations &&
    consents.healthDataRecommendations &&
    consents.shareWithClubs;

  return (
    <div className="health-data-consent-form">
      {/* Required Consents Section */}
      <div className="consent-section mb-4">
        <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2">
          Consimțământ pentru prelucrarea datelor copilului
          <span className="badge bg-danger">Obligatoriu</span>
        </h6>

        <ConsentCheckbox
          id="consent-child-data"
          name="childDataRecommendations"
          label={CONSENT_TEXTS[CONSENT_TYPES.CHILD_DATA_RECOMMENDATIONS].label}
          description={CONSENT_TEXTS[CONSENT_TYPES.CHILD_DATA_RECOMMENDATIONS].description}
          required
          checked={consents.childDataRecommendations}
          onChange={(v) => handleChange("childDataRecommendations", v)}
          disabled={disabled}
          error={errors.childDataRecommendations}
          linkedPolicy="gdpr"
        />

        <ConsentCheckbox
          id="consent-health-data"
          name="healthDataRecommendations"
          label={CONSENT_TEXTS[CONSENT_TYPES.HEALTH_DATA_RECOMMENDATIONS].label}
          description={CONSENT_TEXTS[CONSENT_TYPES.HEALTH_DATA_RECOMMENDATIONS].description}
          required
          checked={consents.healthDataRecommendations}
          onChange={(v) => handleChange("healthDataRecommendations", v)}
          disabled={disabled}
          error={errors.healthDataRecommendations}
          linkedPolicy="privacy"
        />

        <ConsentCheckbox
          id="consent-share-clubs"
          name="shareWithClubs"
          label={CONSENT_TEXTS[CONSENT_TYPES.SHARE_WITH_CLUBS].label}
          description={CONSENT_TEXTS[CONSENT_TYPES.SHARE_WITH_CLUBS].description}
          required
          checked={consents.shareWithClubs}
          onChange={(v) => handleChange("shareWithClubs", v)}
          disabled={disabled}
          error={errors.shareWithClubs}
          linkedPolicy="privacy"
        />

        {!areRequiredConsentsGranted && (
          <div className="alert alert-warning mt-3 py-2" role="alert">
            <small>
              <i className="bi bi-exclamation-triangle me-2" />
              Trebuie să accepți toate consimțămintele obligatorii pentru a utiliza recomandările
              AI.
            </small>
          </div>
        )}
      </div>

      {/* Optional Consents Section */}
      {showOptional && (
        <div className="consent-section mb-4">
          <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2">
            Consimțământ opțional
            <span className="badge bg-secondary">Opțional</span>
          </h6>

          <ConsentCheckbox
            id="consent-specialist"
            name="specialistSuggestions"
            label={CONSENT_TEXTS[CONSENT_TYPES.SPECIALIST_SUGGESTIONS].label}
            description={CONSENT_TEXTS[CONSENT_TYPES.SPECIALIST_SUGGESTIONS].description}
            checked={consents.specialistSuggestions}
            onChange={(v) => handleChange("specialistSuggestions", v)}
            disabled={disabled}
            error={errors.specialistSuggestions}
          />

          <ConsentCheckbox
            id="consent-marketing"
            name="marketingCommunications"
            label={CONSENT_TEXTS[CONSENT_TYPES.MARKETING_COMMUNICATIONS].label}
            description={CONSENT_TEXTS[CONSENT_TYPES.MARKETING_COMMUNICATIONS].description}
            checked={consents.marketingCommunications}
            onChange={(v) => handleChange("marketingCommunications", v)}
            disabled={disabled}
            error={errors.marketingCommunications}
          />
        </div>
      )}

      {/* Policy Version and Withdrawal Info */}
      <div className="consent-policy-version text-muted small mt-3 p-3 bg-light rounded">
        <p className="mb-2">
          <i className="bi bi-shield-check me-2" />
          Versiunea politicii de confidențialitate:{" "}
          <strong>{CURRENT_PRIVACY_POLICY_VERSION}</strong>
        </p>
        <p className="mb-0">
          <i className="bi bi-arrow-counterclockwise me-2" />
          Poți retrage orice consimțământ oricând din{" "}
          <Link href={routes.parent.privacy} className="text-decoration-none">
            setările contului tău
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

/**
 * Helper to convert HealthDataConsents to ConsentType array for submission
 */
export function getGrantedConsentTypes(consents: HealthDataConsents): ConsentType[] {
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
 * Helper to check if all required consents are granted
 */
export function areRequiredConsentsGranted(consents: HealthDataConsents): boolean {
  return (
    consents.childDataRecommendations &&
    consents.healthDataRecommendations &&
    consents.shareWithClubs
  );
}

export default HealthDataConsentForm;

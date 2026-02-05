/**
 * Consent Components
 *
 * GDPR-compliant consent collection components.
 * All components follow Bootstrap 5 styling and accessibility standards.
 */

export { ConsentCheckbox } from "./ConsentCheckbox";
export type { default as ConsentCheckboxProps } from "./ConsentCheckbox";

export {
  HealthDataConsentForm,
  getGrantedConsentTypes,
  areRequiredConsentsGranted,
} from "./HealthDataConsentForm";
export type { HealthDataConsents } from "./HealthDataConsentForm";

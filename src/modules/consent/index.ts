/**
 * Consent Module
 *
 * GDPR-compliant consent management service layer.
 */

// Service functions
export {
  grantConsent,
  withdrawConsent,
  grantMultipleConsents,
  getUserConsents,
  getChildConsents,
  getUserLevelConsents,
  hasConsent,
  hasRequiredConsents,
  getConsentStatuses,
  getConsentAuditHistory,
  getConsentWithHistory,
  getConsentLabel,
  getConsentDescription,
  formatConsentForResponse,
} from "./consent.service";

// Types
export type { GrantConsentParams, ConsentRecord, ConsentAuditEntry } from "./consent.service";

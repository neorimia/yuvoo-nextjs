/**
 * Consent Management Constants
 *
 * GDPR Requirements:
 * - Art. 7(2): Consent text must be clearly distinguishable, easily accessible
 * - Art. 9(2)(a): Explicit consent for health data
 * - Art. 13/14: Transparency requirements
 *
 * All user-facing text is in Romanian as required by Yuvoo guidelines.
 */

/**
 * Current privacy policy version
 * Format: YYYY.MM.DD
 * Update this when the privacy policy changes
 */
export const CURRENT_PRIVACY_POLICY_VERSION = "2026.02.04";

/**
 * Consent types for granular consent tracking
 * Must match the consent_type enum in database schema
 */
export const CONSENT_TYPES = {
  CHILD_DATA_RECOMMENDATIONS: "child_data_recommendations",
  HEALTH_DATA_RECOMMENDATIONS: "health_data_recommendations",
  SHARE_WITH_CLUBS: "share_with_clubs",
  SPECIALIST_SUGGESTIONS: "specialist_suggestions",
  MARKETING_COMMUNICATIONS: "marketing_communications",
} as const;

export type ConsentType = (typeof CONSENT_TYPES)[keyof typeof CONSENT_TYPES];

/**
 * Required consents for core service functionality
 * Users cannot use AI recommendations without these consents
 */
export const REQUIRED_CONSENTS: ConsentType[] = [
  CONSENT_TYPES.CHILD_DATA_RECOMMENDATIONS,
  CONSENT_TYPES.HEALTH_DATA_RECOMMENDATIONS,
  CONSENT_TYPES.SHARE_WITH_CLUBS,
];

/**
 * Optional consents (cannot be bundled with service access per GDPR Art. 7(4))
 * Service must work without these
 */
export const OPTIONAL_CONSENTS: ConsentType[] = [
  CONSENT_TYPES.SPECIALIST_SUGGESTIONS,
  CONSENT_TYPES.MARKETING_COMMUNICATIONS,
];

/**
 * Consent text definitions
 * Exact texts shown to users and stored in consent records for audit trail
 * All text in Romanian as required
 */
export const CONSENT_TEXTS: Record<
  ConsentType,
  {
    label: string;
    description: string;
    legalBasis: string;
    gdprArticle: string;
  }
> = {
  [CONSENT_TYPES.CHILD_DATA_RECOMMENDATIONS]: {
    label: "Accept prelucrarea datelor copilului meu pentru recomandări sportive personalizate",
    description:
      "Datele fizice (vârstă, înălțime, greutate) vor fi analizate de AI pentru a genera recomandări de sport potrivite.",
    legalBasis:
      "Art. 6(1)(a) Consimțământ + Art. 9(2)(a) Consimțământ explicit pentru date speciale",
    gdprArticle: "GDPR Art. 6, Art. 9",
  },
  [CONSENT_TYPES.HEALTH_DATA_RECOMMENDATIONS]: {
    label: "Accept prelucrarea datelor de sănătate pentru recomandări sigure și alerte de risc",
    description:
      "Condițiile medicale (astm, scolioză, probleme cardiace) și accidentările anterioare vor fi analizate pentru a asigura recomandări sigure și pentru a genera alerte dacă anumite sporturi pot prezenta riscuri.",
    legalBasis:
      "Art. 6(1)(a) Consimțământ + Art. 9(2)(a) Consimțământ explicit pentru date de sănătate",
    gdprArticle: "GDPR Art. 6, Art. 9",
  },
  [CONSENT_TYPES.SHARE_WITH_CLUBS]: {
    label: "Accept partajarea profilului copilului cu cluburile pe care le contactez",
    description:
      "Când contactezi un club prin platformă, datele relevante ale copilului (vârstă, sport preferat) vor fi trimise clubului pentru a facilita înscrierea.",
    legalBasis: "Art. 6(1)(a) Consimțământ",
    gdprArticle: "GDPR Art. 6",
  },
  [CONSENT_TYPES.SPECIALIST_SUGGESTIONS]: {
    label: "Permite AI să sugereze consultații cu specialiști pediatrici",
    description:
      "Pe baza datelor de sănătate, AI poate sugera când ar fi util să consulți un medic specialist. Aceasta nu înlocuiește sfatul medical profesionist.",
    legalBasis: "Art. 6(1)(a) Consimțământ (opțional)",
    gdprArticle: "GDPR Art. 6",
  },
  [CONSENT_TYPES.MARKETING_COMMUNICATIONS]: {
    label: "Doresc să primesc sfaturi și noutăți despre sportul copiilor",
    description:
      "Vei primi ocazional email-uri cu articole educaționale și noutăți despre activități sportive pentru copii.",
    legalBasis: "Art. 6(1)(a) Consimțământ (opțional)",
    gdprArticle: "GDPR Art. 6",
  },
};

/**
 * Retention periods per data category
 * Required by GDPR Art. 13(2)(a)
 * Used in privacy policy and data export documentation
 */
export const RETENTION_PERIODS = {
  ACCOUNT_DATA: "2 ani după dezactivarea contului",
  CHILD_PROFILE: "2 ani după dezactivarea contului",
  QUIZ_DATA: "3 ani de la finalizarea chestionarului",
  CONSENT_RECORDS: "6 ani (pentru responsabilitate și potențiale litigii)",
  TECHNICAL_LOGS: "12 luni",
  PAYMENT_DATA: "10 ani (obligație fiscală)",
} as const;

/**
 * Data categories for export/erasure requests
 * Used in data subject rights implementation
 */
export const DATA_CATEGORIES = {
  IDENTITY: "date de identitate",
  CONTACT: "date de contact",
  CHILDREN: "profiluri copii",
  HEALTH: "date de sănătate",
  QUIZ_ANSWERS: "răspunsuri chestionar",
  RECOMMENDATIONS: "recomandări AI",
  CONSENTS: "istoricul consimțămintelor",
  FAVORITES: "cluburi și doctori favoriți",
  BOOKINGS: "programări",
  PAYMENTS: "date de plată",
} as const;

export type DataCategory = (typeof DATA_CATEGORIES)[keyof typeof DATA_CATEGORIES];

/**
 * Helper function to get full consent text for storage
 */
export function getConsentFullText(consentType: ConsentType): string {
  const consent = CONSENT_TEXTS[consentType];
  return `${consent.label}\n\n${consent.description}`;
}

/**
 * Helper function to check if a consent type is required
 */
export function isRequiredConsent(consentType: ConsentType): boolean {
  return REQUIRED_CONSENTS.includes(consentType);
}

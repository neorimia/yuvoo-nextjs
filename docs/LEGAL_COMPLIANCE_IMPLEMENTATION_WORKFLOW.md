# Yuvoo Legal Compliance Implementation Workflow

**Generated:** February 2026
**Source Documents:** `LEGAL_ANALYSIS_YUVOO_COMPREHENSIVE.md`, `LEGAL_ANALYSIS_YUVOO_ENHANCE.md`
**Target Launch:** March 2025 (revised timeline reflects current February 2026 status)
**Strategy:** Systematic (phased, dependency-mapped, validation-gated)

---

## Executive Summary

This workflow translates the comprehensive legal analysis into actionable implementation tasks for achieving GDPR, Romanian law, and EU AI Act compliance before launch. The workflow is organized into **6 phases** with clear dependencies, owners, and validation criteria.

### Critical Path Overview

```
Phase 1: Foundation (Week 1-2)
    ↓
Phase 2: Consent Infrastructure (Week 2-3)
    ↓
Phase 3: Privacy Policy & Legal Pages (Week 3-4)
    ↓
Phase 4: Third-Party Compliance (Week 4-5)
    ↓
Phase 5: Data Subject Rights (Week 5-6)
    ↓
Phase 6: Documentation & Launch (Week 6-7)
```

### Risk Severity Summary

| Risk Category             | Pre-Implementation | Target Post-Implementation    |
| ------------------------- | ------------------ | ----------------------------- |
| Art. 9 Health Data        | CRITICAL           | Low (with explicit consent)   |
| US Data Transfer          | HIGH               | Low (with EU residency)       |
| AI Act Classification     | HIGH               | Medium (monitoring required)  |
| Romanian Digital Majority | MEDIUM             | Low (with verifiable consent) |

---

## Phase 1: Foundation — Database & Architecture

**Duration:** Week 1-2
**Owner:** Backend Developer
**Dependencies:** None
**Blocking:** Phase 2, Phase 5

### 1.1 Consent Records Schema

**Priority:** CRITICAL
**Legal Requirement:** GDPR Art. 7(1), Art. 9(2)(a)

Add consent tracking to database schema to maintain audit trail:

```typescript
// Add to src/lib/db/schema.ts

// Consent type enum
export const consentTypeEnum = pgEnum("consent_type", [
  "child_data_recommendations", // Use child data for AI sport recommendations
  "health_data_recommendations", // Use health data for recommendations + risk flags
  "share_with_clubs", // Share child profile with contacted clubs
  "specialist_suggestions", // AI suggest specialist consultations (optional)
  "marketing_communications", // Educational content + marketing (optional)
]);

// Consent status enum
export const consentStatusEnum = pgEnum("consent_status", ["granted", "withdrawn"]);

// User consents table - granular consent tracking per purpose
export const userConsents = pgTable(
  "user_consents",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    childId: text("child_id").references(() => children.id, { onDelete: "cascade" }), // Optional - for child-specific consents
    consentType: consentTypeEnum("consent_type").notNull(),
    status: consentStatusEnum("status").notNull().default("granted"),

    // Consent metadata for audit trail
    consentVersion: text("consent_version").notNull(), // Privacy policy version (e.g., "2026.02.01")
    consentText: text("consent_text").notNull(), // Exact text shown to user
    ipAddress: text("ip_address"), // IP at time of consent
    userAgent: text("user_agent"), // Browser/device info

    // Timestamps
    grantedAt: timestamp("granted_at").defaultNow().notNull(),
    withdrawnAt: timestamp("withdrawn_at"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("idx_user_consents_user_id").on(table.userId),
    childIdIdx: index("idx_user_consents_child_id").on(table.childId),
    consentTypeIdx: index("idx_user_consents_type").on(table.consentType),
    statusIdx: index("idx_user_consents_status").on(table.status),
    // Composite unique: one active consent per type per user (or child)
    userTypeUniqueIdx: uniqueIndex("idx_user_consents_user_type_unique").on(
      table.userId,
      table.childId,
      table.consentType
    ),
  })
);

// Consent audit log - immutable history of all consent changes
export const consentAuditLog = pgTable(
  "consent_audit_log",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userConsentId: text("user_consent_id")
      .notNull()
      .references(() => userConsents.id, { onDelete: "cascade" }),
    action: text("action").notNull(), // "granted" | "withdrawn" | "updated"
    previousStatus: consentStatusEnum("previous_status"),
    newStatus: consentStatusEnum("new_status").notNull(),

    // Context at time of action
    privacyPolicyVersion: text("privacy_policy_version").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userConsentIdIdx: index("idx_consent_audit_log_consent_id").on(table.userConsentId),
    createdAtIdx: index("idx_consent_audit_log_created_at").on(table.createdAt),
  })
);

// Data export requests - GDPR Art. 15, 20
export const dataExportRequests = pgTable(
  "data_export_requests",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    requestType: text("request_type").notNull(), // "access" | "portability" | "erasure"
    status: text("status").notNull().default("pending"), // "pending" | "processing" | "completed" | "failed"

    // Request details
    requestedData: text("requested_data").array(), // Specific data categories requested
    exportFormat: text("export_format"), // "json" | "csv" | "pdf"
    exportUrl: text("export_url"), // URL to download (if completed)

    // Timestamps (GDPR requires response within 30 days)
    requestedAt: timestamp("requested_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at"),
    expiresAt: timestamp("expires_at"), // Export link expiration

    // Processing notes
    notes: text("notes"),
  },
  (table) => ({
    userIdIdx: index("idx_data_export_requests_user_id").on(table.userId),
    statusIdx: index("idx_data_export_requests_status").on(table.status),
    requestedAtIdx: index("idx_data_export_requests_requested_at").on(table.requestedAt),
  })
);

// Breach register - GDPR Art. 33
export const breachRegister = pgTable(
  "breach_register",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    // Breach details
    title: text("title").notNull(),
    description: text("description").notNull(),
    severity: text("severity").notNull(), // "low" | "medium" | "high" | "critical"
    dataCategories: text("data_categories").array().notNull(), // Affected data types
    affectedCount: integer("affected_count"), // Number of affected individuals

    // Discovery and notification
    discoveredAt: timestamp("discovered_at").notNull(),
    discoveredBy: text("discovered_by").notNull(), // User ID or "system"

    // Regulatory notification
    anspdcpNotified: boolean("anspdcp_notified").default(false).notNull(),
    anspdcpNotifiedAt: timestamp("anspdcp_notified_at"),
    anspdcpReference: text("anspdcp_reference"), // Reference number from ANSPDCP

    // Affected individual notification
    individualsNotified: boolean("individuals_notified").default(false).notNull(),
    individualsNotifiedAt: timestamp("individuals_notified_at"),

    // Remediation
    remediationSteps: jsonb("remediation_steps"), // Array of remediation actions
    remediationCompletedAt: timestamp("remediation_completed_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    severityIdx: index("idx_breach_register_severity").on(table.severity),
    discoveredAtIdx: index("idx_breach_register_discovered_at").on(table.discoveredAt),
  })
);
```

### 1.2 Privacy Policy Version Tracking

**Priority:** HIGH
**Legal Requirement:** GDPR Art. 7(2)

Create version tracking for privacy policy:

```typescript
// Add to src/lib/db/schema.ts

export const privacyPolicyVersions = pgTable(
  "privacy_policy_versions",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    version: text("version").notNull().unique(), // e.g., "2026.02.01"
    effectiveDate: timestamp("effective_date").notNull(),
    contentHash: text("content_hash").notNull(), // SHA-256 of policy content

    // Key changes (for transparency)
    majorChanges: jsonb("major_changes"), // Array of change descriptions

    // Status
    isActive: boolean("is_active").default(false).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    versionIdx: index("idx_privacy_policy_versions_version").on(table.version),
    isActiveIdx: index("idx_privacy_policy_versions_active").on(table.isActive),
  })
);
```

### 1.3 Database Migration

**Files to create:**

- `src/lib/db/migrations/XXXX_add_consent_tables.sql`

**Validation criteria:**

- [ ] All tables created without errors
- [ ] Indexes created for performance
- [ ] Foreign key constraints active
- [ ] Test data inserted successfully

---

## Phase 2: Consent Infrastructure — UX Implementation

**Duration:** Week 2-3
**Owner:** Frontend Developer + Backend Developer
**Dependencies:** Phase 1
**Blocking:** Phase 3, Phase 4

### 2.1 Granular Consent Components

**Priority:** CRITICAL
**Legal Requirement:** GDPR Art. 6, Art. 7, Art. 9(2)(a)

Create consent UI components:

#### File: `src/components/Consent/ConsentCheckbox.tsx`

```typescript
"use client";

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

interface ConsentCheckboxProps {
  id: string;
  name: string;
  label: React.ReactNode;
  description?: string;
  required?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  linkedPolicy?: "privacy" | "terms" | "gdpr-parinti";
}

export function ConsentCheckbox({
  id,
  name,
  label,
  description,
  required = false,
  checked,
  onChange,
  disabled = false,
  error,
  linkedPolicy,
}: ConsentCheckboxProps) {
  const policyLink = linkedPolicy && {
    privacy: { href: routes.privacy, text: "Politica de confidențialitate" },
    terms: { href: routes.terms, text: "Termeni și condiții" },
    "gdpr-parinti": { href: routes.gdprParents, text: "GDPR pentru părinți" },
  }[linkedPolicy];

  return (
    <div className="consent-checkbox-wrapper mb-3">
      <div className="form-check d-flex align-items-start">
        <input
          type="checkbox"
          id={id}
          name={name}
          className={`form-check-input mt-1 yuvoo-checkbox ${error ? "is-invalid" : ""}`}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          aria-describedby={description ? `${id}-description` : undefined}
          required={required}
        />
        <div className="ms-2">
          <label className="form-check-label" htmlFor={id}>
            {label}
            {required && <span className="text-danger ms-1">*</span>}
          </label>
          {description && (
            <small id={`${id}-description`} className="d-block text-muted mt-1">
              {description}
            </small>
          )}
          {policyLink && (
            <Link
              href={policyLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="d-block small text-yuvoo-primary-hover mt-1"
            >
              Citește {policyLink.text} →
            </Link>
          )}
        </div>
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
}
```

#### File: `src/components/Consent/HealthDataConsentForm.tsx`

```typescript
"use client";

import React, { useState } from "react";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { CONSENT_TEXTS, CURRENT_PRIVACY_POLICY_VERSION } from "@/lib/consent/constants";

interface HealthDataConsents {
  childDataRecommendations: boolean;
  healthDataRecommendations: boolean;
  shareWithClubs: boolean;
  specialistSuggestions: boolean;
  marketingCommunications: boolean;
}

interface HealthDataConsentFormProps {
  onConsentsChange: (consents: HealthDataConsents) => void;
  initialConsents?: Partial<HealthDataConsents>;
  showOptional?: boolean;
  disabled?: boolean;
}

export function HealthDataConsentForm({
  onConsentsChange,
  initialConsents = {},
  showOptional = true,
  disabled = false,
}: HealthDataConsentFormProps) {
  const [consents, setConsents] = useState<HealthDataConsents>({
    childDataRecommendations: initialConsents.childDataRecommendations ?? false,
    healthDataRecommendations: initialConsents.healthDataRecommendations ?? false,
    shareWithClubs: initialConsents.shareWithClubs ?? false,
    specialistSuggestions: initialConsents.specialistSuggestions ?? false,
    marketingCommunications: initialConsents.marketingCommunications ?? false,
  });

  const handleChange = (key: keyof HealthDataConsents, value: boolean) => {
    const updated = { ...consents, [key]: value };
    setConsents(updated);
    onConsentsChange(updated);
  };

  return (
    <div className="health-data-consent-form">
      <div className="consent-section mb-4">
        <h6 className="fw-semibold mb-3">
          Consimțământ pentru prelucrarea datelor copilului
          <span className="badge bg-danger ms-2">Obligatoriu</span>
        </h6>

        <ConsentCheckbox
          id="consent-child-data"
          name="childDataRecommendations"
          label="Accept prelucrarea datelor copilului meu pentru recomandări sportive personalizate"
          description="Datele fizice (vârstă, înălțime, greutate) vor fi analizate de AI pentru a genera recomandări de sport potrivite."
          required
          checked={consents.childDataRecommendations}
          onChange={(v) => handleChange("childDataRecommendations", v)}
          disabled={disabled}
          linkedPolicy="gdpr-parinti"
        />

        <ConsentCheckbox
          id="consent-health-data"
          name="healthDataRecommendations"
          label="Accept prelucrarea datelor de sănătate pentru recomandări sigure și alerte de risc"
          description="Condițiile medicale (astm, scolioză, probleme cardiace) și accidentările anterioare vor fi analizate pentru a asigura recomandări sigure și pentru a genera alerte dacă anumite sporturi pot prezenta riscuri."
          required
          checked={consents.healthDataRecommendations}
          onChange={(v) => handleChange("healthDataRecommendations", v)}
          disabled={disabled}
          linkedPolicy="privacy"
        />

        <ConsentCheckbox
          id="consent-share-clubs"
          name="shareWithClubs"
          label="Accept partajarea profilului copilului cu cluburile pe care le contactez"
          description="Când contactezi un club prin platformă, datele relevante ale copilului (vârstă, sport preferat) vor fi trimise clubului pentru a facilita înscrierea."
          required
          checked={consents.shareWithClubs}
          onChange={(v) => handleChange("shareWithClubs", v)}
          disabled={disabled}
          linkedPolicy="privacy"
        />
      </div>

      {showOptional && (
        <div className="consent-section mb-4">
          <h6 className="fw-semibold mb-3">
            Consimțământ opțional
            <span className="badge bg-secondary ms-2">Opțional</span>
          </h6>

          <ConsentCheckbox
            id="consent-specialist"
            name="specialistSuggestions"
            label="Permite AI să sugereze consultații cu specialiști pediatrici"
            description="Pe baza datelor de sănătate, AI poate sugera când ar fi util să consulți un medic specialist. Aceasta nu înlocuiește sfatul medical profesionist."
            checked={consents.specialistSuggestions}
            onChange={(v) => handleChange("specialistSuggestions", v)}
            disabled={disabled}
          />

          <ConsentCheckbox
            id="consent-marketing"
            name="marketingCommunications"
            label="Doresc să primesc sfaturi și noutăți despre sportul copiilor"
            description="Vei primi ocazional email-uri cu articole educaționale și noutăți despre activități sportive pentru copii."
            checked={consents.marketingCommunications}
            onChange={(v) => handleChange("marketingCommunications", v)}
            disabled={disabled}
          />
        </div>
      )}

      <div className="consent-policy-version text-muted small mt-3">
        <p className="mb-1">
          Versiunea politicii de confidențialitate: <strong>{CURRENT_PRIVACY_POLICY_VERSION}</strong>
        </p>
        <p className="mb-0">
          Poți retrage orice consimțământ oricând din setările contului tău.
        </p>
      </div>
    </div>
  );
}
```

### 2.2 Consent Constants & Texts

**File:** `src/lib/consent/constants.ts`

```typescript
/**
 * Consent Management Constants
 *
 * GDPR Requirements:
 * - Art. 7(2): Consent text must be clearly distinguishable, easily accessible
 * - Art. 9(2)(a): Explicit consent for health data
 * - Art. 13/14: Transparency requirements
 */

export const CURRENT_PRIVACY_POLICY_VERSION = "2026.02.01";

export const CONSENT_TYPES = {
  CHILD_DATA_RECOMMENDATIONS: "child_data_recommendations",
  HEALTH_DATA_RECOMMENDATIONS: "health_data_recommendations",
  SHARE_WITH_CLUBS: "share_with_clubs",
  SPECIALIST_SUGGESTIONS: "specialist_suggestions",
  MARKETING_COMMUNICATIONS: "marketing_communications",
} as const;

export type ConsentType = (typeof CONSENT_TYPES)[keyof typeof CONSENT_TYPES];

// Required consents for core service functionality
export const REQUIRED_CONSENTS: ConsentType[] = [
  CONSENT_TYPES.CHILD_DATA_RECOMMENDATIONS,
  CONSENT_TYPES.HEALTH_DATA_RECOMMENDATIONS,
  CONSENT_TYPES.SHARE_WITH_CLUBS,
];

// Optional consents (cannot be bundled with service access)
export const OPTIONAL_CONSENTS: ConsentType[] = [
  CONSENT_TYPES.SPECIALIST_SUGGESTIONS,
  CONSENT_TYPES.MARKETING_COMMUNICATIONS,
];

/**
 * Exact consent texts shown to users
 * These are stored in consent records for audit trail
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
 */
export const RETENTION_PERIODS = {
  ACCOUNT_DATA: "2 ani după dezactivarea contului",
  CHILD_PROFILE: "2 ani după dezactivarea contului",
  QUIZ_DATA: "3 ani de la finalizarea chestionarului",
  CONSENT_RECORDS: "6 ani (pentru responsabilitate și potențiale litigii)",
  TECHNICAL_LOGS: "12 luni",
  PAYMENT_DATA: "10 ani (obligație fiscală)",
} as const;
```

### 2.3 Consent Service Layer

**File:** `src/modules/consent/consent.service.ts`

```typescript
import { db } from "@/lib/db";
import { userConsents, consentAuditLog } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import {
  ConsentType,
  CONSENT_TEXTS,
  CURRENT_PRIVACY_POLICY_VERSION,
} from "@/lib/consent/constants";

interface GrantConsentParams {
  userId: string;
  childId?: string;
  consentType: ConsentType;
  ipAddress?: string;
  userAgent?: string;
}

interface ConsentRecord {
  id: string;
  consentType: ConsentType;
  status: "granted" | "withdrawn";
  grantedAt: Date;
  withdrawnAt: Date | null;
  consentVersion: string;
}

/**
 * Grant consent for a specific purpose
 * Creates audit log entry
 */
export async function grantConsent({
  userId,
  childId,
  consentType,
  ipAddress,
  userAgent,
}: GrantConsentParams): Promise<ConsentRecord> {
  const consentText = CONSENT_TEXTS[consentType];

  // Check if consent already exists
  const existing = await db.query.userConsents.findFirst({
    where: and(
      eq(userConsents.userId, userId),
      childId ? eq(userConsents.childId, childId) : undefined,
      eq(userConsents.consentType, consentType)
    ),
  });

  if (existing) {
    // Update existing consent
    const [updated] = await db
      .update(userConsents)
      .set({
        status: "granted",
        consentVersion: CURRENT_PRIVACY_POLICY_VERSION,
        consentText: `${consentText.label}\n\n${consentText.description}`,
        ipAddress,
        userAgent,
        grantedAt: new Date(),
        withdrawnAt: null,
        updatedAt: new Date(),
      })
      .where(eq(userConsents.id, existing.id))
      .returning();

    // Create audit log
    await db.insert(consentAuditLog).values({
      userConsentId: updated.id,
      action: "granted",
      previousStatus: existing.status as "granted" | "withdrawn",
      newStatus: "granted",
      privacyPolicyVersion: CURRENT_PRIVACY_POLICY_VERSION,
      ipAddress,
      userAgent,
    });

    return updated as ConsentRecord;
  }

  // Create new consent
  const [created] = await db
    .insert(userConsents)
    .values({
      userId,
      childId,
      consentType,
      status: "granted",
      consentVersion: CURRENT_PRIVACY_POLICY_VERSION,
      consentText: `${consentText.label}\n\n${consentText.description}`,
      ipAddress,
      userAgent,
    })
    .returning();

  // Create audit log
  await db.insert(consentAuditLog).values({
    userConsentId: created.id,
    action: "granted",
    previousStatus: null,
    newStatus: "granted",
    privacyPolicyVersion: CURRENT_PRIVACY_POLICY_VERSION,
    ipAddress,
    userAgent,
  });

  return created as ConsentRecord;
}

/**
 * Withdraw consent for a specific purpose
 * Creates audit log entry
 */
export async function withdrawConsent({
  userId,
  childId,
  consentType,
  ipAddress,
  userAgent,
}: GrantConsentParams): Promise<ConsentRecord | null> {
  const existing = await db.query.userConsents.findFirst({
    where: and(
      eq(userConsents.userId, userId),
      childId ? eq(userConsents.childId, childId) : undefined,
      eq(userConsents.consentType, consentType),
      eq(userConsents.status, "granted")
    ),
  });

  if (!existing) {
    return null;
  }

  const [updated] = await db
    .update(userConsents)
    .set({
      status: "withdrawn",
      withdrawnAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(userConsents.id, existing.id))
    .returning();

  // Create audit log
  await db.insert(consentAuditLog).values({
    userConsentId: updated.id,
    action: "withdrawn",
    previousStatus: "granted",
    newStatus: "withdrawn",
    privacyPolicyVersion: CURRENT_PRIVACY_POLICY_VERSION,
    ipAddress,
    userAgent,
  });

  return updated as ConsentRecord;
}

/**
 * Get all consents for a user
 */
export async function getUserConsents(userId: string): Promise<ConsentRecord[]> {
  return (await db.query.userConsents.findMany({
    where: eq(userConsents.userId, userId),
  })) as ConsentRecord[];
}

/**
 * Check if user has granted specific consent
 */
export async function hasConsent(
  userId: string,
  consentType: ConsentType,
  childId?: string
): Promise<boolean> {
  const consent = await db.query.userConsents.findFirst({
    where: and(
      eq(userConsents.userId, userId),
      childId ? eq(userConsents.childId, childId) : undefined,
      eq(userConsents.consentType, consentType),
      eq(userConsents.status, "granted")
    ),
  });

  return !!consent;
}

/**
 * Get consent audit history for compliance reporting
 */
export async function getConsentAuditHistory(userId: string) {
  const consents = await db.query.userConsents.findMany({
    where: eq(userConsents.userId, userId),
  });

  const consentIds = consents.map((c) => c.id);

  if (consentIds.length === 0) {
    return [];
  }

  return await db.query.consentAuditLog.findMany({
    where: sql`${consentAuditLog.userConsentId} IN (${consentIds.join(",")})`,
    orderBy: [desc(consentAuditLog.createdAt)],
  });
}
```

### 2.4 Validation Criteria for Phase 2

- [ ] ConsentCheckbox component renders correctly with all states
- [ ] HealthDataConsentForm displays required/optional separation
- [ ] Consent records created in database on grant
- [ ] Audit log entries created for all consent actions
- [ ] Consent withdrawal updates status and creates audit entry
- [ ] hasConsent() returns correct boolean for given consent type
- [ ] All Romanian translations verified

---

## Phase 3: Privacy Policy & Legal Pages Update

**Duration:** Week 3-4
**Owner:** Legal Review + Frontend Developer
**Dependencies:** Phase 2
**Blocking:** Phase 6

### 3.1 Privacy Policy Updates

**File:** `src/app/(legal)/confidentialitate/page.tsx`

Required updates based on legal analysis:

1. **Add Legal Basis Section (NEW SECTION 4)**
   - Document Art. 6 legal basis for each processing purpose
   - Document Art. 9(2)(a) explicit consent for health data
   - Clear explanation of contract vs consent basis

2. **Update Data Categories (Section 2)**
   - Add payment data category (Stripe)
   - Clarify psychological/behavioral data purpose

3. **Add Stripe to Third-Party Section (Section 5)**
   - Stripe as payment processor
   - No card data storage statement

4. **Add Automated Decision-Making Section (NEW SECTION)**
   - Art. 22 compliance
   - AI recommendation logic explanation
   - Right to human review

5. **Update Data Subject Rights (Section 7)**
   - Add Art. 22 rights (human intervention, contestation)
   - Add right to withdraw consent at any time

### 3.2 Terms of Service Updates

**File:** `src/app/(legal)/termeni/page.tsx`

Required updates:

1. **Add Reservations & Payments Section (NEW)**
   - Clarify Yuvoo as facilitator, not service provider
   - Club/doctor contractual relationship disclaimer

2. **Add Account Termination Section (NEW)**
   - How to close account
   - Data deletion process reference
   - Legal retention exceptions

3. **Add Indemnification Clause (NEW)**
   - User responsibility for terms violations
   - Limitation to extent permitted by Romanian law

### 3.3 Cookie Policy Updates

**File:** `src/app/(legal)/cookies/page.tsx`

1. **Add Stripe to Third-Party Cookies**
   - Payment processing cookies

2. **Add Marketing Cookies Statement**
   - Clarify no advertising/marketing cookies used
   - Browser control instructions

### 3.4 GDPR for Parents Updates

**File:** `src/app/(legal)/gdpr-parinti/page.tsx`

1. **Align Third-Party List**
   - Add Cloudinary, Brevo to list
   - Add Stripe mention for parent payments

### 3.5 Validation Criteria for Phase 3

- [ ] All legal pages updated with required sections
- [ ] Legal basis section added to Privacy Policy
- [ ] Stripe added to all relevant sections
- [ ] Art. 22 automated decision section added
- [ ] All updates in Romanian language
- [ ] Links between pages verified
- [ ] Version number updated in footer

---

## Phase 4: Third-Party Compliance

**Duration:** Week 4-5
**Owner:** Backend Developer + Legal
**Dependencies:** Phase 1, Phase 2
**Blocking:** Phase 6

### 4.1 OpenAI Configuration

**Priority:** CRITICAL (HIGH risk mitigation)

**Tasks:**

1. **Enable EU Data Residency**
   - Configure OpenAI API for EU data processing
   - Update environment variables

2. **Review and Sign DPA**
   - Download OpenAI DPA
   - Verify SCCs incorporated
   - Confirm no training data usage clause
   - Document signed DPA in compliance folder

3. **Conduct Transfer Impact Assessment (TIA)**
   - Document data categories transferred
   - Assess US law implications (if any US processing)
   - Document supplementary measures (EU residency)

**File:** `src/lib/integrations/openai.ts` (update)

```typescript
import OpenAI from "openai";

// Ensure EU data residency configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // EU data residency - configure in OpenAI dashboard
  // API calls should route through EU endpoint
});

/**
 * GDPR Compliance Notes:
 * - EU data residency enabled in OpenAI dashboard
 * - DPA signed: [DATE]
 * - SCCs incorporated: Yes
 * - Training data usage: Prohibited
 * - TIA completed: [DATE]
 */
```

### 4.2 DPA Tracking

Create compliance documentation tracker:

**File:** `docs/compliance/DPA_TRACKER.md`

```markdown
# Data Processing Agreement Tracker

## Active DPAs

| Processor  | DPA Signed | SCCs     | TIA Required    | TIA Completed | Review Date |
| ---------- | ---------- | -------- | --------------- | ------------- | ----------- |
| OpenAI     | [DATE]     | Yes      | Yes (US)        | [DATE]        | [ANNUAL]    |
| Neon       | [DATE]     | N/A (EU) | No              | N/A           | [ANNUAL]    |
| Cloudinary | [DATE]     | Yes      | No (EU default) | N/A           | [ANNUAL]    |
| Brevo      | [DATE]     | N/A (EU) | No              | N/A           | [ANNUAL]    |
| Stripe     | [DATE]     | Yes      | No (EU default) | N/A           | [ANNUAL]    |
| Stack Auth | [DATE]     | [CHECK]  | [CHECK]         | [CHECK]       | [ANNUAL]    |

## DPA Requirements Checklist

For each processor, verify:

- [ ] Processing only on documented instructions
- [ ] Confidentiality obligations
- [ ] Security measures (Art. 32)
- [ ] Subprocessor management
- [ ] Data deletion/return on termination
- [ ] Audit rights
- [ ] Breach notification procedures
- [ ] Transfer mechanisms (SCCs if applicable)
```

### 4.3 Club Data Sharing Notice

Create notice shown to parents before sharing data with clubs:

**File:** `src/components/Clubs/DataSharingNotice.tsx`

```typescript
"use client";

import React from "react";

interface DataSharingNoticeProps {
  clubName: string;
  childName: string;
  dataShared: string[];
  onConfirm: () => void;
  onCancel: () => void;
}

export function DataSharingNotice({
  clubName,
  childName,
  dataShared,
  onConfirm,
  onCancel,
}: DataSharingNoticeProps) {
  return (
    <div className="data-sharing-notice p-4 border rounded">
      <h5 className="mb-3">Partajare date cu {clubName}</h5>

      <p className="mb-3">
        Pentru a facilita contactul cu clubul, următoarele date ale lui {childName}
        vor fi trimise către <strong>{clubName}</strong>:
      </p>

      <ul className="mb-3">
        {dataShared.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div className="alert alert-info mb-3">
        <small>
          <strong>Notă:</strong> După partajare, {clubName} devine operator independent
          pentru aceste date. Clubul are propria politică de confidențialitate și
          trebuie să îți ofere informații despre cum îți procesează datele.
        </small>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={onCancel}>
          Anulează
        </button>
        <button className="btn btn-primary" onClick={onConfirm}>
          Confirmă partajarea
        </button>
      </div>
    </div>
  );
}
```

### 4.4 Validation Criteria for Phase 4

- [ ] OpenAI EU data residency configured and verified
- [ ] All DPAs collected and documented
- [ ] TIA completed for US transfers (if any remain)
- [ ] Club data sharing notice implemented
- [ ] DPA tracker document created
- [ ] Annual review reminders set

---

## Phase 5: Data Subject Rights Implementation

**Duration:** Week 5-6
**Owner:** Full Stack Developer
**Dependencies:** Phase 1, Phase 2
**Blocking:** Phase 6

### 5.1 Data Export (Art. 15, 20)

**File:** `src/app/actions/data-export.ts`

```typescript
"use server";

import { requireAuth } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { users, children, quizzes, userConsents, favorites, bookings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { dataExportRequests } from "@/lib/db/schema";

/**
 * Generate data export for user (GDPR Art. 15 - Access, Art. 20 - Portability)
 */
export async function requestDataExport(format: "json" | "csv" = "json") {
  const session = await requireAuth();
  const userId = session.user.id;

  // Create export request record
  const [request] = await db
    .insert(dataExportRequests)
    .values({
      userId,
      requestType: "portability",
      status: "processing",
      exportFormat: format,
    })
    .returning();

  try {
    // Gather all user data
    const userData = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    const childrenData = await db.query.children.findMany({
      where: eq(children.parentId, userId),
    });

    const childIds = childrenData.map((c) => c.id);

    const quizzesData =
      childIds.length > 0
        ? await db.query.quizzes.findMany({
            where: sql`${quizzes.childId} IN (${childIds.join(",")})`,
          })
        : [];

    const consentsData = await db.query.userConsents.findMany({
      where: eq(userConsents.userId, userId),
    });

    const favoritesData = await db.query.favorites.findMany({
      where: eq(favorites.userId, userId),
    });

    const bookingsData = await db.query.bookings.findMany({
      where: eq(bookings.parentId, userId),
    });

    // Structure export
    const exportData = {
      exportDate: new Date().toISOString(),
      exportFormat: format,
      gdprReference: "Art. 15 (Access) / Art. 20 (Portability)",

      userData: {
        id: userData?.id,
        email: userData?.email,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phone: userData?.phone,
        role: userData?.role,
        createdAt: userData?.createdAt,
      },

      children: childrenData.map((child) => ({
        id: child.id,
        firstName: child.firstName,
        lastName: child.lastName,
        dateOfBirth: child.dateOfBirth,
        gender: child.gender,
        createdAt: child.createdAt,
      })),

      quizzes: quizzesData.map((quiz) => ({
        id: quiz.id,
        childId: quiz.childId,
        answers: quiz.answers,
        recommendations: quiz.recommendations,
        createdAt: quiz.createdAt,
      })),

      consents: consentsData.map((consent) => ({
        type: consent.consentType,
        status: consent.status,
        grantedAt: consent.grantedAt,
        withdrawnAt: consent.withdrawnAt,
        consentVersion: consent.consentVersion,
      })),

      favorites: favoritesData.map((fav) => ({
        clubId: fav.clubId,
        doctorId: fav.doctorId,
        createdAt: fav.createdAt,
      })),

      bookings: bookingsData.map((booking) => ({
        id: booking.id,
        type: booking.type,
        status: booking.status,
        scheduledAt: booking.scheduledAt,
        createdAt: booking.createdAt,
      })),
    };

    // TODO: Generate file and upload to secure storage
    // For now, return JSON directly (in production, generate file and provide download link)

    // Update request status
    await db
      .update(dataExportRequests)
      .set({
        status: "completed",
        completedAt: new Date(),
        // exportUrl: [URL to generated file]
      })
      .where(eq(dataExportRequests.id, request.id));

    return {
      success: true,
      data: exportData,
      requestId: request.id,
    };
  } catch (error) {
    await db
      .update(dataExportRequests)
      .set({
        status: "failed",
        notes: error instanceof Error ? error.message : "Unknown error",
      })
      .where(eq(dataExportRequests.id, request.id));

    throw error;
  }
}
```

### 5.2 Data Erasure (Art. 17)

**File:** `src/app/actions/data-erasure.ts`

```typescript
"use server";

import { requireAuth } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { users, children, quizzes, userConsents, favorites, bookings } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

/**
 * Delete all user data (GDPR Art. 17 - Right to Erasure)
 *
 * Exceptions (data NOT deleted):
 * - Payment records (10-year legal retention for tax purposes)
 * - Data required for legal claims (if any pending)
 */
export async function requestDataErasure(confirmPhrase: string) {
  const session = await requireAuth();
  const userId = session.user.id;

  // Require explicit confirmation
  if (confirmPhrase !== "ȘTERGERE DEFINITIVĂ") {
    return {
      success: false,
      error: "Te rugăm să confirmi ștergerea introducând 'ȘTERGERE DEFINITIVĂ'",
    };
  }

  try {
    // Get child IDs for cascade deletion
    const childrenData = await db.query.children.findMany({
      where: eq(children.parentId, userId),
      columns: { id: true },
    });
    const childIds = childrenData.map((c) => c.id);

    // Delete in order of dependencies

    // 1. Delete favorites
    await db.delete(favorites).where(eq(favorites.userId, userId));

    // 2. Delete bookings
    await db.delete(bookings).where(eq(bookings.parentId, userId));

    // 3. Delete quizzes (for all children)
    if (childIds.length > 0) {
      await db
        .delete(quizzes)
        .where(sql`${quizzes.childId} IN (${childIds.map((id) => `'${id}'`).join(",")})`);
    }

    // 4. Delete children
    await db.delete(children).where(eq(children.parentId, userId));

    // 5. Delete consents (audit log retained per policy)
    await db.delete(userConsents).where(eq(userConsents.userId, userId));

    // 6. Anonymize user record (keep ID for payment/legal reference)
    await db
      .update(users)
      .set({
        email: `deleted_${userId}@anonymized.yuvoo.ro`,
        firstName: null,
        lastName: null,
        phone: null,
        stackUserId: `deleted_${userId}`,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    // TODO: Delete from Stack Auth
    // TODO: Delete from any external systems (if applicable)

    return {
      success: true,
      message: "Datele tale au fost șterse. Contul a fost dezactivat.",
      retainedData: [
        "Înregistrări de plăți (reținute 10 ani conform obligațiilor fiscale)",
        "Jurnale de audit pentru consimțământ (reținute 6 ani pentru responsabilitate)",
      ],
    };
  } catch (error) {
    console.error("Data erasure failed:", error);
    return {
      success: false,
      error: "Eroare la ștergerea datelor. Te rugăm să contactezi suportul.",
    };
  }
}
```

### 5.3 Consent Management Page

**File:** `src/app/(auth)/parent/settings/privacy/page.tsx`

```typescript
import { requireAuth } from "@/lib/auth/session";
import { getUserConsents } from "@/modules/consent/consent.service";
import { ConsentManagementClient } from "./ConsentManagementClient";

export default async function PrivacySettingsPage() {
  const session = await requireAuth();
  const consents = await getUserConsents(session.user.id);

  return (
    <div className="privacy-settings-page">
      <div className="container py-5">
        <h1 className="mb-4">Setări de confidențialitate</h1>

        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Gestionare consimțământ</h5>
          </div>
          <div className="card-body">
            <p className="text-muted mb-4">
              Poți retrage oricând consimțământul pentru prelucrarea datelor tale.
              Retragerea nu afectează legalitatea prelucrării efectuate înainte de retragere.
            </p>

            <ConsentManagementClient initialConsents={consents} />
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Exportă datele tale</h5>
          </div>
          <div className="card-body">
            <p className="text-muted mb-3">
              Conform GDPR Art. 15 și 20, ai dreptul să primești o copie a datelor tale
              într-un format structurat și portabil.
            </p>
            <DataExportButton />
          </div>
        </div>

        <div className="card border-danger">
          <div className="card-header bg-danger text-white">
            <h5 className="mb-0">Ștergere cont</h5>
          </div>
          <div className="card-body">
            <p className="text-muted mb-3">
              Conform GDPR Art. 17, ai dreptul să soliciți ștergerea datelor tale.
              Această acțiune este permanentă și nu poate fi anulată.
            </p>
            <AccountDeletionButton />
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 5.4 Human Review Request (Art. 22)

**File:** `src/app/actions/human-review.ts`

```typescript
"use server";

import { requireAuth } from "@/lib/auth/session";
import { db } from "@/lib/db";

/**
 * Request human review of AI recommendation (GDPR Art. 22)
 */
export async function requestHumanReview(quizId: string, reason: string) {
  const session = await requireAuth();

  // Create support ticket for human review
  // TODO: Integrate with support system (e.g., Zendesk, email)

  // For now, send email notification to support team
  await sendEmail({
    to: "support@yuvoo.ro",
    subject: `[Art. 22] Cerere de revizuire umană - Quiz ${quizId}`,
    body: `
      Utilizator: ${session.user.id}
      Quiz ID: ${quizId}
      Motiv: ${reason}

      Aceasta este o cerere conform GDPR Art. 22 pentru revizuirea umană
      a unei decizii automatizate.

      Termenul de răspuns: 30 de zile.
    `,
  });

  return {
    success: true,
    message: "Cererea ta a fost înregistrată. Vei primi un răspuns în maximum 30 de zile.",
    referenceId: `HR-${Date.now()}`,
  };
}
```

### 5.5 Validation Criteria for Phase 5

- [ ] Data export generates complete JSON with all user data
- [ ] Data export creates audit trail (request record)
- [ ] Data erasure deletes all personal data except legal exceptions
- [ ] Data erasure anonymizes user record (doesn't delete for referential integrity)
- [ ] Consent management page displays all active consents
- [ ] Consent withdrawal works for each consent type
- [ ] Human review request sends notification to support
- [ ] All actions have Romanian language UI
- [ ] 30-day response timeline documented

---

## Phase 6: Documentation & Launch Preparation

**Duration:** Week 6-7
**Owner:** Legal + Product + Development
**Dependencies:** All previous phases
**Blocking:** Launch

### 6.1 DPIA Completion

**Priority:** CRITICAL (Mandatory under GDPR Art. 35)

**File:** `docs/compliance/DPIA_YUVOO.md`

```markdown
# Data Protection Impact Assessment (DPIA)

# Yuvoo Platform

**Version:** 1.0
**Date:** [DATE]
**Next Review:** [DATE + 1 YEAR]
**Status:** APPROVED / PENDING REVIEW

---

## 1. Description of Processing

### 1.1 Nature of Processing

- Collection of children's personal data (age 4-14) from parents
- Processing of special category data (health information)
- AI-based automated decision-making (sport recommendations)
- Cross-border data transfer to processors (OpenAI - EU residency)

### 1.2 Scope of Processing

- Data subjects: Parents (users), Children (data provided by parents)
- Data categories: Identity, contact, physical characteristics, health conditions,
  injuries, psychological/behavioral traits, preferences, schedule, budget
- Geographic scope: Romania (initial), expanding to CEE and EU
- Estimated data subjects: [NUMBER] (Year 1 projection)

### 1.3 Context of Processing

- Platform for matching children with suitable sports activities
- AI analyzes child profiles to generate personalized recommendations
- Health data used for safety flags and specialist referral suggestions
- Data shared with clubs and doctors upon parent consent

### 1.4 Purpose of Processing

- Generate AI sport recommendations based on child profile
- Identify potential health risks for certain sports
- Facilitate connections between parents and sports clubs
- Suggest pediatric specialist consultations (optional)

---

## 2. Necessity and Proportionality Assessment

### 2.1 Legal Basis

| Processing Activity             | Art. 6 Basis       | Art. 9 Exception                |
| ------------------------------- | ------------------ | ------------------------------- |
| Account creation                | Contract           | N/A                             |
| Child data for recommendations  | Consent            | Explicit consent (Art. 9(2)(a)) |
| Health data for recommendations | Consent            | Explicit consent (Art. 9(2)(a)) |
| Data sharing with clubs         | Consent            | Explicit consent (Art. 9(2)(a)) |
| Specialist suggestions          | Consent (optional) | Explicit consent (Art. 9(2)(a)) |
| Marketing                       | Consent (optional) | N/A                             |

### 2.2 Data Minimization Assessment

| Data Category        | Necessity          | Justification                     |
| -------------------- | ------------------ | --------------------------------- |
| Age, gender          | Necessary          | Age-appropriate sport matching    |
| Height, weight       | Necessary          | Physical suitability assessment   |
| Health conditions    | Necessary          | Safety and risk assessment        |
| Past injuries        | Necessary          | Prevent re-injury                 |
| Psychological traits | Arguably necessary | Team vs individual sport matching |
| Schedule, budget     | Necessary          | Practical matching                |

### 2.3 Purpose Limitation

- Data used only for stated purposes
- Secondary use (AI model improvement) requires separate consent or anonymization
- Marketing separated as optional consent

---

## 3. Risk Assessment

### 3.1 Identified Risks

| Risk                                     | Likelihood                  | Impact   | Risk Level | Affected Rights          |
| ---------------------------------------- | --------------------------- | -------- | ---------- | ------------------------ |
| Unauthorized access to child health data | Medium                      | High     | HIGH       | Privacy, confidentiality |
| Incorrect AI recommendation causing harm | Low                         | High     | MEDIUM     | Safety, wellbeing        |
| Data breach exposing child information   | Low                         | Critical | HIGH       | Privacy, reputation      |
| Discriminatory AI bias                   | Medium                      | Medium   | MEDIUM     | Non-discrimination       |
| Unlawful US data transfer                | Low (with EU residency)     | High     | LOW        | Privacy                  |
| Consent not freely given (bundling)      | Low (with granular consent) | Medium   | LOW        | Autonomy                 |

### 3.2 Risk Scoring Matrix

- **Critical (16-25):** Immediate action required
- **High (11-15):** Priority mitigation
- **Medium (6-10):** Planned mitigation
- **Low (1-5):** Accept with monitoring

---

## 4. Mitigation Measures

### 4.1 Technical Measures

| Risk                | Mitigation                                         | Status         |
| ------------------- | -------------------------------------------------- | -------------- |
| Unauthorized access | Encryption at rest and in transit, access controls | ✅ Implemented |
| Data breach         | Security monitoring, incident response plan        | ✅ Implemented |
| US transfer risk    | OpenAI EU data residency configured                | ✅ Implemented |
| AI errors           | Disclaimers, human review mechanism                | ✅ Implemented |

### 4.2 Organizational Measures

| Risk               | Mitigation                                      | Status         |
| ------------------ | ----------------------------------------------- | -------------- |
| Consent compliance | Granular consent, audit trail, easy withdrawal  | ✅ Implemented |
| AI bias            | Regular algorithm review, fairness monitoring   | 🔄 Ongoing     |
| Breach response    | 72-hour notification procedure, breach register | ✅ Implemented |
| Staff training     | Data protection awareness program               | 📋 Planned     |

### 4.3 Contractual Measures

| Risk                 | Mitigation                       | Status       |
| -------------------- | -------------------------------- | ------------ |
| Processor compliance | DPAs with all processors         | ✅ Completed |
| Club data handling   | Controller-controller agreements | ✅ Completed |
| Transfer safeguards  | SCCs incorporated in DPAs        | ✅ Completed |

---

## 5. Consultation

### 5.1 Data Subjects

- Privacy policy published and accessible
- Granular consent mechanism implemented
- Data subject rights procedures in place

### 5.2 DPO Consultation

- [If DPO appointed: DPO review and sign-off]
- [If no DPO: External privacy counsel review]

### 5.3 ANSPDCP Consultation

- Prior consultation not required (risks mitigated to acceptable level)
- [If high residual risk: Document ANSPDCP consultation]

---

## 6. Decision

### 6.1 Residual Risk Assessment

After implementing all mitigation measures, the residual risk level is **ACCEPTABLE**.

### 6.2 Approval

| Role                           | Name   | Date   | Signature   |
| ------------------------------ | ------ | ------ | ----------- |
| Data Controller Representative | [NAME] | [DATE] | [SIGNATURE] |
| DPO (if appointed)             | [NAME] | [DATE] | [SIGNATURE] |
| Legal Counsel                  | [NAME] | [DATE] | [SIGNATURE] |

### 6.3 Review Schedule

- Next review: [DATE + 1 YEAR]
- Trigger events for earlier review:
  - New data categories collected
  - New processing purposes
  - AI model changes
  - New third-party processors
  - Data breach
  - Regulatory guidance changes

---

## Appendices

### A. Records of Processing (Art. 30)

[Link to Records of Processing document]

### B. Consent Texts

[Link to Consent Constants file]

### C. DPA Tracker

[Link to DPA Tracker document]

### D. Breach Response Procedure

[Link to Breach Response document]
```

### 6.2 Records of Processing (Art. 30)

**File:** `docs/compliance/RECORDS_OF_PROCESSING.md`

Create comprehensive records as required by GDPR Art. 30.

### 6.3 AI Classification Memo

**File:** `docs/compliance/AI_ACT_CLASSIFICATION_MEMO.md`

Document EU AI Act classification analysis and monitoring plan.

### 6.4 Launch Checklist

**File:** `docs/compliance/LAUNCH_CHECKLIST.md`

```markdown
# Yuvoo Legal Compliance Launch Checklist

**Launch Target:** [DATE]
**Status:** ⬜ Not Started | 🔄 In Progress | ✅ Complete

---

## CRITICAL (Must complete before launch)

### GDPR Compliance

- [ ] Legal basis documented (Art. 6 + Art. 9) for all processing
- [ ] Explicit consent implemented for health data
- [ ] Granular consent (separate purposes)
- [ ] Consent records stored with audit trail
- [ ] Privacy Policy updated (Art. 13/14 complete)
- [ ] DPIA completed and approved
- [ ] Data subject rights implemented:
  - [ ] Access (Art. 15)
  - [ ] Rectification (Art. 16)
  - [ ] Erasure (Art. 17)
  - [ ] Portability (Art. 20)
  - [ ] Withdrawal of consent (Art. 7)
- [ ] Art. 22 human review mechanism in place
- [ ] Breach notification procedure documented

### Third-Party Compliance

- [ ] OpenAI DPA signed
- [ ] OpenAI EU data residency configured
- [ ] Neon DPA signed
- [ ] Cloudinary DPA signed
- [ ] Brevo DPA signed
- [ ] Stripe DPA signed
- [ ] Stack Auth DPA verified
- [ ] Transfer Impact Assessment completed (if US transfers)

### Romanian Law

- [ ] Privacy Policy in Romanian
- [ ] Terms of Service in Romanian
- [ ] Cookie Policy in Romanian
- [ ] GDPR for Parents page complete
- [ ] ANSPDCP contact information displayed
- [ ] Romanian jurisdiction clauses in Terms

### Disclaimers & Notices

- [ ] "Not medical advice" disclaimer displayed
- [ ] AI recommendation transparency statement
- [ ] Club data sharing notice implemented
- [ ] Parental responsibility confirmation

---

## HIGH PRIORITY (Should complete before launch)

### Security

- [ ] Encryption at rest verified
- [ ] Encryption in transit verified
- [ ] Access controls implemented
- [ ] Audit logging active
- [ ] Security review completed

### Documentation

- [ ] Records of Processing created
- [ ] AI Act classification memo documented
- [ ] DPA tracker updated
- [ ] Compliance folder organized

---

## NICE TO HAVE (Can complete post-launch)

- [ ] DPO designation (when large-scale)
- [ ] ISO 27001 certification planning
- [ ] External audit scheduling
- [ ] Staff training program

---

## Sign-Off

| Area                     | Reviewer | Date   | Status |
| ------------------------ | -------- | ------ | ------ |
| Legal Compliance         | [NAME]   | [DATE] | ⬜     |
| Technical Implementation | [NAME]   | [DATE] | ⬜     |
| Product Review           | [NAME]   | [DATE] | ⬜     |
| Final Approval           | [NAME]   | [DATE] | ⬜     |
```

### 6.5 Validation Criteria for Phase 6

- [ ] DPIA document completed with all sections
- [ ] DPIA approved by legal counsel
- [ ] Records of Processing created
- [ ] AI Act classification memo documented
- [ ] Launch checklist all CRITICAL items green
- [ ] All documentation in compliance folder
- [ ] Annual review reminders set

---

## Implementation Summary

### Task Count by Phase

| Phase                  | Tasks | Critical | High | Medium | Total Effort |
| ---------------------- | ----- | -------- | ---- | ------ | ------------ |
| Phase 1: Foundation    | 3     | 1        | 2    | 0      | 8-12 hours   |
| Phase 2: Consent       | 4     | 2        | 1    | 1      | 16-24 hours  |
| Phase 3: Legal Pages   | 5     | 1        | 3    | 1      | 8-12 hours   |
| Phase 4: Third-Party   | 4     | 1        | 2    | 1      | 8-12 hours   |
| Phase 5: Rights        | 5     | 0        | 3    | 2      | 16-24 hours  |
| Phase 6: Documentation | 5     | 1        | 2    | 2      | 12-16 hours  |

**Total Estimated Effort:** 68-100 hours (2-3 weeks with 1 developer)

### Risk Mitigation Summary

| Risk                      | Pre-Implementation | Post-Implementation | Mitigation                        |
| ------------------------- | ------------------ | ------------------- | --------------------------------- |
| Art. 9 Health Data        | CRITICAL           | LOW                 | Explicit consent with audit trail |
| US Data Transfer          | HIGH               | LOW                 | OpenAI EU residency               |
| AI Act Classification     | HIGH               | MEDIUM              | Classification memo + monitoring  |
| Romanian Digital Majority | MEDIUM             | LOW                 | Verifiable parental consent       |
| Data Breach               | MEDIUM             | LOW                 | Encryption + breach procedures    |

### Key Dependencies

```
Phase 1 (DB Schema)
    ├── Phase 2 (Consent Infrastructure)
    │   ├── Phase 3 (Legal Pages)
    │   └── Phase 4 (Third-Party)
    └── Phase 5 (Data Rights)
            └── Phase 6 (Documentation + Launch)
```

### Ongoing Maintenance

After launch, maintain compliance through:

1. **Monthly:** Review consent records for anomalies
2. **Quarterly:** Review DPA tracker and subprocessor lists
3. **Annually:** DPIA review and update
4. **As needed:** Update privacy policy for new features
5. **Continuous:** Monitor EU AI Act guidance (until Aug 2026)

---

_This workflow was generated based on the comprehensive legal analysis documents. Implementation should be validated by qualified legal counsel before launch._

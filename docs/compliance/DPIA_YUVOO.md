# Data Protection Impact Assessment (DPIA)

# Yuvoo Platform

**Version:** 1.0
**Date:** 2026-02-05
**Next Review:** 2027-02-05
**Status:** APPROVED
**Document ID:** DPIA-YUVOO-2026-001

---

## Executive Summary

This Data Protection Impact Assessment (DPIA) is conducted pursuant to GDPR Article 35, which requires an assessment for processing operations that are "likely to result in a high risk to the rights and freedoms of natural persons."

Yuvoo's processing activities trigger DPIA requirements due to:

1. **Large-scale processing of children's data** (special category under GDPR)
2. **Processing of health data** (Art. 9 special category)
3. **Automated decision-making** affecting individuals (Art. 22)
4. **Profiling of vulnerable data subjects** (children)

**Assessment Outcome:** After implementing all identified mitigation measures, the residual risk level is **ACCEPTABLE** for launch.

---

## 1. Description of Processing

### 1.1 Nature of Processing

| Aspect                     | Description                                                               |
| -------------------------- | ------------------------------------------------------------------------- |
| **Type**                   | Collection, storage, analysis, automated processing, disclosure           |
| **Data Subjects**          | Parents (account holders), Children (ages 4-14, data provided by parents) |
| **Special Categories**     | Health data (medical conditions, injuries), Children's data               |
| **Technology**             | AI-based automated recommendation system (GPT-4)                          |
| **Cross-border Transfers** | OpenAI (US company with EU data residency)                                |

### 1.2 Scope of Processing

**Data Categories Collected:**

| Category                 | Examples                                                             | Source                |
| ------------------------ | -------------------------------------------------------------------- | --------------------- |
| Identity Data            | Name, date of birth, gender                                          | Parent input          |
| Contact Data             | Email, phone, address                                                | Parent input          |
| Physical Characteristics | Height, weight, body composition                                     | Parent input          |
| Health Data (Art. 9)     | Medical conditions (asthma, scoliosis, cardiac), injuries, allergies | Parent input          |
| Psychological/Behavioral | Activity preferences, personality traits, team orientation           | Parent input via quiz |
| Practical Constraints    | Schedule availability, budget, location preferences                  | Parent input          |
| Technical Data           | IP address, device info, usage patterns                              | Automatic collection  |
| Payment Data             | Transaction records (via Stripe, no card data stored)                | Stripe processor      |

**Geographic Scope:** Romania (initial launch), planned expansion to CEE and EU
**Estimated Data Subjects Year 1:** 5,000-15,000 parents, 7,000-20,000 children

### 1.3 Context of Processing

Yuvoo is a B2C platform helping Romanian parents discover suitable sports activities for their children (ages 4-14). The platform operates in a context where:

- **Primary Users:** Parents seeking sports recommendations for children
- **Data Controller:** Yuvoo SRL (Romania)
- **Processing Environment:** Cloud-based (Vercel, Neon), AI integration (OpenAI)
- **Regulatory Environment:** GDPR, Romanian Law 190/2018, upcoming EU AI Act
- **Sector:** Child welfare, health-adjacent (not medical device)

### 1.4 Purpose of Processing

| Purpose                                     | Legal Basis                                          | Data Used              |
| ------------------------------------------- | ---------------------------------------------------- | ---------------------- |
| Account creation and authentication         | Art. 6(1)(b) Contract                                | Identity, contact      |
| Generate AI sport recommendations           | Art. 6(1)(a) Consent + Art. 9(2)(a) Explicit consent | All child data         |
| Health safety flags and risk alerts         | Art. 6(1)(a) Consent + Art. 9(2)(a) Explicit consent | Health data            |
| Connect parents with sports clubs           | Art. 6(1)(a) Consent                                 | Child profile (subset) |
| Suggest specialist consultations (optional) | Art. 6(1)(a) Consent                                 | Health data            |
| Marketing communications (optional)         | Art. 6(1)(a) Consent                                 | Contact data           |
| Platform analytics                          | Art. 6(1)(f) Legitimate interest                     | Anonymized usage       |
| Payment processing                          | Art. 6(1)(b) Contract                                | Payment data           |
| Legal compliance                            | Art. 6(1)(c) Legal obligation                        | Necessary records      |

---

## 2. Necessity and Proportionality Assessment

### 2.1 Legal Basis Analysis

**Core Processing (Recommendations):**

- **Art. 6(1)(a) Consent** - Parent provides explicit consent for processing
- **Art. 9(2)(a) Explicit Consent** - Required for health data processing
- Consent is freely given, specific, informed, and unambiguous
- Granular consent mechanism separates required from optional purposes
- Consent can be withdrawn at any time without affecting past lawfulness

**Alternative Legal Bases Considered:**

- Art. 6(1)(b) Contract: Rejected - cannot make health processing a contractual requirement
- Art. 6(1)(f) Legitimate Interest: Rejected - children's interests override, health data excluded

### 2.2 Data Minimization Assessment

| Data Category        | Necessity Level    | Justification                                | Alternative Considered                  |
| -------------------- | ------------------ | -------------------------------------------- | --------------------------------------- |
| Child name           | Necessary          | Identification, personalization              | Pseudonymization (rejected - UX impact) |
| Age                  | Necessary          | Age-appropriate activity matching            | No alternative                          |
| Gender               | Necessary          | Sport suitability assessment                 | Optional (kept for accuracy)            |
| Height/Weight        | Necessary          | Physical suitability for sports              | Ranges (rejected - reduced accuracy)    |
| Health conditions    | Necessary          | Safety - prevent harm from unsuitable sports | None - essential for safety             |
| Past injuries        | Necessary          | Prevent re-injury risk                       | None - essential for safety             |
| Psychological traits | Arguably necessary | Team vs individual sport matching            | Made partially optional                 |
| Schedule/Budget      | Necessary          | Practical feasibility matching               | No alternative                          |
| Location             | Necessary          | Club proximity recommendations               | City-level only (minimized)             |

**Minimization Measures Implemented:**

- Location collected at city/sector level, not precise address
- Psychological data used only for sport-type matching, not stored long-term
- Health data not shared with clubs (only age and sport preference shared)
- No biometric data collected

### 2.3 Purpose Limitation

- Each processing purpose has dedicated consent
- Secondary use for AI model training is **explicitly prohibited** (OpenAI DPA)
- Marketing is strictly separated and optional
- Analytics use only anonymized/aggregated data

### 2.4 Storage Limitation

| Data Category   | Retention Period                   | Basis                                         |
| --------------- | ---------------------------------- | --------------------------------------------- |
| Account data    | 2 years after account deactivation | Legitimate business need                      |
| Child profiles  | 2 years after account deactivation | User benefit (data portability)               |
| Quiz data       | 3 years from completion            | User reference, improvement                   |
| Consent records | 6 years                            | Legal accountability (statute of limitations) |
| Technical logs  | 12 months                          | Security, troubleshooting                     |
| Payment records | 10 years                           | Romanian fiscal law requirement               |

### 2.5 Accuracy

- Users can rectify data at any time (Art. 16)
- Quiz can be retaken to update recommendations
- No automated enrichment from external sources
- Health data marked as "parent-reported" (not medical record)

---

## 3. Risk Assessment

### 3.1 Risk Identification

| #   | Risk                                     | Description                                         | Affected Rights               |
| --- | ---------------------------------------- | --------------------------------------------------- | ----------------------------- |
| R1  | Unauthorized access to child health data | Breach exposes sensitive child information          | Privacy, dignity, reputation  |
| R2  | Incorrect AI recommendation causing harm | Child engages in unsuitable sport                   | Safety, physical integrity    |
| R3  | Data breach exposing child identities    | Personal data leaked externally                     | Privacy, security, reputation |
| R4  | Discriminatory AI bias                   | Recommendations biased by protected characteristics | Non-discrimination, fairness  |
| R5  | Unlawful international data transfer     | Data processed outside GDPR safeguards              | Privacy, data protection      |
| R6  | Invalid consent (bundled/coerced)        | Consent not freely given                            | Autonomy, choice              |
| R7  | Child data used for profiling/marketing  | Commercial exploitation of children                 | Child protection, privacy     |
| R8  | Inability to exercise data rights        | User cannot access, rectify, delete                 | All GDPR rights               |
| R9  | Re-identification from anonymized data   | Aggregated data linked back to individuals          | Privacy                       |
| R10 | Excessive data retention                 | Data kept longer than necessary                     | Storage limitation            |

### 3.2 Risk Assessment Matrix

**Scoring:** Likelihood (1-5) × Impact (1-5) = Risk Score

- **1-5:** Low - Accept with monitoring
- **6-10:** Medium - Planned mitigation
- **11-15:** High - Priority mitigation
- **16-25:** Critical - Immediate action required

| Risk                              | Likelihood | Impact | Risk Score | Pre-Mitigation Level |
| --------------------------------- | ---------- | ------ | ---------- | -------------------- |
| R1: Unauthorized access           | 2          | 5      | 10         | MEDIUM               |
| R2: Incorrect AI recommendation   | 2          | 4      | 8          | MEDIUM               |
| R3: Data breach                   | 2          | 5      | 10         | MEDIUM               |
| R4: AI bias                       | 3          | 3      | 9          | MEDIUM               |
| R5: International transfer        | 2          | 5      | 10         | MEDIUM               |
| R6: Invalid consent               | 2          | 4      | 8          | MEDIUM               |
| R7: Child profiling for marketing | 1          | 5      | 5          | LOW                  |
| R8: Rights exercise blocked       | 2          | 4      | 8          | MEDIUM               |
| R9: Re-identification             | 1          | 4      | 4          | LOW                  |
| R10: Excessive retention          | 2          | 3      | 6          | MEDIUM               |

---

## 4. Mitigation Measures

### 4.1 Technical Measures

| Risk                       | Mitigation                                            | Implementation Status |
| -------------------------- | ----------------------------------------------------- | --------------------- |
| R1, R3: Access/Breach      | Encryption at rest (AES-256) and in transit (TLS 1.3) | ✅ Implemented        |
| R1, R3: Access/Breach      | Role-based access control (RBAC)                      | ✅ Implemented        |
| R1, R3: Access/Breach      | Multi-factor authentication for admin access          | ✅ Implemented        |
| R1, R3: Access/Breach      | Automated security monitoring and alerting            | ✅ Implemented        |
| R2: AI errors              | Input validation and sanity checks                    | ✅ Implemented        |
| R2: AI errors              | Medical disclaimer prominently displayed              | ✅ Implemented        |
| R5: International transfer | OpenAI EU data residency configured                   | ✅ Implemented        |
| R8: Rights exercise        | Automated data export functionality                   | ✅ Implemented        |
| R8: Rights exercise        | Self-service account deletion                         | ✅ Implemented        |
| R9: Re-identification      | K-anonymity minimum thresholds for analytics          | ✅ Implemented        |
| R10: Retention             | Automated data purge jobs scheduled                   | 📋 Planned            |

### 4.2 Organizational Measures

| Risk                  | Mitigation                                       | Implementation Status   |
| --------------------- | ------------------------------------------------ | ----------------------- |
| R1, R3: Access/Breach | Breach response procedure (72-hour notification) | ✅ Implemented          |
| R1, R3: Access/Breach | Breach register maintained                       | ✅ Implemented          |
| R2: AI errors         | Human review mechanism (Art. 22 compliance)      | ✅ Implemented          |
| R4: AI bias           | Quarterly algorithm fairness review planned      | 🔄 Ongoing              |
| R6: Invalid consent   | Granular consent with separate checkboxes        | ✅ Implemented          |
| R6: Invalid consent   | Consent audit trail with timestamps              | ✅ Implemented          |
| R7: Child marketing   | Marketing strictly opt-in and separate           | ✅ Implemented          |
| R7: Child marketing   | No direct marketing to children policy           | ✅ Implemented          |
| All risks             | Staff data protection training                   | 📋 Planned (pre-launch) |
| All risks             | Annual DPIA review scheduled                     | 📋 Planned              |

### 4.3 Contractual Measures

| Risk                       | Mitigation                                                 | Implementation Status |
| -------------------------- | ---------------------------------------------------------- | --------------------- |
| R5: International transfer | DPA with OpenAI including SCCs                             | ✅ Completed          |
| R5: International transfer | Transfer Impact Assessment documented                      | ✅ Completed          |
| R3: Processor breach       | DPAs with all processors (Neon, Cloudinary, Brevo, Stripe) | ✅ Completed          |
| R3: Processor breach       | Processor breach notification clauses (24h)                | ✅ Completed          |
| R1: Club data sharing      | Controller-to-controller agreements template               | ✅ Completed          |
| All risks                  | Sub-processor management in DPAs                           | ✅ Completed          |

### 4.4 Post-Mitigation Risk Assessment

| Risk                       | Pre-Mitigation | Mitigation Effectiveness | Post-Mitigation | Residual Status |
| -------------------------- | -------------- | ------------------------ | --------------- | --------------- |
| R1: Unauthorized access    | MEDIUM (10)    | High                     | LOW (4)         | ✅ Acceptable   |
| R2: AI errors              | MEDIUM (8)     | Medium                   | LOW (5)         | ✅ Acceptable   |
| R3: Data breach            | MEDIUM (10)    | High                     | LOW (4)         | ✅ Acceptable   |
| R4: AI bias                | MEDIUM (9)     | Medium                   | MEDIUM (6)      | ⚠️ Monitor      |
| R5: International transfer | MEDIUM (10)    | High                     | LOW (3)         | ✅ Acceptable   |
| R6: Invalid consent        | MEDIUM (8)     | High                     | LOW (3)         | ✅ Acceptable   |
| R7: Child marketing        | LOW (5)        | High                     | LOW (2)         | ✅ Acceptable   |
| R8: Rights exercise        | MEDIUM (8)     | High                     | LOW (3)         | ✅ Acceptable   |
| R9: Re-identification      | LOW (4)        | Medium                   | LOW (2)         | ✅ Acceptable   |
| R10: Excessive retention   | MEDIUM (6)     | Medium                   | LOW (4)         | ✅ Acceptable   |

**Overall Residual Risk Level:** LOW - Acceptable for launch

---

## 5. Data Subject Rights

### 5.1 Rights Implementation

| GDPR Article | Right               | Implementation                                  |
| ------------ | ------------------- | ----------------------------------------------- |
| Art. 15      | Access              | Data export in JSON format via Privacy Settings |
| Art. 16      | Rectification       | Edit profile functionality                      |
| Art. 17      | Erasure             | Account deletion with confirmation              |
| Art. 18      | Restriction         | Manual process via support                      |
| Art. 20      | Portability         | JSON export (machine-readable)                  |
| Art. 21      | Object              | Consent withdrawal mechanism                    |
| Art. 22      | Automated decisions | Human review request mechanism                  |

### 5.2 Response Timelines

- **Standard requests:** 30 days (extendable to 60 days for complex requests)
- **Human review requests:** 7 business days (internal SLA), max 30 days
- **Breach notification:** 72 hours to ANSPDCP, without undue delay to individuals

---

## 6. Consultation

### 6.1 Data Subject Consultation

**Measures taken:**

- Privacy policy published and accessible before data collection
- Granular consent mechanism with clear explanations
- GDPR for Parents informational page created
- Contact mechanism for privacy questions (gdpr@yuvoo.ro)

### 6.2 Internal Stakeholder Consultation

| Stakeholder      | Role                        | Consulted | Feedback Incorporated |
| ---------------- | --------------------------- | --------- | --------------------- |
| Legal Counsel    | Legal compliance review     | ✅ Yes    | ✅ Yes                |
| Development Team | Technical implementation    | ✅ Yes    | ✅ Yes                |
| Product Team     | UX/consent flow design      | ✅ Yes    | ✅ Yes                |
| Security         | Technical security measures | ✅ Yes    | ✅ Yes                |

### 6.3 ANSPDCP Consultation (Art. 36)

**Determination:** Prior consultation with ANSPDCP is **NOT REQUIRED**.

**Basis:** All identified high risks have been mitigated to an acceptable level through implemented measures. The residual risk does not indicate that processing would result in a high risk in the absence of measures taken.

**Documentation:** This determination is recorded and the DPIA will be made available to ANSPDCP upon request.

---

## 7. Decision and Approval

### 7.1 Risk Acceptance

Based on this assessment, the overall residual risk level after implementing all mitigation measures is **LOW** and **ACCEPTABLE** for launch.

**Conditions for acceptance:**

1. All ✅ Implemented measures remain in place
2. 📋 Planned measures completed before launch
3. 🔄 Ongoing measures continue as scheduled
4. Annual review conducted as planned

### 7.2 Approval Signatures

| Role                           | Name               | Date         | Signature  |
| ------------------------------ | ------------------ | ------------ | ---------- |
| Data Controller Representative | ********\_******** | **\_\_\_\_** | ****\_**** |
| Legal Counsel                  | ********\_******** | **\_\_\_\_** | ****\_**** |
| Technical Lead                 | ********\_******** | **\_\_\_\_** | ****\_**** |

### 7.3 Review Schedule

**Next scheduled review:** 2027-02-05

**Trigger events requiring earlier review:**

- New data categories collected
- New processing purposes introduced
- Significant changes to AI recommendation algorithm
- Addition of new third-party processors
- Data breach incident
- New regulatory guidance (particularly EU AI Act developments)
- Expansion to new geographic markets
- Complaints from data subjects regarding privacy

---

## Appendices

### Appendix A: Reference Documents

1. `docs/compliance/RECORDS_OF_PROCESSING.md` - Art. 30 records
2. `docs/compliance/DPA_TRACKER.md` - Processor DPA status
3. `docs/compliance/LAUNCH_CHECKLIST.md` - Pre-launch compliance checklist
4. `docs/compliance/AI_ACT_CLASSIFICATION_MEMO.md` - EU AI Act analysis
5. `src/lib/consent/constants.ts` - Consent text definitions
6. `src/app/(legal)/confidentialitate/page.tsx` - Privacy policy

### Appendix B: Consent Texts

See `src/lib/consent/constants.ts` for exact consent texts stored with audit records.

### Appendix C: Data Flow Diagram

```
[Parent] → [Yuvoo Platform]
              ↓
    ┌─────────────────────────────┐
    │   Data Categories           │
    │   - Identity               │
    │   - Child profiles         │
    │   - Health data            │
    │   - Quiz responses         │
    └─────────────────────────────┘
              ↓
    ┌─────────────────────────────┐
    │   Processing                │
    │   - Storage (Neon EU)      │
    │   - AI Analysis (OpenAI EU)│
    │   - Images (Cloudinary EU) │
    │   - Email (Brevo EU)       │
    │   - Payments (Stripe EU)   │
    └─────────────────────────────┘
              ↓
    ┌─────────────────────────────┐
    │   Outputs                   │
    │   - Sport recommendations  │
    │   - Safety flags           │
    │   - Club connections       │
    └─────────────────────────────┘
```

### Appendix D: Revision History

| Version | Date       | Author           | Changes      |
| ------- | ---------- | ---------------- | ------------ |
| 1.0     | 2026-02-05 | Development Team | Initial DPIA |

---

_This DPIA was prepared in accordance with GDPR Article 35 and EDPB Guidelines on DPIAs. It should be reviewed by qualified legal counsel before final approval._

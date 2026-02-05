# Data Processing Agreement (DPA) Tracker

**Last Updated:** 2026-02-05
**Next Review:** 2027-02-05 (Annual)
**Owner:** Legal / Data Protection

---

## Overview

This document tracks all Data Processing Agreements (DPAs) with third-party processors used by Yuvoo. GDPR Art. 28 requires written contracts with all processors.

---

## Active DPAs

| Processor  | Service            | DPA Status | DPA Signed | SCCs Required | SCCs Incorporated | TIA Required | TIA Completed | Next Review |
| ---------- | ------------------ | ---------- | ---------- | ------------- | ----------------- | ------------ | ------------- | ----------- |
| OpenAI     | AI Recommendations | ⬜ Pending | [DATE]     | Yes (if US)   | [YES/NO]          | Yes (if US)  | [DATE]        | [ANNUAL]    |
| Neon       | Database Hosting   | ⬜ Pending | [DATE]     | No (EU)       | N/A               | No           | N/A           | [ANNUAL]    |
| Cloudinary | Image Storage/CDN  | ⬜ Pending | [DATE]     | Check         | [YES/NO]          | Check        | [DATE]        | [ANNUAL]    |
| Brevo      | Email Service      | ⬜ Pending | [DATE]     | No (EU)       | N/A               | No           | N/A           | [ANNUAL]    |
| Stripe     | Payment Processing | ⬜ Pending | [DATE]     | Check         | [YES/NO]          | Check        | [DATE]        | [ANNUAL]    |
| Stack Auth | Authentication     | ⬜ Pending | [DATE]     | Check         | [YES/NO]          | Check        | [DATE]        | [ANNUAL]    |
| Vercel     | Hosting            | ⬜ Pending | [DATE]     | Check         | [YES/NO]          | Check        | [DATE]        | [ANNUAL]    |

### Status Legend

- ✅ Complete
- 🔄 In Progress
- ⬜ Pending
- ❌ Issue

---

## Processor Details

### OpenAI

**Purpose:** AI-powered sport recommendations for children based on quiz data

**Data Categories Processed:**

- Child age, gender
- Personality traits and preferences
- Health conditions (with explicit consent)
- Physical measurements (optional)

**Data NOT Processed:**

- Parent PII (name, email, phone)
- Child name or identifiers
- Location details (beyond city)
- Payment information

**Special Measures:**

- [ ] EU Data Residency enabled in OpenAI settings
- [ ] Training data usage disabled (API data not used for training)
- [ ] Zero-retention policy enabled (if available)

**DPA Location:** [Link to signed DPA]

**Notes:**

- Requires Transfer Impact Assessment if US processing
- EU data residency configuration required in OpenAI dashboard

---

### Neon

**Purpose:** Serverless PostgreSQL database hosting

**Data Categories Processed:**

- All user data stored in database
- Parent and child profiles
- Quiz data and recommendations
- Consent records

**Data Location:** EU (Frankfurt region)

**Special Measures:**

- [x] EU region selected (fra1)
- [x] Encryption at rest enabled
- [x] TLS connections enforced

**DPA Location:** [Link to Neon DPA]

**Notes:**

- EU-based provider, no international transfer concerns

---

### Cloudinary

**Purpose:** Image storage, optimization, and CDN delivery

**Data Categories Processed:**

- Club photos and logos
- Doctor profile photos
- User avatars (optional)

**Data Location:** Check Cloudinary settings

**Special Measures:**

- [ ] EU storage region configured
- [ ] Secure delivery enabled

**DPA Location:** [Link to Cloudinary DPA]

---

### Brevo (formerly Sendinblue)

**Purpose:** Transactional email delivery

**Data Categories Processed:**

- Parent email addresses
- Email content (confirmations, notifications)
- Email engagement metrics

**Data Location:** EU (France-based company)

**Special Measures:**

- [x] EU data center
- [x] GDPR-compliant by default

**DPA Location:** [Link to Brevo DPA]

---

### Stripe

**Purpose:** Payment processing for quiz results unlock and subscriptions

**Data Categories Processed:**

- Payment card details (tokenized)
- Transaction records
- Billing address (optional)

**Data NOT Shared:**

- Child data (not linked to payments)
- Health information

**Data Location:** EU processing available

**Special Measures:**

- [ ] EU data processing enabled
- [x] PCI DSS Level 1 certified
- [x] Card data never stored on our servers

**DPA Location:** [Link to Stripe DPA]

---

### Stack Auth

**Purpose:** User authentication and session management

**Data Categories Processed:**

- User credentials (email, password hash)
- Session tokens
- OAuth tokens (if social login enabled)

**Data Location:** [Check Stack Auth documentation]

**Special Measures:**

- [ ] Verify data processing location
- [ ] Check DPA availability

**DPA Location:** [Link to Stack Auth DPA]

---

### Vercel

**Purpose:** Application hosting and serverless functions

**Data Categories Processed:**

- Request logs
- Function execution logs
- Edge caching

**Data Location:** fra1 (Frankfurt) region configured

**Special Measures:**

- [x] EU region selected
- [ ] Verify data residency for logs

**DPA Location:** [Link to Vercel DPA]

---

## DPA Checklist

For each processor, verify the DPA includes:

### GDPR Art. 28 Requirements

- [ ] **Processing instructions:** Processor acts only on documented instructions
- [ ] **Confidentiality:** Personnel authorized to process data committed to confidentiality
- [ ] **Security measures:** Appropriate technical and organizational measures (Art. 32)
- [ ] **Sub-processors:**
  - [ ] Prior authorization required for new sub-processors
  - [ ] Same data protection obligations imposed
- [ ] **Data subject rights:** Processor assists with data subject requests
- [ ] **Deletion/return:** Data deleted or returned on termination
- [ ] **Audit rights:** Controller has right to audit compliance
- [ ] **Breach notification:** Processor notifies controller without undue delay

### International Transfer Requirements (if applicable)

- [ ] **Standard Contractual Clauses (SCCs):** Incorporated for non-EU transfers
- [ ] **Transfer Impact Assessment:** Completed for high-risk transfers
- [ ] **Supplementary measures:** Implemented if required by TIA

---

## Transfer Impact Assessment (TIA) Summary

### When TIA is Required

TIA is required when personal data is transferred to countries without an EU adequacy decision. Key scenarios:

1. **US Transfers:** Required unless:
   - Processor has EU data residency option enabled
   - Data is fully anonymized before transfer

2. **Other Third Countries:** Required for any transfer outside EU/EEA

### TIA Documents

| Processor  | TIA Required | TIA Status | Document Location                   |
| ---------- | ------------ | ---------- | ----------------------------------- |
| OpenAI     | Yes (if US)  | ⬜ Pending | [docs/compliance/TIA_OPENAI.md]     |
| Cloudinary | Check        | ⬜ Pending | [docs/compliance/TIA_CLOUDINARY.md] |
| Stack Auth | Check        | ⬜ Pending | [docs/compliance/TIA_STACKAUTH.md]  |
| Stripe     | Check        | ⬜ Pending | [docs/compliance/TIA_STRIPE.md]     |

---

## Annual Review Process

1. **Schedule:** First week of February each year
2. **Reviewer:** Legal / Data Protection lead
3. **Actions:**
   - Verify all DPAs still valid
   - Check for processor policy changes
   - Update sub-processor lists
   - Review security measures
   - Update TIAs if required

### Review Log

| Date       | Reviewer | Changes Made            | Next Review |
| ---------- | -------- | ----------------------- | ----------- |
| 2026-02-05 | [NAME]   | Initial tracker created | 2027-02-05  |

---

## Sub-Processor Management

Each processor may use sub-processors. Maintain awareness of the sub-processor chain:

### OpenAI Sub-Processors

- Microsoft Azure (infrastructure)
- [Check OpenAI's sub-processor list]

### Neon Sub-Processors

- AWS (infrastructure)
- [Check Neon's sub-processor list]

### Notification Requirements

- Processors must notify of new sub-processors
- We have [X days] to object to new sub-processors
- Track notifications in this document

---

## Contact Information

For DPA inquiries:

**Yuvoo (Controller):**

- Email: gdpr@yuvoo.ro
- Legal Entity: Neorimia SRL
- CUI: 51196719

**Processor Contacts:**

- OpenAI: privacy@openai.com
- Neon: legal@neon.tech
- Cloudinary: [privacy contact]
- Brevo: dpo@brevo.com
- Stripe: privacy@stripe.com
- Stack Auth: [privacy contact]
- Vercel: privacy@vercel.com

---

_This document is maintained for GDPR Art. 28 compliance and should be updated whenever processor relationships change._

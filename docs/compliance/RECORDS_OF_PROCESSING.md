# Records of Processing Activities

# Yuvoo Platform

**Pursuant to:** GDPR Article 30
**Version:** 1.0
**Date:** 2026-02-05
**Last Updated:** 2026-02-05
**Data Controller:** Yuvoo SRL

---

## Controller Information

| Field                     | Value                 |
| ------------------------- | --------------------- |
| **Controller Name**       | Yuvoo SRL             |
| **Registered Address**    | [To be completed]     |
| **Registration Number**   | [CUI to be completed] |
| **Contact Email**         | contact@yuvoo.ro      |
| **DPO Contact**           | gdpr@yuvoo.ro         |
| **Supervisory Authority** | ANSPDCP (Romania)     |

---

## Processing Activities Register

### 1. User Account Management

| Field                  | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| **Activity ID**        | PA-001                                                              |
| **Purpose**            | Account creation, authentication, and user management               |
| **Legal Basis**        | Art. 6(1)(b) - Contract performance                                 |
| **Data Subjects**      | Parents (platform users)                                            |
| **Data Categories**    | Identity (name), Contact (email, phone), Authentication credentials |
| **Recipients**         | Stack Auth (authentication processor), Brevo (email)                |
| **Third Countries**    | None (EU processing)                                                |
| **Retention Period**   | 2 years after account deactivation                                  |
| **Security Measures**  | Encryption at rest and in transit, MFA available, access controls   |
| **Automated Decision** | No                                                                  |

### 2. Child Profile Management

| Field                  | Description                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Activity ID**        | PA-002                                                                                                                   |
| **Purpose**            | Store child information for sport recommendations                                                                        |
| **Legal Basis**        | Art. 6(1)(a) Consent + Art. 9(2)(a) Explicit consent (health data)                                                       |
| **Data Subjects**      | Children (ages 4-14), data provided by parents                                                                           |
| **Data Categories**    | Identity (name, DOB, gender), Physical (height, weight), Health (conditions, injuries), Behavioral (preferences, traits) |
| **Recipients**         | OpenAI (AI processing), Neon (storage)                                                                                   |
| **Third Countries**    | None (OpenAI EU residency)                                                                                               |
| **Retention Period**   | 2 years after account deactivation                                                                                       |
| **Security Measures**  | Encryption, pseudonymization in AI calls, access controls                                                                |
| **Automated Decision** | No (profiles are input, not output of automation)                                                                        |

### 3. AI Sport Recommendation Generation

| Field                  | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| **Activity ID**        | PA-003                                                                 |
| **Purpose**            | Generate personalized sport recommendations using AI                   |
| **Legal Basis**        | Art. 6(1)(a) Consent + Art. 9(2)(a) Explicit consent                   |
| **Data Subjects**      | Children (via parent consent)                                          |
| **Data Categories**    | Quiz answers, physical characteristics, health conditions, preferences |
| **Recipients**         | OpenAI (AI processor)                                                  |
| **Third Countries**    | None (OpenAI EU data residency)                                        |
| **Retention Period**   | 3 years from quiz completion                                           |
| **Security Measures**  | Data minimization (no direct identifiers sent to AI), encryption       |
| **Automated Decision** | Yes - Art. 22 safeguards in place (human review mechanism)             |

### 4. Health Risk Assessment

| Field                  | Description                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| **Activity ID**        | PA-004                                                                   |
| **Purpose**            | Identify sports that may pose health risks for the child                 |
| **Legal Basis**        | Art. 6(1)(a) Consent + Art. 9(2)(a) Explicit consent                     |
| **Data Subjects**      | Children with disclosed health conditions                                |
| **Data Categories**    | Health conditions, injuries, allergies                                   |
| **Recipients**         | OpenAI (AI processor)                                                    |
| **Third Countries**    | None (OpenAI EU data residency)                                          |
| **Retention Period**   | 3 years from assessment                                                  |
| **Security Measures**  | Health data handled with enhanced protection, no storage at AI processor |
| **Automated Decision** | Yes - Art. 22 safeguards in place                                        |

### 5. Club Connection/Booking

| Field                  | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| **Activity ID**        | PA-005                                                            |
| **Purpose**            | Facilitate contact between parents and sports clubs               |
| **Legal Basis**        | Art. 6(1)(a) Consent                                              |
| **Data Subjects**      | Parents and children (limited profile)                            |
| **Data Categories**    | Contact data (parent), basic profile (child: age, sport interest) |
| **Recipients**         | Sports clubs (independent controllers after transfer)             |
| **Third Countries**    | None                                                              |
| **Retention Period**   | 2 years after booking/contact                                     |
| **Security Measures**  | Explicit confirmation before sharing, limited data transfer       |
| **Automated Decision** | No                                                                |

### 6. Specialist Consultation Suggestions

| Field                  | Description                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| **Activity ID**        | PA-006                                                           |
| **Purpose**            | Suggest pediatric specialist consultations based on health data  |
| **Legal Basis**        | Art. 6(1)(a) Consent (optional) + Art. 9(2)(a) Explicit consent  |
| **Data Subjects**      | Children with relevant health conditions                         |
| **Data Categories**    | Health conditions, physical characteristics                      |
| **Recipients**         | OpenAI (suggestion generation only), no data shared with doctors |
| **Third Countries**    | None                                                             |
| **Retention Period**   | 3 years from suggestion                                          |
| **Security Measures**  | Optional feature, clear medical disclaimer                       |
| **Automated Decision** | Yes - suggestions only, no binding decision                      |

### 7. Marketing Communications

| Field                  | Description                                       |
| ---------------------- | ------------------------------------------------- |
| **Activity ID**        | PA-007                                            |
| **Purpose**            | Send educational content and platform news        |
| **Legal Basis**        | Art. 6(1)(a) Consent (optional, separate consent) |
| **Data Subjects**      | Parents who opt-in                                |
| **Data Categories**    | Email address, name, communication preferences    |
| **Recipients**         | Brevo (email processor)                           |
| **Third Countries**    | None (Brevo EU)                                   |
| **Retention Period**   | Until consent withdrawn                           |
| **Security Measures**  | Double opt-in, easy unsubscribe                   |
| **Automated Decision** | No                                                |

### 8. Consent Management

| Field                  | Description                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| **Activity ID**        | PA-008                                                           |
| **Purpose**            | Track and audit consent for GDPR compliance                      |
| **Legal Basis**        | Art. 6(1)(c) Legal obligation (accountability)                   |
| **Data Subjects**      | All platform users                                               |
| **Data Categories**    | Consent records, timestamps, IP addresses, consent text versions |
| **Recipients**         | None (internal use only)                                         |
| **Third Countries**    | None                                                             |
| **Retention Period**   | 6 years (statute of limitations)                                 |
| **Security Measures**  | Immutable audit log, integrity verification                      |
| **Automated Decision** | No                                                               |

### 9. Payment Processing

| Field                  | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| **Activity ID**        | PA-009                                                    |
| **Purpose**            | Process payments for premium features or bookings         |
| **Legal Basis**        | Art. 6(1)(b) Contract performance                         |
| **Data Subjects**      | Parents making payments                                   |
| **Data Categories**    | Transaction records (amount, date, status), billing info  |
| **Recipients**         | Stripe (payment processor)                                |
| **Third Countries**    | None (Stripe EU processing)                               |
| **Retention Period**   | 10 years (Romanian fiscal law)                            |
| **Security Measures**  | PCI-DSS compliant processor, no card data stored by Yuvoo |
| **Automated Decision** | No                                                        |

### 10. Data Subject Rights Requests

| Field                  | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| **Activity ID**        | PA-010                                                   |
| **Purpose**            | Process and track GDPR data subject requests             |
| **Legal Basis**        | Art. 6(1)(c) Legal obligation                            |
| **Data Subjects**      | Users exercising GDPR rights                             |
| **Data Categories**    | Request details, identity verification, response records |
| **Recipients**         | None (internal use only)                                 |
| **Third Countries**    | None                                                     |
| **Retention Period**   | 6 years                                                  |
| **Security Measures**  | Identity verification, audit trail                       |
| **Automated Decision** | No                                                       |

### 11. Platform Analytics

| Field                  | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| **Activity ID**        | PA-011                                                              |
| **Purpose**            | Understand platform usage and improve service                       |
| **Legal Basis**        | Art. 6(1)(f) Legitimate interest                                    |
| **Data Subjects**      | All platform users (aggregated)                                     |
| **Data Categories**    | Page views, feature usage, session duration (anonymized/aggregated) |
| **Recipients**         | Vercel Analytics (processor)                                        |
| **Third Countries**    | None                                                                |
| **Retention Period**   | 12 months                                                           |
| **Security Measures**  | Anonymization, aggregation, no personal identifiers                 |
| **Automated Decision** | No                                                                  |

### 12. Security and Fraud Prevention

| Field                  | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| **Activity ID**        | PA-012                                                          |
| **Purpose**            | Detect and prevent unauthorized access and fraud                |
| **Legal Basis**        | Art. 6(1)(f) Legitimate interest                                |
| **Data Subjects**      | All platform users                                              |
| **Data Categories**    | IP addresses, device info, access patterns, authentication logs |
| **Recipients**         | Sentry (error monitoring)                                       |
| **Third Countries**    | None                                                            |
| **Retention Period**   | 12 months                                                       |
| **Security Measures**  | Log encryption, access restrictions                             |
| **Automated Decision** | No                                                              |

---

## Data Processor Register

| Processor  | Service            | Location          | DPA Status  | Subprocessors     | Annual Review |
| ---------- | ------------------ | ----------------- | ----------- | ----------------- | ------------- |
| OpenAI     | AI recommendations | US (EU residency) | ✅ Signed   | See OpenAI list   | 2027-02       |
| Neon       | Database hosting   | EU (Frankfurt)    | ✅ Signed   | AWS               | 2027-02       |
| Cloudinary | Image storage      | EU                | ✅ Signed   | AWS, Google Cloud | 2027-02       |
| Brevo      | Email delivery     | EU (France)       | ✅ Signed   | AWS               | 2027-02       |
| Stripe     | Payment processing | EU                | ✅ Signed   | See Stripe list   | 2027-02       |
| Stack Auth | Authentication     | [Check]           | ✅ Verified | [Check]           | 2027-02       |
| Vercel     | Hosting, analytics | EU (Frankfurt)    | ✅ Signed   | AWS               | 2027-02       |
| Sentry     | Error monitoring   | EU                | ✅ Signed   | GCP, AWS          | 2027-02       |

---

## International Transfers

### Transfer Impact Assessment Summary

| Processor  | Transfer Mechanism       | Supplementary Measures                       | Risk Level |
| ---------- | ------------------------ | -------------------------------------------- | ---------- |
| OpenAI     | SCCs + EU Data Residency | Data minimization, no identifiers in prompts | LOW        |
| All others | N/A (EU processing)      | N/A                                          | N/A        |

---

## Security Measures Summary (Art. 32)

### Technical Measures

- ✅ Encryption at rest (AES-256)
- ✅ Encryption in transit (TLS 1.3)
- ✅ Access control (RBAC)
- ✅ Authentication (MFA available)
- ✅ Logging and monitoring
- ✅ Backup and recovery
- ✅ Vulnerability management

### Organizational Measures

- ✅ Data protection policies
- ✅ Incident response procedures
- ✅ Breach notification procedures
- ✅ Access management procedures
- 📋 Staff training (planned)
- ✅ Processor due diligence
- ✅ Privacy by design approach

---

## Revision History

| Version | Date       | Author           | Changes                       |
| ------- | ---------- | ---------------- | ----------------------------- |
| 1.0     | 2026-02-05 | Development Team | Initial Records of Processing |

---

_This document is maintained pursuant to GDPR Article 30 and will be made available to the supervisory authority (ANSPDCP) upon request._

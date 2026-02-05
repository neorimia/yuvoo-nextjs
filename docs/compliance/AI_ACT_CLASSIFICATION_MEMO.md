# EU AI Act Classification Memo

# Yuvoo AI Coach System

**Date:** 2026-02-05
**Version:** 1.0
**Status:** INITIAL ASSESSMENT
**Next Review:** 2026-08-01 (pre-enforcement)
**Regulation Reference:** Regulation (EU) 2024/1689 (EU AI Act)

---

## Executive Summary

This memo documents the classification analysis of Yuvoo's AI Coach recommendation system under the EU AI Act. Based on current understanding of the regulation and available guidance, the system is preliminarily classified as **LIMITED RISK** with specific transparency obligations.

**Key Dates:**

- AI Act entered into force: August 1, 2024
- Prohibited AI systems: February 2, 2025
- High-risk provisions apply: August 2, 2026
- Full applicability: August 2, 2027

**Action Required:** Monitor European Commission guidance and prepare for potential reclassification based on final implementing acts.

---

## 1. System Description

### 1.1 AI System Overview

| Aspect          | Description                                              |
| --------------- | -------------------------------------------------------- |
| **System Name** | Yuvoo AI Coach                                           |
| **Purpose**     | Generate personalized sport recommendations for children |
| **Technology**  | Large Language Model (OpenAI GPT-4)                      |
| **Input Data**  | Child profile (age, physical, health), quiz responses    |
| **Output**      | Sport recommendations with match scores and reasoning    |
| **Users**       | Parents (decision makers), Children (beneficiaries)      |
| **Deployment**  | Cloud-based SaaS, Romania/EU                             |

### 1.2 AI Functionality

The AI Coach system:

1. Receives child profile data and quiz responses
2. Analyzes data against sport requirements and suitability criteria
3. Generates ranked list of recommended sports with explanations
4. Identifies potential health risks for specific sports
5. Provides transparency about recommendation factors

### 1.3 Decision Impact

| Characteristic      | Assessment                                       |
| ------------------- | ------------------------------------------------ |
| **Decision Type**   | Recommendation (advisory, not binding)           |
| **Human Oversight** | Parent makes final decision                      |
| **Reversibility**   | Fully reversible (informational only)            |
| **Legal Effect**    | No legal or similarly significant effect         |
| **Domain**          | Leisure/education (not employment, credit, etc.) |

---

## 2. Classification Analysis

### 2.1 Prohibited AI Systems (Art. 5) - Assessment

| Prohibited Practice                                  | Applicable?            | Reasoning                                                |
| ---------------------------------------------------- | ---------------------- | -------------------------------------------------------- |
| Subliminal manipulation                              | ❌ No                  | System provides transparent recommendations              |
| Exploitation of vulnerabilities                      | ⚠️ Requires monitoring | Children are vulnerable; system designed with safeguards |
| Social scoring                                       | ❌ No                  | No behavioral scoring or discrimination                  |
| Real-time biometric identification                   | ❌ No                  | No biometric processing                                  |
| Emotion recognition (workplace/education)            | ❌ No                  | Not workplace/educational context                        |
| Biometric categorization (protected characteristics) | ❌ No                  | No biometric categorization                              |
| Facial recognition databases                         | ❌ No                  | No facial recognition                                    |
| Predictive policing (individual)                     | ❌ No                  | Not law enforcement                                      |

**Assessment:** The system does not fall under prohibited AI systems. However, the "exploitation of vulnerabilities" provision requires careful attention given the child user context.

**Safeguards in place:**

- System designed to benefit children (sport/health)
- Parents (adults) are primary users and decision makers
- No manipulation techniques employed
- Transparent reasoning provided
- Human review mechanism available

### 2.2 High-Risk AI Systems (Art. 6) - Assessment

High-risk AI systems are defined in Annex III. Relevant categories:

| Annex III Category                    | Applicable? | Reasoning                                  |
| ------------------------------------- | ----------- | ------------------------------------------ |
| (1) Biometrics                        | ❌ No       | No biometric processing                    |
| (2) Critical infrastructure           | ❌ No       | Not critical infrastructure                |
| (3) Education and vocational training | ⚠️ Possibly | Could be interpreted as education-adjacent |
| (4) Employment                        | ❌ No       | Not employment-related                     |
| (5) Essential services (public)       | ❌ No       | Not essential public service               |
| (6) Law enforcement                   | ❌ No       | Not law enforcement                        |
| (7) Migration/border                  | ❌ No       | Not migration-related                      |
| (8) Justice/democratic processes      | ❌ No       | Not justice-related                        |

**Category 3 Analysis (Education):**

Art. 6(3) Annex III point 3 covers AI systems intended to be used:

- (a) To determine access to educational institutions
- (b) To assess students in educational institutions
- (c) To assess appropriate level of education
- (d) To monitor prohibited behavior during tests

**Assessment:** Yuvoo AI Coach does **NOT** fall under this category because:

1. It recommends leisure activities, not formal education
2. It does not determine access to educational institutions
3. It does not assess students academically
4. Sports clubs are not "educational and vocational training institutions" under the Act
5. Parents retain full decision-making authority

### 2.3 Limited Risk Assessment (Art. 50)

Systems not classified as high-risk but interacting with natural persons have transparency obligations.

| Transparency Obligation        | Applicable? | Implementation                                         |
| ------------------------------ | ----------- | ------------------------------------------------------ |
| Inform users of AI interaction | ✅ Yes      | Clear disclosure that recommendations are AI-generated |
| Disclose AI-generated content  | ✅ Yes      | Recommendations labeled as AI output                   |
| Emotion recognition disclosure | ❌ No       | No emotion recognition                                 |
| Deep fake disclosure           | ❌ No       | No synthetic media                                     |

### 2.4 Classification Determination

**Primary Classification:** LIMITED RISK AI SYSTEM

**Reasoning:**

1. Does not meet prohibited AI criteria
2. Does not meet high-risk Annex III criteria
3. Interacts with natural persons → transparency obligations apply
4. Advisory system with human decision-maker → lower risk profile

**Confidence Level:** MEDIUM - Pending final implementing acts and guidance

---

## 3. Compliance Obligations

### 3.1 Transparency Requirements (Art. 50)

| Requirement                     | Implementation Status                            |
| ------------------------------- | ------------------------------------------------ |
| Inform users of AI interaction  | ✅ Implemented - Clear labeling on quiz results  |
| Explain AI recommendation basis | ✅ Implemented - Transparency section in results |
| Disclose limitations            | ✅ Implemented - Medical disclaimer              |
| Human review availability       | ✅ Implemented - Art. 22 mechanism               |

### 3.2 Voluntary Best Practices

Although not required for limited-risk systems, Yuvoo implements additional safeguards:

| Practice                        | Status                              |
| ------------------------------- | ----------------------------------- |
| Algorithmic fairness monitoring | 🔄 Planned                          |
| Bias testing                    | 📋 Planned                          |
| Regular accuracy assessment     | 📋 Planned                          |
| User feedback mechanism         | ✅ Implemented                      |
| Clear opt-out mechanism         | ✅ Implemented (consent withdrawal) |

### 3.3 Documentation Maintained

| Document                | Purpose                    | Status         |
| ----------------------- | -------------------------- | -------------- |
| This memo               | Classification analysis    | ✅ Complete    |
| DPIA                    | Data protection assessment | ✅ Complete    |
| Technical documentation | System description         | 📋 In progress |
| Risk assessment         | Safety analysis            | ✅ In DPIA     |

---

## 4. Risk Factors and Monitoring

### 4.1 Factors Supporting Limited Risk Classification

1. **Advisory nature:** Recommendations are informational, not binding
2. **Human oversight:** Parents make final decisions
3. **Reversibility:** No permanent consequences from recommendations
4. **Domain:** Leisure activities, not education/employment/credit
5. **Transparency:** Clear disclosure of AI involvement
6. **Safeguards:** Health warnings, medical disclaimers

### 4.2 Factors Requiring Monitoring

1. **Child involvement:** Vulnerable population requires vigilance
2. **Health data processing:** Sensitive data increases responsibility
3. **Potential for harm:** Incorrect recommendation could theoretically cause physical harm
4. **Evolving guidance:** EC interpretations may change

### 4.3 Scenarios Requiring Reclassification

The system would need reclassification review if:

| Scenario                                               | Potential Impact              |
| ------------------------------------------------------ | ----------------------------- |
| EC guidance interprets sports as "education"           | Could become high-risk        |
| System used by schools for PE recommendations          | Could become high-risk        |
| System makes binding decisions (not advisory)          | Could become high-risk        |
| System directly interfaces with children (not parents) | Increased risk level          |
| Health recommendations become more specific            | Medical device considerations |

---

## 5. Compliance Roadmap

### 5.1 Timeline

| Date       | Milestone                         | Action Required                           |
| ---------- | --------------------------------- | ----------------------------------------- |
| 2026-02-02 | Prohibited AI provisions in force | ✅ Compliance verified                    |
| 2026-Q1    | Current                           | Classification memo complete              |
| 2026-Q2    | Pre-enforcement preparation       | Monitor EC guidance, update documentation |
| 2026-08-02 | High-risk provisions apply        | Final classification verification         |
| 2027-08-02 | Full applicability                | Full compliance verification              |

### 5.2 Action Items

| Priority | Action                                      | Owner       | Due Date |
| -------- | ------------------------------------------- | ----------- | -------- |
| HIGH     | Monitor EC AI Act guidance                  | Legal       | Ongoing  |
| HIGH     | Verify classification at high-risk deadline | Legal       | 2026-07  |
| MEDIUM   | Implement algorithmic fairness monitoring   | Development | 2026-Q2  |
| MEDIUM   | Create technical documentation              | Development | 2026-Q2  |
| LOW      | Consider voluntary AI Act compliance mark   | Business    | 2026-Q4  |

### 5.3 Monitoring Plan

**Quarterly Reviews:**

- Monitor European Commission publications
- Review AI Office guidance
- Check for relevant case law or decisions
- Assess any system changes against classification

**Annual Review:**

- Full classification reassessment
- Update this memo
- Review compliance measures

---

## 6. Alternative Interpretations

### 6.1 Conservative Interpretation (Higher Risk)

If the system were classified as high-risk (under education category):

**Additional obligations would include:**

- Quality management system
- Technical documentation (detailed)
- Data governance requirements
- Human oversight measures (formal)
- Accuracy, robustness, cybersecurity standards
- Conformity assessment
- CE marking
- EU database registration

**Current gap assessment:**

- Most safeguards already in place via GDPR compliance
- Would need formal technical documentation
- Would need conformity assessment process
- Would need EU database registration

**Estimated effort if reclassified:** 40-80 hours additional work

### 6.2 Prepared Contingency

If EC guidance indicates higher classification:

1. Accelerate technical documentation
2. Engage conformity assessment body
3. Implement any missing high-risk requirements
4. Register in EU database

---

## 7. Conclusion

Based on current analysis of the EU AI Act and available guidance, Yuvoo's AI Coach system is classified as a **LIMITED RISK** AI system with transparency obligations.

**Key conclusions:**

1. System is NOT prohibited under Article 5
2. System does NOT meet high-risk criteria in Annex III
3. Transparency obligations under Article 50 apply and are implemented
4. Classification should be monitored as EC guidance develops
5. Voluntary best practices recommended for child-related AI

**Recommended actions:**

1. Continue monitoring EC and AI Office guidance
2. Maintain current transparency measures
3. Implement planned fairness monitoring
4. Review classification before August 2026
5. Document any system changes that could affect classification

---

## Appendices

### Appendix A: Reference Materials

1. Regulation (EU) 2024/1689 (EU AI Act)
2. European Commission AI Act FAQ
3. AI Office publications
4. EDPB-EDPS AI Guidelines (pending)

### Appendix B: Revision History

| Version | Date       | Author           | Changes                     |
| ------- | ---------- | ---------------- | --------------------------- |
| 1.0     | 2026-02-05 | Development Team | Initial classification memo |

---

_This memo represents a preliminary classification analysis based on available information as of the document date. Final classification may be affected by European Commission implementing acts and guidance. Legal review is recommended before relying on this analysis._

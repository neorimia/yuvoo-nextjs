# Comprehensive Legal Analysis: Yuvoo Platform (Romania & EU)

**Document type:** Legal due diligence for digital health / children's data platform  
**Scope:** GDPR, Romanian law, EU AI Act, medical/health regulation, third-party compliance  
**Date:** February 2025  
**Status:** Pre-launch MVP (target March 2025); Romania → CEE → EU

---

## Part 1 — Executive Summary

### 1.1 Is This Business Model Legal in Romania/EU?

**Short answer: Yes, subject to strict compliance.** The business model—collecting child data from parents, processing health-related information via AI for sport recommendations, and connecting parents with clubs and pediatric specialists—is not prohibited under GDPR or Romanian law. It is, however, **high‑risk** from a data protection and regulatory standpoint because it involves:

- **Children’s personal data** (Art. 8 GDPR; enhanced protection)
- **Special category data (health)** (Art. 9 GDPR)
- **Automated decision-making / profiling** (Art. 22 GDPR)
- **Cross-border transfers** (e.g. OpenAI in the US)
- **Potential overlap with health/medical regulation** (EU MDR, national rules)

Lawfulness depends on: (1) a correct **legal basis** under Art. 6 and, for health data, an **Art. 9(2) exception**; (2) **parental consent** where the child is under the relevant age; (3) **transparency, purpose limitation, and data minimization**; (4) **appropriate technical and organisational measures**; and (5) handling of **AI and automated decisions** in line with GDPR and the EU AI Act.

### 1.2 Top 3 Legal Risks (by Severity)

| #   | Risk                                                                                         | Severity     | Why                                                                                                                                                                                                                                                                                              |
| --- | -------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Processing child health data without a valid Art. 9 exception or with inadequate consent** | **Critical** | Health data is prohibited unless an Art. 9(2) exception applies. Relying only on “parental consent” without explicit consent for health, or mixing consent with contract/legitimate interest incorrectly, can lead to unlawful processing and sanctions (up to €20M or 4% global turnover).      |
| 2   | **Cross-border transfer of child health data to OpenAI (US) without adequate safeguards**    | **High**     | Post‑Schrems II, transfers to the US require a valid transfer tool (e.g. SCCs) **and** a case‑by‑case assessment of US law. If the DPA or supplementary measures are insufficient, transfers are unlawful. ANSPDCP can prohibit processing and impose fines.                                     |
| 3   | **AI system classified as high‑risk under EU AI Act or as a medical device under MDR**       | **High**     | If “health risk detection” is seen as medical diagnosis or as high‑risk AI (Annex III), you face additional obligations (risk management, human oversight, conformity) or medical device rules (CE marking, clinical evaluation). Misclassification increases regulatory and liability exposure. |

### 1.3 High-Level Compliance Roadmap

1. **Before launch (must-have)**
   - Identify and document **legal basis (Art. 6)** and **Art. 9(2) exception** for all processing of child and health data.
   - Implement **explicit consent** for health data and parental consent for children; keep **records of consent**.
   - Complete a **DPIA** (mandatory: children + health + automated decisions).
   - Update **Privacy Policy** (Art. 13/14): purposes, legal basis, health data, AI, transfers, rights including Art. 22.
   - Put in place **DPAs** with all processors (OpenAI, Neon, Cloudinary, Brevo, etc.) and **transfer mechanisms** (SCCs + TIA for US).
   - Define **data retention** and **erasure** procedures; implement **right to withdraw consent** and access/rectification/erasure/portability.
   - Clarify **controller/processor** roles (e.g. clubs, doctors) and contracts/notices accordingly.

2. **Post-launch (ongoing)**
   - Maintain records of processing (Art. 30), consent, and breaches.
   - Monitor **EU AI Act** and **MDR** applicability; adjust compliance when high‑risk or medical device rules apply.
   - Re-run **DPIA** when changing data, purposes, or AI.
   - Train staff; review subprocessors and transfer risks periodically.

3. **When scaling**
   - Appoint a **DPO** if core activities involve large‑scale systematic monitoring or large‑scale special‑category data (Art. 37).
   - Consider **ISO 27001 / 27701** and external audits for trust and commercial contracts.

---

## Part 2 — Detailed Legal Analysis

### 2.1 GDPR Compliance Framework

#### A. Legal Basis for Processing (Art. 6)

- **Art. 6(1)(a) Consent**  
  Appropriate where parents voluntarily provide their own and their child’s data for the service (e.g. quiz, recommendations). Consent must be **specific, informed, unambiguous**, and documented. For **health data**, Art. 9(2)(a) “explicit consent” is typically the most straightforward exception when there is no contract with a health professional (see below).

- **Art. 6(1)(b) Contract**  
  Applicable to processing **necessary** to perform the contract with the parent (e.g. account, storing quiz results, delivering recommendations). It does **not** by itself justify processing **special category data**; you still need an Art. 9(2) exception for health data.

- **Art. 6(1)(f) Legitimate interests**  
  Can support non-intrusive processing (e.g. security, fraud prevention, analytics in anonymised form) **provided** the child’s interests and fundamental rights do not override your interests. For **children’s data**, the ICO and EDPB stress that legitimate interest is harder to rely on and consent or contract are often more appropriate. **Do not** use legitimate interest as the sole basis for processing children’s health data for the core recommendation service.

- **Conclusion:** Use **consent (Art. 6(1)(a))** for the child-related and health-related parts of the quiz and recommendations, and **contract (Art. 6(1)(b))** for account and service delivery. Document this in the Privacy Policy and Records of Processing.

#### B. Age of Consent & Parental Authority (Art. 8)

- **Art. 8** applies when the service is offered **directly to the child** (information society services). It does **not** prescribe the age of consent for “data about children collected **from** parents.” When **parents** are the users and they provide data about their children, the child is not “offered” the service; the parent is. Therefore **Art. 8’s 16 (or 13–16) rule does not directly apply** to your core flow. You still need a **lawful basis** for processing the child’s data (e.g. consent **of the parent** as holder of parental responsibility).

- **Romania:** Law 190/2018 implements the GDPR. Member States may set the age under Art. 8(1) between 13 and 16. For Romania, the **age below which parental consent is required for ISS offered to the child** is typically **16** unless a lower age has been expressly set (check ANSPDCP/legislation for the latest). For **your** scenario (parents as users), the main point is that the **parent** must have authority to give consent for the child’s data; you should make “reasonable efforts” to verify that the person giving consent is the holder of parental responsibility (Art. 8(2)).

- **13–14 year olds:** If the child also uses the platform (e.g. logs in, sees recommendations), then Art. 8 may apply for that part. Even if only parents use it, good practice is to reflect the child’s best interests and, where feasible, consider assent/awareness for older minors (e.g. 13–14) in your UX and policies, without making it a legal requirement in the “parent-only” flow.

- **Legal distinction:**
  - “Data about children **from** parents”: Parent is data subject for their own data; child is data subject for the child’s data. Lawful basis for the **child’s** data can be consent given by the parent (as responsible for the child).
  - “Data collected **from** children”: Art. 8 applies; consent of the child (if ≥16 or national age) or of the holder of parental responsibility is required.

#### C. Special Category Data — Health (Art. 9)

- **Art. 9(1)** prohibits processing of health data unless one of the exceptions in **Art. 9(2)** applies.

- **Art. 9(2)(a) Explicit consent**  
  Most aligned with your model: the parent gives **explicit** consent for processing the child’s health data for specified purposes (sport recommendations, health risk flags, optional referral suggestions). “Explicit” means a clear, affirmative act (e.g. separate tick-box, clear wording that health data is processed). It must be **documented** (who, when, what was shown, version of policy). Withdrawal must be as easy as giving consent.

- **Art. 9(2)(h) Medical diagnosis / health or social care**  
  Allows processing necessary for medical diagnosis, provision of health or social care, or management of health/social care systems, under Union or Member State law or a contract with a health professional, and in line with Art. 9(3). This is for **healthcare** actors and **medical** purposes. Yuvoo’s AI does not provide diagnosis or treatment; it recommends sports and may “suggest seeing a specialist.” That is **not** the same as providing healthcare. **Relying on (h)** would require a clear legal basis or contract with a health professional and is **not** recommended as the primary basis for your core processing.

- **Art. 9(2)(i) Public health**  
  For public health interests (e.g. epidemics, public health monitoring). Not applicable to a commercial recommendation service.

- **Conclusion:** Use **Art. 9(2)(a) explicit consent** for processing health data (including conditions, injuries, psychological/behavioural traits used for recommendations and risk flags). Ensure **granular** consent (e.g. separate for “use for recommendations” vs “use for health risk flags” vs “share with clubs/doctors”) and **records**.

- **AI and “medical diagnosis”:** AI that only suggests “consult a doctor” or “possible risk” is **not** medical diagnosis. If you framed the system as performing diagnosis or treatment, you would face MDR and professional regulation. Keep positioning and disclaimers clear: “informational only; not a substitute for medical advice.”

#### D. Data Minimization & Purpose Limitation

- **Minimization:** Collect only what is **necessary** for each purpose. Physical characteristics, health conditions, past injuries, and preferences are **arguably necessary** for safe, tailored sport recommendations. **Psychological/behavioural data** (shyness, anxiety, response to failure) can be justified if they directly influence recommendation quality (e.g. team vs individual sports) and are explained in the Privacy Policy. Avoid collecting such data “for future use” or for secondary purposes without a clear justification.

- **Purpose limitation:** Use data only for the stated purposes. If you want to use quiz data for **anonymised research** or **improving AI models**, say so in the policy and, where it involves personal data, base it on consent or a compatible purpose (with safeguards). **Secondary use** (e.g. marketing) must have its own lawful basis and be clearly separated (e.g. optional consent).

#### E. Transparency & Information (Art. 13/14) and Automated Decisions (Art. 22)

- **Art. 13/14:** Privacy Policy must state: controller identity; purposes; legal basis; categories of data; recipients; transfers (and safeguards); retention; rights (access, rectification, erasure, restriction, portability, objection, complaint); whether provision is mandatory and consequences of not providing; and, if applicable, **automated decision-making**, including profiling, and meaningful information about the logic and consequences (Art. 13(2)(f), 14(2)(g)).

- **Language:** Policy is for the **parent** (user). It does not have to be “child-friendly” by law, but it must be **clear and plain**. For any part directed at children, use simple language.

- **AI transparency:** You must explain in broad terms that recommendations and risk flags are produced by automated processing, what kind of data is used, and what the likely consequences are (e.g. “sport fit score,” “suggestion to consult a specialist”). You do **not** have to disclose the exact algorithm, but the explanation must be **meaningful** (EDPB/CJEU).

- **Art. 22:** Data subjects have the right **not** to be subject to decisions based **solely** on automated processing (including profiling) that produce **legal effects** or **similarly significantly affect** them. Sport recommendations and “consult a specialist” suggestions can be argued to “significantly affect” the child/parent. To comply:
  - Provide **human intervention** (e.g. support channel to discuss or override);
  - Allow **expression of point of view** and **contestation**;
  - Give an **explanation** of the decision (in line with transparency above).  
    If you rely on **explicit consent** as the exception under Art. 22(2)(c), you must still implement these safeguards.

#### F. Data Subject Rights

- **Access (Art. 15):** Parents, as exercising rights on behalf of the child, can request confirmation and a copy of the child’s data. Provide it in a concise, transparent form (and machine-readable if requested with portability).

- **Erasure (Art. 17):** Upon request, you must erase the child’s data unless an exception applies (e.g. legal obligation). You **cannot** retain identifiable child data for “historical recommendations to other users” once the data subject requests erasure. Anonymised/aggregated data that no longer relates to an identified child may be retained if lawful.

- **Portability (Art. 20):** Where processing is by automated means and based on consent or contract, provide the child’s data in a structured, commonly used, machine-readable format (e.g. JSON).

- **Rectification (Art. 16):** If a parent or doctor disputes parent-reported health data, correct it upon verification. Document the source of corrections (e.g. medical report) where relevant.

#### G. Cross-Border Transfers

- **OpenAI (US):** Data sent via API is a **transfer** under Chapter V GDPR. You need a transfer mechanism: **SCCs** (Commission-approved) and, post‑Schrems II, a **transfer impact assessment (TIA)** to check whether US law (e.g. FISA) allows access that undermines GDPR. If it does, you need **supplementary measures** (e.g. encryption, contract clauses on government access, or processing in EU if OpenAI offers it). OpenAI’s **DPA** (and Enterprise options) should be reviewed for: processor commitments, subprocessor list, SCCs, and prohibition on using data for training. **Must:** Ensure the DPA prohibits use of your data for model training and that SCCs are incorporated; verify data residency/processing location.

- **Neon, Cloudinary, Brevo:** Use DPAs and SCCs where they act as processors and data is transferred outside the EEA. Prefer **EU data residency** for child health data where commercially feasible to reduce transfer risk.

---

### 2.2 Romanian-Specific Regulations

#### A. National GDPR Implementation (Law 190/2018)

- Law 190/2018 implements the GDPR in Romania. It does not lower the Art. 8 age for ISS; it aligns with GDPR. **ANSPDCP** (Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal) is the supervisory authority. Check ANSPDCP website and guidance for: children’s data, health data, and any sector-specific recommendations. There are no specific “children’s sports platform” rules; general GDPR + national rules apply.

#### B. Medical Data & eHealth

- Processing health data for **sport recommendations** and “wellness” advice does **not** by itself require a medical or eHealth licence, **provided** you do not perform diagnosis, treatment, or regulated medical activities. **AI health risk flags** (“consider consulting a specialist”) are informational; framing them clearly as such reduces the risk of being classified as a medical device or medical practice. If the AI were to “diagnose” or “treat,” Romanian healthcare and MDR could apply. **Liability:** Use clear disclaimers (“not medical advice”; “always consult a healthcare professional for medical decisions”) and ensure recommendations are based on stated, non-diagnostic purposes.

#### C. Parental Authority & Consent (Romanian Civil Code)

- Parental responsibility is shared by both parents unless a court decides otherwise. For **data protection**, the consent of **one** holder of parental responsibility is generally sufficient unless national law requires both (Romanian law does not impose a dual-consent rule for GDPR consent). In **divorce/custody** cases, the parent with custody (or both, if joint) can give consent; avoid taking sides in disputes—rely on the consent given and, if in doubt, seek legal advice.

#### D. Child Protection

- Romanian Law 272/2004 (protection of the child) and related provisions protect the child’s best interests. There is no specific “children’s online safety” law beyond GDPR and general child protection. If your platform **detects** signs of serious health risk or possible abuse, consider whether you have a **ethical/legal duty to inform** (e.g. parent, or in extreme cases authorities). This is a sensitive area; document internal policy and consider legal advice.

---

### 2.3 AI-Specific Legal Considerations (EU AI Act — Regulation 2024/1689)

#### A. Classification

- **Annex III** lists high‑risk AI systems (e.g. certain health, safety, education, essential services). **Your** system: recommends sports and may flag “consult a specialist.” It is **not** clearly listed in Annex III as such (e.g. “AI for eligibility to healthcare benefits” is different). **Risk:** If a national authority or the Commission interprets “health” AI broadly, some functions could be argued to fall under Annex III. **Mitigation:** Maintain a short **AI use memo**: purpose (recommendation, not diagnosis), no legal or similarly significant decision alone, human in the loop; and monitor guidance and delegated acts.

- **Prohibited practices (Art. 5):** Do not use AI to **exploit** vulnerabilities due to age in a way that materially distorts behavior and causes significant harm. Do not deploy **subliminal or deceptive** techniques. Avoid **social scoring** that leads to detrimental treatment. Profiling children for **beneficial** sport matching, with parental consent and transparency, is not the same as prohibited exploitation; keep purposes and UX fair and transparent.

#### B. Algorithmic Transparency & Bias

- Under GDPR you must give **meaningful** information about the logic and consequences of automated decisions. You do **not** have to reveal the full algorithm. Ensure that **bias** (e.g. gender stereotypes in sport recommendations) is mitigated to the extent possible and that your policy commits to fairness and non-discrimination.

#### C. Liability & Disclaimers

- **Product Liability Directive / AI liability:** If AI output caused harm (e.g. recommending unsuitable activity), liability could be argued under product liability or negligence. **Mitigation:** Clear disclaimers (“recommendations are indicative; not a substitute for professional advice”); human oversight (e.g. “consult a doctor if you have health concerns”); and appropriate insurance (see below).

---

### 2.4 Medical & Health Regulatory Issues

#### A. Medical Device (EU MDR 2017/745)

- Software intended for **diagnosis, prevention, monitoring, treatment** of diseases or injuries can be a **medical device**. Software for **general wellness** or **lifestyle** (e.g. “sport suggestions”) without a medical purpose is **not** (see MDCG guidance). Your “health risk flag” that suggests seeing a doctor is **informational**, not diagnosis. To stay clearly outside MDR: (1) do not claim to diagnose or treat; (2) state that the tool is for information only; (3) document the intended use in internal docs.

#### B. Telemedicine & Referrals

- **Suggesting “consult a specialist”** is not practising medicine. **Facilitating** bookings with doctors (like Doctolib) is generally not telemedicine; the doctor provides the service. Ensure you do not give **clinical** advice; referrals are “suggestions” only. Liability for the **quality** of the specialist (e.g. negligence) rests with the doctor/clinic; your Terms should state that Yuvoo does not provide medical services and is not liable for third-party care.

#### C. Health Data Interoperability

- If you later integrate with clinic/doctor systems (EHR, etc.), Romanian/eHealth and EU standards (e.g. HL7 FHIR, eIDAS where applicable) may apply. For MVP, not mandatory; plan for interoperability when you add such features.

---

### 2.5 Third-Party & Vendor Compliance

#### A. Sports Clubs

- Clubs that **receive** parent/child data from you for **their** own purposes (e.g. managing trials, membership) are likely **independent controllers**. They need their own lawful basis and privacy notice. You should have a **controller–controller** arrangement (e.g. terms + data sharing notice) and only share data that the parent has consented to share with clubs. If a club processes **on your instructions only**, it could be a processor (then you need a DPA). In practice, clubs will usually be **controllers** for their own use of the data you pass to them.

#### B. OpenAI

- Treat as **processor**; DPA must include: processing only on documented instructions, confidentiality, security, subprocessors, return/deletion of data, assistance with Art. 32–36. **Training:** Contract must **prohibit** use of customer data (especially child health data) for model training. Confirm data location and SCCs; run a TIA for US transfers.

#### C. Cloud (Neon, Cloudinary, etc.)

- DPAs and, where relevant, SCCs. Prefer **EU** hosting for personal/health data to minimise transfer issues.

---

### 2.6 Consent Mechanisms & UX

- **Freely given:** Do not bundle consent with access to the service for **optional** processing (e.g. marketing). Core service (recommendations) can require consent for necessary processing (child + health data).
- **Specific & informed:** Separate tick-boxes or toggles per purpose. Link to the Privacy Policy at the point of consent.

**Required vs optional (practical breakdown):**

| Purpose                                            | Required or optional?                   | Reason                                                                                             |
| -------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Use my child’s data for AI sport recommendations   | **Required** (for core service)         | Without it you cannot deliver the product; consent is the appropriate basis.                       |
| Use health data for recommendations and risk flags | **Required** (for safe recommendations) | Health data is special category; explicit consent needed; core to the value proposition.           |
| Share my child’s profile with clubs I contact      | **Required** (for club matching)        | Necessary to connect parent with clubs; can be one consent “share with clubs when I contact them.” |
| Allow AI to suggest specialist consultations       | **Optional**                            | Enhances service but not strictly necessary; must be separate and optional to avoid “bundling.”    |
| Send educational content / marketing               | **Optional**                            | Marketing requires separate, optional consent; cannot be a condition for the service.              |

- **Unambiguous:** No pre-ticked boxes for consent; clear affirmative action.
- **Withdrawal:** One-click or simple process; same channel as consent where possible. After withdrawal, stop processing and delete where appropriate (subject to retention for legal/claims).
- **Records:** Log who consented, when, for what, and which policy version (at least 6 years is often used for accountability).

---

### 2.7 Security & Data Breach

- **Art. 32:** Appropriate technical and organisational measures: encryption (in transit and at rest), access controls, pseudonymisation where useful, ability to restore availability, regular testing. For **child health data**, apply **high** standards; limit access to need-to-know.
- **Breach (Art. 33–34):** Notify ANSPDCP **within 72 hours** where the breach is likely to pose a risk. If high risk to individuals, **notify data subjects** (parents) without undue delay, in clear language. For children’s health data, assume **high risk** unless a quick assessment shows otherwise.
- **DPIA:** **Mandatory** (Art. 35(3)) when there is large-scale processing of special category data, systematic monitoring, or automated decision-making with significant effects. Your platform fits; **conduct a DPIA before launch** and update it when processing changes.

---

### 2.8 Intellectual Property & Data Ownership

- **Data ownership:** Under GDPR, the **data subject** (here, the child, represented by the parent) has **rights** over the data; there is no “ownership” in the sense of property. Parents exercise rights on behalf of the child. You cannot “own” the child’s data; you process it under lawful basis and must delete/return when required.
- **After account deletion:** Erase or anonymise personal data; you may retain **aggregated/anonymised** statistics if they no longer relate to an identified child and are lawful.
- **AI-generated recommendations:** The **content** (e.g. “sport X recommended”) can be subject to your IP (e.g. copyright in the output); the **underlying personal data** remains subject to data subject rights. Using **anonymised** “children like yours” insights in the product should be disclosed in the policy and, if it involves personal data at any stage, covered by lawful basis and minimisation.

---

### 2.9 Contractual & Commercial

- **Terms of Service:** Include: description of service; acceptance; account/registration; payment (if any); **limitation of liability** (to the extent permitted under Romanian/EU consumer law—cannot exclude liability for death/personal injury or fraud); **disclaimers** (no medical advice; third-party services); governing law (Romanian) and courts (Romania for consumers in Romania).
- **Insurance:** **Professional indemnity** for advice/recommendation liability (e.g. €1–2M for MVP; increase with revenue and geographic scope); **cyber** for data breaches, regulatory defence, and notification costs (e.g. €500k–1M). Check partner and enterprise contract requirements for minimum limits.

---

### 2.10 Competitive & Best Practice Benchmarking

- **Doctolib (EU):** Acts as **processor** for health data on behalf of doctors; controllers (doctors) are responsible for legal basis and patient information. Doctolib has a Processor Agreement and privacy policy; they were fined by competition authority (not GDPR) in France. **Takeaway:** Clear controller/processor split and strong DPAs; health data handled only on behalf of controllers.
- **Toddl (Spain):** Kids activity marketplace; typically parental consent, age gates, and short retention for children’s data. **Takeaway:** Consent flows and “for parents only” positioning reduce Art. 8 ambiguity; similar “parent as user” model.
- **KiddoDoo / Minisport:** Child development/sports apps often rely on parental consent, clear purposes, and minimal health data. **Takeaway:** Keep health data to what is strictly necessary; avoid “research” or secondary use without separate consent.
- **AI Sport Scout–style:** AI sport recommendations; transparency about algorithm (high-level logic, not full code) and human override. **Takeaway:** Explain that recommendations are indicative; offer human review/contestation (Art. 22).
- **Industry standards:** **ISO 27001** (security) and **ISO 27701** (privacy) are respected by enterprises and can support sales and partner requirements as you scale. Sector-specific certifications for children’s platforms are not yet widespread; ICO Age-appropriate Design Code (UK) and similar “children’s code” principles are useful references.

---

## Part 3 — Compliance Checklist (1 Page)

### Before Launch (Must-Haves)

- [ ] **Legal basis & Art. 9:** Document Art. 6 and Art. 9(2)(a) for all processing of child and health data; state in Privacy Policy.
- [ ] **Consent:** Implement explicit consent for health data and parental consent for child data; no pre-ticked boxes; separate purposes (recommendations, risk flags, sharing with clubs/doctors, marketing).
- [ ] **Consent records:** Log consent (who, when, what, policy version); retain for accountability (e.g. 6 years).
- [ ] **DPIA:** Complete DPIA (children + health + automated decisions); implement mitigations; review when processing changes.
- [ ] **Privacy Policy:** Update with purposes, legal basis, health data, AI/automated decisions, transfers (SCCs/OpenAI), retention, rights (including Art. 22), and contact (DPO if designated).
- [ ] **DPAs:** Signed DPAs with OpenAI, Neon, Cloudinary, Brevo, and any other processors; SCCs and (for US) TIA/supplementary measures.
- [ ] **OpenAI:** Confirm no use of your data for training; data processing location and SCCs.
- [ ] **Rights:** Procedures and UX for access, rectification, erasure, portability, withdrawal of consent, and objection; human intervention for automated decisions.
- [ ] **Controller/processor:** Identify clubs/doctors as controllers or processors; have contracts/notices and only share data per consent.
- [ ] **Security:** Encryption, access controls, and secure development; limit access to child health data.
- [ ] **Breach:** Internal process for detection, 72h notification to ANSPDCP, and notification to individuals when high risk.
- [ ] **Disclaimers:** “Not medical advice”; “consult a healthcare professional”; “recommendations are indicative.”

### Post-Launch (Ongoing)

- [ ] **Art. 30:** Keep Records of Processing up to date.
- [ ] **Consent & breaches:** Maintain consent and breach registers.
- [ ] **DPIA:** Re-run when you add data, purposes, or change AI.
- [ ] **Subprocessors & transfers:** Review periodically; update TIAs and contracts as needed.
- [ ] **AI Act / MDR:** Monitor applicability; implement high-risk/medical device obligations if triggered.

### Nice-to-Haves

- [ ] **DPO:** Designate if core activities involve large-scale systematic monitoring or large-scale special-category data (Art. 37).
- [ ] **ISO 27001 / 27701:** When scaling or required by partners.
- [ ] **External audit:** For enterprise or high-risk segments.

---

## Part 4 — Template Recommendations

### Privacy Policy — Key Sections for This Use Case

1. **Data controller** (Yuvoo / Neorimia SRL), contact and DPO (if any).
2. **Purposes:** Sport recommendations, health risk indications, matching with clubs/doctors, account, payments, support, (optional) marketing.
3. **Legal basis:** Contract for account/service; **explicit consent** for child data and health data (recommendations, risk flags, sharing with clubs/doctors); legitimate interest only where clearly stated (e.g. security).
4. **Categories of data:** Identity/contact (parent); child (name, age, gender, physical, health, injuries, psychological/behavioural, preferences, schedule, budget); technical/logs.
5. **Recipients:** Processors (OpenAI, Neon, Cloudinary, Brevo, etc.); clubs/doctors only when parent consents to share.
6. **Transfers:** Countries and safeguards (e.g. SCCs, TIA); mention US and OpenAI.
7. **Retention:** Per purpose (e.g. account 2 years after closure, quiz 3 years, or as stated).
8. **Rights:** Access, rectification, erasure, restriction, portability, objection, withdrawal of consent, complaint to ANSPDCP; **automated decisions:** right to human review, explanation, contestation.
9. **Obligation to provide data:** What is necessary for the service vs optional.
10. **Children:** Data about children provided by parent; parent confirms they have parental responsibility; no service directed at under-16s without parental consent.

### Consent Flow (UX + Legal)

- **Step 1:** Create account (parent).
- **Step 2:** Before adding child / starting quiz: short notice + “I have read the Privacy Policy” + link.
- **Step 3:** Per purpose (separate toggles/checkboxes, not pre-ticked):
  - “Use my child’s data for personalised sport recommendations (required for service).”
  - “Use health data to generate recommendations and possible risk alerts (required for safe recommendations).”
  - “Share my child’s profile with clubs I contact (required for club matching).”
  - “Allow Yuvoo to suggest specialist consultations based on health data (optional).”
  - “Send me news and tips about children’s sports and health (optional – marketing).”
- **Step 4:** “I confirm I am the parent/guardian with parental responsibility for this child.”
- **Withdrawal:** In account settings: “Withdraw consent” per purpose; confirm; then stop processing and delete where applicable.

### Data Processing Agreement (Processors)

- Subject matter and duration; nature and purpose of processing; types of personal data; categories of data subjects; obligations of processor (confidentiality, only on instructions, security, subprocessors, return/deletion, assistance with Art. 32–36, breach notification); audit; transfer mechanisms (SCCs); no use for own purposes (e.g. no training on customer data for OpenAI).

### DPIA Template (Child Health + AI)

- **Description of processing:** What data, from whom, for what, who has access, where stored, transfers.
- **Necessity and proportionality:** Why each category is needed; minimization.
- **Risks to rights:** Unauthorised access, misuse of health data, discrimination/bias, impact on child.
- **Mitigations:** Consent, encryption, access control, transparency, human review, retention limits, DPA and transfer safeguards.
- **Conclusion:** Residual risk acceptable with mitigations; review date.

---

## Part 5 — Risk Mitigation Strategies

| Risk                 | Mitigation 1                                                                                              | Mitigation 2                                                                                       | Mitigation 3                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Invalid Art. 9 basis | Use **explicit consent** (Art. 9(2)(a)) for all health data; separate consent per purpose; document.      | Privacy Policy and consent text reviewed by lawyer.                                                | Keep consent records (timestamp, version, scope).                                        |
| Unlawful US transfer | Use **SCCs** + **TIA**; implement **supplementary measures** (encryption, contract terms).                | Prefer **EU-resident** processing for sensitive data where possible (e.g. OpenAI EU if available). | In DPA, prohibit use of data for training; confirm no US storage if possible.            |
| High-risk AI / MDR   | **Position** as “informational / wellness,” not diagnosis or treatment.                                   | **Memo** on intended use and why not medical device / not high-risk AI; monitor guidance.          | Disclaimers and human-in-the-loop (e.g. “always consult a doctor for health decisions”). |
| Clubs as controllers | **Contract/notice** with clubs: they are independent controllers; they must have lawful basis and notice. | Only share data **with parent’s consent** for “share with clubs”; clear wording in consent.        | Short “data sharing notice” for parents when they choose to contact a club.              |
| Consent challenge    | **Granular** consent; **withdrawal** easy; **evidence** (logs).                                           | Annual or post-change review of consent flows and wording.                                         | DPO or external review when scaling.                                                     |

---

## Part 6 — When to Consult Specialists

- **Romanian privacy lawyer:** Before launch: legal basis and Art. 9, consent wording, Privacy Policy, controller/processor roles, and transfer strategy. For any ANSPDCP complaint or inquiry.
- **DPO:** **Mandatory** under Art. 37 if core activities consist of large-scale regular and systematic monitoring **or** large-scale processing of special category data. For a startup, “large scale” is a matter of interpretation; if in doubt, designate a DPO (internal or external) early—it is good practice and helps with accountability.
- **External GDPR/audit:** When scaling (e.g. CEE/EU expansion), before large B2B contracts, or after a serious breach or regulatory contact.
- **Medical/regulatory:** If you add features that could be seen as diagnosis, treatment, or medical devices; or if a competent authority suggests MDR/eHealth applies.
- **AI Act:** When the high-risk rules apply (e.g. August 2026) or if you expand functionality; consider a short legal memo on classification and obligations.

---

## Sources & References (Summary)

- **GDPR:** [gdpr-info.eu](https://gdpr-info.eu/) (Art. 6, 7, 8, 9, 13–14, 22, 28, 33–35, 37).
- **Romanian Law 190/2018:** National implementation of GDPR; ANSPDCP: [dataprotection.ro](https://www.dataprotection.ro/).
- **EU AI Act:** Regulation (EU) 2024/1689; Annex III; Art. 5; [euaiact.com](https://www.euaiact.com/); implementation timeline (e.g. Feb 2025, Aug 2025, Aug 2026).
- **EDPB:** Guidelines on consent (05/2020); topics on children.
- **ICO (UK):** Children’s data, consent, DPIA, automated decision-making (conceptually aligned with GDPR).
- **Schrems II / SCCs:** CJEU C-311/18; Commission implementing decisions on SCCs; EDPB recommendations on supplementary measures.
- **MDR / MDCG:** Regulation (EU) 2017/745; MDCG 2023-4 (software–hardware); “general wellness” vs medical purpose.

---

## Gray Areas & Ambiguous Positions

- **Art. 8 applicability:** When only parents use the service and provide child data, Art. 8 (child’s consent for ISS) does not clearly apply; interpretation is that the parent’s consent covers the child’s data. ANSPDCP has not published specific guidance on “parent-as-user” platforms; conservative approach is to obtain and document parental consent and to avoid offering the service “directly” to under-16s without it.
- **High-risk AI (Annex III):** Your use case (sport recommendations + “consult a specialist”) is not explicitly listed. Authorities could argue that “health” AI falls under Annex III in future; maintain a short classification memo and monitor guidance (e.g. 2026 implementation).
- **Medical device (MDR):** “Health risk detection” that only suggests seeing a doctor is informational; if wording or features edged toward “detection of disease” or “diagnosis,” MDR could be triggered. Keep positioning and disclaimers clear.
- **Clubs as controllers:** Clubs receiving data for their own purposes (trials, membership) are typically independent controllers; if a club acted only on your instructions, it could be a processor. Document your conclusion and ensure contracts/notices match.
- **Romanian age under Art. 8:** Member States may set 13–16 for ISS offered to the child; confirm Romania’s current threshold (e.g. ANSPDCP or Law 190/2018) for any flow where the child is the direct user.

_This document is for internal planning and is not legal advice. Engage qualified counsel (Romanian/EU data protection and, if needed, health/regulatory) before launch._

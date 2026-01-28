# Medical Safety – AI Coach Quiz

Documentație pentru mecanismele de siguranță medicală integrate în chestionarul AI Coach (copii 4–14 ani, România). Scopul este reducerea riscului și orientarea către evaluare medicală acolo unde este necesară.

---

## Prezentare generală

- **Screening în chestionar**: întrebări explicite pentru condiții critice (cardiac, concuzie) și condiții cu severitate (astm, dureri articulare, accidentări).
- **Excludere sporturi**: reguli programatice care exclud sporturi nepotrivite din recomandări în funcție de răspunsuri.
- **Detectare semnale de risc**: identificare programatică a nevoii de specialist (cardiolog, neurolog, ortoped, pneumolog, nutriționist, psiholog, general).
- **Reguli în promptul AI**: instrucțiuni explicite în system prompt pentru contraindicații absolute, severitate și vârste minime, în română.

Toate textele afișate utilizatorului sunt în **limba română**.

---

## 1. Screening medical în chestionar

### 1.1 Screening critic (Pasul 5 – Întrebare dedicată)

**Componentă**: `CriticalHealthScreeningQuestion.tsx`  
**Date**: `QuizAnswers.criticalHealth`

| Câmp                   | Tip     | Descriere                                                       |
| ---------------------- | ------- | --------------------------------------------------------------- |
| `cardiacSymptoms`      | boolean | Simptome cardiace la efort (dureri în piept, palpitații, leșin) |
| `cardiacFamilyHistory` | boolean | Istoric familial moarte cardiacă sub 50 ani                     |
| `recentConcussion`     | boolean | Concuzie în ultimele 3 luni                                     |
| `multipleConcussions`  | boolean | 2+ concuzii în ultimii 2 ani                                    |

- Dacă utilizatorul declară orice condiție critică, se afișează un **alert de avertizare** cu recomandarea de a consulta un specialist înainte de sporturi noi; utilizatorul poate continua chestionarul.

### 1.2 Severitate condiții (Pasul 6 – Sănătate și abilități fizice)

**Componentă**: `PhysicalQuestion.tsx`  
**Date**: `QuizAnswers` (câmpuri dedicate)

- **Astm**
  - `asthmaSeverity`: `"none"` \| `"mild"` \| `"moderate"` \| `"severe"`
  - Dacă nu e `"none"`: întrebare suplimentară **Folosește inhaler înainte de activități fizice?**
  - `inhalerUse`: `"yes"` \| `"no"` \| `"sometimes"`

- **Dureri articulare**
  - `jointPainSeverity`: `"none"` \| `"mild"` \| `"moderate"` \| `"severe"`

- **Alte condiții** (opțional): `healthConditions[]` – alergii severe, vedere, auz, accidentare recentă, condiție cronică, restricții recomandate de medic.
- **Detalii libere**: `physicalConsiderations` (text, opțional).

### 1.3 Detalii accidentare (Pasul 4 – Interese)

**Componentă**: `InterestsQuestion.tsx` (formular condiționat când „Accidentare” e selectat în „De ce a renunțat”)  
**Date**: `QuizAnswers.injuryDetails`

| Câmp           | Tip             | Descriere                                                      |
| -------------- | --------------- | -------------------------------------------------------------- |
| `type`         | enum            | fracture, growth-plate, dislocation, sprain, concussion, other |
| `when`         | enum            | &lt;1month, 1-3months, 3-6months, 6-12months, &gt;1year        |
| `healed`       | boolean \| null | Rezolvată complet (null = neclar)                              |
| `restrictions` | boolean         | Restricții medicale curente                                    |

---

## 2. Excludere sporturi

**Serviciu**: `sport-exclusion.service.ts`  
**Funcție principală**: `shouldExcludeSport(sportId, answers, riskSignals?)` → `{ exclude, reason, allowedWithModifications?, requiredSpecialist? }`

### 2.1 Categorii sporturi (exemple)

- **contact_sports**: fotbal, handbal, baschet, arte marțiale, judo, karate, taekwondo, polo
- **high_impact**: atletism, alergare, gimnastică, skateboarding, escaladă
- **endurance**: atletism, alergare, ciclism
- **low_impact**: înot, ciclism, golf, șah, tir cu arcul, tenis de masă etc.

### 2.2 Reguli de excludere (rezumat)

| Condiție                                           | Excludere                                                | Observații                                           |
| -------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------- |
| Simptome cardiace sau istoric familial cardiac     | Contact, high-impact, endurance                          | Doar low-impact cu modificări; recomandare cardiolog |
| Concuzie recentă sau multiple                      | Contact, high-impact                                     | Recomandare neurolog                                 |
| Accidentare placă de creștere recentă (&lt;6 luni) | High-impact, contact                                     | Recomandare ortoped                                  |
| Accidentare netratată + restricții                 | High-impact, contact; low-impact cu modificări           | Recomandare ortoped                                  |
| Astm sever                                         | Endurance, high-impact; low-impact cu modificări         | Recomandare pneumolog                                |
| Dureri articulare severe                           | High-impact, contact; low-impact cu modificări           | Recomandare ortoped                                  |
| Dureri articulare moderate                         | High-impact, contact (fără „allowed with modifications”) | Recomandare ortoped                                  |

Dacă toate recomandările (inclusiv fallback) sunt eliminate, se returnează o recomandare de siguranță (ex. Înot) cu mențiunea consultării medicale.

---

## 3. Detectare semnale de risc

**Serviciu**: `risk-signal-detection.service.ts`  
**Funcție**: `detectRiskSignals(answers)` → `{ signals, hasHighRisk, hasMediumRisk, hasLowRisk, recommendedSpecialist }`

### 3.1 Ordine și priorități

1. **Condiții critice** (cel mai prioritar): cardiac, concuzie
2. Ortoped
3. Nutriționist
4. Psiholog
5. Medic pediatru general

Specialist recomandat: se alege cel cu **severitate cea mai mare**, iar la egalitate ordinea de specialitate: cardiolog &gt; neurolog &gt; ortoped &gt; psiholog &gt; nutriționist &gt; general.

### 3.2 Tipuri de semnale

- **Cardiac**: din `criticalHealth` (simptome, istoric familial) și din cuvinte cheie în `physicalConsiderations` (ex. durere piept, palpitații, leșin, sincopă, cardiac, inimă, aritmie).
- **Concuzie**: din `criticalHealth` (recentă, multiple), din `injuryDetails` (tip concuzie + perioadă), din cuvinte cheie în `physicalConsiderations` (concuzie, traumatism cranian, amnezie, confuzie, dureri cap, vertij, sensibilitate lumină/sunet).
- **Ortoped**: coordonare „challenges”, dureri articulare (severitate moderate/severe), accidentări/placa de creștere, cuvinte cheie în `physicalConsiderations`.
- **Pneumolog**: astm sever/moderat (din `asthmaSeverity`).
- **Nutriționist / Psiholog / General**: conform logicii existente (greutate, personalitate, motive oprire sporturi, nivel energie scăzut etc.).

Conversia în recomandare de specialist pentru UI: `riskSignalsToSpecialistRecommendation(riskDetection)`.

---

## 4. Reguli în promptul AI

**Fișier**: `ai-recommendations.service.ts` – `SYSTEM_PROMPT`

### 4.1 Contraindicații absolute (bloc în prompt)

- Simptome cardiace la efort → nu recomanda sporturi competitive, de intensitate ridicată, de contact.
- Istoric familial moarte cardiacă sub 50 ani → nu recomanda sporturi competitive / intensitate ridicată.
- Concuzie recentă (&lt;3 luni) → nu recomanda sporturi de contact / cu risc de impact la cap.
- Concuzii multiple (2+ în 2 ani) → nu recomanda sporturi de contact; recomandă evaluare neurologică.
- Accidentare placă de creștere recentă → nu recomanda sporturi de impact/sărituri până la vindecare.

În aceste cazuri, AI trebuie să:  
(1) recomande consult specialist (cardiolog/neurolog/ortoped) înainte de orice sport;  
(2) dacă menționează sporturi de impact redus, să specifice că sunt potrivite **doar după evaluare medicală**;  
(3) să nu recomande sporturi de contact sau de intensitate ridicată.

### 4.2 Severitate condiții medicale

- **Ușoare/controlate**: majoritatea sporturilor potrivite, cu precauții minime.
- **Moderate**: sporturi potrivite cu precauții, evită sporturi de risc, asigură acces la medicație (ex. inhalator).
- **Severe/necontrolate**: evaluare medicală înainte de orice sport; sporturi de impact redus doar după evaluare.

Exemple în prompt: astm ușor vs. moderat vs. sever (inclusiv „evaluare pulmonară”, „sporturi de intensitate ridicată contraindicate până la control”).

### 4.3 Vârste minime (orientativ)

Promptul conține indicații pentru vârste minime competitive vs. recreative (ex. gimnastică, înot, fotbal, tenis, baschet, handbal, volei, atletism). Pentru copiii sub vârsta minimă competitivă, AI trebuie să recomande varianta **recreativă** și să menționeze trecerea la competitiv la vârsta corespunzătoare.

### 4.4 Date trimise către AI (user prompt)

- **Screening critic**: `criticalHealth` (cardiac, concuzie) – secțiune „SCREENING MEDICAL CRITIC”.
- **Condiții medicale**: astm (severitate + inhaler), dureri articulare (severitate), alte condiții, `physicalConsiderations`.
- **Accidentări**: `injuryDetails` (tip, când, vindecare, restricții).
- Vârstă, gen, energie, personalitate, interese, sporturi anterioare, motive oprire, constituție, coordonare, preferințe.

Astfel, AI dispune de toate informațiile necesare pentru a respecta regulile de siguranță și severitate.

---

## 5. Flux în aplicație

1. **Chestionar**: colectează screening critic (pas 5), severități și detalii accidentare (pași 4 și 6).
2. **Analiză**: `quiz.analyzer.ts` – apelează `detectRiskSignals(answers)`, apoi generare recomandări AI (cu cache).
3. **Filtrare**: fiecare sport recomandat de AI este verificat cu `shouldExcludeSport(sportId, answers, riskSignals)`; sporturile excluse sunt eliminate; cele „allowed with modifications” primesc considerații de avertizare.
4. **Fallback**: dacă toate sporturile sunt eliminate, se folosesc recomandări fallback (de asemenea filtrate); dacă și acestea sunt goale, se returnează o recomandare de siguranță (ex. Înot).
5. **Specialist**: recomandarea programatică (din `riskSignalsToSpecialistRecommendation`) are prioritate față de cea generată de AI.

---

## 6. Fișiere cheie

| Scop                  | Fișier                                                                       |
| --------------------- | ---------------------------------------------------------------------------- |
| Screening critic      | `src/components/features/quiz/questions/CriticalHealthScreeningQuestion.tsx` |
| Sănătate + severități | `src/components/features/quiz/questions/PhysicalQuestion.tsx`                |
| Detalii accidentare   | `src/components/features/quiz/questions/InterestsQuestion.tsx`               |
| Excludere sporturi    | `src/modules/quiz/sport-exclusion.service.ts`                                |
| Semnale de risc       | `src/modules/quiz/risk-signal-detection.service.ts`                          |
| Analiză + filtrare    | `src/modules/quiz/quiz.analyzer.ts`                                          |
| Prompt AI             | `src/modules/quiz/ai-recommendations.service.ts`                             |
| Tipuri                | `src/modules/quiz/quiz.types.ts`                                             |

---

## 7. Limitări și disclaimer

- Implementarea **nu înlocuiește** evaluarea medicală. Textul din UI și din recomandări subliniază necesitatea consultării unui medic/specialist acolo unde este cazul.
- Categorii sport și reguli de excludere pot fi extinse; vârstele minime din prompt sunt orientative și pot fi actualizate.
- Detectarea din text liber (`physicalConsiderations`) se bazează pe cuvinte cheie și poate produce fals pozitive/negative; pentru condiții critice, răspunsurile explicite la screening au prioritate.

Pentru planul detaliat de implementare și checklist: `QUIZ_MEDICAL_SAFETY_IMPLEMENTATION_PLAN.md`, `QUIZ_IMPLEMENTATION_CHECKLIST.md`.

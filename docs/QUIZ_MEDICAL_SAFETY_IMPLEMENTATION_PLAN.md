# Quiz Medical Safety Implementation Plan

**Created**: January 28, 2026  
**Based on**: Medical Expert Analysis (`prompts/quiz-medical-expert-analysis-results.json`)  
**Status**: 📋 Planning Phase  
**Priority**: 🚨 CRITICAL - Medical Safety

---

## Executive Summary

This plan implements **Phase 1 Critical Safety** improvements to the AI Coach Quiz to prevent unsafe sport recommendations for children with medical contraindications. The implementation focuses on:

1. **Critical Health Screening** - Detect absolute contraindications (cardiac, concussion)
2. **Sport Exclusion Logic** - Block unsafe sports based on medical conditions
3. **Enhanced Health Screening** - Add severity levels and follow-up questions
4. **Improved Risk Detection** - Better context-aware risk signal detection

**Estimated Timeline**: 2-3 weeks  
**Estimated Effort**: High  
**Medical Safety Impact**: CRITICAL

---

## Implementation Phases

### Phase 1: Critical Safety (Weeks 1-2) 🚨

**Goal**: Prevent life-threatening recommendations by adding critical health screening and sport exclusion logic.

**Deliverables**:

- Critical health screening component
- Sport exclusion service
- Enhanced injury follow-up questions
- Updated AI prompt with safety rules

---

## Phase 1.1: Critical Health Screening Component

### Task 1.1.1: Create CriticalHealthScreeningQuestion Component

**Priority**: 🚨 CRITICAL  
**Effort**: Medium (4-6 hours)  
**Dependencies**: None

**Description**: Create a new question component that screens for absolute contraindications (cardiac symptoms, concussion history) before the general health question.

**Files to Create**:

- `src/components/features/quiz/questions/CriticalHealthScreeningQuestion.tsx`

**Implementation Steps**:

1. **Create Component Structure**

   ```typescript
   // Component structure similar to other question components
   // Uses QuestionWrapper, useQuiz hook
   // Shows BEFORE PhysicalQuestion
   ```

2. **Add Cardiac Screening Questions**
   - "Copilul a avut vreodată durere în piept, palpitații sau leșin la efort fizic?"
   - "Există istoric familial de moarte cardiacă sub 50 ani?"
   - Options: Da / Nu / Nu sunt sigur/ă

3. **Add Concussion Screening Questions**
   - "Copilul a avut concuzie în ultimele 3 luni?"
   - "Copilul a avut 2 sau mai multe concuzii în ultimii 2 ani?"
   - Options: Da / Nu / Nu sunt sigur/ă

4. **Add Alert Logic**
   - If ANY answer is "Da" → Show warning alert
   - Alert message: "⚠️ Înainte de a continua, vă recomandăm consultarea unui specialist (cardiolog/neurolog pediatric) pentru evaluare medicală."
   - Allow continuation but flag for sport exclusion

5. **Update Quiz Types**
   - Add to `QuizAnswers` interface:
     ```typescript
     criticalHealth?: {
       cardiacSymptoms?: boolean;
       cardiacFamilyHistory?: boolean;
       recentConcussion?: boolean;
       multipleConcussions?: boolean;
     }
     ```

6. **Update Quiz Flow**
   - Insert this question between Question 4 (Interests) and Question 5 (Physical)
   - Update `QuizContainer.tsx` to include new step
   - Update `TOTAL_STEPS` to 7

**Acceptance Criteria**:

- [ ] Component displays before PhysicalQuestion
- [ ] All 4 screening questions are present
- [ ] Warning alert shows when any critical condition is detected
- [ ] Answers are saved to quiz state
- [ ] Component follows existing UI patterns (Bootstrap, Romanian text)

**Testing**:

- Test with all "Da" answers → Alert should appear
- Test with all "Nu" answers → No alert, continue normally
- Test with mixed answers → Alert should appear
- Test navigation (back/forward) preserves answers

---

### Task 1.1.2: Update Quiz Flow to Include Critical Screening

**Priority**: 🚨 CRITICAL  
**Effort**: Low (1-2 hours)  
**Dependencies**: Task 1.1.1

**Files to Modify**:

- `src/components/features/quiz/QuizContainer.tsx`
- `src/modules/quiz/quiz.types.ts`

**Implementation Steps**:

1. **Update QuizContainer.tsx**

   ```typescript
   // Add import
   import CriticalHealthScreeningQuestion from "./questions/CriticalHealthScreeningQuestion";

   // Update TOTAL_STEPS to 7
   const TOTAL_STEPS = 7;

   // Add case in switch statement for step 5 (before PhysicalQuestion)
   case 5:
     return <CriticalHealthScreeningQuestion />;
   case 6:
     return <PhysicalQuestion />; // Was case 5
   case 7:
     return <PreferencesQuestion />; // Was case 6
   ```

2. **Update Quiz Types**
   ```typescript
   // In quiz.types.ts, add to QuizAnswers:
   criticalHealth?: {
     cardiacSymptoms?: boolean;
     cardiacFamilyHistory?: boolean;
     recentConcussion?: boolean;
     multipleConcussions?: boolean;
   }
   ```

**Acceptance Criteria**:

- [ ] Quiz flow includes critical screening as step 5
- [ ] Navigation works correctly (back/forward)
- [ ] Progress bar shows 7 steps
- [ ] Answers persist during navigation

---

## Phase 1.2: Sport Exclusion Service

### Task 1.2.1: Create Sport Categories and Exclusion Logic

**Priority**: 🚨 CRITICAL  
**Effort**: High (6-8 hours)  
**Dependencies**: Task 1.1.1

**Description**: Create a service that categorizes sports by risk level and excludes unsafe sports based on medical conditions.

**Files to Create**:

- `src/modules/quiz/sport-exclusion.service.ts`

**Implementation Steps**:

1. **Define Sport Categories**

   ```typescript
   interface SportCategory {
     id: string;
     name: string;
     sports: string[];
   }

   const SPORT_CATEGORIES: SportCategory[] = [
     {
       id: "contact_sports",
       name: "Sporturi de contact",
       sports: ["fotbal", "handbal", "baschet", "arte-martiale", "judo", "karate", "taekwondo"],
     },
     {
       id: "high_impact",
       name: "Sporturi de impact ridicat",
       sports: ["gimnastica", "atletism", "volei", "dans", "balet"],
     },
     {
       id: "low_impact",
       name: "Sporturi de impact redus",
       sports: ["inot", "ciclism", "polo"],
     },
     {
       id: "endurance",
       name: "Sporturi de rezistență",
       sports: ["atletism", "alergare", "ciclism"],
     },
     // ... more categories
   ];
   ```

2. **Create Exclusion Rules**

   ```typescript
   interface ExclusionRule {
     triggerConditions: string[];
     excludedCategories: string[];
     allowedCategories?: string[];
     requiredSpecialist?: string;
     message: string;
   }

   const ABSOLUTE_EXCLUSION_RULES: ExclusionRule[] = [
     {
       triggerConditions: ["cardiac_symptoms", "cardiac_family_history"],
       excludedCategories: ["contact_sports", "high_impact", "endurance"],
       allowedCategories: ["low_impact"],
       requiredSpecialist: "cardiologist",
       message:
         "⚠️ Simptome cardiace detectate. Consultare cardiologică necesară înainte de orice sport.",
     },
     {
       triggerConditions: ["recent_concussion", "multiple_concussions"],
       excludedCategories: ["contact_sports", "high_impact"],
       allowedCategories: ["low_impact"],
       requiredSpecialist: "neurologist",
       message:
         "⚠️ Istoric de concuzie. Consultare neurologică necesară înainte de sporturi de contact.",
     },
     // ... more rules
   ];
   ```

3. **Create Exclusion Function**

   ```typescript
   export function shouldExcludeSport(
     sportId: string,
     answers: QuizAnswers,
     riskSignals: RiskSignal[]
   ): {
     exclude: boolean;
     reason: string | null;
     allowedWithModifications?: boolean;
   } {
     // Check for absolute contraindications
     const hasCardiacRisk =
       answers.criticalHealth?.cardiacSymptoms || answers.criticalHealth?.cardiacFamilyHistory;
     const hasConcussionRisk =
       answers.criticalHealth?.recentConcussion || answers.criticalHealth?.multipleConcussions;

     // Get sport category
     const sportCategory = getSportCategory(sportId);

     // Check exclusion rules
     if (hasCardiacRisk && isInCategory(sportId, ["contact_sports", "high_impact", "endurance"])) {
       return {
         exclude: true,
         reason: "Simptome cardiace detectate. Consultare cardiologică necesară.",
         allowedWithModifications: isInCategory(sportId, ["low_impact"]),
       };
     }

     if (hasConcussionRisk && isInCategory(sportId, ["contact_sports", "high_impact"])) {
       return {
         exclude: true,
         reason: "Istoric de concuzie. Consultare neurologică necesară.",
         allowedWithModifications: isInCategory(sportId, ["low_impact"]),
       };
     }

     return { exclude: false, reason: null };
   }
   ```

4. **Create Helper Functions**

   ```typescript
   function getSportCategory(sportId: string): string {
     // Find which category contains this sport
     for (const category of SPORT_CATEGORIES) {
       if (category.sports.includes(sportId)) {
         return category.id;
       }
     }
     return "other";
   }

   function isInCategory(sportId: string, categories: string[]): boolean {
     const sportCategory = getSportCategory(sportId);
     return categories.includes(sportCategory);
   }
   ```

**Acceptance Criteria**:

- [ ] Service correctly categorizes all sports
- [ ] Exclusion rules match medical analysis recommendations
- [ ] Function correctly identifies excluded sports
- [ ] Returns clear exclusion reasons
- [ ] Handles edge cases (unknown sports, missing data)

**Testing**:

- Test with cardiac symptoms → Contact/high-impact sports excluded
- Test with concussion → Contact sports excluded
- Test with no contraindications → No exclusions
- Test with multiple contraindications → All relevant exclusions applied

---

### Task 1.2.2: Integrate Sport Exclusion into Quiz Analyzer

**Priority**: 🚨 CRITICAL  
**Effort**: Medium (3-4 hours)  
**Dependencies**: Task 1.2.1

**Files to Modify**:

- `src/modules/quiz/quiz.analyzer.ts`
- `src/modules/quiz/ai-recommendations.service.ts`

**Implementation Steps**:

1. **Update quiz.analyzer.ts**

   ```typescript
   import { shouldExcludeSport } from "./sport-exclusion.service";

   export async function analyze(submission: QuizSubmission): Promise<AnalysisResult> {
     // ... existing code ...

     // Step 2.5: Filter out excluded sports BEFORE AI generation
     const aiResult = await generateRecommendationsWithCache(submission.answers);

     // Filter recommendations based on exclusion rules
     const filteredRecommendations = aiResult.sportRecommendations.filter((rec) => {
       const exclusion = shouldExcludeSport(rec.sportId, submission.answers, riskDetection.signals);

       if (exclusion.exclude && !exclusion.allowedWithModifications) {
         console.log(`Excluded sport ${rec.sportId}: ${exclusion.reason}`);
         return false;
       }

       // If allowed with modifications, add warning to considerations
       if (exclusion.exclude && exclusion.allowedWithModifications) {
         rec.considerations.push(
           `⚠️ ${exclusion.reason} Consultare medicală recomandată înainte de începere.`
         );
       }

       return true;
     });

     // Ensure at least 1 recommendation (use fallback if all excluded)
     if (filteredRecommendations.length === 0) {
       console.warn("All sports excluded, using fallback recommendations");
       return {
         sportRecommendations: generateFallbackRecommendations(submission.answers),
         specialistRecommendation: finalSpecialistRecommendation,
       };
     }

     return {
       sportRecommendations: filteredRecommendations,
       specialistRecommendation: finalSpecialistRecommendation,
     };
   }
   ```

2. **Update AI Prompt to Include Exclusion Guidelines**

   ```typescript
   // In ai-recommendations.service.ts, add to SYSTEM_PROMPT:

   CONTRAINDICAȚII ABSOLUTE - EXCLUDERE SPORTURI:
   Dacă copilul are următoarele condiții, NU recomanda sporturi competitive sau de intensitate ridicată până la evaluare medicală:

   - Simptome cardiace la efort → Exclude: sporturi competitive, sporturi de intensitate ridicată, sporturi de contact
   - Concuzie recentă (<3 luni) → Exclude: sporturi de contact, sporturi cu risc de impact la cap
   - Concuzii multiple (2+ în 2 ani) → Exclude: sporturi de contact, recomandă evaluare neurologică

   În aceste cazuri, recomandă:
   1. Consultare specialist (cardiolog/neurolog/ortoped) înainte de orice sport
   2. Sporturi de impact redus doar după evaluare medicală
   3. Explică clar de ce este necesară evaluarea medicală
   ```

**Acceptance Criteria**:

- [ ] Excluded sports are filtered before returning recommendations
- [ ] AI prompt includes exclusion guidelines
- [ ] Fallback recommendations used if all sports excluded
- [ ] Exclusion reasons logged for monitoring
- [ ] Modifications added to considerations when allowed with modifications

**Testing**:

- Test with cardiac symptoms → No contact/high-impact sports in results
- Test with concussion → No contact sports in results
- Test with all sports excluded → Fallback recommendations used
- Test with no contraindications → All sports allowed

---

## Phase 1.3: Enhanced Health Condition Screening

### Task 1.3.1: Add Severity Levels to Asthma and Joint Pain

**Priority**: 🔴 HIGH  
**Effort**: Medium (4-5 hours)  
**Dependencies**: None

**Files to Modify**:

- `src/components/features/quiz/questions/PhysicalQuestion.tsx`
- `src/modules/quiz/quiz.types.ts`

**Implementation Steps**:

1. **Update PhysicalQuestion.tsx - Replace Asthma Checkbox**

   ```typescript
   // Replace checkbox with dropdown
   <div className="mb-3">
     <label className="form-label fw-semibold">
       Astm sau probleme respiratorii
     </label>
     <select
       className="form-select"
       value={answers.asthmaSeverity || 'none'}
       onChange={(e) => setAnswer('asthmaSeverity', e.target.value)}
     >
       <option value="none">Fără astm</option>
       <option value="mild">Astm ușor (controlat cu medicație, fără simptome zilnice)</option>
       <option value="moderate">Astm moderat (simptome ocazionale, folosește inhaler înainte de sport)</option>
       <option value="severe">Astm sever (spitalizare în ultimul an sau simptome frecvente)</option>
     </select>
   </div>

   // Add follow-up question if asthma selected
   {answers.asthmaSeverity && answers.asthmaSeverity !== 'none' && (
     <div className="mb-3">
       <label className="form-label">Copilul folosește inhaler înainte de activități fizice?</label>
       <div className="d-flex gap-2">
         <button type="button" onClick={() => setAnswer('inhalerUse', 'yes')}>
           Da
         </button>
         <button type="button" onClick={() => setAnswer('inhalerUse', 'no')}>
           Nu
         </button>
         <button type="button" onClick={() => setAnswer('inhalerUse', 'sometimes')}>
           Ocazional
         </button>
       </div>
     </div>
   )}
   ```

2. **Update PhysicalQuestion.tsx - Replace Joint Pain Checkbox**

   ```typescript
   // Similar dropdown for joint pain
   <select
     value={answers.jointPainSeverity || 'none'}
     onChange={(e) => setAnswer('jointPainSeverity', e.target.value)}
   >
     <option value="none">Fără dureri articulare</option>
     <option value="mild">Dureri ușoare ocazionale (după efort intens)</option>
     <option value="moderate">Dureri moderate frecvente (afectează activitățile zilnice ocazional)</option>
     <option value="severe">Dureri severe persistente (afectează activitățile zilnice)</option>
   </select>
   ```

3. **Update Quiz Types**

   ```typescript
   // In quiz.types.ts, update QuizAnswers:
   healthConditions?: string[]; // Keep for backward compatibility
   asthmaSeverity?: 'none' | 'mild' | 'moderate' | 'severe';
   inhalerUse?: 'yes' | 'no' | 'sometimes';
   jointPainSeverity?: 'none' | 'mild' | 'moderate' | 'severe';
   ```

4. **Update Health Conditions Array Logic**

   ```typescript
   // When severity is selected, also add to healthConditions array for compatibility
   useEffect(() => {
     const conditions = [...(answers.healthConditions || [])];

     if (answers.asthmaSeverity && answers.asthmaSeverity !== "none") {
       if (!conditions.includes("asthma")) {
         conditions.push("asthma");
       }
     } else {
       const index = conditions.indexOf("asthma");
       if (index > -1) conditions.splice(index, 1);
     }

     setAnswer("healthConditions", conditions.length > 0 ? conditions : undefined);
   }, [answers.asthmaSeverity]);
   ```

**Acceptance Criteria**:

- [ ] Asthma checkbox replaced with severity dropdown
- [ ] Joint pain checkbox replaced with severity dropdown
- [ ] Follow-up questions appear when severity selected
- [ ] Answers saved correctly to quiz state
- [ ] Backward compatibility maintained (healthConditions array)

**Testing**:

- Test severity selection → Follow-up questions appear
- Test "none" selection → Follow-up questions hidden
- Test navigation → Answers persist
- Test submission → Severity data included in answers

---

### Task 1.3.2: Enhance Injury Follow-up Questions

**Priority**: 🔴 HIGH  
**Effort**: Medium (3-4 hours)  
**Dependencies**: None

**Files to Modify**:

- `src/components/features/quiz/questions/InterestsQuestion.tsx`
- `src/modules/quiz/quiz.types.ts`

**Implementation Steps**:

1. **Add Injury Details Form**

   ```typescript
   // In InterestsQuestion.tsx, add conditional form when "injury" selected
   {whyStoppedSports.includes('injury') && (
     <div className="mt-3 p-3 bg-light rounded">
       <h6 className="fw-semibold mb-3">Detalii despre accidentare</h6>

       {/* Injury Type */}
       <div className="mb-3">
         <label className="form-label">Tip accidentare</label>
         <select
           className="form-select"
           value={answers.injuryType || ''}
           onChange={(e) => setAnswer('injuryType', e.target.value)}
         >
           <option value="">Selectează tipul...</option>
           <option value="fracture">Fractură</option>
           <option value="growth-plate">Fractură placa de creștere</option>
           <option value="dislocation">Luxație</option>
           <option value="sprain">Entorsă</option>
           <option value="concussion">Concuzie</option>
           <option value="other">Altele</option>
         </select>
       </div>

       {/* When it happened */}
       <div className="mb-3">
         <label className="form-label">Când s-a întâmplat?</label>
         <select
           className="form-select"
           value={answers.injuryWhen || ''}
           onChange={(e) => setAnswer('injuryWhen', e.target.value)}
         >
           <option value="">Selectează...</option>
           <option value="<1month">Mai puțin de 1 lună</option>
           <option value="1-3months">1-3 luni</option>
           <option value="3-6months">3-6 luni</option>
           <option value="6-12months">6-12 luni</option>
           <option value=">1year">Mai mult de 1 an</option>
         </select>
       </div>

       {/* Fully healed */}
       <div className="mb-3">
         <label className="form-label">A fost rezolvată complet?</label>
         <div className="d-flex gap-2">
           <button type="button" onClick={() => setAnswer('injuryHealed', true)}>
             Da
           </button>
           <button type="button" onClick={() => setAnswer('injuryHealed', false)}>
             Nu
           </button>
           <button type="button" onClick={() => setAnswer('injuryHealed', null)}>
             Neclar
           </button>
         </div>
       </div>

       {/* Current restrictions */}
       <div className="mb-3">
         <label className="form-label">Există restricții medicale curente?</label>
         <div className="d-flex gap-2">
           <button type="button" onClick={() => setAnswer('injuryRestrictions', true)}>
             Da
           </button>
           <button type="button" onClick={() => setAnswer('injuryRestrictions', false)}>
             Nu
           </button>
         </div>
       </div>
     </div>
   )}
   ```

2. **Update Quiz Types**
   ```typescript
   // In quiz.types.ts, add to QuizAnswers:
   injuryDetails?: {
     type?: 'fracture' | 'growth-plate' | 'dislocation' | 'sprain' | 'concussion' | 'other';
     when?: '<1month' | '1-3months' | '3-6months' | '6-12months' | '>1year';
     healed?: boolean | null;
     restrictions?: boolean;
   }
   ```

**Acceptance Criteria**:

- [ ] Injury details form appears when "injury" selected
- [ ] All fields are present and functional
- [ ] Answers saved to quiz state
- [ ] Form hidden when "injury" deselected

**Testing**:

- Test selecting "injury" → Form appears
- Test deselecting "injury" → Form hidden, data cleared
- Test all fields → Data saves correctly
- Test navigation → Data persists

---

## Phase 1.4: Enhanced Risk Detection

### Task 1.4.1: Add Critical Condition Detection to Risk Service

**Priority**: 🚨 CRITICAL  
**Effort**: Medium (4-5 hours)  
**Dependencies**: Task 1.1.1

**Files to Modify**:

- `src/modules/quiz/risk-signal-detection.service.ts`

**Implementation Steps**:

1. **Add Cardiac Risk Detection**

   ```typescript
   function detectCardiacRisks(answers: QuizAnswers): RiskSignal[] {
     const signals: RiskSignal[] = [];
     const indicators: string[] = [];

     // Check critical health screening
     if (answers.criticalHealth?.cardiacSymptoms) {
       indicators.push("Simptome cardiace la efort detectate");
       signals.push({
         specialty: "cardiologist",
         severity: "high",
         reason:
           "Simptome cardiace detectate necesită evaluare cardiologică înainte de orice sport. Acesta este un risc potențial de viață.",
         indicators: [...indicators],
         absoluteContraindication: true, // NEW
         excludedSportCategories: ["contact_sports", "high_impact", "endurance"],
         allowedSportCategories: ["low_impact"],
       });
     }

     if (answers.criticalHealth?.cardiacFamilyHistory) {
       indicators.push("Istoric familial moarte cardiacă sub 50 ani");
       signals.push({
         specialty: "cardiologist",
         severity: "high",
         reason:
           "Istoric familial de moarte cardiacă necesită evaluare cardiologică înainte de sporturi competitive.",
         indicators: [...indicators],
         absoluteContraindication: true,
         excludedSportCategories: ["contact_sports", "high_impact", "endurance"],
         allowedSportCategories: ["low_impact"],
       });
     }

     // Also check physical considerations text for cardiac keywords
     if (answers.physicalConsiderations) {
       const cardiacKeywords = ["durere piept", "palpitații", "leșin", "sincopă", "cardiac"];
       const considerations = answers.physicalConsiderations.toLowerCase();

       if (cardiacKeywords.some((kw) => considerations.includes(kw))) {
         indicators.push("Mențiuni cardiace în considerații fizice");
         signals.push({
           specialty: "cardiologist",
           severity: "high",
           reason: "Mențiuni despre simptome cardiace necesită evaluare cardiologică.",
           indicators: [...indicators],
           absoluteContraindication: true,
           excludedSportCategories: ["contact_sports", "high_impact", "endurance"],
         });
       }
     }

     return signals;
   }
   ```

2. **Add Concussion Risk Detection**

   ```typescript
   function detectConcussionRisks(answers: QuizAnswers): RiskSignal[] {
     const signals: RiskSignal[] = [];
     const indicators: string[] = [];

     // Check critical health screening
     if (answers.criticalHealth?.recentConcussion) {
       indicators.push("Concuzie recentă (<3 luni)");
       signals.push({
         specialty: "neurologist",
         severity: "high",
         reason:
           "Concuzie recentă necesită evaluare neurologică și vindecare completă înainte de sporturi de contact.",
         indicators: [...indicators],
         absoluteContraindication: true,
         excludedSportCategories: ["contact_sports", "high_impact"],
         allowedSportCategories: ["low_impact"],
       });
     }

     if (answers.criticalHealth?.multipleConcussions) {
       indicators.push("Concuzii multiple (2+ în 2 ani)");
       signals.push({
         specialty: "neurologist",
         severity: "high",
         reason:
           "Concuzii multiple cresc semnificativ riscul de sindrom post-concuzional. Evaluare neurologică necesară.",
         indicators: [...indicators],
         absoluteContraindication: true,
         excludedSportCategories: ["contact_sports", "high_impact"],
         allowedSportCategories: ["low_impact"],
       });
     }

     // Check injury details for concussion
     if (answers.injuryDetails?.type === "concussion") {
       const when = answers.injuryDetails.when;
       if (when === "<1month" || when === "1-3months") {
         indicators.push("Concuzie în istoricul de accidentări");
         signals.push({
           specialty: "neurologist",
           severity: "high",
           reason: "Concuzie recentă în istoricul de accidentări necesită evaluare neurologică.",
           indicators: [...indicators],
           absoluteContraindication: true,
           excludedSportCategories: ["contact_sports", "high_impact"],
         });
       }
     }

     return signals;
   }
   ```

3. **Update Main Detection Function**

   ```typescript
   export function detectRiskSignals(answers: QuizAnswers): RiskDetectionResult {
     const signals: RiskSignal[] = [];

     // 0. Critical contraindications (NEW - highest priority)
     const cardiacSignals = detectCardiacRisks(answers);
     signals.push(...cardiacSignals);

     const concussionSignals = detectConcussionRisks(answers);
     signals.push(...concussionSignals);

     // 1. Orthopedist Risk Signals (existing)
     const orthopedistSignals = detectOrthopedistRisks(answers);
     signals.push(...orthopedistSignals);

     // ... rest of existing code ...
   }
   ```

4. **Update RiskSignal Interface**
   ```typescript
   export interface RiskSignal {
     specialty: SpecialistRecommendation["specialty"];
     severity: RiskSeverity;
     reason: string;
     indicators: string[];
     absoluteContraindication?: boolean; // NEW
     excludedSportCategories?: string[]; // NEW
     allowedSportCategories?: string[]; // NEW
   }
   ```

**Acceptance Criteria**:

- [ ] Cardiac risks detected from critical health screening
- [ ] Concussion risks detected from critical health screening
- [ ] Absolute contraindication flag set correctly
- [ ] Excluded/allowed sport categories included
- [ ] Existing risk detection still works

**Testing**:

- Test with cardiac symptoms → Cardiac risk signal with absolute contraindication
- Test with concussion → Concussion risk signal with absolute contraindication
- Test with both → Both signals detected
- Test with neither → No critical signals, existing detection works

---

### Task 1.4.2: Improve Context-Aware Risk Detection

**Priority**: 🔴 HIGH  
**Effort**: Medium (3-4 hours)  
**Dependencies**: None

**Files to Modify**:

- `src/modules/quiz/risk-signal-detection.service.ts`

**Implementation Steps**:

1. **Enhance Orthopedist Detection with Context**

   ```typescript
   function detectOrthopedistRisks(answers: QuizAnswers): RiskSignal[] {
     const signals: RiskSignal[] = [];
     const indicators: string[] = [];

     // ... existing coordination level code ...

     // Enhanced: Check physical considerations with context
     if (answers.physicalConsiderations) {
       const considerations = answers.physicalConsiderations.toLowerCase();

       // Normal contexts (reduce severity)
       const normalContexts = ["după efort", "ocazional", "după antrenament", "normal"];
       // Pathological contexts (increase severity)
       const pathologicalContexts = ["zilnic", "persistente", "constant", "noaptea", "dimineața"];

       const hasNormalContext = normalContexts.some((ctx) => considerations.includes(ctx));
       const hasPathologicalContext = pathologicalContexts.some((ctx) =>
         considerations.includes(ctx)
       );

       // Check for pain keywords
       const painKeywords = ["durere", "dureri", "dureros"];
       const hasPain = painKeywords.some((kw) => considerations.includes(kw));

       if (hasPain) {
         if (hasPathologicalContext && !hasNormalContext) {
           // High risk - pathological pain
           indicators.push("Dureri patologice menționate");
           signals.push({
             specialty: "orthopedist",
             severity: "high",
             reason:
               "Dureri persistente necesită evaluare ortopedică înainte de sporturi de impact.",
             indicators: [...indicators],
           });
         } else if (hasNormalContext && !hasPathologicalContext) {
           // Low risk - normal post-exercise pain
           indicators.push("Dureri normale după efort");
           signals.push({
             specialty: "orthopedist",
             severity: "low",
             reason: "Dureri ocazionale după efort sunt normale. Monitorizare recomandată.",
             indicators: [...indicators],
           });
         } else {
           // Medium risk - unclear context
           indicators.push("Dureri menționate");
           signals.push({
             specialty: "orthopedist",
             severity: "medium",
             reason: "Dureri menționate necesită clarificare. Evaluare ortopedică poate fi utilă.",
             indicators: [...indicators],
           });
         }
       }
     }

     // Enhanced: Check joint pain severity
     if (answers.jointPainSeverity) {
       if (answers.jointPainSeverity === "severe") {
         indicators.push("Dureri articulare severe");
         signals.push({
           specialty: "orthopedist",
           severity: "high",
           reason:
             "Dureri articulare severe necesită evaluare ortopedică urgentă înainte de orice sport.",
           indicators: [...indicators],
           excludedSportCategories: ["high_impact", "contact_sports"],
         });
       } else if (answers.jointPainSeverity === "moderate") {
         indicators.push("Dureri articulare moderate");
         signals.push({
           specialty: "orthopedist",
           severity: "medium",
           reason:
             "Dureri articulare moderate necesită evaluare ortopedică pentru identificarea sporturilor potrivite.",
           indicators: [...indicators],
           excludedSportCategories: ["high_impact"],
         });
       }
     }

     return signals;
   }
   ```

2. **Enhance Asthma Detection with Severity**

   ```typescript
   function detectGeneralPediatricianRisks(answers: QuizAnswers): RiskSignal[] {
     const signals: RiskSignal[] = [];

     // ... existing code ...

     // Enhanced: Check asthma severity
     if (answers.asthmaSeverity === "severe") {
       indicators.push("Astm sever necontrolat");
       signals.push({
         specialty: "pulmonologist", // More specific than 'general'
         severity: "high",
         reason:
           "Astm sever necesită evaluare pulmonară înainte de sporturi de intensitate ridicată.",
         indicators: [...indicators],
         excludedSportCategories: ["endurance", "high_intensity"],
       });
     } else if (answers.asthmaSeverity === "moderate") {
       indicators.push("Astm moderat");
       signals.push({
         specialty: "general",
         severity: "medium",
         reason:
           "Astm moderat necesită monitorizare și acces la medicație în timpul activităților sportive.",
         indicators: [...indicators],
       });
     }

     return signals;
   }
   ```

**Acceptance Criteria**:

- [ ] Context-aware detection reduces false positives
- [ ] Severity levels affect risk detection
- [ ] Normal vs pathological contexts distinguished
- [ ] Existing detection still works

**Testing**:

- Test "dureri după efort" → Low severity signal
- Test "dureri persistente zilnic" → High severity signal
- Test severe asthma → High severity, pulmonologist
- Test moderate asthma → Medium severity, general pediatrician

---

## Phase 1.5: AI Prompt Updates

### Task 1.5.1: Add Medical Safety Rules to AI Prompt

**Priority**: 🔴 HIGH  
**Effort**: Low (2-3 hours)  
**Dependencies**: Tasks 1.1.1, 1.2.1

**Files to Modify**:

- `src/modules/quiz/ai-recommendations.service.ts`

**Implementation Steps**:

1. **Add Absolute Contraindication Section**

   ```typescript
   // In SYSTEM_PROMPT, add after "IDENTIFICAREA SEMNALELOR DE RISC":

   CONTRAINDICAȚII ABSOLUTE - EXCLUDERE SPORTURI:
   Dacă copilul are următoarele condiții, NU recomanda sporturi competitive sau de intensitate ridicată până la evaluare medicală:

   - Simptome cardiace la efort (durere în piept, palpitații, leșin) → Exclude: sporturi competitive, sporturi de intensitate ridicată, sporturi de contact
   - Istoric familial de moarte cardiacă sub 50 ani → Exclude: sporturi competitive, sporturi de intensitate ridicată
   - Concuzie recentă (<3 luni) → Exclude: sporturi de contact, sporturi cu risc de impact la cap
   - Concuzii multiple (2+ în 2 ani) → Exclude: sporturi de contact, recomandă evaluare neurologică
   - Accidentare placa de creștere recentă → Exclude: sporturi de impact până la vindecare completă

   În aceste cazuri, recomandă:
   1. Consultare specialist (cardiolog/neurolog/ortoped) înainte de orice sport
   2. Sporturi de impact redus doar după evaluare medicală (înot, ciclism)
   3. Explică clar de ce este necesară evaluarea medicală
   4. NU recomanda sporturi de contact sau de intensitate ridicată
   ```

2. **Add Severity-Based Recommendations**

   ```typescript
   // Add after "CRITERII DE RECOMANDARE":

   SEVERITATEA CONDIȚIILOR MEDICALE:
   Adaptează recomandările în funcție de severitatea condițiilor medicale:

   - Condiții ușoare/controlate: Majoritatea sporturilor sunt potrivite cu precauții minime
   - Condiții moderate: Sporturi specifice potrivite, evită sporturi de risc, asigură acces la medicație
   - Condiții severe/necontrolate: Necesită evaluare medicală înainte de orice sport, recomandă sporturi de impact redus doar după evaluare

   Exemple:
   - Astm ușor: Majoritatea sporturilor potrivite, înotul este de obicei benefic
   - Astm moderat: Sporturi potrivite cu precauții, evită condiții extreme (frig, polen ridicat)
   - Astm sever: Evaluare pulmonară necesară, sporturi de intensitate ridicată contraindicare până la control
   ```

3. **Add Romanian Federation Age Minimums**

   ```typescript
   // Add after "CRITERII DE RECOMANDARE":

   VÂRSTE MINIME PENTRU SPORTURI COMPETITIVE (Federația Română):
   - Gimnastică: 6 ani (recreativ: 4 ani)
   - Înot: 5 ani (recreativ: 4 ani)
   - Fotbal: 6 ani (recreativ: 5 ani)
   - Tenis: 6 ani (recreativ: 5 ani)
   - Baschet: 8 ani (recreativ: 6 ani)
   - Handbal: 8 ani (recreativ: 6 ani)
   - Volei: 9 ani (recreativ: 7 ani)
   - Atletism: 10 ani (recreativ: 7 ani)

   Dacă copilul are vârstă sub minimul competitiv pentru un sport, recomandă varianta recreativă și menționează că poate trece la nivel competitiv când atinge vârsta minimă.
   ```

4. **Update User Prompt to Include Critical Health**

   ```typescript
   // In buildUserPrompt function, add:

   ${answers.criticalHealth?.cardiacSymptoms ? '⚠️ Simptome cardiace la efort detectate' : ''}
   ${answers.criticalHealth?.cardiacFamilyHistory ? '⚠️ Istoric familial moarte cardiacă sub 50 ani' : ''}
   ${answers.criticalHealth?.recentConcussion ? '⚠️ Concuzie recentă (<3 luni)' : ''}
   ${answers.criticalHealth?.multipleConcussions ? '⚠️ Concuzii multiple (2+ în 2 ani)' : ''}

   ${answers.asthmaSeverity ? `Severitate astm: ${answers.asthmaSeverity}` : ''}
   ${answers.jointPainSeverity ? `Severitate dureri articulare: ${answers.jointPainSeverity}` : ''}
   ```

**Acceptance Criteria**:

- [ ] AI prompt includes absolute contraindication rules
- [ ] AI prompt includes severity-based recommendations
- [ ] AI prompt includes Romanian Federation age minimums
- [ ] User prompt includes critical health data
- [ ] All text in Romanian

**Testing**:

- Test AI generation with cardiac symptoms → No contact sports recommended
- Test AI generation with concussion → No contact sports recommended
- Test AI generation with severe asthma → Pulmonologist recommendation
- Test AI generation with age 5 → No competitive basketball recommended

---

## Testing Strategy

### Unit Tests

**Files to Test**:

- `sport-exclusion.service.ts` - Test exclusion logic
- `risk-signal-detection.service.ts` - Test risk detection
- `quiz.analyzer.ts` - Test integration

**Test Cases**:

1. Cardiac symptoms → Contact sports excluded
2. Concussion → Contact sports excluded
3. Severe asthma → High-intensity sports excluded
4. No contraindications → All sports allowed
5. Multiple contraindications → All relevant exclusions applied

### Integration Tests

**Test Scenarios**:

1. Complete quiz with cardiac symptoms → Verify no contact sports in results
2. Complete quiz with concussion → Verify no contact sports in results
3. Complete quiz with severe asthma → Verify pulmonologist recommendation
4. Complete quiz with no contraindications → Verify normal flow

### Manual Testing Checklist

- [ ] Critical screening appears before physical question
- [ ] Warning alert shows when critical conditions detected
- [ ] Severity dropdowns work for asthma and joint pain
- [ ] Injury follow-up form appears when injury selected
- [ ] Excluded sports don't appear in recommendations
- [ ] Specialist recommendations appear for critical conditions
- [ ] Navigation works correctly with new question
- [ ] All answers persist during navigation
- [ ] Quiz submission includes all new data

---

## Rollout Plan

### Phase 1: Development (Week 1-2)

- [ ] Day 1-2: Critical health screening component
- [ ] Day 3-4: Sport exclusion service
- [ ] Day 5-6: Enhanced health screening (severity levels)
- [ ] Day 7-8: Enhanced risk detection
- [ ] Day 9-10: AI prompt updates
- [ ] Day 11-12: Integration and testing
- [ ] Day 13-14: Bug fixes and polish

### Phase 2: Testing (Week 3)

- [ ] Internal testing with medical scenarios
- [ ] User acceptance testing
- [ ] Performance testing
- [ ] Security review

### Phase 3: Deployment (Week 4)

- [ ] Staging deployment
- [ ] Final testing on staging
- [ ] Production deployment
- [ ] Monitoring and support

---

## Success Metrics

### Phase 1 Success Criteria

- [ ] Zero recommendations for contact sports when concussion history exists
- [ ] Zero recommendations for high-intensity sports when cardiac symptoms exist
- [ ] All critical conditions trigger specialist recommendations
- [ ] Sport exclusion logic prevents unsafe recommendations
- [ ] Severity levels improve recommendation accuracy
- [ ] No regression in existing functionality

### Monitoring

- Track exclusion rate (how often sports are excluded)
- Track specialist recommendation rate
- Monitor user completion rate (does new question reduce completion?)
- Monitor AI recommendation quality (user feedback)

---

## Risk Mitigation

### Technical Risks

- **Risk**: New question increases quiz length → lower completion rate
  - **Mitigation**: Make critical screening concise, allow skipping with warning
- **Risk**: Sport exclusion too aggressive → no recommendations
  - **Mitigation**: Fallback to low-impact sports, always provide at least 1 recommendation
- **Risk**: Breaking changes to existing quiz flow
  - **Mitigation**: Maintain backward compatibility, gradual rollout

### Medical Risks

- **Risk**: Missing edge cases in exclusion logic
  - **Mitigation**: Medical expert review, comprehensive testing
- **Risk**: False positives in risk detection
  - **Mitigation**: Context-aware detection, severity levels

---

## Dependencies

### External Dependencies

- None (all changes are internal)

### Internal Dependencies

- Task 1.1.1 → Task 1.1.2 (Critical screening → Quiz flow)
- Task 1.1.1 → Task 1.2.1 (Critical screening → Sport exclusion)
- Task 1.2.1 → Task 1.2.2 (Sport exclusion → Integration)
- Task 1.1.1 → Task 1.4.1 (Critical screening → Risk detection)

---

## Documentation Updates

### Files to Update

- [ ] `docs/QUIZ_IMPLEMENTATION.md` - Add new question documentation
- [ ] `src/modules/quiz/README.md` - Document sport exclusion service
- [ ] `docs/MEDICAL_SAFETY.md` - Document medical safety features (NEW)

### User-Facing Documentation

- [ ] Update quiz help text
- [ ] Add FAQ about critical health screening
- [ ] Update privacy policy if needed (medical data)

---

## Post-Implementation

### Phase 2 Enhancements (Future)

- PHV (Peak Height Velocity) assessment
- Female Athlete Triad screening
- FMS (Fundamental Movement Skills) assessment
- Advanced motor development tracking

### Continuous Improvement

- Collect user feedback on new questions
- Monitor exclusion rates and adjust logic
- Refine severity level descriptions based on usage
- Update AI prompt based on recommendation quality

---

**Status**: 📋 Ready for Implementation  
**Next Step**: Begin Task 1.1.1 - Create CriticalHealthScreeningQuestion Component

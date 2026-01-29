# Quiz Medical Safety Implementation Plan

**Created**: January 28, 2026
**Based on**: Medical Expert Analysis (`prompts/quiz-medical-expert-analysis-results.json`)
**Status**: ✅ Phase 1 COMPLETE
**Priority**: 🚨 CRITICAL - Medical Safety
**Completed**: January 29, 2026

---

## Executive Summary

This plan implements **Phase 1 Critical Safety** improvements to the AI Coach Quiz to prevent unsafe sport recommendations for children with medical contraindications. The implementation focuses on:

1. **Critical Health Screening** - Detect absolute contraindications (cardiac, concussion) ✅
2. **Sport Exclusion Logic** - Block unsafe sports based on medical conditions ✅
3. **Enhanced Health Screening** - Add severity levels and follow-up questions ✅
4. **Improved Risk Detection** - Better context-aware risk signal detection ✅

**Estimated Timeline**: 2-3 weeks
**Actual Timeline**: Completed in Phase 1
**Medical Safety Impact**: CRITICAL

---

## Implementation Phases

### Phase 1: Critical Safety (Weeks 1-2) 🚨 ✅ COMPLETE

**Goal**: Prevent life-threatening recommendations by adding critical health screening and sport exclusion logic.

**Deliverables**:

- ✅ Critical health screening component
- ✅ Sport exclusion service
- ✅ Enhanced injury follow-up questions
- ✅ Updated AI prompt with safety rules

---

## Phase 1.1: Critical Health Screening Component

### Task 1.1.1: Create CriticalHealthScreeningQuestion Component ✅ COMPLETE

**Priority**: 🚨 CRITICAL
**Effort**: Medium (4-6 hours)
**Dependencies**: None
**Status**: ✅ COMPLETE

**Description**: Create a new question component that screens for absolute contraindications (cardiac symptoms, concussion history) before the general health question.

**Files Created**:

- ✅ `src/components/features/quiz/questions/CriticalHealthScreeningQuestion.tsx`

**Implementation Steps**:

1. ✅ **Create Component Structure**

   ```typescript
   // Component structure similar to other question components
   // Uses QuestionWrapper, useQuiz hook
   // Shows BEFORE PhysicalQuestion
   ```

2. ✅ **Add Cardiac Screening Questions**
   - "Copilul a avut vreodată durere în piept, palpitații sau leșin la efort fizic?"
   - "Există istoric familial de moarte cardiacă sub 50 ani?"
   - Options: Da / Nu / Nu sunt sigur/ă

3. ✅ **Add Concussion Screening Questions**
   - "Copilul a avut contuzie în ultimele 3 luni?"
   - "Copilul a avut 2 sau mai multe contuzii în ultimii 2 ani?"
   - Options: Da / Nu / Nu sunt sigur/ă

4. ✅ **Add Alert Logic**
   - If ANY answer is "Da" → Show warning alert
   - Alert message: "⚠️ Înainte de a continua, vă recomandăm consultarea unui specialist (cardiolog/neurolog pediatric) pentru evaluare medicală."
   - Allow continuation but flag for sport exclusion

5. ✅ **Update Quiz Types**
   - Add to `QuizAnswers` interface:
     ```typescript
     criticalHealth?: {
       cardiacSymptoms?: boolean;
       cardiacFamilyHistory?: boolean;
       recentConcussion?: boolean;
       multipleConcussions?: boolean;
     }
     ```

6. ✅ **Update Quiz Flow**
   - Insert this question between Question 4 (Interests) and Question 5 (Physical)
   - Update `QuizContainer.tsx` to include new step
   - Update `TOTAL_STEPS` to 7

**Acceptance Criteria**:

- [x] Component displays before PhysicalQuestion
- [x] All 4 screening questions are present
- [x] Warning alert shows when any critical condition is detected
- [x] Answers are saved to quiz state
- [x] Component follows existing UI patterns (Bootstrap, Romanian text)

**Testing**:

- ✅ Test with all "Da" answers → Alert should appear
- ✅ Test with all "Nu" answers → No alert, continue normally
- ✅ Test with mixed answers → Alert should appear
- ✅ Test navigation (back/forward) preserves answers

---

### Task 1.1.2: Update Quiz Flow to Include Critical Screening ✅ COMPLETE

**Priority**: 🚨 CRITICAL
**Effort**: Low (1-2 hours)
**Dependencies**: Task 1.1.1
**Status**: ✅ COMPLETE

**Files Modified**:

- ✅ `src/components/features/quiz/QuizContainer.tsx`
- ✅ `src/modules/quiz/quiz.types.ts`

**Implementation Steps**:

1. ✅ **Update QuizContainer.tsx**

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

2. ✅ **Update Quiz Types**
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

- [x] Quiz flow includes critical screening as step 5
- [x] Navigation works correctly (back/forward)
- [x] Progress bar shows 7 steps
- [x] Answers persist during navigation

---

## Phase 1.2: Sport Exclusion Service

### Task 1.2.1: Create Sport Categories and Exclusion Logic ✅ COMPLETE

**Priority**: 🚨 CRITICAL
**Effort**: High (6-8 hours)
**Dependencies**: Task 1.1.1
**Status**: ✅ COMPLETE

**Description**: Create a service that categorizes sports by risk level and excludes unsafe sports based on medical conditions.

**Files Created**:

- ✅ `src/modules/quiz/sport-exclusion.service.ts` (331 lines)

**Implementation Steps**:

1. ✅ **Define Sport Categories**

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
       sports: [
         "fotbal",
         "handbal",
         "baschet",
         "arte-martiale",
         "judo",
         "karate",
         "taekwondo",
         "rugby",
       ],
     },
     {
       id: "high_impact",
       name: "Sporturi de impact ridicat",
       sports: [
         "gimnastica",
         "atletism",
         "volei",
         "dans",
         "balet",
         "skateboard",
         "escaladă",
         "alpinism",
       ],
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
     // ... more categories (racquet, skill-based)
   ];
   ```

2. ✅ **Create Exclusion Rules** (6 rules implemented)
   - Cardiac risk → Exclude contact/high-impact/endurance
   - Concussion risk → Exclude contact/high-impact
   - Growth plate injury → Exclude high-impact/contact
   - Severe asthma → Exclude endurance/high-impact
   - Severe joint pain → Exclude high-impact/contact
   - Moderate joint pain → Exclude high-impact/contact

3. ✅ **Create Exclusion Function**

4. ✅ **Create Helper Functions**

**Acceptance Criteria**:

- [x] Service correctly categorizes all sports
- [x] Exclusion rules match medical analysis recommendations
- [x] Function correctly identifies excluded sports
- [x] Returns clear exclusion reasons
- [x] Handles edge cases (unknown sports, missing data)

**Testing**:

- ✅ Test with cardiac symptoms → Contact/high-impact sports excluded
- ✅ Test with concussion → Contact sports excluded
- ✅ Test with no contraindications → No exclusions
- ✅ Test with multiple contraindications → All relevant exclusions applied

---

### Task 1.2.2: Integrate Sport Exclusion into Quiz Analyzer ✅ COMPLETE

**Priority**: 🚨 CRITICAL
**Effort**: Medium (3-4 hours)
**Dependencies**: Task 1.2.1
**Status**: ✅ COMPLETE

**Files Modified**:

- ✅ `src/modules/quiz/quiz.analyzer.ts`
- ✅ `src/modules/quiz/ai-recommendations.service.ts`

**Acceptance Criteria**:

- [x] Excluded sports are filtered before returning recommendations
- [x] AI prompt includes exclusion guidelines
- [x] Fallback recommendations used if all sports excluded
- [x] Exclusion reasons logged for monitoring
- [x] Modifications added to considerations when allowed with modifications

**Testing**:

- ✅ Test with cardiac symptoms → No contact/high-impact sports in results
- ✅ Test with concussion → No contact sports in results
- ✅ Test with all sports excluded → Fallback recommendations used
- ✅ Test with no contraindications → All sports allowed

---

## Phase 1.3: Enhanced Health Condition Screening

### Task 1.3.1: Add Severity Levels to Asthma and Joint Pain ✅ COMPLETE

**Priority**: 🔴 HIGH
**Effort**: Medium (4-5 hours)
**Dependencies**: None
**Status**: ✅ COMPLETE

**Files Modified**:

- ✅ `src/components/features/quiz/questions/PhysicalQuestion.tsx`
- ✅ `src/modules/quiz/quiz.types.ts`

**Implementation Details**:

1. ✅ **Asthma Severity Dropdown** (none/mild/moderate/severe)
2. ✅ **Inhaler Use Follow-Up** (yes/no/sometimes) - conditional on asthma selection
3. ✅ **Joint Pain Severity Dropdown** (none/mild/moderate/severe)
4. ✅ **Coordination Level** (excellent/good/developing/challenges)

**Acceptance Criteria**:

- [x] Asthma checkbox replaced with severity dropdown
- [x] Joint pain checkbox replaced with severity dropdown
- [x] Follow-up questions appear when severity selected
- [x] Answers saved correctly to quiz state
- [x] Backward compatibility maintained (healthConditions array)

**Testing**:

- ✅ Test severity selection → Follow-up questions appear
- ✅ Test "none" selection → Follow-up questions hidden
- ✅ Test navigation → Answers persist
- ✅ Test submission → Severity data included in answers

---

### Task 1.3.2: Enhance Injury Follow-up Questions ✅ COMPLETE

**Priority**: 🔴 HIGH
**Effort**: Medium (3-4 hours)
**Dependencies**: None
**Status**: ✅ COMPLETE

**Files Modified**:

- ✅ `src/components/features/quiz/questions/InterestsQuestion.tsx`
- ✅ `src/modules/quiz/quiz.types.ts`

**Implementation Details**:

- ✅ **Injury Type Dropdown** (fracture, growth-plate, dislocation, sprain, concussion, other)
- ✅ **When It Happened** (<1month, 1-3months, 3-6months, 6-12months, >1year)
- ✅ **Healing Status** (yes/no/uncertain)
- ✅ **Current Medical Restrictions** (yes/no)
- ✅ **Auto-clearing** when "injury" deselected

**Acceptance Criteria**:

- [x] Injury details form appears when "injury" selected
- [x] All fields are present and functional
- [x] Answers saved to quiz state
- [x] Form hidden when "injury" deselected

**Testing**:

- ✅ Test selecting "injury" → Form appears
- ✅ Test deselecting "injury" → Form hidden, data cleared
- ✅ Test all fields → Data saves correctly
- ✅ Test navigation → Data persists

---

## Phase 1.4: Enhanced Risk Detection

### Task 1.4.1: Add Critical Condition Detection to Risk Service ✅ COMPLETE

**Priority**: 🚨 CRITICAL
**Effort**: Medium (4-5 hours)
**Dependencies**: Task 1.1.1
**Status**: ✅ COMPLETE

**Files Modified**:

- ✅ `src/modules/quiz/risk-signal-detection.service.ts` (1,222 lines)

**Implementation Details**:

- ✅ **Cardiac Risk Detection** (symptoms, family history, text analysis)
- ✅ **Concussion Risk Detection** (recent, multiple, injury history)
- ✅ **6 Specialist Types** (cardiologist, neurologist, pulmonologist, orthopedist, nutritionist, psychologist, general)
- ✅ **Absolute Contraindication Flag**
- ✅ **Excluded/Allowed Sport Categories**

**Acceptance Criteria**:

- [x] Cardiac risks detected from critical health screening
- [x] Concussion risks detected from critical health screening
- [x] Absolute contraindication flag set correctly
- [x] Excluded/allowed sport categories included
- [x] Existing risk detection still works

**Testing**:

- ✅ Test with cardiac symptoms → Cardiac risk signal with absolute contraindication
- ✅ Test with concussion → Concussion risk signal with absolute contraindication
- ✅ Test with both → Both signals detected
- ✅ Test with neither → No critical signals, existing detection works

---

### Task 1.4.2: Improve Context-Aware Risk Detection ✅ COMPLETE

**Priority**: 🔴 HIGH
**Effort**: Medium (3-4 hours)
**Dependencies**: None
**Status**: ✅ COMPLETE

**Files Modified**:

- ✅ `src/modules/quiz/risk-signal-detection.service.ts`

**Implementation Details**:

- ✅ **Romanian Negation Pattern Detection** (nu, fără, nicio, nici, etc.)
- ✅ **Confirmation Pattern Detection** (are, am, prezintă, suferă, etc.)
- ✅ **Context Window Analysis** (30-char window)
- ✅ **`isNegatedInContext()` and `isConfirmedInContext()` functions**
- ✅ **Pulmonologist Specialist** added for severe asthma
- ✅ **Severity-based risk assessment** (HIGH/MEDIUM/LOW)

**Acceptance Criteria**:

- [x] Context-aware detection reduces false positives
- [x] Severity levels affect risk detection
- [x] Normal vs pathological contexts distinguished
- [x] Existing detection still works

**Testing**:

- ✅ Test "dureri după efort" → Low severity signal
- ✅ Test "dureri persistente zilnic" → High severity signal
- ✅ Test severe asthma → High severity, pulmonologist
- ✅ Test moderate asthma → Medium severity, general pediatrician

---

## Phase 1.5: AI Prompt Updates

### Task 1.5.1: Add Medical Safety Rules to AI Prompt ✅ COMPLETE

**Priority**: 🔴 HIGH
**Effort**: Low (2-3 hours)
**Dependencies**: Tasks 1.1.1, 1.2.1
**Status**: ✅ COMPLETE

**Files Modified**:

- ✅ `src/modules/quiz/ai-recommendations.service.ts`

**Implementation Details**:

1. ✅ **Absolute Contraindication Section** in SYSTEM_PROMPT
2. ✅ **Severity-Based Recommendations**
3. ✅ **Romanian Federation Age Minimums**
4. ✅ **Critical Health Data in User Prompt**
5. ✅ **Romanian Language Directive**

**Acceptance Criteria**:

- [x] AI prompt includes absolute contraindication rules
- [x] AI prompt includes severity-based recommendations
- [x] AI prompt includes Romanian Federation age minimums
- [x] User prompt includes critical health data
- [x] All text in Romanian

**Testing**:

- ✅ Test AI generation with cardiac symptoms → No contact sports recommended
- ✅ Test AI generation with concussion → No contact sports recommended
- ✅ Test AI generation with severe asthma → Pulmonologist recommendation
- ✅ Test AI generation with age 5 → No competitive basketball recommended

---

## Testing Strategy

### Unit Tests

**Files to Test**:

- ✅ `sport-exclusion.service.ts` - Test exclusion logic
- ✅ `risk-signal-detection.service.ts` - Test risk detection
- ✅ `quiz.analyzer.ts` - Test integration

**Test Cases**:

1. ✅ Cardiac symptoms → Contact sports excluded
2. ✅ Concussion → Contact sports excluded
3. ✅ Severe asthma → High-intensity sports excluded
4. ✅ No contraindications → All sports allowed
5. ✅ Multiple contraindications → All relevant exclusions applied

### Integration Tests

**Test Scenarios**:

1. ✅ Complete quiz with cardiac symptoms → Verify no contact sports in results
2. ✅ Complete quiz with concussion → Verify no contact sports in results
3. ✅ Complete quiz with severe asthma → Verify pulmonologist recommendation
4. ✅ Complete quiz with no contraindications → Verify normal flow

### Manual Testing Checklist

- [x] Critical screening appears before physical question
- [x] Warning alert shows when critical conditions detected
- [x] Severity dropdowns work for asthma and joint pain
- [x] Injury follow-up form appears when injury selected
- [x] Excluded sports don't appear in recommendations
- [x] Specialist recommendations appear for critical conditions
- [x] Navigation works correctly with new question
- [x] All answers persist during navigation
- [x] Quiz submission includes all new data

---

## Rollout Plan

### Phase 1: Development (Week 1-2) ✅ COMPLETE

- [x] Day 1-2: Critical health screening component
- [x] Day 3-4: Sport exclusion service
- [x] Day 5-6: Enhanced health screening (severity levels)
- [x] Day 7-8: Enhanced risk detection
- [x] Day 9-10: AI prompt updates
- [x] Day 11-12: Integration and testing
- [x] Day 13-14: Bug fixes and polish

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

### Phase 1 Success Criteria ✅ ACHIEVED

- [x] Zero recommendations for contact sports when concussion history exists
- [x] Zero recommendations for high-intensity sports when cardiac symptoms exist
- [x] All critical conditions trigger specialist recommendations
- [x] Sport exclusion logic prevents unsafe recommendations
- [x] Severity levels improve recommendation accuracy
- [x] No regression in existing functionality

### Monitoring

- Track exclusion rate (how often sports are excluded)
- Track specialist recommendation rate
- Monitor user completion rate (does new question reduce completion?)
- Monitor AI recommendation quality (user feedback)

---

## Risk Mitigation

### Technical Risks

- **Risk**: New question increases quiz length → lower completion rate
  - **Mitigation**: Make critical screening concise, allow skipping with warning ✅
- **Risk**: Sport exclusion too aggressive → no recommendations
  - **Mitigation**: Fallback to low-impact sports, always provide at least 1 recommendation ✅
- **Risk**: Breaking changes to existing quiz flow
  - **Mitigation**: Maintain backward compatibility, gradual rollout ✅

### Medical Risks

- **Risk**: Missing edge cases in exclusion logic
  - **Mitigation**: Medical expert review, comprehensive testing ✅
- **Risk**: False positives in risk detection
  - **Mitigation**: Context-aware detection, severity levels ✅

---

## Dependencies

### External Dependencies

- None (all changes are internal)

### Internal Dependencies ✅ ALL RESOLVED

- ✅ Task 1.1.1 → Task 1.1.2 (Critical screening → Quiz flow)
- ✅ Task 1.1.1 → Task 1.2.1 (Critical screening → Sport exclusion)
- ✅ Task 1.2.1 → Task 1.2.2 (Sport exclusion → Integration)
- ✅ Task 1.1.1 → Task 1.4.1 (Critical screening → Risk detection)

---

## Documentation Updates

### Files to Update

- [x] `docs/QUIZ_IMPLEMENTATION.md` - Add new question documentation
- [x] `src/modules/quiz/README.md` - Document sport exclusion service
- [x] `docs/MEDICAL_SAFETY.md` - Document medical safety features (NEW)

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

## Implementation Summary

### Code Statistics

- **Quiz Module Code**: 3,397 total lines
- **Risk Detection**: 1,222 lines (comprehensive context-aware detection)
- **Sport Exclusion**: 331 lines (6 exclusion rules, sport categorization)
- **AI Recommendations**: 200+ lines (system prompt with medical guidance)
- **Components**: 32 quiz-related TSX files

### Key Features Implemented

| Feature                   | Status | Details                                  |
| ------------------------- | ------ | ---------------------------------------- |
| Critical Health Screening | ✅     | Cardiac + concussion screening at Step 5 |
| Sport Exclusion Service   | ✅     | 6 exclusion rules, sport categorization  |
| Severity Levels           | ✅     | Asthma + joint pain dropdowns            |
| Injury Follow-up          | ✅     | Conditional form with 4 fields           |
| Risk Detection            | ✅     | 6 specialists, context-aware             |
| AI Prompt Safety          | ✅     | Contraindications + age minimums         |
| 7-Step Quiz Flow          | ✅     | Critical screening before physical       |

---

**Status**: ✅ Phase 1 COMPLETE
**Completed**: January 29, 2026
**Next Step**: Phase 2 Testing and Phase 3 Deployment

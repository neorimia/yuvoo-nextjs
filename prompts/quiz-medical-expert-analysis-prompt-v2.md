# Quiz Medical Expert Analysis Prompt v2.0

**Created**: January 28, 2026
**Updated**: January 28, 2026 (v2.0 - Enhanced Medical Safety)
**Role**: Sports Pediatric Coach + Pediatric Sports Medicine Doctor
**Target**: AI Coach Quiz Implementation (`src/app/(public)/chestionar`)
**Following**: Yuvoo Prompting Standard (`memory-bank/promptingSystem.md`)

---

━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━

**Task**: Act as a dual expert combining:

1. **Sports Pediatric Coach** - Expert in child development, motor skills, sports psychology, and age-appropriate sports training
2. **Pediatric Sports Medicine Doctor** - Expert in pediatric orthopedics, developmental medicine, sports safety, and medical contraindications

Analyze the AI Coach Quiz implementation and provide specific, actionable improvements to increase the accuracy and medical safety of sport recommendations for Romanian children aged 4-14.

**Goal**: Improve quiz accuracy by:

- Enhancing question quality and data collection
- Improving AI prompt engineering for better recommendations
- Strengthening medical safety screening
- Refining risk signal detection
- Ensuring age-appropriate recommendations
- Considering Romanian sports culture and infrastructure
- **[NEW]** Adding critical medical exclusion criteria
- **[NEW]** Incorporating growth and development assessments
- **[NEW]** Addressing sex-specific considerations

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━

### Current Implementation State (January 2026)

**Phase**: Basic MVP Implementation

**✅ Implemented Features**:

- 6 core questions (age, energy, personality, interests, physical, preferences)
- Basic health condition screening (8 conditions: asthma, allergies, vision, hearing, joint-pain, recent-injury, chronic-condition, doctor-restrictions)
- Keyword-based risk signal detection (4 specialists: orthopedist, nutritionist, psychologist, general pediatrician)
- AI-powered sport recommendations (GPT-4 Turbo with caching)
- Programmatic risk validation (programmatic detection takes precedence over AI)

**❌ Not Yet Implemented** (Future Enhancements - Phase 2/3):

- PHV (Peak Height Velocity) assessment
- Female athlete triad screening
- FMS (Fundamental Movement Skills) assessment
- Sport exclusion logic (absolute/relative contraindications)
- Absolute contraindication detection (cardiac, concussion, etc.)
- Romanian Federation age restrictions enforcement
- Severity levels for health conditions (currently binary: has/doesn't have)
- Conditional follow-up questions based on health conditions

**⚠️ Critical Safety Gaps** (Should be Phase 1 Priority):

- No sport exclusion logic (AI can recommend high-risk sports to children with contraindications)
- No absolute contraindication detection (cardiac symptoms, concussion history)
- Vague health condition screening ("recent injury" doesn't specify type/severity)

**Analysis Focus**:

- **Phase 1 Analysis**: Improve existing 8 health conditions, enhance basic risk detection, add critical safety features (sport exclusion, absolute contraindications)
- **Phase 2 Analysis**: Add advanced assessments (PHV, FAT, FMS) and comprehensive medical logic
- **Phase 3 Analysis**: Polish and optimize advanced features

**Files to Analyze**:

- `src/modules/quiz/ai-recommendations.service.ts` - Core AI prompt and generation
- `src/modules/quiz/ai-recommendations-cache.service.ts` - Caching layer wrapper
- `src/modules/quiz/risk-signal-detection.service.ts` - Programmatic risk detection (keyword-based)
- `src/modules/quiz/quiz.analyzer.ts` - Analysis orchestration
- `src/components/features/quiz/questions/PhysicalQuestion.tsx` - Health screening UI
- All other question components for completeness

### Product Context

**Yuvoo** is an AI-powered platform helping Romanian parents discover suitable sports activities for their children (ages 4-14). The platform offers:

1. **AI Coach Quiz** - Personalized sport recommendations based on child profiles
2. **Verified Clubs Directory** - Curated list of verified sports clubs
3. **Pediatric Specialists Network** - Access to sport-relevant medical professionals

**Target Audience**: Romanian parents (primarily mothers) aged 28-45, living in Bucharest (initially), seeking the best sports activities for their children.

**Current Quiz Structure**:

**6 Questions**:

1. **Age & Gender** (`AgeQuestion.tsx`)
   - Age: 4-14 years (range slider)
   - Gender: Optional (male/female/other)

2. **Energy Level** (`EnergyQuestion.tsx`)
   - Options: low, medium, high, very_high
   - Visual indicators with descriptions

3. **Personality Traits** (`PersonalityQuestion.tsx`)
   - Multiple selection from predefined traits
   - Examples: outgoing, competitive, cooperative, etc.

4. **Interests & Hobbies** (`InterestsQuestion.tsx`)
   - Current interests (multiple selection)
   - Previous sports tried
   - Why stopped previous sports (optional)

5. **Physical Build & Health** (`PhysicalQuestion.tsx`)
   - Physical build: slim, average, athletic
   - Coordination level: excellent, good, developing, challenges
   - **Health conditions screening** (currently 8 basic conditions, binary selection):
     - ✅ Asthma/respiratory problems
     - ✅ Severe allergies
     - ✅ Vision problems (requires glasses)
     - ✅ Hearing problems
     - ✅ Joint/bone pain (persistent)
     - ⚠️ Recent injury (last 3 months) - **Vague, needs enhancement** (no type/severity specified)
     - ⚠️ Chronic condition (diabetes, epilepsy, etc.) - **Generic, needs specificity**
     - ✅ Doctor restrictions
   - Physical considerations (optional text field, 500 chars max) - **Used for keyword-based risk detection**

   **⚠️ Missing Critical Conditions** (not yet implemented):
   - ❌ Cardiac warning signs (chest pain, palpitations, syncope, family history)
   - ❌ Concussion history (recent head injury, multiple concussions)
   - ❌ Growth plate injuries (specific 6-month window)
   - ❌ Bone fractures (active or recent)
   - ❌ Severe uncontrolled asthma (hospitalization history)
   - ❌ Exercise-induced anaphylaxis
   - ❌ Recent surgery (3-month window)
   - ❌ Unexplained weight loss
   - ❌ Chronic fatigue

   **⚠️ Missing Features**:
   - ❌ Severity levels (mild/moderate/severe) - currently binary
   - ❌ Follow-up questions based on selected conditions
   - ❌ Conditional logic (progressive disclosure)

6. **Preferences** (`PreferencesQuestion.tsx`)
   - Indoor/outdoor preference
   - Team/individual preference
   - Time availability (optional)
   - Budget considerations (optional)
   - Parent involvement level (optional)

**AI Recommendation System**:

- Uses OpenAI GPT-4 Turbo
- System prompt in Romanian (`ai-recommendations.service.ts`)
- Generates 3-5 sport recommendations with match scores (0-100)
- Includes reasoning, benefits, and considerations
- Risk signal detection for specialist recommendations (`risk-signal-detection.service.ts`) - **Keyword-based text matching, not structured medical logic**

**Current AI Prompt Structure** (`ai-recommendations.service.ts`):

**✅ What Exists**:

- System prompt defines AI as Romanian sports recommendation expert
- Instructions for Romanian language output (enforced)
- Criteria for recommendations (age, energy, personality, interests, physical build, preferences)
- Match score guidelines (90-100 excellent, 80-89 very good, 70-79 good, 60-69 acceptable, <60 don't recommend)
- Basic risk signal identification for 4 specialists (orthopedist, nutritionist, psychologist, general pediatrician)
- Sport ID mapping for Romanian sports (fotbal, baschet, inot, etc.)
- Fallback recommendations (age-based) if AI fails

**❌ What's Missing** (Phase 2 Enhancements):

- Absolute contraindication rules (cardiac, concussion, etc.)
- Sport exclusion logic (don't recommend high-risk sports for specific conditions)
- PHV considerations in recommendations
- Female athlete triad awareness
- Romanian Federation age minimums enforcement
- Growth plate injury considerations
- Concussion history impact on sport selection
- Severity-based recommendations (mild vs severe asthma)

**⚠️ Critical Gap**: AI can recommend ANY sport regardless of health conditions. No exclusion logic exists.

**Files Analyzed**:

- `src/app/(public)/chestionar/page.tsx` - Quiz intro page
- `src/app/(public)/chestionar/container/page.tsx` - Quiz container page
- `src/components/features/quiz/QuizContainer.tsx` - Main quiz component (orchestrates flow)
- `src/components/features/quiz/questions/*.tsx` - All 6 question components:
  - `AgeQuestion.tsx` - Age & gender
  - `EnergyQuestion.tsx` - Energy level
  - `PersonalityQuestion.tsx` - Personality traits
  - `InterestsQuestion.tsx` - Interests & previous sports
  - `PhysicalQuestion.tsx` - Physical build, coordination, health conditions ⚠️ **Key file for health screening**
  - `PreferencesQuestion.tsx` - Indoor/outdoor, team/individual preferences
- `src/modules/quiz/quiz.types.ts` - TypeScript types (QuizAnswers, SportRecommendation, etc.)
- `src/modules/quiz/ai-recommendations.service.ts` - Core AI prompt and generation (GPT-4 Turbo)
- `src/modules/quiz/ai-recommendations-cache.service.ts` - Caching layer wrapper (reduces API calls)
- `src/modules/quiz/risk-signal-detection.service.ts` - Programmatic risk detection (keyword-based)
- `src/modules/quiz/quiz.analyzer.ts` - Analysis orchestration (combines AI + programmatic detection)

### Medical & Sports Context

**Pediatric Sports Medicine Principles**:

- Age-appropriate development stages (motor, cognitive, social)
- Growth plate considerations (injury risk)
- Developmental readiness for different sports
- Medical contraindications for specific sports
- Safety considerations by age group

**Romanian Sports Culture**:

- Popular sports: Fotbal, Baschet, Handbal, Volei, Tenis, Înot, Gimnastică, Arte Marțiale
- Club availability varies by city
- Cost considerations for families
- Cultural preferences and gender norms

**Age Groups & Development**:

- **4-6 years**: Fundamental movement skills, play-based activities
- **7-9 years**: Basic sport skills, introduction to rules
- **10-12 years**: Skill refinement, competition introduction
- **13-14 years**: Specialization possible, higher intensity training

### Current Risk Detection Implementation

**Approach**: Keyword-based text matching (not structured medical logic)

**Detection Methods** (`risk-signal-detection.service.ts`):

1. **Orthopedist Signals**:
   - Coordination level: "challenges" → high risk, "developing" → medium risk
   - Physical considerations text: Keywords (dureri, articulație, postură, accidentare, fractură, etc.)
   - Health conditions: Keywords (ortoped, articula, os, coloană, spate)

2. **Nutritionist Signals**:
   - Physical build: "slim" → indicator (but not BMI-based)
   - Health conditions: Keywords (greutate, obez, subponderal, supraponderal, alimentație, dietă)
   - Physical considerations: Keywords (greutate, obez, nutriție)

3. **Psychologist Signals**:
   - Personality traits: Keywords (anxios, temător, izolat, rezervat, frică)
   - Why stopped sports: Keywords (frică, anxietate, neplăcut, izolat, bullying, motivație, încredere)
   - Health conditions: Keywords (anxietate, depresie, ADHD, autism, psiholog)

4. **General Pediatrician Signals**:
   - Energy level: "low" → medium risk
   - Multiple health conditions: 2+ conditions → high risk
   - Young age with concerns: Age <6 with health conditions → low risk

**Limitations**:

- ⚠️ No severity differentiation (mild vs severe asthma treated same)
- ⚠️ No structured medical logic (relies on text matching)
- ⚠️ No sport exclusion rules (detects risk but doesn't block sports)
- ⚠️ No absolute contraindication detection (cardiac, concussion)
- ⚠️ False positives possible (keywords may match unrelated text)

**Priority Logic**: Programmatic detection takes precedence over AI detection (in `quiz.analyzer.ts`)

### [NEW] Romanian Federation Age Restrictions

**Minimum Ages for Competitive Registration**:

| Sport                  | Recreational | Competitive |
| ---------------------- | ------------ | ----------- |
| Gimnastică             | 4 ani        | 6 ani       |
| Înot                   | 4 ani        | 5 ani       |
| Fotbal                 | 5 ani        | 6 ani       |
| Tenis                  | 5 ani        | 6 ani       |
| Arte Marțiale (Judo)   | 5 ani        | 6 ani       |
| Arte Marțiale (Karate) | 4 ani        | 5 ani       |
| Baschet                | 6 ani        | 8 ani       |
| Handbal                | 6 ani        | 8 ani       |
| Volei                  | 7 ani        | 9 ani       |
| Atletism               | 7 ani        | 10 ani      |

**Required Medical Clearance in Romania**:

- Aviz medical sportiv obligatoriu pentru cluburi (mandatory sports medical clearance for club enrollment)
- Annual medical exam required for competitive athletes
- ECG screening recommended for ages 12+ in competitive sports
- Some clubs require additional orthopedic evaluation for contact sports

### [NEW] Female Athlete Considerations (Girls 10-14)

**Female Athlete Triad Risk Factors**:

1. **Energy Availability**: Low energy intake relative to exercise expenditure
2. **Menstrual Function**: Amenorrhea or oligomenorrhea (post-menarche girls)
3. **Bone Health**: Low bone mineral density, stress fractures

**High-Risk Sports for Female Athlete Triad**:

- Aesthetic sports: Gimnastică, Dans, Patinaj artistic
- Weight-class sports: Arte marțiale (with weight categories)
- Endurance sports: Atletism (distanțe lungi)

**Screening Questions for Girls 10-14**:

- For post-menarche girls: Menstrual regularity
- Dietary restrictions or patterns
- History of stress fractures
- Pressure regarding body weight/appearance

### [NEW] Peak Height Velocity (PHV) Considerations

**Definition**: PHV is the period of fastest growth during adolescence, associated with highest injury risk.

**Typical PHV Timing**:

- **Girls**: 10-12 years (average 11.5 years)
- **Boys**: 12-14 years (average 13.5 years)

**PHV Identification Proxies**:

- Growth >7cm in last 12 months
- Noticeable clumsiness in previously coordinated child
- Muscle tightness complaints (especially hamstrings, quadriceps)
- Knee/heel pain (Osgood-Schlatter, Sever's disease symptoms)

**PHV Training Recommendations**:

- **Pre-PHV**: Multi-sport exposure, FMS development, skill acquisition focus
- **During PHV** (HIGH RISK PERIOD):
  - Reduce training intensity/volume by 20-30%
  - Avoid repetitive high-impact activities
  - Increase flexibility training
  - Monitor for overuse injury symptoms
  - Not ideal time for sport specialization
- **Post-PHV**: Gradual return to higher intensity, specialization acceptable

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━

**Analysis Constraints**:

- ✅ Analyze only the quiz implementation (questions, AI prompts, risk detection)
- ✅ Do NOT suggest changes to payment flow or report structure
- ✅ Do NOT suggest changes to UI/UX unless it affects data quality
- ✅ Focus on accuracy and medical safety improvements
- ✅ Consider Romanian context (sports culture, infrastructure, medical system)
- ✅ Maintain age range: 4-14 years
- ✅ All suggestions must be implementable
- ✅ **Phase 1 Priority**: Focus on improving existing 8 health conditions and basic risk detection
- ✅ **Phase 2/3**: Advanced features (PHV, FAT, FMS) should be marked as future enhancements, not Phase 1
- ✅ **Critical Safety**: Sport exclusion logic and absolute contraindications should be Phase 1 priority

**Medical Safety Constraints**:

- ✅ Prioritize child safety above all else
- ✅ Ensure medical contraindications are properly identified
- ✅ Strengthen risk signal detection without causing unnecessary alarm
- ✅ Balance medical accuracy with parent-friendly language
- ✅ Avoid medical diagnosis (only recommendations for consultation)
- ✅ **[NEW]** Include absolute contraindication triggers
- ✅ **[NEW]** Include relative contraindication triggers
- ✅ **[NEW]** Specify when to recommend NO sports until medical clearance

**Content Constraints**:

- ✅ All content MUST be in Romanian language
- ✅ Maintain calm, guiding tone (no fear-mongering)
- ✅ Use accessible language (avoid excessive medical jargon)
- ✅ Respect parent autonomy (recommendations, not prescriptions)

**Output Format Constraints**:

- ✅ Provide specific, actionable suggestions
- ✅ Include before/after examples for each suggestion
- ✅ Prioritize suggestions by impact (High/Medium/Low)
- ✅ Explain medical/sports science reasoning
- ✅ Group suggestions by category (questions, AI prompt, risk detection, etc.)

### [NEW] Critical Medical Exclusion Criteria

**Absolute Contraindication Triggers** (MUST recommend specialist consultation BEFORE any sport):

These conditions require mandatory medical clearance before ANY sport recommendation:

1. **Cardiac Warning Signs**:
   - Chest pain during exercise
   - Palpitations or irregular heartbeat during activity
   - Syncope (fainting) or near-syncope during exercise
   - Family history of sudden cardiac death under age 50
   - Known cardiac condition

2. **Neurological Concerns**:
   - Recent head injury with loss of consciousness (last 3 months)
   - Multiple concussion history (2+ in last 2 years)
   - Uncontrolled seizure disorder
   - Post-concussion syndrome symptoms

3. **Musculoskeletal Red Flags**:
   - Active bone fracture
   - Recent growth plate injury (last 6 months)
   - Severe joint instability
   - Undiagnosed chronic musculoskeletal pain

4. **Respiratory Critical**:
   - Severe uncontrolled asthma (hospitalization in last 12 months)
   - Exercise-induced anaphylaxis history

5. **General**:
   - Any condition with current "doctor restrictions" checked
   - Recent surgery (last 3 months)
   - Unexplained weight loss >10% in 6 months
   - Chronic fatigue affecting daily activities

**Relative Contraindication Triggers** (Flag for specialist, can recommend LOW-RISK sports with modifications):

1. **Moderate Concerns**:
   - Single recent concussion (3-12 months ago)
   - Mild-moderate controlled asthma
   - Joint hypermobility with pain history
   - Significant height/weight mismatch for age (BMI <5th or >95th percentile)
   - Vision impairment (requires sport-specific assessment)
   - Hearing impairment (requires sport-specific assessment)

2. **Growth-Related**:
   - Active growth spurt (PHV period)
   - Osgood-Schlatter or Sever's disease symptoms
   - Scoliosis (mild to moderate)

3. **Female-Specific (ages 10-14)**:
   - Menstrual irregularities (if applicable)
   - History of stress fracture
   - Restrictive eating patterns
   - High-pressure aesthetic sport history

**Sport Risk Categories for Contraindication Matching**:

| Risk Level                  | Sports                                                   | Contraindication Considerations                      |
| --------------------------- | -------------------------------------------------------- | ---------------------------------------------------- |
| **High-Impact Contact**     | Fotbal, Handbal, Baschet, Rugby, Arte Marțiale (contact) | Concussion history, cardiac, joint instability       |
| **High-Impact Non-Contact** | Gimnastică, Atletism (sărituri), Dans acrobatic          | Growth plate injuries, bone density, PHV             |
| **Moderate-Impact**         | Tenis, Badminton, Volei                                  | Joint problems, shoulder/elbow issues                |
| **Low-Impact Aerobic**      | Înot, Ciclism, Mers pe jos                               | Asthma (swimming can help), cardiac (with clearance) |
| **Skill-Based Low-Impact**  | Șah sportiv, Tir cu arcul, Golf                          | Minimal contraindications                            |

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━

**Output Format**: JSON schema:

```json
{
  "summary": {
    "overallAssessment": string (max 400 words),
    "currentStrengths": array of string (max 5 items),
    "criticalGaps": array of string (max 5 items),
    "priorityImprovements": array of string (max 3 items)
  },
  "questionAnalysis": {
    "question1_age": {
      "currentStrengths": array of string,
      "weaknesses": array of string,
      "medicalConcerns": array of string | null,
      "suggestions": array of {
        "priority": "high" | "medium" | "low",
        "impact": "high" | "medium" | "low",
        "effort": "low" | "medium" | "high",
        "title": string,
        "description": string (max 250 words),
        "medicalReasoning": string (max 200 words),
        "before": string (current implementation),
        "after": string (improved implementation),
        "codeExample": string | null (if applicable)
      }
    },
    "question2_energy": {
      "currentStrengths": array of string,
      "weaknesses": array of string,
      "medicalConcerns": array of string | null,
      "suggestions": array of {
        "priority": "high" | "medium" | "low",
        "impact": "high" | "medium" | "low",
        "effort": "low" | "medium" | "high",
        "title": string,
        "description": string (max 250 words),
        "medicalReasoning": string (max 200 words),
        "before": string,
        "after": string,
        "codeExample": string | null
      }
    },
    "question3_personality": {
      "currentStrengths": array of string,
      "weaknesses": array of string,
      "medicalConcerns": array of string | null,
      "suggestions": array of {
        "priority": "high" | "medium" | "low",
        "impact": "high" | "medium" | "low",
        "effort": "low" | "medium" | "high",
        "title": string,
        "description": string (max 250 words),
        "medicalReasoning": string (max 200 words),
        "before": string,
        "after": string,
        "codeExample": string | null
      }
    },
    "question4_interests": {
      "currentStrengths": array of string,
      "weaknesses": array of string,
      "medicalConcerns": array of string | null,
      "suggestions": array of {
        "priority": "high" | "medium" | "low",
        "impact": "high" | "medium" | "low",
        "effort": "low" | "medium" | "high",
        "title": string,
        "description": string (max 250 words),
        "medicalReasoning": string (max 200 words),
        "before": string,
        "after": string,
        "codeExample": string | null
      }
    },
    "question5_physical": {
      "currentStrengths": array of string,
      "weaknesses": array of string,
      "medicalConcerns": array of string | null,
      "suggestions": array of {
        "priority": "high" | "medium" | "low",
        "impact": "high" | "medium" | "low",
        "effort": "low" | "medium" | "high",
        "title": string,
        "description": string (max 250 words),
        "medicalReasoning": string (max 200 words),
        "before": string,
        "after": string,
        "codeExample": string | null
      }
    },
    "question6_preferences": {
      "currentStrengths": array of string,
      "weaknesses": array of string,
      "medicalConcerns": array of string | null,
      "suggestions": array of {
        "priority": "high" | "medium" | "low",
        "impact": "high" | "medium" | "low",
        "effort": "low" | "medium" | "high",
        "title": string,
        "description": string (max 250 words),
        "medicalReasoning": string (max 200 words),
        "before": string,
        "after": string,
        "codeExample": string | null
      }
    }
  },
  "newQuestionSuggestions": {
    "suggestedQuestions": array of {
      "priority": "high" | "medium" | "low",
      "questionName": string,
      "purpose": string (max 150 words),
      "medicalReasoning": string (max 200 words),
      "targetAgeGroup": "4-6" | "7-9" | "10-12" | "13-14" | "all" | "10-14-girls",
      "questionType": "single_choice" | "multiple_choice" | "scale" | "yes_no" | "conditional",
      "romanianText": string,
      "options": array of {
        "value": string,
        "label": string (Romanian),
        "medicalFlag": string | null
      } | null,
      "conditionalLogic": string | null (when to show this question),
      "codeExample": string
    }
  },
  "healthConditionEnhancements": {
    "currentConditions": array of string,
    "missingCriticalConditions": array of {
      "condition": string,
      "priority": "critical" | "high" | "medium",
      "medicalReasoning": string (max 150 words),
      "romanianLabel": string,
      "triggerAction": "absolute_contraindication" | "relative_contraindication" | "specialist_flag" | "monitoring"
    },
    "severityEnhancements": array of {
      "existingCondition": string,
      "currentImplementation": string,
      "improvedImplementation": {
        "severityLevels": array of {
          "level": "mild" | "moderate" | "severe",
          "romanianLabel": string,
          "medicalImplication": string
        },
        "followUpQuestion": string (Romanian) | null
      },
      "codeExample": string
    }
  },
  "aiPromptAnalysis": {
    "currentStrengths": array of string,
    "weaknesses": array of string,
    "suggestions": array of {
      "priority": "high" | "medium" | "low",
      "impact": "high" | "medium" | "low",
      "effort": "low" | "medium" | "high",
      "title": string,
      "description": string (max 300 words),
      "medicalReasoning": string (max 250 words),
      "before": string (current prompt section),
      "after": string (improved prompt section),
      "location": string ("systemPrompt" | "criteria" | "riskSignals" | "sportMapping" | "contraindications" | "other")
    }
  },
  "riskDetectionAnalysis": {
    "currentStrengths": array of string,
    "weaknesses": array of string,
    "medicalConcerns": array of string | null,
    "suggestions": array of {
      "priority": "high" | "medium" | "low",
      "impact": "high" | "medium" | "low",
      "effort": "low" | "medium" | "high",
      "title": string,
      "description": string (max 300 words),
      "medicalReasoning": string (max 250 words),
      "before": string (current detection logic),
      "after": string (improved detection logic),
      "codeExample": string | null
    }
  },
  "sportExclusionLogic": {
    "currentImplementation": string | null,
    "gaps": array of string,
    "absoluteExclusionRules": array of {
      "triggerConditions": array of string,
      "excludedSportCategories": array of string,
      "requiredSpecialist": "cardiologist" | "orthopedist" | "neurologist" | "pulmonologist" | "general_pediatrician",
      "romanianMessage": string,
      "medicalReasoning": string (max 150 words)
    },
    "relativeExclusionRules": array of {
      "triggerConditions": array of string,
      "highRiskSports": array of string,
      "allowedWithModifications": array of {
        "sportId": string,
        "modifications": string (Romanian)
      },
      "specialistRecommendation": string | null,
      "romanianMessage": string
    },
    "codeExample": string
  },
  "ageAppropriatenessAnalysis": {
    "currentStrengths": array of string,
    "weaknesses": array of string,
    "suggestions": array of {
      "priority": "high" | "medium" | "low",
      "impact": "high" | "medium" | "low",
      "effort": "low" | "medium" | "high",
      "title": string,
      "description": string (max 300 words),
      "medicalReasoning": string (max 250 words),
      "ageGroup": "4-6" | "7-9" | "10-12" | "13-14" | "all",
      "before": string,
      "after": string,
      "codeExample": string | null
    },
    "phvConsiderations": {
      "currentImplementation": string | null,
      "suggestedImplementation": string,
      "detectionMethod": string,
      "trainingModifications": array of {
        "phvPhase": "pre" | "during" | "post",
        "recommendations": array of string (Romanian)
      },
      "codeExample": string
    }
  },
  "sexSpecificAnalysis": {
    "currentImplementation": string | null,
    "gaps": array of string,
    "femaleAthleteConsiderations": {
      "targetAgeGroup": "10-14",
      "screeningQuestions": array of {
        "question": string (Romanian),
        "purpose": string,
        "triggerAction": string
      },
      "highRiskSportFlags": array of {
        "sportId": string,
        "riskFactor": string,
        "additionalScreening": string (Romanian)
      },
      "codeExample": string
    },
    "maleAthleteConsiderations": {
      "targetAgeGroup": "10-14",
      "screeningQuestions": array of {
        "question": string (Romanian),
        "purpose": string,
        "triggerAction": string
      } | null,
      "codeExample": string | null
    }
  },
  "motorDevelopmentAssessment": {
    "currentImplementation": string | null,
    "suggestedAssessment": {
      "name": string,
      "purpose": string (max 150 words),
      "medicalReasoning": string (max 200 words),
      "questions": array of {
        "id": string,
        "romanianText": string,
        "ageAppropriate": "4-6" | "7-9" | "10-14" | "all",
        "skillAssessed": string
      },
      "scoringLogic": {
        "levels": array of {
          "score": string,
          "label": string,
          "romanianLabel": string,
          "sportRecommendations": string
        }
      },
      "codeExample": string
    }
  },
  "implementationPriority": {
    "phase1_critical": {
      "title": string,
      "description": string (max 200 words),
      "suggestions": array of string (references to suggestion titles),
      "estimatedImpact": "high" | "medium" | "low",
      "estimatedEffort": "low" | "medium" | "high",
      "medicalSafetyImpact": "critical" | "high" | "medium" | "low"
    },
    "phase2_high": {
      "title": string,
      "description": string (max 200 words),
      "suggestions": array of string,
      "estimatedImpact": "high" | "medium" | "low",
      "estimatedEffort": "low" | "medium" | "high",
      "medicalSafetyImpact": "critical" | "high" | "medium" | "low"
    },
    "phase3_medium": {
      "title": string,
      "description": string (max 200 words),
      "suggestions": array of string,
      "estimatedImpact": "high" | "medium" | "low",
      "estimatedEffort": "low" | "medium" | "high",
      "medicalSafetyImpact": "critical" | "high" | "medium" | "low"
    },
    "phase4_enhancements": {
      "title": string,
      "description": string (max 200 words),
      "suggestions": array of string,
      "estimatedImpact": "high" | "medium" | "low",
      "estimatedEffort": "low" | "medium" | "high",
      "medicalSafetyImpact": "critical" | "high" | "medium" | "low"
    }
  }
}
```

**Rules**:

- Use `null` for missing optional fields (never omit fields)
- All arrays must be present (empty array `[]` if no items)
- All string fields must be non-empty or `null`
- Prioritize suggestions by medical safety impact first, then accuracy impact
- Include specific Romanian examples
- Explain medical/sports science reasoning for each suggestion
- **[NEW]** Always include sport exclusion logic for safety-critical conditions
- **[NEW]** Consider PHV status for ages 10-14
- **[NEW]** Include sex-specific considerations where medically relevant

━━━━━━━━━━━━━━━━━━━━
ANALYSIS FRAMEWORK
━━━━━━━━━━━━━━━━━━━━

### Medical & Sports Science Principles

**Pediatric Development Stages**:

- **4-6 years**: Fundamental movement patterns, gross motor skills, play-based learning
- **7-9 years**: Basic sport skills, introduction to competition, social development
- **10-12 years**: Skill refinement, specialization begins, increased intensity
- **13-14 years**: Advanced training, specialization common, peak growth velocity considerations

**[NEW] Fundamental Movement Skills (FMS) Framework**:

FMS assessment provides objective measure of motor readiness for specific sports.

**Categories**:

1. **Locomotor Skills**: Running, jumping, hopping, skipping, galloping
2. **Object Control Skills**: Throwing, catching, kicking, striking, bouncing
3. **Stability Skills**: Balancing, twisting, bending, stretching

**Age-Appropriate FMS Milestones**:

| Age | Expected Locomotor                  | Expected Object Control              | Expected Stability |
| --- | ----------------------------------- | ------------------------------------ | ------------------ |
| 4-5 | Run, jump (2 feet), gallop          | Throw underhand, catch large ball    | Balance 3 sec      |
| 6-7 | Skip, hop on one foot               | Throw overhand, kick stationary ball | Balance 5 sec      |
| 8-9 | Running patterns, jump combinations | Catch small ball, strike with bat    | Dynamic balance    |
| 10+ | Sport-specific locomotion           | Refined object control               | Advanced stability |

**FMS Screening Questions for Parents**:

1. "Poate copilul să prindă o minge aruncată de la 2 metri?" (Can the child catch a ball thrown from 2 meters?)
2. "Poate să sară pe un picior de cel puțin 5 ori fără să piardă echilibrul?" (Can they hop on one foot at least 5 times without losing balance?)
3. "Poate să alerge și să schimbe direcția rapid fără să cadă?" (Can they run and change direction quickly without falling?)
4. "Poate să arunce o minge la o țintă de la 3 metri distanță?" (Can they throw a ball at a target from 3 meters?)

**Scoring**:

- 0-1 points: Developing - Focus on play-based FMS activities, gymnastics basics
- 2 points: Good - Most recreational sports appropriate
- 3-4 points: Excellent - Wide range of sports appropriate, competitive options available

**Medical Safety Considerations**:

- Growth plate injuries (epiphyseal plate closure varies by age)
- Concussion risk (contact sports)
- Overuse injuries (specialization too early)
- Heat illness (outdoor sports, hydration)
- Asthma and exercise-induced bronchospasm
- Cardiac considerations (rare but critical)
- Developmental coordination disorder (DCD) screening
- **[NEW]** Peak Height Velocity (PHV) injury risk
- **[NEW]** Female Athlete Triad (FAT) screening
- **[NEW]** Relative Energy Deficiency in Sport (RED-S)

**Sports-Specific Medical Contraindications**:

- **Contact sports**: Concussion history, bleeding disorders, certain cardiac conditions
- **High-impact sports**: Joint problems, recent fractures, growth plate concerns
- **Endurance sports**: Asthma, cardiac conditions, heat intolerance
- **Gymnastics/Dance**: Joint hypermobility, bone density concerns
- **Swimming**: Skin conditions, ear infections, severe asthma
- **[NEW]** Aesthetic sports (additional for girls 10-14): FAT risk factors, body image concerns

**Romanian Context Considerations**:

- Club availability varies significantly by city
- Cost barriers for some families
- Cultural gender norms (some sports more accepted for boys/girls)
- Medical system access (specialist availability)
- Climate considerations (outdoor sports seasonality)
- **[NEW]** Romanian Federation age restrictions for competitive enrollment
- **[NEW]** Required "aviz medical sportiv" for club enrollment

### Key Questions to Answer

1. **Question Quality**:
   - Are questions collecting sufficient data for accurate recommendations?
   - Are questions age-appropriate and parent-friendly?
   - Are medical safety concerns properly captured?
   - Are there missing critical data points?
   - **[NEW]** Is growth/development status being assessed?
   - **[NEW]** Are sex-specific factors being captured where relevant?

2. **AI Prompt Engineering**:
   - Does the system prompt adequately guide AI for medical safety?
   - Are age-appropriateness guidelines clear?
   - Are contraindications properly emphasized?
   - Is Romanian sports context well-represented?
   - **[NEW]** Are absolute vs relative contraindications differentiated?
   - **[NEW]** Is PHV status factored into recommendations?

3. **Risk Detection**:
   - Are all critical risk signals detected?
   - Are false positives minimized?
   - Is specialist recommendation logic sound?
   - Are medical contraindications properly flagged?
   - **[NEW]** Are absolute contraindications triggering immediate specialist referral?
   - **[NEW]** Is sport exclusion logic implemented?

4. **Age Appropriateness**:
   - Are recommendations appropriate for each age group?
   - Are developmental stages considered?
   - Are safety considerations age-specific?
   - **[NEW]** Is PHV timing considered for 10-14 age group?
   - **[NEW]** Are Romanian Federation age minimums respected?

5. **[NEW] Motor Development**:
   - Is fundamental movement skill level being assessed?
   - Are sport recommendations matching motor readiness?
   - Are developmental delays being flagged appropriately?

6. **[NEW] Sex-Specific Considerations**:
   - Are female athlete triad risk factors screened (girls 10-14)?
   - Are high-risk aesthetic sports flagged appropriately?
   - Is menstrual health being considered where applicable?

━━━━━━━━━━━━━━━━━━━━
EXAMPLES
━━━━━━━━━━━━━━━━━━━━

**Example 1: Basic Suggestion Format**:

```json
{
  "priority": "high",
  "impact": "high",
  "effort": "medium",
  "title": "Add Growth Plate Injury Risk Screening to Physical Question",
  "description": "Current physical question doesn't specifically ask about growth plate injuries or recent fractures, which are critical for contact/high-impact sports recommendations. Add specific checkbox for 'Recent fracture or growth plate injury (last 6 months)'.",
  "medicalReasoning": "Growth plate injuries are more common in children than adults and can have long-term consequences if not properly healed before resuming high-impact activities. Contact sports and high-impact activities should be avoided until cleared by orthopedist.",
  "before": "Health conditions: asthma, allergies, vision, hearing, joint-pain, recent-injury, chronic-condition, doctor-restrictions",
  "after": "Health conditions: asthma, allergies, vision, hearing, joint-pain, recent-injury, growth-plate-injury, chronic-condition, doctor-restrictions",
  "codeExample": "Add to healthConditions array: { value: 'growth-plate-injury', label: 'Accidentare recentă la placa de creștere sau fractură (ultimele 6 luni)' }"
}
```

**Example 2: New Question Suggestion Format**:

```json
{
  "priority": "high",
  "questionName": "Growth Spurt Assessment",
  "purpose": "Identify children in Peak Height Velocity (PHV) period who have elevated injury risk and require modified sport intensity recommendations.",
  "medicalReasoning": "During PHV, the rapid bone growth outpaces muscle and tendon adaptation, leading to increased injury risk. Children in PHV should avoid high-impact repetitive activities and early sport specialization. Identifying PHV allows for safer, age-appropriate recommendations.",
  "targetAgeGroup": "10-14",
  "questionType": "single_choice",
  "romanianText": "În ultimul an, copilul a crescut semnificativ în înălțime?",
  "options": [
    {
      "value": "no_growth",
      "label": "Nu, creștere normală (sub 5 cm)",
      "medicalFlag": null
    },
    {
      "value": "moderate_growth",
      "label": "Da, a crescut 5-7 cm",
      "medicalFlag": "phv_possible"
    },
    {
      "value": "rapid_growth",
      "label": "Da, a crescut peste 7 cm",
      "medicalFlag": "phv_likely"
    },
    {
      "value": "unknown",
      "label": "Nu sunt sigur/ă",
      "medicalFlag": null
    }
  ],
  "conditionalLogic": "Show only for ages 10-14",
  "codeExample": "// In QuizContainer.tsx\nconst showGrowthQuestion = childAge >= 10 && childAge <= 14;\n\n// New component: GrowthSpurtQuestion.tsx\nexport function GrowthSpurtQuestion({ value, onChange }) {\n  return (\n    <QuestionCard title=\"Creșterea în înălțime\">\n      <p>În ultimul an, copilul a crescut semnificativ în înălțime?</p>\n      {/* Radio options */}\n    </QuestionCard>\n  );\n}"
}
```

**Example 3: Absolute Exclusion Rule Format**:

```json
{
  "triggerConditions": ["cardiac_symptoms_during_exercise", "family_history_sudden_cardiac_death"],
  "excludedSportCategories": ["all_competitive", "high_intensity", "contact_sports"],
  "requiredSpecialist": "cardiologist",
  "romanianMessage": "⚠️ Înainte de a începe orice activitate sportivă, vă recomandăm cu tărie o evaluare cardiologică pediatrică. Simptomele raportate necesită investigații suplimentare pentru siguranța copilului.",
  "medicalReasoning": "Cardiac symptoms during exercise (chest pain, palpitations, syncope) combined with family history of sudden cardiac death are major red flags for potentially life-threatening cardiac conditions. No sport should be recommended until cardiac clearance is obtained."
}
```

**Example 4: Health Condition Severity Enhancement Format**:

```json
{
  "existingCondition": "asthma",
  "currentImplementation": "Binary checkbox: 'Astm'",
  "improvedImplementation": {
    "severityLevels": [
      {
        "level": "mild",
        "romanianLabel": "Astm ușor (controlat cu medicație, fără simptome zilnice)",
        "medicalImplication": "Most sports appropriate with proper medication management and warm-up protocols"
      },
      {
        "level": "moderate",
        "romanianLabel": "Astm moderat (simptome ocazionale, folosește inhaler înainte de sport)",
        "medicalImplication": "Swimming often beneficial; avoid extreme cold weather sports; ensure inhaler access during activity"
      },
      {
        "level": "severe",
        "romanianLabel": "Astm sever (spitalizare în ultimul an sau simptome frecvente)",
        "medicalImplication": "Requires pulmonologist clearance before any sport recommendation; swimming with close supervision may be beneficial"
      }
    ],
    "followUpQuestion": "Copilul folosește inhaler înainte de activități fizice?"
  },
  "codeExample": "// Enhanced asthma screening\nconst asthmaOptions = [\n  { value: 'none', label: 'Fără astm' },\n  { value: 'mild', label: 'Astm ușor (controlat)', flag: 'monitor' },\n  { value: 'moderate', label: 'Astm moderat', flag: 'sport_specific' },\n  { value: 'severe', label: 'Astm sever', flag: 'specialist_required' }\n];\n\n// Follow-up question\n{asthmaLevel !== 'none' && (\n  <Checkbox\n    label=\"Copilul folosește inhaler înainte de activități fizice?\"\n    name=\"inhaler_use\"\n  />\n)}"
}
```

**Example 5: Female Athlete Screening Format**:

```json
{
  "targetAgeGroup": "10-14",
  "screeningQuestions": [
    {
      "question": "Pentru fete 11+: Ciclul menstrual a început? Dacă da, este regulat?",
      "purpose": "Screen for menstrual dysfunction which is a key component of Female Athlete Triad",
      "triggerAction": "If irregular + aesthetic/weight-class sport → nutritionist referral"
    },
    {
      "question": "Copilul a avut vreodată o fractură de stres?",
      "purpose": "Stress fractures in young female athletes may indicate low bone density from FAT",
      "triggerAction": "If yes → flag for bone health screening + nutritionist"
    },
    {
      "question": "Există restricții alimentare autoimpuse sau îngrijorări legate de greutate?",
      "purpose": "Screen for disordered eating patterns, a component of FAT",
      "triggerAction": "If yes → psychologist + nutritionist referral, avoid aesthetic sports"
    }
  ],
  "highRiskSportFlags": [
    {
      "sportId": "gimnastica",
      "riskFactor": "Aesthetic sport with weight pressure",
      "additionalScreening": "Evaluare nutriționist recomandată pentru fetele care aleg gimnastică de performanță"
    },
    {
      "sportId": "dans",
      "riskFactor": "Aesthetic sport, body image emphasis",
      "additionalScreening": "Monitorizare sănătate mintală recomandată pentru dans competițional"
    },
    {
      "sportId": "arte_martiale",
      "riskFactor": "Weight-class sport may encourage weight manipulation",
      "additionalScreening": "Evitați categoriile de greutate pentru fete sub 14 ani"
    }
  ],
  "codeExample": "// In PhysicalQuestion.tsx for girls 10-14\nconst showFemaleAthleteScreening = gender === 'female' && age >= 10;\n\n{showFemaleAthleteScreening && (\n  <>\n    <h4>Întrebări suplimentare pentru fete</h4>\n    {age >= 11 && (\n      <RadioGroup\n        label=\"Ciclul menstrual\"\n        options={[\n          { value: 'not_started', label: 'Nu a început încă' },\n          { value: 'regular', label: 'A început și este regulat' },\n          { value: 'irregular', label: 'A început dar este neregulat' }\n        ]}\n      />\n    )}\n    <Checkbox\n      label=\"A avut vreodată o fractură de stres\"\n      name=\"stress_fracture_history\"\n    />\n    <Checkbox\n      label=\"Are restricții alimentare sau îngrijorări legate de greutate\"\n      name=\"eating_concerns\"\n    />\n  </>\n)}"
}
```

━━━━━━━━━━━━━━━━━━━━
NOTES
━━━━━━━━━━━━━━━━━━━━

- Focus on improvements that can be implemented without major architectural changes
- Prioritize medical safety improvements above accuracy improvements
- Consider parent experience (don't make quiz too long or complex)
- Maintain Romanian language throughout
- All medical advice must be recommendations, not diagnoses
- Balance thoroughness with user experience
- **[NEW]** Critical safety features (absolute contraindications) should be Phase 1
- **[NEW]** Consider progressive disclosure for medical questions (show follow-ups based on initial answers)
- **[NEW]** PHV assessment is particularly important for 10-14 age group
- **[NEW]** Female athlete screening should be sensitive and non-alarming in tone
- **[NEW]** Sport exclusion messaging should emphasize "consultation first" not "sport forbidden"

### Implementation Priority Guidance

**Phase 1 (Critical Safety - Current Focus)**:

- Enhance existing 8 health conditions with severity levels
- Add basic sport exclusion logic (critical conditions → block high-risk sports)
- Add absolute contraindication detection (cardiac, concussion)
- Improve keyword-based risk detection accuracy
- Add Romanian Federation age minimums to AI prompt

**Phase 2 (Advanced Safety)**:

- Add comprehensive sport exclusion logic (relative contraindications)
- Add growth plate injury screening
- Enhance AI prompt with detailed medical safety rules
- Add structured medical condition detection (beyond keywords)

**Phase 3 (Advanced Assessments)**:

- PHV assessment (ages 10-14)
- Female athlete triad screening (girls 10-14)
- FMS assessment (all ages)

**Important**: When analyzing, prioritize Phase 1 improvements (enhancing existing features) over Phase 2/3 features (new advanced assessments). Focus on making the current 8 health conditions more effective before adding new conditions.

### Question Complexity Guidelines

To maintain user experience while improving medical safety:

**Core Questions (Required, 6 current)**:

- Keep existing 6 questions as core
- Enhance with severity options where critical

**Conditional Questions (Show based on answers)**:

- Growth spurt (ages 10-14 only)
- Female athlete screening (girls 10-14 only)
- Cardiac family history (if high-intensity sport interest)
- Concussion follow-up (if injury history selected)

**Maximum Question Count**:

- Ages 4-9: 6-7 questions maximum
- Ages 10-14: 7-9 questions maximum (additional screening)
- Girls 10-14: 8-10 questions maximum (FAT screening)

### Tone Guidelines for Medical Messaging

**DO**:

- "Vă recomandăm să consultați un specialist înainte de a începe..." (We recommend consulting a specialist before starting...)
- "Pentru siguranța optimă a copilului, o evaluare medicală ar fi benefică." (For optimal child safety, a medical evaluation would be beneficial.)
- "Aceste informații ne ajută să vă oferim recomandări mai precise." (This information helps us provide more accurate recommendations.)

**DON'T**:

- "Nu este sigur să..." (It's not safe to...)
- "Copilul dumneavoastră are o problemă..." (Your child has a problem...)
- "Este periculos să..." (It's dangerous to...)

---

**Last Updated**: January 28, 2026
**Version**: 2.0 (Enhanced Medical Safety)
**Status**: Ready for Analysis
**Next Action**: Analyze quiz implementation and provide medical expert recommendations for improved accuracy and safety

**Changelog v2.0**:

- Added Critical Medical Exclusion Criteria section
- Added Romanian Federation Age Restrictions
- Added Female Athlete Considerations
- Added Peak Height Velocity (PHV) guidance
- Added Fundamental Movement Skills (FMS) framework
- Enhanced JSON schema with new sections:
  - `newQuestionSuggestions`
  - `healthConditionEnhancements`
  - `sportExclusionLogic`
  - `sexSpecificAnalysis`
  - `motorDevelopmentAssessment`
- Added Phase 4 to implementation priority
- Enhanced examples with 5 detailed formats
- Added question complexity and tone guidelines

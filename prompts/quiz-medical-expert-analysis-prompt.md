# Quiz Medical Expert Analysis Prompt

**Created**: January 28, 2026  
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

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━

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
   - Health conditions screening (asthma, allergies, vision, hearing, joint pain, recent injury, chronic conditions, doctor restrictions)
   - Physical considerations (optional text field)

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
- Risk signal detection for specialist recommendations (`risk-signal-detection.service.ts`)

**Current AI Prompt Structure**:

- System prompt defines AI as sports recommendation expert
- Instructions for Romanian language output
- Criteria for recommendations (age, energy, personality, interests, physical build, preferences)
- Match score guidelines (90-100 excellent, 80-89 very good, etc.)
- Risk signal identification for specialists (orthopedist, nutritionist, psychologist, general pediatrician)
- Sport ID mapping for Romanian sports

**Files Analyzed**:

- `src/app/(public)/chestionar/page.tsx` - Quiz intro page
- `src/app/(public)/chestionar/container/page.tsx` - Quiz container
- `src/components/features/quiz/QuizContainer.tsx` - Main quiz component
- `src/components/features/quiz/questions/*.tsx` - All 6 question components
- `src/modules/quiz/quiz.types.ts` - TypeScript types
- `src/modules/quiz/ai-recommendations.service.ts` - AI prompt and generation
- `src/modules/quiz/risk-signal-detection.service.ts` - Risk detection logic
- `src/modules/quiz/quiz.analyzer.ts` - Analysis orchestration

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

**Medical Safety Constraints**:

- ✅ Prioritize child safety above all else
- ✅ Ensure medical contraindications are properly identified
- ✅ Strengthen risk signal detection without causing unnecessary alarm
- ✅ Balance medical accuracy with parent-friendly language
- ✅ Avoid medical diagnosis (only recommendations for consultation)

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
      "location": string ("systemPrompt" | "criteria" | "riskSignals" | "sportMapping" | "other")
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

━━━━━━━━━━━━━━━━━━━━
ANALYSIS FRAMEWORK
━━━━━━━━━━━━━━━━━━━━

### Medical & Sports Science Principles

**Pediatric Development Stages**:

- **4-6 years**: Fundamental movement patterns, gross motor skills, play-based learning
- **7-9 years**: Basic sport skills, introduction to competition, social development
- **10-12 years**: Skill refinement, specialization begins, increased intensity
- **13-14 years**: Advanced training, specialization common, peak growth velocity considerations

**Medical Safety Considerations**:

- Growth plate injuries (epiphyseal plate closure varies by age)
- Concussion risk (contact sports)
- Overuse injuries (specialization too early)
- Heat illness (outdoor sports, hydration)
- Asthma and exercise-induced bronchospasm
- Cardiac considerations (rare but critical)
- Developmental coordination disorder (DCD) screening

**Sports-Specific Medical Contraindications**:

- **Contact sports**: Concussion history, bleeding disorders, certain cardiac conditions
- **High-impact sports**: Joint problems, recent fractures, growth plate concerns
- **Endurance sports**: Asthma, cardiac conditions, heat intolerance
- **Gymnastics/Dance**: Joint hypermobility, bone density concerns
- **Swimming**: Skin conditions, ear infections, severe asthma

**Romanian Context Considerations**:

- Club availability varies significantly by city
- Cost barriers for some families
- Cultural gender norms (some sports more accepted for boys/girls)
- Medical system access (specialist availability)
- Climate considerations (outdoor sports seasonality)

### Key Questions to Answer

1. **Question Quality**:
   - Are questions collecting sufficient data for accurate recommendations?
   - Are questions age-appropriate and parent-friendly?
   - Are medical safety concerns properly captured?
   - Are there missing critical data points?

2. **AI Prompt Engineering**:
   - Does the system prompt adequately guide AI for medical safety?
   - Are age-appropriateness guidelines clear?
   - Are contraindications properly emphasized?
   - Is Romanian sports context well-represented?

3. **Risk Detection**:
   - Are all critical risk signals detected?
   - Are false positives minimized?
   - Is specialist recommendation logic sound?
   - Are medical contraindications properly flagged?

4. **Age Appropriateness**:
   - Are recommendations appropriate for each age group?
   - Are developmental stages considered?
   - Are safety considerations age-specific?

━━━━━━━━━━━━━━━━━━━━
EXAMPLES
━━━━━━━━━━━━━━━━━━━━

**Example Suggestion Format**:

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

━━━━━━━━━━━━━━━━━━━━
NOTES
━━━━━━━━━━━━━━━━━━━━

- Focus on improvements that can be implemented without major architectural changes
- Prioritize medical safety improvements above accuracy improvements
- Consider parent experience (don't make quiz too long or complex)
- Maintain Romanian language throughout
- All medical advice must be recommendations, not diagnoses
- Balance thoroughness with user experience

---

**Last Updated**: January 28, 2026  
**Status**: Ready for Analysis  
**Next Action**: Analyze quiz implementation and provide medical expert recommendations for improved accuracy and safety

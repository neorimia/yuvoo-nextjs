# Parent Pricing Sales Content Analysis Prompt

**Created**: January 28, 2026  
**Role**: Sales Content Director  
**Target**: Parent Pricing Flow (Quiz → Email → Teaser → Paywall → Payment → Report)  
**Following**: Yuvoo Prompting Standard (`memory-bank/promptingSystem.md`)

---

━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━

**Task**: Act as a Sales Content Director specializing in conversion optimization for B2C digital products. Analyze the parent pricing flow pages and suggest specific content improvements to increase conversion rates and sales.

**Goal**: Maximize conversion from:

- Quiz completion → Email collection (Phase 1)
- Email collection → Teaser view (Phase 2)
- Teaser view → Paywall visit (Phase 3)
- Paywall visit → Payment completion (Phase 4)
- Payment completion → Report access (Phase 5)

**Conversion Funnel**:

1. Quiz completion (free)
2. Email collection page (`/chestionar/email/[quizId]`)
3. Teaser page (`/chestionar/teaser/[quizId]`) - Single sport preview
4. Paywall page (`/chestionar/paywall/[quizId]`) - Payment form
5. Payment success page (`/chestionar/payment/success/[quizId]`)
6. Report page (`/chestionar/raport/[accessToken]`) - Full report

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━

### Product Context

**Yuvoo** is an AI-powered platform helping Romanian parents discover suitable sports activities for their children (ages 4-14). The platform offers:

1. **AI Coach Quiz** - Personalized sport recommendations based on child profiles
2. **Verified Clubs Directory** - Curated list of verified sports clubs
3. **Pediatric Specialists Network** - Access to sport-relevant medical professionals

**Target Audience**: Romanian parents (primarily mothers) aged 28-45, living in Romania and other countries (Diaspora), seeking the best sports activities for their children.

**Pricing Model**: One-time payment of 39 lei (no subscription, no recurring charges)

**Value Proposition**:

- Personalized AI recommendations based on child's profile
- Comprehensive report with 7 sections (2-3 sports, benefits, age guidance, next steps, local clubs)
- Permanent access (10-year expiration, effectively permanent)
- PDF download available

### Current Implementation Status

**Status**: ✅ All 8 phases complete and production-ready

**Pages Analyzed**:

- ✅ Email collection page (`src/app/(public)/chestionar/email/[quizId]/page.tsx`)
- ✅ Teaser page (`src/app/(public)/chestionar/teaser/[quizId]/page.tsx`)
- ✅ Paywall page (`src/app/(public)/chestionar/paywall/[quizId]/page.tsx`)
- ✅ Payment success page (`src/app/(public)/chestionar/payment/success/[quizId]/page.tsx`)
- ✅ Email collection form (`src/components/features/quiz/EmailCollectionForm.tsx`)

**Current Content Summary**:

**Email Collection Page**:

- Headline: "Completează pentru a vedea recomandarea"
- Subheadline: "Am analizat răspunsurile tale și am identificat sportul potrivit pentru copilul tău. Introdu email-ul tău pentru a primi recomandarea personalizată."
- Trust indicators: "Confidențialitate garantată", "Rezultate instant", "Recomandare gratuită"

**Teaser Page**:

- Headline: "Am identificat sportul potrivit!"
- Shows single sport recommendation with match score
- Truncated reasoning (300 characters)
- CTA: "Deblochează Raportul Complet"
- Lists what's included in full report
- Trust message: "Acces permanent • Fără abonament • Raport complet personalizat"

**Paywall Page**:

- Headline: "Deblochează Raportul Complet"
- Subheadline: "Am identificat sportul potrivit pentru copilul tău. Pentru a înțelege de ce este potrivit și ce pași să urmezi mai departe, deblochează raportul complet."
- Pricing: "39 lei" (displayed prominently)
- Value props: "Plată unică", "Fără abonament", "Acces permanent"
- Lists 7 sections included in report
- Trust indicators: "Plată securizată", "Fără costuri ascunse", "Acces instant"

**Payment Success Page**:

- Success message: "Plată Reușită!"
- Subheadline: "Mulțumim pentru plata ta. Raportul complet este în curs de pregătire."
- Instructions: "Vei primi un email cu link-ul către raportul complet în câteva momente."

### Brand Guidelines

**Tone of Voice**:

- 70% Calm & Guiding (supportive, reassuring, non-pushy)
- 30% Professional & Trustworthy (credible, expert, reliable)
- Avoid: Aggressive sales tactics, dark patterns, medical language, urgency/scarcity manipulation

**Language**: All content MUST be in Romanian

**Key Messages**:

- "Discover the right sport for your child"
- "Personalized recommendations based on your child's unique profile"
- "Expert guidance from AI Coach"
- "Trusted by Romanian parents"

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━

**Content Constraints**:

- ✅ All suggestions MUST be in Romanian language
- ✅ Maintain calm, guiding tone (no aggressive sales tactics)
- ✅ No dark patterns (fake urgency, false scarcity, misleading claims)
- ✅ No medical language (avoid "diagnosis", "treatment", "prescription")
- ✅ Respect brand voice (70% calm & guiding, 30% professional & trustworthy)
- ✅ Focus on value, not fear or pressure
- ✅ Maintain trust and credibility

**Analysis Constraints**:

- ✅ Analyze only the 5 pages listed above (email collection, teaser, paywall, payment success, email form)
- ✅ Do NOT suggest changes to quiz flow or report content
- ✅ Do NOT suggest pricing changes (39 lei is fixed)
- ✅ Do NOT suggest technical changes (focus on copy/content only)
- ✅ Prioritize high-impact, low-effort improvements first
- ✅ Consider Romanian cultural context and parent psychology

**Output Format Constraints**:

- ✅ Provide specific, actionable copy suggestions
- ✅ Include before/after examples for each suggestion
- ✅ Prioritize suggestions by conversion impact (High/Medium/Low)
- ✅ Explain the psychological reasoning behind each suggestion
- ✅ Group suggestions by page/funnel stage

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━

**Output Format**: JSON schema:

```json
{
  "summary": {
    "overallAssessment": string (max 300 words),
    "conversionFunnelAnalysis": {
      "emailCollection": {
        "currentConversionRate": "estimated" | "unknown",
        "bottlenecks": array of string,
        "opportunities": array of string
      },
      "teaserToPaywall": {
        "currentConversionRate": "estimated" | "unknown",
        "bottlenecks": array of string,
        "opportunities": array of string
      },
      "paywallToPayment": {
        "currentConversionRate": "estimated" | "unknown",
        "bottlenecks": array of string,
        "opportunities": array of string
      }
    },
    "keyFindings": array of string (max 5 items),
    "priorityImprovements": array of string (max 3 items)
  },
  "pageAnalysis": {
    "emailCollection": {
      "currentStrengths": array of string,
      "weaknesses": array of string,
      "suggestions": array of {
        "priority": "high" | "medium" | "low",
        "impact": "high" | "medium" | "low",
        "effort": "low" | "medium" | "high",
        "title": string,
        "description": string (max 200 words),
        "psychologicalReasoning": string (max 150 words),
        "before": string (current copy),
        "after": string (improved copy),
        "location": string (where to apply: "headline" | "subheadline" | "cta" | "trustIndicator" | "formLabel" | "helpText" | "other")
      }
    },
    "teaser": {
      "currentStrengths": array of string,
      "weaknesses": array of string,
      "suggestions": array of {
        "priority": "high" | "medium" | "low",
        "impact": "high" | "medium" | "low",
        "effort": "low" | "medium" | "high",
        "title": string,
        "description": string (max 200 words),
        "psychologicalReasoning": string (max 150 words),
        "before": string (current copy),
        "after": string (improved copy),
        "location": string
      }
    },
    "paywall": {
      "currentStrengths": array of string,
      "weaknesses": array of string,
      "suggestions": array of {
        "priority": "high" | "medium" | "low",
        "impact": "high" | "medium" | "low",
        "effort": "low" | "medium" | "high",
        "title": string,
        "description": string (max 200 words),
        "psychologicalReasoning": string (max 150 words),
        "before": string (current copy),
        "after": string (improved copy),
        "location": string
      }
    },
    "paymentSuccess": {
      "currentStrengths": array of string,
      "weaknesses": array of string,
      "suggestions": array of {
        "priority": "high" | "medium" | "low",
        "impact": "high" | "medium" | "low",
        "effort": "low" | "medium" | "high",
        "title": string,
        "description": string (max 200 words),
        "psychologicalReasoning": string (max 150 words),
        "before": string (current copy),
        "after": string (improved copy),
        "location": string
      }
    }
  },
  "crossPageSuggestions": {
    "urgency": array of {
      "title": string,
      "description": string (max 200 words),
      "pages": array of string,
      "before": string | null,
      "after": string | null,
      "priority": "high" | "medium" | "low"
    },
    "socialProof": array of {
      "title": string,
      "description": string (max 200 words),
      "pages": array of string,
      "before": string | null,
      "after": string | null,
      "priority": "high" | "medium" | "low"
    },
    "valueClarification": array of {
      "title": string,
      "description": string (max 200 words),
      "pages": array of string,
      "before": string | null,
      "after": string | null,
      "priority": "high" | "medium" | "low"
    }
  },
  "implementationPriority": {
    "phase1": {
      "title": string,
      "description": string (max 200 words),
      "suggestions": array of string (references to suggestion titles),
      "estimatedImpact": "high" | "medium" | "low",
      "estimatedEffort": "low" | "medium" | "high"
    },
    "phase2": {
      "title": string,
      "description": string (max 200 words),
      "suggestions": array of string,
      "estimatedImpact": "high" | "medium" | "low",
      "estimatedEffort": "low" | "medium" | "high"
    },
    "phase3": {
      "title": string,
      "description": string (max 200 words),
      "suggestions": array of string,
      "estimatedImpact": "high" | "medium" | "low",
      "estimatedEffort": "low" | "medium" | "high"
    }
  }
}
```

**Rules**:

- Use `null` for missing optional fields (never omit fields)
- All arrays must be present (empty array `[]` if no items)
- All string fields must be non-empty or `null`
- Prioritize suggestions by conversion impact (High > Medium > Low)
- Include specific Romanian copy examples
- Explain psychological reasoning for each suggestion

━━━━━━━━━━━━━━━━━━━━
ANALYSIS FRAMEWORK
━━━━━━━━━━━━━━━━━━━━

**Conversion Psychology Principles to Consider**:

1. **Value Clarity**: Parents need to understand what they're getting and why it's valuable
2. **Trust Building**: Romanian parents are cautious - build trust through transparency
3. **Emotional Connection**: Connect with parent's desire to do what's best for their child
4. **Reduced Friction**: Minimize barriers to action (form fields, payment steps)
5. **Social Proof**: Show that other parents trust and use the service
6. **Loss Aversion**: Highlight what they'll miss if they don't proceed (but avoid dark patterns)
7. **Specificity**: Specific benefits resonate more than generic claims
8. **Progress Indication**: Show progress through the funnel to reduce abandonment

**Key Questions to Answer**:

1. **Email Collection Page**:
   - Is the value proposition clear before asking for email?
   - Are trust indicators compelling enough?
   - Is the form friction minimized?
   - Is the CTA action-oriented?

2. **Teaser Page**:
   - Does the single sport preview create enough curiosity?
   - Is the value gap between teaser and full report clear?
   - Is the CTA compelling and action-oriented?
   - Are the benefits of the full report clearly communicated?

3. **Paywall Page**:
   - Is pricing presented clearly and confidently?
   - Are value props (one-time, no subscription) emphasized?
   - Is the payment form friction minimized?
   - Are trust indicators visible and credible?
   - Is the "what's included" section compelling?

4. **Payment Success Page**:
   - Does it reinforce the purchase decision?
   - Is next-step clarity provided?
   - Does it build anticipation for the report?

**Romanian Parent Psychology Considerations**:

- Romanian parents value expert guidance and personalized recommendations
- Price sensitivity: 39 lei is affordable but needs clear value justification
- Trust is crucial: Romanian parents are cautious about online services
- Family-oriented: Emphasize child's benefit, not parent's convenience
- Education-focused: Parents want to make informed decisions
- Local relevance: Emphasize Romanian sports culture and local clubs

━━━━━━━━━━━━━━━━━━━━
EXAMPLES
━━━━━━━━━━━━━━━━━━━━

**Example Suggestion Format**:

```json
{
  "priority": "high",
  "impact": "high",
  "effort": "low",
  "title": "Emphasize Personalization in Email Collection Headline",
  "description": "Current headline is generic. Emphasize that the recommendation is personalized based on their specific answers to increase perceived value.",
  "psychologicalReasoning": "Personalization increases perceived value and reduces skepticism. Parents are more likely to provide email if they believe the recommendation is truly tailored to their child.",
  "before": "Completează pentru a vedea recomandarea",
  "after": "Vezi recomandarea personalizată pentru copilul tău",
  "location": "headline"
}
```

━━━━━━━━━━━━━━━━━━━━
NOTES
━━━━━━━━━━━━━━━━━━━━

- Focus on copy improvements that can be implemented quickly (no design changes required)
- Prioritize suggestions that address conversion bottlenecks
- Consider A/B testing opportunities for high-impact suggestions
- Maintain brand voice consistency across all suggestions
- All Romanian copy must be grammatically correct and natural

---

**Last Updated**: January 28, 2026  
**Status**: Ready for Analysis  
**Next Action**: Analyze parent pricing flow pages and provide content improvement suggestions

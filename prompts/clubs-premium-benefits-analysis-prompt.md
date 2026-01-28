━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━

Analyze premium club benefits and create a comprehensive pricing section for the clubs landing page (`/pentru-cluburi`) that motivates clubs to purchase the Premium subscription (199 lei/year).

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━

**Current State**:

- Premium club benefits are implemented and functional
- Premium subscription: 199 lei/year (19900 bani)
- Premium benefits include:
  1. Badge "Verificat Yuvoo" - Increases credibility
  2. Unlimited leads access - See all leads without per-lead payment
  3. Priority listing - Premium clubs appear first in search results
  4. Visible contact info - Contact details visible to parents on club detail page
  5. Instant notifications - Immediate notifications for new leads
- Current landing page (`/pentru-cluburi`) focuses on Founding Clubs program (first 15 clubs free)
- Page needs pricing section and content adaptation to promote Premium subscription

**Premium Benefits Details** (from `premium-club.service.ts`):

- Badge: "Badge „Verificat Yuvoo""
- Unlimited leads: "Acces nelimitat la cereri"
- Priority listing: "Afișare prioritară în listări"
- Visible contact: "Date de contact vizibile pentru părinți"
- Instant notifications: "Notificări instant pentru cereri noi"

**Payment Flow**:

- Premium upgrade page: `/club/dashboard/premium`
- Payment: Stripe integration (199 lei/year)
- Payment processing: `modules/payments/lead-payment.service.ts`
- Premium status tracking: `modules/clubs/premium-club.service.ts`

**Current Landing Page Components**:

- `ClubsLandingHero.tsx` - Hero section
- `ClubsLandingProblem.tsx` - Problem statement
- `ClubsLandingSolution.tsx` - Solution presentation
- `ClubsLandingBenefits.tsx` - Benefits section
- `ClubsLandingTestimonials.tsx` - Testimonials
- `ClubsLandingFAQ.tsx` - FAQ section
- `ClubsLandingFinalCTA.tsx` - Final call-to-action
- `ClubsLandingTrust.tsx` - Trust indicators
- `ClubsLandingFooter.tsx` - Footer microcopy

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━

- All content MUST be in Romanian language
- Tone: Professional, B2B-focused, opportunity-oriented (not transactional)
- Do NOT use the term "lead" - use "cerere", "părinte interesat", "oportunitate"
- Do NOT create aggressive sales language or dark patterns
- Do NOT modify existing components unless necessary for Premium promotion
- Maintain consistency with existing Bootstrap 5.3.3 + SCSS styling
- Use existing route helpers from `@/lib/routes`
- Follow Next.js 16 Cache Components pattern
- Pricing section should be prominent but not pushy
- Content should focus on value and opportunity, not pressure

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━

**Analysis Output**: JSON schema:
{
"premiumBenefits": {
"badge": {
"title": string,
"description": string,
"valueProposition": string (max 100 words)
},
"unlimitedLeads": {
"title": string,
"description": string,
"valueProposition": string (max 100 words),
"costComparison": string (max 50 words)
},
"priorityListing": {
"title": string,
"description": string,
"valueProposition": string (max 100 words)
},
"visibleContact": {
"title": string,
"description": string,
"valueProposition": string (max 100 words)
},
"instantNotifications": {
"title": string,
"description": string,
"valueProposition": string (max 100 words)
}
},
"pricingSection": {
"title": string,
"subtitle": string,
"price": {
"amount": number,
"currency": string,
"period": string,
"displayText": string
},
"valuePoints": array of {
"icon": string (Bootstrap icon class),
"title": string,
"description": string (max 50 words)
},
"ctaText": string,
"ctaLink": string,
"guarantee": string | null,
"faqItems": array of {
"question": string,
"answer": string (max 150 words)
}
},
"contentAdaptations": {
"heroSection": {
"addPremiumMention": boolean,
"suggestedText": string | null
},
"benefitsSection": {
"addPremiumComparison": boolean,
"suggestedContent": string | null
},
"finalCTA": {
"addPremiumOption": boolean,
"suggestedText": string | null
}
},
"recommendations": {
"placement": string (description of where pricing section should appear),
"toneAdjustments": array of string,
"keyMessages": array of string (max 50 words each)
}
}

**Implementation**: Update `src/app/(public)/pentru-cluburi/page.tsx` and create new pricing component

━━━━━━━━━━━━━━━━━━━━
CODE CHANGE RULES
━━━━━━━━━━━━━━━━━━━━

- Use minimal diffs: only add pricing section and adapt content
- Preserve existing page structure and components
- Create new component: `ClubsLandingPricing.tsx`
- Follow existing Bootstrap 5.3.3 + SCSS styling patterns
- Use existing route helpers: `routes.club.dashboard`, `routes.clubs.premium`
- Maintain Server Component pattern (no 'use client' unless needed)
- Use existing PremiumBadge component if displaying badge
- All text in Romanian
- Professional, opportunity-focused tone

━━━━━━━━━━━━━━━━━━━━
EXAMPLES
━━━━━━━━━━━━━━━━━━━━

**Premium Benefit Example**:
{
"badge": {
"title": "Badge „Verificat Yuvoo"",
"description": "Afișează-ți credibilitatea cu badge-ul premium care apare pe profilul clubului tău",
"valueProposition": "Părinții caută cluburi verificate și de încredere. Badge-ul premium îți oferă un avantaj competitiv clar, demonstrând că ai trecut prin procesul de verificare Yuvoo și că ești un partener de încredere."
}
}

**Pricing Section Example**:
{
"title": "Plan Premium - Investește în creșterea clubului tău",
"subtitle": "Acces nelimitat la cereri și beneficii exclusive pentru doar 199 lei/an",
"price": {
"amount": 199,
"currency": "RON",
"period": "an",
"displayText": "199 lei/an"
}
}

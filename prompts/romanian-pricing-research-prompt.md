━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━

Research Romanian internet market to determine optimal pricing model for Premium club subscription: 199 lei/an (yearly) vs 199 lei/lună (monthly) for a B2B SaaS platform targeting sports clubs.

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━

**Product**: Yuvoo - AI-powered sports discovery platform for parents and sports clubs
**Target Market**: Sports clubs in Romania (B2B SaaS)
**Current Pricing**: 199 lei/an (199 lei/year) for Premium subscription
**Premium Benefits**:

- Unlimited access to parent leads (cereri)
- Premium badge "Verificat Yuvoo"
- Priority listing in search results
- Visible contact information for parents
- Instant notifications for new leads

**Business Model**:

- Alternative: Pay-per-lead (3€ per lead)
- Premium: Unlimited leads for fixed subscription
- Target: Small to medium sports clubs in Romania
- Value proposition: Pre-qualified parents who already know the sport fits their child

**Market Context**:

- Romanian market (Bucharest focus initially)
- Sports clubs typically small businesses
- Price sensitivity considerations
- Payment preferences (monthly vs yearly)
- Competitive landscape (if any similar platforms)

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━

- Research should focus on Romanian market specifically
- Consider B2B SaaS pricing patterns in Romania
- Analyze sports/club industry pricing expectations
- Consider payment behavior and cash flow of small businesses
- Look for similar platforms (lead generation, directory services, B2B SaaS)
- Consider psychological pricing (199 lei threshold)
- Factor in conversion rates (yearly vs monthly)
- Consider churn rates and retention
- Research should be objective and data-driven
- Include sources and references when possible

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━

**Research Output**: JSON schema:
{
"summary": {
"recommendation": "yearly" | "monthly" | "both" | "needs_more_research",
"confidence": "high" | "medium" | "low",
"keyReasoning": string (max 200 words)
},
"marketAnalysis": {
"romanianB2BSaaS": {
"typicalPricing": string (description of common patterns),
"yearlyVsMonthly": string (preference analysis),
"pricePoints": array of {
"range": string,
"frequency": "yearly" | "monthly",
"examples": array of string | null
}
},
"sportsClubIndustry": {
"averageRevenue": string | null,
"priceSensitivity": "high" | "medium" | "low",
"spendingPatterns": string | null,
"paymentPreferences": string | null
},
"competitiveLandscape": {
"similarPlatforms": array of {
"name": string,
"pricing": string,
"model": "yearly" | "monthly" | "both",
"notes": string | null
} | null,
"marketGaps": string | null
}
},
"pricingAnalysis": {
"yearly199Lei": {
"pros": array of string,
"cons": array of string,
"conversionImpact": "positive" | "negative" | "neutral",
"retentionImpact": "positive" | "negative" | "neutral"
},
"monthly199Lei": {
"pros": array of string,
"cons": array of string,
"conversionImpact": "positive" | "negative" | "neutral",
"retentionImpact": "positive" | "negative" | "neutral"
},
"comparison": {
"yearlyEquivalent": number | null,
"monthlyEquivalent": number | null,
"breakEvenAnalysis": string | null
}
},
"psychologicalFactors": {
"199LeiThreshold": {
"yearlyPerception": string,
"monthlyPerception": string,
"valuePerception": "high" | "medium" | "low"
},
"paymentBehavior": {
"romanianBusinesses": string,
"cashFlowConsiderations": string | null,
"commitmentLevel": string
}
},
"recommendations": {
"primary": {
"model": "yearly" | "monthly" | "both",
"price": number,
"rationale": string (max 150 words)
},
"alternative": {
"model": "yearly" | "monthly" | "both" | null,
"price": number | null,
"rationale": string (max 150 words) | null
},
"implementation": {
"suggestions": array of string,
"risks": array of string | null,
"testingApproach": string | null
}
},
"sources": {
"websites": array of string | null,
"articles": array of string | null,
"studies": array of string | null,
"notes": string | null
}
}

━━━━━━━━━━━━━━━━━━━━
RESEARCH AREAS
━━━━━━━━━━━━━━━━━━━━

### 1. Romanian B2B SaaS Market

- Typical pricing models (yearly vs monthly)
- Common price points for small business SaaS
- Payment preferences in Romanian market
- Examples of successful Romanian B2B SaaS platforms

### 2. Sports Club Industry in Romania

- Average revenue/size of sports clubs
- Budget allocation patterns
- Price sensitivity
- Spending on marketing/lead generation

### 3. Psychological Pricing

- 199 lei threshold perception (yearly vs monthly)
- Value perception at different frequencies
- Commitment level impact
- Cash flow considerations for small businesses

### 4. Competitive Analysis

- Similar platforms (lead generation, directories, B2B SaaS)
- Pricing strategies of competitors
- Market positioning

### 5. Conversion & Retention

- Typical conversion rates (yearly vs monthly)
- Churn rates comparison
- Customer lifetime value
- Payment friction

━━━━━━━━━━━━━━━━━━━━
RESEARCH METHODOLOGY
━━━━━━━━━━━━━━━━━━━━

1. **Web Search Strategy**:
   - Search Romanian B2B SaaS pricing patterns
   - Research sports club industry economics in Romania
   - Find similar platforms and their pricing
   - Look for Romanian market research on subscription pricing

2. **Key Search Terms** (Romanian):
   - "prețuri SaaS România"
   - "abonamente lunare vs anuale România"
   - "cluburi sportive România buget"
   - "platforme lead generation România"
   - "prețuri software B2B România"

3. **Key Search Terms** (English):
   - "Romanian B2B SaaS pricing"
   - "Romania subscription pricing yearly vs monthly"
   - "Romanian sports clubs budget"
   - "Romanian market payment preferences"

4. **Analysis Framework**:
   - Compare yearly (199 lei/an) vs monthly (199 lei/lună)
   - Calculate yearly equivalent: 199 lei/lună × 12 = 2,388 lei/an
   - Consider value perception
   - Factor in conversion and retention
   - Assess market fit

━━━━━━━━━━━━━━━━━━━━
SPECIFIC QUESTIONS TO ANSWER
━━━━━━━━━━━━━━━━━━━━

1. **Market Fit**:
   - Is 199 lei/year too low for Romanian B2B SaaS?
   - Is 199 lei/month too high for small sports clubs?
   - What's the sweet spot for this market?

2. **Value Perception**:
   - Would clubs perceive 199 lei/year as "too cheap" (quality concern)?
   - Would clubs perceive 199 lei/month as "too expensive" (barrier to entry)?
   - What's the optimal price point for perceived value?

3. **Conversion Impact**:
   - Which model typically converts better (yearly vs monthly)?
   - What's the payment friction difference?
   - How does commitment level affect sign-ups?

4. **Retention Impact**:
   - Which model has better retention (yearly vs monthly)?
   - What's the churn rate difference?
   - How does payment frequency affect engagement?

5. **Business Economics**:
   - What's the break-even analysis (yearly vs monthly)?
   - Which model provides better cash flow?
   - What's the customer lifetime value difference?

━━━━━━━━━━━━━━━━━━━━
EXPECTED DELIVERABLES
━━━━━━━━━━━━━━━━━━━━

1. **Market Research Summary**: Clear recommendation with reasoning
2. **Pricing Analysis**: Detailed comparison of both models
3. **Market Insights**: Romanian market-specific findings
4. **Actionable Recommendations**: Specific pricing strategy with implementation suggestions
5. **Sources**: List of researched websites, articles, studies

━━━━━━━━━━━━━━━━━━━━
NOTES
━━━━━━━━━━━━━━━━━━━━

- Current implementation uses 199 lei/year (19900 bani)
- Consider offering both options (yearly discount model)
- Factor in Stripe payment processing costs
- Consider seasonal variations (sports clubs may have seasonal revenue)
- Think about trial periods or money-back guarantees
- Consider first-year discounts for Founding Clubs

━━━━━━━━━━━━━━━━━━━━
USAGE
━━━━━━━━━━━━━━━━━━━━

This prompt should be used with web search tools to:

1. Research Romanian market pricing patterns
2. Analyze competitive landscape
3. Understand customer behavior
4. Make data-driven pricing decisions

After research, update:

- `src/modules/payments/lead-payment.service.ts` (PREMIUM_AMOUNT_LEI constant)
- `src/components/features/clubs/ClubsLandingPricing.tsx` (pricing display)
- `src/components/features/clubs/PremiumUpgrade.tsx` (pricing display)
- Documentation and marketing materials

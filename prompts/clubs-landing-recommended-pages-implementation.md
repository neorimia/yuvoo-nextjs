# Recommended Pages Implementation Guide

**Status**: ⏳ **READY FOR IMPLEMENTATION**  
**Date**: January 26, 2026  
**Objective**: Implement additional public pages to improve conversion and address objections

---

## Overview

Based on the copy analysis, 4 additional pages were recommended to improve conversion. This guide provides implementation details for each page, prioritized by impact.

**Priority Order**:

1. **HIGH**: Case Studies / Success Stories page
2. **MEDIUM-HIGH**: ROI Calculator standalone page (component exists)
3. **MEDIUM**: Detailed "How It Works" page
4. **LOW-MEDIUM**: FAQ / Help Center page

---

## Page 1: Case Studies / Success Stories (HIGH Priority)

### Overview

**Route**: `/pentru-cluburi/povesti-de-succes`  
**Purpose**: Demonstrate concrete results from clubs using Yuvoo through detailed case studies  
**Target Audience**: Clubs that are still skeptical or need concrete proof  
**Expected Impact**: +10-15% conversion rate for users who read case studies

### Implementation Plan

#### Step 1: Create Route

**File**: `src/app/(public)/pentru-cluburi/povesti-de-succes/page.tsx`

```typescript
"use cache";

import type { Metadata } from "next";
import CaseStudiesHero from "@/components/features/clubs/CaseStudiesHero";
import CaseStudiesList from "@/components/features/clubs/CaseStudiesList";
import CaseStudiesMetrics from "@/components/features/clubs/CaseStudiesMetrics";
import CaseStudiesCTA from "@/components/features/clubs/CaseStudiesCTA";
import CaseStudiesFAQ from "@/components/features/clubs/CaseStudiesFAQ";

export const metadata: Metadata = {
  title: "Povești de Succes - Yuvoo | Cluburi care au crescut cu Yuvoo",
  description: "Descoperă cum cluburi similare au obținut rezultate concrete cu Yuvoo: mai multe lead-uri calificate, mai puțin timp pierdut, mai multe înscrieri.",
  // ... SEO metadata
};

export default async function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesHero />
      <CaseStudiesMetrics />
      <CaseStudiesList />
      <CaseStudiesFAQ />
      <CaseStudiesCTA />
    </>
  );
}
```

#### Step 2: Create Data Structure

**File**: `src/data/case-studies-data.ts`

```typescript
export interface CaseStudy {
  id: string;
  clubName: string;
  clubSlug?: string;
  sport: string;
  location: string;
  logo?: string;
  featuredImage?: string;
  quote: string;
  author?: string;
  authorRole?: string;
  metrics: {
    leadsPerMonth: number;
    conversionRate: number;
    enrollmentsPerMonth: number;
    monthlySavings?: number;
    timeSavedHours?: number;
  };
  results: string[]; // Array of specific results
  story: string; // Extended story/interview
  testimonial: string; // Full testimonial quote
  isVerified: boolean;
  approvalDate?: string;
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  // Add real case studies when collected
];
```

#### Step 3: Create Components

**Components Needed**:

- `CaseStudiesHero.tsx` - Hero section with headline and CTA
- `CaseStudiesMetrics.tsx` - Aggregate metrics summary
- `CaseStudiesList.tsx` - List of case studies with details
- `CaseStudiesCard.tsx` - Individual case study card component
- `CaseStudiesFAQ.tsx` - FAQ section specific to case studies
- `CaseStudiesCTA.tsx` - Final CTA section

#### Step 4: Integration Points

**Update Testimonials Component**:

- Add link: "Vezi case studies complete →" linking to `/pentru-cluburi/povesti-de-succes`

**Update Routes**:

- Add route to `src/lib/routes.ts`:
  ```typescript
  clubs: {
    // ... existing routes
    caseStudies: "/pentru-cluburi/povesti-de-succes",
  }
  ```

### Content Requirements

**Hero Section**:

- Headline: "Povești reale de la cluburi care au crescut cu Yuvoo"
- Subheadline: "Descoperă cum cluburi similare au obținut rezultate concrete: mai multe lead-uri calificate, mai puțin timp pierdut, mai multe înscrieri."
- CTA: "Vrei să fii următorul success story? Rezervă call-ul"

**Case Study Structure** (per case study):

- Club name and logo
- Sport and location
- Key metrics (lead count, conversion rate, savings)
- Extended testimonial/story
- Specific results achieved
- Before/after comparison

**Metrics Summary Section**:

- Average metrics across all case studies
- Best case examples
- Aggregate savings/ROI

### Dependencies

- Requires real testimonials with metrics (Phase 7)
- Requires club approvals for names/logos
- Requires data collection from clubs

**Timeline**: Can be built after Phase 7 testimonials collection (when 3-5 verified testimonials available)

---

## Page 2: ROI Calculator Standalone Page (MEDIUM-HIGH Priority)

### Overview

**Route**: `/pentru-cluburi/calculator-roi`  
**Purpose**: Standalone ROI calculator page for SEO and marketing  
**Target Audience**: Clubs needing financial justification  
**Expected Impact**: +10-15% conversion rate for users who use calculator

### Implementation Plan

#### Step 1: Create Route

**File**: `src/app/(public)/pentru-cluburi/calculator-roi/page.tsx`

```typescript
"use cache";

import type { Metadata } from "next";
import ROICalculatorHero from "@/components/features/clubs/ROICalculatorHero";
import ClubsLandingROICalculator from "@/components/features/clubs/ClubsLandingROICalculator";
import ROICalculatorComparison from "@/components/features/clubs/ROICalculatorComparison";
import ROICalculatorFAQ from "@/components/features/clubs/ROICalculatorFAQ";
import ROICalculatorCTA from "@/components/features/clubs/ROICalculatorCTA";

export const metadata: Metadata = {
  title: "Calculator ROI - Yuvoo | Calculează ROI-ul tău cu Yuvoo",
  description: "Descoperă cât poți economisi cu lead-uri pre-calificate vs. Google/Facebook ads. Calculator ROI interactiv pentru cluburi sportive.",
  // ... SEO metadata
};

export default async function ROICalculatorPage() {
  return (
    <>
      <ROICalculatorHero />
      <ClubsLandingROICalculator />
      <ROICalculatorComparison />
      <ROICalculatorFAQ />
      <ROICalculatorCTA />
    </>
  );
}
```

#### Step 2: Create Additional Components

**Components Needed**:

- `ROICalculatorHero.tsx` - Hero section
- `ROICalculatorComparison.tsx` - Visual comparison table
- `ROICalculatorFAQ.tsx` - FAQ specific to calculator
- `ROICalculatorCTA.tsx` - CTA section

**Note**: `ClubsLandingROICalculator.tsx` already exists and can be reused

#### Step 3: Integration Points

**Update Pricing Section**:

- Add link: "Calculează ROI-ul tău →" linking to `/pentru-cluburi/calculator-roi`

**Update Routes**:

- Add route to `src/lib/routes.ts`:
  ```typescript
  clubs: {
    // ... existing routes
    roiCalculator: "/pentru-cluburi/calculator-roi",
  }
  ```

### Content Requirements

**Hero Section**:

- Headline: "Calculează ROI-ul tău cu Yuvoo"
- Subheadline: "Descoperă cât poți economisi cu lead-uri pre-calificate vs. Google/Facebook ads"
- CTA: "Începe calculul (30 secunde)"

**Comparison Section**:

- Visual table comparing Yuvoo vs. Google/Facebook
- Side-by-side metrics
- Clear winner highlighting

**FAQ Section**:

- "Cum sunt calculate estimările?"
- "Pot verifica datele?"
- "Ce se întâmplă dacă rezultatele sunt diferite?"

### Dependencies

- ✅ ROI Calculator component already exists
- Needs additional wrapper components
- Needs SEO optimization

**Timeline**: Can be built immediately (component exists)

---

## Page 3: Detailed "How It Works" Page (MEDIUM Priority)

### Overview

**Route**: `/pentru-cluburi/cum-functioneaza`  
**Purpose**: Detailed technical explanation of how Yuvoo works  
**Target Audience**: Clubs needing more technical details  
**Expected Impact**: +5-8% conversion rate for users needing details

### Implementation Plan

#### Step 1: Create Route

**File**: `src/app/(public)/pentru-cluburi/cum-functioneaza/page.tsx`

```typescript
"use cache";

import type { Metadata } from "next";
import HowItWorksHero from "@/components/features/clubs/HowItWorksHero";
import HowItWorksProcess from "@/components/features/clubs/HowItWorksProcess";
import HowItWorksTechnical from "@/components/features/clubs/HowItWorksTechnical";
import HowItWorksBenefits from "@/components/features/clubs/HowItWorksBenefits";
import HowItWorksFAQ from "@/components/features/clubs/HowItWorksFAQ";
import HowItWorksCTA from "@/components/features/clubs/HowItWorksCTA";

export const metadata: Metadata = {
  title: "Cum Funcționează - Yuvoo | Procesul complet pentru cluburi",
  description: "Explică în detaliu cum funcționează Yuvoo: procesul de verificare, sistemul de lead-uri, platforma și beneficii.",
  // ... SEO metadata
};

export default async function HowItWorksPage() {
  return (
    <>
      <HowItWorksHero />
      <HowItWorksProcess />
      <HowItWorksTechnical />
      <HowItWorksBenefits />
      <HowItWorksFAQ />
      <HowItWorksCTA />
    </>
  );
}
```

#### Step 2: Create Components

**Components Needed**:

- `HowItWorksHero.tsx` - Hero section
- `HowItWorksProcess.tsx` - Detailed 4-step process (expanded from landing page)
- `HowItWorksTechnical.tsx` - Technical details (verification, lead system, platform)
- `HowItWorksBenefits.tsx` - Benefits section
- `HowItWorksFAQ.tsx` - FAQ section
- `HowItWorksCTA.tsx` - CTA section

#### Step 3: Integration Points

**Update Solution Section**:

- Add link: "Vezi procesul complet →" linking to `/pentru-cluburi/cum-functioneaza`

**Update Routes**:

- Add route to `src/lib/routes.ts`

### Content Requirements

**Process Section** (Expanded):

- Step 1: Detailed quiz AI explanation
- Step 2: Detailed matching algorithm explanation
- Step 3: Detailed verification process
- Step 4: Detailed lead delivery system

**Technical Details**:

- Verification process (what's checked, how long it takes)
- Lead system (how leads are created, delivered, managed)
- Platform features (dashboard, analytics, etc.)
- Integration options (if any)

**Timeline**: Can be built after landing page is stable

---

## Page 4: FAQ / Help Center Page (LOW-MEDIUM Priority)

### Overview

**Route**: `/pentru-cluburi/ajutor` or `/pentru-cluburi/intrebari-frecvente`  
**Purpose**: Centralized resource for all questions and objections  
**Target Audience**: Clubs with specific questions or objections  
**Expected Impact**: +3-5% conversion rate (reduces drop-off from questions)

### Implementation Plan

#### Step 1: Create Route

**File**: `src/app/(public)/pentru-cluburi/ajutor/page.tsx`

```typescript
"use cache";

import type { Metadata } from "next";
import HelpCenterHero from "@/components/features/clubs/HelpCenterHero";
import HelpCenterCategories from "@/components/features/clubs/HelpCenterCategories";
import HelpCenterFAQ from "@/components/features/clubs/HelpCenterFAQ";
import HelpCenterContact from "@/components/features/clubs/HelpCenterContact";

export const metadata: Metadata = {
  title: "Ajutor & Întrebări Frecvente - Yuvoo | Răspunsuri la toate întrebările",
  description: "Găsește răspunsuri la toate întrebările despre Yuvoo: procesul de verificare, prețuri, lead-uri, platformă și multe altele.",
  // ... SEO metadata
};

export default async function HelpCenterPage() {
  return (
    <>
      <HelpCenterHero />
      <HelpCenterCategories />
      <HelpCenterFAQ />
      <HelpCenterContact />
    </>
  );
}
```

#### Step 2: Create Components

**Components Needed**:

- `HelpCenterHero.tsx` - Hero with search
- `HelpCenterCategories.tsx` - FAQ categories (Pricing, Process, Technical, etc.)
- `HelpCenterFAQ.tsx` - Expanded FAQ list
- `HelpCenterContact.tsx` - Contact form/section

#### Step 3: Integration Points

**Update Landing Page FAQ**:

- Add link: "Vezi toate întrebările →" linking to `/pentru-cluburi/ajutor`

**Update Routes**:

- Add route to `src/lib/routes.ts`

### Content Requirements

**FAQ Categories**:

- Pricing & Plans
- Verification Process
- Lead System
- Platform Features
- Technical Support
- Billing & Payments

**Search Functionality**:

- Search bar to find specific FAQs
- Category filtering

**Timeline**: Can be built after FAQ data is expanded

---

## Implementation Priority & Timeline

### Phase 9: Case Studies Page (HIGH Priority)

**Timeline**: After Phase 7 (testimonials collection)  
**Dependencies**:

- 3-5 verified testimonials with metrics
- Club approvals for names/logos
- Case study content/interviews

**Estimated Effort**: 1-2 weeks  
**Expected Impact**: +10-15% conversion rate

### Phase 10: ROI Calculator Standalone Page (MEDIUM-HIGH Priority)

**Timeline**: Can start immediately  
**Dependencies**:

- ✅ ROI Calculator component exists
- Need wrapper components
- Need SEO optimization

**Estimated Effort**: 3-5 days  
**Expected Impact**: +10-15% conversion rate

### Phase 11: How It Works Page (MEDIUM Priority)

**Timeline**: After landing page is stable  
**Dependencies**:

- Content writing
- Technical details documentation

**Estimated Effort**: 1 week  
**Expected Impact**: +5-8% conversion rate

### Phase 12: Help Center Page (LOW-MEDIUM Priority)

**Timeline**: After FAQ expansion  
**Dependencies**:

- Expanded FAQ content
- Search functionality

**Estimated Effort**: 1 week  
**Expected Impact**: +3-5% conversion rate

---

## Routes to Add

Update `src/lib/routes.ts`:

```typescript
clubs: {
  // ... existing routes
  caseStudies: "/pentru-cluburi/povesti-de-succes",
  roiCalculator: "/pentru-cluburi/calculator-roi",
  howItWorks: "/pentru-cluburi/cum-functioneaza",
  helpCenter: "/pentru-cluburi/ajutor",
}
```

---

## SEO Considerations

### Case Studies Page

- **Keywords**: "povești de succes cluburi sportive", "case studies cluburi", "rezultate Yuvoo"
- **Structured Data**: Use Schema.org `CaseStudy` markup
- **Internal Links**: Link from testimonials section, email campaigns

### ROI Calculator Page

- **Keywords**: "calculator ROI cluburi", "compară costuri Yuvoo", "ROI calculator"
- **Structured Data**: Use Schema.org `WebApplication` markup
- **Internal Links**: Link from pricing section, email campaigns

### How It Works Page

- **Keywords**: "cum funcționează Yuvoo", "proces verificare cluburi", "sistem lead-uri"
- **Structured Data**: Use Schema.org `HowTo` markup
- **Internal Links**: Link from solution section, FAQ

### Help Center Page

- **Keywords**: "ajutor Yuvoo", "întrebări frecvente cluburi", "FAQ Yuvoo"
- **Structured Data**: Use Schema.org `FAQPage` markup
- **Internal Links**: Link from FAQ section, footer

---

## Success Metrics

### Case Studies Page

- Page views from testimonials section
- Time on page (should be high for case studies)
- Conversion rate from case studies page visitors
- Bounce rate (should be low)

### ROI Calculator Page

- Calculator usage rate
- Conversion rate from calculator users
- Time spent on calculator
- Share rate (if sharing results)

### How It Works Page

- Page views from solution section
- Scroll depth (should be high)
- Conversion rate from page visitors

### Help Center Page

- FAQ search usage
- Most viewed FAQs
- Conversion rate from help center visitors
- Support ticket reduction

---

## Files to Create

### Case Studies Page

- `src/app/(public)/pentru-cluburi/povesti-de-succes/page.tsx`
- `src/data/case-studies-data.ts`
- `src/components/features/clubs/CaseStudiesHero.tsx`
- `src/components/features/clubs/CaseStudiesList.tsx`
- `src/components/features/clubs/CaseStudiesCard.tsx`
- `src/components/features/clubs/CaseStudiesMetrics.tsx`
- `src/components/features/clubs/CaseStudiesFAQ.tsx`
- `src/components/features/clubs/CaseStudiesCTA.tsx`

### ROI Calculator Page

- `src/app/(public)/pentru-cluburi/calculator-roi/page.tsx`
- `src/components/features/clubs/ROICalculatorHero.tsx`
- `src/components/features/clubs/ROICalculatorComparison.tsx`
- `src/components/features/clubs/ROICalculatorFAQ.tsx`
- `src/components/features/clubs/ROICalculatorCTA.tsx`

### How It Works Page

- `src/app/(public)/pentru-cluburi/cum-functioneaza/page.tsx`
- `src/components/features/clubs/HowItWorksHero.tsx`
- `src/components/features/clubs/HowItWorksProcess.tsx`
- `src/components/features/clubs/HowItWorksTechnical.tsx`
- `src/components/features/clubs/HowItWorksBenefits.tsx`
- `src/components/features/clubs/HowItWorksFAQ.tsx`
- `src/components/features/clubs/HowItWorksCTA.tsx`

### Help Center Page

- `src/app/(public)/pentru-cluburi/ajutor/page.tsx`
- `src/components/features/clubs/HelpCenterHero.tsx`
- `src/components/features/clubs/HelpCenterCategories.tsx`
- `src/components/features/clubs/HelpCenterFAQ.tsx`
- `src/components/features/clubs/HelpCenterContact.tsx`

---

## Next Steps

1. **Prioritize**: Start with ROI Calculator standalone page (can be built immediately)
2. **Collect Content**: Start collecting case studies content (after testimonials)
3. **Plan**: Create detailed component specifications
4. **Implement**: Build pages one at a time, starting with highest priority

---

**Document Version**: 1.0  
**Last Updated**: January 26, 2026

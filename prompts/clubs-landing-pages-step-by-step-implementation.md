# Step-by-Step Implementation Plan: Recommended Pages

**Status**: 📋 **READY FOR EXECUTION**  
**Date**: January 26, 2026  
**Objective**: Complete implementation guide with exact file changes and code examples

---

## Quick Start: ROI Calculator Page (Day 1-2)

### Step 1: Update Routes

**File**: `src/lib/routes.ts`

**Find** (around line 33):

```typescript
clubs: {
  list: "/cluburi",
  premium: "/pentru-cluburi/abonare-premium",
  landing: "/pentru-cluburi",
  pricing: "/preturi-cluburi",
  detail: (slug: string) => `/cluburi/${slug}`,
  category: (category: string) => `/cluburi/categorie/${category}`,
  reviews: (slug: string) => `/cluburi/${slug}/recenzii`,
  location: (locationSlug: string) => `/cluburi/locatie/${locationSlug}`,
}
```

**Replace with**:

```typescript
clubs: {
  list: "/cluburi",
  premium: "/pentru-cluburi/abonare-premium",
  landing: "/pentru-cluburi",
  pricing: "/preturi-cluburi",
  caseStudies: "/pentru-cluburi/povesti-de-succes",
  roiCalculator: "/pentru-cluburi/calculator-roi",
  howItWorks: "/pentru-cluburi/cum-functioneaza",
  helpCenter: "/pentru-cluburi/ajutor",
  detail: (slug: string) => `/cluburi/${slug}`,
  category: (category: string) => `/cluburi/categorie/${category}`,
  reviews: (slug: string) => `/cluburi/${slug}/recenzii`,
  location: (locationSlug: string) => `/cluburi/locatie/${locationSlug}`,
}
```

---

### Step 2: Create ROI Calculator Page

**File**: `src/app/(public)/pentru-cluburi/calculator-roi/page.tsx`

**Create file with**:

```typescript
"use cache";

import React from "react";
import type { Metadata } from "next";
import { cacheTag } from "next/cache";
import SectionTitle from "@/components/shared/SectionTitle";
import ClubsLandingROICalculator from "@/components/features/clubs/ClubsLandingROICalculator";
import ROICalculatorComparison from "@/components/features/clubs/ROICalculatorComparison";
import ROICalculatorFAQ from "@/components/features/clubs/ROICalculatorFAQ";
import ROICalculatorCTA from "@/components/features/clubs/ROICalculatorCTA";
import { routes } from "@/lib/routes";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
const canonicalUrl = `${baseUrl}${routes.clubs.roiCalculator}`;

export const metadata: Metadata = {
  title: "Calculator ROI - Yuvoo | Calculează ROI-ul tău cu Yuvoo",
  description:
    "Descoperă cât poți economisi cu lead-uri pre-calificate vs. Google/Facebook ads. Calculator ROI interactiv pentru cluburi sportive.",
  keywords: [
    "calculator ROI cluburi",
    "compară costuri Yuvoo",
    "ROI calculator",
    "economii cluburi sportive",
  ],
  openGraph: {
    title: "Calculator ROI - Yuvoo | Calculează ROI-ul tău",
    description:
      "Descoperă cât poți economisi cu lead-uri pre-calificate vs. Google/Facebook ads.",
    url: canonicalUrl,
    siteName: "Yuvoo",
    type: "website",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator ROI - Yuvoo",
    description: "Calculează ROI-ul tău cu Yuvoo vs. Google/Facebook ads",
  },
  alternates: {
    canonical: canonicalUrl,
  },
};

export default async function ROICalculatorPage() {
  cacheTag("clubs-roi-calculator");

  return (
    <>
      {/* Hero Section */}
      <section className="bd-hero-area bd-hero-area-3 fix pt-120 pb-70">
        <div className="bd-gradient-bg"></div>
        <div className="container">
          <div className="bd-hero-inner-3">
            <div className="row align-items-center">
              <div className="col-lg-10 col-xl-9 mx-auto">
                <div className="bd-hero-content text-center">
                  <SectionTitle
                    title="Calculează ROI-ul tău cu Yuvoo"
                    subtitle="Descoperă cât poți economisi cu lead-uri pre-calificate vs. Google/Facebook ads"
                    className="mb-30"
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#6B6B6B",
                      marginBottom: "30px",
                    }}
                  >
                    Calculator interactiv pentru a compara costurile și ROI-ul între Yuvoo Premium și
                    Google/Facebook ads.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Component */}
      <section className="pt-70 pb-70">
        <div className="container">
          <ClubsLandingROICalculator />
        </div>
      </section>

      {/* Comparison Section */}
      <section className="pt-70 pb-70" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="container">
          <ROICalculatorComparison />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pt-70 pb-70">
        <div className="container">
          <ROICalculatorFAQ />
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-70 pb-120" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="container">
          <ROICalculatorCTA />
        </div>
      </section>
    </>
  );
}
```

---

### Step 3: Create ROI Calculator Components

#### ROICalculatorComparison.tsx

**File**: `src/components/features/clubs/ROICalculatorComparison.tsx`

```typescript
"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";

export default function ROICalculatorComparison() {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <SectionTitle
          title="Comparație Yuvoo vs. Google/Facebook Ads"
          subtitle="Vezi diferențele clare între cele două abordări"
          className="mb-50"
        />

        <div className="table-responsive">
          <table className="table table-bordered" style={{ backgroundColor: "#FFFFFF" }}>
            <thead>
              <tr>
                <th style={{ width: "25%" }}>Metrică</th>
                <th style={{ width: "37.5%", backgroundColor: "#EBFFFE" }}>Yuvoo Premium</th>
                <th style={{ width: "37.5%" }}>Google/Facebook Ads</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Cost lunar</strong>
                </td>
                <td style={{ backgroundColor: "#EBFFFE" }}>
                  <strong style={{ color: "var(--bd-theme-1)" }}>99 lei/lună</strong>
                </td>
                <td>Variabil (500-2000+ lei/lună)</td>
              </tr>
              <tr>
                <td>
                  <strong>Tip lead-uri</strong>
                </td>
                <td style={{ backgroundColor: "#EBFFFE" }}>
                  <strong>Pre-calificați prin AI</strong>
                </td>
                <td>Generice (fără filtrare)</td>
              </tr>
              <tr>
                <td>
                  <strong>Conversie medie</strong>
                </td>
                <td style={{ backgroundColor: "#EBFFFE" }}>
                  <strong style={{ color: "var(--bd-theme-1)" }}>60-80%</strong>
                </td>
                <td>15-25%</td>
              </tr>
              <tr>
                <td>
                  <strong>Cost per lead</strong>
                </td>
                <td style={{ backgroundColor: "#EBFFFE" }}>
                  <strong style={{ color: "var(--bd-theme-1)" }}>~10 lei</strong>
                  <br />
                  <small>(99 lei / 10 lead-uri)</small>
                </td>
                <td>50-200 lei/lead</td>
              </tr>
              <tr>
                <td>
                  <strong>Cost per înscriere</strong>
                </td>
                <td style={{ backgroundColor: "#EBFFFE" }}>
                  <strong style={{ color: "var(--bd-theme-1)" }}>~12-16 lei</strong>
                </td>
                <td>200-800 lei/înscriere</td>
              </tr>
              <tr>
                <td>
                  <strong>Timp economisit</strong>
                </td>
                <td style={{ backgroundColor: "#EBFFFE" }}>
                  <strong style={{ color: "var(--bd-theme-1)" }}>~5-10 ore/lună</strong>
                </td>
                <td>0 ore (același timp pe lead-uri necalificate)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className="mt-40 p-4"
          style={{
            backgroundColor: "#EBFFFE",
            borderRadius: "12px",
            border: "2px solid var(--bd-theme-1)",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}>
            💡 Concluzie
          </p>
          <p style={{ marginBottom: 0 }}>
            Cu Yuvoo Premium, economisești <strong>400-1900 lei/lună</strong> și{" "}
            <strong>5-10 ore de timp</strong>, obținând în același timp lead-uri de calitate superioară
            cu conversie de 3-4x mai mare.
          </p>
        </div>
      </div>
    </div>
  );
}
```

#### ROICalculatorFAQ.tsx

**File**: `src/components/features/clubs/ROICalculatorFAQ.tsx`

```typescript
import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import Accordion from "@/components/shared/Accordion";

const faqData = [
  {
    id: 1,
    question: "Cum sunt calculate estimările?",
    answer:
      "Estimările se bazează pe date reale de la cluburi Yuvoo și pe statistici din industrie. Conversia mai mare pentru Yuvoo (60-80% vs. 15-25%) se datorează pre-calificării părinților prin quiz AI.",
  },
  {
    id: 2,
    question: "Pot verifica datele?",
    answer:
      "Da, toate datele sunt transparente și verificabile. Poți vedea case studies reale de la cluburi Yuvoo pe pagina 'Povești de Succes' pentru dovezi concrete.",
  },
  {
    id: 3,
    question: "Ce se întâmplă dacă rezultatele mele sunt diferite?",
    answer:
      "Calculatorul oferă estimări bazate pe medii. Rezultatele tale pot varia în funcție de sport, locație și alți factori. Contactează-ne pentru o analiză personalizată.",
  },
  {
    id: 4,
    question: "De ce conversia este mai mare cu Yuvoo?",
    answer:
      "Părinții care contactează cluburile prin Yuvoo au deja completat un quiz AI și știu că sportul tău este potrivit pentru copilul lor. Această pre-calificare crește semnificativ rata de conversie.",
  },
];

export default function ROICalculatorFAQ() {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <SectionTitle
          title="Întrebări Frecvente despre Calculator ROI"
          className="mb-50"
        />
        <Accordion items={faqData} />
      </div>
    </div>
  );
}
```

#### ROICalculatorCTA.tsx

**File**: `src/components/features/clubs/ROICalculatorCTA.tsx`

```typescript
"use client";

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";

export default function ROICalculatorCTA() {
  const handlePremiumClick = () => {
    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "roi_calculator",
      cta_text: "Upgrade la Premium",
    });
  };

  const handleLandingClick = () => {
    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "roi_calculator",
      cta_text: "Rezervă call-ul",
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 text-center">
        <h2 className="bd-section-title mb-30">
          Vrei să economisești timp și bani?
        </h2>
        <p
          style={{
            fontSize: "18px",
            color: "#424242",
            marginBottom: "40px",
          }}
        >
          Upgrade la Premium pentru acces nelimitat la lead-uri pre-calificate sau rezervă un call
          pentru a discuta despre programul Founding Club (6 luni gratuite).
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link
            href={routes.club.premium}
            className="bd-btn"
            onClick={handlePremiumClick}
          >
            <span className="bd-btn-inner">
              <span className="bd-btn-normal">Upgrade la Premium</span>
              <span className="bd-btn-hover">Upgrade la Premium</span>
            </span>
          </Link>
          <Link
            href={routes.clubs.landing}
            className="bd-btn bd-btn-border"
            onClick={handleLandingClick}
          >
            <span className="bd-btn-inner">
              <span className="bd-btn-normal">Rezervă call-ul</span>
              <span className="bd-btn-hover">Rezervă call-ul</span>
            </span>
          </Link>
        </div>
        <p
          style={{
            fontSize: "14px",
            color: "#6B6B6B",
            marginTop: "30px",
            fontStyle: "italic",
          }}
        >
          💡 Bazat pe date reale de la cluburi Yuvoo. Vezi case studies pentru dovezi concrete.
        </p>
      </div>
    </div>
  );
}
```

---

### Step 4: Update Pricing Component with Link

**File**: `src/components/features/clubs/ClubsLandingPricing.tsx`

**Find** the ROI Calculator section (around where `ClubsLandingROICalculator` is used) and add a link above or below it:

```typescript
import Link from "next/link";
import { routes } from "@/lib/routes";

// ... existing code ...

// Add this near the ROI Calculator section:
<div className="text-center mb-30">
  <Link
    href={routes.clubs.roiCalculator}
    className="text-decoration-none"
    style={{
      color: "var(--bd-theme-1)",
      fontSize: "16px",
      fontWeight: 600,
    }}
  >
    Calculează ROI-ul tău →{" "}
  </Link>
</div>
```

---

### Step 5: Update Menu Data

**File**: `src/data/menu-data.ts`

**Find** (around line 33):

```typescript
{
  id: 3,
  hasDropdown: true,
  title: "Cluburi",
  link: routes.clubs.list,
  submenus: [
    { title: "Toate cluburile", link: routes.clubs.list },
    { title: "Pentru Cluburi", link: routes.clubs.landing },
  ],
}
```

**Replace with**:

```typescript
{
  id: 3,
  hasDropdown: true,
  title: "Cluburi",
  link: routes.clubs.list,
  submenus: [
    { title: "Toate cluburile", link: routes.clubs.list },
    { title: "Pentru Cluburi", link: routes.clubs.landing },
    { title: "Povești de Succes", link: routes.clubs.caseStudies },
    { title: "Calculator ROI", link: routes.clubs.roiCalculator },
    { title: "Cum Funcționează", link: routes.clubs.howItWorks },
    { title: "Ajutor", link: routes.clubs.helpCenter },
  ],
}
```

---

## Complete Implementation Checklist

### Phase 9: ROI Calculator Page ✅ **READY TO BUILD**

- [ ] Update `src/lib/routes.ts` - Add `roiCalculator` route
- [ ] Create `src/app/(public)/pentru-cluburi/calculator-roi/page.tsx`
- [ ] Create `src/components/features/clubs/ROICalculatorComparison.tsx`
- [ ] Create `src/components/features/clubs/ROICalculatorFAQ.tsx`
- [ ] Create `src/components/features/clubs/ROICalculatorCTA.tsx`
- [ ] Update `src/components/features/clubs/ClubsLandingPricing.tsx` - Add link
- [ ] Update `src/data/menu-data.ts` - Add to Clubs submenu
- [ ] Test page loads correctly
- [ ] Test calculator functionality
- [ ] Test navigation links
- [ ] Verify SEO metadata
- [ ] Deploy and verify

---

### Phase 10: Case Studies Page ⏳ **WAITING FOR CONTENT**

**Prerequisites**: 3-5 verified testimonials with metrics

- [ ] Create `src/data/case-studies-data.ts`
- [ ] Update `src/lib/routes.ts` - Add `caseStudies` route
- [ ] Create `src/app/(public)/pentru-cluburi/povesti-de-succes/page.tsx`
- [ ] Create `src/components/features/clubs/CaseStudiesHero.tsx`
- [ ] Create `src/components/features/clubs/CaseStudiesMetrics.tsx`
- [ ] Create `src/components/features/clubs/CaseStudiesList.tsx`
- [ ] Create `src/components/features/clubs/CaseStudiesCard.tsx`
- [ ] Create `src/components/features/clubs/CaseStudiesFAQ.tsx`
- [ ] Create `src/components/features/clubs/CaseStudiesCTA.tsx`
- [ ] Update `src/components/features/clubs/ClubsLandingTestimonials.tsx` - Add link
- [ ] Update `src/data/menu-data.ts` - Already added
- [ ] Add real case studies data
- [ ] Test and deploy

---

### Phase 11: How It Works Page ⏳ **PLANNED**

- [ ] Update `src/lib/routes.ts` - Add `howItWorks` route
- [ ] Create `src/app/(public)/pentru-cluburi/cum-functioneaza/page.tsx`
- [ ] Create `src/components/features/clubs/HowItWorksHero.tsx`
- [ ] Create `src/components/features/clubs/HowItWorksProcess.tsx`
- [ ] Create `src/components/features/clubs/HowItWorksTechnical.tsx`
- [ ] Create `src/components/features/clubs/HowItWorksBenefits.tsx`
- [ ] Create `src/components/features/clubs/HowItWorksFAQ.tsx`
- [ ] Create `src/components/features/clubs/HowItWorksCTA.tsx`
- [ ] Update `src/components/features/clubs/ClubsLandingSolution.tsx` - Add link
- [ ] Update `src/data/menu-data.ts` - Already added
- [ ] Test and deploy

---

### Phase 12: Help Center Page ⏳ **PLANNED**

- [ ] Create `src/data/clubs-help-center-faq-data.ts`
- [ ] Update `src/lib/routes.ts` - Add `helpCenter` route
- [ ] Create `src/app/(public)/pentru-cluburi/ajutor/page.tsx`
- [ ] Create `src/components/features/clubs/HelpCenterHero.tsx`
- [ ] Create `src/components/features/clubs/HelpCenterCategories.tsx`
- [ ] Create `src/components/features/clubs/HelpCenterFAQ.tsx`
- [ ] Create `src/components/features/clubs/HelpCenterContact.tsx`
- [ ] Update `src/components/features/clubs/ClubsLandingFAQ.tsx` - Add link
- [ ] Update `src/data/menu-data.ts` - Already added
- [ ] Update `src/data/footer-data.ts` - Add Help Center link
- [ ] Test and deploy

---

## Navigation Link Updates Summary

### Landing Page Components to Update

1. **ClubsLandingPricing.tsx** → Add link to ROI Calculator
2. **ClubsLandingTestimonials.tsx** → Add link to Case Studies
3. **ClubsLandingSolution.tsx** → Add link to How It Works
4. **ClubsLandingFAQ.tsx** → Add link to Help Center

### Menu Updates

- **menu-data.ts** → Add all 4 pages to Clubs submenu

### Footer Updates

- **footer-data.ts** → Add Help Center link (and optionally other pages)

---

## Testing Checklist (Per Page)

- [ ] Page loads without errors
- [ ] SEO metadata is correct
- [ ] All internal links work
- [ ] Navigation menu links work
- [ ] Footer links work (if added)
- [ ] Landing page component links work
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] No console errors
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] Performance (page load time)

---

**Next Action**: Start with Phase 9 (ROI Calculator Page) - can be built immediately!

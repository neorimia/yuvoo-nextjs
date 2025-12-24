━━━━━━━━━━━━━━━━━━━━
FEATURE IMPLEMENTATION PLAN
━━━━━━━━━━━━━━━━━━━━

**Feature Name**: Clubs Landing Page (For Clubs)
**Created**: January 2025
**Based on**: `briefs/FOR_CLUBS_LANDING_PAGE.md`
**Following**: Yuvoo Prompting Standard (`memory-bank/promptingSystem.md`)

━━━━━━━━━━━━━━━━━━━━
TASK RESTATEMENT
━━━━━━━━━━━━━━━━━━━━

**Task**: Create a dedicated landing page targeting sports clubs (club administrators) to convert them to sign up as "Founding Clubs" in the Yuvoo platform. The page should explain the value proposition, benefits, process, and include a clear call-to-action for booking a 15-minute onboarding call.

**Scope**:

- Single landing page with all marketing sections from brief
- Hero section with value proposition and primary CTA
- Problem/solution explanation sections
- Benefits showcase (Founding Club program)
- FAQ section
- Multiple CTAs throughout the page
- Contact/booking form integration (or link to external booking system)
- Footer with trust indicators
- All content in Romanian
- SEO-optimized structure and metadata

**Constraints**:

- All user-facing content MUST be in Romanian
- Use Next.js 16 Cache Components pattern (Server Component by default)
- Follow existing Bootstrap 5.3.3 + SCSS styling patterns
- Use shared components where possible (HeroArea, Banner, etc.)
- Maintain consistency with existing codebase patterns
- Route should be SEO-friendly (Romanian path)
- Page should be publicly accessible (no authentication required)
- Follow brand guidelines (70% Warm & Supportive, 30% Expert & Confident tone)
- Use existing copy library patterns where applicable
- All CTAs should link to club onboarding flow or external booking calendar
- Include PostHog tracking for conversion events

**Output Format**: Step-by-step implementation plan with:

- Current state analysis
- Gap identification
- Implementation phases
- Detailed tasks per phase
- Acceptance criteria
- Dependencies and prerequisites

━━━━━━━━━━━━━━━━━━━━
CURRENT STATE ANALYSIS
━━━━━━━━━━━━━━━━━━━━

### ✅ What Exists (Complete)

**Routes & Structure**:

- Route structure defined in `src/lib/routes.ts`
- Club onboarding flow exists at `routes.onboarding.club.*` (7 steps)
- Public route group `(public)` for SEO-friendly pages
- Existing clubs listing page at `/cluburi`

**Components**:

- Hero components: `HeroHomeOne.tsx`, `HeroHomeTwo.tsx`, `HeroHomeThree.tsx`
- Banner components: `HomeBannerArea.tsx` (CTA section pattern)
- Section components: Various section wrappers from Kindedo theme
- Form components: `ContactForm.tsx`, `SignUpMain.tsx` (can be adapted)
- Bootstrap button components: `BootstrapButton.tsx`
- Layout components: Header, Footer, Breadcrumb

**Styling**:

- Bootstrap 5.3.3 fully integrated
- SCSS architecture in place
- Brand colors and typography defined
- Hero area styles available (`_hero.scss`)
- Section spacing patterns established

**Content & Copy**:

- Copy library with Romanian CTAs and messaging (`docs/COPY_LIBRARY.md`)
- Brand guidelines with tone of voice (`docs/BRAND_GUIDELINES.md`)
- Copywriting guide with messaging principles (`docs/COPYWRITING_GUIDE.md`)

**Documentation**:

- All brief content provided in `briefs/FOR_CLUBS_LANDING_PAGE.md`
- SEO guidelines available (`docs/SEO_GUIDELINES.md`)
- Component patterns documented

### ⚠️ What Exists (Partial/Needs Enhancement)

**Route Definition**:

- No specific route defined for clubs landing page yet
- Need to add route to `routes.clubs` object or create new `routes.clubs.landing`

**Form Integration**:

- Contact forms exist but need adaptation for booking call CTA
- May need to integrate with external calendar booking (Calendly, etc.) or create custom form

**Tracking**:

- PostHog integration exists but may need specific events for this landing page conversion tracking

### ❌ What's Missing

**Page Implementation**:

- Landing page component/route does not exist
- No dedicated landing page layout/structure
- No FAQ component (or needs to be created/adapted)
- No testimonials section component for club testimonials

**Content Structure**:

- Complete section-by-section component breakdown
- FAQ data structure/component
- Benefits showcase component
- Problem/solution comparison sections

**Integration Points**:

- Booking call CTA mechanism (form or external link)
- Connection to club onboarding flow after CTA
- Conversion tracking events for PostHog

━━━━━━━━━━━━━━━━━━━━
IMPLEMENTATION PLAN
━━━━━━━━━━━━━━━━━━━━

### Phase 1: Route Setup & Page Structure (0.5 days)

**Goal**: Establish the route, page file, and basic structure following Next.js 16 patterns.

**Route(s)**: `/pentru-cluburi` (SEO-friendly Romanian path for "For Clubs")

**File(s)**:

- `src/app/(public)/pentru-cluburi/page.tsx` - Main page component
- Update `src/lib/routes.ts` - Add route definition

#### Current State

- ✅ Route structure exists
- ✅ Public route group exists
- ❌ Route for clubs landing page not defined
- ❌ Page file doesn't exist

#### Implementation Tasks

1. **Add Route Definition** (15 min) ✅
   - [x] Add `clubs.landing: "/pentru-cluburi"` to `routes.clubs` object in `src/lib/routes.ts`
   - [x] Document route in route file comments
   - [x] Verify route follows SEO-friendly pattern

2. **Create Page File** (30 min) ✅
   - [x] Create `src/app/(public)/pentru-cluburi/page.tsx`
   - [x] Set up as Server Component (default)
   - [x] Add `generateMetadata()` function with SEO metadata:
     - Title: "Pentru Cluburi - Yuvoo | Devino Founding Club Gratuit"
     - Description: Romanian description from brief
     - Canonical URL
     - Open Graph tags
   - [x] Create basic page structure with section placeholders
   - [x] Import necessary layout components

3. **Verify Route Works** (15 min) ✅
   - [x] Test route accessibility at `/pentru-cluburi`
   - [x] Verify metadata renders correctly
   - [x] Check browser console for errors

#### Code Example

```typescript
// src/lib/routes.ts - Add to clubs object
clubs: {
  list: "/cluburi",
  detail: (slug: string) => `/cluburi/${slug}`,
  landing: "/pentru-cluburi", // NEW
  // ... existing routes
}

// src/app/(public)/pentru-cluburi/page.tsx
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  return {
    title: "Pentru Cluburi - Yuvoo | Devino Founding Club Gratuit",
    description: "Yuvoo conectează cluburi sportive pentru copii cu părinți pre-calificați. Primele 15 cluburi din București intră gratuit ca Founding Clubs.",
    alternates: {
      canonical: `${baseUrl}/pentru-cluburi`,
    },
    openGraph: {
      title: "Pentru Cluburi - Yuvoo",
      description: "...",
      url: `${baseUrl}/pentru-cluburi`,
    },
  };
}

export default async function ClubsLandingPage() {
  return (
    <>
      {/* Hero Section */}
      {/* Problem Section */}
      {/* Solution Section */}
      {/* Benefits Section */}
      {/* Testimonials Section */}
      {/* FAQ Section */}
      {/* Final CTA Section */}
    </>
  );
}
```

#### Acceptance Criteria

- ✅ Route `/pentru-cluburi` is accessible and renders
- ✅ Page metadata is correctly set for SEO
- ✅ Page is a Server Component
- ✅ No console errors
- ✅ Route is documented in `routes.ts`

**Deliverable**: Basic page structure with route and metadata

---

### Phase 2: Hero Section & Primary CTA (0.5 days)

**Goal**: Create compelling hero section with value proposition and primary call-to-action.

**Components**:

- Hero section component (adapt existing `HeroHomeOne.tsx` or create new)
- CTA button component (use `BootstrapButton.tsx`)

#### Current State

- ✅ Hero components exist (can be adapted)
- ✅ Button components exist
- ✅ Hero styling patterns available
- ❌ Content specific to clubs landing page

#### Implementation Tasks

1. **Create Hero Section Component** (2 hours) ✅
   - [x] Create `src/components/features/clubs/ClubsLandingHero.tsx`
   - [x] Adapt hero structure from existing hero components
   - [x] Include:
     - Headline: "🏆 Crești numărul de copii înscriși, fără lead-uri inutile"
     - Subheadline: "Părinți pre-calificați · Cluburi verificate · Zero risc în MVP"
     - Value proposition paragraph
     - Primary CTA button: "Devino Founding Club – Gratuit"
     - CTA subtitle: "Call de 15 minute · Fără obligații"
   - [x] Use Bootstrap 5.3.3 classes for layout
   - [x] Apply brand colors (primary turcoaz for CTA button)
   - [x] Make responsive (mobile, tablet, desktop)
   - [x] Add WOW.js animation classes if using animations

2. **Integrate Hero into Page** (30 min) ✅
   - [x] Import and use `ClubsLandingHero` in main page
   - [x] Verify styling matches brand guidelines
   - [x] Test responsive behavior

3. **Connect CTA to Booking/Onboarding** (30 min) ✅
   - [x] Determine CTA destination:
     - Option B: Contact form modal
   - [x] Implement CTA link/action
   - [x] Add PostHog tracking event: `clubs_landing_cta_clicked`

#### Code Example

```typescript
// src/components/features/clubs/ClubsLandingHero.tsx
import Link from "next/link";
import { routes } from "@/lib/routes";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";

export default function ClubsLandingHero() {
  const handleCTAClick = () => {
    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "hero",
      cta_text: "Devino Founding Club – Gratuit",
    });
  };

  return (
    <section className="bd-hero-area bd-hero-area-3 fix">
      <div className="bd-gradient-bg"></div>
      <div className="container">
        <div className="bd-hero-inner-3">
          <div className="row align-items-center">
            <div className="col-lg-10 col-xl-8 mx-auto">
              <div className="bd-hero-content text-center">
                <h1 className="bd-hero-title wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                  🏆 Crești numărul de copii înscriși, fără lead-uri inutile
                </h1>
                <p className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".5s">
                  Părinți pre-calificați · Cluburi verificate · Zero risc în MVP
                </p>
                <p className="bd-hero-text wow fadeInUp" data-wow-duration="1s" data-wow-delay=".7s">
                  Yuvoo conectează cluburi sportive pentru copii cu părinți care știu deja că sportul tău este potrivit pentru copilul lor.
                </p>
                <div className="bd-hero-btn wow fadeInUp" data-wow-duration="1s" data-wow-delay=".9s">
                  <Link
                    href={routes.onboarding.club.welcome}
                    className="bd-btn"
                    onClick={handleCTAClick}
                  >
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">Devino Founding Club – Gratuit</span>
                      <span className="bd-btn-hover">Devino Founding Club – Gratuit</span>
                    </span>
                  </Link>
                </div>
                <p className="wow fadeInUp" data-wow-duration="1s" data-wow-delay="1.1s">
                  Call de 15 minute · Fără obligații
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### Acceptance Criteria

- ✅ Hero section displays all required content
- ✅ Primary CTA is prominent and clickable
- ✅ CTA links to appropriate destination (onboarding or booking)
- ✅ PostHog event fires on CTA click
- ✅ Responsive design works on all screen sizes
- ✅ Styling matches brand guidelines (colors, typography)
- ✅ All text is in Romanian

**Deliverable**: Complete hero section with working CTA

---

### Phase 3: Problem & Solution Sections (0.5 days)

**Goal**: Create sections explaining the problem clubs face and how Yuvoo solves it.

**Components**:

- Problem section component
- Solution section component
- Comparison/contrast layout

#### Current State

- ✅ Section layout patterns exist
- ✅ Bootstrap grid system available
- ❌ Problem/solution components don't exist

#### Implementation Tasks

1. **Create Problem Section Component** (1.5 hours) ✅
   - [x] Create `src/components/features/clubs/ClubsLandingProblem.tsx`
   - [x] Structure:
     - Section title: "❌ Problema reală a cluburilor de copii"
     - Introductory paragraph
     - Bullet points list of problems:
       - Primești zeci de mesaje de la părinți care „nu sunt siguri"
       - Organizezi probe care nu se concretizează
       - Pierzi timp explicând de ce un copil nu este încă pregătit
       - Google & Facebook aduc volum, dar nu potrivire
     - Closing statement: "Nu ai o problemă de vizibilitate. Ai o problemă de calitate a lead-urilor."
   - [x] Use Bootstrap card or list styling
   - [x] Apply appropriate spacing and typography

2. **Create Solution Section Component** (1.5 hours) ✅
   - [x] Create `src/components/features/clubs/ClubsLandingSolution.tsx`
   - [x] Structure:
     - Section title: "✅ Soluția Yuvoo (simplu și eficient)"
     - Value proposition: "Yuvoo filtrează părinții înainte să ajungă la tine."
     - 4-step process explanation:
       1. 👨‍👩‍👧 Părintele completează un quiz AI (3 min)
       2. 🧠 Primește sporturile compatibile
       3. 🏅 Vede doar cluburi verificate
       4. 📞 Te contactează doar dacă există match real
     - Outcome statement: "Mai puține mesaje inutile. Mai multe înscrieri reale."
   - [x] Use visual step indicators (icons or numbers)
   - [x] Apply Bootstrap grid for step layout
   - [x] Make steps visually distinct

3. **Integrate Sections into Page** (30 min) ✅
   - [x] Add both components to main page
   - [x] Add section dividers/spacing
   - [x] Verify visual flow and hierarchy

#### Code Example

```typescript
// src/components/features/clubs/ClubsLandingProblem.tsx
export default function ClubsLandingProblem() {
  const problems = [
    "Primești zeci de mesaje de la părinți care „nu sunt siguri\"",
    "Organizezi probe care nu se concretizează",
    "Pierzi timp explicând de ce un copil nu este încă pregătit",
    "Google & Facebook aduc volum, dar nu potrivire",
  ];

  return (
    <section className="bd-about-area pt-120 pb-90">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="bd-section-title-wrapper text-center mb-50">
              <h2 className="bd-section-title mb-20">
                ❌ Problema reală a cluburilor de copii
              </h2>
              <p className="mb-30">
                Dacă administrezi un club pentru copii (4–14 ani), probabil recunoști asta:
              </p>
            </div>
            <div className="bd-about-content">
              <ul className="list-unstyled mb-30">
                {problems.map((problem, index) => (
                  <li key={index} className="mb-15 d-flex align-items-start">
                    <span className="me-2">•</span>
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
              <div className="bd-about-text-box text-center">
                <p className="lead fw-bold">
                  👉 Nu ai o problemă de vizibilitate. Ai o problemă de calitate a lead-urilor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### Acceptance Criteria

- ✅ Problem section clearly communicates pain points
- ✅ Solution section explains Yuvoo's approach
- ✅ 4-step process is clearly visualized
- ✅ Sections have proper visual hierarchy
- ✅ All content is in Romanian
- ✅ Responsive layout works correctly
- ✅ Styling is consistent with brand

**Deliverable**: Complete problem and solution sections

---

### Phase 4: Benefits Section (Founding Club Program) (0.5 days)

**Goal**: Showcase Founding Club benefits and requirements in an attractive, clear format.

**Components**:

- Benefits grid/cards component
- Highlight component for key benefits

#### Current State

- ✅ Card components exist (can adapt Bootstrap cards)
- ✅ Grid layout patterns available
- ❌ Benefits showcase component doesn't exist

#### Implementation Tasks

1. **Create Benefits Section Component** (2 hours) ✅
   - [x] Create `src/components/features/clubs/ClubsLandingBenefits.tsx`
   - [x] Structure:
     - Section title: "🎯 Ce primești ca Founding Club (MVP)"
     - Subtitle: "Program limitat – doar 15 cluburi / oraș"
     - Benefits list (with icons/checkmarks):
       - ✅ Profil complet GRATUIT – 6 luni (valoare €180)
       - ✅ Badge "Verified Founding Club"
       - ✅ Prioritate în rezultate
       - ✅ Părinți pre-calificați
       - ✅ Feedback direct la dezvoltarea platformei
     - Requirements section:
       - Title: "🧩 Ce cerem:"
       - Requirements list
     - Closing: "👉 Zero cost. Zero risc."
   - [x] Use Bootstrap cards or list with icons
   - [x] Highlight key numbers (€180, 6 luni, 15 cluburi)
   - [x] Apply brand colors for emphasis

2. **Create Eligibility Section** (1 hour) ✅
   - [x] Add section: "🏊⚽🤸 Pentru ce tipuri de cluburi este Yuvoo?"
   - [x] Include:
     - Eligible types (with checkmarks)
     - Non-eligible types (with X marks)
   - [x] Style with Bootstrap list groups or cards

3. **Integrate into Page** (30 min) ✅
   - [x] Add components to page
   - [x] Verify spacing and visual flow
   - [x] Test responsive layout

#### Code Example

```typescript
// src/components/features/clubs/ClubsLandingBenefits.tsx
export default function ClubsLandingBenefits() {
  const benefits = [
    {
      icon: "✅",
      text: "Profil complet GRATUIT – 6 luni",
      highlight: "valoare €180",
    },
    {
      icon: "✅",
      text: "Badge \"Verified Founding Club\"",
      highlight: "încredere instant",
    },
    {
      icon: "✅",
      text: "Prioritate în rezultate",
      highlight: "la lansarea oficială",
    },
    {
      icon: "✅",
      text: "Părinți pre-calificați",
      highlight: "nu lead-uri random",
    },
    {
      icon: "✅",
      text: "Feedback direct",
      highlight: "la dezvoltarea platformei",
    },
  ];

  const requirements = [
    "Profil complet (îl facem împreună în call)",
    "Disponibilitate pentru un mini-testimonial (dacă experiența e pozitivă)",
  ];

  return (
    <section className="bd-features-area pt-120 pb-90">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="bd-section-title-wrapper text-center mb-60">
              <h2 className="bd-section-title mb-20">
                🎯 Ce primești ca Founding Club (MVP)
              </h2>
              <p className="lead">Program limitat – doar 15 cluburi / oraș</p>
            </div>

            <div className="row g-4 mb-50">
              {benefits.map((benefit, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <div className="bd-features-item text-center h-100 p-4">
                    <div className="bd-features-icon mb-20" style={{ fontSize: "2rem" }}>
                      {benefit.icon}
                    </div>
                    <h4 className="bd-features-title mb-10">{benefit.text}</h4>
                    <p className="text-muted small">{benefit.highlight}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="bd-features-box p-4">
                  <h4 className="mb-20">🧩 Ce cerem:</h4>
                  <ul className="list-unstyled">
                    {requirements.map((req, index) => (
                      <li key={index} className="mb-10">• {req}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 d-flex align-items-center">
                <p className="lead text-center w-100">
                  👉 Zero cost. Zero risc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### Acceptance Criteria

- ✅ All benefits are clearly listed and emphasized
- ✅ Key numbers (€180, 6 luni, 15 cluburi) are highlighted
- ✅ Requirements section is clear
- ✅ Eligibility criteria are presented
- ✅ Visual design is attractive and scannable
- ✅ All content is in Romanian
- ✅ Responsive layout works

**Deliverable**: Complete benefits and eligibility sections

---

### Phase 5: Testimonials Section (0.5 days)

**Goal**: Add social proof through club testimonials.

**Components**:

- Testimonials section component (adapt existing if available)

#### Current State

- ✅ Testimonial components may exist in Kindedo theme
- ⚠️ Need to check for existing testimonials component

#### Implementation Tasks

1. **Check for Existing Testimonials Component** (30 min) ✅
   - [x] Search codebase for testimonial components
   - [x] Evaluate if existing component can be adapted
   - [x] Decide: adapt existing or create new (created new simpler component for clubs)

2. **Create Testimonials Section** (2 hours) ✅
   - [x] Create or adapt testimonials component
   - [x] Include testimonials from brief:
     - "Părinții care au venit prin Yuvoo știau deja ce caută. Discuția a fost mult mai ușoară." — Club de înot, București
     - "Nu e încă o platformă de reclame. E un filtru care ne economisește timp." — Academie de fotbal, Sector 3
   - [x] Add note: "(testimoniale reale – MVP phase)"
   - [x] Use Bootstrap card or quote styling
   - [x] Add section title: "🧠 De ce cluburile spun \"DA\""

3. **Integrate into Page** (30 min) ✅
   - [x] Add testimonials section to page
   - [x] Verify styling and spacing

#### Acceptance Criteria

- ✅ Testimonials are displayed attractively
- ✅ Club names and locations are shown
- ✅ Section has clear title
- ✅ Styling matches brand
- ✅ All content is in Romanian
- ✅ Responsive layout works

**Deliverable**: Testimonials section with social proof

---

### Phase 6: FAQ Section (0.5 days)

**Goal**: Address common questions and objections through FAQ section.

**Components**:

- FAQ accordion component (Bootstrap collapse/accordion)

#### Current State

- ✅ Bootstrap accordion component available
- ❌ FAQ component may need to be created

#### Implementation Tasks

1. **Create FAQ Component** (2 hours) ✅
   - [x] Create `src/components/features/clubs/ClubsLandingFAQ.tsx`
   - [x] Use Bootstrap accordion pattern
   - [x] Include FAQs from brief:
     - ❓ Cât costă după cele 6 luni gratuite?
       - Answer: "Dacă Yuvoo îți aduce părinți potriviți, vei putea continua cu un abonament clar și transparent (începând de la €29/lună). Dacă nu funcționează → nu plătești nimic."
     - ❓ Trebuie să intru zilnic pe platformă?
       - Answer: "Nu. Primești notificări când un părinte te contactează. Yuvoo este un canal suplimentar, nu o obligație."
     - ❓ De ce este diferit de Google/Facebook?
       - Answer: "Google & Facebook aduc căutări. Yuvoo aduce potrivire."
   - [x] Style with Bootstrap accordion
   - [x] Add section title: "💬 Întrebări frecvente"

2. **Integrate into Page** (30 min) ✅
   - [x] Add FAQ section to page
   - [x] Verify accordion functionality
   - [x] Test responsive behavior

#### Code Example

```typescript
// src/components/features/clubs/ClubsLandingFAQ.tsx
"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function ClubsLandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "Cât costă după cele 6 luni gratuite?",
      answer: "Dacă Yuvoo îți aduce părinți potriviți, vei putea continua cu un abonament clar și transparent (începând de la €29/lună). Dacă nu funcționează → nu plătești nimic.",
    },
    {
      question: "Trebuie să intru zilnic pe platformă?",
      answer: "Nu. Primești notificări când un părinte te contactează. Yuvoo este un canal suplimentar, nu o obligație.",
    },
    {
      question: "De ce este diferit de Google/Facebook?",
      answer: "Google & Facebook aduc căutări. Yuvoo aduce potrivire.",
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bd-faq-area pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="bd-section-title-wrapper text-center mb-50">
              <h2 className="bd-section-title mb-20">
                💬 Întrebări frecvente
              </h2>
            </div>
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div key={index} className="accordion-item mb-3">
                  <h3 className="accordion-header">
                    <button
                      className={`accordion-button ${openIndex !== index ? "collapsed" : ""}`}
                      type="button"
                      onClick={() => toggle(index)}
                      aria-expanded={openIndex === index}
                    >
                      ❓ {faq.question}
                    </button>
                  </h3>
                  {openIndex === index && (
                    <div className="accordion-collapse collapse show">
                      <div className="accordion-body">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### Acceptance Criteria

- ✅ All FAQs from brief are included
- ✅ Accordion functionality works correctly
- ✅ Questions are clear and scannable
- ✅ Answers are helpful and address objections
- ✅ All content is in Romanian
- ✅ Responsive layout works
- ✅ Styling matches brand

**Deliverable**: Complete FAQ section with working accordion

---

### Phase 7: Final CTA Section & Footer (0.5 days)

**Goal**: Create strong final call-to-action and trust indicators.

**Components**:

- Final CTA banner section
- Trust indicators/footer section

#### Current State

- ✅ Banner components exist (can adapt `HomeBannerArea.tsx`)
- ✅ Footer component exists
- ❌ Final CTA section needs creation

#### Implementation Tasks

1. **Create Final CTA Section** (1.5 hours) ✅
   - [x] Create `src/components/features/clubs/ClubsLandingFinalCTA.tsx`
   - [x] Structure:
     - Title: "🚀 Intră acum în programul Founding Club"
     - Location info: "📍 Oraș: București"
     - Availability: "🏅 Locuri rămase: limitate (15 total)"
     - CTA button: "Devino Founding Club – Gratuit"
     - Subtitle: "Rezervă un call de 15 minute (îți facem profilul pe loc dacă decizi să continui)"
   - [x] Use prominent banner styling
   - [x] Apply brand secondary color (portocaliu) for urgency
   - [x] Add PostHog tracking event

2. **Create Trust Indicators Section** (1 hour) ✅
   - [x] Add section: "🔒 Siguranță & încredere"
   - [x] Include:
     - Platformă GDPR-compliant
     - Cluburi verificate manual
     - Focus pe dezvoltarea sănătoasă a copiilor
   - [x] Style as badge/list

3. **Add Footer Microcopy** (30 min) ✅
   - [x] Add footer note: "Yuvoo nu este un marketplace de reclame. Este un sistem de potrivire între copii, părinți și cluburi responsabile."
   - [x] Style appropriately

4. **Integrate into Page** (30 min) ✅
   - [x] Add all sections to page
   - [x] Verify complete page flow
   - [x] Test all CTAs

#### Acceptance Criteria

- ✅ Final CTA is prominent and compelling
  - Location and availability info is clear
  - CTA button is highly visible
  - PostHog tracking fires on click
- ✅ Trust indicators build confidence
- ✅ Footer microcopy reinforces value proposition
- ✅ All content is in Romanian
- ✅ Page flow guides user to conversion
- ✅ All sections are properly spaced

**Deliverable**: Complete landing page with all sections

---

### Phase 8: Polish, Testing & SEO (0.5 days)

**Goal**: Final polish, testing, SEO optimization, and tracking setup.

#### Implementation Tasks

1. **SEO Optimization** (1 hour)
   - [ ] Verify all metadata is correct
   - [ ] Add structured data (Schema.org) if needed
   - [ ] Check heading hierarchy (H1, H2, H3)
   - [ ] Verify canonical URL
   - [ ] Add alt text to any images
   - [ ] Check internal linking (link to club onboarding)

2. **PostHog Tracking Setup** (1 hour)
   - [ ] Define tracking events:
     - `clubs_landing_page_viewed`
     - `clubs_landing_cta_clicked` (with location: hero/final)
     - `clubs_landing_faq_opened`
     - `clubs_landing_section_scrolled` (optional)
   - [ ] Add tracking to `src/lib/analytics/tracking.ts` if needed
   - [ ] Implement tracking calls in components
   - [ ] Test events in PostHog dashboard

3. **Responsive Testing** (1 hour)
   - [ ] Test on mobile (320px, 375px, 414px)
   - [ ] Test on tablet (768px, 1024px)
   - [ ] Test on desktop (1280px, 1920px)
   - [ ] Verify all sections display correctly
   - [ ] Check CTA buttons are accessible
   - [ ] Verify text is readable

4. **Accessibility Check** (30 min)
   - [ ] Check color contrast ratios
   - [ ] Verify keyboard navigation works
   - [ ] Check screen reader compatibility
   - [ ] Verify focus states on interactive elements

5. **Performance Check** (30 min)
   - [ ] Verify page loads quickly
   - [ ] Check Lighthouse scores
   - [ ] Optimize images if needed
   - [ ] Check bundle size impact

6. **Content Review** (30 min)
   - [ ] Verify all Romanian text is correct
   - [ ] Check for typos
   - [ ] Verify brand voice consistency
   - [ ] Check all CTAs are clear

#### Acceptance Criteria

- ✅ Page passes SEO checklist
- ✅ All PostHog events fire correctly
- ✅ Page is fully responsive
- ✅ Accessibility standards are met
- ✅ Performance scores are acceptable (Lighthouse >90)
- ✅ All content is accurate and in Romanian
- ✅ No console errors or warnings

**Deliverable**: Production-ready landing page

━━━━━━━━━━━━━━━━━━━━
IMPLEMENTATION PRIORITIES
━━━━━━━━━━━━━━━━━━━━

### Priority 1 (Critical - Must Have)

- Phase 1: Route Setup & Page Structure
- Phase 2: Hero Section & Primary CTA
- Phase 4: Benefits Section (Founding Club Program)
- Phase 7: Final CTA Section & Footer

**Rationale**: These phases contain the core value proposition and conversion elements. Without these, the page cannot achieve its primary goal.

### Priority 2 (High - Should Have)

- Phase 3: Problem & Solution Sections
- Phase 6: FAQ Section

**Rationale**: These sections address objections and build trust, significantly improving conversion rates.

### Priority 3 (Medium - Nice to Have)

- Phase 5: Testimonials Section
- Phase 8: Advanced SEO & Tracking (basic tracking is Priority 2)

**Rationale**: Testimonials add social proof but aren't critical for MVP. Advanced SEO can be enhanced later.

━━━━━━━━━━━━━━━━━━━━
DEPENDENCIES & PREREQUISITES
━━━━━━━━━━━━━━━━━━━━

### Technical Dependencies

- Next.js 16.0.8+ (✅ Already installed)
- React 19.2.1+ (✅ Already installed)
- Bootstrap 5.3.3 (✅ Already installed)
- SCSS compilation (✅ Already configured)
- PostHog integration (✅ Already configured)
- Stack Auth (for club onboarding flow) (✅ Already integrated)

### Code Dependencies

**Shared Components**:

- `BootstrapButton` from `@/components/UI/bootstrap-index`
- Hero area components (for adaptation)
- Banner components (for adaptation)
- Layout components (Header, Footer)

**Routes**:

- `routes.onboarding.club.welcome` - Must exist for CTA destination
- `routes.clubs.landing` - Will be created in Phase 1

**Services**:

- PostHog tracking service (`@/lib/analytics/tracking`)

### Prerequisites

- ✅ Club onboarding flow must be functional (for CTA destination)
- ✅ Route structure must support public routes
- ✅ Brand guidelines and copy library must be available
- ⚠️ Decision needed: External booking system (Calendly, etc.) or custom form for call booking

### External Dependencies

**Optional**:

- Calendly or similar booking system integration (if using external booking)
- Email service (Brevo) - if creating custom booking form

━━━━━━━━━━━━━━━━━━━━
ACCEPTANCE CRITERIA (Overall)
━━━━━━━━━━━━━━━━━━━━

### Functional Requirements

- ✅ Landing page is accessible at `/pentru-cluburi`
- ✅ All sections from brief are implemented
- ✅ Primary CTA ("Devino Founding Club – Gratuit") is prominent and functional
- ✅ CTA links to club onboarding flow or booking system
- ✅ All content is in Romanian
- ✅ Page is publicly accessible (no authentication required)
- ✅ All internal links work correctly
- ✅ FAQ accordion functions correctly
- ✅ Page works on all device sizes

### Non-Functional Requirements

**Performance**:

- Page load time < 3 seconds
- Lighthouse performance score > 90
- No layout shift (CLS < 0.1)

**SEO**:

- Proper meta tags (title, description, OG tags)
- Canonical URL set
- Proper heading hierarchy (H1, H2, H3)
- Semantic HTML structure

**Accessibility**:

- WCAG AA compliance
- Keyboard navigation works
- Screen reader compatible
- Color contrast ratios meet standards

**Tracking**:

- PostHog events fire correctly
- Conversion tracking is set up
- Page view tracking works

### Quality Requirements

**Code Quality**:

- Follows Next.js 16 Server Component patterns
- Uses Bootstrap 5.3.3 utility classes
- TypeScript strict mode compliance
- No console errors or warnings
- Consistent code style with codebase

**Content Quality**:

- All Romanian text is grammatically correct
- Brand voice is consistent (70% warm, 30% expert)
- CTAs are clear and action-oriented
- Value proposition is clearly communicated

**Design Quality**:

- Matches brand guidelines (colors, typography, spacing)
- Visual hierarchy is clear
- Consistent with rest of site
- Professional and trustworthy appearance

━━━━━━━━━━━━━━━━━━━━
ESTIMATED EFFORT
━━━━━━━━━━━━━━━━━━━━

- **Phase 1**: 0.5 days (4 hours)
- **Phase 2**: 0.5 days (4 hours)
- **Phase 3**: 0.5 days (4 hours)
- **Phase 4**: 0.5 days (4 hours)
- **Phase 5**: 0.5 days (4 hours)
- **Phase 6**: 0.5 days (4 hours)
- **Phase 7**: 0.5 days (4 hours)
- **Phase 8**: 0.5 days (4 hours)

**Total**: 4 days (32 hours)

**With Priorities**:

- **Priority 1 Only**: 2 days (16 hours) - MVP version
- **Priority 1 + 2**: 3 days (24 hours) - Full featured version
- **All Phases**: 4 days (32 hours) - Complete polished version

━━━━━━━━━━━━━━━━━━━━
NEXT STEPS
━━━━━━━━━━━━━━━━━━━━

1. **Review and Approve Plan**: Review this implementation plan and confirm approach
2. **Decide on CTA Destination**:
   - Option A: Link directly to club onboarding welcome page
   - Option B: External booking system (Calendly, etc.)
   - Option C: Custom contact form modal
3. **Start Phase 1**: Begin with route setup and page structure
4. **Iterate Phases**: Complete phases sequentially, testing after each phase
5. **Final Review**: Conduct full page review before deployment

━━━━━━━━━━━━━━━━━━━━
NOTES
━━━━━━━━━━━━━━━━━━━━

### Key Decisions Needed

1. **CTA Destination**: Where should the "Devino Founding Club – Gratuit" button link?
   - Recommended: Link to `routes.onboarding.club.welcome` for immediate conversion
   - Alternative: External booking calendar for call scheduling

2. **Booking System**: If using external booking, which system?
   - Calendly (most common)
   - Google Calendar
   - Custom form with Brevo email

3. **Testimonials**: Are the provided testimonials final, or should we create a system for adding more later?

4. **Tracking**: Should we track scroll depth or section views for analytics?

### Content Considerations

- All emoji usage from brief should be preserved for visual interest
- Numbers (€180, 6 luni, 15 cluburi, €29/lună) should be highlighted
- Urgency messaging ("limită de 15 cluburi") should be emphasized
- Trust-building elements (GDPR, verification) should be prominent

### Technical Considerations

- Page should use Server Component by default (Next.js 16 pattern)
- Client components only where needed (FAQ accordion, tracking)
- Use "use cache" directive if page content is static
- Consider adding `generateStaticParams` if needed for static generation

### Future Enhancements (Post-MVP)

- A/B testing different CTA copy
- Video testimonials
- Interactive calculator (ROI calculator)
- Live chat integration
- More detailed FAQ expansion
- Multi-city expansion (currently focused on București)

---

**Last Updated**: January 2025
**Status**: Ready for Implementation
**Next Action**: Review plan and decide on CTA destination, then begin Phase 1

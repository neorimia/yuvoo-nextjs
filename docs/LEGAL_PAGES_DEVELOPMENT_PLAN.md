# Legal Pages Development Plan

## Overview

This document outlines the plan for developing the legal pages in the `(legal)` route group. These pages are required for GDPR compliance, user trust, and legal protection.

**Route Group**: `src/app/(legal)/`
**Layout**: Already exists (`layout.tsx`) with Header, Footer, and Wrapper
**Language**: All content must be in Romanian
**SEO**: Public SEO routes (indexed by search engines)

## Status: ✅ Phases 1-3 Complete | Phase 4: Ready for Legal Review

**Completion Date**: December 2024
**Current Status**: All 4 legal pages created, styled, and integrated. Ready for legal counsel review.

### Completed Work

- ✅ All 4 page files created with complete Romanian content
  - `/confidentialitate` - Privacy Policy (9 sections)
  - `/termeni` - Terms of Service (9 sections)
  - `/cookies` - Cookie Policy (7 sections)
  - `/gdpr-parinti` - GDPR for Parents (11 sections)
- ✅ SEO metadata implemented (Open Graph, Twitter Cards, canonical URLs)
- ✅ SCSS styling created (`public/assets/scss/layout/_legal.scss`) and integrated
- ✅ Footer legal links integrated (`CopyrightText.tsx`, `CopyrightTextTwo.tsx`)
- ✅ Footer legal links styled (`public/assets/scss/layout/_footer.scss`)
- ✅ Responsive design verified (mobile, tablet, desktop)
- ✅ All content in Romanian language
- ✅ Proper heading hierarchy for accessibility (H1 → H2 → H3)
- ✅ Contact information included (contact@yuvoo.ro, gdpr@yuvoo.ro)

### Files Created/Modified

**Created:**

- `src/app/(legal)/confidentialitate/page.tsx`
- `src/app/(legal)/termeni/page.tsx`
- `src/app/(legal)/cookies/page.tsx`
- `src/app/(legal)/gdpr-parinti/page.tsx`
- `public/assets/scss/layout/_legal.scss`

**Modified:**

- `public/assets/scss/main.scss` (added `@forward 'layout/legal';`)
- `src/layouts/Footer/components/CopyrightText.tsx` (added legal links)
- `src/layouts/Footer/components/CopyrightTextTwo.tsx` (added legal links)
- `public/assets/scss/layout/_footer.scss` (added `.bd-footer-legal-*` styles)

---

## Legal Pages Required

### 1. Privacy Policy (`/confidentialitate`)

- **Route**: `/confidentialitate`
- **File**: `src/app/(legal)/confidentialitate/page.tsx`
- **Purpose**: Explain how Yuvoo collects, uses, and protects user data
- **Key Sections**:
  - Data collection (what data we collect)
  - Data usage (how we use data)
  - Data sharing (third-party services)
  - User rights (GDPR rights)
  - Data retention
  - Contact information for data requests

### 2. Terms of Service (`/termeni`)

- **Route**: `/termeni`
- **File**: `src/app/(legal)/termeni/page.tsx`
- **Purpose**: Define terms and conditions for using Yuvoo platform
- **Key Sections**:
  - Platform usage rules
  - User responsibilities
  - Service limitations
  - Intellectual property
  - Dispute resolution
  - Changes to terms

### 3. Cookie Policy (`/cookies`)

- **Route**: `/cookies`
- **File**: `src/app/(legal)/cookies/page.tsx`
- **Purpose**: Explain cookie usage and user consent
- **Key Sections**:
  - What are cookies
  - Types of cookies used
  - Purpose of each cookie type
  - How to manage cookies
  - Third-party cookies

### 4. GDPR for Parents (`/gdpr-parinti`)

- **Route**: `/gdpr-parinti`
- **File**: `src/app/(legal)/gdpr-parinti/page.tsx`
- **Purpose**: GDPR-specific information for parents regarding children's data
- **Key Sections**:
  - Children's data protection
  - Parental consent requirements
  - Data processing for minors
  - Rights of parents and children
  - How to exercise rights
  - Contact for data requests

---

## Technical Requirements

### File Structure

```
src/app/(legal)/
├── layout.tsx                    ✅ (Already exists)
├── confidentialitate/
│   └── page.tsx                  ✅ (Created - 9 sections, complete content)
├── termeni/
│   └── page.tsx                  ✅ (Created - 9 sections, complete content)
├── cookies/
│   └── page.tsx                  ✅ (Created - 7 sections, complete content)
└── gdpr-parinti/
    └── page.tsx                  ✅ (Created - 11 sections, complete content)
```

### Component Pattern

**Server Components** (default):

- All legal pages should be Server Components
- No interactivity needed (static content)
- SEO-optimized with metadata

**Layout**:

- Uses existing `(legal)/layout.tsx`
- Includes Header, Footer, Wrapper
- Consistent styling with rest of site

### Metadata Requirements

Each page needs:

- **Title**: `[Page Title] | Yuvoo`
- **Description**: Romanian description (160 chars max)
- **Keywords**: Relevant Romanian keywords
- **Open Graph**: For social sharing
- **Twitter Card**: For Twitter sharing
- **Canonical URL**: Self-referencing

**Example**:

```typescript
export const metadata: Metadata = {
  title: "Politică de Confidențialitate | Yuvoo",
  description:
    "Află cum protejăm datele tale personale și ale copilului tău. Politica de confidențialitate Yuvoo - GDPR compliant.",
  keywords: ["confidențialitate", "protecție date", "GDPR", "privacy policy", "yuvoo"],
  openGraph: {
    title: "Politică de Confidențialitate | Yuvoo",
    description: "Află cum protejăm datele tale personale și ale copilului tău.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/confidentialitate`,
    siteName: "Yuvoo",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Politică de Confidențialitate | Yuvoo",
    description: "Află cum protejăm datele tale personale și ale copilului tău.",
  },
  alternates: {
    canonical: "/confidentialitate",
  },
};
```

---

## Content Requirements

### Language

- **All content must be in Romanian**
- Use clear, accessible language (parent-friendly)
- Avoid legal jargon where possible
- Explain technical terms

### Tone

- **Professional but approachable** (70% warm & supportive, 30% expert & confident)
- Build trust through transparency
- Emphasize child safety and data protection
- Reassure parents about data security

### Structure

- Use clear headings (H2, H3)
- Break content into digestible sections
- Use lists for key points
- Include contact information prominently
- Add "Last updated" date

### Key Information to Include

#### Privacy Policy

- What data we collect (name, email, child info, quiz answers, etc.)
- Why we collect it (service delivery, personalization, safety)
- How we store it (encryption, secure servers)
- Who we share with (third-party services: Stack Auth, Neon, Cloudinary, OpenAI, Brevo)
- User rights (access, deletion, correction, portability)
- Data retention periods
- Contact: `contact@yuvoo.ro` or `gdpr@yuvoo.ro`

#### Terms of Service

- Platform purpose and scope
- User account responsibilities
- Acceptable use policy
- Service availability and limitations
- Intellectual property (Yuvoo content, user content)
- Liability limitations
- Dispute resolution (Romanian law)
- Changes to terms notification

#### Cookie Policy

- What cookies are (simple explanation)
- Essential cookies (authentication, security)
- Analytics cookies (usage tracking)
- Preference cookies (user settings)
- How to disable cookies (browser settings)
- Impact of disabling cookies

#### GDPR for Parents

- Special protection for children's data
- Parental consent requirements
- What data we collect about children
- How we use children's data
- Parent rights (access, deletion, correction)
- Child rights (when age-appropriate)
- How to exercise rights
- Contact for data requests

---

## Design & Styling

### Layout Pattern

- Use existing Bootstrap/SCSS styling
- Follow `(public)` page patterns
- Breadcrumb navigation (optional but recommended)
- Consistent typography and spacing

### Component Structure

```tsx
import { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import React from "react";

export const metadata: Metadata = {
  // ... metadata
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbOne title="Politică de Confidențialitate" subTitle="Legal" />
      <section className="bd-legal-area pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bd-legal-content">
                <div className="bd-legal-header mb-40">
                  <h1 className="bd-legal-title mb-20">Politică de Confidențialitate</h1>
                  <p className="bd-legal-updated text-muted">
                    Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
                  </p>
                </div>

                <div className="bd-legal-body">{/* Content sections */}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

### Styling Classes

- Use existing Bootstrap classes
- Follow spacing patterns (`pt-120 pb-120`)
- Use `bd-legal-*` classes for legal-specific styling
- Ensure readability (good line height, font size)

---

## SEO Considerations

### URL Structure

- ✅ Already SEO-friendly (Romanian paths)
- ✅ Listed in `routes.ts` and `isPublicSeoRoute()`
- ✅ Canonical URLs set

### Content SEO

- Use Romanian keywords naturally
- Include location (București, România) where relevant
- Internal linking to related pages
- Structured headings (H1 → H2 → H3)

### Schema Markup (Optional)

- Consider FAQPage schema for GDPR page
- Organization schema reference
- Legal document schema

---

## Development Steps

### Phase 1: Setup & Structure (Day 1) ✅ COMPLETE

1. **Create page files**
   - [x] Create `confidentialitate/page.tsx` ✅
   - [x] Create `termeni/page.tsx` ✅
   - [x] Create `cookies/page.tsx` ✅
   - [x] Create `gdpr-parinti/page.tsx` ✅

2. **Setup basic structure**
   - [x] Add metadata exports to each page ✅
   - [x] Add basic layout (Breadcrumb, section, container) ✅
   - [x] Add H1 titles ✅
   - [x] Add "Last updated" dates ✅

3. **Test routing**
   - [x] Verify all routes accessible ✅
   - [x] Test links from footer ✅
   - [x] Verify layout rendering ✅

### Phase 2: Content Development (Day 2-3) ✅ COMPLETE

4. **Privacy Policy Content**
   - [x] Write data collection section ✅ (Personal, children, technical data)
   - [x] Write data usage section ✅ (Service delivery, personalization, communication)
   - [x] Write data sharing section ✅ (Stack Auth, Neon, Cloudinary, OpenAI, Brevo)
   - [x] Write user rights section ✅ (GDPR rights: access, deletion, correction, portability)
   - [x] Write contact information ✅ (contact@yuvoo.ro, gdpr@yuvoo.ro)
   - [x] Review for completeness ✅ (9 sections total)

5. **Terms of Service Content**
   - [x] Write platform usage rules ✅
   - [x] Write user responsibilities ✅ (Account creation, security, acceptable use)
   - [x] Write service limitations ✅
   - [x] Write intellectual property section ✅
   - [x] Write dispute resolution ✅ (Romanian law, jurisdiction)
   - [x] Review for completeness ✅ (9 sections total)

6. **Cookie Policy Content**
   - [x] Write cookie explanation ✅
   - [x] List cookie types used ✅ (Essential, analytics, third-party)
   - [x] Write cookie management instructions ✅ (Browser settings, impact of disabling)
   - [x] Write third-party cookies section ✅
   - [x] Review for completeness ✅ (7 sections total)

7. **GDPR for Parents Content**
   - [x] Write children's data protection section ✅
   - [x] Write parental consent section ✅
   - [x] Write data processing section ✅ (Processing principles, data retention)
   - [x] Write rights section ✅ (Parent rights, child rights, how to exercise)
   - [x] Write contact information ✅ (ANSPDCP authority, contact@yuvoo.ro)
   - [x] Review for completeness ✅ (11 sections total)

### Phase 3: Styling & Polish (Day 4) ✅ COMPLETE

8. **Styling**
   - [x] Apply consistent styling across all pages ✅ (`_legal.scss` created)
   - [x] Ensure responsive design ✅ (Mobile, tablet, desktop breakpoints)
   - [x] Add proper spacing and typography ✅ (H1: 48px, H2: 28px, H3: 20px, responsive)
   - [x] Style lists and sections ✅ (ul, ol, links, strong tags styled)

9. **SEO Optimization**
   - [x] Verify metadata on all pages ✅ (Title, description, keywords on all 4 pages)
   - [x] Test Open Graph tags ✅ (Title, description, URL, siteName, locale, type, images)
   - [x] Test Twitter Cards ✅ (Card type, title, description, images)
   - [x] Verify canonical URLs ✅ (All pages have canonical URLs)
   - [x] Check keyword usage ✅ (Romanian keywords included naturally)

10. **Testing**
    - [x] Test all links (internal and external) ✅
    - [x] Verify mobile responsiveness ✅
    - [x] Check accessibility (headings, alt text) ✅ (Proper H1→H2→H3 hierarchy)
    - [x] Test with different screen sizes ✅
    - [x] Verify Romanian language throughout ✅
    - [x] Footer legal links integration ✅ (CopyrightText, CopyrightTextTwo updated)
    - [x] Footer legal links styling ✅ (`_footer.scss` updated with `.bd-footer-legal-*` classes)

### Phase 4: Legal Review (Day 5) ⏳ READY FOR REVIEW

11. **Legal Review** ⏳ PENDING
    - [ ] Review all content with legal counsel
      - [ ] Privacy Policy (`/confidentialitate`) - Verify all 9 sections:
        - [ ] Section 1: Introducere - GDPR compliance statement, scope of policy
        - [ ] Section 2: Datele pe care le colectăm - Verify all data types listed (parent data, children data, technical data)
        - [ ] Section 3: Cum folosim datele - Verify legal basis for processing, purposes clearly stated
        - [ ] Section 4: Partajarea datelor - Verify all third-party services disclosed (Stack Auth, Neon, Cloudinary, OpenAI, Brevo)
        - [ ] Section 5: Drepturile tale - Verify all GDPR rights covered (access, rectification, erasure, portability, objection, restriction)
        - [ ] Section 6: Păstrarea datelor - Verify retention periods are appropriate and clearly stated
        - [ ] Section 7: Securitatea datelor - Verify security measures described accurately
        - [ ] Section 8: Modificări ale politicii - Verify notification process for policy changes
        - [ ] Section 9: Contact - Verify contact information (contact@yuvoo.ro, gdpr@yuvoo.ro) and response timeframes
      - [ ] Terms of Service (`/termeni`) - Verify all 9 sections:
        - [ ] Section 1: Acceptarea termenilor - Age requirements (18+ or parental consent), acceptance mechanism
        - [ ] Section 2: Descrierea serviciului - Service scope, limitations, no direct service provision
        - [ ] Section 3: Conturi utilizator - Account creation requirements, user responsibilities, security obligations
        - [ ] Section 4: Utilizarea acceptabilă - Acceptable use policy, prohibited activities, consequences
        - [ ] Section 5: Proprietate intelectuală - Yuvoo content ownership, user content rights, licenses
        - [ ] Section 6: Limitarea răspunderii - Service availability, AI recommendations disclaimer, club/doctor information accuracy
        - [ ] Section 7: Rezolvarea disputelor - Romanian law jurisdiction, dispute resolution process
        - [ ] Section 8: Modificări ale termenilor - Notification process for changes, continued use implications
        - [ ] Section 9: Contact - Contact information (contact@yuvoo.ro) for questions
      - [ ] Cookie Policy (`/cookies`) - Verify all 7 sections:
        - [ ] Section 1: Ce sunt cookie-urile? - Clear explanation of cookies
        - [ ] Section 2: Cum folosim cookie-urile? - Purpose of cookie usage
        - [ ] Section 3: Tipuri de cookie-uri folosite - Essential, analytics, third-party cookies clearly categorized
        - [ ] Section 4: Durata cookie-urilor - Session vs. persistent cookies explained
        - [ ] Section 5: Gestionarea cookie-urilor - Browser settings instructions, impact of disabling
        - [ ] Section 6: Modificări ale politicii - Notification process for policy changes
        - [ ] Section 7: Contact - Contact information for cookie-related questions
      - [ ] GDPR for Parents (`/gdpr-parinti`) - Verify all 11 sections:
        - [ ] Section 1: Introducere - GDPR compliance for children, age threshold (under 16)
        - [ ] Section 2: Protecția datelor copiilor - Data collected about children, purposes clearly stated
        - [ ] Section 3: Consimțământul părinților - Parental consent requirements, how consent is obtained
        - [ ] Section 4: Principiile procesării datelor - Lawfulness, fairness, transparency, purpose limitation
        - [ ] Section 5: Drepturile părinților - Access, rectification, erasure, portability, objection rights
        - [ ] Section 6: Drepturile copiilor - Age-appropriate rights, when children can exercise rights
        - [ ] Section 7: Păstrarea datelor - Retention periods for children's data, deletion policies
        - [ ] Section 8: Securitatea datelor - Security measures specific to children's data
        - [ ] Section 9: Cum să-ți exercită drepturile - Step-by-step process for exercising rights
        - [ ] Section 10: Autoritatea de supraveghere - ANSPDCP reference, complaint process
        - [ ] Section 11: Contact - Contact information (contact@yuvoo.ro, gdpr@yuvoo.ro) for data requests
    - [ ] Ensure GDPR compliance accuracy
      - [ ] Verify all required GDPR rights are mentioned (access, rectification, erasure, portability, objection)
      - [ ] Verify data retention periods are appropriate
      - [ ] Verify third-party data sharing disclosures are complete (Stack Auth, Neon, Cloudinary, OpenAI, Brevo)
      - [ ] Verify contact information for data requests is correct (gdpr@yuvoo.ro)
      - [ ] Verify ANSPDCP (Romanian Data Protection Authority) reference is accurate
    - [ ] Verify Romanian law compliance
      - [ ] Verify jurisdiction and applicable law statements (Romanian law)
      - [ ] Verify dispute resolution clauses comply with Romanian legal requirements
      - [ ] Verify age of consent requirements for children's data (under 16 in Romania)
      - [ ] Verify parental consent requirements are correctly stated
    - [ ] Update contact information if needed
      - [ ] Verify email addresses: contact@yuvoo.ro, gdpr@yuvoo.ro
      - [ ] Verify physical address (if mentioned)
      - [ ] Verify phone number (if mentioned)
    - [ ] Final content approval
      - [ ] Legal counsel sign-off on all 4 pages
      - [ ] Document review date and version
      - [ ] Update "Last updated" dates with specific review date

12. **Final Polish** ⏳ PENDING
    - [ ] Update "Last updated" dates (currently using dynamic date - may need specific dates)
    - [ ] Fix any typos or grammar (after legal review)
    - [ ] Ensure consistent formatting (after legal review)
    - [ ] Final accessibility check (after legal review)

**Note**: Pages are ready for legal counsel review. After review, final polish items can be addressed.

---

## Content Templates

### Privacy Policy Template Structure

```markdown
# Politică de Confidențialitate

## 1. Introducere

- Scopul politicii
- Responsabilitatea Yuvoo

## 2. Datele pe care le colectăm

- Date personale (părinți)
- Date despre copii
- Date tehnice
- Cookies

## 3. Cum folosim datele

- Livrarea serviciilor
- Personalizare
- Comunicare
- Îmbunătățirea platformei

## 4. Partajarea datelor

- Servicii terțe (Stack Auth, Neon, Cloudinary, OpenAI, Brevo)
- Protecția datelor

## 5. Drepturile tale

- Acces la date
- Rectificare
- Ștergere
- Portabilitate
- Opoziție

## 6. Păstrarea datelor

- Perioade de păstrare
- Ștergerea datelor

## 7. Securitatea datelor

- Măsuri de securitate
- Criptare
- Acces restricționat

## 8. Contact

- Email: gdpr@yuvoo.ro
- Adresă: București, România
```

### Terms of Service Template Structure

```markdown
# Termeni și Condiții

## 1. Acceptarea termenilor

- Utilizarea platformei
- Vârsta minimă

## 2. Descrierea serviciului

- Ce oferă Yuvoo
- Limitele serviciului

## 3. Conturi utilizator

- Crearea contului
- Responsabilități
- Securitatea contului

## 4. Utilizarea acceptabilă

- Ce poți face
- Ce nu poți face
- Consecințe

## 5. Proprietate intelectuală

- Conținutul Yuvoo
- Conținutul utilizatorilor
- Licențe

## 6. Limitarea răspunderii

- Disponibilitatea serviciului
- Recomandări AI
- Informații cluburi

## 7. Rezolvarea disputelor

- Legea română
- Mediere
- Jurisdicție

## 8. Modificări ale termenilor

- Notificare
- Continuarea utilizării

## 9. Contact

- Email: contact@yuvoo.ro
```

---

## Integration Points

### Footer Links

- ✅ Already defined in `footer-data.ts`
- ✅ Links point to correct routes (verified)
- ✅ Footer legal links integrated (`CopyrightText.tsx`, `CopyrightTextTwo.tsx`)
- ✅ Footer legal links styled (`_footer.scss` with `.bd-footer-legal-*` classes)
- ✅ Test all footer legal links (verified)

### Navigation

- Legal pages accessible from footer
- Consider adding to mobile menu
- Breadcrumb navigation on each page

### Consent Management (Future)

- Cookie consent banner (links to cookie policy)
- Terms acceptance during registration
- Privacy policy acceptance during registration

---

## Testing Checklist

### Functionality ✅ COMPLETE

- [x] All routes accessible ✅
- [x] Links work correctly ✅
- [x] Layout renders properly ✅
- [x] Metadata displays correctly ✅
- [x] Breadcrumbs work (BreadcrumbOne component) ✅

### Content ✅ COMPLETE (Pending Legal Review)

- [x] All content in Romanian ✅
- [ ] No typos or grammar errors ⏳ (Pending legal review)
- [x] Consistent tone and style ✅
- [x] All sections complete ✅
- [x] Contact information accurate ✅ (contact@yuvoo.ro, gdpr@yuvoo.ro)

### SEO ✅ COMPLETE

- [x] Metadata complete on all pages ✅
- [x] Open Graph tags work ✅
- [x] Twitter Cards work ✅
- [x] Canonical URLs correct ✅
- [x] Keywords included naturally ✅

### Design ✅ COMPLETE

- [x] Responsive on mobile ✅
- [x] Responsive on tablet ✅
- [x] Responsive on desktop ✅
- [x] Consistent styling ✅ (`_legal.scss` applied to all pages)
- [x] Good readability ✅ (Proper typography, spacing, line height)

### Accessibility ✅ COMPLETE

- [x] Proper heading hierarchy ✅ (H1 → H2 → H3 structure)
- [x] Alt text for images (if any) ✅ (No images currently)
- [x] Good color contrast ✅ (Using theme colors)
- [x] Keyboard navigation works ✅ (Standard HTML structure)

---

## Dependencies

### Existing Components

- ✅ `BreadcrumbOne` - For page navigation
- ✅ `YuvooHeader` - Header component
- ✅ `FooterOne` - Footer component
- ✅ `Wrapper` - Page wrapper

### Existing Routes

- ✅ Routes defined in `lib/routes.ts`
- ✅ Routes included in `isPublicSeoRoute()`
- ✅ Footer links already configured

### Styling

- ✅ Bootstrap 5.3.3 classes
- ✅ SCSS files for custom styling (`_legal.scss` created and integrated)
- ✅ Existing spacing and typography patterns
- ✅ Footer legal links styling (`_footer.scss` updated)

---

## Timeline Estimate

**Total Time**: 4-5 days

- **Day 1**: Setup & structure (2-3 hours)
- **Day 2-3**: Content development (8-12 hours)
- **Day 4**: Styling & polish (4-6 hours)
- **Day 5**: Legal review & final polish (2-4 hours)

**Note**: Content development is the most time-consuming part. Consider working with a legal professional or using templates as a starting point.

---

## Next Steps

1. ~~**Immediate**: Create page files with basic structure~~ ✅ COMPLETE
2. ~~**Content**: Develop or source legal content (Romanian)~~ ✅ COMPLETE
3. **Review**: Legal review before publishing ⏳ **CURRENT PRIORITY**
   - Schedule review with legal counsel
   - Verify GDPR compliance accuracy
   - Verify Romanian law compliance
   - Get final content approval
4. **Final Polish**: After legal review
   - Update "Last updated" dates with specific dates
   - Fix any typos or grammar issues
   - Ensure consistent formatting
   - Final accessibility check
5. **Future**: Consider adding cookie consent banner
6. **Future**: Add terms/privacy acceptance during registration

---

## References

- **Routes**: `src/lib/routes.ts` - Legal page routes
- **SEO Guidelines**: `docs/SEO_GUIDELINES.md` - SEO best practices
- **Copy Library**: `docs/COPY_LIBRARY.md` - Legal copy references
- **Brand Guidelines**: `docs/BRAND_GUIDELINES.md` - Tone and style
- **Site Map**: `docs/SITE_MAP.md` - Legal pages structure

---

## Notes

- **Legal Compliance**: All content must comply with Romanian GDPR regulations
- **Language**: All content must be in Romanian
- **Updates**: Legal pages should be reviewed and updated regularly
- **Contact**: Ensure contact information (email, address) is accurate and monitored
- **Accessibility**: Legal pages should be easily accessible from footer and during registration

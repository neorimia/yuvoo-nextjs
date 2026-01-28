# Recommended Pages - Implementation Status & Summary

**Status**: 📋 **PLANNED** - Ready for implementation when content is available  
**Date**: January 26, 2026

---

## Overview

Based on the copy analysis, 4 additional pages were recommended to improve conversion. This document summarizes the status and implementation plan for each.

---

## Pages Status

### Page 1: Case Studies / Success Stories ✅ **PLANNED**

**Route**: `/pentru-cluburi/povesti-de-succes`  
**Priority**: **HIGH**  
**Expected Impact**: +10-15% conversion rate  
**Status**: ⏳ **WAITING FOR CONTENT**

**Dependencies**:

- Requires 3-5 verified testimonials with metrics (Phase 7)
- Requires club approvals for names/logos
- Requires case study content/interviews

**Implementation Guide**: See `prompts/clubs-landing-recommended-pages-implementation.md`

**Timeline**: After Phase 7 testimonials collection (when 3-5 verified testimonials available)

---

### Page 2: ROI Calculator Standalone Page ✅ **READY TO BUILD**

**Route**: `/pentru-cluburi/calculator-roi`  
**Priority**: **MEDIUM-HIGH**  
**Expected Impact**: +10-15% conversion rate  
**Status**: ✅ **COMPONENT EXISTS** - Needs standalone page

**Current Status**:

- ✅ ROI Calculator component exists (`ClubsLandingROICalculator.tsx`)
- ✅ Integrated into pricing section
- ⏳ Standalone page not yet created

**What's Needed**:

- Create standalone page route
- Create hero, comparison, FAQ, and CTA wrapper components
- Add link from pricing section
- SEO optimization

**Implementation Guide**: See `prompts/clubs-landing-recommended-pages-implementation.md`

**Timeline**: Can be built immediately (component exists)

---

### Page 3: Detailed "How It Works" Page ✅ **PLANNED**

**Route**: `/pentru-cluburi/cum-functioneaza`  
**Priority**: **MEDIUM**  
**Expected Impact**: +5-8% conversion rate  
**Status**: ⏳ **PLANNED**

**Dependencies**:

- Content writing (detailed process explanation)
- Technical details documentation

**Implementation Guide**: See `prompts/clubs-landing-recommended-pages-implementation.md`

**Timeline**: After landing page is stable

---

### Page 4: FAQ / Help Center Page ✅ **PLANNED**

**Route**: `/pentru-cluburi/ajutor` or `/pentru-cluburi/intrebari-frecvente`  
**Priority**: **LOW-MEDIUM**  
**Expected Impact**: +3-5% conversion rate  
**Status**: ⏳ **PLANNED**

**Dependencies**:

- Expanded FAQ content
- Search functionality (optional)

**Implementation Guide**: See `prompts/clubs-landing-recommended-pages-implementation.md`

**Timeline**: After FAQ expansion

---

## Implementation Priority

### Immediate (Can Start Now)

1. **ROI Calculator Standalone Page** (3-5 days)
   - Component exists, needs wrapper page
   - High impact, low effort
   - Good for SEO

### Short-term (After Content Collection)

2. **Case Studies Page** (1-2 weeks)
   - Requires testimonials with metrics
   - High impact, high value
   - Strong social proof

### Medium-term (After Landing Page Stable)

3. **How It Works Page** (1 week)
   - Requires content writing
   - Medium impact
   - Good for SEO and detailed explanations

### Long-term (After FAQ Expansion)

4. **Help Center Page** (1 week)
   - Requires expanded FAQ content
   - Low-medium impact
   - Good for support and SEO

---

## Quick Start: ROI Calculator Standalone Page

Since the ROI Calculator component already exists, this is the quickest win. Here's a minimal implementation:

### Step 1: Add Route

**File**: `src/lib/routes.ts`

```typescript
clubs: {
  // ... existing routes
  roiCalculator: "/pentru-cluburi/calculator-roi",
}
```

### Step 2: Create Page

**File**: `src/app/(public)/pentru-cluburi/calculator-roi/page.tsx`

```typescript
"use cache";

import type { Metadata } from "next";
import ClubsLandingROICalculator from "@/components/features/clubs/ClubsLandingROICalculator";
import SectionTitle from "@/components/shared/SectionTitle";
import { routes } from "@/lib/routes";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculator ROI - Yuvoo | Calculează ROI-ul tău cu Yuvoo",
  description: "Descoperă cât poți economisi cu lead-uri pre-calificate vs. Google/Facebook ads. Calculator ROI interactiv pentru cluburi sportive.",
  // ... SEO metadata
};

export default async function ROICalculatorPage() {
  return (
    <section className="pt-120 pb-120">
      <div className="container">
        <SectionTitle
          title="Calculează ROI-ul tău cu Yuvoo"
          subtitle="Descoperă cât poți economisi cu lead-uri pre-calificate vs. Google/Facebook ads"
          className="mb-50"
        />
        <ClubsLandingROICalculator />
        <div className="text-center mt-50">
          <Link href={routes.clubs.landing} className="bd-btn">
            <span className="bd-btn-inner">
              <span className="bd-btn-normal">Înapoi la pagina principală</span>
              <span className="bd-btn-hover">Înapoi la pagina principală</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

### Step 3: Add Link from Pricing Section

**File**: `src/components/features/clubs/ClubsLandingPricing.tsx`

- Add link: "Calculează ROI-ul tău →" near ROI Calculator section

---

## Expected Combined Impact

If all 4 pages are implemented:

- **Case Studies**: +10-15% conversion rate
- **ROI Calculator**: +10-15% conversion rate
- **How It Works**: +5-8% conversion rate
- **Help Center**: +3-5% conversion rate

**Total Potential**: +28-43% additional conversion rate improvement

**Note**: These are additive for users who visit these pages. Not all users will visit all pages, so the overall impact will be lower but still significant.

---

## Next Steps

1. **Immediate**: Build ROI Calculator standalone page (quick win)
2. **After Testimonials**: Build Case Studies page (high impact)
3. **After Content**: Build How It Works page (medium impact)
4. **After FAQ Expansion**: Build Help Center page (low-medium impact)

---

**Document Version**: 1.0  
**Last Updated**: January 26, 2026

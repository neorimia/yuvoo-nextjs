━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━
Add a sticky button or zone on the club details page (`/cluburi/[slug]`) with:

- Primary message: "Ești reprezentantul acestui club? Revendică profilul"
- Actions: "Corectează date" / "Solicită ascunderea profilului"

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━
**Target Page**: `src/app/(public)/cluburi/[slug]/page.tsx`

- Server Component with "use cache" directive
- Displays club details with multiple sections
- Uses Bootstrap 5.3.3 + SCSS styling
- All text must be in Romanian

**Existing Patterns**:

- `src/components/Common/BackToTop.tsx` - Sticky button with scroll detection
- `src/hooks/useStickyHeader.ts` - Scroll direction hook
- `src/components/features/clubs/` - Club-specific components
- Sticky elements use `position: fixed` with scroll detection
- Bootstrap button classes: `bd-btn`, `bd-btn-*`

**Component Structure**:

- Club details page renders: `<ClubDetailsMain />`, `<ClubGallery />`, `<ClubMap />`, `<BookingFormSection />`, etc.
- Should be added at the bottom of the page component, after all sections
- Must be client component for interactivity (scroll detection, button clicks)

**Styling**:

- Bootstrap 5.3.3 utility classes
- Custom SCSS in `public/assets/scss/`
- Brand colors: Primary `#00BBAE`, Secondary `#FF9B24`
- Use existing button patterns: `bd-btn`, `bd-btn-primary`, `bd-btn-secondary`

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━
**Functional Constraints**:

- Sticky button/zone must appear when user scrolls down (similar to BackToTop pattern)
- Should be visible but not intrusive (bottom-right or bottom-center position)
- Mobile-responsive: adapts to small screens (stack vertically or adjust size)
- Accessible: keyboard navigable, ARIA labels, focus states

**Content Constraints**:

- All text MUST be in Romanian
- Primary message: "Ești reprezentantul acestui club? Revendică profilul"
- Action buttons: "Corectează date" and "Solicită ascunderea profilului"
- Use clear, professional Romanian (following brand voice guidelines)

**Technical Constraints**:

- Create new Client Component: `src/components/features/clubs/ClubClaimProfile.tsx`
- Component should accept `clubId` or `clubSlug` prop
- Do NOT modify existing club detail page structure extensively
- Only add the component to the club details page
- Do NOT implement backend functionality yet (buttons can be placeholders with modal/links)
- Do NOT modify other club pages or components
- Do NOT change database schema
- Use existing hooks/utilities when available
- Follow Next.js 16 patterns (client component for interactivity)

**Styling Constraints**:

- Use Bootstrap 5.3.3 classes only (no custom CSS unless necessary)
- Follow existing button styling patterns
- Match brand colors from `docs/BRAND_GUIDELINES.md`
- Responsive: mobile-friendly positioning
- Do NOT override global styles
- Use existing SCSS patterns if custom styles needed

**Accessibility Constraints**:

- Keyboard navigable (Tab, Enter, Escape)
- ARIA labels for screen readers
- Focus indicators visible
- Semantic HTML (button elements, proper roles)

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━
**Files to Create**:

1. `src/components/features/clubs/ClubClaimProfile.tsx` - Main component

**Files to Modify**:

1. `src/app/(public)/cluburi/[slug]/page.tsx` - Add component import and usage

**Implementation Structure**:

- Client Component with `"use client"` directive
- Scroll detection hook (use existing pattern or create new)
- Sticky positioning with CSS (Bootstrap + minimal custom if needed)
- Button/zone UI with Bootstrap classes
- Modal or navigation for action buttons (temporary placeholder)

**Code Format**:

- TypeScript with proper types
- React functional component
- Bootstrap utility classes
- Minimal custom SCSS (if needed, add to `public/assets/scss/components/_clubs.scss`)

━━━━━━━━━━━━━━━━━━━━
CODE CHANGE RULES
━━━━━━━━━━━━━━━━━━━━

- Use minimal diffs: only create new component and add to page
- Preserve existing code style and patterns
- Do NOT refactor unrelated code in club details page
- Do NOT modify other club components
- Follow existing TypeScript/React patterns in the codebase
- Use existing hooks (e.g., scroll detection from `useStickyHeader.ts` pattern)
- Maintain backward compatibility
- Add proper TypeScript types for props
- Error handling: follow existing error handling patterns (graceful degradation if scroll detection fails)
- Component should handle edge cases: no club data, mobile viewport, scroll disabled

━━━━━━━━━━━━━━━━━━━━
ACCEPTANCE CRITERIA
━━━━━━━━━━━━━━━━━━━━
**Functional Requirements**:

- ✅ Sticky button/zone appears on club details page
- ✅ Button/zone shows after user scrolls down (detectable threshold)
- ✅ Primary message displayed: "Ești reprezentantul acestui club? Revendică profilul"
- ✅ Two action buttons visible: "Corectează date" and "Solicită ascunderea profilului"
- ✅ Buttons are clickable (can be placeholders that show modal/alert for now)
- ✅ Responsive: works on mobile, tablet, desktop
- ✅ Accessible: keyboard navigable, screen reader friendly

**Technical Requirements**:

- ✅ Client Component created: `ClubClaimProfile.tsx`
- ✅ Component added to club details page
- ✅ Uses Bootstrap 5.3.3 classes
- ✅ All text in Romanian
- ✅ TypeScript types properly defined
- ✅ No console errors or warnings
- ✅ No linting errors

**UI/UX Requirements**:

- ✅ Sticky positioning: visible but not blocking content
- ✅ Appropriate z-index: above content, below modals
- ✅ Brand colors used: Primary/Secondary from brand guidelines
- ✅ Smooth scroll detection (no janky behavior)
- ✅ Mobile-friendly: adapts to small screens
- ✅ Matches existing design patterns

━━━━━━━━━━━━━━━━━━━━
IMPLEMENTATION NOTES
━━━━━━━━━━━━━━━━━━━━
**Suggested Approach**:

1. Create `ClubClaimProfile.tsx` client component
2. Use `useState` + `useEffect` for scroll detection (similar to BackToTop pattern)
3. Position: `position: fixed`, `bottom: 20px`, `right: 20px` (desktop) or `bottom: 20px`, `left: 50%`, `transform: translateX(-50%)` (mobile)
4. Styling: Bootstrap card or button group with primary/secondary buttons
5. Actions: For now, buttons can trigger modals/alerts or navigate to contact page
6. Add component to club details page after all sections, before closing fragment

**Future Enhancements** (NOT in scope):

- Backend API for claiming profile
- Authentication check (club admin role)
- Profile claim form modal
- Admin dashboard integration
- Email notifications for claim requests

━━━━━━━━━━━━━━━━━━━━
EXAMPLES
━━━━━━━━━━━━━━━━━━━━
**Component Structure Example**:

```typescript
"use client";

import { useState, useEffect } from "react";
import { Button } from "react-bootstrap"; // Or Bootstrap classes

interface ClubClaimProfileProps {
  clubId: string;
  clubSlug: string;
}

export default function ClubClaimProfile({ clubId, clubSlug }: ClubClaimProfileProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 300; // Show after 300px scroll
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="club-claim-profile-sticky">
      {/* Component implementation */}
    </div>
  );
}
```

**Page Integration Example**:

```typescript
// In src/app/(public)/cluburi/[slug]/page.tsx
import ClubClaimProfile from "@/components/features/clubs/ClubClaimProfile";

export default async function ClubDetailPage({ params }: ClubDetailPageProps) {
  // ... existing code ...

  return (
    <>
      {/* ... existing sections ... */}
      <ClubClaimProfile clubId={club!.id} clubSlug={slug} />
    </>
  );
}
```

━━━━━━━━━━━━━━━━━━━━
NOTES
━━━━━━━━━━━━━━━━━━━━

- This is a UI-only implementation (backend functionality comes later)
- Focus on creating a clean, accessible, responsive sticky component
- Follow existing patterns from BackToTop component for scroll detection
- Ensure the component doesn't interfere with existing club detail page functionality
- Consider mobile UX: sticky elements can be intrusive on small screens

━━━━━━━━━━━━━━━━━━━━
REFERENCES
━━━━━━━━━━━━━━━━━━━━

- `src/components/Common/BackToTop.tsx` - Sticky button pattern
- `src/hooks/useStickyHeader.ts` - Scroll detection hook pattern
- `docs/BRAND_GUIDELINES.md` - Brand colors and styling
- `src/app/(public)/cluburi/[slug]/page.tsx` - Target page
- `memory-bank/promptingSystem.md` - Prompting standard

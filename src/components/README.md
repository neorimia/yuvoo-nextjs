# Components Organization

This directory contains all React components for the Yuvoo application.

## Current Structure (Kindedo Theme - Initial)

The current structure follows the Kindedo template organization. We keep this structure initially for compatibility and gradual migration.

### Component Categories

#### 1. Feature Components (To be adapted for Yuvoo)

**Class → Club** (`components/Class/`):

- `ClassesMain.tsx` - Club listing page
- `ClassDetailsMain.tsx` - Club detail page
- `HomeClassArea.tsx` - Homepage club section
- `ClassDetailsWidget.tsx` - Club sidebar widgets
- **Adaptation**: Add verification badges, sport filters, location map

**Teacher → Doctor** (`components/Teacher/`):

- `TeachersMain.tsx` - Doctor listing page
- `TeacherDetailsMain.tsx` - Doctor detail page
- `HomeTeacherArea.tsx` - Homepage doctor section
- **Adaptation**: Add medical specialties, availability calendar

**Program → Sport** (`components/Program/`):

- `ProgramsMain.tsx` - Sport listing page
- `ProgramDetailsMain.tsx` - Sport detail page
- `HomeProgramArea.tsx` - Homepage sport section
- **Adaptation**: Add AI recommendation display, match scores

#### 2. Layout Components

**Header** (`layouts/Header/`):

- Multiple variants: HeaderOne, HeaderTwo, HeaderThree, HeaderFour
- **Action**: Update logo and branding for Yuvoo

**Footer** (`layouts/Footer/`):

- Multiple variants: FooterOne, FooterTwo, FooterThree
- **Action**: Update links, copyright, branding

**Wrapper** (`layouts/Wrapper.tsx`):

- Page wrapper component
- **Action**: Update if needed

#### 3. Reusable Components (No adaptation needed)

**Auth** (`components/Auth/`):

- `LoginMain.tsx` - Login page
- `RegisterMain.tsx` - Registration page
- `ForgotPasswordMain.tsx` - Password reset
- **Status**: ✅ Ready to use

**Common** (`components/Common/`):

- `Breadcrumb/` - Navigation breadcrumbs
- `Pagination/` - Pagination component
- `Preloader/` - Loading states
- `BackToTop/` - Scroll to top button
- `CounterUp/` - Animated counters
- `Countdown/` - Countdown timer
- **Status**: ✅ Ready to use

**Form** (`components/Form/`):

- `ContactForm.tsx` - Contact form
- `SignInForm.tsx` - Sign in form
- `SignUpMain.tsx` - Sign up form
- `ReviewForm.tsx` - Review form
- **Status**: ✅ Ready to use (may need validation updates)

**UI** (`components/UI/`):

- `NiceSelect.tsx` - Styled dropdown
- **Status**: ✅ Ready to use

#### 4. Marketing Components

**HeroArea** (`components/HeroArea/`):

- `HeroHomeOne.tsx`, `HeroHomeTwo.tsx`, `HeroHomeThree.tsx`
- **Status**: ✅ Ready to use (update content for Yuvoo)

**Banner** (`components/Banner/`):

- `HomeBannerArea.tsx`, `HomeThreeBannerArea.tsx`
- **Status**: ✅ Ready to use

**Testimonial** (`components/Testimonial/`):

- `TestimonialMain.tsx`, `HomeTestimonialArea.tsx`
- **Status**: ✅ Ready to use (update content for Yuvoo)

**Gallery** (`components/Gallery/`):

- `GalleryMain.tsx`, `HomeTwoGalleryArea.tsx`
- **Status**: ✅ Ready to use

**FAQ** (`components/FAQ/`):

- `FaqMain.tsx`, `FaqQuestions.tsx`
- **Status**: ✅ Ready to use (update content for Yuvoo)

**Contact** (`components/Contact/`):

- `ContactFormMain.tsx`
- **Status**: ✅ Ready to use

#### 5. Components to Remove/Repurpose (Phase 1)

**Shop** (`components/Shop/`):

- Not needed in Phase 1 MVP
- **Action**: Can be removed or kept for future use

**Blog** (`components/Blog/`):

- Optional, can be repurposed for blog/news
- **Action**: Keep for now, repurpose later

**News** (if exists):

- Optional, can be repurposed
- **Action**: Keep for now

## Future Organization (Planned)

Once we migrate to the new structure, components will be organized as:

```
components/
├── ui/              # Bootstrap wrapper components
├── layout/          # Header, Footer, Sidebar (migrate from layouts/)
├── features/       # Feature-specific components
│   ├── quiz/       # Quiz components
│   ├── clubs/      # Club components (from Class/)
│   ├── doctors/    # Doctor components (from Teacher/)
│   ├── sports/     # Sport components (from Program/)
│   └── children/   # Child profile components
├── forms/          # Reusable form components (from Form/)
└── shared/         # Common components (from Common/)
```

## Migration Strategy

### Phase 1: Keep Current Structure

- ✅ Keep Kindedo structure as-is
- ✅ Document component mapping
- ✅ Update branding (logo, colors, text)
- ✅ Adapt component props/data for Yuvoo domain

### Phase 2: Gradual Migration (Future)

- Migrate to feature-based organization
- Use Bootstrap wrapper components (BootstrapButton, BootstrapInput, etc.)
- Migrate from Bootstrap to Tailwind
- Refactor components as needed

## Component Usage Guidelines

### Import Paths

**Current (Kindedo structure)**:

```tsx
import ClassesMain from "@/components/Class/ClassesMain";
import HeaderOne from "@/layouts/Header/HeaderOne";
```

**Future (organized structure)**:

```tsx
import ClubsMain from "@/components/features/clubs/ClubsMain";
import Header from "@/components/layout/Header";
```

### Naming Conventions

- **PascalCase** for component files: `ClubsMain.tsx`
- **PascalCase** for component names: `ClubsMain`
- **camelCase** for props and functions
- **Descriptive names**: Use domain-specific names (Club, Doctor, Sport)

### Component Patterns

1. **Server Components by default** - Use client components only when needed
2. **Type safety** - Use TypeScript types from `modules/*/types.ts`
3. **Server Actions** - Use actions from `app/actions/` for data mutations
4. **Romanian language** - All user-facing text must be in Romanian

## Component Adaptation Checklist

### Class → Club Components

- [ ] Update component names and props
- [ ] Add verification badge display
- [ ] Add sport filter UI
- [ ] Add location map integration
- [ ] Update data structure (class-data.ts → club-data.ts)
- [ ] Update routes (classes → clubs)

### Teacher → Doctor Components

- [ ] Update component names and props
- [ ] Add medical specialty display
- [ ] Add availability calendar
- [ ] Update data structure (teacher-data.ts → doctor-data.ts)
- [ ] Update routes (teachers → doctors)

### Program → Sport Components

- [ ] Update component names and props
- [ ] Add AI recommendation display
- [ ] Add match score visualization
- [ ] Update data structure (program-data.ts → sport-data.ts)
- [ ] Update routes (programs → sports)

## Notes

- All components use **Bootstrap 5.3.3** + **SCSS** ✅
- Bootstrap wrapper components available in `src/components/UI/` (BootstrapButton, BootstrapInput, etc.)
- Custom Yuvoo-branded utilities via Bootstrap Utility API
- Test thoroughly after any component adaptations

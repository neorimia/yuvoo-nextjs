# Component Analysis - Yuvoo Project

**Date**: 2025-01-10  
**Status**: Comprehensive analysis of existing Kindedo theme components

## Executive Summary

This document provides a detailed analysis of all components in the `src/components/` directory, their current state, dependencies, props, and adaptation requirements for the Yuvoo project.

**Total Components Analyzed**: ~80+ components across 25+ directories

---

## Component Inventory by Category

### 1. Feature Components (Domain-Specific)

#### Class Components → Club Adaptation

**Location**: `src/components/Class/`

| Component             | File                        | Lines | Props                  | Status   | Notes                                         |
| --------------------- | --------------------------- | ----- | ---------------------- | -------- | --------------------------------------------- |
| ClassesMain           | `ClassesMain.tsx`           | ~200  | `classes: Class[]`     | ✅ Ready | Main listing page - needs Club data structure |
| ClassDetailsMain      | `ClassDetailsMain.tsx`      | ~300  | `class: Class`         | ✅ Ready | Detail page - needs Club props                |
| HomeClassArea         | `HomeClassArea.tsx`         | ~150  | `classes: Class[]`     | ✅ Ready | Homepage section - needs Club data            |
| ClassDetailsWidget    | `ClassDetailsWidget.tsx`    | ~100  | `class: Class`         | ✅ Ready | Sidebar widget - needs Club props             |
| ClassDetailsWidgetTwo | `ClassDetailsWidgetTwo.tsx` | ~100  | `class: Class`         | ✅ Ready | Alternative sidebar widget                    |
| LearningSchedule      | `LearningSchedule.tsx`      | ~80   | `schedule: Schedule[]` | ✅ Ready | Schedule display - can be reused              |

**Dependencies**:

- Bootstrap 5.3.3 classes
- SCSS styling (`public/assets/scss/`)
- Redux (for state management in some components)
- Next.js Image component

**Adaptation Requirements**:

- [x] Create new Club components in `features/clubs/` (✅ Done: ClubsMain, ClubDetailsMain, HomeClubArea, ClubCard, VerificationBadge)
- [ ] Update data structure from `class-data.ts` to `club-data.ts`
- [ ] Add verification badge display
- [ ] Add sport filter UI
- [ ] Add location map integration
- [ ] Update routes from `/classes` to `/cluburi`

#### Teacher Components → Doctor Adaptation

**Location**: `src/components/Teacher/`

| Component          | File                     | Lines | Props                  | Status   | Notes                                         |
| ------------------ | ------------------------ | ----- | ---------------------- | -------- | --------------------------------------------- |
| TeachersMain       | `TeachersMain.tsx`       | ~200  | `teachers: Teacher[]`  | ✅ Ready | Main listing page - needs Doctor data         |
| TeacherDetailsMain | `TeacherDetailsMain.tsx` | ~300  | `teacher: Teacher`     | ✅ Ready | Detail page - needs Doctor props              |
| HomeTeacherArea    | `HomeTeacherArea.tsx`    | ~150  | `teachers: Teacher[]`  | ✅ Ready | Homepage section - needs Doctor data          |
| TeacherInfo        | `TeacherInfo.tsx`        | ~100  | `teacher: Teacher`     | ✅ Ready | Info display component                        |
| TeacherSkills      | `TeacherSkills.tsx`      | ~80   | `skills: Skill[]`      | ✅ Ready | Skills display - adapt to medical specialties |
| TeacherTimeTable   | `TeacherTimeTable.tsx`   | ~100  | `schedule: Schedule[]` | ✅ Ready | Schedule - adapt to availability calendar     |

**Dependencies**:

- Bootstrap 5.3.3
- SCSS styling
- Redux (optional)

**Adaptation Requirements**:

- [ ] Create new Doctor components in `features/doctors/`
- [ ] Update data structure from `teacher-data.ts` to `doctor-data.ts`
- [ ] Add medical specialty display
- [ ] Add availability calendar
- [ ] Add consultation booking form
- [ ] Update routes from `/teachers` to `/doctori`

#### Program Components → Sport Adaptation

**Location**: `src/components/Program/`

| Component          | File                     | Lines | Props                 | Status   | Notes                                |
| ------------------ | ------------------------ | ----- | --------------------- | -------- | ------------------------------------ |
| ProgramsMain       | `ProgramsMain.tsx`       | ~200  | `programs: Program[]` | ✅ Ready | Main listing page - needs Sport data |
| ProgramDetailsMain | `ProgramDetailsMain.tsx` | ~300  | `program: Program`    | ✅ Ready | Detail page - needs Sport props      |
| HomeProgramArea    | `HomeProgramArea.tsx`    | ~150  | `programs: Program[]` | ✅ Ready | Homepage section - needs Sport data  |
| ProgramSlider      | `ProgramSlider.tsx`      | ~100  | `programs: Program[]` | ✅ Ready | Carousel slider - can be reused      |
| HomeTwoProgramArea | `HomeTwoProgramArea.tsx` | ~150  | `programs: Program[]` | ✅ Ready | Alternative homepage section         |

**Dependencies**:

- Bootstrap 5.3.3
- SCSS styling
- Swiper.js (for slider)
- Redux (optional)

**Adaptation Requirements**:

- [ ] Create new Sport components in `features/sports/`
- [ ] Update data structure from `program-data.ts` to `sport-data.ts`
- [ ] Add AI recommendation display
- [ ] Add match score visualization
- [ ] Add reasoning explanation component
- [ ] Update routes from `/programs` to `/sporturi`

---

### 2. Layout Components

**Location**: `src/layouts/` (not in components, but related)

| Component   | File                             | Status   | Action Required         |
| ----------- | -------------------------------- | -------- | ----------------------- |
| HeaderOne   | `layouts/Header/HeaderOne.tsx`   | ✅ Ready | Update logo & branding  |
| HeaderTwo   | `layouts/Header/HeaderTwo.tsx`   | ✅ Ready | Update logo & branding  |
| HeaderThree | `layouts/Header/HeaderThree.tsx` | ✅ Ready | Update logo & branding  |
| HeaderFour  | `layouts/Header/HeaderFour.tsx`  | ✅ Ready | Update logo & branding  |
| FooterOne   | `layouts/Footer/FooterOne.tsx`   | ✅ Ready | Update links & branding |
| FooterTwo   | `layouts/Footer/FooterTwo.tsx`   | ✅ Ready | Update links & branding |
| FooterThree | `layouts/Footer/FooterThree.tsx` | ✅ Ready | Update links & branding |
| Wrapper     | `layouts/Wrapper.tsx`            | ✅ Ready | Update if needed        |

**Dependencies**:

- Bootstrap 5.3.3
- SCSS styling
- Logo assets (`public/assets/img/logo/`)

**Status**: ✅ Branding updates completed (logo references, copyright, email, social links)

---

### 3. Common/Shared Components

**Location**: `src/components/Common/`

| Component    | Directory     | File                   | Status   | Notes                                      |
| ------------ | ------------- | ---------------------- | -------- | ------------------------------------------ |
| Breadcrumb   | `Breadcrumb/` | `BreadcrumbOne.tsx`    | ✅ Ready | Navigation breadcrumbs - no changes needed |
| Pagination   | `Pagination/` | `PaginationData.tsx`   | ✅ Ready | Pagination component - no changes needed   |
| Preloader    | `Preloader/`  | `Preloader.tsx`        | ✅ Ready | Loading states - no changes needed         |
| BackToTop    | -             | `BackToTop.tsx`        | ✅ Ready | Scroll to top button - no changes needed   |
| CounterUp    | `CounterUp/`  | `CountUpContent.tsx`   | ✅ Ready | Animated counters - no changes needed      |
| Countdown    | `Countdown/`  | `CountdownSection.tsx` | ✅ Ready | Countdown timer - no changes needed        |
| ThemeChanger | -             | `ThemeChanger.tsx`     | ✅ Ready | Theme switcher - optional                  |
| TypedText    | -             | `TypedText.tsx`        | ✅ Ready | Typed.js wrapper - no changes needed       |

**Dependencies**:

- Bootstrap 5.3.3
- SCSS styling
- External libraries: `react-countup`, `typed.js`, `wow.js`

**Status**: ✅ All ready to use without modifications

---

### 4. Form Components

**Location**: `src/components/Form/`

| Component          | File                     | Status      | Action Required              |
| ------------------ | ------------------------ | ----------- | ---------------------------- |
| ContactForm        | `ContactForm.tsx`        | ✅ Ready    | Update validation (Zod)      |
| SignInForm         | `SignInForm.tsx`         | ✅ Ready    | Integrate Stack Auth         |
| SignUpMain         | `SignUpMain.tsx`         | ✅ Ready    | Integrate Stack Auth         |
| ForgotForm         | `ForgotForm.tsx`         | ✅ Ready    | Integrate Stack Auth         |
| ReviewForm         | `ReviewForm.tsx`         | ✅ Ready    | Update for clubs/doctors     |
| BlogReplyForm      | `BlogReplyForm.tsx`      | ✅ Ready    | Optional - for blog          |
| ReturningLoginForm | `ReturningLoginForm.tsx` | ✅ Ready    | Integrate Stack Auth         |
| CouponInfoForm     | `CouponInfoForm.tsx`     | ⚠️ Optional | For shop - not needed in MVP |
| ErrorMassage       | `ErrorMassage.tsx`       | ✅ Ready    | Error display component      |

**Dependencies**:

- Bootstrap 5.3.3
- SCSS styling
- React Hook Form (some components)
- Validation libraries (to be updated to Zod)

**Status**: ✅ Ready to use, but need Stack Auth integration

---

### 5. Auth Components

**Location**: `src/components/Auth/`

| Component          | File                     | Status   | Action Required      |
| ------------------ | ------------------------ | -------- | -------------------- |
| LoginMain          | `LoginMain.tsx`          | ✅ Ready | Integrate Stack Auth |
| RegisterMain       | `RegisterMain.tsx`       | ✅ Ready | Integrate Stack Auth |
| ForgotPasswordMain | `ForgotPasswordMain.tsx` | ✅ Ready | Integrate Stack Auth |

**Dependencies**:

- Bootstrap 5.3.3
- SCSS styling
- Form components from `Form/`
- Stack Auth (to be integrated)

**Status**: ✅ Ready to use, but need Stack Auth integration

---

### 6. Marketing Components

**Location**: `src/components/`

| Component   | Directory      | Files                                                     | Status   | Action Required          |
| ----------- | -------------- | --------------------------------------------------------- | -------- | ------------------------ |
| HeroArea    | `HeroArea/`    | `HeroHomeOne.tsx`, `HeroHomeTwo.tsx`, `HeroHomeThree.tsx` | ✅ Ready | Update content for Yuvoo |
| Banner      | `Banner/`      | `HomeBannerArea.tsx`, `HomeThreeBannerArea.tsx`           | ✅ Ready | Update content for Yuvoo |
| Testimonial | `Testimonial/` | `TestimonialMain.tsx`, `HomeTestimonialArea.tsx`, etc.    | ✅ Ready | Update content for Yuvoo |
| Gallery     | `Gallery/`     | `GalleryMain.tsx`, `HomeTwoGalleryArea.tsx`               | ✅ Ready | Update content for Yuvoo |
| FAQ         | `FAQ/`         | `FaqMain.tsx`, `FaqQuestions.tsx`, `FaqShop.tsx`          | ✅ Ready | Update content for Yuvoo |
| Contact     | `Contact/`     | `ContactFormMain.tsx`                                     | ✅ Ready | Update content for Yuvoo |
| Newsletter  | `Newsletter/`  | `HomeNewsletter.tsx`                                      | ✅ Ready | Update content for Yuvoo |
| About       | `About/`       | `HomeAboutArea.tsx`, `HomeThreeAboutArea.tsx`             | ✅ Ready | Update content for Yuvoo |
| Fact        | `Fact/`        | `AboutFactArea.tsx`                                       | ✅ Ready | Update content for Yuvoo |
| Feature     | `Feature/`     | `HomeThreeFeatureArea.tsx`                                | ✅ Ready | Update content for Yuvoo |
| Promotion   | `Promotion/`   | `HomePromotionArea.tsx`, etc.                             | ✅ Ready | Update content for Yuvoo |

**Dependencies**:

- Bootstrap 5.3.3
- SCSS styling
- Animation libraries (WOW.js, Animate.css)
- Swiper.js (for sliders)

**Status**: ✅ Ready to use, but need content updates for Yuvoo branding

---

### 7. Blog Components (Optional)

**Location**: `src/components/Blog/`

| Component   | File                      | Status   | Notes                                  |
| ----------- | ------------------------- | -------- | -------------------------------------- |
| BlogMain    | `BlogPageMain.tsx`        | ✅ Ready | Optional - can repurpose for news/blog |
| BlogDetails | `BlogDetailsMain.tsx`     | ✅ Ready | Optional - can repurpose               |
| BlogComment | `BlogComment.tsx`         | ✅ Ready | Optional - can repurpose               |
| BlogSidebar | `Sidebar/BlogSidebar.tsx` | ✅ Ready | Optional - can repurpose               |

**Status**: ⚠️ Optional - not in Phase 1 MVP, can be repurposed later

---

### 8. Shop Components (Not Needed in MVP)

**Location**: `src/components/Shop/`

| Component    | File                  | Status        | Notes              |
| ------------ | --------------------- | ------------- | ------------------ |
| ShopMain     | `ShopMain.tsx`        | ❌ Not Needed | Not in Phase 1 MVP |
| ShopDetails  | `ShopDetailsMain.tsx` | ❌ Not Needed | Not in Phase 1 MVP |
| CartMain     | `CartMain.tsx`        | ❌ Not Needed | Not in Phase 1 MVP |
| CheckoutMain | `CheckoutMain.tsx`    | ❌ Not Needed | Not in Phase 1 MVP |
| WishlistMain | `WishlistMain.tsx`    | ❌ Not Needed | Not in Phase 1 MVP |

**Status**: ❌ Not needed in Phase 1 MVP - can be removed or kept for future use

---

### 9. UI Components

**Location**: `src/components/UI/`

| Component  | File             | Status   | Notes                          |
| ---------- | ---------------- | -------- | ------------------------------ |
| NiceSelect | `NiceSelect.tsx` | ✅ Ready | Styled dropdown - ready to use |

**Dependencies**:

- Bootstrap 5.3.3
- SCSS styling
- Nice Select library

**Status**: ✅ Ready to use

---

### 10. SVG Components

**Location**: `src/components/SVG/`

| Component         | File                | Status   | Notes                   |
| ----------------- | ------------------- | -------- | ----------------------- |
| EmailSvgIcon      | `EmailSvgIcon.tsx`  | ✅ Ready | SVG icon component      |
| EyeCutSvgIcon     | `EyeCutSvgIcon.tsx` | ✅ Ready | SVG icon component      |
| LockSvgIcon       | `LockSvgIcon.tsx`   | ✅ Ready | SVG icon component      |
| UserSvgIcon       | `UserSvgIcon.tsx`   | ✅ Ready | SVG icon component      |
| ProgramSvgOne-Six | `ProgramSvg*.tsx`   | ✅ Ready | Program/Sport SVG icons |

**Status**: ✅ Ready to use

---

### 11. Popup/Modal Components

**Location**: `src/components/Popup/`

| Component        | File                   | Status      | Notes                        |
| ---------------- | ---------------------- | ----------- | ---------------------------- |
| GlobalVideoModal | `GlobalVideoModal.tsx` | ✅ Ready    | Video modal - ready to use   |
| ProductModal     | `ProductModal.tsx`     | ⚠️ Optional | For shop - not needed in MVP |
| VideoModal       | `VideoModal.tsx`       | ✅ Ready    | Video modal - ready to use   |

**Dependencies**:

- Bootstrap 5.3.3
- SCSS styling
- React Photo View (for image viewing)

**Status**: ✅ Ready to use (except ProductModal)

---

### 12. Category Components

**Location**: `src/components/Categories/`

| Component           | File                      | Status   | Notes                    |
| ------------------- | ------------------------- | -------- | ------------------------ |
| ClassCategories     | `ClassCategories.tsx`     | ✅ Ready | Adapt to ClubCategories  |
| ProgramCategories   | `ProgramCategories.tsx`   | ✅ Ready | Adapt to SportCategories |
| CategoriesHomeThree | `CategoriesHomeThree.tsx` | ✅ Ready | Homepage categories      |

**Status**: ✅ Ready to use, but need adaptation for Yuvoo domain

---

### 13. TimeTable Components

**Location**: `src/components/TimeTable/`

| Component      | File                 | Status   | Notes                            |
| -------------- | -------------------- | -------- | -------------------------------- |
| TimeTablesMain | `TimeTablesMain.tsx` | ✅ Ready | Schedule display - can be reused |

**Status**: ✅ Ready to use

---

## New Components Created for Yuvoo

**Location**: `src/components/features/clubs/`

| Component         | File                    | Status     | Notes                      |
| ----------------- | ----------------------- | ---------- | -------------------------- |
| ClubsMain         | `ClubsMain.tsx`         | ✅ Created | Club listing page          |
| ClubDetailsMain   | `ClubDetailsMain.tsx`   | ✅ Created | Club detail page           |
| HomeClubArea      | `HomeClubArea.tsx`      | ✅ Created | Homepage club section      |
| ClubCard          | `ClubCard.tsx`          | ✅ Created | Club card component        |
| VerificationBadge | `VerificationBadge.tsx` | ✅ Created | Verification badge display |

**Status**: ✅ Core Club components created and ready

---

## Component Dependencies Analysis

### External Libraries Used

| Library          | Version | Used In              | Status     |
| ---------------- | ------- | -------------------- | ---------- |
| Bootstrap        | 5.3.3   | All components       | ✅ Current |
| SCSS             | 1.75.0  | All components       | ✅ Current |
| React Hook Form  | 7.56.1  | Form components      | ✅ Current |
| Swiper           | 11.2.4  | Sliders, carousels   | ✅ Current |
| React Countup    | 6.5.3   | CounterUp components | ✅ Current |
| Typed.js         | 2.1.0   | TypedText component  | ✅ Current |
| WOW.js           | 1.2.2   | Scroll animations    | ✅ Current |
| React Photo View | 1.2.7   | Image galleries      | ✅ Current |
| Redux Toolkit    | 2.8.2   | State management     | ✅ Current |
| React Redux      | 9.2.0   | Redux bindings       | ✅ Current |

### Internal Dependencies

| Dependency           | Used In               | Notes                 |
| -------------------- | --------------------- | --------------------- |
| `@/lib/routes`       | Navigation components | ✅ Centralized routes |
| `@/modules/*/types`  | Feature components    | ✅ Type definitions   |
| `@/app/actions/*`    | Form components       | ✅ Server Actions     |
| `@/lib/auth/session` | Auth components       | ✅ Session management |

---

## Component Patterns & Best Practices

### 1. Server vs Client Components

**Current Pattern (Kindedo)**:

- Most components are Client Components (`"use client"`)
- Uses Redux for state management
- Client-side data fetching

**Future Pattern (Yuvoo)**:

- Server Components by default
- Server Actions for data mutations
- Client Components only when needed (interactivity, hooks)

### 2. Styling Approach

**Current**:

- Bootstrap 5.3.3 utility classes
- SCSS for custom styles
- Component-specific SCSS files

**Future (Planned)**:

- Tailwind CSS for new components
- shadcn/ui component library
- Gradual migration from Bootstrap

### 3. Type Safety

**Current**:

- TypeScript interfaces in component files
- Some `any` types (to be fixed)

**Future**:

- Types from `modules/*/types.ts`
- Strict TypeScript configuration
- No `any` types

### 4. Language & Localization

**Current**:

- Mixed English/Romanian text

**Required**:

- All user-facing text in Romanian
- Consistent Romanian terminology
- SEO-friendly Romanian paths

---

## Component Statistics

### By Status

- ✅ **Ready to Use**: ~60 components
- 🔄 **Needs Adaptation**: ~15 components (Class→Club, Teacher→Doctor, Program→Sport)
- 📋 **To Be Created**: ~10 components (Quiz, Children, Bookings, Favorites)
- ❌ **Not Needed**: ~5 components (Shop components)

### By Category

- **Feature Components**: ~20 components
- **Layout Components**: ~8 components
- **Common/Shared**: ~8 components
- **Form Components**: ~9 components
- **Marketing**: ~15 components
- **Auth**: ~3 components
- **UI/Utility**: ~10 components
- **Optional/Not Needed**: ~10 components

---

## Migration Roadmap

### Phase 1: Current (In Progress)

1. ✅ Document component structure
2. ✅ Create component mapping
3. ✅ Update branding (logo, colors, text)
4. ✅ Create core Club components
5. 🔄 Adapt remaining Class→Club components
6. 📋 Adapt Teacher→Doctor components
7. 📋 Adapt Program→Sport components

### Phase 2: Future

1. Create Quiz components
2. Create Children components
3. Create Booking components
4. Create Favorites components
5. Migrate to feature-based organization
6. Introduce shadcn/ui components
7. Migrate from Bootstrap to Tailwind

---

## Recommendations

### Immediate Actions

1. ✅ **Component Analysis** - Complete (this document)
2. ✅ **Component Mapping** - Complete (`COMPONENT_MAPPING.md`)
3. ✅ **Core Club Components** - Complete (`features/clubs/`)
4. 📋 **Integrate Stack Auth** - Update Auth components
5. 📋 **Update Data Structures** - Create `club-data.ts`, `doctor-data.ts`, `sport-data.ts`

### Short-term (Next 2-4 weeks)

1. Complete Class→Club adaptation
2. Start Teacher→Doctor adaptation
3. Start Program→Sport adaptation
4. Create Quiz components
5. Create Children components

### Long-term (Future)

1. Migrate to Tailwind CSS
2. Introduce shadcn/ui
3. Refactor to Server Components
4. Optimize bundle size
5. Improve accessibility

---

## Notes

- All components currently use **Bootstrap 5.3.3** + **SCSS**
- Future migration to **Tailwind CSS** + **shadcn/ui** is planned
- Keep existing components functional during migration
- Test thoroughly after any component adaptations
- All user-facing text must be in **Romanian**
- Use centralized routes from `@/lib/routes`
- Use Server Actions from `@/app/actions/`
- Use types from `@/modules/*/types.ts`

---

**Last Updated**: 2025-01-10  
**Next Review**: After Phase 1 component adaptations are complete

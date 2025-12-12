# Tailwind CSS & shadcn/ui Removal Plan

**Date**: 2025-01-XX  
**Objective**: Remove Tailwind CSS and shadcn/ui, keep only Bootstrap 5.3.3 and SCSS  
**Status**: Planning Phase

**Bootstrap Documentation**: [https://getbootstrap.com/docs/5.3/getting-started/introduction/](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

---

## Executive Summary

This document outlines the plan to remove Tailwind CSS v4 and shadcn/ui components from the Yuvoo project, reverting to a Bootstrap 5.3.3 + SCSS-only architecture. This migration will ensure consistency across all components and simplify the styling system.

---

## Current State Analysis

### Components Using Tailwind/shadcn

#### 1. shadcn/ui Components (`src/components/UI/`)

- ✅ `button.tsx` - shadcn Button component (uses Tailwind)
- ✅ `input.tsx` - shadcn Input component (uses Tailwind)
- ✅ `textarea.tsx` - shadcn Textarea component (uses Tailwind)
- ✅ `select.tsx` - shadcn Select component (uses Tailwind)
- ✅ `alert.tsx` - shadcn Alert component (uses Tailwind)
- ✅ `progress.tsx` - shadcn Progress component (uses Tailwind)
- ⚠️ `NiceSelect.tsx` - Custom component (uses Bootstrap, keep)

**Action**: Replace all shadcn components with Bootstrap equivalents

#### 2. Onboarding Components (`src/components/features/onboarding/`)

- ✅ `OnboardingNavigation.tsx` - Uses shadcn Button, Alert (Tailwind classes)
- ✅ `OnboardingProgress.tsx` - Uses shadcn Progress (Tailwind classes)
- ✅ `ClubBasicInfoForm.tsx` - Uses shadcn Input, Textarea, Select, Alert
- ✅ `AddChildForm.tsx` - Uses shadcn components
- ✅ `ClubContactScheduleForm.tsx` - Uses shadcn components
- ✅ `ClubPricingAgesForm.tsx` - Uses shadcn components
- ✅ `ClubPhotosForm.tsx` - Uses shadcn components
- ✅ `ClubVerificationForm.tsx` - Uses shadcn components
- ✅ `DoctorBasicInfoForm.tsx` - Uses shadcn components
- ✅ `DoctorBioExperienceForm.tsx` - Uses shadcn components
- ✅ `DoctorLocationContactForm.tsx` - Uses shadcn components
- ✅ `DoctorPhotoForm.tsx` - Uses shadcn components
- ✅ `DoctorVerificationForm.tsx` - Uses shadcn components
- ✅ `DoctorAvailabilityForm.tsx` - Uses shadcn components
- ✅ `components/FormField.tsx` - Uses shadcn Input
- ✅ `components/ServerErrorAlert.tsx` - Uses custom Tailwind classes
- ✅ `components/InfoBox.tsx` - Uses Tailwind classes

**Action**: Replace all shadcn components with Bootstrap form components

#### 3. Other Components Using Tailwind

- ✅ `features/clubs/ClubCard.tsx` - May use Tailwind classes
- ✅ `features/clubs/ClubsMain.tsx` - May use Tailwind classes
- ✅ `shared/InfoTooltip.tsx` - May use Tailwind classes

**Action**: Audit and replace with Bootstrap classes

### Components Using Bootstrap (Keep As-Is)

#### Form Components (`src/components/Form/`)

- ✅ `SignInForm.tsx` - Uses Bootstrap (`bd-btn`, `login__input`)
- ✅ `SignUpMain.tsx` - Uses Bootstrap
- ✅ `ForgotForm.tsx` - Uses Bootstrap
- ✅ `ResetPasswordForm.tsx` - Uses Bootstrap
- ✅ `ContactForm.tsx` - Uses Bootstrap
- ✅ `ReviewForm.tsx` - Uses Bootstrap
- ✅ `EmailConfirmationForm.tsx` - Uses Bootstrap
- ✅ `BlogReplyForm.tsx` - Uses Bootstrap
- ✅ `ReturningLoginForm.tsx` - Uses Bootstrap
- ✅ `CouponInfoForm.tsx` - Uses Bootstrap

**Status**: ✅ Keep - Already using Bootstrap

#### Layout Components (`src/layouts/`)

- ✅ All Header variants - Use Bootstrap
- ✅ All Footer variants - Use Bootstrap
- ✅ Wrapper - Uses Bootstrap

**Status**: ✅ Keep - Already using Bootstrap

#### Feature Components

- ✅ `Class/*` - All use Bootstrap
- ✅ `Teacher/*` - All use Bootstrap
- ✅ `Program/*` - All use Bootstrap
- ✅ `Blog/*` - All use Bootstrap
- ✅ `Shop/*` - All use Bootstrap
- ✅ `Gallery/*` - All use Bootstrap
- ✅ `Testimonial/*` - All use Bootstrap
- ✅ `FAQ/*` - All use Bootstrap
- ✅ `Contact/*` - All use Bootstrap
- ✅ `HeroArea/*` - All use Bootstrap
- ✅ `Banner/*` - All use Bootstrap
- ✅ `Promotion/*` - All use Bootstrap
- ✅ `About/*` - All use Bootstrap
- ✅ `Fact/*` - All use Bootstrap
- ✅ `Feature/*` - All use Bootstrap
- ✅ `Product/*` - All use Bootstrap
- ✅ `Categories/*` - All use Bootstrap
- ✅ `TimeTable/*` - All use Bootstrap
- ✅ `Newsletter/*` - All use Bootstrap
- ✅ `Info/*` - All use Bootstrap
- ✅ `Popup/*` - All use Bootstrap

**Status**: ✅ Keep - Already using Bootstrap

#### Common Components (`src/components/Common/`)

- ✅ `Breadcrumb/*` - Uses Bootstrap
- ✅ `Pagination/*` - Uses Bootstrap
- ✅ `Preloader/*` - Uses Bootstrap
- ✅ `BackToTop.tsx` - Uses Bootstrap
- ✅ `CounterUp/*` - Uses Bootstrap
- ✅ `Countdown/*` - Uses Bootstrap
- ✅ `ThemeChanger.tsx` - Uses Bootstrap
- ✅ `TypedText.tsx` - Uses Bootstrap

**Status**: ✅ Keep - Already using Bootstrap

---

## Bootstrap Utility Class Mapping

### Tailwind → Bootstrap Utilities

| Tailwind Class     | Bootstrap Equivalent                     | Notes                                         |
| ------------------ | ---------------------------------------- | --------------------------------------------- |
| `bg-primary`       | `.bg-primary` or `.bg-yuvoo-primary`     | Use Bootstrap Utility API for custom colors   |
| `text-primary`     | `.text-primary` or `.text-yuvoo-primary` | Use Bootstrap Utility API                     |
| `flex`             | `.d-flex`                                | Bootstrap display utility                     |
| `grid`             | `.d-grid`                                | Bootstrap display utility                     |
| `flex-col`         | `.flex-column`                           | Bootstrap flex direction                      |
| `items-center`     | `.align-items-center`                    | Bootstrap alignment                           |
| `justify-center`   | `.justify-content-center`                | Bootstrap justification                       |
| `gap-4`            | `.gap-4`                                 | Bootstrap gap utility (5.3+)                  |
| `p-4`              | `.p-4`                                   | Bootstrap padding                             |
| `m-4`              | `.m-4`                                   | Bootstrap margin                              |
| `rounded-lg`       | `.rounded` or `.rounded-3`               | Bootstrap border radius                       |
| `shadow-md`        | `.shadow`                                | Bootstrap shadow utility                      |
| `hover:bg-primary` | `.bg-primary-hover:hover`                | Use Bootstrap Utility API with `state: hover` |
| `md:flex`          | `.d-md-flex`                             | Bootstrap responsive utilities                |
| `min-w-[120px]`    | Custom utility or inline style           | Use Bootstrap Utility API or inline style     |

**Reference**: [Bootstrap Utilities Documentation](https://getbootstrap.com/docs/5.3/utilities/)

---

## Migration Plan

### Phase 1: Preparation & Audit (Week 1)

#### 1.1 Create Bootstrap Component Library ✅

- [x] Create `src/components/UI/BootstrapButton.tsx` - Bootstrap button wrapper (using `bd-btn` pattern)
- [x] Create `src/components/UI/BootstrapInput.tsx` - Bootstrap input wrapper (using `login__input` pattern)
- [x] Create `src/components/UI/BootstrapTextarea.tsx` - Bootstrap textarea wrapper
- [x] Create `src/components/UI/BootstrapSelect.tsx` - Bootstrap select wrapper (or use `NiceSelect.tsx`)
- [x] Create `src/components/UI/BootstrapAlert.tsx` - Bootstrap alert wrapper
- [x] Create `src/components/UI/BootstrapProgress.tsx` - Bootstrap progress wrapper
- [x] Create `src/components/UI/bootstrap-index.ts` - Export index for easy imports
- [x] Create `src/components/UI/BOOTSTRAP_COMPONENTS.md` - Component documentation and migration guide

#### 1.2 Create Bootstrap Utility API Extensions ✅

- [x] Create `public/assets/scss/utils/_yuvoo-utilities.scss` - Custom Yuvoo brand utilities using Bootstrap Utility API
- [x] Add Yuvoo brand color utilities (`bg-yuvoo-primary`, `text-yuvoo-primary`, etc.)
- [x] Add hover state utilities for Yuvoo colors
- [x] Reference existing CSS variables from `_root.scss` (`--bd-theme-1`, `--bd-theme-2`, etc.)
- [x] Import in `public/assets/scss/main.scss`
- [x] Add to `public/assets/scss/utils/_index.scss` for proper module forwarding

#### 1.3 Audit All Components ✅

- [x] Search for all Tailwind class usage (`bg-`, `text-`, `flex`, `grid`, etc.)
- [x] Search for all shadcn component imports (`@/components/UI/button`, etc.)
- [x] Document all files that need changes
- [x] Create replacement mapping (Tailwind → Bootstrap classes)
- [x] Created `docs/TAILWIND_AUDIT_REPORT.md` - Comprehensive audit report with:
  - All files using shadcn/ui components (4 files identified)
  - All files using Tailwind classes (3+ files identified)
  - Complete Tailwind → Bootstrap class mapping
  - Yuvoo-specific utility replacements
  - Migration checklist for Phase 2

#### 1.4 Backup Current State

- [ ] Create feature branch: `remove-tailwind-shadcn`
- [ ] Document current Tailwind/shadcn usage
- [ ] Create rollback plan

### Phase 2: Replace shadcn Components (Week 2)

#### 2.1 Replace UI Components

- [ ] Replace `Button` with Bootstrap button (`bd-btn` pattern)
- [ ] Replace `Input` with Bootstrap input (`login__input` pattern)
- [ ] Replace `Textarea` with Bootstrap textarea
- [ ] Replace `Select` with Bootstrap select or `NiceSelect`
- [ ] Replace `Alert` with Bootstrap alert
- [ ] Replace `Progress` with Bootstrap progress bar

#### 2.2 Update Onboarding Components

- [x] Update `OnboardingNavigation.tsx` - Replace Button, Alert ✅
  - ✅ Replaced `Button` with `BootstrapButton` (submit buttons) and `bd-btn` pattern (Link buttons)
  - ✅ Replaced `Alert` + `AlertDescription` with `BootstrapAlert`
  - ✅ Replaced all Tailwind classes with Bootstrap equivalents
  - ✅ Applied Yuvoo brand utilities
  - ✅ Preserved all functionality
  - Status: ✅ Complete - Fully migrated to Bootstrap
- [x] Update `OnboardingProgress.tsx` - Replace Progress ✅
  - ✅ Replaced `Progress` with Bootstrap progress bar (direct implementation for Yuvoo colors)
  - ✅ Replaced all Tailwind classes with Bootstrap equivalents
  - ✅ Applied Yuvoo brand utilities (`bg-yuvoo-primary`, `text-yuvoo-primary`, etc.)
  - ✅ Preserved all functionality (desktop stepper, mobile progress bar, step indicators)
  - Status: ✅ Complete - Fully migrated to Bootstrap
- [x] Update `ClubBasicInfoForm.tsx` - Replace Alert, Input, Textarea, Select ✅
  - ✅ Replaced `Alert` + `AlertDescription` with `BootstrapAlert`
  - ✅ Replaced `Input` with `BootstrapInput` (4 instances)
  - ✅ Replaced `Textarea` with `BootstrapTextarea`
  - ✅ Replaced `Select` (shadcn) with `BootstrapSelect` (2 instances)
  - ✅ Replaced all Tailwind classes with Bootstrap equivalents
  - ✅ Applied Yuvoo brand utilities
  - ✅ Preserved all functionality (form validation, error handling, React Hook Form integration)
  - Status: ✅ Complete - Fully migrated to Bootstrap
- [x] Update shared components (`FormField`, `ServerErrorAlert`, `InfoBox`, `FormSection`)
  - ✅ Replaced all Tailwind classes with Bootstrap equivalents
  - ✅ Updated to use Bootstrap components (`BootstrapInput`, `BootstrapTextarea`, `BootstrapSelect`, `BootstrapAlert`)
  - ✅ Applied Yuvoo brand utilities
  - Status: ✅ Complete - All shared components migrated to Bootstrap
- [x] Update `OnboardingLayout.tsx`
  - ✅ Replaced all Tailwind classes with Bootstrap equivalents
  - ✅ Updated responsive classes (md:, lg:, sm:) to Bootstrap responsive utilities
  - ✅ Applied Yuvoo brand utilities
  - ✅ Preserved accessibility features (skip link, focus states)
  - Status: ✅ Complete - Fully migrated to Bootstrap
- [x] Update `AddChildForm.tsx`
  - ✅ Replaced all Tailwind classes with Bootstrap equivalents
  - ✅ Updated to use Bootstrap components and shared components
  - ✅ Applied Yuvoo brand utilities
  - ✅ Preserved form functionality (date picker, gender selection, validation)
  - Status: ✅ Complete - Fully migrated to Bootstrap
- [ ] Update all other form components in `features/onboarding/`
  - [x] Club onboarding forms:
    - [x] `ClubContactScheduleForm.tsx` ✅
    - [x] `ClubPhotosForm.tsx` ✅
    - [x] `ClubPricingAgesForm.tsx` ✅
    - [x] `ClubVerificationForm.tsx` ✅
    - [x] `ClubCompletionContent.tsx` ✅
    - ✅ All club forms replaced Tailwind classes with Bootstrap equivalents
    - ✅ Updated to use Bootstrap components and shared components
    - ✅ Applied Yuvoo brand utilities
    - ✅ Preserved all functionality (form validation, file uploads, React Hook Form integration)
    - Status: ✅ Complete - All club onboarding forms fully migrated to Bootstrap
  - [ ] Doctor onboarding forms:
    - [x] `DoctorBasicInfoForm.tsx` ✅
      - ✅ Replaced all Tailwind classes with Bootstrap equivalents
      - ✅ Updated to use Bootstrap components (`BootstrapInput`, `BootstrapSelect`, `BootstrapButton`)
      - ✅ Updated to use shared components (`ServerErrorAlert`)
      - ✅ Applied Yuvoo brand utilities
      - ✅ Preserved all functionality (credentials builder, form validation, React Hook Form integration)
      - Status: ✅ Complete - Fully migrated to Bootstrap
    - [x] `DoctorBioExperienceForm.tsx` ✅
    - [x] `DoctorLocationContactForm.tsx` ✅
    - [x] `DoctorPhotoForm.tsx` ✅
    - [x] `DoctorAvailabilityForm.tsx` ✅
    - [x] `DoctorVerificationForm.tsx` ✅
    - [x] `DoctorCompletionContent.tsx` ✅
    - ✅ All doctor forms replaced Tailwind classes with Bootstrap equivalents
    - ✅ Updated to use Bootstrap components and shared components
    - ✅ Applied Yuvoo brand utilities
    - ✅ Preserved all functionality (form validation, file uploads, React Hook Form integration)
    - Status: ✅ Complete - All doctor onboarding forms fully migrated to Bootstrap

#### 2.2.1 Reusable Components Created (Pattern Recognition)

During the migration process, common patterns were identified and extracted into reusable components:

- [x] `FileUploadArea.tsx` ✅
  - **Pattern**: File upload areas with dashed borders, loading states, and upload icons appeared in multiple forms
  - **Used in**: ClubPhotosForm (logo, gallery), ClubVerificationForm (documents), DoctorPhotoForm (photo), DoctorVerificationForm (documents)
  - **Features**: Bootstrap styling, Yuvoo brand colors, loading states, file type hints, max files tracking
  - **Location**: `src/components/features/onboarding/components/FileUploadArea.tsx`

- [x] `ImagePreview.tsx` ✅
  - **Pattern**: Image previews with remove buttons appeared in multiple forms
  - **Used in**: ClubPhotosForm (logo, gallery), DoctorPhotoForm (photo)
  - **Features**: Next.js Image optimization, responsive sizing, remove functionality, loading overlay
  - **Location**: `src/components/features/onboarding/components/ImagePreview.tsx`

- [x] `DocumentPreview.tsx` ✅
  - **Pattern**: Document previews with file icons and remove buttons appeared in verification forms
  - **Used in**: ClubVerificationForm, DoctorVerificationForm
  - **Features**: File type icons (PDF, DOC, images), filename display, remove functionality, loading states
  - **Location**: `src/components/features/onboarding/components/DocumentPreview.tsx`

**Pattern Recognition Principle**: When the same UI pattern appears in 3+ components, extract it into a reusable component to avoid duplication and ensure consistency.

**Export**: All reusable components exported from `src/components/features/onboarding/components/index.ts`

#### 2.3 Update Other Components

- [x] Audit and update `features/clubs/*` components ✅
  - **Audit Results**: All club components already use Bootstrap utilities and custom Kindedo theme classes
  - **Components Checked**:
    - `ClubCard.tsx` - ✅ Uses Bootstrap (`d-flex`, `justify-content-between`, `text-center`, `mb-*`, `position-absolute`, etc.)
    - `ClubsMain.tsx` - ✅ Uses Bootstrap utilities and theme classes
    - `ClubDetailsMain.tsx` - ✅ Uses Bootstrap utilities and theme classes
    - `HomeClubArea.tsx` - ✅ Uses Bootstrap utilities and theme classes
    - `VerificationBadge.tsx` - ✅ Uses custom theme classes only
  - **No Tailwind Classes Found**: All components use Bootstrap utilities (`d-flex`, `justify-content-between`, `align-items-center`, `text-center`, `mb-*`, `position-absolute`, `top-0`, `end-0`, `m-*`, `text-muted`, `small`, etc.)
  - **No shadcn/ui Components Found**: All components use native HTML elements and Bootstrap styling
  - **Status**: ✅ Complete - No migration needed, components already use Bootstrap
- [x] Audit and update `shared/InfoTooltip.tsx` ✅
  - **Found Tailwind Classes**: Component was using Tailwind utilities
  - **Replaced**:
    - `relative`, `inline-flex`, `items-center` → `position-relative`, `d-inline-flex`, `align-items-center`
    - `w-3 h-3`, `w-4 h-4`, `w-5 h-5` → Inline styles for icon sizing
    - `focus:outline-none`, `focus:ring-2`, `focus:ring-[#00BBAE]` → `focus-yuvoo-primary` (Bootstrap utility)
    - `rounded-full` → `rounded-circle`
    - `text-gray-400`, `hover:text-[#00BBAE]` → `text-secondary`, `text-yuvoo-primary-hover`
    - `transition-colors` → Inline style `transition: color 0.2s ease-in-out`
    - `absolute`, `left-0`, `sm:left-1/2`, `sm:-translate-x-1/2` → `position-absolute`, `start-0`, `start-sm-50`, `translate-middle-x-sm`
    - `bottom-full`, `mb-2` → `bottom-100`, `mb-2` (Bootstrap)
    - `w-64`, `sm:w-72` → Inline styles `width: 16rem`, `maxWidth: 18rem`
    - `p-3`, `bg-gray-900`, `text-white`, `text-sm` → `p-3`, `bg-dark`, `text-white`, `small` (Bootstrap)
    - `rounded-lg`, `shadow-lg`, `z-50` → `rounded`, `shadow`, `z-3` (Bootstrap)
    - `pointer-events-none`, `whitespace-normal` → Inline styles
    - Tooltip arrow border classes → Inline styles with Bootstrap dark color variable
  - **Status**: ✅ Complete - Fully migrated to Bootstrap with Yuvoo brand utilities
- [x] Update any other components using Tailwind ✅
  - **Found Tailwind Classes**:
    - `HomePromotionArea.tsx` - `min-w-[110px]` (Tailwind arbitrary value) ✅ Fixed
    - `Promotion/HomePromotionArea.tsx` - `min-w-[110px]` (Tailwind arbitrary value) ✅ Fixed
  - **Legacy shadcn/ui Components** (Not in use):
    - `src/components/UI/button.tsx` - Old shadcn/ui Button component (using Tailwind)
    - `src/components/UI/input.tsx` - Old shadcn/ui Input component (using Tailwind)
    - `src/components/UI/select.tsx` - Old shadcn/ui Select component (using Tailwind)
    - `src/components/UI/textarea.tsx` - Old shadcn/ui Textarea component (using Tailwind)
    - `src/components/UI/alert.tsx` - Old shadcn/ui Alert component (using Tailwind)
    - `src/components/UI/progress.tsx` - Old shadcn/ui Progress component (using Tailwind)
    - **Status**: ✅ Not imported anywhere - Can be safely removed in Phase 3
  - **Other Components Checked**:
    - Form components (`Form/*`) - ✅ Using Bootstrap utilities only
    - Homepage components (`features/home/*`) - ✅ Using Bootstrap utilities and theme classes
    - Club components (`features/clubs/*`) - ✅ Already using Bootstrap (audited earlier)
  - **Onboarding Page Files Updated** (All 19 pages):
    - Parent onboarding: `welcome/page.tsx`, `add-child/page.tsx`, `tour/page.tsx`, `quiz-intro/page.tsx` ✅
    - Club onboarding: `welcome/page.tsx`, `basic-info/page.tsx`, `contact-schedule/page.tsx`, `pricing-ages/page.tsx`, `photos/page.tsx`, `verification/page.tsx`, `complete/page.tsx` ✅
    - Doctor onboarding: `welcome/page.tsx`, `basic-info/page.tsx`, `bio-experience/page.tsx`, `location-contact/page.tsx`, `photo/page.tsx`, `verification/page.tsx`, `availability/page.tsx`, `complete/page.tsx` ✅
    - All Tailwind classes replaced with Bootstrap utilities and Yuvoo brand utilities
    - Replaced: `max-w-*`, `mx-auto`, `text-*`, `font-*`, `bg-*`, `border-*`, `rounded-*`, `p-*`, `m-*`, `space-*`, `flex`, `items-*`, `gap-*`, `shrink-*`, `w-*`, `h-*`, `shadow-*`, `hover:*`, `focus:*`, etc.
  - **Status**: ✅ Complete - All active components and pages migrated to Bootstrap

### Phase 3: Remove Tailwind Dependencies (Week 3)

#### 3.1 Remove Tailwind Packages

- [ ] Remove `tailwindcss` from `package.json`
- [ ] Remove `@tailwindcss/postcss` from `package.json`
- [ ] Remove `tw-animate-css` from `package.json`
- [ ] Remove `shadcn` CLI from `package.json`
- [ ] Remove Radix UI dependencies (`@radix-ui/*`)
- [ ] Remove `class-variance-authority` (if only used by shadcn)
- [ ] Remove `clsx` and `tailwind-merge` (if only used by shadcn)

#### 3.2 Remove Tailwind Files

- [ ] Delete `src/app/globals.css` (Tailwind config)
- [ ] Keep `src/app/globals.scss` (Bootstrap + SCSS)
- [ ] Remove `postcss.config.js` or update to remove Tailwind plugin
- [ ] Remove `tailwind.config.*` if exists

#### 3.3 Update Configuration

- [ ] Update `src/app/layout.tsx` - Remove `globals.css` import
- [ ] Keep only `globals.scss` import
- [ ] Update `.vscode/settings.json` - Remove Tailwind associations
- [ ] Update `package.json` scripts if needed

### Phase 4: Cleanup & Testing (Week 4)

#### 4.1 Code Cleanup

- [ ] Remove unused Tailwind utility classes
- [ ] Remove unused shadcn component files
- [ ] Remove unused CSS variables related to Tailwind
- [ ] Update imports across all files

#### 4.2 Testing

- [ ] Test all onboarding flows
- [ ] Test all form components
- [ ] Test all authentication pages
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test browser compatibility
- [ ] Visual regression testing

#### 4.3 Documentation

- [ ] Update `CLAUDE.md` - Remove Tailwind references
- [ ] Update `memory-bank/systemPatterns.md` - Remove Tailwind patterns
- [ ] Update component documentation
- [ ] Create Bootstrap component usage guide

---

## Bootstrap Utility API Reference

**Reference**: [Bootstrap 5.3 Utility API Documentation](https://getbootstrap.com/docs/5.3/utilities/api/)

The Bootstrap Utility API is a Sass-based tool to generate utility classes. This can be used to:

- Add custom utility classes
- Modify existing utilities
- Create responsive utilities
- Generate component-specific utilities

### Custom Yuvoo Utilities via Bootstrap API

You can extend Bootstrap's utility system to add Yuvoo-branded utilities in your SCSS:

```scss
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/utilities";

// Add Yuvoo brand color utilities
$utilities: map-merge(
  $utilities,
  (
    "bg-yuvoo-primary": (
      property: background-color,
      class: bg-yuvoo-primary,
      values: (
        #00bbae,
      ),
    ),
    "bg-yuvoo-secondary": (
      property: background-color,
      class: bg-yuvoo-secondary,
      values: (
        #ff9b24,
      ),
    ),
    "text-yuvoo-primary": (
      property: color,
      class: text-yuvoo-primary,
      values: (
        #00bbae,
      ),
    ),
  )
);

@import "bootstrap/scss/utilities/api";
```

This generates utility classes like `.bg-yuvoo-primary`, `.text-yuvoo-primary` that can be used directly in components.

---

## Bootstrap Component Replacements

### Button Replacement

**shadcn Button**:

```tsx
<Button variant="default" size="lg">
  Click
</Button>
```

**Bootstrap Button**:

```tsx
<button className="bd-btn">
  <span className="bd-btn-inner">
    <span className="bd-btn-normal">Click</span>
    <span className="bd-btn-hover">Click</span>
  </span>
</button>
```

### Input Replacement

**shadcn Input**:

```tsx
<Input type="email" placeholder="Email" />
```

**Bootstrap Input**:

```tsx
<div className="login__input">
  <input type="email" placeholder="Email" />
  <span>
    <EmailSvgIcon />
  </span>
</div>
```

### Alert Replacement

**shadcn Alert**:

```tsx
<Alert variant="destructive">
  <AlertDescription>Error message</AlertDescription>
</Alert>
```

**Bootstrap Alert**:

```tsx
<div className="alert alert-danger" role="alert">
  Error message
</div>
```

### Progress Replacement

**shadcn Progress**:

```tsx
<Progress value={50} />
```

**Bootstrap Progress**:

```tsx
<div className="progress">
  <div className="progress-bar" style={{ width: "50%" }}></div>
</div>
```

### Select Replacement

**shadcn Select**:

```tsx
<Select>
  <SelectTrigger>Choose</SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

**Bootstrap Select** (or NiceSelect):

```tsx
<select className="form-select">
  <option value="1">Option 1</option>
</select>
```

---

## File Removal List

### Files to Delete

1. **shadcn/ui Components**:
   - `src/components/UI/button.tsx`
   - `src/components/UI/input.tsx`
   - `src/components/UI/textarea.tsx`
   - `src/components/UI/select.tsx`
   - `src/components/UI/alert.tsx`
   - `src/components/UI/progress.tsx`

2. **Tailwind Configuration**:
   - `src/app/globals.css` (Tailwind config)
   - `tailwind.config.*` (if exists)
   - Update `postcss.config.js` to remove Tailwind plugin

3. **Dependencies** (from `package.json`):
   - `tailwindcss`
   - `@tailwindcss/postcss`
   - `tw-animate-css`
   - `shadcn`
   - `@radix-ui/react-progress`
   - `@radix-ui/react-select`
   - `@radix-ui/react-slot`
   - `class-variance-authority` (if only used by shadcn)
   - `clsx` (if only used by shadcn)
   - `tailwind-merge` (if only used by shadcn)

### Files to Keep

1. **Bootstrap Components**:
   - `src/components/UI/NiceSelect.tsx` ✅ Keep (uses Bootstrap)

2. **SCSS Files**:
   - `src/app/globals.scss` ✅ Keep
   - `public/assets/scss/**` ✅ Keep all SCSS files

---

## Risk Assessment

### High Risk Areas

1. **Onboarding Flow** - Extensive use of shadcn components
   - **Mitigation**: Create Bootstrap component library first, then migrate one form at a time

2. **Form Validation** - shadcn components have built-in validation styling
   - **Mitigation**: Use Bootstrap validation classes (`is-invalid`, `is-valid`)

3. **Responsive Design** - Tailwind responsive utilities need Bootstrap equivalents
   - **Mitigation**: Use Bootstrap responsive classes (`d-md-none`, `col-md-6`, etc.)

### Medium Risk Areas

1. **Component Styling** - Some components may have custom Tailwind styling
   - **Mitigation**: Audit each component, create equivalent SCSS

2. **Accessibility** - shadcn components have built-in a11y features
   - **Mitigation**: Ensure Bootstrap components have proper ARIA attributes

### Low Risk Areas

1. **Layout Components** - Already using Bootstrap
2. **Marketing Components** - Already using Bootstrap
3. **Common Components** - Already using Bootstrap

---

## Success Criteria

- [ ] All Tailwind CSS removed from codebase
- [ ] All shadcn/ui components removed
- [ ] All components use Bootstrap 5.3.3 + SCSS
- [ ] No build errors
- [ ] All forms functional
- [ ] All onboarding flows functional
- [ ] Responsive design maintained
- [ ] Accessibility maintained
- [ ] Visual design matches current state
- [ ] Bundle size reduced (no Tailwind CSS)

---

## Timeline Estimate

- **Phase 1**: 1 week (Preparation & Audit)
- **Phase 2**: 1 week (Replace Components)
- **Phase 3**: 1 week (Remove Dependencies)
- **Phase 4**: 1 week (Cleanup & Testing)

**Total**: 4 weeks

---

## Bootstrap 5.3 Documentation Reference

**Main Documentation**: [https://getbootstrap.com/docs/5.3/getting-started/introduction/](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

### Core Documentation Sections

#### Getting Started

- [Introduction](https://getbootstrap.com/docs/5.3/getting-started/introduction/) - Overview, CDN links, quick start
- [Contents](https://getbootstrap.com/docs/5.3/getting-started/contents/) - What's included in Bootstrap
- [JavaScript](https://getbootstrap.com/docs/5.3/getting-started/javascript/) - Bootstrap JS components
- [Accessibility](https://getbootstrap.com/docs/5.3/getting-started/accessibility/) - A11y best practices

#### Layout

- [Breakpoints](https://getbootstrap.com/docs/5.3/layout/breakpoints/) - Responsive breakpoints
- [Containers](https://getbootstrap.com/docs/5.3/layout/containers/) - Container classes
- [Grid](https://getbootstrap.com/docs/5.3/layout/grid/) - Grid system
- [Columns](https://getbootstrap.com/docs/5.3/layout/columns/) - Column classes
- [Gutters](https://getbootstrap.com/docs/5.3/layout/gutters/) - Spacing between columns
- [Utilities](https://getbootstrap.com/docs/5.3/layout/utilities/) - Layout utilities
- [Z-index](https://getbootstrap.com/docs/5.3/layout/z-index/) - Z-index layering

#### Content

- [Reboot](https://getbootstrap.com/docs/5.3/content/reboot/) - Normalize CSS
- [Typography](https://getbootstrap.com/docs/5.3/content/typography/) - Headings, body text, lists
- [Images](https://getbootstrap.com/docs/5.3/content/images/) - Responsive images
- [Tables](https://getbootstrap.com/docs/5.3/content/tables/) - Table styling
- [Figures](https://getbootstrap.com/docs/5.3/content/figures/) - Figure component

#### Forms

- [Overview](https://getbootstrap.com/docs/5.3/forms/overview/) - Form basics
- [Form control](https://getbootstrap.com/docs/5.3/forms/form-control/) - Input styling
- [Select](https://getbootstrap.com/docs/5.3/forms/select/) - Select dropdowns
- [Checks & radios](https://getbootstrap.com/docs/5.3/forms/checks-radios/) - Checkboxes and radio buttons
- [Range](https://getbootstrap.com/docs/5.3/forms/range/) - Range input
- [Input group](https://getbootstrap.com/docs/5.3/forms/input-group/) - Input groups
- [Floating labels](https://getbootstrap.com/docs/5.3/forms/floating-labels/) - Floating label inputs
- [Layout](https://getbootstrap.com/docs/5.3/forms/layout/) - Form layouts
- [Validation](https://getbootstrap.com/docs/5.3/forms/validation/) - Form validation

#### Components

- [Accordion](https://getbootstrap.com/docs/5.3/components/accordion/) - Collapsible content
- [Alerts](https://getbootstrap.com/docs/5.3/components/alerts/) - Alert messages
- [Badge](https://getbootstrap.com/docs/5.3/components/badge/) - Badges and labels
- [Breadcrumb](https://getbootstrap.com/docs/5.3/components/breadcrumb/) - Breadcrumb navigation
- [Buttons](https://getbootstrap.com/docs/5.3/components/buttons/) - Button styles
- [Button group](https://getbootstrap.com/docs/5.3/components/button-group/) - Button groups
- [Card](https://getbootstrap.com/docs/5.3/components/card/) - Card component
- [Carousel](https://getbootstrap.com/docs/5.3/components/carousel/) - Image carousel
- [Close button](https://getbootstrap.com/docs/5.3/components/close-button/) - Close button
- [Collapse](https://getbootstrap.com/docs/5.3/components/collapse/) - Collapsible content
- [Dropdowns](https://getbootstrap.com/docs/5.3/components/dropdowns/) - Dropdown menus
- [List group](https://getbootstrap.com/docs/5.3/components/list-group/) - List groups
- [Modal](https://getbootstrap.com/docs/5.3/components/modal/) - Modal dialogs
- [Navbar](https://getbootstrap.com/docs/5.3/components/navbar/) - Navigation bar
- [Navs & tabs](https://getbootstrap.com/docs/5.3/components/navs-tabs/) - Navigation tabs
- [Offcanvas](https://getbootstrap.com/docs/5.3/components/offcanvas/) - Offcanvas sidebar
- [Pagination](https://getbootstrap.com/docs/5.3/components/pagination/) - Pagination
- [Placeholders](https://getbootstrap.com/docs/5.3/components/placeholders/) - Loading placeholders
- [Popovers](https://getbootstrap.com/docs/5.3/components/popovers/) - Popover tooltips
- [Progress](https://getbootstrap.com/docs/5.3/components/progress/) - Progress bars
- [Scrollspy](https://getbootstrap.com/docs/5.3/components/scrollspy/) - Scroll spy navigation
- [Spinners](https://getbootstrap.com/docs/5.3/components/spinners/) - Loading spinners
- [Toasts](https://getbootstrap.com/docs/5.3/components/toasts/) - Toast notifications
- [Tooltips](https://getbootstrap.com/docs/5.3/components/tooltips/) - Tooltip hints

#### Helpers

- [Clearfix](https://getbootstrap.com/docs/5.3/helpers/clearfix/) - Clear floats
- [Color & background](https://getbootstrap.com/docs/5.3/helpers/color-background/) - Color utilities
- [Colored links](https://getbootstrap.com/docs/5.3/helpers/colored-links/) - Link colors
- [Focus ring](https://getbootstrap.com/docs/5.3/helpers/focus-ring/) - Focus styles
- [Icon link](https://getbootstrap.com/docs/5.3/helpers/icon-link/) - Icon links
- [Position](https://getbootstrap.com/docs/5.3/helpers/position/) - Position utilities
- [Ratio](https://getbootstrap.com/docs/5.3/helpers/ratio/) - Aspect ratio
- [Stacks](https://getbootstrap.com/docs/5.3/helpers/stacks/) - Vertical/horizontal stacks
- [Stretched link](https://getbootstrap.com/docs/5.3/helpers/stretched-link/) - Stretch links
- [Text truncation](https://getbootstrap.com/docs/5.3/helpers/text-truncation/) - Text truncation
- [Vertical rule](https://getbootstrap.com/docs/5.3/helpers/vertical-rule/) - Vertical divider
- [Visually hidden](https://getbootstrap.com/docs/5.3/helpers/visually-hidden/) - Screen reader only

#### Utilities

- [API](https://getbootstrap.com/docs/5.3/utilities/api/) - Utility API reference ⭐
- [Background](https://getbootstrap.com/docs/5.3/utilities/background/) - Background utilities
- [Borders](https://getbootstrap.com/docs/5.3/utilities/borders/) - Border utilities
- [Colors](https://getbootstrap.com/docs/5.3/utilities/colors/) - Color utilities
- [Display](https://getbootstrap.com/docs/5.3/utilities/display/) - Display utilities
- [Flex](https://getbootstrap.com/docs/5.3/utilities/flex/) - Flexbox utilities
- [Float](https://getbootstrap.com/docs/5.3/utilities/float/) - Float utilities
- [Interactions](https://getbootstrap.com/docs/5.3/utilities/interactions/) - Pointer events, user select
- [Link](https://getbootstrap.com/docs/5.3/utilities/link/) - Link utilities
- [Object fit](https://getbootstrap.com/docs/5.3/utilities/object-fit/) - Object fit utilities
- [Opacity](https://getbootstrap.com/docs/5.3/utilities/opacity/) - Opacity utilities
- [Overflow](https://getbootstrap.com/docs/5.3/utilities/overflow/) - Overflow utilities
- [Position](https://getbootstrap.com/docs/5.3/utilities/position/) - Position utilities
- [Shadows](https://getbootstrap.com/docs/5.3/utilities/shadows/) - Shadow utilities
- [Sizing](https://getbootstrap.com/docs/5.3/utilities/sizing/) - Width and height utilities
- [Spacing](https://getbootstrap.com/docs/5.3/utilities/spacing/) - Margin and padding utilities
- [Text](https://getbootstrap.com/docs/5.3/utilities/text/) - Text utilities
- [Vertical align](https://getbootstrap.com/docs/5.3/utilities/vertical-align/) - Vertical alignment
- [Visibility](https://getbootstrap.com/docs/5.3/utilities/visibility/) - Visibility utilities
- [Z-index](https://getbootstrap.com/docs/5.3/utilities/z-index/) - Z-index utilities

#### Customize

- [Overview](https://getbootstrap.com/docs/5.3/customize/overview/) - Customization overview
- [Sass](https://getbootstrap.com/docs/5.3/customize/sass/) - Sass customization
- [Options](https://getbootstrap.com/docs/5.3/customize/options/) - Sass variables
- [Color](https://getbootstrap.com/docs/5.3/customize/color/) - Color customization
- [Color modes](https://getbootstrap.com/docs/5.3/customize/color-modes/) - Dark mode support
- [Components](https://getbootstrap.com/docs/5.3/customize/components/) - Component customization
- [CSS variables](https://getbootstrap.com/docs/5.3/customize/css-variables/) - CSS variable customization
- [Optimize](https://getbootstrap.com/docs/5.3/customize/optimize/) - Build optimization

---

## Notes

- Keep `NiceSelect.tsx` - It's a custom Bootstrap component, not shadcn
- Maintain existing Bootstrap patterns (`bd-btn`, `login__input`, etc.)
- All Romanian text must remain unchanged
- Test thoroughly after each phase
- Create feature branch for safe migration
- **Always refer to Bootstrap 5.3 documentation** when implementing components: [https://getbootstrap.com/docs/5.3/](https://getbootstrap.com/docs/5.3/)

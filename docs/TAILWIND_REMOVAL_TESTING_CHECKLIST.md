# Tailwind Removal - Testing Checklist

**Date**: 2025-01-XX  
**Objective**: Verify all functionality works correctly after Tailwind CSS and shadcn/ui removal  
**Status**: Ready for Testing

---

## Overview

This checklist covers all areas that need to be tested after removing Tailwind CSS and shadcn/ui components. All components should now use Bootstrap 5.3.3 + SCSS exclusively.

---

## 1. Onboarding Flows Testing

### 1.1 Parent Onboarding Flow

**Route**: `/onboarding/parent/*`

- [ ] **Welcome Page** (`/onboarding/parent/welcome`)
  - [ ] Page loads correctly
  - [ ] All text displays in Romanian
  - [ ] Bootstrap styling applied correctly
  - [ ] Navigation buttons work
  - [ ] Responsive on mobile/tablet/desktop

- [ ] **Add Child Form** (`/onboarding/parent/add-child`)
  - [ ] Form fields render correctly (Bootstrap inputs)
  - [ ] Date picker works (age calculation 4-14 years)
  - [ ] Gender selection works
  - [ ] Form validation works (Zod)
  - [ ] Error messages display correctly (Bootstrap alerts)
  - [ ] Submit button works
  - [ ] Success redirect works
  - [ ] Responsive layout

- [ ] **Platform Tour** (`/onboarding/parent/tour`)
  - [ ] All 3 steps display correctly
  - [ ] Bootstrap cards/styling applied
  - [ ] Navigation works
  - [ ] Responsive layout

- [ ] **Quiz Introduction** (`/onboarding/parent/quiz-intro`)
  - [ ] Personalized child name displays
  - [ ] All content in Romanian
  - [ ] CTAs work correctly
  - [ ] Bootstrap styling applied
  - [ ] Responsive layout

- [ ] **Complete Step** (`/onboarding/parent/complete`)
  - [ ] Success message displays
  - [ ] Auto-redirect works (5 seconds)
  - [ ] Manual navigation buttons work
  - [ ] Bootstrap styling applied

**End-to-End Flow**:

- [ ] Complete entire parent onboarding flow from start to finish
- [ ] Verify progress tracking works
- [ ] Verify data persistence
- [ ] Verify redirects work correctly

### 1.2 Club Admin Onboarding Flow

**Route**: `/onboarding/club/*`

- [ ] **Welcome Page** (`/onboarding/club/welcome`)
  - [ ] Page loads correctly
  - [ ] All text in Romanian
  - [ ] Bootstrap styling applied
  - [ ] Responsive layout

- [ ] **Basic Info Form** (`/onboarding/club/basic-info`)
  - [ ] All form fields render (Bootstrap inputs/selects)
  - [ ] Sport type dropdown works
  - [ ] City dropdown works (30 Romanian cities)
  - [ ] Slug generation works
  - [ ] Form validation works
  - [ ] Error messages display (Bootstrap alerts)
  - [ ] Submit works
  - [ ] Responsive layout

- [ ] **Contact & Schedule** (`/onboarding/club/contact-schedule`)
  - [ ] Phone input works (normalization to +40XXXXXXXXX)
  - [ ] Email input works
  - [ ] Website input works (optional)
  - [ ] Dynamic schedule builder works (add/remove entries)
  - [ ] Form validation works
  - [ ] Submit works
  - [ ] Responsive layout

- [ ] **Pricing & Ages** (`/onboarding/club/pricing-ages`)
  - [ ] Dynamic pricing builder works (add/remove entries)
  - [ ] Age group selector works (4-14, multi-select)
  - [ ] Experience level selector works (multi-select)
  - [ ] Form validation works
  - [ ] Submit works
  - [ ] Responsive layout

- [ ] **Photo Upload** (`/onboarding/club/photos`)
  - [ ] Logo upload area works (Bootstrap styling)
  - [ ] Logo preview displays correctly
  - [ ] Logo removal works
  - [ ] Gallery upload works (3-10 images)
  - [ ] Image preview grid displays correctly
  - [ ] Image removal works
  - [ ] File validation works (type, size)
  - [ ] Cloudinary upload works
  - [ ] Loading states display correctly
  - [ ] Error messages display (Bootstrap alerts)
  - [ ] Responsive layout

- [ ] **Verification** (`/onboarding/club/verification`)
  - [ ] Document upload area works (Bootstrap styling)
  - [ ] Document preview displays correctly
  - [ ] Document removal works
  - [ ] File type icons display correctly
  - [ ] File validation works (PDF, DOC, DOCX, JPG, PNG, max 10MB)
  - [ ] Cloudinary upload works
  - [ ] Loading states display correctly
  - [ ] Error messages display (Bootstrap alerts)
  - [ ] Responsive layout

- [ ] **Complete Step** (`/onboarding/club/complete`)
  - [ ] Success message displays
  - [ ] Personalized greeting displays
  - [ ] Success checklist displays
  - [ ] Auto-redirect works (5 seconds)
  - [ ] Manual navigation buttons work
  - [ ] Bootstrap styling applied
  - [ ] Responsive layout

**End-to-End Flow**:

- [ ] Complete entire club onboarding flow from start to finish
- [ ] Verify all data saves correctly
- [ ] Verify file uploads work
- [ ] Verify progress tracking works
- [ ] Verify redirects work correctly

### 1.3 Doctor Onboarding Flow

**Route**: `/onboarding/doctor/*`

- [ ] **Welcome Page** (`/onboarding/doctor/welcome`)
  - [ ] Page loads correctly
  - [ ] Personalized greeting displays
  - [ ] 8-step progress indicator displays
  - [ ] All text in Romanian
  - [ ] Bootstrap styling applied
  - [ ] Responsive layout

- [ ] **Basic Info Form** (`/onboarding/doctor/basic-info`)
  - [ ] All form fields render (Bootstrap inputs/selects)
  - [ ] Specialty dropdown works (4 options)
  - [ ] Credentials multi-select works
  - [ ] Quick-add buttons work
  - [ ] Custom credential input works
  - [ ] Form validation works
  - [ ] Error messages display (Bootstrap alerts)
  - [ ] Submit works
  - [ ] Responsive layout

- [ ] **Bio & Experience** (`/onboarding/doctor/bio-experience`)
  - [ ] Bio textarea works (Bootstrap textarea)
  - [ ] Experience textarea works
  - [ ] Form validation works
  - [ ] Error messages display (Bootstrap alerts)
  - [ ] Submit works
  - [ ] Responsive layout

- [ ] **Location & Contact** (`/onboarding/doctor/location-contact`)
  - [ ] All form fields render (Bootstrap inputs/selects)
  - [ ] City dropdown works
  - [ ] Address input works
  - [ ] Phone input works (normalization)
  - [ ] Email input works
  - [ ] Website input works (optional)
  - [ ] Form validation works
  - [ ] Error messages display (Bootstrap alerts)
  - [ ] Submit works
  - [ ] Responsive layout

- [ ] **Photo Upload** (`/onboarding/doctor/photo`)
  - [ ] Photo upload area works (Bootstrap styling)
  - [ ] Photo preview displays correctly
  - [ ] Photo removal works
  - [ ] File validation works
  - [ ] Cloudinary upload works
  - [ ] Loading states display correctly
  - [ ] Error messages display (Bootstrap alerts)
  - [ ] Responsive layout

- [ ] **Availability** (`/onboarding/doctor/availability`)
  - [ ] Dynamic schedule builder works (add/remove time slots)
  - [ ] Day selection works
  - [ ] Time range inputs work
  - [ ] Form validation works
  - [ ] Error messages display (Bootstrap alerts)
  - [ ] Submit works
  - [ ] Responsive layout

- [ ] **Verification** (`/onboarding/doctor/verification`)
  - [ ] Document upload area works (Bootstrap styling)
  - [ ] Document preview displays correctly
  - [ ] Document removal works
  - [ ] File validation works
  - [ ] Cloudinary upload works
  - [ ] Loading states display correctly
  - [ ] Error messages display (Bootstrap alerts)
  - [ ] Responsive layout

- [ ] **Complete Step** (`/onboarding/doctor/complete`)
  - [ ] Success message displays
  - [ ] Personalized greeting displays
  - [ ] Success checklist displays
  - [ ] Auto-redirect works (5 seconds)
  - [ ] Manual navigation buttons work
  - [ ] Bootstrap styling applied
  - [ ] Responsive layout

**End-to-End Flow**:

- [ ] Complete entire doctor onboarding flow from start to finish
- [ ] Verify all data saves correctly
- [ ] Verify file uploads work
- [ ] Verify progress tracking works
- [ ] Verify redirects work correctly

---

## 2. Form Components Testing

### 2.1 Bootstrap Form Components

- [ ] **BootstrapButton** (`src/components/UI/BootstrapButton.tsx`)
  - [ ] All variants render correctly (primary, secondary, outline, etc.)
  - [ ] All sizes render correctly (sm, md, lg)
  - [ ] Disabled state works
  - [ ] Loading state works
  - [ ] Click handlers work
  - [ ] Bootstrap classes applied correctly
  - [ ] Responsive behavior

- [ ] **BootstrapInput** (`src/components/UI/BootstrapInput.tsx`)
  - [ ] All input types work (text, email, password, etc.)
  - [ ] Icon prop works (if provided)
  - [ ] Error state displays correctly
  - [ ] Disabled state works
  - [ ] Placeholder works
  - [ ] Bootstrap classes applied correctly
  - [ ] Responsive behavior

- [ ] **BootstrapTextarea** (`src/components/UI/BootstrapTextarea.tsx`)
  - [ ] Textarea renders correctly
  - [ ] Rows prop works
  - [ ] Error state displays correctly
  - [ ] Disabled state works
  - [ ] Placeholder works
  - [ ] Bootstrap classes applied correctly
  - [ ] Responsive behavior

- [ ] **BootstrapSelect** (`src/components/UI/BootstrapSelect.tsx`)
  - [ ] Select renders correctly
  - [ ] Options display correctly
  - [ ] Error state displays correctly
  - [ ] Disabled state works
  - [ ] Placeholder works
  - [ ] Bootstrap classes applied correctly
  - [ ] Responsive behavior

- [ ] **BootstrapAlert** (`src/components/UI/BootstrapAlert.tsx`)
  - [ ] All variants render correctly (success, danger, warning, info)
  - [ ] Dismissible alerts work
  - [ ] Icons display correctly (if provided)
  - [ ] Bootstrap classes applied correctly
  - [ ] Responsive behavior

- [ ] **BootstrapProgress** (`src/components/UI/BootstrapProgress.tsx`)
  - [ ] Progress bar renders correctly
  - [ ] Value prop works (0-100)
  - [ ] All variants render correctly (primary, secondary, etc.)
  - [ ] Animated progress works
  - [ ] Bootstrap classes applied correctly
  - [ ] Responsive behavior

### 2.2 Shared Form Components

- [ ] **FormField** (`src/components/features/onboarding/components/FormField.tsx`)
  - [ ] Label displays correctly
  - [ ] Input/textarea/select renders correctly
  - [ ] Error message displays correctly (Bootstrap alert)
  - [ ] Required indicator works
  - [ ] Help text displays correctly
  - [ ] Bootstrap styling applied
  - [ ] Responsive layout

- [ ] **ServerErrorAlert** (`src/components/features/onboarding/components/ServerErrorAlert.tsx`)
  - [ ] Error message displays correctly
  - [ ] Bootstrap alert styling applied
  - [ ] Dismissible works
  - [ ] Responsive layout

- [ ] **InfoBox** (`src/components/features/onboarding/components/InfoBox.tsx`)
  - [ ] Info variant displays correctly
  - [ ] Warning variant displays correctly
  - [ ] Icon displays correctly
  - [ ] Title displays correctly
  - [ ] Bootstrap styling applied
  - [ ] Responsive layout

- [ ] **FileUploadArea** (`src/components/features/onboarding/components/FileUploadArea.tsx`)
  - [ ] Upload area displays correctly (Bootstrap styling)
  - [ ] Drag-and-drop styling works
  - [ ] File input works
  - [ ] Loading state displays correctly
  - [ ] Error state displays correctly
  - [ ] Bootstrap classes applied
  - [ ] Responsive layout

- [ ] **ImagePreview** (`src/components/features/onboarding/components/ImagePreview.tsx`)
  - [ ] Image displays correctly (Next.js Image)
  - [ ] Remove button works
  - [ ] Loading state displays correctly
  - [ ] Bootstrap styling applied
  - [ ] Responsive layout

- [ ] **DocumentPreview** (`src/components/features/onboarding/components/DocumentPreview.tsx`)
  - [ ] File icon displays correctly
  - [ ] Filename displays correctly
  - [ ] Remove button works
  - [ ] Bootstrap styling applied
  - [ ] Responsive layout

---

## 3. Authentication Pages Testing

**Route**: `/auth/*`

- [ ] **Login Page** (`/auth/login`)
  - [ ] Page loads correctly
  - [ ] Form fields render (Bootstrap inputs)
  - [ ] Email input works
  - [ ] Password input works
  - [ ] "Remember me" checkbox works
  - [ ] "Forgot password" link works
  - [ ] Submit button works
  - [ ] Error messages display (Bootstrap alerts)
  - [ ] Success redirect works (to dashboard)
  - [ ] All text in Romanian
  - [ ] Bootstrap styling applied
  - [ ] Responsive layout

- [ ] **Sign Up Page** (`/auth/register`)
  - [ ] Page loads correctly
  - [ ] Form fields render (Bootstrap inputs)
  - [ ] Email input works
  - [ ] Password input works
  - [ ] Password confirmation works
  - [ ] Form validation works
  - [ ] Submit button works
  - [ ] Error messages display (Bootstrap alerts)
  - [ ] Success redirect works (to dashboard)
  - [ ] All text in Romanian
  - [ ] Bootstrap styling applied
  - [ ] Responsive layout

- [ ] **Forgot Password Page** (`/auth/forgot-password`)
  - [ ] Page loads correctly
  - [ ] Email input works (Bootstrap input)
  - [ ] Submit button works
  - [ ] Success message displays (Bootstrap alert)
  - [ ] Error messages display (Bootstrap alerts)
  - [ ] All text in Romanian
  - [ ] Bootstrap styling applied
  - [ ] Responsive layout

- [ ] **Reset Password Page** (`/auth/reset-password`)
  - [ ] Page loads correctly
  - [ ] Token validation works
  - [ ] Password input works (Bootstrap input)
  - [ ] Password confirmation works
  - [ ] Form validation works
  - [ ] Submit button works
  - [ ] Success redirect works (to login)
  - [ ] Error messages display (Bootstrap alerts)
  - [ ] All text in Romanian
  - [ ] Bootstrap styling applied
  - [ ] Responsive layout

- [ ] **Email Confirmation Page** (`/auth/email-confirmation`)
  - [ ] Page loads correctly
  - [ ] Token validation works
  - [ ] Success message displays (Bootstrap alert)
  - [ ] Auto-redirect works (to login)
  - [ ] Manual navigation works
  - [ ] Error messages display (Bootstrap alerts)
  - [ ] All text in Romanian
  - [ ] Bootstrap styling applied
  - [ ] Responsive layout

**End-to-End Authentication Flow**:

- [ ] Complete sign up flow
- [ ] Verify email confirmation works
- [ ] Complete login flow
- [ ] Verify password reset flow
- [ ] Verify session persistence
- [ ] Verify protected route redirects

---

## 4. Responsive Design Testing

### 4.1 Mobile Devices (< 768px)

- [ ] All onboarding pages display correctly
- [ ] All form components are usable
- [ ] All authentication pages display correctly
- [ ] Navigation works (hamburger menu if applicable)
- [ ] Forms are easy to fill on mobile
- [ ] Buttons are appropriately sized
- [ ] Text is readable
- [ ] Images scale correctly
- [ ] No horizontal scrolling

### 4.2 Tablet Devices (768px - 1024px)

- [ ] All onboarding pages display correctly
- [ ] All form components are usable
- [ ] All authentication pages display correctly
- [ ] Layout adapts appropriately
- [ ] Forms are easy to fill
- [ ] Buttons are appropriately sized
- [ ] Text is readable
- [ ] Images scale correctly

### 4.3 Desktop Devices (> 1024px)

- [ ] All onboarding pages display correctly
- [ ] All form components are usable
- [ ] All authentication pages display correctly
- [ ] Layout uses available space effectively
- [ ] Forms are easy to fill
- [ ] Buttons are appropriately sized
- [ ] Text is readable
- [ ] Images display at optimal size

**Test Devices**:

- [ ] iPhone (Safari)
- [ ] Android phone (Chrome)
- [ ] iPad (Safari)
- [ ] Android tablet (Chrome)
- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari
- [ ] Desktop Edge

---

## 5. Browser Compatibility Testing

### 5.1 Modern Browsers

- [ ] **Chrome** (latest)
  - [ ] All pages load correctly
  - [ ] All forms work
  - [ ] All Bootstrap components render correctly
  - [ ] No console errors

- [ ] **Firefox** (latest)
  - [ ] All pages load correctly
  - [ ] All forms work
  - [ ] All Bootstrap components render correctly
  - [ ] No console errors

- [ ] **Safari** (latest)
  - [ ] All pages load correctly
  - [ ] All forms work
  - [ ] All Bootstrap components render correctly
  - [ ] No console errors

- [ ] **Edge** (latest)
  - [ ] All pages load correctly
  - [ ] All forms work
  - [ ] All Bootstrap components render correctly
  - [ ] No console errors

### 5.2 Mobile Browsers

- [ ] **Mobile Safari** (iOS)
  - [ ] All pages load correctly
  - [ ] All forms work
  - [ ] Touch interactions work
  - [ ] No console errors

- [ ] **Mobile Chrome** (Android)
  - [ ] All pages load correctly
  - [ ] All forms work
  - [ ] Touch interactions work
  - [ ] No console errors

---

## 6. Visual Regression Testing

### 6.1 Visual Comparison

- [ ] Compare screenshots of all onboarding pages (before/after Tailwind removal)
- [ ] Compare screenshots of all authentication pages
- [ ] Compare screenshots of all form components
- [ ] Verify no visual regressions
- [ ] Verify Bootstrap styling matches design intent

### 6.2 Key Visual Elements

- [ ] **Colors**: Yuvoo brand colors display correctly
  - [ ] Primary color (#00BBAE)
  - [ ] Secondary color (#FF9B24)
  - [ ] Accent color (#7C81FF)
  - [ ] Light variants

- [ ] **Typography**: Fonts display correctly
  - [ ] Gabarito font loads
  - [ ] Font sizes are appropriate
  - [ ] Line heights are readable

- [ ] **Spacing**: Layout spacing is consistent
  - [ ] Form field spacing
  - [ ] Section spacing
  - [ ] Component spacing

- [ ] **Borders & Shadows**: Bootstrap styling applied
  - [ ] Form field borders
  - [ ] Card shadows
  - [ ] Button borders

- [ ] **Icons**: Icons display correctly
  - [ ] Lucide React icons
  - [ ] Font Awesome icons
  - [ ] Custom SVG icons

---

## 7. Performance Testing

- [ ] **Page Load Times**
  - [ ] All onboarding pages load quickly
  - [ ] All authentication pages load quickly
  - [ ] No significant performance degradation

- [ ] **Bundle Size**
  - [ ] Verify Tailwind CSS removed from bundle
  - [ ] Verify shadcn/ui components removed from bundle
  - [ ] Verify Bootstrap-only bundle size is acceptable

- [ ] **Runtime Performance**
  - [ ] Forms respond quickly to user input
  - [ ] File uploads work efficiently
  - [ ] No lag or jank in interactions

---

## 8. Accessibility Testing

- [ ] **Keyboard Navigation**
  - [ ] All form fields are keyboard accessible
  - [ ] All buttons are keyboard accessible
  - [ ] Tab order is logical
  - [ ] Focus indicators are visible (Bootstrap focus states)

- [ ] **Screen Readers**
  - [ ] All form fields have proper labels
  - [ ] Error messages are announced
  - [ ] Success messages are announced
  - [ ] ARIA attributes are correct

- [ ] **Color Contrast**
  - [ ] Text is readable on all backgrounds
  - [ ] Bootstrap default colors meet WCAG AA standards
  - [ ] Yuvoo brand colors meet contrast requirements

---

## 9. Error Handling Testing

- [ ] **Form Validation Errors**
  - [ ] Client-side validation errors display correctly (Bootstrap alerts)
  - [ ] Server-side validation errors display correctly
  - [ ] Error messages are in Romanian
  - [ ] Error states are visually clear

- [ ] **Network Errors**
  - [ ] File upload failures handled gracefully
  - [ ] API errors display correctly
  - [ ] Error messages are user-friendly

- [ ] **Edge Cases**
  - [ ] Very long text in forms
  - [ ] Special characters in inputs
  - [ ] Large file uploads
  - [ ] Slow network conditions

---

## 10. Integration Testing

- [ ] **Stack Auth Integration**
  - [ ] Login works with Stack Auth
  - [ ] Sign up works with Stack Auth
  - [ ] Password reset works with Stack Auth
  - [ ] Email confirmation works with Stack Auth
  - [ ] Session management works

- [ ] **Cloudinary Integration**
  - [ ] Image uploads work
  - [ ] Document uploads work
  - [ ] File deletion works
  - [ ] Error handling works

- [ ] **Database Integration**
  - [ ] Onboarding data saves correctly
  - [ ] Progress tracking works
  - [ ] Data persistence works

---

## Testing Notes

### Test Environment

- **Development**: `npm run dev`
- **Production Build**: `npm run build && npm start`

### Test Data

- Use test accounts for authentication testing
- Use test files for upload testing
- Use test data for form testing

### Reporting Issues

- Document any visual regressions
- Document any functional issues
- Document any performance issues
- Document any accessibility issues

---

## Sign-off

- [ ] All onboarding flows tested and working
- [ ] All form components tested and working
- [ ] All authentication pages tested and working
- [ ] Responsive design verified on all devices
- [ ] Browser compatibility verified
- [ ] Visual regression testing complete
- [ ] Performance acceptable
- [ ] Accessibility verified
- [ ] Error handling verified
- [ ] Integration testing complete

**Tester**: **\*\*\*\***\_**\*\*\*\***  
**Date**: **\*\*\*\***\_**\*\*\*\***  
**Status**: ☐ Pass ☐ Fail ☐ Needs Review

---

**Last Updated**: 2025-01-XX

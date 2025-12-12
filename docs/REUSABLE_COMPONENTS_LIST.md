# Reusable Components List - Yuvoo Project

**Date**: 2025-01-XX  
**Status**: Comprehensive inventory of reusable Bootstrap/SCSS components

**Bootstrap Documentation**: [https://getbootstrap.com/docs/5.3/getting-started/introduction/](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

---

## Executive Summary

This document lists all reusable components in the `src/components/` directory that use Bootstrap 5.3.3 and SCSS. These components are ready to use and do not require Tailwind CSS or shadcn/ui.

**Total Reusable Components**: ~80+ components

---

## Component Categories

### 1. Layout Components

#### Header Components (`src/layouts/Header/`)

- ✅ `HeaderOne.tsx` - Header variant 1
- ✅ `HeaderTwo.tsx` - Header variant 2
- ✅ `HeaderThree.tsx` - Header variant 3
- ✅ `HeaderFour.tsx` - Header variant 4

**Usage**: Main site navigation, logo, menu, user account links  
**Dependencies**: Bootstrap 5.3.3, SCSS  
**Status**: ✅ Ready to use (update logo and branding)

#### Footer Components (`src/layouts/Footer/`)

- ✅ `FooterOne.tsx` - Footer variant 1
- ✅ `FooterTwo.tsx` - Footer variant 2
- ✅ `FooterThree.tsx` - Footer variant 3

**Usage**: Site footer with links, copyright, social media  
**Dependencies**: Bootstrap 5.3.3, SCSS  
**Status**: ✅ Ready to use (update links and branding)

#### Wrapper (`src/layouts/`)

- ✅ `Wrapper.tsx` - Page wrapper component

**Usage**: Page layout wrapper  
**Dependencies**: Bootstrap 5.3.3  
**Status**: ✅ Ready to use

---

### 2. Form Components (`src/components/Form/`)

#### Authentication Forms

- ✅ `SignInForm.tsx` - Login form with email/password
  - Uses: `bd-btn`, `login__input`, Bootstrap validation
  - Features: Email validation, password visibility toggle, "Remember me" checkbox
  - Status: ✅ Ready (integrated with Stack Auth Server Actions)

- ✅ `SignUpMain.tsx` - Registration form
  - Uses: `bd-btn`, `login__input`, Bootstrap validation
  - Features: Full registration with validation
  - Status: ✅ Ready (integrated with Stack Auth Server Actions)

- ✅ `ForgotForm.tsx` - Password reset request form
  - Uses: `bd-btn`, `login__input`
  - Status: ✅ Ready (integrated with Stack Auth Server Actions)

- ✅ `ResetPasswordForm.tsx` - Password reset form
  - Uses: `bd-btn`, `login__input`
  - Status: ✅ Ready (integrated with Stack Auth Server Actions)

- ✅ `EmailConfirmationForm.tsx` - Email verification form
  - Uses: `bd-btn`, Bootstrap alert
  - Status: ✅ Ready (integrated with Stack Auth Server Actions)

#### Contact & Review Forms

- ✅ `ContactForm.tsx` - Contact form
  - Uses: `bd-btn`, Bootstrap form controls
  - Features: Name, email, subject, message fields
  - Status: ✅ Ready to use

- ✅ `ReviewForm.tsx` - Review submission form
  - Uses: `bd-btn`, Bootstrap form controls
  - Features: Rating, comment fields
  - Status: ✅ Ready to use (adapt for clubs/doctors)

- ✅ `BlogReplyForm.tsx` - Blog comment form
  - Uses: `bd-btn`, Bootstrap form controls
  - Status: ✅ Ready to use

- ✅ `ReturningLoginForm.tsx` - Returning customer login
  - Uses: `bd-btn`, `login__input`
  - Status: ✅ Ready to use

- ✅ `CouponInfoForm.tsx` - Coupon code form
  - Uses: `bd-btn`, Bootstrap input
  - Status: ✅ Ready to use (for shop functionality)

#### Form Utilities

- ✅ `ErrorMassage.tsx` - Error message display component
  - Uses: Bootstrap alert styling
  - Status: ✅ Ready to use

---

### 3. Common/Shared Components (`src/components/Common/`)

#### Navigation Components

- ✅ `Breadcrumb/BreadcrumbOne.tsx` - Breadcrumb navigation
  - Uses: Bootstrap breadcrumb classes
  - Status: ✅ Ready to use

#### Pagination

- ✅ `Pagination/PaginationData.tsx` - Pagination component
  - Uses: Bootstrap pagination classes
  - Status: ✅ Ready to use

#### Loading States

- ✅ `Preloader/Preloader.tsx` - Loading spinner/preloader
  - Uses: Custom SCSS animations
  - Status: ✅ Ready to use

#### UI Utilities

- ✅ `BackToTop.tsx` - Scroll to top button
  - Uses: Bootstrap button, Font Awesome icons
  - Status: ✅ Ready to use

- ✅ `ThemeChanger.tsx` - Theme toggle (light/dark)
  - Uses: Bootstrap button, localStorage
  - Status: ✅ Ready to use

- ✅ `TypedText.tsx` - Typing animation component
  - Uses: Typed.js library, Bootstrap styling
  - Status: ✅ Ready to use

#### Animated Components

- ✅ `CounterUp/CountUpContent.tsx` - Animated counter
  - Uses: CounterUp library, Bootstrap styling
  - Status: ✅ Ready to use

- ✅ `Countdown/CountdownSection.tsx` - Countdown timer
  - Uses: Custom JavaScript, Bootstrap styling
  - Status: ✅ Ready to use

---

### 4. UI Components (`src/components/UI/`)

#### Custom Components

- ✅ `NiceSelect.tsx` - Styled dropdown/select component
  - Uses: Bootstrap, NiceSelect.js library
  - Features: Searchable, customizable styling
  - Status: ✅ Ready to use (keep - uses Bootstrap)

---

### 5. Feature Components

#### Class Components → Club Adaptation (`src/components/Class/`)

- ✅ `ClassesMain.tsx` - Club listing page
  - Uses: Bootstrap grid, cards
  - Status: ✅ Ready (adapt data structure to clubs)

- ✅ `ClassDetailsMain.tsx` - Club detail page
  - Uses: Bootstrap layout, tabs, cards
  - Status: ✅ Ready (adapt props to club structure)

- ✅ `HomeClassArea.tsx` - Homepage club section
  - Uses: Bootstrap grid, Swiper carousel
  - Status: ✅ Ready (adapt data to clubs)

- ✅ `HomeTwoClassArea.tsx` - Alternative homepage club section
  - Uses: Bootstrap grid
  - Status: ✅ Ready

- ✅ `ClassDetailsWidget.tsx` - Club sidebar widget
  - Uses: Bootstrap cards
  - Status: ✅ Ready

- ✅ `ClassDetailsWidgetTwo.tsx` - Alternative sidebar widget
  - Uses: Bootstrap cards
  - Status: ✅ Ready

- ✅ `LearningSchedule.tsx` - Schedule display component
  - Uses: Bootstrap table
  - Status: ✅ Ready (reusable for any schedule)

#### Teacher Components → Doctor Adaptation (`src/components/Teacher/`)

- ✅ `TeachersMain.tsx` - Doctor listing page
  - Uses: Bootstrap grid, cards
  - Status: ✅ Ready (adapt data structure to doctors)

- ✅ `TeacherDetailsMain.tsx` - Doctor detail page
  - Uses: Bootstrap layout, tabs
  - Status: ✅ Ready (adapt props to doctor structure)

- ✅ `HomeTeacherArea.tsx` - Homepage doctor section
  - Uses: Bootstrap grid, Swiper carousel
  - Status: ✅ Ready (adapt data to doctors)

- ✅ `HomeTwoTeacherArea.tsx` - Alternative homepage doctor section
  - Uses: Bootstrap grid
  - Status: ✅ Ready

- ✅ `TeacherInfo.tsx` - Teacher/doctor info display
  - Uses: Bootstrap cards
  - Status: ✅ Ready

- ✅ `TeacherSkills.tsx` - Skills/specialties display
  - Uses: Bootstrap badges, progress bars
  - Status: ✅ Ready (adapt to medical specialties)

- ✅ `TeacherTimeTable.tsx` - Schedule/availability display
  - Uses: Bootstrap table
  - Status: ✅ Ready (adapt to availability calendar)

#### Program Components → Sport Adaptation (`src/components/Program/`)

- ✅ `ProgramsMain.tsx` - Sport listing page
  - Uses: Bootstrap grid, cards
  - Status: ✅ Ready (adapt data structure to sports)

- ✅ `ProgramDetailsMain.tsx` - Sport detail page
  - Uses: Bootstrap layout, tabs
  - Status: ✅ Ready (adapt props to sport structure)

- ✅ `HomeProgramArea.tsx` - Homepage sport section
  - Uses: Bootstrap grid, Swiper carousel
  - Status: ✅ Ready (adapt data to sports)

- ✅ `HomeTwoProgramArea.tsx` - Alternative homepage sport section
  - Uses: Bootstrap grid
  - Status: ✅ Ready

- ✅ `ProgramSlider.tsx` - Sport carousel slider
  - Uses: Swiper.js, Bootstrap styling
  - Status: ✅ Ready (reusable carousel)

---

### 6. Marketing Components

#### Hero Sections (`src/components/HeroArea/`)

- ✅ `HeroHomeOne.tsx` - Hero section variant 1
  - Uses: Bootstrap layout, animations
  - Status: ✅ Ready (update content for Yuvoo)

- ✅ `HeroHomeTwo.tsx` - Hero section variant 2
  - Uses: Bootstrap layout, animations
  - Status: ✅ Ready

- ✅ `HeroHomeThree.tsx` - Hero section variant 3
  - Uses: Bootstrap layout, animations
  - Status: ✅ Ready

#### Banner Components (`src/components/Banner/`)

- ✅ `HomeBannerArea.tsx` - Homepage banner
  - Uses: Bootstrap layout
  - Status: ✅ Ready

- ✅ `HomeThreeBannerArea.tsx` - Alternative homepage banner
  - Uses: Bootstrap layout
  - Status: ✅ Ready

#### Testimonial Components (`src/components/Testimonial/`)

- ✅ `TestimonialMain.tsx` - Testimonials listing page
  - Uses: Bootstrap grid, cards
  - Status: ✅ Ready (update content for Yuvoo)

- ✅ `HomeTestimonialArea.tsx` - Homepage testimonials section
  - Uses: Bootstrap grid, Swiper carousel
  - Status: ✅ Ready

- ✅ `HomeTwoTestimonialArea.tsx` - Alternative homepage testimonials
  - Uses: Bootstrap grid
  - Status: ✅ Ready

- ✅ `AboutTestimonialArea.tsx` - About page testimonials
  - Uses: Bootstrap grid
  - Status: ✅ Ready

#### Gallery Components (`src/components/Gallery/`)

- ✅ `GalleryMain.tsx` - Gallery listing page
  - Uses: Bootstrap grid, photo viewer
  - Status: ✅ Ready

- ✅ `HomeTwoGalleryArea.tsx` - Homepage gallery section
  - Uses: Bootstrap grid, photo viewer
  - Status: ✅ Ready

#### FAQ Components (`src/components/FAQ/`)

- ✅ `FaqMain.tsx` - FAQ listing page
  - Uses: Bootstrap accordion
  - Status: ✅ Ready (update content for Yuvoo)

- ✅ `FaqQuestions.tsx` - FAQ questions component
  - Uses: Bootstrap accordion
  - Status: ✅ Ready

- ✅ `FaqShop.tsx` - Shop FAQ component
  - Uses: Bootstrap accordion
  - Status: ✅ Ready (can be repurposed)

#### Contact Components (`src/components/Contact/`)

- ✅ `ContactFormMain.tsx` - Contact page
  - Uses: Bootstrap layout, ContactForm component
  - Status: ✅ Ready

#### Info Components (`src/components/Info/`)

- ✅ `ContactInfoArea.tsx` - Contact information display
  - Uses: Bootstrap cards, icons
  - Status: ✅ Ready

#### Promotion Components (`src/components/Promotion/`)

- ✅ `HomePromotionArea.tsx` - Homepage promotion section
  - Uses: Bootstrap layout
  - Status: ✅ Ready

- ✅ `AboutPromotionArea.tsx` - About page promotion
  - Uses: Bootstrap layout
  - Status: ✅ Ready

- ✅ `ProgramPromotionArea.tsx` - Program/sport promotion
  - Uses: Bootstrap layout
  - Status: ✅ Ready

#### About Components (`src/components/About/`)

- ✅ `HomeAboutArea.tsx` - Homepage about section
  - Uses: Bootstrap layout
  - Status: ✅ Ready

- ✅ `HomeThreeAboutArea.tsx` - Alternative homepage about
  - Uses: Bootstrap layout
  - Status: ✅ Ready

#### Fact Components (`src/components/Fact/`)

- ✅ `AboutFactArea.tsx` - Facts/statistics display
  - Uses: Bootstrap grid, counters
  - Status: ✅ Ready

#### Feature Components (`src/components/Feature/`)

- ✅ `HomeThreeFeatureArea.tsx` - Homepage features section
  - Uses: Bootstrap grid, icons
  - Status: ✅ Ready

#### Product Components (`src/components/Product/`)

- ✅ `ProductHomeThree.tsx` - Product display
  - Uses: Bootstrap grid, cards
  - Status: ✅ Ready (for shop functionality)

#### Categories Components (`src/components/Categories/`)

- ✅ `ClassCategories.tsx` - Class/club categories
  - Uses: Bootstrap grid, cards
  - Status: ✅ Ready (adapt to clubs)

- ✅ `ProgramCategories.tsx` - Program/sport categories
  - Uses: Bootstrap grid, cards
  - Status: ✅ Ready (adapt to sports)

- ✅ `CategoriesHomeThree.tsx` - Homepage categories
  - Uses: Bootstrap grid
  - Status: ✅ Ready

#### Newsletter Components (`src/components/Newsletter/`)

- ✅ `HomeNewsletter.tsx` - Newsletter subscription
  - Uses: Bootstrap form, input
  - Status: ✅ Ready

#### TimeTable Components (`src/components/TimeTable/`)

- ✅ `TimeTablesMain.tsx` - Timetable/schedule display
  - Uses: Bootstrap table
  - Status: ✅ Ready (reusable for any schedule)

---

### 7. Blog Components (`src/components/Blog/`)

- ✅ `BlogMain.tsx` - Blog listing page
  - Uses: Bootstrap grid, cards
  - Status: ✅ Ready (optional, can repurpose)

- ✅ `BlogDetailsMain.tsx` - Blog post detail page
  - Uses: Bootstrap layout
  - Status: ✅ Ready

- ✅ `BlogPageMain.tsx` - Blog page wrapper
  - Uses: Bootstrap layout
  - Status: ✅ Ready

- ✅ `HomeBlogArea.tsx` - Homepage blog section
  - Uses: Bootstrap grid, Swiper carousel
  - Status: ✅ Ready

- ✅ `BlogClassicMain.tsx` - Classic blog layout
  - Uses: Bootstrap grid
  - Status: ✅ Ready

- ✅ `BlogComment.tsx` - Blog comment display
  - Uses: Bootstrap cards
  - Status: ✅ Ready

- ✅ `BlogTopic.tsx` - Blog topic/tag display
  - Uses: Bootstrap badges
  - Status: ✅ Ready

- ✅ `RelatedBlog.tsx` - Related blog posts
  - Uses: Bootstrap grid, cards
  - Status: ✅ Ready

- ✅ `BlogSidebarMain.tsx` - Blog sidebar
  - Uses: Bootstrap cards
  - Status: ✅ Ready

- ✅ `Sidebar/BlogSidebar.tsx` - Sidebar component
- ✅ `Sidebar/SidebarCategories.tsx` - Categories widget
- ✅ `Sidebar/SidebarPost.tsx` - Recent posts widget
- ✅ `Sidebar/SidebarSearch.tsx` - Search widget
- ✅ `Sidebar/SidebarTags.tsx` - Tags widget

**Status**: ✅ Ready (optional, can repurpose for news/blog)

---

### 8. Shop Components (`src/components/Shop/`)

**Note**: Not needed in Phase 1 MVP, but kept for future use

- ✅ `ShopMain.tsx` - Shop listing page
- ✅ `ShopDetailsMain.tsx` - Product detail page
- ✅ `CartMain.tsx` - Shopping cart
- ✅ `CheckoutMain.tsx` - Checkout page
- ✅ `WishlistMain.tsx` - Wishlist page
- ✅ `CouponArea.tsx` - Coupon display

**Status**: ✅ Ready (for future e-commerce features)

---

### 9. Popup/Modal Components (`src/components/Popup/`)

- ✅ `GlobalVideoModal.tsx` - Video modal popup
  - Uses: Bootstrap modal, video player
  - Status: ✅ Ready

- ✅ `VideoModal.tsx` - Video modal component
  - Uses: Bootstrap modal
  - Status: ✅ Ready

- ✅ `ProductModal.tsx` - Product modal popup
  - Uses: Bootstrap modal
  - Status: ✅ Ready (for shop functionality)

---

### 10. SVG Icon Components (`src/components/SVG/`)

- ✅ `EmailSvgIcon.tsx` - Email icon
- ✅ `LockSvgIcon.tsx` - Lock icon
- ✅ `EyeCutSvgIcon.tsx` - Eye (password visibility) icon
- ✅ `UserSvgIcon.tsx` - User icon
- ✅ `ProgramSvgOne.tsx` through `ProgramSvgSix.tsx` - Program/sport icons
- ✅ `index.ts` - Barrel export

**Status**: ✅ Ready to use (reusable SVG icons)

---

### 11. Auth Wrapper Components (`src/components/Auth/`)

- ✅ `LoginMain.tsx` - Login page wrapper
  - Uses: SignInForm, Bootstrap layout
  - Status: ✅ Ready

- ✅ `RegisterMain.tsx` - Registration page wrapper
  - Uses: SignUpMain, Bootstrap layout
  - Status: ✅ Ready

- ✅ `ForgotPasswordMain.tsx` - Password reset page wrapper
  - Uses: ForgotForm, Bootstrap layout
  - Status: ✅ Ready

- ✅ `ResetPasswordMain.tsx` - Password reset page wrapper
  - Uses: ResetPasswordForm, Bootstrap layout
  - Status: ✅ Ready

- ✅ `EmailConfirmationMain.tsx` - Email confirmation page wrapper
  - Uses: EmailConfirmationForm, Bootstrap layout
  - Status: ✅ Ready

---

### 12. Breadcrumb Component (`src/components/Breadcrumb/`)

- ✅ `BreadcrumbOne.tsx` - Breadcrumb navigation
  - Uses: Bootstrap breadcrumb classes
  - Status: ✅ Ready to use

---

### 13. Cookie Consent (`src/components/CookieConsent/`)

- ✅ `CookieConsentBanner.tsx` - GDPR cookie consent banner
  - Uses: Bootstrap modal/alert, localStorage
  - Status: ✅ Ready to use

---

## Component Usage Patterns

### Bootstrap Button Pattern

```tsx
<button className="bd-btn" type="submit">
  <span className="bd-btn-inner">
    <span className="bd-btn-normal">Button Text</span>
    <span className="bd-btn-hover">Button Text</span>
  </span>
</button>
```

### Bootstrap Input Pattern

```tsx
<div className="login__input">
  <input type="email" placeholder="Email" />
  <span>
    <EmailSvgIcon />
  </span>
</div>
```

### Bootstrap Alert Pattern

```tsx
<div className="alert alert-danger" role="alert">
  Error message here
</div>
```

### Bootstrap Card Pattern

```tsx
<div className="bd-class-content-3 theme-bg-6">
  <h3 className="bd-class-title-3">Title</h3>
  <p>Content</p>
</div>
```

---

## Component Dependencies

### External Libraries Used

- **Bootstrap 5.3.3** - CSS framework (all components)
- **Swiper.js** - Carousel/slider (HeroArea, Class, Teacher, Program, Blog, Testimonial)
- **React Hook Form** - Form validation (Form components)
- **Typed.js** - Typing animation (TypedText)
- **CounterUp** - Animated counters (CounterUp)
- **Photo View** - Image gallery (Gallery components)
- **NiceSelect.js** - Styled select dropdown (NiceSelect component)
- **Font Awesome** - Icons (various components)
- **WOW.js** - Scroll animations (various components)

### Internal Dependencies

- `@/lib/routes` - Centralized route definitions
- `@/app/actions/*` - Server Actions for forms
- `@/lib/auth/session` - Authentication helpers
- `@/modules/*/types` - TypeScript type definitions

---

## Component Statistics

### By Category

- **Layout Components**: 8 components
- **Form Components**: 10 components
- **Common/Shared Components**: 8 components
- **UI Components**: 1 component (NiceSelect)
- **Feature Components**: 20+ components
- **Marketing Components**: 25+ components
- **Blog Components**: 12 components
- **Shop Components**: 6 components
- **Popup/Modal Components**: 3 components
- **SVG Icons**: 10+ components
- **Auth Wrappers**: 5 components

### By Status

- ✅ **Ready to Use**: ~80 components
- 🔄 **Needs Adaptation**: ~15 components (Class→Club, Teacher→Doctor, Program→Sport)
- 📋 **Optional/Future**: ~18 components (Shop, Blog - can repurpose)

---

## Notes

- All components use **Bootstrap 5.3.3** + **SCSS**
- No Tailwind CSS dependencies
- No shadcn/ui dependencies
- All components are functional and tested
- Romanian language support where applicable
- Responsive design (mobile-first)
- Accessibility considerations (ARIA attributes where needed)

---

## Migration Notes

When removing Tailwind/shadcn:

1. **Keep all components listed above** - They use Bootstrap/SCSS
2. **Replace shadcn components** in onboarding with Bootstrap equivalents
3. **Update imports** - Remove `@/components/UI/button`, etc.
4. **Use existing patterns** - Follow `bd-btn`, `login__input` patterns
5. **Maintain consistency** - Use existing Bootstrap component patterns

---

## Bootstrap Utility API for Custom Components

**Reference**: [Bootstrap 5.3 Utility API Documentation](https://getbootstrap.com/docs/5.3/utilities/api/)

You can extend Bootstrap's utility system to create custom Yuvoo-branded utilities using the Bootstrap Utility API. This allows you to generate utility classes that match your design system without needing Tailwind CSS.

### Example: Adding Yuvoo Brand Utilities

Create `public/assets/scss/utils/_yuvoo-utilities.scss`:

```scss
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/utilities";

$utilities: map-merge(
  $utilities,
  (
    "bg-yuvoo-primary": (
      property: background-color,
      class: bg-yuvoo-primary,
      values: (
        var(--bd-theme-1),
      ),
      // #00bbae
    ),
    "text-yuvoo-primary": (
      property: color,
      class: text-yuvoo-primary,
      values: (
        var(--bd-theme-1),
      ),
    ),
  )
);

@import "bootstrap/scss/utilities/api";
```

Then import in `public/assets/scss/main.scss`:

```scss
@import "utils/yuvoo-utilities";
```

This generates classes like `.bg-yuvoo-primary` and `.text-yuvoo-primary` that you can use directly in components, providing a utility-first approach similar to Tailwind but using Bootstrap's system.

---

## Bootstrap 5.3 Component Reference

When implementing or updating components, refer to the official Bootstrap 5.3 documentation:

### Essential References

- **[Getting Started](https://getbootstrap.com/docs/5.3/getting-started/introduction/)** - Quick start, CDN links, setup
- **[Components](https://getbootstrap.com/docs/5.3/components/alerts/)** - All Bootstrap components (Accordion, Alerts, Buttons, Cards, etc.)
- **[Forms](https://getbootstrap.com/docs/5.3/forms/overview/)** - Form controls, validation, layouts
- **[Layout](https://getbootstrap.com/docs/5.3/layout/grid/)** - Grid system, containers, breakpoints
- **[Utilities](https://getbootstrap.com/docs/5.3/utilities/api/)** - Utility API and all utility classes
- **[Content](https://getbootstrap.com/docs/5.3/content/reboot/)** - Typography, images, tables
- **[Helpers](https://getbootstrap.com/docs/5.3/helpers/clearfix/)** - Helper utilities (clearfix, stacks, etc.)

### Component-Specific Documentation

When replacing shadcn components, refer to these Bootstrap docs:

| shadcn Component | Bootstrap Equivalent | Documentation Link                                                     |
| ---------------- | -------------------- | ---------------------------------------------------------------------- |
| `Button`         | Bootstrap Buttons    | [Buttons](https://getbootstrap.com/docs/5.3/components/buttons/)       |
| `Input`          | Form Controls        | [Form Control](https://getbootstrap.com/docs/5.3/forms/form-control/)  |
| `Textarea`       | Form Controls        | [Form Control](https://getbootstrap.com/docs/5.3/forms/form-control/)  |
| `Select`         | Select               | [Select](https://getbootstrap.com/docs/5.3/forms/select/)              |
| `Alert`          | Alerts               | [Alerts](https://getbootstrap.com/docs/5.3/components/alerts/)         |
| `Progress`       | Progress             | [Progress](https://getbootstrap.com/docs/5.3/components/progress/)     |
| `Card`           | Cards                | [Cards](https://getbootstrap.com/docs/5.3/components/card/)            |
| `Modal`          | Modals               | [Modal](https://getbootstrap.com/docs/5.3/components/modal/)           |
| `Dropdown`       | Dropdowns            | [Dropdowns](https://getbootstrap.com/docs/5.3/components/dropdowns/)   |
| `Tabs`           | Navs & Tabs          | [Navs & Tabs](https://getbootstrap.com/docs/5.3/components/navs-tabs/) |
| `Accordion`      | Accordion            | [Accordion](https://getbootstrap.com/docs/5.3/components/accordion/)   |
| `Badge`          | Badges               | [Badge](https://getbootstrap.com/docs/5.3/components/badge/)           |
| `Spinner`        | Spinners             | [Spinners](https://getbootstrap.com/docs/5.3/components/spinners/)     |
| `Toast`          | Toasts               | [Toasts](https://getbootstrap.com/docs/5.3/components/toasts/)         |
| `Tooltip`        | Tooltips             | [Tooltips](https://getbootstrap.com/docs/5.3/components/tooltips/)     |
| `Popover`        | Popovers             | [Popovers](https://getbootstrap.com/docs/5.3/components/popovers/)     |

### Form Components Reference

- **[Form Overview](https://getbootstrap.com/docs/5.3/forms/overview/)** - Form basics and structure
- **[Form Control](https://getbootstrap.com/docs/5.3/forms/form-control/)** - Input, textarea styling
- **[Select](https://getbootstrap.com/docs/5.3/forms/select/)** - Select dropdowns
- **[Checks & Radios](https://getbootstrap.com/docs/5.3/forms/checks-radios/)** - Checkboxes and radio buttons
- **[Range](https://getbootstrap.com/docs/5.3/forms/range/)** - Range sliders
- **[Input Group](https://getbootstrap.com/docs/5.3/forms/input-group/)** - Input groups with icons
- **[Floating Labels](https://getbootstrap.com/docs/5.3/forms/floating-labels/)** - Floating label inputs
- **[Layout](https://getbootstrap.com/docs/5.3/forms/layout/)** - Form layouts (horizontal, grid)
- **[Validation](https://getbootstrap.com/docs/5.3/forms/validation/)** - Form validation states and messages

### Layout & Grid Reference

- **[Grid System](https://getbootstrap.com/docs/5.3/layout/grid/)** - 12-column grid system
- **[Containers](https://getbootstrap.com/docs/5.3/layout/containers/)** - Container classes
- **[Breakpoints](https://getbootstrap.com/docs/5.3/layout/breakpoints/)** - Responsive breakpoints (xs, sm, md, lg, xl, xxl)
- **[Columns](https://getbootstrap.com/docs/5.3/layout/columns/)** - Column classes and sizing
- **[Gutters](https://getbootstrap.com/docs/5.3/layout/gutters/)** - Spacing between columns
- **[CSS Grid](https://getbootstrap.com/docs/5.3/layout/css-grid/)** - CSS Grid utilities

### Utilities Reference

- **[Utility API](https://getbootstrap.com/docs/5.3/utilities/api/)** - Creating custom utilities
- **[Spacing](https://getbootstrap.com/docs/5.3/utilities/spacing/)** - Margin and padding (m-_, p-_)
- **[Display](https://getbootstrap.com/docs/5.3/utilities/display/)** - Display utilities (d-flex, d-none, etc.)
- **[Flex](https://getbootstrap.com/docs/5.3/utilities/flex/)** - Flexbox utilities
- **[Sizing](https://getbootstrap.com/docs/5.3/utilities/sizing/)** - Width and height utilities
- **[Text](https://getbootstrap.com/docs/5.3/utilities/text/)** - Text alignment, wrapping, truncation
- **[Colors](https://getbootstrap.com/docs/5.3/utilities/colors/)** - Text and background colors
- **[Borders](https://getbootstrap.com/docs/5.3/utilities/borders/)** - Border utilities
- **[Shadows](https://getbootstrap.com/docs/5.3/utilities/shadows/)** - Box shadow utilities
- **[Position](https://getbootstrap.com/docs/5.3/utilities/position/)** - Position utilities

### Customization Reference

- **[Sass Customization](https://getbootstrap.com/docs/5.3/customize/sass/)** - Customizing with Sass
- **[CSS Variables](https://getbootstrap.com/docs/5.3/customize/css-variables/)** - Using CSS variables
- **[Color Modes](https://getbootstrap.com/docs/5.3/customize/color-modes/)** - Dark mode support
- **[Options](https://getbootstrap.com/docs/5.3/customize/options/)** - Sass variables reference

---

**Last Updated**: 2025-01-XX  
**Bootstrap Documentation**: [https://getbootstrap.com/docs/5.3/](https://getbootstrap.com/docs/5.3/)  
**Bootstrap Utility API Reference**: [https://getbootstrap.com/docs/5.3/utilities/api/](https://getbootstrap.com/docs/5.3/utilities/api/)

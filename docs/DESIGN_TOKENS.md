# Yuvoo - Design Tokens

## Overview

This document provides a comprehensive reference for all design tokens used in the Yuvoo platform. Design tokens are the foundational visual elements that ensure consistency across the entire application.

**Purpose**: Single source of truth for colors, typography, spacing, shadows, border radius, and other design values.

**Usage**: Reference this document when:

- Creating new components
- Styling pages
- Implementing Tailwind CSS classes
- Maintaining design consistency
- Generating design system documentation

---

## Color Tokens

### Primary Colors

#### Primary (Turcoaz/Cyan)

- **Hex**: `#00BBAE`
- **CSS Variable**: `--bd-theme-1` or `--yuvoo-primary`
- **Usage**: Primary buttons, brand elements, important links, hover states
- **Associations**: Sport, water, energy, professionalism, trust
- **Contrast**: White text on primary background ✅ (WCAG AA compliant)

**Variants**:

- Light: `#EBFFFE` (theme-7) - Backgrounds, sections
- Base: `#00BBAE` - Primary actions
- Dark: `#00998D` - Hover states (derived)

#### Secondary (Portocaliu/Orange)

- **Hex**: `#FF9B24`
- **CSS Variable**: `--bd-theme-2` or `--yuvoo-secondary`
- **Usage**: Secondary buttons, CTAs, highlights, important badges, call-to-action
- **Associations**: Play, energy, enthusiasm, fun, positivity
- **Contrast**: White text on secondary background ✅ (WCAG AA compliant)

**Variants**:

- Light: `#FFECD6` (theme-8) - Backgrounds, highlights
- Very Light: `#FFF6EB` (theme-6) - Subtle backgrounds
- Base: `#FF9B24` - Secondary actions
- Dark: `#E68A1F` - Hover states (derived)

#### Accent (Violet/Blue)

- **Hex**: `#7C81FF`
- **CSS Variable**: `--bd-theme-10` or `--yuvoo-accent`
- **Usage**: Accents, decorative elements, secondary badges, icons
- **Associations**: Creativity, innovation, modern, technology
- **Contrast**: White text on accent background ✅ (WCAG AA compliant)

### Background Colors

#### Light Backgrounds

- **Cyan Light**: `#EBFFFE` (theme-7) - Sport sections, hero backgrounds
- **Beige Light**: `#FFF6EB` (theme-6) - General sections, cards
- **Orange Light**: `#FFECD6` (theme-8) - Special sections, highlights
- **White**: `#FFFFFF` - Primary background, cards

#### Dark Backgrounds

- **Black**: `#1B1B1B` - Headings, primary text
- **Dark Grey**: `#424242` - Body text

### Neutral Colors

#### Text Colors

- **Heading Primary**: `#1B1B1B` - Main headings, important text
- **Text Body**: `#424242` - Body text, paragraphs, descriptions
- **Text Secondary**: `#6B6B6B` - Secondary text, captions
- **Text Muted**: `#9B9B9B` - Disabled text, placeholders

#### Border Colors

- **Border Grey**: `#E6E6E6` - Borders, dividers, separators
- **Border Light**: `#F5F5F5` - Subtle borders
- **Border Dark**: `#CCCCCC` - Strong borders

### Color Usage Guidelines

**✅ DO**:

- Use Primary (`#00BBAE`) for main actions and brand elements
- Use Secondary (`#FF9B24`) for CTAs and highlights
- Use Accent (`#7C81FF`) for decorative elements
- Use light variants for backgrounds and sections
- Ensure sufficient contrast (WCAG AA minimum)
- Use neutral colors for text and borders

**❌ DON'T**:

- Don't use more than 3 main colors in a single component
- Don't use colors outside the brand palette
- Don't use dark text on light colored backgrounds without checking contrast
- Don't mix too many accent colors (stick to the 3 main colors)

### Tailwind CSS Color Classes

```tsx
// Primary (Turcoaz)
(bg - primary, text - primary, border - primary);

// Secondary (Portocaliu)
(bg - secondary, text - secondary, border - secondary);

// Accent (Violet)
(bg - accent, text - accent, border - accent);

// Neutral
(text - neutral - black, text - neutral - body, border - neutral - grey - 1);
```

---

## Typography Tokens

### Font Family

**Primary Font**: Gabarito

- **Family**: `'Gabarito', sans-serif`
- **Source**: Google Fonts
- **Characteristics**: Friendly, modern, playful, child-friendly
- **Usage**: All headings and body text

### Font Weights

| Weight      | Value | Usage                       |
| ----------- | ----- | --------------------------- |
| Extra Light | `200` | Rarely used                 |
| Light       | `300` | Rarely used                 |
| Regular     | `400` | **Body text (most common)** |
| Medium      | `500` | Occasionally used           |
| Semi Bold   | `600` | **Headings (common)**       |
| Bold        | `700` | **Main headings (common)**  |
| Extra Bold  | `800` | Rarely used                 |
| Black       | `900` | Rarely used                 |

### Typography Scale

| Element   | Font Size | Font Weight | Line Height | Usage                      |
| --------- | --------- | ----------- | ----------- | -------------------------- |
| **H1**    | `96px`    | `700`       | `1.25`      | Hero titles, main headings |
| **H2**    | `64px`    | `600`       | `1.25`      | Section titles             |
| **H3**    | `32px`    | `600`       | `1.5`       | Card titles, subsections   |
| **H4**    | `23px`    | `600`       | `1.7`       | Subsection titles          |
| **H5**    | `16px`    | `600`       | `1.25`      | Small headings             |
| **H6**    | `16px`    | `600`       | `2`         | Smallest headings          |
| **Body**  | `18px`    | `400`       | `30px`      | Body text, paragraphs      |
| **Small** | `14px`    | `400`       | `22px`      | Captions, small text       |
| **Tiny**  | `12px`    | `400`       | `18px`      | Labels, metadata           |

### CSS Variables

```css
--bd-ff-body: "Gabarito", sans-serif;
--bd-fz-body: 18px;
--bd-fz-h1: 96px;
--bd-fz-h2: 64px;
--bd-fz-h3: 32px;
--bd-heading-primary: #1b1b1b;
--bd-text-body: #424242;
```

### Typography Guidelines

**✅ DO**:

- Use Gabarito for all headings and body text
- Use appropriate font weights (400 for body, 600-700 for headings)
- Maintain consistent line heights for readability
- Use heading hierarchy (H1 → H2 → H3) properly
- Use body text size (18px) for paragraphs

**❌ DON'T**:

- Don't mix multiple font families
- Don't use font sizes smaller than 16px for body text
- Don't use excessive font weights (avoid 800-900 except for special cases)
- Don't break heading hierarchy

---

## Spacing Tokens

### Bootstrap Spacing Scale

| Class        | Value     | Pixels | Usage           |
| ------------ | --------- | ------ | --------------- |
| `p-0`, `m-0` | `0`       | `0px`  | No spacing      |
| `p-1`, `m-1` | `0.25rem` | `4px`  | Minimal spacing |
| `p-2`, `m-2` | `0.5rem`  | `8px`  | Small spacing   |
| `p-3`, `m-3` | `1rem`    | `16px` | Default spacing |
| `p-4`, `m-4` | `1.5rem`  | `24px` | Medium spacing  |
| `p-5`, `m-5` | `3rem`    | `48px` | Large spacing   |

### Common Spacing Values

#### Section Padding

- **Standard**: `pt-110 pb-70` (110px top, 70px bottom)
- **Large**: `pt-120 pb-80` (120px top, 80px bottom)
- **Small**: `pt-80 pb-50` (80px top, 50px bottom)

#### Element Margins

- **Bottom Margins**: `mb-20` (20px), `mb-25` (25px), `mb-30` (30px), `mb-40` (40px), `mb-50` (50px)
- **Top Margins**: `mt-35` (35px), `mt-4` (16px)

#### Container

- **Max Width**: `1320px` (for screens ≥1400px)
- **Responsive Padding**: Via Bootstrap grid system

### Tailwind Spacing

```tsx
// Padding
(p - 0, p - 1, p - 2, p - 3, p - 4, p - 5, p - 6, p - 8, p - 10, p - 12);

// Margin
(m - 0, m - 1, m - 2, m - 3, m - 4, m - 5, m - 6, m - 8, m - 10, m - 12);

// Custom spacing
section - padding; // Standard section padding (110px top, 70px bottom)
```

### Spacing Guidelines

**✅ DO**:

- Use Bootstrap spacing system consistently
- Maintain consistent padding for sections
- Use appropriate margins between elements
- Follow the 24px border radius standard for cards

**❌ DON'T**:

- Don't use arbitrary spacing values
- Don't create inconsistent gaps
- Don't overcrowd elements
- Don't use excessive padding

---

## Border Radius Tokens

### Common Values

| Value  | Pixels | Usage                             | CSS Class    |
| ------ | ------ | --------------------------------- | ------------ |
| `24px` | `24px` | **Most common** - Cards, sections | `.radius-24` |
| `16px` | `16px` | Cards, buttons                    | -            |
| `12px` | `12px` | Medium cards                      | -            |
| `8px`  | `8px`  | Small elements                    | -            |
| `50px` | `50px` | Buttons, pills                    | -            |
| `50%`  | -      | **Circles** - Avatars, icons      | -            |

### Usage Guidelines

**✅ DO**:

- Use `24px` for most cards and sections
- Use `50%` for circular elements (avatars, icons)
- Use `50px` for pill-shaped buttons
- Maintain consistency within component types

**❌ DON'T**:

- Don't mix different border radius values in the same component
- Don't use excessive border radius (avoid >50px except for circles)
- Don't use inconsistent values for similar elements

---

## Shadow Tokens

### Box Shadows

| Shadow            | Value                                     | Usage                   |
| ----------------- | ----------------------------------------- | ----------------------- |
| **Card Shadow**   | `0px 16px 32px 0px rgba(0, 0, 0, 0.06)`   | Cards, dropcap          |
| **Menu Shadow**   | `0px 20px 30px rgba(3, 4, 28, 0.1)`       | Dropdown menus          |
| **Modal Shadow**  | `0px 30px 70px 0px rgba(11, 6, 70, 0.08)` | Modal overlays          |
| **Header Shadow** | `0 10px 30px rgba(0, 0, 0, 0.12)`         | Sticky header           |
| **Button Shadow** | `0px 4px 12px rgba(0, 187, 174, 0.2)`     | Primary buttons (hover) |

### Drop Shadows (Decorative)

```css
/* Portocaliu shadow */
filter: drop-shadow(5px 5px 0 var(--bd-theme-2));

/* Turcoaz shadow */
filter: drop-shadow(5px 5px 0 var(--bd-theme-1));
```

### Shadow Guidelines

**✅ DO**:

- Use card shadow for cards and elevated elements
- Use menu shadow for dropdowns and popovers
- Use modal shadow for modal overlays
- Use subtle shadows for depth

**❌ DON'T**:

- Don't use excessive shadows (avoid heavy shadows)
- Don't mix different shadow styles unnecessarily
- Don't use shadows that reduce readability

---

## Animation Tokens

### Durations

| Duration | Value  | Usage                |
| -------- | ------ | -------------------- |
| Fast     | `0.2s` | Quick transitions    |
| Normal   | `0.3s` | Standard transitions |
| Medium   | `0.5s` | Smooth transitions   |
| Slow     | `1s`   | Slow animations      |

### Easing Functions

```css
/* Standard easing */
ease-in-out
ease-out
ease-in

/* Custom easing */
cubic-bezier(0.4, 0, 0.2, 1) /* Material Design */
```

### Animation Patterns

**WOW.js Scroll Animations**:

```tsx
className="wow fadeInUp"
data-wow-duration="1s"
data-wow-delay=".3s"
```

**CSS Transitions**:

```css
transition: all 0.3s ease-in-out;
```

### Animation Guidelines

**✅ DO**:

- Use consistent animation durations
- Use smooth easing functions
- Keep animations subtle and purposeful
- Use animations to enhance UX, not distract

**❌ DON'T**:

- Don't use excessive animations
- Don't create jarring transitions
- Don't animate everything
- Don't use animations that slow down the interface

---

## Z-Index Tokens

### Z-Index Scale

| Value | Usage                          |
| ----- | ------------------------------ |
| `1`   | Base elements                  |
| `10`  | Dropdowns, tooltips            |
| `11`  | Sticky headers                 |
| `99`  | Modals, overlays               |
| `999` | Highest priority (rarely used) |

### Z-Index Guidelines

**✅ DO**:

- Use consistent z-index values
- Follow the established scale
- Document custom z-index values

**❌ DON'T**:

- Don't use arbitrary z-index values
- Don't create z-index conflicts
- Don't use extremely high values unnecessarily

---

## Breakpoint Tokens

### Responsive Breakpoints

| Breakpoint | Value     | Usage                                |
| ---------- | --------- | ------------------------------------ |
| **XS**     | `<576px`  | Extra small devices (phones)         |
| **SM**     | `≥576px`  | Small devices (phones landscape)     |
| **MD**     | `≥768px`  | Medium devices (tablets)             |
| **LG**     | `≥992px`  | Large devices (desktops)             |
| **XL**     | `≥1200px` | Extra large devices (large desktops) |
| **XXL**    | `≥1400px` | Extra extra large devices            |

### Bootstrap Grid Classes

```tsx
// Responsive columns
col - 12; // Full width on all screens
col - md - 6; // Half width on medium+ screens
col - lg - 4; // One-third width on large+ screens
col - xl - 3; // One-quarter width on extra large+ screens
```

### Tailwind Breakpoints

```tsx
// Tailwind responsive classes
sm:, md:, lg:, xl:, 2xl:
```

---

## Icon Tokens

### Icon Libraries

- **Font Awesome Pro** - General icons
- **Flaticon Kindedo** - Custom theme icons
- **Lucide React** - Modern React icons (for new components)
- **SVG Components** - Custom React icons

### Icon Usage Pattern

```tsx
// Font Awesome / Flaticon
<i className="flaticon-search"></i>
<i className="fa fa-heart"></i>

// Lucide React (for new components)
import { Search, Heart } from "lucide-react";
<Search className="w-5 h-5" />
```

### Icon Sizes

| Size        | Value  | Usage                 |
| ----------- | ------ | --------------------- |
| Small       | `16px` | Inline icons, buttons |
| Medium      | `24px` | Standard icons        |
| Large       | `32px` | Feature icons         |
| Extra Large | `48px` | Hero icons            |

---

## Design Token Implementation

### CSS Variables (SCSS)

```scss
// Colors
--bd-theme-1: #00bbae; // Primary
--bd-theme-2: #ff9b24; // Secondary
--bd-theme-10: #7c81ff; // Accent
--bd-theme-7: #ebfffe; // Cyan light
--bd-theme-6: #fff6eb; // Beige light
--bd-theme-8: #ffecd6; // Orange light

// Typography
--bd-ff-body: "Gabarito", sans-serif;
--bd-fz-body: 18px;
--bd-fz-h1: 96px;
--bd-fz-h2: 64px;
--bd-fz-h3: 32px;
--bd-heading-primary: #1b1b1b;
--bd-text-body: #424242;
```

### Tailwind CSS Configuration

```css
/* globals.css - @theme directive */
@theme {
  /* Colors */
  --color-primary: #00bbae;
  --color-secondary: #ff9b24;
  --color-accent: #7c81ff;

  /* Typography */
  --font-family-base: "Gabarito", sans-serif;
  --font-size-h1: 96px;
  --font-size-h2: 64px;
  --font-size-h3: 32px;
  --font-size-body: 18px;

  /* Spacing */
  --spacing-section-padding-top: 110px;
  --spacing-section-padding-bottom: 70px;
}
```

### Custom Yuvoo Classes

```tsx
// Buttons
className = "btn-yuvoo-primary"; // Primary button
className = "btn-yuvoo-secondary"; // Secondary button
className = "btn-yuvoo-accent"; // Accent button

// Cards
className = "card-yuvoo"; // Standard card

// Backgrounds
className = "bg-yuvoo-primary-light"; // Primary light background
className = "bg-yuvoo-secondary-light"; // Secondary light background

// Text
className = "text-yuvoo-heading"; // Heading text color
className = "text-yuvoo-body"; // Body text color
```

---

## Quick Reference

### Color Quick Reference

```scss
// Primary (Turcoaz)
--bd-theme-1: #00bbae // Secondary (Portocaliu)
  --bd-theme-2: #ff9b24 // Accent (Violet)
  --bd-theme-10: #7c81ff // Backgrounds
  --bd-theme-7: #ebfffe (cyan light) --bd-theme-6: #fff6eb (beige light) --bd-theme-8: #ffecd6
  (orange light) // Text
  --bd-heading-primary: #1b1b1b --bd-text-body: #424242;
```

### Typography Quick Reference

```css
/* Headings */
h1 {
  font-size: 96px;
  font-weight: 700;
}
h2 {
  font-size: 64px;
  font-weight: 600;
}
h3 {
  font-size: 32px;
  font-weight: 600;
}

/* Body */
body {
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
}
```

### Spacing Quick Reference

```css
/* Section Padding */
.pt-110 {
  padding-top: 110px;
}
.pb-70 {
  padding-bottom: 70px;
}

/* Margins */
.mb-30 {
  margin-bottom: 30px;
}
.mb-40 {
  margin-bottom: 40px;
}
```

---

## References

- **Brand Guidelines**: `docs/BRAND_GUIDELINES.md` - Complete brand guidelines
- **Components Guide**: `docs/COMPONENTS_GUIDE.md` - Component styling patterns
- **Architecture Overview**: `docs/ARCHITECTURE_OVERVIEW.md` - Technical architecture
- **Design System**: `memory-bank/designSystem.md` - Complete design system documentation

---

## Summary

This design tokens guide ensures:

- ✅ **Consistent Colors**: Primary, secondary, accent, and neutral colors
- ✅ **Typography System**: Font family, weights, sizes, and line heights
- ✅ **Spacing System**: Consistent spacing scale and values
- ✅ **Border Radius**: Standard border radius values
- ✅ **Shadows**: Consistent shadow patterns
- ✅ **Animations**: Standard animation durations and easing
- ✅ **Responsive Design**: Breakpoint tokens for responsive layouts

**Always reference this guide when implementing design elements to maintain consistency across the Yuvoo platform.**

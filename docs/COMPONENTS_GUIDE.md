# Yuvoo - Components Guide

## Overview

This guide provides comprehensive guidelines for creating and using UI components in the Yuvoo project. It covers component organization, styling patterns, Tailwind CSS rules, and best practices for consistent UI development.

**Key Principles**:

- ✅ **Consistency**: Use established patterns and design tokens
- ✅ **Type Safety**: All components use TypeScript
- ✅ **Accessibility**: WCAG AA compliance
- ✅ **Romanian Language**: All user-facing text in Romanian
- ✅ **Server Components First**: Use Client Components only when needed

---

## Component Organization

### Directory Structure

```
components/
├── ui/                      # shadcn/ui base components (planned)
├── layout/                  # Header, Footer, Sidebar (from layouts/)
├── features/                # Feature-specific components
│   ├── clubs/              # Club components ✅
│   │   ├── ClubsMain.tsx
│   │   ├── ClubDetailsMain.tsx
│   │   ├── HomeClubArea.tsx
│   │   ├── ClubCard.tsx
│   │   └── VerificationBadge.tsx
│   ├── doctors/            # Doctor components (planned)
│   ├── sports/             # Sport components (planned)
│   ├── quiz/               # Quiz components (planned)
│   └── children/           # Child profile components (planned)
├── forms/                   # Reusable form components
└── shared/                  # Common components (Breadcrumb, Pagination, etc.)
```

### Current Status

**✅ Created**:

- `components/features/clubs/` - Club components (adapted from Class components)

**📋 Planned**:

- `components/features/doctors/` - Doctor components (from Teacher)
- `components/features/sports/` - Sport components (from Program)
- `components/features/quiz/` - Quiz components (new)
- `components/ui/` - shadcn/ui components (new)

**🔄 Existing (Kindedo Theme)**:

- `components/Class/` - To be migrated to `features/clubs/`
- `components/Teacher/` - To be migrated to `features/doctors/`
- `components/Program/` - To be migrated to `features/sports/`
- `components/Common/` - Reusable components (Breadcrumb, Pagination, etc.)
- `components/Form/` - Form components
- `components/Auth/` - Authentication components
- `layouts/Header/` - Header variants
- `layouts/Footer/` - Footer variants

---

## Styling Approach

### Hybrid Styling Strategy

**Current Approach**: Bootstrap 5.3.3 + SCSS (existing components) + Tailwind CSS v4 (new components)

**Strategy**:

1. **Existing Components**: Keep Bootstrap/SCSS styling
2. **New Components**: Use Tailwind CSS v4
3. **Gradual Migration**: Migrate components to Tailwind as they're refactored

### Tailwind CSS v4 Rules

**Configuration**: CSS-based (no `tailwind.config.ts`)

- Configuration in `src/app/globals.css` using `@theme` directive
- Yuvoo brand colors integrated as Tailwind utilities
- Custom component classes defined with `@utility` directive

**Key Patterns**:

```tsx
// ✅ DO: Use Tailwind utilities for new components
<div className="bg-primary text-white p-6 rounded-xl shadow-card">
  <h2 className="text-h3 font-bold text-yuvoo-heading">Titlu</h2>
</div>

// ✅ DO: Use custom Yuvoo classes
<button className="btn-yuvoo-primary">Buton</button>
<div className="card-yuvoo">Card content</div>

// ❌ DON'T: Mix Bootstrap and Tailwind in same element (prefer one approach)
<div className="container bg-primary"> {/* Avoid mixing */}
```

**Available Custom Classes**:

```tsx
// Buttons
className = "btn-yuvoo-primary"; // Primary button (Turcoaz)
className = "btn-yuvoo-secondary"; // Secondary button (Portocaliu)
className = "btn-yuvoo-accent"; // Accent button (Violet)

// Cards
className = "card-yuvoo"; // Standard card

// Backgrounds
className = "bg-yuvoo-primary-light"; // Primary light background
className = "bg-yuvoo-secondary-light"; // Secondary light background

// Text
className = "text-yuvoo-heading"; // Heading text color
className = "text-yuvoo-body"; // Body text color

// Spacing
className = "section-padding"; // Standard section padding
```

**Color Utilities**:

```tsx
// Primary (Turcoaz #00BBAE)
(bg - primary, text - primary, border - primary);

// Secondary (Portocaliu #FF9B24)
(bg - secondary, text - secondary, border - secondary);

// Accent (Violet #7C81FF)
(bg - accent, text - accent, border - accent);

// Neutral
(text - neutral - black, text - neutral - body, border - neutral - grey - 1);
```

### Bootstrap Rules (Existing Components)

**For Existing Components**: Continue using Bootstrap classes

```tsx
// ✅ DO: Use Bootstrap for existing adapted components
<div className="container">
  <div className="row">
    <div className="col-lg-6">
      <ClubCard club={club} />
    </div>
  </div>
</div>

// ✅ DO: Use Bootstrap spacing
<div className="mb-30">Content</div>
<div className="pt-110 pb-70">Section</div>
```

**Common Bootstrap Classes**:

- Layout: `container`, `row`, `col-*`, `d-flex`, `justify-content-*`
- Spacing: `p-*`, `m-*`, `pt-*`, `pb-*`, `mb-*`, `mt-*`
- Typography: `text-*`, `fw-*`, `fs-*`
- Utilities: `position-relative`, `position-absolute`, `w-100`, `h-100`

---

## Button Patterns

### Bootstrap Buttons (Existing Components)

**Pattern**: Use `bd-btn` class with inner structure

```tsx
// ✅ DO: Standard button pattern
<Link href={routes.clubs.list} className="bd-btn">
  <span className="bd-btn-inner">
    <span className="bd-btn-normal">Text</span>
    <span className="bd-btn-hover">Text</span>
  </span>
</Link>

// ✅ DO: Grey/secondary button
<Link href={routes.clubs.list} className="bd-btn bd-btn-grey">
  <span className="bd-btn-inner">
    <span className="bd-btn-normal">Text</span>
    <span className="bd-btn-hover">Text</span>
  </span>
</Link>
```

**Variants**:

- `bd-btn` - Primary button (Turcoaz)
- `bd-btn bd-btn-grey` - Secondary button (grey)
- `bd-btn bd-btn-white` - White button

### Tailwind Buttons (New Components)

**Pattern**: Use custom Yuvoo button classes or Tailwind utilities

```tsx
// ✅ DO: Use custom Yuvoo button classes
<button className="btn-yuvoo-primary">
  Începe Chestionarul
</button>

<button className="btn-yuvoo-secondary">
  Explorează Cluburile
</button>

<button className="btn-yuvoo-accent">
  Află Mai Multe
</button>

// ✅ DO: Use Tailwind utilities for custom buttons
<button className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors">
  Buton Personalizat
</button>

// ✅ DO: Disabled state
<button
  className="btn-yuvoo-primary disabled:opacity-50 disabled:cursor-not-allowed"
  disabled
>
  Buton Dezactivat
</button>
```

**Button Sizes** (Tailwind):

```tsx
// Small
<button className="btn-yuvoo-primary text-sm px-4 py-2">
  Mic
</button>

// Default
<button className="btn-yuvoo-primary px-6 py-3">
  Standard
</button>

// Large
<button className="btn-yuvoo-primary text-lg px-8 py-4">
  Mare
</button>
```

**Button Types**:

```tsx
// Primary action
<button className="btn-yuvoo-primary">Salvează</button>

// Secondary action
<button className="btn-yuvoo-secondary">Anulează</button>

// Link button
<Link href={routes.clubs.list} className="btn-yuvoo-primary">
  Vezi Cluburile
</Link>

// Icon button
<button className="btn-yuvoo-primary flex items-center gap-2">
  <Icon /> Text
</button>
```

---

## Input Patterns

### Form Inputs (Bootstrap)

**Pattern**: Use Bootstrap form classes

```tsx
// ✅ DO: Standard input
<div className="form-group">
  <label htmlFor="name" className="form-label">Nume</label>
  <input
    type="text"
    id="name"
    className="form-control"
    placeholder="Introdu numele"
  />
</div>

// ✅ DO: Textarea
<div className="form-group">
  <label htmlFor="description" className="form-label">Descriere</label>
  <textarea
    id="description"
    className="form-control"
    rows={5}
    placeholder="Introdu descrierea"
  />
</div>

// ✅ DO: Select dropdown
<div className="form-group">
  <label htmlFor="sport" className="form-label">Sport</label>
  <select id="sport" className="form-select">
    <option value="">Selectează sportul</option>
    <option value="fotbal">Fotbal</option>
    <option value="baschet">Baschet</option>
  </select>
</div>
```

### Form Inputs (Tailwind)

**Pattern**: Use Tailwind utilities for new forms

```tsx
// ✅ DO: Standard input with Tailwind
<div className="space-y-2">
  <label htmlFor="name" className="block text-sm font-medium text-yuvoo-heading">
    Nume
  </label>
  <input
    type="text"
    id="name"
    className="w-full px-4 py-2 border border-neutral-grey-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    placeholder="Introdu numele"
  />
</div>

// ✅ DO: Error state
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium text-yuvoo-heading">
    Email
  </label>
  <input
    type="email"
    id="email"
    className="w-full px-4 py-2 border border-red-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <p id="email-error" className="text-sm text-red-500">
    Email invalid
  </p>
</div>

// ✅ DO: Disabled state
<input
  type="text"
  disabled
  className="w-full px-4 py-2 border border-neutral-grey-1 rounded-xl bg-neutral-grey-1 cursor-not-allowed opacity-50"
/>
```

**Input Types**:

```tsx
// Text input
<input type="text" className="form-control" />

// Email input
<input type="email" className="form-control" />

// Number input
<input type="number" className="form-control" min={0} max={100} />

// Date input
<input type="date" className="form-control" />

// Checkbox
<input type="checkbox" className="form-check-input" id="agree" />
<label htmlFor="agree" className="form-check-label">Sunt de acord</label>

// Radio
<input type="radio" className="form-check-input" name="option" id="option1" />
<label htmlFor="option1" className="form-check-label">Opțiune 1</label>
```

---

## Card Types

### Club Card

**Component**: `components/features/clubs/ClubCard.tsx`

**Usage**:

```tsx
import ClubCard from "@/components/features/clubs/ClubCard";
import type { Club } from "@/modules/clubs/clubs.types";

<ClubCard
  club={club}
  variant="default" // or "compact" | "featured"
  className="mb-4"
/>;
```

**Props**:

- `club: Club` - Club data object
- `variant?: "default" | "compact" | "featured"` - Card variant
- `className?: string` - Additional CSS classes

**Features**:

- ✅ Verification badge display
- ✅ Sport information
- ✅ Location display
- ✅ Age groups
- ✅ Pricing information
- ✅ Image display
- ✅ Link to club detail page

**Structure**:

```tsx
<div className="bd-club-card">
  <div className="bd-club-thumb">
    <Image src={club.images[0]} alt={club.name} />
    {club.verified && <VerificationBadge />}
  </div>
  <div className="bd-club-content">
    <h3>
      <Link href={routes.clubs.detail(club.slug)}>{club.name}</Link>
    </h3>
    <p>{club.description}</p>
    <div className="bd-club-meta">{/* Sport, location, age groups, pricing */}</div>
  </div>
</div>
```

### Doctor Card (Planned)

**Pattern**: Similar to Club Card

```tsx
// 📋 Planned structure
<DoctorCard doctor={doctor} variant="default" className="mb-4" />
```

**Features** (planned):

- ✅ Verification badge
- ✅ Medical specialty
- ✅ Location
- ✅ Availability status
- ✅ Rating
- ✅ Link to doctor profile

### Sport Card (Planned)

**Pattern**: Similar to Club Card

```tsx
// 📋 Planned structure
<SportCard sport={sport} variant="default" className="mb-4" />
```

**Features** (planned):

- ✅ Sport icon/image
- ✅ Description
- ✅ Age recommendations
- ✅ Benefits list
- ✅ Link to sport detail page

### Generic Card Pattern (Tailwind)

**For New Components**: Use Tailwind card pattern

```tsx
// ✅ DO: Standard card with Tailwind
<div className="card-yuvoo">
  <div className="p-6">
    <h3 className="text-h3 font-bold text-yuvoo-heading mb-4">
      Titlu Card
    </h3>
    <p className="text-body text-yuvoo-body">
      Conținut card
    </p>
  </div>
</div>

// ✅ DO: Card with image
<div className="card-yuvoo overflow-hidden">
  <div className="relative h-48 bg-primary-light">
    <Image src={image} alt="Card image" fill className="object-cover" />
  </div>
  <div className="p-6">
    <h3 className="text-h3 font-bold text-yuvoo-heading mb-2">
      Titlu
    </h3>
    <p className="text-body text-yuvoo-body">
      Descriere
    </p>
  </div>
</div>

// ✅ DO: Interactive card (hover effects)
<div className="card-yuvoo transition-transform hover:scale-105 cursor-pointer">
  {/* Card content */}
</div>
```

---

## Modal & Toast Guidelines

### Modal Patterns

**Bootstrap Modal** (Existing):

```tsx
// ✅ DO: Use Bootstrap modal for existing components
<div className="modal fade" id="exampleModal" tabIndex={-1}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Titlu Modal</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body">Conținut modal</div>
      <div className="modal-footer">
        <button type="button" className="bd-btn bd-btn-grey" data-bs-dismiss="modal">
          Anulează
        </button>
        <button type="button" className="bd-btn">
          Salvează
        </button>
      </div>
    </div>
  </div>
</div>
```

**shadcn/ui Dialog** (Planned):

```tsx
// 📋 Planned: Use shadcn/ui Dialog for new components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger>Deschide</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Titlu Modal</DialogTitle>
      <DialogDescription>Descriere modal</DialogDescription>
    </DialogHeader>
    <div>Conținut modal</div>
    <DialogFooter>
      <button className="btn-yuvoo-secondary">Anulează</button>
      <button className="btn-yuvoo-primary">Salvează</button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

### Toast Notifications

**Sonner** (Installed):

```tsx
// ✅ DO: Use Sonner for toast notifications
import { toast } from "sonner";

// Success toast
toast.success("Datele au fost salvate cu succes!");

// Error toast
toast.error("Ceva nu a mers bine. Te rugăm să încerci din nou.");

// Info toast
toast.info("Informație importantă");

// Loading toast
const toastId = toast.loading("Se procesează...");
// Later: toast.success("Completat!", { id: toastId });
```

**Toast Provider** (Add to layout):

```tsx
import { Toaster } from "sonner";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Toaster position="top-right" richColors />
    </>
  );
}
```

**Toast Guidelines**:

- ✅ Use Romanian language
- ✅ Keep messages concise and clear
- ✅ Use appropriate toast types (success, error, info, warning)
- ✅ Position: top-right (default)
- ✅ Auto-dismiss after 3-5 seconds (configurable)

---

## Layout Components

### Header Components

**Location**: `layouts/Header/`

**Variants**:

- `HeaderOne.tsx` - Standard header
- `HeaderTwo.tsx` - Alternative header
- `HeaderThree.tsx` - Alternative header
- `HeaderFour.tsx` - Alternative header

**Usage**:

```tsx
import HeaderOne from "@/layouts/Header/HeaderOne";

export default function Layout({ children }) {
  return (
    <>
      <HeaderOne />
      <main>{children}</main>
    </>
  );
}
```

**Features**:

- ✅ Logo display (Yuvoo logo)
- ✅ Navigation menu
- ✅ Mobile menu
- ✅ Authentication buttons
- ✅ Search functionality

### Footer Components

**Location**: `layouts/Footer/`

**Variants**:

- `FooterOne.tsx` - Standard footer
- `FooterTwo.tsx` - Alternative footer
- `FooterThree.tsx` - Alternative footer

**Usage**:

```tsx
import FooterOne from "@/layouts/Footer/FooterOne";

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <FooterOne />
    </>
  );
}
```

**Features**:

- ✅ Logo and branding
- ✅ Navigation links (Romanian routes)
- ✅ Contact information
- ✅ Social media links
- ✅ Copyright text

---

## Component Naming Conventions

### File Naming

**✅ DO**:

- Use PascalCase for component files: `ClubCard.tsx`, `VerificationBadge.tsx`
- Use descriptive names: `ClubDetailsMain.tsx` (not `Details.tsx`)
- Use domain-specific names: `Club`, `Doctor`, `Sport` (not generic `Item`)

**❌ DON'T**:

- Don't use camelCase: `clubCard.tsx` ❌
- Don't use generic names: `Card.tsx` ❌
- Don't use abbreviations: `CDMain.tsx` ❌

### Component Naming

**✅ DO**:

- Match file name: `ClubCard.tsx` → `const ClubCard`
- Use PascalCase: `const VerificationBadge`
- Use descriptive names: `const ClubDetailsMain`

**❌ DON'T**:

- Don't use different name: `ClubCard.tsx` → `const Card` ❌
- Don't use camelCase: `const clubCard` ❌

### Props Naming

**✅ DO**:

- Use camelCase: `club`, `doctor`, `sport`, `onClick`, `className`
- Use descriptive names: `clubData` (not `data`)
- Use boolean prefixes: `isVerified`, `hasChildren`, `canEdit`

**❌ DON'T**:

- Don't use PascalCase: `Club` ❌
- Don't use abbreviations: `clb` ❌
- Don't use generic names: `item`, `data` ❌

---

## Component Patterns

### Server Components (Default)

**✅ DO**: Use Server Components by default

```tsx
// ✅ DO: Server Component (default)
import { getClubs } from "@/modules/clubs/clubs.service";

export default async function ClubsPage() {
  const clubs = await getClubs();

  return (
    <div>
      {clubs.map((club) => (
        <ClubCard key={club.id} club={club} />
      ))}
    </div>
  );
}
```

### Client Components (When Needed)

**✅ DO**: Use Client Components only when needed

```tsx
// ✅ DO: Client Component (for interactivity)
"use client";

import { useState } from "react";

export default function InteractiveComponent() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

**When to Use Client Components**:

- ✅ Event handlers (`onClick`, `onChange`, etc.)
- ✅ React hooks (`useState`, `useEffect`, etc.)
- ✅ Browser APIs (`localStorage`, `window`, etc.)
- ✅ Third-party client libraries (Swiper, React Hook Form, etc.)

**When NOT to Use Client Components**:

- ❌ Data fetching (use Server Components)
- ❌ Static content (use Server Components)
- ❌ SEO-important content (use Server Components)

### Component Composition

**✅ DO**: Compose components from smaller parts

```tsx
// ✅ DO: Compose from smaller components
export default function ClubDetailsPage({ club }) {
  return (
    <div>
      <ClubHeader club={club} />
      <ClubInfo club={club} />
      <ClubGallery images={club.images} />
      <ClubSchedule schedule={club.schedule} />
    </div>
  );
}
```

### Type Safety

**✅ DO**: Use TypeScript types from modules

```tsx
// ✅ DO: Import types from modules
import type { Club } from "@/modules/clubs/clubs.types";

interface ClubCardProps {
  club: Club;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, variant, className }) => {
  // Component implementation
};
```

---

## Best Practices

### ✅ DO

1. **Use Established Patterns**
   - Follow existing component patterns
   - Use design tokens from brand guidelines
   - Maintain consistency with existing components

2. **Type Safety**
   - Always use TypeScript types
   - Import types from `modules/*/types.ts`
   - Define prop interfaces for all components

3. **Accessibility**
   - Use semantic HTML
   - Add ARIA labels where needed
   - Ensure keyboard navigation
   - Maintain color contrast (WCAG AA)

4. **Romanian Language**
   - All user-facing text in Romanian
   - Use microcopy from brand guidelines
   - Keep messages clear and friendly

5. **Performance**
   - Use Server Components by default
   - Optimize images with Next.js Image
   - Lazy load when appropriate
   - Minimize Client Components

6. **Code Organization**
   - Keep components focused and single-purpose
   - Extract reusable logic to hooks/utilities
   - Use composition over inheritance

### ❌ DON'T

1. **Don't Create Inconsistent Patterns**
   - Don't create new button styles without reason
   - Don't mix styling approaches unnecessarily
   - Don't ignore design system tokens

2. **Don't Skip Type Safety**
   - Don't use `any` types
   - Don't skip prop type definitions
   - Don't ignore TypeScript errors

3. **Don't Ignore Accessibility**
   - Don't skip ARIA labels
   - Don't use low contrast colors
   - Don't create keyboard traps

4. **Don't Use English for UI Text**
   - Don't hardcode English text
   - Don't forget to translate
   - Don't use technical jargon

5. **Don't Overuse Client Components**
   - Don't mark components as client unnecessarily
   - Don't fetch data in Client Components
   - Don't increase bundle size unnecessarily

---

## Usage Examples

### Complete Component Example

```tsx
/**
 * Club Card Component
 *
 * Reusable club card component for displaying club information.
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Club } from "@/modules/clubs/clubs.types";
import VerificationBadge from "./VerificationBadge";

interface ClubCardProps {
  club: Club;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, variant = "default", className = "" }) => {
  const mainImage = club.images?.[0] || "/assets/img/placeholder-club.jpg";

  return (
    <div className={`bd-club-card ${variant} ${className}`}>
      <div className="bd-club-thumb position-relative">
        <Image
          src={mainImage}
          alt={club.name}
          width={400}
          height={300}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {club.verified && (
          <div className="bd-club-badge position-absolute top-0 end-0 m-3">
            <VerificationBadge verified={club.verified} />
          </div>
        )}
      </div>
      <div className="bd-club-content theme-bg-6">
        <h3 className="bd-club-title">
          <Link href={routes.clubs.detail(club.slug)}>{club.name}</Link>
        </h3>
        <p className="bd-club-description mb-20">{club.description?.substring(0, 100)}...</p>
        <div className="bd-club-meta-wrapper">{/* Sport, location, age groups, pricing */}</div>
      </div>
    </div>
  );
};

export default ClubCard;
```

### Form Component Example

```tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    toast.success("Mesajul a fost trimis cu succes!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nume
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-xl"
          required
        />
      </div>
      {/* More form fields */}
      <button type="submit" className="btn-yuvoo-primary">
        Trimite
      </button>
    </form>
  );
}
```

---

## References

- **Brand Guidelines**: `docs/BRAND_GUIDELINES.md` - Visual identity and tone of voice
- **Code Generation Rules**: `docs/ PROMPTING_RULES_FOR_CODEGEN.md` - Code generation guidelines
- **Architecture Overview**: `docs/ARCHITECTURE_OVERVIEW.md` - Technical architecture
- **Component Analysis**: `src/components/COMPONENT_ANALYSIS.md` - Component inventory
- **Component Mapping**: `src/components/COMPONENT_MAPPING.md` - Kindedo → Yuvoo mapping
- **Tailwind Setup**: `src/lib/tailwind/README.md` - Tailwind CSS configuration
- **Design System**: `memory-bank/designSystem.md` - Complete design system

---

## Summary

This components guide ensures:

- ✅ **Consistent UI**: Established patterns for buttons, inputs, cards, modals
- ✅ **Type Safety**: TypeScript types for all components
- ✅ **Accessibility**: WCAG AA compliance
- ✅ **Romanian Language**: All user-facing text in Romanian
- ✅ **Performance**: Server Components by default, Client Components when needed
- ✅ **Maintainability**: Clear naming conventions and organization

Follow these guidelines to create consistent, accessible, and maintainable UI components for the Yuvoo platform.

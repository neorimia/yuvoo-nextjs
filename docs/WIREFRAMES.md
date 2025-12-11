# Yuvoo - Wireframes & Page Structures

## Overview

This document provides detailed wireframes and page structure specifications for all major pages in the Yuvoo platform.

**Purpose**: Guide for understanding page layouts, component placement, and user interface structure when implementing pages.

**Key Principles**:

- Mobile-first responsive design
- Clear information hierarchy
- Consistent component usage
- Romanian language throughout
- Trust signals prominently displayed

---

## Homepage

### Structure

```
┌─────────────────────────────────────────┐
│ Header (Logo, Navigation, Auth Buttons) │
├─────────────────────────────────────────┤
│                                         │
│  Hero Section                           │
│  - Main Headline                        │
│  - Value Proposition                    │
│  - CTA: "Începe Chestionarul"          │
│  - Hero Image/Illustration              │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  How It Works (3 Steps)                │
│  ┌──────┐  ┌──────┐  ┌──────┐         │
│  │  1   │  │  2   │  │  3   │         │
│  │ Quiz │→ │Reco  │→ │Club  │         │
│  └──────┘  └──────┘  └──────┘         │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Featured Clubs Section                 │
│  [Club Card] [Club Card] [Club Card]   │
│  "Vezi toate cluburile" (Link)         │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Trust Indicators                      │
│  - Verification Badge                   │
│  - Specialist Integration               │
│  - Parent Testimonials                  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  CTA Section                            │
│  "Descoperă sportul potrivit"          │
│  [Începe Chestionarul] Button          │
│                                         │
├─────────────────────────────────────────┤
│ Footer (Links, Contact, Social)        │
└─────────────────────────────────────────┘
```

### Components Used

- `HeroYuvoo` - Hero section component
- `HomeClubArea` - Featured clubs section
- `HeaderOne` - Header component
- `FooterOne` - Footer component
- Trust indicators section
- CTA section

---

## Quiz Intro Page (`/chestionar`)

### Structure

```
┌─────────────────────────────────────────┐
│ Header                                   │
├─────────────────────────────────────────┤
│                                         │
│  Quiz Introduction                      │
│  - Title: "Chestionar AI Coach"        │
│  - Description                          │
│  - Estimated Time: "5-7 minute"        │
│                                         │
│  What You'll Get:                       │
│  ✓ Recomandări personalizate           │
│  ✓ Explicații clare                    │
│  ✓ Cluburi potrivite                   │
│  ✓ Sugestii de specialiști (dacă e cazul)│
│                                         │
│  [Începe Chestionarul] Button           │
│                                         │
│  Trust Message:                         │
│  "Datele tale sunt sigure și private"  │
│                                         │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### Components Used

- Quiz intro component
- Trust message component
- CTA button

---

## Quiz Container (`/chestionar/container`)

### Structure (6 Steps)

```
┌─────────────────────────────────────────┐
│ Header                                   │
├─────────────────────────────────────────┤
│                                         │
│  Progress Indicator                     │
│  [████░░░░░░] Step 1 of 6              │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Question Section                       │
│  - Question Title                        │
│  - Question Description (optional)      │
│                                         │
│  Answer Options                         │
│  ┌─────────────────────┐              │
│  │ [ ] Option 1         │              │
│  └─────────────────────┘              │
│  ┌─────────────────────┐              │
│  │ [ ] Option 2         │              │
│  └─────────────────────┘              │
│  ┌─────────────────────┐              │
│  │ [ ] Option 3         │              │
│  └─────────────────────┘              │
│                                         │
│  Navigation                             │
│  [← Înapoi]        [Următorul →]      │
│                                         │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### Question Steps

1. **Age & Basic Info**
   - Child's age
   - Gender (optional)

2. **Energy Level**
   - Low, Medium, High, Very High
   - Activity preferences

3. **Personality Traits**
   - Outgoing, Introverted, Competitive, Cooperative
   - Social preferences

4. **Interests & Hobbies**
   - Current interests
   - Previous sports experience

5. **Physical Build**
   - Slim, Average, Athletic
   - Any physical considerations

6. **Preferences**
   - Indoor/Outdoor
   - Team/Individual
   - Time availability
   - Budget considerations

### Components Used

- Progress indicator component
- Question component
- Answer option component (radio buttons, checkboxes, select)
- Navigation buttons

---

## Quiz Results (`/chestionar/rezultate`)

### Structure

```
┌─────────────────────────────────────────┐
│ Header                                   │
├─────────────────────────────────────────┤
│                                         │
│  Results Header                         │
│  "Rezultatele tale sunt gata!"         │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Recommended Sports (3-5)               │
│  ┌─────────────────────────────┐      │
│  │ Sport 1 (Match: 95%)        │      │
│  │ [Sport Icon]                 │      │
│  │ Reasoning: "..."            │      │
│  │ Benefits: [...]             │      │
│  │ [Vezi cluburi] Button       │      │
│  └─────────────────────────────┘      │
│  ┌─────────────────────────────┐      │
│  │ Sport 2 (Match: 88%)        │      │
│  │ ...                          │      │
│  └─────────────────────────────┘      │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Specialist Recommendation (if needed) │
│  "Recomandăm consultarea unui specialist"│
│  [Doctor Card]                          │
│  [Vezi specialiști] Button             │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Actions                                │
│  [Salvează rezultatele] Button         │
│  [Repetă chestionarul] Link            │
│  [Vezi toate cluburile] Link            │
│                                         │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### Components Used

- Results header component
- Sport recommendation card
- Specialist recommendation card (conditional)
- Action buttons

---

## Club Finder (`/cluburi`)

### Structure

```
┌─────────────────────────────────────────┐
│ Header                                   │
├─────────────────────────────────────────┤
│                                         │
│  Page Header                            │
│  "Cluburi Sport pentru Copii"          │
│  "Găsește clubul potrivit"              │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Filters Sidebar (Desktop) /            │
│  Filters Dropdown (Mobile)              │
│  - Sport                                │
│  - Vârstă                               │
│  - Oraș                                 │
│  - District                             │
│  - Nivel                                │
│  - Verificat                            │
│  - Disponibilitate probă                │
│  [Aplică filtre] Button                 │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Search Bar                             │
│  [Search Input] [Caută] Button         │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Results Grid                           │
│  ┌──────┐ ┌──────┐ ┌──────┐           │
│  │Club  │ │Club  │ │Club  │           │
│  │Card  │ │Card  │ │Card  │           │
│  └──────┘ └──────┘ └──────┘           │
│  ┌──────┐ ┌──────┐ ┌──────┐           │
│  │Club  │ │Club  │ │Club  │           │
│  │Card  │ │Card  │ │Card  │           │
│  └──────┘ └──────┘ └──────┘           │
│                                         │
│  Pagination                             │
│  [← Previous] [1] [2] [3] [Next →]   │
│                                         │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### Components Used

- `ClubsMain` - Main clubs listing component
- `ClubCard` - Club card component
- Filters component
- Search bar component
- Pagination component

---

## Club Detail Page (`/cluburi/[slug]`)

### Structure

```
┌─────────────────────────────────────────┐
│ Header                                   │
├─────────────────────────────────────────┤
│                                         │
│  Club Header                            │
│  [Club Image/Logo]                      │
│  Club Name                              │
│  [Verification Badge]                   │
│  Sport: [Sport Name]                    │
│  Location: [City, District, Address]    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Quick Info                             │
│  - Vârste acceptate: 4-14 ani           │
│  - Nivel: Începători, Avansați         │
│  - Rating: ⭐⭐⭐⭐ (4.5)                │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Description                            │
│  [Club Description Text]                │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Photo Gallery                          │
│  [Image] [Image] [Image] [Image]       │
│  [View All Photos] Link                 │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Schedule                                │
│  Luni: 17:00-18:30                      │
│  Miercuri: 17:00-18:30                 │
│  Vineri: 17:00-18:30                    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Pricing                                │
│  - Abonament lunar: 200 RON            │
│  - Ședință: 25 RON                     │
│  - Semestru: 1000 RON                  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Contact Information                    │
│  - Telefon: [Phone]                    │
│  - Email: [Email]                       │
│  - Website: [Website Link]              │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Map (Location)                         │
│  [Google Maps Embed]                    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Actions                                │
│  [Rezervă probă gratuită] Button       │
│  [Salvează la favorite] Button         │
│  [Contactează clubul] Button            │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Reviews Section (Phase 2+)             │
│  [Review Card] [Review Card]            │
│  [Vezi toate recenziile] Link           │
│                                         │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### Components Used

- `ClubDetailsMain` - Club detail page component
- `VerificationBadge` - Verification badge component
- Photo gallery component
- Map component
- Booking form component
- Reviews component (Phase 2+)

---

## Parent Dashboard (`/parent/dashboard`)

### Structure

```
┌─────────────────────────────────────────┐
│ Header (with User Menu)                 │
├─────────────────────────────────────────┤
│ Sidebar Navigation                      │
│ - Dashboard                             │
│ - Copiii Mei                            │
│ - Rezervări                             │
│ - Favorite                              │
│ - Setări                                │
├─────────────────────────────────────────┤
│                                         │
│  Dashboard Content                      │
│                                         │
│  Welcome Section                        │
│  "Bună, [Parent Name]!"                 │
│                                         │
│  Quick Stats                            │
│  ┌──────┐ ┌──────┐ ┌──────┐           │
│  │Copii │ │Quiz  │ │Rezerv│           │
│  │  2   │ │  3   │ │  1   │           │
│  └──────┘ └──────┘ └──────┘           │
│                                         │
│  Children Overview                      │
│  [Child Card] [Child Card]              │
│  [Adaugă copil] Button                 │
│                                         │
│  Recent Activity                        │
│  - Quiz completat pentru Maria         │
│  - Rezervare la Club Fotbal             │
│  - Adăugat la favorite: Club Baschet    │
│                                         │
│  Quick Actions                          │
│  [Începe un quiz nou] Button           │
│  [Vezi cluburile] Button               │
│  [Vezi specialiștii] Button            │
│                                         │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### Components Used

- Dashboard layout component
- Sidebar navigation component
- Stats cards component
- Child card component
- Activity feed component
- Quick actions component

---

## Children List (`/parent/children`)

### Structure

```
┌─────────────────────────────────────────┐
│ Header                                   │
├─────────────────────────────────────────┤
│ Sidebar                                  │
├─────────────────────────────────────────┤
│                                         │
│  Page Header                            │
│  "Copiii Mei"                           │
│  [Adaugă copil] Button                  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Children Grid                          │
│  ┌──────────────┐ ┌──────────────┐   │
│  │ [Child Photo]│ │ [Child Photo]│   │
│  │ Maria        │ │ Ion          │   │
│  │ 8 ani        │ │ 6 ani        │   │
│  │              │ │              │   │
│  │ [Vezi profil]│ │ [Vezi profil]│   │
│  │ [Editează]   │ │ [Editează]   │   │
│  └──────────────┘ └──────────────┘   │
│                                         │
│  Empty State (if no children)          │
│  "Nu ai adăugat copii încă"           │
│  [Adaugă primul copil] Button          │
│                                         │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### Components Used

- Children list component
- Child card component
- Empty state component
- Add child button

---

## Add/Edit Child Form

### Structure

```
┌─────────────────────────────────────────┐
│ Header                                   │
├─────────────────────────────────────────┤
│ Sidebar                                  │
├─────────────────────────────────────────┤
│                                         │
│  Form Header                            │
│  "Adaugă copil" / "Editează copil"     │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Form Fields                            │
│  ┌─────────────────────────────┐      │
│  │ Prenume *                   │      │
│  │ [Input Field]               │      │
│  └─────────────────────────────┘      │
│  ┌─────────────────────────────┐      │
│  │ Nume *                      │      │
│  │ [Input Field]               │      │
│  └─────────────────────────────┘      │
│  ┌─────────────────────────────┐      │
│  │ Data nașterii *              │      │
│  │ [Date Picker]                │      │
│  └─────────────────────────────┘      │
│  ┌─────────────────────────────┐      │
│  │ Gen                          │      │
│  │ ( ) Masculin                │      │
│  │ ( ) Feminin                 │      │
│  │ ( ) Altul                   │      │
│  └─────────────────────────────┘      │
│                                         │
│  Form Actions                           │
│  [Anulează] Button                     │
│  [Salvează] Button                      │
│                                         │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### Components Used

- Form component
- Input fields
- Date picker
- Radio buttons
- Form validation

---

## Responsive Design

### Mobile Layout (< 768px)

**Key Changes**:

- Filters move to dropdown/modal
- Single column layout for cards
- Stacked navigation
- Hamburger menu for navigation
- Full-width buttons
- Simplified headers

### Tablet Layout (768px - 992px)

**Key Changes**:

- 2-column grid for cards
- Sidebar becomes collapsible
- Filters in sidebar or modal
- Medium-sized buttons

### Desktop Layout (≥ 992px)

**Key Changes**:

- 3-4 column grid for cards
- Fixed sidebar navigation
- Filters in sidebar
- Full feature set visible

---

## Component Patterns

### Card Pattern

```
┌─────────────────────────┐
│ [Image/Icon]            │
│ [Badge] (optional)      │
├─────────────────────────┤
│ Title                   │
│ Description             │
│                         │
│ Meta Information        │
│ - Location              │
│ - Age groups            │
│ - Pricing               │
│                         │
│ [Action Button]         │
└─────────────────────────┘
```

### Form Pattern

```
┌─────────────────────────┐
│ Form Title              │
├─────────────────────────┤
│                         │
│ Label                   │
│ [Input Field]           │
│ [Error Message]         │
│                         │
│ Label                   │
│ [Input Field]           │
│                         │
│ [Submit Button]         │
│ [Cancel Button]         │
└─────────────────────────┘
```

### Modal Pattern

```
┌─────────────────────────┐
│ [X] Close               │
├─────────────────────────┤
│ Modal Title             │
│                         │
│ Modal Content           │
│                         │
├─────────────────────────┤
│ [Cancel] [Confirm]     │
└─────────────────────────┘
```

---

## Quick Reference

### Page Components Mapping

| Page             | Main Component              | Location                            |
| ---------------- | --------------------------- | ----------------------------------- |
| Homepage         | `HeroYuvoo`, `HomeClubArea` | `app/page.tsx`                      |
| Quiz Intro       | Quiz intro component        | `app/chestionar/page.tsx`           |
| Quiz Container   | Quiz question component     | `app/chestionar/container/page.tsx` |
| Quiz Results     | Quiz results component      | `app/chestionar/rezultate/page.tsx` |
| Clubs Listing    | `ClubsMain`                 | `app/cluburi/page.tsx`              |
| Club Detail      | `ClubDetailsMain`           | `app/cluburi/[slug]/page.tsx`       |
| Parent Dashboard | Dashboard component         | `app/parent/dashboard/page.tsx`     |
| Children List    | Children list component     | `app/parent/children/page.tsx`      |

---

## References

- **Components Guide**: `docs/COMPONENTS_GUIDE.md` - Component patterns and usage
- **Brand Guidelines**: `docs/BRAND_GUIDELINES.md` - Visual identity and styling
- **Site Map**: `docs/SITE_MAP.md` - Complete route structure
- **Architecture Overview**: `docs/ARCHITECTURE_OVERVIEW.md` - Technical architecture

---

## Summary

This wireframes document ensures:

- ✅ **Page Structures**: Clear layout specifications for all major pages
- ✅ **Component Placement**: Where components should be placed
- ✅ **User Flows**: Visual representation of user journeys
- ✅ **Responsive Design**: Mobile, tablet, and desktop layouts
- ✅ **Component Patterns**: Reusable patterns for cards, forms, modals
- ✅ **Consistency**: Standardized layouts across the platform

**Always reference this document when implementing new pages to ensure consistency and proper structure.**

# Yuvoo - Design System & Brand Guidelines

## Analiza Temei de Pornire

### Template Utilizat: Kindedo

**Sursă**: Template Next.js pentru grădinițe și școli  
**Potrivire pentru Yuvoo**: ✅ Excelentă - template-ul este deja orientat către activități pentru copii

### Structura Existente

#### 1. **Componente Disponibile**

**Componente Relevante pentru Yuvoo**:

- ✅ **Class/Classes** → Pot fi adaptate pentru **Cluburi Sportive**
- ✅ **Teacher** → Pot fi adaptate pentru **Specialiști Pediatri**
- ✅ **Program** → Pot fi adaptate pentru **Programe Sportive**
- ✅ **HeroArea** → Perfect pentru landing page Yuvoo
- ✅ **Banner** → Pentru promoții și CTA-uri
- ✅ **Testimonial** → Pentru feedback părinți
- ✅ **Gallery** → Pentru galerii foto cluburi
- ✅ **FAQ** → Pentru întrebări frecvente
- ✅ **Contact** → Formulare de contact
- ✅ **Auth** → Login, Register, Forgot Password (deja existente)

**Componente de Layout**:

- ✅ **Header** (multiple variante: HeaderOne, HeaderTwo, HeaderThree, HeaderFour)
- ✅ **Footer** (multiple variante: FooterOne, FooterTwo, FooterThree)
- ✅ **Topbar** (multiple variante)
- ✅ **Menu** (mega menu, dropdown, mobile menu)
- ✅ **Sidebar** (cart, menu, mobile)

**Componente Utilitare**:

- ✅ **Breadcrumb** - Navigare
- ✅ **Pagination** - Paginare
- ✅ **Preloader** - Loading states
- ✅ **BackToTop** - Scroll to top
- ✅ **Modal** - Popup-uri (video, product)
- ✅ **Form** - Formulare (contact, auth, review)

#### 2. **Tehnologii de Styling**

**Actual**:

- **Bootstrap 5.3.3** - CSS framework
- **SCSS** - Preprocessor CSS
- **Animate.css** - Animații
- **WOW.js** - Scroll animations
- **Font Awesome Pro** - Iconuri
- **Flaticon Kindedo** - Iconuri custom
- **Nice Select** - Dropdown-uri stilizate

**Font Principal**:

- **Gabarito** (Google Fonts) - Font friendly pentru copii, modern și jucăuș

**Actual pentru Yuvoo**:

- **Bootstrap 5.3.3** - Framework CSS pentru toate componentele ✅
- **SCSS** - Preprocesor CSS pentru stiluri custom ✅
- **Bootstrap Utility API** - Utilități custom Yuvoo ✅

#### 3. **Structura de Date**

**Fișiere de Date Existente** (pot fi adaptate):

- `class-data.ts` → `club-data.ts` (cluburi sportive)
- `teacher-data.ts` → `doctor-data.ts` (specialiști)
- `program-data.ts` → `sport-data.ts` (sporturi)
- `testimonial-data.ts` → Feedback părinți
- `menu-data.ts` → Meniu navigare

#### 4. **Pattern-uri de Design**

**Observații**:

- Design colorat și prietenos pentru copii
- Animații subtile (WOW.js)
- Card-uri cu hover effects
- Gradient backgrounds
- Shape decorations (SVG, PNG)
- Responsive design (Bootstrap grid)

## Design System pentru Yuvoo

### Paleta de Culori

**Culori Extrase din Tema Kindedo** (`public/assets/scss/utils/_colors.scss`):

#### Theme Colors (Culori Principale)

- **Theme 1 (Primary)**: `#00BBAE` - Turcoaz/Cyan
  - Utilizare: Buttons primary, links hover, accents principale
  - Variantă deschisă: `#EBFFFE` (theme-7)
- **Theme 2 (Secondary)**: `#FF9B24` - Portocaliu
  - Utilizare: Buttons secondary, highlights, CTA-uri
  - Variantă deschisă: `#FFECD6` (theme-8), `#FFF6EB` (theme-6)
- **Theme 3 (Accent)**: `#FF577B` - Roz/Roșu
  - Utilizare: Accents, badges, alerts
- **Theme 4**: `#FFF8EB` - Bej deschis (background)
- **Theme 5**: `#FFA455` - Portocaliu deschis
- **Theme 6**: `#FFF6EB` - Bej foarte deschis (background)
- **Theme 7**: `#EBFFFE` - Cyan foarte deschis (background)
- **Theme 8**: `#FFECD6` - Portocaliu foarte deschis (background)
- **Theme 9**: `#FF7C7C` - Roz deschis
- **Theme 10**: `#7C81FF` - Violet/Albastru
- **Theme 11**: `#00B9F1` - Albastru Cyan

#### Common Colors

- **White**: `#FFFFFF` - Fundal alb, text pe fundal închis
- **Black**: `#1B1B1B` - Text principal, headings

#### Text Colors

- **Body Text**: `#424242` - Text principal
- **Text 1**: `#000000` - Text foarte închis

#### Grey Colors

- **Grey 1**: `#E6E6E6` - Borders, dividers
- **Grey 2**: `#E9CFCF` - Borders alternative

#### CSS Variables

Toate culorile sunt disponibile ca CSS variables:

- `--bd-theme-1` până la `--bd-theme-11`
- `--bd-common-white`, `--bd-common-black`
- `--bd-text-body`, `--bd-text-1`
- `--bd-grey-1`, `--bd-grey-2`

### Paleta de Culori Yuvoo (Confirmată)

**Decizie Finală Brand Yuvoo**:

1. **Primary Color**: `#00BBAE` - Turcoaz/Cyan ✅
   - **Utilizare**: Buttons primary, links hover, accents principale, brand identity
   - **Asociere**: Sport, apă, energie, profesionalism
   - **Variantă deschisă**: `#EBFFFE` (theme-7) - pentru backgrounds
   - **CSS Variable**: `--bd-theme-1` sau `--yuvoo-primary`

2. **Secondary Color**: `#FF9B24` - Portocaliu ✅
   - **Utilizare**: Buttons secondary, highlights, CTA-uri, badges importante
   - **Asociere**: Joc, energie, entuziasm, fun
   - **Variante deschise**: `#FFECD6` (theme-8), `#FFF6EB` (theme-6) - pentru backgrounds
   - **CSS Variable**: `--bd-theme-2` sau `--yuvoo-secondary`

3. **Accent Color**: `#7C81FF` - Violet/Albastru ✅
   - **Utilizare**: Accents, badges secundare, highlights subtile, decorative elements
   - **Asociere**: Creativitate, inovație, modern
   - **CSS Variable**: `--bd-theme-10` sau `--yuvoo-accent`

4. **Background Colors**:
   - `#EBFFFE` (theme-7) - Secțiuni sport, hero backgrounds
   - `#FFF6EB` (theme-6) - Secțiuni generale, cards
   - `#FFFFFF` - Fundal principal, cards
   - `#FFECD6` (theme-8) - Secțiuni speciale, highlights

**Notă**: Theme 3 (`#FF577B` - roz) poate fi folosit ocazional pentru alerts sau elemente speciale, dar accentul principal este violet (`#7C81FF`).

**Contrast și Accesibilitate**:

- ✅ Text negru (`#1B1B1B`) pe fundal alb - contrast excelent
- ✅ Text alb pe fundal turcoaz (`#00BBAE`) - contrast bun
- ✅ Text alb pe fundal portocaliu (`#FF9B24`) - contrast bun
- ⚠️ Verifică contrast pentru text pe fundaluri deschise (theme-4, theme-6, theme-7, theme-8)

### Utilizare Culori în Componente

**Exemple de Utilizare pentru Yuvoo**:

```scss
// Primary button (Turcoaz)
background: var(--bd-theme-1); // #00BBAE
color: var(--bd-common-white);

// Secondary button (Portocaliu)
background: var(--bd-theme-2); // #FF9B24
color: var(--bd-common-white);

// Accent elements (Violet)
color: var(--bd-theme-10); // #7C81FF
background: var(--bd-theme-10); // pentru badges, highlights

// Background sections
background: var(--bd-theme-7); // #EBFFFE (cyan deschis) - secțiuni sport
background: var(--bd-theme-6); // #FFF6EB (bej deschis) - secțiuni generale
background: var(--bd-theme-8); // #FFECD6 (portocaliu deschis) - highlights

// Text
color: var(--bd-text-body); // #424242 (body text)
color: var(--bd-heading-primary); // #1B1B1B (headings)

// Borders
border-color: var(--bd-grey-1); // #E6E6E6
```

**Ghid de Utilizare Yuvoo**:

- **Primary (`#00BBAE`)**: Buttons principale, logo, links importante, brand elements
- **Secondary (`#FF9B24`)**: CTA-uri, badges importante, highlights, call-to-action buttons
- **Accent (`#7C81FF`)**: Badges secundare, decorative elements, subtle highlights, icons
- **Backgrounds**: Folosește variantele deschise pentru secțiuni și cards

**Gradient Patterns** (folosite în temă):

- `linear-gradient(90.87deg, #00BBAE 0.69%, rgba(0, 187, 174, 0) 96.75%)` - Turcoaz fade
- `linear-gradient(100.88deg, #EBFFFE 0.6%, #FFF6EB 100%)` - Cyan to Bej
- `linear-gradient(180deg, #FF577B00, #FF9B24 65%)` - Roz to Portocaliu

### Tipografie

**Font Principal**: Gabarito

- **Family**: `'Gabarito', sans-serif`
- **Weights Available**:
  - 200 (Extra Light)
  - 300 (Light)
  - 400 (Regular/Normal) ✅ Most common
  - 500 (Medium)
  - 600 (Semi Bold) ✅ Common for headings
  - 700 (Bold) ✅ Common for headings
  - 800 (Extra Bold)
  - 900 (Black)
- **Caracteristici**: Friendly, modern, jucăuș, perfect pentru copii
- **Potrivit pentru**: Headings, CTA-uri, elemente importante, brand identity

**Font Secundar**: Gabarito (același font pentru consistență)

**Font Awesome**: `"Font Awesome 6 Pro"` - pentru iconuri

**Typography Scale** (extras din `_typography.scss`):

| Element       | Font Size | Font Weight       | Line Height   | Usage                      |
| ------------- | --------- | ----------------- | ------------- | -------------------------- |
| **H1**        | `96px`    | `700` (bold)      | `1.25`        | Hero titles, main headings |
| **H2**        | `64px`    | `600` (semi-bold) | `1.25`        | Section titles             |
| **H3**        | `32px`    | `600` (semi-bold) | `1.5`         | Card titles, subsections   |
| **H4**        | `23px`    | `600` (semi-bold) | `1.7`         | Subsection titles          |
| **H5**        | `16px`    | `600` (semi-bold) | `1.25`        | Small headings             |
| **H6**        | `16px`    | `600` (semi-bold) | `2`           | Smallest headings          |
| **Body**      | `18px`    | `400` (normal)    | `30px` (1.67) | Body text, paragraphs      |
| **Paragraph** | `18px`    | `400` (normal)    | `30px` (1.67) | Paragraph text             |

**CSS Variables** (din `_root.scss`):

- `--bd-ff-body`: `'Gabarito', sans-serif`
- `--bd-ff-heading`: `'Gabarito', sans-serif`
- `--bd-ff-p`: `'Gabarito', sans-serif`
- `--bd-ff-fontawesome`: `"Font Awesome 6 Pro"`
- `--bd-fz-body`: `18px`
- `--bd-fz-p`: `18px`
- `--bd-fz-h1`: `96px`
- `--bd-fz-h2`: `64px`
- `--bd-fz-h3`: `32px`
- `--bd-fz-h4`: `23px`
- `--bd-fz-h5`: `16px`
- `--bd-fz-h6`: `16px`
- `--bd-fw-normal`: `normal`
- `--bd-fw-light`: `300`
- `--bd-fw-regular`: `400`
- `--bd-fw-medium`: `500`
- `--bd-fw-sbold`: `600`
- `--bd-fw-bold`: `700`
- `--bd-heading-primary`: `#1B1B1B` (black)
- `--bd-text-body`: `#424242` (dark grey)

### Componente de Design

#### Buttons

**Pattern Existente**:

```tsx
<Link href="/" className="bd-btn">
  <span className="bd-btn-inner">
    <span className="bd-btn-normal">Text</span>
    <span className="bd-btn-hover">Text</span>
  </span>
</Link>
```

**Tipuri de Buttons**:

- Primary (bd-btn)
- Secondary (de identificat)
- Outline (de identificat)
- Ghost (de identificat)

#### Cards

**Pattern pentru Cluburi** (adaptat din Class cards):

- Image header
- Content area cu informații
- Footer cu CTA
- Hover effects
- Border radius: 24px (radius-24)

#### Forms

**Componente Disponibile**:

- SignInForm
- SignUpMain
- ContactForm
- ForgotForm
- ReviewForm

**Pattern**: Bootstrap form styling cu validare

#### Form Input Styling (Yuvoo Brand) - January 2025

**Checkbox Styling**:

- Custom Yuvoo-branded checkbox styling using `.yuvoo-checkbox-wrapper` and `.yuvoo-radio` classes
- Overrides Bootstrap default blue color with Yuvoo primary turquoise (`#00BBAE`)
- Checked state: Background and border set to `var(--bd-theme-1)`
- Focus state: Yuvoo primary border with subtle box-shadow
- Location: Styles in `public/assets/scss/layout/_login.scss` and `public/assets/scss/utils/_yuvoo-utilities.scss`

**Radio Button Styling**:

- Card-style radio button layout for better visual hierarchy
- Wrapper: `.yuvoo-radio-group` container with `.yuvoo-radio-wrapper` for each option
- Radio input: `.yuvoo-radio.form-check-input` class
- Styling features:
  - Card-style layout with border, padding, and rounded corners
  - Hover effects (border color changes to Yuvoo primary)
  - Selected state with Yuvoo primary border and subtle background tint
  - Split labels: `.yuvoo-radio-title` (bold, 16px) and `.yuvoo-radio-description` (14px, gray)
- Colors: Yuvoo primary (`var(--bd-theme-1)`) for checked state and borders
- Location: Styles in `public/assets/scss/layout/_login.scss` and `public/assets/scss/utils/_yuvoo-utilities.scss`

**Implementation Example** (from SignUpMain):

```tsx
<div className="yuvoo-radio-group d-flex flex-column gap-3">
  <div className="yuvoo-radio-wrapper form-check">
    <input
      className="yuvoo-radio form-check-input"
      type="radio"
      name="role"
      id="role-parent"
      value="parent"
    />
    <label className="form-check-label yuvoo-radio-label" htmlFor="role-parent">
      <span className="yuvoo-radio-title">Părinte</span>
      <span className="yuvoo-radio-description">Caută sporturi și cluburi pentru copilul meu</span>
    </label>
  </div>
</div>
```

**Consent Checkbox Example**:

```tsx
<div className="form-check d-flex align-items-start yuvoo-checkbox-wrapper">
  <input className="form-check-input mt-1 yuvoo-checkbox" type="checkbox" id="consent-check" />
  <label className="form-check-label ms-2" htmlFor="consent-check">
    Sunt de acord cu{" "}
    <Link href={routes.terms} className="text-yuvoo-primary">
      termenii
    </Link>
  </label>
</div>
```

#### Home Page Components (January 2025)

**Componente Create/Actualizate**:

- ✅ `HomeTrustSignals` - Trust signals section (6 badges: verified clubs, GDPR, verified doctors, secure platform, free for parents, AI recommendations)
  - Icons: Font Awesome Pro (`fa-solid fa-*`)
  - Styling: Custom SCSS (`layout/_trust.scss`)
  - Features: Hover effects, clickable cards, theme color integration
- ✅ `HomeStats` - Statistics section with animated counters
  - Icons: Flaticon Kindedo (`flaticon-friends`, `flaticon-certificate`, `flaticon-teacher`, `flaticon-sports`)
  - Styling: Custom SCSS (`layout/_stats.scss`)
  - Features: CountUpContent integration, responsive design
- ✅ `HowItWorks` - 3-step process explanation
  - Icons: Flaticon Kindedo (`flaticon-reading`, `flaticon-presentation`, `flaticon-location-pin`)
  - Styling: Custom SCSS (`layout/_how-it-works.scss`)
  - Features: Clickable cards, hover effects, links to quiz and clubs
- ✅ `FeaturedSports` - Featured sports display
  - Icons: Flaticon Kindedo (sport-specific icons)
  - Styling: Custom SCSS (`layout/_featured-sports.scss`)
  - Features: Image cards, club count badges, hover effects, icon overlays
- ✅ `FeaturedClubs` - Featured clubs display
  - Icons: Uses `VerificationBadge` and `DistanceBadge` components
  - Styling: Custom SCSS (`layout/_featured-clubs.scss`)
  - Features: Verification badges, distance badges, hover effects, image cards
- ✅ `FeaturedDoctors` - Featured doctors display
  - Icons: None (removed as unnecessary)
  - Styling: Custom SCSS (`layout/_featured-doctors.scss`)
  - Features: Circular avatars, verification badges, hover effects
- ✅ `HomeTestimonial` - Testimonial section
  - Components: Uses `StarRating` and `AvatarInitials` components
  - Styling: Custom SCSS (`layout/_home-testimonial.scss`)
  - Features: Star ratings, avatar initials, quote display, location info
- ✅ `HomeFaq` - FAQ section
  - Components: Uses `FaqAccordionItem` component
  - Styling: Custom SCSS (`layout/_home-faq.scss`)

**Sports Components** (Created January 2025):

- ✅ `SportsMain` - Main listing component with category filtering
  - Styling: Custom SCSS (`layout/_sports-main.scss`)
  - Features: Filter buttons with icons, results count, empty state
- ✅ `SportCard` - Card component with category badges
  - Styling: Custom SCSS (`layout/_sport-card.scss`)
  - Features: Category badges with colors, icon display, hover effects
- ✅ `SportDetailsMain` - Detail page component
  - Styling: Custom SCSS (`layout/_sport-details.scss`)
  - Features: Enhanced info display, CTA buttons with icons
- ✅ Sports listing page intro section
  - Styling: Custom SCSS (`layout/_sports-intro.scss`)
  - Features: Feature cards with icons and descriptions
- ✅ Sports listing page FAQ section
  - Styling: Custom SCSS (`layout/_sports-faq.scss`)
  - Features: Sports-specific FAQ with accordion items
  - Features: Bootstrap accordion, shows top 6 FAQs, link to full FAQ page

**Reusable Components Created**:

- ✅ `SectionTitle` - Consistent section titles across all home components
- ✅ `ViewAllLink` - "View All" links for featured sections
- ✅ `DistanceBadge` - Distance/location badges for clubs
- ✅ `StarRating` - Star rating display (sm, md, lg sizes)
- ✅ `AvatarInitials` - Circular avatar with initials (sm, md, lg sizes)
- ✅ `FaqAccordionItem` - Reusable FAQ accordion item

**Pattern**: All home components follow consistent design system:

- Custom SCSS classes (no inline styles)
- Consistent spacing (120px top, 90px bottom for sections)
- Hover effects (card lift, color transitions)
- Responsive breakpoints
- WOW.js animations with staggered delays
- Romanian content throughout

### Spacing System

**Bootstrap Spacing**:

- Utiliză sistemul Bootstrap spacing (p-_, m-_, pt-_, pb-_, etc.)
- Container: `.container` (Bootstrap default)
- Container max-width: `1320px` (pe ecrane ≥1400px)

**Bootstrap Spacing Scale** (standard):

| Class        | Value     | Pixels | Usage           |
| ------------ | --------- | ------ | --------------- |
| `p-0`, `m-0` | `0`       | `0px`  | No spacing      |
| `p-1`, `m-1` | `0.25rem` | `4px`  | Minimal spacing |
| `p-2`, `m-2` | `0.5rem`  | `8px`  | Small spacing   |
| `p-3`, `m-3` | `1rem`    | `16px` | Default spacing |
| `p-4`, `m-4` | `1.5rem`  | `24px` | Medium spacing  |
| `p-5`, `m-5` | `3rem`    | `48px` | Large spacing   |

**Common Spacing Values Used** (din componente):

- `pt-110`, `pb-70` - Section padding (110px top, 70px bottom)
- `pt-120`, `pb-80` - Large section padding
- `mb-20`, `mb-25`, `mb-30`, `mb-40`, `mb-50` - Bottom margins (20px, 25px, 30px, 40px, 50px)
- `mt-35`, `mt-4` - Top margins

**Container**:

- Default: Bootstrap responsive container
- Max-width (≥1400px): `1320px`
- Padding: Bootstrap default (responsive)

### Animații

**Biblioteci**:

- **WOW.js** - Scroll animations
- **Animate.css** - Pre-built animations
- **AOS** (posibil) - Animate on scroll

**Animation Durations** (din mixins și componente):

- **Standard Transition**: `0.3s` (300ms) - cel mai comun
- **Long Transition**: `0.5s` (500ms) - pentru animații mai complexe
- **WOW.js Duration**: `1s` (1000ms) - pentru scroll animations
- **Easing**: `ease-out` (standard), `cubic-bezier(.785, .135, .15, .86)` (pentru panel animations)

**Pattern-uri**:

```tsx
// WOW.js scroll animation
className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s"

// Standard transition (SCSS mixin)
@include transition(.3s);

// Custom animation
@include animate(panel, 1s, infinite, cubic-bezier(.785, .135, .15, .86));
```

**Common Animation Classes**:

- `wow fadeInUp` - Fade in from bottom
- `wow fadeInLeft` - Fade in from left
- `wow fadeInRight` - Fade in from right
- `transition-3` - Standard 0.3s transition

**Recomandare**: Menține animațiile subtile pentru UX profesional.

### Border Radius

**Border Radius Values** (extrase din SCSS):

| Value  | Pixels | Usage                             | CSS Class    |
| ------ | ------ | --------------------------------- | ------------ |
| `2px`  | `2px`  | Minimal rounding                  | -            |
| `4px`  | `4px`  | Small elements                    | -            |
| `5px`  | `5px`  | Small buttons                     | -            |
| `7px`  | `7px`  | Pagination items                  | -            |
| `8px`  | `8px`  | Small cards                       | -            |
| `10px` | `10px` | Medium elements                   | -            |
| `12px` | `12px` | Medium cards                      | -            |
| `16px` | `16px` | Cards, buttons                    | -            |
| `20px` | `20px` | Large cards                       | -            |
| `24px` | `24px` | **Most common** - Cards, sections | `.radius-24` |
| `30px` | `30px` | Large sections                    | -            |
| `32px` | `32px` | Large cards, buttons              | -            |
| `40px` | `40px` | Decorative elements               | -            |
| `50px` | `50px` | Buttons, pills                    | -            |
| `50%`  | -      | **Circles** - Avatars, icons      | -            |

**Organic Shapes** (decorative):

- `border-radius: 44% 56% 44% 56% / 58% 47% 53% 42%` - Organic blob shape
- `border-radius: 81% 19% 23% 77% / 58% 52% 48% 42%` - Organic blob shape
- `border-radius: 37% 63% 61% 39% / 52% 49% 51% 48%` - Organic blob shape
- `border-radius: 42% 58% 37% 63% / 52% 37% 63% 48%` - Organic blob shape

**Most Common**: `24px` (`.radius-24`) pentru cards și secțiuni principale

### Shadows

**Box Shadow Values** (extrase din SCSS):

| Shadow               | Value                                     | Usage              |
| -------------------- | ----------------------------------------- | ------------------ |
| **Card Shadow**      | `0px 16px 32px 0px rgba(0, 0, 0, 0.06)`   | Cards, dropcap     |
| **Menu Shadow**      | `0px 20px 30px rgba(3, 4, 28, 0.1)`       | Dropdown menus     |
| **Modal Shadow**     | `0px 30px 70px 0px rgba(11, 6, 70, 0.08)` | Modal overlays     |
| **Header Shadow**    | `0 10px 30px rgba(0, 0, 0, 0.12)`         | Sticky header      |
| **Header Shadow 2**  | `0px 4px 10px rgba(3, 4, 28, 0.1)`        | Header alternative |
| **Login Shadow**     | `0px 30px 60px rgba(3, 4, 28, 0.1)`       | Login forms        |
| **Offcanvas Shadow** | `-5px 0 20px -5px rgba(0, 0, 0, 0.5)`     | Sidebar/offcanvas  |

**Drop Shadow** (pentru imagini și decorative elements):

- `filter: drop-shadow(5px 5px 0 var(--bd-theme-2))` - Portocaliu shadow
- `filter: drop-shadow(5px 5px 0 var(--bd-theme-1))` - Turcoaz shadow
- `filter: drop-shadow(4px 4px 0px #FFE1BD)` - Light orange shadow
- `filter: drop-shadow(6px 6px 0 var(--bd-theme-2))` - Stronger shadow
- `filter: drop-shadow(0px 10px 0 var(--bd-theme-2))` - Vertical shadow

**Pattern**: Shadows sunt folosite pentru depth și elevation, drop-shadows pentru decorative elements

### Breakpoints (Responsive)

**Breakpoint System** (din `_breakpoints.scss`):

| Breakpoint | Min Width | Max Width | Usage               |
| ---------- | --------- | --------- | ------------------- |
| **XXXL**   | `1600px`  | `1700px`  | Extra large screens |
| **XXL**    | `1400px`  | `1599px`  | Large desktop       |
| **XL**     | `1200px`  | `1399px`  | Desktop             |
| **LG**     | `992px`   | `1199px`  | Tablet landscape    |
| **MD**     | `768px`   | `991px`   | Tablet portrait     |
| **SM**     | `576px`   | `767px`   | Mobile landscape    |
| **XS**     | `0px`     | `575px`   | Mobile portrait     |

**Bootstrap Grid**:

- Utiliză sistemul Bootstrap 5.3.3 grid
- 12 columns
- Responsive breakpoints: sm, md, lg, xl, xxl

**Container Max Widths**:

- Default: Bootstrap responsive
- ≥1400px: `1320px` (custom)

### Z-Index Scale

**Z-Index Values** (din componente):

| Value | Usage                   |
| ----- | ----------------------- |
| `1`   | Base elements           |
| `10`  | Panel overlays          |
| `11`  | Elevated elements       |
| `99`  | Progress/scroll buttons |
| `999` | Body overlay, modals    |

**Common Z-Index Pattern**:

- Base content: `z-index: 1`
- Overlays: `z-index: 10-11`
- Fixed elements: `z-index: 99`
- Modals/overlays: `z-index: 999`

### Icons

**Biblioteci**:

- **Font Awesome Pro** - Iconuri principale (folosit pentru componente noi)
- **Flaticon Kindedo** - Iconuri custom pentru temă (folosit pentru componente existente și noi când sunt disponibile)
- **SVG Components** - Iconuri custom React

**Pattern**:

- **Font Awesome** (preferat pentru componente noi): `<i className="fa-solid fa-certificate"></i>`
- **Flaticon** (folosit când iconurile sunt disponibile și relevante): `<i className="flaticon-sports"></i>`

**Font Awesome Usage** (componente noi):

- `fa-solid` - Solid style icons (primary)
- `fa-regular` - Regular style icons
- `fa-brands` - Brand icons
- `fa-sharp fa-solid` - Sharp solid style

**Flaticon Usage** (când iconurile sunt disponibile):

- `flaticon-sports` - Sports activities
- `flaticon-friends` - Families/groups
- `flaticon-certificate` - Verification/certificates
- `flaticon-teacher` - Doctors/specialists
- `flaticon-reading` - Quiz/questions
- `flaticon-presentation` - Recommendations/results
- `flaticon-location-pin` - Location/distance

**Examples** (HomeTrustSignals component - Font Awesome):

- `fa-solid fa-certificate` - Verified clubs
- `fa-solid fa-shield-check` - GDPR compliance
- `fa-solid fa-user-doctor` - Verified doctors
- `fa-solid fa-lock` - Secure platform
- `fa-solid fa-heart` - Free for parents
- `fa-solid fa-robot` - AI recommendations

**Examples** (HomeStats component - Flaticon):

- `flaticon-friends` - Families
- `flaticon-certificate` - Verified clubs
- `flaticon-teacher` - Pediatric specialists
- `flaticon-sports` - Available sports

**Icon Sizes** (implicit):

- Standard: Font size based
- Custom SVG: Variable sizes

## Adaptări Necesare pentru Yuvoo

### 1. **Rebranding**

**Elemente de Schimbat**:

- [ ] Logo (actual: Kindedo → nou: Yuvoo)
- [ ] Nume brand în toate componentele
- [ ] Meta tags și metadata
- [ ] Favicon
- [ ] Color scheme (dacă e nevoie)

### 2. **Componente de Adaptat**

**Class → Club**:

- [ ] `Class/` → `Club/`
- [ ] `class-data.ts` → `club-data.ts`
- [ ] Adaptare pentru sporturi (nu clase)
- [ ] Adăugare badge "Verificat"
- [ ] Adăugare filtre (sport, vârstă, locație)

**Teacher → Doctor**:

- [ ] `Teacher/` → `Doctor/`
- [ ] `teacher-data.ts` → `doctor-data.ts`
- [ ] Adaptare pentru specialiști medicali
- [ ] Adăugare specializări medicale
- [ ] Adăugare disponibilitate

**Program → Sport**:

- [ ] `Program/` → `Sport/`
- [ ] `program-data.ts` → `sport-data.ts`
- [ ] Adaptare pentru recomandări sportive
- [ ] Integrare cu AI Coach Quiz

**News → Blog** (opțional):

- [ ] Poate fi folosit pentru blog/resurse
- [ ] Sau poate fi eliminat în Phase 1

**Shop** (Phase 1 - Eliminat):

- [ ] Shop, Cart, Checkout - NU sunt necesare în Phase 1
- [ ] Poate fi păstrat pentru Phase 2 (bookings cu plată)

### 3. **Componente Noi de Creat**

**AI Coach Quiz**:

- [ ] Componente noi pentru quiz flow
- [ ] Question components (age, energy, personality, etc.)
- [ ] Progress indicator
- [ ] Results display
- [ ] Sport recommendations cards

**Club Directory**:

- [ ] Club search/filter component
- [ ] Club map integration
- [ ] Club verification badge component

**Doctor Directory**:

- [ ] Doctor search/filter component
- [ ] Availability calendar
- [ ] Booking form

**Dashboard Parent**:

- [ ] Dashboard layout nou
- [ ] Child management components
- [ ] Quiz history
- [ ] Saved clubs/doctors

### 4. **Styling Architecture**

**Bootstrap 5.3.3 + SCSS**:

- [x] Toate componentele folosesc Bootstrap 5.3.3 ✅
- [x] Utilități custom Yuvoo via Bootstrap Utility API ✅
- [x] Componente wrapper Bootstrap pentru API consistent ✅
- [x] SCSS pentru stiluri custom și componente specifice ✅

**Strategie Implementată**:

1. Toate componentele folosesc Bootstrap 5.3.3 ✅
2. Utilități custom Yuvoo (bg-yuvoo-primary, text-yuvoo-primary, etc.) ✅
3. Componente wrapper Bootstrap (BootstrapButton, BootstrapInput, etc.) ✅

### 5. **Localizare Română**

**Toate Textele**:

- [ ] Traducere toate textele UI în română
- [ ] Actualizare menu-data.ts cu meniu român
- [ ] Actualizare toate componentele cu texte române
- [ ] Actualizare metadata și SEO

## Brand Identity Yuvoo

### Logo

**Status**: De creat
**Recomandare**: Logo modern, friendly, orientat către sport și copii

### Color Palette

**De Analizat**:

- Extrage culorile exacte din tema Kindedo
- Adaptează pentru brand Yuvoo
- Asigură contrast și accesibilitate

**Paleta Finală Yuvoo** (Confirmată):

- **Primary**: `#00BBAE` - Turcoaz (sport, energie) ✅
- **Secondary**: `#FF9B24` - Portocaliu (joc, fun) ✅
- **Accent**: `#7C81FF` - Violet (creativitate, inovație) ✅
- **Neutral**: `#1B1B1B` (text), `#424242` (body text), `#FFFFFF` (background), `#E6E6E6` (borders)

### Imagini

**Assets Existente**:

- ✅ Shape decorations (SVG, PNG)
- ✅ Background images
- ✅ Placeholder images pentru copii

**De Creat/Adaptat**:

- [ ] Imagini specifice sporturi
- [ ] Imagini cluburi sportive
- [ ] Imagini specialiști
- [ ] Ilustrații pentru AI Coach Quiz

### Tone of Voice

**Caracteristici**:

- Friendly și accesibil
- Profesional dar prietenos
- Clar și direct
- Încurajator și pozitiv
- Orientat către părinți (nu copii direct)

## Recomandări pentru Memory Bank

### Actualizări Necesare

1. **techContext.md**: ✅ **COMPLETAT**
   - [x] Adăugare Bootstrap 5.3.3 în tehnologii actuale
   - [x] Adăugare SCSS în tehnologii actuale
   - [x] Adăugare WOW.js, Animate.css
   - [x] Adăugare Font Awesome Pro, Flaticon
   - [x] Notă despre arhitectura Bootstrap 5.3.3 + SCSS ✅

2. **systemPatterns.md**: ✅ **COMPLETAT**
   - [x] Adăugare secțiune despre componente existente
   - [x] Adăugare pattern-uri de adaptare (Class→Club, Teacher→Doctor)
   - [x] Adăugare strategie Bootstrap 5.3.3 + SCSS ✅
   - [x] Adăugare structura componentelor reutilizabile

3. **activeContext.md**: ✅ **COMPLETAT**
   - [x] Actualizare cu tema Kindedo ca starting point
   - [x] Adăugare task-uri de adaptare componente
   - [x] Adăugare task-uri de rebranding
   - [x] Adăugare task-uri de localizare română

4. **progress.md**: ✅ **COMPLETAT**
   - [x] Adăugare secțiune "Componente Disponibile"
   - [x] Adăugare task-uri de adaptare componente
   - [x] Adăugare task-uri de rebranding
   - [x] Adăugare task-uri de migrare styling

### Fișier Nou: designSystem.md ✅

**Creat**: Acest fișier documentează:

- Analiza temei Kindedo
- Componente disponibile și adaptări necesare
- Design system și brand guidelines
- Recomandări pentru implementare

## Next Steps

### Prioritate Înaltă

1. **Analiza Culorilor**: ✅ **COMPLETAT**
   - [x] Extrage paleta exactă din SCSS files
   - [x] Documentează în designSystem.md
   - [x] Decide adaptări pentru brand Yuvoo
     - Primary: `#00BBAE` (turcoaz) ✅
     - Secondary: `#FF9B24` (portocaliu) ✅
     - Accent: `#7C81FF` (violet) ✅

2. **Rebranding Initial**:
   - [ ] Schimbă logo-ul
   - [ ] Actualizează metadata
   - [ ] Actualizează favicon

3. **Adaptare Componente Cheie**:
   - [ ] Class → Club (primul test)
   - [ ] Teacher → Doctor (al doilea test)
   - [ ] Program → Sport (al treilea test)

4. **Localizare Română**:
   - [ ] Traduce menu-data.ts
   - [ ] Traduce componente Header/Footer
   - [ ] Traduce componente Auth

### Prioritate Medie

5. **Styling Architecture** ✅ **COMPLETAT**:
   - [x] Setup Bootstrap 5.3.3 ✅
   - [x] Creează componente wrapper Bootstrap ✅
   - [x] Utilități custom Yuvoo via Bootstrap Utility API ✅

6. **Componente Noi**:
   - [ ] AI Coach Quiz components
   - [ ] Club directory components
   - [ ] Doctor directory components

## Note Importante

- **Nu șterge** componentele existente până nu sunt create alternative
- **Migrare graduală** - nu big bang
- **Păstrează** animațiile și efectele care funcționează bine
- **Testează** fiecare adaptare înainte de a continua
- **Documentează** toate schimbările în designSystem.md

## Resurse

- **Template Original**: Kindedo - Kindergarten & School Next.js Template
- **Documentație Bootstrap**: https://getbootstrap.com/docs/5.3/
- **Documentație SCSS**: https://sass-lang.com/documentation
- **WOW.js**: https://wowjs.uk/
- **Animate.css**: https://animate.style/

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

- **Fredoka** (Google Fonts) - Font friendly pentru copii, modern și jucăuș

**Planificat pentru Yuvoo**:

- **Tailwind CSS** - Trebuie migrat de la Bootstrap
- **shadcn/ui** - Component library modernă

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

**Font Principal**: Fredoka

- Weights: 400, 500, 600, 700
- Caracteristici: Friendly, modern, jucăuș
- Potrivit pentru: Headings, CTA-uri, elemente importante

**Font Secundar**: (de identificat - probabil sistem default sau alt Google Font)

**Hierarchy**:

- H1: Hero titles, main headings
- H2: Section titles
- H3: Card titles, subsections
- Body: Text normal
- Small: Meta information, captions

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

### Spacing System

**Bootstrap Spacing**:

- Utiliză sistemul Bootstrap spacing (p-_, m-_, pt-_, pb-_, etc.)
- Container: `.container` (Bootstrap default)

**Recomandare**: Documenta spacing-ul exact folosit pentru consistență.

### Animații

**Biblioteci**:

- **WOW.js** - Scroll animations
- **Animate.css** - Pre-built animations
- **AOS** (posibil) - Animate on scroll

**Pattern-uri**:

```tsx
className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s"
```

**Recomandare**: Menține animațiile subtile pentru UX profesional.

### Icons

**Biblioteci**:

- **Font Awesome Pro** - Iconuri generale
- **Flaticon Kindedo** - Iconuri custom pentru temă
- **SVG Components** - Iconuri custom React

**Pattern**: `<i className="flaticon-search"></i>`

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

### 4. **Migrare Styling**

**De la Bootstrap la Tailwind**:

- [ ] Analiză componentă cu componentă
- [ ] Creare Tailwind equivalents
- [ ] Păstrare animații și efecte
- [ ] Migrare graduală (nu big bang)

**Strategie Recomandată**:

1. Păstrează Bootstrap pentru componente existente
2. Folosește Tailwind pentru componente noi
3. Migrare graduală pe măsură ce componentele sunt adaptate

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
   - [x] Notă despre migrarea graduală la Tailwind

2. **systemPatterns.md**: ✅ **COMPLETAT**

   - [x] Adăugare secțiune despre componente existente
   - [x] Adăugare pattern-uri de adaptare (Class→Club, Teacher→Doctor)
   - [x] Adăugare strategie migrare Bootstrap→Tailwind
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

5. **Migrare Styling**:

   - [ ] Setup Tailwind CSS
   - [ ] Creează componente noi cu Tailwind
   - [ ] Planifică migrare graduală

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

# Yuvoo - Brand Guidelines

## Brand Essence

**Yuvoo** este ghidul digital pentru părinți în căutarea sportului, sănătății și bunăstării copiilor.

**Rolul nostru**: Să reducem stresul, să creștem încrederea și să oferim recomandări clare, personalizate, sigure.

**Esenta brandului**: _"Profesional, dar cald. Inteligent, dar uman."_

**Mix tonal**:

- 70% Modern, Expert, Clar
- 30% Warm, Empatic, Prietenos

---

## Visual Identity

### Color Palette

#### Primary Colors

**Primary Color**: `#00BBAE` - Turcoaz/Cyan ✅

- **Utilizare**: Buttons primary, links hover, accents principale, brand identity, logo
- **Asociere**: Sport, apă, energie, profesionalism, încredere
- **Variantă deschisă**: `#EBFFFE` (theme-7) - pentru backgrounds
- **CSS Variable**: `--bd-theme-1` sau `--yuvoo-primary`
- **Contrast**: Text alb pe fundal turcoaz - contrast bun ✅

**Secondary Color**: `#FF9B24` - Portocaliu ✅

- **Utilizare**: Buttons secondary, highlights, CTA-uri, badges importante, call-to-action
- **Asociere**: Joc, energie, entuziasm, fun, pozitivitate
- **Variante deschise**: `#FFECD6` (theme-8), `#FFF6EB` (theme-6) - pentru backgrounds
- **CSS Variable**: `--bd-theme-2` sau `--yuvoo-secondary`
- **Contrast**: Text alb pe fundal portocaliu - contrast bun ✅

**Accent Color**: `#7C81FF` - Violet/Albastru ✅

- **Utilizare**: Accents, badges secundare, highlights subtile, decorative elements, icons
- **Asociere**: Creativitate, inovație, modern, tehnologie
- **CSS Variable**: `--bd-theme-10` sau `--yuvoo-accent`

#### Background Colors

- `#EBFFFE` (theme-7) - Secțiuni sport, hero backgrounds, cyan deschis
- `#FFF6EB` (theme-6) - Secțiuni generale, cards, bej deschis
- `#FFFFFF` - Fundal principal, cards, white
- `#FFECD6` (theme-8) - Secțiuni speciale, highlights, portocaliu deschis

#### Neutral Colors

- **Text Primary**: `#1B1B1B` - Headings, text principal
- **Text Body**: `#424242` - Body text, paragraphs
- **Borders**: `#E6E6E6` - Borders, dividers
- **White**: `#FFFFFF` - Backgrounds, cards

#### Color Usage Guidelines

**✅ DO**:

- Use Primary (`#00BBAE`) for main actions, brand elements, important links
- Use Secondary (`#FF9B24`) for CTAs, highlights, important badges
- Use Accent (`#7C81FF`) for decorative elements, secondary badges
- Use light variants for backgrounds and sections
- Ensure sufficient contrast for accessibility (WCAG AA minimum)

**❌ DON'T**:

- Don't use more than 3 main colors in a single component
- Don't use dark text on light colored backgrounds without checking contrast
- Don't mix too many accent colors (stick to the 3 main colors)
- Don't use colors that aren't in the brand palette

#### Gradient Patterns

**Common Gradients**:

- `linear-gradient(90.87deg, #00BBAE 0.69%, rgba(0, 187, 174, 0) 96.75%)` - Turcoaz fade
- `linear-gradient(100.88deg, #EBFFFE 0.6%, #FFF6EB 100%)` - Cyan to Bej
- `linear-gradient(180deg, #FF577B00, #FF9B24 65%)` - Roz to Portocaliu

**Usage**: Hero sections, decorative backgrounds, section transitions

### Typography

#### Primary Font: Gabarito

**Family**: `'Gabarito', sans-serif`

**Characteristics**:

- Friendly, modern, jucăuș
- Perfect pentru copii și părinți
- Excellent readability
- Child-friendly appearance

**Weights Available**:

- 200 (Extra Light)
- 300 (Light)
- 400 (Regular/Normal) ✅ Most common
- 500 (Medium)
- 600 (Semi Bold) ✅ Common for headings
- 700 (Bold) ✅ Common for headings
- 800 (Extra Bold)
- 900 (Black)

#### Typography Scale

| Element  | Font Size | Font Weight | Line Height | Usage                      |
| -------- | --------- | ----------- | ----------- | -------------------------- |
| **H1**   | `96px`    | `700`       | `1.25`      | Hero titles, main headings |
| **H2**   | `64px`    | `600`       | `1.25`      | Section titles             |
| **H3**   | `32px`    | `600`       | `1.5`       | Card titles, subsections   |
| **H4**   | `23px`    | `600`       | `1.7`       | Subsection titles          |
| **H5**   | `16px`    | `600`       | `1.25`      | Small headings             |
| **H6**   | `16px`    | `600`       | `2`         | Smallest headings          |
| **Body** | `18px`    | `400`       | `30px`      | Body text, paragraphs      |

**CSS Variables**:

- `--bd-ff-body`: `'Gabarito', sans-serif`
- `--bd-fz-body`: `18px`
- `--bd-fz-h1`: `96px`
- `--bd-fz-h2`: `64px`
- `--bd-fz-h3`: `32px`
- `--bd-heading-primary`: `#1B1B1B`
- `--bd-text-body`: `#424242`

#### Typography Guidelines

**✅ DO**:

- Use Gabarito for all headings and body text
- Use appropriate font weights (400 for body, 600-700 for headings)
- Maintain consistent line heights for readability
- Use heading hierarchy (H1 → H2 → H3) properly

**❌ DON'T**:

- Don't mix multiple font families
- Don't use font sizes smaller than 16px for body text
- Don't use excessive font weights (avoid 800-900 except for special cases)
- Don't break heading hierarchy

### Spacing System

#### Bootstrap Spacing Scale

| Class        | Value     | Pixels | Usage           |
| ------------ | --------- | ------ | --------------- |
| `p-0`, `m-0` | `0`       | `0px`  | No spacing      |
| `p-1`, `m-1` | `0.25rem` | `4px`  | Minimal spacing |
| `p-2`, `m-2` | `0.5rem`  | `8px`  | Small spacing   |
| `p-3`, `m-3` | `1rem`    | `16px` | Default spacing |
| `p-4`, `m-4` | `1.5rem`  | `24px` | Medium spacing  |
| `p-5`, `m-5` | `3rem`    | `48px` | Large spacing   |

#### Common Spacing Values

**Section Padding**:

- `pt-110`, `pb-70` - Standard section padding (110px top, 70px bottom)
- `pt-120`, `pb-80` - Large section padding

**Element Margins**:

- `mb-20`, `mb-25`, `mb-30`, `mb-40`, `mb-50` - Bottom margins (20px, 25px, 30px, 40px, 50px)
- `mt-35`, `mt-4` - Top margins

**Container**:

- Max-width (≥1400px): `1320px`
- Responsive padding via Bootstrap

### Border Radius

**Most Common Values**:

| Value  | Pixels | Usage                             | CSS Class    |
| ------ | ------ | --------------------------------- | ------------ |
| `24px` | `24px` | **Most common** - Cards, sections | `.radius-24` |
| `16px` | `16px` | Cards, buttons                    | -            |
| `12px` | `12px` | Medium cards                      | -            |
| `50px` | `50px` | Buttons, pills                    | -            |
| `50%`  | -      | **Circles** - Avatars, icons      | -            |

**Guidelines**: Use `24px` for most cards and sections. Use `50%` for circular elements (avatars, icons).

### Shadows

**Box Shadows**:

| Shadow            | Value                                     | Usage          |
| ----------------- | ----------------------------------------- | -------------- |
| **Card Shadow**   | `0px 16px 32px 0px rgba(0, 0, 0, 0.06)`   | Cards, dropcap |
| **Menu Shadow**   | `0px 20px 30px rgba(3, 4, 28, 0.1)`       | Dropdown menus |
| **Modal Shadow**  | `0px 30px 70px 0px rgba(11, 6, 70, 0.08)` | Modal overlays |
| **Header Shadow** | `0 10px 30px rgba(0, 0, 0, 0.12)`         | Sticky header  |

**Drop Shadows** (for decorative elements):

- `filter: drop-shadow(5px 5px 0 var(--bd-theme-2))` - Portocaliu shadow
- `filter: drop-shadow(5px 5px 0 var(--bd-theme-1))` - Turcoaz shadow

### Icons

**Icon Libraries**:

- **Font Awesome Pro** - General icons
- **Flaticon Kindedo** - Custom theme icons
- **SVG Components** - Custom React icons

**Usage Pattern**: `<i className="flaticon-search"></i>`

---

## Tone of Voice

### Brand Voice Characteristics

**Primary Tone (70%)**: Warm & Supportive

- "Suntem alături de tine"
- "Găsim împreună sportul potrivit"
- "Fiecare copil are ritmul lui"
- Empathetic, understanding, helpful

**Secondary Tone (30%)**: Confident & Expert

- "Recomandări bazate pe specialiști"
- "Date sigure. Proces transparent."
- "Cluburi verificate manual de echipa noastră"
- Professional, trustworthy, reliable

### Writing Principles

#### 1. Claritate peste creativitate

- Scriem simplu, direct, fără jargon
- Propoziții clare și concise
- Verbe active
- Exemple simple și concrete

#### 2. Empatie reală

- Părinții au anxietăți - noi le reducem, nu le amplificăm
- Recunoaștem preocupările părinților
- Oferim soluții, nu presiune
- "Fiecare copil are ritmul lui"

#### 3. Microcopy prietenos

- Mesaje scurte, calde, de ghidare
- CTA-uri clare și accesibile
- Empty states încurajatoare
- Mesaje de încurajare în proces

#### 4. Trust Building

Fiecare secțiune trebuie să inspire siguranță:

- Verificare (cluburi verificate)
- Profesionalism (specialiști acreditați)
- Acuratețe (date sigure)
- Protecția datelor (GDPR compliant)

#### 5. Pozitivitate fără presiune

- Nu împingem părinții spre sportul "perfect"
- Ci spre sportul "potrivit"
- Fără presiune competitivă
- Respect pentru ritmul copilului

### Language Guidelines

#### ✅ DO Use

**Formule preferate**:

- "descoperă" în loc de "accesează"
- "potrivit pentru copilul tău" în loc de "ideal"
- "ghidat de AI" în loc de "AI-powered complicated language"
- "împreună" pentru a crea conexiune
- "sigur" și "verificat" pentru încredere

**Beneficiile sunt comunicate astfel**:

- **Practic**: "Doar 3–4 minute, 6 întrebări."
- **Emoțional**: "Îți oferim liniștea că ai ales bine."
- **Rational**: "Date verificate, specialiști acreditați."

**Verbs to Use**:

- Descoperă, explorează, găsește
- Află, înțelege, învață
- Salvează, gestionează, urmărește
- Verifică, confirmă, validează

#### ❌ DON'T Use

**Avoid**:

- Ton autoritar ("Trebuie să...")
- Ton prea copilăresc ("Super fun! Yay!")
- Presiune ("Maximizează performanța copilului!")
- Limbaj competitiv agresiv
- Jargon tehnic fără explicații
- Promisiuni exagerate
- Limbaj care creează anxietate

**Negative Phrases to Avoid**:

- "Nu rata șansa..."
- "Trebuie să..."
- "Maximizează..."
- "Competiție..."
- "Performanță maximă..."

### Microcopy Examples

#### CTA-uri (Call-to-Actions)

**Primary Actions**:

- "Începe Quiz-ul"
- "Vezi cluburile"
- "Află recomandările"
- "Descoperă sportul potrivit"

**Secondary Actions**:

- "Continuă"
- "Salvează rezultatul"
- "Adaugă copilul"
- "Gestionează profilul"

**Navigation**:

- "Înapoi"
- "Următorul"
- "Finalizează"
- "Salvează și continuă"

#### Mesaje de Încurajare

**During Process**:

- "Ești pe drumul cel bun!"
- "Aproape ai terminat!"
- "Alege varianta care se potrivește copilului tău."
- "Fiecare răspuns contează."

**Completion**:

- "Felicitări! Ai completat quiz-ul."
- "Rezultatele tale sunt gata!"
- "Descoperă recomandările personalizate."

#### Empty States

**No Results**:

- "Încă nu ai salvat cluburi. Hai să găsim unul împreună."
- "Nu ai completat quiz-ul. Poți începe în orice moment."
- "Nu există rezultate pentru filtrele alese. Încearcă să modifici criteriile."

**No Data**:

- "Adaugă primul copil pentru a începe."
- "Nu ai rezervări active momentan."
- "Nu ai favorite salvate încă."

#### Error Messages

**Format**: Friendly, helpful, in Romanian

- "Ceva nu a mers bine. Te rugăm să încerci din nou."
- "Datele introduse nu sunt valide. Verifică și încearcă din nou."
- "Sesiunea a expirat. Te rugăm să te autentifici din nou."

#### Success Messages

**Format**: Positive, clear, encouraging

- "Datele au fost salvate cu succes!"
- "Copilul a fost adăugat în profil."
- "Rezervarea a fost confirmată."

---

## UX Principles

### Core UX Principles

#### 1. Intuitive

- Clear, step-by-step process with minimal friction
- Obvious next steps
- Consistent navigation patterns
- Predictable interactions

#### 2. Trustworthy

- Verification badges visible
- Specialist credentials displayed
- Transparent information
- Clear data protection messaging

#### 3. Accessible

- Romanian language throughout
- Clear explanations
- Parent-friendly terminology
- No technical jargon without explanation
- WCAG AA compliance for colors and contrast

#### 4. Personalized

- Recommendations tailored to each child's unique profile
- Customized content based on user data
- Relevant suggestions
- Individual progress tracking

#### 5. Actionable

- Direct paths to contact clubs
- Easy booking flows
- Clear CTAs
- Obvious next steps

### User Experience Guidelines

#### Navigation

**✅ DO**:

- Use clear, descriptive labels in Romanian
- Maintain consistent navigation structure
- Provide breadcrumbs for deep navigation
- Use active states to show current location

**❌ DON'T**:

- Don't use ambiguous labels
- Don't hide important navigation
- Don't create deep navigation hierarchies (>3 levels)

#### Forms

**✅ DO**:

- Use clear labels in Romanian
- Provide helpful placeholder text
- Show validation errors immediately
- Use friendly error messages
- Provide progress indicators for multi-step forms

**❌ DON'T**:

- Don't use technical field names
- Don't show errors without explanation
- Don't use harsh error language
- Don't create overly long forms

#### Feedback & States

**✅ DO**:

- Show loading states clearly
- Provide success confirmations
- Use friendly error messages
- Give clear next steps after actions

**❌ DON'T**:

- Don't leave users without feedback
- Don't use technical error codes
- Don't create dead ends

---

## Do's & Don'ts

### Visual Design

#### ✅ DO

**Colors**:

- Use Primary (`#00BBAE`) for main actions and brand elements
- Use Secondary (`#FF9B24`) for CTAs and highlights
- Use Accent (`#7C81FF`) for decorative elements
- Ensure sufficient contrast (WCAG AA minimum)
- Use light color variants for backgrounds

**Typography**:

- Use Gabarito font consistently
- Follow the typography scale
- Maintain proper heading hierarchy
- Use appropriate font weights (400 for body, 600-700 for headings)

**Spacing**:

- Use Bootstrap spacing system consistently
- Maintain consistent padding for sections
- Use appropriate margins between elements
- Follow the 24px border radius standard for cards

**Components**:

- Use consistent card styles
- Apply standard shadows for depth
- Maintain consistent button styles
- Use standard form inputs

#### ❌ DON'T

**Colors**:

- Don't use more than 3 main colors in one component
- Don't use colors outside the brand palette
- Don't use dark text on light colored backgrounds without checking contrast
- Don't mix too many accent colors

**Typography**:

- Don't mix multiple font families
- Don't use font sizes smaller than 16px for body text
- Don't break heading hierarchy
- Don't use excessive font weights

**Spacing**:

- Don't use arbitrary spacing values
- Don't create inconsistent gaps
- Don't overcrowd elements
- Don't use excessive padding

**Components**:

- Don't create custom styles that break consistency
- Don't use non-standard shadows
- Don't mix different card styles
- Don't create buttons that don't match the design system

### Content & Copywriting

#### ✅ DO

**Tone**:

- Write in warm, supportive tone (70%)
- Include expert, confident elements (30%)
- Use clear, simple language
- Show empathy for parents' concerns
- Build trust through transparency

**Language**:

- Use Romanian for all user-facing content
- Use active verbs
- Write concise, clear sentences
- Provide helpful explanations
- Use friendly, conversational tone

**Messaging**:

- Focus on "potrivit" (suitable) not "perfect"
- Emphasize safety and verification
- Highlight expert recommendations
- Show understanding of parent concerns
- Provide clear next steps

#### ❌ DON'T

**Tone**:

- Don't use authoritarian language
- Don't use overly childish tone
- Don't create pressure or urgency
- Don't use competitive language
- Don't create anxiety

**Language**:

- Don't use technical jargon without explanation
- Don't use English for user-facing content
- Don't write overly long sentences
- Don't use passive voice excessively
- Don't use vague language

**Messaging**:

- Don't promise perfection
- Don't create false urgency
- Don't use fear-based messaging
- Don't make exaggerated claims
- Don't ignore parent concerns

### User Experience

#### ✅ DO

**Navigation**:

- Provide clear navigation paths
- Use descriptive labels
- Show current location
- Offer easy way back

**Forms**:

- Use clear labels
- Provide helpful placeholders
- Show validation immediately
- Give friendly error messages

**Feedback**:

- Show loading states
- Confirm successful actions
- Provide helpful error messages
- Guide users to next steps

#### ❌ DON'T

**Navigation**:

- Don't create confusing navigation
- Don't hide important features
- Don't create dead ends
- Don't use ambiguous labels

**Forms**:

- Don't use technical field names
- Don't show errors without help
- Don't create overly long forms
- Don't leave users without feedback

**Feedback**:

- Don't leave users waiting without indication
- Don't use technical error codes
- Don't create dead ends
- Don't hide important information

---

## Brand Messages

### Core Messages

**For Parents**:

- "Descoperi ce sport i se potrivește copilului tău."
- "Siguranță, transparență și recomandări personalizate."
- "Decizii informate, fără stres."
- "Fiecare copil are ritmul lui."

**For Sports Clubs**:

- "Mai multă vizibilitate. Părinți potriviți, informați, interesați."
- "Prezentare profesională și credibilă."
- "Badge de verificare pentru încredere."

**For Pediatric Specialists**:

- "Ajutăm familiile să ajungă la specialiști de încredere."
- "Promovarea expertizei tale într-un context sigur și credibil."
- "Referrals calificate din AI Coach."

### Trust Messages

**Key Trust Elements**:

- "Cluburi verificate manual"
- "Specialiști acreditați"
- "Algoritm validat alături de experți"
- "Date protejate și GDPR compliant"
- "Transparență totală – fără ascunzișuri"

**Usage**: Include trust messages in:

- Landing page
- About page
- Club/doctor detail pages
- Quiz results
- Email communications

### Messages About Children

**Key Themes**:

- Ritm propriu (unique pace)
- Creștere personală (personal growth)
- Explorare (exploration)
- Sănătate (health)
- Siguranță (safety)

**Examples**:

- "Fiecare copil are un ritm unic."
- "Descoperim împreună ce i se potrivește."
- "Susținem un parcurs sănătos și echilibrat."
- "Explorăm opțiunile potrivite pentru copilul tău."

---

## Content Pillars

### 1. Educație Parenting & Sport

- Ghiduri pentru alegerea sportului
- Sfaturi pentru prevenirea accidentărilor
- Dezvoltare emoțională prin sport
- Beneficii ale sportului pentru copii

### 2. Încredere & Siguranță

- Explicarea procesului de verificare
- Prezentarea specialiștilor
- Confidențialitate și protecția copilului
- Transparență în procese

### 3. Inspirație & Povești

- Success stories
- Testimoniale reale
- "De ce părinții aleg Yuvoo"
- Povești despre copii și sport

### 4. Funcționalități Platformă

- Quiz AI Coach
- Căutare cluburi
- Profil copil
- Recomandări personalizate

---

## Logo & Branding

### Logo Requirements

**Status**: To be created

**Recommendations**:

- Modern, friendly design
- Oriented towards sports and children
- Use brand colors (Primary: #00BBAE, Secondary: #FF9B24, Accent: #7C81FF)
- Gabarito font for text
- Scalable (SVG format preferred)

**Logo Files Needed**:

- `logo.svg` - Default logo (for light backgrounds)
- `logo-white.svg` - White logo (for dark backgrounds)
- `favicon.ico` - Favicon (16x16, 32x32, 48x48)
- `favicon.png` - Favicon PNG versions

**File Locations**:

- `public/assets/img/logo/logo.svg`
- `public/assets/img/logo/logo-white.svg`
- `src/app/favicon.ico`

### Branding Elements

**Consistent Usage**:

- Logo appears in header and footer
- Brand colors used consistently
- Typography follows brand guidelines
- Spacing and layout maintain brand consistency

---

## Implementation Checklist

### Visual Identity

- [x] Color palette defined ✅
- [x] Typography system established ✅
- [x] Spacing system documented ✅
- [x] Border radius standards set ✅
- [x] Shadow system defined ✅
- [ ] Logo created (pending design)
- [ ] Favicon created (pending design)

### Content & Copywriting

- [x] Tone of voice defined ✅
- [x] Writing principles established ✅
- [x] Microcopy guidelines created ✅
- [x] Brand messages documented ✅
- [ ] All UI text translated to Romanian (in progress)
- [ ] All error messages in Romanian (in progress)

### UX Principles

- [x] Core UX principles defined ✅
- [x] Navigation guidelines established ✅
- [x] Form guidelines created ✅
- [x] Feedback patterns documented ✅
- [ ] User testing completed (planned)

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
/* Common Section Padding */
.pt-110 {
  padding-top: 110px;
}
.pb-70 {
  padding-bottom: 70px;
}

/* Common Margins */
.mb-30 {
  margin-bottom: 30px;
}
.mb-40 {
  margin-bottom: 40px;
}
```

---

## References

- **Design System**: `memory-bank/designSystem.md` - Complete design system documentation
- **Design Tokens**: `docs/DESIGN_TOKENS.md` - Design tokens reference
- **Copywriting Guide**: `docs/COPYWRITING_GUIDE.md` - Detailed copywriting guidelines
- **Architecture**: `docs/ARCHITECTURE_OVERVIEW.md` - Technical architecture
- **Code Generation**: `docs/ PROMPTING_RULES_FOR_CODEGEN.md` - Code generation rules

---

## Summary

Yuvoo brand guidelines ensure:

- ✅ **Consistent Visual Identity**: Colors, typography, spacing, and components
- ✅ **Clear Tone of Voice**: Warm & supportive (70%) + Expert & confident (30%)
- ✅ **User-Centered UX**: Intuitive, trustworthy, accessible, personalized, actionable
- ✅ **Romanian Language**: All user-facing content in Romanian
- ✅ **Trust Building**: Verification, transparency, professionalism
- ✅ **Child-Focused**: Respect for each child's unique pace and needs

Follow these guidelines to maintain brand consistency across all touchpoints and ensure a cohesive user experience.

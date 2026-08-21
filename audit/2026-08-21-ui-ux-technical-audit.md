# Audit UI/UX & Tehnic — Yuvoo

## 1. Meta

- **Data**: 2026-08-21
- **Metodă**: static
- **Pagini inventariate**: 89 (din ~89)
- **Cluster-uri acoperite**: marketing-public, discovery, quiz-funnel, clubs-acquisition, doctors-acquisition, auth, onboarding, parent-portal, club-portal, doctor-portal, guest-payments, legal-admin
- **Skill-uri aplicate**: web-design-guidelines, design-taste-frontend, high-end-visual-design, gpt-taste, emil-design-eng, find-animation-opportunities, vercel-react-best-practices, vercel-composition-patterns, a11y-debugging, cro, copywriting, copy-editing, signup, onboarding, paywalls
- **Scor global**: 56/100 (media ponderată 2,80/5; cluster-uri P0 cu weight 2×)
- **Sinteza subagenți**: toate cele 12 cluster-uri auditate via subagenți paraleli; referințe: [marketing-public](915c7585-926a-47f7-86cf-e7225292bbcb), [discovery](b28db194-d17f-4ac9-bbd5-e71a986a5b61), [quiz-funnel](5af2bdef-235a-4cc8-a76d-8d8dbf48a517), [clubs-acquisition](5ee87db7-f0c9-469f-bfca-df87f0e7fe27), [doctors-acquisition](4c295429-62e7-4a3c-bb52-c8886c680e5e), [auth](a6388c96-26e8-4e45-b925-247b771247ad), [onboarding](94ee7c0c-ea72-4f34-ae3d-3c4ffcb05449), [parent-portal](233671a8-20e6-415a-840f-73ba7696c0c1), [club-portal](c3b35b0a-ae6d-4289-9334-29d7778fd79d), [doctor-portal](a33c864f-30ad-4cb3-9477-70b5cd138643), [guest-payments](6695815d-cf4d-4941-ba61-f58353629aba), [legal-admin](be39a7c5-9cfe-4f73-9776-755b06b42720)

## 2. Rezumat executiv

Auditul complet (12 subagenți, static-only) relevă **cinci zone critice**: **(1) monetizare quiz compromisă** — `/chestionar/rezultate/[id]` expune raportul fără plată; email gate ocolibil; CTA success plății spre intro greșit; **(2) auth broken paths** — `proxy.ts` redirecționează la `/auth/login` (404) vs `/login`; rol signup (Părinte/Club/Doctor) nu e persistat; **(3) funnel cluburi** — Premium → 404, mailto vs modal, prețuri 99/99,99; **(4) discovery & parent** — `/cautare` fără input, `/parent/children/add` → 404; **(5) a11y transversal** — H1 duplicate, formulare placeholder-only. Puncte forte: copy legal RO, ghiduri SEO, progres onboarding. Prioritate: **securizare quiz + auth routes**, **404-uri conversie**, **GDPR guest lead**.

## 3. Scoruri pe cluster

| Cluster             | Ierarhie | Design system | UX  | A11y | Perf UI | Copy RO | Conversie | Medie |
| ------------------- | -------- | ------------- | --- | ---- | ------- | ------- | --------- | ----- |
| marketing-public    | 3.0      | 3.0           | 3.0 | 2.0  | 3.0     | 3.0     | 4.0       | 3.0   |
| discovery           | 3.0      | 2.0           | 2.0 | 2.0  | 2.0     | 3.0     | 2.0       | 2.1   |
| quiz-funnel         | 3.0      | 3.0           | 2.0 | 3.0  | 4.0     | 3.0     | 2.0       | 2.9   |
| clubs-acquisition   | 3.0      | 2.0           | 2.0 | 2.0  | 3.0     | 2.0     | 1.0       | 2.1   |
| doctors-acquisition | 3.0      | 2.0           | 3.0 | 2.0  | 3.0     | 3.0     | 3.0       | 2.7   |
| auth                | 3.0      | 3.0           | 2.0 | 2.0  | 4.0     | 3.0     | 2.0       | 2.7   |
| onboarding          | 3.0      | 3.0           | 3.0 | 3.0  | 4.0     | 4.0     | 3.0       | 3.3   |
| parent-portal       | 3.0      | 3.0           | 2.0 | 3.0  | 3.0     | 4.0     | —         | 3.0   |
| club-portal         | 3.0      | 3.0           | 2.0 | 3.0  | 3.0     | 3.0     | 3.0       | 2.9   |
| doctor-portal       | 3.0      | 3.0           | 2.0 | 2.0  | 3.0     | 3.0     | —         | 2.7   |
| guest-payments      | 3.0      | 3.0           | 2.0 | 3.0  | 4.0     | 2.0     | 2.0       | 2.7   |
| legal-admin         | 3.0      | 3.0           | 3.0 | 2.0  | 4.0     | 5.0     | —         | 3.3   |

## 4. Findings transversale

### 4.1 Design system & Kindedo drift

- **Kindedo legacy**: componente Class/Teacher/HeroArea cu href-uri `/classes`, `/teachers`, `/programs`; clase `bd-teacher-*` pe doctori (`DoctorsMain.tsx:22`, `DoctorCard.tsx:49`).
- **Token drift**: landing cluburi/doctori cu sute de inline hex; `EmailPreferencesForm.tsx:102`, `dezabonare/page.tsx:79-115`.
- **BreadcrumbOne**: `href="/"` hardcodat (`BreadcrumbOne.tsx:60`), alt „img not found” (`:43`); fix unic propagă pe marketing, discovery, legal.
- **Funnel cluburi**: mailto vs `ClubsContactModal` mort; PostHog distorsionat (`clubs-landing-modal.ts:48-52`).
- **Flux guest lead depreciat**: URL „plată” vs contact gratuit (`plata-guest/page.tsx:4-6`).

### 4.2 Navigare & rute

- **Rute fără page.tsx**: `/parteneri`, `/preturi-cluburi`, `/pentru-cluburi/abonare-premium`, `/parent/children/add` (linkuit din dashboard → **404**), auth flows lipsă.
- **Duplicate IA parent**: `/parent/favorites` vs `/parent/saved` — același conținut (`favorites/page.tsx:20`).
- **Auth route mismatch P0**: `proxy.ts` + onboarding layouts → `/auth/login` dar paginile sunt la `/login` (`proxy.ts:33`, `routes.ts:84`).
- **Signup role nepersistat**: selector Părinte/Club/Doctor nu ajunge la DB (`SignUpMain.tsx:166-214`, `auth.ts:273`).
- **PRE_LAUNCH_RESTRICTIONS_ENABLED**: layout auth poate înlocui clusterul cu PreLaunchPage — blocant conversie în pre-launch.
- **Doctor portal IA**: Disponibilitate în `routes` dar absent din nav lateral (`dashboard-navigation.ts:40-45`); layout mixt DashboardHeader vs DashboardPageLayout.

### 4.3 Accesibilitate

- **H1 duplicate**: marketing (FAQ, Ajutor), legal (4 pagini), discovery (`/cautare`), pattern `BreadcrumbOne` + body h1 — remediere: `titleAs="p"`.
- **Formulare placeholder-only**: contact, login, doctors modal, unsubscribe (`DoctorsContactModal.tsx:205`, `UnsubscribeForm.tsx:28`).
- **Contrast legal**: „Ultima actualizare” cu opacity 0.7 (`_legal.scss:43-47`) — sub WCAG AA.
- **Modale custom fără focus trap**: privacy delete account (`PrivacySettingsClient.tsx:316`).

### 4.4 Performanță UI

- **N+1 client fetch**: favorites, club bookings, search, **consultații doctor** (`DoctorConsultationList.tsx:65-76`, `SearchResults.tsx:55-84`).
- **`confirm()`/`alert()` native**: club bookings + doctor consultations — inconsistent cu design system.
- **`/cautare` client-only**; LCP hero fără `priority`; WOW.js pe landing cluburi (20+ secțiuni).
- **QuizContainer** bundle mare; `DoctorsLandingCollaboration` client fără hooks.

### 4.5 Copy & ton (RO)

- **Legal pages**: copy RO excelent (5/5).
- **Inconsistențe**: 6 vs 7 întrebări quiz; preț 9,99 hardcodat vs constantă; FAQ doctori „marketplace” vs hero „nu suntem marketplace” (`doctors-faq-data.tsx:16` vs `DoctorsLandingHero.tsx:107`).
- **EN rămas**: case studies, onboarding quiz-intro „dashboard”, modal Close.

### 4.6 Oportunități motion (max 5–7)

1. **Butoane `:active` scale(0.97)** — `.bd-btn` / `btn-yuvoo-primary` (_Feedback_, ocazional).
2. **Quiz progress** — `prefers-reduced-motion` fallback (`QuizProgress.tsx:49`).
3. **Onboarding step completion** — checkmark pe `OnboardingProgress` (_Delight_, first-time).
4. **Guest lead success card** — fade-in la afișare contact (_Preventing jarring change_).
5. **Premium plan selector** — border/shadow la selectare (_State indication_).
6. **Consent toggle privacy** — feedback vizual grant/withdraw (_State indication_).
7. **Payment success polling → redirect** — micro-feedback când token raport devine disponibil.

## 5. Findings pe cluster

### Cluster: marketing-public

| Severity | Pagină                            | Finding                                        | Evidență                                                 | Recomandare                          | Efort |
| -------- | --------------------------------- | ---------------------------------------------- | -------------------------------------------------------- | ------------------------------------ | ----- |
| P1       | `/intrebari-frecvente`, `/ajutor` | H1 duplicat (BreadcrumbOne + body)             | `intrebari-frecvente/page.tsx:70`, `ajutor/page.tsx:179` | `titleAs="p"` pe BreadcrumbOne       | S     |
| P1       | `/contact`                        | Formular fără `<label>` vizibil                | `ContactForm.tsx:72`                                     | Labels `htmlFor` pe toate câmpurile  | S     |
| P1       | `/despre-noi` (+ cluster)         | BreadcrumbOne `href="/"` hardcodat             | `BreadcrumbOne.tsx:60`                                   | `routes.home`                        | S     |
| P1       | `/`                               | LCP hero fără `priority`; hex inline subtitlu  | `HeroYuvoo.tsx:101`, `:60`                               | `priority` + token class             | S     |
| P1       | `/`                               | `HomePromotionArea` client + import mort       | `HomePromotionArea.tsx:1`                                | Server Component sau island minim    | M     |
| P1       | `/`                               | Copy EN: „Quiz-ul”, social labels              | `HeroYuvoo.tsx:73`                                       | „Chestionarul”, etichete RO          | M     |
| P2       | `/`                               | Trust tag comentat; FeaturedSports clubCount=0 | `HeroYuvoo.tsx:81`, `FeaturedSports.tsx:33`              | Reactivează social proof sau elimină | S–M   |
| P2       | `/ajutor`                         | Bullet-uri help fără link acțiune              | `ajutor/page.tsx:96`                                     | Link FAQ/ghiduri                     | M     |

### Cluster: discovery

| Severity | Pagină                        | Finding                                                          | Evidență                                  | Recomandare                                          | Efort |
| -------- | ----------------------------- | ---------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------- | ----- |
| P0       | `/doctori`                    | Picsum placeholders în seed; `isPlaceholderUrl` nu le recunoaște | `doctors.ts:63-65`, `image-helpers.ts:11` | Placeholder local + extinde helper                   | S     |
| P1       | `/cautare`                    | H1 duplicat + **fără câmp de căutare** în UI                     | `cautare/page.tsx:19-34`                  | Un H1; input + router.push `?q=`                     | M     |
| P1       | `/cautare`                    | Link „Vezi cluburi” cu `?search=` — `/cluburi` nu procesează     | `SearchResults.tsx:207-208`               | Implementează filtru text sau redirect `/cautare?q=` | M     |
| P1       | `/cautare`                    | Fetch 50+50 entities, filtrare client-side                       | `SearchResults.tsx:55-84`                 | Căutare server-side cu paginare                      | L     |
| P1       | `/cluburi/locatie/[location]` | Filtre redirecționează la `/cluburi`, pierde context SEO locație | `ClubSearchFilters.tsx:94-96`             | Păstrează ruta locație în URL filtre                 | M     |
| P1       | `/cluburi`, `/doctori`        | Filtre toate vizibile pe mobil, fără drawer                      | `ClubSearchFilters.tsx:163-366`           | Offcanvas „Filtre” pe xs/sm                          | M     |
| P1       | `/doctori`                    | Fără paginare (spre deosebire de cluburi)                        | `DoctorsMain.tsx:50-69`                   | Paginare URL-driven ca ClubsMain                     | M     |
| P2       | `/doctori`                    | Drift `bd-teacher-*` pe carduri doctor                           | `DoctorCard.tsx:49-77`                    | Migrează la `bd-doctor-*`                            | L     |
| P2       | `/cluburi`                    | Filtre sort/verified comentate deși backend le suportă           | `ClubSearchFilters.tsx:285-365`           | Reactivează „Doar verificate”                        | S     |
| P2       | `/sporturi`                   | Filtre categorii fără `aria-pressed`                             | `SportsMain.tsx:85-108`                   | `aria-pressed` + label grup                          | S     |

**Note pozitive**: ghiduri curate (SSG, YMYL disclaimer); SEO metadata solidă pe listări.

### Cluster: quiz-funnel

| Severity | Pagină                                 | Finding                                                    | Evidență                                    | Recomandare                                             | Efort |
| -------- | -------------------------------------- | ---------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------- | ----- |
| P0       | `/chestionar/rezultate/[id]`           | Rezultate complete accesibile direct fără plată/email gate | `rezultate/[id]/page.tsx:154-174`           | Redirect la teaser/paywall sau restricționează conținut | M     |
| P0       | `/chestionar/payment/success/[quizId]` | CTA „Accesează Raportul” → intro, nu raport                | `payment/success/[quizId]/page.tsx:176-183` | `routes.quiz.report(token)` când disponibil             | S     |
| P1       | `/chestionar/teaser`, `/paywall`       | Email gate ocolibil prin URL direct                        | `teaser/[quizId]/page.tsx:117-127`          | Verifică email pe quiz; redirect la emailGate           | M     |
| P1       | `/chestionar/paywall/[quizId]`         | Plătit deja → nu redirect la raport (TODO neimplementat)   | `paywall/[quizId]/page.tsx:135-158`         | Redirect la report cu accessToken                       | S     |
| P1       | `/chestionar/raport/[accessToken]`     | Lipsește AITransparencyDisclaimer vs rezultate             | `ReportContent.tsx:56-117`                  | Adaugă disclaimer medical/AI                            | S     |
| P1       | `/chestionar`                          | Copy „6 întrebări” vs 7 pași reali                         | `QuizIntroContent.tsx:27-28`                | Unifică la 7 + timp estimat                             | S     |
| P1       | `/chestionar/paywall`                  | Preț hardcodat „9,99” în PaymentForm vs constantă          | `PaymentForm.tsx:312`                       | Import `PAYMENT_AMOUNT_LEI`                             | S     |
| P1       | `/chestionar/teaser`                   | Două CTA primary concurente (raport vs cluburi)            | `teaser/[quizId]/page.tsx:223-239`          | Un primary; cluburi secondary                           | S     |
| P1       | `/chestionar/container`                | Consimțământ link la settings parent pentru guest          | `QuizConsentSection.tsx:371-373`            | Link GDPR/privacy pentru neautentificați                | S     |
| P1       | `/chestionar/container`                | Loading overlay „GPT-4 Turbo” / „6 factori” incorect       | `QuizLoadingOverlay.tsx:24-56`              | Aliniază la model real + 7 factori                      | S     |
| P2       | `/chestionar/container`                | Abandon recovery: localStorage fără banner „Continuă”      | `QuizContext.tsx:54-70`                     | Banner la intro cu CTA container                        | M     |
| P2       | `/chestionar/email`                    | Mesaj contradictori instant vs verificare email            | `EmailCollectionForm.tsx:107-113`           | Unifică promisiunea next step                           | S     |

### Cluster: clubs-acquisition

| Severity | Pagină                            | Finding                                      | Evidență                                               | Recomandare                        | Efort |
| -------- | --------------------------------- | -------------------------------------------- | ------------------------------------------------------ | ---------------------------------- | ----- |
| P0       | `/pentru-cluburi/abonare-premium` | CTAs Premium → 404                           | `routes.ts:41`                                         | Pagină sau redirect valid          | M     |
| P0       | `/preturi-cluburi`                | Rută TODO inexistentă                        | `routes.ts:43`                                         | Implementează sau elimină          | S     |
| P1       | `/pentru-cluburi`                 | CTA mailto ≠ copy „Rezervă call”; modal mort | `ClubsLandingHero.tsx:92`, `page.tsx:129`              | Un pattern conversie               | M     |
| P1       | `/pentru-cluburi`                 | PostHog FORM_SUBMITTED la mailto             | `clubs-landing-modal.ts:48-52`                         | Eveniment `CLUBS_MAILTO_CLICKED`   | S     |
| P1       | `/povesti-de-succes`              | Case studies goale — social proof lipsă      | `CaseStudiesList.tsx:16-37`                            | Ascunde nav sau conținut interimar | M     |
| P1       | `/pentru-cluburi/ajutor`          | Categorii promise dar comentate              | `ajutor/page.tsx:7`                                    | Reactivează HelpCenterCategories   | S     |
| P1       | `/pentru-cluburi`                 | Token drift 200+ inline hex                  | `ClubsLandingPricing.tsx:69`                           | SCSS + variabile token             | L     |
| P2       | `/pentru-cluburi`                 | Preț 99 vs 99,99; ROI 99 lei                 | `ClubsLandingFinalCTA.tsx:134`, `ROICalculator.tsx:28` | Unifică prețuri                    | S     |

### Cluster: doctors-acquisition

| Severity | Pagină            | Finding                                             | Evidență                                                  | Recomandare                     | Efort |
| -------- | ----------------- | --------------------------------------------------- | --------------------------------------------------------- | ------------------------------- | ----- |
| P1       | `/pentru-doctori` | FAQ „marketplace comercial” vs hero non-marketplace | `doctors-faq-data.tsx:16` vs `DoctorsLandingHero.tsx:107` | Rescrie FAQ aliniat etic        | S     |
| P1       | `/pentru-doctori` | Modal contact fără labels                           | `DoctorsContactModal.tsx:205-290`                         | `<label htmlFor>` pe inputs     | S     |
| P1       | `/pentru-doctori` | Pas 1 colaborare fără link înregistrare             | `DoctorsLandingCollaboration.tsx:15-18`                   | Link onboarding/register doctor | M     |
| P1       | `/pentru-doctori` | Trust signals după CTA final                        | `pentru-doctori/page.tsx:114-117`                         | Mută trust înainte de FinalCTA  | S     |
| P1       | `/pentru-doctori` | CTA hero `href="#"` — a11y/UX                       | `DoctorsLandingHero.tsx:158-169`                          | `<button>` sau href real        | S     |
| P1       | `/pentru-doctori` | Imagine problem ascunsă pe mobil                    | `DoctorsLandingProblem.tsx:24`                            | Variantă responsive             | M     |
| P1       | `/pentru-doctori` | CTA final „Aplică” vag vs hero                      | `DoctorsLandingFinalCTA.tsx:48` vs `:141`                 | Unifică copy CTA                | S     |
| P2       | `/pentru-doctori` | EN: „Verified Pediatric Expert”, „Lead selling”     | `DoctorsLandingCollaboration.tsx:35`                      | Traduce RO                      | S     |

### Cluster: auth

| Severity | Pagină                | Finding                                                                  | Evidență                                              | Recomandare                                      | Efort |
| -------- | --------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------ | ----- |
| P0       | `/login`              | `proxy.ts`/onboarding → `/auth/login` dar pagina e la `/login` — **404** | `proxy.ts:33`, `routes.ts:84`, `parent/layout.tsx:18` | Unifică toate redirect-urile la `routes.login`   | M     |
| P0       | `/register`           | Rol selectat (Părinte/Club/Doctor) **nu e persistat** la signup          | `SignUpMain.tsx:166-214`, `auth.ts:273-276`           | Transmite rol la Stack Auth sau elimină selector | M     |
| P1       | `/login`              | Fără labels; fără `autoComplete="email"`; toggle parolă `<span>`         | `SignInForm.tsx:107-153`                              | Labels + autocomplete + `<button>`               | S     |
| P1       | `/login`              | „Ține-mă minte” afișat fără logică                                       | `SignInForm.tsx:160-162`                              | Implementează sau elimină                        | M     |
| P1       | `/login`              | Erori fără `role="alert"`; statusText EN posibil                         | `ErrorMassage.tsx:7`, `SignInForm.tsx:86`             | `aria-live` + mesaje RO fixe                     | S     |
| P1       | `/login`              | Utilizator autentificat poate accesa login (spre deosebire de register)  | `login/page.tsx:52-79`                                | `getSession()` + redirect                        | S     |
| P1       | `/email-confirmation` | Mesaje Stack Auth brute posibil EN                                       | `auth.ts:561-586`                                     | Mapare via `getErrorMessage`                     | S     |
| P2       | `/register`           | Prag parolă 6 vs 8 caractere inconsistent                                | `SignUpMain.tsx:103`, `errors.ts:12`                  | Aliniază la 8                                    | S     |
| P2       | `/register`           | `ReturningLoginForm` EN Kindedo drift                                    | `ReturningLoginForm.tsx:12-40`                        | Deprecate                                        | S     |
| P2       | `/login`              | Breadcrumb title = subTitle identic pe toate paginile auth               | `login/page.tsx:77`, `register/page.tsx:61`           | Elimină subTitle duplicat                        | S     |
| P2       | `/login`              | Link „ai uitat parola?” — literă mică                                    | `SignInForm.tsx:165-167`                              | „Ai uitat parola?”                               | S     |
| P2       | `/email-confirmation` | Clase buton inconsistente (btn-primary vs btn-yuvoo-primary)             | `EmailConfirmationForm.tsx:23-100`                    | Standardizează tokeni Yuvoo                      | S     |

### Cluster: onboarding

| Severity | Pagină                          | Finding                                        | Evidență                       | Recomandare                            | Efort |
| -------- | ------------------------------- | ---------------------------------------------- | ------------------------------ | -------------------------------------- | ----- |
| P1       | `/onboarding/parent/quiz-intro` | Fără navigare înapoi la tour                   | `quiz-intro/page.tsx:136-167`  | `OnboardingNavigation` cu backHref     | S     |
| P1       | `/onboarding/parent/complete`   | Redirect imediat fără UI celebrare             | `complete/page.tsx:17-19`      | Ecran succes ca club/doctor            | M     |
| P1       | `/onboarding/parent/add-child`  | Restore localStorage silențios                 | `AddChildForm.tsx:44-57`       | InfoBox „Am recuperat datele”          | M     |
| P1       | `/onboarding/*`                 | Logo exit fără confirmare părăsire             | `OnboardingLayout.tsx:47-100`  | `showExitButton` sau intercept logo    | S     |
| P1       | `/onboarding/doctor/*`          | Stepper 8 pași aglomerat pe tabletă            | `_onboarding.scss:90-97`       | Variantă compactă md                   | M     |
| P1       | `/onboarding/club/complete`     | Success UI chiar dacă server fail              | `club/complete/page.tsx:38-44` | ServerErrorAlert înainte de felicitare | S     |
| P1       | `/onboarding/parent/*`          | Inline styles vs `bd-onboarding-*` club/doctor | `parent/welcome/page.tsx:34`   | Uniformizează clase                    | M     |
| P2       | `/onboarding/*`                 | PARENT/CLUB/DOCTOR_STEPS duplicate ×20         | `parent/welcome/page.tsx:17`   | `onboarding-steps.ts` centralizat      | S     |
| P2       | `/onboarding/parent/quiz-intro` | Copy EN „dashboard”, „AI Coach Quiz”           | `quiz-intro/page.tsx:75`       | COPY_LIBRARY RO                        | S     |

### Cluster: parent-portal

| Severity | Pagină                           | Finding                                                 | Evidență                        | Recomandare                                            | Efort |
| -------- | -------------------------------- | ------------------------------------------------------- | ------------------------------- | ------------------------------------------------------ | ----- |
| P0       | `/parent/dashboard`              | CTA „Adaugă copil” → `/parent/children/add` **404**     | `ParentDashboardContent.tsx:89` | `routes.onboarding.parent.addChild` sau creează pagină | S     |
| P1       | `/parent/*`                      | `pt-120` Kindedo + padding shell = spațiu excesiv mobil | `dashboard/page.tsx:66`         | Elimină pt-120; folosește shell spacing                | M     |
| P1       | `/parent/settings/privacy`       | Consimțământuri required retragibile fără guard         | `PrivacySettingsClient.tsx:460` | Blochează toggle required                              | M     |
| P1       | `/parent/settings`               | Hub lipsă — fără link privacy/email prefs               | `settings/page.tsx:46`          | Carduri către sub-setări                               | M     |
| P1       | `/parent/favorites`              | Duplicate `/favorites` vs `/saved`                      | `favorites/page.tsx:20`         | Canonicalizează + redirect 301                         | S     |
| P1       | `/parent/profile` vs `/settings` | Același `SettingsForm` — IA confuză                     | `profile/page.tsx:79`           | Unifică sau diferențiază clar                          | M     |
| P1       | `/parent/children/[id]`          | Rezervări ascunse când goale (fără empty state)         | `ChildDetailsMain.tsx:198`      | Empty state + CTA cluburi/doctori                      | S     |
| P1       | `/parent/dashboard`              | Quiz section ascunsă când zero quiz-uri                 | `dashboard/page.tsx:84`         | Empty state + link chestionar                          | S     |
| P2       | `/parent/*`                      | Logo sidebar → homepage public, nu dashboard            | `DashboardSidebar.tsx:118`      | Logo → `routes.parent.dashboard`                       | S     |
| P2       | `/parent/settings/privacy`       | Modal ștergere cont fără focus trap                     | `PrivacySettingsClient.tsx:316` | Bootstrap Modal + aria                                 | M     |

### Cluster: club-portal

| Severity | Pagină                             | Finding                                                  | Evidență                              | Recomandare                                 | Efort |
| -------- | ---------------------------------- | -------------------------------------------------------- | ------------------------------------- | ------------------------------------------- | ----- |
| P1       | `/club/dashboard/leaduri`          | Tabel fără card layout mobil                             | `LeadManagementDashboard.tsx:150`     | Card view `d-md-none`                       | M     |
| P1       | `/club/dashboard/premium`          | Prețuri UI 99/990 ≠ checkout 99,99/999,99                | `PremiumUpgrade.tsx:261-358`          | Sursă unică prețuri                         | S     |
| P1       | `/club/dashboard/premium`          | FAQ promite anulare din Setări — inexistent              | `PremiumUpgrade.tsx:450-453`          | Secțiune abonament în settings              | L     |
| P1       | `/club/dashboard/leaduri/[leadId]` | Detaliu read-only — fără acțiuni accept/status           | `LeadDetailView.tsx:45-181`           | Butoane accept/contactat                    | M     |
| P1       | `/club/dashboard`                  | CTA Premium „acces nelimitat cereri” — contact e gratuit | `ClubDashboardContent.tsx:154-159`    | Rescrie: vizibilitate, nu deblocare contact | S     |
| P1       | `/club/dashboard/leaduri`          | Filtru „Toate” afișează total filtrat, nu global         | `LeadManagementDashboard.tsx:98-103`  | Prop `totalAll` separat                     | S     |
| P1       | `/club/bookings`                   | `confirm()`/`alert()` nativ                              | `ClubBookingList.tsx:98-118`          | Bootstrap modal                             | M     |
| P1       | `/club/dashboard/premium`          | Checkout success fără mesaj vizual                       | `PremiumUpgrade.tsx:49-51`            | Alert success persistent                    | S     |
| P2       | `/club/dashboard/leaduri`          | Empty state fără CTA profil/Premium                      | `LeadManagementDashboard.tsx:134-145` | Butoane conversie                           | S     |

### Cluster: doctor-portal

| Severity | Pagină                 | Finding                                                | Evidență                                 | Recomandare                             | Efort |
| -------- | ---------------------- | ------------------------------------------------------ | ---------------------------------------- | --------------------------------------- | ----- |
| P1       | `/doctor/availability` | Disponibilitate **lipsește din nav** lateral           | `dashboard-navigation.ts:40-45`          | Adaugă item nav Disponibilitate         | S     |
| P1       | `/doctor/dashboard`    | Tag-uri HTML literal `<strong>` în welcome             | `DoctorDashboardContent.tsx:88`          | Folosește `entityName` prop             | S     |
| P1       | `/doctor/bookings`     | Deep-link `?id=` mort — nu deschide modal              | `DoctorDashboardContent.tsx:156`         | `useSearchParams` + open modal          | M     |
| P1       | `/doctor/bookings`     | Empty state fără CTA availability/profil               | `DoctorConsultationList.tsx:278-289`     | Link-uri acțiune                        | S     |
| P1       | `/doctor/availability` | Empty state calendar minimal, fără CTA                 | `DoctorAvailabilityCalendar.tsx:207-211` | Empty state ghidat + „Adaugă interval”  | S     |
| P1       | `/doctor/bookings`     | `confirm()`/`alert()` native                           | `DoctorConsultationList.tsx:98-118`      | Bootstrap modal                         | M     |
| P1       | `/doctor/bookings`     | Terminologie mixtă Rezervări/Consultații               | `dashboard-navigation.ts:43`             | Standardizează „Consultații”            | S     |
| P1       | `/doctor/dashboard`    | 5 stat cards + butoane dense pe mobil                  | `_statistics-cards.scss:159-162`         | Grid 2×2 / dropdown acțiuni             | M     |
| P2       | `/doctor/profile`      | Schedule duplicat profil + disponibilitate             | `DoctorProfileEditForm.tsx:570-712`      | O singură sursă de adevăr               | M     |
| P2       | `/doctor/availability` | Buton „Anulează” variant danger pentru navigare înapoi | `DoctorAvailabilityCalendar.tsx:303-311` | outline-secondary / „Înapoi”            | S     |
| P2       | `/doctor/dashboard`    | Icon detalii activitate fără aria-label                | `DoctorDashboardContent.tsx:155-160`     | `aria-label="Vezi detalii consultație"` | S     |
| P2       | `/doctor/bookings`     | N+1 `getChildAction()` per consultație                 | `DoctorConsultationList.tsx:65-76`       | Payload server-side cu date copil       | M     |
| P2       | `/doctor/dashboard`    | Copy EN: „Dashboard Doctor”, „Total”                   | `DoctorDashboardContent.tsx:51`          | Traduce RO                              | S     |

### Cluster: guest-payments

| Severity | Pagină                    | Finding                                         | Evidență                               | Recomandare                     | Efort |
| -------- | ------------------------- | ----------------------------------------------- | -------------------------------------- | ------------------------------- | ----- |
| P0       | `/cereri/.../plata-guest` | PII afișat fără banner GDPR                     | `plata-guest/page.tsx:105-122`         | Banner + link confidentialitate | S     |
| P1       | `/cereri/.../plata-guest` | URL/copy „plată” vs contact gratuit             | `routes.ts:75-76`                      | Rename `/contact` + 301         | M     |
| P1       | `/cereri/.../success`     | Copy plată vechi („Plată confirmată”, 3€)       | `success/page.tsx:42-43`               | „Contact confirmat”             | S     |
| P1       | `/cereri/.../success`     | CTA „Înapoi la plată”; lipsă mailto/tel primary | `success/page.tsx:105-110`, `:191-202` | Aliniază la model gratuit       | S     |
| P1       | `/cereri/.../plata-guest` | `GuestLeadPayment` cod mort; action stub        | `GuestLeadPayment.tsx:178`             | Arhivează sau documentează      | M     |

### Cluster: legal-admin

| Severity | Pagină                                                        | Finding                                      | Evidență                               | Recomandare                          | Efort |
| -------- | ------------------------------------------------------------- | -------------------------------------------- | -------------------------------------- | ------------------------------------ | ----- |
| P1       | `/confidentialitate`, `/termeni`, `/cookies`, `/gdpr-parinti` | H1 duplicat (BreadcrumbOne + body)           | `confidentialitate/page.tsx:38-52`     | `titleAs="p"` pe toate legal         | S     |
| P1       | `/confidentialitate`                                          | Document lung fără TOC; contrast dată sub AA | `page.tsx:58-481`, `_legal.scss:43-47` | TOC sticky + fix contrast            | M     |
| P1       | `/dezabonare`                                                 | Token invalid promite formular absent        | `dezabonare/page.tsx:117-121`          | Afișează form sau actualizează mesaj | S     |
| P1       | `/dezabonare`                                                 | Email input fără label vizibil               | `UnsubscribeForm.tsx:28-36`            | Label vizibil/sr-only                | S     |
| P2       | `/cookies`                                                    | Fără CTA către banner consimțământ           | `cookies/page.tsx:178-222`             | Link reafișare CookieConsentBanner   | S     |
| P2       | `/admin/verifications`                                        | Textarea respingere fără label               | `VerificationRequestCard.tsx:242-249`  | Label + aria                         | S     |

## 6. Backlog prioritar (Top 15)

1. **[P0] Quiz rezultate bypass monetizare** — quiz-funnel, efort M
2. **[P0] Auth redirect `/auth/login` → 404** — auth, efort M
3. **[P0] Signup role nepersistat** — auth, efort M
4. **[P0] PII guest lead fără banner GDPR** — guest-payments, efort S
5. **[P0] `/parent/children/add` → 404** — parent-portal, efort S
6. **[P0] Premium CTAs → 404** — clubs-acquisition, efort M
7. **[P0] Payment success CTA greșit** — quiz-funnel, efort S
8. **[P0] Picsum doctori** — discovery, efort S
9. **[P1] Email gate ocolibil** — quiz-funnel, efort M
10. **[P1] `/cautare` fără input + linkuri moarte** — discovery, efort M
11. **[P1] Funnel cluburi mailto/modal** — clubs-acquisition, efort S–M
12. **[P1] H1 duplicate transversal** — marketing/legal/discovery, efort S
13. **[P1] Paywall redirect când plătit** — quiz-funnel, efort S
14. **[P1] Lead detail fără acțiuni** — club-portal, efort M
15. **[P1] Privacy consents required retragibile** — parent-portal, efort M

## 7. Quick wins (≤1h fiecare)

- [ ] Restricționează `/chestionar/rezultate/[id]` sau redirect la teaser — `rezultate/[id]/page.tsx:154`
- [ ] Fix CTA success plată → raport — `payment/success/[quizId]/page.tsx:176`
- [ ] Fix link add-child 404 — `ParentDashboardContent.tsx:89`
- [ ] Banner GDPR guest lead — `plata-guest/page.tsx:105`
- [ ] `titleAs="p"` BreadcrumbOne pe legal + FAQ + cautare
- [ ] PostHog mailto eveniment dedicat — `clubs-landing-modal.ts:48`
- [ ] `PAYMENT_AMOUNT_LEI` în PaymentForm — `PaymentForm.tsx:312`
- [ ] FAQ doctori marketplace → aliniere etică — `doctors-faq-data.tsx:16`
- [ ] `autoComplete="email"` login — `SignInForm.tsx:116`
- [ ] Canonical login `/login` — `login/page.tsx:31`
- [ ] Premium prețuri 99,99 unificate UI — `PremiumUpgrade.tsx:261`
- [ ] Unifică redirect-uri auth la `routes.login` — `proxy.ts:33`, `parent/layout.tsx:18`
- [ ] Adaugă Disponibilitate în nav doctor — `dashboard-navigation.ts:40-45`
- [ ] Fix welcome `<strong>` literal — `DoctorDashboardContent.tsx:88`

## 8. Limitări & ce nu s-a verificat

- **Live audit**: nu — `localhost:3000` unreachable; AccessLint/Lighthouse/LCP **nesărite**.
- **Metodă**: static-only; graphify query CLI + 12 subagenți JSON.
- **Pagini sărite (fără page.tsx)**: `/parteneri`, `/choose-role`, `/verify-email`, `/verification-pending`, `/pentru-cluburi/abonare-premium`, `/preturi-cluburi`, `/parent/children/add`, `/chestionar/previzualizare`, `/home-2`, `/home-3`.
- **Toate 12 subagenții** integrate în secțiunile 3–7 (inclusiv auth P0 route mismatch, doctor-portal nav/empty states).
- **Neauditat live**: Stripe checkout end-to-end, quiz edge cases, dashboard cu sesiune reală.
- **Out of scope**: rescriere copy legal, decizii produs/prețuri, SEO meta detaliat.

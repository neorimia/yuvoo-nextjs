# 🏃 Yuvoo - Platformă AI pentru Descoperirea Sporturilor pentru Copii

**Yuvoo** este o platformă alimentată de AI care ajută părinții din România să găsească activitățile sportive potrivite pentru copiii lor (vârste 4-14 ani).

## 📋 Despre Proiect

Yuvoo conectează trei propuneri de valoare cheie:

1. **AI Coach Quiz** - Recomandări personalizate de sporturi bazate pe profilul copilului
2. **Directorul de Cluburi Verificate** - Listă curată și verificată de cluburi sportive pentru copii
3. **Rețeaua de Specialiști Pediatri** - Acces la profesioniști medicali relevanți pentru sport

### Triunghiul de Valoare

```
AI Coach → Cluburi Verificate → Specialiști Pediatri
```

## 🎯 Faza 1 - MVP

**Obiectiv**: Lansarea unui MVP funcțional care validează fluxul complet "Descoperă sportul → Găsește clubul → Conectează-te cu specialiști"

**Perioadă**: 3 luni (16 săptămâni)

**Piață țintă**: România (începând cu București)

**Grup țintă**: Copii cu vârste între 4-14 ani

**Status**: ✅ **Core Features Complete** - Dezvoltare activă, pregătire pentru lansare

## 🛠️ Tehnologii

### Core Framework

- **Next.js** 16.0.8 - React framework cu App Router și Cache Components ✅
- **React** 19.2.1 - UI library ✅
- **TypeScript** 5.x - Type safety ✅

### Database & ORM

- **Drizzle ORM** 0.36.4 - Type-safe ORM ✅
- **Neon Database** - Serverless Postgres ✅
- **Postgres** 3.4.5 - Database driver ✅
- **Drizzle Kit** 0.31.8 - Migration tool ✅

### Authentication

- **Stack Auth** 2.4.8 - Serviciu de autentificare gestionat ✅
  - Email/password authentication
  - Session management (server-side)
  - Email verification
  - Password reset

### UI & Styling

- **Bootstrap** 5.3.3 - CSS framework ✅
- **SCSS/Sass** 1.75.0 - CSS preprocessor ✅
- **Lucide React** 0.560.0 - Icon library ✅
- **Bootstrap Icons** 1.13.1 - Icon library ✅
- **WOW.js** 1.2.2 - Scroll animations ✅

### State Management

- **Redux Toolkit** 2.8.2 - State management ✅
- **React Redux** 9.2.0 - React bindings ✅
- **React Hook Form** 7.56.1 - Form management ✅
- **@hookform/resolvers** 5.2.2 - Zod integration pentru React Hook Form ✅

### AI & External Services

- **OpenAI** 4.72.0 - AI recommendations (GPT-4 Turbo) ✅
- **Cloudinary** 2.5.1 - Media storage & CDN ✅
- **Brevo** 3.0.1 - Email service (transactional emails) ✅
- **React Email** 5.1.0 - Email template library ✅
- **PostHog** - Analytics & product analytics ✅
- **Sentry** 10.31.0 - Error tracking & performance monitoring ✅

### Validation

- **Zod** 3.22.4 - Schema validation ✅

## 🚀 Instalare și Configurare

### Cerințe

- Node.js v20+ (recomandat)
- npm, yarn sau pnpm
- Git

### Pași de instalare

1. **Clonează repository-ul**

```bash
git clone <repository-url>
cd yuvoo-nextjs
```

2. **Instalează dependențele**

```bash
npm install
# sau
yarn install
# sau
pnpm install
```

3. **Configurează variabilele de mediu**

**Opțiune 1: Script automat (recomandat)**

```bash
npm run setup:dev
```

**Opțiune 2: Manual**
Creează un fișier `.env.local` în root-ul proiectului:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/yuvoo?sslmode=require"

# Authentication - Stack Auth
NEXT_PUBLIC_STACK_PROJECT_ID="your-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-publishable-key"
STACK_SECRET_SERVER_KEY="your-secret-key"

# OpenAI
OPENAI_API_KEY="sk-..."

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email - Brevo
BREVO_API_KEY="your-brevo-key"
BREVO_SENDER_EMAIL="noreply@yuvoo.com"
BREVO_SENDER_NAME="Yuvoo"

# Email Unsubscribe (optional, pentru token-based unsubscribe)
EMAIL_UNSUBSCRIBE_SECRET_KEY="your-secret-key-for-jwt-tokens"

# PostHog Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY="your-posthog-key"
NEXT_PUBLIC_POSTHOG_HOST="https://eu.i.posthog.com"

# Sentry Error Tracking (optional)
SENTRY_DSN="your-sentry-dsn"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Verifică configurarea**

```bash
# Verifică că toate variabilele de mediu sunt configurate
npm run verify:setup
```

5. **Inițializează baza de date**

```bash
# Push schema to database
npm run db:push

# (Opțional) Seed cu date de test
npm run db:seed

# (Opțional) Deschide Drizzle Studio pentru vizualizare
npm run db:studio
```

6. **Rulează serverul de dezvoltare**

```bash
npm run dev
# sau
yarn dev
# sau
pnpm dev
```

Deschide [http://localhost:3000](http://localhost:3000) în browser pentru a vedea rezultatul.

## 📁 Structura Proiectului

```
yuvoo-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/          # Pagini publice (fără auth)
│   │   │   ├── quiz/          # AI Coach Quiz
│   │   │   ├── cluburi/       # Descoperire cluburi
│   │   │   ├── doctori/       # Profiluri doctori
│   │   │   └── sporturi/      # Lista sporturi
│   │   ├── (auth)/            # Rute protejate
│   │   │   ├── parent/        # Dashboard părinți
│   │   │   ├── club/          # Dashboard cluburi
│   │   │   ├── doctor/        # Dashboard doctori
│   │   │   └── admin/         # Dashboard admin
│   │   ├── auth/              # Pagini autentificare
│   │   ├── actions/           # Server Actions
│   │   └── api/               # API routes
│   │
│   ├── components/            # Componente React
│   │   ├── UI/               # Bootstrap wrapper components
│   │   ├── layout/           # Header, Footer, Sidebar
│   │   ├── features/         # Componente specifice features
│   │   └── shared/           # Componente reutilizabile
│   │
│   ├── lib/                  # Biblioteci core
│   │   ├── auth/            # Stack Auth config ✅
│   │   ├── db/              # Drizzle ORM ✅
│   │   ├── validations/      # Zod schemas ✅
│   │   ├── integrations/     # Servicii externe ✅
│   │   ├── analytics/        # PostHog tracking ✅
│   │   └── routes.ts         # Centralized routes ✅
│   │
│   ├── modules/              # Business Logic ✅
│   │   ├── quiz/            # Quiz system
│   │   ├── clubs/           # Club management
│   │   ├── doctors/         # Doctor management
│   │   ├── bookings/        # Booking system
│   │   └── auth/            # Auth service layer
│   │
│   └── providers/            # React providers
│
├── emails/                   # React Email templates ✅
│   ├── components/          # Reusable email components
│   ├── utils/               # Email utilities
│   └── preview-data/        # Mock data for preview
│
├── memory-bank/              # Documentație proiect
│   ├── projectbrief.md
│   ├── productContext.md
│   ├── systemPatterns.md
│   ├── techContext.md
│   ├── activeContext.md
│   └── progress.md
│
├── docs/                     # Documentație detaliată
│   ├── ARCHITECTURE_OVERVIEW.md
│   ├── BRAND_GUIDELINES.md
│   ├── COMPONENTS_GUIDE.md
│   └── ...
│
├── briefs/                   # Brief-uri proiect
│   └── ...
│
└── public/                   # Assets statice
```

## 📝 Scripturi Disponibile

```bash
# Dezvoltare
npm run dev          # Rulează serverul de dezvoltare

# Build
npm run build        # Construiește pentru producție
npm start            # Rulează build-ul de producție

# Calitate cod
npm run lint         # Rulează ESLint

# Database
npm run db:generate  # Generează migrații
npm run db:push      # Push schema changes
npm run db:migrate   # Rulează migrații
npm run db:studio    # Deschide Drizzle Studio (port 4983)
npm run db:seed      # Populează baza de date
npm run db:check     # Verifică status migrații

# Email Development
npm run email:dev    # Preview server pentru React Email (port 3001)

# Utilitare
npm run clean        # Șterge node_modules și lock files
```

## 🌐 Cerințe de Limbă

**CRITICAL**: Tot conținutul vizibil utilizatorilor trebuie să fie exclusiv în **limba română**.

- Toate textele UI, etichete, butoane, mesaje
- Întrebări și explicații quiz
- Recomandări sportive și raționamente
- Descrieri și informații cluburi
- Profiluri și informații doctori
- Notificări email și template-uri
- Mesaje de eroare și text validare
- Flow-uri onboarding și instrucțiuni

**Excepție**: Documentația tehnică, comentariile din cod și notele interne de dezvoltare pot fi în engleză.

## 📚 Documentație

### Setup Guides

- **MCP Setup**: See `MCP_SETUP.md` for Model Context Protocol server configuration (Next.js DevTools MCP)

### Memory Bank

Documentația completă a proiectului se află în directorul `memory-bank/`:

- **[projectbrief.md](./memory-bank/projectbrief.md)** - Prezentare generală proiect
- **[productContext.md](./memory-bank/productContext.md)** - Context produs și UX
- **[systemPatterns.md](./memory-bank/systemPatterns.md)** - Arhitectură și pattern-uri
- **[techContext.md](./memory-bank/techContext.md)** - Tehnologii și setup
- **[activeContext.md](./memory-bank/activeContext.md)** - Context activ și next steps
- **[progress.md](./memory-bank/progress.md)** - Tracking progres

### Brief-uri

- **[PROJECT_DESCRIPTION.md](./brief/PROJECT_DESCRIPTION.md)** - Descriere detaliată Faza 1 (RO)
- **[MVP_STARTER_BRIEF.md](./brief/MVP_STARTER_BRIEF.md)** - Arhitectură completă MVP (EN)

## 🎯 Status Proiect

**Faza Curentă**: ✅ **Core Features Complete** - Dezvoltare activă, pregătire pentru lansare

### Features Complete ✅

- ✅ **Foundation**: Next.js 16, React 19, TypeScript, Database, Authentication
- ✅ **Quiz System**: AI Coach Quiz complet cu recomandări personalizate
- ✅ **Club Directory**: Căutare, filtrare, rezervări, verificare
- ✅ **Doctor Directory**: Căutare, filtrare, programări, verificare
- ✅ **Booking System**: Rezervări pentru cluburi și consultații medicale
- ✅ **Onboarding**: Flow complet pentru părinți, cluburi și doctori
- ✅ **Email System**: Template-uri React Email, integrare Brevo
- ✅ **Admin Panel**: Dashboard pentru verificare cluburi și doctori
- ✅ **Child Management**: CRUD complet pentru profiluri copii
- ✅ **User Settings**: Editare profil, preferințe email
- ✅ **Favorites System**: Salvare cluburi și doctori preferați
- ✅ **SEO Optimization**: Metadata, structured data, sitemap
- ✅ **Performance**: Cache optimization, query optimization, AI caching

### In Progress 🚧

- 🚧 Testing E2E comprehensiv
- 🚧 Final polish și optimizări

Vezi [progress.md](./memory-bank/progress.md) pentru tracking detaliat.

## 🚢 Deployment

### Vercel ✅

Platforma folosită pentru deployment:

1. ✅ Repository conectat la Vercel
2. ✅ Variabile de mediu configurate
3. ✅ Deploy automat la push pe main branch
4. ✅ Custom domain & SSL configurat
5. ✅ CDN settings configurate
6. ✅ Database backups verificate

**Region**: Frankfurt (fra1) - Europa

Vezi [techContext.md](./memory-bank/techContext.md) pentru detalii de configurare.

## 🤝 Contribuții

Acest proiect este în faza de dezvoltare MVP. Pentru întrebări sau sugestii, contactează echipa Yuvoo.

## 📄 Licență

Proprietate privată - Yuvoo

---

**Yuvoo** - Descoperă sportul potrivit copilului tău 🏃‍♂️

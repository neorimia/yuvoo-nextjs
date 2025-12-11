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

## 🛠️ Tehnologii

### Core Framework

- **Next.js** latest - React framework cu App Router
- **React** latest - UI library
- **TypeScript** 5.x - Type safety

### Database & ORM

- **Drizzle ORM** - Type-safe ORM (planificat)
- **Neon Database** - Serverless Postgres (planificat)
- **Postgres** - Database driver (planificat)

### Authentication

- **Stack Auth** - Serviciu de autentificare gestionat (planificat)

### UI & Styling

- **Tailwind CSS** - Utility-first CSS (planificat)
- **shadcn/ui** - Component library (planificat)
- **Bootstrap** 5.3.3 - CSS framework (actual)

### State Management

- **Redux Toolkit** 2.8.2 - State management (actual)
- **React Redux** 9.2.0 - React bindings (actual)

### AI & External Services

- **OpenAI** - AI recommendations (planificat)
- **Cloudinary** - Media storage & CDN (planificat)
- **Brevo** - Email service (planificat)

### Validation

- **Zod** - Schema validation (planificat)

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

Creează un fișier `.env.local` în root-ul proiectului:

```bash
# Database (planificat)
DATABASE_URL="postgresql://user:password@host:5432/yuvoo?sslmode=require"

# Authentication - Stack Auth (planificat)
NEXT_PUBLIC_STACK_PROJECT_ID="your-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-publishable-key"
STACK_SECRET_SERVER_KEY="your-secret-key"

# OpenAI (planificat)
OPENAI_API_KEY="sk-..."

# Cloudinary (planificat)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email - Brevo (planificat)
BREVO_API_KEY="your-brevo-key"
BREVO_SENDER_EMAIL="noreply@yuvoo.com"
BREVO_SENDER_NAME="Yuvoo"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Rulează serverul de dezvoltare**

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
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Pagini marketing publice
│   ├── (public)/          # Pagini publice (fără auth)
│   │   ├── quiz/          # AI Coach Quiz
│   │   ├── clubs/         # Descoperire cluburi
│   │   └── doctors/       # Profiluri doctori
│   ├── (auth)/            # Rute protejate (părinți)
│   │   ├── dashboard/
│   │   ├── children/
│   │   └── bookings/
│   └── actions/          # Server Actions
│
├── components/            # Componente React
│   ├── ui/               # shadcn/ui components (planificat)
│   ├── layout/           # Header, Footer, Sidebar
│   └── features/         # Componente specifice features
│
├── lib/                  # Biblioteci core
│   ├── auth/            # Stack Auth config (planificat)
│   ├── db/              # Drizzle ORM (planificat)
│   ├── validations/      # Zod schemas (planificat)
│   └── integrations/     # Servicii externe (planificat)
│
├── modules/              # Business Logic (planificat)
│   ├── quiz/
│   ├── clubs/
│   ├── doctors/
│   └── bookings/
│
├── memory-bank/          # Documentație proiect
│   ├── projectbrief.md
│   ├── productContext.md
│   ├── systemPatterns.md
│   ├── techContext.md
│   ├── activeContext.md
│   └── progress.md
│
├── brief/                # Brief-uri proiect
│   ├── PROJECT_DESCRIPTION.md
│   └── MVP_STARTER_BRIEF.md
│
└── public/               # Assets statice
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

# Database (planificat)
npm run db:generate  # Generează migrații
npm run db:push      # Push schema changes
npm run db:migrate    # Rulează migrații
npm run db:studio    # Deschide Drizzle Studio
npm run db:seed      # Populează baza de date

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

**Faza Curentă**: Planificare & Design Arhitectură

**Următorii Pași**:

- Week 1-2: Setup fundație (Next.js, Tailwind, Drizzle, Stack Auth)
- Week 3-4: Pagini core (Landing, Auth, Dashboard)
- Week 5-8: Sistem Quiz cu AI
- Week 9-12: Descoperire cluburi
- Week 13-14: Profiluri doctori
- Week 15-16: Polish & Deploy

Vezi [progress.md](./memory-bank/progress.md) pentru tracking detaliat.

## 🚢 Deployment

### Vercel (Planificat)

Platforma recomandată pentru deployment:

1. Conectează repository-ul la Vercel
2. Configurează variabilele de mediu
3. Deploy automat la push pe main branch

Vezi [techContext.md](./memory-bank/techContext.md) pentru detalii de configurare.

## 🤝 Contribuții

Acest proiect este în faza de dezvoltare MVP. Pentru întrebări sau sugestii, contactează echipa Yuvoo.

## 📄 Licență

Proprietate privată - Yuvoo

---

**Yuvoo** - Descoperă sportul potrivit copilului tău 🏃‍♂️

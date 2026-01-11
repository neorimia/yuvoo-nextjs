# Research Data pentru Cluburi Sportive

Acest director conține date reale colectate prin research public pentru cluburi sportive din diferite orașe din România.

## Fișiere Research

### `clubs-research-bucuresti.ts`

Date reale colectate pentru cluburi sportive din București (Decembrie 2024).

**Statistici:**

- Total cluburi: 30
- Sporturi acoperite: 8+ (fotbal, volei, baschet, tenis, handbal, escaladă, gimnastică, multi-sport)
- Sectoare acoperite: Toate sectoarele Bucureștiului (1-6)

## Cum se folosește Research Data

### Opțiunea 1: Import direct în seed.ts

Adaugă în `src/lib/db/seed.ts`:

```typescript
import { CLUBS_RESEARCH_BUCHAREST } from "./seed-data/clubs-research-bucuresti";

// În funcția seed(), adaugă:
const researchClubsResult = await seedResearchClubs();
```

Apoi adaugă funcția:

```typescript
async function seedResearchClubs() {
  console.log("\n🔍 Seeding research clubs (București)...");
  let clubsCreated = 0;
  let clubsSkipped = 0;

  for (const club of CLUBS_RESEARCH_BUCHAREST) {
    try {
      await db.insert(clubs).values({
        id: crypto.randomUUID(),
        ...club,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      clubsCreated++;
      console.log(`   ✅ Created club: ${club.name} (${club.sportType})`);
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string };
      if (err?.code === "23505" || err?.message?.includes("unique")) {
        clubsSkipped++;
        console.log(`   ⚠️  Club ${club.name} already exists (slug: ${club.slug}), skipping...`);
      } else {
        console.error(`   ❌ Error creating club ${club.name}:`, error);
        throw error;
      }
    }
  }

  console.log(`   📊 Research Clubs: ${clubsCreated} created, ${clubsSkipped} skipped`);
  return { created: clubsCreated, skipped: clubsSkipped };
}
```

### Opțiunea 2: Script separat pentru research data

Creează un script separat `seed-research.ts` care importă doar datele de research:

```typescript
import * as dotenv from "dotenv";
import { db } from "./index";
import { clubs } from "./schema";
import { CLUBS_RESEARCH_BUCHAREST } from "./seed-data/clubs-research-bucuresti";

dotenv.config({ path: ".env.local" });

async function seedResearch() {
  console.log("🔍 Seeding research clubs...");
  // ... (cod similar cu Opțiunea 1)
}

seedResearch();
```

Rulează cu: `npx tsx src/lib/db/seed-research.ts`

## Cum se actualizează Research Data

### La fiecare research nou:

1. **Actualizează fișierul research**
   - Deschide `clubs-research-bucuresti.ts`
   - Adaugă noile cluburi în array-ul `CLUBS_RESEARCH_BUCHAREST`
   - Folosește funcția `createClubFromResearch()` pentru fiecare club nou

2. **Actualizează statisticile**
   - Actualizează `RESEARCH_STATS` la sfârșitul fișierului
   - Actualizează comentariul "Ultima actualizare" în header

3. **Verifică datele**
   - Asigură-te că toate datele sunt publice și factuale
   - Marchează datele lipsă cu `null` sau omite câmpurile opționale
   - Adaugă `researchNotes` pentru informații suplimentare utile

4. **Testează seeding-ul**
   ```bash
   npm run db:seed
   # sau
   npx tsx src/lib/db/seed-research.ts
   ```

## Structura unui club din research

```typescript
createClubFromResearch({
  name: "Nume Club",
  sportType: "fotbal", // sau "volei", "baschet", etc.
  city: "București",
  district: "Sector 1", // opțional
  address: "Adresă completă",
  phone: "+40 XXX XXX XXX", // opțional
  email: "contact@club.ro", // opțional
  website: "https://club.ro", // opțional
  description: "Descriere detaliată...", // opțional, se generează automat
  ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], // opțional
  researchNotes: "Note suplimentare", // opțional
});
```

## Note importante

⚠️ **Date publice doar**: Toate datele trebuie să provină din surse publice (website-uri, Google Maps, Facebook public).

⚠️ **Nu inventa date**: Dacă o informație nu este disponibilă public, lasă câmpul gol sau folosește `null`.

⚠️ **Verificare periodică**: Cluburile pot deveni inactive sau pot schimba datele de contact. Verifică periodic statusul.

⚠️ **Status inițial**: Toate cluburile din research încep cu:

- `verified: false`
- `featured: false`
- `verificationStatus: "pending"`
- `profileComplete: false`

Acestea trebuie verificate și actualizate manual de către admin după verificare.

## Adăugare orașe noi

Pentru a adăuga research pentru un alt oraș:

1. Creează un nou fișier: `clubs-research-[oras].ts`
2. Folosește același format ca `clubs-research-bucuresti.ts`
3. Exportă array-ul: `export const CLUBS_RESEARCH_[ORAS]`
4. Importă în seed.ts sau script separat

## Mapping sporturi

Asigură-te că `sportType` folosește valorile corecte:

- `fotbal` - Fotbal
- `baschet` - Baschet
- `volei` - Volei
- `tenis` - Tenis
- `handbal` - Handbal
- `gimnastica` - Gimnastică
- `escalada` - Escaladă
- `multi-sport` - Cluburi școlare cu multiple sporturi

Pentru sporturi noi, verifică `helpers.ts` pentru funcția `generateAgeGroups()`.

## Contact

Pentru întrebări despre research data sau pentru a raporta probleme:

- Verifică că toate datele sunt actuale
- Verifică că nu există duplicate (prin slug)
- Verifică că toate URL-urile funcționează

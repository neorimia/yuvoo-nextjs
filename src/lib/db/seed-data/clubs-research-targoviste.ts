/**
 * Clubs Research Data - Târgoviște
 *
 * Date reale colectate prin research public pentru cluburi sportive din Târgoviște.
 * Acest fișier poate fi actualizat la fiecare research nou și folosit pentru seeding în baza de date.
 *
 * ⚠️ IMPORTANT:
 * - Toate datele provin din surse publice (website-uri, Google Maps, Facebook)
 * - Nu include date personale sau informații protejate
 * - Datele lipsă sunt marcate cu null sau valori default
 * - Verificarea statusului activ al cluburilor trebuie făcută periodic
 *
 * Ultima actualizare: 2025-01-XX
 * Research realizat de: Research Agent automatizat
 * Total cluburi identificate: 18
 */

import {
  generateSlug,
  getCityCoordinates,
  generateAgeGroups,
  generateLevels,
  generateSchedule,
  generatePricing,
  generateClubImage,
  getCityLocationId,
  getSectorLocationId,
  getCountyLocationId,
} from "./helpers";

/**
 * Club seed data type (matches database schema)
 */
export interface ClubSeedData {
  name: string;
  slug: string;
  description: string;
  sportType: string;
  city: string;
  district?: string; // Keep for backward compatibility
  cityId?: string; // NEW: Foreign key to locations (type='city')
  sectorId?: string; // NEW: Foreign key to locations (type='sector', optional for Bucharest)
  countyId?: string; // NEW: Foreign key to locations (type='county', denormalized)
  address: string;
  latitude?: string;
  longitude?: string;
  phone?: string;
  email?: string;
  website?: string;
  schedule?: { day: string; time: string }[];
  pricing?: { type: "monthly" | "per_class" | "per_semester"; amount: number; currency: "RON" }[];
  ageGroups?: number[];
  experienceLevels?: string[];
  galleryUrls?: string[];
  logoUrl?: string;
  verified: boolean;
  featured: boolean;
  rating: number;
  profileComplete: boolean;
  verificationStatus: "pending" | "in_review" | "approved" | "rejected";
}

/**
 * Generate comprehensive club seed data from research data
 */
function createClubFromResearch(
  data: Omit<
    ClubSeedData,
    | "slug"
    | "profileComplete"
    | "description"
    | "verified"
    | "featured"
    | "rating"
    | "verificationStatus"
  > & {
    description?: string;
    researchNotes?: string;
  }
): ClubSeedData {
  const slug = generateSlug(data.name);
  const coords = getCityCoordinates(data.city, false); // Use exact coordinates, no randomization

  // Generate description if not provided
  const description =
    data.description ||
    `Club sportiv ${data.sportType} pentru copii din ${data.district || data.city}.${
      data.researchNotes ? ` ${data.researchNotes}` : ""
    }`;

  // Ensure pricing is always an array (required by schema)
  const pricing = data.pricing || [generatePricing("monthly")];

  // Ensure schedule is always an array (required by schema)
  const schedule = data.schedule || generateSchedule(3, "16:00", 90);

  // Derive location IDs from city/district names
  const cityId = data.cityId || getCityLocationId(data.city);
  const sectorId =
    data.sectorId || (data.district ? getSectorLocationId(data.district) : undefined);
  const countyId = data.countyId || (cityId ? getCountyLocationId(cityId) : undefined);

  return {
    ...data,
    cityId,
    sectorId,
    countyId,
    slug,
    description,
    latitude: coords?.lat.toString(),
    longitude: coords?.lng.toString(),
    profileComplete: false, // Research data is incomplete, needs manual completion
    ageGroups: data.ageGroups || generateAgeGroups(data.sportType),
    experienceLevels: data.experienceLevels || generateLevels(true, true, false),
    schedule,
    pricing,
    galleryUrls: data.galleryUrls || ([generateClubImage(data.sportType)] as string[]),
    verified: false, // Research clubs start as unverified
    featured: false, // Research clubs start as not featured
    rating: 0, // No rating until verified
    verificationStatus: "pending", // Needs admin review
  };
}

/**
 * Research Data - Cluburi Sportive Târgoviște
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_TARGOVISTE: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "Academia de Fotbal Chindia Târgoviște",
    sportType: "fotbal",
    city: "Târgoviște",
    district: "N/A",
    address: "Complexul Turistic de Natație, Târgoviște",
    website: "https://www.afcchindiatargoviste.ro/",
    description:
      "Academia de Fotbal Chindia Târgoviște este dedicată formării și dezvoltării tinerilor fotbaliști din regiunea Dâmbovița. Conform organigramei clubului, departamentul sportiv include un Centru de Copii și Juniori condus de Nicolae Croitoru, alături de o echipă de antrenori specializați, printre care se numără Vasile Bîrdeș, Adrian Ionescu și Vasile Valentin Marian. În 2024, Academia Chindia Târgoviște s-a clasat pe locul 31 în clasamentul național al academiilor de copii și juniori, conform Federației Române de Fotbal. Clubul organizează selecții pentru copii născuți în 2016 și mai mici. Antrenamentele se desfășoară conform metodologiei aplicate de FC Barcelona, la baza sportivă din Complexul Turistic de Natație, Târgoviște.",
    researchNotes:
      "Centru de Copii și Juniori condus de Nicolae Croitoru, antrenori: Vasile Bîrdeș, Adrian Ionescu, Vasile Valentin Marian, loc 31 clasament academii FRF 2024, selecții copii născuți 2016 și mai mici, metodologie FC Barcelona, Complexul Turistic de Natație",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Târgoviște - Secția de Fotbal",
    sportType: "fotbal",
    city: "Târgoviște",
    district: "N/A",
    address: "Strada Maior Spirescu, Târgoviște",
    phone: "+40 245 215 099",
    email: "css.targoviste@yahoo.com",
    website: "https://www.csstargoviste.ro/",
    description:
      "Clubul Sportiv Școlar Târgoviște cu secție de fotbal pentru copii și juniori. CSS Târgoviște este singura unitate de învățământ cu program sportiv suplimentar din județul Dâmbovița, având o istorie de aproape o jumătate de secol. Acesta selecționează, pregătește și promovează elevii în activitatea sportivă de performanță. În prezent, peste 650 de elevi sportivi își desfășoară activitatea la cele șapte secții ale clubului.",
    researchNotes:
      "Parte din CSS Târgoviște, istorie ~50 ani, singura unitate cu program sportiv suplimentar județul Dâmbovița, peste 650 elevi sportivi la 7 secții, selecție, pregătire și promovare elevii în activitatea sportivă de performanță",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSM Târgoviște - Secția de Baschet",
    sportType: "baschet",
    city: "Târgoviște",
    district: "N/A",
    address: "Strada Revoluției nr. 8B, Târgoviște",
    phone: "+40 245 640 644",
    email: "csm_tgv@yahoo.com",
    website: "https://www.csmtargoviste.ro/",
    description:
      "Clubul Sportiv Municipal Târgoviște cu secție de baschet pentru copii și juniori. CSM Târgoviște este principalul reper sportiv extra fotbal din Târgoviște și județul Dâmbovița. Echipa de baschet feminin a clubului a câștigat 12 titluri în Liga Națională și 9 Cupe ale României. Clubul oferă programe de pregătire pentru copii și juniori în baschet.",
    researchNotes:
      "Parte din CSM Târgoviște, principalul reper sportiv extra fotbal Târgoviște și județul Dâmbovița, echipa seniori: 12 titluri Liga Națională, 9 Cupe României",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Târgoviște - Secția de Baschet",
    sportType: "baschet",
    city: "Târgoviște",
    district: "N/A",
    address: "Strada Maior Spirescu, Târgoviște",
    phone: "+40 245 215 099",
    email: "css.targoviste@yahoo.com",
    website: "https://www.csstargoviste.ro/",
    description:
      "Clubul Sportiv Școlar Târgoviște cu secție de baschet pentru copii și juniori. CSS Târgoviște este singura unitate de învățământ cu program sportiv suplimentar din județul Dâmbovița, având o istorie de aproape o jumătate de secol. În prezent, peste 650 de elevi sportivi își desfășoară activitatea la cele șapte secții ale clubului.",
    researchNotes: "Parte din CSS Târgoviște, peste 650 elevi sportivi la 7 secții",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSU Târgoviște - Secția de Baschet",
    sportType: "baschet",
    city: "Târgoviște",
    district: "N/A",
    address: "Universitatea Valahia, Târgoviște",
    website: "https://csu.valahia.ro/",
    description:
      "Clubul Sportiv Universitar Târgoviște cu secție de baschet pentru copii și juniori. CSU Târgoviște este afiliat Universității Valahia din Târgoviște și oferă programe sportive pentru tineri în diverse discipline, inclusiv baschet, handbal, atletism și volei.",
    researchNotes: "Parte din CSU Târgoviște, afiliat Universitatea Valahia",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CSM Târgoviște - Secția de Volei",
    sportType: "volei",
    city: "Târgoviște",
    district: "N/A",
    address: "Strada Revoluției nr. 8B, Târgoviște",
    phone: "+40 245 640 644",
    email: "csm_tgv@yahoo.com",
    website: "https://www.csmtargoviste.ro/",
    description:
      "Clubul Sportiv Municipal Târgoviște cu secție de volei pentru copii și juniori. CSM Târgoviște este principalul reper sportiv extra fotbal din Târgoviște și județul Dâmbovița. Echipa de volei feminin a clubului a câștigat Cupa României și Supercupa României în 2016. Clubul oferă programe de pregătire pentru copii și juniori în volei.",
    researchNotes:
      "Parte din CSM Târgoviște, echipa seniori: Cupa României și Supercupa României 2016",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Târgoviște - Secția de Volei",
    sportType: "volei",
    city: "Târgoviște",
    district: "N/A",
    address: "Strada Maior Spirescu, Târgoviște",
    phone: "+40 245 215 099",
    email: "css.targoviste@yahoo.com",
    website: "https://www.csstargoviste.ro/",
    description:
      "Clubul Sportiv Școlar Târgoviște cu secție de volei pentru copii și juniori. CSS Târgoviște este singura unitate de învățământ cu program sportiv suplimentar din județul Dâmbovița, având o istorie de aproape o jumătate de secol. În prezent, peste 650 de elevi sportivi își desfășoară activitatea la cele șapte secții ale clubului.",
    researchNotes: "Parte din CSS Târgoviște, peste 650 elevi sportivi la 7 secții",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSU Târgoviște - Secția de Volei",
    sportType: "volei",
    city: "Târgoviște",
    district: "N/A",
    address: "Universitatea Valahia, Târgoviște",
    website: "https://csu.valahia.ro/",
    description:
      "Clubul Sportiv Universitar Târgoviște cu secție de volei pentru copii și juniori. CSU Târgoviște este afiliat Universității Valahia din Târgoviște și oferă programe sportive pentru tineri în diverse discipline, inclusiv baschet, handbal, atletism și volei.",
    researchNotes: "Parte din CSU Târgoviște, afiliat Universitatea Valahia",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSS Târgoviște - Secția de Handbal",
    sportType: "handbal",
    city: "Târgoviște",
    district: "N/A",
    address: "Strada Maior Spirescu, Târgoviște",
    phone: "+40 245 215 099",
    email: "css.targoviste@yahoo.com",
    website: "https://www.csstargoviste.ro/",
    description:
      "Clubul Sportiv Școlar Târgoviște cu secție de handbal pentru copii și juniori. CSS Târgoviște este singura unitate de învățământ cu program sportiv suplimentar din județul Dâmbovița, având o istorie de aproape o jumătate de secol. În prezent, peste 650 de elevi sportivi își desfășoară activitatea la cele șapte secții ale clubului.",
    researchNotes: "Parte din CSS Târgoviște, peste 650 elevi sportivi la 7 secții",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSU Târgoviște - Secția de Handbal",
    sportType: "handbal",
    city: "Târgoviște",
    district: "N/A",
    address: "Universitatea Valahia, Târgoviște",
    website: "https://csu.valahia.ro/",
    description:
      "Clubul Sportiv Universitar Târgoviște cu secție de handbal pentru copii și juniori. CSU Târgoviște este afiliat Universității Valahia din Târgoviște și oferă programe sportive pentru tineri în diverse discipline, inclusiv baschet, handbal, atletism și volei.",
    researchNotes: "Parte din CSU Târgoviște, afiliat Universitatea Valahia",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "CSS Târgoviște - Secția de Înot",
    sportType: "inot",
    city: "Târgoviște",
    district: "N/A",
    address: "Strada Maior Spirescu nr. 5, Târgoviște",
    phone: "+40 723 237 290",
    email: "css.targoviste@yahoo.com",
    website: "https://www.csstargoviste.ro/",
    description:
      "Clubul Sportiv Școlar Târgoviște oferă cursuri de înot pentru copii și adulți, sub îndrumarea unor instructori experimentați. Programul pentru copii include sesiuni marți și joi între orele 17:00-18:00 și sâmbătă între 10:00-11:00. Tarifele pentru elevi sunt de 180 lei pentru 4 ședințe și 350 lei pentru 8 ședințe, cu grupe de maximum 10 persoane. Înscrierile se fac la recepția bazinului, situat pe Str. Maior Spirescu, nr. 5, Târgoviște.",
    researchNotes:
      "Cursuri copii și adulți, program copii: Mar-Joi 17:00-18:00, Sâmbătă 10:00-11:00, tarife elevi: 180 lei (4 ședințe), 350 lei (8 ședințe), grupe max 10 persoane, bazin Str. Maior Spirescu nr. 5",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "17:00-18:00" },
      { day: "Joi", time: "17:00-18:00" },
      { day: "Sâmbătă", time: "10:00-11:00" },
    ],
    pricing: [
      { type: "per_class", amount: 45, currency: "RON" }, // 180/4
      { type: "per_semester", amount: 350, currency: "RON" }, // 8 sessions
    ],
  }),

  createClubFromResearch({
    name: "DOLPHINS Târgoviște",
    sportType: "inot",
    city: "Târgoviște",
    district: "N/A",
    address: "Complexul Turistic de Natație, Târgoviște",
    phone: "+40 761 592 256",
    website: "https://inot-targoviste.ro/",
    description:
      "DOLPHINS Târgoviște organizează cursuri de înot pentru copii în cadrul Complexului Turistic de Natație Târgoviște. Grupele sunt formate în funcție de vârstă și nivel de pregătire (începători, semi-avansați, avansați și performanță). Copiii sunt evaluați și integrați în grupe cu nivel și vârstă similare.",
    researchNotes:
      "Complexul Turistic de Natație, grupe: vârstă și nivel (începători, semi-avansați, avansați, performanță), evaluare și integrare grupe similare, antrenori: Nedelcu Răzvan (0761 592 256), Croitoru Bogdan (0721 141 146)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CSS Târgoviște - Secția de Atletism",
    sportType: "atletism",
    city: "Târgoviște",
    district: "N/A",
    address: "Strada Maior Spirescu, Târgoviște",
    phone: "+40 245 215 099",
    email: "css.targoviste@yahoo.com",
    website: "https://www.csstargoviste.ro/",
    description:
      "Clubul Sportiv Școlar Târgoviște cu secție de atletism pentru copii și juniori. CSS Târgoviște este singura unitate de învățământ cu program sportiv suplimentar din județul Dâmbovița, având o istorie de aproape o jumătate de secol. În prezent, peste 650 de elevi sportivi își desfășoară activitatea la cele șapte secții ale clubului.",
    researchNotes: "Parte din CSS Târgoviște, peste 650 elevi sportivi la 7 secții",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSU Târgoviște - Secția de Atletism",
    sportType: "atletism",
    city: "Târgoviște",
    district: "N/A",
    address: "Universitatea Valahia, Târgoviște",
    website: "https://csu.valahia.ro/",
    description:
      "Clubul Sportiv Universitar Târgoviște cu secție de atletism pentru copii și juniori. CSU Târgoviște este afiliat Universității Valahia din Târgoviște și oferă programe sportive pentru tineri în diverse discipline, inclusiv baschet, handbal, atletism și volei.",
    researchNotes: "Parte din CSU Târgoviște, afiliat Universitatea Valahia",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CSS Târgoviște - Secția de Judo",
    sportType: "judo",
    city: "Târgoviște",
    district: "N/A",
    address: "Strada Maior Spirescu, Târgoviște",
    phone: "+40 245 215 099",
    email: "css.targoviste@yahoo.com",
    website: "https://www.csstargoviste.ro/",
    description:
      "Clubul Sportiv Școlar Târgoviște cu secție de judo pentru copii și juniori. CSS Târgoviște este singura unitate de învățământ cu program sportiv suplimentar din județul Dâmbovița, având o istorie de aproape o jumătate de secol. În prezent, peste 650 de elevi sportivi își desfășoară activitatea la cele șapte secții ale clubului.",
    researchNotes: "Parte din CSS Târgoviște, peste 650 elevi sportivi la 7 secții",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Străjerii Târgoviște - Arte Marțiale",
    sportType: "karate",
    city: "Târgoviște",
    district: "N/A",
    address: "Târgoviște",
    description:
      "Asociația Club Sportiv Străjerii Târgoviște oferă activități sportive pentru copii în diverse discipline, inclusiv arte marțiale, gimnastică și judo. Clubul oferă programe variate pentru dezvoltarea abilităților în arte marțiale.",
    researchNotes: "Arte marțiale, gimnastică, judo pentru copii",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== LUPTE (Wrestling) ==========
  createClubFromResearch({
    name: "CSS Târgoviște - Secția de Lupte",
    sportType: "lupte",
    city: "Târgoviște",
    district: "N/A",
    address: "Strada Maior Spirescu, Târgoviște",
    phone: "+40 245 215 099",
    email: "css.targoviste@yahoo.com",
    website: "https://www.csstargoviste.ro/",
    description:
      "Clubul Sportiv Școlar Târgoviște cu secție de lupte pentru copii și juniori. CSS Târgoviște este singura unitate de învățământ cu program sportiv suplimentar din județul Dâmbovița, având o istorie de aproape o jumătate de secol. În prezent, peste 650 de elevi sportivi își desfășoară activitatea la cele șapte secții ale clubului.",
    researchNotes: "Parte din CSS Târgoviște, peste 650 elevi sportivi la 7 secții",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS DE MASĂ (Table Tennis) ==========
  createClubFromResearch({
    name: "Palatul Copiilor Târgoviște - Tenis de Masă",
    sportType: "tenis-de-masa",
    city: "Târgoviște",
    district: "N/A",
    address: "Târgoviște",
    description:
      "Palatul Copiilor Târgoviște oferă activități sportive pentru copii și tineri, inclusiv tenis de masă. Palatul Copiilor oferă o gamă variată de activități sportive pentru dezvoltarea abilităților fizice ale copiilor.",
    researchNotes: "Parte din Palatul Copiilor, activități sportive pentru copii și tineri",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport clubs) ==========
  createClubFromResearch({
    name: "CSS Târgoviște",
    sportType: "multi-sport",
    city: "Târgoviște",
    district: "N/A",
    address: "Strada Maior Spirescu, Târgoviște",
    phone: "+40 245 215 099",
    email: "css.targoviste@yahoo.com",
    website: "https://www.csstargoviste.ro/",
    description:
      "Clubul Sportiv Școlar Târgoviște este singura unitate de învățământ cu program sportiv suplimentar din județul Dâmbovița, având o istorie de aproape o jumătate de secol. Acesta selecționează, pregătește și promovează elevii în activitatea sportivă de performanță. În prezent, peste 650 de elevi sportivi își desfășoară activitatea la cele șapte secții ale clubului: atletism, baschet, handbal, fotbal, judo, lupte și volei. Clubul organizează și cursuri de înot pentru copii și adulți, cu program dedicat pentru copii (marți și joi 17:00-18:00, sâmbătă 10:00-11:00).",
    researchNotes:
      "Istorie ~50 ani, singura unitate cu program sportiv suplimentar județul Dâmbovița, peste 650 elevi sportivi la 7 secții: atletism, baschet, handbal, fotbal, judo, lupte, volei, cursuri înot (copii și adulți), selecție, pregătire și promovare elevii în activitatea sportivă de performanță",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Târgoviște",
    sportType: "multi-sport",
    city: "Târgoviște",
    district: "N/A",
    address: "Strada Revoluției nr. 8B, Târgoviște",
    phone: "+40 245 640 644",
    email: "csm_tgv@yahoo.com",
    website: "https://www.csmtargoviste.ro/",
    description:
      "Clubul Sportiv Municipal Târgoviște este principalul reper sportiv extra fotbal din Târgoviște și județul Dâmbovița. Clubul are secții de volei feminin și baschet feminin. Echipa de volei feminin a clubului a câștigat Cupa României și Supercupa României în 2016. Echipa de baschet feminin a clubului a câștigat 12 titluri în Liga Națională și 9 Cupe ale României. Clubul oferă programe de pregătire pentru copii și juniori în diverse discipline.",
    researchNotes:
      "Principalul reper sportiv extra fotbal Târgoviște și județul Dâmbovița, secții: volei feminin (Cupa României și Supercupa României 2016), baschet feminin (12 titluri Liga Națională, 9 Cupe României)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSU Târgoviște",
    sportType: "multi-sport",
    city: "Târgoviște",
    district: "N/A",
    address: "Universitatea Valahia, Târgoviște",
    website: "https://csu.valahia.ro/",
    description:
      "Clubul Sportiv Universitar Târgoviște este afiliat Universității Valahia din Târgoviște și oferă programe sportive pentru tineri în diverse discipline, inclusiv baschet, handbal, atletism și volei. Clubul oferă oportunități valoroase pentru tinerii din regiune de a se implica în activități sportive.",
    researchNotes:
      "Afiliat Universitatea Valahia, secții: baschet, handbal, atletism, volei, programe sportive pentru tineri",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Târgoviște",
    sportType: "multi-sport",
    city: "Târgoviște",
    district: "N/A",
    address: "Târgoviște",
    description:
      "Palatul Copiilor Târgoviște oferă o gamă variată de activități sportive pentru copii și tineri. Printre cercurile sportive disponibile se numără: karate WUKF, natație, tenis de masă, orientare turistică și karting. Aceste activități sunt menite să dezvolte abilitățile fizice și să promoveze un stil de viață sănătos pentru copii.",
    researchNotes:
      "Activități sportive: karate WUKF, natație, tenis de masă, orientare turistică, karting, dezvoltare abilități fizice și promovare stil de viață sănătos",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

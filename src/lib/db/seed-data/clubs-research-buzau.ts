/**
 * Clubs Research Data - Buzău
 *
 * Date reale colectate prin research public pentru cluburi sportive din Buzău.
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
 * Total cluburi identificate: 21
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
 * Research Data - Cluburi Sportive Buzău
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_BUZAU: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "FCM Buzău - Academia de Fotbal",
    sportType: "fotbal",
    city: "Buzău",
    district: "N/A",
    address: "Buzău",
    website: "https://asfcbuzau.ro/",
    description:
      "FCM Buzău (Asociația Sportivă Fotbal Club Buzău) are o academie de fotbal dedicată formării tinerilor jucători. Clubul dispune de 9 grupe de copii și juniori, acoperind categoriile de vârstă de la U10 până la U19. Colectivul tehnic este format dintr-un manager al academiei, un coordonator și 14 antrenori, toți deținând licențe UEFA A sau B, care se ocupă de pregătirea a peste 200 de tineri fotbaliști. Există un parteneriat cu clubul Estera Țifești pentru grupele U13, U15 și echipa feminină din Liga 3.",
    researchNotes:
      "9 grupe U10-U19, peste 200 tineri fotbaliști, 14 antrenori cu licențe UEFA A/B, parteneriat Estera Țifești",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "SCM Gloria Buzău - Secția de Fotbal",
    sportType: "fotbal",
    city: "Buzău",
    district: "N/A",
    address: "Buzău",
    website: "https://scm-gloriabuzau.ro/",
    description:
      "SCM Gloria Buzău (Clubul Sportiv Municipal Buzău) cu secție de fotbal pentru copii și juniori. Centrul de Copii și Juniori al clubului include multiple grupe de vârstă, de la U9 până la U19, sub îndrumarea unor antrenori calificați cu licențe PRO, A, B și C.",
    researchNotes: "Grupe U9-U19, antrenori cu licențe PRO, A, B, C",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSS Buzău - Secția de Baschet",
    sportType: "baschet",
    city: "Buzău",
    district: "N/A",
    address: "Strada Spiru Haret nr. 8B, Buzău",
    phone: "+40 238 725 558",
    email: "office@cssbuzau.ro",
    website: "https://www.cssbuzau.ro/",
    description:
      "Clubul Sportiv Școlar Buzău cu secție de baschet masculin pentru copii și juniori. În anul școlar 2019-2020, activitatea s-a desfășurat cu 54 de grupe, însumând 698 de copii, structurate pe trei niveluri de instruire: performanță (7 grupe, 68 elevi), avansați (13 grupe, 158 elevi) și începători (34 grupe, 472 elevi).",
    researchNotes:
      "Parte din CSS Buzău, înființat 1957, 698 copii înscriși (2019-2020), 54 grupe pe 3 niveluri",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CSS Buzău - Secția de Volei",
    sportType: "volei",
    city: "Buzău",
    district: "N/A",
    address: "Strada Spiru Haret nr. 8B, Buzău",
    phone: "+40 238 725 558",
    email: "office@cssbuzau.ro",
    website: "https://www.cssbuzau.ro/",
    description:
      "Clubul Sportiv Școlar Buzău cu secție de volei (feminin și masculin) pentru copii și juniori. Antrenamentele se desfășoară în sala de jocuri de pe Str. Spiru Haret, nr. 8B. În anul școlar 2019-2020, activitatea s-a desfășurat cu 54 de grupe, însumând 698 de copii.",
    researchNotes:
      "Parte din CSS Buzău, volei feminin și masculin, sala de jocuri Str. Spiru Haret 8B",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSS Buzău - Secția de Handbal",
    sportType: "handbal",
    city: "Buzău",
    district: "N/A",
    address: "Strada Spiru Haret nr. 8B, Buzău",
    phone: "+40 238 725 558",
    email: "office@cssbuzau.ro",
    website: "https://www.cssbuzau.ro/",
    description:
      "Clubul Sportiv Școlar Buzău cu secție de handbal feminin pentru copii și juniori. Antrenamentele se desfășoară în sala de jocuri de pe Str. Spiru Haret, nr. 8B. În anul școlar 2019-2020, activitatea s-a desfășurat cu 54 de grupe, însumând 698 de copii.",
    researchNotes: "Parte din CSS Buzău, handbal feminin, sala de jocuri Str. Spiru Haret 8B",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "SCM Gloria Buzău - Secția de Handbal",
    sportType: "handbal",
    city: "Buzău",
    district: "N/A",
    address: "Buzău",
    website: "https://scm-gloriabuzau.ro/",
    description:
      "SCM Gloria Buzău cu secție de handbal pentru copii și juniori. Clubul dispune de echipe de baby-handbal (6-8 ani), mini-handbal (10-11 ani) și junioare 4, antrenate de profesori specializați. De asemenea, există echipe de juniori 1, 2 și 3, care au obținut rezultate notabile în competițiile naționale. Handbalul feminin este considerat cea mai bună echipă a clubului.",
    researchNotes:
      "Echipe baby-handbal (6-8 ani), mini-handbal (10-11 ani), junioare 4, juniori 1-3, rezultate notabile naționale",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "Kids Tennis Club Buzău",
    sportType: "tenis",
    city: "Buzău",
    district: "N/A",
    address: "Buzău",
    website: "https://teniskids.ro/",
    description:
      "Kids Tennis Club Buzău este un club modern de tenis care dispune de două terenuri acoperite și încălzite, trei terenuri în aer liber, vestiare și sală de fitness. Antrenorii calificați oferă cursuri adaptate pentru copii de toate vârstele.",
    researchNotes:
      "Club modern, 2 terenuri acoperite și încălzite, 3 terenuri aer liber, vestiare, sală fitness",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Club Tenis Buzău",
    sportType: "tenis",
    city: "Buzău",
    district: "N/A",
    address: "Buzău",
    description:
      "Club Tenis Buzău oferă cursuri de tenis pentru copii de toate vârstele, începând de la 4 ani. Fiecare oră de tenis include învățare, activitate, distracție și siguranță, cu antrenamente personalizate în funcție de nevoile fiecărui copil.",
    researchNotes: "Cursuri pentru copii de la 4 ani, antrenamente personalizate",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS DE MASĂ (Table Tennis) ==========
  createClubFromResearch({
    name: "CSS Buzău - Secția de Tenis de Masă",
    sportType: "tenis-de-masa",
    city: "Buzău",
    district: "N/A",
    address: "Strada Spiru Haret nr. 8B, Buzău",
    phone: "+40 238 725 558",
    email: "office@cssbuzau.ro",
    website: "https://www.cssbuzau.ro/",
    description:
      "Clubul Sportiv Școlar Buzău cu secție de tenis de masă pentru copii și juniori. Antrenamentele se desfășoară în sala de jocuri de pe Str. Spiru Haret, nr. 8B. În anul școlar 2019-2020, activitatea s-a desfășurat cu 54 de grupe, însumând 698 de copii.",
    researchNotes: "Parte din CSS Buzău, sala de jocuri Str. Spiru Haret 8B",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "SCM Gloria Buzău - Secția de Tenis de Masă",
    sportType: "tenis-de-masa",
    city: "Buzău",
    district: "N/A",
    address: "Bulevardul Mareșal Alexandru Averescu nr. 10, Buzău",
    website: "https://scm-gloriabuzau.ro/",
    description:
      "SCM Gloria Buzău cu secție de tenis de masă pentru copii și juniori. Organizează selecții și antrenamente pentru copii cu vârste între 6 și 8 ani. Antrenamentele se desfășoară în sala de tenis situată pe B-dul Mareșal Alexandru Averescu nr. 10, în incinta Stadionului Gloria Buzău. Participarea este gratuită. Secția de tenis de masă a adus 223 de medalii, dintre care 56 de aur.",
    researchNotes:
      "Selecții pentru copii 6-8 ani, participare gratuită, rezultate: 223 medalii (56 aur)",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Offside Club Buzău - Cursuri de Înot",
    sportType: "inot",
    city: "Buzău",
    district: "Cartierul Broșteni",
    address: "Cartierul Broșteni, Buzău 120073",
    phone: "+40 722 729 683",
    website: "http://offsideclub.ro/",
    description:
      "Offside Club Buzău oferă cursuri de înot pentru copii cu vârste între 5 și 12 ani. Piscina exterioară este deschisă zilnic între orele 08:00 și 20:00. Clubul dispune și de terenuri de fotbal acoperite și facilități pentru tenis de picior. Abonamentele includ: o ședință pe săptămână (300 lei/lună), două ședințe pe săptămână (560 lei/lună), ședință individuală (85 lei).",
    researchNotes:
      "Copii 5-12 ani, piscină exterioară 08:00-20:00, terenuri fotbal acoperite, prețuri: 300 RON/lună (1x/săptămână), 560 RON/lună (2x/săptămână), 85 RON/ședință individuală",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12],
    schedule: [
      { day: "Luni", time: "08:00-20:00" },
      { day: "Marți", time: "08:00-20:00" },
      { day: "Miercuri", time: "08:00-20:00" },
      { day: "Joi", time: "08:00-20:00" },
      { day: "Vineri", time: "08:00-20:00" },
      { day: "Sâmbătă", time: "08:00-20:00" },
      { day: "Duminică", time: "08:00-20:00" },
    ],
    pricing: [
      { type: "monthly", amount: 300, currency: "RON" },
      { type: "monthly", amount: 560, currency: "RON" },
      { type: "per_class", amount: 85, currency: "RON" },
    ],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "CSS Buzău - Secția de Gimnastică Artistică",
    sportType: "gimnastica",
    city: "Buzău",
    district: "N/A",
    address: "Strada Spiru Haret nr. 8B, Buzău",
    phone: "+40 238 725 558",
    email: "office@cssbuzau.ro",
    website: "https://www.cssbuzau.ro/",
    description:
      "Clubul Sportiv Școlar Buzău cu secție de gimnastică artistică (feminină și masculină) pentru copii și juniori. CSS Buzău a organizat și participat la diverse competiții naționale, obținând rezultate remarcabile. În anul școlar 2019-2020, activitatea s-a desfășurat cu 54 de grupe, însumând 698 de copii.",
    researchNotes:
      "Parte din CSS Buzău, gimnastică artistică feminină și masculină, rezultate remarcabile la competiții naționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CSS Buzău - Secția de Atletism",
    sportType: "atletism",
    city: "Buzău",
    district: "N/A",
    address: "Strada Spiru Haret nr. 8B, Buzău",
    phone: "+40 238 725 558",
    email: "office@cssbuzau.ro",
    website: "https://www.cssbuzau.ro/",
    description:
      "Clubul Sportiv Școlar Buzău cu secție de atletism pentru copii și juniori. În anul școlar 2019-2020, activitatea s-a desfășurat cu 54 de grupe, însumând 698 de copii, structurate pe trei niveluri de instruire.",
    researchNotes: "Parte din CSS Buzău, 698 copii înscriși (2019-2020)",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "SCM Gloria Buzău - Secția de Atletism",
    sportType: "atletism",
    city: "Buzău",
    district: "N/A",
    address: "Buzău",
    website: "https://scm-gloriabuzau.ro/",
    description:
      "SCM Gloria Buzău cu secție de atletism 'Sportul pentru Toți', sub coordonarea campioanei olimpice Paula Ivan. Secția organizează activități sportive menite să atragă un număr cât mai mare de copii către practicarea sportului și adoptarea unui stil de viață sănătos.",
    researchNotes:
      "Secția 'Sportul pentru Toți', coordonator Paula Ivan (campioană olimpică), promovare stil de viață sănătos",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CSS Buzău - Secția de Lupte",
    sportType: "lupte",
    city: "Buzău",
    district: "N/A",
    address: "Strada Spiru Haret nr. 8B, Buzău",
    phone: "+40 238 725 558",
    email: "office@cssbuzau.ro",
    website: "https://www.cssbuzau.ro/",
    description:
      "Clubul Sportiv Școlar Buzău cu secție de lupte pentru copii și juniori. Antrenamentele se desfășoară în sala de jocuri de pe Str. Spiru Haret, nr. 8B. În anul școlar 2019-2020, activitatea s-a desfășurat cu 54 de grupe, însumând 698 de copii.",
    researchNotes: "Parte din CSS Buzău, sala de jocuri Str. Spiru Haret 8B",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "SCM Gloria Buzău - Secția de Box",
    sportType: "box",
    city: "Buzău",
    district: "N/A",
    address: "Buzău",
    website: "https://scm-gloriabuzau.ro/",
    description:
      "SCM Gloria Buzău cu secție de box dedicată tinerilor sportivi, unde aceștia sunt antrenați de cadre specializate pentru a participa la competiții naționale și internaționale.",
    researchNotes: "Secție pentru tineri, competiții naționale și internaționale",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "SCM Gloria Buzău - Secția de Karate",
    sportType: "karate",
    city: "Buzău",
    district: "N/A",
    address: "Buzău",
    website: "https://scm-gloriabuzau.ro/",
    description:
      "SCM Gloria Buzău cu secție de karate pentru copii și juniori interesați de arte marțiale. Clubul oferă antrenamente specializate pentru dezvoltarea abilităților tehnice și disciplinei.",
    researchNotes:
      "Antrenamente pentru copii și juniori, dezvoltare abilități tehnice și disciplină",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "After School Karate Buzău",
    sportType: "karate",
    city: "Buzău",
    district: "N/A",
    address: "Aleea Sporturilor 51A, Buzău",
    description:
      "After School Karate SRL oferă cursuri de karate pentru copii. Programul de funcționare este de luni până vineri, între orele 11:00 și 21:00.",
    researchNotes: "Program L-V 11:00-21:00, Aleea Sporturilor 51A",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "11:00-21:00" },
      { day: "Marți", time: "11:00-21:00" },
      { day: "Miercuri", time: "11:00-21:00" },
      { day: "Joi", time: "11:00-21:00" },
      { day: "Vineri", time: "11:00-21:00" },
    ],
  }),

  createClubFromResearch({
    name: "Karate Kuro Sasori Buzău",
    sportType: "karate",
    city: "Buzău",
    district: "N/A",
    address: "Buzău",
    description:
      "Karate Kuro Sasori Buzău, fondat în octombrie 2022, a crescut rapid, având peste 100 de copii înscriși în patru centre active: Buzău, Brădeanu, Smeeni și Pietroasele. Clubul promovează disciplina și integrarea prin arte marțiale.",
    researchNotes:
      "Fondat octombrie 2022, peste 100 copii înscriși, 4 centre active (Buzău, Brădeanu, Smeeni, Pietroasele), promovare disciplină și integrare",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "CS Vibe Dance Studio Buzău",
    sportType: "dans",
    city: "Buzău",
    district: "N/A",
    address: "Buzău",
    description:
      "Asociația Club Sportiv Vibe Dance Studio Buzău are o tradiție de succes în dansul sportiv, cu perechi care au reprezentat Buzăul în Lotul Național al României. Oferă cursuri de dans pentru copii, pregătindu-i pentru competiții naționale și internaționale.",
    researchNotes:
      "Tradiție de succes, perechi în Lotul Național România, competiții naționale și internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== RUGBY ==========
  createClubFromResearch({
    name: "SCM Gloria Buzău - Secția de Rugby",
    sportType: "rugby",
    city: "Buzău",
    district: "N/A",
    address: "Buzău",
    website: "https://scm-gloriabuzau.ro/",
    description:
      "SCM Gloria Buzău cu secție de rugby pentru copii și juniori. Secția include echipe de juniori U14 și U18, cu aproximativ 50 de sportivi, care participă la turnee zonale și naționale.",
    researchNotes: "Echipe U14 și U18, circa 50 sportivi, participare turnee zonale și naționale",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport clubs) ==========
  createClubFromResearch({
    name: "CSS Buzău",
    sportType: "multi-sport",
    city: "Buzău",
    district: "N/A",
    address: "Strada Spiru Haret nr. 8B, Buzău",
    phone: "+40 238 725 558",
    email: "office@cssbuzau.ro",
    website: "https://www.cssbuzau.ro/",
    description:
      "Clubul Sportiv Școlar Buzău, înființat în 1957 ca Școală Sportivă, a devenit unitate independentă în 1971 sub denumirea de Școala Sportivă de Elevi Buzău, iar din 1978 poartă numele actual. Oferă pregătire în șapte discipline sportive: atletism, baschet, gimnastică artistică (feminină și masculină), handbal, lupte, tenis de masă și volei (feminin și masculin). În anul școlar 2019-2020, activitatea s-a desfășurat cu 54 de grupe, însumând 698 de copii, structurate pe trei niveluri de instruire: performanță (7 grupe, 68 elevi), avansați (13 grupe, 158 elevi) și începători (34 grupe, 472 elevi).",
    researchNotes:
      "Înființat 1957, 7 discipline sportive, 698 copii înscriși (2019-2020), 54 grupe pe 3 niveluri, sala de jocuri Str. Spiru Haret 8B",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "SCM Gloria Buzău",
    sportType: "multi-sport",
    city: "Buzău",
    district: "N/A",
    address: "Bulevardul Mareșal Alexandru Averescu nr. 10, Buzău",
    website: "https://scm-gloriabuzau.ro/",
    description:
      "SCM Gloria Buzău (Clubul Sportiv Municipal Buzău), înființat în urmă cu 41 de ani, este o instituție sportivă de prestigiu din oraș. Are în componență 10 secții sportive, dintre care 5 sunt active: atletism, box, lupte, modelism și tenis de masă. Clubul oferă multiple secții pentru copii și juniori: fotbal (U9-U19), handbal (baby, mini, junioare, juniori), rugby (U14, U18), atletism ('Sportul pentru Toți'), box, tenis de masă, șah, karate, modelism. Clubul este finanțat din subvenții de la bugetul de stat și venituri proprii.",
    researchNotes:
      "Înființat acum 41 de ani, 10 secții sportive (5 active), multiple secții pentru copii, finanțare buget de stat și venituri proprii",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Buzău",
    sportType: "multi-sport",
    city: "Buzău",
    district: "N/A",
    address: "Bulevardul Nicolae Bălcescu nr. 20, Buzău",
    website: "https://www.palatulcopiilorbuzau.ro/",
    description:
      "Palatul Copiilor Buzău oferă o gamă variată de activități sportive gratuite pentru copii și tineri cu vârste între 5 și 19 ani. Participarea la aceste cercuri este gratuită, iar programul este flexibil, stabilit de comun acord cu părinții și elevii. Înscrierile se desfășoară în luna septembrie, fie la sediul central din Bulevardul Nicolae Bălcescu nr. 20, fie la cluburile din județ: Beceni, Berca, Nehoiu, Pătârlagele, Pogoanele și Râmnicu Sărat. Pentru unele cercuri sportive, este necesară o adeverință medicală care să ateste că elevul este 'apt pentru efort fizic'.",
    researchNotes:
      "Activități sportive gratuite, copii 5-19 ani, program flexibil, înscrieri septembrie, multiple locații în județ, adeverință medicală necesară pentru unele cercuri",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

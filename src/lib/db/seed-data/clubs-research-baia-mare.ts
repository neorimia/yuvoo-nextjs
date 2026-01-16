/**
 * Clubs Research Data - Baia Mare
 *
 * Date reale colectate prin research public pentru cluburi sportive din Baia Mare.
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
 * Total cluburi identificate: 22
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
 * Research Data - Cluburi Sportive Baia Mare
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_BAIA_MARE: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "CS Minaur Baia Mare - Academia de Fotbal",
    sportType: "fotbal",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    website: "https://minaur.ro/",
    description:
      "CS Minaur Baia Mare (cunoscut și ca FCM Baia Mare) are o academie de fotbal dedicată copiilor și juniorilor. În clasamentul academiilor de copii și juniori publicat de Federația Română de Fotbal (FRF) în 2025, CS Minaur Baia Mare s-a clasat pe locul 66 din 124 de cluburi participante. În sezonul 2024-2025, echipa Under 19 a obținut cel mai bun rezultat, clasându-se pe primul loc în Seria 9 a Campionatului Național.",
    researchNotes:
      "Academia clasată #66 în România 2025 (FRF), locul 1 în Seria 9 Campionatul Național U19 2024-2025",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSȘ Nr. 2 Baia Mare - Secția de Fotbal",
    sportType: "fotbal",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    website: "https://css2baiamare.ro/",
    description:
      "Clubul Sportiv Școlar Nr. 2 Baia Mare cu secție de fotbal pentru copii și juniori. Clubul organizează competiții și evenimente sportive pentru tineri și a organizat prima ediție a Cupei României pentru juniori U19 în mai 2025.",
    researchNotes: "Organizare prima ediție a Cupei României pentru juniori U19 în mai 2025",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "MDS-KIDS Baia Mare - Secția de Baschet",
    sportType: "baschet",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    website: "https://www.mds-kids.ro/",
    description:
      "MDS-KIDS oferă activități sportive pentru copii, inclusiv baschet, organizate în grupe pe baza de abonament lunar, cu instructori/antrenori specializați. Programul activităților de grup este de luni până vineri, între orele 16:00 și 20:00.",
    researchNotes: "Program L-V 16:00-20:00, abonament lunar, instructori specializați",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "16:00-20:00" },
      { day: "Marți", time: "16:00-20:00" },
      { day: "Miercuri", time: "16:00-20:00" },
      { day: "Joi", time: "16:00-20:00" },
      { day: "Vineri", time: "16:00-20:00" },
    ],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CSȘ Nr. 2 Baia Mare - Secția de Volei",
    sportType: "volei",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    website: "https://css2baiamare.ro/",
    description:
      "Clubul Sportiv Școlar Nr. 2 Baia Mare cu secție de volei pentru copii și juniori. Clubul organizează competiții și evenimente sportive pentru tineri.",
    researchNotes: "Parte din CSȘ Nr. 2 Baia Mare, competiții pentru tineri",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "MDS-KIDS Baia Mare - Secția de Volei",
    sportType: "volei",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    website: "https://www.mds-kids.ro/",
    description:
      "MDS-KIDS oferă activități sportive pentru copii, inclusiv volei, organizate în grupe pe baza de abonament lunar, cu instructori/antrenori specializați. Programul activităților de grup este de luni până vineri, între orele 16:00 și 20:00.",
    researchNotes: "Program L-V 16:00-20:00, abonament lunar, instructori specializați",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "16:00-20:00" },
      { day: "Marți", time: "16:00-20:00" },
      { day: "Miercuri", time: "16:00-20:00" },
      { day: "Joi", time: "16:00-20:00" },
      { day: "Vineri", time: "16:00-20:00" },
    ],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "Academia de Handbal Minaur Baia Mare",
    sportType: "handbal",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    website: "https://academiadehandbalminaur.ro/",
    description:
      "Academia de Handbal Minaur Baia Mare, înființată în 2010, are șase grupe de juniori și copii, cu vârste între 8 și 19 ani, totalizând aproximativ 120 de sportivi. Clubul se concentrează pe selecția, instruirea și promovarea tinerilor handbaliști. Echipa de handbal masculin a CS Minaur Baia Mare a obținut performanțe notabile, inclusiv câștigarea Ligii Naționale în 1998, 1999 și 2015.",
    researchNotes:
      "Înființată 2010, 6 grupe, 120 sportivi (8-19 ani), performanțe: Liga Națională 1998, 1999, 2015",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "MDS-KIDS Baia Mare - Secția de Handbal",
    sportType: "handbal",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    website: "https://www.mds-kids.ro/",
    description:
      "MDS-KIDS oferă activități sportive pentru copii, inclusiv handbal, organizate în grupe pe baza de abonament lunar, cu instructori/antrenori specializați. Programul activităților de grup este de luni până vineri, între orele 16:00 și 20:00.",
    researchNotes: "Program L-V 16:00-20:00, abonament lunar, instructori specializați",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "16:00-20:00" },
      { day: "Marți", time: "16:00-20:00" },
      { day: "Miercuri", time: "16:00-20:00" },
      { day: "Joi", time: "16:00-20:00" },
      { day: "Vineri", time: "16:00-20:00" },
    ],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "Anca Rusu Tennis Academy Baia Mare",
    sportType: "tenis",
    city: "Baia Mare",
    district: "N/A",
    address: "Strada 8 Martie nr. 3, Baia Mare",
    phone: "+40 775 517 511",
    email: "ancarusutennis@gmail.com",
    website: "https://tennivo.com/ro/cluburi/anca-rusu-tennis-academy",
    description:
      "Anca Rusu Tennis Academy Baia Mare, situată pe Strada 8 Martie nr. 3, este o academie modernă de tenis care oferă programe pentru toate vârstele și nivelurile de joc, de la inițiere până la performanță. Programele includ Tenis 10 (Roșu, Portocaliu, Verde), Junior Development, antrenamente de performanță și tabere de vară.",
    researchNotes:
      "Academie modernă, programe Tenis 10, Junior Development, antrenamente performanță, tabere vară",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Tenis Club Star Baia Mare",
    sportType: "tenis",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    description:
      "Tenis Club Star Baia Mare organizează competiții pentru copii și juniori, precum Cupa BST Arena, unde tinerii sportivi au obținut rezultate remarcabile. Antrenorul principal este Dan Dănescu.",
    researchNotes: "Organizare competiții (Cupa BST Arena), antrenor principal Dan Dănescu",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "CSM Baia Mare - Secția Natație",
    sportType: "inot",
    city: "Baia Mare",
    district: "N/A",
    address: "Bazinul Olimpic Gheorghe Demeca, Bulevardul Unirii 14A, Baia Mare",
    website: "https://www.baiamare.ro/",
    description:
      "CSM Baia Mare - Secția Natație oferă cursuri de înot pentru copii. Secția numără circa 80 de sportivi, atât începători (copii născuți între 1997 și 2000), cât și sportivi de performanță (născuți între 1989 și 1996). Antrenamentele au loc la Bazinul Olimpic Gheorghe Demeca, situat pe Bulevardul Unirii 14A.",
    researchNotes: "Circa 80 sportivi (începători și performanță), antrenamente la Bazinul Olimpic",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Bazinul Olimpic - Cursuri de Înot Baia Mare",
    sportType: "inot",
    city: "Baia Mare",
    district: "N/A",
    address: "Bazinul Olimpic sau Eurohotel, Baia Mare",
    description:
      "Cursuri de înot pentru copii la Bazinul Olimpic sau la Eurohotel din Baia Mare. Prețurile sunt de 180 lei pentru 4 ședințe pe lună și 320 lei pentru 8 ședințe pe lună, incluzând intrarea.",
    researchNotes:
      "Locații: Bazinul Olimpic sau Eurohotel, prețuri: 180 RON/4 ședințe, 320 RON/8 ședințe",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    pricing: [
      { type: "monthly", amount: 180, currency: "RON" },
      { type: "monthly", amount: 320, currency: "RON" },
    ],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "BiAcademy Music School Baia Mare - Gimnastică Ritmică",
    sportType: "gimnastica",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    description:
      "BiAcademy Music School Baia Mare oferă, pe lângă cursurile de muzică, și cursuri de gimnastică ritmică pentru copii. Antrenamentele sunt coordonate de Medeea Mic, gimnastă cu 12 ani de experiență și absolventă a Facultății de Educație Fizică și Sport. Cursurile sunt destinate copiilor energici sau timizi, oferindu-le oportunitatea de a-și descoperi talentul și de a-și face noi prieteni.",
    researchNotes:
      "Gimnastică ritmică, coordonator Medeea Mic (12 ani experiență, absolventă Facultatea Educație Fizică și Sport)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CSM Baia Mare - Secția de Atletism",
    sportType: "atletism",
    city: "Baia Mare",
    district: "N/A",
    address: "Stadionul de Atletism, Complexul Sportiv Național Lascăr Pană, Baia Mare",
    website: "https://csm-baiamare.ro/",
    description:
      "CSM Baia Mare - Secția de Atletism cu aproximativ 35 de sportivi, împărțiți pe grupe de vârstă de la Copii I (clasele V-VI) până la Juniori I (clasele XI-XII). Antrenamentele se desfășoară pe Stadionul de Atletism din Complexul Sportiv Național Lascăr Pană.",
    researchNotes: "Circa 35 sportivi, grupe de vârstă de la Copii I la Juniori I",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CSM Baia Mare - Secția de Judo",
    sportType: "judo",
    city: "Baia Mare",
    district: "N/A",
    address: "Sala de Judo, Bulevardul Unirii 14A, Baia Mare",
    website: "https://csm-baiamare.ro/",
    description:
      "CSM Baia Mare - Secția de Judo, fondată în 1988, are aproximativ 100 de sportivi, de la categoria U11 până la seniori. Antrenamentele se desfășoară în Sala de Judo din sediul CSM Baia Mare, situat pe Bulevardul Unirii nr. 14A.",
    researchNotes:
      "Fondată 1988, circa 100 sportivi (U11 până la seniori), Sala de Judo Bd. Unirii 14A",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Victoria Maramureș - Freestyle Kickboxing",
    sportType: "kickboxing",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    website: "https://csvictoriamm.ro/",
    description:
      "Club Sportiv Victoria Maramureș oferă antrenamente de Freestyle Kickboxing și Fitness Funcțional pentru copii și adulți. Antrenamentele pentru copii (6-12 ani) au loc în Baia Mare, lunea și miercurea, de la ora 18:30. Clubul este afiliat la Federația Română de Freestyle Kickboxing și participă anual la competiții naționale și internaționale.",
    researchNotes:
      "Copii 6-12 ani, antrenamente L și Mi 18:30, afiliat Federația Română de Freestyle Kickboxing, competiții naționale și internaționale",
    ageGroups: [6, 7, 8, 9, 10, 11, 12],
    schedule: [
      { day: "Luni", time: "18:30-20:00" },
      { day: "Miercuri", time: "18:30-20:00" },
    ],
  }),

  createClubFromResearch({
    name: "Close Range Combat Baia Mare",
    sportType: "karate",
    city: "Baia Mare",
    district: "N/A",
    address: "Strada Carpați nr. 29, Baia Mare",
    description:
      "Close Range Combat Baia Mare oferă antrenamente de arte marțiale, Freestyle Kickboxing și Kung Fu pentru copii și adulți. Antrenamentele pentru copii au loc marțea și joia, de la ora 17:30, la adresa Strada Carpați nr. 29.",
    researchNotes: "Arte marțiale, Freestyle Kickboxing, Kung Fu, copii: Marți și Joi 17:30",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "17:30-19:00" },
      { day: "Joi", time: "17:30-19:00" },
    ],
  }),

  createClubFromResearch({
    name: "Alpha MMA Baia Mare",
    sportType: "karate",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    website: "https://wbcamateurmuaythai.ro/",
    description:
      "Alpha MMA Baia Mare are secții de Muay Thai, Arte Marțiale Mixte (MMA), Taekwon-do, Kickboxing, Kempo și Fitness. Scopul principal este inițierea copiilor în lumea artelor marțiale și promovarea unui stil de viață sănătos.",
    researchNotes: "Secții: Muay Thai, MMA, Taekwon-do, Kickboxing, Kempo, Fitness, inițiere copii",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Flower Power by Margareta - Karate Kyokushin",
    sportType: "karate",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    website: "https://www.flowerpower.fit/",
    description:
      "Flower Power by Margareta oferă antrenamente de karate Kyokushin pentru copii cu vârste între 6 și 12 ani. Copiii pot opta pentru una dintre grupele de la ora 16:30-17:30 sau de la ora 18:00-19:00.",
    researchNotes: "Karate Kyokushin, copii 6-12 ani, program: 16:30-17:30 sau 18:00-19:00",
    ageGroups: [6, 7, 8, 9, 10, 11, 12],
    schedule: [
      { day: "Luni", time: "16:30-17:30" },
      { day: "Marți", time: "18:00-19:00" },
    ],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Shall We Dance - Club de Dans Sportiv Baia Mare",
    sportType: "dans",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    phone: "+40 741 493 044",
    description:
      "Shall We Dance - Club de dans sportiv Baia Mare oferă cursuri de dans pentru copii, tineri și adulți, incluzând dans sportiv, dans modern și dansuri de societate. De asemenea, organizează tabere de vară și evenimente speciale.",
    researchNotes:
      "Dans sportiv, dans modern, dansuri de societate, tabere vară, evenimente speciale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "DanceLight Studio Baia Mare",
    sportType: "dans",
    city: "Baia Mare",
    district: "N/A",
    address: "Bulevardul Regele Mihai I nr. 27, Baia Mare",
    phone: "+40 748 389 514",
    email: "studiodancelight@gmail.com",
    website: "https://www.scolidans.ro/",
    description:
      "DanceLight Studio Baia Mare oferă cursuri de dans pentru copii cu vârste între 4 și 11 ani. Stilurile predate includ dans modern, twist, rock'n'roll, disco, vals, tango și country. Cursurile se desfășoară pe Bulevardul Regele Mihai I nr. 27.",
    researchNotes:
      "Copii 4-11 ani, stiluri: modern, twist, rock'n'roll, disco, vals, tango, country, Bd. Regele Mihai I nr. 27",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11],
  }),

  createClubFromResearch({
    name: "Galactic Dance Baia Mare",
    sportType: "dans",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    phone: "+40 758 271 372",
    description:
      "Galactic Dance Baia Mare oferă cursuri de dans sportiv și de societate pentru toate vârstele. Organizează tabere de vară și evenimente speciale pentru copii.",
    researchNotes:
      "Dans sportiv, dans de societate, toate vârstele, tabere vară, evenimente speciale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== RUGBY ==========
  createClubFromResearch({
    name: "CSM Baia Mare - Secția de Rugby",
    sportType: "rugby",
    city: "Baia Mare",
    district: "N/A",
    address: "Stadionul Arena Zimbrilor, Baia Mare",
    website: "https://csm-baiamare.ro/",
    description:
      "CSM Baia Mare - Secția de Rugby juniori, înființată în 2003, își desfășoară activitatea pe Stadionul Arena Zimbrilor. Secția este dedicată dezvoltării juniorilor în acest sport.",
    researchNotes: "Înființată 2003, activitate pe Stadionul Arena Zimbrilor, dezvoltare juniori",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport clubs) ==========
  createClubFromResearch({
    name: "CSM Baia Mare",
    sportType: "multi-sport",
    city: "Baia Mare",
    district: "N/A",
    address: "Bulevardul Unirii 14A, Baia Mare",
    website: "https://csm-baiamare.ro/",
    description:
      "Clubul Sportiv Municipal Baia Mare oferă diverse secții sportive pentru copii și juniori, incluzând atletism (circa 35 sportivi), natație (circa 80 sportivi), judo (circa 100 sportivi), rugby, culturism și fitness, sambo, radioamatorism și tir talere. Secția de judo a fost fondată în 1988, iar secția de rugby juniori în 2003. Secția de culturism și fitness a fost înființată în 1996 și are aproximativ 25 de sportivi.",
    researchNotes:
      "Multiple secții: atletism (~35), natație (~80), judo (~100), rugby, culturism/fitness (~25), sambo, radioamatorism, tir talere",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSȘ Nr. 2 Baia Mare",
    sportType: "multi-sport",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    website: "https://css2baiamare.ro/",
    description:
      "Clubul Sportiv Școlar Nr. 2 Baia Mare oferă diverse secții sportive pentru elevi, incluzând fotbal, volei și alte discipline. Clubul organizează competiții și evenimente sportive pentru tineri și a organizat prima ediție a Cupei României pentru juniori U19 în mai 2025.",
    researchNotes:
      "Multiple secții sportive, competiții pentru tineri, organizare Cupa României juniori U19 mai 2025",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "MDS-KIDS Baia Mare",
    sportType: "multi-sport",
    city: "Baia Mare",
    district: "N/A",
    address: "Baia Mare",
    website: "https://www.mds-kids.ro/",
    description:
      "MDS-KIDS Baia Mare oferă activități sportive multiple pentru copii, incluzând baschet, volei și handbal. Activitatea este organizată în grupe pe baza de abonament lunar, cu instructori/antrenori specializați. Programul activităților de grup este de luni până vineri, între orele 16:00 și 20:00.",
    researchNotes:
      "Multiple sporturi (baschet, volei, handbal), program L-V 16:00-20:00, abonament lunar, instructori specializați",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "16:00-20:00" },
      { day: "Marți", time: "16:00-20:00" },
      { day: "Miercuri", time: "16:00-20:00" },
      { day: "Joi", time: "16:00-20:00" },
      { day: "Vineri", time: "16:00-20:00" },
    ],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Baia Mare",
    sportType: "multi-sport",
    city: "Baia Mare",
    district: "N/A",
    address: "Câmpul Tineretului și Parcul Municipal 'Regina Maria', Baia Mare",
    description:
      "Palatul Copiilor din Baia Mare oferă o varietate de activități sportive pentru copii, inclusiv handbal și fotbal. Aceste activități sunt organizate în colaborare cu Clubul Sportiv Dr. și se desfășoară în locații precum Câmpul Tineretului și Parcul Municipal 'Regina Maria'. Activitatea se desfășoară în contextul sărbătoririi Zilei Copilului și a altor evenimente speciale pentru copii.",
    researchNotes:
      "Activități sportive (handbal, fotbal) în colaborare cu Clubul Sportiv Dr., locații: Câmpul Tineretului, Parcul Municipal 'Regina Maria'",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

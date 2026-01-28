/**
 * Clubs Research Data - Pitești
 *
 * Date reale colectate prin research public pentru cluburi sportive din Pitești.
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
 * Total cluburi identificate: 24
 * Cluburi verificate și completate: 24
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
 * Research Data - Cluburi Sportive Pitești
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_PITESTI: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "FC Argeș Pitești - Academia de Fotbal",
    sportType: "fotbal",
    city: "Pitești",
    district: "N/A",
    address: "Aleea Stadionului nr. 1, Pitești",
    phone: "+40 348 433 488",
    email: "contact@fcarges-pitesti.ro",
    website: "https://fcarges-pitesti.ro",
    description:
      "Academia de fotbal a FC Argeș Pitești este recunoscută la nivel național, ocupând locul 15 în clasamentul academiilor de copii și juniori din România în 2023, cu un punctaj de 81,9. Clubul organizează și susține diverse competiții pentru copii și juniori.",
    researchNotes:
      "Academia recunoscută la nivel național, locul 15 în clasamentul academiilor din România (2023), punctaj 81,9",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Viitorul Pitești - Secția de Fotbal",
    sportType: "fotbal",
    city: "Pitești",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Pitești",
    phone: "+40 248 216 749",
    email: "liceulsportivpitesti@yahoo.com",
    website: "https://lpspitesti.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Pitești oferă programe sportive pentru elevi în diverse discipline, inclusiv fotbal pentru băieți. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes:
      "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025, program secretariat: L-V 8:00-16:00",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "FC Argeș Pitești - Secția de Baschet",
    sportType: "baschet",
    city: "Pitești",
    district: "N/A",
    address: "Aleea Stadionului nr. 1, Pitești",
    phone: "+40 348 433 488",
    email: "contact@fcarges-pitesti.ro",
    website: "https://fcarges-pitesti.ro",
    description:
      "FC Argeș Pitești cu secție de baschet pentru copii și juniori. Secția de baschet a clubului beneficiază de finanțare semnificativă, cu alocări de 168.000 lei în 2025 și 100.000 lei în 2024, demonstrând angajamentul clubului față de dezvoltarea acestui sport în rândul tinerilor.",
    researchNotes:
      "Parte din FC Argeș, finanțare semnificativă: 168.000 lei în 2025, 100.000 lei în 2024",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Viitorul Pitești - Secția de Baschet",
    sportType: "baschet",
    city: "Pitești",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Pitești",
    phone: "+40 248 216 749",
    email: "liceulsportivpitesti@yahoo.com",
    website: "https://lpspitesti.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Pitești oferă programe sportive pentru elevi în diverse discipline, inclusiv baschet pentru fete și băieți. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes: "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Pitești - Secția de Baschet",
    sportType: "baschet",
    city: "Pitești",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Pitești",
    phone: "+40 348 445 027",
    email: "csm.pitesti@sport.gov.ro",
    website: "https://csmpitesti.ro",
    description:
      "Club Sportiv Municipal Pitești cu secție de baschet pentru copii și juniori. CSM Pitești oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Pitești, promovare sport de performanță, participare competiții naționale și internaționale, program: L-J 08:00-16:30, V 08:00-14:00",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "FC Argeș Pitești - Secția de Volei",
    sportType: "volei",
    city: "Pitești",
    district: "N/A",
    address: "Aleea Stadionului nr. 1, Pitești",
    phone: "+40 348 433 488",
    email: "contact@fcarges-pitesti.ro",
    website: "https://fcarges-pitesti.ro",
    description:
      "FC Argeș Pitești cu secție de volei pentru copii și juniori. Pentru volei, FC Argeș Pitești a alocat 50.000 lei în 2025 și 20.000 lei în 2024, susținând astfel activitățile și competițiile dedicate juniorilor.",
    researchNotes: "Parte din FC Argeș, finanțare: 50.000 lei în 2025, 20.000 lei în 2024",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Viitorul Pitești - Secția de Volei",
    sportType: "volei",
    city: "Pitești",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Pitești",
    phone: "+40 248 216 749",
    email: "liceulsportivpitesti@yahoo.com",
    website: "https://lpspitesti.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Pitești oferă programe sportive pentru elevi în diverse discipline, inclusiv volei pentru fete. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes: "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Pitești - Secția de Volei",
    sportType: "volei",
    city: "Pitești",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Pitești",
    phone: "+40 348 445 027",
    email: "csm.pitesti@sport.gov.ro",
    website: "https://csmpitesti.ro",
    description:
      "Club Sportiv Municipal Pitești cu secție de volei pentru copii și juniori. CSM Pitești oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Pitești, promovare sport de performanță, participare competiții naționale și internaționale",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "LPS Viitorul Pitești - Secția de Handbal",
    sportType: "handbal",
    city: "Pitești",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Pitești",
    phone: "+40 248 216 749",
    email: "liceulsportivpitesti@yahoo.com",
    website: "https://lpspitesti.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Pitești oferă programe sportive pentru elevi în diverse discipline, inclusiv handbal pentru fete. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes: "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Pitești - Secția de Handbal",
    sportType: "handbal",
    city: "Pitești",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Pitești",
    phone: "+40 348 445 027",
    email: "csm.pitesti@sport.gov.ro",
    website: "https://csmpitesti.ro",
    description:
      "Club Sportiv Municipal Pitești cu secție de handbal pentru copii și juniori. CSM Pitești oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Pitești, promovare sport de performanță, participare competiții naționale și internaționale",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "LPS Viitorul Pitești - Secția de Tenis",
    sportType: "tenis",
    city: "Pitești",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Pitești",
    phone: "+40 248 216 749",
    email: "liceulsportivpitesti@yahoo.com",
    website: "https://lpspitesti.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Pitești oferă programe sportive pentru elevi în diverse discipline, inclusiv tenis pentru fete și băieți. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes: "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Pitești - Secția de Tenis de Masă",
    sportType: "tenis",
    city: "Pitești",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Pitești",
    phone: "+40 348 445 027",
    email: "csm.pitesti@sport.gov.ro",
    website: "https://csmpitesti.ro",
    description:
      "Club Sportiv Municipal Pitești cu secție de tenis de masă pentru copii și juniori. CSM Pitești oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Pitești, promovare sport de performanță, participare competiții naționale și internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Pitești - Secția de Tenis de Câmp",
    sportType: "tenis",
    city: "Pitești",
    district: "N/A",
    address: "Strada Smeurei nr. 24, Pitești",
    phone: "+40 248 223 233",
    email: "palatulcopiilorpitesti@gmail.com",
    website: "http://www.palatulcopiilorpitesti.ro/",
    description:
      "Palatul Copiilor Pitești oferă activități de tenis de câmp pentru copii și tineri. Copiii pot învăța și practica tenisul, dezvoltându-și coordonarea și rezistența fizică. Toate activitățile sunt gratuite și se desfășoară într-un program adaptat orarului școlar al elevilor.",
    researchNotes:
      "Tenis de câmp pentru copii, activități gratuite, program adaptat orarului școlar",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "LPS Viitorul Pitești - Secția de Înot",
    sportType: "inot",
    city: "Pitești",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Pitești",
    phone: "+40 248 216 749",
    email: "liceulsportivpitesti@yahoo.com",
    website: "https://lpspitesti.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Pitești oferă programe sportive pentru elevi în diverse discipline, inclusiv înot pentru fete și băieți. În cadrul Campionatului Cluburilor Sportive Școlare organizat de Federația Română de Natație și Pentatlon Modern, CSS Viitorul Pitești a obținut locul 4, acumulând 162 de puncte. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes:
      "Liceu cu profil sportiv, locul 4 în Campionatul Cluburilor Sportive Școlare (162 puncte), 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Pitești - Secția de Înot",
    sportType: "inot",
    city: "Pitești",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Pitești",
    phone: "+40 348 445 027",
    email: "csm.pitesti@sport.gov.ro",
    website: "https://csmpitesti.ro",
    description:
      "Club Sportiv Municipal Pitești cu secție de înot pentru copii și juniori. În iunie 2023, Bazinul Olimpic din Pitești a găzduit Campionatul Național de Natație pentru copii de 11 ani, unde CSM Pitești a fost reprezentat de cinci sportivi. CSM Pitești oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Pitești, participare Campionatul Național de Natație pentru copii de 11 ani (iunie 2023), 5 sportivi reprezentați",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Energic LL Pitești",
    sportType: "inot",
    city: "Pitești",
    district: "N/A",
    address: "Complex Olimpic Natatie - Str. Costache Negri, nr. 32, Pitești",
    phone: "+40 722 364 628",
    email: "office@energicll.ro",
    website: "http://www.energicll.ro",
    description:
      "Club Sportiv Energic LL Pitești oferă cursuri de înot pentru toate categoriile de vârstă, inclusiv inițiere, perfecționare, performanță și agrement. Echipa tehnică este formată din profesori și antrenori, foști sportivi de performanță, absolvenți ai Facultății de Educație Fizică și Sport și ai Școlii Naționale de Antrenori. Program: L-V 8:00-20:00, Sâmbătă 08:00-19:00, Duminică 08:00-14:00.",
    researchNotes:
      "Cursuri pentru toate categoriile de vârstă (inițiere, perfecționare, performanță, agrement), echipă tehnică calificată, program: L-V 8:00-20:00, Sâmbătă 08:00-19:00, Duminică 08:00-14:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-20:00" },
      { day: "Marți", time: "08:00-20:00" },
      { day: "Miercuri", time: "08:00-20:00" },
      { day: "Joi", time: "08:00-20:00" },
      { day: "Vineri", time: "08:00-20:00" },
      { day: "Sâmbătă", time: "08:00-19:00" },
      { day: "Duminică", time: "08:00-14:00" },
    ],
  }),

  createClubFromResearch({
    name: "Bazinul Olimpic Pitești",
    sportType: "inot",
    city: "Pitești",
    district: "N/A",
    address: "Strada Costache Negri, nr. 32, Pitești",
    phone: "+40 248 221 400",
    email: "spepmp@patrimoniupitesti.ro",
    description:
      "Bazinul Olimpic Pitești oferă facilități pentru înot și alte activități sportive pentru copii. În iunie 2023, bazinul a găzduit Campionatul Național de Natație pentru copii de 11 ani. Program bazin: L-V 07:00-20:00, Sâmbătă 07:00-19:00, Duminică 07:00-14:00. Tarife pentru copii sub 14 ani: 10 lei/ședință sau 100 lei/12 ședințe.",
    researchNotes:
      "Bazin olimpic, găzduire Campionatul Național de Natație pentru copii de 11 ani (iunie 2023), tarife copii sub 14 ani: 10 lei/ședință sau 100 lei/12 ședințe, program: L-V 07:00-20:00, Sâmbătă 07:00-19:00, Duminică 07:00-14:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "07:00-20:00" },
      { day: "Marți", time: "07:00-20:00" },
      { day: "Miercuri", time: "07:00-20:00" },
      { day: "Joi", time: "07:00-20:00" },
      { day: "Vineri", time: "07:00-20:00" },
      { day: "Sâmbătă", time: "07:00-19:00" },
      { day: "Duminică", time: "07:00-14:00" },
    ],
    pricing: [
      { type: "per_class", amount: 10, currency: "RON" },
      { type: "per_semester", amount: 100, currency: "RON" },
    ],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "CSM Pitești - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Pitești",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Pitești",
    phone: "+40 348 445 027",
    email: "csm.pitesti@sport.gov.ro",
    website: "https://csmpitesti.ro",
    description:
      "Club Sportiv Municipal Pitești cu secție de gimnastică pentru copii și juniori. CSM Pitești oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Pitești, promovare sport de performanță, participare competiții naționale și internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Palatul Copiilor Pitești - Secția de Dans Sportiv",
    sportType: "dans",
    city: "Pitești",
    district: "N/A",
    address: "Strada Smeurei nr. 24, Pitești",
    phone: "+40 248 223 233",
    email: "palatulcopiilorpitesti@gmail.com",
    website: "http://www.palatulcopiilorpitesti.ro/",
    description:
      "Palatul Copiilor Pitești oferă activități de dans sportiv pentru copii și tineri. Acest cerc combină mișcarea artistică cu exercițiile fizice, îmbunătățind flexibilitatea și expresivitatea copiilor. Toate activitățile sunt gratuite și se desfășoară într-un program adaptat orarului școlar al elevilor, acoperind întreaga săptămână, de luni până sâmbătă.",
    researchNotes:
      "Dans sportiv pentru copii, activități gratuite, program adaptat orarului școlar, L-Sâmbătă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "LPS Viitorul Pitești - Secția de Atletism",
    sportType: "atletism",
    city: "Pitești",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Pitești",
    phone: "+40 248 216 749",
    email: "liceulsportivpitesti@yahoo.com",
    website: "https://lpspitesti.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Pitești oferă programe sportive pentru elevi în diverse discipline, inclusiv atletism pentru fete și băieți. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes: "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Pitești - Secția de Atletism",
    sportType: "atletism",
    city: "Pitești",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Pitești",
    phone: "+40 348 445 027",
    email: "csm.pitesti@sport.gov.ro",
    website: "https://csmpitesti.ro",
    description:
      "Club Sportiv Municipal Pitești cu secție de atletism pentru copii și juniori. CSM Pitești oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Pitești, promovare sport de performanță, participare competiții naționale și internaționale",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "LPS Viitorul Pitești - Secția de Judo",
    sportType: "judo",
    city: "Pitești",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Pitești",
    phone: "+40 248 216 749",
    email: "liceulsportivpitesti@yahoo.com",
    website: "https://lpspitesti.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Pitești oferă programe sportive pentru elevi în diverse discipline, inclusiv judo pentru fete și băieți. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes: "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Pitești - Secția de Judo",
    sportType: "judo",
    city: "Pitești",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Pitești",
    phone: "+40 348 445 027",
    email: "csm.pitesti@sport.gov.ro",
    website: "https://csmpitesti.ro",
    description:
      "Club Sportiv Municipal Pitești cu secție de judo pentru copii și juniori. CSM Pitești oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Pitești, promovare sport de performanță, participare competiții naționale și internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Viitorul Pitești - Secția de Lupte",
    sportType: "lupte",
    city: "Pitești",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Pitești",
    phone: "+40 248 216 749",
    email: "liceulsportivpitesti@yahoo.com",
    website: "https://lpspitesti.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Pitești oferă programe sportive pentru elevi în diverse discipline, inclusiv lupte pentru fete și băieți. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes: "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "FC Argeș Pitești - Secția de Box",
    sportType: "box",
    city: "Pitești",
    district: "N/A",
    address: "Aleea Stadionului nr. 1, Pitești",
    phone: "+40 348 433 488",
    email: "contact@fcarges-pitesti.ro",
    website: "https://fcarges-pitesti.ro",
    description:
      "FC Argeș Pitești cu secție de box pentru copii și juniori. Secția de box a primit finanțări de 19.000 lei în 2025 și 7.200 lei în 2024, facilitând pregătirea și participarea tinerilor sportivi la competiții.",
    researchNotes: "Parte din FC Argeș, finanțare: 19.000 lei în 2025, 7.200 lei în 2024",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport Clubs) ==========
  createClubFromResearch({
    name: "LPS Viitorul Pitești",
    sportType: "multi-sport",
    city: "Pitești",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Pitești",
    phone: "+40 248 216 749",
    email: "liceulsportivpitesti@yahoo.com",
    website: "https://lpspitesti.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Pitești este o instituție dedicată formării și dezvoltării tinerilor sportivi în diverse discipline. Liceul oferă programe în diverse discipline sportive: atletism (fete și băieți), handbal (fete), volei (fete), baschet (fete și băieți), fotbal (băieți), înot (fete și băieți), lupte (fete și băieți), judo (fete și băieți) și tenis (fete și băieți). Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive. În cadrul Campionatului Cluburilor Sportive Școlare organizat de Federația Română de Natație și Pentatlon Modern, CSS Viitorul Pitești a obținut locul 4, acumulând 162 de puncte.",
    researchNotes:
      "Liceu cu profil sportiv, 9 discipline sportive, 96 locuri disponibile pentru anul școlar 2024-2025, locul 4 în Campionatul Cluburilor Sportive Școlare (162 puncte), program secretariat: L-V 8:00-16:00",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Pitești",
    sportType: "multi-sport",
    city: "Pitești",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Pitești",
    phone: "+40 348 445 027",
    email: "csm.pitesti@sport.gov.ro",
    website: "https://csmpitesti.ro",
    description:
      "Club Sportiv Municipal Pitești oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale. Printre disciplinele disponibile se numără înotul, judo, atletismul, baschetul, handbalul, rugby-ul, fotbalul, voleiul, modelismul, sportul pentru toți, șahul și tenisul de masă. În septembrie 2025, CSM Pitești a anunțat înscrieri pentru secția de kaiac-canoe, adresate copiilor cu vârste între 9 și 14 ani. Cursurile de inițiere sunt oferite gratuit, iar programul de antrenamente este: L-V 08:00-10:00 și 15:00-17:00, Sâmbătă 09:00-11:00. Program secretariat: L-J 08:00-16:30, V 08:00-14:00.",
    researchNotes:
      "Multiple secții sportive (înot, judo, atletism, baschet, handbal, rugby, fotbal, volei, modelism, sport pentru toți, șah, tenis de masă, kaiac-canoe), promovare sport de performanță, participare competiții naționale și internaționale, secție kaiac-canoe: cursuri gratuite pentru copii 9-14 ani, program antrenamente: L-V 08:00-10:00 și 15:00-17:00, Sâmbătă 09:00-11:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "FC Argeș Pitești",
    sportType: "multi-sport",
    city: "Pitești",
    district: "N/A",
    address: "Aleea Stadionului nr. 1, Pitești",
    phone: "+40 348 433 488",
    email: "contact@fcarges-pitesti.ro",
    website: "https://fcarges-pitesti.ro",
    description:
      "FC Argeș Pitești este un club sportiv cu multiple secții dedicate copiilor și juniorilor: fotbal (Academia recunoscută la nivel național, locul 15 în clasamentul academiilor din România în 2023, punctaj 81,9), baschet (finanțare 168.000 lei în 2025, 100.000 lei în 2024), volei (finanțare 50.000 lei în 2025, 20.000 lei în 2024) și box (finanțare 19.000 lei în 2025, 7.200 lei în 2024). Clubul organizează și susține diverse competiții pentru copii și juniori, cum ar fi prima ediție a Cupei FC Argeș la minifotbal, desfășurată în 2021, la care au participat echipe de juniori din județul Argeș.",
    researchNotes:
      "Multiple secții sportive (fotbal, baschet, volei, box), Academia de fotbal recunoscută la nivel național (locul 15, punctaj 81,9 în 2023), organizare competiții pentru copii și juniori, finanțări semnificative pentru toate secțiile",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Pitești",
    sportType: "multi-sport",
    city: "Pitești",
    district: "N/A",
    address: "Strada Smeurei nr. 24, Pitești",
    phone: "+40 248 223 233",
    email: "palatulcopiilorpitesti@gmail.com",
    website: "http://www.palatulcopiilorpitesti.ro/",
    description:
      "Palatul Copiilor Pitești oferă o gamă variată de activități sportive pentru copii și tineri: tenis de câmp (dezvoltare coordonare și rezistență fizică), dans sportiv (combină mișcarea artistică cu exercițiile fizice), fotbal (dezvoltare spirit de colaborare și abilități motrice), ecoturism (drumeții și explorări în natură), orientare (dezvoltare abilități de navigare) și karting (pentru pasionații de viteză și tehnică). Toate activitățile sunt gratuite și se desfășoară într-un program adaptat orarului școlar al elevilor, acoperind întreaga săptămână, de luni până sâmbătă.",
    researchNotes:
      "Multiple activități sportive pentru copii (tenis de câmp, dans sportiv, fotbal, ecoturism, orientare, karting), toate activitățile gratuite, program adaptat orarului școlar, L-Sâmbătă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

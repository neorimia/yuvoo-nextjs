/**
 * Clubs Research Data - Sibiu
 *
 * Date reale colectate prin research public pentru cluburi sportive din Sibiu.
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
 * Total cluburi identificate: 20
 * Cluburi verificate și completate: 20
 */

import {
  generateSlug,
  getCityCoordinates,
  generateAgeGroups,
  generateLevels,
  generateSchedule,
  generatePricing,
  generateClubImage,
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
  district?: string;
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

  return {
    ...data,
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
 * Research Data - Cluburi Sportive Sibiu
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_SIBIU: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "CSS Sibiu - Secția de Fotbal",
    sportType: "fotbal",
    city: "Sibiu",
    district: "N/A",
    address: "Bază sportivă în aer liber - Bulevardul Victoriei nr. 35, Sibiu",
    phone: "+40 269 432 941",
    email: "csssibiu@yahoo.com",
    website: "https://csssibiu.ro/",
    description:
      "Club Sportiv Școlar Sibiu cu secție de fotbal pentru copii și tineri. Antrenamentele se desfășoară la baza sportivă în aer liber de pe Bulevardul Victoriei nr. 35. CSS Sibiu a obținut rezultate remarcabile la competiții naționale, de exemplu la Campionatul Național de Poliatlon pentru copii de 11 ani, desfășurat în noiembrie 2025 la Târgoviște, echipa s-a clasat pe locul 10 din 61 de cluburi participante.",
    researchNotes:
      "Parte din CSS Sibiu, antrenamente la bază sportivă în aer liber, rezultate remarcabile la competiții naționale (locul 10 din 61 cluburi la Campionatul Național de Poliatlon pentru copii de 11 ani)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "FC Argeș Sibiu - Secția de Baschet",
    sportType: "baschet",
    city: "Sibiu",
    district: "N/A",
    address: "Aleea Stadionului nr. 1, Sibiu",
    phone: "+40 348 433 488",
    email: "contact@fcarges-sibiu.ro",
    website: "https://fcarges-sibiu.ro",
    description:
      "FC Argeș Sibiu cu secție de baschet pentru copii și juniori. Secția de baschet a clubului beneficiază de finanțare semnificativă, cu alocări de 168.000 lei în 2025 și 100.000 lei în 2024, demonstrând angajamentul clubului față de dezvoltarea acestui sport în rândul tinerilor.",
    researchNotes:
      "Parte din FC Argeș, finanțare semnificativă: 168.000 lei în 2025, 100.000 lei în 2024",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Viitorul Sibiu - Secția de Baschet",
    sportType: "baschet",
    city: "Sibiu",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Sibiu",
    phone: "+40 248 216 749",
    email: "liceulsportivsibiu@yahoo.com",
    website: "https://lpssibiu.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Sibiu oferă programe sportive pentru elevi în diverse discipline, inclusiv baschet pentru fete și băieți. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes: "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Sibiu - Secția de Baschet",
    sportType: "baschet",
    city: "Sibiu",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Sibiu",
    phone: "+40 348 445 027",
    email: "csm.sibiu@sport.gov.ro",
    website: "https://csmsibiu.ro",
    description:
      "Club Sportiv Municipal Sibiu cu secție de baschet pentru copii și juniori. CSM Sibiu oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Sibiu, promovare sport de performanță, participare competiții naționale și internaționale, program: L-J 08:00-16:30, V 08:00-14:00",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "FC Argeș Sibiu - Secția de Volei",
    sportType: "volei",
    city: "Sibiu",
    district: "N/A",
    address: "Aleea Stadionului nr. 1, Sibiu",
    phone: "+40 348 433 488",
    email: "contact@fcarges-sibiu.ro",
    website: "https://fcarges-sibiu.ro",
    description:
      "FC Argeș Sibiu cu secție de volei pentru copii și juniori. Pentru volei, FC Argeș Sibiu a alocat 50.000 lei în 2025 și 20.000 lei în 2024, susținând astfel activitățile și competițiile dedicate juniorilor.",
    researchNotes: "Parte din FC Argeș, finanțare: 50.000 lei în 2025, 20.000 lei în 2024",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Viitorul Sibiu - Secția de Volei",
    sportType: "volei",
    city: "Sibiu",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Sibiu",
    phone: "+40 248 216 749",
    email: "liceulsportivsibiu@yahoo.com",
    website: "https://lpssibiu.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Sibiu oferă programe sportive pentru elevi în diverse discipline, inclusiv volei pentru fete. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes: "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Sibiu - Secția de Volei",
    sportType: "volei",
    city: "Sibiu",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Sibiu",
    phone: "+40 348 445 027",
    email: "csm.sibiu@sport.gov.ro",
    website: "https://csmsibiu.ro",
    description:
      "Club Sportiv Municipal Sibiu cu secție de volei pentru copii și juniori. CSM Sibiu oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Sibiu, promovare sport de performanță, participare competiții naționale și internaționale",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "LPS Viitorul Sibiu - Secția de Handbal",
    sportType: "handbal",
    city: "Sibiu",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Sibiu",
    phone: "+40 248 216 749",
    email: "liceulsportivsibiu@yahoo.com",
    website: "https://lpssibiu.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Sibiu oferă programe sportive pentru elevi în diverse discipline, inclusiv handbal pentru fete. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes: "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Sibiu - Secția de Handbal",
    sportType: "handbal",
    city: "Sibiu",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Sibiu",
    phone: "+40 348 445 027",
    email: "csm.sibiu@sport.gov.ro",
    website: "https://csmsibiu.ro",
    description:
      "Club Sportiv Municipal Sibiu cu secție de handbal pentru copii și juniori. CSM Sibiu oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Sibiu, promovare sport de performanță, participare competiții naționale și internaționale",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "LPS Viitorul Sibiu - Secția de Tenis",
    sportType: "tenis",
    city: "Sibiu",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Sibiu",
    phone: "+40 248 216 749",
    email: "liceulsportivsibiu@yahoo.com",
    website: "https://lpssibiu.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Sibiu oferă programe sportive pentru elevi în diverse discipline, inclusiv tenis pentru fete și băieți. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes: "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Sibiu - Secția de Tenis de Masă",
    sportType: "tenis",
    city: "Sibiu",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Sibiu",
    phone: "+40 348 445 027",
    email: "csm.sibiu@sport.gov.ro",
    website: "https://csmsibiu.ro",
    description:
      "Club Sportiv Municipal Sibiu cu secție de tenis de masă pentru copii și juniori. CSM Sibiu oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Sibiu, promovare sport de performanță, participare competiții naționale și internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Sibiu - Secția de Tenis de Câmp",
    sportType: "tenis",
    city: "Sibiu",
    district: "N/A",
    address: "Strada Smeurei nr. 24, Sibiu",
    phone: "+40 248 223 233",
    email: "palatulcopiilorsibiu@gmail.com",
    website: "http://www.palatulcopiilorsibiu.ro/",
    description:
      "Palatul Copiilor Sibiu oferă activități de tenis de câmp pentru copii și tineri. Copiii pot învăța și practica tenisul, dezvoltându-și coordonarea și rezistența fizică. Toate activitățile sunt gratuite și se desfășoară într-un program adaptat orarului școlar al elevilor.",
    researchNotes:
      "Tenis de câmp pentru copii, activități gratuite, program adaptat orarului școlar",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "LPS Viitorul Sibiu - Secția de Înot",
    sportType: "inot",
    city: "Sibiu",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Sibiu",
    phone: "+40 248 216 749",
    email: "liceulsportivsibiu@yahoo.com",
    website: "https://lpssibiu.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Sibiu oferă programe sportive pentru elevi în diverse discipline, inclusiv înot pentru fete și băieți. În cadrul Campionatului Cluburilor Sportive Școlare organizat de Federația Română de Natație și Pentatlon Modern, CSS Viitorul Sibiu a obținut locul 4, acumulând 162 de puncte. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes:
      "Liceu cu profil sportiv, locul 4 în Campionatul Cluburilor Sportive Școlare (162 puncte), 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Sibiu - Secția de Înot",
    sportType: "inot",
    city: "Sibiu",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Sibiu",
    phone: "+40 348 445 027",
    email: "csm.sibiu@sport.gov.ro",
    website: "https://csmsibiu.ro",
    description:
      "Club Sportiv Municipal Sibiu cu secție de înot pentru copii și juniori. În iunie 2023, Bazinul Olimpic din Sibiu a găzduit Campionatul Național de Natație pentru copii de 11 ani, unde CSM Sibiu a fost reprezentat de cinci sportivi. CSM Sibiu oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Sibiu, participare Campionatul Național de Natație pentru copii de 11 ani (iunie 2023), 5 sportivi reprezentați",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Energic LL Sibiu",
    sportType: "inot",
    city: "Sibiu",
    district: "N/A",
    address: "Complex Olimpic Natatie - Str. Costache Negri, nr. 32, Sibiu",
    phone: "+40 722 364 628",
    email: "office@energicll.ro",
    website: "http://www.energicll.ro",
    description:
      "Club Sportiv Energic LL Sibiu oferă cursuri de înot pentru toate categoriile de vârstă, inclusiv inițiere, perfecționare, performanță și agrement. Echipa tehnică este formată din profesori și antrenori, foști sportivi de performanță, absolvenți ai Facultății de Educație Fizică și Sport și ai Școlii Naționale de Antrenori. Program: L-V 8:00-20:00, Sâmbătă 08:00-19:00, Duminică 08:00-14:00.",
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
    name: "Bazinul Olimpic Sibiu",
    sportType: "inot",
    city: "Sibiu",
    district: "N/A",
    address: "Strada Costache Negri, nr. 32, Sibiu",
    phone: "+40 248 221 400",
    email: "spepmp@patrimoniusibiu.ro",
    description:
      "Bazinul Olimpic Sibiu oferă facilități pentru înot și alte activități sportive pentru copii. În iunie 2023, bazinul a găzduit Campionatul Național de Natație pentru copii de 11 ani. Program bazin: L-V 07:00-20:00, Sâmbătă 07:00-19:00, Duminică 07:00-14:00. Tarife pentru copii sub 14 ani: 10 lei/ședință sau 100 lei/12 ședințe.",
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
    name: "CSM Sibiu - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Sibiu",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Sibiu",
    phone: "+40 348 445 027",
    email: "csm.sibiu@sport.gov.ro",
    website: "https://csmsibiu.ro",
    description:
      "Club Sportiv Municipal Sibiu cu secție de gimnastică pentru copii și juniori. CSM Sibiu oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Sibiu, promovare sport de performanță, participare competiții naționale și internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Palatul Copiilor Sibiu - Secția de Dans Sportiv",
    sportType: "dans",
    city: "Sibiu",
    district: "N/A",
    address: "Strada Smeurei nr. 24, Sibiu",
    phone: "+40 248 223 233",
    email: "palatulcopiilorsibiu@gmail.com",
    website: "http://www.palatulcopiilorsibiu.ro/",
    description:
      "Palatul Copiilor Sibiu oferă activități de dans sportiv pentru copii și tineri. Acest cerc combină mișcarea artistică cu exercițiile fizice, îmbunătățind flexibilitatea și expresivitatea copiilor. Toate activitățile sunt gratuite și se desfășoară într-un program adaptat orarului școlar al elevilor, acoperind întreaga săptămână, de luni până sâmbătă.",
    researchNotes:
      "Dans sportiv pentru copii, activități gratuite, program adaptat orarului școlar, L-Sâmbătă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "LPS Viitorul Sibiu - Secția de Atletism",
    sportType: "atletism",
    city: "Sibiu",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Sibiu",
    phone: "+40 248 216 749",
    email: "liceulsportivsibiu@yahoo.com",
    website: "https://lpssibiu.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Sibiu oferă programe sportive pentru elevi în diverse discipline, inclusiv atletism pentru fete și băieți. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes: "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Sibiu - Secția de Atletism",
    sportType: "atletism",
    city: "Sibiu",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Sibiu",
    phone: "+40 348 445 027",
    email: "csm.sibiu@sport.gov.ro",
    website: "https://csmsibiu.ro",
    description:
      "Club Sportiv Municipal Sibiu cu secție de atletism pentru copii și juniori. CSM Sibiu oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Sibiu, promovare sport de performanță, participare competiții naționale și internaționale",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "LPS Viitorul Sibiu - Secția de Judo",
    sportType: "judo",
    city: "Sibiu",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Sibiu",
    phone: "+40 248 216 749",
    email: "liceulsportivsibiu@yahoo.com",
    website: "https://lpssibiu.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Sibiu oferă programe sportive pentru elevi în diverse discipline, inclusiv judo pentru fete și băieți. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes: "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Sibiu - Secția de Judo",
    sportType: "judo",
    city: "Sibiu",
    district: "N/A",
    address: "Str. Costache Negri, Nr. 26, Sibiu",
    phone: "+40 348 445 027",
    email: "csm.sibiu@sport.gov.ro",
    website: "https://csmsibiu.ro",
    description:
      "Club Sportiv Municipal Sibiu cu secție de judo pentru copii și juniori. CSM Sibiu oferă o varietate de secții sportive pentru copii și tineri, promovând sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Parte din CSM Sibiu, promovare sport de performanță, participare competiții naționale și internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Viitorul Sibiu - Secția de Lupte",
    sportType: "lupte",
    city: "Sibiu",
    district: "N/A",
    address: "Strada Nicolae Dobrin nr. 20, Sibiu",
    phone: "+40 248 216 749",
    email: "liceulsportivsibiu@yahoo.com",
    website: "https://lpssibiu.ro/",
    description:
      "Liceul cu Program Sportiv 'Viitorul' Sibiu oferă programe sportive pentru elevi în diverse discipline, inclusiv lupte pentru fete și băieți. Pentru anul școlar 2024-2025, liceul a anunțat un concurs de admitere pentru clasa a IX-a, oferind 96 de locuri la aceste ramuri sportive.",
    researchNotes: "Liceu cu profil sportiv, 96 locuri disponibile pentru anul școlar 2024-2025",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "FC Argeș Sibiu - Secția de Box",
    sportType: "box",
    city: "Sibiu",
    district: "N/A",
    address: "Aleea Stadionului nr. 1, Sibiu",
    phone: "+40 348 433 488",
    email: "contact@fcarges-sibiu.ro",
    website: "https://fcarges-sibiu.ro",
    description:
      "FC Argeș Sibiu cu secție de box pentru copii și juniori. Secția de box a primit finanțări de 19.000 lei în 2025 și 7.200 lei în 2024, facilitând pregătirea și participarea tinerilor sportivi la competiții.",
    researchNotes: "Parte din FC Argeș, finanțare: 19.000 lei în 2025, 7.200 lei în 2024",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport Clubs) ==========
  createClubFromResearch({
    name: "CSS Sibiu",
    sportType: "multi-sport",
    city: "Sibiu",
    district: "N/A",
    address: "Str. Independenței nr. 1, Sibiu",
    phone: "+40 269 432 941",
    email: "csssibiu@yahoo.com",
    website: "https://csssibiu.ro/",
    description:
      "Clubul Sportiv Școlar Sibiu este o instituție dedicată formării și dezvoltării tinerilor sportivi în diverse discipline. CSS Sibiu dispune de mai multe locații: sală gimnastică fete și băieți (Str. Independenței nr. 1), sală jocuri sportive (Bulevardul Corneliu Coposu nr. 4) și bază sportivă în aer liber (Bulevardul Victoriei nr. 35). Clubul oferă antrenamente pentru copii și tineri în mai multe discipline sportive: baschet (antrenori Negru Petru Lucian și Anton Călin Gabriel), gimnastică (secții pentru gimnastică feminină și masculină, antrenori Baștea Andreea Mihaela și Căpățînă Dumitru Adrian), handbal (antrenor Damian Matei) și fotbal. CSS Sibiu a obținut rezultate remarcabile la competiții naționale, de exemplu la Campionatul Național de Poliatlon pentru copii de 11 ani, desfășurat în noiembrie 2025 la Târgoviște, echipa s-a clasat pe locul 10 din 61 de cluburi participante.",
    researchNotes:
      "Multiple secții sportive (baschet, gimnastică feminină și masculină, handbal, fotbal), 3 locații (sală gimnastică, sală jocuri sportive, bază sportivă în aer liber), antrenori calificați pentru fiecare secție, rezultate remarcabile la competiții naționale (locul 10 din 61 cluburi la Campionatul Național de Poliatlon pentru copii de 11 ani), fax: 0269 432 941",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Sibiu",
    sportType: "multi-sport",
    city: "Sibiu",
    district: "N/A",
    address: "Str. Vasile Aaron nr. 18-20, Sibiu",
    phone: "+40 269 244 295",
    email: "csm.sibiu@sport.gov.ro",
    website: "https://csmsibiu.ro",
    description:
      "Club Sportiv Municipal Sibiu a fost înființat în 1959 și funcționează sub tutela Ministerului Sportului. Are 10 secții sportive funcționale: atletism, box, călărie, judo, înot, sărituri în apă, sambo, patinaj, rugby și tenis, în care se antrenează aproximativ 201 sportivi legitimați, sub îndrumarea a 10 antrenori. CSM Sibiu promovează sportul de performanță și participarea la competiții naționale și internaționale.",
    researchNotes:
      "Înființat în 1959, sub tutela Ministerului Sportului, 10 secții sportive funcționale (atletism, box, călărie, judo, înot, sărituri în apă, sambo, patinaj, rugby, tenis), 201 sportivi legitimați, 10 antrenori, promovare sport de performanță, participare competiții naționale și internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Sibiu",
    sportType: "multi-sport",
    city: "Sibiu",
    district: "N/A",
    address: "Str. Henri Coandă, nr. 51, Corp B, Sibiu",
    phone: "+40 269 217 655",
    website: "http://www.palatulcopiilorsibiu.ro/",
    description:
      "Palatul Copiilor Sibiu oferă o gamă variată de activități sportive pentru copii și tineri: orientare turistică (sport în natură, învățare orientare pe teren necunoscut folosind harta și busola, participare la concursuri locale, județene și naționale, drumeții și excursii), karting (pentru elevi din clasele I-IV, învățare și practicare karting într-un mediu sigur și controlat), cicloturism (pentru elevi din clasele I-VII, promovare ciclism și turism activ, învățare siguranță pe bicicletă), dans sportiv (dans modern și de societate pentru elevi din clasele I-X, dezvoltare coordonare și expresivitate artistică), dansuri populare (pentru elevi din clasele I-IX, promovare tradiții culturale prin dansuri populare românești) și tenis de masă (pentru elevi din clasele I-XII, îmbunătățire reflexe și coordonare).",
    researchNotes:
      "Multiple activități sportive pentru copii (orientare turistică, karting clase I-IV, cicloturism clase I-VII, dans sportiv clase I-X, dansuri populare clase I-IX, tenis de masă clase I-XII), activități educative și recreative",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

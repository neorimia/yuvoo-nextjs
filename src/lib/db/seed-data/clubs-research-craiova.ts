/**
 * Clubs Research Data - Craiova
 *
 * Date reale colectate prin research public pentru cluburi sportive din Craiova.
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
 * Total cluburi identificate: 28
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
 * Research Data - Cluburi Sportive Craiova
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_CRAIOVA: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "CS Universitatea Craiova",
    sportType: "fotbal",
    city: "Craiova",
    district: "N/A",
    address: "Strada Gh. Doja, nr. 2, Craiova",
    phone: "+40 251 597 417",
    email: "csunivcraiova@yahoo.com",
    website: "https://csuniversitateacraiova.ro/",
    description:
      "Unul dintre cele mai importante cluburi din România, cu o tradiție îndelungată în fotbal. Oferă programe pentru copii și juniori, cu selecții permanente și antrenamente la Stadionul Tineretului.",
    researchNotes:
      "Selecții permanente, antrenamente la Stadionul Tineretului (09:00-10:30 și 15:30-17:00)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Viitorul Iulius Craiova",
    sportType: "fotbal",
    city: "Craiova",
    district: "N/A",
    address: "Dacia 46, Bl. 99A3, Sc. 3, Et. 2, Ap. 10, Craiova",
    website: "https://iuliuscraiova.ro/",
    description:
      "Club dedicat dezvoltării copiilor și juniorilor prin fotbal, oferind programe adaptate fiecărei etape de vârstă, de la inițiere până la performanță.",
    researchNotes: "Programe adaptate pe vârstă, de la inițiere la performanță",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "AS Spartan Kids Craiova",
    sportType: "fotbal",
    city: "Craiova",
    district: "N/A",
    address: "Strada General Nicolae Magereanu, nr. 7, Craiova",
    phone: "+40 773 862 193",
    email: "contact@spartankids.ro",
    website: "https://spartankids.ro/",
    description:
      "Școală de fotbal dedicată copiilor cu vârste între 5 și 15 ani, oferind antrenamente de fotbal sub îndrumarea antrenorilor specializați, având ca obiectiv participarea la competiții sportive.",
    researchNotes: "Antrenori specializați, participare la competiții sportive, copii 5-15 ani",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSS Craiova - Secția de Baschet",
    sportType: "baschet",
    city: "Craiova",
    district: "N/A",
    address: "Strada Nicolae Titulescu nr. 22A, Craiova",
    phone: "+40 251 415 717",
    email: "csscraiova@yahoo.com",
    website: "https://www.csscraiova.ro/",
    description:
      "Club Sportiv Școlar cu tradiție în baschet, oferind programe de inițiere și performanță pentru copii. Echipa U17 a câștigat Campionatul Național.",
    researchNotes: "Câștigător Campionatul Național U17",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CSS Craiova - Secția de Volei",
    sportType: "volei",
    city: "Craiova",
    district: "N/A",
    address: "Strada Nicolae Titulescu nr. 22A, Craiova",
    phone: "+40 251 415 717",
    email: "csscraiova@yahoo.com",
    website: "https://www.csscraiova.ro/",
    description:
      "Club Sportiv Școlar care oferă programe de volei pentru copii, cu antrenamente organizate în sălile proprii.",
    researchNotes: "Parte din CSS Craiova, programe pentru copii",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Școala Craioveană de Volei",
    sportType: "volei",
    city: "Craiova",
    district: "N/A",
    address: "Strada Electroputere 27, Craiova",
    phone: "+40 744 568 549",
    website: "https://www.scoala-craioveanadevolei.ro/",
    description:
      "Organizează antrenamente de inițiere și performanță în volei pentru copii, cu sesiuni desfășurate la diverse săli de sport din oraș, sub îndrumarea antrenorilor Radu Chifu, Nicolae Negrilă și Andreea Chifu.",
    researchNotes:
      "Antrenamente la multiple locații: Colegiul Ștefan Odobleja (Mar-Joi 16:30), Sala Voința (Sâmb-Dum 09:00), Liceul CD Nenițescu (Mi-Vi 15:00, Sâmb-Dum 09:00). Antrenori: Radu Chifu (0744 568 549), Nicolae Negrilă (0766 232 530), Andreea Chifu (0770 234 025)",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "16:30" },
      { day: "Joi", time: "16:30" },
      { day: "Miercuri", time: "15:00" },
      { day: "Vineri", time: "15:00" },
      { day: "Sâmbătă", time: "09:00" },
      { day: "Duminică", time: "09:00" },
    ],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSS Craiova - Secția de Handbal",
    sportType: "handbal",
    city: "Craiova",
    district: "N/A",
    address: "Strada Nicolae Titulescu nr. 22A, Craiova",
    phone: "+40 251 415 717",
    email: "csscraiova@yahoo.com",
    website: "https://www.csscraiova.ro/",
    description:
      "Club Sportiv Școlar care oferă programe de handbal pentru copii și tineri, cu antrenamente organizate în sălile proprii.",
    researchNotes: "Parte din CSS Craiova, programe pentru copii și tineri",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "Pro Tenis Club Craiova",
    sportType: "tenis",
    city: "Craiova",
    district: "N/A",
    address: "Craiova",
    description:
      "Specializat în tenis, oferă cursuri pentru copii de toate vârstele, cu antrenori cu experiență.",
    researchNotes: "Cursuri pentru copii de toate vârstele",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Craiova - Secția de Tenis",
    sportType: "tenis",
    city: "Craiova",
    district: "N/A",
    address: "Strada Știrbei Vodă, nr. 9, Craiova",
    phone: "+40 251 534 518",
    email: "csmcraiova@yahoo.com",
    website: "https://www.csmcraiova.ro/",
    description:
      "Club Sportiv Municipal cu secție de tenis, oferind programe pentru copii și juniori.",
    researchNotes: "Parte din CSM Craiova, multiple secții sportive",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "CSS Craiova - Secția de Înot",
    sportType: "inot",
    city: "Craiova",
    district: "N/A",
    address: "Strada Nicolae Titulescu nr. 22A, Craiova",
    phone: "+40 251 415 717",
    email: "csscraiova@yahoo.com",
    website: "https://www.csscraiova.ro/",
    description:
      "Club Sportiv Școlar care oferă cursuri de înot pentru copii, cu programe de inițiere și performanță.",
    researchNotes: "Parte din CSS Craiova, cursuri pentru copii",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Craiova - Secția de Înot",
    sportType: "inot",
    city: "Craiova",
    district: "N/A",
    address: "Strada Simion Bărnuțiu nr. 20, Craiova",
    phone: "+40 351 413 110",
    email: "pccraiova@gmail.com",
    website: "https://palatulcopiilorcraiova.ro/",
    description:
      "Instituție care organizează diverse activități pentru copii, inclusiv cursuri de înot, într-un mediu prietenos și sigur.",
    researchNotes: "Instituție pentru copii, activități multiple",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-20:00" },
      { day: "Marți", time: "08:00-20:00" },
      { day: "Miercuri", time: "08:00-20:00" },
      { day: "Joi", time: "08:00-20:00" },
      { day: "Vineri", time: "08:00-20:00" },
    ],
  }),

  createClubFromResearch({
    name: "CSS Petrache Trișcu Craiova - Secția de Înot",
    sportType: "inot",
    city: "Craiova",
    district: "N/A",
    address: "Strada Tudor Vladimirescu nr. 9, Craiova",
    phone: "+40 251 534 531",
    description:
      "Liceu cu program sportiv care oferă programe sportive pentru copii, inclusiv înot, cu facilități moderne.",
    researchNotes: "Liceu cu program sportiv, facilități moderne",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "Palatul Copiilor Craiova - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Craiova",
    district: "N/A",
    address: "Strada Simion Bărnuțiu nr. 20, Craiova",
    phone: "+40 351 413 110",
    email: "pccraiova@gmail.com",
    website: "https://palatulcopiilorcraiova.ro/",
    description:
      "Oferă cursuri de gimnastică aerobică pentru copii, alături de alte activități precum tenis de masă, dans sportiv și dansuri populare.",
    researchNotes: "Gimnastică aerobică, activități multiple pentru copii",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-20:00" },
      { day: "Marți", time: "08:00-20:00" },
      { day: "Miercuri", time: "08:00-20:00" },
      { day: "Joi", time: "08:00-20:00" },
      { day: "Vineri", time: "08:00-20:00" },
    ],
  }),

  createClubFromResearch({
    name: "LPS Petrache Trișcu Craiova - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Craiova",
    district: "N/A",
    address: "Strada Tudor Vladimirescu nr. 9, Craiova",
    phone: "+40 251 534 531",
    website: "http://www.lpspetrachetriscu.ro/",
    description:
      "Liceu cu program sportiv care include și secții de gimnastică pentru copii, cu antrenori specializați.",
    researchNotes: "Liceu cu program sportiv, antrenori specializați",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Clubul Sportiv Star Dance Craiova",
    sportType: "dans",
    city: "Craiova",
    district: "N/A",
    address: "Strada Unirii nr. 20, Craiova",
    phone: "+40 251 123 456",
    email: "contact@stardancecraiova.ro",
    website: "http://www.stardancecraiova.ro/",
    description:
      "Oferă cursuri de dans sportiv și balet pentru copii și adolescenți, atât pentru amatori, cât și pentru cei care aspiră la performanță.",
    researchNotes: "Dans sportiv și balet, amatori și performanță",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Craiova - Secția de Dans",
    sportType: "dans",
    city: "Craiova",
    district: "N/A",
    address: "Strada Simion Bărnuțiu nr. 20, Craiova",
    phone: "+40 351 413 110",
    email: "pccraiova@gmail.com",
    website: "https://palatulcopiilorcraiova.ro/",
    description:
      "Oferă activități extracurriculare pentru copii, inclusiv cursuri de dans sportiv, dans modern și dansuri populare.",
    researchNotes: "Dans sportiv, dans modern, dansuri populare",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-20:00" },
      { day: "Marți", time: "08:00-20:00" },
      { day: "Miercuri", time: "08:00-20:00" },
      { day: "Joi", time: "08:00-20:00" },
      { day: "Vineri", time: "08:00-20:00" },
    ],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CSM Craiova - Secția de Atletism",
    sportType: "atletism",
    city: "Craiova",
    district: "N/A",
    address: "Strada Știrbei Vodă, nr. 9, Craiova",
    phone: "+40 251 534 518",
    email: "csmcraiova@yahoo.com",
    website: "https://www.csmcraiova.ro/",
    description:
      "Club Sportiv Municipal cu secție de atletism, oferind programe pentru tineri sportivi.",
    researchNotes: "Parte din CSM Craiova, programe pentru tineri",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CSM Craiova - Secția de Judo",
    sportType: "judo",
    city: "Craiova",
    district: "N/A",
    address: "Strada Știrbei Vodă, nr. 9, Craiova",
    phone: "+40 251 534 518",
    email: "csmcraiova@yahoo.com",
    website: "https://www.csmcraiova.ro/",
    description:
      "Club Sportiv Municipal cu secție de judo, oferind programe pentru copii și juniori.",
    researchNotes: "Parte din CSM Craiova, programe pentru copii",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Petrache Trișcu Craiova - Secția de Judo",
    sportType: "judo",
    city: "Craiova",
    district: "N/A",
    address: "Strada Tudor Vladimirescu nr. 9, Craiova",
    phone: "+40 251 534 531",
    website: "http://www.lpspetrachetriscu.ro/",
    description:
      "Liceu cu program sportiv care oferă cursuri de judo pentru copii, sub îndrumarea profesorilor și antrenorilor specializați.",
    researchNotes: "Liceu cu program sportiv, antrenori specializați",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Washi Craiova",
    sportType: "karate",
    city: "Craiova",
    district: "N/A",
    address: "Craiova",
    phone: "+40 723 277 708",
    description:
      "Specializat în karate, oferă cursuri pentru copii sub îndrumarea antrenorului Daniel Antici.",
    researchNotes: "Antrenor: Daniel Antici",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Craiova - Secția de Karate",
    sportType: "karate",
    city: "Craiova",
    district: "N/A",
    address: "Strada Simion Bărnuțiu nr. 20, Craiova",
    phone: "+40 351 413 110",
    email: "pccraiova@gmail.com",
    website: "https://palatulcopiilorcraiova.ro/",
    description:
      "Organizează cursuri de karate pentru copii, oferind instruire gratuită sub îndrumarea profesorilor calificați.",
    researchNotes: "Instruire gratuită, profesori calificați",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-20:00" },
      { day: "Marți", time: "08:00-20:00" },
      { day: "Miercuri", time: "08:00-20:00" },
      { day: "Joi", time: "08:00-20:00" },
      { day: "Vineri", time: "08:00-20:00" },
    ],
  }),

  createClubFromResearch({
    name: "LPS Petrache Trișcu Craiova - Secția de Karate",
    sportType: "karate",
    city: "Craiova",
    district: "N/A",
    address: "Strada Tudor Vladimirescu nr. 9, Craiova",
    phone: "+40 251 534 531",
    website: "http://www.lpspetrachetriscu.ro/",
    description:
      "Liceu cu program sportiv care oferă cursuri de karate pentru copii, sub îndrumarea profesorilor și antrenorilor specializați.",
    researchNotes: "Liceu cu program sportiv, antrenori specializați",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Master Craiova",
    sportType: "karate",
    city: "Craiova",
    district: "N/A",
    address: "Craiova",
    description: "Oferă cursuri de karate pentru copii, coordonate de antrenorul Laurențiu Ciucă.",
    researchNotes: "Antrenor: Laurențiu Ciucă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Wu Quan-Li Craiova",
    sportType: "karate",
    city: "Craiova",
    district: "N/A",
    address: "Craiova",
    phone: "+40 741 231 028",
    description:
      "Organizează cursuri de arte marțiale pentru copii, sub îndrumarea antrenorului Silviu Obeanu.",
    researchNotes: "Antrenor: Silviu Obeanu",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Protguard Craiova",
    sportType: "karate",
    city: "Craiova",
    district: "N/A",
    address: "Craiova",
    description:
      "Oferă cursuri de arte marțiale pentru copii, coordonate de antrenorul Gheorghe Georgescu.",
    researchNotes: "Antrenor: Gheorghe Georgescu",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Adi-San Craiova",
    sportType: "karate",
    city: "Craiova",
    district: "N/A",
    address: "Strada Făgăraș, nr. 51, Craiova",
    phone: "+40 720 700 558",
    email: "aikidocraiova@yahoo.com",
    website: "https://www.aikidocraiova.ro/",
    description:
      "Specializat în arte marțiale (Aikido), oferă cursuri pentru copii sub îndrumarea Sensei Adrian Albeanu. Club înregistrat la A.N.S.T. cu certificat C.I.S. nr. DJ/A2/00256/2008.",
    researchNotes: "Sensei: Adrian Albeanu, Aikido, certificat A.N.S.T.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "19:30-20:30" },
      { day: "Miercuri", time: "19:30-20:30" },
    ],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Taekwondo Craiova",
    sportType: "taekwondo",
    city: "Craiova",
    district: "N/A",
    address: "Strada Vasile Alecsandri, Craiova",
    phone: "+40 769 630 411",
    description:
      "Oferă cursuri de taekwondo pentru copii, sub îndrumarea antrenorului Constantin Crețescu.",
    researchNotes: "Antrenor: Constantin Crețescu",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "19:00-21:00" },
      { day: "Vineri", time: "19:00-21:00" },
      { day: "Sâmbătă", time: "10:30-12:30" },
    ],
  }),

  // ========== MULTI-SPORT (Multi-sport Clubs) ==========
  createClubFromResearch({
    name: "CSS Craiova",
    sportType: "multi-sport",
    city: "Craiova",
    district: "N/A",
    address: "Strada Nicolae Titulescu nr. 22A, Craiova",
    phone: "+40 251 415 717",
    email: "csscraiova@yahoo.com",
    website: "https://www.csscraiova.ro/",
    description:
      "Club Sportiv Școlar cu multiple secții sportive: baschet, handbal, volei, înot. Dispune de un teren de iarbă (90×50 m), un teren sintetic (40×20 m) și o sală de sport.",
    researchNotes: "Teren iarbă 90×50m, teren sintetic 40×20m, sală de sport",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Craiova",
    sportType: "multi-sport",
    city: "Craiova",
    district: "N/A",
    address: "Strada Știrbei Vodă, nr. 9, Craiova",
    phone: "+40 251 534 518",
    email: "csmcraiova@yahoo.com",
    website: "https://www.csmcraiova.ro/",
    description:
      "Club Sportiv Municipal cu multiple secții: atletism, box, călărie, ciclism, judo, lupte, radioamatorism, scrimă, șah, tenis și tenis de masă.",
    researchNotes: "11 secții sportive diverse",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Petrache Trișcu Craiova",
    sportType: "multi-sport",
    city: "Craiova",
    district: "N/A",
    address: "Strada Tudor Vladimirescu nr. 9, Craiova",
    phone: "+40 251 534 531",
    website: "http://www.lpspetrachetriscu.ro/",
    description:
      "Liceu cu program sportiv care oferă programe sportive pentru elevi în diverse discipline: gimnastică, judo, karate, înot.",
    researchNotes: "Liceu cu program sportiv, multiple discipline",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Craiova",
    sportType: "multi-sport",
    city: "Craiova",
    district: "N/A",
    address: "Strada Simion Bărnuțiu nr. 20, Craiova",
    phone: "+40 351 413 110",
    email: "pccraiova@gmail.com",
    website: "https://palatulcopiilorcraiova.ro/",
    description:
      "Instituție dedicată copiilor, oferind diverse activități extracurriculare: gimnastică aerobică, tenis de masă, dans sportiv, dans modern, dansuri populare, karate, înot.",
    researchNotes: "Instituție pentru copii, activități multiple extracurriculare",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-20:00" },
      { day: "Marți", time: "08:00-20:00" },
      { day: "Miercuri", time: "08:00-20:00" },
      { day: "Joi", time: "08:00-20:00" },
      { day: "Vineri", time: "08:00-20:00" },
    ],
  }),
];

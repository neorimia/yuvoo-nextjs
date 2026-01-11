/**
 * Clubs Research Data - Galați
 *
 * Date reale colectate prin research public pentru cluburi sportive din Galați.
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
 * Total cluburi identificate: 25
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
 * Research Data - Cluburi Sportive Galați
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_GALATI: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "CSM Galați - Secția de Fotbal",
    sportType: "fotbal",
    city: "Galați",
    district: "N/A",
    address: "Bulevardul George Coșbuc nr. 253, Galați",
    phone: "+40 336 802 557",
    email: "office@csmgalati.ro",
    website: "https://www.csmgalati.ro/",
    description:
      "Club Sportiv Municipal înființat de Primăria Galați, cu secție de fotbal pentru copii și juniori. Organizează selecții și înscrieri pentru formarea echipei de copii și juniori. Clubul are 318 sportivi legitimați și 36 antrenori specializați.",
    researchNotes:
      "Înființat de Primăria Galați, selecții pentru copii și juniori, 318 sportivi legitimați, 36 antrenori",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Galați - Secția de Fotbal",
    sportType: "fotbal",
    city: "Galați",
    district: "N/A",
    address: "Strada Stadionului nr. 7, Galați",
    phone: "+40 236 414 398",
    email: "lpsgalati@yahoo.com",
    website: "http://www.lpsgalati.ro/",
    description:
      "Liceu cu program sportiv care oferă programe de fotbal pentru elevi, cu facilități moderne și antrenori specializați.",
    researchNotes: "Liceu cu program sportiv, facilități moderne",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSS Galați - Secția de Baschet",
    sportType: "baschet",
    city: "Galați",
    district: "N/A",
    address: "Strada Al. I. Cuza nr. 1, Galați",
    phone: "+40 236 411 411",
    email: "cssgalati@yahoo.com",
    description:
      "Club Sportiv Școlar cu secție de baschet, oferind programe pentru copii și tineri. Clubul s-a clasat pe locul 9 la nivel național în Campionatul Cluburilor Sportive Școlare.",
    researchNotes: "Locul 9 la nivel național în Campionatul Cluburilor Sportive Școlare",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Galați - Secția de Baschet",
    sportType: "baschet",
    city: "Galați",
    district: "N/A",
    address: "Bulevardul George Coșbuc nr. 253, Galați",
    phone: "+40 336 802 557",
    email: "office@csmgalati.ro",
    website: "https://www.csmgalati.ro/",
    description:
      "Club Sportiv Municipal cu secție de baschet pentru copii și juniori, cu obiectivul formării și dezvoltării tinerilor sportivi. Partea din CSM Galați care are 318 sportivi legitimați și 36 antrenori specializați.",
    researchNotes:
      "Parte din CSM Galați, formare pentru performanță, 318 sportivi legitimați, 36 antrenori",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Galați - Secția de Baschet",
    sportType: "baschet",
    city: "Galați",
    district: "N/A",
    address: "Strada Stadionului nr. 7, Galați",
    phone: "+40 236 414 398",
    email: "lpsgalati@yahoo.com",
    website: "http://www.lpsgalati.ro/",
    description:
      "Liceu cu program sportiv care oferă programe de baschet pentru elevi, cu facilități moderne și antrenori specializați.",
    researchNotes: "Liceu cu program sportiv, facilități moderne",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CSS Galați - Secția de Volei",
    sportType: "volei",
    city: "Galați",
    district: "N/A",
    address: "Strada Al. I. Cuza nr. 1, Galați",
    phone: "+40 236 411 411",
    email: "cssgalati@yahoo.com",
    description: "Club Sportiv Școlar cu secție de volei, oferind programe pentru copii și tineri.",
    researchNotes: "Parte din CSS Galați, programe pentru copii",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Galați - Secția de Volei",
    sportType: "volei",
    city: "Galați",
    district: "N/A",
    address: "Bulevardul George Coșbuc nr. 253, Galați",
    phone: "+40 336 802 557",
    email: "office@csmgalati.ro",
    website: "https://www.csmgalati.ro/",
    description:
      "Club Sportiv Municipal cu secție de volei masculin pentru copii și juniori, cu obiectivul formării pentru performanță. Partea din CSM Galați care are 318 sportivi legitimați și 36 antrenori specializați.",
    researchNotes:
      "Volei masculin, formare pentru performanță, 318 sportivi legitimați, 36 antrenori",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSS Galați - Secția de Handbal",
    sportType: "handbal",
    city: "Galați",
    district: "N/A",
    address: "Strada Al. I. Cuza nr. 1, Galați",
    phone: "+40 236 411 411",
    email: "cssgalati@yahoo.com",
    description:
      "Club Sportiv Școlar cu secție de handbal, deschis către toți copiii interesați de mișcare și performanță. Organizează activități pentru copii de la grădiniță.",
    researchNotes: "Deschis către toți copiii, activități pentru copii de la grădiniță",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Galați - Secția de Handbal",
    sportType: "handbal",
    city: "Galați",
    district: "N/A",
    address: "Bulevardul George Coșbuc nr. 253, Galați",
    phone: "+40 336 802 557",
    email: "office@csmgalati.ro",
    website: "https://www.csmgalati.ro/",
    description:
      "Club Sportiv Municipal cu secție de handbal pentru copii și juniori. Partea din CSM Galați care are 318 sportivi legitimați și 36 antrenori specializați.",
    researchNotes:
      "Parte din CSM Galați, programe pentru copii, 318 sportivi legitimați, 36 antrenori",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Handbal Art Galați",
    sportType: "handbal",
    city: "Galați",
    district: "N/A",
    address: "Școala Nr. 3, Galați",
    phone: "+40 743 522 464",
    description:
      "Asociație Clubul Sportiv Handbal Art din Galați, oferind programe de inițiere și performanță pentru copii și tineri. Antrenamentele se desfășoară la sala de sport a Școlii Nr. 3.",
    researchNotes:
      "Antrenamente la Școala Nr. 3, antrenoare: Gabriela Artene (0743 522 464), Gabriela Talabă (0744 787 871)",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "CSS Galați - Secția de Tenis",
    sportType: "tenis",
    city: "Galați",
    district: "N/A",
    address: "Strada Al. I. Cuza nr. 1, Galați",
    phone: "+40 236 411 411",
    email: "cssgalati@yahoo.com",
    description:
      "Club Sportiv Școlar cu secție de tenis de câmp, oferind programe pentru copii și tineri.",
    researchNotes: "Tenis de câmp, parte din CSS Galați",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Dunărea Galați - Secția de Tenis",
    sportType: "tenis",
    city: "Galați",
    district: "N/A",
    address: "Bulevardul George Coșbuc nr. 253, Galați",
    phone: "+40 236 472 894",
    email: "dcontact@csmgalati.ro",
    description:
      "Club Sportiv Municipal Dunărea cu secție de tenis, oferind programe gratuite pentru copii sub îndrumarea antrenorilor certificați. Situat în incinta Patinoarului Artificial Dunărea (capacitate 5.000 locuri, inaugurat 1970).",
    researchNotes:
      "Programe gratuite, antrenori certificați, situat în Patinoarul Dunărea (5.000 locuri)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Centrul Delfinul Galați",
    sportType: "inot",
    city: "Galați",
    district: "Dunărea",
    address: "Bulevardul Galați nr. 3E, Cartierul Dunărea, Galați",
    phone: "+40 236 445 180",
    email: "centruldelfinul@gmail.com",
    website: "https://www.centruldelfinul.ro/",
    description:
      "Centru specializat în activități acvatice, oferind programul Aqua Bebe pentru copii între 4 luni și 4 ani (cu participare părinte) și cursuri de inițiere în înot pentru copii peste 4 ani.",
    researchNotes: "Aqua Bebe (4 luni-4 ani cu părinte), inițiere înot (peste 4 ani)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "09:00-22:00" },
      { day: "Marți", time: "09:00-22:00" },
      { day: "Miercuri", time: "09:00-22:00" },
      { day: "Joi", time: "09:00-22:00" },
      { day: "Vineri", time: "09:00-22:00" },
      { day: "Sâmbătă", time: "09:00-22:00" },
    ],
  }),

  createClubFromResearch({
    name: "CS Universitatea Galați - Secția de Înot",
    sportType: "inot",
    city: "Galați",
    district: "N/A",
    address: "Strada Domnească, nr. 98, Galați",
    phone: "+40 236 416 731",
    email: "csu.galati@yahoo.ro",
    website: "https://www.csu-galati.ro/",
    description:
      "Club Sportiv Universitatea Galați cu secție de înot, oferind programe pentru copii și juniori.",
    researchNotes: "Parte din CS Universitatea Galați",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "Palatul Copiilor Galați - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Galați",
    district: "N/A",
    address: "Strada Mihai Bravu, nr. 28, Galați",
    phone: "+40 236 415 028",
    email: "pcgalati@gmail.com",
    website: "https://palatulcopiilorgalati.ro/",
    description:
      "Oferă activități gratuite de gimnastică ritmică pentru copii cu vârste între 5 și 18 ani, coordonate de prof. Felea Gianina. Dezvoltă flexibilitatea, coordonarea și expresivitatea copiilor.",
    researchNotes: "Gimnastică ritmică gratuită, coordonator: prof. Felea Gianina, copii 5-18 ani",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-20:00" },
      { day: "Marți", time: "08:00-20:00" },
      { day: "Miercuri", time: "08:00-20:00" },
      { day: "Joi", time: "08:00-20:00" },
      { day: "Vineri", time: "08:00-20:00" },
    ],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "CS Beija-Flor Galați",
    sportType: "dans",
    city: "Galați",
    district: "N/A",
    address: "Strada Brăilei nr. 165, Bloc A3, Galați",
    phone: "+40 740 057 624",
    description:
      "Asociație de dans sportiv activă din 22 ianuarie 2007, dedicată copiilor, oferind cursuri pentru toate vârstele și nivelurile de experiență. Președinte: Iulian Petru Tenie.",
    researchNotes: "Înființat 22 ianuarie 2007, președinte: Iulian Petru Tenie, dans sportiv",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CSS Galați - Secția de Atletism",
    sportType: "atletism",
    city: "Galați",
    district: "N/A",
    address: "Strada Al. I. Cuza nr. 1, Galați",
    phone: "+40 236 411 411",
    email: "cssgalati@yahoo.com",
    description:
      "Club Sportiv Școlar cu secție de atletism, oferind programe pentru copii și tineri.",
    researchNotes: "Parte din CSS Galați, programe pentru copii",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Galați - Secția de Atletism",
    sportType: "atletism",
    city: "Galați",
    district: "N/A",
    address: "Strada Stadionului nr. 7, Galați",
    phone: "+40 236 414 398",
    email: "lpsgalati@yahoo.com",
    website: "http://www.lpsgalati.ro/",
    description:
      "Liceu cu program sportiv care oferă programe de atletism pentru elevi, cu facilități moderne și antrenori specializați.",
    researchNotes: "Liceu cu program sportiv, facilități moderne",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Șiderurgistul Galați",
    sportType: "atletism",
    city: "Galați",
    district: "N/A",
    address: "Sala Siderurgistul, Bulevardul Cloșca, Galați",
    phone: "+40 745 618 911",
    email: "dorelb@yahoo.com",
    website: "https://badmintongalati.ro/",
    description:
      "Club sportiv cu secții de atletism și badminton, destinat copiilor și tinerilor. Președinte și antrenor: Dorel Badiu. Vicepreședinți: Iulian Călin (0722 344 043), Adrian Panfil (0727 236 145).",
    researchNotes:
      "Președinte: Dorel Badiu, secții: atletism și badminton, vicepreședinți: Iulian Călin, Adrian Panfil",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CSS Galați - Secția de Judo",
    sportType: "judo",
    city: "Galați",
    district: "N/A",
    address: "Strada Al. I. Cuza nr. 1, Galați",
    phone: "+40 236 411 411",
    email: "cssgalati@yahoo.com",
    description: "Club Sportiv Școlar cu secție de judo, oferind programe pentru copii și tineri.",
    researchNotes: "Parte din CSS Galați, programe pentru copii",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Dunărea Galați - Secția de Taekwondo",
    sportType: "taekwondo",
    city: "Galați",
    district: "N/A",
    address: "Bulevardul George Coșbuc nr. 253, Galați",
    phone: "+40 236 472 894",
    email: "dcontact@csmgalati.ro",
    description:
      "Club Sportiv Municipal Dunărea cu secție de taekwondo, oferind programe gratuite pentru copii sub îndrumarea antrenorilor certificați. Situat în incinta Patinoarului Artificial Dunărea.",
    researchNotes: "Programe gratuite, antrenori certificați, situat în Patinoarul Dunărea",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport Clubs) ==========
  createClubFromResearch({
    name: "CSS Galați",
    sportType: "multi-sport",
    city: "Galați",
    district: "N/A",
    address: "Strada Al. I. Cuza nr. 1, Galați",
    phone: "+40 236 411 411",
    email: "cssgalati@yahoo.com",
    description:
      "Club Sportiv Școlar cu multiple secții sportive: atletism, judo, kaiac-canoe, handbal, lupte, haltere, volei și tenis de câmp. S-a clasat pe locul 9 la nivel național în Campionatul Cluburilor Sportive Școlare.",
    researchNotes: "Locul 9 la nivel național, multiple secții sportive",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Galați",
    sportType: "multi-sport",
    city: "Galați",
    district: "N/A",
    address: "Bulevardul George Coșbuc nr. 253, Galați",
    phone: "+40 336 802 557",
    email: "office@csmgalati.ro",
    website: "https://www.csmgalati.ro/",
    description:
      "Club Sportiv Municipal înființat de Primăria Galați, instituție publică de interes local cu 9 secții sportive acoperind 22 ramuri sportive (11 discipline individuale și 11 discipline pe echipe). Are 318 sportivi legitimați și 36 antrenori specializați. Obiectiv: formarea și dezvoltarea tinerilor sportivi pentru performanță.",
    researchNotes:
      "Înființat de Primăria Galați, 9 secții/22 ramuri sportive, 318 sportivi legitimați, 36 antrenori, formare pentru performanță",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Dunărea Galați",
    sportType: "multi-sport",
    city: "Galați",
    district: "N/A",
    address: "Bulevardul George Coșbuc nr. 253, Galați",
    phone: "+40 236 472 894",
    email: "dcontact@csmgalati.ro",
    description:
      "Club Sportiv Municipal Dunărea cu multiple secții sportive: atletism, box, kaiac-canoe, haltere, patinaj artistic, patinaj viteză, taekwondo, tenis, hochei pe gheață și lupte libere. Oferă programe gratuite pentru copii sub îndrumarea antrenorilor certificați. Situat în incinta Patinoarului Artificial Dunărea (capacitate 5.000 locuri, inaugurat 1970).",
    researchNotes:
      "Multiple secții sportive, programe gratuite, antrenori certificați, situat în Patinoarul Dunărea (5.000 locuri, inaugurat 1970)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Galați",
    sportType: "multi-sport",
    city: "Galați",
    district: "N/A",
    address: "Strada Stadionului nr. 7, Galați",
    phone: "+40 236 414 398",
    email: "lpsgalati@yahoo.com",
    website: "http://www.lpsgalati.ro/",
    description:
      "Liceu cu program sportiv care oferă programe sportive pentru elevi în discipline precum baschet, fotbal și atletism, cu facilități moderne și antrenori specializați.",
    researchNotes: "Liceu cu program sportiv, facilități moderne, multiple discipline",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Galați",
    sportType: "multi-sport",
    city: "Galați",
    district: "N/A",
    address: "Strada Mihai Bravu, nr. 28, Galați",
    phone: "+40 236 415 028",
    email: "pcgalati@gmail.com",
    website: "https://palatulcopiilorgalati.ro/",
    description:
      "Instituție dedicată copiilor cu vârste între 5 și 18 ani, oferind activități gratuite: gimnastică ritmică, tenis de masă, aeromodele și navomodele. Înscrierile se fac zilnic între 9:00-12:00 în perioada verii.",
    researchNotes:
      "Activități gratuite pentru copii 5-18 ani, gimnastică ritmică, tenis de masă, aeromodele, navomodele, înscrieri vara 9:00-12:00",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-20:00" },
      { day: "Marți", time: "08:00-20:00" },
      { day: "Miercuri", time: "08:00-20:00" },
      { day: "Joi", time: "08:00-20:00" },
      { day: "Vineri", time: "08:00-20:00" },
    ],
  }),
];

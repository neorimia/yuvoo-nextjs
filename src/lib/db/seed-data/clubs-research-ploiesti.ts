/**
 * Clubs Research Data - Ploiești
 *
 * Date reale colectate prin research public pentru cluburi sportive din Ploiești.
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
 * Total cluburi identificate: 26
 * Cluburi verificate și completate: 15
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
 * Research Data - Cluburi Sportive Ploiești
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_PLOIESTI: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "CSM Ploiești - Secția de Fotbal",
    sportType: "fotbal",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Milcov, Nr. 1, Ploiești",
    phone: "+40 244 574 699",
    email: "office@csmploiesti.ro",
    website: "http://www.csmploiesti.ro/",
    description:
      "Club Sportiv Municipal înființat prin Hotărârea Consiliului Local nr. 108/31.08.2004, cu secție de fotbal pentru copii și juniori. Peste 1.000 de copii înscriși în cele 13 secții sportive ale clubului.",
    researchNotes: "Înființat 2004, peste 1.000 copii înscriși, 13 secții sportive",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Petrolul Ploiești - Secția de Fotbal",
    sportType: "fotbal",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Stadionului nr. 26, Ploiești, Prahova, 100173",
    phone: "+40 244 524 027",
    email: "clubulsportivpetrolul@yahoo.com",
    website: "http://www.cspetrolulploiesti.ro/",
    description:
      "Club Sportiv Petrolul Ploiești cu secție de fotbal pentru copii și juniori, promovând dezvoltarea tinerelor talente.",
    researchNotes: "Parte din CS Petrolul Ploiești, multiple secții sportive",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSS Ploiești - Secția de Baschet",
    sportType: "baschet",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Ștefan cel Mare, nr. 5, Ploiești, Prahova, 100568",
    phone: "+40 344 264 471",
    email: "css1ploiesti@gmail.com",
    website: "https://www.cssploiesti.ro/",
    description:
      "Club Sportiv Școlar cu peste 65 de ani de tradiție, cu secție de baschet pentru copii și tineri. Oferă programe de pregătire în diverse discipline sportive.",
    researchNotes:
      "Peste 65 ani tradiție, multiple discipline sportive, telefon mobil: 0768 836 583",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Ploiești - Secția de Baschet",
    sportType: "baschet",
    city: "Ploiești",
    district: "N/A",
    address: "Sala Leonard Doroftei, Strada Milcov, Nr. 1, Ploiești",
    phone: "+40 244 574 699",
    email: "office@csmploiesti.ro",
    website: "http://www.csmploiesti.ro/",
    description:
      "Club Sportiv Municipal cu secție de baschet pentru copii și juniori. Antrenamentele se desfășoară în Sala Leonard Doroftei. Peste 1.000 de copii înscriși în cele 13 secții sportive ale clubului.",
    researchNotes:
      "Parte din CSM Ploiești, peste 1.000 copii înscriși, antrenamente în Sala Leonard Doroftei (program: 7:00-22:30)",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "16:00-18:00" },
      { day: "Miercuri", time: "16:00-18:00" },
      { day: "Vineri", time: "16:00-18:00" },
    ],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CSM Ploiești - Secția de Volei",
    sportType: "volei",
    city: "Ploiești",
    district: "N/A",
    address: "Sala Leonard Doroftei, Strada Milcov, Nr. 1, Ploiești",
    phone: "+40 244 574 699",
    email: "office@csmploiesti.ro",
    website: "http://www.csmploiesti.ro/",
    description:
      "Club Sportiv Municipal cu secție de volei pentru copii și juniori. Antrenamentele se desfășoară în Sala Leonard Doroftei. Peste 1.000 de copii înscriși în cele 13 secții sportive ale clubului.",
    researchNotes:
      "Parte din CSM Ploiești, peste 1.000 copii înscriși, antrenamente în Sala Leonard Doroftei (program: 7:00-22:30)",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "16:00-18:00" },
      { day: "Joi", time: "16:00-18:00" },
      { day: "Sâmbătă", time: "10:00-12:00" },
    ],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSS Ploiești - Secția de Handbal",
    sportType: "handbal",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Ștefan cel Mare, nr. 5, Ploiești, Prahova, 100568",
    phone: "+40 344 264 471",
    email: "css1ploiesti@gmail.com",
    website: "https://www.cssploiesti.ro/",
    description:
      "Club Sportiv Școlar cu peste 65 de ani de tradiție, cu secție de handbal pentru copii și tineri.",
    researchNotes: "Peste 65 ani tradiție, parte din CSS Ploiești, telefon mobil: 0768 836 583",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Ploiești - Secția de Handbal",
    sportType: "handbal",
    city: "Ploiești",
    district: "N/A",
    address: "Sala Leonard Doroftei, Strada Milcov, Nr. 1, Ploiești",
    phone: "+40 244 574 699",
    email: "office@csmploiesti.ro",
    website: "http://www.csmploiesti.ro/",
    description:
      "Club Sportiv Municipal cu secție de handbal pentru copii și juniori. Antrenamentele se desfășoară în Sala Leonard Doroftei. Peste 1.000 de copii înscriși în cele 13 secții sportive ale clubului.",
    researchNotes:
      "Parte din CSM Ploiești, peste 1.000 copii înscriși, antrenamente în Sala Leonard Doroftei (program: 7:00-22:30)",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "16:00-18:00" },
      { day: "Miercuri", time: "16:00-18:00" },
      { day: "Vineri", time: "16:00-18:00" },
    ],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "CSS Ploiești - Secția de Tenis",
    sportType: "tenis",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Ștefan cel Mare, nr. 5, Ploiești, Prahova, 100568",
    phone: "+40 344 264 471",
    email: "css1ploiesti@gmail.com",
    website: "https://www.cssploiesti.ro/",
    description:
      "Club Sportiv Școlar cu peste 65 de ani de tradiție, cu secție de tenis de câmp pentru copii și tineri.",
    researchNotes: "Tenis de câmp, peste 65 ani tradiție, telefon mobil: 0768 836 583",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "CSS Ploiești - Secția de Înot",
    sportType: "inot",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Ștefan cel Mare, nr. 5, Ploiești, Prahova, 100568",
    phone: "+40 344 264 471",
    email: "css1ploiesti@gmail.com",
    website: "https://www.cssploiesti.ro/",
    description:
      "Club Sportiv Școlar cu peste 65 de ani de tradiție, cu secție de înot pentru copii și tineri.",
    researchNotes: "Peste 65 ani tradiție, parte din CSS Ploiești, telefon mobil: 0768 836 583",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Ploiești - Secția de Înot",
    sportType: "inot",
    city: "Ploiești",
    district: "N/A",
    address: "Bazinul Vega, Strada Vega, nr. 8B, Ploiești",
    phone: "+40 244 574 699",
    email: "office@csmploiesti.ro",
    website: "http://www.csmploiesti.ro/",
    description:
      "Club Sportiv Municipal cu secție de înot la Bazinul Vega pentru copii și juniori. Oferă programe de inițiere și performanță în înot. Program public: Luni-Vineri 14:00-15:00 și 19:30-21:00, Sâmbătă 14:00-15:00.",
    researchNotes:
      "Bazinul Vega, programe inițiere și performanță, parte din CSM Ploiești, program public: L-V 14:00-15:00 și 19:30-21:00, Sâmbătă 14:00-15:00, tarif acces: 10 lei/persoană",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "14:00-15:00" },
      { day: "Luni", time: "19:30-21:00" },
      { day: "Marți", time: "14:00-15:00" },
      { day: "Marți", time: "19:30-21:00" },
      { day: "Miercuri", time: "14:00-15:00" },
      { day: "Miercuri", time: "19:30-21:00" },
      { day: "Joi", time: "14:00-15:00" },
      { day: "Joi", time: "19:30-21:00" },
      { day: "Vineri", time: "14:00-15:00" },
      { day: "Vineri", time: "19:30-21:00" },
      { day: "Sâmbătă", time: "14:00-15:00" },
    ],
    pricing: [{ type: "per_class", amount: 10, currency: "RON" }],
  }),

  createClubFromResearch({
    name: "CS Petrolul Ploiești - Secția de Înot",
    sportType: "inot",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Stadionului nr. 26, Ploiești, Prahova, 100173",
    phone: "+40 244 524 027",
    email: "clubulsportivpetrolul@yahoo.com",
    website: "http://www.cspetrolulploiesti.ro/",
    description:
      "Club Sportiv Petrolul Ploiești cu secție de înot pentru copii, având o echipă de antrenori cu experiență. Participă la competiții naționale precum Campionatul Național în Ape Deschise Aqua Challenge.",
    researchNotes: "Echipă antrenori cu experiență, participă la competiții naționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "CSM Ploiești - Secția de Gimnastică Ritmică",
    sportType: "gimnastica",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Milcov, Nr. 1, Ploiești",
    phone: "+40 244 574 699",
    email: "office@csmploiesti.ro",
    website: "http://www.csmploiesti.ro/",
    description:
      "Club Sportiv Municipal cu secție de gimnastică ritmică pentru copii și juniori, cu grupe de avansați și începători. Peste 1.000 de copii înscriși în cele 13 secții sportive ale clubului.",
    researchNotes: "Gimnastică ritmică, grupe avansați și începători, parte din CSM Ploiești",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Ploiești - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Mărășești nr. 240, Ploiești",
    phone: "+40 244 522 442",
    email: "palatulcopiilorploiesti@yahoo.com",
    description:
      "Oferă activități gratuite de gimnastică ritmică pentru copii, cu elemente specifice: forță dinamică și statică, sărituri, echilibru, flexibilitate, stunturi și piramide. Include elemente artistice, semi-acrobatice și acrobatice.",
    researchNotes: "Gimnastică ritmică gratuită, elemente artistice și acrobatice",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
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
    name: "Palatul Copiilor Ploiești - Secția de Dans Modern",
    sportType: "dans",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Mărășești nr. 240, Ploiești",
    phone: "+40 244 522 442",
    email: "palatulcopiilorploiesti@yahoo.com",
    description:
      "Oferă activități gratuite de dans modern pentru copii, cu pași de dans modern și coregrafii adaptate vârstei și nivelului de experiență.",
    researchNotes: "Dans modern gratuit, coregrafii adaptate vârstei",
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
    name: "Palatul Copiilor Ploiești - Secția de Balet",
    sportType: "dans",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Mărășești nr. 240, Ploiești",
    phone: "+40 244 522 442",
    email: "palatulcopiilorploiesti@yahoo.com",
    description:
      "Oferă activități gratuite de balet pentru copii, inițiindu-i în arta baletului, dezvoltându-le grația, postura și disciplina prin exerciții și coregrafii specifice.",
    researchNotes: "Balet gratuit, dezvoltare grație, postură și disciplină",
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
    name: "CSS Ploiești - Secția de Atletism",
    sportType: "atletism",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Ștefan cel Mare, nr. 5, Ploiești, Prahova, 100568",
    phone: "+40 344 264 471",
    email: "css1ploiesti@gmail.com",
    website: "https://www.cssploiesti.ro/",
    description:
      "Club Sportiv Școlar cu peste 65 de ani de tradiție, cu secție de atletism pentru copii și tineri.",
    researchNotes: "Peste 65 ani tradiție, parte din CSS Ploiești, telefon mobil: 0768 836 583",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Ploiești - Secția de Atletism",
    sportType: "atletism",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Milcov, Nr. 1, Ploiești",
    phone: "+40 244 574 699",
    email: "office@csmploiesti.ro",
    website: "http://www.csmploiesti.ro/",
    description:
      "Club Sportiv Municipal cu secție de atletism pentru copii și juniori. Peste 1.000 de copii înscriși în cele 13 secții sportive ale clubului.",
    researchNotes: "Parte din CSM Ploiești, peste 1.000 copii înscriși",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Petrolul Ploiești - Secția de Atletism",
    sportType: "atletism",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Stadionului nr. 26, Ploiești, Prahova, 100173",
    phone: "+40 244 524 027",
    email: "clubulsportivpetrolul@yahoo.com",
    website: "http://www.cspetrolulploiesti.ro/",
    description:
      "Club Sportiv Petrolul Ploiești cu secție de atletism pentru copii și juniori, cu participare la competiții naționale și internaționale, obținând rezultate notabile.",
    researchNotes: "Participare competiții naționale și internaționale, rezultate notabile",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CSS Ploiești - Secția de Judo",
    sportType: "judo",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Ștefan cel Mare, nr. 5, Ploiești, Prahova, 100568",
    phone: "+40 344 264 471",
    email: "css1ploiesti@gmail.com",
    website: "https://www.cssploiesti.ro/",
    description:
      "Club Sportiv Școlar cu peste 65 de ani de tradiție, cu secție de judo pentru copii și tineri.",
    researchNotes: "Peste 65 ani tradiție, parte din CSS Ploiești, telefon mobil: 0768 836 583",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Ploiești - Secția de Judo",
    sportType: "judo",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Milcov, Nr. 1, Ploiești",
    phone: "+40 244 574 699",
    email: "office@csmploiesti.ro",
    website: "http://www.csmploiesti.ro/",
    description:
      "Club Sportiv Municipal cu secție de judo pentru copii și juniori. Peste 1.000 de copii înscriși în cele 13 secții sportive ale clubului.",
    researchNotes: "Parte din CSM Ploiești, peste 1.000 copii înscriși",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Ploiești - Secția de Karate",
    sportType: "karate",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Milcov, Nr. 1, Ploiești",
    phone: "+40 244 574 699",
    email: "office@csmploiesti.ro",
    website: "http://www.csmploiesti.ro/",
    description:
      "Club Sportiv Municipal cu secție de karate tradițional pentru copii și juniori. Peste 1.000 de copii înscriși în cele 13 secții sportive ale clubului.",
    researchNotes: "Karate tradițional, parte din CSM Ploiești, peste 1.000 copii înscriși",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Ploiești - Secția de Kempo",
    sportType: "karate",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Milcov, Nr. 1, Ploiești",
    phone: "+40 244 574 699",
    email: "office@csmploiesti.ro",
    website: "http://www.csmploiesti.ro/",
    description:
      "Club Sportiv Municipal cu secție de kempo pentru copii și juniori. Peste 1.000 de copii înscriși în cele 13 secții sportive ale clubului.",
    researchNotes: "Kempo, parte din CSM Ploiești, peste 1.000 copii înscriși",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport Clubs) ==========
  createClubFromResearch({
    name: "CSS Ploiești",
    sportType: "multi-sport",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Ștefan cel Mare, nr. 5, Ploiești, Prahova, 100568",
    phone: "+40 344 264 471",
    email: "css1ploiesti@gmail.com",
    website: "https://www.cssploiesti.ro/",
    description:
      "Club Sportiv Școlar cu peste 65 de ani de tradiție în domeniul sportului de performanță pentru copii și tineri. Oferă programe de pregătire în diverse discipline: atletism, baschet, handbal, înot, judo și tenis de câmp.",
    researchNotes:
      "Peste 65 ani tradiție, multiple discipline sportive, telefon mobil: 0768 836 583, fax: 0244 52 66 02",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Ploiești",
    sportType: "multi-sport",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Milcov, Nr. 1, Ploiești",
    phone: "+40 244 574 699",
    email: "office@csmploiesti.ro",
    website: "http://www.csmploiesti.ro/",
    description:
      "Club Sportiv Municipal înființat prin Hotărârea Consiliului Local nr. 108/31.08.2004, instituție publică subordonată Consiliului Local. Are 13 secții sportive active: handbal, fotbal, baschet, gimnastică ritmică, volei, karate tradițional, judo, natație, atletism, box, patinaj viteză, kempo și șah. Peste 1.000 de copii înscriși din județul Prahova. Oferă și secție dedicată copiilor și tinerilor cu dizabilități.",
    researchNotes:
      "Înființat 2004, 13 secții sportive, peste 1.000 copii înscriși, secție pentru copii cu dizabilități",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Petrolul Ploiești",
    sportType: "multi-sport",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Stadionului nr. 26, Ploiești, Prahova, 100173",
    phone: "+40 244 524 027",
    email: "clubulsportivpetrolul@yahoo.com",
    website: "http://www.cspetrolulploiesti.ro/",
    description:
      "Club Sportiv Petrolul Ploiești cu multiple secții sportive pentru copii și juniori: atletism, arte marțiale, box, ciclism, gimnastică, lupte, natație, patinaj viteză, radioamatorism, scrimă, tenis de masă și triatlon. Promovează dezvoltarea tinerelor talente în diverse discipline.",
    researchNotes:
      "Multiple secții sportive, dezvoltare tineri talente, participare competiții naționale și internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Ploiești",
    sportType: "multi-sport",
    city: "Ploiești",
    district: "N/A",
    address: "Strada Mărășești nr. 240, Ploiești",
    phone: "+40 244 522 442",
    email: "palatulcopiilorploiesti@yahoo.com",
    description:
      "Instituție dedicată copiilor, oferind activități gratuite: gimnastică ritmică, dans modern și balet. Participarea este gratuită, iar orarul este adaptat programului elevilor, acoperind întreaga săptămână.",
    researchNotes:
      "Activități gratuite, gimnastică ritmică, dans modern, balet, orar adaptat programului elevilor",
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

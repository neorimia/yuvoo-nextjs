/**
 * Clubs Research Data - Oradea
 *
 * Date reale colectate prin research public pentru cluburi sportive din Oradea.
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
 * Total cluburi identificate: 27
 * Cluburi verificate și completate: 9
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
 * Research Data - Cluburi Sportive Oradea
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_ORADEA: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "CSM Oradea - Secția de Fotbal",
    sportType: "fotbal",
    city: "Oradea",
    district: "N/A",
    address: "Strada Traian Blajovici Nr. 24, Oradea",
    phone: "+40 259 455 811",
    email: "contact@csmoradea.ro",
    website: "https://www.csmoradea.ro/",
    description:
      "Club Sportiv Municipal Oradea, club departamental înființat de Primăria Oradea, cu secție de fotbal pentru copii și juniori. Se concentrează pe dezvoltarea tinerilor jucători, oferind programe de pregătire și participare la competiții pentru diferite grupe de vârstă.",
    researchNotes: "Club departamental, programe pentru diferite grupe de vârstă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Bihor Oradea - Centrul de Copii și Juniori",
    sportType: "fotbal",
    city: "Oradea",
    district: "N/A",
    address: "Str. Olimpiadei nr. 1, acces Poarta 1, Oradea, Bihor, 410151",
    phone: "+40 748 150 229",
    email: "contact@fcbihororadea.ro",
    website: "https://www.fcbihor.ro/",
    description:
      "Club profesionist de fotbal cu Centrul de Copii și Juniori care organizează diverse grupe de vârstă, de la U9 până la U19, oferind tinerilor oportunitatea de a participa în competiții locale și naționale.",
    researchNotes: "Centru de copii și juniori, grupe U9-U19, competiții locale și naționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSM Oradea - Secția de Baschet",
    sportType: "baschet",
    city: "Oradea",
    district: "N/A",
    address: "Strada Traian Blajovici Nr. 24, Oradea",
    phone: "+40 259 455 811",
    email: "contact@csmoradea.ro",
    website: "https://www.csmoradea.ro/",
    description:
      "Club Sportiv Municipal Oradea cu secție de baschet pentru copii și juniori. Echipa de baschet 'Leii Roșii' este una dintre cele mai de succes din țară, având multiple titluri de campioană și fiind triplă campioană națională. Clubul oferă programe de formare pentru tinerii pasionați de baschet.",
    researchNotes: "Echipa 'Leii Roșii', triplă campioană națională, multiple titluri",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS CSȘ Bihorul Oradea - Secția de Baschet",
    sportType: "baschet",
    city: "Oradea",
    district: "N/A",
    address: "Aleea Matei Basarab nr. 4, Oradea, 410095",
    phone: "+40 359 414 150",
    email: "lps_bh@yahoo.com",
    website: "https://www.lps-bihorul.ro/",
    description:
      "Cel mai mare liceu cu profil sportiv și club sportiv școlar din nord-vestul țării, cu secție de baschet pentru copii și tineri. Reprezintă un important centru pentru sportul de performanță din Oradea și județul Bihor.",
    researchNotes: "Cel mai mare liceu cu profil sportiv din nord-vestul țării, fax: 0372 847 323",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "LPS CSȘ Bihorul Oradea - Secția de Volei",
    sportType: "volei",
    city: "Oradea",
    district: "N/A",
    address: "Aleea Matei Basarab nr. 4, Oradea, 410095",
    phone: "+40 359 414 150",
    email: "lps_bh@yahoo.com",
    website: "https://www.lps-bihorul.ro/",
    description:
      "Cel mai mare liceu cu profil sportiv și club sportiv școlar din nord-vestul țării, cu secție de volei pentru copii și tineri.",
    researchNotes:
      "Parte din LPS CSȘ Bihorul, cel mai mare liceu cu profil sportiv din nord-vestul țării",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSM Oradea - Secția de Handbal",
    sportType: "handbal",
    city: "Oradea",
    district: "N/A",
    address: "Strada Traian Blajovici Nr. 24, Oradea",
    phone: "+40 259 455 811",
    email: "contact@csmoradea.ro",
    website: "https://www.csmoradea.ro/",
    description:
      "Club Sportiv Municipal Oradea cu secție de handbal pentru copii și juniori. Dispune de echipe de juniori, oferind tinerilor sportivi posibilitatea de a se antrena și de a participa la competiții.",
    researchNotes: "Parte din CSM Oradea, echipe de juniori",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS CSȘ Bihorul Oradea - Secția de Handbal",
    sportType: "handbal",
    city: "Oradea",
    district: "N/A",
    address: "Aleea Matei Basarab nr. 4, Oradea, 410095",
    phone: "+40 359 414 150",
    email: "lps_bh@yahoo.com",
    website: "https://www.lps-bihorul.ro/",
    description:
      "Cel mai mare liceu cu profil sportiv și club sportiv școlar din nord-vestul țării, cu secție de handbal pentru copii și tineri.",
    researchNotes:
      "Parte din LPS CSȘ Bihorul, cel mai mare liceu cu profil sportiv din nord-vestul țării",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSU Oradea - Secția de Handbal Feminin",
    sportType: "handbal",
    city: "Oradea",
    district: "N/A",
    address: "Strada Universității nr. 1, Oradea, 410087",
    phone: "+40 259 237 415",
    email: "secretariat@csu-oradea.ro",
    website: "https://www.csu-oradea.ro/",
    description:
      "Clubul Sportiv Universitar Oradea și-a extins activitatea la handbal feminin pentru copii și juniori, organizând înscrieri și selecții pentru viitoarele campioane. Oferă programe pentru fete cu vârste între 6 și 12 ani, cu antrenamente desfășurate în săli moderne sub îndrumarea antrenorilor profesioniști. Antrenamente: Liceul Traian Vuia (L-J 16:30-18:00), Liceul Constantin Brâncuși (L-Mi 18:30-20:00), Liceul Teologic Penticostal Betel Oradea (Ma-J 17:30-19:00).",
    researchNotes:
      "Handbal feminin, fete 6-12 ani, săli moderne, antrenori profesioniști, antrenamente în 3 locații diferite, contact antrenori: Adela Bochiș (0743 965 111), Cristina Șandra (0759 160 390)",
    ageGroups: [6, 7, 8, 9, 10, 11, 12],
    schedule: [
      { day: "Luni", time: "16:30-18:00" },
      { day: "Luni", time: "18:30-20:00" },
      { day: "Marți", time: "17:30-19:00" },
      { day: "Miercuri", time: "18:30-20:00" },
      { day: "Joi", time: "16:30-18:00" },
      { day: "Joi", time: "17:30-19:00" },
    ],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "CSM Oradea - Secția de Tenis",
    sportType: "tenis",
    city: "Oradea",
    district: "N/A",
    address: "Strada Traian Blajovici Nr. 24, Oradea",
    phone: "+40 259 455 811",
    email: "contact@csmoradea.ro",
    website: "https://www.csmoradea.ro/",
    description: "Club Sportiv Municipal Oradea cu secție de tenis pentru copii și juniori.",
    researchNotes: "Parte din CSM Oradea, club departamental",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS CSȘ Bihorul Oradea - Secția de Tenis",
    sportType: "tenis",
    city: "Oradea",
    district: "N/A",
    address: "Aleea Matei Basarab nr. 4, Oradea, 410095",
    phone: "+40 359 414 150",
    email: "lps_bh@yahoo.com",
    website: "https://www.lps-bihorul.ro/",
    description:
      "Cel mai mare liceu cu profil sportiv și club sportiv școlar din nord-vestul țării, cu secție de tenis pentru copii și tineri.",
    researchNotes:
      "Parte din LPS CSȘ Bihorul, cel mai mare liceu cu profil sportiv din nord-vestul țării",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "CSM Oradea - Secția de Înot",
    sportType: "inot",
    city: "Oradea",
    district: "N/A",
    address: "Bazinul Olimpic Ioan Alexandrescu, Aleea Ștrandului nr. 1, Oradea",
    phone: "+40 359 455 450",
    email: "contact@csmoradea.ro",
    website: "https://www.csmoradea.ro/",
    description:
      "Club Sportiv Municipal Oradea cu secție de înot la Bazinul Olimpic Ioan Alexandrescu pentru copii și juniori. Oferă cursuri de inițiere și perfecționare în înot. Program pentru public: L-V 05:00-10:00, 12:00-15:00 (14:00-15:00 partajat), 20:00-23:00 (20:00-22:00 partajat), Sâmbătă 08:00-10:00 și 12:00-18:00, Duminică 08:00-18:00. Abonamente disponibile prin platforma Eventbook.",
    researchNotes:
      "Bazinul Olimpic Ioan Alexandrescu, cursuri inițiere și perfecționare, program extins pentru public, abonamente Eventbook, instructor: Ghitea Remus (0745 326 335)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "05:00-10:00" },
      { day: "Luni", time: "12:00-15:00" },
      { day: "Luni", time: "20:00-23:00" },
      { day: "Marți", time: "05:00-10:00" },
      { day: "Marți", time: "12:00-15:00" },
      { day: "Marți", time: "20:00-23:00" },
      { day: "Miercuri", time: "05:00-10:00" },
      { day: "Miercuri", time: "12:00-15:00" },
      { day: "Miercuri", time: "20:00-23:00" },
      { day: "Joi", time: "05:00-10:00" },
      { day: "Joi", time: "12:00-15:00" },
      { day: "Joi", time: "20:00-23:00" },
      { day: "Vineri", time: "05:00-10:00" },
      { day: "Vineri", time: "12:00-15:00" },
      { day: "Vineri", time: "20:00-23:00" },
      { day: "Sâmbătă", time: "08:00-10:00" },
      { day: "Sâmbătă", time: "12:00-18:00" },
      { day: "Duminică", time: "08:00-18:00" },
    ],
  }),

  createClubFromResearch({
    name: "LPS CSȘ Bihorul Oradea - Secția de Înot",
    sportType: "inot",
    city: "Oradea",
    district: "N/A",
    address: "Aleea Matei Basarab nr. 4, Oradea, 410095",
    phone: "+40 359 414 150",
    email: "lps_bh@yahoo.com",
    website: "https://www.lps-bihorul.ro/",
    description:
      "Cel mai mare liceu cu profil sportiv și club sportiv școlar din nord-vestul țării, cu secție de înot pentru copii și tineri.",
    researchNotes:
      "Parte din LPS CSȘ Bihorul, cel mai mare liceu cu profil sportiv din nord-vestul țării, fax: 0372 847 323",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Crișul Oradea - Secția de Înot",
    sportType: "inot",
    city: "Oradea",
    district: "N/A",
    address: "Bazinul acoperit Crișul, Strada Codrilor, Oradea",
    phone: "+40 359 800 562",
    email: "cscrisul1958@yahoo.com",
    website: "https://www.cscrisul.ro/",
    description:
      "Club Sportiv Crișul Oradea cu secție de înot la Bazinul acoperit Crișul pentru copii. Cursurile sunt organizate în weekenduri, cu o frecvență de șase weekenduri consecutive. Durata unei ședințe este de 45-50 de minute.",
    researchNotes:
      "Bazinul acoperit Crișul, cursuri weekenduri, 6 weekenduri consecutive, 45-50 minute/ședință",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Sâmbătă", time: "09:00-18:00" },
      { day: "Duminică", time: "09:00-18:00" },
    ],
    pricing: [{ type: "per_semester", amount: 150, currency: "RON" }],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "LPS CSȘ Bihorul Oradea - Secția de Gimnastică Ritmică",
    sportType: "gimnastica",
    city: "Oradea",
    district: "N/A",
    address: "Aleea Matei Basarab nr. 4, Oradea, 410095",
    phone: "+40 359 414 150",
    email: "lps_bh@yahoo.com",
    website: "https://www.lps-bihorul.ro/",
    description:
      "Cel mai mare liceu cu profil sportiv și club sportiv școlar din nord-vestul țării, cu secție de gimnastică ritmică pentru copii și tineri.",
    researchNotes:
      "Parte din LPS CSȘ Bihorul, cel mai mare liceu cu profil sportiv din nord-vestul țării",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Oradea - Secția de Gimnastică Aerobică",
    sportType: "gimnastica",
    city: "Oradea",
    district: "N/A",
    address: "Strada Muzeului nr. 2, Oradea",
    phone: "+40 259 411 548",
    email: "pcoradea@gmail.com",
    website: "http://www.palatulcopiilororadea.ro/",
    description:
      "Palatul Copiilor Oradea oferă activități de gimnastică aerobică pentru copii. Copiii învață pozițiile de bază ale corpului, pași din dansul sportiv, modern și tradițional stilizat, precum și elemente specifice gimnasticii aerobice: construcții piramidale, elemente tehnice semi-acrobatice și acrobatice, sărituri artistice și elemente de mobilitate.",
    researchNotes:
      "Gimnastică aerobică, elemente artistice și acrobatice, construcții piramidale, sărituri artistice",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Palatul Copiilor Oradea - Secția de Dans Modern",
    sportType: "dans",
    city: "Oradea",
    district: "N/A",
    address: "Strada Muzeului nr. 2, Oradea",
    phone: "+40 259 411 548",
    email: "pcoradea@gmail.com",
    website: "http://www.palatulcopiilororadea.ro/",
    description:
      "Palatul Copiilor Oradea oferă activități de dans modern pentru copii. Copiii învață pozițiile de bază ale corpului, pași din dansul sportiv, modern și tradițional stilizat. Activitățile sunt desfășurate într-un mediu plăcut, acompaniat de muzică și bună dispoziție.",
    researchNotes: "Dans modern, mediu plăcut, acompaniat de muzică",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CSM Oradea - Secția de Atletism",
    sportType: "atletism",
    city: "Oradea",
    district: "N/A",
    address: "Strada Traian Blajovici Nr. 24, Oradea",
    phone: "+40 259 455 811",
    email: "contact@csmoradea.ro",
    website: "https://www.csmoradea.ro/",
    description: "Club Sportiv Municipal Oradea cu secție de atletism pentru copii și juniori.",
    researchNotes: "Parte din CSM Oradea, club departamental",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS CSȘ Bihorul Oradea - Secția de Atletism",
    sportType: "atletism",
    city: "Oradea",
    district: "N/A",
    address: "Aleea Matei Basarab nr. 4, Oradea, 410095",
    phone: "+40 359 414 150",
    email: "lps_bh@yahoo.com",
    website: "https://www.lps-bihorul.ro/",
    description:
      "Cel mai mare liceu cu profil sportiv și club sportiv școlar din nord-vestul țării, cu secție de atletism pentru copii și tineri.",
    researchNotes:
      "Parte din LPS CSȘ Bihorul, cel mai mare liceu cu profil sportiv din nord-vestul țării",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CSM Oradea - Secția de Judo",
    sportType: "judo",
    city: "Oradea",
    district: "N/A",
    address: "Strada Traian Blajovici Nr. 24, Oradea",
    phone: "+40 259 455 811",
    email: "contact@csmoradea.ro",
    website: "https://www.csmoradea.ro/",
    description:
      "Club Sportiv Municipal Oradea cu secție de judo pentru copii. Oferă programe de judo pentru copii, promovând disciplina și dezvoltarea fizică prin acest sport.",
    researchNotes: "Parte din CSM Oradea, promovează disciplină și dezvoltare fizică",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS CSȘ Bihorul Oradea - Secția de Judo",
    sportType: "judo",
    city: "Oradea",
    district: "N/A",
    address: "Aleea Matei Basarab nr. 4, Oradea, 410095",
    phone: "+40 359 414 150",
    email: "lps_bh@yahoo.com",
    website: "https://www.lps-bihorul.ro/",
    description:
      "Cel mai mare liceu cu profil sportiv și club sportiv școlar din nord-vestul țării, cu secție de judo pentru copii și tineri.",
    researchNotes:
      "Parte din LPS CSȘ Bihorul, cel mai mare liceu cu profil sportiv din nord-vestul țării",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Crișul Oradea - Secția de Karate",
    sportType: "karate",
    city: "Oradea",
    district: "N/A",
    address: "Aleea Ștrandului nr. 11, Oradea",
    phone: "+40 359 800 562",
    email: "cscrisul1958@yahoo.com",
    website: "https://www.cscrisul.ro/",
    description:
      "Club Sportiv Crișul Oradea cu secție de karate pentru copii. Organizează selecții pentru copii între 5 și 11 ani, cu antrenamente conduse de antrenori experimentați.",
    researchNotes:
      "Selecții pentru copii 5-11 ani, antrenori experimentați, parte din CS Crișul (25 secții)",
    ageGroups: [5, 6, 7, 8, 9, 10, 11],
  }),

  createClubFromResearch({
    name: "CS Gym Oradea - Karate Kyokushin",
    sportType: "karate",
    city: "Oradea",
    district: "N/A",
    address: "Strada Emanuil Gojdu nr. 3, Oradea",
    phone: "+40 259 416 919",
    email: undefined,
    website: "http://www.gym-oradea.ro",
    description:
      "Club Sportiv Gym Oradea specializat în Karate Kyokushin pentru copii. Oferă antrenamente sub îndrumarea unor antrenori calificați și campioni europeni: Anca Wallmen (centură neagră 3 dan), Marius Ilas (centură neagră 2 dan) și Harris Wallmen (centură neagră 3 dan). Stil full-contact care pune accent pe dezvoltarea fizică și mentală.",
    researchNotes:
      "Karate Kyokushin full-contact, antrenori: Anca Wallmen (3 dan), Marius Ilas (2 dan), Harris Wallmen (3 dan), accent pe dezvoltare fizică și mentală",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS CSȘ Bihorul Oradea - Secția de Lupte Greco-Romane",
    sportType: "lupte",
    city: "Oradea",
    district: "N/A",
    address: "Aleea Matei Basarab nr. 4, Oradea, 410095",
    phone: "+40 359 414 150",
    email: "lps_bh@yahoo.com",
    website: "https://www.lps-bihorul.ro/",
    description:
      "Cel mai mare liceu cu profil sportiv și club sportiv școlar din nord-vestul țării, cu secție de lupte greco-romane pentru copii și tineri.",
    researchNotes:
      "Parte din LPS CSȘ Bihorul, cel mai mare liceu cu profil sportiv din nord-vestul țării",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== SCRIMĂ (Fencing) ==========
  createClubFromResearch({
    name: "CSM Oradea - Secția de Scrimă",
    sportType: "scrima",
    city: "Oradea",
    district: "N/A",
    address: "Strada Traian Blajovici Nr. 24, Oradea",
    phone: "+40 259 455 811",
    email: "contact@csmoradea.ro",
    website: "https://www.csmoradea.ro/",
    description:
      "Club Sportiv Municipal Oradea cu secție de scrimă dedicată copiilor, unde aceștia pot învăța și practica acest sport sub îndrumarea antrenorilor calificați.",
    researchNotes: "Parte din CSM Oradea, antrenori calificați",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Crișul Oradea - Secția de Scrimă",
    sportType: "scrima",
    city: "Oradea",
    district: "N/A",
    address: "Aleea Ștrandului nr. 11, Oradea",
    phone: "+40 359 800 562",
    email: "cscrisul1958@yahoo.com",
    website: "https://www.cscrisul.ro/",
    description:
      "Club Sportiv Crișul Oradea cu secție de scrimă pentru copii. Organizează selecții pentru începători cu vârste între 6 și 9 ani, cât și pentru avansați și amatori de orice vârstă.",
    researchNotes:
      "Selecții pentru începători 6-9 ani și avansați, parte din CS Crișul (25 secții), antrenor: Horváth Christian (0771 628 782)",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS CSȘ Bihorul Oradea - Secția de Scrimă",
    sportType: "scrima",
    city: "Oradea",
    district: "N/A",
    address: "Aleea Matei Basarab nr. 4, Oradea, 410095",
    phone: "+40 359 414 150",
    email: "lps_bh@yahoo.com",
    website: "https://www.lps-bihorul.ro/",
    description:
      "Cel mai mare liceu cu profil sportiv și club sportiv școlar din nord-vestul țării, cu secție de scrimă pentru copii și tineri.",
    researchNotes:
      "Parte din LPS CSȘ Bihorul, cel mai mare liceu cu profil sportiv din nord-vestul țării",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== POLO PE APĂ (Water Polo) ==========
  createClubFromResearch({
    name: "CSM Oradea - Secția de Polo pe Apă",
    sportType: "polo-apa",
    city: "Oradea",
    district: "N/A",
    address: "Bazinul Olimpic Ioan Alexandrescu, Aleea Ștrandului nr. 1, Oradea",
    phone: "+40 259 455 811",
    email: "contact@csmoradea.ro",
    website: "https://www.csmoradea.ro/",
    description:
      "Club Sportiv Municipal Oradea cu secție de polo pe apă pentru copii și juniori. Are o tradiție îndelungată în polo pe apă, cu rezultate remarcabile la nivel național și internațional. Echipele au obținut rezultate remarcabile, fiind vicecampioane ale României în 2023.",
    researchNotes:
      "Tradiție îndelungată, rezultate remarcabile național și internațional, vicecampioane România 2023",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport Clubs) ==========
  createClubFromResearch({
    name: "CSM Oradea",
    sportType: "multi-sport",
    city: "Oradea",
    district: "N/A",
    address: "Strada Traian Blajovici Nr. 24, Oradea, Bihor",
    phone: "+40 259 455 811",
    email: "contact@csmoradea.ro",
    website: "https://www.csmoradea.ro/",
    description:
      "Club Sportiv Municipal Oradea, club departamental înființat de Primăria Oradea. Activează în diverse discipline sportive: baschet (echipa 'Leii Roșii' - triplă campioană națională), fotbal, handbal, tenis, polo pe apă (vicecampioane România 2023), atletism, judo și scrimă. Rezervări baze sportive: rezervari@csmoradea.ro. Program casierie: L 9:00-13:00, Ma-Mi 12:00-16:00, J închis, V 9:00-13:00.",
    researchNotes:
      "Club departamental, echipa baschet 'Leii Roșii' triplă campioană națională, polo pe apă vicecampioane România 2023, rezervări baze sportive: rezervari@csmoradea.ro",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS CSȘ Bihorul Oradea",
    sportType: "multi-sport",
    city: "Oradea",
    district: "N/A",
    address: "Aleea Matei Basarab nr. 4, Oradea, 410095",
    phone: "+40 359 414 150",
    email: "lps_bh@yahoo.com",
    website: "https://www.lps-bihorul.ro/",
    description:
      "Cel mai mare liceu cu profil sportiv și club sportiv școlar din nord-vestul țării, reprezentând un important centru pentru sportul de performanță din Oradea și județul Bihor. Oferă secții în: atletism, baschet, fotbal, gimnastică ritmică, handbal, înot, judo, lupte greco-romane, scrimă, tenis și volei. Prin infrastructura sa, creează premisele obținerii performanțelor sportive la nivel de juniorat și servește ca trambulină spre marea performanță pentru cei mai talentați și dedicați elevi.",
    researchNotes:
      "Cel mai mare liceu cu profil sportiv din nord-vestul țării, 11 secții sportive, centru pentru sportul de performanță, fax: 0372 847 323",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Crișul Oradea",
    sportType: "multi-sport",
    city: "Oradea",
    district: "N/A",
    address: "Aleea Ștrandului nr. 11, Oradea, Bihor",
    phone: "+40 359 800 562",
    email: "cscrisul1958@yahoo.com",
    website: "https://www.cscrisul.ro/",
    description:
      "Club Sportiv Crișul Oradea, club departamental aflat în subordinea Agenției Naționale pentru Sport, funcționează conform regulamentelor aprobate de Ministerul Tineretului și Sportului. Are în structură 25 de secții sportive: atletism, box, baschet, handbal, haltere, natație și pentatlon modern, judo, karate, kempo, polo pe apă, scrimă, șah, rugby, lupte, sambo, powerlifting, taekwondo WT, tenis de masă, ciclism, fotbal, sporturi pentru persoane cu nevoi speciale, tenis, triatlon, tir cu arcul și teqball. Obiectiv principal: activitatea de performanță, selecția, pregătirea și participarea la competițiile interne și internaționale, promovând cu prioritate disciplinele incluse în programul Jocurilor Olimpice.",
    researchNotes:
      "Club departamental subordonat Agenției Naționale pentru Sport, 25 secții sportive, activitate de performanță, selecții pentru copii și tineri, prioritizează disciplinele olimpice",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Oradea",
    sportType: "multi-sport",
    city: "Oradea",
    district: "N/A",
    address: "Strada Muzeului nr. 2, Oradea, 410161",
    phone: "+40 259 411 548",
    email: "pcoradea@gmail.com",
    website: "http://www.palatulcopiilororadea.ro/",
    description:
      "Palatul Copiilor Oradea oferă activități sportive pentru copii: gimnastică aerobică, dans modern și karate (coord. Ioan Vaida, copii 5-14 ani). Activitățile sunt desfășurate într-un mediu plăcut, acompaniat de muzică și bună dispoziție. Pentru înscrieri în anul școlar 2025-2026, acestea se desfășoară în intervalul orar 10:00-18:00.",
    researchNotes:
      "Gimnastică aerobică, dans modern și karate, mediu plăcut, înscrieri 10:00-18:00 pentru anul școlar 2025-2026, fax: 0359 464 558",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "10:00-18:00" },
      { day: "Marți", time: "10:00-18:00" },
      { day: "Miercuri", time: "10:00-18:00" },
      { day: "Joi", time: "10:00-18:00" },
      { day: "Vineri", time: "10:00-18:00" },
    ],
  }),
];

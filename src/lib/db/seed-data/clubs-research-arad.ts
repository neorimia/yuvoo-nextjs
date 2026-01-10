/**
 * Clubs Research Data - Arad
 *
 * Date reale colectate prin research public pentru cluburi sportive din Arad.
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
 * Cluburi verificate și completate: 2
 */

import {
  generateSlug,
  getCityCoordinates,
  generateAgeGroups,
  generateLevels,
  generateSchedule,
  generatePricing,
  generateImageUrls,
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
    galleryUrls: data.galleryUrls || generateImageUrls(3),
    verified: false, // Research clubs start as unverified
    featured: false, // Research clubs start as not featured
    rating: 0, // No rating until verified
    verificationStatus: "pending", // Needs admin review
  };
}

/**
 * Research Data - Cluburi Sportive Arad
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_ARAD: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "UTA Arad - Academia de Fotbal",
    sportType: "fotbal",
    city: "Arad",
    district: "N/A",
    address: "Calea Victoriei nr. 20, Arad, 310158",
    phone: "+40 749 012 175",
    email: "academie@uta-arad.ro",
    website: "https://www.academia-uta.ro/",
    description:
      "Academia UTA Arad este principalul centru de formare pentru copii și juniori al clubului UTA Arad. Organizează selecții pentru diverse grupe de vârstă și oferă acces gratuit la meciurile echipei mari pentru tinerii fotbaliști din municipiu și județ. A legitimat 75 de copii prin proiectul 'Voucher pentru sport'.",
    researchNotes:
      "Academia de formare, selecții pentru diverse grupe de vârstă, acces gratuit la meciuri, 75 copii legitimați",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Gloria Arad - Secția de Fotbal",
    sportType: "fotbal",
    city: "Arad",
    district: "N/A",
    address: "Teren Fotbal Subcetate, Arad",
    phone: "+40 257 280 250",
    email: "cssgloria.arad@gmail.com",
    website: "https://www.cssgloriaarad.ro/",
    description:
      "Club Sportiv Școlar 'Gloria' Arad cu secție de fotbal pentru copii și tineri. Sub îndrumarea a 28 de profesori specializați, aproximativ 726 de copii participă la antrenamente organizate pe 55 de grupe, de la începători la avansați și performanță.",
    researchNotes: "Parte din CSS Gloria, 726 copii înscriși, 55 grupe, 28 profesori specializați",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Atletico Arad",
    sportType: "fotbal",
    city: "Arad",
    district: "N/A",
    address: "Strada Hunedoarei, nr. 27-37, Arad",
    phone: "+40 257 214 249",
    description:
      "Club privat de fotbal care a început cu o singură grupă de copii și a crescut la 12 grupe, având între 220 și 250 de copii. Este recunoscut la nivel național pentru dezvoltarea juniorilor.",
    researchNotes:
      "Club privat, 12 grupe, 220-250 copii, recunoscut la nivel național pentru dezvoltarea juniorilor",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSS Gloria Arad - Secția de Baschet",
    sportType: "baschet",
    city: "Arad",
    district: "N/A",
    address: "Sala Decebal, Arad",
    phone: "+40 257 280 250",
    email: "cssgloria.arad@gmail.com",
    website: "https://www.cssgloriaarad.ro/",
    description:
      "Club Sportiv Școlar 'Gloria' Arad cu secție de baschet pentru copii și tineri. Antrenamentele se desfășoară în Sala Decebal. Sub îndrumarea a 28 de profesori specializați, aproximativ 726 de copii participă la antrenamente organizate pe 55 de grupe.",
    researchNotes:
      "Parte din CSS Gloria, antrenamente în Sala Decebal, 726 copii înscriși, 55 grupe",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CS ProVolei Arad",
    sportType: "volei",
    city: "Arad",
    district: "N/A",
    address: "Arad",
    description:
      "Club Sportiv ProVolei Arad pentru copii și juniori. A legitimat 15 copii prin proiectul 'Voucher pentru sport', contribuind la dezvoltarea acestui sport în rândul tinerilor arădeni.",
    researchNotes: "15 copii legitimați prin proiectul 'Voucher pentru sport'",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSS Gloria Arad - Secția de Handbal",
    sportType: "handbal",
    city: "Arad",
    district: "N/A",
    address: "Școala Generală nr. 12 'Regina Maria' și Sala Decebal, Arad",
    phone: "+40 257 280 250",
    email: "cssgloria.arad@gmail.com",
    website: "https://www.cssgloriaarad.ro/",
    description:
      "Club Sportiv Școlar 'Gloria' Arad cu secție de handbal pentru copii și tineri. Antrenamentele se desfășoară în Școala Generală nr. 12 'Regina Maria' și Sala Decebal. Sub îndrumarea a 28 de profesori specializați, aproximativ 726 de copii participă la antrenamente organizate pe 55 de grupe.",
    researchNotes:
      "Parte din CSS Gloria, antrenamente în Școala Generală nr. 12 și Sala Decebal, 726 copii înscriși",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "HC Beldiman Arad",
    sportType: "handbal",
    city: "Arad",
    district: "N/A",
    address: "Arad",
    description:
      "Club de handbal HC Beldiman Arad pentru copii și juniori. A legitimat 47 de copii prin proiectul 'Voucher pentru sport', oferind oportunități de dezvoltare în acest sport.",
    researchNotes: "47 copii legitimați prin proiectul 'Voucher pentru sport'",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "CSM Arad - Secția de Tenis de Masă",
    sportType: "tenis",
    city: "Arad",
    district: "N/A",
    address: "Strada Lucian Blaga nr. 20, Arad, 310023",
    phone: "+40 257 280 347",
    email: "csm.arad@mts.ro",
    website: "https://www.csmarad.ro/",
    description:
      "Club Sportiv Municipal Arad cu secție de tenis de masă pentru copii și juniori. Este afiliat la Federația Română de Tenis de Masă, având sportivi legitimați care participă la competiții naționale.",
    researchNotes:
      "Parte din CSM Arad, afiliat Federația Română de Tenis de Masă, participare competiții naționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "CSS Gloria Arad - Secția de Înot",
    sportType: "inot",
    city: "Arad",
    district: "N/A",
    address: "Bazinul Subcetate, Arad",
    phone: "+40 257 280 250",
    email: "cssgloria.arad@gmail.com",
    website: "https://www.cssgloriaarad.ro/",
    description:
      "Club Sportiv Școlar 'Gloria' Arad cu secție de înot pentru copii și tineri. Antrenamentele se desfășoară la Bazinul Subcetate. Sub îndrumarea a 28 de profesori specializați, aproximativ 726 de copii participă la antrenamente organizate pe 55 de grupe.",
    researchNotes:
      "Parte din CSS Gloria, antrenamente la Bazinul Subcetate, 726 copii înscriși, 55 grupe",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Complexul Sportiv Delfinul Arad",
    sportType: "inot",
    city: "Arad",
    district: "N/A",
    address: "Strada Eugen Popa nr. 2-4, Arad",
    phone: "+40 257 281 841",
    email: "delfinul@primariaarad.ro",
    description:
      "Complexul Sportiv Delfinul Arad dispune de un bazin olimpic acoperit și oferă cursuri de înot pentru copii. Program: L-V 06:00-22:00, Sâmbătă-Duminică 08:00-20:00.",
    researchNotes:
      "Bazin olimpic acoperit, program extins: L-V 06:00-22:00, Sâmbătă-Duminică 08:00-20:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "06:00-22:00" },
      { day: "Marți", time: "06:00-22:00" },
      { day: "Miercuri", time: "06:00-22:00" },
      { day: "Joi", time: "06:00-22:00" },
      { day: "Vineri", time: "06:00-22:00" },
      { day: "Sâmbătă", time: "08:00-20:00" },
      { day: "Duminică", time: "08:00-20:00" },
    ],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "CSS Gloria Arad - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Arad",
    district: "N/A",
    address: "Stadionul Gloria, Arad",
    phone: "+40 257 280 250",
    email: "cssgloria.arad@gmail.com",
    website: "https://www.cssgloriaarad.ro/",
    description:
      "Club Sportiv Școlar 'Gloria' Arad cu secție de gimnastică pentru copii și tineri. Antrenamentele se desfășoară la Stadionul Gloria. Sub îndrumarea a 28 de profesori specializați, aproximativ 726 de copii participă la antrenamente organizate pe 55 de grupe.",
    researchNotes:
      "Parte din CSS Gloria, antrenamente la Stadionul Gloria, 726 copii înscriși, 55 grupe",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Arad - Secția de Gimnastică Aerobică",
    sportType: "gimnastica",
    city: "Arad",
    district: "N/A",
    address: "Strada Lucian Blaga nr. 20, Arad, 310023",
    phone: "+40 257 280 347",
    email: "csm.arad@mts.ro",
    website: "https://www.csmarad.ro/",
    description:
      "Club Sportiv Municipal Arad cu secție de gimnastică aerobică pentru copii și juniori. CSM Arad a obținut rezultate remarcabile în competițiile naționale, organizând și participând la evenimente precum Campionatul Național de Gimnastică Aerobică și concursul național 'Kids Development'.",
    researchNotes:
      "Parte din CSM Arad, rezultate remarcabile în competiții naționale, organizare Campionatul Național",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Arad - Secția de Gimnastică Ritmică",
    sportType: "gimnastica",
    city: "Arad",
    district: "N/A",
    address: "Strada Lucian Blaga nr. 20, Arad, 310023",
    phone: "+40 257 280 347",
    email: "csm.arad@mts.ro",
    website: "https://www.csmarad.ro/",
    description:
      "Club Sportiv Municipal Arad cu secție de gimnastică ritmică pentru copii și juniori. Clubul organizează competiții precum Cupa CSM Arad, unde gimnastele obțin rezultate notabile la diverse categorii de vârstă.",
    researchNotes:
      "Parte din CSM Arad, organizare Cupa CSM Arad, rezultate notabile la diverse categorii de vârstă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Arad - Secția de Gimnastică Aerobică",
    sportType: "gimnastica",
    city: "Arad",
    district: "N/A",
    address: "Bulevardul Revoluției, nr. 69, Arad, 310130",
    phone: "+40 257 255 508",
    email: "palatulcopiilor2001@yahoo.com",
    website: "http://www.palatulcopiilorarad.ro/",
    description:
      "Palatul Copiilor Arad oferă activități de gimnastică aerobică pentru copii și tineri cu vârste între 4 și 18 ani. Activitățile sunt coordonate de profesori experimentați și se desfășoară în spații adecvate.",
    researchNotes:
      "Gimnastică aerobică pentru copii 4-18 ani, profesori experimentați, spații adecvate",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "CS Ballroom Dance Arad",
    sportType: "dans",
    city: "Arad",
    district: "N/A",
    address: "Calea Timișorii, nr. 30, Arad",
    phone: "+40 740 470 709",
    email: "mirelacos@yahoo.com",
    website: "http://www.dans-arad.ro",
    description:
      "Club Sportiv Ballroom Dance Arad oferă cursuri de dans sportiv pentru copii, inclusiv stiluri latino și standard, precum și cursuri de street dance, karate, gimnastică medicală, modeling și balet. A legitimat 30 de copii prin proiectul 'Voucher pentru sport'. Program: L-V 15:00-21:00, Sâmbătă-Duminică 09:00-15:00.",
    researchNotes:
      "Dans sportiv, stiluri latino și standard, street dance, 30 copii legitimați, program: L-V 15:00-21:00, Sâmbătă-Duminică 09:00-15:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "15:00-21:00" },
      { day: "Marți", time: "15:00-21:00" },
      { day: "Miercuri", time: "15:00-21:00" },
      { day: "Joi", time: "15:00-21:00" },
      { day: "Vineri", time: "15:00-21:00" },
      { day: "Sâmbătă", time: "09:00-15:00" },
      { day: "Duminică", time: "09:00-15:00" },
    ],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Arad - Secția de Dans Sportiv",
    sportType: "dans",
    city: "Arad",
    district: "N/A",
    address: "Bulevardul Revoluției, nr. 69, Arad, 310130",
    phone: "+40 257 255 508",
    email: "palatulcopiilor2001@yahoo.com",
    website: "http://www.palatulcopiilorarad.ro/",
    description:
      "Palatul Copiilor Arad oferă activități de dans sportiv pentru copii și tineri cu vârste între 4 și 18 ani. Activitățile sunt coordonate de profesori experimentați și se desfășoară în spații adecvate.",
    researchNotes: "Dans sportiv pentru copii 4-18 ani, profesori experimentați, spații adecvate",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Arad - Secția de Dans Modern",
    sportType: "dans",
    city: "Arad",
    district: "N/A",
    address: "Bulevardul Revoluției, nr. 69, Arad, 310130",
    phone: "+40 257 255 508",
    email: "palatulcopiilor2001@yahoo.com",
    website: "http://www.palatulcopiilorarad.ro/",
    description:
      "Palatul Copiilor Arad oferă activități de dans modern pentru copii și tineri cu vârste între 4 și 18 ani. Activitățile sunt coordonate de profesori experimentați și se desfășoară în spații adecvate.",
    researchNotes: "Dans modern pentru copii 4-18 ani, profesori experimentați, spații adecvate",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Arad - Secția de Dans Popular",
    sportType: "dans",
    city: "Arad",
    district: "N/A",
    address: "Bulevardul Revoluției, nr. 69, Arad, 310130",
    phone: "+40 257 255 508",
    email: "palatulcopiilor2001@yahoo.com",
    website: "http://www.palatulcopiilorarad.ro/",
    description:
      "Palatul Copiilor Arad oferă activități de dans popular pentru copii și tineri cu vârste între 4 și 18 ani. Activitățile sunt coordonate de profesori experimentați și se desfășoară în spații adecvate.",
    researchNotes: "Dans popular pentru copii 4-18 ani, profesori experimentați, spații adecvate",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CSS Gloria Arad - Secția de Atletism",
    sportType: "atletism",
    city: "Arad",
    district: "N/A",
    address: "Stadionul Gloria, Arad",
    phone: "+40 257 280 250",
    email: "cssgloria.arad@gmail.com",
    website: "https://www.cssgloriaarad.ro/",
    description:
      "Club Sportiv Școlar 'Gloria' Arad cu secție de atletism pentru copii și tineri. Antrenamentele se desfășoară la Stadionul Gloria. Sub îndrumarea a 28 de profesori specializați, aproximativ 726 de copii participă la antrenamente organizate pe 55 de grupe. În ultimii ani, clubul a obținut rezultate remarcabile, inclusiv 84 de medalii la competiții naționale în anul școlar 2024-2025: 21 de aur, 32 de argint și 31 de bronz.",
    researchNotes:
      "Parte din CSS Gloria, antrenamente la Stadionul Gloria, 726 copii înscriși, 55 grupe, 84 medalii naționale (21 aur, 32 argint, 31 bronz) în 2024-2025",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CSS Gloria Arad - Secția de Judo",
    sportType: "judo",
    city: "Arad",
    district: "N/A",
    address: "Strada Ion Rusu Șirianu nr. 6, Arad, 310035",
    phone: "+40 257 280 250",
    email: "cssgloria.arad@gmail.com",
    website: "https://www.cssgloriaarad.ro/",
    description:
      "Club Sportiv Școlar 'Gloria' Arad cu secție de judo pentru copii și tineri. Antrenamentele se desfășoară pe Strada Ion Rusu Șirianu nr. 6. Sub îndrumarea a 28 de profesori specializați, aproximativ 726 de copii participă la antrenamente organizate pe 55 de grupe.",
    researchNotes:
      "Parte din CSS Gloria, antrenamente pe Strada Ion Rusu Șirianu nr. 6, 726 copii înscriși, 55 grupe",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Arad - Secția de Judo",
    sportType: "judo",
    city: "Arad",
    district: "N/A",
    address: "Strada Lucian Blaga nr. 20, Arad, 310023",
    phone: "+40 257 280 347",
    email: "csm.arad@mts.ro",
    website: "https://www.csmarad.ro/",
    description:
      "Club Sportiv Municipal Arad cu secție de judo pentru copii și juniori. Are o secție activă de judo, participând la diverse competiții naționale și internaționale.",
    researchNotes: "Parte din CSM Arad, participare competiții naționale și internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Arad - Secția de Karate",
    sportType: "karate",
    city: "Arad",
    district: "N/A",
    address: "Bulevardul Revoluției, nr. 69, Arad, 310130",
    phone: "+40 257 255 508",
    email: "palatulcopiilor2001@yahoo.com",
    website: "http://www.palatulcopiilorarad.ro/",
    description:
      "Palatul Copiilor Arad oferă activități de karate pentru copii și tineri cu vârste între 4 și 18 ani. Activitățile sunt coordonate de profesori experimentați și se desfășoară în spații adecvate.",
    researchNotes: "Karate pentru copii 4-18 ani, profesori experimentați, spații adecvate",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Arad - Secția de Judo",
    sportType: "judo",
    city: "Arad",
    district: "N/A",
    address: "Bulevardul Revoluției, nr. 69, Arad, 310130",
    phone: "+40 257 255 508",
    email: "palatulcopiilor2001@yahoo.com",
    website: "http://www.palatulcopiilorarad.ro/",
    description:
      "Palatul Copiilor Arad oferă activități de judo pentru copii și tineri cu vârste între 4 și 18 ani. Activitățile sunt coordonate de profesori experimentați și se desfășoară în spații adecvate.",
    researchNotes: "Judo pentru copii 4-18 ani, profesori experimentați, spații adecvate",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Gloria Arad - Secția de Lupte",
    sportType: "lupte",
    city: "Arad",
    district: "N/A",
    address: "Sala Roman Codreanu, Strada Tudor Vladimirescu nr. 1, Arad",
    phone: "+40 257 280 250",
    email: "cssgloria.arad@gmail.com",
    website: "https://www.cssgloriaarad.ro/",
    description:
      "Club Sportiv Școlar 'Gloria' Arad cu secție de lupte pentru copii și tineri. Antrenamentele se desfășoară în Sala Roman Codreanu. Sub îndrumarea a 28 de profesori specializați, aproximativ 726 de copii participă la antrenamente organizate pe 55 de grupe.",
    researchNotes:
      "Parte din CSS Gloria, antrenamente în Sala Roman Codreanu, 726 copii înscriși, 55 grupe",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport Clubs) ==========
  createClubFromResearch({
    name: "CSS Gloria Arad",
    sportType: "multi-sport",
    city: "Arad",
    district: "N/A",
    address: "Strada Ion Rusu Șirianu, nr. 6, Arad, 310035",
    phone: "+40 257 280 250",
    email: "cssgloria.arad@gmail.com",
    website: "https://www.cssgloriaarad.ro/",
    description:
      "Clubul Sportiv Școlar 'Gloria' Arad este o instituție dedicată formării și dezvoltării tinerilor sportivi în diverse discipline. În prezent, clubul cuprinde 10 secții sportive: atletism (Stadionul Gloria), baschet (Sala Decebal), fotbal (Teren Fotbal Subcetate), gimnastică (Stadionul Gloria), haltere (Str. Ion Rusu Șirianu nr. 6), handbal (Școala Generală nr. 12 'Regina Maria' și Sala Decebal), înot (Bazinul Subcetate), judo (Str. Ion Rusu Șirianu nr. 6), kaiac (Malul Mureșului) și lupte (Sala Roman Codreanu, Str. Tudor Vladimirescu nr. 1). Sub îndrumarea a 28 de profesori specializați, aproximativ 726 de copii sunt organizați în 55 de grupe, de la nivel începător până la performanță. În ultimii ani, clubul a obținut rezultate remarcabile, inclusiv 84 de medalii la competiții naționale în anul școlar 2024-2025: 21 de aur, 32 de argint și 31 de bronz. De asemenea, 17 sportivi au fost selecționați pentru acțiuni ale loturilor naționale sau au participat la programe de pregătire ale federațiilor naționale.",
    researchNotes:
      "10 secții sportive cu locații specifice, 726 copii înscriși, 55 grupe, 28 profesori specializați, 84 medalii naționale (21 aur, 32 argint, 31 bronz) în 2024-2025, 17 sportivi în loturile naționale, fax: 0257 280 250",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Arad",
    sportType: "multi-sport",
    city: "Arad",
    district: "N/A",
    address: "Strada Lucian Blaga nr. 20, Arad, 310023",
    phone: "+40 257 280 347",
    email: "csm.arad@mts.ro",
    website: "https://www.csmarad.ro/",
    description:
      "Club Sportiv Municipal Arad oferă o varietate de secții sportive dedicate copiilor: gimnastică aerobică (rezultate remarcabile în competiții naționale, organizare Campionatul Național de Gimnastică Aerobică și concursul național 'Kids Development'), gimnastică ritmică (organizare Cupa CSM Arad, rezultate notabile la diverse categorii de vârstă), judo (participare competiții naționale și internaționale) și tenis de masă (afiliat Federația Română de Tenis de Masă, participare competiții naționale). A legitimat 44 de copii prin proiectul 'Voucher pentru sport'.",
    researchNotes:
      "Multiple secții sportive, 44 copii legitimați prin proiectul 'Voucher pentru sport', rezultate remarcabile în competiții naționale, fax: 0257.270.956",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Arad",
    sportType: "multi-sport",
    city: "Arad",
    district: "N/A",
    address: "Bulevardul Revoluției, nr. 69, Arad, 310130",
    phone: "+40 257 255 508",
    email: "palatulcopiilor2001@yahoo.com",
    website: "http://www.palatulcopiilorarad.ro/",
    description:
      "Palatul Copiilor Arad oferă o gamă variată de activități sportive pentru copii și tineri cu vârste între 4 și 18 ani: dans sportiv, dans modern, dans popular, gimnastică aerobică, șah, karate, judo și tenis de masă. Activitățile sunt coordonate de profesori experimentați și se desfășoară în spații adecvate, asigurând un mediu sigur și propice dezvoltării abilităților sportive ale copiilor.",
    researchNotes:
      "Multiple activități sportive pentru copii 4-18 ani, profesori experimentați, spații adecvate, mediu sigur",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

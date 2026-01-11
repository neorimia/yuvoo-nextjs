/**
 * Clubs Research Data - Târgu Mureș
 *
 * Date reale colectate prin research public pentru cluburi sportive din Târgu Mureș.
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
 * Total cluburi identificate: 23
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
 * Research Data - Cluburi Sportive Târgu Mureș
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_TARGU_MURES: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "FCSM Târgu Mureș - Academia de Fotbal",
    sportType: "fotbal",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    description:
      "Academia de fotbal FCSM Târgu Mureș oferă programe de dezvoltare pentru tineri talente prin sesiuni de antrenament structurate, meciuri competitive și oportunități de perfecționare a abilităților.",
    researchNotes: "Academia de formare, programe pentru tineri talente, antrenamente structurate",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSȘ Târgu Mureș - Secția de Fotbal",
    sportType: "fotbal",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    description:
      "Clubul Sportiv Școlar Târgu Mureș, înființat în 1955, cu secție de fotbal pentru copii și tineri. Clubul a evoluat de la patru secții inițiale la un moment dat la 16 ramuri sportive, incluzând fotbal.",
    researchNotes: "Parte din CSȘ Târgu Mureș, înființat 1955, 16 ramuri sportive",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Târgu Mureș - Secția de Fotbal",
    sportType: "fotbal",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    phone: "+40 265 261 009",
    email: "csmtgm@yahoo.com",
    website: "https://csmtgm.ro/",
    description:
      "Clubul Sportiv Municipal Târgu Mureș, fondat la sfârșitul anului 2017, cu secție de fotbal pentru copii și juniori. Are peste 250 de sportivi legitimați în 15 ramuri sportive. Obiectivul principal este menținerea și readucerea sportivilor de valoare în oraș.",
    researchNotes:
      "Parte din CSM Târgu Mureș, fondat 2017, peste 250 sportivi legitimați, 15 ramuri sportive",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSU Târgu Mureș - Secția de Baschet",
    sportType: "baschet",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Strada Gheorghe Marinescu 38, Târgu Mureș",
    phone: "+40 265 215 551",
    email: "csu@umfst.ro",
    website: "https://csu.umfst.ro/",
    description:
      "Clubul Sportiv Universitar Târgu Mureș oferă programe de baschet pentru tineri. Echipa de baschet masculin participă în Liga 1 și este formată din elevi și studenți ai Universității de Medicină, Farmacie, Științe și Tehnologie „George Emil Palade”.",
    researchNotes:
      "Parte din CSU Târgu Mureș, echipă în Liga 1, formată din elevi și studenți UMFST",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Târgu Mureș - Secția de Baschet",
    sportType: "baschet",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    phone: "+40 265 261 009",
    email: "csmtgm@yahoo.com",
    website: "https://csmtgm.ro/",
    description:
      "Clubul Sportiv Municipal Târgu Mureș cu secție de baschet pentru copii și juniori. Are echipe pentru diferite categorii de vârstă, inclusiv U13, U15 și U19 masculin. Antrenorul principal este Péter Faragó.",
    researchNotes:
      "Parte din CSM Târgu Mureș, echipe U13, U15, U19 masculin, antrenor principal Péter Faragó",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSȘ Târgu Mureș - Secția de Baschet",
    sportType: "baschet",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    description:
      "Clubul Sportiv Școlar Târgu Mureș cu secție de baschet pentru copii și tineri. Secția a fost una dintre cele patru secții inițiale ale clubului înființat în 1955.",
    researchNotes: "Parte din CSȘ Târgu Mureș, secție inițială din 1955",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CSU Târgu Mureș - Secția de Volei",
    sportType: "volei",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Sala de Sport „Dr. Anton Pongrácz”, Strada Gheorghe Marinescu 38, Târgu Mureș",
    phone: "+40 746 100 540",
    email: "csu@umfst.ro",
    website: "https://csu.umfst.ro/",
    description:
      "Clubul Sportiv Universitar Târgu Mureș organizează cursuri de inițiere în volei pentru copii cu vârste între 8 și 10 ani. Centrul Național Universitar de Excelență în Volei participă în Campionatul de Minivolei cu echipe formate integral din copii târgumureșeni.",
    researchNotes:
      "Cursuri inițiere 8-10 ani, abonament lunar 150 RON, Centru Național de Excelență, participare Campionat Minivolei",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "17:30-19:00" },
      { day: "Miercuri", time: "17:30-19:00" },
    ],
    pricing: [{ type: "monthly", amount: 150, currency: "RON" }],
  }),

  createClubFromResearch({
    name: "CSȘ Târgu Mureș - Secția de Volei",
    sportType: "volei",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    description:
      "Clubul Sportiv Școlar Târgu Mureș cu secție de volei pentru copii și tineri. Secția a fost una dintre cele patru secții inițiale ale clubului înființat în 1955.",
    researchNotes: "Parte din CSȘ Târgu Mureș, secție inițială din 1955",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CS Arena Târgu-Mureș - Secția de Handbal",
    sportType: "handbal",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    description:
      "Clubul Sportiv Arena Târgu-Mureș contribuie la dezvoltarea handbalului juvenil, având foste componente care au ajuns la echipa națională de senioare.",
    researchNotes: "Foste componente la echipa națională de senioare",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Târgu Mureș - Secția de Handbal",
    sportType: "handbal",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    phone: "+40 265 261 009",
    email: "csmtgm@yahoo.com",
    website: "https://csmtgm.ro/",
    description:
      "Clubul Sportiv Municipal Târgu Mureș cu secție de handbal pentru copii și juniori. Are echipe de juniori, inclusiv la categoria Juniori 3.",
    researchNotes: "Parte din CSM Târgu Mureș, echipe Juniori 3",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "CSU Târgu Mureș - Secția de Tenis",
    sportType: "tenis",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Strada Gheorghe Marinescu 38, Târgu Mureș",
    phone: "+40 265 215 551",
    email: "csu@umfst.ro",
    website: "https://csu.umfst.ro/",
    description:
      "Clubul Sportiv Universitar Târgu Mureș cu secție de tenis pentru copii și juniori. Afiliați la Federația Română de Tenis, oferă antrenamente pe patru terenuri de zgură și două terenuri acoperite.",
    researchNotes:
      "Parte din CSU Târgu Mureș, afiliați la Federația Română de Tenis, 4 terenuri zgură, 2 terenuri acoperite",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "H2O Team Mureș",
    sportType: "inot",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    website: "https://h2oteam.ro/",
    description:
      "H2O Team Mureș oferă cursuri de înot, triatlon și polo pentru copii în următoarele locații: Salus per Aquam (UMF) pentru copii începând cu vârsta de 6-7 ani, Piscina Mircea Birău TCM pentru copii de la 6-7 ani, și Bazinul Olimpic Târgu Mureș pentru grupele de performanță.",
    researchNotes:
      "Cursuri înot, triatlon, polo, multiple locații: Salus per Aquam (UMF), Piscina Mircea Birău TCM, Bazinul Olimpic",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Torpi Mureș",
    sportType: "inot",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    phone: "+40 756 931 602",
    description:
      "CS Torpi Mureș organizează cursuri de înot pentru copii începători și avansați, în limba română și maghiară. Cursurile se desfășoară în următoarele locații: Piscina UMF, Bazinul Olimpic, și Hotel Business.",
    researchNotes:
      "Cursuri în română și maghiară, locații: Piscina UMF, Bazinul Olimpic, Hotel Business",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSȘ Târgu Mureș - Secția de Înot",
    sportType: "inot",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    description:
      "Clubul Sportiv Școlar Târgu Mureș cu secție de înot pentru copii și tineri. La 'Cupa Miercurea Ciuc' din octombrie 2025, înotătorii clubului au câștigat 21 de medalii: 1 aur, 5 argint și 15 bronz.",
    researchNotes:
      "Rezultate remarcabile: 21 medalii la Cupa Miercurea Ciuc 2025 (1 aur, 5 argint, 15 bronz)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Târgu Mureș - Secția de Natație",
    sportType: "inot",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    phone: "+40 265 261 009",
    email: "csmtgm@yahoo.com",
    website: "https://csmtgm.ro/",
    description:
      "Clubul Sportiv Municipal Târgu Mureș cu secție de natație pentru copii și juniori. Include sportivi juniori în secția de natație care participă la competiții naționale.",
    researchNotes: "Parte din CSM Târgu Mureș, sportivi juniori, participare competiții naționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Mureșul - Bazinul Olimpic",
    sportType: "inot",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Bazinul Olimpic, Târgu Mureș",
    website: "https://clubulsportivmuresul.ro/",
    description:
      "Bazinul Olimpic oferă acces pentru copii la tariful de 18 RON pentru 120 de minute. Sunt disponibile abonamente pentru cursuri de inițiere în înot pentru minori, constând în 10 intrări valabile 60 de zile calendaristice, la prețul de 120 RON.",
    researchNotes:
      "Tarif copii: 18 RON/120 minute, abonamente inițiere: 120 RON/10 intrări (valabile 60 zile)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    pricing: [
      { type: "per_class", amount: 18, currency: "RON" },
      { type: "per_semester", amount: 120, currency: "RON" },
    ],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "ACS Gimnastică Ritmică Mureș",
    sportType: "gimnastica",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    description:
      "ACS Gimnastică Ritmică Mureș oferă cursuri de gimnastică ritmică pentru copii și a organizat evenimente precum festivalul „Crăciun ritmic”, unde peste 85 de gimnaste au performat alături de orchestră și cor.",
    researchNotes:
      "Festival 'Crăciun ritmic' cu peste 85 gimnaste, performanțe cu orchestră și cor",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Pro Gymnastics Club Târgu Mureș",
    sportType: "gimnastica",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Strada Zăgazului 14, Târgu Mureș",
    description:
      "Pro Gymnastics Club Târgu Mureș se concentrează pe gimnastica artistică pentru copii cu vârste între 2 și 14 ani, oferind un mediu sigur și favorabil învățării.",
    researchNotes: "Gimnastică artistică, copii 2-14 ani, mediu sigur și favorabil învățării",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSȘ Târgu Mureș - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    description:
      "Clubul Sportiv Școlar Târgu Mureș cu secție de gimnastică sportivă pentru copii și tineri. Secția a fost una dintre cele patru secții inițiale ale clubului înființat în 1955.",
    researchNotes: "Parte din CSȘ Târgu Mureș, secție inițială din 1955",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "Tomis Karate Târgu Mureș",
    sportType: "karate",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    website: "https://tomiskarate.igconcept.ro/",
    description:
      "Clubul Tomis Karate oferă cursuri de karate pentru copii și a organizat evenimente precum Campionatul European de Karate „Shotokan” WSF.",
    researchNotes: "Organizare Campionat European Karate 'Shotokan' WSF",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSU Târgu Mureș - Secția de Karate",
    sportType: "karate",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Strada Gheorghe Marinescu 38, Târgu Mureș",
    phone: "+40 265 215 551",
    email: "csu@umfst.ro",
    website: "https://csu.umfst.ro/",
    description:
      "Clubul Sportiv Universitar Târgu Mureș include o secție de karate, oferind oportunități pentru copii de a practica acest sport.",
    researchNotes: "Parte din CSU Târgu Mureș, secție de karate",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Târgu Mureș - Secția de Lupte Libere",
    sportType: "lupte",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    phone: "+40 265 261 009",
    email: "csmtgm@yahoo.com",
    website: "https://csmtgm.ro/",
    description:
      "Clubul Sportiv Municipal Târgu Mureș cu secție de lupte libere pentru copii și juniori. Are sportivi juniori care participă la competiții naționale și internaționale. În iulie 2025, la concursul internațional 'Székely Virtus Cupa 2025' din Lupeni, sportivii clubului au obținut 17 medalii: 7 de aur, 5 de argint și 5 de bronz.",
    researchNotes:
      "Parte din CSM Târgu Mureș, rezultate: 17 medalii la Székely Virtus Cupa 2025 (7 aur, 5 argint, 5 bronz)",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSȘ Târgu Mureș - Secția de Lupte",
    sportType: "lupte",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    description:
      "Clubul Sportiv Școlar Târgu Mureș cu secție de lupte pentru copii și tineri. Una dintre cele 16 ramuri sportive ale clubului.",
    researchNotes: "Parte din CSȘ Târgu Mureș, una dintre cele 16 ramuri sportive",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "CS DanceArt Târgu Mureș",
    sportType: "dans",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    phone: "+40 745 591 244",
    website: "https://www.danceart.ro/",
    description:
      "Clubul Sportiv DanceArt Târgu Mureș oferă cursuri de dans pentru copii cu vârste între 4 și 13 ani. Programul include: copii 4-6 ani (Marți și Joi, 17:30-18:20), copii 7-13 ani (Marți și Joi, 18:30-19:20).",
    researchNotes: "Cursuri pentru copii 4-13 ani, program: Marți și Joi",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    schedule: [
      { day: "Marți", time: "17:30-18:20" },
      { day: "Joi", time: "17:30-18:20" },
      { day: "Marți", time: "18:30-19:20" },
      { day: "Joi", time: "18:30-19:20" },
    ],
  }),

  createClubFromResearch({
    name: "CSȘ Târgu Mureș - Secția de Dans Sportiv",
    sportType: "dans",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    description:
      "Clubul Sportiv Școlar Târgu Mureș cu secție de dans sportiv pentru copii și tineri. Una dintre cele 16 ramuri sportive ale clubului.",
    researchNotes: "Parte din CSȘ Târgu Mureș, dans sportiv, una dintre cele 16 ramuri sportive",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport clubs) ==========
  createClubFromResearch({
    name: "CSȘ Târgu Mureș",
    sportType: "multi-sport",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    description:
      "Clubul Sportiv Școlar Târgu Mureș, înființat în 1955, oferă programe pentru copii și tineri în diverse discipline sportive. A evoluat de la patru secții inițiale (volei, atletism, baschet și gimnastică sportivă) la un moment dat la 16 ramuri sportive, incluzând handbal, fotbal, hochei pe gheață, hochei pe iarbă, înot, lupte, tenis de câmp, tenis de masă, judo, gimnastică ritmică, șah, haltere și dans sportiv.",
    researchNotes:
      "Înființat 1955, evoluție de la 4 secții inițiale la 16 ramuri sportive, tradiție de peste 60 de ani",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Târgu Mureș",
    sportType: "multi-sport",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    phone: "+40 265 261 009",
    email: "csmtgm@yahoo.com",
    website: "https://csmtgm.ro/",
    description:
      "Clubul Sportiv Municipal Târgu Mureș, fondat la sfârșitul anului 2017, are ca obiectiv principal menținerea și readucerea sportivilor de valoare în oraș, pentru a obține performanțe notabile atât pe plan național, cât și internațional. În prezent, CSM Târgu Mureș cuprinde 15 ramuri sportive și peste 250 de sportivi legitimați, incluzând baschet, popice, handbal, lupte libere, natație, polo feminin și alte secții.",
    researchNotes:
      "Fondat 2017, obiectiv: menținerea și readucerea sportivilor de valoare, 15 ramuri sportive, peste 250 sportivi legitimați",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSU Târgu Mureș",
    sportType: "multi-sport",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Strada Gheorghe Marinescu 38, Târgu Mureș",
    phone: "+40 265 215 551",
    email: "csu@umfst.ro",
    website: "https://csu.umfst.ro/",
    description:
      "Clubul Sportiv Universitar Târgu Mureș, aflat sub tutela Universității de Medicină, Farmacie, Științe și Tehnologie „George Emil Palade”, oferă secții sportive pentru copii în volei, baschet, tenis și înot. Clubul dispune de facilități moderne, inclusiv săli de sport și terenuri de tenis. Sala de sport UMF oferă facilități pentru antrenamente.",
    researchNotes:
      "Sub tutela UMFST, secții: volei, baschet, tenis, înot, facilități moderne, săli de sport, terenuri tenis",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Târgu Mureș",
    sportType: "multi-sport",
    city: "Târgu Mureș",
    district: "N/A",
    address: "Târgu Mureș",
    phone: "+40 265 261 009",
    description:
      "Palatul Copiilor din Târgu Mureș oferă o gamă variată de activități sportive gratuite pentru copii și elevi, incluzând karting (concursuri județene și naționale la Complexul Transilvania Motor Ring), judo, tenis de masă, gimnastică ritmică, dans sportiv, dans contemporan, balet și jazz. Pentru anul școlar 2024-2025, toate locurile disponibile au fost ocupate.",
    researchNotes:
      "Activități sportive gratuite: karting, judo, tenis de masă, gimnastică ritmică, dans sportiv, dans contemporan, balet, jazz, toate locurile ocupate pentru 2024-2025",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

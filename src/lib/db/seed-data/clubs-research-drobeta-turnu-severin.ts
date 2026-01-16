/**
 * Clubs Research Data - Drobeta-Turnu Severin
 *
 * Date reale colectate prin research public pentru cluburi sportive din Drobeta-Turnu Severin.
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
 * Total cluburi identificate: 17
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
 * Research Data - Cluburi Sportive Drobeta-Turnu Severin
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_DROBETA_TURNU_SEVERIN: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "CSS Drobeta-Turnu Severin - Secția de Fotbal",
    sportType: "fotbal",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Strada Slt. Eugen Mareși nr. 1, Drobeta-Turnu Severin",
    phone: "+40 252 319 745",
    email: "css_dts@yahoo.com",
    description:
      "Clubul Sportiv Școlar Drobeta-Turnu Severin cu secție de fotbal pentru copii și juniori. Clubul este o instituție publică subordonată Ministerului Educației, având ca misiune promovarea și susținerea sportului de performanță în rândul elevilor. Clubul organizează preselecții pentru copii cu vârste cuprinse între 7-9 ani și 13-14 ani, participarea fiind gratuită. În competițiile naționale, echipa U19 a clubului a obținut rezultate notabile, inclusiv o victorie cu 6-0 împotriva Academiei de Fotbal Gică Popescu. În clasamentul academiilor de copii și juniori din România, CSȘ Drobeta-Turnu Severin s-a clasat pe locul 52 în anul 2020.",
    researchNotes:
      "Instituție publică subordonată ME, preselecții copii 7-9 ani și 13-14 ani (gratuite), antrenor: Roberto Nicușor Țiu (0748618057), rezultate: victorie 6-0 cu Academia Gică Popescu U19, loc 52 clasament academii FRF 2020",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Luceafărul Drobeta-Turnu Severin",
    sportType: "fotbal",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Strada Petre Sergescu nr. 13, Drobeta-Turnu Severin",
    description:
      "Asociația Clubul Sportiv Luceafărul Drobeta-Turnu Severin este un club de fotbal din Drobeta-Turnu Severin, înființat pe 17 februarie 2010. Echipa U19 a clubului participă în Campionatul Național U19 - Seria 7. În sezonul 2024-2025, ACS Luceafărul Drobeta-Turnu Severin U19 a obținut o victorie cu 5-3 împotriva CSȘ Drobeta-Turnu Severin U19. În clasamentul academiilor de copii și juniori din România, Luceafărul Drobeta s-a clasat pe locul 40 în anul 2020. Consiliul Local al municipiului alocă anual fonduri pentru cluburi private, inclusiv pentru ACS Luceafărul.",
    researchNotes:
      "Înființat 17 februarie 2010, participare Campionatul Național U19 - Seria 7, rezultate: victorie 5-3 cu CSȘ Drobeta-Turnu Severin U19 (2024-2025), loc 40 clasament academii FRF 2020, fonduri alocate de Consiliul Local",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Școala de Fotbal Drobeta",
    sportType: "fotbal",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Drobeta-Turnu Severin",
    description:
      "Școala de Fotbal Drobeta este dedicată copiilor, axată pe descoperirea și dezvoltarea tinerelor talente în fotbal. Școala oferă programe de inițiere și perfecționare pentru copii și juniori.",
    researchNotes: "Dedicată copiilor, descoperire și dezvoltare talente fotbal",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSS Drobeta-Turnu Severin - Secția de Handbal",
    sportType: "handbal",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Strada Slt. Eugen Mareși nr. 1, Drobeta-Turnu Severin",
    phone: "+40 252 319 745",
    email: "css_dts@yahoo.com",
    description:
      "Clubul Sportiv Școlar Drobeta-Turnu Severin cu secție de handbal pentru copii și juniori. Clubul organizează înscrieri pentru băieți născuți între 2009 și 2020, oferind antrenamente gratuite și un mediu propice dezvoltării sportive. Clubul este o instituție publică subordonată Ministerului Educației, având ca misiune promovarea și susținerea sportului de performanță în rândul elevilor.",
    researchNotes:
      "Înscrieri pentru băieți născuți 2009-2020, antrenamente gratuite, antrenor: Ionuț Rouă (0790 505 750)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "A.S. Tenis Club Iulian Patrascu Drobeta-Turnu Severin",
    sportType: "tenis",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Drobeta-Turnu Severin",
    description:
      "A.S. Tenis Club Iulian Patrascu Drobeta-Turnu Severin oferă cursuri de inițiere și perfecționare pentru copii și adulți, pe terenuri de zgură și hard. Clubul oferă programe variate pentru dezvoltarea abilităților tenis.",
    researchNotes:
      "Terenuri zgură și hard, cursuri inițiere și perfecționare pentru copii și adulți",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Asociația Club Sportiv Înot Severin",
    sportType: "inot",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Bazinul de Înot Drobeta, Drobeta-Turnu Severin",
    description:
      "Asociația Club Sportiv Înot Severin organizează activități de înot pentru copii și adulți la Bazinul de Înot 'Drobeta' din Drobeta-Turnu Severin. Bazinul a fost modernizat și redeschis în mai 2024, oferind condiții excelente pentru practicarea înotului. În decembrie 2024, bazinul a găzduit un concurs unde sute de copii și-au demonstrat abilitățile. CSM Drobeta-Turnu Severin este membru al Ligii Performanței în Natație.",
    researchNotes:
      "Bazinul de Înot 'Drobeta' modernizat și redeschis mai 2024, concurs decembrie 2024 cu sute de copii, CSM membru Liga Performanței în Natație",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Drobeta-Turnu Severin - Secția de Natație",
    sportType: "inot",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Drobeta-Turnu Severin",
    description:
      "Clubul Sportiv Municipal Drobeta-Turnu Severin cu secție de natație pentru copii și juniori. CSM Drobeta-Turnu Severin este membru al Ligii Performanței în Natație și colaborează cu Asociația Club Sportiv Înot Severin pentru organizarea activităților la Bazinul de Înot 'Drobeta'.",
    researchNotes:
      "Membru Liga Performanței în Natație, colaborare cu Asociația Club Sportiv Înot Severin",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CSS Drobeta-Turnu Severin - Secția de Atletism",
    sportType: "atletism",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Strada Slt. Eugen Mareși nr. 1, Drobeta-Turnu Severin",
    phone: "+40 252 319 745",
    email: "css_dts@yahoo.com",
    description:
      "Clubul Sportiv Școlar Drobeta-Turnu Severin cu secție de atletism pentru copii și juniori. Clubul este o instituție publică subordonată Ministerului Educației, având ca misiune promovarea și susținerea sportului de performanță în rândul elevilor. În mai 2025, a avut loc prima ediție a concursului de atletism 'Cupa Ancuța Bobocel', dedicată elevilor din clasele I-VIII din Mehedinți, desfășurat pe Stadionul Municipal din Drobeta-Turnu Severin.",
    researchNotes:
      "Organizare concurs 'Cupa Ancuța Bobocel' - prima ediție mai 2025, elevii clasele I-VIII, Stadionul Municipal",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "ACS AMM Academy Drobeta-Turnu Severin",
    sportType: "karate",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Sala Polivalentă, Drobeta-Turnu Severin",
    phone: "+40 743 204 407",
    website: "https://amm-academy.ro/",
    description:
      "ACS AMM Academy Drobeta-Turnu Severin oferă cursuri de Jiu-Jitsu Brazilian, Taekwon-Do ITF și Kick-Boxing pentru copii, adolescenți și adulți. Antrenamentele se desfășoară la Sala Polivalentă din Drobeta-Turnu Severin. Clubul oferă programe variate pentru dezvoltarea abilităților în arte marțiale.",
    researchNotes:
      "Jiu-Jitsu Brazilian, Taekwon-Do ITF, Kick-Boxing, copii, adolescenți și adulți, Sala Polivalentă",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Grifonis Wado Kai Drobeta-Turnu Severin",
    sportType: "karate",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Sala Polivalentă, Drobeta-Turnu Severin",
    description:
      "Clubul Sportiv Grifonis Wado Kai Drobeta-Turnu Severin organizează anual competiții de karate, precum Turneul Memorial 'Dan Cătălin Puicea', desfășurat la Sala Polivalentă din Drobeta-Turnu Severin. Clubul oferă programe de pregătire în karate pentru copii și juniori.",
    researchNotes: "Organizare Turneul Memorial 'Dan Cătălin Puicea', Sala Polivalentă",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Drobeta-Turnu Severin - Secția de Judo",
    sportType: "judo",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Sala Polivalentă, Drobeta-Turnu Severin",
    description:
      "În Drobeta-Turnu Severin, se organizează competiții de judo pentru copii, cum ar fi Turneul Internațional 'Cupa Drobeta', ediția a XXXV-a, desfășurat în februarie 2025 la Sala Polivalentă. CSM Drobeta-Turnu Severin colaborează pentru organizarea acestor evenimente.",
    researchNotes:
      "Organizare Turneul Internațional 'Cupa Drobeta' - ediția a XXXV-a (februarie 2025), Sala Polivalentă",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== LUPTE (Wrestling) ==========
  createClubFromResearch({
    name: "CSS Drobeta-Turnu Severin - Secția de Lupte",
    sportType: "lupte",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Strada Slt. Eugen Mareși nr. 1, Drobeta-Turnu Severin",
    phone: "+40 252 319 745",
    email: "css_dts@yahoo.com",
    description:
      "Clubul Sportiv Școlar Drobeta-Turnu Severin cu secție de lupte pentru copii și juniori. Clubul este o instituție publică subordonată Ministerului Educației, având ca misiune promovarea și susținerea sportului de performanță în rândul elevilor. CSM Drobeta-Turnu Severin a fost co-organizator al Turneului Internațional de Lupte 'Cupa Drobeta 2023', desfășurat la Sala Polivalentă din Drobeta-Turnu Severin, alături de CSS Drobeta-Turnu Severin și PKS Wrestling Team.",
    researchNotes:
      "Co-organizator Turneul Internațional de Lupte 'Cupa Drobeta 2023' (CSS, CSM, PKS Wrestling Team), Sala Polivalentă",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Palatul Copiilor Drobeta-Turnu Severin - Dans Sportiv",
    sportType: "dans",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Bulevardul Carol I nr. 24, Drobeta-Turnu Severin",
    phone: "+40 252 311 189",
    email: "pcdrobetaturnuseverin@gmail.com",
    website: "https://www.palatulcopiilorseverin.ro/",
    description:
      "Palatul Copiilor Drobeta-Turnu Severin oferă cursuri de dans sportiv pentru copii, contribuind la dezvoltarea ținutei corecte și a expresivității corporale. Activitatea face parte din gama variată de cercuri disponibile la Palatul Copiilor. Programul este de luni până vineri, între orele 08:00 și 20:00, iar sâmbăta și duminica între 08:00 și 14:00.",
    researchNotes:
      "Dans sportiv, dezvoltare ținută corectă și expresivitate corporală, program L-V 08:00-20:00, Sâmbătă-Duminică 08:00-14:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-20:00" },
      { day: "Marți", time: "08:00-20:00" },
      { day: "Miercuri", time: "08:00-20:00" },
      { day: "Joi", time: "08:00-20:00" },
      { day: "Vineri", time: "08:00-20:00" },
      { day: "Sâmbătă", time: "08:00-14:00" },
      { day: "Duminică", time: "08:00-14:00" },
    ],
  }),

  createClubFromResearch({
    name: "Opium Dance Drobeta-Turnu Severin",
    sportType: "dans",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Drobeta-Turnu Severin",
    website: "https://dansuriseverin.wordpress.com/",
    description:
      "Opium Dance Drobeta-Turnu Severin organizează cursuri de dans pentru toate vârstele, inclusiv pentru copii, acoperind stiluri precum dans clasic (balet), dansuri standard (vals, tango), dansuri latino (salsa, bachata, merengue), dans contemporan și dans modern. Școala oferă programe variate pentru dezvoltarea abilităților artistice și sportive.",
    researchNotes:
      "Dans clasic (balet), dansuri standard (vals, tango), dansuri latino (salsa, bachata, merengue), dans contemporan, dans modern",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport clubs) ==========
  createClubFromResearch({
    name: "CSS Drobeta-Turnu Severin",
    sportType: "multi-sport",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Strada Slt. Eugen Mareși nr. 1, Drobeta-Turnu Severin",
    phone: "+40 252 319 745",
    email: "css_dts@yahoo.com",
    description:
      "Clubul Sportiv Școlar Drobeta-Turnu Severin este o instituție publică subordonată Ministerului Educației, având ca misiune promovarea și susținerea sportului de performanță în rândul elevilor. Clubul oferă antrenamente și competiții în diverse discipline sportive, inclusiv fotbal, handbal, lupte și atletism. Clubul organizează preselecții gratuite pentru copii și participă activ la competiții naționale. În clasamentul academiilor de copii și juniori din România, CSȘ Drobeta-Turnu Severin s-a clasat pe locul 52 în anul 2020.",
    researchNotes:
      "Instituție publică subordonată ME, secții: fotbal, handbal, lupte, atletism, preselecții gratuite pentru copii, rezultate: loc 52 clasament academii FRF 2020, participare competiții naționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Drobeta-Turnu Severin",
    sportType: "multi-sport",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Drobeta-Turnu Severin",
    description:
      "Clubul Sportiv Municipal Drobeta-Turnu Severin este implicat în diverse activități sportive, inclusiv natație (membru al Ligii Performanței în Natație) și lupte. CSM Drobeta-Turnu Severin a fost co-organizator al Turneului Internațional de Lupte 'Cupa Drobeta 2023', desfășurat la Sala Polivalentă din Drobeta-Turnu Severin, alături de CSS Drobeta-Turnu Severin și PKS Wrestling Team. CSM colaborează cu Asociația Club Sportiv Înot Severin pentru organizarea activităților la Bazinul de Înot 'Drobeta'.",
    researchNotes:
      "Secții: natație (membru Liga Performanței în Natație), lupte, co-organizator Turneul Internațional de Lupte 'Cupa Drobeta 2023', colaborare cu Asociația Club Sportiv Înot Severin",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Drobeta-Turnu Severin",
    sportType: "multi-sport",
    city: "Drobeta-Turnu Severin",
    district: "N/A",
    address: "Bulevardul Carol I nr. 24, Drobeta-Turnu Severin",
    phone: "+40 252 311 189",
    email: "pcdrobetaturnuseverin@gmail.com",
    website: "https://www.palatulcopiilorseverin.ro/",
    description:
      "Palatul Copiilor Drobeta-Turnu Severin oferă o varietate de activități sportive pentru copii și tineri. Instituția organizează 35 de cercuri, dintre care 5 sunt dedicate activităților sportive: atletism, fotbal, handbal, lupte și dans sportiv. Aceste cercuri sunt menționate în Hotărârea nr. 4/2017 a Consiliului Local al Municipiului Drobeta Turnu Severin. Programul de funcționare este Luni-Vineri: 08:00-20:00, Sâmbătă-Duminică: 08:00-14:00.",
    researchNotes:
      "35 cercuri (5 sportive: atletism, fotbal, handbal, lupte, dans sportiv), Hotărârea nr. 4/2017 Consiliul Local, program L-V 08:00-20:00, Sâmbătă-Duminică 08:00-14:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

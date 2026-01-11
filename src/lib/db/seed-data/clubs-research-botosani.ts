/**
 * Clubs Research Data - Botoșani
 *
 * Date reale colectate prin research public pentru cluburi sportive din Botoșani.
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
 * Total cluburi identificate: 18
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
 * Research Data - Cluburi Sportive Botoșani
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_BOTOSANI: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "FC Botoșani - Academia de Fotbal",
    sportType: "fotbal",
    city: "Botoșani",
    district: "N/A",
    address: "Botoșani",
    website: "https://fcbt.ro/",
    description:
      "Academia FC Botoșani este dedicată formării tinerilor fotbaliști, oferind instruire și competiții pentru aproximativ 400 de juniori la diverse categorii de vârstă, atât masculine, cât și feminine. Echipele academiei participă în competiții naționale precum Liga de Tineret și Liga Elitelor (U17, U16, U15, U14, U13), precum și în Campionatul Național de Juniori pentru categoriile U10, U11 și U12. Academia colaborează cu cluburi locale și împrumută juniori cu potențial ridicat către echipe din Liga a III-a. În noiembrie 2024, patru juniori au fost invitați la acțiuni de selecție organizate de Federația Română de Fotbal pentru formarea Echipei Naționale U15.",
    researchNotes:
      "Circa 400 juniori, participare Liga de Tineret și Liga Elitelor (U13-U17), Campionat Național U10-U12, colaborare cu cluburi locale, 4 juniori invitați la selecție Lot Național U15 (noiembrie 2024)",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Botoșani - Secția de Fotbal",
    sportType: "fotbal",
    city: "Botoșani",
    district: "N/A",
    address: "Strada Victoriei 35A, Botoșani",
    phone: "+40 231 514 835",
    email: "cssbt@yahoo.com",
    website: "https://cssbt.ro/",
    description:
      "Clubul Sportiv Școlar Botoșani cu secție de fotbal pentru copii și juniori. Clubul a fost înființat în 1972 și s-a unificat cu Liceul cu Program Sportiv în 1993. Înființat cu secții de volei (masculin și feminin), handbal, atletism, baschet (masculin și feminin) și fotbal.",
    researchNotes: "Parte din CSS Botoșani, înființat 1972, unificat cu LPS 1993",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Profy FCI Botoșani",
    sportType: "fotbal",
    city: "Botoșani",
    district: "N/A",
    address: "Botoșani",
    description:
      "ACS Profy FCI Botoșani este un club de fotbal dedicat formării tinerilor fotbaliști. Clubul colaborează cu FC Botoșani și Academia FC Botoșani monitorizează aproximativ 400 de copii legitimați la aceste cluburi locale. Conform clasificării Federației Române de Fotbal, ACS Profy FCI Botoșani a fost distins cu nivelul 'Bronze', evidențiind calitatea programului de formare.",
    researchNotes:
      "Colaborare cu FC Botoșani, nivel 'Bronze' în clasificarea FRF, parte din sistemul de monitorizare a ~400 copii legitimați",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "AFC Junior Botoșani",
    sportType: "fotbal",
    city: "Botoșani",
    district: "N/A",
    address: "Botoșani",
    description:
      "AFC Junior Botoșani (cunoscut și ca AFC Juniorul Botoșani) este un club de fotbal dedicat formării tinerilor fotbaliști. Clubul colaborează cu FC Botoșani și participă activ la competiții locale și naționale, inclusiv Memorialul 'Ion Bordeanu', un turneu dedicat juniorilor.",
    researchNotes:
      "Colaborare cu FC Botoșani, participare competiții locale și naționale, Memorialul 'Ion Bordeanu'",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Artys Botoșani",
    sportType: "fotbal",
    city: "Botoșani",
    district: "N/A",
    address: "Botoșani",
    description:
      "ACS Artys Botoșani (cunoscut și ca ACS Artis Botoșani) este un club de fotbal dedicat formării tinerilor fotbaliști. Clubul colaborează cu FC Botoșani și participă activ la competiții locale și naționale. Conform clasificării Federației Române de Fotbal, ACS Artys Botoșani a fost distins cu nivelul 'Bronze', evidențiind calitatea programului de formare.",
    researchNotes:
      "Colaborare cu FC Botoșani, nivel 'Bronze' în clasificarea FRF, participare competiții locale și naționale",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSS Botoșani - Secția de Baschet",
    sportType: "baschet",
    city: "Botoșani",
    district: "N/A",
    address: "Strada Victoriei 35A, Botoșani",
    phone: "+40 231 514 835",
    email: "cssbt@yahoo.com",
    website: "https://cssbt.ro/",
    description:
      "Clubul Sportiv Școlar Botoșani cu secție de baschet (masculin și feminin) pentru copii și juniori. Clubul a fost înființat în 1972 cu secții de baschet masculin și feminin și s-a unificat cu Liceul cu Program Sportiv în 1993.",
    researchNotes: "Parte din CSS Botoșani, baschet masculin și feminin, înființat 1972",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CSS Botoșani - Secția de Volei",
    sportType: "volei",
    city: "Botoșani",
    district: "N/A",
    address: "Strada Victoriei 35A, Botoșani",
    phone: "+40 231 514 835",
    email: "cssbt@yahoo.com",
    website: "https://cssbt.ro/",
    description:
      "Clubul Sportiv Școlar Botoșani cu secție de volei (masculin și feminin) pentru copii și juniori. Clubul a fost înființat în 1972 cu secții de volei masculin și feminin și s-a unificat cu Liceul cu Program Sportiv în 1993.",
    researchNotes: "Parte din CSS Botoșani, volei masculin și feminin, înființat 1972",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSS Botoșani - Secția de Handbal",
    sportType: "handbal",
    city: "Botoșani",
    district: "N/A",
    address: "Strada Victoriei 35A, Botoșani",
    phone: "+40 231 514 835",
    email: "cssbt@yahoo.com",
    website: "https://cssbt.ro/",
    description:
      "Clubul Sportiv Școlar Botoșani cu secție de handbal pentru copii și juniori. Clubul a fost înființat în 1972 cu secție de handbal și s-a unificat cu Liceul cu Program Sportiv în 1993.",
    researchNotes: "Parte din CSS Botoșani, înființat 1972",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "Clubul Sportiv Botoșani - Secția de Tenis",
    sportType: "tenis",
    city: "Botoșani",
    district: "N/A",
    address: "Botoșani",
    description:
      "Clubul Sportiv Botoșani este cunoscut pentru promovarea sportului în rândul tinerilor și a organizat competiții de tenis pentru copii cu vârste între 8 și 18 ani. Clubul promovează acest sport în rândul copiilor și juniori.",
    researchNotes: "Organizare competiții tenis pentru copii 8-18 ani",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Sport Relax Botoșani - Cursuri de Înot",
    sportType: "inot",
    city: "Botoșani",
    district: "Zăicești",
    address: "Zăicești, Botoșani",
    website: "https://sport-relax-botosani.ro/",
    description:
      "Complexul Sport Relax Botoșani organizează cursuri de înot pentru copii cu vârste între 5 și 12 ani. Antrenamentele durează 50 de minute și se desfășoară într-o piscină interioară dotată cu bare de siguranță, instalații de filtrare și încălzire a apei, având o adâncime între 130 cm și 175 cm. Copiii sunt evaluați periodic și primesc diplome, medalii și cupe în funcție de progresul lor. Programul cursurilor este variat, cu sesiuni de luni până sâmbătă, sub îndrumarea profesorilor specializați.",
    researchNotes:
      "Copii 5-12 ani, antrenamente 50 minute, piscină interioară (130-175 cm adâncime), evaluări periodice, diplome, medalii, cupe, program L-Sâmbătă",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12],
    schedule: [
      { day: "Luni", time: "09:00-20:00" },
      { day: "Marți", time: "09:00-20:00" },
      { day: "Miercuri", time: "09:00-20:00" },
      { day: "Joi", time: "09:00-20:00" },
      { day: "Vineri", time: "09:00-20:00" },
      { day: "Sâmbătă", time: "09:00-20:00" },
    ],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "Palatul Copiilor Botoșani - Gimnastică Aerobică",
    sportType: "gimnastica",
    city: "Botoșani",
    district: "N/A",
    address: "Botoșani",
    website: "https://www.pacobt.ro/",
    description:
      "Palatul Copiilor Botoșani oferă cursuri de gimnastică aerobică pentru copii și tineri. Aceste activități sunt menite să dezvolte aptitudinile sportive ale participanților, oferindu-le oportunități de afirmare a talentelor.",
    researchNotes: "Parte din Palatul Copiilor, dezvoltare aptitudini sportive",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CSS Botoșani - Secția de Atletism",
    sportType: "atletism",
    city: "Botoșani",
    district: "N/A",
    address: "Strada Victoriei 35A, Botoșani",
    phone: "+40 231 514 835",
    email: "cssbt@yahoo.com",
    website: "https://cssbt.ro/",
    description:
      "Clubul Sportiv Școlar Botoșani cu secție de atletism pentru copii și juniori. Clubul a fost înființat în 1972 cu secție de atletism și s-a unificat cu Liceul cu Program Sportiv în 1993.",
    researchNotes: "Parte din CSS Botoșani, înființat 1972",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CSS Botoșani - Secția de Karate",
    sportType: "karate",
    city: "Botoșani",
    district: "N/A",
    address: "Strada Victoriei 35A, Botoșani",
    phone: "+40 231 514 835",
    email: "cssbt@yahoo.com",
    website: "https://cssbt.ro/",
    description:
      "Clubul Sportiv Școlar Botoșani cu secție de karate pentru copii și juniori. În perioada 10–12 octombrie 2025, la finala Campionatului Național de Karate Tradițional JSKA desfășurată la Pitești, sportivii clubului au obținut 23 de medalii, demonstrând nivelul înalt de pregătire și dedicare.",
    researchNotes:
      "Parte din CSS Botoșani, rezultate remarcabile: 23 medalii la Campionatul Național Karate Tradițional JSKA Pitești (octombrie 2025)",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Gi-Fun Karate Botoșani",
    sportType: "karate",
    city: "Botoșani",
    district: "N/A",
    address: "Bulevardul Mihai Eminescu nr. 48, Botoșani",
    phone: "+40 745 003 949",
    description:
      "Gi-Fun Karate Botoșani oferă cursuri de karate pentru copii, având un program variat: Marți 20:00-21:00, Joi 15:45-16:45, Sâmbătă 09:00-10:30, Duminică 16:30-18:00.",
    researchNotes:
      "Program: Marți 20:00-21:00, Joi 15:45-16:45, Sâmbătă 09:00-10:30, Duminică 16:30-18:00, Bd. Mihai Eminescu 48",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "20:00-21:00" },
      { day: "Joi", time: "15:45-16:45" },
      { day: "Sâmbătă", time: "09:00-10:30" },
      { day: "Duminică", time: "16:30-18:00" },
    ],
  }),

  createClubFromResearch({
    name: "CS SINH DAU Botoșani",
    sportType: "karate",
    city: "Botoșani",
    district: "N/A",
    address: "Botoșani",
    description:
      "CS SINH DAU Botoșani oferă antrenamente în arte marțiale pentru copii și juniori. Sportivii clubului au obținut rezultate remarcabile la competiții naționale de arte marțiale pentru copii și juniori. Clubul participă la competiții naționale și internaționale.",
    researchNotes:
      "Arte marțiale, rezultate remarcabile competiții naționale, participare competiții naționale și internaționale",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Botoșani - Secția de Lupte",
    sportType: "lupte",
    city: "Botoșani",
    district: "N/A",
    address: "Strada Victoriei 35A, Botoșani",
    phone: "+40 231 514 835",
    email: "cssbt@yahoo.com",
    website: "https://cssbt.ro/",
    description:
      "Clubul Sportiv Școlar Botoșani cu secție de lupte pentru copii și juniori. După unificarea cu Liceul cu Program Sportiv în 1993, clubul și-a extins activitatea pentru a include și alte discipline precum lupte.",
    researchNotes: "Parte din CSS Botoșani, secție adăugată după unificarea cu LPS 1993",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Palatul Copiilor Botoșani - Dans Modern",
    sportType: "dans",
    city: "Botoșani",
    district: "N/A",
    address: "Botoșani",
    website: "https://www.pacobt.ro/",
    description:
      "Palatul Copiilor Botoșani oferă cursuri de dans modern pentru copii și tineri. Aceste activități sunt menite să dezvolte aptitudinile sportive și artistice ale participanților, oferindu-le oportunități de afirmare a talentelor.",
    researchNotes: "Parte din Palatul Copiilor, dezvoltare aptitudini sportive și artistice",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Asociația Culturală ARLECHIN Botoșani - Dans Popular",
    sportType: "dans",
    city: "Botoșani",
    district: "N/A",
    address: "Casa Tineretului Botoșani",
    description:
      "Asociația Culturală ARLECHIN Botoșani oferă cursuri de dans popular și muzică populară pentru copii și tineri. Cursurile se desfășoară săptămânal la sala studio a Clubului 'ARLECHIN' de la Casa Tineretului Botoșani și la alte locații din județ.",
    researchNotes:
      "Dans popular și muzică populară, cursuri săptămânale, sala studio Casa Tineretului Botoșani",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASEBALL ==========
  createClubFromResearch({
    name: "CSS Botoșani - Secția de Baseball",
    sportType: "baseball",
    city: "Botoșani",
    district: "N/A",
    address: "Strada Victoriei 35A, Botoșani",
    phone: "+40 231 514 835",
    email: "cssbt@yahoo.com",
    website: "https://cssbt.ro/",
    description:
      "Clubul Sportiv Școlar Botoșani cu secție de baseball pentru copii și juniori. După unificarea cu Liceul cu Program Sportiv în 1993, clubul și-a extins activitatea pentru a include și alte discipline precum baseball.",
    researchNotes: "Parte din CSS Botoșani, secție adăugată după unificarea cu LPS 1993",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport clubs) ==========
  createClubFromResearch({
    name: "CSS Botoșani",
    sportType: "multi-sport",
    city: "Botoșani",
    district: "N/A",
    address: "Strada Victoriei 35A, Botoșani",
    phone: "+40 231 514 835",
    email: "cssbt@yahoo.com",
    website: "https://cssbt.ro/",
    description:
      "Clubul Sportiv Școlar Botoșani, înființat în 1972, a început cu secții de volei (masculin și feminin), handbal, atletism, baschet (masculin și feminin) și fotbal. În 1993, CSȘ Botoșani s-a unificat cu Liceul cu Program Sportiv (LPS) Botoșani, extinzându-și activitatea pentru a include și alte discipline precum lupte, baseball și karate. Clubul se remarcă prin rezultatele excelente obținute de sportivii săi, inclusiv 23 de medalii la finala Campionatului Național de Karate Tradițional JSKA din octombrie 2025.",
    researchNotes:
      "Înființat 1972, unificat cu LPS 1993, secții: volei (M/F), handbal, atletism, baschet (M/F), fotbal, lupte, baseball, karate, rezultate excelente (23 medalii karate tradițional JSKA octombrie 2025)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Botoșani - Clubul Sportiv Școlar",
    sportType: "multi-sport",
    city: "Botoșani",
    district: "N/A",
    address: "Botoșani",
    website: "https://www.lpsbotosani.ro/",
    description:
      "Liceul cu Program Sportiv Botoșani este o instituție de învățământ dedicată formării tinerilor cu aptitudini sportive. Elevii beneficiază de programe educaționale care îmbină pregătirea academică cu antrenamente sportive în diverse discipline. În 1993, Clubul Sportiv Școlar Botoșani a devenit o secție anexă a liceului. În anul competițional 2023, sportivii de la LPS Botoșani au obținut 151 de medalii la competițiile naționale și internaționale, dintre care 52 de aur, 48 de argint și 51 de bronz. De asemenea, 17 sportivi au fost convocați la loturile naționale, reprezentând România la competițiile internaționale.",
    researchNotes:
      "Liceu cu profil sportiv, combină educație academică cu pregătire sportivă, CSS secție anexă din 1993, rezultate 2023: 151 medalii (52 aur, 48 argint, 51 bronz) la competiții naționale și internaționale, 17 sportivi la loturile naționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Botoșani",
    sportType: "multi-sport",
    city: "Botoșani",
    district: "N/A",
    address: "Botoșani",
    website: "https://www.pacobt.ro/",
    description:
      "Palatul Copiilor Botoșani oferă o gamă variată de activități sportive și educative pentru copii și tineri. Printre cursurile disponibile se numără gimnastica aerobică, dansul modern și dansul popular. Aceste activități sunt menite să dezvolte aptitudinile sportive și artistice ale participanților, oferindu-le oportunități de afirmare a talentelor și de petrecere a timpului liber într-un mod constructiv.",
    researchNotes:
      "Activități sportive și educative: gimnastică aerobică, dans modern, dans popular, dezvoltare aptitudini sportive și artistice",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

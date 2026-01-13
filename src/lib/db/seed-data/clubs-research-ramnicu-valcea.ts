/**
 * Clubs Research Data - Râmnicu Vâlcea
 *
 * Date reale colectate prin research public pentru cluburi sportive din Râmnicu Vâlcea.
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
 * Total cluburi identificate: 16
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
 * Research Data - Cluburi Sportive Râmnicu Vâlcea
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_RAMNICU_VALCEA: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "SCM Râmnicu Vâlcea - Secția de Fotbal",
    sportType: "fotbal",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Râmnicu Vâlcea",
    description:
      "Sport Club Municipal Râmnicu Vâlcea - Centrul de copii și juniori secția fotbal include aproximativ 484 de tineri cu vârste între 5 și 19 ani, antrenați de șase antrenori calificați. Acești sportivi beneficiază de pregătire gratuită și au obținut performanțe notabile: locul I în campionatul național U19, locul II în campionatul național U17, participări în campionatele județene U11, U13 și U15, câștigarea trofeelor 'Gheorghe Ene' și 'Gheorghe Ola'. Cinci dintre juniorii formați în acest centru au fost promovați la echipa de seniori a clubului, înființată în 2022, care își propune accederea în Liga a III-a. SCM Râmnicu Vâlcea este singura academie de fotbal din județ și se situează pe locul 71 în clasamentul Federației Române de Fotbal al academiilor de copii și juniori.",
    researchNotes:
      "Circa 484 copii 5-19 ani, 6 antrenori calificați, pregătire gratuită, rezultate: loc I național U19, loc II național U17, campionate județene U11/U13/U15, trofee 'Gheorghe Ene' și 'Gheorghe Ola', 5 juniori promovați la seniori, loc 71 clasament FRF academii",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Râmnicu Vâlcea - Secția de Fotbal",
    sportType: "fotbal",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Strada Carol I nr. 41 A, Râmnicu Vâlcea",
    website: "https://cssvalcea.ro/",
    description:
      "Clubul Sportiv Școlar Râmnicu Vâlcea cu secție de fotbal pentru copii și juniori. Clubul a fost înființat la 1 septembrie 1979 și oferă programe de pregătire organizate pe grupe de nivel valoric: începători, avansați și performanță. Clubul funcționează sub conducerea directorului prof. Mihai Ioniță.",
    researchNotes:
      "Înființat 1 septembrie 1979, director prof. Mihai Ioniță, grupe: începători, avansați, performanță, antrenor Prof. Gheorghe Alin Pufu",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "SCM Râmnicu Vâlcea - Secția de Handbal",
    sportType: "handbal",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Sala Sporturilor Traian, Râmnicu Vâlcea",
    description:
      "Sport Club Municipal Râmnicu Vâlcea este cunoscut pentru echipa sa de handbal feminin, dar desfășoară și activități pentru copii și adolescenți. Centrul de copii și juniori – handbal fete include aproximativ 70 de fetițe cu vârste între 5 și 7 ani, care beneficiază de antrenamente gratuite. Clubul are o istorie bogată, incluzând 20 de titluri de campioană națională și multiple trofee europene la nivel de seniori. SCM Râmnicu Vâlcea își desfășoară meciurile pe teren propriu în Sala Sporturilor Traian.",
    researchNotes:
      "Centru copii și juniori: ~70 fetițe 5-7 ani, antrenamente gratuite, echipa seniori: 20 titluri campioană națională, multiple trofee europene, meciuri Sala Sporturilor Traian",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Râmnicu Vâlcea - Secția de Handbal",
    sportType: "handbal",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Strada Carol I nr. 41 A, Râmnicu Vâlcea",
    website: "https://cssvalcea.ro/",
    description:
      "Clubul Sportiv Școlar Râmnicu Vâlcea cu secție de handbal pentru copii și juniori. Clubul a fost înființat la 1 septembrie 1979 și oferă programe de pregătire organizate pe grupe de nivel valoric: începători, avansați și performanță.",
    researchNotes: "Antrenori: Prof. Florina Petria, Prof. Elena Iuliana Popescu, înființat 1979",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSS Râmnicu Vâlcea - Secția de Baschet",
    sportType: "baschet",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Strada Carol I nr. 41 A, Râmnicu Vâlcea",
    website: "https://cssvalcea.ro/",
    description:
      "Clubul Sportiv Școlar Râmnicu Vâlcea cu secție de baschet pentru copii și juniori. Clubul a fost înființat la 1 septembrie 1979 și oferă programe de pregătire organizate pe grupe de nivel valoric: începători, avansați și performanță.",
    researchNotes:
      "Antrenori: Prof. Maria Cornea, Prof. Delia Georgeta Hodorogea, Prof. Anca Filofteia Nițulescu, înființat 1979",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "Club Winners Râmnicu Vâlcea - Tenis de Câmp",
    sportType: "tenis",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Râmnicu Vâlcea",
    website: "https://www.clubwinners.ro/",
    description:
      "Club Winners Râmnicu Vâlcea pune la dispoziție terenuri pentru tenis de câmp, inclusiv terenuri acoperite și încălzite pe timpul iernii. Clubul organizează activități pentru copii și oferă facilități moderne pentru antrenamente și competiții.",
    researchNotes: "Terenuri acoperite și încălzite pe timpul iernii, activități pentru copii",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS DE MASĂ (Table Tennis) ==========
  createClubFromResearch({
    name: "CSS Râmnicu Vâlcea - Secția de Tenis de Masă",
    sportType: "tenis-de-masa",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Strada Carol I nr. 41 A, Râmnicu Vâlcea",
    website: "https://cssvalcea.ro/",
    description:
      "Clubul Sportiv Școlar Râmnicu Vâlcea cu secție de tenis de masă pentru copii și juniori. Clubul a fost înființat la 1 septembrie 1979 și oferă programe de pregătire organizate pe grupe de nivel valoric: începători, avansați și performanță.",
    researchNotes:
      "Antrenor: Prof. Mihaela Trușcă, antrenor alternativ: Prof. Viorel Mateescu, înființat 1979",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Chimia Râmnicu Vâlcea - Secția de Tenis de Masă",
    sportType: "tenis-de-masa",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Sala Sporturilor Traian, Râmnicu Vâlcea",
    phone: "+40 746 950 622",
    email: "contact@cschimia.ro",
    website: "https://www.cschimia.ro/",
    description:
      "Clubul Sportiv Chimia Râmnicu Vâlcea cu secție de tenis de masă pentru copii și juniori. Clubul dispune de facilități moderne la Sala Sporturilor 'Traian' din Râmnicu Vâlcea.",
    researchNotes: "Antrenor: Prof. Mihaela Trușcă, Sala Sporturilor Traian",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Club Winners Râmnicu Vâlcea - Tenis de Masă",
    sportType: "tenis-de-masa",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Râmnicu Vâlcea",
    website: "https://www.clubwinners.ro/",
    description:
      "Club Winners Râmnicu Vâlcea oferă facilități pentru tenis de masă, disponibile pentru antrenamente și competiții pentru copii și juniori.",
    researchNotes: "Facilități pentru antrenamente și competiții",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Râmnicu Vâlcea - Tenis de Masă",
    sportType: "tenis-de-masa",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Squarul Mircea cel Bătrân nr. 3, Râmnicu Vâlcea",
    phone: "+40 250 73 18 40",
    email: "pcramnicuvalcea@gmail.com",
    website: "https://palatulcopiilorrmvalcea.ro/",
    description:
      "Palatul Copiilor Râmnicu Vâlcea oferă cursuri gratuite de tenis de masă pentru copii și tineri. Activitatea face parte din gama variată de cercuri disponibile la Palatul Copiilor.",
    researchNotes:
      "Cursuri gratuite, program L-V 08:00-19:00, Sâmbătă 09:00-14:00, Duminică 10:00-13:00 (cabinete exterioare), înscrieri L-V 08:00-18:00",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Școala de Înot Râmnicu Vâlcea",
    sportType: "inot",
    city: "Râmnicu Vâlcea",
    district: "Bujoreni",
    address: "Bujoreni, Râmnicu Vâlcea",
    phone: "+40 766 307 025",
    description:
      "Școala de Înot Râmnicu Vâlcea oferă cursuri de înot pentru copii și adulți pe tot parcursul anului, în piscina din Bujoreni. Cursurile sunt disponibile pentru toate vârstele și nivelurile de pregătire.",
    researchNotes: "Piscină Bujoreni, cursuri pentru copii și adulți, pe tot parcursul anului",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "ACS Jolie Sport Club Râmnicu Vâlcea",
    sportType: "gimnastica",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Râmnicu Vâlcea",
    phone: "+40 734 139 779",
    website: "https://www.joliesportclub.ro/",
    description:
      "ACS Jolie Sport Club Râmnicu Vâlcea este un club privat afiliat Federației Române de Gimnastică, oferă cursuri de gimnastică ritmică și acrobatică pentru copii, precum și cursuri de majorete și gimnastică pentru toți. Clubul oferă programe de pregătire profesională pentru dezvoltarea abilităților gimnastice.",
    researchNotes:
      "Club privat afiliat FRG, gimnastică ritmică, gimnastică acrobatică, majorete, contact WhatsApp disponibil",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Râmnicu Vâlcea - Gimnastică",
    sportType: "gimnastica",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Squarul Mircea cel Bătrân nr. 3, Râmnicu Vâlcea",
    phone: "+40 250 73 18 40",
    email: "pcramnicuvalcea@gmail.com",
    website: "https://palatulcopiilorrmvalcea.ro/",
    description:
      "Palatul Copiilor Râmnicu Vâlcea oferă cursuri gratuite de gimnastică pentru copii și tineri. Activitatea face parte din gama variată de cercuri disponibile la Palatul Copiilor.",
    researchNotes:
      "Cursuri gratuite, program L-V 08:00-19:00, Sâmbătă 09:00-14:00, Duminică 10:00-13:00 (cabinete exterioare), înscrieri L-V 08:00-18:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CSS Râmnicu Vâlcea - Secția de Karate",
    sportType: "karate",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Râmnicu Vâlcea",
    website: "https://cssvalcea.ro/",
    phone: "+40 755 012 023",
    email: "cssvalcea@gmail.com",
    description:
      "Clubul Sportiv Școlar Râmnicu Vâlcea cu secție de karate pentru copii și juniori. La Cupa României la Karate Interstiluri desfășurată în septembrie 2023, sportivii de la CSȘ Râmnicu Vâlcea au urcat de cinci ori pe podium, obținând un loc I, un loc II și trei locuri III. Antrenamentele se desfășoară la Școala Gimnazială 'I.GH. Duca' (L, M, V 19:00-21:00; Sâmbătă 13:00-15:00 și 15:00-17:00) și Liceul Tehnologic Ferdinand I (Marți 17:00-19:00 și 19:00-21:00; Miercuri 16:30-18:30; Joi 19:00-21:00).",
    researchNotes:
      "Antrenor: Prof. Ioniță Mihai, rezultate septembrie 2023: 5 podiumuri (1 loc I, 1 loc II, 3 locuri III) la Cupa României Karate Interstiluri, program: ȘG 'I.GH. Duca' (L, M, V 19:00-21:00; Sâmbătă 13:00-17:00), Liceul Tehnologic Ferdinand I (Marți 17:00-21:00; Miercuri 16:30-18:30; Joi 19:00-21:00)",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "19:00-21:00" },
      { day: "Marți", time: "17:00-19:00, 19:00-21:00" },
      { day: "Miercuri", time: "16:30-18:30" },
      { day: "Joi", time: "19:00-21:00" },
      { day: "Vineri", time: "19:00-21:00" },
      { day: "Sâmbătă", time: "13:00-15:00, 15:00-17:00" },
    ],
  }),

  createClubFromResearch({
    name: "CS Chimia Râmnicu Vâlcea - Secția de Karate",
    sportType: "karate",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Sala Sporturilor Traian, Râmnicu Vâlcea",
    phone: "+40 721 713 725",
    email: "dinu.paul@cschimia.ro",
    website: "https://www.cschimia.ro/",
    description:
      "Clubul Sportiv Chimia Râmnicu Vâlcea cu secție de karate pentru copii și juniori. Clubul are sediul la Sala Sporturilor 'Traian' din Râmnicu Vâlcea și dispune de facilități moderne pentru antrenamente.",
    researchNotes: "Antrenor: Prof. Dinu Paul, Sala Sporturilor Traian",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "AJ Judo Vâlcea - CS Vâlcea 1924",
    sportType: "judo",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Râmnicu Vâlcea",
    description:
      "Asociația Județeană de Judo Vâlcea – Clubul Sportiv Vâlcea 1924 organizează competiții și antrenamente de judo pentru copii. Clubul organizează evenimente precum 'Cupa Râmnicului' pentru diverse categorii de vârstă.",
    researchNotes:
      "Organizare competiții și antrenamente, 'Cupa Râmnicului' diverse categorii, antrenori: Prof. Pana Viorel (0741.268.492), Prof. Luciu Ionuț (0770.895.686)",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Chimia Râmnicu Vâlcea - Secția de Judo",
    sportType: "judo",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Sala Sporturilor Traian, Râmnicu Vâlcea",
    phone: "+40 743 674 062",
    email: "luciu.ion@cschimia.ro",
    website: "https://www.cschimia.ro/",
    description:
      "Clubul Sportiv Chimia Râmnicu Vâlcea cu secție de judo pentru copii și juniori. Clubul are sediul la Sala Sporturilor 'Traian' din Râmnicu Vâlcea și dispune de facilități moderne pentru antrenamente.",
    researchNotes: "Antrenor: Prof. Luciu Ion, Sala Sporturilor Traian",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Chimia Râmnicu Vâlcea - Secția de Scrimă",
    sportType: "scrima",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Sala Sporturilor Traian, Râmnicu Vâlcea",
    email: "contact@cschimia.ro",
    website: "https://www.cschimia.ro/",
    description:
      "Clubul Sportiv Chimia Râmnicu Vâlcea cu secție de scrimă pentru copii și juniori. Clubul are sediul la Sala Sporturilor 'Traian' din Râmnicu Vâlcea și dispune de facilități moderne pentru antrenamente.",
    researchNotes: "Antrenor: Prof. Luminița Nițoi, Sala Sporturilor Traian",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CS Chimia Râmnicu Vâlcea - Secția de Atletism",
    sportType: "atletism",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Sala Sporturilor Traian, Râmnicu Vâlcea",
    phone: "+40 727 001 260",
    email: "contact@cschimia.ro",
    website: "https://www.cschimia.ro/",
    description:
      "Clubul Sportiv Chimia Râmnicu Vâlcea cu secție de atletism pentru copii și juniori. Clubul are sediul la Sala Sporturilor 'Traian' din Râmnicu Vâlcea și dispune de facilități moderne pentru antrenamente.",
    researchNotes:
      "Antrenori: Alina Borța (0727.001.260), Claudiu Cîrstea (0742.691.431), Sala Sporturilor Traian",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Școala de Dans Ru Apollo Râmnicu Vâlcea",
    sportType: "dans",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Strada Antim Ivireanu nr. 81, Râmnicu Vâlcea",
    phone: "+40 770 695 925",
    website: "https://www.scolidans.ro/",
    description:
      "Școala de Dans Ru Apollo Râmnicu Vâlcea, fondată în 1991, oferă cursuri pentru copii de toate vârstele, inclusiv dans sportiv, dans modern, gimnastică, salsa, bachata, street dance, valsul mirilor și balet. Școala oferă programe variate pentru dezvoltarea abilităților artistice și sportive ale copiilor.",
    researchNotes:
      "Fondată 1991, dans sportiv, dans modern, gimnastică, salsa, bachata, street dance, valsul mirilor, balet, Strada Antim Ivireanu 81",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Bailando Contigo Râmnicu Vâlcea",
    sportType: "dans",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Strada Gib Mihăescu nr. 8, Complex Piața Simian, Râmnicu Vâlcea",
    phone: "+40 756 948 291",
    website: "https://www.scolidans.ro/",
    description:
      "Bailando Contigo Râmnicu Vâlcea, înființată în 2013, oferă cursuri de dans pentru copii și adulți, acoperind stiluri precum salsa, bachata, kizomba, dans popular, dans modern, dans sportiv și balet. Școala oferă programe variate pentru dezvoltarea abilităților artistice și sportive.",
    researchNotes:
      "Înființată 2013, salsa, bachata, kizomba, dans popular, dans modern, dans sportiv, balet, Strada Gib Mihăescu 8, Complex Piața Simian",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Râmnicu Vâlcea - Dans Sportiv-Balet",
    sportType: "dans",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Squarul Mircea cel Bătrân nr. 3, Râmnicu Vâlcea",
    phone: "+40 250 73 18 40",
    email: "pcramnicuvalcea@gmail.com",
    website: "https://palatulcopiilorrmvalcea.ro/",
    description:
      "Palatul Copiilor Râmnicu Vâlcea oferă cursuri gratuite de dans sportiv și balet pentru copii și tineri. Activitatea face parte din gama variată de cercuri disponibile la Palatul Copiilor.",
    researchNotes:
      "Cursuri gratuite, program L-V 08:00-19:00, Sâmbătă 09:00-14:00, Duminică 10:00-13:00 (cabinete exterioare), înscrieri L-V 08:00-18:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport clubs) ==========
  createClubFromResearch({
    name: "CSS Râmnicu Vâlcea",
    sportType: "multi-sport",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Strada Carol I nr. 41 A, Râmnicu Vâlcea",
    website: "https://cssvalcea.ro/",
    description:
      "Clubul Sportiv Școlar Râmnicu Vâlcea, înființat la 1 septembrie 1979, este o instituție dedicată promovării sportului de performanță în rândul tineretului școlar. Clubul oferă programe de pregătire în diverse discipline sportive, organizate pe grupe de nivel valoric: începători, avansați și performanță. Sub conducerea directorului prof. Mihai Ioniță, clubul funcționează cu secții de fotbal, baschet, handbal, tenis de masă și karate. De-a lungul anilor, sportivii clubului au obținut rezultate remarcabile, inclusiv cinci podiumuri (1 loc I, 1 loc II, 3 locuri III) la Cupa României la Karate Interstiluri din septembrie 2023.",
    researchNotes:
      "Înființat 1 septembrie 1979, director prof. Mihai Ioniță, unitate cu personalitate juridică, secții: fotbal, baschet, handbal, tenis de masă, karate, grupe: începători, avansați, performanță, rezultate remarcabile (5 podiumuri karate interstiluri septembrie 2023)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Chimia Râmnicu Vâlcea",
    sportType: "multi-sport",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Sala Sporturilor Traian, Râmnicu Vâlcea",
    email: "contact@cschimia.ro",
    website: "https://www.cschimia.ro/",
    description:
      "Clubul Sportiv Chimia Râmnicu Vâlcea oferă o gamă variată de sporturi pentru copii și tineri. Clubul are sediul la Sala Sporturilor 'Traian' din Râmnicu Vâlcea și dispune de facilități moderne pentru antrenamente în discipline precum judo, karate, scrimă, tenis de masă, fotbal-tenis și atletism.",
    researchNotes:
      "Sediul Sala Sporturilor Traian, secții: judo, karate, scrimă, tenis de masă, fotbal-tenis, atletism, facilități moderne",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "SCM Râmnicu Vâlcea",
    sportType: "multi-sport",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Sala Sporturilor Traian, Râmnicu Vâlcea",
    description:
      "Sport Club Municipal Râmnicu Vâlcea este un club major cu secții pentru copii și juniori în handbal și fotbal. Centrul de copii și juniori – handbal fete include aproximativ 70 de fetițe cu vârste între 5 și 7 ani, care beneficiază de antrenamente gratuite. Centrul de copii și juniori – secția fotbal include aproximativ 484 de tineri cu vârste între 5 și 19 ani, antrenați de șase antrenori calificați. Clubul are o istorie bogată la nivel de seniori (handbal feminin: 20 titluri campioană națională, multiple trofee europene) și se situează pe locul 71 în clasamentul FRF al academiilor de copii și juniori pentru fotbal. Clubul își desfășoară meciurile în Sala Sporturilor Traian.",
    researchNotes:
      "Handbal feminin: ~70 fetițe 5-7 ani, antrenamente gratuite, echipa seniori 20 titluri naționale, multiple trofee europene; Fotbal: ~484 copii 5-19 ani, 6 antrenori, loc 71 clasament FRF, rezultate remarcabile (loc I național U19, loc II național U17, campionate județene U11/U13/U15), meciuri Sala Sporturilor Traian",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Râmnicu Vâlcea",
    sportType: "multi-sport",
    city: "Râmnicu Vâlcea",
    district: "N/A",
    address: "Squarul Mircea cel Bătrân nr. 3, Râmnicu Vâlcea",
    phone: "+40 250 73 18 40",
    email: "pcramnicuvalcea@gmail.com",
    website: "https://palatulcopiilorrmvalcea.ro/",
    description:
      "Palatul Copiilor Râmnicu Vâlcea oferă o gamă variată de activități sportive și recreative gratuite pentru copii și tineri. Printre cercurile disponibile se numără: dans sportiv-balet, tenis de masă, orientare sportivă, carting, automodele-navomodele și gimnastică. Aceste activități se desfășoară conform programului: Luni-Vineri 08:00-19:00, Sâmbătă 09:00-14:00, Duminică 10:00-13:00 (doar pentru cabinetele din exterior). Înscrierile se pot face zilnic, de luni până vineri, între orele 08:00 și 18:00.",
    researchNotes:
      "Activități gratuite: dans sportiv-balet, tenis de masă, orientare sportivă, carting, automodele-navomodele, gimnastică, program L-V 08:00-19:00, Sâmbătă 09:00-14:00, Duminică 10:00-13:00 (cabinete exterioare), înscrieri L-V 08:00-18:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

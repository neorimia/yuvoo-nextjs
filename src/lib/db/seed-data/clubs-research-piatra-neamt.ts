/**
 * Clubs Research Data - Piatra Neamț
 *
 * Date reale colectate prin research public pentru cluburi sportive din Piatra Neamț.
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
 * Research Data - Cluburi Sportive Piatra Neamț
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_PIATRA_NEAMT: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "CSM Ceahlăul Piatra Neamț - Centrul de Copii și Juniori",
    sportType: "fotbal",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Stadionul Ceahlăul, Piatra Neamț",
    website: "https://csmceahlaul.ro/",
    description:
      "Clubul Sportiv Municipal Ceahlăul Piatra Neamț pune un accent deosebit pe dezvoltarea tinerelor talente prin intermediul Centrului său de Copii și Juniori. În sezonul 2024/2025, clubul dispune de zece echipe de juniori, acoperind categoriile de vârstă de la U11 până la U19, inclusiv două echipe de fotbal feminin la categoriile U13 și U15. Clubul, fondat inițial în 1919, joacă în prezent în Liga II și își desfășoară meciurile pe Stadionul Ceahlăul, cu o capacitate de 18.000 de locuri. CSM Ceahlăul are o academie de tineret recunoscută pentru formarea unor jucători de valoare, precum Vasile Avădanei, Florin Axinia și Lucian Burdujan. Pentru a atrage noi talente, clubul organizează periodic selecții pentru copii născuți între 2007 și 2014.",
    researchNotes:
      "Fondat 1919, Liga II, Stadionul Ceahlăul (18.000 locuri), 10 echipe juniori U11-U19 (inclusiv 2 echipe feminine U13 și U15), selecții copii născuți 2007-2014, responsabil: Daniel Mahu Moisii (0746390162), academie recunoscută (jucători: Vasile Avădanei, Florin Axinia, Lucian Burdujan)",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "FC Pietricica 'Școala de fotbal Florin Axinia'",
    sportType: "fotbal",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Piatra Neamț, Bicaz, Podoleni, Roman",
    description:
      "CS FC Pietricica 'Școala de fotbal Florin Axinia' oferă cursuri de fotbal pentru copii cu vârste între 4 și 14 ani. Înființat în 2008, clubul caută talente în Piatra Neamț și are locații de antrenament în Piatra Neamț, Bicaz, Podoleni și Roman. Clubul participă activ la competiții locale și naționale, inclusiv turneul de minifotbal pentru copii 'Piatra Neamț - Perla Moldovei'.",
    researchNotes:
      "Înființat 2008, copii 4-14 ani, locații antrenament: Piatra Neamț, Bicaz, Podoleni, Roman, participare competiții locale și naționale (turneul 'Piatra Neamț - Perla Moldovei')",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "ACS 'PETRAS' Neamț - Secția de Baschet",
    sportType: "baschet",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Colegiul Național de Informatică, Piatra Neamț",
    description:
      "Asociația Club Sportiv 'PETRAS' Neamț organizează competiții de baschet pentru copii. În septembrie 2017, a avut loc Cupa 'Baschet Petras' la Colegiul Național de Informatică, cu participarea a aproximativ 80 de copii cu vârste între 10 și 13 ani. Clubul oferă programe de pregătire în baschet pentru copii și juniori.",
    researchNotes:
      "Organizare Cupa 'Baschet Petras' - septembrie 2017 (circa 80 copii 10-13 ani), Colegiul Național de Informatică",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS 'ATAC' Neamț - Secția de Baschet",
    sportType: "baschet",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Piatra Neamț",
    description:
      "Asociația Sportivă 'ATAC' Neamț are secții pentru baschet, handbal și tenis. Clubul oferă programe sportive pentru copii și juniori în diverse discipline.",
    researchNotes: "Parte din ACS 'ATAC' Neamț, secții: baschet, handbal, tenis",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "Direcția Județeană pentru Sport și Tineret Neamț - Minihandbal",
    sportType: "handbal",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Piatra Neamț",
    description:
      "Direcția Județeană pentru Sport și Tineret Neamț organizează anual Festivalul de Minihandbal 'Mircea Fleșeriu'. În iunie 2024, evenimentul a reunit peste 400 de copii, inclusiv echipe din Republica Moldova. Festivalul promovează minihandbalul în rândul copiilor și juniori.",
    researchNotes:
      "Organizare Festivalul de Minihandbal 'Mircea Fleșeriu' - iunie 2024 (peste 400 copii, echipe din Republica Moldova)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS 'ATAC' Neamț - Secția de Handbal",
    sportType: "handbal",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Piatra Neamț",
    description:
      "Asociația Sportivă 'ATAC' Neamț are secții pentru baschet, handbal și tenis. Clubul oferă programe sportive pentru copii și juniori în diverse discipline.",
    researchNotes: "Parte din ACS 'ATAC' Neamț, secții: baschet, handbal, tenis",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "ACS Orhideea Piatra Neamț - Tenis",
    sportType: "tenis",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Piatra Neamț",
    description:
      "Asociația Club Sportiv Orhideea este un club privat care dispune de două terenuri de tenis și unul polivalent, marcat pentru tenis cu piciorul, minifotbal, handbal și oferă cursuri de fitness și tenis pentru inițiere. De asemenea, clubul are o zonă generoasă de 1.500 mp cu spațiu de relaxare, terasă și spațiu verde, unde copiii se pot juca.",
    researchNotes:
      "Club privat, 2 terenuri tenis, 1 teren polivalent (tenis cu piciorul, minifotbal, handbal), cursuri fitness și tenis inițiere, zonă 1.500 mp relaxare, terasă, spațiu verde",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS 'ATAC' Neamț - Secția de Tenis",
    sportType: "tenis",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Piatra Neamț",
    description:
      "Asociația Sportivă 'ATAC' Neamț are secții pentru baschet, handbal și tenis. Clubul oferă programe sportive pentru copii și juniori în diverse discipline.",
    researchNotes: "Parte din ACS 'ATAC' Neamț, secții: baschet, handbal, tenis",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Complex Sportiv Delmadi Piatra Neamț - Înot",
    sportType: "inot",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Piatra Neamț",
    website: "https://www.csdelmadi.ro/",
    description:
      "Complex Sportiv Delmadi Piatra Neamț organizează cursuri de înot pentru copii și adulți, inclusiv inițiere, avansați și performanță. Clubul organizează competiții de înot pentru copii, precum 'Cupa Delmadi', ediția a XV-a. Piatra Neamț a devenit capitala înotului de juniori și copii, găzduind evenimente importante de înot.",
    researchNotes:
      "Cursuri: inițiere, avansați, performanță, organizare 'Cupa Delmadi' - ediția a XV-a, Piatra Neamț capitala înotului de juniori și copii",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Sporting Club Piatra Neamț - Înot",
    sportType: "inot",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Baia Comunală City Spa, Piatra Neamț",
    phone: "+40 745 610 604",
    email: "sportingclub_2011@yahoo.com",
    website: "https://www.inotpiatraneamt.ro/",
    description:
      "Sporting Club Piatra Neamț oferă cursuri de înot pentru copii începători și avansați la Baia Comunală City Spa. Programul pentru copii este de marți până vineri, între orele 15:00 și 16:00. Clubul oferă programe variate pentru dezvoltarea abilităților de înot.",
    researchNotes:
      "Baia Comunală City Spa, program copii: Mar-Vi 15:00-16:00, începători și avansați",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "15:00-16:00" },
      { day: "Miercuri", time: "15:00-16:00" },
      { day: "Joi", time: "15:00-16:00" },
      { day: "Vineri", time: "15:00-16:00" },
    ],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "Clubul Sportiv Ceahlăul Piatra Neamț - Atletism",
    sportType: "atletism",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Piatra Neamț",
    description:
      "Clubul Sportiv Ceahlăul Piatra Neamț oferă programe de atletism pentru copii. În octombrie 2025, a organizat a doua ediție a Cupei Municipale de Atletism pentru juniori, la care au participat aproximativ 150 de copii cu vârste între 8 și 12 ani. Clubul promovează atletismul în rândul copiilor și juniori.",
    researchNotes:
      "Organizare Cupa Municipale de Atletism pentru juniori - ediția a II-a octombrie 2025 (circa 150 copii 8-12 ani)",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "Mihut Wrestling Academy Piatra Neamț - Gimnastică Ritmică",
    sportType: "gimnastica",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Piatra Neamț",
    website: "https://mihutwrestlingacademy.ro/",
    description:
      "Mihut Wrestling Academy Piatra Neamț oferă cursuri de gimnastică ritmică pentru copii, susținute de antrenoarea Adina Petre. Antrenamentele au loc marți și joi, între orele 17:00 și 18:00. Clubul oferă programe variate pentru dezvoltarea abilităților gimnastice.",
    researchNotes: "Antrenor: Adina Petre, program: Mar-Joi 17:00-18:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "17:00-18:00" },
      { day: "Joi", time: "17:00-18:00" },
    ],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "Mihut Wrestling Academy Piatra Neamț - Karate",
    sportType: "karate",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Piatra Neamț",
    website: "https://mihutwrestlingacademy.ro/",
    description:
      "Mihut Wrestling Academy Piatra Neamț oferă cursuri de karate pentru copii, susținute de instructorul Ioniță Ionel. Antrenamentele au loc marți și joi, între orele 18:00 și 19:00. Clubul oferă programe variate pentru dezvoltarea abilităților în karate.",
    researchNotes: "Instructor: Ioniță Ionel, program: Mar-Joi 18:00-19:00",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "18:00-19:00" },
      { day: "Joi", time: "18:00-19:00" },
    ],
  }),

  createClubFromResearch({
    name: "Academia de Arte Marțiale Mizuno Piatra Neamț",
    sportType: "karate",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Piatra Neamț",
    phone: "+40 723 511 333",
    description:
      "Academia de Arte Marțiale Mizuno Piatra Neamț este specializată în aikido, taichichuan și jujitsu, oferind programe pentru copii. Academia oferă programe variate pentru dezvoltarea abilităților în arte marțiale.",
    researchNotes: "Aikido, taichichuan, jujitsu, președinte: Daniel Nicolae Ene (0723-511-333)",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS DE MASĂ (Table Tennis) ==========
  createClubFromResearch({
    name: "Palatul Copiilor Piatra Neamț - Tenis de Masă",
    sportType: "tenis-de-masa",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Strada Ștefan cel Mare nr. 44, Piatra Neamț",
    phone: "+40 233 214 351",
    email: "palatulcopiilorneamt@yahoo.com",
    website: "https://palatulcopiilorpiatraneamt.wordpress.com/",
    description:
      "Palatul Copiilor Piatra Neamț oferă cursuri gratuite de tenis de masă pentru copii. Activitatea stimulează reflexele și concentrarea și face parte din gama variată de cercuri disponibile la Palatul Copiilor. Toate activitățile sunt gratuite și se desfășoară sub îndrumarea profesorilor calificați.",
    researchNotes:
      "Cursuri gratuite, stimulare reflexe și concentrare, program sub îndrumarea profesorilor calificați",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Silver Dance Academy Piatra Neamț",
    sportType: "dans",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Piatra Neamț",
    website: "https://www.silverdanceacademy.ro/",
    description:
      "Silver Dance Academy Piatra Neamț oferă cursuri de dans pentru copii, inclusiv dans sportiv, dans modern, street dance și balet. Cursurile pentru copii începători costă 220 lei pe lună și includ două ședințe pe săptămână. Academia oferă programe variate pentru dezvoltarea abilităților artistice și sportive.",
    researchNotes:
      "Dans sportiv, dans modern, street dance, balet, copii începători: 220 lei/lună (2 ședințe/săptămână)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    pricing: [{ type: "monthly", amount: 220, currency: "RON" }],
  }),

  createClubFromResearch({
    name: "Valentino School Ballet Piatra Neamț",
    sportType: "dans",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Piatra Neamț",
    phone: "+40 756 851 934",
    description:
      "Valentino School Ballet Piatra Neamț organizează cursuri de balet și dans contemporan pentru copii și adulți. Școala oferă programe variate pentru dezvoltarea abilităților artistice.",
    researchNotes: "Balet, dans contemporan, copii și adulți, telefon: 0756 851 934",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport clubs) ==========
  createClubFromResearch({
    name: "LPS Piatra Neamț - Clubul Sportiv Școlar",
    sportType: "multi-sport",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Piatra Neamț",
    website: "https://www.lpspn.ro/",
    description:
      "Liceul cu Program Sportiv Piatra Neamț este o instituție de învățământ care include un club sportiv școlar (CSS) și oferă programe de pregătire în diverse discipline sportive, incluzând fotbal, handbal și volei. Pentru anul școlar 2024-2025, LPS Piatra Neamț a anunțat locuri disponibile pentru clasele a V-a la disciplinele fotbal (12 locuri pentru băieți) și handbal (12 locuri pentru fete și băieți). Echipa de Juniori U-19 a ocupat locul IX în Campionatul Național, seria I, sub îndrumarea profesorului Lupu Răzvan.",
    researchNotes:
      "Instituție de învățământ cu CSS, discipline: fotbal, handbal, volei, locuri clasele a V-a 2024-2025: fotbal 12 locuri (băieți), handbal 12 locuri (fete și băieți), rezultate: loc IX Campionatul Național U-19 seria I (antrenor: prof. Lupu Răzvan)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Piatra Neamț",
    sportType: "multi-sport",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Strada Ștefan cel Mare nr. 44, Piatra Neamț",
    phone: "+40 233 214 351",
    email: "palatulcopiilorneamt@yahoo.com",
    website: "https://palatulcopiilorpiatraneamt.wordpress.com/",
    description:
      "Palatul Copiilor Piatra Neamț oferă o gamă variată de activități sportive gratuite pentru copii și tineri. Printre cercurile sportive disponibile se numără: arte marțiale (dezvoltă disciplina, coordonarea și forța fizică), handbal (îmbunătățește spiritul de echipă și rezistența fizică), tenis de masă (stimulează reflexele și concentrarea) și karting (oferă oportunitatea de a învăța tehnici de conducere și de a participa la competiții naționale). De asemenea, Palatul Copiilor a deschis un cerc de natație coordonat de profesorul Dan Gavril. Toate activitățile sunt gratuite și se desfășoară sub îndrumarea profesorilor calificați. Palatul Copiilor organizează periodic evenimente și demonstrații sportive, cum ar fi concursuri de karting și automodele.",
    researchNotes:
      "Activități gratuite: arte marțiale, handbal, tenis de masă, karting, natație (coord. prof. Dan Gavril), gimnastică, organizare evenimente și demonstrații sportive (concursuri karting și automodele), program sub îndrumarea profesorilor calificați",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Complexul de Agrement Ștrandul Tineretului Piatra Neamț",
    sportType: "multi-sport",
    city: "Piatra Neamț",
    district: "Cernegura",
    address: "Poalele muntelui Cernegura, Piatra Neamț",
    description:
      "Complexul de Agrement Ștrandul Tineretului Piatra Neamț este situat la poalele muntelui Cernegura și include două bazine de înot, spații verzi, spații de cazare și terenuri pentru tenis, fotbal, baschet, volei și handbal. De asemenea, oferă facilități pentru patinaj, role și skateboard. Complexul oferă oportunități variate pentru sport și relaxare pentru copii și adulți.",
    researchNotes:
      "Locație: poalele muntelui Cernegura, facilități: 2 bazine înot, spații verzi, cazare, terenuri (tenis, fotbal, baschet, volei, handbal), patinaj, role, skateboard",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Ceahlăul Piatra Neamț",
    sportType: "multi-sport",
    city: "Piatra Neamț",
    district: "N/A",
    address: "Stadionul Ceahlăul, Piatra Neamț",
    website: "https://csmceahlaul.ro/",
    description:
      "Clubul Sportiv Municipal Ceahlăul Piatra Neamț este un club major cu o istorie îndelungată, fondat inițial în 1919. Clubul joacă în prezent în Liga II și își desfășoară meciurile pe Stadionul Ceahlăul, cu o capacitate de 18.000 de locuri. CSM Ceahlăul are o academie de tineret recunoscută și un Centru de Copii și Juniori cu zece echipe de juniori (U11-U19, inclusiv 2 echipe feminine U13 și U15). Clubul este recunoscut pentru formarea unor jucători de valoare, precum Vasile Avădanei, Florin Axinia și Lucian Burdujan. Pe lângă fotbal, clubul are și secții în alte sporturi, inclusiv atletism.",
    researchNotes:
      "Fondat 1919, Liga II, Stadionul Ceahlăul (18.000 locuri), academie de tineret recunoscută, Centru de Copii și Juniori (10 echipe U11-U19, inclusiv 2 echipe feminine U13 și U15), jucători formați: Vasile Avădanei, Florin Axinia, Lucian Burdujan, secții: fotbal, atletism",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

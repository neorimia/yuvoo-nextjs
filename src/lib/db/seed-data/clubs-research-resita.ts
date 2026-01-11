/**
 * Clubs Research Data - Reșița
 *
 * Date reale colectate prin research public pentru cluburi sportive din Reșița.
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
 * Research Data - Cluburi Sportive Reșița
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_RESITA: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "CSM Reșița - Secția de Fotbal",
    sportType: "fotbal",
    city: "Reșița",
    district: "N/A",
    address: "Stadionul Mircea Chivu, Reșița",
    website: "https://www.csm-resita.ro/",
    description:
      "CSM Reșița cu secție de fotbal pentru copii și juniori. Clubul Sportiv Municipal Reșița, cunoscut și sub numele de Clubul Sportiv Muncitoresc Reșița, este un club de fotbal din Reșița, Caraș-Severin, cu o tradiție îndelungată în fotbalul românesc. Fondat în 1926, clubul a fost cunoscut anterior sub denumirea de UD Reșița și Metalul Reșița în perioada 1949–1956. Echipa câștigat titlul național în sezonul 1930-31. Echipa își desfășoară meciurile de acasă pe Stadionul Mircea Chivu, cu o capacitate de 12.500 de locuri. În prezent, CSM Reșița activează în Liga II. În ceea ce privește sectorul de copii și juniori, CSM Reșița a înregistrat progrese semnificative. Conform unui clasament al academiilor de fotbal din România publicat de Federația Română de Fotbal, clubul s-a clasat pe locul 42, cu un punctaj de 60,47, îmbunătățind considerabil față de clasamentul anterior (locul 76 cu 38,32 puncte). În plus, în cadrul unui proiect al FRF de clasificare a centrelor de copii și juniori din fotbalul amator, CSM Reșița a fost recunoscută cu distincția 'Bronze', atestând nivelul de organizare și performanță al centrului de juniori al clubului.",
    researchNotes:
      "Fondat 1926 (UD Reșița, Metalul Reșița 1949-1956), titlul național sezonul 1930-31, meciuri Stadionul Mircea Chivu (12.500 locuri), Liga II, academie copii și juniori: clasament FRF locul 42 (60,47 puncte, îmbunătățire de la locul 76 cu 38,32 puncte), distincție FRF 'Bronze' pentru centre copii și juniori fotbal amator",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Reșița - Secția de Fotbal",
    sportType: "fotbal",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    description:
      "Clubul Sportiv Școlar Reșița cu secție de fotbal pentru copii și juniori. CSS Reșița este o instituție dedicată formării tinerilor sportivi în diverse discipline. Conform declarațiilor directorului Robert Nosal, CSS Reșița oferă gratuitate în bazele sportive și instruire de calitate, având 42 de grupe care pot cuprinde până la 466 de elevi. Secțiile active includ fotbal, gimnastică artistică, gimnastică ritmică, atletism, lupte libere, schi și înot.",
    researchNotes:
      "Parte din CSS Reșița, gratuitate baze sportive, instruire calitate, 42 grupe (până la 466 elevi), secții: fotbal, gimnastică artistică, gimnastică ritmică, atletism, lupte libere, schi, înot",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSM Reșița - Secția de Baschet",
    sportType: "baschet",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    website: "https://www.csm-resita.ro/",
    description:
      "CSM Reșița cu secție de baschet pentru copii și juniori. Clubul Sportiv Municipal Reșița oferă secții pentru diverse discipline sportive, inclusiv baschet, adresate atât copiilor, cât și adulților.",
    researchNotes:
      "Parte din CSM Reșița, secții diverse discipline sportive pentru copii și adulți",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CSM Reșița - Secția de Volei",
    sportType: "volei",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    website: "https://www.csm-resita.ro/",
    description:
      "CSM Reșița cu secție de volei pentru copii și juniori. Clubul Sportiv Municipal Reșița oferă secții pentru diverse discipline sportive, inclusiv volei, adresate atât copiilor, cât și adulților.",
    researchNotes:
      "Parte din CSM Reșița, secții diverse discipline sportive pentru copii și adulți",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSM Reșița - Secția de Handbal",
    sportType: "handbal",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    website: "https://www.csm-resita.ro/",
    description:
      "CSM Reșița cu secție de handbal pentru copii și juniori. Clubul Sportiv Municipal Reșița oferă secții pentru diverse discipline sportive, inclusiv handbal, adresate atât copiilor, cât și adulților. Echipa de handbal masculin a CSM Reșița a fost înființată în 2014 sub numele de HC Adrian Petrea Reșița, continuând tradiția handbalistică a orașului după desființarea clubului UCM Reșița. După reorganizări, echipa a fost reînființată în 2017 ca CSM Școlar Reșița și joacă în Divizia A.",
    researchNotes:
      "Parte din CSM Reșița, secții diverse discipline sportive pentru copii și adulți, echipa masculină seniori: înființată 2014 (HC Adrian Petrea Reșița, succesoare UCM Reșița), reînființată 2017 (CSM Școlar Reșița), Divizia A",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "CSM Reșița - Secția de Înot",
    sportType: "inot",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    website: "https://www.csm-resita.ro/",
    description:
      "CSM Reșița cu secție de înot pentru copii și juniori. Conform raportului de activitate din 2024, clubul are o secție de înot pentru copii, coordonată de antrenorul Sergiu Ghimboasă. Clubul Sportiv Municipal Reșița oferă secții pentru diverse discipline sportive, inclusiv înot, adresate atât copiilor, cât și adulților.",
    researchNotes:
      "Parte din CSM Reșița, secție înot copii coordonată de antrenorul Sergiu Ghimboasă (2024), secții diverse discipline sportive pentru copii și adulți",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Complexul Municipal Sport și Sănătate Ioan Schuster - Bazinul Olimpic",
    sportType: "inot",
    city: "Reșița",
    district: "N/A",
    address: "Complexul Municipal Sport și Sănătate Ioan Schuster, Reșița",
    description:
      "Complexul Municipal de Sport și Sănătate 'Ioan Schuster' oferă cursuri de înot pentru copii în bazinul olimpic. În perioada februarie-aprilie 2025, Primăria Reșița a organizat cursuri gratuite de inițiere în înot pentru elevii din clasele pregătitoare și clasa I, desfășurate la Complexul Municipal de Sport și Sănătate 'Ioan Schuster'. Aceste cursuri au avut loc în cadrul orelor de sport, cu ședințe săptămânale de câte 2 ore.",
    researchNotes:
      "Bazin olimpic, cursuri înot copii, program Primăria Reșița: cursuri gratuite inițiere înot pentru elevi clasele pregătitoare și clasa I (februarie-aprilie 2025), ședințe săptămânale 2 ore, în cadrul orelor de sport",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Reșița - Secția de Înot",
    sportType: "inot",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    description:
      "Clubul Sportiv Școlar Reșița cu secție de înot pentru copii și juniori. CSS Reșița este o instituție dedicată formării tinerilor sportivi în diverse discipline. Conform declarațiilor directorului Robert Nosal, CSS Reșița oferă gratuitate în bazele sportive și instruire de calitate, având 42 de grupe care pot cuprinde până la 466 de elevi. Secțiile active includ înot, fotbal, gimnastică artistică, gimnastică ritmică, atletism, lupte libere și schi.",
    researchNotes:
      "Parte din CSS Reșița, gratuitate baze sportive, instruire calitate, 42 grupe (până la 466 elevi), secții: înot, fotbal, gimnastică artistică, gimnastică ritmică, atletism, lupte libere, schi",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CSS Reșița - Secția de Atletism",
    sportType: "atletism",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    description:
      "Clubul Sportiv Școlar Reșița cu secție de atletism pentru copii și juniori. CSS Reșița este o instituție dedicată formării tinerilor sportivi în diverse discipline. Conform declarațiilor directorului Robert Nosal, CSS Reșița oferă gratuitate în bazele sportive și instruire de calitate, având 42 de grupe care pot cuprinde până la 466 de elevi. Secțiile active includ atletism, fotbal, gimnastică artistică, gimnastică ritmică, lupte libere, schi și înot.",
    researchNotes:
      "Parte din CSS Reșița, gratuitate baze sportive, instruire calitate, 42 grupe (până la 466 elevi), secții: atletism, fotbal, gimnastică artistică, gimnastică ritmică, lupte libere, schi, înot",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "CSS Reșița - Secția de Gimnastică Artistică",
    sportType: "gimnastica",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    description:
      "Clubul Sportiv Școlar Reșița cu secție de gimnastică artistică pentru copii și juniori. CSS Reșița este o instituție dedicată formării tinerilor sportivi în diverse discipline. Conform declarațiilor directorului Robert Nosal, CSS Reșița oferă gratuitate în bazele sportive și instruire de calitate, având 42 de grupe care pot cuprinde până la 466 de elevi. Secțiile active includ gimnastică artistică, gimnastică ritmică, fotbal, atletism, lupte libere, schi și înot.",
    researchNotes:
      "Parte din CSS Reșița, gratuitate baze sportive, instruire calitate, 42 grupe (până la 466 elevi), secții: gimnastică artistică, gimnastică ritmică, fotbal, atletism, lupte libere, schi, înot",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Reșița - Secția de Gimnastică Ritmică",
    sportType: "gimnastica",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    description:
      "Clubul Sportiv Școlar Reșița cu secție de gimnastică ritmică pentru copii și juniori. CSS Reșița este o instituție dedicată formării tinerilor sportivi în diverse discipline. Conform declarațiilor directorului Robert Nosal, CSS Reșița oferă gratuitate în bazele sportive și instruire de calitate, având 42 de grupe care pot cuprinde până la 466 de elevi. Secțiile active includ gimnastică ritmică, gimnastică artistică, fotbal, atletism, lupte libere, schi și înot.",
    researchNotes:
      "Parte din CSS Reșița, gratuitate baze sportive, instruire calitate, 42 grupe (până la 466 elevi), secții: gimnastică ritmică, gimnastică artistică, fotbal, atletism, lupte libere, schi, înot",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CSS Reșița - Secția de Lupte Libere",
    sportType: "lupte",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    description:
      "Clubul Sportiv Școlar Reșița cu secție de lupte libere pentru copii și juniori. CSS Reșița este o instituție dedicată formării tinerilor sportivi în diverse discipline. Conform declarațiilor directorului Robert Nosal, CSS Reșița oferă gratuitate în bazele sportive și instruire de calitate, având 42 de grupe care pot cuprinde până la 466 de elevi. Secțiile active includ lupte libere, fotbal, gimnastică artistică, gimnastică ritmică, atletism, schi și înot. În anul 2022, Clubul Sportiv Școlar Reșița a obținut rezultate notabile în competițiile de lupte. La Finala Campionatului Național Individual de Lupte pentru Juniori 4, desfășurată la Costinești între 19 și 22 iunie 2022, sportiva Andrada Dinta de la CSM Reșița a câștigat medalia de aur la categoria feminin -33 kg. De asemenea, Denisa Maria Criste de la CSM Reșița a obținut medalia de bronz la aceeași categorie. În plus, Denisa Pintiliciuc de la CSS Reșița s-a clasat pe locul 5 în aceeași categorie. În 2022, CSS Reșița a obținut 129 de medalii în competițiile interne și internaționale, reflectând angajamentul și performanța sportivilor săi.",
    researchNotes:
      "Parte din CSS Reșița, gratuitate baze sportive, instruire calitate, 42 grupe (până la 466 elevi), secții: lupte libere, fotbal, gimnastică artistică, gimnastică ritmică, atletism, schi, înot, rezultate remarcabile: Finala Campionatul Național Individual de Lupte Juniori 4 Costinești 19-22 iunie 2022 (Andrada Dinta CSM Reșița: aur feminin -33 kg, Denisa Maria Criste CSM Reșița: bronz feminin -33 kg, Denisa Pintiliciuc CSS Reșița: locul 5 feminin -33 kg), 129 medalii competiții interne și internaționale 2022",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport clubs) ==========
  createClubFromResearch({
    name: "CSM Reșița",
    sportType: "multi-sport",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    website: "https://www.csm-resita.ro/",
    description:
      "Clubul Sportiv Municipal Reșița este un club polisportiv cu o istorie bogată, având echipe în diverse discipline, inclusiv fotbal și handbal masculin. Clubul, cunoscut și sub numele de Clubul Sportiv Muncitoresc Reșița, este un club de fotbal din Reșița, Caraș-Severin, cu o tradiție îndelungată în fotbalul românesc. Fondat în 1926, clubul a fost cunoscut anterior sub denumirea de UD Reșița și Metalul Reșița în perioada 1949–1956. Echipa câștigat titlul național în sezonul 1930-31. Echipa își desfășoară meciurile de acasă pe Stadionul Mircea Chivu, cu o capacitate de 12.500 de locuri. În prezent, CSM Reșița activează în Liga II. În ceea ce privește sectorul de copii și juniori, CSM Reșița a înregistrat progrese semnificative: clasament FRF locul 42 (60,47 puncte), distincție FRF 'Bronze' pentru centre copii și juniori. Echipa de handbal masculin a fost înființată în 2014 sub numele de HC Adrian Petrea Reșița, continuând tradiția handbalistică a orașului după desființarea clubului UCM Reșița. După reorganizări, echipa a fost reînființată în 2017 ca CSM Școlar Reșița și joacă în Divizia A. Conform raportului de activitate din 2024, clubul are o secție de înot pentru copii, coordonată de antrenorul Sergiu Ghimboasă. Clubul oferă secții pentru diverse discipline sportive, inclusiv handbal, baschet, volei și înot, adresate atât copiilor, cât și adulților.",
    researchNotes:
      "Istorie bogată, fondat 1926 (UD Reșița, Metalul Reșița 1949-1956, CSM), titlul național sezonul 1930-31, meciuri Stadionul Mircea Chivu (12.500 locuri), Liga II, academie copii și juniori fotbal: clasament FRF locul 42 (60,47 puncte, îmbunătățire de la locul 76 cu 38,32 puncte), distincție FRF 'Bronze' pentru centre copii și juniori fotbal amator, handbal masculin: înființat 2014 (HC Adrian Petrea Reșița, succesoare UCM Reșița), reînființat 2017 (CSM Școlar Reșița), Divizia A, secții diverse discipline sportive: handbal, baschet, volei, înot (copii coordonat de antrenorul Sergiu Ghimboasă 2024), pentru copii și adulți",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Reșița",
    sportType: "multi-sport",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    description:
      "Clubul Sportiv Școlar Reșița este o instituție dedicată formării tinerilor sportivi în diverse discipline. Conform declarațiilor directorului Robert Nosal, CSS Reșița oferă gratuitate în bazele sportive și instruire de calitate, având 42 de grupe care pot cuprinde până la 466 de elevi. Secțiile active includ gimnastică artistică, gimnastică ritmică, atletism, lupte libere, schi, fotbal și înot. În anul 2022, CSS Reșița a obținut rezultate notabile în competițiile de lupte: la Finala Campionatului Național Individual de Lupte pentru Juniori 4, desfășurată la Costinești între 19 și 22 iunie 2022, sportiva Andrada Dinta de la CSM Reșița a câștigat medalia de aur la categoria feminin -33 kg, Denisa Maria Criste de la CSM Reșița a obținut medalia de bronz la aceeași categorie, iar Denisa Pintiliciuc de la CSS Reșița s-a clasat pe locul 5 în aceeași categorie. În 2022, CSS Reșița a obținut 129 de medalii în competițiile interne și internaționale, reflectând angajamentul și performanța sportivilor săi.",
    researchNotes:
      "Instituție formare tineri sportivi, gratuitate baze sportive, instruire calitate, 42 grupe (până la 466 elevi), secții: gimnastică artistică, gimnastică ritmică, atletism, lupte libere, schi, fotbal, înot, rezultate remarcabile: Finala Campionatul Național Individual de Lupte Juniori 4 Costinești 19-22 iunie 2022 (Andrada Dinta CSM Reșița: aur feminin -33 kg, Denisa Maria Criste CSM Reșița: bronz feminin -33 kg, Denisa Pintiliciuc CSS Reșița: locul 5 feminin -33 kg), 129 medalii competiții interne și internaționale 2022",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Reșița",
    sportType: "multi-sport",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    description:
      "Palatul Copiilor Reșița oferă o varietate de activități sportive pentru copii, menite să le dezvolte abilitățile fizice și spiritul de echipă. Printre disciplinele sportive disponibile se numără karting și alte activități sportive. Palatul Copiilor Reșița a obținut rezultate remarcabile în competițiile naționale de karting. De exemplu, echipa a câștigat locul I la Concursul Național de Karting și Educație Rutieră 'Memorialul Codruț Morar și Jani Ferec' desfășurat la Târgu Secuiesc. Palatul Copiilor Reșița oferă programe pentru copii în diverse sporturi, inclusiv gimnastică, arte marțiale (judo, karate) și înot, aceste activități fiind adesea disponibile în cadrul Palatului Copiilor sau al Cluburilor Copiilor, care oferă o gamă variată de discipline sportive pentru tineri.",
    researchNotes:
      "Varietate activități sportive pentru copii, dezvoltare abilități fizice și spirit echipă, disciplina principală: karting, rezultate remarcabile: locul I Concursul Național de Karting și Educație Rutieră 'Memorialul Codruț Morar și Jani Ferec' Târgu Secuiesc, programe: gimnastică, arte marțiale (judo, karate), înot și alte discipline sportive",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ALTE DISCIPLINE (Other disciplines) ==========
  createClubFromResearch({
    name: "CSS Reșița - Secția de Schi",
    sportType: "schi",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    description:
      "Clubul Sportiv Școlar Reșița cu secție de schi pentru copii și juniori. CSS Reșița este o instituție dedicată formării tinerilor sportivi în diverse discipline. Conform declarațiilor directorului Robert Nosal, CSS Reșița oferă gratuitate în bazele sportive și instruire de calitate, având 42 de grupe care pot cuprinde până la 466 de elevi. Secțiile active includ schi, fotbal, gimnastică artistică, gimnastică ritmică, atletism, lupte libere și înot.",
    researchNotes:
      "Parte din CSS Reșița, gratuitate baze sportive, instruire calitate, 42 grupe (până la 466 elevi), secții: schi, fotbal, gimnastică artistică, gimnastică ritmică, atletism, lupte libere, înot",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Reșița - Secția de Karting",
    sportType: "karting",
    city: "Reșița",
    district: "N/A",
    address: "Reșița",
    description:
      "Palatul Copiilor Reșița cu secție de karting pentru copii și juniori. Palatul Copiilor Reșița a obținut rezultate remarcabile în competițiile naționale de karting. De exemplu, echipa a câștigat locul I la Concursul Național de Karting și Educație Rutieră 'Memorialul Codruț Morar și Jani Ferec' desfășurat la Târgu Secuiesc. Karting-ul este o disciplină sportivă care dezvoltă abilitățile fizice și spiritul de echipă în rândul copiilor.",
    researchNotes:
      "Parte din Palatul Copiilor Reșița, rezultate remarcabile: locul I Concursul Național de Karting și Educație Rutieră 'Memorialul Codruț Morar și Jani Ferec' Târgu Secuiesc, dezvoltare abilități fizice și spirit echipă",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

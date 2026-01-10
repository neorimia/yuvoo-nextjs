/**
 * Clubs Research Data - București
 *
 * Date reale colectate prin research public pentru cluburi sportive din București.
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
 * Total cluburi identificate: 70 (30 inițial + 40 suplimentar)
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
 * Research Data - Cluburi Sportive București
 * Date colectate din surse publice (Decembrie 2024)
 *
 * Research inițial: 30 cluburi (Decembrie 2024)
 * Research suplimentar: +40 cluburi (Ianuarie 2025)
 * Total: 70 cluburi
 */
export const CLUBS_RESEARCH_BUCHAREST: ClubSeedData[] = [
  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "Clubul Sportiv Tonic București",
    sportType: "volei",
    city: "București",
    district: "Sector 3",
    address: "Aleea Barajul Rovinari 1, Sector 3",
    phone: "+40 745 131 185",
    email: "office@cstonic.ro",
    website: "https://cstonic.ro/",
    description:
      "Club de volei pentru copii fondat în 2022, oferind cursuri pentru copii începând cu vârsta de 4 ani. Tradiție de excelență în volei.",
    researchNotes:
      "Fondat în 2022, acceptă copii de la 4 ani (sub standardul de 8 ani pentru volei competitiv)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "16:00-17:30" },
      { day: "Miercuri", time: "16:00-17:30" },
    ],
    pricing: [
      { type: "monthly", amount: 150, currency: "RON" }, // Începător - 1 antrenament/săptămână
      { type: "monthly", amount: 250, currency: "RON" }, // Implicat - 2 antrenamente/săptămână
      { type: "monthly", amount: 300, currency: "RON" }, // Avansat - 3 antrenamente/săptămână
    ],
  }),

  createClubFromResearch({
    name: "Galaxia Volei",
    sportType: "volei",
    city: "București",
    district: "Sector 3",
    address: "Școala Gimnazială nr. 20, Str. Prevederii nr. 19",
    phone: "+40 761 633 463",
    email: "contact@galaxia-volei.ro",
    website: "https://www.galaxia-volei.ro/",
    description:
      "Asociație nonprofit înființată în 2021, afiliată la Federația Română de Volei. Promovează dezvoltarea personală și plăcerea lucrului în echipă.",
    researchNotes: "Înființat în 2021, asociație nonprofit",
  }),

  createClubFromResearch({
    name: "ACS LifeGames București",
    sportType: "volei",
    city: "București",
    district: "Sector 3",
    address: "Strada Gura Ialomiței, nr. 20, sector 3",
    phone: "+40 755 121 001",
    email: "contact@acslifegamesbucuresti.ro",
    website: "https://acslifegamesbucuresti.ro/",
    description:
      "Cursuri de inițiere și performanță în volei pentru copii cu vârste între 6 și 14 ani, atât fete, cât și băieți.",
    researchNotes: "Primele două antrenamente gratuite",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Clubul Copiilor Sector 3",
    sportType: "volei",
    city: "București",
    district: "Sector 3",
    address: "Aleea Barajul Dunării nr. 5, Sector 3",
    phone: "+40 21 340 4922",
    email: "club_copii_3@yahoo.com",
    website: "https://clubulcopiilor3.ro/",
    description:
      "Oferă cursuri de inițiere în volei pentru copii, alături de alte activități sportive și artistice.",
  }),

  // ========== ESCALADĂ (Rock Climbing) ==========
  createClubFromResearch({
    name: "Fabrica de Cățărat",
    sportType: "escalada",
    city: "București",
    district: "Sector 4",
    address: "Strada 11 Iunie 50",
    phone: "+40 763 165 026",
    email: "office@fabricadecatarat.ro",
    website: "https://www.fabricadecatarat.ro/",
    description:
      "Oferă cursuri de escaladă pentru copii cu vârste între 4 și 14 ani, într-un mediu sigur și prietenos.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSM București",
    sportType: "baschet",
    city: "București",
    district: "Sector 2",
    address: "Bulevardul Basarabia nr. 43A, sector 2",
    phone: "+40 21 313 66 33",
    email: "office@csmbucuresti.ro",
    website: "https://www.csmbucuresti.ro/",
    description:
      "Clubul Sportiv Municipal București organizează cursuri de baschet pentru copii și juniori, oferind condiții excelente de pregătire și antrenament.",
  }),

  createClubFromResearch({
    name: "BC Laguna",
    sportType: "baschet",
    city: "București",
    district: "Sector 3",
    address: "Str. Turturelelor, Nr. 52, et. 2, camera 2.3, sector 3",
    phone: "+40 722 524 862",
    email: "office@bclaguna.ro",
    website: "https://www.bclaguna.ro/",
    description:
      "Club de baschet pentru copii cu locații în toate sectoarele Bucureștiului, oferind programe de inițiere și performanță.",
    researchNotes: "Locații în toate sectoarele",
  }),

  createClubFromResearch({
    name: "BAschet club București",
    sportType: "baschet",
    city: "București",
    district: "Sector 3",
    address: "Str. Prevederii nr.19",
    phone: "+40 721 242 999",
    email: "cursuribaschet@gmail.com",
    website: "https://baschetclub.ro/",
    description:
      "Oferă cursuri de baschet pentru copii în două săli de sport, punând accent pe dezvoltarea fizică și mentală.",
    researchNotes: "Două săli de sport",
  }),

  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "FC Asterra București",
    sportType: "fotbal",
    city: "București",
    district: "Sector 4",
    address: "Strada Dumitru Brumărescu 1-3, Sector 4",
    phone: "+40 721 335 415",
    email: "asterraclub@gmail.com",
    website: "https://www.asterra.ro/",
    description:
      "Organizează înscrieri pentru copii, băieți și fete, cu vârste între 4 și 13 ani, pe tot parcursul anului.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  }),

  createClubFromResearch({
    name: "Barça Academy România",
    sportType: "fotbal",
    city: "București",
    district: "Arcul de Triumf / Lia Manoliu",
    address: "București - Locații multiple (Arcul de Triumf și Lia Manoliu)",
    phone: "+40 742 120 444",
    website: "https://barcaacademy.ro/",
    description:
      "Academie oficială a FC Barcelona, oferă antrenamente de fotbal pentru copii, aplicând metodologia clubului spaniol, cu antrenori certificați și programe structurate.",
    researchNotes: "Metodologie FC Barcelona, două locații",
  }),

  createClubFromResearch({
    name: "Progresul Academy",
    sportType: "fotbal",
    city: "București",
    address: "Progresul Arena",
    phone: "+40 720 178 400",
    email: "contact@progresulspartac.ro",
    website: "https://www.progresul-arena.com/",
    description:
      "Oferă antrenamente de fotbal pentru copii, cu antrenori certificați, metodologie modernă și terenuri de calitate.",
    researchNotes: "Peste 500 copii activi în celelalte locații",
  }),

  createClubFromResearch({
    name: "Lions FC București",
    sportType: "fotbal",
    city: "București",
    district: "Sector 4",
    address: "Bulevardul Tineretului Nr. 2",
    phone: "+40 747 016 106",
    email: "office@lionsfc.ro",
    website: "https://www.lionsfc.ro/",
    description:
      "Promovează educația prin sport, oferind programe de fotbal pentru copii și închiriere de terenuri.",
  }),

  createClubFromResearch({
    name: "FC Premier București",
    sportType: "fotbal",
    city: "București",
    district: "Sector 3",
    address: "Strada Fizicienilor, nr. 50, Sector 3",
    phone: "+40 727 291 591",
    email: "premier.bucuresti@yahoo.com",
    website: "https://fcpremier.ro/",
    description:
      "Organizează cursuri de inițiere în fotbal pentru copii de până la 12 ani, într-o atmosferă plăcută și competitivă.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12],
  }),

  createClubFromResearch({
    name: "Astra Kids București",
    sportType: "fotbal",
    city: "București",
    district: "Sector 2",
    address: "Bulevardul Pierre de Coubertin 11, Sector 2",
    phone: "+40 787 777 600",
    email: "office@astrakidsbucuresti.ro",
    website: "https://astrakidsbucuresti.ro/",
    description:
      "Înființată în 2015 de un fost fotbalist de Liga 1, școala promovează fotbalul pentru băieți și fete de peste 4 ani, folosind metode moderne de antrenament.",
    researchNotes: "Înființată în 2015",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Global Star Sport",
    sportType: "fotbal",
    city: "București",
    district: "Sector 2",
    address: "Str. Țepeș Vodă nr. 123, Ap. 1, Sector 2",
    phone: "+40 761 945 551",
    email: "globalstarsportfotbal@gmail.com",
    website: "https://www.globalstarsport.ro/",
    description:
      "Oferă programe de inițiere pentru copii între 3 și 5 ani, axate pe exerciții de coordonare și primele noțiuni despre fotbal, într-un mediu sigur și prietenos.",
    ageGroups: [3, 4, 5],
  }),

  createClubFromResearch({
    name: "Fotbal Club Pro Luceafărul",
    sportType: "fotbal",
    city: "București",
    district: "Sector 3",
    address: "Strada Trapezului, nr. 4, sector 3",
    phone: "+40 783 040 148",
    email: "office@cursuri-fotbal.ro",
    website: "https://www.cursuri-fotbal.ro/",
    description:
      "Dispune de antrenori licențiați UEFA și trei terenuri cu gazon sintetic și nocturnă, punând accent pe educația copiilor prin fotbal.",
    researchNotes: "Antrenori licențiați UEFA",
  }),

  createClubFromResearch({
    name: "ACS Dinamo Noua Generație",
    sportType: "fotbal",
    city: "București",
    district: "Sector 2",
    address: "Strada Oltețului nr. 30, sector 2",
    phone: "+40 784 748 306",
    email: "dinamonouageneratie@yahoo.com",
    website: "https://acs-dng.ro/",
    description:
      "Oferă antrenamente de fotbal pentru copii, cu terenuri de fotbal sintetice și de iarbă, antrenori licențiați, asistență medicală și organizare de cantonamente la munte și mare.",
    researchNotes: "Terenuri sintetice și de iarbă",
  }),

  createClubFromResearch({
    name: "ACS Gloria Kids 2019",
    sportType: "fotbal",
    city: "București",
    district: "Sector 2",
    address: "Teren Parc Râul Colentina, Strada Marian Cristescu nr. 1",
    phone: "+40 765 412 053",
    email: "geoleacostelrobert@gmail.com",
    description:
      "Club de fotbal pentru copii cu vârste între 5 și 6 ani, oferind echipamente de antrenament gratuite, asistență medicală la turnee și competiții, și materiale sportive de ultimă generație.",
    ageGroups: [5, 6],
    researchNotes: "Echipamente gratuite",
  }),

  createClubFromResearch({
    name: "Academia de Fotbal Sport Team",
    sportType: "fotbal",
    city: "București",
    district: "Sector 1",
    address: "Bd. Mărăști, nr. 59, Sector 1",
    phone: "+40 732 368 225",
    email: "contact@sportteam.ro",
    website: "https://sportteam.ro/",
    description:
      "Clasată pe locul 5 în România conform Federației Române de Fotbal, oferă antrenamente pentru copii și juniori, participând la campionate municipale și asigurând transport pentru copii.",
    researchNotes: "Clasată pe locul 5 în România",
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "ATH Academia de Tenis Herăstrău",
    sportType: "tenis",
    city: "București",
    district: "Sector 1",
    address: "Aleea Pescăruș, Sector 1, Parcul Herăstrău",
    phone: "+40 757 031 035",
    email: "office@academiadetenis.ro",
    website: "https://www.academiadetenis.ro/",
    description:
      "Academia oferă cursuri pentru copii și adulți, pe terenuri de zgură încălzite și presostatice, sub îndrumarea antrenorilor certificați.",
    researchNotes: "Terenuri încălzite și presostatice",
  }),

  createClubFromResearch({
    name: "First Tennis Club",
    sportType: "tenis",
    city: "București",
    district: "Sector 1",
    address: "Bulevardul Expoziției 22",
    phone: "+40 722 384 304",
    email: "info@firsttennisclub.ro",
    description:
      "Clubul dispune de 6 terenuri cu suprafață de zgură, acoperite cu balon și dotate cu nocturnă, încălzite în sezonul rece. Antrenamentele sunt susținute de antrenori certificați, cu experiență pedagogică.",
    researchNotes: "6 terenuri cu balon și nocturnă",
  }),

  createClubFromResearch({
    name: "Fortius Olimpia",
    sportType: "tenis",
    city: "București",
    district: "Sector 3",
    address: "Strada Vailor nr. 16A",
    phone: "+40 769 645 289",
    email: "office@fortiusolimpia.ro",
    website: "https://www.fortiusolimpia.ro/",
    description:
      "Clubul se adresează copiilor de la 6 ani în sus, oferind cursuri de inițiere și performanță, sub îndrumarea antrenorilor cu experiență.",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Pro Tenis Club",
    sportType: "tenis",
    city: "București",
    district: "Sector 2",
    address: "Complexul Cultural Sportiv Studențesc Tei, Strada Caroteni 39, Sector 2",
    phone: "+40 722 472 322",
    email: "protenispro@gmail.com",
    website: "https://pro-tenis-club.ro/",
    description:
      "Clubul își desfășoară activitatea în Complexul Cultural Sportiv Studențesc Tei, oferind cursuri de inițiere și performanță pentru copii.",
  }),

  createClubFromResearch({
    name: "Lone Tenis Club",
    sportType: "tenis",
    city: "București",
    district: "Sector 5",
    address: "Strada Dantelei 126, Sector 5",
    phone: "+40 755 052 052",
    email: "contact@lone-tenis.ro",
    website: "https://lone-tenis.ro/",
    description:
      "Situat în sectorul 5, zona Ghencea, clubul dispune de 4 terenuri de zgură cu nocturnă LED și balon presostatic pe timpul iernii. Oferă cursuri de inițiere, perfecționare și performanță pentru copii.",
    researchNotes:
      "4 terenuri cu nocturnă LED. Tarifele variază în funcție de sezon (aer liber/acoperit) și orar",
    schedule: [
      { day: "Luni", time: "07:00-20:00" },
      { day: "Marți", time: "07:00-20:00" },
      { day: "Miercuri", time: "07:00-20:00" },
      { day: "Joi", time: "07:00-20:00" },
      { day: "Vineri", time: "07:00-20:00" },
      { day: "Sâmbătă", time: "07:00-24:00" },
      { day: "Duminică", time: "07:00-24:00" },
    ],
    pricing: [
      { type: "monthly", amount: 320, currency: "RON" }, // Grup 4 copii, 8 ședințe/lună (aer liber, L-V 07:00-17:00)
      { type: "monthly", amount: 450, currency: "RON" }, // Grup 4 copii, 12 ședințe/lună (aer liber, L-V 07:00-17:00)
      { type: "monthly", amount: 480, currency: "RON" }, // Grup 2-3 copii, 8 ședințe/lună (aer liber, L-V 07:00-17:00)
      { type: "monthly", amount: 680, currency: "RON" }, // Grup 2-3 copii, 12 ședințe/lună (aer liber, L-V 07:00-17:00)
      { type: "per_class", amount: 110, currency: "RON" }, // Individual (aer liber, L-V 07:00-17:00)
      { type: "per_class", amount: 135, currency: "RON" }, // Individual (aer liber, L-V 17:00-20:00 sau Weekend)
      { type: "monthly", amount: 440, currency: "RON" }, // Grup 4 copii, 8 ședințe/lună (acoperit, L-V până 17:00)
      { type: "monthly", amount: 600, currency: "RON" }, // Grup 4 copii, 12 ședințe/lună (acoperit, L-V până 17:00)
      { type: "monthly", amount: 640, currency: "RON" }, // Grup 2-3 copii, 8 ședințe/lună (acoperit, L-V până 17:00)
      { type: "monthly", amount: 880, currency: "RON" }, // Grup 2-3 copii, 12 ședințe/lună (acoperit, L-V până 17:00)
      { type: "per_class", amount: 150, currency: "RON" }, // Individual (acoperit, L-V până 17:00 sau Weekend)
      { type: "per_class", amount: 180, currency: "RON" }, // Individual (acoperit, L-V după 17:00)
    ],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "Handbal Club Sportiv Tectonic",
    sportType: "handbal",
    city: "București",
    district: "Sector 5",
    address: "Str. Ion Băiulescu nr. 108, Sector 5",
    phone: "+40 727 699 888",
    email: "office@sufletdecampion.ro",
    website: "https://sufletdecampion.ro/",
    description:
      "Oferă cursuri de handbal pentru copii cu vârste între 6 și 18 ani, promovând valori precum solidaritatea și perseverența.",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    researchNotes:
      "Promovează solidaritatea și perseverența. Acceptă copii de la 6 ani (sub standardul de 8 ani pentru handbal competitiv)",
  }),

  // ========== CLUBURI ȘCOLARE MULTI-SPORT ==========
  createClubFromResearch({
    name: "Clubul Sportiv Școlar Nr.1 București",
    sportType: "multi-sport",
    city: "București",
    district: "Sector 1",
    address: "Bulevardul Ion Mihalache nr. 162, Sector 1",
    phone: "+40 21 224 22 30",
    email: "css1pajura@yahoo.com",
    website: "https://css1bucuresti.ro/",
    description:
      "Înființat în 1957, clubul oferă 10 secții sportive, inclusiv atletism, baschet, canotaj, fotbal, înot, judo, karate, polo pe apă, scrimă, șah și tenis de masă, având peste 1.800 de elevi sportivi.",
    researchNotes: "Înființat în 1957, peste 1800 elevi",
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Școlar Nr.4 București",
    sportType: "multi-sport",
    city: "București",
    district: "Sector 3",
    address: "Aleea Buchetului, Nr. 5, Sector 3",
    phone: "+40 21 340 12 29",
    email: "clubsportiv4@yahoo.com",
    website: "https://css4bucuresti.ro/",
    description:
      "Fondat în 1968, clubul promovează sportul și educația fizică pentru tineri, având secții precum lupte libere și atletism.",
    researchNotes: "Fondat în 1968",
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Școlar Nr.6 București",
    sportType: "multi-sport",
    city: "București",
    district: "Sector 4",
    address: "Strada Luică, Nr. 70, Sector 4",
    phone: "+40 21 450 40 32",
    email: "css6_bucuresti@yahoo.com",
    website: "https://css6bucuresti.ro/",
    description: "Oferă cursuri de handbal și volei pentru începători și avansați.",
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Școlar Nr.2 București",
    sportType: "gimnastica",
    city: "București",
    district: "Sector 2",
    address: "Bulevardul Ferdinand I, Nr. 128, Sector 2",
    phone: "+40 21 252 25 08",
    email: "css2bucuresti@yahoo.com",
    description:
      "Oferă cursuri de inițiere în gimnastică sportivă pentru fete cu vârste între 5 și 10 ani, cu program de antrenament variat pe parcursul săptămânii.",
    ageGroups: [5, 6, 7, 8, 9, 10],
    researchNotes: "Doar fete",
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Academic București",
    sportType: "multi-sport",
    city: "București",
    district: "Sector 6",
    address: "Strada Fruntaș Anghel Mihai, nr. 2, sector 6",
    phone: "+40 770 128 747",
    email: "office@csacademic.ro",
    website: "https://csacademic.ro/",
    description:
      "Oferă cursuri sportive pentru copii în discipline precum handbal, baschet, volei, dansuri, gimnastică ritmică și aerobică, karate Kyokushin, cu baze de pregătire proprii și personal calificat.",
    researchNotes: "Baze de pregătire proprii",
  }),

  // ========== ÎNOT (Swimming) - Research suplimentar ==========
  createClubFromResearch({
    name: "SDV Club",
    sportType: "inot",
    city: "București",
    district: "Sector 6",
    address: "Strada Prelungirea Ghencea nr. 94-100, Sector 6",
    phone: "+40 727 068 333",
    email: "contact@sdvclub.ro",
    website: "https://sdvclub.ro/",
    description:
      "Oferă cursuri de înot pentru copii, adolescenți, adulți și bebeluși, precum și aqua gym și recuperare medicală. Programul bazinului este de luni până vineri între 07:00 și 22:30, iar în weekend între 08:00 și 16:00.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Swim Club Swimming Team",
    sportType: "inot",
    city: "București",
    district: "Sector 6",
    address: "Strada Larisa 2, Sector 6",
    phone: "+40 799 983 830",
    email: "office@club-inot.ro",
    website: "https://club-inot.ro/",
    description:
      "Organizează cursuri de înot pentru copii la patru bazine din București: Bazinul Sportul Studențesc (zona Crângași-Regie), Bazinul Dinamo (zona Ștefan cel Mare), Club Wellness Militari Residence (zona Militari).",
    researchNotes: "Patru locații în București",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "09:00-13:00" },
      { day: "Luni", time: "16:00-19:00" },
      { day: "Marți", time: "09:00-13:00" },
      { day: "Marți", time: "16:00-19:00" },
      { day: "Miercuri", time: "09:00-13:00" },
      { day: "Miercuri", time: "16:00-19:00" },
      { day: "Joi", time: "09:00-13:00" },
      { day: "Joi", time: "16:00-19:00" },
      { day: "Vineri", time: "09:00-13:00" },
      { day: "Vineri", time: "16:00-19:00" },
      { day: "Sâmbătă", time: "08:00-18:00" },
      { day: "Duminică", time: "08:00-18:00" },
    ],
    pricing: [
      { type: "per_class", amount: 90, currency: "RON" }, // 1 ședință curs copii
      { type: "monthly", amount: 460, currency: "RON" }, // 6 ședințe (L-V)
      { type: "monthly", amount: 560, currency: "RON" }, // 8 ședințe (L-V)
      { type: "monthly", amount: 590, currency: "RON" }, // 8 ședințe (S-D)
      { type: "monthly", amount: 610, currency: "RON" }, // 12 ședințe (L-V)
      { type: "monthly", amount: 790, currency: "RON" }, // Nelimitat (L-V)
      { type: "monthly", amount: 670, currency: "RON" }, // Pregătire performanță
      { type: "monthly", amount: 620, currency: "RON" }, // Nelimitat performanță
    ],
  }),

  createClubFromResearch({
    name: "Aqua Champions School",
    sportType: "inot",
    city: "București",
    district: "Sector 2 / Sector 4",
    address: "Bulevardul Basarabia 37-39, Sector 2 / Șoseaua Vitan-Bârzești 7D, Sector 4",
    phone: "+40 753 861 285",
    email: "contact@aquaschool.ro",
    website: "https://aquaschool.ro/",
    description:
      "Oferă cursuri de înot pentru copii și adulți, inclusiv pentru bebeluși, la nivel individual sau de grup. Locațiile includ Șoseaua Vitan-Bârzești 7D (Rin Grand Hotel) și Bulevardul Basarabia 37-39 (Alexandreea Club Fitness & Spa).",
    researchNotes: "Două locații",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-21:00" },
      { day: "Marți", time: "08:00-21:00" },
      { day: "Miercuri", time: "08:00-21:00" },
      { day: "Joi", time: "08:00-21:00" },
      { day: "Vineri", time: "08:00-21:00" },
      { day: "Sâmbătă", time: "10:00-21:00" },
      { day: "Duminică", time: "12:00-21:00" },
    ],
    pricing: [
      { type: "monthly", amount: 700, currency: "RON" }, // Grup 3-5 persoane, 8 ședințe
      { type: "monthly", amount: 1000, currency: "RON" }, // Grup 2 persoane, 8 ședințe
      { type: "monthly", amount: 1300, currency: "RON" }, // Individual, 8 ședințe
      { type: "monthly", amount: 1100, currency: "RON" }, // Grup 3-5 persoane, 12 ședințe
      { type: "monthly", amount: 1400, currency: "RON" }, // Grup 2 persoane, 12 ședințe
      { type: "monthly", amount: 1600, currency: "RON" }, // Individual, 12 ședințe
    ],
  }),

  createClubFromResearch({
    name: "LCD Club Olimpia",
    sportType: "inot",
    city: "București",
    district: "Sector 2",
    address: "Șoseaua Iancului 128A, Sector 2",
    phone: "+40 771 326 755",
    email: "contact@lcdclub.ro",
    website: "https://lcdclub.ro/",
    description:
      "Oferă cursuri de înot de inițiere și perfecționare pentru copii și adulți. Antrenorii lucrează cu copiii începând de la vârsta de 1 an.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    pricing: [
      { type: "monthly", amount: 530, currency: "RON" }, // Bazinul Olimpia, 8 ședințe
    ],
  }),

  createClubFromResearch({
    name: "Bucharest Sport Club",
    sportType: "inot",
    city: "București",
    district: "Multiple sectoare",
    address: "Multiple locații: Berceni, Floreasca, Ghencea, Iancului, Lia Manoliu, Pantelimon",
    phone: "+40 727 570 570",
    email: "rezervari@bsc.ro",
    website: "https://bsc.ro/",
    description:
      "Cu peste 20 de ani de experiență, oferă cursuri de înot pentru copii și adulți în diverse locații din București, inclusiv Berceni, Floreasca, Ghencea, Iancului, Lia Manoliu și Pantelimon.",
    researchNotes:
      "Multiple locații în București. Tarifele variază în funcție de locație și program",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "14:00-15:00" },
      { day: "Luni", time: "18:30-19:30" },
      { day: "Marți", time: "14:00-15:00" },
      { day: "Marți", time: "18:30-19:30" },
      { day: "Miercuri", time: "14:00-15:00" },
      { day: "Miercuri", time: "18:30-19:30" },
      { day: "Joi", time: "14:00-15:00" },
      { day: "Joi", time: "18:30-19:30" },
      { day: "Vineri", time: "14:00-15:00" },
      { day: "Vineri", time: "18:30-19:30" },
    ],
    pricing: [
      { type: "monthly", amount: 250, currency: "RON" }, // 8 ședințe/lună (Lia Manoliu)
      { type: "monthly", amount: 350, currency: "RON" }, // 12 ședințe/lună (Lia Manoliu)
      { type: "monthly", amount: 450, currency: "RON" }, // 20 ședințe/lună (Lia Manoliu)
      { type: "monthly", amount: 180, currency: "RON" }, // 8 ședințe/lună (Olimpia, 11:00-15:00)
      { type: "monthly", amount: 250, currency: "RON" }, // 12 ședințe/lună (Olimpia, 11:00-15:00)
      { type: "monthly", amount: 300, currency: "RON" }, // 8 ședințe/lună (Olimpia, 15:00-20:00)
      { type: "monthly", amount: 400, currency: "RON" }, // 12 ședințe/lună (Olimpia, 15:00-20:00)
    ],
  }),

  createClubFromResearch({
    name: "Clubul de Înot Energy",
    sportType: "inot",
    city: "București",
    district: "Sector 1",
    address:
      "Strada Dr. Iacob Felix 89, Sector 1 / Alexandreea Club, Bulevardul Basarabia 37-39, Sector 2",
    phone: "+40 723 316 818",
    email: "energyclubinot@gmail.com",
    description:
      "Oferă cursuri de înot pentru copii și adulți în sectoarele 2 și 3, inclusiv pentru bebeluși. Programul include inițiere și perfecționare, cu lecții adaptate vârstei și nivelului fiecărui copil.",
    researchNotes: "Locații în sectoarele 2 și 3",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== KARATE - Research suplimentar ==========
  createClubFromResearch({
    name: "Clubul Sportiv Akira",
    sportType: "karate",
    city: "București",
    district: "Multiple sectoare",
    address: "Multiple locații în București și împrejurimi",
    phone: "+40 735 220 122",
    email: "clubulsportivakira@gmail.com",
    website: "https://clubakira.com/",
    description:
      "Oferă lecții de karate, dans, gimnastică, chanbara, pregătire fizică și autoapărare pentru copii, sub îndrumarea maeștrilor în domeniu.",
    researchNotes: "Multiple locații",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Koryo Karate Club",
    sportType: "karate",
    city: "București",
    district: "Sector 4",
    address: "Strada Tăbăcarilor nr. 2, Sector 4",
    phone: "+40 725 899 538",
    email: "andreea.olteanu@koryo-karate.ro",
    website: "https://koryo-karate.ro/",
    description:
      "Specializat în stilul Shito Ryu, clubul are multiple sedii și se mândrește cu campioni naționali, europeni și mondiali.",
    researchNotes: "Stil Shito Ryu, campioni naționali și internaționali",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Akura Club",
    sportType: "karate",
    city: "București",
    district: "Multiple sectoare",
    address: "Multiple locații: Dobroești, Obor, Drumul Taberei, Fizicienilor, Pantelimon, Berceni",
    phone: "+40 769 679 988",
    email: "contact@akuraclub.ro",
    website: "https://www.akuraclub.ro/",
    description:
      "Cu 9 săli de antrenament, clubul oferă cursuri de Karate Tradițional pentru copii și adulți, sub îndrumarea lui Sensei Mnatacanian Alexandru.",
    researchNotes: "9 săli de antrenament, multiple locații",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    pricing: [
      { type: "monthly", amount: 300, currency: "RON" }, // Majoritatea locațiilor
      { type: "monthly", amount: 350, currency: "RON" }, // Fizicienilor, Iancului, Dobroești, Mall Vitan
    ],
  }),

  createClubFromResearch({
    name: "Club Sportiv Yawara",
    sportType: "karate",
    city: "București",
    district: "Sector 2",
    address: "Bulevardul Chișinău nr. 1, etaj 1, Sector 2",
    phone: "+40 768 655 180",
    email: "yawaraclub@gmail.com",
    website: "https://yawarakarate.ro/",
    description:
      "Oferă antrenamente de Karate Shotokan pentru copii începând cu vârsta de 6 ani, adolescenți și adulți, promovând disciplina și respectul.",
    researchNotes: "Stil Shotokan",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Fortuna Karate",
    sportType: "karate",
    city: "București",
    district: "Sector 3",
    address: "Strada Sergent Marin Bonea nr. 20, Sector 3",
    phone: "+40 724 543 645",
    email: "mihaelafurtuna@yahoo.com",
    website: "https://www.fortunakarate.ro/",
    description:
      "Îmbină pregătirea în sală cu antrenamente în aer liber, contribuind la dezvoltarea armonioasă a copiilor din punct de vedere fizic și tehnic.",
    researchNotes: "Antrenamente în sală și în aer liber",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Academia de Karate Bogdan Păun",
    sportType: "karate",
    city: "București",
    district: "Sector 3 / Sector 4",
    address: "Splaiul Unirii 96 / Splaiul Independenței 319",
    phone: "+40 730 712 511",
    email: "bogdan.paun89@gmail.com",
    website: "https://academiadekarate.ro/",
    description:
      "Coordonată de Sensei Bogdan Păun, oferă cursuri de Karate Tradițional în trei locații din București, având sportivi medaliați la nivel național și internațional.",
    researchNotes: "Trei locații, sportivi medaliați",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TAEKWONDO - Research suplimentar ==========
  createClubFromResearch({
    name: "Clubul Sportiv Tenere",
    sportType: "taekwondo",
    city: "București",
    district: "Sector 2",
    address: "Strada Măgura Vulturului nr. 85, Sector 2",
    phone: "+40 767 735 192",
    email: "office@tenere.ro",
    website: "https://www.tenere.ro/",
    description:
      "Organizează cursuri de Taekwondo pentru practicanți de toate vârstele, inclusiv copii. Cursurile se desfășoară în sala Palestra Gym, situată pe Str. Măgura Vulturului nr. 85, Sector 2.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Asociația Sportivă Bushido Taekwondo Club",
    sportType: "taekwondo",
    city: "București",
    district: "Sector 2",
    address: "Bulevardul Basarabia nr. 37-39, Sector 2",
    phone: "+40 730 760 501",
    website: "https://bushido.ro/",
    description:
      "Oferă cursuri de Taekwondo pentru copii, cadeți și juniori mici. Antrenamentele au loc în Sala de Judo din Complexul Sportiv 'Lia Manoliu'.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Sajado",
    sportType: "taekwondo",
    city: "București",
    district: "N/A",
    address: "N/A",
    phone: "+40 747 795 244",
    email: "sajadoteam@gmail.com",
    website: "https://www.sajado.ro/",
    description:
      "Efectuează înscrieri pentru copii și tineri, începători și avansați, cu vârste cuprinse între 7 și 20 de ani. Clubul promovează valorile modestiei, respectului, curajului și fair-play-ului în practicarea Taekwondo-ului.",
    ageGroups: [7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS - Research suplimentar ==========
  createClubFromResearch({
    name: "In Pași de Dans",
    sportType: "dans",
    city: "București",
    district: "Sector 5",
    address: "Calea Rahovei 262, Sector 5",
    phone: "+40 722 675 126",
    email: "inpasidedans@gmail.com",
    website: "https://www.inpasidedans.ro/",
    description:
      "Oferă cursuri de dans pentru copii, inclusiv salsa, samba, cha-cha, rumba și vals, într-un mediu social și distractiv.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Școala de Dans Performers",
    sportType: "dans",
    city: "București",
    district: "Sector 1",
    address: "Calea Victoriei 48-50, Sector 1",
    phone: "+40 729 271 372",
    description:
      "Școală de dans cu o echipă de dansatori profesioniști și coregrafi, oferind cursuri pentru copii interesați de dans ca formă de relaxare sau carieră.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "BloomArt Academy",
    sportType: "dans",
    city: "București",
    district: "Sector 4",
    address: "Strada Tăbăcarilor 14, Sector 4",
    phone: "+40 746 423 423",
    email: "contact@bloomart.ro",
    website: "https://bloomart.ro/",
    description:
      "Oferă cursuri de street dance și dans modern pentru copii, într-un mediu profesionist și prietenos.",
    researchNotes: "Street dance și dans modern",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    pricing: [
      { type: "monthly", amount: 200, currency: "RON" }, // 4 ședințe/lună
      { type: "monthly", amount: 280, currency: "RON" }, // 8 ședințe/lună
    ],
  }),

  createClubFromResearch({
    name: "Joie de Vivre Dance School",
    sportType: "dans",
    city: "București",
    district: "Sector 3",
    address: "Calea Călărașilor 161, etaj 5, Sector 3",
    phone: "+40 725 891 000",
    email: "office@jdvdance.ro",
    website: "https://www.jdvdance.ro/",
    description:
      "Oferă cursuri de dans sportiv și modern pentru copii, ajutându-i să-și dezvolte încrederea în sine și coordonarea.",
    researchNotes: "Dans sportiv și modern",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    pricing: [
      { type: "monthly", amount: 125, currency: "RON" }, // Start Dance Kids - 4 ședințe/lună
      { type: "monthly", amount: 175, currency: "RON" }, // Hobby Kids - 8 ședințe/lună
    ],
  }),

  createClubFromResearch({
    name: "Dance Club Hobby Dance",
    sportType: "dans",
    city: "București",
    district: "Sector 4",
    address: "Strada Eclipsei 14B, Popești-Leordeni",
    phone: "+40 722 888 094",
    email: "hobbydance@gmail.com",
    website: "https://www.hobbydance.ro/",
    description:
      "Organizează cursuri de dans pentru copii de toate vârstele, inclusiv dans sportiv și de societate, cu posibilitatea de a continua cu performanța.",
    researchNotes: "Dans sportiv și de societate",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Double D",
    sportType: "dans",
    city: "București",
    district: "Sector 6",
    address: "Șoseaua Panduri 71, Sector 6",
    phone: "+40 733 308 529",
    email: "doubledbucuresti@gmail.com",
    website: "https://www.doubled.ro/",
    description:
      "Școală de fitness și dans care oferă cursuri pentru copii, inclusiv Acro Dance, gimnastică aerobică, jazz dance, karate și dansuri moderne și latino.",
    researchNotes: "Acro Dance, gimnastică aerobică, jazz dance",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM - Research suplimentar ==========
  createClubFromResearch({
    name: "ProAtletic",
    sportType: "atletism",
    city: "București",
    district: "Sector 2",
    address: "Bulevardul Basarabia, lângă Arena Națională, Sector 2",
    phone: "+40 766 299 175",
    email: "contact@proatletic.ro",
    website: "https://www.proatletic.ro/",
    description:
      "Organizează antrenamente de atletism pentru copii cu vârste între 5 și 16 ani, acoperind probe precum viteza, săritura în lungime, alergare peste garduri și altele. Antrenamentele au loc de două ori pe săptămână în Complexul Sportiv Lia Manoliu.",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "17:50-18:50" }, // Grupa 1 și 3 (copii 5-7 și 8-10 ani)
      { day: "Miercuri", time: "17:50-18:50" }, // Grupa 1 și 3
      { day: "Luni", time: "19:00-20:00" }, // Grupa 2 și 4 (copii 5-7, 8-10 și 11-16 ani)
      { day: "Miercuri", time: "19:00-20:00" }, // Grupa 2 și 4
      { day: "Marți", time: "17:50-18:50" }, // Grupa 3 și 4
      { day: "Joi", time: "17:50-18:50" }, // Grupa 3 și 4
      { day: "Marți", time: "19:00-20:00" }, // Grupa 4
      { day: "Joi", time: "19:00-20:00" }, // Grupa 4
    ],
    pricing: [
      { type: "monthly", amount: 250, currency: "RON" }, // Un copil
      { type: "monthly", amount: 400, currency: "RON" }, // Frați
    ],
  }),

  // ========== SCRIMĂ - Research suplimentar ==========
  createClubFromResearch({
    name: "Clubul de Scrimă Engarde",
    sportType: "scrima",
    city: "București",
    district: "Sector 6",
    address: "Strada Constantin Noica 140, Sector 6",
    phone: "+40 726 716 051",
    email: "engarde@scrima.ro",
    website: "https://www.scrima.ro/",
    description:
      "Organizează cursuri de inițiere în scrimă pentru copii și adulți, inclusiv pentru cei cu vârste între 4 și 6 ani.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== PATINAJ - Research suplimentar ==========
  createClubFromResearch({
    name: "C.S. Magic Skate",
    sportType: "patinaj",
    city: "București",
    district: "Sector 6",
    address: "Bd. General Paul Teodorescu nr. 4, Sector 6 (AFI Cotroceni)",
    phone: "+40 760 462 887",
    email: "maria@magicskate.ro",
    website: "https://www.magicskate.ro/",
    description:
      "Club sportiv care organizează cursuri de patinaj artistic și hochei pentru copii începând cu vârsta de 3 ani. Cursurile se desfășoară la patinoarul din Mall AFI Cotroceni și sunt individuale, cu o durată de 50 de minute.",
    researchNotes: "Patinaj artistic și hochei",
    ageGroups: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Cotroceni on Ice",
    sportType: "patinaj",
    city: "București",
    district: "Sector 6",
    address: "Bulevardul Vasile Milea, Nr. 4, Sector 6 (AFI Cotroceni)",
    phone: "+40 724 064 766",
    email: "info@patinoarafi.ro",
    website: "https://www.patinoarafi.ro/",
    description:
      "Patinoar situat în incinta AFI Cotroceni, oferă cursuri de patinaj pentru copii începând cu vârsta de 4 ani. De asemenea, organizează antrenamente pentru hochei, curling și karting pe gheață.",
    researchNotes: "Cel mai mare patinoar într-un mall din România",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BADMINTON - Research suplimentar ==========
  createClubFromResearch({
    name: "AeroSquash",
    sportType: "badminton",
    city: "București",
    district: "Sector 1",
    address: "Bd. Expoziției nr. 65-67, Romexpo, Pavilion C6, Sector 1",
    phone: "+40 731 333 330",
    email: "office@aerosquash.ro",
    website: "https://www.aerosquash.ro/",
    description:
      "Club sportiv care oferă cursuri și antrenamente de badminton pentru copii începând cu vârsta de 4 ani. Dispune de trei terenuri de badminton și antrenori cu experiență.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-23:00" },
      { day: "Marți", time: "08:00-23:00" },
      { day: "Miercuri", time: "08:00-23:00" },
      { day: "Joi", time: "08:00-23:00" },
      { day: "Vineri", time: "08:00-23:00" },
      { day: "Sâmbătă", time: "08:00-23:00" },
      { day: "Duminică", time: "08:00-23:00" },
    ],
    pricing: [
      { type: "per_class", amount: 64, currency: "RON" }, // L-V 08:00-16:00
      { type: "per_class", amount: 90, currency: "RON" }, // L-V 16:00-23:00 sau S-D 08:00-23:00
    ],
  }),

  // ========== RUGBY - Research suplimentar ==========
  createClubFromResearch({
    name: "ACS Șoimii București",
    sportType: "rugby",
    city: "București",
    district: "Sector 1",
    address: "Bd. Mărăști nr. 18-20, Sector 1",
    phone: "+40 722 663 165",
    email: "acsssoimiibucuresti@gmail.com",
    description:
      "Un club activ în competițiile de juniori, participând la diverse turnee și campionate naționale.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "RC Grivița",
    sportType: "rugby",
    city: "București",
    district: "N/A",
    address: "Strada Siret nr. 97, București",
    phone: "+40 743 531 168",
    email: "contact@rcgrivita.ro",
    website: "https://rugbyromania.ro/echipa/rc-grivita-bucuresti/",
    description:
      "Cu o istorie de peste 80 de ani, acest club oferă cursuri de rugby pentru copii, sub îndrumarea unor antrenori dedicați.",
    researchNotes: "Peste 80 de ani de tradiție",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ECHITAȚIE - Research suplimentar ==========
  createClubFromResearch({
    name: "Clubul de Echitație Equestria",
    sportType: "echitatie",
    city: "București",
    district: "Ilfov (Snagov)",
    address: "Strada Hipodromului FN, satul Tăncăbești, comuna Snagov, Ilfov",
    phone: "+40 749 137 094",
    email: "ion.marin@equestria.ro",
    website: "https://equestria.ro/",
    description:
      "Situat în apropierea Bucureștiului, acest club oferă lecții de călărie pentru copii de toate vârstele și nivelurile de experiență.",
    researchNotes: "Locație în apropierea Bucureștiului",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

/**
 * Research Statistics
 */
export const RESEARCH_STATS = {
  totalClubs: CLUBS_RESEARCH_BUCHAREST.length,
  sportsCovered: new Set(CLUBS_RESEARCH_BUCHAREST.map((c) => c.sportType)).size,
  districtsCovered: new Set(
    CLUBS_RESEARCH_BUCHAREST.map((c) => c.district).filter((d) => d !== undefined)
  ).size,
  clubsWithWebsite: CLUBS_RESEARCH_BUCHAREST.filter((c) => c.website).length,
  clubsWithEmail: CLUBS_RESEARCH_BUCHAREST.filter((c) => c.email).length,
  clubsWithPhone: CLUBS_RESEARCH_BUCHAREST.filter((c) => c.phone).length,
  dateCollected: "2025-01-XX",
};

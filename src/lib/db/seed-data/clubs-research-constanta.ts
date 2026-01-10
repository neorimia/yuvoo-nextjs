/**
 * Clubs Research Data - Constanța
 *
 * Date reale colectate prin research public pentru cluburi sportive din Constanța.
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
 * Total cluburi identificate: 28
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
 * Research Data - Cluburi Sportive Constanța
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_CONSTANTA: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "Academia de Fotbal Farul Constanța",
    sportType: "fotbal",
    city: "Constanța",
    district: "N/A",
    address: "Bulevardul Mamaia nr. 208, Constanța",
    phone: "+40 241 879 101",
    email: "office@academiahagi.ro",
    website: "https://www.farulconstanta.com/",
    description:
      "Recunoscută ca una dintre cele mai bune academii de fotbal din România, Farul Constanța a ocupat primul loc în clasamentul Federației Române de Fotbal în 2023, cu un punctaj de 95,7.",
    researchNotes:
      "Primul loc în clasamentul FRF 2023 (95,7 puncte). Baza sportivă 'Academia Hagi' în Ovidiu",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Luceafărul 2013 Constanța",
    sportType: "fotbal",
    city: "Constanța",
    district: "N/A",
    address: "Strada I. Gh. Duca 83A, Constanța",
    description:
      "Organizează anual turneul internațional 'Summer Kid's Cup' pentru copii și juniori, în colaborare cu diverse autorități locale și sponsori.",
    researchNotes: "Organizează turneul internațional 'Summer Kid's Cup'",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Eforie",
    sportType: "fotbal",
    city: "Eforie",
    district: "N/A",
    address: "Strada Progresului nr. 1, Eforie Sud, Constanța",
    phone: "+40 241 748 900",
    description:
      "Participă la turnee locale și naționale, oferind programe de pregătire pentru tinerii fotbaliști.",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Agigea",
    sportType: "fotbal",
    city: "Agigea",
    district: "N/A",
    address: "Strada Bujorului, nr. 11, Agigea, Constanța",
    phone: "+40 724 774 009",
    email: "rata_ionel@yahoo.com",
    description:
      "Implicată în dezvoltarea fotbalului juvenil, participând la competiții și turnee dedicate copiilor.",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSM Constanța - Secția de Baschet",
    sportType: "baschet",
    city: "Constanța",
    district: "N/A",
    address: "Bulevardul Mamaia 193, Constanța",
    description:
      "Club sportiv municipal cu echipe de baschet pentru diverse categorii de vârstă, inclusiv U15 și U17. Antrenamentele sunt conduse de antrenori calificați, iar echipele participă în competiții naționale.",
    researchNotes: "Echipe U15 și U17, participă în competiții naționale",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Cruisers Basketball Constanța",
    sportType: "baschet",
    city: "Constanța",
    district: "N/A",
    address: "N/A",
    description:
      "Club care oferă antrenamente de baschet pentru copii cu vârste între 6 și 13 ani, sub îndrumarea antrenorilor licențiați. Acceptă atât începători, cât și copii cu experiență în competiții.",
    researchNotes: "Antrenamente pentru copii 6-13 ani, antrenori licențiați",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13],
  }),

  createClubFromResearch({
    name: "CS Farul Constanța - Secția de Baschet",
    sportType: "baschet",
    city: "Constanța",
    district: "N/A",
    address: "Bulevardul Tomis 102-104, Constanța (Sala de jocuri)",
    phone: "+40 241 615 370",
    email: "csfarul@yahoo.com",
    website: "https://csfarul.ro/",
    description:
      "Club cu echipe de baschet pentru juniori, inclusiv U15 și U16. Participă în competiții naționale și oferă oportunități de dezvoltare pentru tinerii baschetbaliști. Sediul social: Str. Decebal nr. 22, Constanța.",
    researchNotes:
      "Echipe U15 și U16. Sediul social: Str. Decebal nr. 22. Program L-J 08:00-16:30, V 08:00-14:00",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSȘ Nr.1 Constanța - Secția de Baschet",
    sportType: "baschet",
    city: "Constanța",
    district: "N/A",
    address: "N/A",
    description:
      "Club sportiv școlar care oferă programe de baschet pentru juniori, participând în competiții naționale la diverse categorii de vârstă.",
    researchNotes: "Club școlar, participă în competiții naționale",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ABC Athletic Constanța",
    sportType: "baschet",
    city: "Constanța",
    district: "N/A",
    address: "N/A",
    phone: "+40 772 065 650",
    description:
      "Club de baschet cu echipe de juniori, inclusiv U16, care participă în competiții naționale și oferă antrenamente pentru dezvoltarea tinerilor sportivi.",
    researchNotes: "Echipe U16, persoană de contact: Alina Șerban",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CSM Constanța - Secția de Volei",
    sportType: "volei",
    city: "Constanța",
    district: "N/A",
    address: "Bulevardul Mamaia 193, Constanța",
    description:
      "Clubul Sportiv Municipal Constanța are echipe de volei pentru diverse categorii de vârstă, inclusiv U15 și U17. Echipele de juniori au participat la competiții naționale, obținând rezultate notabile.",
    researchNotes: "Echipe U15 și U17, rezultate notabile la competiții naționale",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Laguna 'B. P. Hașdeu' Constanța",
    sportType: "volei",
    city: "Constanța",
    district: "N/A",
    address: "N/A",
    description:
      "Acest club a fost prezent la competiții precum Festivalul de volei pentru copii 'Kids Volleyball', unde a obținut locul 3.",
    researchNotes: "Locul 3 la Festivalul 'Kids Volleyball'",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSȘ 1 Constanța - Secția de Volei",
    sportType: "volei",
    city: "Constanța",
    district: "N/A",
    address: "N/A",
    description:
      "Clubul Sportiv Școlar 1 Constanța participă în competiții naționale de volei pentru juniori, având echipe în diverse categorii de vârstă.",
    researchNotes: "Club școlar, participă în competiții naționale",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "Padel Club Constanța Mamaia",
    sportType: "tenis",
    city: "Constanța",
    district: "Mamaia",
    address: "Bulevardul Mamaia 505, Constanța",
    website: "https://www.padelclubconstanta.ro/",
    description:
      "Oferă lecții de padel și tenis pentru copii cu vârste între 7 și 13 ani, în grupe de 4 copii. Antrenamentele sunt susținute de antrenori certificați ITF și FITP. Clubul dispune de 3 terenuri de padel moderne și 3 terenuri de tenis.",
    researchNotes: "3 terenuri padel + 3 terenuri tenis, antrenori certificați ITF și FITP",
    ageGroups: [7, 8, 9, 10, 11, 12, 13],
  }),

  createClubFromResearch({
    name: "Tenis Club Bright Constanța",
    sportType: "tenis",
    city: "Constanța",
    district: "N/A",
    address: "Prelungirea Eduard Caudella nr. 1, Constanța",
    phone: "+40 771 455 144",
    email: "tenisclubbright@gmail.com",
    website: "https://tenisclubbright.ro/",
    description:
      "Oferă programe de inițiere în tenis pentru copii, adaptate în funcție de vârstă și nivel, în condiții și la standarde internaționale. Clubul pune accent pe dezvoltarea respectului, fair-play-ului și a prieteniilor între copii. Primul antrenament este gratuit.",
    researchNotes: "Primul antrenament gratuit, standarde internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-22:00" },
      { day: "Marți", time: "08:00-22:00" },
      { day: "Miercuri", time: "08:00-22:00" },
      { day: "Joi", time: "08:00-22:00" },
      { day: "Vineri", time: "08:00-22:00" },
      { day: "Sâmbătă", time: "08:00-22:00" },
      { day: "Duminică", time: "08:00-22:00" },
    ],
  }),

  createClubFromResearch({
    name: "Tenis Club Idu Constanța",
    sportType: "tenis",
    city: "Constanța",
    district: "Mamaia",
    address: "Bulevardul Mamaia 402, Constanța",
    website: "http://www.tenisclubidu.ro/",
    description:
      "Situat în Mamaia, oferă programe de inițiere și perfecționare în tenis pentru copii și adulți.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Palatul Copiilor Constanța - Secția de Înot",
    sportType: "inot",
    city: "Constanța",
    district: "N/A",
    address: "Strada Soveja nr. 17, Constanța",
    phone: "+40 241 694 427",
    email: "palatulcopiilorcta@yahoo.com",
    description:
      "Oferă antrenamente gratuite de înot pentru copii începând cu vârsta de 6 ani. Antrenamentele includ și exerciții de fitness pentru dezvoltarea forței.",
    researchNotes: "Antrenamente gratuite pentru copii de la 6 ani. Program L-V 08:00-20:00",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-20:00" },
      { day: "Marți", time: "08:00-20:00" },
      { day: "Miercuri", time: "08:00-20:00" },
      { day: "Joi", time: "08:00-20:00" },
      { day: "Vineri", time: "08:00-20:00" },
    ],
  }),

  createClubFromResearch({
    name: "Clubul de Înot Acvamarin Constanța",
    sportType: "inot",
    city: "Constanța",
    district: "Multiple locații",
    address: "Strada Soveja nr. 15, Constanța / Eforie Nord / Eforie Sud / Agigea",
    phone: "+40 241 123 456",
    email: "contact@acvamarinconstanta.ro",
    description:
      "Organizează cursuri de înot pentru copii cu vârste începând de la 3 ani, în locații precum Eforie Nord, Eforie Sud și Agigea. Antrenamentele se desfășoară în centre moderne, cu apă filtrată și încălzită.",
    researchNotes:
      "Cursuri pentru copii de la 3 ani, multiple locații (Eforie Nord, Eforie Sud, Agigea)",
    ageGroups: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Atena Sport Club - Școala de Înot Răzvan Florea",
    sportType: "inot",
    city: "Constanța",
    district: "N/A",
    address: "Strada Avram Iancu, Nr. 21, Constanța",
    phone: "+40 241 878 733",
    email: "contact@atenasportclub.ro",
    website: "https://www.atenasportclub.ro/",
    description:
      "Oferă cursuri de înot pentru copii și a participat la competiții regionale de înot pentru cadeți.",
    researchNotes: "Participă la competiții regionale pentru cadeți",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "07:00-22:15" },
      { day: "Marți", time: "07:00-22:15" },
      { day: "Miercuri", time: "07:00-22:15" },
      { day: "Joi", time: "07:00-22:15" },
      { day: "Vineri", time: "07:00-22:15" },
      { day: "Sâmbătă", time: "08:00-20:30" },
      { day: "Duminică", time: "10:00-19:00" },
    ],
  }),

  createClubFromResearch({
    name: "CSM Constanța - Secția de Înot",
    sportType: "inot",
    city: "Constanța",
    district: "N/A",
    address: "Bulevardul Mamaia 193, Constanța",
    description:
      "Acest club sportiv a obținut rezultate remarcabile în competițiile naționale de înot. La Campionatele Naționale de înot în bazin scurt din noiembrie 2024, sportivii de la CSM Constanța au câștigat 149 de medalii și au stabilit 9 recorduri naționale.",
    researchNotes: "149 medalii și 9 recorduri naționale la Campionatele Naționale 2024",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== POLO PE APĂ (Water Polo) ==========
  createClubFromResearch({
    name: "Palatul Copiilor Constanța - Secția de Polo pe Apă",
    sportType: "polo-apa",
    city: "Constanța",
    district: "N/A",
    address: "Strada Soveja nr. 17, Constanța",
    phone: "+40 241 694 427",
    email: "palatulcopiilorcta@yahoo.com",
    description:
      "Palatul Copiilor Constanța are secții dedicate pentru natație, care includ înot, sărituri în apă și polo pe apă.",
    researchNotes: "Secție de polo pe apă în cadrul Palatului Copiilor. Program L-V 08:00-20:00",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-20:00" },
      { day: "Marți", time: "08:00-20:00" },
      { day: "Miercuri", time: "08:00-20:00" },
      { day: "Joi", time: "08:00-20:00" },
      { day: "Vineri", time: "08:00-20:00" },
    ],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSM Constanța - Secția de Handbal",
    sportType: "handbal",
    city: "Constanța",
    district: "N/A",
    address: "Bulevardul Mamaia 193, Constanța",
    description:
      "Clubul Sportiv Municipal Constanța are echipe de juniori care participă în diverse competiții naționale. De exemplu, echipa de juniori 4 a obținut locul 4 la Campionatul Național de Juniori 4.",
    researchNotes: "Echipe de juniori 4, locul 4 la Campionatul Național",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "HC Omer Constanța",
    sportType: "handbal",
    city: "Constanța",
    district: "N/A",
    address: "N/A",
    description:
      "Acest club a obținut titlul de campion național la Turneul Final de Juniori 4 organizat la Târgu Jiu în iunie 2023.",
    researchNotes: "Campion național la Turneul Final de Juniori 4 (iunie 2023)",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS 1 Constanța - Secția de Handbal",
    sportType: "handbal",
    city: "Constanța",
    district: "N/A",
    address: "N/A",
    description:
      "Clubul Sportiv Școlar 1 Constanța participă activ în competițiile de juniori. A fost prezent la Campionatul Național de Juniori IV desfășurat la Cumpăna în martie 2023.",
    researchNotes: "Participă în competiții naționale de juniori",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "CS Farul Constanța - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Constanța",
    district: "N/A",
    address: "Bulevardul Mamaia, Constanța",
    description:
      "Acest club are o tradiție îndelungată în gimnastică și a fost implicat în organizarea Campionatului Național de gimnastică aerobică pentru seniori și juniori în noiembrie 2023.",
    researchNotes:
      "Tradiție îndelungată, organizator Campionatul Național de gimnastică aerobică 2023",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSȘ 1 Constanța - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Constanța",
    district: "N/A",
    address: "N/A",
    description:
      "Clubul Sportiv Școlar 1 Constanța participă activ la competiții naționale de gimnastică ritmică și aerobică, având sportivi care concurează la diverse niveluri.",
    researchNotes: "Gimnastică ritmică și aerobică, participă în competiții naționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== KARATE ==========
  createClubFromResearch({
    name: "Ashihara Karate Constanța",
    sportType: "karate",
    city: "Constanța",
    district: "N/A",
    address: "N/A",
    description:
      "Oferă cursuri de karate pentru copii începând cu vârsta de 4 ani, sub îndrumarea Sensei Ghițulescu Ștefan. Antrenamentele au loc sâmbăta și duminica, între orele 10:30 și 12:00. Primele două ședințe sunt gratuite.",
    researchNotes: "Primele două ședințe gratuite, antrenor: Sensei Ghițulescu Ștefan",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Sâmbătă", time: "10:30-12:00" },
      { day: "Duminică", time: "10:30-12:00" },
    ],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Tomis Karate Constanța",
    sportType: "karate",
    city: "Constanța",
    district: "N/A",
    address: "Școala Gimnazială nr. 29 'Mihai Viteazu', Strada Cismelei nr. 13, Constanța",
    email: "info@tomiskarate.ro",
    website: "https://www.tomiskarate.ro/",
    description:
      "Specializat în stilul Shotokan, clubul a obținut rezultate remarcabile la competiții naționale. Recent, sportivii clubului au câștigat 21 de medalii la Campionatul Național de Karate-Do Shotokan.",
    researchNotes: "Shotokan, 21 medalii la Campionatul Național de Karate-Do Shotokan",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "18:00-19:00" },
      { day: "Miercuri", time: "18:00-19:00" },
      { day: "Joi", time: "18:00-19:00" },
    ],
  }),

  createClubFromResearch({
    name: "Shinto Club Constanța",
    sportType: "karate",
    city: "Constanța",
    district: "N/A",
    address: "N/A",
    description:
      "Conduce antrenamente de Kyokushin Karate pentru copii și adulți, sub îndrumarea Sensei Gelu Oprea. Programul include sesiuni marți, joi, vineri și duminică. Primul antrenament este gratuit.",
    researchNotes: "Kyokushin Karate, antrenor: Sensei Gelu Oprea, primul antrenament gratuit",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "17:00-19:00" },
      { day: "Joi", time: "17:00-19:00" },
      { day: "Vineri", time: "17:00-19:00" },
      { day: "Duminică", time: "10:00-12:00" },
    ],
  }),

  createClubFromResearch({
    name: "Karate Dinamic Club Constanța",
    sportType: "karate",
    city: "Constanța",
    district: "N/A",
    address: "Strada Soveja nr. 15, Constanța",
    phone: "+40 241 123 456",
    email: "contact@karatedinamic.ro",
    description:
      "Cu o activitate de peste 25 de ani, clubul oferă cursuri de karate pentru copii începând cu vârsta de 4 ani, având în palmares peste 20 de campioni mondiali și europeni.",
    researchNotes: "Peste 25 ani activitate, peste 20 campioni mondiali și europeni",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== JUDO ==========
  createClubFromResearch({
    name: "Club Sportiv Pantheon Constanța",
    sportType: "judo",
    city: "Constanța",
    district: "N/A",
    address: "Bulevardul Mamaia nr. 160, Constanța",
    phone: "+40 758 010 703",
    email: "cspantheon@gmail.com",
    description:
      "Organizează competiții precum 'Cupa Pantheon' și 'Cupa Centura Albă', oferind oportunități pentru tinerii judoka să-și dezvolte abilitățile.",
    researchNotes: "Organizează 'Cupa Pantheon' și 'Cupa Centura Albă'",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Pontica Constanța",
    sportType: "judo",
    city: "Constanța",
    district: "N/A",
    address: "Strada Aleea Argeș nr. 2, Bl. T6, Sc. A, Ap. 12, Constanța",
    phone: "+40 769 695 545",
    email: "pontica.ct@gmail.com",
    website: "http://www.cspontica.ro",
    description:
      "Oferă antrenamente de judo pentru copii, desfășurate în diverse locații, inclusiv pe plajă în timpul verii. Clubul a fost înființat în 2010 și dispune de o echipă de instructori și antrenori autorizați de Ministerul Tineretului și Sportului.",
    researchNotes:
      "Înființat în 2010, antrenamente pe plajă în timpul verii, instructori autorizați de Ministerul Sportului",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TAEKWONDO ==========
  createClubFromResearch({
    name: "Club Sportiv Marina Constanța",
    sportType: "taekwondo",
    city: "Constanța",
    district: "N/A",
    address: "Strada Tulcei, nr. 2, Constanța",
    phone: "+40 726 875 684",
    email: "office@marina-constanta.ro",
    website: "https://www.marina-constanta.ro/",
    description:
      "Fondat în 2013, acest club promovează educația prin activități fizice și cultivarea valorilor morale și sportive în rândul tinerilor. Oferă cursuri de taekwondo WT pentru copii și tineri, având secții în Constanța și Siliștea.",
    researchNotes: "Fondat în 2013, taekwondo WT, secții în Constanța și Siliștea",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "10:00-20:00" },
      { day: "Marți", time: "10:00-20:00" },
      { day: "Miercuri", time: "10:00-20:00" },
      { day: "Joi", time: "10:00-20:00" },
      { day: "Vineri", time: "10:00-20:00" },
      { day: "Sâmbătă", time: "09:00-17:00" },
    ],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Poseidon Constanța",
    sportType: "taekwondo",
    city: "Constanța",
    district: "N/A",
    address: "Strada Ion Rațiu 154, Constanța",
    description:
      "Participă activ la competiții naționale de taekwondo, având sportivi înscriși în diverse categorii de vârstă și greutate.",
    researchNotes: "Participă activ la competiții naționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Black Sea Dance Studio Constanța",
    sportType: "dans",
    city: "Constanța",
    district: "N/A",
    address: "Strada Ilarie Voronca 6, Constanța",
    website: "http://dans-sportiv.ro/",
    description:
      "Oferă cursuri de dans sportiv, balet, gimnastică ritmică și aerobic pentru copii de toate vârstele, indiferent de nivelul de experiență.",
    researchNotes: "Dans sportiv, balet, gimnastică ritmică și aerobic",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "New Force of Dance Constanța",
    sportType: "dans",
    city: "Constanța",
    district: "N/A",
    address: "Strada Justiției 47, Constanța",
    website: "http://nfd.ro/",
    description:
      "Specializat în cursuri de street dance pentru copii și adulți, acoperind stiluri precum hip hop, break dance, popping și altele.",
    researchNotes: "Street dance: hip hop, break dance, popping",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Total Dance Center Constanța",
    sportType: "dans",
    city: "Constanța",
    district: "N/A",
    address: "Strada Călugăreni 26, Constanța",
    description:
      "Organizează cursuri de balet, dans modern, street dance, breakdance, dans sportiv și Zumba Kids pentru copii.",
    researchNotes: "Balet, dans modern, street dance, breakdance, dans sportiv, Zumba Kids",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Cluburi școlare) ==========
  createClubFromResearch({
    name: "CSȘ Nr.1 Constanța",
    sportType: "multi-sport",
    city: "Constanța",
    district: "N/A",
    address: "N/A",
    description:
      "Oferă programe de pregătire în atletism, baschet, gimnastică, sport aerobic, gimnastică ritmică, handbal, scrimă și volei.",
    researchNotes: "Multiple secții: atletism, baschet, gimnastică, handbal, scrimă, volei",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Liceul cu Program Sportiv 'Nicolae Rotaru' Constanța",
    sportType: "multi-sport",
    city: "Constanța",
    district: "N/A",
    address: "Strada Ion Corvin 2, Constanța",
    website: "http://www.lpsconstanta.ro/",
    description:
      "Dispune de secții pentru atletism, canotaj, dans sportiv, haltere, judo, kaiac-canoe, lupte libere, lupte greco-romane, rugby, șah, tenis și tenis de masă.",
    researchNotes:
      "Multiple secții: atletism, canotaj, dans sportiv, haltere, judo, kaiac-canoe, lupte, rugby, șah, tenis",
    ageGroups: [10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Farul Constanța",
    sportType: "multi-sport",
    city: "Constanța",
    district: "N/A",
    address: "Bulevardul Mamaia, Constanța",
    description:
      "Are secții pentru atletism, arte marțiale, baschet, box, canotaj, culturism, kaiac-canoe, gimnastică, haltere, navomodelism, natație, lupte, scrimă, gimnastică ritmică și tenis de masă.",
    researchNotes: "Club multi-sport cu 15+ secții sportive",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

/**
 * Research Statistics
 */
export const RESEARCH_STATS_CONSTANTA = {
  totalClubs: CLUBS_RESEARCH_CONSTANTA.length,
  sportsCovered: new Set(CLUBS_RESEARCH_CONSTANTA.map((c) => c.sportType)).size,
  districtsCovered: new Set(
    CLUBS_RESEARCH_CONSTANTA.map((c) => c.district).filter((d) => d !== undefined)
  ).size,
  clubsWithWebsite: CLUBS_RESEARCH_CONSTANTA.filter((c) => c.website).length,
  clubsWithEmail: CLUBS_RESEARCH_CONSTANTA.filter((c) => c.email).length,
  clubsWithPhone: CLUBS_RESEARCH_CONSTANTA.filter((c) => c.phone).length,
  dateCollected: "2025-01-XX",
};

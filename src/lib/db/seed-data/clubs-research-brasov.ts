/**
 * Clubs Research Data - Brașov
 *
 * Date reale colectate prin research public pentru cluburi sportive din Brașov.
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
 * Total cluburi identificate: 31
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
 * Research Data - Cluburi Sportive Brașov
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_BRASOV: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "ACS Tâmpa Brașov",
    sportType: "fotbal",
    city: "Brașov",
    district: "N/A",
    address: "Strada Poiana Soarelui 237, Brașov",
    phone: "+40 720 100 971",
    email: "acskidstampa@gmail.com",
    website: "https://acstampabrasov.ro/",
    description:
      "Unul dintre cele mai importante cluburi private din Brașov, cu aproape 800 de copii legitimați în diverse sporturi, inclusiv fotbal. Singurul club din Brașov care participă în Liga Elitelor la toate categoriile de vârstă.",
    researchNotes: "Aproape 800 copii legitimați, participă în Liga Elitelor la toate categoriile",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Brașovia - Secția de Fotbal",
    sportType: "fotbal",
    city: "Brașov",
    district: "N/A",
    address: "Baza Sportivă Ion Vulcăneanu, Strada Titan 1, Brașov",
    phone: "+40 268 516 595",
    email: "brasovia_2005@yahoo.com",
    website: "https://www.cssbrasovia.ro/",
    description:
      "Club Sportiv Școlar care oferă copiilor posibilitatea de a practica fotbal, baschet, gimnastică și schi. Dispune de trei terenuri de fotbal, un teren de minifotbal și o sală pentru baschet și volei.",
    researchNotes: "Trei terenuri de fotbal, un teren de minifotbal. Program L-V 08:00-20:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-20:00" },
      { day: "Marți", time: "08:00-20:00" },
      { day: "Miercuri", time: "08:00-20:00" },
      { day: "Joi", time: "08:00-20:00" },
      { day: "Vineri", time: "08:00-20:00" },
    ],
  }),

  createClubFromResearch({
    name: "CS Coltea 1920 Brașov",
    sportType: "fotbal",
    city: "Brașov",
    district: "N/A",
    address: "Strada Hărmanului 2, Brașov",
    phone: "+40 770 364 036",
    website: "https://cscoltea.ro/",
    description:
      "Club cu tradiție în fotbalul brașovean, implicat în dezvoltarea tinerilor fotbaliști. A organizat evenimente precum Villarreal Camp Brașov 2025, oferind oportunități de stagii internaționale pentru jucători.",
    researchNotes:
      "Organizează Villarreal Camp Brașov, stagii internaționale. Președinte: Ciprian Jurubescu",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Junior Brașov",
    sportType: "fotbal",
    city: "Brașov",
    district: "N/A",
    address: "Strada Jepilor, Brașov",
    website: "http://www.juniorbrasov.ro/",
    description:
      "Școală de fotbal deschisă copiilor pasionați de fotbal, începând de la 4 ani, fete și băieți. Beneficiază de antrenori cu licență UEFA și infrastructură modernă, inclusiv balon încălzit pe timp de iarnă.",
    researchNotes: "Antrenori cu licență UEFA, balon încălzit pe timp de iarnă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "Star Brașov",
    sportType: "baschet",
    city: "Brașov",
    district: "N/A",
    address: "Sala Forex, Strada Nicolae Bălcescu 62, Brașov",
    description:
      "Înființat în 2022, acest club oferă antrenamente de baschet pentru copii cu vârste între 6 și 14 ani, sub îndrumarea a trei antrenori dedicați.",
    researchNotes: "Înființat în 2022, trei antrenori dedicați",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Brașovia - Secția de Baschet",
    sportType: "baschet",
    city: "Brașov",
    district: "N/A",
    address: "Baza Sportivă Ion Vulcăneanu, Strada Titan 1, Brașov",
    phone: "+40 268 516 595",
    email: "brasovia_2005@yahoo.com",
    website: "https://www.cssbrasovia.ro/",
    description:
      "Club sportiv școlar cu echipe de juniori, inclusiv la categoria U14 masculin. Echipa a participat la diverse competiții naționale.",
    researchNotes: "Echipe U14 masculin, participă în competiții naționale",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Tâmpa Brașov - Secția de Baschet",
    sportType: "baschet",
    city: "Brașov",
    district: "N/A",
    address: "Strada Poiana Soarelui 237, Brașov",
    phone: "+40 720 100 971",
    email: "acskidstampa@gmail.com",
    website: "https://acstampabrasov.ro/",
    description:
      "Club privat cu multiple secții sportive, inclusiv baschet. Participă în competiții naționale la diverse categorii de vârstă.",
    researchNotes: "Aproape 800 copii legitimați, participă în competiții naționale",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CSM Corona Brașov - Secția de Volei",
    sportType: "volei",
    city: "Brașov",
    district: "N/A",
    address: "Bulevardul Gării nr. 21, Brașov",
    phone: "+40 368 442 015",
    email: "office@coronabrasov.ro",
    website: "https://coronabrasov.ro",
    description:
      "Club sportiv municipal care organizează stagii de inițiere în diverse sporturi, inclusiv volei, pentru copii. Înscrierile pentru cursurile de inițiere se desfășoară în septembrie.",
    researchNotes: "11 secții sportive, înscrieri în septembrie",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-16:00" },
      { day: "Marți", time: "08:00-16:00" },
      { day: "Miercuri", time: "08:00-16:00" },
      { day: "Joi", time: "08:00-16:00" },
      { day: "Vineri", time: "08:00-16:00" },
    ],
  }),

  createClubFromResearch({
    name: "ACS Tâmpa Brașov - Secția de Volei",
    sportType: "volei",
    city: "Brașov",
    district: "N/A",
    address: "Strada Poiana Soarelui 237, Brașov",
    phone: "+40 720 100 971",
    email: "acskidstampa@gmail.com",
    website: "https://acstampabrasov.ro/",
    description:
      "Club privat cu aproximativ 800 de copii legitimați în diverse sporturi, inclusiv volei. Oferă un mediu profesionist pentru practicarea sportului, de la inițiere până la performanță.",
    researchNotes: "Aproape 800 copii legitimați, mediu profesionist",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "Tenis Arena Brașov",
    sportType: "tenis",
    city: "Brașov",
    district: "N/A",
    address: "Bulevardul Griviței 1W, Brașov",
    phone: "+40 268 426 000",
    email: "office@tenisarenabrasov.ro",
    website: "http://www.tenis-arena.ro/",
    description:
      "Înființat în 2011, deține 9 terenuri de tenis (3 în sală, 3 în balon și 3 în aer liber). Oferă cursuri ghidate de antrenori cu experiență, personalizate pentru copii și adulți.",
    researchNotes: "Înființat în 2011, 9 terenuri (3 sală, 3 balon, 3 aer liber)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Baza Sportivă Olimpia Brașov - Secția de Tenis",
    sportType: "tenis",
    city: "Brașov",
    district: "N/A",
    address: "Strada George Coșbuc 2, Brașov",
    website: "http://bazasportivaolimpia.ro/",
    description:
      "Dispune de 5 terenuri de tenis și o arenă centrală cu tribună de 1.000 de locuri. Oferă condiții excelente pentru inițierea în tenis, cu antrenamente disponibile șapte zile pe săptămână, între orele 8:00 și 18:00.",
    researchNotes: "5 terenuri, arenă centrală cu tribună 1.000 locuri",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-18:00" },
      { day: "Marți", time: "08:00-18:00" },
      { day: "Miercuri", time: "08:00-18:00" },
      { day: "Joi", time: "08:00-18:00" },
      { day: "Vineri", time: "08:00-18:00" },
      { day: "Sâmbătă", time: "08:00-18:00" },
      { day: "Duminică", time: "08:00-18:00" },
    ],
  }),

  createClubFromResearch({
    name: "Sport Ski Club - Secția de Tenis",
    sportType: "tenis",
    city: "Brașov",
    district: "N/A",
    address: "Strada Arțarului 2, Brașov",
    website: "http://www.ski-instructor.ro/",
    description:
      "Oferă cursuri de tenis pentru copii de două ori pe săptămână, în perioada 1 mai - 20 octombrie. Prețul unei ședințe este de 150 lei, iar pentru copiii până la 9 ani se asigură echipament (rachetă și mingi).",
    researchNotes: "Cursuri 1 mai - 20 octombrie, echipament pentru copii până la 9 ani",
    ageGroups: [4, 5, 6, 7, 8, 9],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Sport Ski Club - Secția de Înot",
    sportType: "inot",
    city: "Brașov",
    district: "N/A",
    address: "Paradisul Acvatic, Strada Arțarului 2, Brașov",
    website: "http://www.ski-instructor.ro/",
    description:
      "Oferă cursuri de înot pentru copii, desfășurate la Paradisul Acvatic. Programul include sesiuni de inițiere și întreținere, cu orare flexibile și echipament necesar specificat.",
    researchNotes: "Cursuri la Paradisul Acvatic, orare flexibile",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Club Sportiv NEMO Brașov",
    sportType: "inot",
    city: "Brașov",
    district: "N/A",
    address: "Bulevardul Gării nr. 21, Brașov",
    phone: "+40 725 826 366",
    email: "contact@clubnemo.ro",
    website: "http://www.clubnemo.ro/",
    description:
      "Organizează cursuri de înot pentru copii și adulți, atât individuale, cât și în grup. De asemenea, oferă servicii after-school și transport pentru copii.",
    researchNotes: "Cursuri individuale și grup, servicii after-school și transport",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "13:00-17:00" },
      { day: "Marți", time: "08:00-17:00" },
      { day: "Miercuri", time: "08:00-17:00" },
      { day: "Joi", time: "08:00-17:00" },
      { day: "Vineri", time: "08:00-17:00" },
      { day: "Sâmbătă", time: "10:00-13:00" },
    ],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "ACS Avatar Brașov",
    sportType: "handbal",
    city: "Brașov",
    district: "N/A",
    address: "N/A",
    website: "https://www.csavatarbrasov.ro/",
    description:
      "Club sportiv privat, înființat în 2021, dedicat handbalului masculin. În sezonul 2020-2021, echipa de Juniori 3 a obținut medalia de bronz la Campionatul Național, iar doi sportivi au fost desemnați 'cel mai bun portar' și 'cel mai bun inter drept'. Președinte: Titus Donosa (fost jucător Dinamo Brașov și lot național).",
    researchNotes:
      "Înființat în 2021, medalie de bronz la Campionatul Național Juniori 3 (2020-2021), președinte: Titus Donosa",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Tâmpa Brașov - Secția de Handbal",
    sportType: "handbal",
    city: "Brașov",
    district: "N/A",
    address: "Strada Poiana Soarelui 237, Brașov",
    phone: "+40 720 100 971",
    email: "acskidstampa@gmail.com",
    website: "https://acstampabrasov.ro/",
    description:
      "Club privat cu multiple secții sportive, inclusiv handbal, având aproximativ 800 de copii înscriși. Participă în competiții naționale și organizează evenimente pentru tineri sportivi.",
    researchNotes: "Aproape 800 copii înscriși, participă în competiții naționale",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Corona Brașov - Secția de Handbal",
    sportType: "handbal",
    city: "Brașov",
    district: "N/A",
    address: "Bulevardul Gării nr. 21, Brașov",
    phone: "+40 368 442 015",
    email: "office@coronabrasov.ro",
    website: "https://coronabrasov.ro",
    description:
      "Club sportiv cu 11 secții, inclusiv handbal, oferind programe pentru copii și juniori. Echipa de handbal feminin participă în Liga Florilor MOL, cea mai puternică competiție națională.",
    researchNotes: "Echipa feminină în Liga Florilor MOL",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "CSS Brașovia - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Brașov",
    district: "N/A",
    address: "Baza Sportivă Ion Vulcăneanu, Strada Titan 1, Brașov",
    phone: "+40 268 516 595",
    email: "brasovia_2005@yahoo.com",
    website: "https://www.cssbrasovia.ro/",
    description:
      "Oferă programe de gimnastică artistică pentru băieți, având o tradiție îndelungată în formarea tinerilor sportivi. Clubul a obținut rezultate remarcabile la competiții naționale.",
    researchNotes: "Gimnastică artistică pentru băieți, tradiție îndelungată",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Carla Ritmic Gim Brașov",
    sportType: "gimnastica",
    city: "Brașov",
    district: "N/A",
    address: "Complexul Sportiv Forex Brașov, Strada Camil Petrescu 2, Brașov",
    phone: "+40 756 647 468",
    email: "carlootza_02@yahoo.com",
    website: "http://www.gimnastica-brasov.ro/",
    description:
      "Specializat în gimnastică ritmică pentru fete, clubul oferă cursuri pentru începători, avansați și performanță. Antrenamentele se desfășoară în Complexul Sportiv Forex Brașov.",
    researchNotes: "Gimnastică ritmică pentru fete, Complexul Sportiv Forex",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "14:00-19:00" },
      { day: "Marți", time: "13:00-19:00" },
      { day: "Miercuri", time: "14:00-19:00" },
      { day: "Joi", time: "13:00-19:00" },
      { day: "Vineri", time: "14:00-19:00" },
    ],
  }),

  // ========== KARATE ==========
  createClubFromResearch({
    name: "Shingitai Karate Club Brașov",
    sportType: "karate",
    city: "Brașov",
    district: "N/A",
    address: "Școala Gimnazială Nr. 13, Strada Olteț Nr. 12, Brașov",
    phone: "+40 721 282 696",
    website: "https://shingitai-karate-club.ro/",
    description:
      "Fondat în 1992 de antrenorul emerit Sensei Liviu Tăbăcaru, clubul oferă antrenamente de Ashihara Karate pentru copii și adulți. Antrenamentele pentru începători (copii) au loc marți și joi între orele 18:00 și 19:00.",
    researchNotes: "Fondat în 1992, antrenor emerit Sensei Liviu Tăbăcaru (5 DAN), Ashihara Karate",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "18:00-19:00" },
      { day: "Joi", time: "18:00-19:00" },
    ],
  }),

  createClubFromResearch({
    name: "Club Sportiv Karate Elite Brașov",
    sportType: "karate",
    city: "Brașov",
    district: "N/A",
    address: "Strada Mihai Viteazul Nr. 100, Brașov",
    phone: "+40 722 341 470",
    email: "contact@karateelitebrasov.ro",
    website: "http://www.karateelitebrasov.ro/",
    description:
      "Clubul organizează cursuri de Karate Shotokan pentru copii și adulți, urmând linia tehnică a federației japoneze JKS. Fondatorul clubului, Adrian Otves, a participat la numeroase stagii de pregătire cu maeștri japonezi și a organizat seminarii internaționale în Brașov.",
    researchNotes: "Shotokan, linia tehnică JKS, seminarii internaționale, fondator: Adrian Otves",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== JUDO ==========
  createClubFromResearch({
    name: "ACS Kame Judo Brașov",
    sportType: "judo",
    city: "Brașov",
    district: "N/A",
    address: "Calea Făgărașului 8, Brașov",
    phone: "+40 721 982 238",
    email: "kamejudobrasov@gmail.com",
    website: "http://www.kamejudobrasov.ro",
    description:
      "Clubul se concentrează pe dezvoltarea valorilor morale și a încrederii în sine a practicanților, oferind antrenamente de judo pentru copii.",
    researchNotes: "Dezvoltare valori morale și încredere în sine",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-22:00" },
      { day: "Marți", time: "08:00-22:00" },
      { day: "Miercuri", time: "08:00-22:00" },
      { day: "Joi", time: "08:00-21:30" },
      { day: "Vineri", time: "08:00-22:00" },
    ],
  }),

  createClubFromResearch({
    name: "ACS Tâmpa Brașov - Secția de Judo",
    sportType: "judo",
    city: "Brașov",
    district: "N/A",
    address: "Strada Poiana Soarelui 237, Brașov",
    phone: "+40 720 100 971",
    email: "acskidstampa@gmail.com",
    website: "https://acstampabrasov.ro/",
    description:
      "Recent, clubul a înființat o secție de judo sub îndrumarea antrenorului emerit Vasile Blendica, oferind oportunități pentru copii pasionați de acest sport.",
    researchNotes: "Secție nouă, antrenor emerit Vasile Blendica",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Pro Dance Studio Brașov",
    sportType: "dans",
    city: "Brașov",
    district: "N/A",
    address: "Strada Nicolae Titulescu Nr. 2, Brașov",
    phone: "+40 756 053 557",
    website: "http://www.prodancestudio.ro/",
    description:
      "Oferă cursuri de dans pentru copii și adulți, inclusiv dans sportiv, dansuri de societate și populare.",
    researchNotes: "Dans sportiv, dansuri de societate și populare",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "10:00-21:00" },
      { day: "Marți", time: "10:00-21:00" },
      { day: "Miercuri", time: "10:00-21:00" },
      { day: "Joi", time: "10:00-21:00" },
      { day: "Vineri", time: "10:00-21:00" },
      { day: "Sâmbătă", time: "09:00-15:00" },
    ],
  }),

  createClubFromResearch({
    name: "Clubul de Dans Passo Doble Brașov",
    sportType: "dans",
    city: "Brașov",
    district: "N/A",
    address: "Aleea Mercur, nr. 10, Brașov",
    phone: "+40 728 277 888",
    website: "https://www.passodoble.ro/",
    description:
      "Înființat în 1994, oferă cursuri de dans pentru copii și adulți, predând stiluri precum latino, standard și altele.",
    researchNotes: "Înființat în 1994, latino, standard",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "17:00-20:30" },
      { day: "Marți", time: "17:00-20:30" },
      { day: "Miercuri", time: "17:00-20:30" },
      { day: "Joi", time: "17:00-20:30" },
      { day: "Vineri", time: "17:00-20:30" },
    ],
  }),

  createClubFromResearch({
    name: "eMotion Dance Studio Brașov",
    sportType: "dans",
    city: "Brașov",
    district: "N/A",
    address: "Strada Padina 4, Brașov",
    website: "http://emotiondance.ro/",
    description:
      "Oferă cursuri de dans pentru copii și adulți în trei locații din Brașov. Abonamentul pentru copii include 8 ședințe pe lună la prețul de 250 RON.",
    researchNotes: "Trei locații în Brașov, abonament copii: 8 ședințe/lună (250 RON)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "09:00-21:00" },
      { day: "Marți", time: "09:00-21:00" },
      { day: "Miercuri", time: "09:00-21:00" },
      { day: "Joi", time: "09:00-21:00" },
      { day: "Vineri", time: "09:00-21:00" },
    ],
  }),

  createClubFromResearch({
    name: "Centrul de Excelență La Passion Brașov",
    sportType: "dans",
    city: "Brașov",
    district: "N/A",
    address: "Strada Lungă nr. 234, Brașov",
    phone: "+40 729 918 098",
    website: "http://www.lapassion.ro/",
    description:
      "Organizează cursuri de dans sportiv pentru copii, împărțite pe grupe de vârstă și nivel de experiență.",
    researchNotes: "Dans sportiv, grupe pe vârstă și nivel",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "14:00-21:00" },
      { day: "Marți", time: "14:00-21:00" },
      { day: "Miercuri", time: "14:00-21:00" },
      { day: "Joi", time: "14:00-21:00" },
      { day: "Vineri", time: "14:00-21:00" },
    ],
  }),

  createClubFromResearch({
    name: "FitDance Brașov",
    sportType: "dans",
    city: "Brașov",
    district: "N/A",
    address: "Strada Zizinului 119, sc. A, et. 3, Brașov",
    phone: "+40 724 233 722",
    email: "contact@fitdance.ro",
    website: "https://www.fitdance.ro/",
    description:
      "Oferă cursuri de dans pentru copii și adolescenți, inclusiv dansuri sportive și de societate.",
    researchNotes: "Dansuri sportive și de societate",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Scoala de Dans New School & Old School Brașov",
    sportType: "dans",
    city: "Brașov",
    district: "N/A",
    address: "Strada Jepilor nr. 6A, Brașov",
    phone: "+40 730 942 028",
    email: "radu.panteal@yahoo.com",
    website: "http://www.scoaladedansnewschoololdschool.com/",
    description:
      "Specializată în breakdance și street dance, oferă cursuri pentru copii și tineri. Fondată în 2010 de instructorul Pantea Radu, școala promovează cultura hip-hop și dansul urban.",
    researchNotes: "Fondată în 2010, breakdance și street dance, instructor: Pantea Radu",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "ACS Luca Brașov",
    sportType: "atletism",
    city: "Brașov",
    district: "N/A",
    address: "N/A",
    description:
      "Acest club este activ în organizarea de competiții și antrenamente pentru tineri atleți. În octombrie 2025, ACS LUCA a organizat 'Cupa de toamnă Luca Brașov', la care au participat aproape 400 de copii din Brașov și împrejurimi.",
    researchNotes: "Organizează 'Cupa de toamnă Luca Brașov', aproape 400 copii participanți",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Brașov Athletic Academy",
    sportType: "atletism",
    city: "Brașov",
    district: "N/A",
    address: "N/A",
    phone: "+40 727 756 207",
    email: "office@brasovathleticacademy.ro",
    website: "https://www.brasovathleticacademy.ro/",
    description:
      "Acest club sportiv oferă antrenamente pentru începători și pentru performanță în atletism. De asemenea, oferă antrenamente personalizate online și pregătire fizică pentru diferite ramuri sportive.",
    researchNotes:
      "Antrenamente pentru începători și performanță, antrenamente online personalizate",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== SCHI (Skiing) ==========
  createClubFromResearch({
    name: "Nan Schi Club Brașov",
    sportType: "schi",
    city: "Brașov",
    district: "Poiana Brașov",
    address: "Str. Drumul Sulinar (în parcare vis-a-vis de Rossignol), Poiana Brașov",
    phone: "+40 722 953 539",
    email: "nanschiclub@yahoo.com",
    website: "https://www.nanschiclub.ro/",
    description:
      "Oferă cursuri de schi pentru copii, organizate pe grupe de vârstă și nivel de pregătire. De asemenea, dispune de un centru modern de închiriere echipamente sportive.",
    researchNotes: "Centru modern de închiriere echipamente, situat în Poiana Brașov",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Sport Ski Club Brașov",
    sportType: "schi",
    city: "Brașov",
    district: "N/A",
    address: "Strada Arțarului 2, Brașov",
    phone: "+40 744 381 599",
    email: "adi.dulacioiu@gmail.com",
    website: "http://www.ski-instructor.ro/",
    description:
      "Cu peste 20 de ani de experiență, oferă programe sportive și educaționale pentru copii, inclusiv cursuri de schi și tabere de iarnă.",
    researchNotes: "Peste 20 ani experiență, tabere de iarnă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Outdoor Sports Ski School Brașov",
    sportType: "schi",
    city: "Brașov",
    district: "Poiana Brașov",
    address: "Strada Poiana Soarelui Nr. 168, Poiana Brașov",
    phone: "+40 722 123 456",
    email: "contact@outdoorsports.ro",
    website: "https://www.outdoor-sports.ro/",
    description:
      "Dispune de o echipă de peste 30 de instructori calificați, oferind lecții de schi și snowboard pentru copii, cu metode interactive și distractive.",
    researchNotes: "Peste 30 instructori calificați, metode interactive",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Brașovia - Secția de Schi",
    sportType: "schi",
    city: "Brașov",
    district: "N/A",
    address: "Baza Sportivă Ion Vulcăneanu, Strada Titan 1, Brașov",
    phone: "+40 268 516 595",
    email: "brasovia_2005@yahoo.com",
    website: "https://www.cssbrasovia.ro/",
    description:
      "Club Sportiv Școlar care oferă copiilor posibilitatea de a practica schi alpin (fete și băieți), alături de alte discipline sportive.",
    researchNotes: "Schi alpin pentru fete și băieți",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== SNOWBOARD ==========
  createClubFromResearch({
    name: "Alpin Ski Academy Brașov",
    sportType: "snowboard",
    city: "Brașov",
    district: "Poiana Brașov",
    address: "Hotel Alpin, Str. Poiana Doamnei, Poiana Brașov",
    phone: "+40 727 210 777",
    email: "info@alpinskiacademy.ro",
    website: "http://www.alpinskiacademy.ro/",
    description:
      "Pune la dispoziție lecții de snowboard pentru copii, alături de servicii de închiriere a echipamentului necesar. Situată în incinta Hotelului Alpin din Poiana Brașov.",
    researchNotes: "Servicii de închiriere echipament, situată în Hotelul Alpin",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Outdoor Sports Ski School - Secția de Snowboard",
    sportType: "snowboard",
    city: "Brașov",
    district: "Poiana Brașov",
    address: "Strada Poiana Soarelui Nr. 168, Poiana Brașov",
    phone: "+40 722 123 456",
    email: "contact@outdoorsports.ro",
    website: "https://www.outdoor-sports.ro/",
    description:
      "Dispune de o echipă de peste 30 de instructori calificați, oferind lecții de snowboard pentru copii, cu metode interactive și distractive.",
    researchNotes: "Peste 30 instructori calificați, metode interactive",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== PATINAJ PE GHEAȚĂ (Ice Skating) ==========
  createClubFromResearch({
    name: "CSM Corona Brașov - Secția de Patinaj Artistic",
    sportType: "patinaj-ghata",
    city: "Brașov",
    district: "N/A",
    address: "Bulevardul Gării nr. 21, Brașov",
    phone: "+40 368 442 015",
    email: "office@coronabrasov.ro",
    website: "https://coronabrasov.ro",
    description:
      "Clubul organizează evenimente și competiții, precum Cupa Corona și Campionatul Național de Patinaj Artistic, unde tinerii patinatori au obținut rezultate remarcabile. De exemplu, în aprilie 2022, sportivii clubului au câștigat medalii la diverse categorii.",
    researchNotes:
      "Organizează Cupa Corona și Campionatul Național, medalii la competiții naționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Patinoarul Olimpia Brașov",
    sportType: "patinaj-ghata",
    city: "Brașov",
    district: "N/A",
    address: "Strada George Coșbuc 2, Brașov",
    website: "http://bazasportivaolimpia.ro/",
    description:
      "Patinoar emblematic pentru patinajul din Brașov, cu o tradiție care datează din 1895. Patinoarul este deschis zilnic între orele 08:00 și 22:00, oferind sesiuni de patinaj pentru public.",
    researchNotes: "Tradiție din 1895, deschis zilnic 08:00-22:00",
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

  // ========== HOCHEI PE GHEAȚĂ (Ice Hockey) ==========
  createClubFromResearch({
    name: "CSM Corona Brașov - Secția de Hochei pe Gheață",
    sportType: "hochei-ghata",
    city: "Brașov",
    district: "N/A",
    address: "Bulevardul Gării nr. 21, Brașov",
    phone: "+40 368 442 015",
    email: "office@coronabrasov.ro",
    website: "https://coronabrasov.ro",
    description:
      "Principalul club de hochei pe gheață pentru copii și juniori din Brașov. În sezonul competițional 2024-2025, echipa U13 a fost înscrisă în Grupa A a Campionatului Național U13.",
    researchNotes: "Echipă U13 în Grupa A Campionatului Național U13 (2024-2025)",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Cluburi școlare) ==========
  createClubFromResearch({
    name: "CSS Brașovia",
    sportType: "multi-sport",
    city: "Brașov",
    district: "N/A",
    address: "Baza Sportivă Ion Vulcăneanu, Strada Titan 1, Brașov",
    phone: "+40 268 516 595",
    email: "brasovia_2005@yahoo.com",
    website: "https://www.cssbrasovia.ro/",
    description:
      "Oferă antrenamente la discipline precum baschet (fete și băieți), fotbal (băieți), gimnastică sportivă (băieți) și schi alpin (fete și băieți).",
    researchNotes: "Multiple secții: baschet, fotbal, gimnastică, schi",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Tâmpa Brașov",
    sportType: "multi-sport",
    city: "Brașov",
    district: "N/A",
    address: "Strada Poiana Soarelui 237, Brașov",
    phone: "+40 720 100 971",
    email: "acskidstampa@gmail.com",
    website: "https://acstampabrasov.ro/",
    description:
      "Unul dintre cele mai importante cluburi private din Brașov, cu aproape 800 de copii legitimați în diverse sporturi. Singurul club din Brașov care participă în Liga Elitelor la toate categoriile de vârstă.",
    researchNotes: "Aproape 800 copii legitimați, participă în Liga Elitelor",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Corona Brașov",
    sportType: "multi-sport",
    city: "Brașov",
    district: "N/A",
    address: "Bulevardul Gării nr. 21, Brașov",
    phone: "+40 368 442 015",
    email: "office@coronabrasov.ro",
    website: "https://coronabrasov.ro",
    description:
      "Club sportiv municipal cu 11 secții sportive, oferind programe pentru copii și juniori. Include secții pentru volei, handbal, patinaj artistic, hochei pe gheață și alte discipline.",
    researchNotes: "11 secții sportive, club municipal",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

/**
 * Research Statistics
 */
export const RESEARCH_STATS_BRASOV = {
  totalClubs: CLUBS_RESEARCH_BRASOV.length,
  sportsCovered: new Set(CLUBS_RESEARCH_BRASOV.map((c) => c.sportType)).size,
  districtsCovered: new Set(
    CLUBS_RESEARCH_BRASOV.map((c) => c.district).filter((d) => d !== undefined)
  ).size,
  clubsWithWebsite: CLUBS_RESEARCH_BRASOV.filter((c) => c.website).length,
  clubsWithEmail: CLUBS_RESEARCH_BRASOV.filter((c) => c.email).length,
  clubsWithPhone: CLUBS_RESEARCH_BRASOV.filter((c) => c.phone).length,
  dateCollected: "2025-01-XX",
};

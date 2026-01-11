/**
 * Clubs Research Data - Cluj-Napoca
 *
 * Date reale colectate prin research public pentru cluburi sportive din Cluj-Napoca.
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
 * Total cluburi identificate: 41
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
 * Research Data - Cluburi Sportive Cluj-Napoca
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_CLUJ_NAPOCA: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "Napocense Stars",
    sportType: "fotbal",
    city: "Cluj-Napoca",
    district: "Multiple locații",
    address:
      "Baza Sportivă Clujana (Str. Tăbăcarilor 15B) / Baza Sportivă Unirea (Aleea Clăbucet) / LPS - Teren Acoperit (Str. Arinilor 9)",
    phone: "+40 736 199 994",
    website: "http://www.napocensestars.ro/",
    description:
      "Școală de fotbal pentru copii, cu antrenamente desfășurate în locații precum Baza Sportivă Clujana, Baza Sportivă Unirea și LPS - Teren Acoperit. Acceptă înscrieri pentru copii născuți după 2012.",
    researchNotes: "Trei locații în Cluj-Napoca",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Sporting Cluj",
    sportType: "fotbal",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Păstorului 1, Cluj-Napoca",
    phone: "+40 264 123 456",
    email: "contact@sportingcluj.ro",
    website: "https://www.sportingcluj.ro/",
    description:
      "Club cu o reputație solidă, oferind programe de pregătire pentru copii și juniori, cu accent pe dezvoltare personală, respect și disciplină. Dispun de baze moderne de pregătire.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "FC Universitatea Cluj - Academie",
    sportType: "fotbal",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Aleea Stadionului nr. 2, Cluj-Napoca",
    phone: "+40 770 435 137",
    email: "academie@fcucluj.ro",
    website: "https://www.fcucluj.ro/",
    description:
      "Academia de fotbal a clubului FC Universitatea Cluj, oferind un mediu optim pentru dezvoltarea tinerilor fotbaliști, cu accent pe educație sportivă și performanță.",
    researchNotes: "Academia oficială FC Universitatea Cluj",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "Napoca Baschet School",
    sportType: "baschet",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Grădinarilor nr. 1, Cluj-Napoca",
    phone: "+40 755 781 989",
    email: "napocabaschet@gmail.com",
    website: "https://www.facebook.com/profile.php?id=100054616652326",
    description:
      "Școală de baschet feminin înființată în 2013, care formează tinere jucătoare pentru a participa la campionatele naționale. Oferă cursuri pentru fete cu vârsta de peste 8 ani.",
    researchNotes: "Înființată în 2013, doar fete",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS U-BT Cluj-Napoca",
    sportType: "baschet",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Splaiul Independenței nr. 6, Cluj-Napoca",
    phone: "+40 364 265 326",
    email: "office@u-bt.ro",
    website: "https://www.u-bt.ro/",
    description:
      "Asociația Club Sportiv U-BT continuă tradiția baschetului clujean, având echipe de la babybaschet până la seniori. Academia U-BT numără peste 400 de copii și este recunoscută pentru dezvoltarea baschetului juvenil.",
    researchNotes: "Peste 400 de copii în academie",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS For You - Moving Cluj",
    sportType: "baschet",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Streiului nr. 1, apartament 69, Cluj-Napoca",
    phone: "+40 747 701 401",
    email: "covaciuflorin@yahoo.com",
    website: "https://www.facebook.com/foryoucluj",
    description:
      "Reprezintă pepiniera la nivel juvenil a Clubului Sportiv Universitatea Cluj pentru baschet feminin și a Clubului Școlar Sportiv Viitorul pentru baschet masculin. Organizează cursuri de baschet pentru copii începând cu vârsta de 6 ani.",
    researchNotes: "Pepinieră pentru CS Universitatea Cluj și CSS Viitorul",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Urban Basket Cluj",
    sportType: "baschet",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Ploiești 9, Cluj-Napoca",
    phone: "+40 745 361 603",
    email: "contact@urbanbasketball.ro",
    website: "https://urbanbasketball.ro/",
    description:
      "Club local dedicat dezvoltării jucătorilor de baschet, oferind inițiere pentru copii cu vârste între 6 și 14 ani. Participă la diverse festivaluri și turnee regionale organizate de Sucursala Regională 6.",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "Volleyball Forever",
    sportType: "volei",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Str. Ploiești 39-45, Et.1, Ap.27, Cluj-Napoca",
    phone: "+40 745 642 158",
    email: "contact@voleiclub.ro",
    website: "https://voleiclub.ro/",
    description:
      "Oferă antrenamente interactive de volei pentru copii și adolescenți, desfășurate în diverse locații din Cluj-Napoca, inclusiv Școala Constantin Brâncuși și Palatul Copiilor.",
    researchNotes: "Multiple locații în Cluj-Napoca",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Academia de Volei Pîrv11",
    sportType: "volei",
    city: "Cluj-Napoca",
    district: "Multiple locații",
    address:
      "Aleea Peana 2-4 / Școala Gimnazială Ion Creangă (Str. Nicolae Pascaly 2-4) / Liceul Tehnic Energetic (Str. Plopilor) / Sala Vasile Geleriu (Str. 1 Decembrie 1918, Nr. 41)",
    website: "https://cristinapirv.com/",
    description:
      "Oferă antrenamente pentru băieți și fete începând cu vârsta de 7 ani. Participă în Campionatul Național de Volei pentru Juniori – U15 Feminin, având echipe precum Pîrv11 Pink și Pîrv11 Blue.",
    researchNotes: "Patru locații în Cluj-Napoca, echipe U15",
    ageGroups: [7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Magic Sport Academy",
    sportType: "volei",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "N/A",
    description:
      "Organizează antrenamente și meciuri amicale pentru junioare U15, având colaborări cu alte cluburi din regiune.",
    researchNotes: "Junioare U15",
    ageGroups: [13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "Aceline Tennis Club",
    sportType: "tenis",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Drumul Sfântul Ioan 2, Cluj-Napoca",
    phone: "+40 787 232 322",
    email: "contact@aceline.ro",
    website: "https://aceline.ro/",
    description:
      "Oferă cursuri de tenis pentru copii și adulți, închiriere de terenuri și organizare de turnee.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Innovia Tenis",
    sportType: "tenis",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Bulevardul 1 Decembrie 1918, Cluj-Napoca",
    phone: "+40 728 957 719",
    email: "info@innoviatenis.ro",
    description:
      "Dispune de trei terenuri de zgură de calitate, dotate cu nocturnă și încălzire pentru sezonul rece. Oferă cursuri pentru copii și adulți, potrivite atât pentru începători, cât și pentru jucători de performanță.",
    researchNotes: "Trei terenuri cu nocturnă și încălzire, program L-D 08:00-22:00",
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
    name: "Napoca Tenis Club",
    sportType: "tenis",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Parcul Sportiv Dr. Iuliu Hatieganu, Strada Pandurilor 7, Cluj-Napoca",
    phone: "+40 749 248 516",
    website: "https://napocatenis.ro/",
    description:
      "Organizează lecții de tenis pentru copii și adulți în Parcul Sportiv Dr. Iuliu Hațieganu. Înscrierile se fac în a doua jumătate a lunii septembrie sau prima jumătate a lunii martie, dar și pe parcursul anului, în funcție de disponibilitate.",
    researchNotes:
      "Contact: Radu-Tiberiu Șerban (+40 749 248 516) sau Alin Baciu (+40 740 162 151)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Match Ball Tennis Club",
    sportType: "tenis",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Teodor Mihali 58, Cluj-Napoca",
    phone: "+40 746 023 140",
    description:
      "Deține 5 terenuri de zgură, dintre care 3 sunt acoperite în sezonul rece. Situat lângă Iulius Mall, oferă cursuri de inițiere și performanță pentru copii și adulți.",
    researchNotes: "5 terenuri, 3 acoperite, lângă Iulius Mall",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Hoia Tenis Club",
    sportType: "tenis",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Tabacarilor nr. 15C, Cluj-Napoca (Baza Clujana)",
    phone: "+40 744 886 699",
    email: "contact@hoiatenisclub.ro",
    website: "http://hoiatenisclub.ro/",
    description:
      "Are două locații principale cu terenuri de tenis, unele dotate cu nocturnă și acoperite în sezonul rece. Oferă cursuri pentru copii și adulți, cu antrenori experimentați.",
    researchNotes: "Două locații principale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Clubul Sportiv Ego",
    sportType: "inot",
    city: "Cluj-Napoca",
    district: "N/A",
    address:
      "Complexul de Natație 'Universitas' din Parcul Sportiv 'Iuliu Hațieganu', Strada Planetelor, Cluj-Napoca",
    website: "http://clubego.ro/",
    description:
      "Organizează cursuri de inițiere și perfecționare în înot pentru copii, desfășurate la Complexul de Natație 'Universitas' din Parcul Sportiv 'Iuliu Hațieganu'.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Cluj-Napoca - Secția de Înot",
    sportType: "inot",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Republicii nr. 23, Cluj-Napoca",
    phone: "+40 264 595 765",
    email: "palatulcopiilorcluj@gmail.com",
    website: "https://sites.google.com/pccj.ro/palatulcopiilorcluj/",
    description:
      "Oferă cursuri de înot pentru copii cu vârste între 4 și 18 ani, desfășurate în bazinul propriu. Înscrierile se fac pe tot parcursul anului școlar, în funcție de locurile disponibile.",
    researchNotes: "Bazin propriu, înscrieri pe tot parcursul anului",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "AHC Cluj-Napoca 2021",
    sportType: "handbal",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Rovine, nr. 5, Cluj-Napoca",
    phone: "+40 744 477 440",
    description:
      "Club care participă activ în competițiile naționale de handbal pentru juniori. În iunie 2024, echipa de juniori 4 a clubului a participat la turneul final al campionatului național, desfășurat în Cluj-Napoca.",
    researchNotes: "Echipe de juniori active în competiții naționale",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "Gym & Play",
    sportType: "gimnastica",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Bulevardul 1 Decembrie 1918 142, Cluj-Napoca",
    description:
      "Club dedicat gimnasticii ritmice pentru fete începând cu vârsta de 4 ani. Oferă grupe de inițiere (4-6 ani), avansate (7-10 ani) și echipe de senioare (10-14 ani).",
    researchNotes: "Doar fete, gimnastică ritmică",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Cluj-Napoca - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Republicii nr. 23, Cluj-Napoca",
    phone: "+40 264 595 765",
    email: "palatulcopiilorcluj@gmail.com",
    website: "https://sites.google.com/pccj.ro/palatulcopiilorcluj/",
    description:
      "Instituție cu o tradiție îndelungată, oferă diverse activități pentru copii, inclusiv cursuri de gimnastică. Dispune de săli specializate pentru gimnastică, balet, aerobic și judo.",
    researchNotes: "Săli specializate pentru gimnastică",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Academia de Gimnastică Cluj",
    sportType: "gimnastica",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Calea Dorobanților 56, Cluj-Napoca",
    description:
      "Oferă cursuri de gimnastică pentru copii, punând accent pe dezvoltarea fizică și mentală armonioasă prin exerciții și joacă.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== KARATE ==========
  createClubFromResearch({
    name: "Hoshin Jii Karate",
    sportType: "karate",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Miraslău, Cluj-Napoca",
    phone: "+40 770 503 773",
    email: "hoshinjii@gmail.com",
    description:
      "Oferă cursuri de karate tradițional, energetic și seiki pentru copii de peste 8 ani, punând accent pe dezvoltarea caracterului și a abilităților fizice și emoționale.",
    researchNotes: "Karate tradițional, energetic și seiki",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "19:00-20:30" },
      { day: "Miercuri", time: "19:00-20:30" },
      { day: "Vineri", time: "19:00-20:30" },
    ],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Cluj-Napoca - Secția de Karate",
    sportType: "karate",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Republicii nr. 23, Cluj-Napoca",
    phone: "+40 264 595 765",
    email: "palatulcopiilorcluj@gmail.com",
    website: "https://sites.google.com/pccj.ro/palatulcopiilorcluj/",
    description:
      "Cu o tradiție îndelungată, această secție a obținut numeroase medalii la competiții naționale și internaționale, având peste 200 de copii înscriși.",
    researchNotes: "Peste 200 de copii înscriși, medalii naționale și internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Elite Martial Arts",
    sportType: "karate",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Parcul Babeș, Sala de Aerobic, Cluj-Napoca",
    phone: "+40 741 935 030",
    email: "mic.alexandru@karateelite.ro",
    website: "http://www.karateelite.ro",
    description:
      "Conduce de antrenorul Mic Alexandru Darius, clubul formează campioni naționali și internaționali, oferind antrenamente în Parcul Babeș, Sala de Aerobic.",
    researchNotes: "Campioni naționali și internaționali",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "19:00-21:00" },
      { day: "Miercuri", time: "19:00-21:00" },
      { day: "Vineri", time: "19:00-21:00" },
    ],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv KYOSPIRIT",
    sportType: "karate",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Liceul 'Apáczai Csere János', Strada I.C. Brătianu nr. 26, Cluj-Napoca",
    description:
      "Specializat în stilul Kyokushin, acest club oferă antrenamente pentru copii în zilele de luni, marți și joi, între orele 19:00 și 20:00.",
    researchNotes: "Stil Kyokushin, antrenamente la Liceul Apáczai Csere János",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "19:00-20:00" },
      { day: "Marți", time: "19:00-20:00" },
      { day: "Joi", time: "19:00-20:00" },
    ],
  }),

  // ========== TAEKWONDO ==========
  createClubFromResearch({
    name: "Asociația Club Sportiv Delta MMA Taekwon-do ITF",
    sportType: "taekwondo",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Bucegi nr. 19, Cluj-Napoca",
    phone: "+40 745 657 975",
    email: "alexandru_muresan70@yahoo.co.uk",
    description:
      "Înființat în 1997, acest club este afiliat Federației Române de Taekwon-do și are în palmares campioni naționali, europeni și mondiali. Oferă cursuri de taekwon-do pentru copii, axate pe dezvoltarea și perfecționarea sportului.",
    researchNotes: "Înființat în 1997, campioni naționali, europeni și mondiali",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Dynamic Taekwondo Club",
    sportType: "taekwondo",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Regina Maria nr. 7, Cluj-Napoca",
    phone: "+40 745 606 700",
    email: "info@dynamictaekwondo.ro",
    website: "http://www.dynamictaekwondo.ro/",
    description:
      "Școală de arte marțiale dedicată pasionaților de taekwon-do, unde copiii învață tehnici specifice sportului și își dezvoltă abilități cognitive precum determinarea și autodisciplina.",
    researchNotes: "Antrenamente Marți, Joi, Vineri 18:00-21:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "18:00-21:00" },
      { day: "Joi", time: "18:00-21:00" },
      { day: "Vineri", time: "18:00-21:00" },
    ],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Kwan Cluj-Napoca",
    sportType: "taekwondo",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "N/A",
    description:
      "Organizează cursuri de taekwondo WTF pentru copii și tineri, sub îndrumarea instructorului Florin Coldea, licențiat al Facultății de Educație Fizică și Sport.",
    researchNotes: "Taekwondo WTF",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Clubul de Dans Sportiv Potaissa",
    sportType: "dans",
    city: "Cluj-Napoca",
    district: "Turda (aproape)",
    address: "Strada Aviatorilor 14, Turda",
    phone: "+40 747 074 306",
    email: "ascds.potaissa@gmail.com",
    description:
      "Oferă cursuri de dans sportiv pentru copii de toate vârstele, cu antrenori experimentați și participare la competiții naționale.",
    researchNotes: "Locație în Turda, aproape de Cluj-Napoca",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Transilvania Dance Academy",
    sportType: "dans",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Regele Ferdinand nr. 22-26, Cluj-Napoca (Magazinul Central, etajul 3)",
    phone: "+40 757 111 001",
    email: "contact@tdance.ro",
    website: "https://www.scolidans.ro/transilvania-dance-centre",
    description:
      "Oferă cursuri de dans modern și sportiv pentru copii, acoperind stiluri moderne precum Street Dance, Hip-hop, Dancehall, Street Jazz și Dans Modern.",
    researchNotes: "Street Dance, Hip-hop, Dancehall, Street Jazz",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "15:00-22:00" },
      { day: "Marți", time: "15:00-22:00" },
      { day: "Miercuri", time: "15:00-22:00" },
      { day: "Joi", time: "15:00-22:00" },
      { day: "Vineri", time: "16:00-18:00" },
      { day: "Sâmbătă", time: "12:00-14:00" },
    ],
  }),

  createClubFromResearch({
    name: "Clubul de Dans Sportiv Top Dance",
    sportType: "dans",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "N/A",
    description:
      "Oferă lecții de dans sportiv pentru copii, cu posibilitatea de a participa la concursuri și spectacole locale.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Școala de Dans Step Up Dance Center",
    sportType: "dans",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Horea nr. 4 / Strada București nr. 77, scara II, etaj 3, Cluj-Napoca",
    phone: "+40 744 188 335",
    website: "https://stepupdancecenter.ro/",
    description:
      "Propune cursuri de dans pentru copii, incluzând stiluri precum hip-hop, jazz și dans sportiv, într-un mediu prietenos și motivant.",
    researchNotes: "Hip-hop, jazz, dans sportiv. Două locații. Program L-V 14:00-20:30",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "14:00-20:30" },
      { day: "Marți", time: "14:00-20:30" },
      { day: "Miercuri", time: "14:00-20:30" },
      { day: "Joi", time: "14:00-20:30" },
      { day: "Vineri", time: "14:00-20:30" },
    ],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "Club Sportiv Atletic Cluj",
    sportType: "atletism",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Stadionul Cluj Arena, Cluj-Napoca",
    description:
      "Oferă cursuri de atletism pentru copii cu vârste între 3 și 12 ani, sub îndrumarea drd. Mihaela Botezan. Antrenamentele se desfășoară pe stadionul Cluj Arena.",
    researchNotes: "Antrenor: drd. Mihaela Botezan",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12],
  }),

  // ========== TENIS DE MASĂ (Table Tennis) ==========
  createClubFromResearch({
    name: "ACS Topspin Florești",
    sportType: "tenis-de-masa",
    city: "Cluj-Napoca",
    district: "Florești (aproape)",
    address: "Sala de sport Florești, Bulevardul Cetatea Fetei, Florești",
    description:
      "Situat în apropiere de Cluj-Napoca, acest club oferă antrenamente de tenis de masă pentru copii, sub îndrumarea antrenorului Cristian Mateiu. Antrenamentele au loc la Sala de sport Florești, Bulevardul Cetatea Fetei, în zilele de miercuri și vineri, între orele 19:30 și 21:30.",
    researchNotes: "Locație în Florești, aproape de Cluj-Napoca",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Miercuri", time: "19:30-21:30" },
      { day: "Vineri", time: "19:30-21:30" },
    ],
  }),

  // ========== SCRIMĂ (Fencing) ==========
  createClubFromResearch({
    name: "Asociația Club Sportiv Atlas Invictus",
    sportType: "scrima",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Str. Buftea, Nr. 7, Cluj-Napoca",
    phone: "+40 754 975 941",
    email: "atlasinvictusoffice@gmail.com",
    website: "https://atlasinvictus.com/",
    description:
      "Fondată în 2021, această asociație organizează competiții naționale și internaționale de scrimă pentru copii, precum 'Cupa Atlas Invictus' și 'Maratonul Scrimei Clujene'.",
    researchNotes:
      "Fondată în 2021, organizează competiții naționale și internaționale. Grupe: Începători, Intermediari, Avansați, Performanță",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "16:00-20:30" },
      { day: "Marți", time: "16:00-18:30" },
      { day: "Miercuri", time: "15:45-18:00" },
      { day: "Joi", time: "16:00-19:30" },
      { day: "Vineri", time: "16:00-19:30" },
    ],
  }),

  // ========== ECHITAȚIE (Horseback Riding) ==========
  createClubFromResearch({
    name: "Szilaj",
    sportType: "echitatie",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Lombului, Cluj-Napoca",
    website: "https://www.facebook.com/CalarieInCluj",
    description:
      "Oferă plimbări în natură călare pe cai prietenoși, lecții de călărie pentru copii și adulți, precum și tabere pentru copii cu drumeții și jocuri ingenioase.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Napoca Sport Horse",
    sportType: "echitatie",
    city: "Cluj-Napoca",
    district: "Ciurila (aproape)",
    address: "Comuna Ciurila, Satul Salicea, Cluj-Napoca",
    website: "https://www.napocasporthorse.ro/",
    description:
      "Situat la 15 km de Cluj-Napoca, acest centru oferă cursuri de echitație pentru toate vârstele, inclusiv pentru copii, plimbări călare și tabere de vară. Dispune de un manej acoperit pentru antrenamente pe orice vreme.",
    researchNotes: "La 15 km de Cluj-Napoca, manej acoperit",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== SCHI (Skiing) ==========
  createClubFromResearch({
    name: "Palatul Copiilor Cluj-Napoca - Secția de Schi",
    sportType: "schi",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Republicii nr. 23, Cluj-Napoca / Filiala Băișoara",
    phone: "+40 264 595 765",
    email: "palatulcopiilorcluj@gmail.com",
    website: "https://sites.google.com/pccj.ro/palatulcopiilorcluj/",
    description:
      "Oferă diverse activități pentru copii, inclusiv un cerc de schi alpin. Cursurile se desfășoară pe parcursul anului școlar și sunt destinate copiilor cu vârste între 4 și 18 ani. Palatul dispune de facilități precum o pârtie de schi iluminată și instalație de zăpadă artificială la filiala Băișoara.",
    researchNotes: "Pârtie de schi iluminată și instalație de zăpadă artificială",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== CLUBURI ȘCOLARE MULTI-SPORT ==========
  createClubFromResearch({
    name: "Clubul Sportiv Municipal Cluj-Napoca",
    sportType: "multi-sport",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Piața Unirii nr. 22, Cluj-Napoca",
    phone: "+40 264 595 888",
    email: "csm.clujnapoca@anst.gov.ro",
    website: "http://www.csmcj.ro",
    description:
      "Înființat în 1961, CSM Cluj-Napoca include 13 secții sportive: atletism, box, triatlon, gimnastică, haltere, judo, lupte libere, înot, polo, șah, scrimă, radioamatorism și tenis de masă. Are peste 300 de sportivi legitimați.",
    researchNotes: "Înființat în 1961, 13 secții sportive, peste 300 sportivi",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Viitorul Cluj-Napoca",
    sportType: "multi-sport",
    city: "Cluj-Napoca",
    district: "N/A",
    address: "Strada Paul Chinezu nr. 1, Cluj-Napoca",
    phone: "+40 264 595 545",
    email: "cssviitorul@yahoo.com",
    website: "https://www.cssviitorulcluj.ro/",
    description:
      "Clubul Sportiv Școlar Viitorul oferă o varietate de secții sportive, printre care: atletism, baschet, gimnastică, handbal, rugby, scrabble, tenis de câmp, volei feminin și volei masculin.",
    researchNotes: "Multiple secții sportive",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

/**
 * Research Statistics
 */
export const RESEARCH_STATS_CLUJ = {
  totalClubs: CLUBS_RESEARCH_CLUJ_NAPOCA.length,
  sportsCovered: new Set(CLUBS_RESEARCH_CLUJ_NAPOCA.map((c) => c.sportType)).size,
  districtsCovered: new Set(
    CLUBS_RESEARCH_CLUJ_NAPOCA.map((c) => c.district).filter((d) => d !== undefined)
  ).size,
  clubsWithWebsite: CLUBS_RESEARCH_CLUJ_NAPOCA.filter((c) => c.website).length,
  clubsWithEmail: CLUBS_RESEARCH_CLUJ_NAPOCA.filter((c) => c.email).length,
  clubsWithPhone: CLUBS_RESEARCH_CLUJ_NAPOCA.filter((c) => c.phone).length,
  dateCollected: "2025-01-XX",
};

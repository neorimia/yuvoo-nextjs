/**
 * Clubs Research Data - Suceava
 *
 * Date reale colectate prin research public pentru cluburi sportive din Suceava.
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
 * Total cluburi identificate: 19
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
 * Research Data - Cluburi Sportive Suceava
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_SUCEAVA: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "CSM Cetatea 1932 Suceava - Secția de Fotbal",
    sportType: "fotbal",
    city: "Suceava",
    district: "N/A",
    address: "Stadionul Areni, Suceava",
    description:
      "CSM Cetatea 1932 Suceava oferă oportunități pentru tinerii pasionați de fotbal să se alăture grupelor de copii și juniori. Înscrierile sunt deschise pentru copiii născuți între 2012 și 2017. Antrenamentele sunt coordonate de antrenorul Florin Cristescu și se desfășoară pe terenul Universității 'Ștefan cel Mare' din Suceava (Luni și Miercuri) și pe terenul sintetic de la Mirăuți (Marți și Joi). Clubul a fost fondat inițial în 1932 sub numele de Cetatea Sucevei, a trecut prin mai multe reorganizări și a fost reînființat în vara anului 2024, promovând în Liga III după ce a câștigat Liga IV Suceava. Echipa își dispută meciurile de acasă pe Stadionul Areni, care are o capacitate de 12.500 de locuri.",
    researchNotes:
      "Înscrieri copiii născuți 2012-2017, antrenor: Florin Cristescu (+40 745 054 015), program: L-Mi terenul USV, Ma-J terenul sintetic Mirăuți, fondat 1932, reînființat 2024, promovat Liga III, Stadionul Areni (12.500 locuri), antrenor portari: Eduard Paul Luca (8 ani experiență Academia FC Botoșani)",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "Terenul USV" },
      { day: "Marți", time: "Terenul sintetic Mirăuți" },
      { day: "Miercuri", time: "Terenul USV" },
      { day: "Joi", time: "Terenul sintetic Mirăuți" },
    ],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "ABC Castorii Suceava",
    sportType: "baschet",
    city: "Suceava",
    district: "N/A",
    address: "Suceava",
    website: "https://castorii.ro/",
    description:
      "ABC Castorii Suceava este dedicat dezvoltării baschetului în rândul copiilor, oferind antrenamente pentru cei cu vârsta minimă de 5 ani. Antrenorii Ovidiu Stafie și Daniel Roșca sunt specializați și dedicați în instruirea tinerilor sportivi. Clubul oferă programe de pregătire pentru dezvoltarea abilităților de baschet.",
    researchNotes: "Vârstă minimă 5 ani, antrenori: Ovidiu Stafie, Daniel Roșca",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSU Suceava - Secția de Handbal",
    sportType: "handbal",
    city: "Suceava",
    district: "N/A",
    address: "Universitatea 'Ștefan cel Mare', Suceava",
    website: "https://csu.usv.ro/",
    description:
      "Clubul Sportiv Universitar (CSU) Suceava are o secție activă de handbal pentru copii și juniori, coordonată de Vasile Boca, care este și antrenor principal al echipei naționale de handbal masculin Cadeți a României. Clubul se remarcă prin performanțe deosebite la toate categoriile de vârstă, având aproximativ 130 de copii legitimați.",
    researchNotes:
      "Circa 130 copii legitimați, antrenor: Vasile Boca (antrenor principal Lot Național Cadeți România), performanțe deosebite toate categoriile",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CSM Suceava - Secția de Volei",
    sportType: "volei",
    city: "Suceava",
    district: "N/A",
    address: "Bulevardul 1 Decembrie 1918, nr. 7, Suceava",
    phone: "+40 230 531 289",
    website: "https://csm-suceava.ro/",
    description:
      "Clubul Sportiv Municipal Suceava cu secție de volei pentru copii și juniori. Fondat în 1972, CSM Suceava este un club multisectional care include discipline precum volei, atletism, box, canotaj, hochei pe gheață, lupte greco-romane, tir cu arcul, tir sportiv și rugby.",
    researchNotes: "Parte din CSM Suceava, fondat 1972, club multisectional",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "Civica Sport Center Suceava - Tenis",
    sportType: "tenis",
    city: "Suceava",
    district: "N/A",
    address: "Strada Humorului, Suceava",
    website: "https://civicasportcenter.ro/",
    description:
      "Civica Sport Center Suceava este un complex sportiv modern care oferă facilități pentru tenis de câmp, precum și terenuri de fotbal, padel și squash. Centrul dispune de o zonă de relaxare cu bar și pizza, precum și un spațiu dedicat pentru petreceri și evenimente. Programul de funcționare este de luni până vineri, între orele 7:00 și 00:00, iar sâmbătă și duminică, între 9:00 și 00:00.",
    researchNotes:
      "Complex sportiv modern, terenuri tenis de câmp, padel, squash, fotbal, bar, pizza, program L-V 7:00-00:00, Sâmbătă-Duminică 9:00-00:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "07:00-00:00" },
      { day: "Marți", time: "07:00-00:00" },
      { day: "Miercuri", time: "07:00-00:00" },
      { day: "Joi", time: "07:00-00:00" },
      { day: "Vineri", time: "07:00-00:00" },
      { day: "Sâmbătă", time: "09:00-00:00" },
      { day: "Duminică", time: "09:00-00:00" },
    ],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Civica Sport Center Suceava - Înot",
    sportType: "inot",
    city: "Suceava",
    district: "N/A",
    address: "Strada Humorului, Suceava",
    website: "https://civicasportcenter.ro/",
    description:
      "Civica Sport Center Suceava oferă o piscină curată destinată atât copiilor, cât și adulților. Centrul este un complex sportiv modern care oferă facilități variate pentru sport și relaxare, inclusiv terenuri de tenis, fotbal, padel și squash.",
    researchNotes: "Piscină curată pentru copii și adulți, complex sportiv modern",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Centrul ARCA Suceava - Înot",
    sportType: "inot",
    city: "Suceava",
    district: "N/A",
    address: "Suceava",
    website: "https://centrularca.org/",
    description:
      "Centrul ARCA Suceava oferă acces la un bazin de înot destinat copiilor, inclus în programul afterschool. Centrul oferă activități sportive pentru copii, inclusiv înot și gimnastică.",
    researchNotes: "Bazin înot în program afterschool, activități sportive pentru copii",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CSM Suceava - Secția de Atletism",
    sportType: "atletism",
    city: "Suceava",
    district: "N/A",
    address: "Bulevardul 1 Decembrie 1918, nr. 7, Suceava",
    phone: "+40 230 531 289",
    website: "https://csm-suceava.ro/",
    description:
      "Clubul Sportiv Municipal Suceava cu secție de atletism pentru copii și juniori. Fondat în 1972, CSM Suceava organizează competiții și antrenamente pentru tinerii atleți. Recent, peste 100 de copii au participat la 'Cupa Sucevei' la atletism, desfășurată pe stadionul Areni, eveniment organizat de Asociația Club Sportiv Academia de Sport.",
    researchNotes:
      "Parte din CSM Suceava, fondat 1972, organizare 'Cupa Sucevei' la atletism (peste 100 copii participanți), Stadionul Areni",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "Sport Center Suceava - Karate",
    sportType: "karate",
    city: "Suceava",
    district: "N/A",
    address: "Suceava",
    website: "https://sportcentersv.ro/",
    description:
      "Sport Center Suceava oferă cursuri de karate pentru copii cu vârste între 5 și 14 ani. Programul se concentrează pe educație, autoapărare și dezvoltarea personalității. Clubul oferă programe variate pentru dezvoltarea abilităților în karate.",
    researchNotes: "Copii 5-14 ani, program: educație, autoapărare, dezvoltare personalitate",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Nord Arena Suceava - Arte Marțiale",
    sportType: "karate",
    city: "Suceava",
    district: "N/A",
    address: "Suceava",
    description:
      "Clubul Sportiv Nord Arena Suceava dispune de o sală de antrenamente pentru secțiile de arte marțiale, inclusiv qwan ki do, judo și shotokan. Clubul oferă programe de pregătire pentru copii și juniori în diverse stiluri de arte marțiale.",
    researchNotes: "Sală antrenamente arte marțiale, secții: qwan ki do, judo, shotokan",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Clubul HE PAI Suceava - Qwan Ki Do",
    sportType: "karate",
    city: "Suceava",
    district: "N/A",
    address: "Suceava",
    description:
      "Clubul HE PAI activează în Suceava și oferă antrenamente de Qwan Ki Do pentru copii începând cu vârsta de 5 ani. Clubul se remarcă prin performanțe deosebite, cu cei mai tineri practicanți de arte marțiale din Suceava având vârsta de 5 ani.",
    researchNotes:
      "Qwan Ki Do, copii de la 5 ani, cei mai tineri practicanți arte marțiale din Suceava",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "Simply Kids – Afterschool Suceava - Gimnastică",
    sportType: "gimnastica",
    city: "Suceava",
    district: "N/A",
    address: "Suceava",
    website: "https://simplykids.ro/",
    description:
      "Simply Kids – Afterschool Suceava oferă activități sportive pentru copii, inclusiv gimnastică, într-un mediu prietenos și educativ. Centrul oferă programe variate pentru dezvoltarea abilităților fizice ale copiilor.",
    researchNotes: "Mediu prietenos și educativ, activități sportive pentru copii",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Centrul ARCA Suceava - Gimnastică",
    sportType: "gimnastica",
    city: "Suceava",
    district: "N/A",
    address: "Suceava",
    website: "https://centrularca.org/",
    description:
      "Centrul ARCA Suceava oferă activități sportive pentru copii, inclusiv gimnastică, în cadrul programului afterschool. Centrul oferă activități variate pentru dezvoltarea abilităților fizice.",
    researchNotes: "Gimnastică în program afterschool, activități sportive pentru copii",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Silver Dance Academy Suceava",
    sportType: "dans",
    city: "Suceava",
    district: "N/A",
    address: "Suceava",
    website: "https://www.silverdanceacademy.ro/",
    description:
      "Silver Dance Academy Suceava organizează cursuri de dans pentru copii și adulți, incluzând dans sportiv, dans modern, salsa, bachata, street dance și balet. Academia oferă programe variate pentru dezvoltarea abilităților artistice și sportive.",
    researchNotes: "Dans sportiv, dans modern, salsa, bachata, street dance, balet",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Clubul de Dans Sportiv Boom Dance Suceava",
    sportType: "dans",
    city: "Suceava",
    district: "N/A",
    address: "Suceava",
    description:
      "Clubul de Dans Sportiv Boom Dance Suceava oferă cursuri de dans pentru copii începând cu vârsta de 4 ani, acoperind stiluri precum dans modern, fantezie coregrafică și dans tematic. Clubul oferă programe variate pentru dezvoltarea abilităților artistice.",
    researchNotes: "Copii de la 4 ani, dans modern, fantezie coregrafică, dans tematic",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "M Style Dance Studio Suceava",
    sportType: "dans",
    city: "Suceava",
    district: "N/A",
    address: "Suceava",
    website: "https://mstylestudio.bizoo.ro/",
    description:
      "M Style Dance Studio Suceava pune la dispoziție cursuri de dans pentru copii, incluzând dans modern, dans tematic, street dance și dans sportiv. Studio-ul oferă programe variate pentru dezvoltarea abilităților artistice și sportive.",
    researchNotes: "Dans modern, dans tematic, street dance, dans sportiv",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== LUPTE (Wrestling) ==========
  createClubFromResearch({
    name: "CSM Suceava - Secția de Lupte",
    sportType: "lupte",
    city: "Suceava",
    district: "N/A",
    address: "Bulevardul 1 Decembrie 1918, nr. 7, Suceava",
    phone: "+40 230 531 289",
    website: "https://csm-suceava.ro/",
    description:
      "Clubul Sportiv Municipal Suceava cu secție de lupte greco-romane pentru copii și juniori. Fondat în 1972, CSM Suceava este un club multisectional care include discipline precum lupte greco-romane, atletism, box, canotaj, hochei pe gheață, tir cu arcul, tir sportiv, volei și rugby.",
    researchNotes: "Parte din CSM Suceava, fondat 1972, lupte greco-romane, club multisectional",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== RUGBY ==========
  createClubFromResearch({
    name: "CSM Suceava - Secția de Rugby",
    sportType: "rugby",
    city: "Suceava",
    district: "N/A",
    address: "Bulevardul 1 Decembrie 1918, nr. 7, Suceava",
    phone: "+40 230 531 289",
    website: "https://csm-suceava.ro/",
    description:
      "Clubul Sportiv Municipal Suceava cu secție de rugby pentru copii și juniori. Fondat în 1972, CSM Suceava este un club multisectional care include discipline precum rugby, atletism, box, canotaj, hochei pe gheață, lupte greco-romane, tir cu arcul, tir sportiv și volei.",
    researchNotes: "Parte din CSM Suceava, fondat 1972, club multisectional",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport clubs) ==========
  createClubFromResearch({
    name: "CSM Suceava",
    sportType: "multi-sport",
    city: "Suceava",
    district: "N/A",
    address: "Bulevardul 1 Decembrie 1918, nr. 7, Suceava",
    phone: "+40 230 531 289",
    website: "https://csm-suceava.ro/",
    description:
      "Clubul Sportiv Municipal Suceava, fondat în 1972, este un club multisectional care include discipline precum atletism, box, canotaj, hochei pe gheață, lupte greco-romane, tir cu arcul, tir sportiv, volei și rugby. CSM Suceava colaborează cu CSS Rădăuți în diverse competiții, obținând rezultate notabile în discipline precum tirul cu arcul. Clubul oferă oportunități valoroase pentru tinerii din județul Suceava de a se implica în activități sportive.",
    researchNotes:
      "Fondat 1972, club multisectional: atletism, box, canotaj, hochei pe gheață, lupte greco-romane, tir cu arcul, tir sportiv, volei, rugby, colaborare cu CSS Rădăuți, rezultate notabile tir cu arcul",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Suceava",
    sportType: "multi-sport",
    city: "Suceava",
    district: "N/A",
    address: "Suceava",
    description:
      "Palatul Copiilor Suceava oferă o varietate de activități sportive pentru copii și adolescenți, incluzând discipline precum handbal, volei, atletism, rugby și lupte. Aceste activități sunt concepute pentru a dezvolta abilitățile fizice și spiritul de echipă al participanților.",
    researchNotes:
      "Activități sportive: handbal, volei, atletism, rugby, lupte, dezvoltare abilități fizice și spirit de echipă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Civica Sport Center Suceava",
    sportType: "multi-sport",
    city: "Suceava",
    district: "N/A",
    address: "Strada Humorului, Suceava",
    website: "https://civicasportcenter.ro/",
    description:
      "Civica Sport Center Suceava este un complex sportiv modern care oferă o varietate de facilități pentru iubitorii de sport și relaxare. Printre acestea se numără terenuri de fotbal, tenis de câmp, padel și squash, precum și o piscină curată destinată atât copiilor, cât și adulților. De asemenea, centrul dispune de o zonă de relaxare cu bar și pizza, precum și un spațiu dedicat pentru petreceri și evenimente. Programul de funcționare este de luni până vineri, între orele 7:00 și 00:00, iar sâmbătă și duminică, între 9:00 și 00:00.",
    researchNotes:
      "Complex sportiv modern: fotbal, tenis de câmp, padel, squash, piscină, bar, pizza, spațiu petreceri și evenimente, program L-V 7:00-00:00, Sâmbătă-Duminică 9:00-00:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

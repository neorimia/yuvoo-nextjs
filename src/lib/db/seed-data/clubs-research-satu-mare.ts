/**
 * Clubs Research Data - Satu Mare
 *
 * Date reale colectate prin research public pentru cluburi sportive din Satu Mare.
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
 * Research Data - Cluburi Sportive Satu Mare
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_SATU_MARE: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "CSM Olimpia Satu Mare - Secția de Fotbal",
    sportType: "fotbal",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    website: "https://csmolimpia.ro/",
    description:
      "Clubul Sportiv Municipal Olimpia Satu Mare pune un accent deosebit pe dezvoltarea tinerilor fotbaliști prin intermediul Centrului său de copii și juniori. Acest centru oferă oportunități de antrenament și competiție pentru diverse categorii de vârstă, sub îndrumarea unor antrenori calificați. Clubul organizează periodic acțiuni de selecție pentru copii născuți în diferiți ani, iar participarea la antrenamente este gratuită.",
    researchNotes:
      "Centru copii și juniori, selecții periodice, participare gratuită la antrenamente, peste 350 tineri fotbaliști în evenimente",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Academia de Fotbal Partium Satu Mare",
    sportType: "fotbal",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Academia de Fotbal Partium Satu Mare, înființată în decembrie 2021, debutează cu o grupă de 20 de copii născuți în 2010-2011. De atunci, academia și-a extins activitatea, ajungând să formeze peste 200 de copii și juniori, organizând 10 grupe de vârstă, de la cei născuți în 2019 până la juniorii U19. În clasamentul academiilor de copii și juniori din România, ediția 2024, Academia Partium s-a clasat pe locul 47, menținându-se astfel în primele 48 de academii din țară. Participă în Liga Elitelor U13, U14, U15 și U16, precum și în Campionatele Naționale U17 și U19.",
    researchNotes:
      "Înființată decembrie 2021, peste 200 copii și juniori, 10 grupe (2019-U19), clasată #47 în România 2024, participare Liga Elitelor și Campionate Naționale",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Atletic 94 Satu Mare",
    sportType: "fotbal",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv 'Atletic 94' Satu Mare specializat în fotbal pentru copii și tineri. Clubul oferă programe de dezvoltare pentru tinerii fotbaliști din oraș.",
    researchNotes: "Specializat în fotbal pentru copii și tineri",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSM Olimpia Satu Mare - Secția de Baschet",
    sportType: "baschet",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    website: "https://csmolimpia.ro/",
    description:
      "Clubul Sportiv Municipal Olimpia Satu Mare cu secție de baschet feminin pentru copii și juniori. Clubul are echipe de performanță și grupe de copii. Echipa de baschet feminin a obținut de patru ori locul al doilea în Liga Națională, în sezoanele 2010–11, 2011–12, 2017–18 și 2018–19.",
    researchNotes:
      "Baschet feminin, echipe performanță și grupe copii, 4 locuri 2 în Liga Națională (2010-11, 2011-12, 2017-18, 2018-19)",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Dinamo M.S.M. Satu Mare - Secția de Baschet",
    sportType: "baschet",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv 'Dinamo M.S.M.' Satu Mare cu secție de baschet pentru copii și juniori. Clubul oferă programe în multiple discipline sportive, incluzând baschet.",
    researchNotes: "Parte din CS Dinamo M.S.M., multiple secții sportive",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CSM Olimpia Satu Mare - Secția de Volei",
    sportType: "volei",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    website: "https://csmolimpia.ro/",
    description:
      "Clubul Sportiv Municipal Olimpia Satu Mare cu secție de volei feminin pentru copii și juniori. Clubul are echipe de performanță și grupe de copii în acest sport.",
    researchNotes: "Volei feminin, echipe performanță și grupe copii",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS ADEP Satu Mare - Secția de Volei",
    sportType: "volei",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv 'ADEP' Satu Mare specializat în volei feminin, cu programe pentru copii și tineri. Clubul se concentrează pe dezvoltarea acestui sport în rândul tinerilor.",
    researchNotes: "Specializat în volei feminin, programe pentru copii și tineri",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Dacia 2003 Satu Mare - Secția de Volei",
    sportType: "volei",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv 'Dacia 2003' Satu Mare cu secție de volei pentru copii și juniori. Clubul oferă programe în multiple discipline sportive, incluzând volei.",
    researchNotes: "Parte din CS Dacia 2003, multiple secții sportive",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSM Olimpia Satu Mare - Secția de Handbal",
    sportType: "handbal",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    website: "https://csmolimpia.ro/",
    description:
      "Clubul Sportiv Municipal Olimpia Satu Mare cu secție de handbal masculin pentru copii și juniori. Clubul are echipe de performanță și grupe de copii în acest sport.",
    researchNotes: "Handbal masculin, echipe performanță și grupe copii",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Dacia 2003 Satu Mare - Secția de Handbal",
    sportType: "handbal",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv 'Dacia 2003' Satu Mare cu secție de handbal pentru copii și juniori. Clubul oferă programe în multiple discipline sportive, incluzând handbal.",
    researchNotes: "Parte din CS Dacia 2003, multiple secții sportive",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Dinamo M.S.M. Satu Mare - Secția de Handbal",
    sportType: "handbal",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv 'Dinamo M.S.M.' Satu Mare cu secție de handbal pentru copii și juniori. Clubul oferă programe în multiple discipline sportive, incluzând handbal.",
    researchNotes: "Parte din CS Dinamo M.S.M., multiple secții sportive",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS DE MASĂ (Table Tennis) ==========
  createClubFromResearch({
    name: "CS Dacia 2003 Satu Mare - Secția de Tenis de Masă",
    sportType: "tenis-de-masa",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv 'Dacia 2003' Satu Mare cu secție de tenis de masă pentru copii și juniori. Clubul oferă programe în multiple discipline sportive, incluzând tenis de masă.",
    researchNotes: "Parte din CS Dacia 2003, multiple secții sportive",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Dinamo M.S.M. Satu Mare - Secția de Tenis de Masă",
    sportType: "tenis-de-masa",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv 'Dinamo M.S.M.' Satu Mare cu secție de tenis de masă pentru copii și juniori. Clubul oferă programe în multiple discipline sportive, incluzând tenis de masă.",
    researchNotes: "Parte din CS Dinamo M.S.M., multiple secții sportive",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "CSM Olimpia Satu Mare - Secția de Înot",
    sportType: "inot",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    website: "https://csmolimpia.ro/",
    description:
      "Clubul Sportiv Municipal Olimpia Satu Mare cu secție de înot pentru copii și juniori. Municipiul Satu Mare nu dispune încă de un bazin olimpic, dar există inițiative pentru dezvoltarea infrastructurii sportive, inclusiv construirea unui bazin de înot.",
    researchNotes: "Secție de înot pentru copii, inițiative pentru construire bazin olimpic",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CSM Olimpia Satu Mare - Secția de Judo",
    sportType: "judo",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    website: "https://csmolimpia.ro/",
    description:
      "Clubul Sportiv Municipal Olimpia Satu Mare cu secție de judo pentru copii și juniori. Clubul are grupe dedicate pentru copii și juniori în acest sport.",
    researchNotes: "Secție judo, grupe pentru copii și juniori",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Unio Satu Mare - Secția de Judo",
    sportType: "judo",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv Unio Satu Mare oferă cursuri de judo pentru copii, cu antrenori calificați. Clubul se concentrează pe dezvoltarea tinerilor judoka.",
    researchNotes: "Judo pentru copii, antrenori calificați",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Olimpia Satu Mare - Secția de Karate",
    sportType: "karate",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    website: "https://csmolimpia.ro/",
    description:
      "Clubul Sportiv Municipal Olimpia Satu Mare cu secție de karate pentru copii și juniori. Clubul are grupe dedicate pentru copii și juniori în acest sport.",
    researchNotes: "Secție karate, grupe pentru copii și juniori",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Samuraiul Satu Mare",
    sportType: "karate",
    city: "Satu Mare",
    district: "N/A",
    address: "Strada Făgărașului, Bl. F5, Ap. 1, Satu Mare",
    description:
      "Clubul Sportiv de Arte Marțiale Samuraiul Satu Mare oferă cursuri de arte marțiale pentru copii, inclusiv karate și judo. Situat pe Strada Făgărașului, Bl. F5, Ap. 1.",
    researchNotes: "Arte marțiale (karate, judo), Str. Făgărașului, Bl. F5, Ap. 1",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Zanshin Satu Mare",
    sportType: "karate",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv Zanshin Satu Mare specializat în karate WKC, organizează demonstrații și cursuri pentru copii. Clubul promovează acest stil de karate în rândul tinerilor.",
    researchNotes: "Karate WKC, demonstrații și cursuri pentru copii",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Yakuza Satu Mare",
    sportType: "karate",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv Yakuza Satu Mare oferă cursuri de karate pentru copii, cu antrenori experimentați. Clubul se concentrează pe dezvoltarea tinerilor karateka.",
    researchNotes: "Karate pentru copii, antrenori experimentați",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Bushido Satu Mare",
    sportType: "karate",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv Bushido Satu Mare organizează cursuri de arte marțiale pentru copii, inclusiv karate. Clubul promovează disciplina și respectul prin practicarea artelor marțiale.",
    researchNotes: "Arte marțiale (karate), disciplină și respect",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Energy Kardio Club Satu Mare",
    sportType: "karate",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Energy Kardio Club Satu Mare organizează demonstrații și cursuri de karate pentru copii. Clubul oferă oportunități de a învăța acest sport într-un mediu prietenos.",
    researchNotes: "Demonstrații și cursuri karate pentru copii",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Dinamo M.S.M. Satu Mare - Secția de Karate",
    sportType: "karate",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv 'Dinamo M.S.M.' Satu Mare cu secție de karate pentru copii și juniori. Clubul oferă programe în multiple discipline sportive, incluzând karate.",
    researchNotes: "Parte din CS Dinamo M.S.M., multiple secții sportive",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Loga Dance School Satu Mare",
    sportType: "dans",
    city: "Satu Mare",
    district: "N/A",
    address: "Strada Martirilor Deportați 30, Satu Mare",
    phone: "+40 722 538 317",
    description:
      "Loga Dance School Satu Mare oferă cursuri de dans sportiv pentru copii și adulți, inclusiv dansuri standard și latino. Program: Luni-Vineri 16:30-21:20.",
    researchNotes:
      "Dans sportiv (standard, latino), copii și adulți, program L-V 16:30-21:20, Str. Martirilor Deportați 30",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "16:30-21:20" },
      { day: "Marți", time: "16:30-21:20" },
      { day: "Miercuri", time: "16:30-21:20" },
      { day: "Joi", time: "16:30-21:20" },
      { day: "Vineri", time: "16:30-21:20" },
    ],
  }),

  createClubFromResearch({
    name: "Royal Dance Satu Mare",
    sportType: "dans",
    city: "Satu Mare",
    district: "N/A",
    address: "Bulevardul Transilvania 3, Satu Mare",
    phone: "+40 744 427 229",
    description:
      "Royal Dance Satu Mare organizează cursuri de dans pentru copii și adulți, atât pentru începători, cât și pentru avansați, în dansuri latino și standard. Program: Luni-Vineri 9:00-17:00. Adresa: B-dul Transilvania nr.3, etaj 1.",
    researchNotes:
      "Dans latino și standard, copii și adulți (începători și avansați), program L-V 9:00-17:00, Bd. Transilvania 3, etaj 1",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "09:00-17:00" },
      { day: "Marți", time: "09:00-17:00" },
      { day: "Miercuri", time: "09:00-17:00" },
      { day: "Joi", time: "09:00-17:00" },
      { day: "Vineri", time: "09:00-17:00" },
    ],
  }),

  createClubFromResearch({
    name: "Aramis Dance by Leo Kardos Satu Mare",
    sportType: "dans",
    city: "Satu Mare",
    district: "N/A",
    address: "Strada Ialomiței 16, Satu Mare",
    phone: "+40 752 923 716",
    description:
      "Aramis Dance by Leo Kardos Satu Mare oferă cursuri de dans pentru copii cu vârste între 5 și 8 ani, precum și pentru adulți, inclusiv salsa, bachata și kizomba. Adresa: Str. Ialomiței, nr. 16.",
    researchNotes:
      "Dans pentru copii 5-8 ani și adulți, stiluri: salsa, bachata, kizomba, Str. Ialomiței 16",
    ageGroups: [5, 6, 7, 8],
  }),

  // ========== SCRIMĂ ==========
  createClubFromResearch({
    name: "CSM Olimpia Satu Mare - Secția de Scrimă",
    sportType: "scrima",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    website: "https://csmolimpia.ro/",
    description:
      "Clubul Sportiv Municipal Olimpia Satu Mare cu secție de scrimă pentru copii și juniori. Clubul are grupe dedicate pentru copii și juniori în acest sport.",
    researchNotes: "Secție scrimă, grupe pentru copii și juniori",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CS Dinamo M.S.M. Satu Mare - Secția de Atletism",
    sportType: "atletism",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv 'Dinamo M.S.M.' Satu Mare cu secție de atletism pentru copii și juniori. Clubul oferă programe în multiple discipline sportive, incluzând atletism.",
    researchNotes: "Parte din CS Dinamo M.S.M., multiple secții sportive",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport clubs) ==========
  createClubFromResearch({
    name: "CSM Olimpia Satu Mare",
    sportType: "multi-sport",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    website: "https://csmolimpia.ro/",
    description:
      "Clubul Sportiv Municipal Olimpia Satu Mare, fondat de Consiliul Municipal Satu Mare în 2007, este un club sportiv polisportiv având ca scop oferirea accesului la diverse sporturi atât pentru recreere, cât și pentru performanță. Clubul include secții pentru următoarele sporturi: baschet feminin, handbal masculin, volei feminin, fotbal, scrimă, judo, karate, șah, popice și înot. Organizează periodic evenimente precum 'Alege un sport!' în colaborare cu Primăria Municipiului Satu Mare și Centrul Cultural G.M. Zamfirescu.",
    researchNotes:
      "Fondat 2007, club polisportiv, secții: baschet, handbal, volei, fotbal, scrimă, judo, karate, șah, popice, înot, organizare evenimente 'Alege un sport!'",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Dacia 2003 Satu Mare",
    sportType: "multi-sport",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv 'Dacia 2003' Satu Mare oferă programe în multiple discipline sportive: volei, fotbal, handbal, tenis de masă, șah, tir, arte, schi, tenis de câmp, biliard, înot, fotbal-tenis, popice și judo. Clubul oferă oportunități pentru copii și tineri să practice diverse sporturi.",
    researchNotes:
      "Multiple secții: volei, fotbal, handbal, tenis de masă, șah, tir, arte, schi, tenis de câmp, biliard, înot, fotbal-tenis, popice, judo",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Dinamo M.S.M. Satu Mare",
    sportType: "multi-sport",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    description:
      "Clubul Sportiv 'Dinamo M.S.M.' Satu Mare oferă programe în multiple discipline sportive: fotbal, baschet, handbal, culturism, karate, tenis de masă, tenis, tir și atletism. Clubul oferă oportunități pentru copii și tineri să practice diverse sporturi.",
    researchNotes:
      "Multiple secții: fotbal, baschet, handbal, culturism, karate, tenis de masă, tenis, tir, atletism",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Satu Mare",
    sportType: "multi-sport",
    city: "Satu Mare",
    district: "N/A",
    address: "Bulevardul Traian, nr. 20, Satu Mare",
    phone: "+40 361 802 171",
    email: "palatsm@gmail.com",
    website: "https://www.palatulcopiilorsatumare.ro/",
    description:
      "Palatul Copiilor Satu Mare este o instituție educațională dedicată activităților extrașcolare, oferind copiilor și tinerilor oportunități de a-și dezvolta abilitățile și pasiunile în diverse domenii, incluzând activități sportive. Instituția are o tradiție îndelungată în organizarea de programe educative și recreative pentru copii și tineri.",
    researchNotes:
      "Instituție educațională, activități extrașcolare incluzând sportive, tradiție îndelungată, Bd. Traian 20",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Satu Mare - Clubul Sportiv Școlar",
    sportType: "multi-sport",
    city: "Satu Mare",
    district: "N/A",
    address: "Satu Mare",
    website: "https://lpssm.ro/",
    description:
      "Liceul cu Program Sportiv Satu Mare, fondat în 1992, combină educația academică cu pregătirea sportivă, având clase de la nivel primar până la liceal. În 1993, Clubul Sportiv Școlar a devenit o secție anexă a liceului, instituția purtând denumirea de Liceul cu Program Sportiv – Clubul Sportiv Școlar. Instituția oferă programe educaționale cu profil sportiv pentru elevi.",
    researchNotes:
      "Fondat 1992, liceu cu profil sportiv (primar-liceal), CSS secție anexă din 1993, combină educație academică cu pregătire sportivă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

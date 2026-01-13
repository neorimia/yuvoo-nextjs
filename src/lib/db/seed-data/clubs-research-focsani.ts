/**
 * Clubs Research Data - Focșani
 *
 * Date reale colectate prin research public pentru cluburi sportive din Focșani.
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
 * Research Data - Cluburi Sportive Focșani
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_FOCSANI: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "CSM Focșani 2007 - Centrul de Copii și Juniori",
    sportType: "fotbal",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    website: "https://csmfocsani2007.ro/",
    description:
      "CSM Focșani 2007 oferă oportunități pentru copiii și juniorii pasionați de fotbal prin Centrul său de Copii și Juniori. În perioada 29 iulie – 11 august 2024, clubul a organizat înscrieri pentru grupele de vârstă 2010-2015 (băieți) și 2012-2015 (fete). CSM Focșani 2007 a participat la turneul final al Memorialului 'Gheorghe Ola' în 2015, alături de alte echipe de prestigiu, precum Academia Hagi. În 2018, clubul a încheiat un parteneriat cu Academia de Fotbal 'Gheorghe Hagi' și FC Viitorul Constanța, oferind juniorilor cu vârste între 10 și 15 ani șansa de a se antrena și de a fi promovați la nivel național și internațional. CSM Focșani 2007 a participat în Liga 2, Seria 1, în sezonul 2024.",
    researchNotes:
      "Centru de Copii și Juniori, înscrieri grupe 2010-2015 (băieți) și 2012-2015 (fete), participare Memorialul 'Gheorghe Ola' 2015 (alături de Academia Hagi), parteneriat cu Academia Hagi și FC Viitorul Constanța 2018 (juniori 10-15 ani), participare Liga 2 Seria 1 sezonul 2024",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "F.C. Unirea 2002 Focșani - Secția de Fotbal",
    sportType: "fotbal",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    description:
      "F.C. Unirea 2002 Focșani este un club de drept privat cu secții în atletism, baschet, fotbal, handbal, tenis și volei. Clubul oferă programe sportive pentru copii și juniori în diverse discipline, inclusiv fotbal.",
    researchNotes: "Parte din F.C. Unirea 2002 Focșani, club de drept privat, secții multiple",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSM Focșani 2007 - Secția de Baschet",
    sportType: "baschet",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    website: "https://csmfocsani2007.ro/",
    description:
      "Clubul Sportiv Municipal Focșani 2007 cu secție de baschet pentru copii și juniori. CSM Focșani 2007 este un club polisportiv care include secții pentru diverse discipline sportive. Echipa de baschet masculin a CSM Focșani a fost fondată în 2017 și a participat în Liga Națională și Liga I. În sezonul 2023-2024, echipa a retrogradat în Liga I, iar în iunie 2025, clubul a fost retras din competiții și ulterior dizolvat.",
    researchNotes:
      "Parte din CSM Focșani 2007, echipa seniori: fondată 2017, participare Liga Națională și Liga I, retrogradat Liga I 2023-2024, retras din competiții iunie 2025",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Focșani - Secția de Baschet",
    sportType: "baschet",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    website: "https://www.cssfocsani.ro/",
    description:
      "Clubul Sportiv Școlar Focșani cu secție de baschet pentru copii și juniori. CSS Focșani este o instituție de învățământ cu program sportiv suplimentar, subordonată Ministerului Educației și Cercetării și Inspectoratului Școlar Județean Vrancea. Clubul are cinci grupe de începători și două grupe de avansați la baschet. Rolul său principal este de a depista, selecționa, pregăti și participa în competiții cu sportivi în vederea obținerii performanțelor sportive și promovării spre înaltă performanță.",
    researchNotes:
      "Parte din CSS Focșani, instituție cu program sportiv suplimentar, subordonată ME și ISJ Vrancea, 5 grupe începători și 2 grupe avansați baschet, depistare, selecție, pregătire și participare competiții pentru performanță",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "F.C. Unirea 2002 Focșani - Secția de Baschet",
    sportType: "baschet",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    description:
      "F.C. Unirea 2002 Focșani este un club de drept privat cu secții în atletism, baschet, fotbal, handbal, tenis și volei. Clubul oferă programe sportive pentru copii și juniori în diverse discipline, inclusiv baschet.",
    researchNotes: "Parte din F.C. Unirea 2002 Focșani, club de drept privat, secții multiple",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CSM Focșani 2007 - Secția de Volei",
    sportType: "volei",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    website: "https://csmfocsani2007.ro/",
    description:
      "Clubul Sportiv Municipal Focșani 2007 cu secție de volei pentru copii și juniori. În 2024, CSM Focșani 2007 a înființat patru echipe de volei pentru copii, însumând 60 de jucătoare legitimate. Aceste echipe participă în campionatele naționale de volei la categoriile 'Speranțe' și 'Minivolei'. CSM Focșani 2007 este un club polisportiv care include secții pentru diverse discipline sportive.",
    researchNotes:
      "Parte din CSM Focșani 2007, 4 echipe de volei pentru copii (60 jucătoare legitimate, înființate 2024), participare campionatele naționale: 'Speranțe' și 'Minivolei'",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Focșani - Secția de Volei",
    sportType: "volei",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    website: "https://www.cssfocsani.ro/",
    description:
      "Clubul Sportiv Școlar Focșani cu secție de volei pentru copii și juniori. CSS Focșani este o instituție de învățământ cu program sportiv suplimentar, subordonată Ministerului Educației și Cercetării și Inspectoratului Școlar Județean Vrancea. Clubul are două grupe de începători și două grupe de avansați la volei. Rolul său principal este de a depista, selecționa, pregăti și participa în competiții cu sportivi în vederea obținerii performanțelor sportive și promovării spre înaltă performanță.",
    researchNotes:
      "Parte din CSS Focșani, 2 grupe începători și 2 grupe avansați volei, depistare, selecție, pregătire și participare competiții pentru performanță",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "F.C. Unirea 2002 Focșani - Secția de Volei",
    sportType: "volei",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    description:
      "F.C. Unirea 2002 Focșani este un club de drept privat cu secții în atletism, baschet, fotbal, handbal, tenis și volei. Clubul oferă programe sportive pentru copii și juniori în diverse discipline, inclusiv volei.",
    researchNotes: "Parte din F.C. Unirea 2002 Focșani, club de drept privat, secții multiple",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSM Focșani 2007 - Secția de Handbal",
    sportType: "handbal",
    city: "Focșani",
    district: "N/A",
    address: "Sala Sporturilor Vrancea, Focșani",
    website: "https://csmfocsani2007.ro/",
    description:
      "Clubul Sportiv Municipal Focșani 2007 cu secție de handbal pentru copii și juniori. CSM Focșani 2007 este un club polisportiv care include secții pentru diverse discipline sportive. Echipa de handbal masculin a CSM Focșani activează în Liga Națională, jucându-și meciurile de acasă în Sala Sporturilor 'Vrancea', cu o capacitate de 2.000 de locuri.",
    researchNotes:
      "Parte din CSM Focșani 2007, echipa seniori: Liga Națională, meciuri Sala Sporturilor 'Vrancea' (2.000 locuri)",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Focșani - Secția de Handbal",
    sportType: "handbal",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    website: "https://www.cssfocsani.ro/",
    description:
      "Clubul Sportiv Școlar Focșani cu secție de handbal pentru copii și juniori. CSS Focșani este o instituție de învățământ cu program sportiv suplimentar, subordonată Ministerului Educației și Cercetării și Inspectoratului Școlar Județean Vrancea. Clubul are două grupe de începători și două grupe de avansați la handbal. Rolul său principal este de a depista, selecționa, pregăti și participare în competiții cu sportivi în vederea obținerii performanțelor sportive și promovării spre înaltă performanță.",
    researchNotes:
      "Parte din CSS Focșani, 2 grupe începători și 2 grupe avansați handbal, depistare, selecție, pregătire și participare competiții pentru performanță",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "F.C. Unirea 2002 Focșani - Secția de Handbal",
    sportType: "handbal",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    description:
      "F.C. Unirea 2002 Focșani este un club de drept privat cu secții în atletism, baschet, fotbal, handbal, tenis și volei. Clubul oferă programe sportive pentru copii și juniori în diverse discipline, inclusiv handbal.",
    researchNotes: "Parte din F.C. Unirea 2002 Focșani, club de drept privat, secții multiple",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "Tenis Club Focșani",
    sportType: "tenis",
    city: "Focșani",
    district: "N/A",
    address: "Strada Carpați nr. 4/9, Focșani",
    website: "https://tenisclubfocsani.ro/",
    description:
      "Tenis Club Focșani este un club sportiv dedicat tenisului, situat în Focșani, județul Vrancea. Clubul oferă cursuri de tenis pentru copii și adulți, pe terenuri de tenis cu zgură sau iarbă la standarde înalte. Clubul organizează diverse evenimente și competiții, precum 'Junior Vrancea Trophy', un turneu internațional pentru jucători sub 16 ani, desfășurat în iulie 2025, la care au participat peste 150 de sportivi din 13 țări. De asemenea, clubul a organizat evenimente pentru copii, cum ar fi 'Kids Day Vrancea Trophy 2025', pe 31 mai 2025, oferind activități precum meciuri demonstrative, sesiuni de joc și autografe cu sportive de nivel internațional. Clubul are o echipă de antrenori calificați, inclusiv pe Răzvan Bucuroiu (antrenor național Categoria a III-a și antrenor internațional Global Professional Tennis Coaches Association, Level B) și pe Bogdan Nicolae (antrenor național Categoria a IV-a).",
    researchNotes:
      "Terenuri zgură și iarbă standarde înalte, organizare 'Junior Vrancea Trophy' - turneu internațional sub 16 ani iulie 2025 (peste 150 sportivi din 13 țări), 'Kids Day Vrancea Trophy 2025' - 31 mai 2025 (meciuri demonstrative, sesiuni joc, autografe), antrenori: Răzvan Bucuroiu (antrenor național Cat. III, antrenor internațional GPTC Level B), Bogdan Nicolae (antrenor național Cat. IV), Str. Carpați nr. 4/9",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Unirea Focșani - Secția de Tenis",
    sportType: "tenis",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    description:
      "Clubul Sportiv 'Unirea' Focșani este un club de drept public cu secții în arte marțiale, atletism, box, judo, radioamatorism, tenis și tenis de masă. Clubul oferă programe sportive pentru copii și juniori în diverse discipline, inclusiv tenis.",
    researchNotes:
      "Parte din CS Unirea Focșani, club de drept public, secții: arte marțiale, atletism, box, judo, radioamatorism, tenis, tenis de masă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "F.C. Unirea 2002 Focșani - Secția de Tenis",
    sportType: "tenis",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    description:
      "F.C. Unirea 2002 Focșani este un club de drept privat cu secții în atletism, baschet, fotbal, handbal, tenis și volei. Clubul oferă programe sportive pentru copii și juniori în diverse discipline, inclusiv tenis.",
    researchNotes: "Parte din F.C. Unirea 2002 Focșani, club de drept privat, secții multiple",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS DE MASĂ (Table Tennis) ==========
  createClubFromResearch({
    name: "CS Unirea Focșani - Secția de Tenis de Masă",
    sportType: "tenis-de-masa",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    description:
      "Clubul Sportiv 'Unirea' Focșani este un club de drept public cu secții în arte marțiale, atletism, box, judo, radioamatorism, tenis și tenis de masă. Clubul oferă programe sportive pentru copii și juniori în diverse discipline, inclusiv tenis de masă.",
    researchNotes:
      "Parte din CS Unirea Focșani, club de drept public, secții: arte marțiale, atletism, box, judo, radioamatorism, tenis, tenis de masă",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Bazinul de Înot Didactic Focșani",
    sportType: "inot",
    city: "Focșani",
    district: "N/A",
    address: "Strada Aleea Stadionului nr. 2, Focșani",
    phone: "+40 724 230 930",
    email: "bazininot@cjvrancea.ro",
    description:
      "Bazinul de Înot Didactic din Focșani oferă cursuri de inițiere în înot pentru copii și adulți, înot de performanță, înot de agrement și înot pentru recuperare medicală. Elevii beneficiază de 10 ședințe gratuite, oferite de Consiliul Județean Vrancea. Bazinul este situat pe strada Aleea Stadionului nr. 2, Focșani.",
    researchNotes:
      "Cursuri: inițiere (copii și adulți), performanță, agrement, recuperare medicală, elevi: 10 ședințe gratuite oferite de Consiliul Județean Vrancea, Str. Aleea Stadionului nr. 2",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CS Unirea Focșani - Secția de Atletism",
    sportType: "atletism",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    description:
      "Clubul Sportiv 'Unirea' Focșani cu secție de atletism pentru copii și juniori. În mai 2023, tinerii atleți ai clubului au obținut rezultate remarcabile la competiția 'Cupa Alessia' din Fălticeni, câștigând multiple medalii. Clubul este un club de drept public cu secții în arte marțiale, atletism, box, judo, radioamatorism, tenis și tenis de masă.",
    researchNotes:
      "Parte din CS Unirea Focșani, rezultate remarcabile 'Cupa Alessia' Fălticeni mai 2023 (multiple medalii), club de drept public",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "F.C. Unirea 2002 Focșani - Secția de Atletism",
    sportType: "atletism",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    description:
      "F.C. Unirea 2002 Focșani este un club de drept privat cu secții în atletism, baschet, fotbal, handbal, tenis și volei. Clubul oferă programe sportive pentru copii și juniori în diverse discipline, inclusiv atletism.",
    researchNotes: "Parte din F.C. Unirea 2002 Focșani, club de drept privat, secții multiple",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "CSS Focșani - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    website: "https://www.cssfocsani.ro/",
    description:
      "Clubul Sportiv Școlar Focșani cu secție de gimnastică pentru copii și juniori. CSS Focșani este o instituție de învățământ cu program sportiv suplimentar, subordonată Ministerului Educației și Cercetării și Inspectoratului Școlar Județean Vrancea, specializată în gimnastică. Rolul său principal este de a depista, selecționa, pregăti și participare în competiții cu sportivi în vederea obținerii performanțelor sportive și promovării spre înaltă performanță.",
    researchNotes:
      "Parte din CSS Focșani, specializată în gimnastică, instituție cu program sportiv suplimentar, subordonată ME și ISJ Vrancea, depistare, selecție, pregătire și participare competiții pentru performanță",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CSM Focșani 2007 - Secția de Judo",
    sportType: "judo",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    website: "https://csmfocsani2007.ro/",
    description:
      "Clubul Sportiv Municipal Focșani 2007 cu secție de judo pentru copii și juniori. CSM Focșani 2007 este un club polisportiv care include secții pentru diverse discipline sportive, inclusiv arte marțiale și judo.",
    researchNotes: "Parte din CSM Focșani 2007, club polisportiv, secții: arte marțiale, judo",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Unirea Focșani - Secția de Judo",
    sportType: "judo",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    description:
      "Clubul Sportiv 'Unirea' Focșani cu secție de judo pentru copii și juniori. Clubul este un club de drept public cu secții în arte marțiale, atletism, box, judo, radioamatorism, tenis și tenis de masă.",
    researchNotes:
      "Parte din CS Unirea Focșani, club de drept public, secții: arte marțiale, atletism, box, judo, radioamatorism, tenis, tenis de masă",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Unirea Focșani - Secția de Arte Marțiale",
    sportType: "karate",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    description:
      "Clubul Sportiv 'Unirea' Focșani cu secție de arte marțiale pentru copii și juniori. Clubul este un club de drept public cu secții în arte marțiale, atletism, box, judo, radioamatorism, tenis și tenis de masă.",
    researchNotes:
      "Parte din CS Unirea Focșani, club de drept public, secții: arte marțiale, atletism, box, judo, radioamatorism, tenis, tenis de masă",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport clubs) ==========
  createClubFromResearch({
    name: "CSS Focșani",
    sportType: "multi-sport",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    website: "https://www.cssfocsani.ro/",
    description:
      "Clubul Sportiv Școlar Focșani este o instituție de învățământ cu program sportiv suplimentar, subordonată Ministerului Educației și Cercetării și Inspectoratului Școlar Județean Vrancea. Rolul său principal este de a depista, selecționa, pregăti și participare în competiții cu sportivi în vederea obținerii performanțelor sportive și promovării spre înaltă performanță. Clubul oferă programe pentru copii în baschet, handbal și volei, cu grupe organizate pe niveluri (începători și avansați): baschet (5 grupe începători, 2 grupe avansați), handbal (2 grupe începători, 2 grupe avansați), volei (2 grupe începători, 2 grupe avansați). Clubul este specializat în gimnastică și oferă programe pentru copii în această disciplină.",
    researchNotes:
      "Instituție cu program sportiv suplimentar, subordonată ME și ISJ Vrancea, specializată gimnastică, secții: baschet (5 grupe începători, 2 grupe avansați), handbal (2 grupe începători, 2 grupe avansați), volei (2 grupe începători, 2 grupe avansați), gimnastică, depistare, selecție, pregătire și participare competiții pentru performanță",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Focșani 2007",
    sportType: "multi-sport",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    website: "https://csmfocsani2007.ro/",
    description:
      "Clubul Sportiv Municipal Focșani 2007 este un club polisportiv de drept public cu secții active în arte marțiale, atletism, baschet, handbal, judo, șah, tenis de câmp, tir sportiv și volei. Clubul oferă programe pentru copii și juniori în diverse discipline. Echipa de handbal masculin activează în Liga Națională, jucându-și meciurile în Sala Sporturilor 'Vrancea' (2.000 locuri). În 2024, clubul a înființat patru echipe de volei pentru copii (60 jucătoare legitimate), participând în campionatele naționale la categoriile 'Speranțe' și 'Minivolei'. CSM Focșani 2007 are un Centru de Copii și Juniori pentru fotbal, organizând înscrieri pentru grupele 2010-2015 (băieți) și 2012-2015 (fete), și a încheiat parteneriate cu Academia Hagi și FC Viitorul Constanța.",
    researchNotes:
      "Club polisportiv de drept public, secții: arte marțiale, atletism, baschet, handbal, judo, șah, tenis de câmp, tir sportiv, volei, handbal masculin Liga Națională (Sala Sporturilor 'Vrancea' 2.000 locuri), 4 echipe volei copii 2024 (60 jucătoare), Centru de Copii și Juniori fotbal (grupe 2010-2015 băieți, 2012-2015 fete), parteneriate cu Academia Hagi și FC Viitorul Constanța",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Focșani - Clubul Sportiv Școlar",
    sportType: "multi-sport",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    website: "https://www.lpsfocsani.ro/",
    description:
      "Liceul cu Program Sportiv Focșani este o instituție de învățământ vocațională cu profil sportiv, înființată în 1992, care oferă programe educaționale pentru elevii pasionați de sport. Conform planului de școlarizare, liceul dispune de 20 de clase, dintre care 6 clase de gimnaziu și 14 clase de liceu, toate cu profil sportiv și specializarea instructor sportiv. Elevii LPS Focșani participă activ la diverse competiții sportive, obținând rezultate remarcabile. De exemplu, la Campionatul Național Școlar de Atletism din iunie 2025, sportivii liceului au câștigat patru medalii, inclusiv o medalie de aur obținută de Mocanu Larisa Andreea la proba de 400 metri garduri. Liceul are secții sportive în atletism, baschet, fotbal, handbal, judo, rugby și volei.",
    researchNotes:
      "Înființat 1992, instituție vocațională cu profil sportiv, 20 clase (6 gimnaziu, 14 liceu), specializare instructor sportiv, secții: atletism, baschet, fotbal, handbal, judo, rugby, volei, rezultate remarcabile (4 medalii Campionatul Național Școlar de Atletism iunie 2025, inclusiv 1 aur - Mocanu Larisa Andreea 400m garduri), probă aptitudini: cerere, anexă fișă înscriere, adeverință medicală 'APT PENTRU'",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Unirea Focșani",
    sportType: "multi-sport",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    description:
      "Clubul Sportiv 'Unirea' Focșani este un club de drept public cu secții în arte marțiale, atletism, box, judo, radioamatorism, tenis și tenis de masă. Clubul oferă programe sportive pentru copii și juniori în diverse discipline. În mai 2023, tinerii atleți ai clubului au obținut rezultate remarcabile la competiția 'Cupa Alessia' din Fălticeni, câștigând multiple medalii.",
    researchNotes:
      "Club de drept public, secții: arte marțiale, atletism, box, judo, radioamatorism, tenis, tenis de masă, rezultate remarcabile 'Cupa Alessia' Fălticeni mai 2023 (multiple medalii atletism)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "F.C. Unirea 2002 Focșani",
    sportType: "multi-sport",
    city: "Focșani",
    district: "N/A",
    address: "Focșani",
    description:
      "F.C. Unirea 2002 Focșani este un club de drept privat cu secții în atletism, baschet, fotbal, handbal, tenis și volei. Clubul oferă programe sportive pentru copii și juniori în diverse discipline.",
    researchNotes:
      "Club de drept privat, secții: atletism, baschet, fotbal, handbal, tenis, volei, programe sportive pentru copii și juniori",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

/**
 * Clubs Research Data - Bistrița
 *
 * Date reale colectate prin research public pentru cluburi sportive din Bistrița.
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
 * Research Data - Cluburi Sportive Bistrița
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_BISTRITA: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "CS Gloria 2018 Bistrița-Năsăud - Secția de Fotbal",
    sportType: "fotbal",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "CS Gloria 2018 Bistrița-Năsăud cu secție de fotbal pentru copii și juniori. Clubul pune un accent deosebit pe dezvoltarea tinerelor talente prin intermediul academiei sale de fotbal, care include multiple grupe de copii și juniori, de la U7 până la U19. Aceste echipe participă în diverse competiții organizate de Federația Română de Fotbal și Asociația Județeană de Fotbal Bistrița-Năsăud. În 2022, CS Gloria 2018 Bistrița-Năsăud a extins programul său de formare a tinerilor sportivi în comuna Căianu Mic, înființând grupe de copii și juniori la fotbal și handbal. Antrenamentele se desfășoară pe terenurile de sport din Dobric și Căianu Mare, precum și în sala de sport din Căianu Mic. În sezonul 2024-2025, echipa de fotbal masculin a promovat în Liga 2 a Campionatului Național de Fotbal, evoluând pe Stadionul 'Jean Pădureanu' din Bistrița.",
    researchNotes:
      "Academie fotbal: grupe copii și juniori U7-U19, participare competiții FRF și AJF Bistrița-Năsăud, extindere program 2022 în comuna Căianu Mic (tereni Dobric și Căianu Mare, sala Căianu Mic), echipa seniori: promovat Liga 2 sezonul 2024-2025, meciuri Stadionul 'Jean Pădureanu'",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CS Gloria 2018 Bistrița-Năsăud - Secția de Baschet",
    sportType: "baschet",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "CS Gloria 2018 Bistrița-Năsăud cu secție de baschet pentru copii și juniori. Clubul este o instituție de referință în peisajul sportiv local, național și internațional, promovând și dezvoltând multiple ramuri sportive, inclusiv baschet.",
    researchNotes:
      "Parte din CS Gloria 2018 Bistrița-Năsăud, instituție de referință sportiv local, național și internațional, promovare și dezvoltare multiple ramuri sportive",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Bistrița - Secția de Baschet",
    sportType: "baschet",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "Clubul Sportiv Municipal Bistrița cu secție de baschet pentru copii și juniori. CSM Bistrița organizează cursuri și antrenamente pentru copii în sporturi precum handbal, volei și baschet. CSM Bistrița este cunoscut pentru promovarea sportului de performanță în rândul tinerilor.",
    researchNotes:
      "Parte din CSM Bistrița, cunoscut pentru promovarea sportului de performanță în rândul tinerilor, secții: handbal, volei, baschet",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CS Gloria 2018 Bistrița-Năsăud - Secția de Volei",
    sportType: "volei",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "CS Gloria 2018 Bistrița-Năsăud cu secție de volei pentru copii și juniori. Clubul este o instituție de referință în peisajul sportiv local, național și internațional, promovând și dezvoltând multiple ramuri sportive, inclusiv volei.",
    researchNotes:
      "Parte din CS Gloria 2018 Bistrița-Năsăud, instituție de referință sportiv local, național și internațional, promovare și dezvoltare multiple ramuri sportive",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Bistrița - Secția de Volei",
    sportType: "volei",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "Clubul Sportiv Municipal Bistrița cu secție de volei pentru copii și juniori. CSM Bistrița organizează cursuri și antrenamente pentru copii în sporturi precum handbal, volei și baschet. CSM Bistrița este cunoscut pentru promovarea sportului de performanță în rândul tinerilor.",
    researchNotes:
      "Parte din CSM Bistrița, cunoscut pentru promovarea sportului de performanță în rândul tinerilor, secții: handbal, volei, baschet",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CS Gloria 2018 Bistrița-Năsăud - Secția de Handbal",
    sportType: "handbal",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "CS Gloria 2018 Bistrița-Năsăud cu secție de handbal pentru copii și juniori. Clubul este o instituție de referință în peisajul sportiv local, național și internațional, promovând și dezvoltând multiple ramuri sportive, inclusiv handbal. Echipa de handbal feminin a clubului (Gloria Bistrița) este cunoscută pentru performanțele sale remarcabile. În sezonul 2024-2025, echipa a participat pentru prima dată în Liga Campionilor EHF, obținând victorii notabile, inclusiv împotriva echipei norvegiene Storhamar Handball Elite (29-26), Borussia Dortmund (36-32) și CSM București (30-26). În sezonul 2025-2026 al Ligii Florilor, Gloria Bistrița a obținut o victorie categorică împotriva CSM Galați, cu scorul de 46-20, consolidându-și poziția în fruntea clasamentului. În 2022, CS Gloria 2018 Bistrița-Năsăud a extins programul său de formare a tinerilor sportivi în comuna Căianu Mic, înființând grupe de copii și juniori la fotbal și handbal. Antrenamentele se desfășoară pe terenurile de sport din Dobric și Căianu Mare, precum și în sala de sport din Căianu Mic.",
    researchNotes:
      "Parte din CS Gloria 2018 Bistrița-Năsăud, echipa feminină Gloria Bistrița: participare Liga Campionilor EHF sezonul 2024-2025 (victorii: Storhamar Handball Elite 29-26, Borussia Dortmund 36-32, CSM București 30-26), sezonul 2025-2026 Liga Florilor (victorie CSM Galați 46-20), extindere program 2022 în comuna Căianu Mic (tereni Dobric și Căianu Mare, sala Căianu Mic)",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Bistrița - Secția de Handbal",
    sportType: "handbal",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "Clubul Sportiv Municipal Bistrița cu secție de handbal pentru copii și juniori. CSM Bistrița organizează cursuri și antrenamente pentru copii în sporturi precum handbal, volei și baschet. CSM Bistrița este cunoscut pentru promovarea sportului de performanță în rândul tinerilor.",
    researchNotes:
      "Parte din CSM Bistrița, cunoscut pentru promovarea sportului de performanță în rândul tinerilor, secții: handbal, volei, baschet",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "Tenis Club Parc Bistrița",
    sportType: "tenis",
    city: "Bistrița",
    district: "N/A",
    address: "Stadionul Municipal, Strada Parcului nr. 1, Bistrița",
    description:
      "Tenis Club Parc Bistrița oferă facilități pentru practicarea tenisului și organizează diverse evenimente și turnee. Clubul este situat la Stadionul Municipal, pe Strada Parcului nr. 1, în Bistrița.",
    researchNotes:
      "Facilități tenis, organizare evenimente și turnee, Stadionul Municipal, Str. Parcului nr. 1",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Gloria 2018 Bistrița-Năsăud - Secția de Tenis",
    sportType: "tenis",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "CS Gloria 2018 Bistrița-Năsăud cu secție de tenis pentru copii și juniori. Clubul este o instituție de referință în peisajul sportiv local, național și internațional, promovând și dezvoltând multiple ramuri sportive, inclusiv tenis.",
    researchNotes:
      "Parte din CS Gloria 2018 Bistrița-Năsăud, instituție de referință sportiv local, național și internațional, promovare și dezvoltare multiple ramuri sportive",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS DE MASĂ (Table Tennis) ==========
  createClubFromResearch({
    name: "CS Gloria 2018 Bistrița-Năsăud - Secția de Tenis de Masă",
    sportType: "tenis-de-masa",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "CS Gloria 2018 Bistrița-Năsăud cu secție de tenis de masă pentru copii și juniori. Clubul este o instituție de referință în peisajul sportiv local, național și internațional, promovând și dezvoltând multiple ramuri sportive, inclusiv tenis de masă.",
    researchNotes:
      "Parte din CS Gloria 2018 Bistrița-Năsăud, instituție de referință sportiv local, național și internațional, promovare și dezvoltare multiple ramuri sportive",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Centrul Spa Schreiner Bistrița - Bazinul de Înot",
    sportType: "inot",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "Centrul Spa Schreiner Bistrița oferă cursuri de înot pentru copii, inclusiv lecții gratuite pentru elevii de clasa a IV-a, în cadrul programului 'Școala de înot' inițiat de Primăria Bistrița. Programul oferă sute de elevi posibilitatea de a participa la cursuri gratuite de înot finanțate de Primărie.",
    researchNotes:
      "Cursuri înot copii, program 'Școala de înot' Primăria Bistrița: lecții gratuite pentru elevi clasa a IV-a, sute de elevi participă la cursuri gratuite finanțate de Primărie",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Casa EMA Bistrița - Bazinul de Înot",
    sportType: "inot",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "Casa EMA Bistrița este un bazin din oraș unde se desfășoară cursuri de înot pentru copii, inclusiv în cadrul programului 'Școala de înot' inițiat de Primăria Bistrița. Aproximativ 300 de copii beneficiază deja de lecții gratuite de înot în cadrul acestui program.",
    researchNotes:
      "Bazin înot, cursuri copii, program 'Școala de înot' Primăria Bistrița: ~300 copii beneficiază deja de lecții gratuite",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CS Gloria 2018 Bistrița-Năsăud - Secția de Atletism",
    sportType: "atletism",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "CS Gloria 2018 Bistrița-Năsăud cu secție de atletism pentru copii și juniori. Clubul este o instituție de referință în peisajul sportiv local, național și internațional, promovând și dezvoltând multiple ramuri sportive, inclusiv atletism.",
    researchNotes:
      "Parte din CS Gloria 2018 Bistrița-Năsăud, instituție de referință sportiv local, național și internațional, promovare și dezvoltare multiple ramuri sportive",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "Alegria School Dance Bistrița",
    sportType: "gimnastica",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    website: "https://www.alegria-school-dance.com/",
    description:
      "Alegria School Dance este o asociație sportivă din Bistrița, fondată de Anamaria Cârdan (instructor de gimnastică ritmică) și Marin Antuanela (instructor coregraf cu experiență în balet). Școala oferă cursuri de balet și gimnastică ritmică pentru copii începând cu vârsta de 3 ani, promovând dezvoltarea armonioasă a corpului într-un mediu prietenos și ambițios. Elevii Alegria School Dance au obținut rezultate remarcabile la competiții naționale și internaționale. De exemplu, la Transilvania Dance Competition din aprilie 2022, au câștigat 22 de medalii și o bursă la o tabără de balet. De asemenea, la Sibiu Dance Competition din noiembrie 2023, micuțele dansatoare au strălucit pe scenă, iar Sara Șoș s-a calificat în top 15 la secțiunea de dans clasic, primind o bursă pentru a participa la International Dance Talent Competition Italia din iulie 2024. În iulie 2025, Alegria School Dance a organizat un spectacol caritabil de balet intitulat 'Coppélia' la Centrul Cultural Dacia din Bistrița. Evenimentul a avut ca scop strângerea de fonduri pentru a oferi unei eleve talentate șansa de a participa la tabere de balet.",
    researchNotes:
      "Fondată de Anamaria Cârdan (instructor gimnastică ritmică) și Marin Antuanela (instructor coregraf balet), cursuri: balet și gimnastică ritmică pentru copii de la 3 ani, dezvoltare armonioasă corp într-un mediu prietenos și ambițios, rezultate remarcabile: Transilvania Dance Competition aprilie 2022 (22 medalii + bursă tabără balet), Sibiu Dance Competition noiembrie 2023 (Sara Șoș: top 15 dans clasic, bursă International Dance Talent Competition Italia iulie 2024), spectacol caritabil 'Coppélia' iulie 2025 la Centrul Cultural Dacia Bistrița (strângere fonduri tabere balet)",
    ageGroups: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CS Karate Bistrița",
    sportType: "karate",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "CS Karate Bistrița organizează tabere și cursuri de karate pentru copii, colaborând cu diverse instituții pentru a oferi programe educative și sportive. Clubul este activ în promovarea karate-ului în rândul copiilor și tinerilor din Bistrița.",
    researchNotes:
      "Organizare tabere și cursuri karate copii, colaborare cu diverse instituții pentru programe educative și sportive, promovare karate în rândul copiilor și tinerilor",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Gloria 2018 Bistrița-Năsăud - Secția de Taekwondo WT",
    sportType: "taekwondo",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "CS Gloria 2018 Bistrița-Năsăud cu secție de taekwondo WT pentru copii și juniori. Clubul este o instituție de referință în peisajul sportiv local, național și internațional, promovând și dezvoltând multiple ramuri sportive, inclusiv taekwondo WT.",
    researchNotes:
      "Parte din CS Gloria 2018 Bistrița-Năsăud, instituție de referință sportiv local, național și internațional, promovare și dezvoltare multiple ramuri sportive",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Multi-sport clubs) ==========
  createClubFromResearch({
    name: "CS Gloria 2018 Bistrița-Năsăud",
    sportType: "multi-sport",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "Clubul Sportiv Gloria 2018 Bistrița-Năsăud este o instituție de referință în peisajul sportiv local, național și internațional. Clubul promovează și dezvoltă multiple ramuri sportive, inclusiv handbal, fotbal, atletism, volei, baschet, tenis, tenis de masă, gimnastică ritmică, taekwondo WT, golf, box, rugby, schi, lupte, arte marțiale de contact și motociclism. Echipa de handbal feminin (Gloria Bistrița) este cunoscută pentru performanțele sale remarcabile: participare Liga Campionilor EHF sezonul 2024-2025 (victorii: Storhamar Handball Elite 29-26, Borussia Dortmund 36-32, CSM București 30-26), sezonul 2025-2026 Liga Florilor (victorie CSM Galați 46-20). Academie fotbal: grupe copii și juniori U7-U19, participare competiții FRF și AJF Bistrița-Năsăud, extindere program 2022 în comuna Căianu Mic (tereni Dobric și Căianu Mare, sala Căianu Mic). Echipa de fotbal masculin seniori: promovat Liga 2 sezonul 2024-2025, meciuri Stadionul 'Jean Pădureanu'.",
    researchNotes:
      "Instituție de referință sportiv local, național și internațional, secții: handbal (Gloria Bistrița - Liga Campionilor EHF 2024-2025, Liga Florilor 2025-2026), fotbal (academie U7-U19, seniori Liga 2 2024-2025, Stadionul 'Jean Pădureanu'), atletism, volei, baschet, tenis, tenis de masă, gimnastică ritmică, taekwondo WT, golf, box, rugby, schi, lupte, arte marțiale de contact, motociclism, extindere program 2022 în comuna Căianu Mic",
    ageGroups: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Bistrița",
    sportType: "multi-sport",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "Clubul Sportiv Municipal Bistrița este un club polisportiv cunoscut pentru promovarea sportului de performanță în rândul tinerilor. CSM Bistrița organizează cursuri și antrenamente pentru copii în sporturi precum handbal, volei și baschet. CSM Bistrița este cunoscut pentru echipa sa de handbal feminin, Gloria Bistrița, care face parte din acest club.",
    researchNotes:
      "Club polisportiv, promovare sportului de performanță în rândul tinerilor, secții: handbal, volei, baschet, echipa handbal feminin Gloria Bistrița (parte din CSM)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Bistrița - Clubul Sportiv Școlar",
    sportType: "multi-sport",
    city: "Bistrița",
    district: "N/A",
    address: "Strada Calea Moldovei, Nr. 18, Bistrița",
    website: "https://lps-bistrita.ro/",
    description:
      "Liceul cu Program Sportiv Bistrița este o instituție de învățământ preuniversitar cu profil sportiv, situată pe Strada Calea Moldovei, Nr. 18, în Bistrița. Liceul oferă programe educaționale axate pe dezvoltarea abilităților sportive ale elevilor, combinând pregătirea academică cu antrenamentele în diverse discipline sportive. LPS Bistrița are o tradiție îndelungată în formarea tinerilor sportivi și participă la competiții naționale și internaționale. Liceul oferă programe pentru copii în diverse sporturi, inclusiv fotbal, handbal, volei și tenis de masă. În Campionatul Național U17, echipa de fotbal a LPS Bistrița a înregistrat diverse rezultate în meciurile împotriva CS Gloria 2018 Bistrița-Năsăud (înfrângere 3-1 pe 12 aprilie 2025, victorie 2-1 pe 10 noiembrie 2024). Echipele de handbal ale LPS Bistrița concurează în competiții naționale: echipa feminină de Juniori 2 a învins CSS 2 Baia Mare J2 cu 40-33 pe 16 mai 2025, iar echipa feminină de Juniori 3 a câștigat împotriva CS Gloria 2018 Bistrița-Năsăud J3 cu 32-27.",
    researchNotes:
      "Instituție preuniversitară cu profil sportiv, Str. Calea Moldovei, Nr. 18, programe educaționale axate pe dezvoltarea abilităților sportive, combinare pregătire academică cu antrenamente, tradiție îndelungată formare tineri sportivi, participare competiții naționale și internaționale, secții: fotbal, handbal, volei, tenis de masă, atletism, gimnastică ritmică, gimnastică artistică băieți, rezultate: fotbal U17 Campionatul Național (înfrângere 3-1 CS Gloria 2018 pe 12 aprilie 2025, victorie 2-1 pe 10 noiembrie 2024), handbal feminin Juniori 2 (victorie 40-33 CSS 2 Baia Mare J2 pe 16 mai 2025), handbal feminin Juniori 3 (victorie 32-27 CS Gloria 2018 J3)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Bistrița",
    sportType: "multi-sport",
    city: "Bistrița",
    district: "N/A",
    address: "Bistrița",
    description:
      "Clubul Sportiv Școlar Bistrița este o instituție dedicată formării și pregătirii tinerilor sportivi în diverse discipline. În anul școlar 2018-2019, CSS Bistrița a funcționat cu 27 de grupe de elevi, însumând 382 de sportivi, organizate pe niveluri de începători, avansați și performeri. Aceste grupe acoperă ramuri sportive precum atletism, fotbal, gimnastică ritmică, gimnastică artistică băieți, tenis de masă, volei băieți, handbal fete și băieți, schi fond. Clubul oferă programe de inițiere și performanță în diverse sporturi pentru copii, inclusiv baschet, volei și handbal.",
    researchNotes:
      "Instituție formare și pregătire tineri sportivi, 2018-2019: 27 grupe elevi (382 sportivi), organizare niveluri: începători, avansați, performeri, secții: atletism, fotbal, gimnastică ritmică, gimnastică artistică băieți, tenis de masă, volei băieți, handbal fete și băieți, schi fond, programe: inițiere și performanță în baschet, volei, handbal",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

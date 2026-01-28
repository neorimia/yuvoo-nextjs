/**
 * Clubs Research Data - Târgu Jiu
 *
 * Date reale colectate prin research public pentru cluburi sportive din Târgu Jiu.
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
 * Research Data - Cluburi Sportive Târgu Jiu
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_TARGU_JIU: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "CSM Târgu Jiu - Secția de Fotbal",
    sportType: "fotbal",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    website: "https://csmtargujiu.ro/",
    description:
      "CSM Târgu Jiu cu secție de fotbal pentru copii și juniori. Începând cu 1 iulie 2022, CSM Târgu Jiu a înființat o secție de fotbal pentru copii și juniori cu vârste între 7 și 12 ani, participând activ în competițiile organizate de Asociația Județeană de Fotbal Gorj. În vara anului 2023, echipele de juniori D și E, antrenate de Mario Găman și Dan Staicu, au participat la turneul 'Challenge Cup 2023' organizat de Academia Gheorghe Hagi, obținând rezultate notabile: locul 7 din 20 pentru juniorii E și locul 9 din 25 pentru juniorii D. În sezonul 2023-2024, echipa de juniori C a CSM Târgu Jiu a dominat Campionatul Județean, devenind campioană la categoria U15. Antrenată de Alin Poenaru și Cătălin Trofin, echipa a încheiat competiția cu o victorie categorică de 10-0 împotriva AS Kinder ML. CSM Târgu Jiu a fost fondat în 2024, continuând tradiția fotbalistică a orașului după desființarea echipei Pandurii Târgu Jiu. În sezonul 2024-2025, echipa de seniori a câștigat Liga IV - Gorj și a promovat în Liga III, câștigând toate cele 34 de meciuri ale sezonului. Antrenorul principal al echipei de seniori este Mario Găman.",
    researchNotes:
      "Înființat 1 iulie 2022 (secție copii și juniori), grupe 7-12 ani, participare competiții AJF Gorj, echipe juniori D și E: 'Challenge Cup 2023' Academia Hagi (locul 7 din 20 juniorii E, locul 9 din 25 juniorii D), juniori C: campioană U15 Campionatul Județean 2023-2024 (victorie 10-0 AS Kinder ML), echipa seniori fondată 2024, câștigat Liga IV - Gorj sezonul 2024-2025 (34 victorii consecutive), promovat Liga III, antrenori: Mario Găman, Dan Staicu, Alin Poenaru, Cătălin Trofin",
    ageGroups: [7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Asociația Club Sportiv Infinit 2013 Târgu Jiu - Secția de Fotbal",
    sportType: "fotbal",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    description:
      "Asociația Club Sportiv Infinit 2013 Târgu Jiu este o asociație care desfășoară activități sportive în multiple ramuri, inclusiv fotbal. Scopul său este selecționarea, inițierea și pregătirea sportivilor, precum și participarea la competiții sportive interne și internaționale.",
    researchNotes:
      "Asociație club sportiv, selecționare, inițiere și pregătire sportivi, participare competiții interne și internaționale",
    ageGroups: [7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "CSM Târgu Jiu - Secția de Baschet",
    sportType: "baschet",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    website: "https://csmtargujiu.ro/",
    description:
      "CSM Târgu Jiu cu secție de baschet pentru copii și juniori. Echipa de baschet masculin a CSM Târgu Jiu a fost înființată în 2017, succedând clubului Energia Târgu Jiu, și participă în Liga Națională. Clubul are echipe de baschet pentru copii și juniori, participând activ în competiții naționale. De exemplu, echipa de baschet masculin U13 a clubului a participat la turnee în Craiova, demonstrând angajamentul clubului în dezvoltarea tinerilor baschetbaliști.",
    researchNotes:
      "Echipa seniori: înființată 2017, succesoare Energia Târgu Jiu, participare Liga Națională, echipe copii și juniori, participare turnee Craiova (U13)",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Asociația Club Sportiv Infinit 2013 Târgu Jiu - Secția de Baschet",
    sportType: "baschet",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    description:
      "Asociația Club Sportiv Infinit 2013 Târgu Jiu este o asociație care desfășoară activități sportive în multiple ramuri, inclusiv baschet. Scopul său este selecționarea, inițierea și pregătirea sportivilor, precum și participarea la competiții sportive interne și internaționale.",
    researchNotes:
      "Asociație club sportiv, selecționare, inițiere și pregătire sportivi, participare competiții interne și internaționale",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "Asociația Club Sportiv Infinit 2013 Târgu Jiu - Secția de Volei",
    sportType: "volei",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    description:
      "Asociația Club Sportiv Infinit 2013 Târgu Jiu este o asociație care desfășoară activități sportive în multiple ramuri, inclusiv volei. Scopul său este selecționarea, inițierea și pregătirea sportivilor, precum și participarea la competiții sportive interne și internaționale.",
    researchNotes:
      "Asociație club sportiv, selecționare, inițiere și pregătire sportivi, participare competiții interne și internaționale",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSM Târgu Jiu - Secția de Handbal",
    sportType: "handbal",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    website: "https://csmtargujiu.ro/",
    description:
      "CSM Târgu Jiu cu secție de handbal pentru copii și juniori. Clubul oferă programe de handbal pentru copii și juniori, cu echipe care participă în competiții naționale. De exemplu, echipa de handbal masculin juniori 2 a clubului a încheiat recent un sezon competițional, obținând rezultate notabile.",
    researchNotes:
      "Echipe copii și juniori, participare competiții naționale, echipa masculină juniori 2 - rezultate notabile",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Universitar Constantin Brâncuși Târgu Jiu - Secția de Handbal",
    sportType: "handbal",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Strada Tineretului nr. 4, Târgu Jiu",
    website: "https://csucb.utgjiu.ro/",
    description:
      "Clubul Sportiv Universitar 'Constantin Brâncuși' din Târgu Jiu cu secție de handbal pentru copii și juniori. CSUCB se concentrează pe selecția, pregătirea și participarea la competiții interne și internaționale. Clubul are o secție activă de handbal, cu aproximativ 21 de sportivi legitimați, majoritatea fiind elevi și studenți.",
    researchNotes:
      "Parte din CSUCB, secție activă: ~21 sportivi legitimați (majoritatea elevi și studenți), selecție, pregătire și participare competiții interne și internaționale, Str. Tineretului nr. 4",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Asociația Club Sportiv Infinit 2013 Târgu Jiu - Secția de Handbal",
    sportType: "handbal",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    description:
      "Asociația Club Sportiv Infinit 2013 Târgu Jiu este o asociație care desfășoară activități sportive în multiple ramuri, inclusiv handbal. Scopul său este selecționarea, inițierea și pregătirea sportivilor, precum și participarea la competiții sportive interne și internaționale.",
    researchNotes:
      "Asociație club sportiv, selecționare, inițiere și pregătire sportivi, participare competiții interne și internaționale",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "CS Amicii Târgu Jiu",
    sportType: "tenis",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Bulevardul Constantin Brâncuși nr. 7, în incinta Stadionului Municipal, Târgu Jiu",
    phone: "+40 724 365 422",
    description:
      "CS Amicii Târgu Jiu oferă facilități pentru tenis și alte activități sportive. Clubul este situat în incinta Stadionului Municipal, pe Bulevardul Constantin Brâncuși nr. 7.",
    researchNotes:
      "Facilități tenis și alte activități sportive, în incinta Stadionului Municipal, B-dul Constantin Brâncuși nr. 7",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Tenis Club Next Level Târgu Jiu",
    sportType: "tenis",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Strada Dacia, cod poștal 210233, Târgu Jiu",
    description:
      "Asociația Club Sportiv Tenis Club Next Level Târgu Jiu este o asociație înființată pe 17 aprilie 2015, care are ca obiect principal de activitate activitățile cluburilor sportive. Clubul oferă programe de tenis pentru copii și juniori.",
    researchNotes:
      "Înființat 17 aprilie 2015, asociație club sportiv, activități cluburi sportive, Str. Dacia, cod poștal 210233",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Asociația Club Sportiv Infinit 2013 Târgu Jiu - Secția de Tenis",
    sportType: "tenis",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    description:
      "Asociația Club Sportiv Infinit 2013 Târgu Jiu este o asociație care desfășoară activități sportive în multiple ramuri, inclusiv tenis. Scopul său este selecționarea, inițierea și pregătirea sportivilor, precum și participarea la competiții sportive interne și internaționale.",
    researchNotes:
      "Asociație club sportiv, selecționare, inițiere și pregătire sportivi, participare competiții interne și internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS DE MASĂ (Table Tennis) ==========
  createClubFromResearch({
    name: "CS Universitar Constantin Brâncuși Târgu Jiu - Secția de Tenis de Masă",
    sportType: "tenis-de-masa",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Strada Tineretului nr. 4, Târgu Jiu",
    website: "https://csucb.utgjiu.ro/",
    description:
      "Clubul Sportiv Universitar 'Constantin Brâncuși' din Târgu Jiu cu secție de tenis de masă pentru copii și juniori. CSUCB se concentrează pe selecția, pregătirea și participarea la competiții interne și internaționale. Clubul dispune de 10 secții sportive, inclusiv tenis de masă, și promovează activități sportive la nivel universitar.",
    researchNotes:
      "Parte din CSUCB, 10 secții sportive, promovare activități sportive nivel universitar, selecție, pregătire și participare competiții interne și internaționale, Str. Tineretului nr. 4",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Bazinul de Înot Didactic Târgu Jiu",
    sportType: "inot",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    description:
      "Bazinul de Înot Didactic din Târgu Jiu oferă cursuri de inițiere pentru copii, susținute de instructori calificați. Programul este zilnic, de luni până duminică, între orele 08:30 și 23:00. Tarifele sunt de 10 lei pe oră pentru copii și 20 lei pentru adulți. Elevii însoțiți de profesorii de sport au acces gratuit. Apa are o temperatură de peste 27 de grade și respectă toate condițiile sanitare impuse.",
    researchNotes:
      "Cursuri inițiere copii, instructori calificați, program zilnic (L-D, 08:30-23:00), tarife: 10 lei/oră copii, 20 lei/oră adulți, elevi cu profesori: acces gratuit, apă: >27°C, respectă condiții sanitare",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    pricing: [{ type: "per_class", amount: 10, currency: "RON" }],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CS Pandurii Târgu Jiu - Secția de Atletism",
    sportType: "atletism",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    website: "https://pandurii-mts.ro/",
    description:
      "Clubul Sportiv Pandurii Târgu Jiu cu secție de atletism pentru copii și juniori. Clubul este înființat în 1989, subordonat Agenției Naționale pentru Sport și include secții de atletism, box, lupte și radioamatorism. Clubul dispune de facilități adecvate și antrenori specializați pentru a ghida tinerii sportivi în dezvoltarea abilităților lor atletice.",
    researchNotes:
      "Înființat 1989, subordonat Agenției Naționale pentru Sport, secții: atletism, box, lupte, radioamatorism, facilități adecvate, antrenori specializați",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Târgu Jiu - Secția de Atletism",
    sportType: "atletism",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    website: "https://csmtargujiu.ro/",
    description:
      "CSM Târgu Jiu cu secție de atletism pentru copii și juniori. Clubul include secții pentru diverse discipline sportive, precum atletism, baschet, handbal și fotbal. În 2024, CSM Târgu Jiu a înregistrat o creștere semnificativă a numărului de sportivi, ajungând la peste 1.200 în 2024.",
    researchNotes:
      "Parte din CSM Târgu Jiu, peste 1.200 sportivi în 2024, secții: atletism, baschet, handbal, fotbal",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "Asociația Club Sportiv Karate Kyokushinkai Târgu Jiu",
    sportType: "karate",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Școala Gimnazială Pompiliu Marcea, Târgu Jiu",
    website: "https://www.karatetargujiu.ro/",
    description:
      "Asociația Club Sportiv Karate Kyokushinkai Târgu Jiu își desfășoară activitatea în cadrul Școlii Gimnaziale Pompiliu Marcea. Înființat în 2013, clubul a atras copii și tineri dornici să adopte un stil de viață sănătos prin practicarea karate-ului kyokushin. Acest stil de arte marțiale contribuie la dezvoltarea atenției, concentrării mentale, curajului și încrederii în sine. Mulți dintre practicanții clubului au obținut rezultate remarcabile la competiții naționale și internaționale.",
    researchNotes:
      "Înființat 2013, activitate în cadrul Școlii Gimnaziale Pompiliu Marcea, karate kyokushin, stil de viață sănătos, dezvoltare: atenție, concentrare mentală, curaj, încredere în sine, rezultate remarcabile competiții naționale și internaționale",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Pandurii Târgu Jiu - Secția de Lupte",
    sportType: "lupte",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    website: "https://pandurii-mts.ro/",
    description:
      "Clubul Sportiv Pandurii Târgu Jiu cu secție de lupte pentru copii și juniori. Clubul este înființat în 1989, subordonat Agenției Naționale pentru Sport și include secții de atletism, box, lupte și radioamatorism.",
    researchNotes:
      "Înființat 1989, subordonat Agenției Naționale pentru Sport, secții: atletism, box, lupte, radioamatorism",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Târgu Jiu - Secția de Lupte",
    sportType: "lupte",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    description:
      "Clubul Sportiv Școlar Târgu Jiu cu secție de lupte pentru copii și juniori. În cadrul Liceului cu Program Sportiv funcționează și Clubul Sportiv Școlar (CSS) Târgu Jiu, care oferă programe de pregătire și competiții în diverse discipline sportive. Sportivii de la CSS Târgu Jiu au obținut rezultate remarcabile la competiții naționale, inclusiv medalii la Campionatul Național de lupte libere și lupte feminine.",
    researchNotes:
      "Parte din CSS Târgu Jiu (funcționează în cadrul LPS Târgu Jiu), rezultate remarcabile: medalii Campionatul Național de lupte libere și lupte feminine",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "Silver Dance Academy Târgu Jiu",
    sportType: "gimnastica",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    website: "https://www.silverdanceacademy.ro/",
    description:
      "Silver Dance Academy Târgu Jiu oferă cursuri de dans sportiv, dans modern, street dance, balet și gimnastică pentru copii. Abonamentele pentru copii începători includ 8 ședințe pe lună la prețul de 220 lei.",
    researchNotes:
      "Cursuri: dans sportiv, dans modern, street dance, balet, gimnastică, abonamente începători: 8 ședințe/lună la 220 lei",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    pricing: [{ type: "monthly", amount: 220, currency: "RON" }],
  }),

  // ========== MULTI-SPORT (Multi-sport clubs) ==========
  createClubFromResearch({
    name: "CSM Târgu Jiu",
    sportType: "multi-sport",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    website: "https://csmtargujiu.ro/",
    description:
      "Clubul Sportiv Municipal Târgu Jiu este un club polisportiv înființat sub tutela Primăriei Târgu Jiu, care include secții pentru diverse discipline sportive, precum fotbal, baschet, handbal și atletism. În 2024, CSM Târgu Jiu a înregistrat o creștere semnificativă a numărului de sportivi, ajungând la peste 1.200 în 2024. Începând cu 1 iulie 2022, CSM Târgu Jiu a înființat o secție de fotbal pentru copii și juniori cu vârste între 7 și 12 ani, alăturându-se astfel secțiilor existente de handbal, baschet, lupte, box și atletism. Echipa de baschet masculin a fost înființată în 2017, succedând clubului Energia Târgu Jiu, și participă în Liga Națională. Echipa de fotbal seniori a fost fondată în 2024, continuând tradiția fotbalistică a orașului după desființarea echipei Pandurii Târgu Jiu. În sezonul 2024-2025, echipa de fotbal seniori a câștigat Liga IV - Gorj și a promovat în Liga III, câștigând toate cele 34 de meciuri ale sezonului.",
    researchNotes:
      "Sub tutela Primăriei Târgu Jiu, peste 1.200 sportivi în 2024, secții: fotbal (copii și juniori 7-12 ani din 2022, seniori din 2024 - câștigat Liga IV - Gorj 2024-2025 cu 34 victorii consecutive, promovat Liga III), baschet (înființat 2017, succesoare Energia Târgu Jiu, Liga Națională), handbal, lupte, box, atletism, echipe copii și juniori rezultate remarcabile",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Universitar Constantin Brâncuși Târgu Jiu",
    sportType: "multi-sport",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Strada Tineretului nr. 4, Târgu Jiu",
    website: "https://csucb.utgjiu.ro/",
    description:
      "Clubul Sportiv Universitar 'Constantin Brâncuși' din Târgu Jiu este un club polisportiv care are secții pentru diverse sporturi, inclusiv fotbal, baschet, handbal și tenis de masă. CSUCB se concentrează pe selecția, pregătirea și participarea la competiții interne și internaționale. Clubul dispune de 10 secții sportive, inclusiv tenis de masă. Secția de handbal are o secție activă, cu aproximativ 21 de sportivi legitimați, majoritatea fiind elevi și studenți. Clubul promovează activități sportive la nivel universitar.",
    researchNotes:
      "Club polisportiv universitar, 10 secții sportive: fotbal, baschet, handbal, tenis de masă și altele, secție handbal: ~21 sportivi legitimați (majoritatea elevi și studenți), selecție, pregătire și participare competiții interne și internaționale, promovare activități sportive nivel universitar, Str. Tineretului nr. 4",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "LPS Târgu Jiu - Clubul Sportiv Școlar",
    sportType: "multi-sport",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    website: "https://lpstgjiu.ro/",
    description:
      "Liceul cu Program Sportiv Târgu Jiu oferă programe educaționale cu profil sportiv pentru elevi de la nivel primar până la liceu. Pentru anul școlar 2024-2025, liceul a propus 96 de locuri pentru clasa a IX-a, distribuite astfel: Fotbal băieți: 24 locuri, Fotbal fete: 12 locuri, Atletism: 12 locuri, Handbal fete: 12 locuri, Handbal băieți: 12 locuri, Mozaic (elevi sportivi legitimați la alte cluburi/asociații sportive din județul Gorj): 24 locuri. Pentru admitere, candidații trebuie să susțină probe de aptitudini sportive, conform calendarului stabilit de Ministerul Educației. Liceul dispune de facilități moderne, inclusiv săli de clasă, laboratoare, amfiteatru, cabinet de consiliere și orientare, cabinet medical, săli de sport și terenuri exterioare. În cadrul Liceului cu Program Sportiv funcționează și Clubul Sportiv Școlar (CSS) Târgu Jiu, care oferă programe de pregătire și competiții în diverse discipline sportive. Sportivii de la CSS Târgu Jiu au obținut rezultate remarcabile la competiții naționale, inclusiv medalii la Campionatul Național de lupte libere și lupte feminine.",
    researchNotes:
      "Liceu cu profil sportiv (nivel primar până liceu), 96 locuri clasa a IX-a 2024-2025: Fotbal băieți 24, Fotbal fete 12, Atletism 12, Handbal fete 12, Handbal băieți 12, Mozaic 24, probe aptitudini sportive conform calendar ME, facilități moderne: săli clasă, laboratoare, amfiteatru, cabinet consiliere, cabinet medical, săli sport, terenuri exterioare, CSS Târgu Jiu funcționează în cadrul LPS, rezultate remarcabile: medalii Campionatul Național de lupte libere și lupte feminine",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Asociația Club Sportiv Infinit 2013 Târgu Jiu",
    sportType: "multi-sport",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    description:
      "Asociația Club Sportiv Infinit 2013 Târgu Jiu este o asociație care desfășoară activități sportive în multiple ramuri, inclusiv fotbal, baschet, volei, handbal și tenis. Scopul său este selecționarea, inițierea și pregătirea sportivilor, precum și participarea la competiții sportive interne și internaționale.",
    researchNotes:
      "Asociație club sportiv, activități multiple ramuri: fotbal, baschet, volei, handbal, tenis, selecționare, inițiere și pregătire sportivi, participare competiții interne și internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Pandurii Târgu Jiu",
    sportType: "multi-sport",
    city: "Târgu Jiu",
    district: "N/A",
    address: "Târgu Jiu",
    website: "https://pandurii-mts.ro/",
    description:
      "Clubul Sportiv Pandurii Târgu Jiu este un club polisportiv înființat în 1989, subordonat Agenției Naționale pentru Sport și include secții de atletism, box, lupte și radioamatorism. Clubul dispune de facilități adecvate și antrenori specializați pentru diverse discipline sportive.",
    researchNotes:
      "Înființat 1989, subordonat Agenției Naționale pentru Sport, secții: atletism, box, lupte, radioamatorism, facilități adecvate, antrenori specializați",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

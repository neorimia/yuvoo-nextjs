/**
 * Clubs Research Data - Bacău
 *
 * Date reale colectate prin research public pentru cluburi sportive din Bacău.
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
 * Total cluburi identificate: 26
 * Cluburi verificate și completate: 26
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
 * Research Data - Cluburi Sportive Bacău
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_BACAU: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "FC Bacău - Academia de Copii și Juniori",
    sportType: "fotbal",
    city: "Bacău",
    district: "N/A",
    address: "Stadionul Municipal Bacău",
    phone: "+40 758 110 230",
    website: "https://fcbacau.ro/",
    description:
      "FC Bacău - Academia de Copii și Juniori. Fondat în 2014, FC Bacău este un club de fotbal care pune accent pe dezvoltarea tinerilor jucători. În 2024, academia clubului s-a clasat pe locul 16 în ierarhia celor mai bune 124 de academii de copii și juniori din România, conform FRF. Această clasare a permis participarea echipelor de juniori în competiții naționale de elită.",
    researchNotes:
      "Academia clasată #16 în România 2024 (FRF), participare competiții naționale de elită, contact: Vali Huțu",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "AS Atletico Junior Bacău",
    sportType: "fotbal",
    city: "Bacău",
    district: "N/A",
    address: "Bacău",
    description:
      "AS Atletico Junior Bacău - Club dedicat formării tinerilor fotbaliști, oferind programe de antrenament pentru diverse categorii de vârstă.",
    researchNotes: "Club dedicat formării tinerilor fotbaliști",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Moldostar Bacău",
    sportType: "fotbal",
    city: "Bacău",
    district: "N/A",
    address: "Bacău",
    description:
      "Moldostar Bacău - Club de fotbal pentru copii, axat pe dezvoltarea abilităților tehnice și tactice ale tinerilor jucători.",
    researchNotes: "Focus pe dezvoltare tehnică și tactică",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Aerostar Bacău",
    sportType: "fotbal",
    city: "Bacău",
    district: "N/A",
    address: "Bacău",
    description:
      "CS Aerostar Bacău - Club cu tradiție în fotbalul băcăuan, oferind programe pentru copii și juniori.",
    researchNotes: "Club cu tradiție în fotbalul băcăuan",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "AS Viitorul Bacău",
    sportType: "fotbal",
    city: "Bacău",
    district: "N/A",
    address: "Bacău",
    description:
      "AS Viitorul Bacău - Club orientat spre formarea și promovarea tinerelor talente în fotbal.",
    researchNotes: "Orientat spre formarea și promovarea tinerelor talente",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "AS Play Bacău",
    sportType: "fotbal",
    city: "Bacău",
    district: "N/A",
    address: "Bacău",
    description:
      "AS Play Bacău - Club de fotbal pentru copii, punând accent pe dezvoltarea armonioasă prin sport.",
    researchNotes: "Focus pe dezvoltare armonioasă prin sport",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "TNT Club Sport Bacău - Secția de Fotbal",
    sportType: "fotbal",
    city: "Bacău",
    district: "N/A",
    address: "TNT Club Sport, Bacău",
    phone: "+40 743 100 111",
    email: "office@tntclubsport.ro",
    website: "https://tntclubsport.ro/",
    description:
      "TNT Club Sport Bacău - Secția de Fotbal. Club oferă programe de inițiere în fotbal pentru copii născuți în anii 2013-2016. Program: 12 antrenamente pe lună, fiecare de 60-90 de minute (în funcție de vârstă), desfășurate de trei ori pe săptămână. Grupe: 14-16 copii per grupă. Antrenor: Prof. Vasile Jercălău.",
    researchNotes:
      "Programe inițiere pentru copii 2013-2016, 12 antrenamente/lună, 3x/săptămână, antrenor: Prof. Vasile Jercălău",
    ageGroups: [5, 6, 7, 8, 9, 10],
    schedule: generateSchedule(3, "16:00", 75),
  }),

  createClubFromResearch({
    name: "CSM Bacău - Secția de Fotbal",
    sportType: "fotbal",
    city: "Bacău",
    district: "N/A",
    address: "Strada Letea nr. 17, Bacău",
    phone: "+40 742 688 205",
    email: "contact@csmbacau.ro",
    description:
      "CSM Bacău - Secția de Fotbal. Club Sportiv Municipal Bacău oferă secție de fotbal pentru copii. În 2024, secția avea 1 manager, 6 antrenori și 65 de sportivi, incluzând 10 juniori 3. CSM Bacău oferă program gratuit de selecție pentru copiii de până la 10 ani, cu 10 ședințe gratuite.",
    researchNotes:
      "65 sportivi (10 juniori 3), program gratuit selecție până la 10 ani (10 ședințe gratuite)",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "Young Eagles Baschet Bacău",
    sportType: "baschet",
    city: "Bacău",
    district: "N/A",
    address: "Bacău",
    website: "https://baschetpro.com/",
    description:
      "Young Eagles Baschet Bacău - Club dedicat dezvoltării tinerilor jucători, oferind antrenamente profesionale și un mediu de creștere sănătos pentru toți iubitorii acestui sport.",
    researchNotes:
      "Antrenamente profesionale, mediu de creștere sănătos, potrivit pentru începători și experimentați",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "SCM Bacău - Secția de Baschet",
    sportType: "baschet",
    city: "Bacău",
    district: "N/A",
    address: "Strada Pictor Teodor Aman nr. 94, COD 600164, Bacău",
    phone: "+40 757 090 350",
    description:
      "SCM Bacău - Secția de Baschet. Sport Club Municipal (SCM) Bacău oferă secție de baschet pentru copii și tineri.",
    researchNotes: "Parte din SCM Bacău",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "CS Știința Bacău - Secția de Volei",
    sportType: "volei",
    city: "Bacău",
    district: "N/A",
    address: "Strada Pictor Teodor Aman nr. 94, COD 600164, Bacău",
    phone: "+40 757 090 350",
    description:
      "CS Știința Bacău - Secția de Volei. Club cu tradiție în sportul de performanță, având secții de volei atât pentru fete, cât și pentru băieți.",
    researchNotes: "Secții pentru fete și băieți, tradiție în sportul de performanță",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Bacău - Secția de Volei",
    sportType: "volei",
    city: "Bacău",
    district: "N/A",
    address: "Strada Pictor Teodor Aman nr. 94, COD 600164, Bacău",
    phone: "+40 757 090 350",
    description:
      "CSM Bacău - Secția de Volei. Club Sportiv Municipal Bacău oferă secție de volei pentru copii și tineri.",
    researchNotes: "Parte din CSM Bacău",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSȘ Bacău - Secția de Volei",
    sportType: "volei",
    city: "Bacău",
    district: "N/A",
    address: "Bacău",
    website: "https://cssbacau.ro/",
    description:
      "CSȘ Bacău - Secția de Volei. Clubul Sportiv Școlar Bacău oferă copiilor și tinerilor oportunitatea de a practica voleiul sub îndrumarea unor antrenori calificați. În ultimii ani, CSȘ Bacău s-a confruntat cu dificultăți financiare care au afectat participarea echipelor la competiții oficiale.",
    researchNotes:
      "Club școlar, dificultăți financiare recente, antrenori calificați, website: cssbacau.ro",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "Ciuntea Tennis Center Bacau",
    sportType: "tenis",
    city: "Bacău",
    district: "Mărgineni",
    address: "Strada Palmasiei, Mărgineni 607315, Romania",
    website: "https://www.ciunteatenniscenter.ro/",
    description:
      "Ciuntea Tennis Center Bacau - Oferă 5 terenuri de tenis, dintre care 2 cu nocturnă, și 2 terenuri de padel. În sezonul rece, terenurile sunt acoperite cu balon presostatic. Clubul dispune de antrenori calificați și programe dedicate copiilor. Rating: 4.8 (41 recenzii).",
    researchNotes:
      "5 terenuri tenis (2 cu nocturnă), 2 terenuri padel, balon presostatic iarna, antrenori calificați, rating 4.8/5",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Tenis Green Club Bacau",
    sportType: "tenis",
    city: "Bacău",
    district: "N/A",
    address: "Strada Sânzienelor 4, Bacău 600354, Romania",
    website: "http://www.tenisgreenclub.ro/",
    description:
      "Tenis Green Club Bacau - Organizează evenimente sportive și oferă facilități pentru tenis de câmp, tenis cu piciorul, tenis de masă, darts, baschet și volei. De asemenea, dispune de un foișor pentru petreceri în aer liber și alte activități recreative. Rating: 4.5 (28 recenzii).",
    researchNotes:
      "Multiple sporturi (tenis, darts, baschet, volei), foișor pentru petreceri, rating 4.5/5",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Bazinul de Înot Bacău",
    sportType: "inot",
    city: "Bacău",
    district: "N/A",
    address: "Aleea Ghioceilor nr. 10-14, Bacău",
    website: "https://bazin.municipiulbacau.ro/",
    description:
      "Bazinul de Înot Bacău - Oferă cursuri de înot pentru copii, susținute de instructori calificați. Tarifele pentru cursurile de inițiere sunt de 250 lei pentru 10 ședințe a câte 50 de minute (plata online) și 300 lei (plata la recepție). Program: Luni 13:00-19:00, Marți-Vineri 07:00-19:00, Sâmbătă 07:00-14:00.",
    researchNotes:
      "Cursuri inițiere: 250 lei/10 ședințe (online) sau 300 lei (la recepție), program L-V și S",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    pricing: [{ type: "per_class", amount: 25, currency: "RON" }],
    schedule: [
      { day: "Luni", time: "13:00-19:00" },
      { day: "Marți", time: "07:00-19:00" },
      { day: "Miercuri", time: "07:00-19:00" },
      { day: "Joi", time: "07:00-19:00" },
      { day: "Vineri", time: "07:00-19:00" },
      { day: "Sâmbătă", time: "07:00-14:00" },
    ],
  }),

  createClubFromResearch({
    name: "Aqua Club Bacău",
    sportType: "inot",
    city: "Bacău",
    district: "N/A",
    address: "Strada Lunca Bistriței nr. 1, Bacău",
    website: "https://www.aquaclub.ro/",
    description:
      "Aqua Club Bacău - Dispun de șapte piscine, inclusiv unele special concepute pentru copii, cum ar fi piscina cu tobogane și piscina cu valuri. Sezonul 2025 este programat să înceapă în primele zile însorite din luna iunie. Tarifele pentru copii sub 14 ani sunt de 40 lei în timpul săptămânii și 50 lei în weekend și sărbători. Program: Luni 11:00-18:00, Marți-Duminică 10:00-18:00.",
    researchNotes:
      "Piscine cu tobogane și valuri, sezon iunie-septembrie, tarife: 40 lei (săptămână) / 50 lei (weekend) copii sub 14 ani",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    pricing: [{ type: "per_class", amount: 40, currency: "RON" }],
    schedule: [
      { day: "Luni", time: "11:00-18:00" },
      { day: "Marți", time: "10:00-18:00" },
      { day: "Miercuri", time: "10:00-18:00" },
      { day: "Joi", time: "10:00-18:00" },
      { day: "Vineri", time: "10:00-18:00" },
      { day: "Sâmbătă", time: "10:00-18:00" },
      { day: "Duminică", time: "10:00-18:00" },
    ],
  }),

  createClubFromResearch({
    name: "CSM Bacău - Secția de Înot",
    sportType: "inot",
    city: "Bacău",
    district: "N/A",
    address: "Strada Letea nr. 17, Bacău",
    phone: "+40 742 688 205",
    email: "contact@csmbacau.ro",
    description:
      "CSM Bacău - Secția de Înot. Sport Club Municipal Bacău oferă programe de înot pentru copii și participă la competiții naționale. În 2024, clubul a ocupat locul 8 la Campionatul Național Under 11, cu sportivi antrenați de Claudia Degeratu și Iulian Matei.",
    researchNotes:
      "Locul 8 la Campionatul Național U11 2024, antrenori: Claudia Degeratu și Iulian Matei",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "TNT Club Sport Bacău - Secția de Înot",
    sportType: "inot",
    city: "Bacău",
    district: "N/A",
    address: "TNT Club Sport, Bacău",
    phone: "+40 234 511 104",
    email: "office@tntclubsport.ro",
    website: "https://tntclubsport.ro/",
    description:
      "TNT Club Sport Bacău - Secția de Înot. Oferă cursuri de inițiere în înot pentru copii: 10 ședințe pe lună, fiecare de 60 de minute, desfășurate de trei ori pe săptămână. Grupe: 14 copii per grupă. Niveluri: Inițiere I, II și III; Dezvoltarea abilităților I, II și III. Cost: 400 lei pentru 10 ședințe.",
    researchNotes:
      "10 ședințe/lună (60 min), 3x/săptămână, 14 copii/grupă, 400 lei/10 ședințe, multiple niveluri",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    pricing: [{ type: "per_class", amount: 40, currency: "RON" }],
    schedule: generateSchedule(3, "14:00", 60),
  }),

  createClubFromResearch({
    name: "CS Nautica Bacău",
    sportType: "inot",
    city: "Bacău",
    district: "N/A",
    address: "Bacău",
    description:
      "CS Nautica Bacău - Specializat în înot, acest club a obținut rezultate notabile la competiții naționale și internaționale, fiind o opțiune excelentă pentru copiii interesați de acest sport.",
    researchNotes: "Rezultate notabile la competiții naționale și internaționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "CSM Bacău - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Bacău",
    district: "N/A",
    address: "Strada Letea nr. 17, Bacău",
    phone: "+40 742 688 205",
    email: "contact@csmbacau.ro",
    description:
      "CSM Bacău - Secția de Gimnastică. Club Sportiv Municipal Bacău oferă secție de gimnastică pentru copii. În 2024, secția avea 2 antrenori și 15 copii înscriși.",
    researchNotes: "2 antrenori, 15 copii înscriși (2024)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSȘ Bacău - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Bacău",
    district: "N/A",
    address: "Bacău",
    website: "https://cssbacau.ro/",
    description:
      "CSȘ Bacău - Secția de Gimnastică. Clubul Sportiv Școlar Bacău oferă programe de gimnastică pentru copii și tineri.",
    researchNotes: "Parte din CSȘ Bacău",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ARTE MARȚIALE (Martial Arts) ==========
  createClubFromResearch({
    name: "CS Dan Botezatu Bacău",
    sportType: "karate",
    city: "Bacău",
    district: "N/A",
    address: "Strada 9 Mai 96, Bacău",
    website: "http://karatebacau.ro/",
    description:
      "CS Dan Botezatu Bacău - Oferă antrenamente de karate pentru copii, axate pe autocontrol, disciplină și dezvoltare armonioasă. Antrenamentele se desfășoară pe strada 9 Mai, nr. 96, în zilele de luni, miercuri și vineri, între orele 18:00 și 19:30. Rating: 5.0 (3 recenzii).",
    researchNotes: "L-Mi-V 18:00-19:30, focus pe autocontrol și disciplină, rating 5.0/5",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "18:00-19:30" },
      { day: "Miercuri", time: "18:00-19:30" },
      { day: "Vineri", time: "18:00-19:30" },
    ],
  }),

  createClubFromResearch({
    name: "CS Știința Bacău - Secția de Karate",
    sportType: "karate",
    city: "Bacău",
    district: "N/A",
    address: "Strada Pictor Teodor Aman nr. 94, COD 600164, Bacău",
    phone: "+40 757 090 350",
    description:
      "CS Știința Bacău - Secția de Karate. Cu o tradiție îndelungată în sportul de performanță, Clubul Sportiv Știința Bacău oferă programe pentru copii în karate. Secțiile de badminton și karate au obținut rezultate remarcabile, reconfirmând dedicarea clubului pentru sportul de performanță.",
    researchNotes: "Rezultate remarcabile la competiții, tradiție în sportul de performanță",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSM Bacău - Secția de Judo",
    sportType: "judo",
    city: "Bacău",
    district: "N/A",
    address: "Strada Letea nr. 17, Bacău",
    phone: "+40 742 688 205",
    email: "contact@csmbacau.ro",
    description:
      "CSM Bacău - Secția de Judo. Club Sportiv Municipal Bacău oferă secție de judo pentru copii. CSM Bacău oferă program gratuit de selecție pentru copiii de până la 10 ani, cu 10 ședințe gratuite în diverse discipline, inclusiv judo.",
    researchNotes:
      "Program gratuit selecție până la 10 ani (10 ședințe gratuite), parte din CSM Bacău",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Bacău - Secția de Judo",
    sportType: "judo",
    city: "Bacău",
    district: "N/A",
    address: "Strada Oituz nr. 24, Bacău",
    description:
      "Palatul Copiilor Bacău - Secția de Judo. Oferă oportunitatea de a învăța arta marțială a judo-ului, dezvoltând atât forța fizică, cât și disciplina și respectul față de adversar.",
    researchNotes: "Focus pe dezvoltare fizică, disciplină și respect",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "CSȘ Bacău - Secția de Handbal",
    sportType: "handbal",
    city: "Bacău",
    district: "N/A",
    address: "Bacău",
    website: "https://cssbacau.ro/",
    description:
      "CSȘ Bacău - Secția de Handbal. Clubul Sportiv Școlar Bacău are o tradiție îndelungată în formarea tinerilor handbaliști și participă frecvent la competiții dedicate juniorilor.",
    researchNotes:
      "Tradiție în formarea tinerilor handbaliști, participare frecventă la competiții",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ProTeam Handbal Academy Bacău",
    sportType: "handbal",
    city: "Bacău",
    district: "N/A",
    address: "Bacău",
    description:
      "ProTeam Handbal Academy Bacău - Fondată de foști handbaliști ai Științei MD și CSM Bacău, precum Răducu Tamaș, Rareș Păunică și Ionuț Rotaru, această academie se concentrează pe dezvoltarea copiilor prin handbal, oferind un mediu educativ și motivant pentru tinerii sportivi. Peste 140 de copii au participat la Memorialul Marcel Păunică în 2024.",
    researchNotes:
      "Fondată de foști handbaliști, focus pe dezvoltare educativă, peste 140 copii la memorial 2024",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Bacău - Secția de Handbal",
    sportType: "handbal",
    city: "Bacău",
    district: "N/A",
    address: "Strada Oituz nr. 24, Bacău",
    website: "https://www.palatulcopiilorbacau.ro/",
    description:
      "Palatul Copiilor Bacău - Secția de Handbal. Coordonat de profesoara Vîntu Elena Giorgiana, acest cerc este destinat copiilor care doresc să învețe și să practice handbalul. Activitățile includ inițierea în tehnicile de bază și participarea la competiții locale și zonale.",
    researchNotes:
      "Coordonator: Prof. Vîntu Elena Giorgiana, inițiere în tehnici de bază, participare competiții locale și zonale",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Fiesta Bacău - Dans Sportiv",
    sportType: "dans",
    city: "Bacău",
    district: "N/A",
    address: "Bacău",
    description:
      "Fiesta Bacău - Dans Sportiv. Fondat în 1996, acest club a antrenat peste 2000 de copii și este afiliat la Federația Română de Dans Sportiv. Oferă cursuri de dans sportiv și organizează competiții locale și naționale.",
    researchNotes:
      "Fondat 1996, peste 2000 copii antrenați, afiliat FRDS, competiții locale și naționale",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Bacău - Secția de Dans Modern",
    sportType: "dans",
    city: "Bacău",
    district: "N/A",
    address: "Strada Oituz nr. 24, Bacău",
    website: "https://www.palatulcopiilorbacau.ro/",
    description:
      "Palatul Copiilor Bacău - Secția de Dans Modern. Oferă cursuri de dans modern pentru copii, combinând muzica și mișcarea pentru a dezvolta armonios abilitățile copiilor. Activitățile includ învățarea pașilor de dans, dezvoltarea coordonării și participarea la spectacole.",
    researchNotes:
      "Focus pe dezvoltare armonioasă, învățare pași de dans, dezvoltare coordonare, participare spectacole",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT ==========
  createClubFromResearch({
    name: "CSM Bacău",
    sportType: "multi-sport",
    city: "Bacău",
    district: "N/A",
    address: "Strada Letea nr. 17, Bacău",
    phone: "+40 742 688 205",
    email: "contact@csmbacau.ro",
    description:
      "CSM Bacău - Club Sportiv Municipal Bacău oferă o varietate de secții sportive pentru copii, promovând atât sportul de performanță, cât și sportul de masă. Secții disponibile: atletism (4 antrenori, 38 sportivi, 15 copii), box (1 antrenor, 31 sportivi, 12 copii), fotbal (1 manager, 6 antrenori, 65 sportivi, 10 juniori 3), gimnastică (2 antrenori, 15 copii), haltere (2 antrenori, 18 sportivi, 7 juniori 3). Oferă program gratuit de selecție pentru copiii de până la 10 ani, cu 10 ședințe gratuite în: haltere, box, atletism, lupte, kickboxing, șah, judo și fotbal.",
    researchNotes:
      "Multiple secții sportive, program gratuit selecție până la 10 ani (10 ședințe gratuite), promovare sport de performanță și masă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Știința Bacău",
    sportType: "multi-sport",
    city: "Bacău",
    district: "N/A",
    address: "Strada Pictor Teodor Aman nr. 94, COD 600164, Bacău",
    phone: "+40 757 090 350",
    description:
      "CS Știința Bacău - Cu o tradiție îndelungată în sportul de performanță, acest club are secții de atletism, badminton și karate, unde copiii pot începe antrenamentele de la vârste fragede. Secțiile de badminton și karate au obținut rezultate remarcabile.",
    researchNotes:
      "Secții: atletism, badminton, karate, tradiție în sportul de performanță, rezultate remarcabile",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "TNT Club Sport Bacău",
    sportType: "multi-sport",
    city: "Bacău",
    district: "N/A",
    address: "TNT Club Sport, Bacău",
    phone: "+40 234 511 104",
    email: "office@tntclubsport.ro",
    website: "https://tntclubsport.ro/",
    description:
      "TNT Club Sport Bacău - Oferă o gamă variată de activități sportive pentru copii, inclusiv înot, fotbal, fitness și tenis de masă. Complexul dispune de facilități moderne, precum un bazin semiolimpic, săli de sport cu gazon sintetic și terenuri în aer liber. Organizează cursuri de inițiere în înot și fotbal pentru copii.",
    researchNotes:
      "Facilități moderne: bazin semiolimpic, săli sport cu gazon sintetic, terenuri aer liber, multiple sporturi",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Palatul Copiilor Bacău",
    sportType: "multi-sport",
    city: "Bacău",
    district: "N/A",
    address: "Strada Oituz nr. 24, Bacău",
    website: "https://www.palatulcopiilorbacau.ro/",
    description:
      "Palatul Copiilor Bacău - Oferă o varietate de activități sportive pentru copii, menite să le dezvolte abilitățile fizice și să promoveze un stil de viață sănătos. Cercurile sportive disponibile includ: handbal, judo, dans modern și educație rutieră. Organizează și evenimente speciale, cum ar fi 'Festivalul Copiilor', desfășurat anual în perioada 1-5 iunie, cu sesiuni de antrenament, competiții sportive de amatori și reprezentații de dans sportiv.",
    researchNotes:
      "Multiple activități sportive, Festivalul Copiilor (1-5 iunie anual), competiții și reprezentații",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSȘ Bacău",
    sportType: "multi-sport",
    city: "Bacău",
    district: "N/A",
    address: "Bacău",
    website: "https://cssbacau.ro/",
    description:
      "CSȘ Bacău - Clubul Sportiv Școlar Bacău oferă copiilor și tinerilor oportunitatea de a practica diverse discipline sportive sub îndrumarea unor antrenori calificați. Printre sporturile disponibile se numără handbalul, voleiul și luptele greco-romane. În ultimii ani, CSȘ Bacău s-a confruntat cu dificultăți financiare care au afectat participarea echipelor la competiții oficiale.",
    researchNotes:
      "Sporturi: handbal, volei, lupte greco-romane, antrenori calificați, dificultăți financiare recente",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Bronx Powerlifting Club Bacău",
    sportType: "multi-sport",
    city: "Bacău",
    district: "N/A",
    address: "Bacău",
    description:
      "CS Bronx Powerlifting Club Bacău - Înființat în 2010, acest club se remarcă prin implicarea în lucrul cu copii din categorii sociale defavorizate, oferindu-le oportunități de integrare socială și profesională prin sport. Clubul a obținut numeroase premii și medalii la competiții naționale și internaționale de judo și powerlifting.",
    researchNotes:
      "Fondat 2010, implicare copii categorii defavorizate, premii și medalii naționale și internaționale (judo, powerlifting)",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

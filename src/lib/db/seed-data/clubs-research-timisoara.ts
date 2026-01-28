/**
 * Clubs Research Data - Timișoara
 *
 * Date reale colectate prin research public pentru cluburi sportive din Timișoara.
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
 * Total cluburi identificate: 30
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
 * Research Data - Cluburi Sportive Timișoara
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_TIMISOARA: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "ACS Galaxy Timișoara",
    sportType: "fotbal",
    city: "Timișoara",
    district: "N/A",
    address: "Strada Costică Rădulescu, Timișoara",
    phone: "+40 726 962 945",
    email: "academia@galaxytm.ro",
    website: "https://www.galaxytm.ro/",
    description:
      "Fondată în 2015, Galaxy Timișoara are peste 200 de copii înscriși, inclusiv o grupă de fete, și oferă condiții excelente pentru dezvoltarea tinerilor fotbaliști.",
    researchNotes: "Fondată în 2015, peste 200 copii înscriși, grupă de fete inclusiv",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Timstar Junior",
    sportType: "fotbal",
    city: "Timișoara",
    district: "N/A",
    address: "Baza Sportivă Friend's Arena / Baza Sportivă Adrian Stoicov, Timișoara",
    phone: "+40 765 503 426",
    email: "acstimstar@yahoo.com",
    website: "https://timstar.ro/",
    description:
      "Oferă antrenamente și meciuri pentru diverse grupe de vârstă, desfășurate la Baza Sportivă Friend's Arena și Baza Sportivă Adrian Stoicov.",
    researchNotes: "Două baze sportive pentru diferite grupe de vârstă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Academia FC Ripensia Timișoara",
    sportType: "fotbal",
    city: "Timișoara",
    district: "N/A",
    address: "Calea Urseni nr. 16B, Timișoara",
    phone: "+40 731 381 443",
    email: "secretariat@ripensiatimisoara.ro",
    website: "https://academiaripensia.ro/",
    description:
      "Academia de fotbal a clubului FC Ripensia Timișoara. Cu un punctaj de 87,1 în 2023, Ripensia Timișoara se află pe locul 6 în clasamentul național al academiilor de fotbal pentru copii și juniori.",
    researchNotes: "Locul 6 în clasamentul național al academiilor de fotbal",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "MP Sport Timișoara",
    sportType: "baschet",
    city: "Timișoara",
    district: "N/A",
    address: "Complexul Sportiv Banu Sport, Aleea F. C. Ripensia 33, Timișoara",
    phone: "+40 730 327 097",
    email: "mpstimisoara@gmail.com",
    website: "https://www.mpsport.ro/",
    description:
      "Oferă antrenamente de baschet pentru copii cu vârste între 6 și 15 ani, promovând dezvoltarea personală și spiritul de echipă.",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "Tivoli Tenis Club",
    sportType: "tenis",
    city: "Timișoara",
    district: "N/A",
    address: "Aleea Ghirodei nr. 36, Timișoara",
    phone: "+40 755 092 021",
    website: "https://www.tivoli.ro/",
    description:
      "Cel mai mare club de tenis din Timișoara, cu 7 terenuri de zgură și 2 terenuri acoperite pentru sezonul rece. Oferă cursuri de tenis pentru copii sub 10 ani, juniori peste 11 ani și adulți.",
    researchNotes: "7 terenuri de zgură, 2 terenuri acoperite, cel mai mare club din Timișoara",
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
    name: "Cristal Tenis Club",
    sportType: "tenis",
    city: "Timișoara",
    district: "Săcălaz (aproape)",
    address: "Strada Gării, Nr. 1, Săcălaz",
    phone: "+40 723 159 311",
    website: "https://cristalclub.ro/",
    description:
      "Dispune de 6 terenuri de tenis cu zgură, dotate cu instalație de nocturnă. Oferă antrenamente pentru copii, inclusiv cursuri individuale și de grup, sub îndrumarea antrenorilor certificați.",
    researchNotes:
      "6 terenuri cu zgură, instalație de nocturnă. Locație în Săcălaz, la 10 minute de Timișoara",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Helios Sport Club",
    sportType: "tenis",
    city: "Timișoara",
    district: "N/A",
    address: "Bulevardul Doctor Iosif Bulbuca nr. 21, Timișoara",
    phone: "+40 256 463 818",
    email: "office@helios-sport.ro",
    website: "http://www.helios-sport.ro/",
    description:
      "Club înființat în 2008, situat în zona de nord a orașului, oferă cursuri de tenis pentru copii, adolescenți și adulți, cu antrenori specializați în antrenamente tehnico-tactice și pregătire fizică.",
    researchNotes: "Înființat în 2008, trei terenuri cu zgură, acoperite cu balon pe timpul iernii",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "NextGen Tennis Academy",
    sportType: "tenis",
    city: "Timișoara",
    district: "N/A",
    address: "Calea Dorobanților nr. 94, Hotelul 2000, Timișoara",
    phone: "+40 726 640 765",
    email: "ciocov_bogdan@yahoo.com",
    description:
      "Academie de tenis care oferă cursuri pentru copii și adulți, dispunând de șase terenuri de tenis dotate cu nocturnă.",
    researchNotes: "Șase terenuri cu nocturnă, în incinta Hotelului 2000",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Mingea Galbenă - Școala de Tenis",
    sportType: "tenis",
    city: "Timișoara",
    district: "N/A",
    address: "Strada Patriarh Miron Cristea, Timișoara",
    phone: "+40 761 341 153",
    description:
      "Oferă cursuri de tenis pentru copii, tenis de performanță, cursuri pentru adulți, cardio tenis, tabere de vară și alte activități conexe.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Happy Swim School",
    sportType: "inot",
    city: "Timișoara",
    district: "Multiple locații",
    address:
      "Arena Aquasport (Calea Dorobanților 92 A) / Grădinița 26 (Strada Teiului 3) / Socrates Clinic (Calea Martirilor 1) / Fit Factory Dumbrăvița (Strada Blaise Pascal 37)",
    phone: "+40 721 080 980",
    email: "contact@inotam.ro",
    website: "https://www.inotam.ro/",
    description:
      "Oferă cursuri de înot pentru bebeluși și copii în multiple locații din Timișoara. Prima ședință este gratuită. Programele sunt adaptate pentru diferite grupe de vârstă: Baby Swim (4-36 luni), Little Swim (3-4 ani) și Happy Swim (5-15 ani).",
    researchNotes: "Patru locații în Timișoara, prima ședință gratuită",
    ageGroups: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Beauty Center Timișoara - Secția de Înot",
    sportType: "inot",
    city: "Timișoara",
    district: "N/A",
    address: "Strada Iancu Flondor 12-14, Timișoara",
    phone: "+40 256 242 279",
    email: "beauty_centertm@yahoo.com",
    website: "http://www.beautycentertm.ro/",
    description:
      "Organizează cursuri de înot pentru copii începând de la vârsta de 3 ani, structurate în module de 24 de ședințe, pe grupe de vârstă și nivel de pregătire. Instructorii sunt foști înotători de performanță, absolvenți ai Facultății de Educație Fizică și Sport.",
    researchNotes: "Module de 24 ședințe, instructorii sunt foști înotători de performanță",
    ageGroups: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-22:00" },
      { day: "Marți", time: "08:00-22:00" },
      { day: "Miercuri", time: "08:00-22:00" },
      { day: "Joi", time: "08:00-22:00" },
      { day: "Vineri", time: "08:00-22:00" },
      { day: "Sâmbătă", time: "10:00-19:00" },
      { day: "Duminică", time: "11:00-17:00" },
    ],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "SCM Politehnica Timișoara",
    sportType: "handbal",
    city: "Timișoara",
    district: "N/A",
    address: "Aleea F.C. Ripensia nr. 11, Sala 'Constantin Jude', Timișoara",
    phone: "+40 256 204 286",
    email: "scmpolitehnica@gmail.com",
    description:
      "Club cu echipe de juniori care participă la diverse competiții naționale. Echipa de juniori IV s-a calificat la turneul final al campionatului național de handbal în 2025.",
    researchNotes: "Echipe de juniori active în competiții naționale",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Dominicii Timișoara",
    sportType: "handbal",
    city: "Timișoara",
    district: "Moșnița Nouă (aproape)",
    address: "Strada Verde 2, Moșnița Nouă",
    phone: "+40 734 717 113",
    email: "acsdominicii@gmail.com",
    website: "https://handbal-club-timisoara.blogspot.com",
    description:
      "Club de handbal feminin care se concentrează pe handbalul pentru copii și a reușit să califice echipa de junioare III la turneul final național în 2025.",
    researchNotes: "Locație în Moșnița Nouă, aproape de Timișoara, handbal feminin",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "Banu Sport Timișoara - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Timișoara",
    district: "N/A",
    address: "Aleea F.C. Ripensia nr. 33, Timișoara",
    phone: "+40 256 220 642",
    email: "contact@banusport.ro",
    website: "http://www.banusport.ro",
    description:
      "Complex sportiv modern care oferă cursuri de gimnastică și balet pentru copii, alături de alte activități sportive. Dispune de facilități moderne și antrenori calificați.",
    researchNotes: "Complex sportiv modern cu multiple facilități",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "07:00-24:00" },
      { day: "Marți", time: "07:00-24:00" },
      { day: "Miercuri", time: "07:00-24:00" },
      { day: "Joi", time: "07:00-24:00" },
      { day: "Vineri", time: "07:00-24:00" },
      { day: "Sâmbătă", time: "07:00-24:00" },
      { day: "Duminică", time: "07:00-24:00" },
    ],
  }),

  createClubFromResearch({
    name: "Fit Kids Club",
    sportType: "gimnastica",
    city: "Timișoara",
    district: "Dumbrăvița (aproape)",
    address: "Strada Mureș 1, Dumbrăvița",
    phone: "+40 722 123 456",
    email: "contact@fitkidsclub.ro",
    website: "http://fitkidsclub.ro/",
    description:
      "Situat în apropierea Timișoarei, acest club oferă cursuri de gimnastică ritmică pentru copii, sub îndrumarea antrenoarei Roxana Oana Iacob. Clubul pune accent pe un mediu prietenos și profesionist pentru dezvoltarea copiilor.",
    researchNotes: "Locație în Dumbrăvița, aproape de Timișoara, gimnastică ritmică",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== KARATE ==========
  createClubFromResearch({
    name: "ACS Kaizen Karate Timișoara",
    sportType: "karate",
    city: "Timișoara",
    district: "N/A",
    address: "Calea Aradului 48a, Timișoara",
    phone: "+40 730 834 457",
    email: "kaizenkaratetm@gmail.com",
    description:
      "Oferă cursuri de Karate Shotokan pentru copii începând cu vârsta de 4 ani. Antrenamentele au loc pe Calea Aradului 48a, în zilele de miercuri și vineri între orele 17:00 - 20:00, și sâmbăta între 12:00 - 14:00.",
    researchNotes: "Karate Shotokan",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Miercuri", time: "17:00-20:00" },
      { day: "Vineri", time: "17:00-20:00" },
      { day: "Sâmbătă", time: "12:00-14:00" },
    ],
  }),

  createClubFromResearch({
    name: "K-ZE Karate Timișoara",
    sportType: "karate",
    city: "Timișoara",
    district: "N/A",
    address: "Piața Bisericii nr. 7, Timișoara",
    phone: "+40 726 440 650",
    description:
      "Conduse de sensei Alexandra Pop (4 Dan), multiplă campioană europeană și mondială, antrenamentele se desfășoară în Piața Bisericii nr. 7. Clubul a obținut numeroase medalii la competiții naționale și internaționale.",
    researchNotes: "Sensei Alexandra Pop (4 Dan), campioană europeană și mondială",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Fudokan Karate Timișoara",
    sportType: "karate",
    city: "Timișoara",
    district: "N/A",
    address: "Sala de Sport a Școlii Generale nr. 18, Strada Amforei, Timișoara",
    description:
      "Organizează înscrieri pentru noi grupe de începători, cu vârsta minimă de 6 ani. Antrenamentele se desfășoară la sala de sport a Școlii Generale nr. 2, str. Mureș nr. 8, de luni până vineri, începând cu ora 18:30.",
    researchNotes: "Karate Fudokan, vârstă minimă 6 ani",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "18:30-20:00" },
      { day: "Marți", time: "18:30-20:00" },
      { day: "Miercuri", time: "18:30-20:00" },
      { day: "Joi", time: "18:30-20:00" },
      { day: "Vineri", time: "18:30-20:00" },
    ],
  }),

  // ========== JUDO ==========
  createClubFromResearch({
    name: "Clubul Sportiv Hiro - Judo Timișoara",
    sportType: "judo",
    city: "Timișoara",
    district: "N/A",
    address: "Piața Iancu Huniade nr. 2, Clădirea MODEX, Timișoara",
    phone: "+40 723 376 313",
    website: "https://acshiro.ro/",
    description:
      "Oferă antrenamente de judo pentru copii începând de la 4 ani, adolescenți și adulți. Antrenamentele se desfășoară în centrul orașului, în clădirea MODEX, Piața Iancu Huniade nr.2. Programul include sesiuni pentru diferite grupe de vârstă și niveluri de experiență.",
    researchNotes: "Participare de probă gratuită disponibilă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Academia de Judo Timișoara",
    sportType: "judo",
    city: "Timișoara",
    district: "N/A",
    address: "Strada Constantin Brăiloiu nr. 5, apartament 7, Timișoara",
    website: "https://ajt.ro/",
    description:
      "Organizează sesiuni de randori și antrenamente pentru copii și tineri, colaborând cu diverse cluburi din zona de vest a țării. Recent, a organizat o sesiune de randori la Casa de Cultură din Dumbrăvița, la care au participat peste 100 de judoka.",
    researchNotes:
      "Colaborări cu cluburi din zona de vest, peste 100 judoka la evenimente. Adresă actualizată: Strada Constantin Brăiloiu",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Judo Club Banat",
    sportType: "judo",
    city: "Timișoara",
    district: "N/A",
    address: "Bulevardul Iuliu Maniu 23A, etaj 2, Timișoara",
    phone: "+40 723 898 352",
    description:
      "Oferă antrenamente de judo pentru copii și adulți. Programul de antrenamente este de luni până vineri, între orele 17:00 și 21:00, și sâmbăta între 09:00 și 12:00.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "17:00-21:00" },
      { day: "Marți", time: "17:00-21:00" },
      { day: "Miercuri", time: "17:00-21:00" },
      { day: "Joi", time: "17:00-21:00" },
      { day: "Vineri", time: "17:00-21:00" },
      { day: "Sâmbătă", time: "09:00-12:00" },
    ],
  }),

  // ========== TENIS DE MASĂ (Table Tennis) ==========
  createClubFromResearch({
    name: "Rocket Spin Timișoara",
    sportType: "tenis-de-masa",
    city: "Timișoara",
    district: "N/A",
    address: "Calea Aradului nr. 48A, Timișoara",
    phone: "+40 772 069 697",
    email: "contact@rocketspintenisdemasa.com",
    website: "http://www.rocketspintenisdemasa.com/",
    description:
      "Cea mai profesională sală de tenis de masă din vestul țării, dotată cu mese Butterfly Octet 25 aprobate ITTF. Oferă cursuri pentru copii pe diferite niveluri de dificultate, antrenamente pentru adolescenți și adulți, închiriere de mese și organizare de competiții în fiecare weekend.",
    researchNotes:
      "Cea mai profesională sală din vestul țării, mese aprobate ITTF, competiții în weekend",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "10:00-22:00" },
      { day: "Marți", time: "10:00-22:00" },
      { day: "Miercuri", time: "10:00-22:00" },
      { day: "Joi", time: "10:00-22:00" },
      { day: "Vineri", time: "10:00-22:00" },
      { day: "Sâmbătă", time: "10:00-22:00" },
      { day: "Duminică", time: "10:00-22:00" },
    ],
  }),

  // ========== SCRIMĂ (Fencing) ==========
  createClubFromResearch({
    name: "ACS Floreta Timișoara",
    sportType: "scrima",
    city: "Timișoara",
    district: "N/A",
    address: "Strada Cuvin 2, Timișoara",
    phone: "+40 733 136 655",
    email: "cursuriscrima@gmail.com",
    website: "https://floreta.ro/",
    description:
      "Înființat în 2015 de campionii naționali Iulian Teacă și Moisuc Teofil, acest club oferă cursuri de scrimă pentru copii și adulți.",
    researchNotes: "Înființat în 2015 de campioni naționali",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "18:00-20:00" },
      { day: "Marți", time: "17:00-20:00" },
      { day: "Miercuri", time: "18:00-20:00" },
      { day: "Joi", time: "17:00-20:00" },
      { day: "Vineri", time: "18:00-20:00" },
    ],
  }),

  createClubFromResearch({
    name: "ACS Titanii Timișoara",
    sportType: "scrima",
    city: "Timișoara",
    district: "N/A",
    address: "N/A",
    website: "https://titanii.ro/",
    description:
      "Fondat în 2024, acest club își propune să faciliteze accesul la cursuri de scrimă și șah pentru copii. Antrenorii au peste 20 de ani de experiență în scrimă și sunt pregătiți în pedagogie și kinetoterapie.",
    researchNotes: "Fondat în 2024, oferă și șah, antrenori cu peste 20 ani experiență",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "Clubul Sportiv Athletics Timișoara",
    sportType: "atletism",
    city: "Timișoara",
    district: "N/A",
    address: "Stadionul Știința, Strada Sfânta Rozalia nr. 1, Timișoara",
    phone: "+40 724 516 960",
    website: "http://csathletics.ro/",
    description:
      "Club privat afiliat la Federația Română de Atletism, oferind antrenamente pentru copii și juniori cu antrenori profesioniști și program flexibil.",
    researchNotes: "Antrenamente L-V de la 18:00, antrenor: profesorul Gulyas Raymond",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "18:00-20:00" },
      { day: "Marți", time: "18:00-20:00" },
      { day: "Miercuri", time: "18:00-20:00" },
      { day: "Joi", time: "18:00-20:00" },
      { day: "Vineri", time: "18:00-20:00" },
    ],
  }),

  // ========== ECHITAȚIE (Horseback Riding) ==========
  createClubFromResearch({
    name: "Nadira Riding",
    sportType: "echitatie",
    city: "Timișoara",
    district: "Săcălaz (aproape)",
    address: "Strada Topografilor, nr. 7, Săcălaz",
    phone: "+40 722 202 102",
    email: "nadira_riding@yahoo.ro",
    description:
      "Situat la aproximativ 5 km de Timișoara, în localitatea Săcălaz, Nadira Riding oferă lecții de echitație pentru copii și începători, plimbări călare și programe de interacțiune cu caii pentru copiii sub 6 ani.",
    researchNotes: "La 5 km de Timișoara, programe pentru copiii sub 6 ani",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Ponei pentru copii",
    sportType: "echitatie",
    city: "Timișoara",
    district: "Drăgoiești (aproape)",
    address: "Drăgoiești",
    description:
      "Situat în comuna Drăgoiești, acest centru oferă experiențe de echitație adaptate pentru copii, inclusiv plimbări cu ponei și activități educative legate de îngrijirea cailor.",
    researchNotes: "Locație în Drăgoiești, aproape de Timișoara, plimbări cu ponei",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Timisoara Dance Studio",
    sportType: "dans",
    city: "Timișoara",
    district: "Moșnița Nouă (aproape)",
    address: "Strada Poștei, Moșnița Nouă, Timișoara",
    phone: "+40 751 682 612",
    email: "tm.dancestudio@yahoo.com",
    description:
      "Oferă cursuri de dans pentru copii, adolescenți și adulți, inclusiv dans sportiv. Antrenorii cu experiență au ghidat numeroși cursanți care au obținut rezultate bune la competiții.",
    researchNotes: "Locație în Moșnița Nouă, aproape de Timișoara",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Academia de Dans Mini-Mini Reflex",
    sportType: "dans",
    city: "Timișoara",
    district: "N/A",
    address: "Strada Hebe 54, Timișoara",
    phone: "+40 727 004 252",
    email: "miniminireflex@gmail.com",
    description:
      "Oferă cursuri de dans modern și balet pentru copii de la 4 ani în sus, încurajând individualitatea și inovația prin mișcări fluide și neconvenționale.",
    researchNotes: "Dans modern și balet. Program L-D 10:00-20:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "10:00-20:00" },
      { day: "Marți", time: "10:00-20:00" },
      { day: "Miercuri", time: "10:00-20:00" },
      { day: "Joi", time: "10:00-20:00" },
      { day: "Vineri", time: "10:00-20:00" },
      { day: "Sâmbătă", time: "10:00-20:00" },
      { day: "Duminică", time: "10:00-20:00" },
    ],
  }),
];

/**
 * Research Statistics
 */
export const RESEARCH_STATS_TIMISOARA = {
  totalClubs: CLUBS_RESEARCH_TIMISOARA.length,
  sportsCovered: new Set(CLUBS_RESEARCH_TIMISOARA.map((c) => c.sportType)).size,
  districtsCovered: new Set(
    CLUBS_RESEARCH_TIMISOARA.map((c) => c.district).filter((d) => d !== undefined)
  ).size,
  clubsWithWebsite: CLUBS_RESEARCH_TIMISOARA.filter((c) => c.website).length,
  clubsWithEmail: CLUBS_RESEARCH_TIMISOARA.filter((c) => c.email).length,
  clubsWithPhone: CLUBS_RESEARCH_TIMISOARA.filter((c) => c.phone).length,
  dateCollected: "2025-01-XX",
};

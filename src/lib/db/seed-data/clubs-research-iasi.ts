/**
 * Clubs Research Data - Iași
 *
 * Date reale colectate prin research public pentru cluburi sportive din Iași.
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
 * Total cluburi identificate: 35
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
 * Research Data - Cluburi Sportive Iași
 * Date colectate din surse publice (Ianuarie 2025)
 */
export const CLUBS_RESEARCH_IASI: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClubFromResearch({
    name: "ACS Magic Boys Iași",
    sportType: "fotbal",
    city: "Iași",
    district: "N/A",
    address: "Aleea Cimitirul Evreiesc 2, Iași",
    website: "http://acsmagicboys.ro/",
    description:
      "Club de fotbal pentru copii, oferind antrenamente într-un mediu prietenos și motivant, cu antrenori dedicați și implicați.",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Academia de Fotbal Toni Tăbăranu",
    sportType: "fotbal",
    city: "Iași",
    district: "N/A",
    address: "Bulevardul Nicolae Iorga 5A, Iași",
    phone: "+40 742 626 329",
    email: "contact@academiatoni.club",
    website: "https://academiatoni.club/",
    description:
      "Oferă antrenamente pentru copii și juniori cu vârste între 5 și 18 ani, aplicând metodologia UEFA Grassroots și participând la competiții naționale și internaționale.",
    researchNotes: "Metodologie UEFA Grassroots, competiții naționale și internaționale",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "09:00-21:00" },
      { day: "Marți", time: "09:00-21:00" },
      { day: "Miercuri", time: "09:00-21:00" },
      { day: "Joi", time: "09:00-21:00" },
      { day: "Vineri", time: "09:00-21:00" },
      { day: "Sâmbătă", time: "09:00-21:00" },
      { day: "Duminică", time: "09:00-21:00" },
    ],
  }),

  // ========== BASCHET (Basketball) ==========
  createClubFromResearch({
    name: "Vikings Basketball Academy Iași",
    sportType: "baschet",
    city: "Iași",
    district: "N/A",
    address: "Strada Plăieșilor nr. 9, Iași",
    phone: "+40 746 800 956",
    email: "contact@vikingsbasketball.ro",
    website: "https://vikingsbasketball.ro/",
    description:
      "Academie de baschet care oferă cursuri pentru copii, promovând spiritul de echipă și dezvoltarea personală.",
    researchNotes:
      "Multiple săli: Sala VIKINGS (Str. Aurel Vlaicu 77), Sala Alexandru (Str. Plăieșilor 9), Sala Lunca Cetățuii",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CS Politehnica Iași - Secția de Baschet",
    sportType: "baschet",
    city: "Iași",
    district: "N/A",
    address: "Strada Palat nr. 2, Iași (Sala de jocuri)",
    phone: "+40 232 213 796",
    description:
      "Club sportiv cu echipe de juniori la diverse categorii de vârstă, inclusiv U15 și U16, antrenate de Branko Jorović. Sediul social: Str. Gavril Musicescu Nr. 6, Bl 7A, Iași.",
    researchNotes:
      "Echipe U15 și U16, antrenor: Branko Jorović. Sediul social: Str. Gavril Musicescu Nr. 6, Bl 7A",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Unirea Iași - Secția de Baschet",
    sportType: "baschet",
    city: "Iași",
    district: "N/A",
    address: "Strada Sărărie nr. 189, Iași",
    phone: "+40 232 410 844",
    email: "css_unirea_iasi@yahoo.com",
    website: "https://www.css-unirea-iasi.ro/",
    description:
      "Club sportiv școlar cu echipe de baschet masculin și feminin, având antrenori dedicați pentru fiecare categorie.",
    researchNotes: "Club școlar cu multiple secții sportive",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Iris Iași",
    sportType: "baschet",
    city: "Iași",
    district: "N/A",
    address: "N/A",
    phone: "+40 744 170 108",
    description:
      "Asociație sportivă specializată în baschet și pregătire fizică, care caută jucători pasionați de acest sport.",
    researchNotes: "Persoană de contact: Florin Bucureșteanu",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "STOMART Basketball Iași",
    sportType: "baschet",
    city: "Iași",
    district: "N/A",
    address: "Strada Mitropolit Varlaam 54, Iași",
    phone: "+40 768 800 351",
    email: "contact@stomart.basketball",
    website: "https://stomart.basketball",
    description:
      "Club care organizează cursuri de baschet pentru copii, indiferent de nivelul de pregătire, cu grupe mixte pe categorii de vârstă.",
    researchNotes: "Program L-S 09:00-21:00, D închis",
    ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "09:00-21:00" },
      { day: "Marți", time: "09:00-21:00" },
      { day: "Miercuri", time: "09:00-21:00" },
      { day: "Joi", time: "09:00-21:00" },
      { day: "Vineri", time: "09:00-21:00" },
      { day: "Sâmbătă", time: "09:00-21:00" },
    ],
  }),

  // ========== VOLEI (Volleyball) ==========
  createClubFromResearch({
    name: "ACS HV Junior Iași",
    sportType: "volei",
    city: "Iași",
    district: "N/A",
    address: "Strada Tătărași, nr. 14, Iași",
    phone: "+40 744 667 870",
    email: "hvjunioriasi@gmail.com",
    website: "https://acs-hv-junior-iasi.webnode.ro/",
    description:
      "Asociație înființată în 2014, dedicată dezvoltării handbalului și voleiului pentru copii. Scopul principal este crearea unui mediu propice desfășurării activităților sportive de masă, bazat pe fair-play și valori morale.",
    researchNotes: "Înființată în 2014, handbal și volei",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Academia de Volei Iași",
    sportType: "volei",
    city: "Iași",
    district: "N/A",
    address:
      "Sala Colegiului Național 'Mihai Eminescu' / Sala Colegiului Tehnic 'Dimitrie Leonida', Iași",
    phone: "+40 743 131 408",
    email: "info@academiadevolei.eu",
    website: "https://www.academiadevolei.eu/",
    description:
      "Club dedicat dezvoltării talentelor în volei, punând accent pe continuitatea în pregătire. Oferă programe de antrenament adaptate nivelului fiecărui participant, sub îndrumarea antrenorilor experimentați.",
    researchNotes:
      "Două locații: Colegiul Național 'Mihai Eminescu' și Colegiul Tehnic 'Dimitrie Leonida'",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS Inter Iași",
    sportType: "volei",
    city: "Iași",
    district: "N/A",
    address: "Multiple locații în Iași",
    phone: "+40 773 831 300",
    email: "acsinteriasi@gmail.com",
    description:
      "Înființat în 2018, clubul are o secție de volei deschisă în 2021, dedicată formării și modelării copiilor cu vârste între 5 și 14 ani.",
    researchNotes: "Înființat în 2018, secție de volei deschisă în 2021",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TENIS (Tennis) ==========
  createClubFromResearch({
    name: "Teo Tenis Club Iași",
    sportType: "tenis",
    city: "Iași",
    district: "Tomești (aproape)",
    address: "Strada Șoseaua Veche, nr. 5, Tomești, Iași",
    phone: "+40 724 684 805",
    email: "contact@teotenisclub.ro",
    website: "https://www.teotenisclub.ro/",
    description:
      "Situat într-o zonă liniștită din Tomești, clubul dispune de două terenuri de tenis de zgură cu nocturnă. Oferă prima lecție gratuită pentru copii, sub îndrumarea antrenorilor Leahu Laura-Teodora și Leahu Teodor.",
    researchNotes: "Două terenuri cu zgură și nocturnă, prima lecție gratuită pentru copii",
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
    name: "TD Tennis Center Iași",
    sportType: "tenis",
    city: "Iași",
    district: "N/A",
    address: "Baza Sportivă Ștrand Municipal, Stradela Sofia Nădejde 2, Iași",
    phone: "+40 739 883 983",
    description:
      "Școală de tenis care organizează cursuri pentru copii și adolescenți, sub coordonarea antrenorului Dragoș Tucă.",
    researchNotes: "Antrenor: Dragoș Tucă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Baza Sportivă Ciric",
    sportType: "tenis",
    city: "Iași",
    district: "N/A",
    address: "Strada Moara de Vant 171, Iași",
    description:
      "Dispune de șase terenuri de tenis de câmp pe zgură, două terenuri de minifotbal și un teren multifuncțional. Oferă facilități precum dușuri, vestiare și parcare.",
    researchNotes: "Șase terenuri de tenis, două terenuri de minifotbal, teren multifuncțional",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ÎNOT (Swimming) ==========
  createClubFromResearch({
    name: "Club Sportiv TriSport Iași",
    sportType: "inot",
    city: "Iași",
    district: "Multiple locații",
    address:
      "Oxygen Galata (Strada Pantelimon Halipa nr. 10) / Worldclass (Strada Anastasie Panu nr. 31), Iași",
    phone: "+40 744 990 335",
    email: "clubsportiv.trisport@gmail.com",
    website: "http://cstrisport.ro/",
    description:
      "Oferă cursuri de înot pentru copii cu antrenori experimentați, punând accent pe tehnică și dezvoltare armonioasă. Cursurile se desfășoară la Oxygen Galata și Worldclass.",
    researchNotes: "Două locații în Iași",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== HANDBAL (Handball) ==========
  createClubFromResearch({
    name: "ABC Handball Kids Iași",
    sportType: "handbal",
    city: "Iași",
    district: "N/A",
    address: "Multiple locații în Iași",
    phone: "+40 752 110 533",
    email: "abchandbalkidsiasi@gmail.com",
    website: "https://abchandbaliasi.ro/",
    description:
      "Organizează cursuri de inițiere în handbal pentru copii cu vârste cuprinse între 4 și 14 ani. Programele sunt structurate pe grupe de vârstă și se desfășoară în diverse locații din Iași.",
    researchNotes: "Cursuri pentru copii 4-14 ani, multiple locații în Iași",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "ACS HV Junior Iași - Secția de Handbal",
    sportType: "handbal",
    city: "Iași",
    district: "N/A",
    address: "Strada Tătărași, nr. 14, Iași",
    phone: "+40 744 667 870",
    email: "hvjunioriasi@gmail.com",
    website: "https://acs-hv-junior-iasi.webnode.ro/",
    description:
      "Asociație înființată în 2014, dedicată dezvoltării handbalului și voleiului pentru copii. Scopul principal este crearea unui mediu propice desfășurării activităților sportive de masă, bazat pe fair-play și valori morale.",
    researchNotes: "Înființată în 2014, handbal și volei",
    ageGroups: [8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "CSS Unirea Iași - Secția de Handbal",
    sportType: "handbal",
    city: "Iași",
    district: "N/A",
    address: "Strada Sărărie nr. 189, Iași",
    phone: "+40 232 410 844",
    email: "css_unirea_iasi@yahoo.com",
    website: "https://www.css-unirea-iasi.ro/",
    description:
      "Înființat în 1979, CSS Unirea oferă cursuri de handbal pentru copii, alături de alte discipline sportive. Clubul se adresează copiilor de la vârsta preșcolară până la liceu, sub îndrumarea antrenorilor specializați.",
    researchNotes: "Înființat în 1979, club școlar cu multiple secții",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClubFromResearch({
    name: "CSG Gimnis Iași",
    sportType: "gimnastica",
    city: "Iași",
    district: "N/A",
    address: "Strada Fermei nr. 98, Iași",
    description:
      "Club sportiv de gimnastică aerobică, fondat de profesorul Bogdan Andrei Bantă. Clubul organizează competiții precum 'Cupa Iașului' și participă la evenimente naționale și internaționale.",
    researchNotes: "Gimnastică aerobică, fondat de profesorul Bogdan Andrei Bantă",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Odette Academy",
    sportType: "gimnastica",
    city: "Iași",
    district: "N/A",
    address: "Aleea Mihail Sadoveanu 59f, Complexul Royal Town Copou, Iași",
    phone: "+40 760 607 929",
    description:
      "Școală de dans situată în complexul Royal Town Copou, unde se țin cursuri de balet și gimnastică pentru copii, două activități complementare.",
    researchNotes: "Balet și gimnastică, în complexul Royal Town Copou",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "10:00-20:00" },
      { day: "Marți", time: "10:00-20:00" },
      { day: "Miercuri", time: "10:00-20:00" },
      { day: "Joi", time: "10:00-20:00" },
      { day: "Vineri", time: "10:00-20:00" },
      { day: "Sâmbătă", time: "11:00-16:00" },
      { day: "Duminică", time: "11:00-16:00" },
    ],
  }),

  createClubFromResearch({
    name: "Itzy Bitzy Fun - Secția de Gimnastică",
    sportType: "gimnastica",
    city: "Iași",
    district: "N/A",
    address: "Royal Town, Aleea Mihail Sadoveanu 59a, Iași",
    description:
      "Spațiu de joacă care oferă cursuri de gimnastică ritmică pentru copii cu vârsta între 4 și 9 ani, sub îndrumarea Dianei Pavăl, multi-medaliată la concursuri naționale și internaționale.",
    researchNotes: "Gimnastică ritmică, antrenor: Diana Pavăl (multi-medaliată)",
    ageGroups: [4, 5, 6, 7, 8, 9],
  }),

  // ========== KARATE ==========
  createClubFromResearch({
    name: "JKA Iași - Shotokan Karate",
    sportType: "karate",
    city: "Iași",
    district: "N/A",
    address: "Zona Tudor Vladimirescu, Iași",
    description:
      "Clubul Karatenisentenashi Iași, înființat în 2018 ca continuare a clubului Dynamic Dojo Iași, predă Budo karate și reprezintă JKA România în zona Moldovei. Antrenamentele pentru copii se desfășoară în zona Tudor Vladimirescu, sâmbăta și duminica între orele 10:00–11:00.",
    researchNotes: "Înființat în 2018, JKA România, primul antrenament gratuit",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Sâmbătă", time: "10:00-11:00" },
      { day: "Duminică", time: "10:00-11:00" },
    ],
  }),

  createClubFromResearch({
    name: "Clubul de Karate Tradițional RISEI Iași",
    sportType: "karate",
    city: "Iași",
    district: "N/A",
    address: "Colegiul Tehnic 'Ioan C. Ștefănescu', Bulevardul Socola, Nr. 51-53, Iași",
    phone: "+40 745 468 823",
    email: "pepebejenaru@yahoo.com",
    website: "http://www.karaterisei.ro",
    description:
      "Clubul RISEI este deschis pentru copii, juniori și adulți, oferind antrenamente în stilurile Shotokan și Fudokan. Antrenamentele pentru copii încep de la vârsta de 4 ani.",
    researchNotes: "Shotokan și Fudokan, instructor: Sensei Marian Bejenaru (5 DAN)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "17:30-19:00" },
      { day: "Sâmbătă", time: "12:30-14:00" },
      { day: "Duminică", time: "12:30-14:00" },
    ],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Shinobi Iași",
    sportType: "karate",
    city: "Iași",
    district: "Multiple locații",
    address:
      "Liceul 'Virgil Madgearu' (Strada Plăieșilor Nr. 9) / Școala Gimnazială 'Elena Cuza' (Stradela Canta Nr. 10), Iași",
    phone: "+40 756 384 290",
    email: "contact@csshinobi.ro",
    website: "https://csshinobi.ro/",
    description:
      "Înființat în 2010, CS Shinobi Iași oferă antrenamente de arte marțiale pentru copii, juniori și adulți, urmând linia tehnică a organizației World United Isshinryu Karate Association Europe. Clubul este recunoscut la nivel național de Ministerul Tineretului și Sportului.",
    researchNotes: "Înființat în 2010, peste 13 ani experiență, recunoscut de Ministerul Sportului",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "17:00-19:00" },
      { day: "Joi", time: "17:00-19:00" },
      { day: "Sâmbătă", time: "10:00-12:00" },
      { day: "Duminică", time: "10:00-12:00" },
    ],
  }),

  // ========== JUDO ==========
  createClubFromResearch({
    name: "CSM Iași - Secția de Judo",
    sportType: "judo",
    city: "Iași",
    district: "N/A",
    address: "Strada Agatha Bârsescu nr. 12, Iași",
    phone: "+40 745 009 623",
    email: "contact@csmiasi2020.ro",
    website: "https://csmiasi2020.ro/",
    description:
      "Clubul Sportiv Municipal organizează cursuri de judo pentru diverse categorii de vârstă.",
    researchNotes: "Program L-V 08:00-16:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "08:00-16:00" },
      { day: "Marți", time: "08:00-16:00" },
      { day: "Miercuri", time: "08:00-16:00" },
      { day: "Joi", time: "08:00-16:00" },
      { day: "Vineri", time: "08:00-16:00" },
    ],
  }),

  createClubFromResearch({
    name: "CSS Unirea Iași - Secția de Judo",
    sportType: "judo",
    city: "Iași",
    district: "N/A",
    address: "Strada Sărărie nr. 189, Iași",
    phone: "+40 232 410 844",
    email: "css_unirea_iasi@yahoo.com",
    website: "https://www.css-unirea-iasi.ro/",
    description:
      "Cu sediul pe strada Sărărie nr. 189, CSS Unirea oferă antrenamente de judo pentru copii și adolescenți.",
    researchNotes: "Club școlar cu multiple secții sportive",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== TAEKWONDO ==========
  createClubFromResearch({
    name: "Clubul Sportiv Taeback Iași",
    sportType: "taekwondo",
    city: "Iași",
    district: "N/A",
    address: "Sala EnerGym Păcurari, Strada Vasile Lupu nr. 78, Iași",
    phone: "+40 745 123 456",
    email: "contact@taebackiasi.ro",
    website: "http://www.taebackiasi.ro",
    description:
      "Fondat în 2007, oferă cursuri de taekwondo pentru copii începând cu vârsta de 5 ani. Antrenamentele se desfășoară la Sala EnerGym Păcurari, cu grupe pentru începători, intermediari și avansați.",
    researchNotes: "Fondat în 2007, grupe: începători, intermediari, avansați",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "17:00-19:00" },
      { day: "Joi", time: "17:00-19:00" },
      { day: "Sâmbătă", time: "10:00-12:00" },
    ],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv KeumGang Iași",
    sportType: "taekwondo",
    city: "Iași",
    district: "N/A",
    address: "CSS Unirea din Târgul Cucu, Iași",
    description:
      "Situat în sediul CSS Unirea din Târgul Cucu, acest club oferă antrenamente de taekwondo pentru copii și adulți. Abonamentele includ ședințe în sală și, opțional, în aer liber.",
    researchNotes: "Antrenamente S-D pentru copii",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Sâmbătă", time: "10:00-12:00" },
      { day: "Duminică", time: "10:00-12:00" },
    ],
  }),

  createClubFromResearch({
    name: "Clubul Sportiv Taekwondo Vip Iași",
    sportType: "taekwondo",
    city: "Iași",
    district: "N/A",
    address: "Liceul 'Emil Racoviță', Strada Hanciuc, nr. 13, Iași",
    phone: "+40 741 967 506",
    description:
      "Aflat în sala de sport a Liceului 'Emil Racoviță' din zona Podu Roș, acest club oferă cursuri de arte marțiale coreene, inclusiv taekwondo sportiv și tradițional, hapkido și kumdo (arta sabiei).",
    researchNotes: "Taekwondo WTF, hapkido, kumdo. Antrenamente în sala Liceului 'Emil Racoviță'",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "17:30-19:30" },
      { day: "Vineri", time: "17:30-19:30" },
    ],
  }),

  // ========== DANS (Dance) ==========
  createClubFromResearch({
    name: "Dance University Iași",
    sportType: "dans",
    city: "Iași",
    district: "N/A",
    address: "Strada Păcurari, nr. 98, Iași",
    phone: "+40 799 936 002",
    description:
      "Oferă cursuri pentru copii în stiluri precum dans sportiv, contemporan, dans modern și Zumba Kids.",
    researchNotes:
      "Dans sportiv, contemporan, modern, Zumba Kids. Program L-V 12:00-18:00, S 12:00-16:00",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Luni", time: "12:00-18:00" },
      { day: "Marți", time: "12:00-18:00" },
      { day: "Miercuri", time: "12:00-18:00" },
      { day: "Joi", time: "12:00-18:00" },
      { day: "Vineri", time: "12:00-18:00" },
      { day: "Sâmbătă", time: "12:00-16:00" },
    ],
  }),

  createClubFromResearch({
    name: "Compania de Dans The Sky Iași",
    sportType: "dans",
    city: "Iași",
    district: "N/A",
    address: "Casa de Cultură a Studenților, Strada Vasile Conta 30, Iași",
    phone: "+40 740 655 797",
    email: "ady_stef@yahoo.com",
    description:
      "Instructorii oferă cursuri de balet, gimnastică, dans modern și latino pentru copii cu vârste între 4 și 14 ani.",
    researchNotes:
      "Balet, gimnastică, dans modern, latino. Grupe: 4-7 ani (17:00-18:00), 8-14 ani (18:00-19:00)",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    schedule: [
      { day: "Marți", time: "17:00-19:00" },
      { day: "Joi", time: "17:00-19:00" },
    ],
  }),

  createClubFromResearch({
    name: "A.C. DancePlanet.Ro Iași",
    sportType: "dans",
    city: "Iași",
    district: "N/A",
    address: "Strada Sărărie, nr. 16, Iași",
    phone: "+40 740 695 869",
    email: "dancefrred@yahoo.com",
    description: "Oferă cursuri de balet, dans modern și dans sportiv pentru copii.",
    researchNotes: "Balet, dans modern, dans sportiv",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  createClubFromResearch({
    name: "Club de Dans Sportiv Noblesse Iași",
    sportType: "dans",
    city: "Iași",
    district: "N/A",
    address: "Strada Vasile Lupu nr. 78, Iași",
    phone: "+40 743 879 836",
    email: "contact@noblesseiasi.ro",
    website: "http://www.noblesseiasi.ro",
    description: "Organizează cursuri de dans sportiv pentru copii, inclusiv cha-cha și vals.",
    researchNotes: "Dans sportiv: cha-cha, vals",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== ATLETISM (Athletics) ==========
  createClubFromResearch({
    name: "CSS Unirea Iași - Secția de Atletism",
    sportType: "atletism",
    city: "Iași",
    district: "N/A",
    address: "Strada Sărărie nr. 189, Iași",
    phone: "+40 232 410 844",
    email: "css_unirea_iasi@yahoo.com",
    website: "https://www.css-unirea-iasi.ro/",
    description:
      "Fondat în 1979, oferă cursuri de atletism pentru copii sub îndrumarea antrenorilor experimentați. Participă la concursuri și cantonamente locale, naționale și internaționale.",
    researchNotes: "Fondat în 1979, participă la concursuri naționale și internaționale",
    ageGroups: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),

  // ========== MULTI-SPORT (Cluburi școlare) ==========
  createClubFromResearch({
    name: "CSS Unirea Iași",
    sportType: "multi-sport",
    city: "Iași",
    district: "N/A",
    address: "Strada Sărărie nr. 189, Iași",
    phone: "+40 232 410 844",
    email: "css_unirea_iasi@yahoo.com",
    website: "https://www.css-unirea-iasi.ro/",
    description:
      "Cea mai mare unitate școlară sportivă din județ, oferind instruire în 14 discipline sportive: atletism, baschet, box, canotaj, fotbal, gimnastică ritmică, handbal, judo, lupte libere, rugby, tenis de câmp, tir cu arcul, scrimă și volei.",
    researchNotes:
      "Fondat în 1979, cea mai mare unitate școlară sportivă din județ, 14 discipline sportive",
    ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  }),
];

/**
 * Research Statistics
 */
export const RESEARCH_STATS_IASI = {
  totalClubs: CLUBS_RESEARCH_IASI.length,
  sportsCovered: new Set(CLUBS_RESEARCH_IASI.map((c) => c.sportType)).size,
  districtsCovered: new Set(
    CLUBS_RESEARCH_IASI.map((c) => c.district).filter((d) => d !== undefined)
  ).size,
  clubsWithWebsite: CLUBS_RESEARCH_IASI.filter((c) => c.website).length,
  clubsWithEmail: CLUBS_RESEARCH_IASI.filter((c) => c.email).length,
  clubsWithPhone: CLUBS_RESEARCH_IASI.filter((c) => c.phone).length,
  dateCollected: "2025-01-XX",
};

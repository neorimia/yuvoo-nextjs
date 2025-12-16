/**
 * Sports Seed Data
 *
 * Reference data for sports in Romania.
 * Currently used as reference data (sports stored as text in clubs.sportType).
 * Can be migrated to a sports table in the future.
 *
 * All sports are appropriate for children ages 4-14.
 */

export interface SportData {
  id: string;
  name: string; // Romanian name
  slug: string; // URL-friendly slug
  description: string; // Brief description in Romanian
  icon?: string; // Icon identifier (Flaticon class)
  minAge: number; // Minimum recommended age
  maxAge: number; // Maximum recommended age
  category: "echipa" | "individual" | "combat" | "artistic" | "altul";
}

/**
 * Comprehensive list of sports for Romanian children
 */
export const SPORTS_DATA: SportData[] = [
  // Team Sports
  {
    id: "fotbal",
    name: "Fotbal",
    slug: "fotbal",
    description:
      "Fotbalul este cel mai popular sport de echipă, dezvoltând coordonare, echilibru și spirit de echipă.",
    icon: "flaticon-soccer",
    minAge: 5,
    maxAge: 14,
    category: "echipa",
  },
  {
    id: "baschet",
    name: "Baschet",
    slug: "baschet",
    description:
      "Baschetul dezvoltă agilitatea, coordonarea și înălțimea, fiind ideal pentru copiii activi.",
    icon: "flaticon-basketball",
    minAge: 6,
    maxAge: 14,
    category: "echipa",
  },
  {
    id: "volei",
    name: "Volei",
    slug: "volei",
    description:
      "Voleiul este un sport de echipă care dezvoltă reflexele, coordonarea și spiritul de echipă.",
    icon: "flaticon-volleyball",
    minAge: 8,
    maxAge: 14,
    category: "echipa",
  },
  {
    id: "handbal",
    name: "Handbal",
    slug: "handbal",
    description: "Handbalul este un sport rapid care dezvoltă viteza, agilitatea și coordonarea.",
    icon: "flaticon-handball",
    minAge: 8,
    maxAge: 14,
    category: "echipa",
  },
  {
    id: "rugby",
    name: "Rugby",
    slug: "rugby",
    description:
      "Rugby-ul dezvoltă forța, rezistența și spiritul de echipă, fiind ideal pentru copiii mai mari.",
    icon: "flaticon-rugby",
    minAge: 8,
    maxAge: 14,
    category: "echipa",
  },
  {
    id: "hochei",
    name: "Hochei pe gheață",
    slug: "hochei",
    description: "Hocheiul pe gheață dezvoltă echilibrul, coordonarea și viteza de reacție.",
    icon: "flaticon-hockey",
    minAge: 6,
    maxAge: 14,
    category: "echipa",
  },

  // Individual Sports
  {
    id: "tenis",
    name: "Tenis",
    slug: "tenis",
    description:
      "Tenisul dezvoltă coordonarea, agilitatea și concentrarea, fiind un sport complet.",
    icon: "flaticon-tennis",
    minAge: 4,
    maxAge: 14,
    category: "individual",
  },
  {
    id: "tenis-de-masa",
    name: "Tenis de masă",
    slug: "tenis-de-masa",
    description:
      "Tenisul de masă dezvoltă reflexele rapide, coordonarea ochi-mână și concentrarea.",
    icon: "flaticon-table-tennis",
    minAge: 6,
    maxAge: 14,
    category: "individual",
  },
  {
    id: "badminton",
    name: "Badminton",
    slug: "badminton",
    description:
      "Badmintonul este un sport rapid care dezvoltă agilitatea, coordonarea și rezistența.",
    icon: "flaticon-badminton",
    minAge: 6,
    maxAge: 14,
    category: "individual",
  },
  {
    id: "atletism",
    name: "Atletism",
    slug: "atletism",
    description:
      "Atletismul include alergare, sărituri și aruncări, dezvoltând toate calitățile fizice.",
    icon: "flaticon-running",
    minAge: 6,
    maxAge: 14,
    category: "individual",
  },
  {
    id: "ciclism",
    name: "Ciclism",
    slug: "ciclism",
    description:
      "Ciclismul dezvoltă rezistența, echilibrul și coordonarea, fiind ideal pentru activități în aer liber.",
    icon: "flaticon-cycling",
    minAge: 6,
    maxAge: 14,
    category: "individual",
  },
  {
    id: "inot",
    name: "Înot",
    slug: "inot",
    description:
      "Înotul este un sport complet care dezvoltă toate grupurile musculare și capacitatea pulmonară.",
    icon: "flaticon-swimming",
    minAge: 4,
    maxAge: 14,
    category: "individual",
  },
  {
    id: "patinaj",
    name: "Patinaj",
    slug: "patinaj",
    description:
      "Patinajul dezvoltă echilibrul, coordonarea și grația, fiind disponibil atât pe gheață cât și pe role.",
    icon: "flaticon-skating",
    minAge: 4,
    maxAge: 14,
    category: "individual",
  },
  {
    id: "schi",
    name: "Schi",
    slug: "schi",
    description:
      "Schiul dezvoltă echilibrul, coordonarea și rezistența, fiind ideal pentru iernile în munți.",
    icon: "flaticon-skiing",
    minAge: 5,
    maxAge: 14,
    category: "individual",
  },

  // Combat Sports
  {
    id: "karate",
    name: "Karate",
    slug: "karate",
    description:
      "Karate-ul dezvoltă disciplina, respectul, coordonarea și forța, învățând și autoapărarea.",
    icon: "flaticon-karate",
    minAge: 5,
    maxAge: 14,
    category: "combat",
  },
  {
    id: "judo",
    name: "Judo",
    slug: "judo",
    description:
      "Judo-ul dezvoltă forța, echilibrul și disciplina, învățând tehnici de luptă și autoapărare.",
    icon: "flaticon-judo",
    minAge: 5,
    maxAge: 14,
    category: "combat",
  },
  {
    id: "taekwondo",
    name: "Taekwondo",
    slug: "taekwondo",
    description:
      "Taekwondo dezvoltă flexibilitatea, viteza și disciplina, combinând tehnici de lovituri și lovituri cu piciorul.",
    icon: "flaticon-martial-arts",
    minAge: 5,
    maxAge: 14,
    category: "combat",
  },
  {
    id: "scrima",
    name: "Scrimă",
    slug: "scrima",
    description:
      "Scrima dezvoltă coordonarea, reflexele rapide și concentrarea, fiind un sport elegant și strategic.",
    icon: "flaticon-fencing",
    minAge: 6,
    maxAge: 14,
    category: "combat",
  },
  {
    id: "box",
    name: "Box",
    slug: "box",
    description:
      "Boxul dezvoltă forța, viteza și coordonarea, învățând tehnici de autoapărare și disciplina.",
    icon: "flaticon-boxing",
    minAge: 8,
    maxAge: 14,
    category: "combat",
  },

  // Artistic/Performance
  {
    id: "gimnastica-artistica",
    name: "Gimnastică artistică",
    slug: "gimnastica-artistica",
    description:
      "Gimnastica artistică dezvoltă flexibilitatea, forța, coordonarea și grația, fiind un sport complet.",
    icon: "flaticon-gymnastics",
    minAge: 4,
    maxAge: 14,
    category: "artistic",
  },
  {
    id: "gimnastica-ritmica",
    name: "Gimnastică ritmică",
    slug: "gimnastica-ritmica",
    description:
      "Gimnastica ritmică combină mișcarea cu muzica, dezvoltând grația, flexibilitatea și coordonarea.",
    icon: "flaticon-rhythmic-gymnastics",
    minAge: 4,
    maxAge: 14,
    category: "artistic",
  },
  {
    id: "dans",
    name: "Dans",
    slug: "dans",
    description:
      "Dansul include balet, dans modern și latino, dezvoltând grația, flexibilitatea și expresivitatea.",
    icon: "flaticon-dance",
    minAge: 4,
    maxAge: 14,
    category: "artistic",
  },
  {
    id: "patinaj-artistic",
    name: "Patinaj artistic",
    slug: "patinaj-artistic",
    description:
      "Patinajul artistic combină sportul cu arta, dezvoltând grația, echilibrul și coordonarea.",
    icon: "flaticon-figure-skating",
    minAge: 4,
    maxAge: 14,
    category: "artistic",
  },

  // Other
  {
    id: "echitatie",
    name: "Echiță",
    slug: "echitatie",
    description:
      "Echiția dezvoltă echilibrul, coordonarea și responsabilitatea, creând o legătură specială cu caii.",
    icon: "flaticon-horse-riding",
    minAge: 6,
    maxAge: 14,
    category: "altul",
  },
  {
    id: "tiro-cu-arcul",
    name: "Tir cu arcul",
    slug: "tiro-cu-arcul",
    description:
      "Tirul cu arcul dezvoltă concentrarea, precizia și disciplina, fiind un sport de precizie.",
    icon: "flaticon-archery",
    minAge: 8,
    maxAge: 14,
    category: "altul",
  },
  {
    id: "alpinism",
    name: "Alpinism",
    slug: "alpinism",
    description:
      "Alpinismul dezvoltă forța, rezistența și spiritul de echipă, fiind ideal pentru copiii mai mari.",
    icon: "flaticon-climbing",
    minAge: 8,
    maxAge: 14,
    category: "altul",
  },
];

/**
 * Get sport data by slug
 */
export function getSportBySlug(slug: string): SportData | undefined {
  return SPORTS_DATA.find((sport) => sport.slug === slug);
}

/**
 * Get sport data by ID
 */
export function getSportById(id: string): SportData | undefined {
  return SPORTS_DATA.find((sport) => sport.id === id);
}

/**
 * Get all sports in a category
 */
export function getSportsByCategory(category: SportData["category"]): SportData[] {
  return SPORTS_DATA.filter((sport) => sport.category === category);
}

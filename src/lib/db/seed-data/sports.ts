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
  image?: string; // Image URL
  icon?: string; // Icon identifier (Flaticon class)
  minAge: number; // Minimum recommended age
  maxAge: number; // Maximum recommended age
  category: "echipa" | "individual" | "combat" | "artistic" | "altul";
  featured: boolean;
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
      "Fotbalul este cel mai popular sport de echipă din lume și unul dintre cele mai iubite sporturi în România. Oferă dezvoltare fizică completă, spirit de echipă, disciplină și abilități sociale esențiale pentru copii. Ideal pentru copiii activi care se bucură de activități în grup și doresc să-și dezvolte coordonarea, viteza și gândirea strategică.",
    image: "/assets/img/sports/fotbal.jpg",
    icon: "flaticon-sports",
    minAge: 5,
    maxAge: 14,
    category: "echipa",
    featured: true,
  },
  {
    id: "baschet",
    name: "Baschet",
    slug: "baschet",
    description:
      "Baschetul este unul dintre cele mai dinamice și captivante sporturi de echipă, combinând abilități fizice, strategie și spirit de echipă. Dezvoltă coordonarea, agilitatea, înălțimea, gândirea strategică și comunicarea în echipă. Ideal pentru copiii activi care doresc dezvoltare fizică completă și abilități sociale valoroase.",
    image: "/assets/img/sports/baschet.jpg",
    icon: "flaticon-sports",
    minAge: 6,
    maxAge: 14,
    category: "echipa",
    featured: true,
  },
  {
    id: "volei",
    name: "Volei",
    slug: "volei",
    description:
      "Voleiul este un sport de echipă dinamic și captivant care combină abilități fizice, strategie și spirit de echipă. Dezvoltă reflexele rapide, coordonarea, agilitatea, gândirea strategică și comunicarea în echipă. Ideal pentru copiii care doresc un sport tehnic, rapid și care să-i ajute să-și îmbunătățească condiția fizică.",
    image: "/assets/img/sports/volei.jpg",
    icon: "flaticon-sports",
    minAge: 8,
    maxAge: 14,
    category: "echipa",
    featured: false,
  },
  {
    id: "handbal",
    name: "Handbal",
    slug: "handbal",
    description:
      "Handbalul este un sport de echipă rapid și dinamic cu tradiție excepțională în România. Combină abilități fizice, strategie și spirit de echipă, dezvoltând viteza, agilitatea, coordonarea și gândirea strategică. Ideal pentru copiii activi care doresc un sport captivant, tehnic și care oferă oportunități excelente de dezvoltare.",
    image: "/assets/img/sports/handbal.jpg",
    icon: "flaticon-sports",
    minAge: 8,
    maxAge: 14,
    category: "echipa",
    featured: false,
  },
  {
    id: "rugby",
    name: "Rugby",
    slug: "rugby",
    description:
      "Rugby-ul dezvoltă forța, rezistența și spiritul de echipă, fiind ideal pentru copiii mai mari. Oferă dezvoltare fizică completă, coordonare, agilitate și învață valoarea lucrului în echipă. Este un sport care promovează respectul, disciplina și cooperarea între jucători, oferind oportunități excelente pentru dezvoltare personală și socială.",
    image: "/assets/img/sports/rugby.jpg",
    icon: "flaticon-sports",
    minAge: 8,
    maxAge: 14,
    category: "echipa",
    featured: false,
  },
  {
    id: "hochei",
    name: "Hochei pe gheață",
    slug: "hochei",
    description:
      "Hocheiul pe gheață dezvoltă echilibrul, coordonarea și viteza de reacție. Este un sport de echipă dinamic care combină abilități fizice, strategie și spirit competitiv. Oferă dezvoltare completă a condiției fizice, coordonare excepțională și învață copiii valoarea lucrului în echipă, respectului și disciplinei într-un mediu controlat și sigur.",
    image: "/assets/img/sports/hochei.jpg",
    icon: "flaticon-sports",
    minAge: 6,
    maxAge: 14,
    category: "echipa",
    featured: false,
  },

  // Individual Sports
  {
    id: "tenis",
    name: "Tenis",
    slug: "tenis",
    description:
      "Tenisul este un sport elegant și complet care combină abilități fizice, mentale și strategice. Dezvoltă coordonarea ochi-mână, agilitatea, concentrarea, strategia și responsabilitatea individuală. În România are tradiție puternică și este ideal pentru dezvoltarea armonioasă a copiilor, oferind oportunități excelente pentru creștere personală.",
    image: "/assets/img/sports/tenis.jpg",
    icon: "flaticon-sports",
    minAge: 4,
    maxAge: 14,
    category: "individual",
    featured: true,
  },
  {
    id: "tenis-de-masa",
    name: "Tenis de masă",
    slug: "tenis-de-masa",
    description:
      "Tenisul de masă dezvoltă reflexele rapide, coordonarea ochi-mână și concentrarea. Este un sport accesibil care poate fi practicat în interior, oferind dezvoltare fizică și mentală excelentă. Combină viteză, precizie și strategie, fiind ideal pentru copiii care doresc să-și îmbunătățească coordonarea, reflexele și capacitatea de concentrare într-un sport captivant și tehnic.",
    image: "/assets/img/sports/tenis-de-masa.jpg",
    icon: "flaticon-sports",
    minAge: 6,
    maxAge: 14,
    category: "individual",
    featured: false,
  },
  {
    id: "badminton",
    name: "Badminton",
    slug: "badminton",
    description:
      "Badmintonul este un sport rapid care dezvoltă agilitatea, coordonarea și rezistența. Combină viteză, precizie și strategie într-un joc dinamic și captivant. Oferă dezvoltare fizică completă, îmbunătățește reflexele și coordonarea ochi-mână, fiind ideal pentru copiii activi care doresc un sport tehnic, competitiv și care să-i ajute să-și mențină forma fizică excelentă.",
    image: "/assets/img/sports/badminton.jpg",
    icon: "flaticon-sports",
    minAge: 6,
    maxAge: 14,
    category: "individual",
    featured: false,
  },
  {
    id: "atletism",
    name: "Atletism",
    slug: "atletism",
    description:
      "Atletismul include alergare, sărituri și aruncări, dezvoltând toate calitățile fizice. Este considerat regina sporturilor, oferind baza pentru multe alte discipline. Oferă dezvoltare completă a condiției fizice, coordonare, forță, viteză și rezistență. Ideal pentru copiii care doresc să exploreze diferite discipline atletice și să-și dezvolte potențialul fizic complet într-un mediu structurat și organizat.",
    image: "/assets/img/sports/atletism.jpg",
    icon: "flaticon-sports",
    minAge: 6,
    maxAge: 14,
    category: "individual",
    featured: false,
  },
  {
    id: "ciclism",
    name: "Ciclism",
    slug: "ciclism",
    description:
      "Ciclismul dezvoltă rezistența, echilibrul și coordonarea, fiind ideal pentru activități în aer liber. Oferă oportunități excelente pentru explorare, aventură și conectare cu natura. Combină activitate fizică intensă cu recreere și transport activ, fiind un mod sănătos de a menține forma fizică și de a dezvolta independență și responsabilitate în utilizarea bicicletei în siguranță.",
    image: "/assets/img/sports/ciclism.jpg",
    icon: "flaticon-cycling",
    minAge: 6,
    maxAge: 14,
    category: "individual",
    featured: false,
  },
  {
    id: "inot",
    name: "Înot",
    slug: "inot",
    description:
      "Înotul este considerat unul dintre cele mai complete și sănătoase sporturi pentru copii, oferind dezvoltare fizică armonioasă și abilități esențiale pentru viață. Dezvoltă toate grupurile musculare, capacitatea pulmonară, siguranța în apă și coordonarea. Ideal pentru copiii de toate tipurile, inclusiv cei cu probleme de articulații, oferind beneficii fizice și mentale excepționale.",
    image: "/assets/img/sports/inot.jpg",
    icon: "flaticon-sports",
    minAge: 4,
    maxAge: 14,
    category: "individual",
    featured: true,
  },
  {
    id: "patinaj",
    name: "Patinaj",
    slug: "patinaj",
    description:
      "Patinajul dezvoltă echilibrul, coordonarea și grația, fiind disponibil atât pe gheață cât și pe role. Este un sport versatil care oferă dezvoltare fizică completă, îmbunătățește echilibrul și coordonarea, și poate fi practicat atât recreativ cât și competitiv. Ideal pentru copiii care doresc un sport elegant, distractiv și care să-i ajute să-și dezvolte grația și controlul corporal.",
    image: "/assets/img/sports/patinaj.jpg",
    icon: "flaticon-sports",
    minAge: 4,
    maxAge: 14,
    category: "individual",
    featured: false,
  },
  {
    id: "schi",
    name: "Schi",
    slug: "schi",
    description:
      "Schiul dezvoltă echilibrul, coordonarea și rezistența, fiind ideal pentru iernile în munți. Oferă oportunități excelente pentru activități în aer liber și conectare cu natura. Combină aventură cu dezvoltare fizică, oferind beneficii complete pentru condiția fizică și mentală. Ideal pentru copiii care doresc să exploreze munții, să-și dezvolte abilități tehnice și să experimenteze sporturile de iarnă într-un mediu sigur.",
    image: "/assets/img/sports/schi.jpg",
    icon: "flaticon-sports",
    minAge: 5,
    maxAge: 14,
    category: "individual",
    featured: false,
  },

  // Combat Sports
  {
    id: "karate",
    name: "Karate",
    slug: "karate",
    description:
      "Karate-ul este o artă marțială tradițională japoneză care combină tehnici de autoapărare cu dezvoltarea fizică, mentală și spirituală. Dezvoltă disciplina, respectul, coordonarea, forța, autocontrolul și încrederea în sine. În România este unul dintre cele mai populare sporturi de luptă pentru copii, oferind o abordare disciplinată și structurată care promovează valorile esențiale.",
    image: "/assets/img/sports/karate.jpg",
    icon: "flaticon-sports",
    minAge: 5,
    maxAge: 14,
    category: "combat",
    featured: true,
  },
  {
    id: "judo",
    name: "Judo",
    slug: "judo",
    description:
      "Judo-ul este o artă marțială japoneză modernă și unul dintre cele mai populare sporturi olimpice de luptă pentru copii. Combină tehnici de luptă cu dezvoltarea fizică, mentală și spirituală. Dezvoltă forța, echilibrul, disciplina, respectul, autocontrolul și încrederea în sine. În România are tradiție puternică și este foarte accesibil pentru copii, oferind oportunități excelente.",
    image: "/assets/img/sports/judo.jpg",
    icon: "flaticon-sports",
    minAge: 5,
    maxAge: 14,
    category: "combat",
    featured: false,
  },
  {
    id: "taekwondo",
    name: "Taekwondo",
    slug: "taekwondo",
    description:
      "Taekwondo dezvoltă flexibilitatea, viteza și disciplina, combinând tehnici de lovituri și lovituri cu piciorul. Este o artă marțială coreeană modernă care oferă dezvoltare fizică completă, îmbunătățește flexibilitatea excepțională și promovează valorile de respect și autocontrol. Ideal pentru copiii care doresc un sport dinamic, competitiv și care să-i ajute să-și dezvolte abilități de autoapărare într-un mediu structurat.",
    image: "/assets/img/sports/taekwondo.jpg",
    icon: "flaticon-sports",
    minAge: 5,
    maxAge: 14,
    category: "combat",
    featured: false,
  },
  {
    id: "scrima",
    name: "Scrimă",
    slug: "scrima",
    description:
      "Scrima dezvoltă coordonarea, reflexele rapide și concentrarea, fiind un sport elegant și strategic. Este o artă marțială rafinată care combină precizie, viteză și gândire strategică profundă. Oferă dezvoltare fizică și mentală excepțională, îmbunătățește coordonarea ochi-mână și învață copiii valoarea disciplinei, respectului și eleganței într-un sport olimpic captivant și tehnical.",
    image: "/assets/img/sports/scrima.jpg",
    icon: "flaticon-sports",
    minAge: 6,
    maxAge: 14,
    category: "combat",
    featured: false,
  },
  {
    id: "box",
    name: "Box",
    slug: "box",
    description:
      "Boxul dezvoltă forța, viteza și coordonarea, învățând tehnici de autoapărare și disciplina. Este un sport de luptă care oferă dezvoltare fizică completă, îmbunătățește condiția cardiovasculară și musculară, și promovează valorile de respect și autocontrol. Ideal pentru copiii mai mari care doresc un sport dinamic, competitiv și care să-i ajute să-și dezvolte încrederea și disciplina într-un mediu controlat și sigur.",
    image: "/assets/img/sports/box.jpg",
    icon: "flaticon-sports",
    minAge: 8,
    maxAge: 14,
    category: "combat",
    featured: false,
  },

  // Artistic/Performance
  {
    id: "gimnastica-artistica",
    name: "Gimnastică artistică",
    slug: "gimnastica-artistica",
    description:
      "Gimnastica artistică este unul dintre cele mai complete și elegante sporturi pentru copii, combinând forță, flexibilitate, coordonare și grație. În România are tradiție excepțională cu mulți campioni olimpici. Dezvoltă disciplina mentală, concentrarea, perseverența și încrederea în sine. Ideal pentru copiii care doresc dezvoltare fizică și mentală excepțională într-un mediu structurat.",
    image: "/assets/img/sports/gimnastica-artistica.jpg",
    icon: "flaticon-sports",
    minAge: 4,
    maxAge: 14,
    category: "artistic",
    featured: true,
  },
  {
    id: "gimnastica-ritmica",
    name: "Gimnastică ritmică",
    slug: "gimnastica-ritmica",
    description:
      "Gimnastica ritmică combină mișcarea cu muzica, dezvoltând grația, flexibilitatea și coordonarea. Este un sport artistic elegant care oferă dezvoltare fizică completă, îmbunătățește flexibilitatea excepțională și permite copiilor să-și exprime creativitatea prin mișcare și coregrafii. Ideal pentru copiii care doresc un sport care combină arta cu sportul, oferind oportunități pentru performanță și expresie artistică.",
    image: "/assets/img/sports/gimnastica-ritmica.jpg",
    icon: "flaticon-sports",
    minAge: 4,
    maxAge: 14,
    category: "artistic",
    featured: false,
  },
  {
    id: "dans",
    name: "Dans",
    slug: "dans",
    description:
      "Dansul este o formă de artă și expresie care combină mișcarea, muzica și creativitatea. Include balet clasic, dans modern, contemporan și latino. Dezvoltă grația, flexibilitatea, expresivitatea, coordonarea, ritmul și creativitatea. Ideal pentru copiii care doresc să-și exprime personalitatea prin mișcare și artă, oferind oportunități pentru dezvoltare artistică și fizică completă într-un mediu creativ.",
    image: "/assets/img/sports/dans.jpg",
    icon: "flaticon-sports",
    minAge: 4,
    maxAge: 14,
    category: "artistic",
    featured: false,
  },
  {
    id: "patinaj-artistic",
    name: "Patinaj artistic",
    slug: "patinaj-artistic",
    description:
      "Patinajul artistic combină sportul cu arta, dezvoltând grația, echilibrul și coordonarea. Este un sport elegant care oferă dezvoltare fizică completă, îmbunătățește echilibrul excepțional și permite copiilor să-și exprime creativitatea prin mișcare și coregrafii pe gheață. Ideal pentru copiii care doresc un sport care combină performanță tehnică cu expresie artistică, oferind oportunități pentru competiție și spectacole.",
    image: "/assets/img/sports/patinaj-artistic.jpg",
    icon: "flaticon-sports",
    minAge: 4,
    maxAge: 14,
    category: "artistic",
    featured: false,
  },

  // Other
  {
    id: "echitatie",
    name: "Echiție",
    slug: "echitatie",
    description:
      "Echiția dezvoltă echilibrul, coordonarea și responsabilitatea, creând o legătură specială cu caii. Este un sport unic care combină activitatea fizică cu îngrijirea animalelor, oferind dezvoltare completă a echilibrului, coordonării și abilităților de responsabilitate. Ideal pentru copiii care doresc să se conecteze cu natura, să învețe despre îngrijirea animalelor și să-și dezvolte încrederea prin interacțiunea cu caii într-un mediu sigur și structurat.",
    image: "/assets/img/sports/echitatie.jpg",
    icon: "flaticon-sports",
    minAge: 6,
    maxAge: 14,
    category: "altul",
    featured: false,
  },
  {
    id: "tiro-cu-arcul",
    name: "Tir cu arcul",
    slug: "tiro-cu-arcul",
    description:
      "Tirul cu arcul dezvoltă concentrarea, precizia și disciplina, fiind un sport de precizie. Oferă dezvoltare mentală excepțională, îmbunătățește capacitatea de concentrare intensă și învață copiii valoarea disciplinei și controlului. Ideal pentru copiii care doresc un sport care combină abilități fizice cu dezvoltare mentală profundă, oferind oportunități pentru competiție și perfecționare tehnică într-un mediu controlat și sigur.",
    image: "/assets/img/sports/tiro-cu-arcul.jpg",
    icon: "flaticon-sports",
    minAge: 8,
    maxAge: 14,
    category: "altul",
    featured: false,
  },
  {
    id: "alpinism",
    name: "Alpinism",
    slug: "alpinism",
    description:
      "Alpinismul dezvoltă forța, rezistența și spiritul de echipă, fiind ideal pentru copiii mai mari. Oferă oportunități excelente pentru explorare montană, aventură responsabilă și conectare cu natura. Combină activitate fizică intensă cu dezvoltare mentală, învățând copiii valoarea planificării, siguranței și cooperării. Ideal pentru copiii care doresc să exploreze munții, să-și dezvolte abilități tehnice și să experimenteze sporturile de aventură într-un mediu sigur.",
    image: "/assets/img/sports/alpinism.jpg",
    icon: "flaticon-sports",
    minAge: 8,
    maxAge: 14,
    category: "altul",
    featured: false,
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

/**
 * Get featured sports
 */
export function getFeaturedSports(): SportData[] {
  return SPORTS_DATA.filter((sport) => sport.featured);
}

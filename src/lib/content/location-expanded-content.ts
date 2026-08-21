/**
 * Location page expanded content generator for local SEO.
 * Produces unique, data-driven copy per city/district (target: 500+ words rendered).
 */

import type { Club } from "@/modules/clubs/clubs.types";

export interface LocationSiblingLink {
  slug: string;
  displayName: string;
}

export interface LocationSportStat {
  name: string;
  slug: string;
  count: number;
}

export interface LocationExpandedContent {
  cityParagraph: string;
  districtParagraph?: string;
  stats: {
    totalClubs: number;
    verifiedClubs: number;
    sportCount: number;
    minAge: number | null;
    maxAge: number | null;
  };
  howToChoose: string;
  popularSports: LocationSportStat[];
  ageGuide: string;
  localFaq: Array<{ question: string; answer: string }>;
  siblingLocations: LocationSiblingLink[];
}

const CITY_PARAGRAPHS: Record<string, string> = {
  București:
    "București concentrează cea mai mare diversitate de cluburi sportive pentru copii din România: fotbal în complexuri moderne, înot în bazine publice și private, gimnastică, dans și arte marțiale în fiecare sector. Părinții compară ușor distanța față de casă, programul după școală și tipul de antrenament (recreativ sau performanță). Yuvoo listează cluburi din capitală cu filtre pe sport, vârstă și badge de verificare.",
  "Cluj-Napoca":
    "Cluj-Napoca are o comunitate sportivă activă pentru copii, susținută de cluburi private și asociații locale. Orașul universitar atrage familii care caută baschet, tenis, înot sau karate cu programe structurate după-amiaza. Pe Yuvoo găsești cluburi din Cluj filtrate pe vârstă, plus recomandări din chestionarul AI când nu ești sigur ce activitate se potrivește copilului.",
  Timișoara:
    "Timișoara dezvoltă rapid infrastructura sportivă pentru copii — de la sporturi de echipă la tenis și înot. Părinții din Banat caută adesea cluburi aproape de cartier, cu antrenori calificați și probe înainte de abonament. Directorul Yuvoo pentru Timișoara arată câte cluburi există pe sport și ce vârste acceptă fiecare program.",
  Iași: "Iași combină tradiția sportului școlar cu cluburi private pentru copii. Familiile aleg fotbal, handbal, dans sau gimnastică pentru socializare și mișcare regulată. Yuvoo centralizează cluburi din Iași cu informații despre sport, locație și verificare, ca să programezi probe informate.",
  Constanța:
    "Constanța oferă înot, sporturi outdoor și programe de sală pe tot parcursul anului. Vară sau iarnă, cluburile structurează grupe pe vârstă pentru copiii 4–14 ani. Filtrează pe Yuvoo după sport și verificare înainte de prima vizită.",
  Brașov:
    "Brașov atrage familii care practică sporturi de iarnă și outdoor, dar și programe clasice de fotbal, înot sau gimnastică în sală. Proximitatea muntelui influențează oferta locală — schi, patinaj și drumeții organizate apar alături de sporturi de echipă. Yuvoo listează cluburi brașovene cu filtre pe vârstă și sport.",
  Craiova:
    "Craiova are tradiție în fotbal și handbal, iar cluburile pentru copii acoperă și dans, karate sau înot. Părinții olteni compară distanța, programul și badge-ul de verificare Yuvoo înainte de înscriere.",
  Galați:
    "Galați, ca oraș fluvial, pune accent pe înot și sporturi de echipă pentru copii. Cluburile locale organizează grupe pe vârstă; Yuvoo ajută la compararea opțiunilor din oraș și cartierele învecinate.",
  Oradea:
    "Oradea oferă programe de înot, gimnastică și sporturi de echipă cu acces facil din Bihor. Pe Yuvoo poți filtra cluburi verificate și programa probe fără să suni zeci de numere la întâmplare.",
  Ploiești:
    "Ploiești deservește familii din Prahova cu fotbal, dans, arte marțiale și alte activități după școală. Listarea Yuvoo arată câte cluburi există pe sport și ce vârste acceptă.",
};

/** Unique copy per București sector — swap-test safe (text invalid if sector name changes). */
const BUCHAREST_DISTRICT_PARAGRAPHS: Record<string, string> = {
  "Sector 1":
    "În Sectorul 1, cluburile sunt concentrate în zone precum Floreasca, Aviației și Pipera — utile familiilor care locuiesc sau lucrează în nordul capitalei. Accesul cu metroul și STB simplifică deplasarea după școală; multe cluburi au programe după ora 16:00.",
  "Sector 2":
    "Sectorul 2 (Colentina, Obor, Pantelimon) oferă mix de săli de cartier și complexe sportive mai mari. Părinții compară adesea distanța față de școală și durata drumului cu transportul public înainte de a alege abonamentul anual.",
  "Sector 3":
    "Sectorul 3, cu cartiere precum Titan, Dristor și Vitan, are densitate mare de familii — cerere ridicată pentru fotbal, înot și gimnastică după-amiaza. Verifică dacă clubul are locuri libere în grupa de vârstă a copilului tău; grupele se completează rapid.",
  "Sector 4":
    "Sectorul 4 (Berceni, Tineretului, Olteniței) combină cluburi de cartier cu acces relativ ușor spre centrul sportiv al sectorului. Ideal pentru copiii care preferă activități aproape de casă, fără traversarea orașului la ore de vârf.",
  "Sector 5":
    "Sectorul 5 (Rahova, Ferentari, 13 Septembrie) dezvoltă oferta pentru copii prin cluburi locale de fotbal, dans și arte marțiale. Compară badge-ul de verificare Yuvoo și cere probă înainte de plată — condițiile salălor variază.",
  "Sector 6":
    "Sectorul 6 (Militari, Drumul Taberei, Giulești) are multe opțiuni pentru copiii din vestul Bucureștiului. Parcările și legătura cu metroul influențează alegerea; filtrează pe Yuvoo după sport și vârstă pentru listă scurtă relevantă.",
};

const GENERIC_CITY_PARAGRAPH =
  "Alegerea unui club sportiv pentru copil merită timp: compară sporturile disponibile, distanța, programul antrenamentelor și experiența antrenorilor. Yuvoo listează cluburi locale cu filtre pe sport și vârstă, iar chestionarul AI propune punct de plecare obiectiv când nu ești sigur ce activitate se potrivește.";

function normalizeSportSlug(sportId: string): string {
  return sportId.toLowerCase().replace(/\s+/g, "-");
}

function computeSportStats(clubs: Club[]): LocationSportStat[] {
  const counts = new Map<string, { name: string; slug: string; count: number }>();

  for (const club of clubs) {
    const slug = normalizeSportSlug(club.sportId);
    const name = club.sportName;
    const existing = counts.get(slug);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(slug, { name, slug, count: 1 });
    }
  }

  return [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 5);
}

function computeAgeRange(clubs: Club[]): { minAge: number | null; maxAge: number | null } {
  const ages = clubs.flatMap((c) => c.ageGroups ?? []).filter((a) => typeof a === "number");
  if (ages.length === 0) {
    return { minAge: null, maxAge: null };
  }
  return { minAge: Math.min(...ages), maxAge: Math.max(...ages) };
}

function getCityKey(city: string): string {
  return city
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getDistrictParagraph(city: string, district?: string): string | undefined {
  if (!district || getCityKey(city) !== "bucuresti") return undefined;
  const normalized = district.replace(/^sectorul\s+/i, "Sector ").trim();
  for (const [key, text] of Object.entries(BUCHAREST_DISTRICT_PARAGRAPHS)) {
    if (getCityKey(key) === getCityKey(normalized) || normalized.includes(key)) {
      return text;
    }
  }
  return `În ${district}, părinții aleg de obicei cluburi la maximum 20–25 de minute de casă, cu program compatibil cu ora de ieșire de la școală. Compară adresa exactă și zilele de antrenament înainte de abonament anual.`;
}

function buildLocalFaq(
  locationDisplayName: string,
  clubs: Club[],
  verifiedClubs: number,
  minAge: number | null,
  maxAge: number | null
): Array<{ question: string; answer: string }> {
  const ageAnswer =
    minAge !== null && maxAge !== null
      ? `Cluburile listate în ${locationDisplayName} acceptă, în general, copii între ${minAge} și ${maxAge} ani — verifică pe fiecare profil grupele exacte.`
      : `Majoritatea cluburilor din ${locationDisplayName} organizează grupe pentru copii 4–14 ani; contactează clubul pentru confirmarea vârstei.`;

  return [
    {
      question: `Câte cluburi sportive pentru copii există în ${locationDisplayName}?`,
      answer: `Pe Yuvoo sunt listate ${clubs.length} cluburi în ${locationDisplayName}, dintre care ${verifiedClubs} au badge verificat. Numărul se actualizează pe măsură ce apar cluburi noi.`,
    },
    {
      question: `Ce vârstă minimă au programele din ${locationDisplayName}?`,
      answer: ageAnswer,
    },
    {
      question: `Cum aleg rapid un club în ${locationDisplayName}?`,
      answer: `Filtrează după sport și vârstă, compară cluburile verificate, citește programul și programează o probă. Chestionarul AI Yuvoo recomandă 2–3 sporturi potrivite dacă nu ai încă o preferință.`,
    },
  ];
}

export function generateLocationExpandedContent({
  city,
  district,
  locationDisplayName,
  clubs,
  siblingLocations,
}: {
  city: string;
  district?: string;
  locationDisplayName: string;
  clubs: Club[];
  siblingLocations: LocationSiblingLink[];
}): LocationExpandedContent {
  const verifiedClubs = clubs.filter((c) => c.verified).length;
  const popularSports = computeSportStats(clubs);
  const sportCount = new Set(clubs.map((c) => normalizeSportSlug(c.sportId))).size;
  const { minAge, maxAge } = computeAgeRange(clubs);
  const cityKey = Object.keys(CITY_PARAGRAPHS).find((key) => getCityKey(key) === getCityKey(city));
  const cityParagraph = cityKey
    ? CITY_PARAGRAPHS[cityKey]
    : `${GENERIC_CITY_PARAGRAPH} În ${locationDisplayName} găsești ${clubs.length} cluburi listate pe Yuvoo.`;

  const districtParagraph = getDistrictParagraph(city, district);

  const howToChoose = `Cum alegi un club sportiv în ${locationDisplayName}? Clarifică obiectivul copilului: recreație, socializare sau performanță. Compară ${clubs.length} cluburi listate, dintre care ${verifiedClubs} au badge verificat Yuvoo. Cere probă gratuită sau redusă, observă atmosfera și întreabă despre certificările antrenorilor. Dacă există condiții medicale, consultă un pediatru înainte de înscriere — Yuvoo nu înlocuiește sfatul medical. Folosește filtrele de mai jos sau chestionarul AI pentru recomandări personalizate.`;

  const sportListText =
    popularSports.length > 0
      ? popularSports.map((s) => `${s.name} (${s.count} cluburi)`).join(", ")
      : "diverse sporturi";

  const ageGuide =
    minAge !== null && maxAge !== null
      ? `Cluburile din ${locationDisplayName} acceptă de regulă copii între ${minAge} și ${maxAge} ani (conform programelor listate). Verifică pe fiecare profil dacă grupa copilului tău are locuri libere — programele diferă chiar pentru același sport.`
      : `Majoritatea cluburilor din ${locationDisplayName} organizează grupe pe vârstă (4–14 ani). Sporturile populare aici: ${sportListText}. Contactează clubul pentru confirmarea grupei potrivite.`;

  return {
    cityParagraph,
    districtParagraph,
    stats: {
      totalClubs: clubs.length,
      verifiedClubs,
      sportCount,
      minAge,
      maxAge,
    },
    howToChoose,
    popularSports,
    ageGuide,
    localFaq: buildLocalFaq(locationDisplayName, clubs, verifiedClubs, minAge, maxAge),
    siblingLocations,
  };
}

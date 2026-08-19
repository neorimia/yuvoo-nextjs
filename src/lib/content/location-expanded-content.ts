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
  siblingLocations: LocationSiblingLink[];
}

const CITY_PARAGRAPHS: Record<string, string> = {
  București:
    "București oferă cea mai diversă ofertă de cluburi sportive pentru copii din România, de la fotbal și înot în complexuri moderne, până la gimnastică, dans și arte marțiale în fiecare sector. Părinții pot compara programe pe vârstă, distanță față de casă și tip de antrenament (recreativ sau performanță). Yuvoo centralizează cluburile listate în capitală, cu filtre pe sport, vârstă și badge de verificare, ca să reduci timpul de căutare și să programezi probe informate.",
  "Cluj-Napoca":
    "Cluj-Napoca are o comunitate sportivă activă pentru copii, susținută de cluburi private și asociații locale. Orașul universitar atrage familii care caută sporturi variate — baschet, tenis, înot, karate — cu programe adaptate după școală. Pe Yuvoo găsești cluburi din Cluj filtrate pe sport și vârstă, plus recomandări din chestionarul AI dacă nu ești sigur ce activitate se potrivește copilului.",
  Timișoara:
    "Timișoara pune accent pe sporturi de echipă și individuale pentru copii, cu infrastructură în creștere în ultimii ani. Părinții din Banat caută adesea cluburi aproape de cartier, cu antrenori calificați și programe după-amiaza. Directorul Yuvoo pentru Timișoara îți arată opțiunile disponibile, numărul de cluburi pe sport și posibilitatea de a filtra după vârstă înainte de a contacta clubul.",
  Iași: "Iași are o tradiție puternică în sportul școlar și cluburile private pentru copii s-au dezvoltat rapid. Familiile caută activități care combină mișcarea cu dezvoltarea socială — fotbal, handbal, dans, gimnastică. Yuvoo listează cluburi din Iași cu informații despre sport, locație și verificare, ca să alegi în cunoștință de cauză înainte de prima probă.",
  Constanța:
    "Constanța beneficiază de sporturi acvatice și outdoor — înot, volei pe plajă, fotbal — alături de opțiuni clasice de sală. Sezonul cald prelungește posibilitățile, dar și în restul anului cluburile oferă programe structurate pentru copii. Explorează cluburile din Constanța pe Yuvoo, filtrează după sport și vârstă și programează probe când găsești potrivirea.",
};

const GENERIC_CITY_PARAGRAPH =
  "Indiferent de oraș, alegerea unui club sportiv pentru copil merită timp: compară sporturile disponibile, distanța față de casă, programul antrenamentelor și experiența antrenorilor. Yuvoo te ajută să descoperi cluburi listate local, cu filtre pe sport și vârstă, și îți recomandă sporturi potrivite prin chestionarul AI dacă vrei un punct de plecare obiectiv.";

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

  const districtNote = district
    ? ` În ${district}, focusul e pe cluburi accesibile din cartier — verifică adresa și programul înainte de probă.`
    : "";

  const howToChoose = `Cum alegi un club sportiv în ${locationDisplayName}? Începe prin a clarifica obiectivul: recreație, socializare sau performanță. Compară ${clubs.length} cluburi listate, dintre care ${verifiedClubs} au badge verificat Yuvoo (documente și standarde de siguranță revizuite). Cere o probă gratuită sau la preț redus, observă atmosfera și pune întrebări despre certificările antrenorilor. Dacă copilul are condiții medicale, consultă un medic pediatru înainte de înscriere — Yuvoo nu înlocuiește sfatul medical.${districtNote} Folosește filtrele de mai jos pentru sport și vârstă, sau completează chestionarul AI pentru recomandări personalizate.`;

  const sportListText =
    popularSports.length > 0
      ? popularSports.map((s) => `${s.name} (${s.count} cluburi)`).join(", ")
      : "diverse sporturi";

  const ageGuide =
    minAge !== null && maxAge !== null
      ? `Cluburile din ${locationDisplayName} acceptă de regulă copii între ${minAge} și ${maxAge} ani (conform programelor listate). Verifică pe fiecare profil dacă grupa de vârstă a copilului tău este disponibilă — programele diferă între cluburi chiar și pentru același sport.`
      : `Majoritatea cluburilor din ${locationDisplayName} organizează grupe pe vârstă (4–14 ani). Contactează clubul direct pentru confirmarea grupei potrivite copilului tău. Sporturile populare aici includ: ${sportListText}.`;

  return {
    cityParagraph,
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
    siblingLocations,
  };
}

/**
 * Club Expanded Content Generator
 *
 * Generates unique, data-driven SEO copy for club detail pages (third person).
 * All user-facing content in Romanian.
 */

import type { Club } from "@/modules/clubs/clubs.types";
import { routes } from "@/lib/routes";

export interface ClubExpandedContent {
  introduction: string;
  geoSummary: string;
  about: {
    title: string;
    content: string;
  };
  programs: {
    title: string;
    content: string;
  };
  benefits: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  location: {
    title: string;
    content: string;
  };
  contactInfo: {
    title: string;
    content: string;
  };
  internalLinks: {
    sportLink: string;
    sportLinkText: string;
    doctorsLink: string;
    doctorsLinkText: string;
    locationLink?: string;
    locationLinkText?: string;
  };
}

function formatAgeRange(ageGroups: number[]): string {
  if (ageGroups.length === 0) return "4–14 ani";
  if (ageGroups.length === 1) return `${ageGroups[0]} ani`;
  return `${Math.min(...ageGroups)}–${Math.max(...ageGroups)} ani`;
}

function formatLevels(levels: string[]): string {
  const levelMap: Record<string, string> = {
    beginner: "începători",
    intermediate: "intermediari",
    advanced: "avansați",
  };
  return levels.map((l) => levelMap[l.toLowerCase()] || l).join(", ");
}

function formatPricing(club: Club): string | null {
  if (!club.pricing?.length) return null;
  const formatType = (type: string) =>
    type === "monthly" ? "lună" : type === "per_class" ? "ședință" : "semestru";
  return club.pricing
    .map((p) => `${p.amount} ${p.currency || "RON"}/${formatType(p.type)}`)
    .join(", ");
}

function formatScheduleSummary(club: Club): string | null {
  if (!club.schedule?.length) return null;
  const days = club.schedule.map((s) => s.day).slice(0, 4);
  const suffix = club.schedule.length > 4 ? ` și alte ${club.schedule.length - 4} zile` : "";
  return `Antrenamente programate ${days.join(", ")}${suffix}.`;
}

function getSportBenefits(
  sportName: string,
  clubName: string
): Array<{ title: string; description: string }> {
  const sport = sportName.toLowerCase();
  const base = [
    {
      title: "Mișcare structurată pentru vârsta copilului",
      description: `${clubName} organizează sesiuni adaptate grupei de vârstă, cu exerciții progresive care țin cont de dezvoltarea fizică și atenția specifică copiilor.`,
    },
    {
      title: "Socializare și încredere",
      description: `Participarea la ${sportName.toLowerCase()} într-un cadru organizat ajută copiii să interacționeze cu colegii, să respecte reguli comune și să-și construiască încrederea prin progres vizibil.`,
    },
  ];

  if (sport.includes("fotbal") || sport.includes("baschet") || sport.includes("handbal")) {
    return [
      ...base,
      {
        title: "Spirit de echipă",
        description: `La ${clubName}, jocul de echipă pune accent pe cooperare, comunicare și respect față de adversari — competențe utile dincolo de teren.`,
      },
    ];
  }

  if (sport.includes("înot") || sport.includes("inot")) {
    return [
      ...base,
      {
        title: "Siguranță și rezistență în apă",
        description: `Programele de înot de la ${clubName} combină tehnica de bază cu obiceiuri de siguranță acvatică, într-un mediu monitorizat.`,
      },
    ];
  }

  if (
    sport.includes("karate") ||
    sport.includes("judo") ||
    sport.includes("taekwondo") ||
    sport.includes("scrima") ||
    sport.includes("box")
  ) {
    return [
      ...base,
      {
        title: "Disciplină și autocontrol",
        description: `Antrenamentele de ${sportName.toLowerCase()} la ${clubName} pun accent pe respect, concentrare și control al mișcării, nu pe agresivitate.`,
      },
    ];
  }

  return [
    ...base,
    {
      title: "Dezvoltare motrică continuă",
      description: `${sportName} antrenat la ${clubName} stimulează coordonarea, echilibrul și obiceiul mișcării regulate — factori importanți pentru copiii 4–14 ani.`,
    },
  ];
}

function buildGeoSummary(club: Club, locationText: string, ageRange: string): string {
  const verifiedNote = club.verified
    ? `${club.name} are badge verificat Yuvoo, ceea ce confirmă că documentele și standardele de bază pentru programe destinate copiilor au fost revizuite de echipa platformei.`
    : `${club.name} este listat pe Yuvoo; părinții pot compara programul, vârstele acceptate și datele de contact înainte de a programa o probă.`;

  const pricing = formatPricing(club);
  const pricingNote = pricing
    ? `Tarifele comunicate încep de la ${pricing}.`
    : `Pentru tarife actualizate, părinții sunt îndrumați să contacteze direct clubul.`;

  return `${club.name} este un club de ${club.sportName.toLowerCase()} pentru copii (${ageRange}) din ${locationText}. ${verifiedNote} ${pricingNote} Profilul de mai jos rezumă programele, locația și pașii recomandați înainte de prima ședință de probă — informațiile sunt orientative; detaliile finale se confirmă cu reprezentantul clubului.`;
}

/**
 * Generate comprehensive expanded content for a club profile page.
 */
export function generateClubExpandedContent(club: Club): ClubExpandedContent {
  const ageRange = formatAgeRange(club.ageGroups);
  const levelsText = club.levels.length ? formatLevels(club.levels) : "toate nivelurile";
  const locationText = club.location.district
    ? `${club.location.city}, ${club.location.district}`
    : club.location.city;
  const pricingText = formatPricing(club);
  const scheduleSummary = formatScheduleSummary(club);
  const sportSlug = club.sportId.toLowerCase().replace(/\s+/g, "-");
  const locationSlug = club.location.district
    ? `${club.location.city.toLowerCase().replace(/\s+/g, "-")}-${club.location.district.toLowerCase().replace(/\s+/g, "-")}`
    : club.location.city.toLowerCase().replace(/\s+/g, "-");

  const descriptionBlock =
    club.description?.trim() ||
    `${club.name} propune activități de ${club.sportName.toLowerCase()} pentru copii cu vârste între ${ageRange}, în ${locationText}.`;

  const verifiedLine = club.verified
    ? `Profilul are badge verificat Yuvoo — semn că au fost transmise documente și că profilul respectă criteriile minime de siguranță pentru programe destinate copiilor.`
    : `Pentru înscriere, recomandăm o vizită de probă și verificarea directă a programului, antrenorilor și condițiilor din sală.`;

  const introduction = `${club.name} oferă programe de ${club.sportName.toLowerCase()} pentru copii (${ageRange}) în ${locationText}. ${descriptionBlock}

${verifiedLine} ${scheduleSummary ?? "Programul săptămânal se confirmă la club înainte de înscriere."} ${pricingText ? `Tarife orientative: ${pricingText}.` : ""} Părinții pot consulta pagina sportului ${club.sportName} pe Yuvoo pentru beneficii generale, apoi compară acest club cu alte opțiuni din zonă folosind filtrele de vârstă și verificare.`;

  const geoSummary = buildGeoSummary(club, locationText, ageRange);

  const about = {
    title: `Despre ${club.name}`,
    content: `${club.name} activează în ${locationText} cu focus pe ${club.sportName.toLowerCase()} pentru copii. ${descriptionBlock}

${club.verified ? `Verificarea Yuvoo confirmă că ${club.name} a furnizat documentele cerute și că profilul public respectă standardele minime pentru programe destinate minorilor.` : `${club.name} apare în directorul Yuvoo ca opțiune locală; părinții sunt încurajați să ceară detalii despre antrenori, raport copil-antrenor și regulile de siguranță înainte de contract.`} Pentru context medical (alergii, astm, probleme ortopedice), Yuvoo recomandă consultarea unui medic pediatru sau specialist din secțiunea Doctori — sportul organizat completează, nu înlocuiește, evaluarea medicală.`,
  };

  const programs = {
    title: "Programe, vârste și niveluri",
    content: `${club.name} acceptă copii cu vârste între ${ageRange}. Nivelurile anunțate includ ${levelsText}. Grupele sunt, de regulă, formate pe vârstă și experiență, astfel încât exercițiile să rămână potrivite pentru dezvoltarea motrică a copiilor mici, respectiv pentru progresul tehnic al celor mai mari.

${scheduleSummary ?? "Programul exact (zile, ore, durată ședință) se confirmă telefonic sau prin email cu reprezentantul clubului."} ${pricingText ? `Structura de cost comunicată: ${pricingText}.` : "Costurile și condițiile de plată se stabilesc direct cu clubul."} O ședință de probă — când este disponibilă — permite observarea atmosferei, a stilului antrenorului și a potrivirii cu ritmul copilului.`,
  };

  const locationContent = `${club.name} funcționează în ${locationText}${club.location.address ? `, la adresa ${club.location.address}` : ""}. ${club.location.coordinates ? "Locația este indicată pe hartă în profil pentru estimarea timpului de drum din cartier." : "Adresa completă și indicațiile de acces se confirmă la programarea probei."}

Părinții din ${club.location.city} pot compara și alte cluburi de ${club.sportName.toLowerCase()} din aceeași zonă folosind filtrele Yuvoo (vârstă, verificare, sport).`;

  const contactParts: string[] = [];
  if (club.contact.phone) contactParts.push(`telefon ${club.contact.phone}`);
  if (club.contact.email) contactParts.push(`email ${club.contact.email}`);
  if (club.contact.website) contactParts.push(`site ${club.contact.website}`);

  const contactContent = `Pentru înscrieri, probe sau întrebări despre grupele disponibile, părinții contactează ${club.name}${contactParts.length ? ` la ${contactParts.join(", ")}` : " prin datele din profil"}.

${pricingText ? `Tarifele listate (${pricingText}) pot varia în funcție de numărul de ședințe sau abonament; confirmă condițiile înainte de plată.` : "Solicită explicit tariful, durata abonamentului și politica de anulare."} Yuvoo nu procesează plăți către club — relația contractuală este direct între părinte și club.`;

  return {
    introduction,
    geoSummary,
    about,
    programs,
    benefits: {
      title: `De ce ${club.sportName} la ${club.name}?`,
      items: getSportBenefits(club.sportName, club.name),
    },
    location: {
      title: "Unde se desfășoară antrenamentele?",
      content: locationContent,
    },
    contactInfo: {
      title: "Cum programezi o probă?",
      content: contactContent,
    },
    internalLinks: {
      sportLink: routes.sports.detail(sportSlug),
      sportLinkText: `Ghid complet: ${club.sportName} pentru copii`,
      doctorsLink: routes.doctors.list,
      doctorsLinkText: `Specialiști pediatri verificați`,
      locationLink: routes.clubs.location(locationSlug),
      locationLinkText: `Alte cluburi în ${locationText}`,
    },
  };
}

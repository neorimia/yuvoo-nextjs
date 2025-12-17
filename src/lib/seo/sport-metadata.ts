/**
 * Sport Metadata Helper
 *
 * Enhanced SEO metadata for sport detail pages.
 * Provides optimized descriptions for top sports.
 */

import type { SportData } from "@/lib/db/seed-data/sports";

/**
 * Enhanced metadata descriptions for top 5 sports
 * These are the most popular sports for children in Romania
 */
const ENHANCED_SPORT_METADATA: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
    ogDescription: string;
  }
> = {
  fotbal: {
    title: "Fotbal pentru Copii - Cluburi Verificate București | Yuvoo",
    description:
      "Descoperă cluburile de fotbal verificate pentru copii (5-14 ani) în București. Fotbalul dezvoltă coordonarea, echilibrul, spiritul de echipă și disciplina. Găsește antrenori calificați, programe adaptate pe vârstă și probe gratuite. Platforma Yuvoo te ajută să alegi cel mai bun club de fotbal pentru copilul tău.",
    keywords: [
      "fotbal copii",
      "fotbal copii București",
      "cluburi fotbal copii",
      "antrenament fotbal copii",
      "școală fotbal copii",
      "fotbal vârstă 5-14 ani",
      "fotbal juniori",
      "cluburi fotbal verificate",
    ],
    ogDescription:
      "Găsește cluburi de fotbal verificate pentru copii în București. Fotbalul dezvoltă coordonarea, echilibrul și spiritul de echipă. Programe adaptate pentru copiii cu vârste între 5 și 14 ani.",
  },
  inot: {
    title: "Înot pentru Copii - Cluburi și Cursuri Verificate | Yuvoo",
    description:
      "Explorează cluburile de înot verificate pentru copii (4-14 ani) în București. Înotul este un sport complet care dezvoltă toate grupurile musculare, capacitatea pulmonară, coordonarea și disciplina. Găsește cursuri de înot pentru începători și avansați, antrenori certificați și programe pe vârstă. Yuvoo te ajută să găsești cel mai potrivit club de înot pentru copilul tău.",
    keywords: [
      "înot copii",
      "înot copii București",
      "cursuri înot copii",
      "cluburi înot copii",
      "antrenament înot copii",
      "înot vârstă 4-14 ani",
      "înot juniori",
      "școală înot copii",
      "cluburi înot verificate",
    ],
    ogDescription:
      "Descoperă cluburi și cursuri de înot verificate pentru copii în București. Înotul dezvoltă toate grupurile musculare și capacitatea pulmonară. Programe pentru copiii cu vârste între 4 și 14 ani.",
  },
  tenis: {
    title: "Tenis pentru Copii - Școli și Cluburi Verificate | Yuvoo",
    description:
      "Găsește școlile și cluburile de tenis verificate pentru copii (4-14 ani) în București. Tenisul dezvoltă coordonarea, agilitatea, concentrarea, disciplina și spiritul competitiv. Explorează programe pentru începători și avansați, antrenori profesioniști și terenuri moderne. Yuvoo te ajută să alegi cel mai bun club de tenis pentru copilul tău, cu programe adaptate pe vârstă și nivel.",
    keywords: [
      "tenis copii",
      "tenis copii București",
      "școală tenis copii",
      "cluburi tenis copii",
      "antrenament tenis copii",
      "tenis vârstă 4-14 ani",
      "tenis juniori",
      "cursuri tenis copii",
      "cluburi tenis verificate",
    ],
    ogDescription:
      "Explorează școli și cluburi de tenis verificate pentru copii în București. Tenisul dezvoltă coordonarea, agilitatea și concentrarea. Programe pentru copiii cu vârste între 4 și 14 ani.",
  },
  "gimnastica-artistica": {
    title: "Gimnastică Artistică pentru Copii - Cluburi Verificate | Yuvoo",
    description:
      "Descoperă cluburile de gimnastică artistică verificate pentru copii (4-14 ani) în București. Gimnastica artistică dezvoltă flexibilitatea, forța, coordonarea, grația și disciplina. Este ideală pentru copiii mici și dezvoltă toate calitățile fizice. Găsește antrenori calificați, săli moderne și programe adaptate pe vârstă. Yuvoo te ajută să găsești cel mai potrivit club de gimnastică pentru copilul tău.",
    keywords: [
      "gimnastică artistică copii",
      "gimnastică copii București",
      "cluburi gimnastică copii",
      "antrenament gimnastică copii",
      "gimnastică vârstă 4-14 ani",
      "gimnastică juniori",
      "școală gimnastică copii",
      "cluburi gimnastică verificate",
    ],
    ogDescription:
      "Găsește cluburi de gimnastică artistică verificate pentru copii în București. Gimnastica dezvoltă flexibilitatea, forța și grația. Programe pentru copiii cu vârste între 4 și 14 ani.",
  },
  baschet: {
    title: "Baschet pentru Copii - Cluburi Verificate București | Yuvoo",
    description:
      "Explorează cluburile de baschet verificate pentru copii (6-14 ani) în București. Baschetul dezvoltă agilitatea, coordonarea, înălțimea, spiritul de echipă și viteza de reacție. Este ideal pentru copiii activi și înalți. Găsește antrenori profesioniști, programe pe vârstă și probe gratuite. Yuvoo te ajută să alegi cel mai bun club de baschet pentru copilul tău, cu programe adaptate pentru începători și avansați.",
    keywords: [
      "baschet copii",
      "baschet copii București",
      "cluburi baschet copii",
      "antrenament baschet copii",
      "baschet vârstă 6-14 ani",
      "baschet juniori",
      "școală baschet copii",
      "cluburi baschet verificate",
    ],
    ogDescription:
      "Descoperă cluburi de baschet verificate pentru copii în București. Baschetul dezvoltă agilitatea, coordonarea și spiritul de echipă. Programe pentru copiii cu vârste între 6 și 14 ani.",
  },
};

/**
 * Generate enhanced metadata for a sport
 */
export function generateSportMetadata(sport: SportData, baseUrl: string = "https://yuvoo.ro") {
  const enhanced = ENHANCED_SPORT_METADATA[sport.slug];

  if (enhanced) {
    return {
      title: enhanced.title,
      description: enhanced.description,
      keywords: enhanced.keywords,
      openGraph: {
        title: enhanced.title,
        description: enhanced.ogDescription,
        type: "website" as const,
        locale: "ro_RO",
        url: `${baseUrl}/sporturi/${sport.slug}`,
      },
      alternates: {
        canonical: `${baseUrl}/sporturi/${sport.slug}`,
      },
    };
  }

  // Fallback for other sports
  const categoryLabels: Record<string, string> = {
    echipa: "sport de echipă",
    individual: "sport individual",
    combat: "sport de luptă",
    artistic: "sport artistic",
    altul: "sport",
  };

  const categoryLabel = categoryLabels[sport.category] || "sport";
  const ageRange = `${sport.minAge}-${sport.maxAge} ani`;

  return {
    title: `${sport.name} pentru Copii - Cluburi Verificate | Yuvoo`,
    description: `${sport.description} Găsește cluburi verificate care oferă ${sport.name.toLowerCase()} pentru copii cu vârste între ${ageRange} în București. ${sport.name} este un ${categoryLabel} care dezvoltă multiple calități fizice și mentale. Explorează programe adaptate pe vârstă, antrenori calificați și probe gratuite pe platforma Yuvoo.`,
    keywords: [
      `${sport.name.toLowerCase()} copii`,
      `${sport.name.toLowerCase()} copii București`,
      `cluburi ${sport.name.toLowerCase()} copii`,
      `antrenament ${sport.name.toLowerCase()} copii`,
      `${sport.name.toLowerCase()} vârstă ${ageRange}`,
      `cluburi ${sport.name.toLowerCase()} verificate`,
    ],
    openGraph: {
      title: `${sport.name} pentru Copii - Yuvoo`,
      description: `${sport.description} Găsește cluburi verificate pentru copii cu vârste între ${ageRange} în București.`,
      type: "website" as const,
      locale: "ro_RO",
      url: `${baseUrl}/sporturi/${sport.slug}`,
    },
    alternates: {
      canonical: `${baseUrl}/sporturi/${sport.slug}`,
    },
  };
}

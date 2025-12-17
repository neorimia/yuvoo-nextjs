/**
 * Partners Data
 *
 * Partners data for the About page.
 * All content in Romanian language for SEO purposes.
 */

export interface Partner {
  id: number;
  name: string;
  type: "medical" | "sports" | "technology" | "education";
  description: string;
  logo: string;
  website?: string;
  category: string;
}

/**
 * Yuvoo Partners
 */
export const partners: Partner[] = [
  {
    id: 1,
    name: "Asociația Medicilor Pediatri din România",
    type: "medical",
    category: "Medical",
    description:
      "Parteneriat strategic cu Asociația Medicilor Pediatri pentru asigurarea calității și validității recomandărilor medicale și pentru conectarea părinților cu specialiști verificați.",
    logo: "/assets/img/placeholder-partner.jpg",
    website: "https://example.com",
  },
  {
    id: 2,
    name: "Federatia Română de Sporturi pentru Copii",
    type: "sports",
    category: "Sport",
    description:
      "Colaborare cu federația pentru promovarea sportului pentru copii și pentru accesul la resurse și informații autorizate despre diferite sporturi și programe de antrenament.",
    logo: "/assets/img/placeholder-partner.jpg",
    website: "https://example.com",
  },
  {
    id: 3,
    name: "Institutul Național de Sănătate Publică",
    type: "medical",
    category: "Medical",
    description:
      "Parteneriat pentru dezvoltarea standardelor de siguranță și pentru validarea recomandărilor privind activitățile sportive sigure pentru copii de diferite vârste.",
    logo: "/assets/img/placeholder-partner.jpg",
    website: "https://example.com",
  },
  {
    id: 4,
    name: "Asociația Cluburilor Sportive pentru Copii",
    type: "sports",
    category: "Sport",
    description:
      "Colaborare pentru creșterea standardelor de calitate în cluburile sportive pentru copii și pentru facilitarea procesului de verificare și certificare.",
    logo: "/assets/img/placeholder-partner.jpg",
    website: "https://example.com",
  },
  {
    id: 5,
    name: "OpenAI",
    type: "technology",
    category: "Tehnologie",
    description:
      "Utilizăm tehnologii OpenAI avansate pentru generarea de recomandări personalizate, asigurând că sistemul AI oferă cele mai relevante și precise recomandări pentru fiecare copil.",
    logo: "/assets/img/placeholder-partner.jpg",
    website: "https://openai.com",
  },
  {
    id: 6,
    name: "Ministerul Educației și Cercetării",
    type: "education",
    category: "Educație",
    description:
      "Parteneriat pentru promovarea activităților sportive în context educațional și pentru dezvoltarea programelor care combină educația fizică cu dezvoltarea personală.",
    logo: "/assets/img/placeholder-partner.jpg",
    website: "https://example.com",
  },
];

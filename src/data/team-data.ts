/**
 * Team Data
 *
 * Team members data for the About page.
 * All content in Romanian language for SEO purposes.
 */

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  credentials?: string[];
  socialLinks?: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
}

/**
 * Yuvoo Team Members
 */
export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alexandru Popescu",
    role: "Fondator & CEO",
    bio: "În urmă cu peste 10 ani de experiență în tehnologie și antreprenoriat, Alexandru a creat Yuvoo cu viziunea de a face accesibile cele mai bune opțiuni sportive pentru copiii din România.",
    image: "/assets/img/placeholder-team.jpg",
    credentials: ["MBA", "Entrepreneurship"],
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com", icon: "fa-brands fa-linkedin-in" },
    ],
  },
  {
    id: 2,
    name: "Maria Ionescu",
    role: "Co-fondator & CTO",
    bio: "Specialistă în AI și machine learning, Maria a dezvoltat sistemul de recomandări AI care stă la baza platformei Yuvoo, combinând tehnologie avansată cu cunoștințe despre dezvoltarea copiilor.",
    image: "/assets/img/placeholder-team.jpg",
    credentials: ["Ph.D. Computer Science", "AI & ML Specialist"],
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com", icon: "fa-brands fa-linkedin-in" },
    ],
  },
  {
    id: 3,
    name: "Dr. Andrei Georgescu",
    role: "Consilier Medical",
    bio: "Medic pediatru cu peste 15 ani de experiență, Dr. Georgescu oferă consultanță medicală pentru dezvoltarea algoritmilor de recomandare, asigurând că toate recomandările sunt sigure și potrivite pentru dezvoltarea copiilor.",
    image: "/assets/img/placeholder-team.jpg",
    credentials: ["Medic Pediatru", "Specializare în medicina sportivă pediatrică"],
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com", icon: "fa-brands fa-linkedin-in" },
    ],
  },
  {
    id: 4,
    name: "Elena Vasilescu",
    role: "Head of Partnerships",
    bio: "Cu experiență în managementul parteneriatelor și dezvoltarea business-ului, Elena construiește rețeaua de cluburi sportive și specialiști pediatri care fac parte din ecosistemul Yuvoo.",
    image: "/assets/img/placeholder-team.jpg",
    credentials: ["Business Development", "Partnership Management"],
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com", icon: "fa-brands fa-linkedin-in" },
    ],
  },
];

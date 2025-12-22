/**
 * Preview Data for Quiz Results Email
 *
 * Mock data for previewing the quiz results email template in the React Email preview server.
 */

import type { QuizResult } from "@/modules/quiz/quiz.types";
import type { Child } from "@/modules/children/children.types";
import type { AuthUser } from "@/modules/auth/auth.types";
import type { Club } from "@/modules/clubs/clubs.types";

/**
 * Mock quiz result data
 */
export const mockQuizResult: QuizResult = {
  id: "quiz-123",
  childId: "child-123",
  recommendations: [
    {
      sportId: "sport-1",
      sportName: "Fotbal",
      matchScore: 95,
      reasoning:
        "Fotbalul este perfect pentru copilul tău datorită nivelului său de energie ridicat și preferințelor pentru sporturi de echipă. Acest sport dezvoltă coordonarea, spiritul de echipă și rezistența fizică.",
      benefits: [
        "Dezvoltă coordonarea și agilitatea",
        "Îmbunătățește rezistența cardiovasculară",
        "Promovează spiritul de echipă și comunicarea",
        "Construiește încredere în sine",
      ],
      considerations: [
        "Echipamentul de bază include ghete de fotbal și șosete",
        "Antrenamentele se desfășoară de obicei de 2-3 ori pe săptămână",
        "Important: protecție pentru genunchi și tibii în timpul jocurilor",
      ],
    },
    {
      sportId: "sport-2",
      sportName: "Înot",
      matchScore: 88,
      reasoning:
        "Înotul este excelent pentru dezvoltarea completă a corpului și este un sport cu impact redus, ideal pentru copilul tău. Ajută la dezvoltarea coordonării și rezistenței.",
      benefits: [
        "Dezvoltă toate grupurile musculare",
        "Impact redus - protejează articulațiile",
        "Îmbunătățește capacitatea pulmonară",
        "Dezvoltă coordonarea și ritmul",
      ],
      considerations: [
        "Necesită acces la bazin de înot",
        "Echipament: costum de baie, ochelari, bonetă",
        "Antrenamentele pot fi individuale sau în grup",
      ],
    },
    {
      sportId: "sport-3",
      sportName: "Tenis",
      matchScore: 82,
      reasoning:
        "Tenisul este potrivit pentru copilul tău datorită preferințelor pentru sporturi individuale și nivelului de coordonare. Acest sport dezvoltă concentrarea și strategia.",
      benefits: [
        "Dezvoltă coordonarea mână-ochi",
        "Îmbunătățește agilitatea și viteza de reacție",
        "Promovează disciplina și concentrarea",
        "Construiește încredere în sine",
      ],
      considerations: [
        "Echipament: rachetă de tenis, mingi, ghete speciale",
        "Antrenamentele pot fi individuale sau în grup",
        "Necesită acces la teren de tenis",
      ],
    },
    {
      sportId: "sport-4",
      sportName: "Baschet",
      matchScore: 75,
      reasoning:
        "Baschetul poate fi o opțiune bună pentru copilul tău, deși este puțin mai puțin potrivit decât fotbalul. Dezvoltă coordonarea și spiritul de echipă.",
      benefits: [
        "Dezvoltă coordonarea mână-ochi",
        "Îmbunătățește agilitatea",
        "Promovează spiritul de echipă",
      ],
      considerations: [
        "Necesită înălțime și coordonare bună",
        "Echipament: mingi de baschet, ghete speciale",
      ],
    },
    {
      sportId: "sport-5",
      sportName: "Gimnastică artistică",
      matchScore: 65,
      reasoning:
        "Gimnastica artistică este mai puțin potrivită pentru copilul tău, dar poate fi considerată în viitor dacă dezvoltă interes pentru acest sport.",
      benefits: [
        "Dezvoltă flexibilitatea",
        "Îmbunătățește coordonarea",
        "Construiește forța musculară",
      ],
      considerations: [
        "Necesită multă disciplină și antrenament intens",
        "Echipament specializat necesar",
      ],
    },
  ],
  specialistRecommendation: {
    specialty: "orthopedist",
    needed: false,
  },
  createdAt: new Date(),
};

/**
 * Mock child data
 */
export const mockChild: Child = {
  id: "child-123",
  parentId: "parent-123",
  firstName: "Alexandru",
  lastName: "Popescu",
  dateOfBirth: new Date("2018-05-15"),
  gender: "male",
  age: 7,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

/**
 * Mock user data (optional)
 */
export const mockUser: AuthUser = {
  id: "user-123",
  email: "parent@example.com",
  name: "Ion Popescu",
  firstName: "Ion",
  lastName: "Popescu",
  role: "parent",
  emailVerified: true,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

/**
 * Mock clubs data (grouped by sport ID)
 */
export const mockClubsBySport = new Map<string, Club[]>([
  [
    "sport-1",
    [
      {
        id: "club-1",
        name: "FC Junior București",
        slug: "fc-junior-bucuresti",
        description:
          "Club de fotbal pentru copii cu programe pentru toate nivelurile, de la începători la avansați. Antrenori certificați și programe personalizate.",
        sportId: "sport-1",
        sportName: "Fotbal",
        location: {
          city: "București",
          district: "Sector 1",
          address: "Strada Sportului 10",
        },
        ageGroups: [5, 6, 7, 8, 9, 10, 11, 12],
        levels: ["beginner", "intermediate", "advanced"],
        verified: true,
        featured: true,
        logoUrl: "https://via.placeholder.com/150",
        galleryUrls: [],
        images: [],
        contact: {
          phone: "+40 700 000 001",
          email: "contact@fcjunior.ro",
        },
        verificationStatus: "approved",
        profileComplete: true,
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "club-2",
        name: "Academia de Fotbal Steaua",
        slug: "academia-fotbal-steaua",
        description:
          "Academia de fotbal cu tradiție, oferind programe de antrenament pentru copii de toate vârstele. Instalții moderne și metodologie dovedită.",
        sportId: "sport-1",
        sportName: "Fotbal",
        location: {
          city: "București",
          district: "Sector 2",
          address: "Bulevardul Ghencea 35",
        },
        ageGroups: [6, 7, 8, 9, 10, 11, 12, 13],
        levels: ["beginner", "intermediate", "advanced"],
        verified: true,
        featured: false,
        logoUrl: "https://via.placeholder.com/150",
        galleryUrls: [],
        images: [],
        contact: {
          phone: "+40 700 000 002",
          email: "contact@academiasteaua.ro",
        },
        verificationStatus: "approved",
        profileComplete: true,
        rating: 4.8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  ],
  [
    "sport-2",
    [
      {
        id: "club-3",
        name: "Clubul de Înot Aqua Junior",
        slug: "club-inaot-aqua-junior",
        description:
          "Club specializat în înot pentru copii, cu programe pentru toate nivelurile. Bazin olimpic și antrenori certificați FINA.",
        sportId: "sport-2",
        sportName: "Înot",
        location: {
          city: "București",
          district: "Sector 3",
          address: "Strada Apei 5",
        },
        ageGroups: [4, 5, 6, 7, 8, 9, 10, 11, 12],
        levels: ["beginner", "intermediate", "advanced"],
        verified: true,
        featured: true,
        logoUrl: "https://via.placeholder.com/150",
        galleryUrls: [],
        images: [],
        contact: {
          phone: "+40 700 000 003",
          email: "contact@aquajunior.ro",
        },
        verificationStatus: "approved",
        profileComplete: true,
        rating: 4.7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  ],
  [
    "sport-3",
    [
      {
        id: "club-4",
        name: "Tennis Academy Junior",
        slug: "tennis-academy-junior",
        description:
          "Academia de tenis pentru copii cu terenuri moderne și antrenori experimentați. Programe personalizate pentru fiecare nivel.",
        sportId: "sport-3",
        sportName: "Tenis",
        location: {
          city: "București",
          district: "Sector 1",
          address: "Strada Tenisului 20",
        },
        ageGroups: [6, 7, 8, 9, 10, 11, 12, 13, 14],
        levels: ["beginner", "intermediate", "advanced"],
        verified: true,
        featured: false,
        logoUrl: "https://via.placeholder.com/150",
        galleryUrls: [],
        images: [],
        contact: {
          phone: "+40 700 000 004",
          email: "contact@tennisacademy.ro",
        },
        verificationStatus: "approved",
        profileComplete: true,
        rating: 4.6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  ],
]);

/**
 * Mock unsubscribe token
 */
export const mockUnsubscribeToken = "mock-unsubscribe-token-123";

/**
 * Doctor Expanded Content Generator
 *
 * Generates comprehensive expanded content (600-900 words) for doctor detail pages.
 * All content is in Romanian for SEO purposes.
 */

import type { Doctor } from "@/modules/doctors/doctors.types";
import { routes } from "@/lib/routes";

export interface DoctorExpandedContent {
  introduction: string; // Expanded introduction (200-300 words)
  about: {
    title: string;
    content: string; // About the doctor (150-200 words)
  };
  specialty: {
    title: string;
    content: string; // Specialty and expertise (150-200 words)
  };
  services: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  benefits: {
    title: string;
    content: string; // Benefits of consultation (100-150 words)
  };
  location: {
    title: string;
    content: string; // Location and clinic info (100-150 words)
  };
  contactInfo: {
    title: string;
    content: string; // Contact and appointment info (100-150 words)
  };
  internalLinks: {
    sportsLink: string;
    sportsLinkText: string;
    clubsLink: string;
    clubsLinkText: string;
  };
}

/**
 * Get specialty-specific services based on doctor specialty
 */
function getSpecialtyServices(specialty: string): Array<{ title: string; description: string }> {
  const specialtyLower = specialty.toLowerCase();

  if (specialtyLower.includes("ortoped") || specialtyLower.includes("orthoped")) {
    return [
      {
        title: "Evaluare posturală și dezvoltare ososară",
        description:
          "Evaluare completă a posturii copilului, dezvoltării sistemului ososar și identificarea eventualelor probleme care ar putea afecta participarea la activități sportive.",
      },
      {
        title: "Consultare pentru leziuni sportive",
        description:
          "Diagnostic și tratament pentru leziuni legate de sport, precum entorse, fracturi, tensiuni musculare și alte probleme osteoarticulare comune în activitățile sportive.",
      },
      {
        title: "Recomandări pentru sporturi potrivite",
        description:
          "Consultanță specializată pentru alegerea sporturilor potrivite în funcție de structura corporală, dezvoltarea fizică și eventualele limitări ale copilului.",
      },
      {
        title: "Monitorizare creștere și dezvoltare",
        description:
          "Urmărire a creșterii și dezvoltării copilului pentru a asigura că participarea la sport nu afectează negativ dezvoltarea normală.",
      },
      {
        title: "Prevenirea leziunilor",
        description:
          "Recomandări pentru prevenirea leziunilor, corecția posturii și adaptarea antrenamentelor pentru a reduce riscul de accidentări.",
      },
    ];
  }

  if (specialtyLower.includes("nutrit") || specialtyLower.includes("nutrition")) {
    return [
      {
        title: "Evaluare nutrițională pentru copiii activi",
        description:
          "Analiză completă a necesarului nutrițional al copilului în funcție de nivelul de activitate fizică, vârstă, dezvoltare și obiectivele sportive.",
      },
      {
        title: "Planuri alimentare personalizate",
        description:
          "Dezvoltare de planuri alimentare adaptate nevoilor copilului activ, asigurând aportul optim de nutrienți pentru performanță și dezvoltare sănătoasă.",
      },
      {
        title: "Consultanță pentru hidratare optimă",
        description:
          "Ghidare privind hidratarea corectă înainte, în timpul și după antrenamente, esențială pentru performanță și recuperare.",
      },
      {
        title: "Management al greutății corporale",
        description:
          "Suport pentru menținerea unei greutăți corporale sănătoase și pentru copiii care au nevoie să-și gestioneze greutatea în contextul activităților sportive.",
      },
      {
        title: "Suplimente și alimentație pre/post antrenament",
        description:
          "Recomandări privind suplimentele nutriționale necesare (dacă este cazul) și strategii de alimentare pentru optimizarea performanței și recuperării.",
      },
    ];
  }

  if (specialtyLower.includes("psiholog") || specialtyLower.includes("psycholog")) {
    return [
      {
        title: "Evaluare psihologică în context sportiv",
        description:
          "Evaluare a aspectelor psihologice care influențează participarea și performanța copilului în activități sportive, inclusiv motivația, anxietatea și încrederea în sine.",
      },
      {
        title: "Gestionarea anxietății și presiunii",
        description:
          "Suport pentru copiii care experimentează anxietate legată de performanță, competiții sau presiunea antrenamentelor, oferind tehnici de management emoțional.",
      },
      {
        title: "Dezvoltarea motivației și rezilienței",
        description:
          "Consultanță pentru dezvoltarea motivației durabile pentru sport, rezilienței în fața eșecurilor și abilităților de a gestiona provocările sportive.",
      },
      {
        title: "Consultanță pentru părinți",
        description:
          "Suport pentru părinți privind modul în care să susțină și să încurajeze copilul în activitățile sportive fără a crea presiune excesivă sau expectanțe nerealiste.",
      },
      {
        title: "Integrare socială prin sport",
        description:
          "Suport pentru dezvoltarea abilităților sociale prin sport, gestionarea relațiilor în echipă și construirea încrederii în interacțiunile sociale.",
      },
    ];
  }

  // General pediatric services
  return [
    {
      title: "Consultanță medicală pentru activități sportive",
      description:
        "Evaluare medicală completă pentru a determina dacă copilul este apt pentru participarea la activități sportive specifice, luând în considerare sănătatea generală și eventualele limitări.",
    },
    {
      title: "Monitorizare dezvoltare și creștere",
      description:
        "Urmărire regulată a dezvoltării fizice și psihice a copilului pentru a asigura că participarea la sport contribuie pozitiv la creșterea sănătoasă.",
    },
    {
      title: "Management probleme de sănătate legate de sport",
      description:
        "Diagnostic și tratament pentru probleme de sănătate care apar sau se agravează prin participarea la activități sportive, cu focus pe prevenție și management.",
    },
    {
      title: "Recomandări personalizate pentru sport",
      description:
        "Consultanță specializată pentru alegerea sporturilor și activităților fizice potrivite în funcție de caracteristicile individuale ale copilului, sănătate și interese.",
    },
    {
      title: "Suport pentru părinți",
      description:
        "Consultanță pentru părinți privind modul optim de a susține și gestiona participarea copilului la activități sportive, incluzând aspecte medicale, nutriționale și psihologice.",
    },
  ];
}

/**
 * Get specialty display name in Romanian
 */
function getSpecialtyDisplayName(specialty: string): string {
  const specialtyMap: Record<string, string> = {
    orthopedist: "Ortopedie pediatrică",
    nutritionist: "Nutriție pediatrică",
    psychologist: "Psihologie pediatrică",
    general: "Medic pediatru",
  };
  return specialtyMap[specialty] || specialty;
}

/**
 * Generate comprehensive expanded content for a doctor
 */
export function generateDoctorExpandedContent(doctor: Doctor): DoctorExpandedContent {
  const specialtyDisplay = getSpecialtyDisplayName(doctor.specialty);
  const locationText = doctor.location.district
    ? `${doctor.location.city}, ${doctor.location.district}`
    : doctor.location.city;

  const credentialsText =
    doctor.credentials && doctor.credentials.length > 0
      ? doctor.credentials.join(", ")
      : specialtyDisplay;

  const introduction = `Dr. ${doctor.name} este un ${specialtyDisplay.toLowerCase()}${doctor.verified ? " verificat" : ""} specializat în consultații medicale pentru copiii care practică sau doresc să practice activități sportive. ${doctor.description || `Cu experiență în domeniul ${specialtyDisplay.toLowerCase()}, oferă consultații personalizate pentru asigurarea dezvoltării sănătoase și sigură a copiilor prin sport.`}

${doctor.verified ? "Dr. " + doctor.name + " a primit verificarea Yuvoo, ceea ce confirmă că îndeplinește standardele de calitate, profesionalism și experiență necesare pentru consultații medicale specializate în contextul activităților sportive pentru copii." : ""} ${credentialsText !== specialtyDisplay ? "Calificările includ " + credentialsText + ", asigurând competențe specializate în domeniu." : ""}

Specializarea în ${specialtyDisplay.toLowerCase()} permite oferirea de consultații care iau în considerare nevoile unice ale copiilor activi, asigurând că participarea la sport contribuie pozitiv la dezvoltarea fizică, mentală și emoțională, fără compromiterea sănătății generale. Consultațiile sunt adaptate vârstei copilului, nivelului de activitate și obiectivelor sportive, oferind recomandări medicale personalizate și suport continuu pentru părinți. După consultație, părinții pot explora platforma Yuvoo pentru a găsi cluburi sportive care pot implementa recomandările medicale ale specialistului.

${doctor.onlineConsultations ? "Dr. " + doctor.name + " oferă și consultații online, permițând accesibilitate crescută pentru familiile care doresc consiliere medicală specializată în contextul activităților sportive ale copiilor lor." : ""}`;

  const about = {
    title: "Despre Specialist",
    content: `Dr. ${doctor.name} este dedicat oferirii de consultații medicale de calitate pentru copiii care participă la activități sportive, cu focus pe ${specialtyDisplay.toLowerCase()}. ${doctor.description ? doctor.description + " " : ""}Experiența și cunoștințele specializate permit abordarea completă a aspectelor medicale, fizice și psihologice care influențează participarea și dezvoltarea copiilor prin sport.

${doctor.verified ? "Ca specialist verificat Yuvoo, Dr. " + doctor.name + " îndeplinește cele mai înalte standarde de calitate și profesionalism în domeniul consultațiilor medicale pentru copii activi. Verificarea confirmă experiența, calificările și angajamentul față de oferirea de servicii medicale excelente." : ""}

Filosofia de lucru se bazează pe principii de prevenție, educație și suport continuu pentru familii. Credem că consultațiile medicale specializate sunt esențiale pentru asigurarea participării sigure și benefice a copiilor la activități sportive, și ne străduim să oferim ghidare clară și suport pentru părinți în deciziile privind sportul copiilor lor.`,
  };

  const specialtyLower = doctor.specialty.toLowerCase();

  const specialtyContent = `Specializarea în ${specialtyDisplay.toLowerCase()} permite abordarea unor aspecte specifice ale sănătății copiilor în contextul activităților sportive. ${specialtyLower.includes("ortoped") || specialtyLower.includes("orthoped") ? "Cu focus pe dezvoltarea sistemului ososar, postură și prevenirea leziunilor, consultațiile includ evaluări posturale, recomandări pentru sporturi potrivite și managementul leziunilor sportive." : specialtyLower.includes("nutrit") || specialtyLower.includes("nutrition") ? "Cu focus pe nutriție optimă pentru copiii activi, consultațiile includ evaluări nutriționale, planuri alimentare personalizate și ghidare privind hidratarea și suplimentarea pentru performanță și recuperare." : specialtyLower.includes("psiholog") || specialtyLower.includes("psycholog") ? "Cu focus pe aspectele psihologice ale participării la sport, consultațiile includ evaluări psihologice, suport pentru gestionarea anxietății și presiunii, și dezvoltarea motivației și rezilienței în context sportiv." : "Consultațiile includ evaluări medicale complete, monitorizare a dezvoltării și recomandări personalizate pentru participarea sigură și benefică la activități sportive."}

Experiența în lucrul cu copiii activi și cunoștințele specializate permit oferirea de recomandări medicale adaptate nevoilor individuale ale fiecărui copil, luând în considerare vârsta, nivelul de activitate, obiectivele sportive și eventualele limitări sau preocupări medicale.`;

  const benefitsContent = `Consultațiile medicale specializate pentru copiii activi oferă multiple beneficii pentru sănătatea și dezvoltarea copilului. În primul rând, asigură că participarea la sport nu compromite sănătatea generală și identifică eventualele riscuri sau limitări care ar trebui luate în considerare.

De asemenea, consultațiile oferă ghidare clară pentru părinți privind alegerea sporturilor potrivite, prevenirea leziunilor și optimizarea beneficiilor activităților sportive. Suportul continuu permite monitorizarea dezvoltării și adaptarea recomandărilor pe măsură ce copilul crește și progresează în sport.`;

  const locationContent = `Dr. ${doctor.name} oferă consultații ${doctor.location.address ? `la ${doctor.location.address}, ${locationText}` : `în ${locationText}`}${doctor.onlineConsultations ? ", precum și consultații online pentru accesibilitate crescută" : ""}. ${doctor.location.coordinates ? "Locația este ușor accesibilă, cu opțiuni de transport și parcare disponibile în apropiere." : ""}

${doctor.contact.phone || doctor.contact.email ? "Pentru programarea unei consultații sau pentru mai multe informații, " + (doctor.contact.phone ? "poți suna la " + doctor.contact.phone + (doctor.contact.email ? " sau " : "") : "") + (doctor.contact.email ? "trimite un email la " + doctor.contact.email : "") + "." : ""} ${doctor.acceptingNewPatients !== false ? "Acceptăm pacienți noi și suntem disponibili pentru consultații." : ""}`;

  const contactContent = `Pentru a programa o consultație sau pentru mai multe informații despre serviciile oferite, te rugăm să ne contactezi. ${doctor.contact.phone ? `Poți suna direct la ${doctor.contact.phone} sau ` : ""}${doctor.contact.email ? `trimite un email la ${doctor.contact.email}.` : "utilizează formularele disponibile pe site pentru a programa o consultație."}

${doctor.onlineConsultations ? "Oferim și opțiunea de consultații online, permițând accesibilitate crescută pentru familiile care preferă această modalitate sau care sunt situate în alte zone geografice." : ""} ${doctor.acceptingNewPatients !== false ? "Suntem disponibili pentru consultații noi și oferim suport continuu pentru familiile care doresc consiliere medicală specializată în contextul activităților sportive ale copiilor lor." : ""}`;

  return {
    introduction,
    about,
    specialty: {
      title: "Specialitate și Expertiză",
      content: specialtyContent,
    },
    services: {
      title: "Servicii Oferite",
      items: getSpecialtyServices(doctor.specialty),
    },
    benefits: {
      title: "Beneficii ale Consultațiilor",
      content: benefitsContent,
    },
    location: {
      title: "Locație și Contact",
      content: locationContent,
    },
    contactInfo: {
      title: "Programare Consultație",
      content: contactContent,
    },
    internalLinks: {
      sportsLink: routes.sports.list,
      sportsLinkText: "Explorează sporturi pentru copii",
      clubsLink: `${routes.clubs.list}?city=${encodeURIComponent(doctor.location.city)}`,
      clubsLinkText: `Găsește cluburi sportive în ${doctor.location.city}`,
    },
  };
}

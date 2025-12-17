/**
 * Club Expanded Content Generator
 *
 * Generates comprehensive expanded content (600-900 words) for club detail pages.
 * All content is in Romanian for SEO purposes.
 */

import type { Club } from "@/modules/clubs/clubs.types";
import { routes } from "@/lib/routes";

export interface ClubExpandedContent {
  introduction: string; // Expanded introduction (200-300 words)
  about: {
    title: string;
    content: string; // About the club (150-200 words)
  };
  programs: {
    title: string;
    content: string; // Programs and age groups (150-200 words)
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
    content: string; // Location and facilities (100-150 words)
  };
  contactInfo: {
    title: string;
    content: string; // Contact and enrollment info (100-150 words)
  };
  internalLinks: {
    sportLink: string;
    sportLinkText: string;
    doctorsLink: string;
    doctorsLinkText: string;
  };
}

/**
 * Get sport-specific benefits based on sport type
 */
function getSportSpecificBenefits(
  sportName: string
): Array<{ title: string; description: string }> {
  const sportLower = sportName.toLowerCase();

  // Common benefits for all sports
  const commonBenefits = [
    {
      title: "Dezvoltare fizică completă",
      description:
        "Antrenamentele regulate dezvoltă forța, rezistența, coordonarea și flexibilitatea, contribuind la o creștere sănătoasă și la dezvoltarea capacităților motorii fundamentale.",
    },
    {
      title: "Dezvoltare socială și emoțională",
      description:
        "Sportul încurajează lucrul în echipă, comunicarea eficientă, respectul față de colegi și antrenori, și construiește încrederea în sine prin realizări pe teren.",
    },
    {
      title: "Disciplină și responsabilitate",
      description:
        "Participarea regulată la antrenamente și respectarea programului dezvoltă disciplina, autocontrolul și responsabilitatea, abilități valoroase pentru viața de zi cu zi.",
    },
    {
      title: "Mediu sigur și încurajator",
      description:
        "Clubul nostru oferă un mediu sigur, monitorizat de antrenori calificați, unde fiecare copil este încurajat să se dezvolte la propriul ritm și să-și descopere potențialul.",
    },
  ];

  // Sport-specific additional benefits
  if (sportLower.includes("fotbal")) {
    return [
      ...commonBenefits,
      {
        title: "Spirit de echipă și cooperare",
        description:
          "Fotbalul învață copiii valoarea lucrului în echipă, strategia de joc și comunicarea eficientă pe teren, abilități esențiale pentru dezvoltarea socială.",
      },
      {
        title: "Viteza de reacție și agilitate",
        description:
          "Antrenamentele de fotbal dezvoltă viteza de reacție, agilitatea și capacitatea de a lua decizii rapide în situații de presiune.",
      },
    ];
  }

  if (sportLower.includes("baschet") || sportLower.includes("baschet")) {
    return [
      ...commonBenefits,
      {
        title: "Înălțime și salt",
        description:
          "Baschetul ajută la dezvoltarea saltului vertical, coordonării mâini-ochi și îmbunătățește reflecsele și agilitatea generală.",
      },
      {
        title: "Strategie și gândire rapidă",
        description:
          "Jocul de baschet necesită gândire strategică rapidă, capacitate de a anticipa mișcările adversarilor și luarea deciziilor eficiente sub presiune.",
      },
    ];
  }

  if (sportLower.includes("tenis")) {
    return [
      ...commonBenefits,
      {
        title: "Coordonare mână-ochi",
        description:
          "Tenisul dezvoltă coordonarea mână-ochi la un nivel înalt, precizia și controlul fine al mișcărilor, abilități utile în multe domenii ale vieții.",
      },
      {
        title: "Autocontrol și concentrare",
        description:
          "Tenisul necesită concentrare intensă, autocontrol emoțional și capacitatea de a gestiona presiunea în situații competitive.",
      },
    ];
  }

  if (sportLower.includes("gimnastică") || sportLower.includes("gimnastica")) {
    return [
      ...commonBenefits,
      {
        title: "Flexibilitate și forță",
        description:
          "Gimnastica dezvoltă flexibilitatea corporală, forța și controlul muscular la un nivel înalt, contribuind la o postură corectă și la prevenirea leziunilor.",
      },
      {
        title: "Grace și precizie",
        description:
          "Antrenamentele de gimnastică încurajează grația mișcărilor, precizia și eleganța, dezvoltând simțul estetic și coordonarea corporală.",
      },
    ];
  }

  if (sportLower.includes("înot") || sportLower.includes("inot")) {
    return [
      ...commonBenefits,
      {
        title: "Rezistență cardiovasculară",
        description:
          "Înotul este unul dintre cele mai complete sporturi pentru dezvoltarea rezistenței cardiovasculare și a capacității pulmonare, fără impact asupra articulațiilor.",
      },
      {
        title: "Siguranță în apă",
        description:
          "Învățarea înotului oferă abilități esențiale de siguranță în apă, reducând riscul de înec și creând încredere în medii acvatice.",
      },
    ];
  }

  if (
    sportLower.includes("karate") ||
    sportLower.includes("taekwondo") ||
    sportLower.includes("judo")
  ) {
    return [
      ...commonBenefits,
      {
        title: "Autocontrol și respect",
        description:
          "Artele marțiale învață autocontrolul, respectul față de adversari și antrenori, și valorile etice esențiale pentru dezvoltarea caracterului.",
      },
      {
        title: "Autodefensă și încredere",
        description:
          "Antrenamentele de arte marțiale oferă tehnici de autodefensă și construiesc încrederea în sine, ajutând copiii să gestioneze situațiile dificile cu calm și control.",
      },
    ];
  }

  // Default benefits for other sports
  return [
    ...commonBenefits,
    {
      title: "Dezvoltare personalizată",
      description:
        "Programele noastre sunt adaptate nevoilor individuale ale fiecărui copil, permițându-i să progreseze la propriul ritm și să-și atingă obiectivele personale.",
    },
    {
      title: "Bucurie și pasiune pentru sport",
      description:
        "Cea mai importantă beneficiu este dezvoltarea unei pasiuni durabile pentru sport și un stil de viață activ, care va însoți copilul pe tot parcursul vieții.",
    },
  ];
}

/**
 * Generate comprehensive expanded content for a club
 */
export function generateClubExpandedContent(club: Club): ClubExpandedContent {
  const ageRange =
    club.ageGroups.length === 1
      ? `${club.ageGroups[0]} ani`
      : `${Math.min(...club.ageGroups)}-${Math.max(...club.ageGroups)} ani`;

  const levelsText = club.levels
    .map((level) => {
      const levelMap: Record<string, string> = {
        beginner: "începători",
        intermediate: "intermediari",
        advanced: "avansați",
      };
      return levelMap[level.toLowerCase()] || level;
    })
    .join(", ");

  const locationText = club.location.district
    ? `${club.location.city}, ${club.location.district}`
    : club.location.city;

  const pricingText = club.pricing
    ? `${club.pricing.amount} ${club.pricing.currency}/${
        club.pricing.type === "monthly"
          ? "lună"
          : club.pricing.type === "per_class"
            ? "ședință"
            : "semestru"
      }`
    : "Contactează clubul pentru detalii despre prețuri";

  const introduction = `${club.name} este un club sportiv ${club.verified ? "verificat" : ""} dedicat dezvoltării copiilor prin ${club.sportName.toLowerCase()}, situat în ${locationText}. ${club.description || `Clubul oferă programe de calitate pentru copii cu vârste între ${ageRange}, adaptate diferitelor niveluri de experiență și aptitudini.`}

${club.verified ? "Clubul a primit verificarea Yuvoo, ceea ce confirmă că îndeplinește standardele de calitate și siguranță pentru programele destinate copiilor." : ""} Antrenorii noștri sunt calificați și experimentați în lucrul cu copiii, oferind un mediu sigur, încurajator și profesional unde fiecare copil poate să-și descopere pasiunea pentru ${club.sportName.toLowerCase()} și să se dezvolte atât fizic, cât și emoțional.

Programele noastre sunt concepute să fie atât distractive, cât și educative, combinând elemente de joc cu dezvoltarea tehnică și tactică necesară pentru progres în ${club.sportName.toLowerCase()}. Fie că copilul tău este la început de drum sau are deja experiență în acest sport, oferim structura și suportul necesar pentru a-și atinge potențialul maxim. Pentru mai multe informații despre ${club.sportName.toLowerCase()} și beneficiile acestuia pentru copii, consultă ghidul nostru despre ${club.sportName.toLowerCase()}.`;

  const about = {
    title: "Despre Clubul Nostru",
    content: `Clubul ${club.name} este dedicat promovării ${club.sportName.toLowerCase()} în rândul copiilor din ${locationText}, oferind programe structurate și adaptate vârstelor și nivelurilor de experiență. Misiunea noastră este să creăm un mediu unde copiii pot învăța, se pot dezvolta și se pot bucura de sport într-un context sigur și încurajator.

${club.verified ? "Ca club verificat Yuvoo, ne angajăm să respectăm cele mai înalte standarde de calitate, siguranță și profesionalism. Verificarea noastră confirmă că facilitățile, echipamentele și programele noastre îndeplinesc cerințele stricte stabilite pentru programele destinate copiilor." : ""} Antrenorii noștri sunt selectați atent pentru experiența lor în lucrul cu copiii și pentru calificările lor profesionale în domeniul ${club.sportName.toLowerCase()}. Pentru o înțelegere mai profundă a beneficiilor ${club.sportName.toLowerCase()} pentru copii, explorează ghidul complet despre ${club.sportName.toLowerCase()} disponibil pe platforma Yuvoo.

Filosofia noastră se bazează pe principii de respect, disciplină, cooperare și dezvoltare personală. Credem că sportul este un instrument puternic pentru dezvoltarea caracterului, încrederea în sine și abilităților sociale, și ne străduim să creăm experiențe pozitive care vor influența pozitiv copiii pe tot parcursul vieții lor. În cazul în care ai întrebări despre sănătatea copilului tău în contextul activităților sportive, recomandăm consultarea cu un specialist pediatric verificat.`,
  };

  const programs = {
    title: "Programe și Grupe de Vârstă",
    content: `Clubul ${club.name} oferă programe adaptate pentru copiii cu vârste între ${ageRange}, structurate în funcție de vârstă, nivel de experiență și obiective individuale. Grupele sunt formate pentru a asigura un raport optim între antrenori și copii, permițând atenție personalizată și progres eficient.

Pentru ${club.levels.length > 1 ? `nivelurile de ${levelsText}` : `nivelul de ${levelsText}`}, oferim antrenamente care se concentrează pe dezvoltarea tehnicilor fundamentale, înțelegerea regulilor jocului, și construirea unei baze solide pentru progres ulterior. ${club.levels.includes("advanced") || club.levels.includes("Advanced") ? "Pentru nivelurile avansate, programele includ elemente tactice mai complexe, pregătire pentru competiții, și dezvoltare avansată a abilităților tehnice și fizice." : ""}

Structura antrenamentelor variază în funcție de vârstă și nivel, dar toate includ elemente de încălzire, instruire tehnică, practică aplicată, și cool-down. ${club.schedule && club.schedule.length > 0 ? `Antrenamentele se desfășoară conform programului stabilit, asigurând consistență și progres continuu.` : "Programul de antrenamente este flexibil și se adaptează nevoilor familiilor și copiilor."}`,
  };

  const locationContent = `Clubul ${club.name} este situat în ${locationText}${club.location.address ? `, la adresa ${club.location.address}` : ""}, într-o locație accesibilă și bine conectată. Facilitățile noastre sunt echipate corespunzător pentru ${club.sportName.toLowerCase()} și respectă standardele de siguranță necesare pentru programele destinate copiilor.

${club.location.coordinates ? "Locatia noastră este ușor de găsit și accesibilă cu transportul public sau cu mașina, cu parcare disponibilă în apropiere." : ""} Spațiile sunt întreținute regulat și sunt concepute să ofere un mediu sigur și confortabil pentru antrenamente și competiții.`;

  const contactContent = `Pentru mai multe informații despre programele noastre, înscrieri, sau pentru a programa o vizită la club, te rugăm să ne contactezi. ${club.contact.phone ? `Poți suna la ${club.contact.phone} sau ` : ""}${club.contact.email ? `trimite un email la ${club.contact.email}.` : "contactează-ne prin formularele disponibile pe site."}

${club.pricing ? `Prețurile pentru programele noastre încep de la ${pricingText}, iar oferim flexibilitate în termenii de plată și posibilitatea de a participa la ședințe de probă înainte de înscrierea completă.` : "Pentru detalii despre prețuri și opțiuni de plată, te rugăm să ne contactezi direct."} ${club.schedule && club.schedule.length > 0 ? "Programul complet de antrenamente este disponibil la cerere și poate fi adaptat în funcție de disponibilitatea familiei." : ""}`;

  return {
    introduction,
    about,
    programs,
    benefits: {
      title: `Beneficii ale ${club.sportName} pentru copii`,
      items: getSportSpecificBenefits(club.sportName),
    },
    location: {
      title: "Locație și Facilități",
      content: locationContent,
    },
    contactInfo: {
      title: "Informații de Contact și Înscriere",
      content: contactContent,
    },
    internalLinks: {
      sportLink: `${routes.sports.detail(club.sportId)}`,
      sportLinkText: `Află mai multe despre ${club.sportName}`,
      doctorsLink: `${routes.doctors.list}?city=${encodeURIComponent(club.location.city)}`,
      doctorsLinkText: `Consultă specialiști pediatri în ${club.location.city}`,
    },
  };
}

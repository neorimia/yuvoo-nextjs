/**
 * Guide Pages Data
 *
 * Long-tail SEO / AEO landing pages for parents choosing sports by age or temperament.
 * All user-facing content in Romanian.
 */

import type { FAQItem } from "./faq-data";

export interface GuideRecommendation {
  sportName: string;
  sportSlug: string;
  reason: string;
}

export interface GuideAgeRow {
  ageRange: string;
  sports: string;
  notes: string;
}

export interface GuidePage {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  keywords: string[];
  introduction: string;
  recommendations: GuideRecommendation[];
  ageTable?: GuideAgeRow[];
  faq: FAQItem[];
  relatedGuideSlugs: string[];
  lastModified: string;
  ymylVariant: "sport" | "general";
}

export const GUIDE_PAGES_LASTMOD = new Date("2026-08-19T00:00:00.000Z");

export const GUIDE_PAGES: GuidePage[] = [
  {
    slug: "sport-copii-6-ani",
    title: "Sporturi recomandate pentru copii de 6 ani | Yuvoo",
    h1: "Sporturi recomandate pentru copii de 6 ani",
    metaDescription:
      "Ce sport alegi pentru un copil de 6 ani? Ghid complet: înot, gimnastică, fotbal, dans și altele — beneficii, vârstă potrivită și cum găsești cluburi verificate în România.",
    keywords: [
      "sport copii 6 ani",
      "sporturi copii 6 ani",
      "activități sportive 6 ani",
      "ce sport la 6 ani",
      "cluburi sport copii bucuresti",
    ],
    introduction: `La vârsta de 6 ani, copiii au de obicei coordonare mai bună, atenție prelungită și dorința de a juca în grup. Este un moment excelent pentru a introduce un sport structurat, dar fără presiune de performanță. Organizația Mondială a Sănătății recomandă cel puțin 60 de minute de activitate fizică moderată până la viguroasă pe zi pentru copiii școlari — sportul organizat poate acoperi o parte importantă din acest timp.

La 6 ani, antrenamentele ar trebui să pună accent pe joc, dezvoltarea motricității generale și plăcerea de a mișca, nu pe competiție intensă. Mulți antrenori folosesc jocuri scurte, exerciții variate și pauze frecvente pentru a menține interesul. Părinții pot observa ce tip de activitate îi entuziasmează copilul: mișcare în echipă, sport individual, ritm muzical sau contact controlat.

Pe Yuvoo găsești cluburi listate pe sport și vârstă, cu filtre pentru verificare și locație. Dacă nu ești sigur de unde să începi, chestionarul AI analizează personalitatea, energia și preferințele copilului și propune 2–3 sporturi potrivite, cu explicații în limba română.`,
    recommendations: [
      {
        sportName: "Înot",
        sportSlug: "inot",
        reason:
          "Dezvoltă rezistență, coordonare și siguranță în apă. Programele pentru începători la 6 ani pun accent pe adaptare și joc acvatic.",
      },
      {
        sportName: "Gimnastică artistică",
        sportSlug: "gimnastica-artistica",
        reason:
          "Îmbunătățește flexibilitatea, echilibrul și conștientizarea corpului — abilități transferabile în orice alt sport.",
      },
      {
        sportName: "Fotbal",
        sportSlug: "fotbal",
        reason:
          "Sport de echipă accesibil, cu multe cluburi în România. La 6 ani, antrenamentele sunt recreative, cu mingi mici și terenuri reduse.",
      },
      {
        sportName: "Dans",
        sportSlug: "dans",
        reason:
          "Combină mișcarea cu muzica și expresia; potrivit copiilor care preferă activități creative în grup.",
      },
      {
        sportName: "Karate",
        sportSlug: "karate",
        reason:
          "Arte marțiale cu discipline clară; la vârsta mică se învață respect, control și coordonare, nu luptă intensă.",
      },
    ],
    ageTable: [
      {
        ageRange: "4–5 ani",
        sports: "Gimnastică joc, dans, înot adaptat",
        notes: "Sesiuni scurte (30–45 min), mult joc liber",
      },
      {
        ageRange: "6–7 ani",
        sports: "Înot, fotbal mini, karate, gimnastică",
        notes: "Introducere reguli de bază, fără competiție serioasă",
      },
      {
        ageRange: "8–10 ani",
        sports: "Tenis, baschet, handbal, atletism",
        notes: "Poate apărea interes pentru sporturi tehnice",
      },
    ],
    faq: [
      {
        question: "Câte zile pe săptămână ar trebui să facă sport un copil de 6 ani?",
        answer:
          "De obicei 2–3 sesiuni de 45–60 de minute sunt suficiente, plus joacă liberă zilnică. Evită suprasolicitarea — copilul trebuie să aștepte cu plăcere antrenamentul.",
      },
      {
        question: "Care este cel mai bun sport pentru un copil de 6 ani?",
        answer:
          "Nu există un singur răspuns universal. Alegerea depinde de temperament, nivel de energie, coordonare și interese. Înotul, gimnastica și fotbalul sunt opțiuni populare la această vârstă în România.",
      },
      {
        question: "Trebuie consultat un medic înainte de înscriere?",
        answer:
          "Pentru copiii sănătoși, un control pediatric de rutină este recomandat. Dacă există afecțiuni (astm, probleme articulare), consultă un medic pediatru sau specialist ortoped pediatric înainte de sport.",
      },
      {
        question: "Cum aleg un club potrivit pentru copilul de 6 ani?",
        answer:
          "Verifică vârsta minimă acceptată, raportul copii-antrenor, programul (după școală), distanța față de casă și posibilitatea unei probe gratuite. Pe Yuvoo poți filtra cluburi verificate și compara opțiuni.",
      },
      {
        question: "Poate un copil de 6 ani face mai multe sporturi simultan?",
        answer:
          "Da, dar cu moderație. Combinarea a două activități complementare (ex. înot + dans) poate fi benefică; evită programul supraîncărcat care duce la oboseală sau pierderea interesului.",
      },
    ],
    relatedGuideSlugs: ["ce-sport-la-8-ani", "ce-sport-potrivit-copilului"],
    lastModified: "2026-08-19",
    ymylVariant: "sport",
  },
  {
    slug: "ce-sport-la-8-ani",
    title: "Ce sport aleg pentru un copil de 8 ani? | Yuvoo",
    h1: "Ce sport aleg pentru un copil de 8 ani?",
    metaDescription:
      "Ghid pentru părinți: ce sport se potrivește unui copil de 8 ani — tenis, baschet, înot, arte marțiale. Criterii de alegere, beneficii și cluburi verificate.",
    keywords: [
      "ce sport la 8 ani",
      "sport copii 8 ani",
      "activități copii 8 ani",
      "sport potrivit copil 8 ani",
      "cluburi sport copii",
    ],
    introduction: `La 8 ani, mulți copii au deja experiență școlară solidă, abilități sociale mai dezvoltate și capacitatea de a urma instrucțiuni complexe. Este o vârstă în care se pot distinge preferințele clare: sport de echipă versus individual, competiție versus recreație, activități cu contact versus fără contact.

Antrenamentele pot include elemente tehnice mai avansate, dar părinții ar trebui să evite presiunea prematură pentru performanță. Federațiile sportive din România au categorii de vârstă care permit participarea graduală la competiții locale — consultă antrenorul clubului despre calendar și așteptări.

Factorii cheie la 8 ani: interesul copilului (cel mai important), compatibilitatea cu programul familiei, costul și echipamentul, calitatea antrenorilor și siguranța mediului. Yuvoo te ajută să compari cluburi, să citești despre fiecare sport și să obții recomandări personalizate prin chestionarul AI — util mai ales când copilul oscilează între două opțiuni.`,
    recommendations: [
      {
        sportName: "Tenis",
        sportSlug: "tenis",
        reason:
          "La 8 ani, coordonarea ochi-mână permite progres rapid. Tenisul dezvoltă disciplină și concentrare, cu opțiuni individuale sau duble.",
      },
      {
        sportName: "Baschet",
        sportSlug: "baschet",
        reason:
          "Sport dinamic de echipă; copiii înalți sau agili se simt adesea atrași. Programele pentru începători folos coșuri și mingi adaptate.",
      },
      {
        sportName: "Înot",
        sportSlug: "inot",
        reason:
          "Rămâne o alegere excelentă la orice vârstă; la 8 ani se pot introduce stiluri noi și înot de performanță ușoară.",
      },
      {
        sportName: "Judo",
        sportSlug: "judo",
        reason:
          "Predă căderi controlate, respect și încredere; potrivit copiilor activi care au nevoie de cadru clar.",
      },
      {
        sportName: "Atletism",
        sportSlug: "atletism",
        reason:
          "Oferă varietate (alergare, sărituri, aruncări) și dezvoltă condiția fizică generală — bună bază pentru alte sporturi.",
      },
    ],
    ageTable: [
      {
        ageRange: "6–7 ani",
        sports: "Fotbal mini, gimnastică, înot",
        notes: "Bază motrică, joc predominant",
      },
      {
        ageRange: "8–9 ani",
        sports: "Tenis, baschet, judo, handbal",
        notes: "Tehnică de bază, posibil competiții locale ușoare",
      },
      {
        ageRange: "10–12 ani",
        sports: "Volei, rugby tag, scrimă, ciclism",
        notes: "Specializare treptată dacă există pasiune",
      },
    ],
    faq: [
      {
        question: "La 8 ani, copilul poate alege singur sportul?",
        answer:
          "Copilul ar trebui implicat activ în decizie, dar părintele oferă cadrul: buget, transport, siguranță. Propune 2–3 opțiuni și lasă copilul să încerce probe la cluburi diferite.",
      },
      {
        question: "Este prea târziu să înceapă un sport la 8 ani?",
        answer:
          "Nu. Majoritatea sporturilor au programe pentru începători la această vârstă. Tenisul, baschetul și înotul acceptă copii fără experiență anterioară.",
      },
      {
        question: "Cum recunosc un antrenor potrivit pentru copilul de 8 ani?",
        answer:
          "Un antrenor bun explică pe înțelesul copilului, oferă feedback pozitiv, respectă limitele de siguranță și comunică transparent cu părinții. Evită antrenorii care pun presiune excesivă pe rezultate.",
      },
      {
        question: "Sport de echipă sau individual la 8 ani?",
        answer:
          "Depinde de personalitate. Copiii sociabili prosperă adesea în echipe (fotbal, baschet); cei care preferă ritmul propriu pot prefera tenis, înot sau gimnastică.",
      },
      {
        question: "Cât costă în medie un club sportiv pentru copii în România?",
        answer:
          "Costurile variază (150–400 RON/lună în funcție de sport și oraș), plus echipament. Multe cluburi oferă probă gratuită — profită de ea înainte de angajament pe termen lung.",
      },
    ],
    relatedGuideSlugs: ["sport-copii-6-ani", "ce-sport-potrivit-copilului", "sport-copil-timid"],
    lastModified: "2026-08-19",
    ymylVariant: "sport",
  },
  {
    slug: "sport-copil-timid",
    title: "Ce sport se potrivește unui copil timid? | Yuvoo",
    h1: "Ce sport se potrivește unui copil timid?",
    metaDescription:
      "Sporturi potrivite copiilor timizi sau introvertiți: înot, gimnastică, tenis, arte marțiale. Cum construiești încredere fără presiune socială excesivă.",
    keywords: [
      "sport copil timid",
      "sport copii introvertiti",
      "ce sport pentru copil timid",
      "activități copii timizi",
      "sport încredere copii",
    ],
    introduction: `Copiii timizi sau introvertiți pot beneficia enorm de sport, dar mediul și tipul de activitate contează mai mult decât la copiii extrovertiți. Un antrenor care forțează participarea publică sau un sport cu presiune socială intensă poate amplifica anxietatea; invers, un cadru predictibil, antrenor empatic și progres gradual pot construi încredere pe termen lung.

Sporturile care permit dezvoltare individuală în cadrul unui grup mic, sau activități cu ritm propriu, sunt adesea mai potrivite la început. Înotul, gimnastica, tenisul (lecții private sau grupuri mici) și anumite arte marțiale pun accent pe competiția cu sine, nu doar cu alții.

Semne că sportul nu se potrivește: refuz repetat fără explicație, somn perturbat înainte de antrenament, plâns constant, retragere socială accentuată. În aceste cazuri, discută cu antrenorul, încearcă alt sport sau consultă un psiholog pediatru. Yuvoo nu înlocuiește evaluarea specialiștilor, dar te ajută să explorezi opțiuni cu presiune redusă și să găsești cluburi cu recenzii și programe pentru începători.`,
    recommendations: [
      {
        sportName: "Înot",
        sportSlug: "inot",
        reason:
          "Mediu relativ liniștit, progres individual vizibil; copilul poate evita contactul direct intens cu alții în primele luni.",
      },
      {
        sportName: "Gimnastică ritmică",
        sportSlug: "gimnastica-ritmica",
        reason:
          "Expresie prin mișcare și muzică; grupuri mici, accent pe formă personală — potrivit copiilor sensibili.",
      },
      {
        sportName: "Tenis",
        sportSlug: "tenis",
        reason:
          "Lecții individuale sau perechi mici; antrenorul poate adapta ritmul fără presiune de echipă mare.",
      },
      {
        sportName: "Karate",
        sportSlug: "karate",
        reason:
          "Structură clară, ritualuri predictibile; multe dojo-uri promovează respect și fără umilințe — verifică filosofia clubului.",
      },
      {
        sportName: "Dans",
        sportSlug: "dans",
        reason:
          "Permite exprimare fără cuvinte; clasele de balet sau dans modern pot fi mai puțin intimidante decât sporturile de contact.",
      },
    ],
    faq: [
      {
        question: "Ar trebui să forțez copilul timid să meargă la sport?",
        answer:
          "Nu forța participarea repetată dacă există anxietate clară. Oferă opțiuni, probe scurte și timp de adaptare. Consultă specialist dacă refuzul persistă peste câteva săptămâni.",
      },
      {
        question: "Sporturile de echipă sunt rele pentru copiii timizi?",
        answer:
          "Nu neapărat, dar alege echipe mici, antrenori calmi și programe recreative. Fotbalul sau baschetul pot funcționa dacă copilul are prieteni în echipă sau dacă clubul pune accent pe incluziune.",
      },
      {
        question: "Cum ajut copilul timid la prima probă?",
        answer:
          "Vorbește despre ce se va întâmpla, ajunge devreme, prezintă-l antrenorului, rămâi aproape dacă e nevoie (conform regulilor clubului) și laudă curajul, nu performanța.",
      },
      {
        question: "Arte marțiale pentru copii timizi — da sau nu?",
        answer:
          "Da, dacă dojo-ul are abordare pedagogică (fără agresivitate, progres gradual). Karate, judo și taekwondo pot crește stima de sine și autocontrolul.",
      },
      {
        question: "Când e momentul să renunțăm la un sport?",
        answer:
          "Dacă după 2–3 luni de adaptare copilul rămâne anxios sau nefericit, e rezonabil să încercați alt sport. Obiectivul este dezvoltarea pe termen lung, nu persistența forțată.",
      },
    ],
    relatedGuideSlugs: ["ce-sport-potrivit-copilului", "sport-copii-6-ani"],
    lastModified: "2026-08-19",
    ymylVariant: "general",
  },
  {
    slug: "ce-sport-potrivit-copilului",
    title: "Ce sport i se potrivește copilului meu? | Yuvoo",
    h1: "Ce sport i se potrivește copilului meu?",
    metaDescription:
      "Ghid complet pentru părinți: cum alegi sportul potrivit copilului — vârstă, personalitate, energie, sănătate. Plus chestionar AI Yuvoo și cluburi verificate.",
    keywords: [
      "ce sport i se potriveste copilului",
      "sport potrivit copil",
      "cum aleg sport copil",
      "recomandări sport copii",
      "chestionar sport copii",
    ],
    introduction: `„Ce sport i se potrivește copilului meu?" este una dintre cele mai frecvente întrebări ale părinților din România. Răspunsul nu depinde doar de vârstă, ci de o combinație de factori: temperament (timid sau extrovertit), nivel de energie, coordonare, interese, constrângeri de timp și buget, plus eventuale recomandări medicale.

Nu există un sport „perfect" universal. Un copil energic poate prospera la fotbal sau baschet; unul care preferă rutina poate prefera înot sau gimnastică; un copil creativ poate iubi dansul. Important este ca sportul să fie sustenabil — copilul să aștepte antrenamentul, nu să-l perceapă ca pedeapsă.

Procesul recomandat: (1) observă preferințele copilului în joacă liberă; (2) discută despre sporturi fără presiune; (3) programează 1–2 probe la cluburi diferite; (4) evaluează antrenorul, grupa și logistica; (5) folosește instrumente obiective — chestionarul AI Yuvoo analizează răspunsurile tale și propune sporturi cu explicații. Yuvoo este o platformă de orientare, nu un substitut pentru medic sau antrenor.`,
    recommendations: [
      {
        sportName: "Fotbal",
        sportSlug: "fotbal",
        reason:
          "Potrivit copiilor sociabili, activi, care iubesc jocul de echipă și competiția prietenoasă.",
      },
      {
        sportName: "Înot",
        sportSlug: "inot",
        reason:
          "Opțiune versatilă pentru majoritatea vârstelor; bun pentru copii cu alergii la polen (interior) sau timizi.",
      },
      {
        sportName: "Gimnastică artistică",
        sportSlug: "gimnastica-artistica",
        reason:
          "Ideal pentru copii flexibili, disciplinați, care apreciază progresul tehnic vizibil.",
      },
      {
        sportName: "Tenis",
        sportSlug: "tenis",
        reason:
          "Pentru copii care preferă focus individual, au răbdare pentru repetitie și coordonare bună.",
      },
      {
        sportName: "Dans",
        sportSlug: "dans",
        reason:
          "Alege-l dacă copilul răspunde la muzică, îi place mișcarea expresivă și atmosfera de grup creativ.",
      },
    ],
    ageTable: [
      {
        ageRange: "4–6 ani",
        sports: "Gimnastică joc, dans, înot, fotbal mini",
        notes: "Focus pe plăcere și motricitate de bază",
      },
      {
        ageRange: "7–9 ani",
        sports: "Înot, fotbal, tenis, karate, baschet",
        notes: "Introducere reguli; implică copilul în alegere",
      },
      {
        ageRange: "10–14 ani",
        sports: "Specializare treptată în sportul preferat",
        notes: "Poate apărea orientare spre performanță dacă există pasiune",
      },
    ],
    faq: [
      {
        question: "Cum știu ce sport i se potrivește copilului?",
        answer:
          "Observă ce activități alege în joacă, ce îl entuziasmează, cum interacționează cu alții. Completează chestionarul Yuvoo pentru recomandări structurate și programează probe la cluburi.",
      },
      {
        question: "Pot folosi doar chestionarul online fără probă la club?",
        answer:
          "Chestionarul oferă orientare și punct de plecare; probă la club rămâne esențială pentru a evalua antrenorul, grupa și atmosfera reală.",
      },
      {
        question: "Ce fac dacă copilul vrea un sport pe care îl consider periculos?",
        answer:
          "Discută deschis, informează-te despre măsurile de siguranță ale clubului și consultă medicul dacă ai îngrijorări. Multe sporturi (arte marțiale, rugby) au reguli stricte pentru copii.",
      },
      {
        question: "Câți sporturi ar trebui să facă un copil simultan?",
        answer:
          "Unul principal este ideal pentru majoritatea familiilor; două complementare pot funcționa dacă programul școlar și somnul nu sunt afectate.",
      },
      {
        question: "Yuvoo înlocuiește sfatul medicului?",
        answer:
          "Nu. Yuvoo este o platformă de orientare sportivă. Pentru decizii legate de sănătate, consultă un medic pediatru sau specialist relevant.",
      },
    ],
    relatedGuideSlugs: ["sport-copii-6-ani", "ce-sport-la-8-ani", "sport-copil-timid"],
    lastModified: "2026-08-19",
    ymylVariant: "general",
  },
];

export function getGuideBySlug(slug: string): GuidePage | undefined {
  return GUIDE_PAGES.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDE_PAGES.map((g) => g.slug);
}

export function buildGuideArticleBody(guide: GuidePage): string {
  const parts = [guide.introduction];

  if (guide.recommendations.length > 0) {
    parts.push(
      "Recomandări: " + guide.recommendations.map((r) => `${r.sportName} — ${r.reason}`).join(" ")
    );
  }

  if (guide.ageTable && guide.ageTable.length > 0) {
    parts.push(
      "Ghid vârstă: " +
        guide.ageTable.map((row) => `${row.ageRange}: ${row.sports}. ${row.notes}`).join(" ")
    );
  }

  return parts.join("\n\n");
}

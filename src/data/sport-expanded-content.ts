/**
 * Sport Expanded Content Data
 *
 * Comprehensive expanded content for top 10 sport detail pages.
 * Each sport includes detailed sections: introduction, benefits, age recommendations,
 * equipment guide, FAQ, and internal links to clubs.
 *
 * All content is in Romanian for SEO purposes.
 */

import type { FAQItem } from "./faq-data";

export interface SportExpandedContent {
  sportId: string; // Matches sport.id from sports.ts
  introduction: string; // Expanded introduction (200-300 words)
  benefits: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  ageRecommendations: {
    title: string;
    content: string; // Detailed age breakdown (150-200 words)
  };
  equipmentGuide: {
    title: string;
    content: string; // Comprehensive equipment guide (150-200 words)
    items: Array<{
      name: string;
      description: string;
      essential: boolean; // Is this essential or optional?
    }>;
  };
  faq: FAQItem[]; // 3-5 sport-specific FAQs
  internalLinks: {
    clubsLink: string; // Link to clubs filtered by this sport
    clubsLinkText: string;
  };
}

/**
 * Expanded content for top 10 sports
 */
export const SPORT_EXPANDED_CONTENT: SportExpandedContent[] = [
  {
    sportId: "fotbal",
    introduction: `Fotbalul este cel mai popular sport de echipă din lume și unul dintre cele mai iubite sporturi în România. Pentru copiii din România, fotbalul oferă mult mai mult decât doar o activitate recreativă - este o modalitate excelentă de a dezvolta abilități fizice, sociale și emoționale esențiale pentru creșterea sănătoasă.

Fotbalul pentru copii începe de obicei cu jocuri simple și exerciții de bază care se concentrează pe dezvoltarea coordonării, echilibrului și înțelegerii fundamentelor sportului. Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se concepte precum tactica de echipă, strategia de joc și tehnica individuală. Acest sport este ideal pentru copiii activi care se bucură de activități în grup și care doresc să dezvolte atât abilități fizice, cât și spirit de echipă.

În România, fotbalul are o tradiție bogată și multe cluburi sportive oferă programe specializate pentru copii de diferite vârste. Cluburile verificate de Yuvoo asigură că antrenamentele sunt conduse de antrenori calificați, care înțeleg nevoile specifice ale copiilor și care creează un mediu sigur și încurajator pentru dezvoltare. Fie că copilul tău visează să devină un fotbalist profesionist sau pur și simplu vrea să se bucure de joc și prietenie, fotbalul oferă oportunități excelente de creștere și dezvoltare.`,
    benefits: {
      title: "Beneficii ale fotbalului pentru copii",
      items: [
        {
          title: "Dezvoltare fizică completă",
          description:
            "Fotbalul dezvoltă toate grupurile musculare, îmbunătățește rezistența cardiovasculară, coordonarea ochi-picior și agilitatea. Antrenamentele regulate ajută la menținerea unui greutate sănătoasă și la dezvoltarea forței musculare.",
        },
        {
          title: "Spirit de echipă și cooperare",
          description:
            "Fotbalul învață copiii valoarea lucrului în echipă, comunicării eficiente și respectului față de colegi. Aceste abilități sociale sunt esențiale pentru dezvoltarea emoțională și pentru viața de zi cu zi.",
        },
        {
          title: "Disciplină și concentrare",
          description:
            "Antrenamentele regulate și respectarea regulilor jocului dezvoltă disciplina și capacitatea de concentrare. Copiii învață importanța practicii constante și a efortului pentru îmbunătățire.",
        },
        {
          title: "Încredere în sine",
          description:
            "Realizările pe teren, fie că sunt goluri marcate sau pase bune, construiesc încrederea în sine. Succesul în fotbal ajută copiii să dezvolte o imagine pozitivă despre ei înșiși.",
        },
        {
          title: "Rezolvarea problemelor",
          description:
            "Fotbalul necesită luarea rapidă a deciziilor și adaptarea la situații în schimbare. Aceste abilități cognitive sunt valoroase atât pe teren, cât și în viața de zi cu zi.",
        },
        {
          title: "Stres și relaxare",
          description:
            "Activitatea fizică regulată reduce stresul și anxietatea, ajutând copiii să se relaxeze și să se bucure de momentul prezent. Fotbalul oferă o modalitate sănătoasă de a elibera energia.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru fotbal",
      content: `Fotbalul poate fi început de copiii de 5-6 ani, când au dezvoltat suficient coordonarea de bază și capacitatea de a urmări instrucțiuni. La această vârstă, antrenamentele se concentrează pe jocuri distractive, exerciții de bază și familiarizarea cu mingea.

Pentru copiii de 7-9 ani, antrenamentele devin mai structurate, introducându-se tehnici de bază precum controlul mingii, pasele și șuturile. La această vârstă, copiii încep să înțeleagă conceptele de echipă și să participe la jocuri mici.

Copiii de 10-12 ani pot începe să participe la competiții organizate și să învețe tactici mai complexe. La această vârstă, diferențele de dezvoltare fizică devin mai evidente, iar antrenorii adaptează antrenamentele în consecință.

Adolescenții de 13-14 ani pot participa la competiții mai serioase și pot începe să se specializeze în poziții specifice pe teren. La această vârstă, antrenamentele includ pregătire fizică intensivă și dezvoltare tactică avansată.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru fotbal",
      content: `Echipamentul de bază pentru fotbal este relativ simplu și accesibil, ceea ce face acest sport atractiv pentru multe familii. Cel mai important este să alegi echipament de calitate care să ofere protecție și confort.

Pentru început, este suficient să ai echipamentul de bază: ghete de fotbal, șosete, șorturi și tricou. Pe măsură ce copilul progresează și participă la antrenamente mai frecvente, poți investi în echipament suplimentar precum protecții pentru tibie, minge de antrenament și echipament de ploaie pentru antrenamentele în condiții meteorologice nefavorabile.

Este important să verifici regulile specifice ale clubului sau ligii în care participă copilul tău, deoarece unele pot avea cerințe specifice privind echipamentul sau culorile. Multe cluburi oferă și pachete de echipament pentru membri, ceea ce poate fi o opțiune convenabilă și economică.`,
      items: [
        {
          name: "Ghete de fotbal",
          description:
            "Ghetele sunt esențiale și trebuie să fie potrivite pentru suprafața de joc (teren natural, artificial sau sală). Pentru copiii mici, ghetele trebuie să fie confortabile și să ofere suport bun pentru glezne.",
          essential: true,
        },
        {
          name: "Protecții pentru tibie",
          description:
            "Protecțiile pentru tibie sunt obligatorii în competiții și sunt recomandate și pentru antrenamente. Protejează tibia și peroneul în cazul contactului accidental.",
          essential: true,
        },
        {
          name: "Șosete de fotbal",
          description:
            "Șosetele lungi de fotbal ajută la fixarea protecțiilor pentru tibie și oferă confort suplimentar. Sunt disponibile în diferite culori și materiale.",
          essential: true,
        },
        {
          name: "Minge de fotbal",
          description:
            "O minge de calitate este importantă pentru antrenamente acasă. Dimensiunea mingii variază în funcție de vârstă: mărimea 3 pentru copiii mici, mărimea 4 pentru 8-12 ani, mărimea 5 pentru adolescenți.",
          essential: false,
        },
        {
          name: "Echipament de antrenament",
          description:
            "Șorturi și tricou confortabile, preferabil din materiale care absorb transpirația. Multe cluburi oferă echipament oficial cu logo-ul clubului.",
          essential: true,
        },
        {
          name: "Apă și bidon",
          description:
            "Hidratarea este esențială în timpul antrenamentelor. Un bidon rezistent și ușor de transportat este recomandat.",
          essential: true,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu fotbalul?",
        answer:
          "Copiii pot începe fotbalul de la vârsta de 5-6 ani, când au dezvoltat coordonarea de bază și pot urmări instrucțiuni. Multe cluburi oferă programe speciale pentru începători care se concentrează pe jocuri distractive și familiarizare cu mingea, mai degrabă decât pe competiție.",
      },
      {
        question: "Cât costă echipamentul de bază pentru fotbal?",
        answer:
          "Echipamentul de bază (ghete, protecții pentru tibie, șosete, echipament de antrenament) poate costa între 200-400 RON pentru un set complet de calitate. Multe cluburi oferă pachete de echipament la prețuri reduse pentru membri. Poți începe cu echipament de bază și să adaugi piese suplimentare pe măsură ce copilul progresează.",
      },
      {
        question: "Cât de des sunt antrenamentele?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (5-7 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 45-60 minute. Copiii mai mari (8-12 ani) pot avea 2-3 antrenamente pe săptămână, iar adolescenții pot avea antrenamente zilnice în perioadele de competiție. Multe cluburi oferă și programe flexibile pentru începători.",
      },
      {
        question: "Este fotbalul sigur pentru copii?",
        answer:
          "Da, fotbalul este un sport sigur când este practicat sub supravegherea unui antrenor calificat și cu echipamentul adecvat. Riscu de accidente este redus prin folosirea protecțiilor pentru tibie, respectarea regulilor și antrenamentele progresive. Cluburile verificate de Yuvoo au antrenori calificați care prioritizează siguranța copiilor.",
      },
      {
        question: "Copilul meu poate juca fotbal dacă nu are experiență anterioară?",
        answer:
          "Absolut! Majoritatea cluburilor oferă programe pentru începători care nu presupun experiență anterioară. Antrenorii sunt pregătiți să lucreze cu copiii de toate nivelurile și să-i învețe fundamentalele de la zero. Important este ca copilul să fie entuziasmat și dornic să învețe.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=fotbal",
      clubsLinkText: "Vezi cluburi de fotbal verificate",
    },
  },
  {
    sportId: "inot",
    introduction: `Înotul este considerat unul dintre cele mai complete și sănătoase sporturi pentru copii, oferind dezvoltare fizică armonioasă și abilități esențiale pentru viață. În România, unde tradiția înotului are rădăcini adânci, multe cluburi sportive oferă programe specializate pentru copii de toate vârstele.

Pentru copiii mici, înotul începe cu familiarizarea cu apa, jocuri distractive și învățarea tehnicilor de bază de siguranță. Acestea sunt esențiale nu doar pentru practicarea sportului, ci și pentru siguranța generală în și în jurul apei. Pe măsură ce copiii progresează, antrenamentele devin mai structurate, introducându-se stilurile de înot clasice: liber, spate, bras și fluture.

Înotul este un sport ideal pentru copiii de toate tipurile, inclusiv pentru cei cu probleme de articulații sau care preferă activități cu impact redus. Deoarece apa susține greutatea corpului, înotul este foarte prietenos cu articulațiile și poate fi practicat de copiii cu diverse nevoi speciale. Cluburile verificate de Yuvoo oferă programe adaptate pentru începători și avansați, asigurându-se că fiecare copil primește atenția și îndrumarea necesară pentru a progresa în siguranță și cu încredere.`,
    benefits: {
      title: "Beneficii ale înotului pentru copii",
      items: [
        {
          title: "Dezvoltare fizică completă",
          description:
            "Înotul activează toate grupurile musculare simultan, dezvoltând forța, rezistența și flexibilitatea. Este unul dintre cele mai eficiente sporturi pentru îmbunătățirea capacității cardiovasculare și respiratorii.",
        },
        {
          title: "Siguranță în apă",
          description:
            "Învățarea înotului oferă copiilor abilități esențiale de siguranță în apă, reducând riscul de înec. Aceste abilități sunt valoroase pentru viață și pot salva vieți.",
        },
        {
          title: "Impact redus asupra articulațiilor",
          description:
            "Deoarece apa susține greutatea corpului, înotul este ideal pentru copiii cu probleme de articulații sau care se recuperează după accidente. Este un sport sigur și accesibil pentru majoritatea copiilor.",
        },
        {
          title: "Coordonare și echilibru",
          description:
            "Înotul dezvoltă coordonarea între mâini, picioare și respirație, precum și echilibrul și controlul corpului în apă. Aceste abilități se transferă și în alte activități sportive.",
        },
        {
          title: "Disciplină și perseverență",
          description:
            "Învățarea tehnicilor de înot necesită practică constantă și perseverență. Copiii învață valoarea efortului susținut și a progresului gradual.",
        },
        {
          title: "Relaxare și reducerea stresului",
          description:
            "Mișcarea în apă are un efect calmant și relaxant, ajutând copiii să reducă stresul și anxietatea. Înotul poate fi o modalitate excelentă de a se relaxa după școală.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru înot",
      content: `Copiii pot începe să se familiarizeze cu apa de la vârsta de 4-5 ani, când au suficientă coordonare și capacitate de a urmări instrucțiuni de bază. La această vârstă, programele se concentrează pe familiarizare, jocuri distractive și învățarea elementelor de bază de siguranță în apă.

Pentru copiii de 6-8 ani, antrenamentele introduc tehnicile de bază de înot, începând cu stilul liber și spatele. La această vârstă, copiii au suficientă coordonare pentru a învăța mișcările de bază și pot începe să înoate distanțe scurte.

Copiii de 9-11 ani pot învăța toate stilurile de înot (liber, spate, bras, fluture) și pot începe să participe la competiții de nivel începător. La această vârstă, tehnica devine mai importantă și antrenamentele devin mai structurate.

Adolescenții de 12-14 ani pot participa la competiții mai serioase și pot începe să se specializeze în anumite stiluri sau distanțe. Antrenamentele includ pregătire fizică intensivă și perfecționarea tehnicii.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru înot",
      content: `Echipamentul de bază pentru înot este relativ simplu și accesibil. Cel mai important este să alegi echipament de calitate care să ofere confort și siguranță în apă.

Pentru început, este suficient să ai costumul de baie, ochelari de înot și o pălărie de baie (dacă este necesară de club). Pe măsură ce copilul progresează, poți investi în echipament suplimentar precum palme, plute de antrenament și accesorii pentru perfecționarea tehnicii.

Este important să verifici cerințele specifice ale clubului sau bazinului unde va antrena copilul, deoarece unele pot avea reguli specifice privind echipamentul sau accesoriile permise. Multe cluburi oferă și pachete de echipament pentru membri.`,
      items: [
        {
          name: "Costum de baie",
          description:
            "Un costum de baie confortabil și bine potrivit este esențial. Pentru băieți, slipuri sau costume de baie sport, iar pentru fete, costume întregi sau bikini-uri sport. Materialul trebuie să fie rezistent la clor și să se usuce rapid.",
          essential: true,
        },
        {
          name: "Ochelari de înot",
          description:
            "Ochelarii de înot protejează ochii de clor și permit vedere clară sub apă. Sunt esențiali pentru antrenamente și competiții. Alege ochelari cu etanșare bună și lentile rezistente la abraziune.",
          essential: true,
        },
        {
          name: "Pălărie de baie",
          description:
            "Pălăria de baie este necesară în multe bazine pentru a menține apa curată. Poate fi de silicon sau textilă, în funcție de preferințele copilului și cerințele bazinului.",
          essential: false,
        },
        {
          name: "Prosop și papuci de duș",
          description:
            "Un prosop mare și absorbant, precum și papuci de duș pentru a preveni infecțiile fungice, sunt esențiali pentru după antrenament. Alege materiale care se usucă rapid.",
          essential: true,
        },
        {
          name: "Palme de înot",
          description:
            "Palmele ajută la dezvoltarea forței picioarelor și perfecționarea tehnicii. Sunt utile pentru antrenamente avansate, dar nu sunt necesare pentru începători.",
          essential: false,
        },
        {
          name: "Plută de antrenament",
          description:
            "Plutele sunt utile pentru exerciții de antrenament și pentru îmbunătățirea tehnicii. Sunt disponibile în diferite forme și mărimi, adaptate pentru diverse exerciții.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu înotul?",
        answer:
          "Copiii pot începe să se familiarizeze cu apa de la vârsta de 4-5 ani, când au suficientă coordonare și capacitate de a urmări instrucțiuni. Multe cluburi oferă programe speciale pentru începători care se concentrează pe familiarizare și siguranță în apă, mai degrabă decât pe tehnici avansate.",
      },
      {
        question: "Este sigur să învețe copilul înotul dacă are frică de apă?",
        answer:
          "Da, absolut! Multe copii au o oarecare frică de apă la început, iar antrenorii calificați sunt pregătiți să lucreze cu astfel de situații. Programele pentru începători se concentrează pe familiarizare graduală și construirea încrederii într-un mediu sigur și suportiv. Este important să fii răbdător și să lași copilul să progreseze în ritmul său.",
      },
      {
        question: "Cât de des sunt antrenamentele de înot?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (4-6 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 30-45 minute. Copiii mai mari (7-10 ani) pot avea 2-3 antrenamente pe săptămână de 45-60 minute, iar adolescenții pot avea antrenamente zilnice sau aproape zilnice în perioadele de competiție.",
      },
      {
        question: "Este necesar ca copilul să știe deja să înoate?",
        answer:
          "Nu, absolut nu! Majoritatea cluburilor oferă programe pentru începători complete care nu presupun experiență anterioară. Antrenorii sunt pregătiți să lucreze cu copiii de toate nivelurile, de la cei care au frică de apă până la cei care doresc să perfecționeze tehnica. Important este ca copilul să fie dornic să învețe și să aibă suportul familiei.",
      },
      {
        question: "Ce stiluri de înot învață copiii?",
        answer:
          "Copiii încep de obicei cu stilul liber (crawl) și spatele, care sunt cele mai simple și naturale. Apoi progresează către bras și, eventual, fluture pentru cei mai avansați. Ordinea și viteza de progres depind de fiecare copil individual și de programul clubului. Toate stilurile sunt învățate progresiv, cu accent pe tehnica corectă.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=inot",
      clubsLinkText: "Vezi cluburi de înot verificate",
    },
  },
  {
    sportId: "tenis",
    introduction: `Tenisul este un sport elegant și complet care combină abilități fizice, mentale și strategice, fiind ideal pentru dezvoltarea armonioasă a copiilor. În România, tradiția tenisului este puternică, cu mulți jucători de top la nivel internațional, ceea ce face acest sport foarte popular și accesibil pentru copii.

Pentru copiii mici, tenisul începe cu jocuri distractive și exerciții de bază care se concentrează pe coordonarea ochi-mână, echilibrul și familiarizarea cu racheta și mingea. Programele pentru începători folosesc adesea mingi mai mari și mai ușoare, rachete mai mici și terenuri reduse, adaptate pentru vârsta și înălțimea copiilor.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnica corectă de lovire, poziționare, strategie de joc și regulile oficiale. Tenisul poate fi practicat atât individual, cât și în dublu, oferind oportunități excelente pentru dezvoltarea atât a abilităților individuale, cât și a spiritului de echipă.

Cluburile verificate de Yuvoo oferă programe adaptate pentru toate nivelurile, de la începători absoluți până la jucători avansați care doresc să participe la competiții. Antrenorii calificați asigură că fiecare copil primește atenția necesară pentru a progresa într-un mediu pozitiv și încurajator.`,
    benefits: {
      title: "Beneficii ale tenisului pentru copii",
      items: [
        {
          title: "Dezvoltare fizică completă",
          description:
            "Tenisul dezvoltă toate grupurile musculare, îmbunătățește coordonarea, agilitatea, viteza de reacție și rezistența. Este un sport excelent pentru dezvoltarea cardiovasculară și musculară armonioasă.",
        },
        {
          title: "Coordonare ochi-mână",
          description:
            "Tenisul este unul dintre cele mai eficiente sporturi pentru dezvoltarea coordonării ochi-mână, o abilitate valoroasă atât în sport, cât și în viața de zi cu zi și în alte activități.",
        },
        {
          title: "Concentrare și disciplină mentală",
          description:
            "Tenisul necesită concentrare intensă, luarea rapidă a deciziilor și controlul emoțiilor sub presiune. Aceste abilități mentale sunt esențiale pentru succes atât pe teren, cât și în viață.",
        },
        {
          title: "Strategie și rezolvarea problemelor",
          description:
            "Tenisul este un sport strategic care necesită planificare, anticipare și adaptare la situații în schimbare. Copiii învață să gândească strategic și să rezolve probleme în timp real.",
        },
        {
          title: "Responsabilitate individuală",
          description:
            "În tenis, fiecare jucător este responsabil pentru propriile acțiuni și rezultate. Acest lucru învață copiii responsabilitate, perseverență și importanța efortului individual.",
        },
        {
          title: "Socializare și respect",
          description:
            "Tenisul învață respectul față de adversar, fair play-ul și eticheta sportului. Chiar și în competiție, tenisul promovează respectul și prietenia între jucători.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru tenis",
      content: `Tenisul poate fi început de copiii de 4-5 ani, când au dezvoltat suficientă coordonare de bază și capacitate de a ține și manipula o rachetă. La această vârstă, programele se concentrează pe jocuri distractive, exerciții de bază și familiarizarea cu mingea și racheta, folosind echipament adaptat (mingi mai mari, rachete mai mici, terenuri reduse).

Pentru copiii de 6-8 ani, antrenamentele introduc tehnica de bază de lovire, poziționare și regulile simplificate. La această vârstă, copiii încep să înțeleagă conceptele de bază ale jocului și pot participa la jocuri mici și competiții de nivel începător.

Copiii de 9-11 ani pot învăța toate loviturile de bază (serviciu, forehand, backhand, volee) și pot începe să participe la competiții organizate. La această vârstă, tehnica devine mai importantă și antrenamentele devin mai structurate.

Adolescenții de 12-14 ani pot participa la competiții mai serioase și pot începe să se specializeze în anumite aspecte ale jocului. Antrenamentele includ pregătire fizică intensivă, perfecționarea tehnicii și dezvoltarea strategiei de joc.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru tenis",
      content: `Echipamentul de bază pentru tenis include racheta, mingile și îmbrăcămintea adecvată. Pentru începători, este important să alegi echipament adaptat vârstei și nivelului copilului, pentru a facilita învățarea și a preveni accidentele.

Rachetele pentru copii sunt disponibile în diferite mărimi, adaptate înălțimii și forței copilului. Este important să alegi o rachetă potrivită, deoarece o rachetă prea mare sau prea grea poate cauza probleme de tehnica și poate crește riscul de accidentări.

Mingile de tenis pentru copii sunt disponibile în diferite tipuri: mingi mai mari și mai ușoare pentru începători, care fac jocul mai accesibil și mai distractiv. Pe măsură ce copilul progresează, poate trece la mingi standard.`,
      items: [
        {
          name: "Rachetă de tenis",
          description:
            "Racheta trebuie să fie potrivită pentru înălțimea și forța copilului. Pentru copiii mici (4-6 ani), rachetele sunt mai scurte (19-21 inch). Pentru copiii mai mari (7-10 ani), rachetele sunt de 23-25 inch, iar pentru adolescenți, rachetele standard de 27 inch. Alege o rachetă ușoară cu un grip confortabil.",
          essential: true,
        },
        {
          name: "Mingi de tenis",
          description:
            "Pentru începători, mingile mai mari și mai ușoare (red, orange, green) fac jocul mai accesibil. Pe măsură ce copilul progresează, poate trece la mingi standard. Alege mingi de calitate care mențin presiunea și au durabilitate bună.",
          essential: true,
        },
        {
          name: "Încălțări de tenis",
          description:
            "Ghetele de tenis sunt esențiale pentru siguranță și performanță. Trebuie să ofere suport bun pentru glezne, aderență pe teren și amortizare pentru salturi și schimbări de direcție. Alege ghete potrivite pentru tipul de teren (zgură, dur, iarbă).",
          essential: true,
        },
        {
          name: "Îmbrăcăminte sport",
          description:
            "Îmbrăcămintea trebuie să fie confortabilă, să permită libertate de mișcare și să fie din materiale care absorb transpirația. Pentru competiții, multe cluburi au cerințe specifice privind culorile sau stilul.",
          essential: true,
        },
        {
          name: "Bandă pentru mână",
          description:
            "Banda pentru mână ajută la absorbția transpirației și previne alunecarea rachetei. Este utilă, mai ales în timpul verii sau pentru copiii care transpiră mult.",
          essential: false,
        },
        {
          name: "Accesorii (overgrip, stringer)",
          description:
            "Overgrip-urile pot fi schimbate frecvent pentru a menține racheta curată și confortabilă. Un stringer poate fi util pentru a menține tensiunea corectă a corzilor rachetei, dar nu este esențial pentru începători.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu tenisul?",
        answer:
          "Tenisul poate fi început de copiii de 4-5 ani, când au dezvoltat suficientă coordonare de bază. Multe cluburi oferă programe speciale pentru copiii mici care folosesc echipament adaptat (mingi mai mari, rachete mai mici, terenuri reduse) și se concentrează pe jocuri distractive și familiarizare cu sportul.",
      },
      {
        question: "Cât costă echipamentul de bază pentru tenis?",
        answer:
          "Echipamentul de bază (rachetă, mingi, ghete, îmbrăcăminte) poate costa între 300-600 RON pentru un set complet de calitate pentru începători. Rachetele pentru copiii mici sunt de obicei mai ieftine, iar pe măsură ce copilul crește, poate fi necesar să investești în echipament mai avansat. Multe cluburi oferă și programe de închiriere echipament pentru începători.",
      },
      {
        question: "Cât de des sunt antrenamentele de tenis?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (4-6 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 30-45 minute. Copiii mai mari (7-10 ani) pot avea 2-3 antrenamente pe săptămână de 45-60 minute, iar adolescenții pot avea antrenamente zilnice sau aproape zilnice în perioadele de competiție.",
      },
      {
        question: "Este necesar să am teren de tenis acasă?",
        answer:
          "Nu, absolut nu! Cluburile oferă acces la terenuri de tenis pentru antrenamente și jocuri. Multe cluburi au mai multe terenuri și programe de rezervare. Pentru antrenamente acasă, poți folosi un perete sau un spațiu deschis pentru exerciții de bază, dar terenurile clubului sunt esențiale pentru progresul real.",
      },
      {
        question: "Copilul meu poate juca tenis dacă nu are experiență anterioară?",
        answer:
          "Absolut! Majoritatea cluburilor oferă programe pentru începători complete care nu presupun experiență anterioară. Antrenorii sunt pregătiți să lucreze cu copiii de toate nivelurile și să-i învețe fundamentalele de la zero. Important este ca copilul să fie entuziasmat și dornic să învețe.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=tenis",
      clubsLinkText: "Vezi cluburi de tenis verificate",
    },
  },
  {
    sportId: "baschet",
    introduction: `Baschetul este unul dintre cele mai dinamice și captivante sporturi de echipă, oferind o combinație perfectă între abilități fizice, strategie și spirit de echipă. În România, baschetul are o tradiție puternică și este unul dintre cele mai populare sporturi pentru copii, oferind oportunități excelente pentru dezvoltare fizică și socială.

Pentru copiii mici, baschetul începe cu jocuri distractive și exerciții de bază care se concentrează pe dribling, pase și aruncări la coș. Programele pentru începători folosesc adesea coșuri mai joase și mingi mai mici, adaptate pentru vârsta și înălțimea copiilor, facilitând învățarea și creând un mediu pozitiv.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnica corectă de aruncare, dribling avansat, pase, strategii de atac și apărare, precum și regulile oficiale ale jocului. Baschetul dezvoltă nu doar abilități fizice, ci și gândirea strategică, comunicarea în echipă și capacitatea de a lua decizii rapide sub presiune.

Cluburile verificate de Yuvoo oferă programe adaptate pentru toate nivelurile, de la începători absoluți până la jucători avansați care doresc să participe la competiții. Antrenorii calificați asigură că fiecare copil primește atenția necesară pentru a progresa într-un mediu sigur, pozitiv și încurajator, unde se promovează atât dezvoltarea individuală, cât și spiritul de echipă.`,
    benefits: {
      title: "Beneficii ale baschetului pentru copii",
      items: [
        {
          title: "Dezvoltare fizică completă",
          description:
            "Baschetul dezvoltă toate grupurile musculare, îmbunătățește coordonarea, agilitatea, viteza, rezistența și forța. Salturile și mișcările rapide dezvoltă puterea musculară și capacitatea cardiovasculară.",
        },
        {
          title: "Înălțime și coordonare",
          description:
            "Baschetul stimulează creșterea și dezvoltarea oaselor prin salturi și mișcări verticale. Coordonarea ochi-mână este esențială pentru aruncări și pase, iar coordonarea generală se îmbunătățește semnificativ.",
        },
        {
          title: "Spirit de echipă și comunicare",
          description:
            "Baschetul este un sport de echipă care necesită comunicare constantă, cooperare și încredere între jucători. Copiii învață valoarea lucrului în echipă și importanța fiecărui membru al echipei.",
        },
        {
          title: "Gândire strategică și rapidă",
          description:
            "Baschetul necesită luarea rapidă a deciziilor, anticiparea mișcărilor adversarului și adaptarea la situații în schimbare. Aceste abilități cognitive sunt valoroase atât pe teren, cât și în viața de zi cu zi.",
        },
        {
          title: "Disciplină și perseverență",
          description:
            "Antrenamentele regulate și respectarea regulilor jocului dezvoltă disciplina și capacitatea de a lucra pentru obiective pe termen lung. Baschetul învață copiii valoarea practicii constante și a efortului pentru îmbunătățire.",
        },
        {
          title: "Încredere în sine și reziliență",
          description:
            "Realizările pe teren, fie că sunt coșuri marcate sau pase bune, construiesc încrederea în sine. Baschetul învață și reziliența, deoarece jocul are multe momente de succes și eșec, învățând copiii să se ridice după greșeli.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru baschet",
      content: `Baschetul poate fi început de copiii de 6-7 ani, când au dezvoltat suficientă coordonare și capacitate de a manipula o minge de baschet. La această vârstă, programele se concentrează pe jocuri distractive, exerciții de bază și familiarizarea cu mingea și coșul, folosind echipament adaptat (coșuri mai joase, mingi mai mici).

Pentru copiii de 8-10 ani, antrenamentele introduc tehnica de bază de aruncare, dribling, pase și regulile simplificate. La această vârstă, copiii încep să înțeleagă conceptele de bază ale jocului și pot participa la jocuri mici și competiții de nivel începător.

Copiii de 11-12 ani pot învăța toate tehnicile de bază și pot începe să participe la competiții organizate. La această vârstă, strategia devine mai importantă și antrenamentele devin mai structurate, introducându-se concepte de atac și apărare.

Adolescenții de 13-14 ani pot participa la competiții mai serioase și pot începe să se specializeze în anumite poziții pe teren. Antrenamentele includ pregătire fizică intensivă, perfecționarea tehnicii și dezvoltarea strategiei de echipă.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru baschet",
      content: `Echipamentul de bază pentru baschet este relativ simplu și accesibil. Cel mai important este să alegi echipament de calitate care să ofere confort și siguranță, adaptat vârstei și nivelului copilului.

Pentru început, este suficient să ai o minge de baschet și îmbrăcăminte sport adecvată. Pe măsură ce copilul progresează și participă la antrenamente mai frecvente, poți investi în echipament suplimentar precum ghete specializate pentru baschet, protecții și accesorii pentru antrenament acasă.

Este important să verifici cerințele specifice ale clubului sau ligii în care participă copilul tău, deoarece unele pot avea cerințe specifice privind echipamentul sau culorile. Multe cluburi oferă și pachete de echipament pentru membri.`,
      items: [
        {
          name: "Minge de baschet",
          description:
            "Mingea trebuie să fie potrivită pentru vârsta și mărimea copilului. Pentru copiii mici (6-8 ani), mingile sunt mai mici (mărimea 5). Pentru copiii mai mari (9-12 ani), mingile sunt de mărimea 6, iar pentru adolescenți, mingile standard de mărimea 7. Alege o minge de calitate cu aderență bună.",
          essential: true,
        },
        {
          name: "Ghete de baschet",
          description:
            "Ghetele specializate pentru baschet sunt esențiale pentru siguranță și performanță. Trebuie să ofere suport excelent pentru glezne, aderență bună pe podea și amortizare pentru salturi și schimbări de direcție. Alege ghete potrivite pentru mărimea piciorului copilului.",
          essential: true,
        },
        {
          name: "Îmbrăcăminte sport",
          description:
            "Îmbrăcămintea trebuie să fie confortabilă, să permită libertate de mișcare și să fie din materiale care absorb transpirația. Pentru competiții, multe cluburi au cerințe specifice privind culorile sau stilul (tricou, șorturi).",
          essential: true,
        },
        {
          name: "Protecții pentru genunchi",
          description:
            "Protecțiile pentru genunchi sunt recomandate, mai ales pentru copiii care participă la antrenamente intense sau competiții. Protejează genunchii în cazul căderilor sau contactului accidental.",
          essential: false,
        },
        {
          name: "Bandă pentru mână",
          description:
            "Banda pentru mână ajută la absorbția transpirației și previne alunecarea mingii. Este utilă, mai ales în timpul antrenamentelor intense sau pentru copiii care transpiră mult.",
          essential: false,
        },
        {
          name: "Coș de baschet portabil",
          description:
            "Un coș portabil poate fi util pentru antrenamente acasă, dar nu este esențial. Cluburile oferă acces la coșuri profesionale pentru antrenamente. Dacă alegi să investești într-un coș acasă, asigură-te că este reglabil la înălțimi diferite.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu baschetul?",
        answer:
          "Baschetul poate fi început de copiii de 6-7 ani, când au dezvoltat suficientă coordonare și capacitate de a manipula o minge de baschet. Multe cluburi oferă programe speciale pentru copiii mici care folosesc echipament adaptat (coșuri mai joase, mingi mai mici) și se concentrează pe jocuri distractive și familiarizare cu sportul.",
      },
      {
        question: "Copilul meu trebuie să fie înalt pentru a juca baschet?",
        answer:
          "Nu, absolut nu! Deși înălțimea poate fi un avantaj în baschet, nu este un criteriu esențial, mai ales pentru copiii mici. Baschetul dezvoltă abilități valoroase pentru toți copiii, indiferent de înălțime. Mulți jucători de baschet de succes nu sunt foarte înalți, dar au abilități excelente de coordonare, viteză și strategie.",
      },
      {
        question: "Cât de des sunt antrenamentele de baschet?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (6-8 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 45-60 minute. Copiii mai mari (9-12 ani) pot avea 2-3 antrenamente pe săptămână de 60-90 minute, iar adolescenții pot avea antrenamente zilnice sau aproape zilnice în perioadele de competiție.",
      },
      {
        question: "Este baschetul sigur pentru copii?",
        answer:
          "Da, baschetul este un sport sigur când este practicat sub supravegherea unui antrenor calificat și cu echipamentul adecvat. Riscu de accidente este redus prin folosirea ghetelor potrivite, respectarea regulilor și antrenamentele progresive. Cluburile verificate de Yuvoo au antrenori calificați care prioritizează siguranța copiilor și adaptează antrenamentele în funcție de vârstă și nivel.",
      },
      {
        question: "Copilul meu poate juca baschet dacă nu are experiență anterioară?",
        answer:
          "Absolut! Majoritatea cluburilor oferă programe pentru începători complete care nu presupun experiență anterioară. Antrenorii sunt pregătiți să lucreze cu copiii de toate nivelurile și să-i învețe fundamentalele de la zero. Important este ca copilul să fie entuziasmat și dornic să învețe.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=baschet",
      clubsLinkText: "Vezi cluburi de baschet verificate",
    },
  },
  {
    sportId: "gimnastica-artistica",
    introduction: `Gimnastica artistică este unul dintre cele mai complete și elegante sporturi pentru copii, combinând forță, flexibilitate, coordonare și grație într-o armonie perfectă. În România, gimnastica artistică are o tradiție excepțională, cu mulți campioni olimpici și mondiali, ceea ce face acest sport foarte respectat și accesibil pentru copii.

Pentru copiii mici, gimnastica artistică începe cu jocuri distractive și exerciții de bază care se concentrează pe dezvoltarea flexibilității, echilibrului, coordonării și încredere în propriile abilități. Programele pentru începători se concentrează pe elemente fundamentale precum rotații, salturi, echilibru și mișcări de bază pe diferite aparate.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se elemente mai complexe pe aparatele specifice: sol, paralele, bârnă (pentru fete), inele, bară fixă (pentru băieți). Gimnastica artistică dezvoltă nu doar abilități fizice excepționale, ci și disciplina mentală, concentrarea, perseverența și încrederea în sine.

Cluburile verificate de Yuvoo oferă programe adaptate pentru toate nivelurile, de la începători absoluți până la gimnaști avansați care doresc să participe la competiții. Antrenorii calificați asigură că fiecare copil primește atenția necesară pentru a progresa într-un mediu sigur, structurat și încurajator, unde se promovează atât dezvoltarea tehnică, cât și buna formă fizică și disciplina.`,
    benefits: {
      title: "Beneficii ale gimnasticii artistice pentru copii",
      items: [
        {
          title: "Dezvoltare fizică completă",
          description:
            "Gimnastica artistică dezvoltă toate grupurile musculare, flexibilitatea, forța, coordonarea, echilibrul și agilitatea. Este unul dintre cele mai complete sporturi pentru dezvoltarea fizică armonioasă.",
        },
        {
          title: "Flexibilitate și grație",
          description:
            "Gimnastica artistică dezvoltă flexibilitatea excepțională și grația mișcării, abilități care sunt valoroase atât în sport, cât și în viața de zi cu zi. Flexibilitatea ajută la prevenirea accidentărilor și la menținerea sănătății articulațiilor.",
        },
        {
          title: "Disciplină și concentrare",
          description:
            "Gimnastica artistică necesită disciplină strictă, concentrare intensă și respect pentru reguli și structură. Aceste abilități mentale sunt esențiale pentru succes atât în sport, cât și în viață.",
        },
        {
          title: "Încredere în sine și curaj",
          description:
            "Realizarea elementelor complexe și performanța pe aparate construiește încrederea în sine și curajul. Gimnastica artistică învață copiii să-și depășească limitele și să-și construiască încrederea prin realizări progresive.",
        },
        {
          title: "Coordonare și control corporal",
          description:
            "Gimnastica artistică dezvoltă coordonarea excepțională și controlul precis al corpului. Aceste abilități sunt valoroase pentru alte sporturi și activități, precum și pentru viața de zi cu zi.",
        },
        {
          title: "Perseverență și determinare",
          description:
            "Învățarea elementelor complexe necesită practică constantă și perseverență. Gimnastica artistică învață copiii valoarea efortului susținut și a determinării pentru a atinge obiectivele.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru gimnastică artistică",
      content: `Gimnastica artistică poate fi începută de copiii de 4-5 ani, când au dezvoltat suficientă coordonare de bază și capacitate de a urmări instrucțiuni. La această vârstă, programele se concentrează pe jocuri distractive, exerciții de bază și familiarizarea cu aparatele, folosind echipament adaptat și supraveghere intensă.

Pentru copiii de 6-8 ani, antrenamentele introduc elemente de bază pe toate aparatele și se concentrează pe dezvoltarea flexibilității, forței și coordonării. La această vârstă, copiii încep să înțeleagă conceptele de bază ale gimnasticii și pot participa la competiții de nivel începător.

Copiii de 9-11 ani pot învăța elemente mai complexe și pot începe să se specializeze în anumite aparate. La această vârstă, tehnica devine mai importantă și antrenamentele devin mai structurate, introducându-se elemente de competiție.

Adolescenții de 12-14 ani pot participa la competiții mai serioase și pot începe să perfecționeze elemente avansate. Antrenamentele includ pregătire fizică intensivă, perfecționarea tehnicii și dezvoltarea coregrafiilor pentru competiții.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru gimnastică artistică",
      content: `Echipamentul de bază pentru gimnastică artistică este relativ simplu, deoarece majoritatea aparatelor sunt furnizate de club. Cel mai important este să alegi echipament de calitate care să ofere confort și siguranță, adaptat vârstei și nivelului copilului.

Pentru început, este suficient să ai leotardul sau costumul de antrenament și eventual niște accesorii de bază. Pe măsură ce copilul progresează și participă la competiții, poate fi necesar să investești în echipament suplimentar precum leotarde de competiție, bandaje și accesorii pentru păr.

Este important să verifici cerințele specifice ale clubului, deoarece unele pot avea cerințe specifice privind echipamentul sau culorile. Multe cluburi oferă și pachete de echipament pentru membri.`,
      items: [
        {
          name: "Leotard sau costum de antrenament",
          description:
            "Leotardul este esențial pentru gimnastică artistică, oferind libertate de mișcare și siguranță pe aparate. Trebuie să fie bine potrivit, confortabil și din materiale care permit mișcarea liberă. Pentru fete, leotardele sunt standard, iar pentru băieți, tricouri și pantaloni scurți potrivite.",
          essential: true,
        },
        {
          name: "Bandaje pentru încheieturi",
          description:
            "Bandajele pentru încheieturi oferă suport și protecție pentru încheieturile mâinilor, care sunt supuse la presiune intensă în gimnastică. Sunt recomandate, mai ales pentru copiii care participă la antrenamente intense sau competiții.",
          essential: false,
        },
        {
          name: "Magnesiu sau cretă",
          description:
            "Magnesiul sau creta ajută la absorbția transpirației și previne alunecarea pe aparate. Este esențial pentru siguranță și performanță, mai ales pe aparate precum paralele, bară fixă și inele.",
          essential: true,
        },
        {
          name: "Accesorii pentru păr",
          description:
            "Pentru fete, accesoriile pentru păr (elastice, agrafe) sunt necesare pentru a menține părul strâns și sigur în timpul antrenamentelor și competițiilor. Părul trebuie să fie întotdeauna strâns pentru siguranță.",
          essential: true,
        },
        {
          name: "Ghete de gimnastică",
          description:
            "Ghetele de gimnastică sunt opționale, deoarece mulți gimnaști antrenează desculți. Cu toate acestea, pentru începători sau pentru protecție suplimentară, ghetele de gimnastică pot fi utile. Alege ghete ușoare și flexibile.",
          essential: false,
        },
        {
          name: "Echipament de competiție",
          description:
            "Pentru competiții, poate fi necesar să investești în leotarde de competiție speciale, care respectă regulile și standardele competițiilor. Acestea sunt de obicei mai costisitoare, dar sunt necesare pentru participarea la competiții oficiale.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu gimnastica artistică?",
        answer:
          "Gimnastica artistică poate fi începută de copiii de 4-5 ani, când au dezvoltat suficientă coordonare de bază. Multe cluburi oferă programe speciale pentru copiii mici care se concentrează pe jocuri distractive, exerciții de bază și familiarizare cu aparatele, cu supraveghere intensă și echipament adaptat.",
      },
      {
        question: "Este gimnastica artistică sigură pentru copii?",
        answer:
          "Da, gimnastica artistică este un sport sigur când este practicată sub supravegherea unui antrenor calificat și cu echipamentul adecvat. Cluburile verificate de Yuvoo au antrenori calificați care prioritizează siguranța copiilor, folosesc echipament de siguranță (colțuri, saltele) și adaptează antrenamentele în funcție de vârstă și nivel. Riscu de accidente este redus prin respectarea regulilor și antrenamentele progresive.",
      },
      {
        question: "Cât de des sunt antrenamentele de gimnastică artistică?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (4-6 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 45-60 minute. Copiii mai mari (7-10 ani) pot avea 2-3 antrenamente pe săptămână de 60-90 minute, iar adolescenții care participă la competiții pot avea antrenamente zilnice sau aproape zilnice, de 2-3 ore fiecare.",
      },
      {
        question: "Copilul meu trebuie să fie flexibil pentru a începe gimnastica artistică?",
        answer:
          "Nu, absolut nu! Flexibilitatea se dezvoltă prin practică constantă. Mulți copiii care încep gimnastica artistică nu sunt deosebit de flexibili la început, dar devin flexibili prin antrenamente regulate. Antrenorii sunt pregătiți să lucreze cu copiii de toate nivelurile de flexibilitate și să-i ajute să-și îmbunătățească abilitățile progresiv.",
      },
      {
        question: "Cât costă echipamentul de bază pentru gimnastică artistică?",
        answer:
          "Echipamentul de bază (leotard, magnesiu, accesorii pentru păr) poate costa între 150-300 RON pentru un set complet de calitate. Leotardele de competiție pot fi mai costisitoare (200-500 RON), dar nu sunt necesare pentru începători. Multe cluburi oferă și pachete de echipament pentru membri la prețuri reduse.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=gimnastica-artistica",
      clubsLinkText: "Vezi cluburi de gimnastică artistică verificate",
    },
  },
  {
    sportId: "karate",
    introduction: `Karate-ul este o artă marțială tradițională japoneză care combină tehnici de autoapărare cu dezvoltarea fizică, mentală și spirituală. În România, karate-ul este unul dintre cele mai populare sporturi de luptă pentru copii, oferind o abordare disciplinată și structurată a dezvoltării copiilor.

Pentru copiii mici, karate-ul începe cu jocuri distractive și exerciții de bază care se concentrează pe coordonare, echilibru, respect și disciplina. Programele pentru începători se concentrează pe poziții de bază, mișcări fundamentale și învățarea valorilor esențiale ale karate-ului: respect, disciplină, perseverență și autocontrol.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnici de bază (kihon), forme (kata) și eventual sparring controlat (kumite). Karate-ul dezvoltă nu doar abilități fizice, ci și disciplina mentală, respectul, autocontrolul și încrederea în sine.

Cluburile verificate de Yuvoo oferă programe adaptate pentru toate nivelurile, de la începători absoluți până la practicanți avansați care doresc să obțină benzi și să participe la competiții. Antrenorii calificați (sensei) asigură că fiecare copil primește atenția necesară pentru a progresa într-un mediu sigur, respectuos și disciplinat, unde se promovează atât dezvoltarea tehnică, cât și valorile esențiale ale karate-ului.`,
    benefits: {
      title: "Beneficii ale karate-ului pentru copii",
      items: [
        {
          title: "Dezvoltare fizică completă",
          description:
            "Karate-ul dezvoltă toate grupurile musculare, flexibilitatea, forța, coordonarea, echilibrul, viteza și rezistența. Antrenamentele includ exerciții cardiovasculare și de forță care contribuie la o formă fizică excelentă.",
        },
        {
          title: "Disciplină și respect",
          description:
            "Karate-ul este fundamentat pe discipline strictă și respect profund pentru antrenor, colegi și artă marțială. Aceste valori sunt esențiale pentru dezvoltarea caracterului și pentru viața de zi cu zi.",
        },
        {
          title: "Autoapărare",
          description:
            "Karate-ul oferă copiilor abilități esențiale de autoapărare, dar mai important, învață când și cum să folosească aceste abilități responsabil. Karate-ul promovează evitarea conflictelor și folosirea tehnicilor doar în situații de necesitate.",
        },
        {
          title: "Încredere în sine și autocontrol",
          description:
            "Realizarea tehnicilor complexe și progresarea prin benzi construiește încrederea în sine. Karate-ul învață și autocontrolul, deoarece puterea trebuie să fie întotdeauna controlată și folosită responsabil.",
        },
        {
          title: "Concentrare și disciplină mentală",
          description:
            "Karate-ul necesită concentrare intensă, memorarea formelor complexe și respectarea strictă a regulilor. Aceste abilități mentale sunt valoroase atât în sport, cât și în viața de zi cu zi, mai ales în școală.",
        },
        {
          title: "Perseverență și determinare",
          description:
            "Progresarea prin benzi și învățarea tehnicilor complexe necesită practică constantă și perseverență. Karate-ul învață copiii valoarea efortului susținut și a determinării pentru a atinge obiectivele.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru karate",
      content: `Karate-ul poate fi început de copiii de 5-6 ani, când au dezvoltat suficientă coordonare de bază și capacitate de a urmări instrucțiuni și de a respecta regulile. La această vârstă, programele se concentrează pe jocuri distractive, exerciții de bază și familiarizarea cu valorile karate-ului, fără contact sau tehnici avansate.

Pentru copiii de 7-9 ani, antrenamentele introduc tehnici de bază, poziții fundamentale și forme simple (kata). La această vârstă, copiii încep să înțeleagă conceptele de bază ale karate-ului și pot începe să progreseze prin benzi (kyu), participând la examene formale.

Copiii de 10-12 ani pot învăța tehnici mai complexe și pot începe să participe la sparring controlat (kumite) și competiții. La această vârstă, disciplina devine mai importantă și antrenamentele devin mai structurate, introducându-se concepte de strategie și aplicare practică.

Adolescenții de 13-14 ani pot participa la competiții mai serioase și pot începe să obțină benzi superioare. Antrenamentele includ pregătire fizică intensivă, perfecționarea tehnicilor și dezvoltarea strategiei de competiție.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru karate",
      content: `Echipamentul de bază pentru karate este relativ simplu și accesibil. Cel mai important este să alegi echipament de calitate care să ofere confort și siguranță, adaptat vârstei și nivelului copilului.

Pentru început, este suficient să ai kimono-ul (gi) de karate. Pe măsură ce copilul progresează și participă la antrenamente mai frecvente sau competiții, poate fi necesar să investești în echipament suplimentar precum protecții pentru sparring, centuri suplimentare și accesorii.

Este important să verifici cerințele specifice ale clubului, deoarece unele pot avea cerințe specifice privind echipamentul, culorile sau stilul kimono-ului. Multe cluburi oferă și pachete de echipament pentru membri.`,
      items: [
        {
          name: "Kimono de karate (gi)",
          description:
            "Kimono-ul este esențial pentru karate, oferind libertate de mișcare și respectarea tradiției. Trebuie să fie bine potrivit, confortabil și din materiale rezistente. Pentru copiii mici, kimono-urile sunt disponibile în mărimi adaptate. Culoarea este de obicei albă pentru începători.",
          essential: true,
        },
        {
          name: "Centură (obi)",
          description:
            "Centura indică nivelul (kyu sau dan) al practicantului. Pentru începători, centura este de obicei albă, iar pe măsură ce progresează, obțin centuri de culori diferite (galben, portocaliu, verde, albastru, maro) înainte de centura neagră. Centura vine de obicei cu kimono-ul sau poate fi cumpărată separat.",
          essential: true,
        },
        {
          name: "Protecții pentru sparring",
          description:
            "Pentru sparring (kumite), sunt necesare protecții pentru siguranță: mănuși, protecții pentru picioare, protecție pentru piept și eventual cască. Acestea sunt esențiale pentru prevenirea accidentărilor în timpul sparring-ului controlat.",
          essential: false,
        },
        {
          name: "Ghete de antrenament",
          description:
            "Ghetele de antrenament sunt opționale, deoarece mulți practicanți antrenează desculți. Cu toate acestea, pentru protecție suplimentară sau pentru antrenamente în afara sălii, ghetele de antrenament pot fi utile. Alege ghete ușoare și flexibile.",
          essential: false,
        },
        {
          name: "Echipament de competiție",
          description:
            "Pentru competiții, poate fi necesar să investești în echipament suplimentar sau în kimono-uri de calitate superioară care respectă regulile competițiilor. Acestea sunt de obicei mai costisitoare, dar sunt necesare pentru participarea la competiții oficiale.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu karate-ul?",
        answer:
          "Karate-ul poate fi început de copiii de 5-6 ani, când au dezvoltat suficientă coordonare de bază și capacitate de a urmări instrucțiuni și de a respecta regulile. Multe cluburi oferă programe speciale pentru copiii mici care se concentrează pe jocuri distractive, exerciții de bază și familiarizarea cu valorile karate-ului, fără contact sau tehnici avansate.",
      },
      {
        question: "Este karate-ul violent sau periculos pentru copii?",
        answer:
          "Nu, absolut nu! Karate-ul pentru copii este foarte sigur și se concentrează pe dezvoltare fizică, disciplină și respect, nu pe violență. Contactul este controlat strict și permis doar în sparring-uri supervizate pentru copiii mai mari. Karate-ul promovează evitarea conflictelor și folosirea responsabilă a tehnicilor. Cluburile verificate de Yuvoo au antrenori calificați care prioritizează siguranța și adaptează antrenamentele în funcție de vârstă și nivel.",
      },
      {
        question: "Cât de des sunt antrenamentele de karate?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (5-7 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 45-60 minute. Copiii mai mari (8-10 ani) pot avea 2-3 antrenamente pe săptămână de 60-90 minute, iar adolescenții pot avea antrenamente zilnice sau aproape zilnice, de 90-120 minute fiecare.",
      },
      {
        question: "Ce înseamnă benzi în karate?",
        answer:
          "Benzi (kyu pentru începători, dan pentru avansați) indică nivelul de competență al practicantului. Pentru începători, centura este albă, iar pe măsură ce progresează, obțin centuri de culori diferite (galben, portocaliu, verde, albastru, maro) înainte de centura neagră. Progresarea prin benzi se face prin examene formale care testează tehnica, cunoștințele și valorile karate-ului.",
      },
      {
        question: "Cât costă echipamentul de bază pentru karate?",
        answer:
          "Echipamentul de bază (kimono, centură) poate costa între 200-400 RON pentru un set complet de calitate. Kimono-urile pentru copiii mici sunt de obicei mai ieftine. Protecțiile pentru sparring pot costa în plus 150-300 RON, dar nu sunt necesare pentru începători. Multe cluburi oferă și pachete de echipament pentru membri la prețuri reduse.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=karate",
      clubsLinkText: "Vezi cluburi de karate verificate",
    },
  },
  {
    sportId: "dans",
    introduction: `Dansul este o formă de artă și expresie care combină mișcarea, muzica și creativitatea într-o experiență completă de dezvoltare pentru copii. În România, dansul are o tradiție bogată, cu multe stiluri disponibile: balet clasic, dans modern, dans contemporan, dans latino și multe altele, fiecare oferind oportunități unice de dezvoltare.

Pentru copiii mici, dansul începe cu jocuri muzicale și exerciții de bază care se concentrează pe coordonare, ritm, echilibru și expresie. Programele pentru începători se concentrează pe familiarizarea cu muzica, mișcările de bază și dezvoltarea creativității și încrederii în sine prin mișcare.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnica corectă pentru stilul ales, coregrafii, expresie artistică și eventual performanțe. Dansul dezvoltă nu doar abilități fizice, ci și creativitatea, expresivitatea, disciplina și încrederea în sine.

Cluburile verificate de Yuvoo oferă programe adaptate pentru toate nivelurile și stilurile, de la începători absoluți până la dansatori avansați care doresc să participe la spectacole și competiții. Antrenorii calificați asigură că fiecare copil primește atenția necesară pentru a progresa într-un mediu pozitiv, creativ și încurajator, unde se promovează atât dezvoltarea tehnică, cât și expresia artistică individuală.`,
    benefits: {
      title: "Beneficii ale dansului pentru copii",
      items: [
        {
          title: "Dezvoltare fizică completă",
          description:
            "Dansul dezvoltă toate grupurile musculare, flexibilitatea, forța, coordonarea, echilibrul, grația și rezistența. Este un sport excelent pentru dezvoltarea fizică armonioasă și menținerea unei forme fizice excelente.",
        },
        {
          title: "Creativitate și expresie artistică",
          description:
            "Dansul oferă copiilor o modalitate de a-și exprima creativitatea și emoțiile prin mișcare. Acest aspect artistic este esențial pentru dezvoltarea emoțională și pentru gândirea creativă.",
        },
        {
          title: "Coordonare și ritm",
          description:
            "Dansul dezvoltă coordonarea excepțională, simțul ritmului și capacitatea de a se mișca în armonie cu muzica. Aceste abilități sunt valoroase atât în dans, cât și în alte activități și în viața de zi cu zi.",
        },
        {
          title: "Încredere în sine și prezentare",
          description:
            "Performanțele pe scenă și realizarea coregrafiilor construiește încrederea în sine și abilitățile de prezentare. Dansul învață copiii să fie confortabili în fața publicului și să-și exprime personalitatea.",
        },
        {
          title: "Disciplină și concentrare",
          description:
            "Dansul necesită disciplină strictă, concentrare intensă și respect pentru structură și coregrafie. Aceste abilități mentale sunt esențiale pentru succes atât în dans, cât și în viață.",
        },
        {
          title: "Socializare și cooperare",
          description:
            "Dansul în echipă sau grup învață copiii valoarea cooperării, sincronizării și lucrului în echipă. Dansul promovează prietenia și respectul între dansatori.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru dans",
      content: `Dansul poate fi început de copiii de 4-5 ani, când au dezvoltat suficientă coordonare de bază și capacitate de a urmări instrucțiuni și de a se mișca în ritm cu muzica. La această vârstă, programele se concentrează pe jocuri muzicale, exerciții de bază și familiarizarea cu diferite stiluri de dans, fără presiune sau cerințe tehnice avansate.

Pentru copiii de 6-8 ani, antrenamentele introduc tehnica de bază pentru stilul ales și se concentrează pe dezvoltarea flexibilității, coordonării și ritmului. La această vârstă, copiii încep să înțeleagă conceptele de bază ale dansului și pot participa la coregrafii simple și performanțe de nivel începător.

Copiii de 9-11 ani pot învăța tehnici mai complexe și pot începe să se specializeze în anumite stiluri de dans. La această vârstă, tehnica devine mai importantă și antrenamentele devin mai structurate, introducându-se coregrafii mai complexe și performanțe.

Adolescenții de 12-14 ani pot participa la performanțe mai serioase și competiții și pot începe să perfecționeze tehnica avansată. Antrenamentele includ pregătire fizică intensivă, perfecționarea tehnicii și dezvoltarea coregrafiilor pentru spectacole și competiții.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru dans",
      content: `Echipamentul de bază pentru dans variază în funcție de stilul de dans ales. Cel mai important este să alegi echipament de calitate care să ofere confort și libertate de mișcare, adaptat vârstei și nivelului copilului.

Pentru început, este suficient să ai îmbrăcămintea de bază pentru stilul ales (leotard pentru balet, îmbrăcăminte flexibilă pentru dans modern, etc.) și eventual încălțămintea specifică. Pe măsură ce copilul progresează și participă la performanțe, poate fi necesar să investești în costume de performanță și accesorii.

Este important să verifici cerințele specifice ale clubului sau stilului de dans, deoarece fiecare stil are cerințe specifice privind echipamentul, culorile sau stilul. Multe cluburi oferă și pachete de echipament pentru membri.`,
      items: [
        {
          name: "Îmbrăcăminte de antrenament",
          description:
            "Îmbrăcămintea trebuie să fie confortabilă, să permită libertate de mișcare și să fie adaptată stilului de dans. Pentru balet, leotardele și fustele sunt standard. Pentru dans modern sau contemporan, îmbrăcămintea flexibilă și confortabilă este esențială.",
          essential: true,
        },
        {
          name: "Încălțăminte de dans",
          description:
            "Încălțămintea variază în funcție de stil: balerine pentru balet, pantofi de dans pentru dans modern sau latino, etc. Trebuie să fie potrivite pentru mărimea piciorului copilului și să ofere suport și confort adecvat.",
          essential: true,
        },
        {
          name: "Accesorii pentru păr",
          description:
            "Pentru performanțe și uneori pentru antrenamente, părul trebuie să fie strâns și organizat. Accesoriile pentru păr (elastice, agrafe, rețele) sunt necesare pentru a menține părul sigur și organizat în timpul dansului.",
          essential: true,
        },
        {
          name: "Costume de performanță",
          description:
            "Pentru performanțe și spectacole, poate fi necesar să investești în costume speciale care respectă tema sau stilul performanței. Acestea sunt de obicei mai costisitoare, dar sunt necesare pentru participarea la spectacole și competiții.",
          essential: false,
        },
        {
          name: "Accesorii de dans",
          description:
            "În funcție de stilul de dans, pot fi necesare accesorii precum eșarfe, panglici, bastoane sau alte obiecte folosite în coregrafii. Acestea sunt de obicei furnizate de club sau pot fi cumpărate separat.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu dansul?",
        answer:
          "Dansul poate fi început de copiii de 4-5 ani, când au dezvoltat suficientă coordonare de bază și capacitate de a urmări instrucțiuni și de a se mișca în ritm cu muzica. Multe cluburi oferă programe speciale pentru copiii mici care se concentrează pe jocuri muzicale, exerciții de bază și familiarizarea cu diferite stiluri de dans, fără presiune sau cerințe tehnice avansate.",
      },
      {
        question: "Ce stiluri de dans sunt disponibile?",
        answer:
          "Multe cluburi oferă o varietate de stiluri de dans: balet clasic, dans modern, dans contemporan, dans latino, dans de societate, dans hip-hop și multe altele. Este recomandat să explori diferite stiluri pentru a găsi cel care se potrivește cel mai bine copilului tău. Multe cluburi oferă și clase de probă pentru a explora diferite stiluri.",
      },
      {
        question: "Cât de des sunt antrenamentele de dans?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (4-6 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 45-60 minute. Copiii mai mari (7-10 ani) pot avea 2-3 antrenamente pe săptămână de 60-90 minute, iar adolescenții care participă la performanțe pot avea antrenamente zilnice sau aproape zilnice, de 90-120 minute fiecare.",
      },
      {
        question: "Copilul meu trebuie să fie flexibil pentru a începe dansul?",
        answer:
          "Nu, absolut nu! Flexibilitatea se dezvoltă prin practică constantă. Mulți copiii care încep dansul nu sunt deosebit de flexibili la început, dar devin flexibili prin antrenamente regulate. Antrenorii sunt pregătiți să lucreze cu copiii de toate nivelurile de flexibilitate și să-i ajute să-și îmbunătățească abilitățile progresiv.",
      },
      {
        question: "Cât costă echipamentul de bază pentru dans?",
        answer:
          "Echipamentul de bază (îmbrăcăminte de antrenament, încălțăminte, accesorii pentru păr) poate costa între 200-400 RON pentru un set complet de calitate, în funcție de stilul de dans. Costumele de performanță pot fi mai costisitoare (300-800 RON), dar nu sunt necesare pentru începători. Multe cluburi oferă și pachete de echipament pentru membri la prețuri reduse.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=dans",
      clubsLinkText: "Vezi cluburi de dans verificate",
    },
  },
  {
    sportId: "volei",
    introduction: `Voleiul este un sport de echipă dinamic și captivant care combină abilități fizice, strategie și spirit de echipă într-un joc rapid și tehnic. În România, voleiul are o tradiție puternică și este unul dintre cele mai populare sporturi de echipă pentru copii, oferind oportunități excelente pentru dezvoltare fizică și socială.

Pentru copiii mici, voleiul începe cu jocuri distractive și exerciții de bază care se concentrează pe recepție, pase și aruncări. Programele pentru începători folosesc adesea mingi mai mari și mai ușoare, rețele mai joase și terenuri reduse, adaptate pentru vârsta și înălțimea copiilor, facilitând învățarea și creând un mediu pozitiv.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnica corectă de serviciu, recepție, setare, atac și blocare, precum și regulile oficiale ale jocului. Voleiul dezvoltă nu doar abilități fizice, ci și gândirea strategică, comunicarea în echipă și capacitatea de a lua decizii rapide sub presiune.

Cluburile verificate de Yuvoo oferă programe adaptate pentru toate nivelurile, de la începători absoluți până la jucători avansați care doresc să participe la competiții. Antrenorii calificați asigură că fiecare copil primește atenția necesară pentru a progresa într-un mediu sigur, pozitiv și încurajator, unde se promovează atât dezvoltarea individuală, cât și spiritul de echipă.`,
    benefits: {
      title: "Beneficii ale voleiului pentru copii",
      items: [
        {
          title: "Dezvoltare fizică completă",
          description:
            "Voleiul dezvoltă toate grupurile musculare, îmbunătățește coordonarea, agilitatea, viteza de reacție, rezistența și forța. Salturile și mișcările rapide dezvoltă puterea musculară și capacitatea cardiovasculară.",
        },
        {
          title: "Reflexe și coordonare",
          description:
            "Voleiul necesită reflexe rapide și coordonare excelentă între ochi, mâini și corp. Aceste abilități se dezvoltă semnificativ prin practică constantă și sunt valoroase pentru alte sporturi și activități.",
        },
        {
          title: "Spirit de echipă și comunicare",
          description:
            "Voleiul este un sport de echipă care necesită comunicare constantă, cooperare și încredere între jucători. Copiii învață valoarea lucrului în echipă și importanța fiecărui membru al echipei.",
        },
        {
          title: "Gândire strategică și rapidă",
          description:
            "Voleiul necesită luarea rapidă a deciziilor, anticiparea mișcărilor adversarului și adaptarea la situații în schimbare. Aceste abilități cognitive sunt valoroase atât pe teren, cât și în viața de zi cu zi.",
        },
        {
          title: "Disciplină și perseverență",
          description:
            "Antrenamentele regulate și respectarea regulilor jocului dezvoltă disciplina și capacitatea de a lucra pentru obiective pe termen lung. Voleiul învață copiii valoarea practicii constante și a efortului pentru îmbunătățire.",
        },
        {
          title: "Încredere în sine și reziliență",
          description:
            "Realizările pe teren, fie că sunt puncte câștigate sau pase bune, construiesc încrederea în sine. Voleiul învață și reziliența, deoarece jocul are multe momente de succes și eșec, învățând copiii să se ridice după greșeli.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru volei",
      content: `Voleiul poate fi început de copiii de 8-9 ani, când au dezvoltat suficientă coordonare, forță și capacitate de a manipula o minge de volei. La această vârstă, programele se concentrează pe jocuri distractive, exerciții de bază și familiarizarea cu mingea și rețeaua, folosind echipament adaptat (mingi mai mari, rețele mai joase, terenuri reduse).

Pentru copiii de 10-11 ani, antrenamentele introduc tehnica de bază de serviciu, recepție, setare și atac, precum și regulile simplificate. La această vârstă, copiii încep să înțeleagă conceptele de bază ale jocului și pot participa la jocuri mici și competiții de nivel începător.

Copiii de 12-13 ani pot învăța toate tehnicile de bază și pot începe să participe la competiții organizate. La această vârstă, strategia devine mai importantă și antrenamentele devin mai structurate, introducându-se concepte de atac și apărare.

Adolescenții de 14 ani pot participa la competiții mai serioase și pot începe să se specializeze în anumite poziții pe teren. Antrenamentele includ pregătire fizică intensivă, perfecționarea tehnicii și dezvoltarea strategiei de echipă.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru volei",
      content: `Echipamentul de bază pentru volei este relativ simplu și accesibil. Cel mai important este să alegi echipament de calitate care să ofere confort și siguranță, adaptat vârstei și nivelului copilului.

Pentru început, este suficient să ai o minge de volei și îmbrăcăminte sport adecvată. Pe măsură ce copilul progresează și participă la antrenamente mai frecvente, poți investi în echipament suplimentar precum ghete specializate pentru volei și protecții.

Este important să verifici cerințele specifice ale clubului sau ligii în care participă copilul tău, deoarece unele pot avea cerințe specifice privind echipamentul sau culorile. Multe cluburi oferă și pachete de echipament pentru membri.`,
      items: [
        {
          name: "Minge de volei",
          description:
            "Mingea trebuie să fie potrivită pentru vârsta și nivelul copilului. Pentru copiii mici (8-10 ani), mingile pot fi mai ușoare și mai mari. Pentru copiii mai mari și adolescenți, mingile standard de volei sunt potrivite. Alege o minge de calitate cu aderență bună și durabilitate.",
          essential: true,
        },
        {
          name: "Ghete de volei",
          description:
            "Ghetele specializate pentru volei sunt esențiale pentru siguranță și performanță. Trebuie să ofere suport excelent pentru glezne, aderență bună pe podea și amortizare pentru salturi și schimbări de direcție. Alege ghete potrivite pentru mărimea piciorului copilului.",
          essential: true,
        },
        {
          name: "Îmbrăcăminte sport",
          description:
            "Îmbrăcămintea trebuie să fie confortabilă, să permită libertate de mișcare și să fie din materiale care absorb transpirația. Pentru competiții, multe cluburi au cerințe specifice privind culorile sau stilul (tricou, șorturi).",
          essential: true,
        },
        {
          name: "Protecții pentru genunchi",
          description:
            "Protecțiile pentru genunchi sunt recomandate, mai ales pentru copiii care participă la antrenamente intense sau competiții. Protejează genunchii în cazul căderilor sau contactului cu podeaua, care sunt frecvente în volei.",
          essential: false,
        },
        {
          name: "Bandă pentru mână",
          description:
            "Banda pentru mână ajută la absorbția transpirației și previne alunecarea mingii. Este utilă, mai ales în timpul antrenamentelor intense sau pentru copiii care transpiră mult.",
          essential: false,
        },
        {
          name: "Protecții pentru degete",
          description:
            "Protecțiile pentru degete pot fi utile pentru prevenirea accidentărilor la degete, care sunt frecvente în volei, mai ales pentru începători. Nu sunt esențiale, dar pot fi utile pentru siguranță suplimentară.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu voleiul?",
        answer:
          "Voleiul poate fi început de copiii de 8-9 ani, când au dezvoltat suficientă coordonare, forță și capacitate de a manipula o minge de volei. Multe cluburi oferă programe speciale pentru copiii mici care folosesc echipament adaptat (mingi mai mari, rețele mai joase, terenuri reduse) și se concentrează pe jocuri distractive și familiarizare cu sportul.",
      },
      {
        question: "Este voleiul sigur pentru copii?",
        answer:
          "Da, voleiul este un sport sigur când este practicat sub supravegherea unui antrenor calificat și cu echipamentul adecvat. Riscu de accidente este redus prin folosirea ghetelor potrivite, protecțiilor (dacă este necesar), respectarea regulilor și antrenamentele progresive. Cluburile verificate de Yuvoo au antrenori calificați care prioritizează siguranța copiilor și adaptează antrenamentele în funcție de vârstă și nivel.",
      },
      {
        question: "Cât de des sunt antrenamentele de volei?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (8-10 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 60-75 minute. Copiii mai mari (11-13 ani) pot avea 2-3 antrenamente pe săptămână de 75-90 minute, iar adolescenții pot avea antrenamente zilnice sau aproape zilnice în perioadele de competiție, de 90-120 minute fiecare.",
      },
      {
        question: "Copilul meu trebuie să fie înalt pentru a juca volei?",
        answer:
          "Nu, absolut nu! Deși înălțimea poate fi un avantaj în volei, nu este un criteriu esențial, mai ales pentru copiii mici. Voleiul dezvoltă abilități valoroase pentru toți copiii, indiferent de înălțime. Mulți jucători de volei de succes nu sunt foarte înalți, dar au abilități excelente de coordonare, viteză și strategie.",
      },
      {
        question: "Copilul meu poate juca volei dacă nu are experiență anterioară?",
        answer:
          "Absolut! Majoritatea cluburilor oferă programe pentru începători complete care nu presupun experiență anterioară. Antrenorii sunt pregătiți să lucreze cu copiii de toate nivelurile și să-i învețe fundamentalele de la zero. Important este ca copilul să fie entuziasmat și dornic să învețe.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=volei",
      clubsLinkText: "Vezi cluburi de volei verificate",
    },
  },
  {
    sportId: "handbal",
    introduction: `Handbalul este un sport de echipă rapid și dinamic care combină abilități fizice, strategie și spirit de echipă într-un joc captivant și tehnic. În România, handbalul are o tradiție excepțională, cu mulți campioni olimpici și mondiali, ceea ce face acest sport foarte respectat și accesibil pentru copii.

Pentru copiii mici, handbalul începe cu jocuri distractive și exerciții de bază care se concentrează pe dribling, pase și aruncări la poartă. Programele pentru începători folosesc adesea mingi mai mici și mai ușoare, porți mai mici și terenuri reduse, adaptate pentru vârsta și înălțimea copiilor, facilitând învățarea și creând un mediu pozitiv.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnica corectă de aruncare, dribling avansat, pase, strategii de atac și apărare, precum și regulile oficiale ale jocului. Handbalul dezvoltă nu doar abilități fizice, ci și gândirea strategică, comunicarea în echipă și capacitatea de a lua decizii rapide sub presiune.

Cluburile verificate de Yuvoo oferă programe adaptate pentru toate nivelurile, de la începători absoluți până la jucători avansați care doresc să participe la competiții. Antrenorii calificați asigură că fiecare copil primește atenția necesară pentru a progresa într-un mediu sigur, pozitiv și încurajator, unde se promovează atât dezvoltarea individuală, cât și spiritul de echipă.`,
    benefits: {
      title: "Beneficii ale handbalului pentru copii",
      items: [
        {
          title: "Dezvoltare fizică completă",
          description:
            "Handbalul dezvoltă toate grupurile musculare, îmbunătățește coordonarea, agilitatea, viteza, rezistența și forța. Mișcările rapide, salturile și aruncările dezvoltă puterea musculară și capacitatea cardiovasculară.",
        },
        {
          title: "Coordonare și agilitate",
          description:
            "Handbalul necesită coordonare excelentă între mâini, picioare și corp, precum și agilitate pentru a evita adversarii și a crea oportunități de atac. Aceste abilități se dezvoltă semnificativ prin practică constantă.",
        },
        {
          title: "Spirit de echipă și comunicare",
          description:
            "Handbalul este un sport de echipă care necesită comunicare constantă, cooperare și încredere între jucători. Copiii învață valoarea lucrului în echipă și importanța fiecărui membru al echipei.",
        },
        {
          title: "Gândire strategică și rapidă",
          description:
            "Handbalul necesită luarea rapidă a deciziilor, anticiparea mișcărilor adversarului și adaptarea la situații în schimbare. Aceste abilități cognitive sunt valoroase atât pe teren, cât și în viața de zi cu zi.",
        },
        {
          title: "Disciplină și perseverență",
          description:
            "Antrenamentele regulate și respectarea regulilor jocului dezvoltă disciplina și capacitatea de a lucra pentru obiective pe termen lung. Handbalul învață copiii valoarea practicii constante și a efortului pentru îmbunătățire.",
        },
        {
          title: "Încredere în sine și reziliență",
          description:
            "Realizările pe teren, fie că sunt goluri marcate sau pase bune, construiesc încrederea în sine. Handbalul învață și reziliența, deoarece jocul are multe momente de succes și eșec, învățând copiii să se ridice după greșeli.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru handbal",
      content: `Handbalul poate fi început de copiii de 8-9 ani, când au dezvoltat suficientă coordonare, forță și capacitate de a manipula o minge de handbal. La această vârstă, programele se concentrează pe jocuri distractive, exerciții de bază și familiarizarea cu mingea și poarta, folosind echipament adaptat (mingi mai mici, porți mai mici, terenuri reduse).

Pentru copiii de 10-11 ani, antrenamentele introduc tehnica de bază de aruncare, dribling, pase și regulile simplificate. La această vârstă, copiii încep să înțeleagă conceptele de bază ale jocului și pot participa la jocuri mici și competiții de nivel începător.

Copiii de 12-13 ani pot învăța toate tehnicile de bază și pot începe să participe la competiții organizate. La această vârstă, strategia devine mai importantă și antrenamentele devin mai structurate, introducându-se concepte de atac și apărare.

Adolescenții de 14 ani pot participa la competiții mai serioase și pot începe să se specializeze în anumite poziții pe teren. Antrenamentele includ pregătire fizică intensivă, perfecționarea tehnicii și dezvoltarea strategiei de echipă.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru handbal",
      content: `Echipamentul de bază pentru handbal este relativ simplu și accesibil. Cel mai important este să alegi echipament de calitate care să ofere confort și siguranță, adaptat vârstei și nivelului copilului.

Pentru început, este suficient să ai o minge de handbal și îmbrăcăminte sport adecvată. Pe măsură ce copilul progresează și participă la antrenamente mai frecvente, poți investi în echipament suplimentar precum ghete specializate pentru handbal și protecții.

Este important să verifici cerințele specifice ale clubului sau ligii în care participă copilul tău, deoarece unele pot avea cerințe specifice privind echipamentul sau culorile. Multe cluburi oferă și pachete de echipament pentru membri.`,
      items: [
        {
          name: "Minge de handbal",
          description:
            "Mingea trebuie să fie potrivită pentru vârsta și mărimea copilului. Pentru copiii mici (8-10 ani), mingile sunt mai mici (mărimea 0 sau 1). Pentru copiii mai mari (11-13 ani), mingile sunt de mărimea 2, iar pentru adolescenți, mingile standard de mărimea 3. Alege o minge de calitate cu aderență bună.",
          essential: true,
        },
        {
          name: "Ghete de handbal",
          description:
            "Ghetele specializate pentru handbal sunt esențiale pentru siguranță și performanță. Trebuie să ofere suport excelent pentru glezne, aderență bună pe podea și amortizare pentru salturi și schimbări de direcție. Alege ghete potrivite pentru mărimea piciorului copilului.",
          essential: true,
        },
        {
          name: "Îmbrăcăminte sport",
          description:
            "Îmbrăcămintea trebuie să fie confortabilă, să permită libertate de mișcare și să fie din materiale care absorb transpirația. Pentru competiții, multe cluburi au cerințe specifice privind culorile sau stilul (tricou, șorturi).",
          essential: true,
        },
        {
          name: "Protecții pentru genunchi",
          description:
            "Protecțiile pentru genunchi sunt recomandate, mai ales pentru copiii care participă la antrenamente intense sau competiții. Protejează genunchii în cazul căderilor sau contactului cu podeaua.",
          essential: false,
        },
        {
          name: "Bandă pentru mână",
          description:
            "Banda pentru mână ajută la absorbția transpirației și previne alunecarea mingii. Este utilă, mai ales în timpul antrenamentelor intense sau pentru copiii care transpiră mult.",
          essential: false,
        },
        {
          name: "Protecții pentru degete",
          description:
            "Protecțiile pentru degete pot fi utile pentru prevenirea accidentărilor la degete, care sunt frecvente în handbal, mai ales pentru începători. Nu sunt esențiale, dar pot fi utile pentru siguranță suplimentară.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu handbalul?",
        answer:
          "Handbalul poate fi început de copiii de 8-9 ani, când au dezvoltat suficientă coordonare, forță și capacitate de a manipula o minge de handbal. Multe cluburi oferă programe speciale pentru copiii mici care folosesc echipament adaptat (mingi mai mici, porți mai mici, terenuri reduse) și se concentrează pe jocuri distractive și familiarizare cu sportul.",
      },
      {
        question: "Este handbalul sigur pentru copii?",
        answer:
          "Da, handbalul este un sport sigur când este practicat sub supravegherea unui antrenor calificat și cu echipamentul adecvat. Riscu de accidente este redus prin folosirea ghetelor potrivite, protecțiilor (dacă este necesar), respectarea regulilor și antrenamentele progresive. Cluburile verificate de Yuvoo au antrenori calificați care prioritizează siguranța copiilor și adaptează antrenamentele în funcție de vârstă și nivel.",
      },
      {
        question: "Cât de des sunt antrenamentele de handbal?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (8-10 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 60-75 minute. Copiii mai mari (11-13 ani) pot avea 2-3 antrenamente pe săptămână de 75-90 minute, iar adolescenții pot avea antrenamente zilnice sau aproape zilnice în perioadele de competiție, de 90-120 minute fiecare.",
      },
      {
        question: "Copilul meu trebuie să fie înalt pentru a juca handbal?",
        answer:
          "Nu, absolut nu! Deși înălțimea poate fi un avantaj în handbal, nu este un criteriu esențial, mai ales pentru copiii mici. Handbalul dezvoltă abilități valoroase pentru toți copiii, indiferent de înălțime. Mulți jucători de handbal de succes nu sunt foarte înalți, dar au abilități excelente de coordonare, viteză și strategie.",
      },
      {
        question: "Copilul meu poate juca handbal dacă nu are experiență anterioară?",
        answer:
          "Absolut! Majoritatea cluburilor oferă programe pentru începători complete care nu presupun experiență anterioară. Antrenorii sunt pregătiți să lucreze cu copiii de toate nivelurile și să-i învețe fundamentalele de la zero. Important este ca copilul să fie entuziasmat și dornic să învețe.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=handbal",
      clubsLinkText: "Vezi cluburi de handbal verificate",
    },
  },
  {
    sportId: "judo",
    introduction: `Judo-ul este o artă marțială japoneză modernă care combină tehnici de luptă cu dezvoltarea fizică, mentală și spirituală, fiind unul dintre cele mai populare sporturi olimpice de luptă pentru copii. În România, judo-ul are o tradiție puternică și este foarte accesibil pentru copii, oferind o abordare disciplinată și structurată a dezvoltării.

Pentru copiii mici, judo-ul începe cu jocuri distractive și exerciții de bază care se concentrează pe coordonare, echilibru, respect și disciplina. Programele pentru începători se concentrează pe poziții de bază, căderi (ukemi), mișcări fundamentale și învățarea valorilor esențiale ale judo-ului: respect, disciplină, perseverență și autocontrol.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnici de bază (waza), forme (kata) și eventual lupte controlate (randori). Judo-ul dezvoltă nu doar abilități fizice, ci și disciplina mentală, respectul, autocontrolul și încrederea în sine.

Cluburile verificate de Yuvoo oferă programe adaptate pentru toate nivelurile, de la începători absoluți până la practicanți avansați care doresc să obțină benzi și să participe la competiții. Antrenorii calificați (sensei) asigură că fiecare copil primește atenția necesară pentru a progresa într-un mediu sigur, respectuos și disciplinat, unde se promovează atât dezvoltarea tehnică, cât și valorile esențiale ale judo-ului.`,
    benefits: {
      title: "Beneficii ale judo-ului pentru copii",
      items: [
        {
          title: "Dezvoltare fizică completă",
          description:
            "Judo-ul dezvoltă toate grupurile musculare, flexibilitatea, forța, coordonarea, echilibrul, viteza și rezistența. Antrenamentele includ exerciții cardiovasculare și de forță care contribuie la o formă fizică excelentă.",
        },
        {
          title: "Disciplină și respect",
          description:
            "Judo-ul este fundamentat pe discipline strictă și respect profund pentru antrenor, colegi și artă marțială. Aceste valori sunt esențiale pentru dezvoltarea caracterului și pentru viața de zi cu zi.",
        },
        {
          title: "Autoapărare",
          description:
            "Judo-ul oferă copiilor abilități esențiale de autoapărare, dar mai important, învață când și cum să folosească aceste abilități responsabil. Judo-ul promovează evitarea conflictelor și folosirea tehnicilor doar în situații de necesitate.",
        },
        {
          title: "Încredere în sine și autocontrol",
          description:
            "Realizarea tehnicilor complexe și progresarea prin benzi construiește încrederea în sine. Judo-ul învață și autocontrolul, deoarece puterea trebuie să fie întotdeauna controlată și folosită responsabil.",
        },
        {
          title: "Concentrare și disciplină mentală",
          description:
            "Judo-ul necesită concentrare intensă, memorarea tehnicilor complexe și respectarea strictă a regulilor. Aceste abilități mentale sunt valoroase atât în sport, cât și în viața de zi cu zi, mai ales în școală.",
        },
        {
          title: "Perseverență și determinare",
          description:
            "Progresarea prin benzi și învățarea tehnicilor complexe necesită practică constantă și perseverență. Judo-ul învață copiii valoarea efortului susținut și a determinării pentru a atinge obiectivele.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru judo",
      content: `Judo-ul poate fi început de copiii de 5-6 ani, când au dezvoltat suficientă coordonare de bază și capacitate de a urmări instrucțiuni și de a respecta regulile. La această vârstă, programele se concentrează pe jocuri distractive, exerciții de bază și familiarizarea cu valorile judo-ului, fără contact sau tehnici avansate.

Pentru copiii de 7-9 ani, antrenamentele introduc tehnici de bază, poziții fundamentale și căderi (ukemi). La această vârstă, copiii încep să înțeleagă conceptele de bază ale judo-ului și pot începe să progreseze prin benzi (kyu), participând la examene formale.

Copiii de 10-12 ani pot învăța tehnici mai complexe și pot începe să participe la lupte controlate (randori) și competiții. La această vârstă, disciplina devine mai importantă și antrenamentele devin mai structurate, introducându-se concepte de strategie și aplicare practică.

Adolescenții de 13-14 ani pot participa la competiții mai serioase și pot începe să obțină benzi superioare. Antrenamentele includ pregătire fizică intensivă, perfecționarea tehnicilor și dezvoltarea strategiei de competiție.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru judo",
      content: `Echipamentul de bază pentru judo este relativ simplu și accesibil. Cel mai important este să alegi echipament de calitate care să ofere confort și siguranță, adaptat vârstei și nivelului copilului.

Pentru început, este suficient să ai kimono-ul (judogi) de judo. Pe măsură ce copilul progresează și participă la antrenamente mai frecvente sau competiții, poate fi necesar să investești în echipament suplimentar precum protecții pentru competiții și centuri suplimentare.

Este important să verifici cerințele specifice ale clubului, deoarece unele pot avea cerințe specifice privind echipamentul, culorile sau stilul kimono-ului. Multe cluburi oferă și pachete de echipament pentru membri.`,
      items: [
        {
          name: "Kimono de judo (judogi)",
          description:
            "Kimono-ul este esențial pentru judo, oferind libertate de mișcare și respectarea tradiției. Trebuie să fie bine potrivit, confortabil și din materiale rezistente și groase, deoarece judo-ul implică prinderi și trageri. Pentru copiii mici, kimono-urile sunt disponibile în mărimi adaptate. Culoarea este de obicei albă pentru începători.",
          essential: true,
        },
        {
          name: "Centură (obi)",
          description:
            "Centura indică nivelul (kyu sau dan) al practicantului. Pentru începători, centura este de obicei albă, iar pe măsură ce progresează, obțin centuri de culori diferite (galben, portocaliu, verde, albastru, maro) înainte de centura neagră. Centura vine de obicei cu kimono-ul sau poate fi cumpărată separat.",
          essential: true,
        },
        {
          name: "Protecții pentru competiții",
          description:
            "Pentru competiții, pot fi necesare protecții pentru siguranță: protecție pentru piept (pentru fete), protecție pentru cap (opțional) și alte protecții conform regulilor competițiilor. Acestea sunt esențiale pentru prevenirea accidentărilor în timpul competițiilor.",
          essential: false,
        },
        {
          name: "Ghete de antrenament",
          description:
            "Ghetele de antrenament sunt opționale, deoarece mulți practicanți antrenează desculți pe saltele (tatami). Cu toate acestea, pentru protecție suplimentară sau pentru antrenamente în afara sălii, ghetele de antrenament pot fi utile. Alege ghete ușoare și flexibile.",
          essential: false,
        },
        {
          name: "Echipament de competiție",
          description:
            "Pentru competiții, poate fi necesar să investești în echipament suplimentar sau în kimono-uri de calitate superioară care respectă regulile competițiilor. Acestea sunt de obicei mai costisitoare, dar sunt necesare pentru participarea la competiții oficiale.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu judo-ul?",
        answer:
          "Judo-ul poate fi început de copiii de 5-6 ani, când au dezvoltat suficientă coordonare de bază și capacitate de a urmări instrucțiuni și de a respecta regulile. Multe cluburi oferă programe speciale pentru copiii mici care se concentrează pe jocuri distractive, exerciții de bază și familiarizarea cu valorile judo-ului, fără contact sau tehnici avansate.",
      },
      {
        question: "Este judo-ul violent sau periculos pentru copii?",
        answer:
          "Nu, absolut nu! Judo-ul pentru copii este foarte sigur și se concentrează pe dezvoltare fizică, disciplină și respect, nu pe violență. Contactul este controlat strict și permis doar în lupte supervizate pentru copiii mai mari. Judo-ul promovează evitarea conflictelor și folosirea responsabilă a tehnicilor. Cluburile verificate de Yuvoo au antrenori calificați care prioritizează siguranța și adaptează antrenamentele în funcție de vârstă și nivel.",
      },
      {
        question: "Cât de des sunt antrenamentele de judo?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (5-7 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 45-60 minute. Copiii mai mari (8-10 ani) pot avea 2-3 antrenamente pe săptămână de 60-90 minute, iar adolescenții pot avea antrenamente zilnice sau aproape zilnice, de 90-120 minute fiecare.",
      },
      {
        question: "Ce înseamnă benzi în judo?",
        answer:
          "Benzi (kyu pentru începători, dan pentru avansați) indică nivelul de competență al practicantului. Pentru începători, centura este albă, iar pe măsură ce progresează, obțin centuri de culori diferite (galben, portocaliu, verde, albastru, maro) înainte de centura neagră. Progresarea prin benzi se face prin examene formale care testează tehnica, cunoștințele și valorile judo-ului.",
      },
      {
        question: "Cât costă echipamentul de bază pentru judo?",
        answer:
          "Echipamentul de bază (kimono, centură) poate costa între 250-450 RON pentru un set complet de calitate. Kimono-urile pentru copiii mici sunt de obicei mai ieftine. Protecțiile pentru competiții pot costa în plus 150-300 RON, dar nu sunt necesare pentru începători. Multe cluburi oferă și pachete de echipament pentru membri la prețuri reduse.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=judo",
      clubsLinkText: "Vezi cluburi de judo verificate",
    },
  },
  {
    sportId: "rugby",
    introduction: `Rugby-ul este un sport de echipă puternic și dinamic care combină forță, viteza, strategie și spirit de echipă într-un joc captivant. În România, rugby-ul este un sport în creștere pentru copii, oferind oportunități excelente pentru dezvoltare fizică și socială.

Pentru copiii mici, rugby-ul începe cu varianta de touch rugby sau rugby tag, care elimină contactul și se concentrează pe abilitățile fundamentale: alergare cu mingea, pase, strategie de echipă. Programele pentru începători folosesc reguli adaptate și echipament de siguranță pentru a crea un mediu sigur și distractiv.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se progresiv elemente de contact controlat și tehnici avansate. Rugby-ul dezvoltă nu doar abilități fizice excepționale, ci și gândirea strategică, comunicarea în echipă și capacitatea de a lua decizii rapide sub presiune.

Cluburile verificate de Yuvoo oferă programe adaptate pentru toate nivelurile, cu accent pe siguranță, respect și dezvoltare progresivă. Antrenorii calificați asigură că fiecare copil primește atenția necesară pentru a progresa într-un mediu sigur și încurajator.`,
    benefits: {
      title: "Beneficii ale rugby-ului pentru copii",
      items: [
        {
          title: "Dezvoltare fizică completă",
          description:
            "Rugby-ul dezvoltă toate grupurile musculare, forța, viteza, rezistența, agilitatea și coordonarea. Antrenamentele includ exerciții cardiovasculare și de forță care contribuie la o formă fizică excelentă.",
        },
        {
          title: "Spirit de echipă și cooperare",
          description:
            "Rugby-ul este un sport de echipă care necesită comunicare constantă, cooperare și încredere între jucători. Copiii învață valoarea lucrului în echipă și importanța fiecărui membru al echipei.",
        },
        {
          title: "Gândire strategică",
          description:
            "Rugby-ul necesită planificare, anticipare și adaptare la situații în schimbare. Copiii învață să gândească strategic și să rezolve probleme în timp real, abilități valoroase în viață.",
        },
        {
          title: "Disciplină și respect",
          description:
            "Rugby-ul promovează discipline strictă, respect pentru reguli, adversari și arbitrii. Aceste valori sunt esențiale pentru dezvoltarea caracterului.",
        },
        {
          title: "Încredere în sine și reziliență",
          description:
            "Realizările pe teren construiesc încrederea în sine. Rugby-ul învață reziliența și perseverența, deoarece jocul are multe momente de succes și eșec, învățând copiii să se ridice după greșeli.",
        },
        {
          title: "Responsabilitate și siguranță",
          description:
            "Rugby-ul învață copiii să fie responsabili pentru propriile acțiuni și să respecte regulile de siguranță. Aceste abilități sunt esențiale atât pe teren, cât și în viață.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru rugby",
      content: `Rugby-ul poate fi început de copiii de 8-9 ani, când au dezvoltat suficientă coordonare, forță și capacitate de a urmări instrucțiuni. La această vârstă, programele folosesc variante non-contact (touch rugby sau rugby tag) care se concentrează pe abilitățile fundamentale: alergare cu mingea, pase și strategie de echipă.

Pentru copiii de 10-12 ani, antrenamentele introduc progresiv elemente de contact controlat și tehnici de bază. La această vârstă, copiii încep să înțeleagă conceptele de bază ale jocului și pot participa la jocuri mici și competiții de nivel începător.

Copiii de 13-14 ani pot participa la rugby cu contact complet, dar întotdeauna sub supraveghere strictă și cu echipament de protecție adecvat. La această vârstă, strategia devine mai importantă și antrenamentele devin mai structurate, introducându-se concepte de atac și apărare avansate.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru rugby",
      content: `Echipamentul de bază pentru rugby este esențial pentru siguranță, mai ales când se introduce contactul. Pentru început (touch rugby), echipamentul este minimal, dar pe măsură ce copilul progresează, protecția devine crucială.

Pentru început, este suficient să ai îmbrăcăminte sport adecvată și ghete de rugby. Pe măsură ce copilul participă la antrenamente cu contact sau competiții, este esențial să investești în echipament de protecție: protecții pentru umeri, protecții dentare și alte protecții conforme regulilor.

Este important să verifici cerințele specifice ale clubului sau ligii, deoarece fiecare poate avea cerințe specifice privind echipamentul de protecție. Multe cluburi oferă și pachete de echipament pentru membri.`,
      items: [
        {
          name: "Minge de rugby",
          description:
            "Mingea de rugby are formă ovală unică și trebuie să fie potrivită pentru vârsta copilului. Pentru copiii mici, mingile sunt mai mici și mai ușoare. Alege o minge de calitate cu aderență bună.",
          essential: true,
        },
        {
          name: "Ghete de rugby",
          description:
            "Ghetele specializate pentru rugby sunt esențiale pentru siguranță și performanță. Trebuie să ofere suport excelent pentru glezne, aderență bună pe teren și protecție pentru picioare. Alege ghete potrivite pentru tipul de teren (iarbă, artificial).",
          essential: true,
        },
        {
          name: "Protecții pentru umeri",
          description:
            "Protecțiile pentru umeri sunt esențiale pentru rugby cu contact și sunt recomandate pentru toate antrenamentele cu contact. Protejează umerii, pieptul și spatele în cazul contactului.",
          essential: true,
        },
        {
          name: "Protecție dentală",
          description:
            "Protecția dentală (custode) este obligatorie pentru rugby cu contact și este recomandată pentru toate antrenamentele cu contact. Protejează dinții și maxilarul în cazul impactului.",
          essential: true,
        },
        {
          name: "Îmbrăcăminte sport",
          description:
            "Îmbrăcămintea trebuie să fie confortabilă, rezistentă și să permită libertate de mișcare. Pentru competiții, multe cluburi au cerințe specifice privind culorile sau stilul.",
          essential: true,
        },
        {
          name: "Protecții suplimentare",
          description:
            "În funcție de poziție și regulile ligii, pot fi necesare protecții suplimentare precum protecții pentru genunchi, coate sau cap. Consultă antrenorul pentru recomandări specifice.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu rugby-ul?",
        answer:
          "Rugby-ul poate fi început de copiii de 8-9 ani, când au dezvoltat suficientă coordonare și forță. Multe cluburi oferă programe speciale pentru copiii mici care folosesc variante non-contact (touch rugby sau rugby tag) și se concentrează pe abilitățile fundamentale fără risc de accidentare.",
      },
      {
        question: "Este rugby-ul sigur pentru copii?",
        answer:
          "Da, rugby-ul poate fi sigur când este practicat sub supravegherea unui antrenor calificat și cu echipamentul adecvat. Pentru copiii mici, se folosesc variante non-contact. Contactul este introdus progresiv și întotdeauna cu echipament de protecție complet. Cluburile verificate de Yuvoo au antrenori calificați care prioritizează siguranța și adaptează antrenamentele în funcție de vârstă și nivel.",
      },
      {
        question: "Cât de des sunt antrenamentele de rugby?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (8-10 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 60-75 minute. Copiii mai mari (11-13 ani) pot avea 2-3 antrenamente pe săptămână de 75-90 minute, iar adolescenții pot avea antrenamente zilnice sau aproape zilnice în perioadele de competiție.",
      },
      {
        question: "Copilul meu trebuie să fie mare sau puternic pentru a juca rugby?",
        answer:
          "Nu, absolut nu! Rugby-ul are poziții diferite care necesită tipuri diferite de abilități. Deși forța poate fi un avantaj pentru unele poziții, viteza, agilitatea și strategia sunt la fel de importante. Rugby-ul dezvoltă abilități valoroase pentru toți copiii, indiferent de mărime sau forță inițială.",
      },
      {
        question: "Cât costă echipamentul de bază pentru rugby?",
        answer:
          "Echipamentul de bază (ghete, protecții pentru umeri, protecție dentală, îmbrăcăminte) poate costa între 400-700 RON pentru un set complet de calitate. Pentru touch rugby (non-contact), costul este mai mic. Multe cluburi oferă și pachete de echipament pentru membri la prețuri reduse.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=rugby",
      clubsLinkText: "Vezi cluburi de rugby verificate",
    },
  },
  {
    sportId: "hochei",
    introduction: `Hocheiul pe gheață este un sport de echipă rapid și captivant care combină viteza, abilități tehnice pe gheață și strategie într-un joc dinamic. În România, hocheiul pe gheață este un sport în creștere pentru copii, oferind oportunități unice de dezvoltare fizică și tehnică.

Pentru copiii mici, hocheiul începe cu învățarea patinajului de bază și familiarizarea cu echipamentul. Programele pentru începători se concentrează pe echilibrul pe gheață, controlul puck-ului și mișcările fundamentale, folosind echipament adaptat și supraveghere intensă.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnici de patinaj avansate, control al puck-ului, pase, șuturi și strategie de echipă. Hocheiul dezvoltă nu doar abilități fizice excepționale, ci și coordonarea, echilibrul, viteza de reacție și gândirea strategică.

Cluburile verificate de Yuvoo oferă programe adaptate pentru toate nivelurile, cu acces la bazine de gheață și echipament de siguranță complet. Antrenorii calificați asigură că fiecare copil primește atenția necesară pentru a progresa în siguranță și cu încredere.`,
    benefits: {
      title: "Beneficii ale hocheiului pentru copii",
      items: [
        {
          title: "Dezvoltare fizică completă",
          description:
            "Hocheiul dezvoltă toate grupurile musculare, îmbunătățește rezistența cardiovasculară, forța, viteza și agilitatea. Patinajul pe gheață oferă un antrenament complet pentru întregul corp.",
        },
        {
          title: "Echilibru și coordonare",
          description:
            "Patinajul pe gheață dezvoltă echilibrul excepțional și coordonarea între picioare, corp și mâini. Aceste abilități sunt valoroase pentru alte sporturi și activități.",
        },
        {
          title: "Viteză de reacție",
          description:
            "Hocheiul necesită reflexe rapide și luarea instantanee a deciziilor. Aceste abilități se dezvoltă semnificativ prin practică constantă și sunt valoroase în viața de zi cu zi.",
        },
        {
          title: "Spirit de echipă",
          description:
            "Hocheiul este un sport de echipă care necesită comunicare constantă, cooperare și încredere între jucători. Copiii învață valoarea lucrului în echipă și importanța fiecărui membru.",
        },
        {
          title: "Disciplină și respect",
          description:
            "Hocheiul promovează discipline strictă, respect pentru reguli, adversari și arbitrii. Aceste valori sunt esențiale pentru dezvoltarea caracterului.",
        },
        {
          title: "Rezistență la frig",
          description:
            "Practicarea hocheiului în condiții de temperatură scăzută ajută la dezvoltarea rezistenței și adaptării la mediu, oferind beneficii suplimentare pentru sănătate.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru hochei",
      content: `Hocheiul poate fi început de copiii de 6-7 ani, când au dezvoltat suficientă coordonare și echilibru de bază. La această vârstă, programele se concentrează pe învățarea patinajului de bază și familiarizarea cu echipamentul, folosind echipament adaptat și supraveghere intensă.

Pentru copiii de 8-10 ani, antrenamentele introduc controlul puck-ului, pase de bază și mișcări fundamentale pe gheață. La această vârstă, copiii încep să înțeleagă conceptele de bază ale jocului și pot participa la jocuri mici.

Copiii de 11-13 ani pot învăța tehnici mai complexe de patinaj, control al puck-ului, șuturi și strategie de bază. La această vârstă, tehnica devine mai importantă și antrenamentele devin mai structurate.

Adolescenții de 14 ani pot participa la competiții mai serioase și pot începe să se specializeze în anumite poziții. Antrenamentele includ pregătire fizică intensivă și perfecționarea tehnicii.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru hochei",
      content: `Echipamentul pentru hochei este esențial pentru siguranță, deoarece sportul implică viteza mare și contact potențial. Investiția în echipament de calitate este crucială pentru protecția copilului.

Pentru început, este necesar să ai echipamentul complet de protecție: căști, protecții pentru corp, genunchi, coturi și mâini. Pe măsură ce copilul progresează, poate fi necesar să înlocuiești echipamentul pentru a se adapta la mărime și nivelul de performanță.

Este important să verifici cerințele specifice ale clubului sau ligii, deoarece fiecare poate avea cerințe specifice privind echipamentul de protecție. Multe cluburi oferă și programe de închiriere echipament pentru începători.`,
      items: [
        {
          name: "Patine de hochei",
          description:
            "Patinele sunt esențiale și trebuie să fie potrivite pentru mărimea piciorului copilului. Pentru începători, patinele trebuie să ofere suport bun pentru glezne și confort. Alege patine de calitate care permit control și manevrabilitate.",
          essential: true,
        },
        {
          name: "Căști de protecție",
          description:
            "Căștile de protecție sunt obligatorii și esențiale pentru siguranță. Trebuie să fie certificate și să acopere întreaga zonă a capului. Investește într-o căști de calitate care respectă standardele de siguranță.",
          essential: true,
        },
        {
          name: "Protecții pentru corp",
          description:
            "Protecțiile pentru corp, umeri, coturi, genunchi și mâini sunt esențiale pentru siguranță. Acestea protejează în cazul căderilor sau contactului. Alege protecții care se potrivesc bine și permit mișcare liberă.",
          essential: true,
        },
        {
          name: "Băț de hochei",
          description:
            "Bățul trebuie să fie potrivit pentru înălțimea și forța copilului. Pentru copiii mici, bățele sunt mai scurte și mai ușoare. Alege un băț de calitate care permite control bun al puck-ului.",
          essential: true,
        },
        {
          name: "Protecție dentală",
          description:
            "Protecția dentală (custode) este recomandată pentru toate antrenamentele și este obligatorie pentru competiții. Protejează dinții și maxilarul în cazul impactului.",
          essential: true,
        },
        {
          name: "Echipament de gheață",
          description:
            "Îmbrăcămintea de bază pentru gheață (tricou, șorturi, șosete) trebuie să fie confortabilă și să permită mișcare liberă sub echipamentul de protecție. Alege materiale care mențin temperatura.",
          essential: true,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu hocheiul?",
        answer:
          "Hocheiul poate fi început de copiii de 6-7 ani, când au dezvoltat suficientă coordonare și echilibru de bază. Multe cluburi oferă programe speciale pentru începători care se concentrează pe învățarea patinajului de bază și familiarizarea cu echipamentul, cu supraveghere intensă.",
      },
      {
        question: "Este hocheiul sigur pentru copii?",
        answer:
          "Da, hocheiul poate fi sigur când este practicat sub supravegherea unui antrenor calificat și cu echipamentul complet de protecție. Cluburile verificate de Yuvoo au antrenori calificați care prioritizează siguranța, folosesc echipament certificat și adaptează antrenamentele în funcție de vârstă și nivel. Investiția în echipament de calitate este esențială.",
      },
      {
        question: "Cât costă echipamentul de bază pentru hochei?",
        answer:
          "Echipamentul complet (patine, căști, protecții complete, băț, protecție dentală) poate costa între 1000-2000 RON pentru un set de calitate pentru începători. Costul poate fi mai mare pentru echipament de nivel avansat. Multe cluburi oferă programe de închiriere echipament pentru începători, ceea ce poate fi o opțiune mai accesibilă.",
      },
      {
        question: "Copilul meu trebuie să știe deja să patineze?",
        answer:
          "Nu, absolut nu! Multe cluburi oferă programe complete care includ învățarea patinajului de bază. Antrenorii sunt pregătiți să lucreze cu copiii de toate nivelurile și să-i învețe patinajul de la zero. Important este ca copilul să fie dornic să învețe și să aibă suportul familiei.",
      },
      {
        question: "Cât de des sunt antrenamentele de hochei?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (6-8 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 45-60 minute. Copiii mai mari (9-12 ani) pot avea 2-3 antrenamente pe săptămână de 60-90 minute, iar adolescenții pot avea antrenamente mai frecvente în perioadele de competiție.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=hochei",
      clubsLinkText: "Vezi cluburi de hochei verificate",
    },
  },
  {
    sportId: "tenis-de-masa",
    introduction: `Tenisul de masă este un sport rapid și captivant care dezvoltă reflexele, coordonarea și concentrarea într-un joc dinamic și tehnic. În România, tenisul de masă are o tradiție puternică și este unul dintre cele mai accesibile sporturi pentru copii, necesitând spațiu minimal și echipament accesibil.

Pentru copiii mici, tenisul de masă începe cu jocuri distractive și exerciții de bază care se concentrează pe familiarizarea cu racheta, mingea și mișcările fundamentale. Programele pentru începători folosesc mingi mai mari, rachete adaptate și mese cu înălțime reglabilă pentru a facilita învățarea.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnica corectă de lovire, servicii, topspin, backspin și strategie de joc. Tenisul de masă dezvoltă nu doar abilități fizice, ci și concentrarea intensă, viteza de reacție și gândirea strategică.

Cluburile verificate de Yuvoo oferă programe adaptate pentru toate nivelurile, de la începători absoluți până la jucători avansați care doresc să participe la competiții. Antrenorii calificați asigură că fiecare copil primește atenția necesară pentru a progresa într-un mediu pozitiv și încurajator.`,
    benefits: {
      title: "Beneficii ale tenisului de masă pentru copii",
      items: [
        {
          title: "Reflexe rapide și coordonare",
          description:
            "Tenisul de masă dezvoltă reflexe excepțional de rapide și coordonarea ochi-mână la un nivel foarte ridicat. Aceste abilități sunt valoroase pentru alte sporturi și activități.",
        },
        {
          title: "Concentrare și disciplină mentală",
          description:
            "Tenisul de masă necesită concentrare intensă și disciplină mentală pentru a anticipa mișcările adversarului și a reacționa rapid. Aceste abilități mentale sunt esențiale pentru succes atât în sport, cât și în viață.",
        },
        {
          title: "Dezvoltare fizică completă",
          description:
            "Tenisul de masă dezvoltă agilitatea, viteza de reacție, coordonarea și rezistența. Deși jocul este la masă, implică mișcări rapide ale întregului corp.",
        },
        {
          title: "Precizie și control",
          description:
            "Tenisul de masă necesită precizie și control fin al mișcărilor. Aceste abilități se dezvoltă prin practică constantă și sunt valoroase pentru activitățile care necesită control precis.",
        },
        {
          title: "Gândire strategică",
          description:
            "Tenisul de masă necesită planificare, anticipare și adaptare rapidă la stilul adversarului. Copiii învață să gândească strategic și să rezolve probleme în timp real.",
        },
        {
          title: "Accesibil și convenabil",
          description:
            "Tenisul de masă necesită spațiu minimal și poate fi practicat în interior, făcându-l accesibil indiferent de vreme. Echipamentul este relativ accesibil, iar multe cluburi oferă programe flexibile.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru tenis de masă",
      content: `Tenisul de masă poate fi început de copiii de 6-7 ani, când au dezvoltat suficientă coordonare de bază și capacitate de a manipula o rachetă. La această vârstă, programele se concentrează pe jocuri distractive, exerciții de bază și familiarizarea cu racheta, mingea și mișcările fundamentale, folosind echipament adaptat.

Pentru copiii de 8-10 ani, antrenamentele introduc tehnica de bază de lovire, servicii simple și mișcările fundamentale pe masă. La această vârstă, copiii încep să înțeleagă conceptele de bază ale jocului și pot participa la jocuri mici și competiții de nivel începător.

Copiii de 11-13 ani pot învăța tehnici mai complexe (topspin, backspin, servicii avansate) și pot începe să participe la competiții organizate. La această vârstă, tehnica devine mai importantă și antrenamentele devin mai structurate.

Adolescenții de 14 ani pot participa la competiții mai serioase și pot începe să perfecționeze tehnica avansată. Antrenamentele includ pregătire fizică și perfecționarea tehnicii și strategiei.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru tenis de masă",
      content: `Echipamentul de bază pentru tenis de masă este relativ simplu și accesibil, ceea ce face acest sport atractiv pentru multe familii. Cel mai important este să alegi echipament de calitate care să ofere control și confort.

Pentru început, este suficient să ai racheta și mingile. Pe măsură ce copilul progresează, poți investi în rachete mai avansate cu caracteristici specifice (tip de cauciuc, tip de lemn). Multe cluburi oferă echipament pentru antrenamente, facilitând accesul pentru începători.`,
      items: [
        {
          name: "Rachetă de tenis de masă",
          description:
            "Racheta trebuie să fie potrivită pentru mărimea mâinii și nivelul copilului. Pentru începători, rachetele standard sunt potrivite. Pe măsură ce progresează, copiii pot alege rachete cu caracteristici specifice (tip de cauciuc pentru spin, tip de lemn pentru control). Alege o rachetă ușoară cu grip confortabil.",
          essential: true,
        },
        {
          name: "Mingi de tenis de masă",
          description:
            "Mingile standard de tenis de masă (40mm, 2.7g) sunt potrivite pentru toate nivelurile. Pentru începători, unele programe folosesc mingi mai mari pentru facilitarea învățării. Alege mingi de calitate care respectă standardele oficiale.",
          essential: true,
        },
        {
          name: "Îmbrăcăminte sport",
          description:
            "Îmbrăcămintea trebuie să fie confortabilă, să permită libertate de mișcare și să fie din materiale care absorb transpirația. Pentru competiții, multe organizații au cerințe specifice privind culorile (de obicei nu alb pentru a evita confuzia cu mingile).",
          essential: true,
        },
        {
          name: "Încălțăminte de sală",
          description:
            "Ghetele de sală sunt recomandate pentru aderență bună pe podeaua sălii și pentru protecția podelei. Alege ghete ușoare cu suport bun pentru glezne.",
          essential: true,
        },
        {
          name: "Accesorii (overgrip, caz)",
          description:
            "Overgrip-urile pot fi schimbate frecvent pentru a menține racheta curată și confortabilă. Un caz pentru rachetă protejează echipamentul în timpul transportului.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu tenisul de masă?",
        answer:
          "Tenisul de masă poate fi început de copiii de 6-7 ani, când au dezvoltat suficientă coordonare de bază și capacitate de a manipula o rachetă. Multe cluburi oferă programe speciale pentru copiii mici care folosesc echipament adaptat și se concentrează pe jocuri distractive și familiarizare cu sportul.",
      },
      {
        question: "Cât costă echipamentul de bază pentru tenis de masă?",
        answer:
          "Echipamentul de bază (rachetă, mingi, încălțăminte) poate costa între 200-400 RON pentru un set complet de calitate pentru începători. Rachetele mai avansate pot costa mai mult, dar nu sunt necesare pentru începători. Multe cluburi oferă echipament pentru antrenamente, facilitând accesul pentru începători.",
      },
      {
        question: "Cât de des sunt antrenamentele de tenis de masă?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (6-8 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 45-60 minute. Copiii mai mari (9-12 ani) pot avea 2-3 antrenamente pe săptămână de 60-75 minute, iar adolescenții pot avea antrenamente mai frecvente în perioadele de competiție.",
      },
      {
        question: "Este necesar să am masă de tenis de masă acasă?",
        answer:
          "Nu, absolut nu! Cluburile oferă acces la mese profesionale pentru antrenamente. Pentru antrenamente acasă, poți folosi o masă simplă sau chiar o suprafață plană pentru exerciții de bază cu racheta și mingea, dar mesele clubului sunt esențiale pentru progresul real.",
      },
      {
        question: "Copilul meu poate juca tenis de masă dacă nu are experiență anterioară?",
        answer:
          "Absolut! Majoritatea cluburilor oferă programe pentru începători complete care nu presupun experiență anterioară. Antrenorii sunt pregătiți să lucreze cu copiii de toate nivelurile și să-i învețe fundamentalele de la zero. Important este ca copilul să fie entuziasmat și dornic să învețe.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=tenis-de-masa",
      clubsLinkText: "Vezi cluburi de tenis de masă verificate",
    },
  },
  {
    sportId: "badminton",
    introduction: `Badmintonul este un sport rapid și dinamic care combină viteza, agilitate și coordonare într-un joc captivant și tehnic. În România, badmintonul este un sport în creștere pentru copii, oferind oportunități excelente pentru dezvoltare fizică și tehnică.

Pentru copiii mici, badmintonul începe cu jocuri distractive și exerciții de bază care se concentrează pe familiarizarea cu racheta, volanul și mișcările fundamentale. Programele pentru începători folosesc rachete mai ușoare, volane adaptate și neturi mai joase pentru a facilita învățarea.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnica corectă de lovire, servicii, smasuri, dropshot-uri și strategie de joc. Badmintonul dezvoltă nu doar abilități fizice excepționale, ci și concentrarea intensă, viteza de reacție și gândirea strategică.

Cluburile verificate de Yuvoo oferă programe adaptate pentru toate nivelurile, de la începători absoluți până la jucători avansați care doresc să participe la competiții. Antrenorii calificați asigură că fiecare copil primește atenția necesară pentru a progresa într-un mediu pozitiv și încurajator.`,
    benefits: {
      title: "Beneficii ale badmintonului pentru copii",
      items: [
        {
          title: "Viteză și agilitate",
          description:
            "Badmintonul este unul dintre cele mai rapide sporturi cu rachetă, dezvoltând viteza excepțională, agilitatea și coordonarea. Mișcările rapide pe teren oferă un antrenament cardiovascular excelent.",
        },
        {
          title: "Coordonare și reflexe",
          description:
            "Badmintonul dezvoltă coordonarea ochi-mână la un nivel foarte ridicat și reflexe rapide pentru a reacționa la volanul care se mișcă rapid. Aceste abilități sunt valoroase pentru alte sporturi și activități.",
        },
        {
          title: "Dezvoltare fizică completă",
          description:
            "Badmintonul dezvoltă toate grupurile musculare, rezistența cardiovasculară, forța picioarelor și flexibilitatea. Salturile și mișcările rapide oferă un antrenament complet pentru întregul corp.",
        },
        {
          title: "Concentrare și disciplină mentală",
          description:
            "Badmintonul necesită concentrare intensă pentru a anticipa traiectoria volanului și a planifica loviturile. Aceste abilități mentale sunt esențiale pentru succes atât în sport, cât și în viață.",
        },
        {
          title: "Strategie și precizie",
          description:
            "Badmintonul necesită planificare strategică și precizie în plasarea volanului. Copiii învață să gândească strategic și să dezvolte control fin al mișcărilor.",
        },
        {
          title: "Versatilitate",
          description:
            "Badmintonul poate fi jucat atât individual, cât și în dublu, oferind oportunități variate pentru dezvoltare. Jocul în dublu dezvoltă și spiritul de echipă și comunicarea.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru badminton",
      content: `Badmintonul poate fi început de copiii de 6-7 ani, când au dezvoltat suficientă coordonare de bază și capacitate de a manipula o rachetă. La această vârstă, programele se concentrează pe jocuri distractive, exerciții de bază și familiarizarea cu racheta, volanul și mișcările fundamentale, folosind echipament adaptat.

Pentru copiii de 8-10 ani, antrenamentele introduc tehnica de bază de lovire, servicii simple și mișcările fundamentale pe teren. La această vârstă, copiii încep să înțeleagă conceptele de bază ale jocului și pot participa la jocuri mici și competiții de nivel începător.

Copiii de 11-13 ani pot învăța tehnici mai complexe (smasuri, dropshot-uri, servicii avansate) și pot începe să participe la competiții organizate. La această vârstă, tehnica devine mai importantă și antrenamentele devin mai structurate.

Adolescenții de 14 ani pot participa la competiții mai serioase și pot începe să perfecționeze tehnica avansată și strategia. Antrenamentele includ pregătire fizică intensivă și perfecționarea tehnicii.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru badminton",
      content: `Echipamentul de bază pentru badminton este relativ simplu și accesibil. Cel mai important este să alegi echipament de calitate care să ofere control și confort.

Pentru început, este suficient să ai racheta, volanele și încălțămintea adecvată. Pe măsură ce copilul progresează, poți investi în rachete mai avansate cu caracteristici specifice. Multe cluburi oferă echipament pentru antrenamente, facilitând accesul pentru începători.`,
      items: [
        {
          name: "Rachetă de badminton",
          description:
            "Racheta trebuie să fie potrivită pentru mărimea mâinii și nivelul copilului. Pentru începători, rachetele standard ușoare sunt potrivite. Pe măsură ce progresează, copiii pot alege rachete cu caracteristici specifice (flexibilitate, greutate, balanță). Alege o rachetă ușoară cu grip confortabil.",
          essential: true,
        },
        {
          name: "Volane",
          description:
            "Volanele sunt disponibile în două tipuri: cu pene (plume) pentru competiții și sintetice pentru antrenamente. Pentru începători, volanele sintetice sunt mai durabile și accesibile. Alege volane de calitate care respectă standardele oficiale.",
          essential: true,
        },
        {
          name: "Încălțăminte de badminton",
          description:
            "Ghetele specializate pentru badminton sunt esențiale pentru siguranță și performanță. Trebuie să ofere aderență excelentă pe podeaua sălii, suport pentru glezne și amortizare pentru salturi și schimbări de direcție rapide.",
          essential: true,
        },
        {
          name: "Îmbrăcăminte sport",
          description:
            "Îmbrăcămintea trebuie să fie confortabilă, să permită libertate de mișcare și să fie din materiale care absorb transpirația. Pentru competiții, multe organizații au cerințe specifice privind culorile (de obicei nu alb pentru a evita confuzia cu volanele).",
          essential: true,
        },
        {
          name: "Accesorii (overgrip, caz)",
          description:
            "Overgrip-urile pot fi schimbate frecvent pentru a menține racheta curată și confortabilă. Un caz pentru rachetă protejează echipamentul în timpul transportului.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu badmintonul?",
        answer:
          "Badmintonul poate fi început de copiii de 6-7 ani, când au dezvoltat suficientă coordonare de bază și capacitate de a manipula o rachetă. Multe cluburi oferă programe speciale pentru copiii mici care folosesc echipament adaptat și se concentrează pe jocuri distractive și familiarizare cu sportul.",
      },
      {
        question: "Cât costă echipamentul de bază pentru badminton?",
        answer:
          "Echipamentul de bază (rachetă, volane, încălțăminte) poate costa între 300-500 RON pentru un set complet de calitate pentru începători. Rachetele mai avansate pot costa mai mult, dar nu sunt necesare pentru începători. Multe cluburi oferă echipament pentru antrenamente, facilitând accesul pentru începători.",
      },
      {
        question: "Cât de des sunt antrenamentele de badminton?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (6-8 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 45-60 minute. Copiii mai mari (9-12 ani) pot avea 2-3 antrenamente pe săptămână de 60-75 minute, iar adolescenții pot avea antrenamente mai frecvente în perioadele de competiție.",
      },
      {
        question: "Este necesar să am teren de badminton acasă?",
        answer:
          "Nu, absolut nu! Cluburile oferă acces la terenuri profesionale pentru antrenamente. Pentru antrenamente acasă, poți folosi un spațiu deschis pentru exerciții de bază cu racheta și volanul, dar terenurile clubului sunt esențiale pentru progresul real.",
      },
      {
        question: "Care este diferența dintre badminton și tenis de masă?",
        answer:
          "Deși ambele sunt sporturi cu rachetă, badmintonul se joacă pe un teren mai mare cu un volan, necesitând mai multă agilitate și mișcare, în timp ce tenisul de masă se joacă pe o masă cu o minge, necesitând reflexe mai rapide într-un spațiu mai mic. Ambele dezvoltă coordonarea și concentrarea, dar badmintonul oferă mai mult antrenament cardiovascular.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=badminton",
      clubsLinkText: "Vezi cluburi de badminton verificate",
    },
  },
  {
    sportId: "atletism",
    introduction: `Atletismul este considerat "regina sporturilor", combinând alergare, sărituri și aruncări într-un sport complet care dezvoltă toate calitățile fizice. În România, atletismul are o tradiție puternică și este fundamental pentru dezvoltarea fizică a copiilor, oferind baza pentru multe alte sporturi.

Pentru copiii mici, atletismul începe cu jocuri distractive și exerciții de bază care se concentrează pe alergare, sărituri simple și aruncări cu obiecte ușoare. Programele pentru începători se concentrează pe dezvoltarea coordonării, echilibrului și familiarizarea cu diferite discipline atletice.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnici specifice pentru fiecare disciplină: alergare pe distanțe diferite, sărituri (în înălțime, în lungime), aruncări (grea, disc, suliță). Atletismul dezvoltă nu doar abilități fizice excepționale, ci și disciplina, perseverența și încrederea în sine.

Cluburile verificate de Yuvoo oferă programe adaptate pentru toate nivelurile, cu acces la facilități de atletism (pistă, sărituri, aruncări). Antrenorii calificați asigură că fiecare copil primește atenția necesară pentru a progresa și poate explora diferite discipline pentru a găsi cea care se potrivește cel mai bine.`,
    benefits: {
      title: "Beneficii ale atletismului pentru copii",
      items: [
        {
          title: "Dezvoltare fizică completă",
          description:
            "Atletismul dezvoltă toate calitățile fizice: viteză, rezistență, forță, flexibilitate, coordonare și agilitate. Este baza pentru multe alte sporturi și oferă dezvoltare fizică armonioasă.",
        },
        {
          title: "Fundamente pentru alte sporturi",
          description:
            "Abilitățile dezvoltate în atletism (alergare, sărituri, coordonare) sunt esențiale pentru multe alte sporturi. Atletismul oferă o bază solidă pentru dezvoltarea sportivă generală.",
        },
        {
          title: "Disciplină și perseverență",
          description:
            "Atletismul necesită practică constantă și perseverență pentru a-și îmbunătăți performanțele. Copiii învață valoarea efortului susținut și a determinării pentru a atinge obiectivele.",
        },
        {
          title: "Competiție individuală și colectivă",
          description:
            "Atletismul poate fi practicat atât individual, cât și în echipă, oferind oportunități variate pentru dezvoltare. Competițiile în echipă dezvoltă și spiritul de echipă.",
        },
        {
          title: "Varietate de discipline",
          description:
            "Atletismul oferă o varietate mare de discipline (alergare, sărituri, aruncări), permițând copiilor să exploreze și să găsească disciplinele care se potrivesc cel mai bine cu abilitățile și preferințele lor.",
        },
        {
          title: "Sănătate cardiovasculară",
          description:
            "Antrenamentele de atletism, în special alergarea, îmbunătățesc semnificativ sănătatea cardiovasculară, capacitatea pulmonară și rezistența generală.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru atletism",
      content: `Atletismul poate fi început de copiii de 6-7 ani, când au dezvoltat suficientă coordonare de bază și capacitate de a urmări instrucțiuni. La această vârstă, programele se concentrează pe jocuri distractive, exerciții de bază și familiarizarea cu diferite discipline atletice (alergare, sărituri simple, aruncări cu obiecte ușoare).

Pentru copiii de 8-10 ani, antrenamentele introduc tehnici de bază pentru diferite discipline și se concentrează pe dezvoltarea coordonării, vitezei și rezistenței. La această vârstă, copiii încep să înțeleagă conceptele de bază ale atletismului și pot participa la competiții de nivel începător.

Copiii de 11-13 ani pot învăța tehnici mai complexe și pot începe să se specializeze în anumite discipline. La această vârstă, tehnica devine mai importantă și antrenamentele devin mai structurate.

Adolescenții de 14 ani pot participa la competiții mai serioase și pot începe să perfecționeze tehnica pentru disciplinele alese. Antrenamentele includ pregătire fizică intensivă și specializare.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru atletism",
      content: `Echipamentul de bază pentru atletism variază în funcție de disciplinele alese, dar majoritatea echipamentului este relativ simplu și accesibil. Cel mai important este să alegi echipament de calitate care să ofere confort și suport.

Pentru început, este suficient să ai încălțăminte de alergare de calitate și îmbrăcăminte sport adecvată. Pe măsură ce copilul progresează și se specializează în anumite discipline, pot fi necesare echipamente specifice (ghete cu știfturi pentru alergare, echipament pentru sărituri sau aruncări).`,
      items: [
        {
          name: "Încălțăminte de alergare",
          description:
            "Ghetele de alergare sunt esențiale și trebuie să fie potrivite pentru tipul de antrenament (pistă, șosea, cross). Pentru începători, ghetele universale sunt potrivite. Pe măsură ce progresează, pot fi necesare ghete specializate (cu știfturi pentru pistă, pentru cross). Alege ghete cu amortizare bună și suport pentru arcul piciorului.",
          essential: true,
        },
        {
          name: "Îmbrăcăminte sport",
          description:
            "Îmbrăcămintea trebuie să fie confortabilă, să permită libertate de mișcare și să fie din materiale care absorb transpirația. Pentru antrenamente în aer liber, este important să alege materiale adaptate la vreme (respirante vara, izolante iarna).",
          essential: true,
        },
        {
          name: "Cronometru",
          description:
            "Un cronometru poate fi util pentru a urmări progresul în antrenamentele de alergare, dar nu este esențial pentru începători. Multe telefoane mobile au funcții de cronometru.",
          essential: false,
        },
        {
          name: "Echipament pentru sărituri",
          description:
            "Pentru disciplinele de sărituri, echipamentul specific (barni, săbii) este furnizat de club. Pentru antrenamente acasă, pot fi utile conuri sau markeri pentru marcarea distanțelor.",
          essential: false,
        },
        {
          name: "Echipament pentru aruncări",
          description:
            "Pentru disciplinele de aruncări, echipamentul specific (greutăți, discuri, sulițe) este furnizat de club și folosit doar sub supraveghere. Nu este recomandat să investești în acestea pentru începători.",
          essential: false,
        },
        {
          name: "Apă și bidon",
          description:
            "Hidratarea este esențială în timpul antrenamentelor de atletism. Un bidon rezistent și ușor de transportat este recomandat.",
          essential: true,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu atletismul?",
        answer:
          "Atletismul poate fi început de copiii de 6-7 ani, când au dezvoltat suficientă coordonare de bază. Multe cluburi oferă programe speciale pentru copiii mici care se concentrează pe jocuri distractive, exerciții de bază și familiarizarea cu diferite discipline atletice, fără presiune sau cerințe tehnice avansate.",
      },
      {
        question: "Copilul meu trebuie să fie rapid sau puternic pentru a practica atletismul?",
        answer:
          "Nu, absolut nu! Atletismul oferă o varietate mare de discipline care necesită tipuri diferite de abilități. Deși viteză sau forță pot fi avantaje pentru unele discipline, există discipline pentru toate tipurile de copii. Atletismul dezvoltă abilități progresiv și permite fiecărui copil să găsească disciplinele care se potrivesc cel mai bine.",
      },
      {
        question: "Cât de des sunt antrenamentele de atletism?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (6-8 ani) au de obicei 2-3 antrenamente pe săptămână, fiecare de 45-60 minute. Copiii mai mari (9-12 ani) pot avea 3-4 antrenamente pe săptămână de 60-90 minute, iar adolescenții pot avea antrenamente zilnice sau aproape zilnice în perioadele de competiție.",
      },
      {
        question: "Ce discipline include atletismul?",
        answer:
          "Atletismul include trei categorii principale: alergare (sprint, mijloc, fond, obstacole, relevuri), sărituri (în înălțime, în lungime, triplu, cu prăjina) și aruncări (grea, disc, suliță, ciocan). Copiii pot explora diferite discipline pentru a găsi cele care se potrivesc cel mai bine cu abilitățile și preferințele lor.",
      },
      {
        question: "Cât costă echipamentul de bază pentru atletism?",
        answer:
          "Echipamentul de bază (în alegere de calitate, îmbrăcăminte sport) poate costa între 300-500 RON pentru un set complet de calitate pentru începători. Echipamentul specific pentru discipline avansate (ghete cu știfturi, echipament pentru sărituri sau aruncări) poate costa în plus, dar nu este necesar pentru începători. Majoritatea echipamentului specific este furnizat de club.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=atletism",
      clubsLinkText: "Vezi cluburi de atletism verificate",
    },
  },
  {
    sportId: "ciclism",
    introduction: `Ciclismul este un sport versatil și accesibil care combină recreația cu competiția, oferind oportunități excelente pentru activități în aer liber și dezvoltare fizică. În România, ciclismul este un sport în creștere pentru copii, cu multe cluburi oferind programe specializate.

Pentru copiii mici, ciclismul începe cu biciclete cu roți de echilibrare sau biciclete cu roți auxiliare, concentrându-se pe echilibru și control de bază. Programele pentru începători se concentrează pe siguranță rutieră, controlul bicicletei și familiarizarea cu regulile de circulație.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnici de ciclism, trasee pe teren variat și eventual competiții. Ciclismul dezvoltă nu doar rezistența și forța, ci și echilibrul, coordonarea și cunoașterea mediului înconjurător.

Cluburile verificate de Yuvoo oferă programe adaptate pentru toate nivelurile, cu accent pe siguranță, echipament adecvat și progresie graduală. Antrenorii calificați asigură că fiecare copil primește atenția necesară pentru a progresa în siguranță.`,
    benefits: {
      title: "Beneficii ale ciclismului pentru copii",
      items: [
        {
          title: "Rezistență și sănătate cardiovasculară",
          description:
            "Ciclismul este un antrenament cardiovascular excelent care îmbunătățește rezistența, capacitatea pulmonară și sănătatea generală. Este un sport cu impact redus, prietenos cu articulațiile.",
        },
        {
          title: "Echilibru și coordonare",
          description:
            "Ciclismul dezvoltă echilibrul excepțional și coordonarea între mâini, picioare și corp. Aceste abilități sunt valoroase pentru alte activități și pentru viața de zi cu zi.",
        },
        {
          title: "Dezvoltare fizică completă",
          description:
            "Ciclismul dezvoltă forța picioarelor, rezistența musculară și flexibilitatea. Deși se concentrează pe picioare, implică și mușchii core, brațe și spate pentru stabilitate.",
        },
        {
          title: "Explorare și independență",
          description:
            "Ciclismul permite copiilor să exploreze mediu înconjurător și să dezvolte simțul independenței și orientării. Oferă oportunități pentru aventură și descoperire.",
        },
        {
          title: "Mediu și natură",
          description:
            "Ciclismul promovează conștientizarea mediului și conectarea cu natura. Oferă oportunități pentru activități în aer liber și cunoașterea mediului local.",
        },
        {
          title: "Transport sănătos",
          description:
            "Ciclismul învață copiii despre transport activ și durabil, valorile care sunt importante pentru viață. Poate deveni un mod de viață sănătos pe termen lung.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru ciclism",
      content: `Ciclismul poate fi început de copiii de 5-6 ani, când au dezvoltat suficientă coordonare și echilibru de bază. La această vârstă, copiii învață să pedaleze cu biciclete cu roți de echilibrare sau cu roți auxiliare, concentrându-se pe control de bază și siguranță.

Pentru copiii de 7-9 ani, antrenamentele introduc tehnici de ciclism de bază, siguranță rutieră și controlul bicicletei pe terenuri variate. La această vârstă, copiii pot participa la trasee ușoare și pot începe să învețe regulile de circulație.

Copiii de 10-12 ani pot participa la antrenamente mai structurate și pot începe să exploreze terenuri mai variate și eventual competiții de nivel începător. La această vârstă, rezistența și tehnica devin mai importante.

Adolescenții de 13-14 ani pot participa la competiții și pot începe să se specializeze în anumite tipuri de ciclism (șosea, mountain bike, BMX). Antrenamentele includ pregătire fizică intensivă și perfecționarea tehnicii.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru ciclism",
      content: `Echipamentul de bază pentru ciclism include bicicleta și echipamentul de siguranță. Investiția în echipament de calitate și siguranță este esențială pentru protecția copilului.

Pentru început, este necesar să ai o bicicletă potrivită pentru vârstă și mărime, căștile de protecție și echipament de vizibilitate. Pe măsură ce copilul progresează, pot fi necesare echipamente suplimentare precum rochițe de ciclism, ghete specializate și echipament pentru terenuri specifice.`,
      items: [
        {
          name: "Bicicletă",
          description:
            "Bicicleta trebuie să fie potrivită pentru înălțimea și vârsta copilului. Pentru copiii mici, bicicletele cu roți de 12-16 inch sunt potrivite. Pentru copiii mai mari, bicicletele cu roți de 20-24 inch sunt standard. Alege o bicicletă de calitate care este sigură și ușor de controlat.",
          essential: true,
        },
        {
          name: "Căști de protecție",
          description:
            "Căștile de protecție sunt obligatorii și esențiale pentru siguranță. Trebuie să fie certificate și să se potrivească corect pe cap. Investește într-o căști de calitate care respectă standardele de siguranță și înlocuiește-o dacă este deteriorată.",
          essential: true,
        },
        {
          name: "Echipament de vizibilitate",
          description:
            "Pentru siguranță, este important să ai echipament de vizibilitate: bandă reflectorizantă, haine cu elemente reflectorizante, și eventual lumini pentru bicicletă (spate și față) pentru condiții de lumină redusă.",
          essential: true,
        },
        {
          name: "Îmbrăcăminte de ciclism",
          description:
            "Pentru începători, îmbrăcămintea sport standard este suficientă. Pentru copiii mai avansați, rochițele de ciclism și hainele specializate pot oferi confort suplimentar și performanță îmbunătățită.",
          essential: false,
        },
        {
          name: "Ghete de ciclism",
          description:
            "Pentru începători, ghetele sport standard sunt potrivite. Pentru copiii mai avansați, ghetele specializate pentru ciclism pot oferi performanță îmbunătățită, dar nu sunt esențiale pentru început.",
          essential: false,
        },
        {
          name: "Accesorii (bidon, sacoșă, instrumente)",
          description:
            "Un bidon pentru apă, o sacoșă pentru bicicletă și un set de bază de instrumente pentru reparații minore pot fi utile, dar nu sunt esențiale pentru începători.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu ciclismul?",
        answer:
          "Ciclismul poate fi început de copiii de 5-6 ani, când au dezvoltat suficientă coordonare și echilibru de bază. Multe copiii învață să pedaleze cu biciclete cu roți de echilibrare sau cu roți auxiliare. Programele organizate de cluburi pot începe de la 7-8 ani.",
      },
      {
        question: "Este ciclismul sigur pentru copii?",
        answer:
          "Da, ciclismul poate fi sigur când este practicat cu echipamentul adecvat (căști obligatorii) și sub supraveghere sau în zone sigure. Este important să înveți copiii despre siguranță rutieră și să alegi trasee potrivite pentru vârstă. Cluburile verificate de Yuvoo au antrenori calificați care prioritizează siguranța și organizează antrenamente în zone sigure.",
      },
      {
        question: "Cât costă echipamentul de bază pentru ciclism?",
        answer:
          "Echipamentul de bază (bicicletă, căști, echipament de vizibilitate) poate costa între 800-1500 RON pentru un set complet de calitate pentru începători. Bicicletele pentru copiii mici sunt de obicei mai accesibile. Investiția în căști de calitate este esențială pentru siguranță.",
      },
      {
        question: "Copilul meu trebuie să știe deja să pedaleze?",
        answer:
          "Nu, absolut nu! Multe cluburi oferă programe complete care includ învățarea ciclismului de bază. Antrenorii sunt pregătiți să lucreze cu copiii de toate nivelurile și să-i învețe să pedaleze și să controleze bicicleta de la zero. Important este ca copilul să fie dornic să învețe.",
      },
      {
        question: "Cât de des sunt antrenamentele de ciclism?",
        answer:
          "Frecvența antrenamentelor variază în funcție de vârstă și nivel. Copiii mici (7-9 ani) au de obicei 1-2 antrenamente pe săptămână, fiecare de 45-60 minute. Copiii mai mari (10-12 ani) pot avea 2-3 antrenamente pe săptămână de 60-90 minute, iar adolescenții pot avea antrenamente mai frecvente în perioadele de competiție.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=ciclism",
      clubsLinkText: "Vezi cluburi de ciclism verificate",
    },
  },
  {
    sportId: "patinaj",
    introduction: `Patinajul este un sport elegant care dezvoltă echilibrul, coordonarea și grația, fiind disponibil atât pe gheață cât și pe role. În România, patinajul este un sport în creștere pentru copii, oferind oportunități excelente pentru dezvoltare fizică și expresie.

Pentru copiii mici, patinajul începe cu familiarizarea cu echipamentul și învățarea echilibrului de bază. Programele pentru începători se concentrează pe mișcări fundamentale, control de bază și familiarizarea cu suprafețele de patinaj (gheață sau role).

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnici avansate de patinaj, mișcări complexe și eventual performanțe. Patinajul dezvoltă nu doar abilități fizice, ci și grația, coordonarea și încrederea în sine.`,
    benefits: {
      title: "Beneficii ale patinajului pentru copii",
      items: [
        {
          title: "Echilibru și coordonare",
          description:
            "Patinajul dezvoltă echilibrul excepțional și coordonarea între picioare, corp și mâini. Aceste abilități sunt valoroase pentru alte sporturi și activități.",
        },
        {
          title: "Forță și rezistență",
          description:
            "Patinajul dezvoltă forța picioarelor, mușchii core și rezistența musculară. Oferă un antrenament complet pentru partea inferioară a corpului.",
        },
        {
          title: "Grație și eleganță",
          description:
            "Patinajul dezvoltă grația mișcării și eleganța, abilități care sunt valoroase atât în sport, cât și în viața de zi cu zi.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru patinaj",
      content: `Patinajul poate fi început de copiii de 4-5 ani, când au dezvoltat coordonare de bază. La această vârstă, programele se concentrează pe echilibru și mișcări fundamentale. Copiii mai mari pot învăța tehnici avansate.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru patinaj",
      content: `Echipamentul de bază include patine potrivite tipului de patinaj (gheață sau role), căști de protecție și echipament de protecție pentru începători.`,
      items: [
        {
          name: "Patine",
          description:
            "Patinele trebuie să fie potrivite pentru mărimea piciorului și tipul de patinaj (gheață sau role). Pentru începători, patinele standard sunt potrivite.",
          essential: true,
        },
        {
          name: "Căști de protecție",
          description: "Căștile sunt obligatorii pentru siguranță, mai ales pentru începători.",
          essential: true,
        },
        {
          name: "Protecții",
          description:
            "Protecții pentru genunchi, coturi și încheieturi sunt recomandate pentru începători pentru a preveni accidentările.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu patinajul?",
        answer:
          "Patinajul poate fi început de copiii de 4-5 ani, când au dezvoltat coordonare de bază. Multe cluburi oferă programe speciale pentru copiii mici.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=patinaj",
      clubsLinkText: "Vezi cluburi de patinaj verificate",
    },
  },
  {
    sportId: "schi",
    introduction: `Schiul este un sport de iarnă captivant care combină aventura cu natură, oferind oportunități excelente pentru activități în aer liber și dezvoltare fizică. În România, cu stațiuni montane excelente, schiul este un sport popular pentru copii, oferind experiențe unice în natură.

Pentru copiii mici, schiul începe cu învățarea echilibrului pe schiuri și tehnici de bază de alunecare. Programele pentru începători se concentrează pe siguranță, control de bază și familiarizarea cu echipamentul, sub supraveghere intensă și pe pârtii adaptate.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnici avansate de schi, schi paralel, viraje și eventual competiții. Schiul dezvoltă nu doar abilități fizice, ci și încredere, coordonare și aprecierea naturii.`,
    benefits: {
      title: "Beneficii ale schiului pentru copii",
      items: [
        {
          title: "Echilibru și coordonare",
          description:
            "Schiul dezvoltă echilibrul excepțional și coordonarea între picioare, corp și schiuri. Aceste abilități sunt valoroase pentru alte sporturi și activități.",
        },
        {
          title: "Forță și rezistență",
          description:
            "Schiul dezvoltă forța picioarelor, mușchii core și rezistența musculară. Oferă un antrenament complet pentru partea inferioară a corpului.",
        },
        {
          title: "Conectare cu natura",
          description:
            "Schiul permite copiilor să exploreze natură și să dezvolte aprecierea pentru mediu montan. Oferă oportunități pentru aventură în aer liber.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru schi",
      content: `Schiul poate fi început de copiii de 5-6 ani, când au dezvoltat coordonare de bază. Programele pentru începători se concentrează pe echilibru și tehnici fundamentale pe pârtii ușoare.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru schi",
      content: `Echipamentul pentru schi include schiuri, bățuri, bocanci și echipament de protecție. Investiția în echipament de calitate și siguranță este esențială.`,
      items: [
        {
          name: "Schiuri și bățuri",
          description:
            "Schiurile trebuie să fie potrivite pentru înălțimea, greutatea și nivelul copilului. Multe stațiuni oferă închiriere echipament.",
          essential: true,
        },
        {
          name: "Bocanci de schi",
          description: "Bocancii trebuie să se potrivească perfect pentru siguranță și control.",
          essential: true,
        },
        {
          name: "Căști de protecție",
          description: "Căștile sunt obligatorii pentru siguranță pe pârtii.",
          essential: true,
        },
        {
          name: "Echipament de protecție",
          description: "Protecții pentru spate și alte echipamente de siguranță sunt recomandate.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu schiul?",
        answer:
          "Schiul poate fi început de copiii de 5-6 ani, când au dezvoltat coordonare de bază. Multe stațiuni oferă programe speciale pentru copiii mici.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=schi",
      clubsLinkText: "Vezi cluburi de schi verificate",
    },
  },
  {
    sportId: "taekwondo",
    introduction: `Taekwondo-ul este o artă marțială coreeană modernă și unul dintre cele mai populare sporturi olimpice de luptă pentru copii. Combină tehnici de lovituri cu piciorul și mâna cu dezvoltarea fizică, mentală și spirituală, oferind o abordare disciplinată și structurată.

Pentru copiii mici, taekwondo-ul începe cu jocuri distractive și exerciții de bază care se concentrează pe coordonare, echilibru, respect și disciplina. Programele pentru începători se concentrează pe poziții de bază, mișcări fundamentale și învățarea valorilor esențiale: respect, disciplină, perseverență și autocontrol.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnici de bază, forme (poomsae) și eventual sparring controlat. Taekwondo-ul dezvoltă nu doar abilități fizice, ci și disciplina mentală, respectul, autocontrolul și încrederea în sine.`,
    benefits: {
      title: "Beneficii ale taekwondo-ului pentru copii",
      items: [
        {
          title: "Flexibilitate și agilitate",
          description:
            "Taekwondo-ul dezvoltă flexibilitatea excepțională, mai ales a picioarelor, și agilitatea. Loviturile cu piciorul dezvoltă flexibilitatea și forța picioarelor.",
        },
        {
          title: "Disciplină și respect",
          description:
            "Taekwondo-ul este fundamentat pe discipline strictă și respect profund pentru antrenor, colegi și artă marțială. Aceste valori sunt esențiale pentru dezvoltarea caracterului.",
        },
        {
          title: "Autoapărare",
          description:
            "Taekwondo-ul oferă copiilor abilități esențiale de autoapărare, dar mai important, învață când și cum să folosească aceste abilități responsabil.",
        },
        {
          title: "Încredere în sine",
          description:
            "Realizarea tehnicilor complexe și progresarea prin benzi construiește încrederea în sine. Taekwondo-ul învață și autocontrolul.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru taekwondo",
      content: `Taekwondo-ul poate fi început de copiii de 5-6 ani, când au dezvoltat coordonare de bază. Programele se concentrează pe jocuri distractive și valori, fără contact pentru copiii mici.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru taekwondo",
      content: `Echipamentul de bază include dobok-ul (costum) și centura. Pentru sparring, sunt necesare protecții complete.`,
      items: [
        {
          name: "Dobok (costum)",
          description:
            "Dobok-ul este esențial, oferind libertate de mișcare și respectarea tradiției.",
          essential: true,
        },
        {
          name: "Centură",
          description: "Centura indică nivelul. Pentru începători, centura este albă.",
          essential: true,
        },
        {
          name: "Protecții pentru sparring",
          description:
            "Pentru sparring, sunt necesare protecții complete: cască, protecție pentru piept, mănuși, protecții pentru picioare.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu taekwondo-ul?",
        answer:
          "Taekwondo-ul poate fi început de copiii de 5-6 ani, când au dezvoltat coordonare de bază. Programele pentru copiii mici se concentrează pe jocuri distractive și valori, fără contact.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=taekwondo",
      clubsLinkText: "Vezi cluburi de taekwondo verificate",
    },
  },
  {
    sportId: "scrima",
    introduction: `Scrima este un sport elegant și strategic care combină precizie, viteză și strategie într-o artă marțială rafinată. În România, scrima are o tradiție puternică și este un sport olimpic popular pentru copii, oferind dezvoltare fizică și mentală excepțională.

Pentru copiii mici, scrima începe cu jocuri distractive și exerciții de bază care se concentrează pe coordonare, echilibru și familiarizarea cu arma. Programele pentru începători folosesc arme adaptate și se concentrează pe tehnici de siguranță și mișcări fundamentale.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnici avansate, strategie de joc și competiții. Scrima dezvoltă nu doar abilități fizice, ci și concentrarea intensă, gândirea strategică și eleganța.`,
    benefits: {
      title: "Beneficii ale scrimii pentru copii",
      items: [
        {
          title: "Precizie și coordonare",
          description:
            "Scrima dezvoltă precizia excepțională, coordonarea ochi-mână și controlul fin al mișcărilor. Aceste abilități sunt valoroase pentru alte activități.",
        },
        {
          title: "Gândire strategică",
          description:
            "Scrima necesită gândire strategică profundă, anticipare și adaptare rapidă la adversar. Copiii învață să gândească strategic.",
        },
        {
          title: "Concentrare și disciplină",
          description:
            "Scrima necesită concentrare intensă și disciplină strictă. Aceste abilități mentale sunt esențiale pentru succes.",
        },
        {
          title: "Eleganță și respect",
          description:
            "Scrima promovează eleganța, respectul și eticheta. Este un sport care valorizează tradiția și respectul.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru scrimă",
      content: `Scrima poate fi începută de copiii de 6-7 ani, când au dezvoltat coordonare de bază. Programele pentru începători se concentrează pe siguranță și tehnici fundamentale.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru scrimă",
      content: `Echipamentul pentru scrimă include armura completă (mască, veste, mănuși), arma și echipament suplimentar. Echipamentul este esențial pentru siguranță.`,
      items: [
        {
          name: "Armură completă",
          description:
            "Masca, vesta și mănușile sunt esențiale pentru siguranță. Trebuie să fie certificate și potrivite corect.",
          essential: true,
        },
        {
          name: "Armă",
          description:
            "Arma (floretă, sabie sau spadă) trebuie să fie potrivită pentru vârstă și nivel. Multe cluburi oferă arme pentru începători.",
          essential: true,
        },
        {
          name: "Echipament suplimentar",
          description:
            "Tricou de scrimă, pantaloni de scrimă și alte protecții sunt necesare pentru competiții.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu scrima?",
        answer:
          "Scrima poate fi începută de copiii de 6-7 ani, când au dezvoltat coordonare de bază. Programele pentru începători folosesc arme adaptate și se concentrează pe siguranță.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=scrima",
      clubsLinkText: "Vezi cluburi de scrimă verificate",
    },
  },
  {
    sportId: "box",
    introduction: `Boxul este un sport de luptă care dezvoltă forța, viteza, coordonarea și disciplina, oferind o modalitate structurată de dezvoltare fizică și mentală. În România, boxul pentru copii este un sport în creștere, cu accent pe dezvoltare și siguranță, nu pe luptă agresivă.

Pentru copiii mici, boxul începe cu exerciții de bază, tehnici de lovire pe sac și dezvoltarea condiției fizice. Programele pentru începători se concentrează pe tehnici fundamentale, condiție fizică și valori: respect, disciplină și autocontrol.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnici avansate, sparring controlat (doar pentru copiii mai mari) și eventual competiții. Boxul dezvoltă nu doar abilități fizice, ci și disciplina mentală, respectul și încrederea în sine.`,
    benefits: {
      title: "Beneficii ale boxului pentru copii",
      items: [
        {
          title: "Forță și condiție fizică",
          description:
            "Boxul dezvoltă forța, viteza, rezistența și condiția fizică generală. Oferă un antrenament cardiovascular și de forță excelent.",
        },
        {
          title: "Coordonare și reflexe",
          description:
            "Boxul dezvoltă coordonarea ochi-mână, reflexe rapide și precizie. Aceste abilități sunt valoroase pentru alte sporturi.",
        },
        {
          title: "Disciplină și respect",
          description:
            "Boxul este fundamentat pe discipline strictă, respect pentru antrenor și colegi. Aceste valori sunt esențiale pentru dezvoltarea caracterului.",
        },
        {
          title: "Autoapărare și încredere",
          description:
            "Boxul oferă abilități de autoapărare, dar mai important, construiește încrederea în sine și învață autocontrolul.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru box",
      content: `Boxul poate fi început de copiii de 8-9 ani, când au dezvoltat coordonare și forță suficientă. Programele pentru copiii mici se concentrează pe tehnici fundamentale fără contact. Sparring-ul este introdus doar pentru copiii mai mari și întotdeauna controlat.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru box",
      content: `Echipamentul pentru box include mănuși, bandaje, cască de protecție și echipament suplimentar. Echipamentul este esențial pentru siguranță.`,
      items: [
        {
          name: "Mănuși de box",
          description:
            "Mănușile trebuie să fie potrivite pentru mărimea mâinii și nivelul. Sunt esențiale pentru protecție.",
          essential: true,
        },
        {
          name: "Bandaje pentru mâini",
          description:
            "Bandajele protejează încheieturile și articulațiile mâinilor. Sunt esențiale pentru siguranță.",
          essential: true,
        },
        {
          name: "Cască de protecție",
          description:
            "Casca este obligatorie pentru sparring și recomandată pentru antrenamente. Protejează capul.",
          essential: true,
        },
        {
          name: "Protecție dentală",
          description: "Protecția dentală este obligatorie pentru sparring.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu boxul?",
        answer:
          "Boxul poate fi început de copiii de 8-9 ani, când au dezvoltat coordonare și forță suficientă. Programele pentru copiii mici se concentrează pe tehnici fundamentale fără contact.",
      },
      {
        question: "Este boxul violent pentru copii?",
        answer:
          "Nu! Boxul pentru copii se concentrează pe dezvoltare fizică, disciplină și respect, nu pe violență. Contactul este controlat strict și permis doar în sparring-uri supervizate pentru copiii mai mari.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=box",
      clubsLinkText: "Vezi cluburi de box verificate",
    },
  },
  {
    sportId: "gimnastica-ritmica",
    introduction: `Gimnastica ritmică este un sport elegant care combină mișcarea cu muzica, dezvoltând grația, flexibilitatea și coordonarea într-o armonie perfectă. În România, gimnastica ritmică are o tradiție excepțională, cu mulți campioni olimpici, ceea ce face acest sport foarte respectat pentru copii.

Pentru copiii mici, gimnastica ritmică începe cu jocuri muzicale și exerciții de bază care se concentrează pe ritm, coordonare și familiarizarea cu aparatele (cerc, mănunchi, coardă, panglică, mingi). Programele pentru începători se concentrează pe mișcări fundamentale și expresie.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se coregrafii complexe, tehnici avansate cu aparatele și competiții. Gimnastica ritmică dezvoltă nu doar abilități fizice, ci și creativitatea, expresia artistică și grația.`,
    benefits: {
      title: "Beneficii ale gimnasticii ritmice pentru copii",
      items: [
        {
          title: "Grație și eleganță",
          description:
            "Gimnastica ritmică dezvoltă grația excepțională, eleganța mișcării și expresia artistică. Aceste abilități sunt valoroase atât în sport, cât și în viață.",
        },
        {
          title: "Flexibilitate și coordonare",
          description:
            "Gimnastica ritmică dezvoltă flexibilitatea excepțională și coordonarea între corp și aparate. Aceste abilități sunt esențiale pentru performanță.",
        },
        {
          title: "Ritm și muzicalitate",
          description:
            "Gimnastica ritmică dezvoltă simțul ritmului și capacitatea de a se mișca în armonie cu muzica. Aceste abilități sunt valoroase pentru alte activități.",
        },
        {
          title: "Creativitate și expresie",
          description:
            "Gimnastica ritmică permite copiilor să-și exprime creativitatea prin mișcare și coregrafii. Dezvoltă expresia artistică individuală.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru gimnastică ritmică",
      content: `Gimnastica ritmică poate fi începută de copiii de 4-5 ani, când au dezvoltat coordonare de bază. Programele pentru copiii mici se concentrează pe jocuri muzicale și mișcări fundamentale.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru gimnastică ritmică",
      content: `Echipamentul de bază include leotardul și aparatele (cerc, mănunchi, coardă, panglică, mingi). Majoritatea aparatelor sunt furnizate de club.`,
      items: [
        {
          name: "Leotard",
          description:
            "Leotardul este esențial, oferind libertate de mișcare și prezentare elegantă.",
          essential: true,
        },
        {
          name: "Aparate",
          description:
            "Aparatele (cerc, mănunchi, coardă, panglică, mingi) sunt de obicei furnizate de club.",
          essential: false,
        },
        {
          name: "Accesorii pentru păr",
          description:
            "Accesoriile pentru păr sunt necesare pentru a menține părul strâns și elegant.",
          essential: true,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu gimnastica ritmică?",
        answer:
          "Gimnastica ritmică poate fi începută de copiii de 4-5 ani, când au dezvoltat coordonare de bază. Programele pentru copiii mici se concentrează pe jocuri muzicale și mișcări fundamentale.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=gimnastica-ritmica",
      clubsLinkText: "Vezi cluburi de gimnastică ritmică verificate",
    },
  },
  {
    sportId: "patinaj-artistic",
    introduction: `Patinajul artistic combină sportul cu arta, dezvoltând grația, echilibrul și coordonarea pe gheață într-o performanță elegantă. În România, patinajul artistic are o tradiție puternică și este un sport olimpic popular pentru copii, oferind oportunități pentru expresie artistică și performanță tehnică.

Pentru copiii mici, patinajul artistic începe cu învățarea patinajului de bază și familiarizarea cu gheața. Programele pentru începători se concentrează pe echilibru, mișcări fundamentale și familiarizarea cu muzica și ritmul.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnici avansate de patinaj, sărituri, rotații și coregrafii. Patinajul artistic dezvoltă nu doar abilități fizice, ci și grația, expresia artistică și încrederea în sine.`,
    benefits: {
      title: "Beneficii ale patinajului artistic pentru copii",
      items: [
        {
          title: "Grație și eleganță",
          description:
            "Patinajul artistic dezvoltă grația excepțională, eleganța mișcării și expresia artistică pe gheață. Aceste abilități sunt valoroase pentru dezvoltare generală.",
        },
        {
          title: "Echilibru și coordonare",
          description:
            "Patinajul artistic dezvoltă echilibrul excepțional și coordonarea între picioare, corp și mâini. Aceste abilități sunt esențiale.",
        },
        {
          title: "Forță și flexibilitate",
          description:
            "Patinajul artistic dezvoltă forța picioarelor, mușchii core și flexibilitatea. Săriturile și rotațiile necesită forță și control.",
        },
        {
          title: "Expresie artistică",
          description:
            "Patinajul artistic permite copiilor să-și exprime creativitatea prin mișcare și coregrafii. Dezvoltă expresia artistică individuală.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru patinaj artistic",
      content: `Patinajul artistic poate fi început de copiii de 4-5 ani, când au dezvoltat coordonare de bază. Programele pentru începători se concentrează pe patinaj de bază și familiarizare cu gheața.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru patinaj artistic",
      content: `Echipamentul de bază include patine artistice, costum de antrenament și echipament de protecție pentru începători.`,
      items: [
        {
          name: "Patine artistice",
          description:
            "Patinele artistice trebuie să fie potrivite pentru mărimea piciorului și nivelul. Sunt diferite de patinele de hochei.",
          essential: true,
        },
        {
          name: "Costum de antrenament",
          description:
            "Costumul trebuie să permită libertate de mișcare și să fie potrivit pentru condițiile de gheață.",
          essential: true,
        },
        {
          name: "Echipament de protecție",
          description:
            "Protecții pentru începători pot include căști și protecții pentru genunchi.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu patinajul artistic?",
        answer:
          "Patinajul artistic poate fi început de copiii de 4-5 ani, când au dezvoltat coordonare de bază. Programele pentru începători se concentrează pe patinaj de bază.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=patinaj-artistic",
      clubsLinkText: "Vezi cluburi de patinaj artistic verificate",
    },
  },
  {
    sportId: "echitatie",
    introduction: `Echiția este un sport unic care combină sportul cu conexiunea cu animalele, oferind oportunități excelente pentru dezvoltare fizică, responsabilitate și aprecierea naturii. În România, echiția este un sport în creștere pentru copii, cu multe cluburi oferind programe specializate.

Pentru copiii mici, echiția începe cu familiarizarea cu caii, îngrijirea de bază și echitarea cu asistență. Programele pentru începători se concentrează pe siguranță, încredere și familiarizarea cu caii și echipamentul.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnici avansate de echitare, dresaj și eventual competiții. Echiția dezvoltă nu doar abilități fizice, ci și responsabilitatea, încrederea și conexiunea cu natura.`,
    benefits: {
      title: "Beneficii ale echiției pentru copii",
      items: [
        {
          title: "Responsabilitate și îngrijire",
          description:
            "Echiția învață copiii responsabilitatea prin îngrijirea calului. Aceste abilități sunt valoroase pentru viață.",
        },
        {
          title: "Echilibru și coordonare",
          description:
            "Echiția dezvoltă echilibrul excepțional și coordonarea între corp și cal. Abilitățile de echilibru sunt esențiale.",
        },
        {
          title: "Conectare cu natura",
          description:
            "Echiția permite copiilor să se conecteze cu natura și animalele, dezvoltând empatie și apreciere pentru mediu.",
        },
        {
          title: "Încredere și curaj",
          description:
            "Echiția construiește încrederea și curajul prin interacțiunea cu caii și echitarea. Copiii învață să depășească fricile.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru echiție",
      content: `Echiția poate fi începută de copiii de 6-7 ani, când au suficientă coordonare și responsabilitate de bază. Programele pentru copiii mici se concentrează pe familiarizare și siguranță cu asistență completă.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru echiție",
      content: `Echipamentul de bază include căciulă de protecție, bocanci de echitare și eventual echipament suplimentar. Majoritatea cluburilor oferă șaua și alte echipamente de bază.`,
      items: [
        {
          name: "Căciulă de protecție",
          description:
            "Căciula de protecție este obligatorie și esențială pentru siguranță. Trebuie să fie certificată.",
          essential: true,
        },
        {
          name: "Bocanci de echitare",
          description: "Bocancii de echitare oferă suport pentru picioare și siguranță în scări.",
          essential: true,
        },
        {
          name: "Echipament suplimentar",
          description:
            "Vesta de protecție și alte echipamente pot fi recomandate pentru începători.",
          essential: false,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu echiția?",
        answer:
          "Echiția poate fi începută de copiii de 6-7 ani, când au suficientă coordonare și responsabilitate. Programele pentru copiii mici se concentrează pe familiarizare și siguranță.",
      },
      {
        question: "Este echiția sigură pentru copii?",
        answer:
          "Da, echiția poate fi sigură când este practicată sub supravegherea unui instructor calificat și cu echipamentul adecvat. Cluburile verificate prioritizează siguranța și folosesc cai potriviți pentru copiii mici.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=echitatie",
      clubsLinkText: "Vezi cluburi de echiție verificate",
    },
  },
  {
    sportId: "tiro-cu-arcul",
    introduction: `Tirul cu arcul este un sport de precizie care combină concentrarea, disciplina și precizia într-o activitate captivantă. În România, tirul cu arcul este un sport în creștere pentru copii, oferind oportunități pentru dezvoltare mentală și fizică într-un mediu controlat și sigur.

Pentru copiii mici, tirul cu arcul începe cu arcuri adaptate și exerciții de bază care se concentrează pe tehnica corectă, siguranță și familiarizarea cu echipamentul. Programele pentru începători se concentrează pe postura corectă, tehnica de tragere și siguranță strictă.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnici avansate, concentrare intensă și eventual competiții. Tirul cu arcul dezvoltă nu doar abilități fizice, ci și concentrarea, disciplina mentală și precizia.`,
    benefits: {
      title: "Beneficii ale tirului cu arcul pentru copii",
      items: [
        {
          title: "Concentrare și disciplină mentală",
          description:
            "Tirul cu arcul dezvoltă concentrarea excepțională și disciplina mentală. Aceste abilități sunt valoroase pentru școală și viață.",
        },
        {
          title: "Precizie și control",
          description:
            "Tirul cu arcul dezvoltă precizia și controlul fin al mișcărilor. Aceste abilități se transferă în alte activități.",
        },
        {
          title: "Postură și forță",
          description:
            "Tirul cu arcul dezvoltă postura corectă, forța brațelor și mușchii core. Oferă dezvoltare fizică armonioasă.",
        },
        {
          title: "Responsabilitate și siguranță",
          description:
            "Tirul cu arcul învață copiii responsabilitatea și importanța siguranței. Aceste valori sunt esențiale.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru tir cu arcul",
      content: `Tirul cu arcul poate fi început de copiii de 8-9 ani, când au suficientă coordonare, forță și capacitate de a urmări reguli stricte de siguranță. Programele pentru începători se concentrează pe siguranță și tehnici fundamentale.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru tir cu arcul",
      content: `Echipamentul de bază include arcul, săgețile și echipament de protecție. Majoritatea cluburilor oferă echipament pentru începători.`,
      items: [
        {
          name: "Arc",
          description:
            "Arcul trebuie să fie potrivit pentru forța și înălțimea copilului. Pentru începători, arcurile adaptate sunt utilizate.",
          essential: true,
        },
        {
          name: "Săgeți",
          description:
            "Săgețile trebuie să fie potrivite pentru arcul și nivelul. Sunt de obicei furnizate de club.",
          essential: true,
        },
        {
          name: "Echipament de protecție",
          description:
            "Protecție pentru braț, degete și alte echipamente de siguranță sunt esențiale.",
          essential: true,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu tirul cu arcul?",
        answer:
          "Tirul cu arcul poate fi început de copiii de 8-9 ani, când au suficientă coordonare, forță și capacitate de a urmări reguli stricte de siguranță. Programele pentru începători se concentrează pe siguranță strictă.",
      },
      {
        question: "Este tirul cu arcul sigur pentru copii?",
        answer:
          "Da, tirul cu arcul este foarte sigur când este practicat sub supravegherea unui instructor calificat și cu reguli stricte de siguranță. Cluburile verificate prioritizează siguranța și folosesc arcuri adaptate pentru copii.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=tiro-cu-arcul",
      clubsLinkText: "Vezi cluburi de tir cu arcul verificate",
    },
  },
  {
    sportId: "alpinism",
    introduction: `Alpinismul este un sport de aventură care combină explorarea montană cu dezvoltare fizică și mentală, oferind oportunități unice pentru conexiune cu natura și dezvoltare personală. În România, cu Carpații disponibili, alpinismul este un sport accesibil pentru copii, cu multe cluburi oferind programe specializate.

Pentru copiii mici, alpinismul începe cu ture de drumeție și escaladare pe structuri adaptate sub supraveghere intensă. Programele pentru începători se concentrează pe siguranță, tehnici fundamentale și familiarizarea cu echipamentul și mediul montan.

Pe măsură ce copiii cresc, antrenamentele devin mai structurate, introducându-se tehnici avansate de escaladare, orientare și eventual expediții. Alpinismul dezvoltă nu doar abilități fizice, ci și încrederea, responsabilitatea și aprecierea pentru natură.`,
    benefits: {
      title: "Beneficii ale alpinismului pentru copii",
      items: [
        {
          title: "Forță și rezistență",
          description:
            "Alpinismul dezvoltă forța, rezistența și condiția fizică generală. Oferă un antrenament complet pentru întregul corp.",
        },
        {
          title: "Rezolvarea problemelor",
          description:
            "Alpinismul necesită rezolvarea problemelor și luarea deciziilor în condiții variate. Aceste abilități cognitive sunt valoroase.",
        },
        {
          title: "Conectare cu natura",
          description:
            "Alpinismul permite copiilor să exploreze natura și să dezvolte aprecierea pentru mediu montan. Oferă oportunități pentru aventură responsabilă.",
        },
        {
          title: "Responsabilitate și siguranță",
          description:
            "Alpinismul învață copiii responsabilitatea, siguranța și importanța planificării. Aceste valori sunt esențiale pentru viață.",
        },
      ],
    },
    ageRecommendations: {
      title: "Vârsta recomandată pentru alpinism",
      content: `Alpinismul poate fi început de copiii de 8-9 ani, când au suficientă coordonare, forță și responsabilitate. Programele pentru începători se concentrează pe drumeție și escaladare pe structuri adaptate, întotdeauna sub supraveghere strictă.`,
    },
    equipmentGuide: {
      title: "Echipament necesar pentru alpinism",
      content: `Echipamentul pentru alpinism include echipament de bază de drumeție, echipament de escaladare și echipament de siguranță. Investiția în echipament de calitate este esențială.`,
      items: [
        {
          name: "Încălțăminte de drumeție/escaladare",
          description:
            "Ghetele trebuie să fie potrivite pentru tipul de activitate și să ofere aderență și suport excelent.",
          essential: true,
        },
        {
          name: "Echipament de escaladare",
          description:
            "Pentru escaladare, echipament specializat (cască, ham, coardă, carabiniere) este esențial și de obicei furnizat de club.",
          essential: false,
        },
        {
          name: "Echipament de bază",
          description:
            "Rucsac, haine adaptate la vreme și echipament de siguranță sunt esențiale pentru orice activitate montană.",
          essential: true,
        },
      ],
    },
    faq: [
      {
        question: "La ce vârstă poate începe copilul meu alpinismul?",
        answer:
          "Alpinismul poate fi început de copiii de 8-9 ani, când au suficientă coordonare, forță și responsabilitate. Programele pentru începători se concentrează pe drumeție și escaladare adaptată, întotdeauna sub supraveghere strictă.",
      },
      {
        question: "Este alpinismul sigur pentru copii?",
        answer:
          "Da, alpinismul poate fi sigur când este practicat sub supravegherea unui instructor calificat, cu echipamentul adecvat și pe trasee adaptate pentru copii. Cluburile verificate prioritizează siguranța și adaptează activitățile pentru vârstă și nivel.",
      },
    ],
    internalLinks: {
      clubsLink: "/cluburi?sport=alpinism",
      clubsLinkText: "Vezi cluburi de alpinism verificate",
    },
  },
];

/**
 * Get expanded content by sport ID
 */
export function getExpandedContentBySportId(sportId: string): SportExpandedContent | undefined {
  return SPORT_EXPANDED_CONTENT.find((content) => content.sportId === sportId);
}

/**
 * Get expanded content by sport slug
 * Note: This requires matching sportId with slug from sports.ts
 */
export function getExpandedContentBySlug(slug: string): SportExpandedContent | undefined {
  // Map common slugs to sport IDs
  const slugToIdMap: Record<string, string> = {
    fotbal: "fotbal",
    inot: "inot",
    tenis: "tenis",
    baschet: "baschet",
    "gimnastica-artistica": "gimnastica-artistica",
    karate: "karate",
    dans: "dans",
    volei: "volei",
    handbal: "handbal",
    judo: "judo",
    rugby: "rugby",
    hochei: "hochei",
    "tenis-de-masa": "tenis-de-masa",
    badminton: "badminton",
    atletism: "atletism",
    ciclism: "ciclism",
    patinaj: "patinaj",
    schi: "schi",
    taekwondo: "taekwondo",
    scrima: "scrima",
    box: "box",
    "gimnastica-ritmica": "gimnastica-ritmica",
    "patinaj-artistic": "patinaj-artistic",
    echitatie: "echitatie",
    "tiro-cu-arcul": "tiro-cu-arcul",
    alpinism: "alpinism",
  };

  const sportId = slugToIdMap[slug] || slug;
  return getExpandedContentBySportId(sportId);
}

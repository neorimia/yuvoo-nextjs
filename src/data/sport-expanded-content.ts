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
  };

  const sportId = slugToIdMap[slug] || slug;
  return getExpandedContentBySportId(sportId);
}

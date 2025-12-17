/**
 * FAQ Data
 *
 * Frequently asked questions for the FAQ page.
 * All content in Romanian language for SEO purposes.
 */

export interface FAQItem {
  question: string;
  answer: string;
  category?: string; // Optional category for grouping
}

export interface FAQCategory {
  name: string;
  items: FAQItem[];
}

/**
 * FAQ categories for organized display
 */
export const faqCategories: FAQCategory[] = [
  {
    name: "Despre Platformă",
    items: [
      {
        question: "Ce este Yuvoo?",
        answer:
          "Yuvoo este o platformă AI care ajută părinții din România să găsească activitățile sportive potrivite pentru copiii lor (vârste 4-14 ani). Oferim recomandări personalizate bazate pe profilul copilului, listă de cluburi sportive verificate și acces la specialiști pediatri relevanți pentru sport.",
        category: "Despre Platformă",
      },
      {
        question: "Este Yuvoo gratuit pentru părinți?",
        answer:
          "Da. Yuvoo este 100% gratuit pentru părinți. Vrem să alegi sportul potrivit pentru copilul tău fără presiune financiară. Cluburile pot avea taxe proprii, dar platforma Yuvoo și chestionarul AI sunt complet gratuite.",
        category: "Despre Platformă",
      },
      {
        question: "Cum funcționează platforma Yuvoo?",
        answer:
          "Yuvoo conectează trei servicii principale: Chestionarul AI pentru recomandări personalizate de sporturi, Directorul de Cluburi Verificate unde găsești cluburi sportive verificate și calificate, și Rețeaua de Specialiști Pediatri pentru consultații medicale legate de sport. Toate aceste servicii sunt integrate pentru a te ajuta să alegi cel mai bun sport pentru copilul tău.",
        category: "Despre Platformă",
      },
      {
        question: "Yuvoo funcționează doar în București?",
        answer:
          "Momentan, ne concentrăm pe București și împrejurimi, dar planificăm să extindem platforma în toată România. Dacă ești dintr-un alt oraș, poți încă să folosești chestionarul AI pentru recomandări generale despre sporturi potrivite și pentru a explora informații despre diferite sporturi pentru copii.",
        category: "Despre Platformă",
      },
    ],
  },
  {
    name: "Chestionarul AI",
    items: [
      {
        question: "Cum funcționează chestionarul AI?",
        answer:
          "Chestionarul AI ia în considerare vârsta copilului, interesele, nivelul de activitate, preferințele fizice și multe alte criterii pentru a recomanda cele mai potrivite sporturi. Răspunsurile sunt analizate de un sistem AI care generează recomandări personalizate cu explicații detaliate despre de ce fiecare sport este potrivit pentru copilul tău.",
        category: "Chestionarul AI",
      },
      {
        question: "Pot repeta chestionarul AI?",
        answer:
          "Da, poți repeta chestionarul oricând. Copiii cresc, preferințele se schimbă și interesele evoluează. Este normal să explorezi diferite opțiuni sportive în timp. Toate rezultatele sunt salvate în profilul tău pentru referință, astfel încât să poți vedea evoluția recomandărilor în timp.",
        category: "Chestionarul AI",
      },
      {
        question: "Cât de precise sunt recomandările AI?",
        answer:
          "Recomandările AI sunt bazate pe analiza unui model avansat care ia în considerare mulți factori relevanți pentru dezvoltarea copiilor prin sport. Însă, recomandările sunt doar ghiduri - cel mai bun indicator este copilul tău însuși. Îți recomandăm să testezi mai multe sporturi pentru a vedea ce îi place realmente copilului tău.",
        category: "Chestionarul AI",
      },
      {
        question: "Pot folosi chestionarul fără să mă înregistrez?",
        answer:
          "Da, poți completa chestionarul AI și obține recomandări fără să te înregistrezi. Totuși, dacă te înregistrezi, poți salva rezultatele în profilul tău, să accesezi istoricul recomandărilor și să primești notificări despre cluburi și evenimente relevante.",
        category: "Chestionarul AI",
      },
    ],
  },
  {
    name: "Cluburi Sportive",
    items: [
      {
        question: "Cum verificați cluburile sportive?",
        answer:
          "Echipa noastră analizează documentele cluburilor (licențe, certificate, asigurări), vizitează locațiile, discută cu antrenorii și verifică recenziile părinților. Doar cluburile care îndeplinesc standardele noastre de siguranță și calitate primesc badge-ul de verificat. Procesul de verificare este riguros și continuu.",
        category: "Cluburi Sportive",
      },
      {
        question: "Cum pot rezerva o probă la un club?",
        answer:
          "După ce găsești un club care te interesează, poți folosi formularul de rezervare direct de pe pagina clubului. Clubul va primi cererea ta și te va contacta pentru a programa proba. Majoritatea cluburilor oferă probe gratuite sau la preț redus. Poți găsi informațiile de contact și formularul pe pagina fiecărui club.",
        category: "Cluburi Sportive",
      },
      {
        question: "Ce fac dacă nu sunt mulțumit de un club?",
        answer:
          "Îți recomandăm să discuți direct cu clubul despre preocupările tale. Dacă problema persistă, poți lăsa o recenzie constructivă pe platformă pentru a-i ajuta pe alți părinți să ia o decizie informată. Platforma Yuvoo nu este responsabilă pentru serviciile oferite de cluburi, dar monitorizăm recenziile și investigăm problemele grave raportate.",
        category: "Cluburi Sportive",
      },
      {
        question: "Toate cluburile au același preț?",
        answer:
          "Nu, prețurile variază în funcție de club, sport, program și vârstă. Fiecare club stabilește propriile tarife. Pe platformă poți vedea gama de prețuri pentru fiecare club, iar multe oferă opțiuni flexibile (abonamente lunare, ședințe individuale, pachete). Recomandăm să discuți direct cu clubul pentru detalii exacte.",
        category: "Cluburi Sportive",
      },
      {
        question: "Pot rezerva pentru mai mulți copii simultan?",
        answer:
          "Da, majoritatea cluburilor acceptă rezervări pentru mai mulți copii din aceeași familie. Poți completa formulare separate pentru fiecare copil sau contacta direct clubul pentru a programa antrenamente pentru toți copiii dintr-o singură cerere. Multe cluburi oferă și reduceri pentru familiile cu mai mulți copii înscriși.",
        category: "Cluburi Sportive",
      },
    ],
  },
  {
    name: "Specialiști Pediatri",
    items: [
      {
        question: "Cum pot contacta un specialist pediatru?",
        answer:
          "Pe pagina fiecărui specialist pediatru găsești informațiile de contact și formularul de programare. Mulți specialiști oferă consultații online și offline. Poți rezerva direct prin platformă sau să contactezi direct cabinetul medical. Informațiile despre disponibilitate, prețuri și tipuri de consultații sunt disponibile pe profilul fiecărui specialist.",
        category: "Specialiști Pediatri",
      },
      {
        question: "Ce tipuri de specialiști găsesc pe Yuvoo?",
        answer:
          "Pe Yuvoo găsești specialiști pediatri verificați din următoarele domenii: ortopedie pediatrică (pentru probleme musculo-scheletale legate de sport), nutriție pediatrică (pentru alimentație optimă pentru copii activi), psihologie pediatrică (pentru aspecte mentale și comportamentale) și medicină pediatrică generală (pentru evaluări generale de sănătate legate de sport).",
        category: "Specialiști Pediatri",
      },
      {
        question: "Pot consulta un specialist online?",
        answer:
          "Da, mulți specialiști pediatri de pe platformă oferă consultații online pentru comoditatea ta și a copilului tău. Consultațiile online sunt ideale pentru consultații inițiale, urmărire, sau pentru părinții care nu pot ajunge fizic la cabinet. Verifică pe profilul fiecărui specialist dacă oferă consultații online.",
        category: "Specialiști Pediatri",
      },
      {
        question: "De ce ar trebui să consult un specialist înainte de a alege un sport?",
        answer:
          "Consultarea unui specialist pediatric înainte de a alege un sport poate identifica eventuale limitări fizice, probleme de sănătate, sau nevoi speciale care ar putea influența alegerea sportului. De asemenea, specialiștii pot oferi recomandări personalizate pentru sporturi potrivite și ghidare pentru prevenirea leziunilor.",
        category: "Specialiști Pediatri",
      },
    ],
  },
  {
    name: "Siguranță și Confidențialitate",
    items: [
      {
        question: "Datele copilului meu sunt în siguranță?",
        answer:
          "Absolut. Respectăm strict GDPR și protejăm datele personale. Nu partajăm informații sensibile cu terți și nu publicăm date personale. Toate datele sunt criptate și stocate în siguranță. Poți șterge contul și datele oricând din setările contului. Pentru mai multe detalii, consultă politica noastră de confidențialitate.",
        category: "Siguranță și Confidențialitate",
      },
      {
        question: "Ce date sunt necesare pentru a folosi platforma?",
        answer:
          "Pentru a folosi chestionarul AI, ai nevoie doar de informații de bază despre copil (vârstă, interese). Pentru a crea un cont și a beneficia de toate funcțiile, vei completa nume, email și date despre copil. Nu solicităm informații financiare sau date medicale detaliate. Toate datele sunt opționale și poți controla ce informații partajezi.",
        category: "Siguranță și Confidențialitate",
      },
      {
        question: "Cum pot șterge datele mele?",
        answer:
          "Poți șterge datele tale oricând din setările contului. Odată șterse, toate datele personale vor fi eliminate permanent din sistemul nostru în conformitate cu GDPR. Reține că unele date pot fi păstrate pentru scopuri legale (ex: tranzacții, conformitate) conform legislației în vigoare.",
        category: "Siguranță și Confidențialitate",
      },
    ],
  },
  {
    name: "Cont și Profil",
    items: [
      {
        question: "Cum creez un cont pe Yuvoo?",
        answer:
          "Poți crea un cont rapid folosind adresa ta de email și o parolă sigură. Procesul este simplu și gratuit. După înregistrare, vei primi un email de confirmare. Odată confirmat, poți completa profilul copilului tău și începe să folosești toate funcțiile platformei, inclusiv salvarea recomandărilor AI și rezervarea probelor la cluburi.",
        category: "Cont și Profil",
      },
      {
        question: "Pot adăuga mai mulți copii în profil?",
        answer:
          "Da, poți adăuga mai mulți copii în profilul tău. Fiecare copil poate avea propriul profil cu recomandări AI personalizate, istoricul quiz-urilor și lista de cluburi favorite. Acest lucru te ajută să gestionezi mai ușor activitățile sportive pentru toți copiii din familie dintr-un singur cont.",
        category: "Cont și Profil",
      },
      {
        question: "Pot schimba informațiile din profil?",
        answer:
          "Da, poți actualiza oricând informațiile din profil, inclusiv datele copilului, preferințele și setările de notificare. Modificările se salvează automat și vei vedea recomandări actualizate dacă schimbi informații relevante pentru chestionarul AI.",
        category: "Cont și Profil",
      },
    ],
  },
  {
    name: "Parteneri și Verificare",
    items: [
      {
        question: "Cluburile plătesc să fie pe Yuvoo?",
        answer:
          "Cluburile verificate pot avea abonamente opționale pentru funcții avansate (promovare, statistici, funcții premium), dar lista de bază pe Yuvoo este gratuită pentru cluburi verificate. Prioritatea noastră este să oferim părinților o listă credibilă și verificată de opțiuni sportive, nu să monetizăm prin listări obligatorii.",
        category: "Parteneri și Verificare",
      },
      {
        question: "Cum pot deveni partener (club sau doctor)?",
        answer:
          "Cluburile și doctorii pot aplica pentru verificare prin platformă. Procesul include verificarea documentelor, vizita la locație (pentru cluburi) și interviu. După aprobare, vei primi badge-ul de verificat și vei apărea în rezultatele de căutare relevante. Pentru mai multe informații, poți contacta echipa noastră prin formularul de contact.",
        category: "Parteneri și Verificare",
      },
      {
        question: "Cât durează procesul de verificare?",
        answer:
          "Procesul de verificare pentru cluburi și doctori durează de obicei 1-2 săptămâni, în funcție de complexitatea documentației și disponibilitatea pentru verificare fizică. Echipă noastră te va ține la curent cu progresul verificării prin email. În cazul în care sunt necesare informații suplimentare, te vom contacta direct.",
        category: "Parteneri și Verificare",
      },
    ],
  },
];

/**
 * Main FAQ items for the FAQ page (flattened list for schema compatibility)
 * These will be used for FAQPage schema and can be used for display
 */
export const faqItems: FAQItem[] = faqCategories.flatMap((category) =>
  category.items.map((item) => ({ ...item, category: category.name }))
);

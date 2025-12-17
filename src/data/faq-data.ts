/**
 * FAQ Data
 *
 * Frequently asked questions for the FAQ page.
 * All content in Romanian language for SEO purposes.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Main FAQ items for the FAQ page
 * These will be used for FAQPage schema and displayed on the FAQ page
 */
export const faqItems: FAQItem[] = [
  {
    question: "Ce este Yuvoo?",
    answer:
      "Yuvoo este o platformă AI care ajută părinții din România să găsească activitățile sportive potrivite pentru copiii lor (vârste 4-14 ani). Oferim recomandări personalizate bazate pe profilul copilului, listă de cluburi sportive verificate și acces la specialiști pediatri relevanți pentru sport.",
  },
  {
    question: "Este Yuvoo gratuit pentru părinți?",
    answer:
      "Da. Yuvoo este 100% gratuit pentru părinți. Vrem să alegi sportul potrivit pentru copilul tău fără presiune financiară. Cluburile pot avea taxe proprii, dar platforma Yuvoo și chestionarul AI sunt complet gratuite.",
  },
  {
    question: "Cum funcționează chestionarul AI?",
    answer:
      "Chestionarul AI ia în considerare vârsta copilului, interesele, nivelul de activitate, preferințele fizice și multe alte criterii pentru a recomanda cele mai potrivite sporturi. Răspunsurile sunt analizate de un sistem AI care generează recomandări personalizate cu explicații detaliate.",
  },
  {
    question: "Cum verificați cluburile sportive?",
    answer:
      "Echipa noastră analizează documentele cluburilor (licențe, certificate, asigurări), vizitează locațiile, discută cu antrenorii și verifică recenziile părinților. Doar cluburile care îndeplinesc standardele noastre de siguranță și calitate primește badge-ul de verificat.",
  },
  {
    question: "Datele copilului meu sunt în siguranță?",
    answer:
      "Absolut. Respectăm strict GDPR și protejăm datele personale. Nu partajăm informații sensibile cu terți și nu publicăm date personale. Toate datele sunt criptate și stocate în siguranță. Poți șterge contul și datele oricând.",
  },
  {
    question: "Pot repeta chestionarul AI?",
    answer:
      "Da, poți repeta chestionarul oricând. Copiii cresc, preferințele se schimbă și interesele evoluează. Este normal să explorezi diferite opțiuni sportive în timp. Toate rezultatele sunt salvate în profilul tău pentru referință.",
  },
  {
    question: "Cum pot rezerva o probă la un club?",
    answer:
      "După ce găsești un club care te interesează, poți folosi formularul de rezervare direct de pe pagina clubului. Clubul va primi cererea ta și te va contacta pentru a programa proba. Majoritatea cluburilor oferă probe gratuite sau la preț redus.",
  },
  {
    question: "Ce fac dacă nu sunt mulțumit de un club?",
    answer:
      "Îți recomandăm să discuți direct cu clubul despre preocupările tale. Dacă problema persistă, poți lăsa o recenzie constructivă pe platformă pentru a-i ajuta pe alți părinți să ia o decizie informată. Platforma Yuvoo nu este responsabilă pentru serviciile oferite de cluburi.",
  },
  {
    question: "Yuvoo funcționează doar în București?",
    answer:
      "Momentan, ne concentrăm pe București și împrejurimi, dar planificăm să extindem platforma în toată România. Dacă ești dintr-un alt oraș, poți încă să folosești chestionarul AI pentru recomandări generale despre sporturi potrivite.",
  },
  {
    question: "Cum pot contacta un specialist pediatru?",
    answer:
      "Pe pagina fiecărui specialist pediatru găsești informații de contact și formularul de programare. Mulți specialiști oferă consultații online și offline. Poți rezerva direct prin platformă sau să contactezi direct cabinetul medical.",
  },
  {
    question: "Cluburile plătesc să fie pe Yuvoo?",
    answer:
      "Cluburile verificare pot avea abonamente opționale pentru funcții avansate (promovare, statistici), dar lista de bază pe Yuvoo este gratuită pentru cluburi verificate. Prioritatea este să oferim părinților o listă credibilă și verificată de opțiuni sportive.",
  },
  {
    question: "Cum pot deveni partener (club sau doctor)?",
    answer:
      "Cluburile și doctorii pot aplica pentru verificare prin platformă. Procesul include verificarea documentelor, vizita la locație (pentru cluburi) și interviu. După aprobare, vei primi badge-ul de verificat și vei apărea în rezultatele de căutare relevante.",
  },
];

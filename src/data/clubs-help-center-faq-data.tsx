/**
 * Clubs Help Center FAQ Data
 *
 * Expanded FAQ data organized by categories for the Help Center page.
 * All content in Romanian language for SEO purposes.
 */

export type FAQCategory =
  | "pricing"
  | "verification"
  | "leads"
  | "platform"
  | "technical"
  | "billing";

export interface HelpCenterFAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

/**
 * FAQ items organized by category
 */
export const helpCenterFaqItems: HelpCenterFAQItem[] = [
  // Pricing & Plans
  {
    id: "pricing1",
    category: "pricing",
    question: "Cât costă după cele 6 luni gratuite?",
    answer:
      "Dacă Yuvoo îți aduce părinți potriviți, vei putea continua cu un abonament clar și transparent (începând de la 99,99 RON/lună). Dacă nu funcționează → nu plătești nimic.",
  },
  {
    id: "pricing2",
    category: "pricing",
    question: "Ce se întâmplă dacă nu sunt eligibil pentru Founding Club?",
    answer:
      "Dacă nu mai sunt locuri disponibile în programul Founding Club sau nu îndeplinești criteriile de eligibilitate, poți upgrade direct la Premium (99,99 RON/lună sau 999,99 RON/an). Premium oferă badge verificat, afișare prioritară și profil evidențiat. Contactul cu părinții rămâne gratuit pentru toate cluburile.",
  },
  {
    id: "pricing3",
    category: "pricing",
    question: "Cât ROI pot obține cu Yuvoo vs. Google/Facebook ads?",
    answer:
      "Cu Yuvoo Premium (99,99 RON/lună), primești cereri pre-calificate de la părinți care au completat quiz-ul AI. Contactul este gratuit — Premium îți oferă vizibilitate sporită (badge, listare prioritară). Comparativ cu Google/Facebook ads unde plătești sute de lei pentru lead-uri necalificate, Yuvoo oferă o conversie mult mai mare.",
  },
  {
    id: "pricing4",
    category: "pricing",
    question: "Pot anula oricând?",
    answer:
      "Da. Nu există contracte sau obligații pe termen lung. Poți anula oricând, fără penalități. În perioada gratuită de 6 luni, nu există nicio obligație financiară. După aceea, poți anula abonamentul oricând cu o notificare simplă.",
  },

  // Verification Process
  {
    id: "verification1",
    category: "verification",
    question: "Cum funcționează procesul de verificare?",
    answer:
      "Procesul de verificare include confirmarea identității legale, verificarea calificărilor antrenorilor și a protocolurilor de siguranță. În call-ul de 15 minute, configurăm împreună profilul complet. Verificarea finală durează 1-2 săptămâni, iar echipa noastră te ține la curent cu progresul.",
  },
  {
    id: "verification2",
    category: "verification",
    question: "Cât durează procesul de verificare?",
    answer:
      "Procesul complet de verificare durează 1-2 săptămâni. În call-ul inițial de 15 minute, configurăm împreună profilul complet. Apoi echipa noastră verifică toate aspectele (identitate legală, instalații, calificări antrenori, protocoale de siguranță) și te ține la curent cu progresul.",
  },
  {
    id: "verification3",
    category: "verification",
    question: "Pot actualiza profilul meu după ce este creat?",
    answer:
      "Da, poți actualiza oricând informațiile din profil: programe, prețuri, fotografiile, descrierile. Profilul tău este complet personalizabil și poți face modificări oricând ai nevoie, fără costuri suplimentare.",
  },

  // Lead System
  {
    id: "leads1",
    category: "leads",
    question: "Ce se întâmplă dacă nu primesc lead-uri?",
    answer:
      "Dacă după cele 6 luni gratuite nu primești lead-uri potrivite, nu plătești nimic. Nu există obligații sau contracte. Programul este complet fără risc pentru tine. Analizăm împreună ce s-a întâmplat și ajustăm strategia dacă este necesar.",
  },
  {
    id: "leads2",
    category: "leads",
    question: "Câte lead-uri pot primi în medie pe lună?",
    answer:
      "Numărul de cereri depinde de mai mulți factori: sportul tău, locația, vârsta copiilor și cât de complet este profilul tău. Cluburile noastre Founding au primit în medie 5-15 cereri pe lună în primele 3 luni. Contactul cu părinții este gratuit — primești datele de contact imediat în email și dashboard.",
  },
  {
    id: "leads3",
    category: "leads",
    question: "Cum primesc mesajele de la părinți?",
    answer:
      "Primești notificări prin email când un părinte te contactează prin platformă. Poți răspunde direct din email sau să te conectezi pe platformă pentru a gestiona toate mesajele și cererile într-un singur loc. Nu trebuie să verifici zilnic platforma.",
  },
  {
    id: "leads4",
    category: "leads",
    question: "Ce informații primesc despre fiecare lead?",
    answer:
      "Pentru fiecare lead primești: numele părinților, numele copilului, vârsta copilului, sportul recomandat, motivul recomandării, locația, și date de contact. Toate informațiile necesare pentru a răspunde eficient.",
  },
  {
    id: "leads5",
    category: "leads",
    question: "Ce se întâmplă dacă un lead expiră?",
    answer:
      "Lead-urile expiră după 5 zile dacă nu sunt acceptate. După expirare, lead-ul nu mai este disponibil. Pentru a evita expirarea, verifică dashboard-ul zilnic sau activează notificările pe email.",
  },

  // Platform Features
  {
    id: "platform1",
    category: "platform",
    question: "Trebuie să intru zilnic pe platformă?",
    answer:
      "Nu. Primești notificări când un părinte te contactează. Yuvoo este un canal suplimentar, nu o obligație. Poți gestiona mesajele și cererile când ai timp, direct din email sau din platformă.",
  },
  {
    id: "platform2",
    category: "platform",
    question: "De ce este diferit de Google/Facebook?",
    answer:
      "Google & Facebook aduc căutări. Yuvoo aduce potrivire. Părinții care te contactează prin Yuvoo au deja completat un quiz AI și știu că sportul tău este potrivit pentru copilul lor. Nu mai primești mesaje de la părinți care nu sunt siguri sau care nu se potrivesc cu vârsta și nivelul copilului.",
  },
  {
    id: "platform3",
    category: "platform",
    question: "Cum funcționează algoritmul de matching?",
    answer:
      "Algoritmul nostru AI analizează răspunsurile părinților din quiz și le compară cu caracteristicile sporturilor și cerințele cluburilor. Sistemul filtrează automat cluburile care nu acceptă vârsta copilului sau nu oferă sportul recomandat, astfel încât părintele vede doar opțiuni relevante.",
  },

  // Technical Support
  {
    id: "technical1",
    category: "technical",
    question: "Cum pot contacta suportul tehnic?",
    answer:
      "Poți contacta echipa noastră de suport prin email la contact@yuvoo.ro sau prin telefon la +40 746 385 038. Răspundem în maxim 24 de ore în zilele lucrătoare.",
  },
  {
    id: "technical2",
    category: "technical",
    question: "Ce browser-uri sunt suportate?",
    answer:
      "Platforma Yuvoo funcționează pe toate browser-urile moderne: Chrome, Firefox, Safari, Edge. Recomandăm să folosești versiunea cea mai recentă pentru cea mai bună experiență.",
  },

  // Billing & Payments
  {
    id: "billing1",
    category: "billing",
    question: "Cum funcționează sistemul de plată?",
    answer:
      "Contactul cu părinții este gratuit. Premium (99,99 RON/lună sau 999,99 RON/an) oferă vizibilitate sporită: badge verificat, afișare prioritară și profil evidențiat. Toate plățile Premium sunt procesate securizat prin Stripe.",
  },
  {
    id: "billing2",
    category: "billing",
    question: "Ce metode de plată acceptați?",
    answer:
      "Acceptăm toate cardurile de credit/debit prin Stripe: Visa, Mastercard, American Express. Plățile sunt procesate securizat și nu stocăm datele cardului tău.",
  },
  {
    id: "billing3",
    category: "billing",
    question: "Când începe Premium?",
    answer:
      "Premium devine activ imediat după plata. Vei primi toate beneficii Premium instant, inclusiv badge-ul și afișarea prioritară. Abonamentul se reînnoiește automat lunar sau anual, în funcție de planul ales.",
  },
];

/**
 * Category labels and descriptions
 */
export const faqCategories: Record<FAQCategory, { label: string; description: string }> = {
  pricing: {
    label: "Prețuri & Planuri",
    description: "Întrebări despre costuri, planuri și opțiuni de plată",
  },
  verification: {
    label: "Proces de Verificare",
    description: "Cum funcționează verificarea și actualizarea profilului",
  },
  leads: {
    label: "Sistem de Lead-uri",
    description: "Cum primești și gestionezi lead-urile de la părinți",
  },
  platform: {
    label: "Platformă & Funcționalități",
    description: "Caracteristici platformă și diferențe față de alte soluții",
  },
  technical: {
    label: "Suport Tehnic",
    description: "Ajutor tehnic și întrebări despre platformă",
  },
  billing: {
    label: "Facturare & Plăți",
    description: "Metode de plată, facturare și abonamente",
  },
};

/**
 * Helper functions
 */
export function getFaqsByCategory(category: FAQCategory): HelpCenterFAQItem[] {
  return helpCenterFaqItems.filter((faq) => faq.category === category);
}

export function getAllCategories(): FAQCategory[] {
  return Object.keys(faqCategories) as FAQCategory[];
}

export function searchFaqs(query: string): HelpCenterFAQItem[] {
  const lowerQuery = query.toLowerCase();
  return helpCenterFaqItems.filter(
    (faq) =>
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery)
  );
}

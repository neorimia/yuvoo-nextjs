/**
 * Doctors Landing FAQ Data
 *
 * Frequently asked questions for the doctors landing page (/pentru-doctori).
 * All content in Romanian language for SEO purposes.
 * Answers can be strings or React.ReactNode for internal links.
 */

import { FAQItem } from "./faq-data";

/**
 * FAQ items for the doctors landing page
 */
export const doctorsFaqItems: FAQItem[] = [
  {
    question: "Este Yuvoo o platformă comercială?",
    answer:
      "Yuvoo este o platformă de ghidare pentru părinți, nu un marketplace medical. Conectăm familiile cu specialiști pediatrici verificați, cu control editorial și prezentare profesională — fără promovare agresivă sau vânzare de pacienți.",
  },
  {
    question: "Sunt obligat să accept consultații prin platformă?",
    answer:
      "Nu. Yuvoo este un instrument de conectare și vizibilitate. Tu controlezi complet disponibilitatea și modul în care primești pacienți. Platforma nu te obligă la nicio formă de consultație specifică.",
  },
  {
    question: "Există costuri?",
    answer:
      "În MVP, nu. Orice schimbare viitoare va fi comunicată transparent și cu mult timp în avans.",
  },
  {
    question: "Pot renunța oricând?",
    answer: "Da. Profilul poate fi retras oricând, fără explicații sau costuri suplimentare.",
  },
  {
    question: "Cum este protejată reputația mea?",
    answer:
      "Prin verificare manuală a tuturor specialiștilor, control editorial al conținutului și prezentare profesională fără exagerări comerciale. Yuvoo menține un standard înalt pentru a proteja încrederea părinților și reputația partenerilor noștri.",
  },
];

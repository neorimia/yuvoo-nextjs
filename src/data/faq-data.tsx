/**
 * FAQ Data
 *
 * Frequently asked questions for the FAQ page.
 * All content in Romanian language for SEO purposes.
 * Answers can be strings or React.ReactNode for internal links.
 */

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
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
        answer: (
          <>
            Yuvoo este o platformă AI care ajută părinții din România să găsească activitățile
            sportive potrivite pentru copiii lor (vârste 4-14 ani). Oferim{" "}
            <Link href={routes.quiz.intro} className="text-yuvoo-primary">
              recomandări personalizate bazate pe profilul copilului
            </Link>
            ,{" "}
            <Link href={routes.clubs.list} className="text-yuvoo-primary">
              director de cluburi sportive verificate
            </Link>
            , și{" "}
            <Link href={routes.doctors.list} className="text-yuvoo-primary">
              acces la specialiști pediatri relevanți pentru sport
            </Link>
            .
          </>
        ),
        category: "Despre Platformă",
      },
      {
        question: "Este Yuvoo gratuit pentru părinți?",
        answer:
          "Da. Platforma Yuvoo este gratuită pentru părinți: contul, descoperirea cluburilor și a specialiștilor, și chestionarul AI (cu previzualizare gratuită). Singura opțiune plătită este raportul complet al quiz-ului (39 lei, plată unică), opțional. Cluburile și specialiștii pot avea taxe proprii; noi vrem să alegi sportul potrivit fără presiune financiară.",
        category: "Despre Platformă",
      },
      {
        question: "Cum funcționează platforma Yuvoo?",
        answer: (
          <>
            Yuvoo conectează trei servicii principale:{" "}
            <Link href={routes.quiz.intro} className="text-yuvoo-primary">
              Chestionarul AI
            </Link>{" "}
            pentru recomandări personalizate de sporturi,{" "}
            <Link href={routes.clubs.list} className="text-yuvoo-primary">
              Directorul de Cluburi
            </Link>{" "}
            unde găsești cluburi sportive verificate, și{" "}
            <Link href={routes.doctors.list} className="text-yuvoo-primary">
              Rețeaua de Specialiști Pediatri
            </Link>{" "}
            pentru consultații medicale legate de sport. Toate aceste servicii sunt integrate pentru
            a te ajuta să alegi cel mai bun sport pentru copilul tău.
          </>
        ),
        category: "Despre Platformă",
      },
      {
        question: "Yuvoo funcționează doar în București?",
        answer:
          "Nu. Yuvoo este activ în toate orașele din România. Poți folosi chestionarul AI, descoperi cluburi și specialiști pediatri indiferent de localitatea ta. Căutarea și filtrele te ajută să găsești opțiuni în orașul tău sau în apropiere.",
        category: "Despre Platformă",
      },
    ],
  },
  {
    name: "Chestionarul AI",
    items: [
      {
        question: "Cum funcționează chestionarul AI?",
        answer: (
          <>
            <Link href={routes.quiz.intro} className="text-yuvoo-primary">
              Chestionarul AI
            </Link>{" "}
            ia în considerare vârsta copilului, interesele, nivelul de activitate, preferințele
            fizice și criterii de sănătate pentru a recomanda cele mai potrivite sporturi. După ce
            răspunzi la întrebări, primești o previzualizare gratuită; poți apoi să accesezi
            raportul complet (recomandări detaliate, explicații și link permanent) prin plata unică
            (39 lei).{" "}
            <Link href={routes.sports.list} className="text-yuvoo-primary">
              Explorează toate sporturile
            </Link>{" "}
            pentru a înțelege mai bine opțiunile.
          </>
        ),
        category: "Chestionarul AI",
      },
      {
        question: "Pot repeta chestionarul AI?",
        answer: (
          <>
            Da, poți repeta{" "}
            <Link href={routes.quiz.intro} className="text-yuvoo-primary">
              chestionarul AI
            </Link>{" "}
            oricând. Copiii cresc, preferințele se schimbă și interesele evoluează. Este normal să
            explorezi diferite opțiuni sportive în timp. Toate rezultatele sunt salvate în profilul
            tău pentru referință, astfel încât să poți vedea evoluția recomandărilor în timp.
          </>
        ),
        category: "Chestionarul AI",
      },
      {
        question: "Cât de precise sunt recomandările AI?",
        answer: (
          <>
            Recomandările AI sunt bazate pe analiza unui model avansat care ia în considerare mulți
            factori relevanți pentru dezvoltarea copiilor prin sport. Însă, recomandările sunt doar
            ghiduri - cel mai bun indicator este copilul tău însuși. Îți recomandăm să testezi mai
            multe{" "}
            <Link href={routes.sports.list} className="text-yuvoo-primary">
              sporturi
            </Link>{" "}
            pentru a vedea ce îi place realmente copilului tău și să explorezi{" "}
            <Link href={routes.clubs.list} className="text-yuvoo-primary">
              cluburi
            </Link>{" "}
            care oferă aceste sporturi.
          </>
        ),
        category: "Chestionarul AI",
      },
      {
        question: "Pot folosi chestionarul fără să mă înregistrez?",
        answer: (
          <>
            Da, poți completa{" "}
            <Link href={routes.quiz.intro} className="text-yuvoo-primary">
              chestionarul AI
            </Link>{" "}
            fără cont și vei primi o previzualizare a recomandărilor. Raportul complet (recomandări
            detaliate, explicații și link de acces persistent) necesită plată unică (39 lei). Te
            poți{" "}
            <Link href={routes.register} className="text-yuvoo-primary">
              înregistra
            </Link>{" "}
            gratuit pentru a salva rezultatele în profil, istoricul quiz-urilor și notificări despre
            cluburi și evenimente; raportul complet rămâne plătit.
          </>
        ),
        category: "Chestionarul AI",
      },
      {
        question: "Ce include raportul complet al quiz-ului și cât costă?",
        answer: (
          <>
            Raportul complet include recomandările AI detaliate, explicațiile pentru fiecare sport,
            beneficii și considerații, plus link de acces persistent (poți reveni oricând la
            rezultate). Costă 39 lei (plată unică). După plată primești email cu link către raport;
            nu expiră. Raportul complet nu este gratuit nici cu cont: contul gratuit îți permite să
            salvezi rezultatele și istoricul quiz-urilor; accesul la raportul complet necesită
            plată.
          </>
        ),
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
          "Echipa noastră analizează documentele cluburilor (licențe, certificate, asigurări), discută cu antrenorii și verifică recenziile părinților. Doar cluburile care îndeplinesc standardele noastre de siguranță și calitate primesc badge-ul de verificat. Procesul de verificare este riguros și continuu.",
        category: "Cluburi Sportive",
      },
      {
        question: "Cum pot rezerva o probă la un club?",
        answer: (
          <>
            După ce{" "}
            <Link href={routes.clubs.list} className="text-yuvoo-primary">
              găsești un club care te interesează
            </Link>
            , poți folosi formularul de rezervare direct de pe pagina clubului. Clubul va primi
            cererea ta și te va contacta pentru a programa proba. Majoritatea cluburilor oferă probe
            gratuite sau la preț redus. Poți găsi informațiile de contact și formularul pe pagina
            fiecărui club.
          </>
        ),
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
        answer: (
          <>
            Dacă{" "}
            <Link href={routes.quiz.intro} className="text-yuvoo-primary">
              recomandările AI indică nevoia de consultare medicală
            </Link>
            , vei vedea o listă de{" "}
            <Link href={routes.doctors.list} className="text-yuvoo-primary">
              specialiști pediatri recomandați
            </Link>{" "}
            pe pagina de rezultate a quiz-ului. Pe pagina fiecărui specialist pediatru găsești
            informațiile de contact și formularul de programare. Mulți specialiști oferă consultații
            online și offline. Poți rezerva direct prin platformă sau să contactezi direct cabinetul
            medical. Informațiile despre disponibilitate, prețuri și tipuri de consultații sunt
            disponibile pe profilul fiecărui specialist.
          </>
        ),
        category: "Specialiști Pediatri",
      },
      {
        question: "Ce tipuri de specialiști găsesc pe Yuvoo?",
        answer:
          "Pe Yuvoo găsești specialiști pediatri verificați din următoarele domenii: ortopedie pediatrică (pentru probleme musculo-scheletale legate de sport), nutriție pediatrică (pentru alimentație optimă pentru copii activi), psihologie pediatrică (pentru aspecte mentale și comportamentale) și medicină pediatrică generală (pentru evaluări generale de sănătate legate de sport).",
        category: "Specialiști Pediatri",
      },
      {
        question: "Pot rezerva o consultație direct din platformă?",
        answer: (
          <>
            Da. Pe{" "}
            <Link href={routes.doctors.list} className="text-yuvoo-primary">
              pagina fiecărui specialist
            </Link>{" "}
            poți vedea disponibilitatea și rezerva direct o consultație. Cererea ajunge la
            specialist, care te va contacta pentru confirmare. Mulți specialiști oferă și
            consultații online — verifică pe profil dacă sunt disponibile.
          </>
        ),
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
        answer: (
          <>
            Absolut. Respectăm strict GDPR și protejăm datele personale. Nu partajăm informații
            sensibile cu terți și nu publicăm date personale. Toate datele sunt criptate și stocate
            în siguranță. Poți șterge contul și datele oricând din setările contului. Pentru mai
            multe detalii, consultă{" "}
            <Link href={routes.privacy} className="text-yuvoo-primary">
              politica noastră de confidențialitate
            </Link>{" "}
            și{" "}
            <Link href={routes.gdpr} className="text-yuvoo-primary">
              ghidul GDPR pentru părinți
            </Link>
            .
          </>
        ),
        category: "Siguranță și Confidențialitate",
      },
      {
        question: "Ce date sunt necesare pentru a folosi platforma?",
        answer: (
          <>
            Pentru a folosi{" "}
            <Link href={routes.quiz.intro} className="text-yuvoo-primary">
              chestionarul AI
            </Link>
            , ai nevoie doar de informații de bază despre copil (vârstă, interese). Pentru a{" "}
            <Link href={routes.register} className="text-yuvoo-primary">
              crea un cont
            </Link>{" "}
            și a beneficia de toate funcțiile, vei completa nume, email și date despre copil. Nu
            solicităm informații financiare sau date medicale detaliate. Toate datele sunt opționale
            și poți controla ce informații partajezi.
          </>
        ),
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
        answer: (
          <>
            Poți{" "}
            <Link href={routes.register} className="text-yuvoo-primary">
              crea un cont rapid
            </Link>{" "}
            folosind adresa ta de email și o parolă sigură. Procesul este simplu și gratuit. După
            confirmarea emailului poți completa profilul copilului și folosi toate funcțiile:
            salvarea recomandărilor AI, rezervarea probelor la{" "}
            <Link href={routes.clubs.list} className="text-yuvoo-primary">
              cluburi
            </Link>
            , programarea consultațiilor la{" "}
            <Link href={routes.doctors.list} className="text-yuvoo-primary">
              specialiști
            </Link>
            , favorite și dashboard personalizat.
          </>
        ),
        category: "Cont și Profil",
      },
      {
        question: "Pot adăuga mai mulți copii în profil?",
        answer: (
          <>
            Da, poți adăuga mai mulți copii în profilul tău. Fiecare copil poate avea propriul
            profil cu{" "}
            <Link href={routes.quiz.intro} className="text-yuvoo-primary">
              recomandări AI personalizate
            </Link>
            , istoricul quiz-urilor,{" "}
            <Link href={routes.clubs.list} className="text-yuvoo-primary">
              cluburi favorite
            </Link>{" "}
            și{" "}
            <Link href={routes.doctors.list} className="text-yuvoo-primary">
              specialiști salvați
            </Link>
            . Din dashboard poți gestiona toate activitățile sportive și programările pentru toți
            copiii din familie dintr-un singur cont.
          </>
        ),
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
        answer: (
          <>
            În perioada{" "}
            <Link href={routes.clubs.landing} className="text-yuvoo-primary">
              programului Founding Club
            </Link>
            , primele 15 cluburi din fiecare oraș primesc profil complet gratuit pentru 6 luni
            (valoare €180). După aceea, dacă Yuvoo îți aduce părinți potriviți, vei putea continua
            cu un abonament clar și transparent (începând de la 99 lei/lună). Dacă nu funcționează →
            nu plătești nimic. Nu există obligații sau contracte pe termen lung.
          </>
        ),
        category: "Parteneri și Verificare",
      },
      {
        question: "Cum pot deveni partener (club sau doctor)?",
        answer: (
          <>
            Cluburile pot aplica pentru{" "}
            <Link href={routes.clubs.landing} className="text-yuvoo-primary">
              programul Founding Club gratuit
            </Link>
            . Specialiștii pediatri pot aplica pentru{" "}
            <Link href={routes.doctors.landing} className="text-yuvoo-primary">
              programul Expert Pediatric Verificat
            </Link>
            . Procesul include un call scurt pentru configurarea profilului, verificarea
            documentelor (identitate legală, calificări, protocoluri) și verificarea finală (1-2
            săptămâni). După aprobare, vei primi badge-ul de verificat și vei apărea în rezultatele
            relevante. Pentru detalii,{" "}
            <Link href={routes.contact} className="text-yuvoo-primary">
              contactează echipa Yuvoo
            </Link>
            .
          </>
        ),
        category: "Parteneri și Verificare",
      },
      {
        question: "Cum pot deveni Expert Pediatric Verificat?",
        answer: (
          <>
            Medici pediatri, ortopezi pediatrici, nutriționiști și psihologi copii pot aplica pe{" "}
            <Link href={routes.doctors.landing} className="text-yuvoo-primary">
              Pentru Doctori
            </Link>
            . Yuvoo nu este marketplace medical: oferim un strat de validare pentru părinți care
            aleg sportul potrivit. Procesul include verificarea calificărilor și un profil public
            optimizat. Nu există promovare agresivă; controlul editorial rămâne la tine.{" "}
            <Link href={routes.contact} className="text-yuvoo-primary">
              Contactează-ne
            </Link>{" "}
            pentru pașii următori.
          </>
        ),
        category: "Parteneri și Verificare",
      },
      {
        question: "Cât durează procesul de verificare?",
        answer:
          "Procesul de verificare pentru cluburi include un call inițial de 15 minute pentru configurarea profilului, urmat de verificarea documentelor și a protocolurilor de siguranță. Verificarea finală durează de obicei 1-2 săptămâni, în funcție de complexitatea documentației și disponibilitatea pentru verificare fizică. Echipă noastră te va ține la curent cu progresul verificării prin email. În cazul în care sunt necesare informații suplimentare, te vom contacta direct.",
        category: "Parteneri și Verificare",
      },
      {
        question: "Ce beneficii primesc ca Founding Club?",
        answer: (
          <>
            Ca{" "}
            <Link href={routes.clubs.landing} className="text-yuvoo-primary">
              Founding Club
            </Link>
            , primești: profil complet gratuit 6 luni (valoare echivalentă cu 594 lei), badge
            &quot;Verified Founding Club&quot; pentru încredere instant, pagină publică optimizată
            SEO (poți folosi ca site web propriu), prioritate în rezultate la lansarea oficială,
            părinți pre-calificați (nu lead-uri random), analiză și statistici despre vizitatori, și
            suport dedicat de la echipa Yuvoo.
          </>
        ),
        category: "Parteneri și Verificare",
      },
      {
        question: "Ce se întâmplă dacă nu primesc lead-uri?",
        answer:
          "Dacă după cele 6 luni gratuite nu primești lead-uri potrivite, nu plătești nimic. Nu există obligații sau contracte. Programul este complet fără risc pentru tine. Analizăm împreună ce s-a întâmplat și ajustăm strategia dacă este necesar. Poți anula oricând, fără penalități.",
        category: "Parteneri și Verificare",
      },
      {
        question: "Trebuie să intru zilnic pe platformă?",
        answer:
          "Nu. Primești notificări prin email când un părinte te contactează. Yuvoo este un canal suplimentar, nu o obligație. Poți gestiona mesajele și cererile când ai timp, direct din email sau din platformă. Nu trebuie să verifici zilnic platforma.",
        category: "Parteneri și Verificare",
      },
      {
        question: "Pot actualiza profilul meu după ce este creat?",
        answer:
          "Da, poți actualiza oricând informațiile din profil: programe, prețuri, fotografiile, descrierile. Profilul tău este complet personalizabil și poți face modificări oricând ai nevoie, fără costuri suplimentare. Pagina ta publică optimizată SEO se actualizează automat.",
        category: "Parteneri și Verificare",
      },
      {
        question: "De ce este diferit de Google/Facebook?",
        answer:
          "Google & Facebook aduc căutări. Yuvoo aduce potrivire. Părinții care te contactează prin Yuvoo au deja completat un quiz AI și știu că sportul tău este potrivit pentru copilul lor. Nu mai primești mesaje de la părinți care „nu sunt siguri” sau care nu se potrivesc cu vârsta și nivelul copilului. Mai puține mesaje inutile. Mai multe înscrieri reale.",
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

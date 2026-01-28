import { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import { routes } from "@/lib/routes";
import React from "react";

export const metadata: Metadata = {
  title: "GDPR pentru Părinți | Yuvoo",
  description:
    "Informații despre protecția datelor copiilor conform GDPR. Drepturile părinților și ale copiilor privind datele personale.",
  keywords: ["GDPR", "protecție date copii", "drepturi părinți", "date personale", "yuvoo"],
  openGraph: {
    title: "GDPR pentru Părinți | Yuvoo",
    description: "Informații despre protecția datelor copiilor conform GDPR.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/gdpr-parinti`,
    siteName: "Yuvoo",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "GDPR pentru Părinți | Yuvoo",
    description: "Informații despre protecția datelor copiilor conform GDPR.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/gdpr-parinti`,
  },
};

export default function GDPRForParentsPage() {
  const lastUpdated = new Date("2024-12-15").toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <BreadcrumbOne
        title="GDPR pentru Părinți"
        subTitle="Legal"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "GDPR", url: routes.gdpr }, // Current page
        ]}
      />
      <section className="bd-legal-area pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bd-legal-content">
                <div className="bd-legal-header mb-40">
                  <h1 className="bd-legal-title mb-20">GDPR pentru Părinți</h1>
                  <p className="bd-legal-updated text-muted mb-0">
                    Ultima actualizare: {lastUpdated}
                  </p>
                </div>

                <div className="bd-legal-body">
                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">1. Introducere</h2>
                    <p className="mb-20">
                      La Yuvoo, protecția datelor copiilor este de importanță maximă. Această pagină
                      explică cum protejăm datele personale ale copiilor conform Regulamentului
                      General privind Protecția Datelor (GDPR) și legislației române.
                    </p>
                    <p className="mb-20">
                      Yuvoo este un proiect operat de <strong>Neorimia SRL</strong>, societate
                      comercială înregistrată în România cu CUI 51196719, Reg. Comerțului
                      J2025005816003. GDPR oferă protecție specială pentru datele copiilor sub 16
                      ani. Neorimia SRL, ca operator de date personale pentru platforma Yuvoo,
                      respectă aceste reguli și lucrează doar cu consimțământul părinților sau
                      tutorelor legali.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">2. Protecția datelor copiilor</h2>
                    <h3 className="bd-legal-subsection-title mb-15">
                      2.1. Ce date colectăm despre copii
                    </h3>
                    <p className="mb-15">
                      Pentru a oferi recomandări personalizate de sporturi, colectăm următoarele
                      informații despre copilul tău:
                    </p>
                    <ul className="mb-20">
                      <li>Nume și prenume</li>
                      <li>Data nașterii (pentru a determina vârsta și recomandările potrivite)</li>
                      <li>Gen</li>
                      <li>
                        Răspunsuri la chestionarul AI Coach (personalitate, interese, nivel de
                        energie, preferințe)
                      </li>
                      <li>Măsurători fizice (opțional, doar dacă le furnizezi tu)</li>
                    </ul>

                    <h3 className="bd-legal-subsection-title mb-15">
                      2.2. De ce colectăm aceste date
                    </h3>
                    <p className="mb-15">Folosim datele copilului tău exclusiv pentru:</p>
                    <ul className="mb-20">
                      <li>Generarea de recomandări personalizate de sporturi prin AI Coach</li>
                      <li>
                        Afișarea de cluburi și specialiști relevanți pentru vârsta și profilul
                        copilului
                      </li>
                      <li>
                        Îmbunătățirea calității recomandărilor (fără identificare individuală)
                      </li>
                    </ul>
                    <p className="mb-20">
                      Nu folosim datele copiilor pentru publicitate, marketing sau alte scopuri
                      comerciale. Nu partajăm datele copiilor cu terți pentru scopuri de marketing.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">3. Consimțământul părinților</h2>
                    <h3 className="bd-legal-subsection-title mb-15">
                      3.1. Cerința de consimțământ
                    </h3>
                    <p className="mb-20">
                      Conform GDPR, pentru copiii sub 16 ani, avem nevoie de consimțământul
                      părinților sau tutorelor legali înainte de a procesa datele personale. Când
                      adaugi un copil pe platformă, confirmi că ești părinte sau tutore legal și
                      accepți procesarea datelor copilului conform{" "}
                      <a href="/confidentialitate" className="text-primary">
                        Politicii noastre de Confidențialitate
                      </a>
                      .
                    </p>

                    <h3 className="bd-legal-subsection-title mb-15">
                      3.2. Retragerea consimțământului
                    </h3>
                    <p className="mb-20">
                      Poți retrage consimțământul oricând prin ștergerea profilului copilului din
                      contul tău sau prin contactarea noastră la{" "}
                      <a href="mailto:gdpr@yuvoo.ro" className="text-primary">
                        gdpr@yuvoo.ro
                      </a>
                      . La retragerea consimțământului, vom șterge datele copilului, cu excepția
                      cazurilor în care avem obligații legale de păstrare.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">4. Procesarea datelor copiilor</h2>
                    <h3 className="bd-legal-subsection-title mb-15">4.1. Principii de procesare</h3>
                    <p className="mb-15">
                      Procesăm datele copiilor respectând următoarele principii:
                    </p>
                    <ul className="mb-20">
                      <li>
                        <strong>Minimizarea datelor:</strong> Colectăm doar datele necesare pentru
                        serviciile oferite
                      </li>
                      <li>
                        <strong>Limitarea scopului:</strong> Folosim datele doar pentru scopurile
                        declarate
                      </li>
                      <li>
                        <strong>Securitate sporită:</strong> Aplicăm măsuri de securitate
                        suplimentare pentru datele copiilor
                      </li>
                      <li>
                        <strong>Transparență:</strong> Ți explicăm clar ce date colectăm și de ce
                      </li>
                    </ul>

                    <h3 className="bd-legal-subsection-title mb-15">4.2. Servicii terțe</h3>
                    <p className="mb-20">
                      Pentru funcționarea platformei, partajăm datele copiilor doar cu servicii
                      terțe necesare (Stack Auth pentru autentificare, Neon pentru stocare, OpenAI
                      pentru recomandări AI). Toate aceste servicii respectă GDPR și au măsuri de
                      securitate adecvate. Pentru detalii complete, vezi{" "}
                      <a href="/confidentialitate" className="text-primary">
                        Politica noastră de Confidențialitate
                      </a>
                      .
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">5. Drepturile părinților</h2>
                    <p className="mb-15">
                      Ca părinte sau tutore legal, ai următoarele drepturi privind datele copilului
                      tău:
                    </p>
                    <ul className="mb-20">
                      <li>
                        <strong>Dreptul de acces:</strong> Poți solicita o copie a tuturor datelor
                        pe care le deținem despre copilul tău
                      </li>
                      <li>
                        <strong>Dreptul de rectificare:</strong> Poți solicita corectarea datelor
                        inexacte sau incomplete
                      </li>
                      <li>
                        <strong>Dreptul la ștergere:</strong> Poți solicita ștergerea datelor
                        copilului (cu excepția cazurilor în care avem obligații legale de păstrare)
                      </li>
                      <li>
                        <strong>Dreptul la portabilitate:</strong> Poți solicita transferul datelor
                        într-un format structurat
                      </li>
                      <li>
                        <strong>Dreptul de opoziție:</strong> Poți te opune prelucrării datelor în
                        anumite circumstanțe
                      </li>
                      <li>
                        <strong>Dreptul de restricționare:</strong> Poți solicita limitarea
                        prelucrării datelor
                      </li>
                    </ul>
                    <p className="mb-20">
                      Pentru a exercita aceste drepturi, trimite un email la{" "}
                      <a href="mailto:gdpr@yuvoo.ro" className="text-primary">
                        gdpr@yuvoo.ro
                      </a>{" "}
                      cu numele copilului și detaliile solicitării. Vom răspunde în termen de 30 de
                      zile.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">6. Drepturile copiilor</h2>
                    <p className="mb-20">
                      Când copilul tău devine suficient de mare pentru a înțelege drepturile sale
                      (de obicei în jurul vârstei de 13-14 ani), poate exercita direct drepturile
                      GDPR. În acest caz, vom verifica că copilul are capacitatea de a înțelege
                      implicațiile și vom respecta preferințele sale, în măsura permisă de lege.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">7. Păstrarea datelor</h2>
                    <p className="mb-15">Păstrăm datele copiilor pentru perioade limitate:</p>
                    <ul className="mb-20">
                      <li>
                        <strong>Date profil:</strong> Atât timp cât profilul copilului este activ,
                        plus 2 ani după ștergere
                      </li>
                      <li>
                        <strong>Rezultate quiz:</strong> 3 ani de la ultima actualizare (pentru
                        istoricul recomandărilor)
                      </li>
                    </ul>
                    <p className="mb-20">
                      Când copilul tău împlinește 18 ani, datele rămân în sistem conform acelorași
                      reguli, dar copilul poate exercita direct drepturile GDPR.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">
                      8. Securitatea datelor copiilor
                    </h2>
                    <p className="mb-15">
                      Aplicăm măsuri de securitate suplimentare pentru datele copiilor:
                    </p>
                    <ul className="mb-20">
                      <li>
                        <strong>Criptare:</strong> Toate datele sunt criptate în tranzit și la rest
                      </li>
                      <li>
                        <strong>Acces restricționat:</strong> Doar personalul autorizat are acces la
                        datele copiilor, și doar pentru scopuri legitime
                      </li>
                      <li>
                        <strong>Monitorizare:</strong> Monitorizăm continuu accesul la datele
                        copiilor
                      </li>
                      <li>
                        <strong>Audit regulat:</strong> Realizăm audit-uri regulate pentru a asigura
                        securitatea datelor
                      </li>
                    </ul>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">9. Cum să exercităm drepturile</h2>
                    <p className="mb-15">
                      Pentru a exercita oricare dintre drepturile menționate mai sus,
                      contactează-ne:
                    </p>
                    <ul className="mb-20">
                      <li>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:gdpr@yuvoo.ro" className="text-primary">
                          gdpr@yuvoo.ro
                        </a>
                      </li>
                      <li>
                        <strong>Subiect:</strong> &ldquo;Solicitare GDPR - [Nume copil]&rdquo;
                      </li>
                    </ul>
                    <p className="mb-20">
                      Vom verifica identitatea ta înainte de a procesa solicitarea. Vom răspunde în
                      termen de 30 de zile, conform GDPR.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">
                      10. Autoritatea de Supraveghere
                    </h2>
                    <p className="mb-20">
                      Dacă consideri că prelucrarea datelor copilului tău încalcă GDPR, ai dreptul
                      să depui o plângere la Autoritatea Națională de Supraveghere a Prelucrării
                      Datelor cu Caracter Personal (ANSPDCP) din România:
                    </p>
                    <ul className="mb-20">
                      <li>
                        <strong>Website:</strong>{" "}
                        <a
                          href="https://www.dataprotection.ro"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          www.dataprotection.ro
                        </a>
                      </li>
                      <li>
                        <strong>Email:</strong> anspdcp@dataprotection.ro
                      </li>
                      <li>
                        <strong>Adresă:</strong> B-dul G-ral. Gheorghe Magheru 28-30, Sector 1,
                        București
                      </li>
                    </ul>
                  </div>

                  <div className="bd-legal-section">
                    <h2 className="bd-legal-section-title mb-20">11. Contact</h2>
                    <p className="mb-15">
                      Pentru întrebări despre protecția datelor copiilor, contactează-ne:
                    </p>
                    <p className="mb-15">
                      <strong>Operator de date personale:</strong> Neorimia SRL (CUI: 51196719, Reg.
                      Comerțului: J2025005816003)
                    </p>
                    <ul className="mb-0">
                      <li>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:gdpr@yuvoo.ro" className="text-primary">
                          gdpr@yuvoo.ro
                        </a>
                      </li>
                      <li>
                        <strong>Telefon:</strong>{" "}
                        <a href="tel:+40746385038" className="text-primary">
                          +40 746 385 038
                        </a>
                      </li>
                      <li>
                        <strong>Adresă:</strong> Mun. Focsani, România
                      </li>
                      <li>
                        <strong>Adresă legală (sediu social):</strong> Jud. Vrancea, Mun. Focsani,
                        Bld. Dimitrie Cantemir, Nr.3, Bl.p, Sc.1, Ap.b16
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

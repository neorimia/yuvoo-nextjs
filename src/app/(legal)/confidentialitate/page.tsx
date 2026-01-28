import { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import { routes } from "@/lib/routes";
import React from "react";

export const metadata: Metadata = {
  title: "Politică de Confidențialitate | Yuvoo",
  description:
    "Află cum protejăm datele tale personale și ale copilului tău. Politica de confidențialitate Yuvoo - GDPR compliant.",
  keywords: ["confidențialitate", "protecție date", "GDPR", "privacy policy", "yuvoo"],
  openGraph: {
    title: "Politică de Confidențialitate | Yuvoo",
    description: "Află cum protejăm datele tale personale și ale copilului tău.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/confidentialitate`,
    siteName: "Yuvoo",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Politică de Confidențialitate | Yuvoo",
    description: "Află cum protejăm datele tale personale și ale copilului tău.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/confidentialitate`,
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date("2024-12-15").toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <BreadcrumbOne
        title="Politică de Confidențialitate"
        subTitle="Legal"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Confidențialitate", url: routes.privacy }, // Current page
        ]}
      />
      <section className="bd-legal-area pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bd-legal-content">
                <div className="bd-legal-header mb-40">
                  <h1 className="bd-legal-title mb-20">Politică de Confidențialitate</h1>
                  <p className="bd-legal-updated text-muted mb-0">
                    Ultima actualizare: {lastUpdated}
                  </p>
                </div>

                <div className="bd-legal-body">
                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">1. Introducere</h2>
                    <p className="mb-20">
                      La Yuvoo, protecția datelor tale personale și ale copilului tău este o
                      prioritate. Această politică de confidențialitate explică cum colectăm,
                      folosim, păstrăm și protejăm informațiile tale când folosești platforma Yuvoo.
                    </p>
                    <p className="mb-20">
                      Yuvoo este un proiect operat de <strong>Neorimia SRL</strong>, societate
                      comercială înregistrată în România cu CUI 51196719, J2025005816003. Respectăm
                      Regulamentul General privind Protecția Datelor (GDPR) și legislația română
                      privind protecția datelor personale. Această politică se aplică tuturor
                      utilizatorilor platformei Yuvoo.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">2. Datele pe care le colectăm</h2>
                    <h3 className="bd-legal-subsection-title mb-15">
                      2.1. Date personale (părinți)
                    </h3>
                    <p className="mb-15">Când creezi un cont pe Yuvoo, colectăm:</p>
                    <ul className="mb-20">
                      <li>Nume și prenume</li>
                      <li>Adresă de email</li>
                      <li>Număr de telefon (opțional)</li>
                      <li>Parolă (criptată)</li>
                    </ul>

                    <h3 className="bd-legal-subsection-title mb-15">2.2. Date despre copii</h3>
                    <p className="mb-15">
                      Pentru a oferi recomandări personalizate de sporturi, colectăm informații
                      despre copilul tău:
                    </p>
                    <ul className="mb-20">
                      <li>Nume și prenume</li>
                      <li>Data nașterii</li>
                      <li>Gen</li>
                      <li>
                        Răspunsuri la chestionarul AI Coach (personalitate, interese, nivel de
                        energie, etc.)
                      </li>
                      <li>Măsurători fizice (opțional, doar dacă le furnizezi)</li>
                    </ul>

                    <h3 className="bd-legal-subsection-title mb-15">2.3. Date tehnice</h3>
                    <p className="mb-15">Colectăm automat anumite date tehnice:</p>
                    <ul className="mb-20">
                      <li>Adresă IP</li>
                      <li>Tipul de browser și versiunea</li>
                      <li>Dispozitivul folosit</li>
                      <li>Date despre utilizarea platformei (pagini vizitate, timp petrecut)</li>
                    </ul>

                    <h3 className="bd-legal-subsection-title mb-15">2.4. Cookie-uri</h3>
                    <p className="mb-20">
                      Folosim cookie-uri pentru a îmbunătăți experiența ta pe platformă. Pentru
                      detalii complete, vezi{" "}
                      <a href="/cookies" className="text-primary">
                        Politica noastră de Cookie-uri
                      </a>
                      .
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">3. Cum folosim datele</h2>
                    <p className="mb-15">Folosim datele colectate pentru:</p>
                    <ul className="mb-20">
                      <li>
                        <strong>Livrarea serviciilor:</strong> Crearea și gestionarea contului tău,
                        generarea recomandărilor de sporturi personalizate, afișarea cluburilor și
                        doctorilor relevanți
                      </li>
                      <li>
                        <strong>Personalizare:</strong> Adaptarea recomandărilor AI Coach la
                        profilul copilului tău
                      </li>
                      <li>
                        <strong>Comunicare:</strong> Trimiterea de email-uri despre rezultatele
                        quiz-ului, confirmări de rezervare, actualizări importante
                      </li>
                      <li>
                        <strong>Îmbunătățirea platformei:</strong> Analiza utilizării pentru a
                        îmbunătăți funcționalitățile și experiența utilizatorilor
                      </li>
                      <li>
                        <strong>Securitate:</strong> Protejarea platformei împotriva fraudelor și
                        utilizării neautorizate
                      </li>
                    </ul>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">4. Partajarea datelor</h2>
                    <p className="mb-20">
                      Nu vindem datele tale. Partajăm datele doar cu servicii terțe necesare pentru
                      funcționarea platformei:
                    </p>
                    <ul className="mb-20">
                      <li>
                        <strong>Stack Auth:</strong> Autentificare și gestionarea sesiunilor
                        utilizatorilor
                      </li>
                      <li>
                        <strong>Neon Database:</strong> Stocarea securizată a datelor în baza de
                        date
                      </li>
                      <li>
                        <strong>Cloudinary:</strong> Stocarea și optimizarea imaginilor (fotografii
                        cluburi, doctori, avatare)
                      </li>
                      <li>
                        <strong>OpenAI:</strong> Generarea recomandărilor personalizate de sporturi
                        prin AI Coach (răspunsurile la quiz sunt trimise pentru analiză)
                      </li>
                      <li>
                        <strong>Brevo:</strong> Trimitera email-urilor transacționale (confirmări,
                        rezultate quiz)
                      </li>
                    </ul>
                    <p className="mb-20">
                      Toate aceste servicii respectă GDPR și au măsuri de securitate adecvate. Nu
                      partajăm date cu terți pentru scopuri de marketing sau publicitate.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">5. Drepturile tale</h2>
                    <p className="mb-20">
                      Conform GDPR, ai următoarele drepturi privind datele tale personale:
                    </p>
                    <ul className="mb-20">
                      <li>
                        <strong>Dreptul de acces:</strong> Poți solicita o copie a datelor tale
                        personale pe care le deținem
                      </li>
                      <li>
                        <strong>Dreptul de rectificare:</strong> Poți solicita corectarea datelor
                        inexacte sau incomplete
                      </li>
                      <li>
                        <strong>Dreptul la ștergere:</strong> Poți solicita ștergerea datelor tale
                        (cu excepția cazurilor în care avem obligații legale de păstrare)
                      </li>
                      <li>
                        <strong>Dreptul la portabilitate:</strong> Poți solicita transferul datelor
                        tale într-un format structurat
                      </li>
                      <li>
                        <strong>Dreptul de opoziție:</strong> Poți te opune prelucrării datelor tale
                        în anumite circumstanțe
                      </li>
                      <li>
                        <strong>Dreptul de restricționare:</strong> Poți solicita limitarea
                        prelucrării datelor tale
                      </li>
                    </ul>
                    <p className="mb-20">
                      Pentru a exercita aceste drepturi, trimite un email la{" "}
                      <a href="mailto:gdpr@yuvoo.ro" className="text-primary">
                        gdpr@yuvoo.ro
                      </a>
                      . Vom răspunde în termen de 30 de zile.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">6. Păstrarea datelor</h2>
                    <p className="mb-15">Păstrăm datele tale personale pentru:</p>
                    <ul className="mb-20">
                      <li>
                        <strong>Date cont:</strong> Atât timp cât contul tău este activ, plus 2 ani
                        după dezactivare
                      </li>
                      <li>
                        <strong>Date copii:</strong> Atât timp cât profilul copilului este activ,
                        plus 2 ani după ștergere
                      </li>
                      <li>
                        <strong>Rezultate quiz:</strong> 3 ani de la ultima actualizare (pentru
                        istoricul recomandărilor)
                      </li>
                      <li>
                        <strong>Date tehnice:</strong> 12 luni (pentru securitate și analiză)
                      </li>
                    </ul>
                    <p className="mb-20">
                      După expirarea perioadelor de păstrare, ștergem definitiv datele tale, cu
                      excepția cazurilor în care avem obligații legale de păstrare.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">7. Securitatea datelor</h2>
                    <p className="mb-15">
                      Implementăm măsuri tehnice și organizatorice pentru protejarea datelor tale:
                    </p>
                    <ul className="mb-20">
                      <li>
                        <strong>Criptare:</strong> Toate datele sunt criptate în tranzit (HTTPS) și
                        la rest (în baza de date)
                      </li>
                      <li>
                        <strong>Acces restricționat:</strong> Doar personalul autorizat are acces la
                        datele personale, și doar pentru scopuri legitime
                      </li>
                      <li>
                        <strong>Monitorizare:</strong> Monitorizăm continuu sistemul pentru
                        detectarea și prevenirea accesului neautorizat
                      </li>
                      <li>
                        <strong>Backup-uri securizate:</strong> Realizăm backup-uri regulate ale
                        datelor, stocate securizat
                      </li>
                    </ul>
                    <p className="mb-20">
                      În cazul unei încălcări a securității datelor care prezintă un risc pentru
                      drepturile tale, te vom notifica în termen de 72 de ore, conform GDPR.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">8. Modificări ale politicii</h2>
                    <p className="mb-20">
                      Ne rezervăm dreptul de a actualiza această politică de confidențialitate. Te
                      vom notifica despre modificări importante prin email sau prin notificare pe
                      platformă. Data ultimei actualizări este indicată în partea de sus a acestei
                      pagini.
                    </p>
                  </div>

                  <div className="bd-legal-section">
                    <h2 className="bd-legal-section-title mb-20">9. Contact</h2>
                    <p className="mb-15">
                      Pentru întrebări despre această politică de confidențialitate sau pentru a
                      exercita drepturile tale GDPR, contactează-ne:
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

import { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import { routes } from "@/lib/routes";
import React from "react";

export const metadata: Metadata = {
  title: "Termeni și Condiții | Yuvoo",
  description:
    "Termenii și condițiile de utilizare a platformei Yuvoo. Regulile și responsabilitățile pentru utilizarea serviciilor noastre.",
  keywords: ["termeni", "condiții", "terms of service", "regulament", "yuvoo"],
  openGraph: {
    title: "Termeni și Condiții | Yuvoo",
    description: "Termenii și condițiile de utilizare a platformei Yuvoo.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/termeni`,
    siteName: "Yuvoo",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Termeni și Condiții | Yuvoo",
    description: "Termenii și condițiile de utilizare a platformei Yuvoo.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/termeni`,
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = new Date("2024-12-15").toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <BreadcrumbOne
        title="Termeni și Condiții"
        subTitle="Legal"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Termeni", url: routes.terms }, // Current page
        ]}
      />
      <section className="bd-legal-area pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bd-legal-content">
                <div className="bd-legal-header mb-40">
                  <h1 className="bd-legal-title mb-20">Termeni și Condiții</h1>
                  <p className="bd-legal-updated text-muted mb-0">
                    Ultima actualizare: {lastUpdated}
                  </p>
                </div>

                <div className="bd-legal-body">
                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">1. Acceptarea termenilor</h2>
                    <p className="mb-20">
                      Prin accesarea și utilizarea platformei Yuvoo, accepti acești termeni și
                      condiții. Dacă nu ești de acord cu acești termeni, te rugăm să nu folosești
                      platforma.
                    </p>
                    <p className="mb-20">
                      Yuvoo este un proiect operat de <strong>Neorimia SRL</strong>, societate
                      comercială înregistrată în România cu CUI 51196719, Reg. Comerțului
                      J2025005816003. Pentru a crea un cont și a folosi serviciile Yuvoo, trebuie să
                      ai cel puțin 18 ani sau să ai consimțământul părinților/tutorelor legali.
                      Platforma este destinată părinților care caută activități sportive pentru
                      copiii lor.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">2. Descrierea serviciului</h2>
                    <p className="mb-15">Yuvoo este o platformă digitală care oferă:</p>
                    <ul className="mb-20">
                      <li>
                        <strong>AI Coach Quiz:</strong> Recomandări personalizate de sporturi bazate
                        pe profilul copilului tău
                      </li>
                      <li>
                        <strong>Directorul de cluburi:</strong> Listă de cluburi sportive verificate
                        pentru copii, cu informații despre programe, prețuri și locații
                      </li>
                      <li>
                        <strong>Directorul de specialiști:</strong> Acces la specialiști pediatri
                        verificați pentru consultații legate de sport
                      </li>
                    </ul>
                    <p className="mb-20">
                      Yuvoo nu este un furnizor direct de servicii sportive sau medicale. Platforma
                      doar facilitează conexiunea între părinți, cluburi și specialiști. Yuvoo nu
                      garantează calitatea serviciilor oferite de cluburi sau specialiști.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">3. Conturi utilizator</h2>
                    <h3 className="bd-legal-subsection-title mb-15">3.1. Crearea contului</h3>
                    <p className="mb-15">Pentru a crea un cont, trebuie să:</p>
                    <ul className="mb-20">
                      <li>Furnizezi informații exacte și complete</li>
                      <li>Menții securitatea contului tău (parolă puternică, confidențialitate)</li>
                      <li>Notifici imediat Yuvoo despre orice utilizare neautorizată</li>
                      <li>Ai cel puțin 18 ani sau consimțământul părinților</li>
                    </ul>

                    <h3 className="bd-legal-subsection-title mb-15">3.2. Responsabilități</h3>
                    <p className="mb-15">Ești responsabil pentru:</p>
                    <ul className="mb-20">
                      <li>Toate activitățile care au loc sub contul tău</li>
                      <li>Păstrarea confidențialității parolei</li>
                      <li>Furnizarea de informații corecte despre copilul tău</li>
                      <li>Respectarea legilor aplicabile</li>
                    </ul>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">4. Utilizarea acceptabilă</h2>
                    <h3 className="bd-legal-subsection-title mb-15">4.1. Ce poți face</h3>
                    <ul className="mb-20">
                      <li>
                        Folosi platforma pentru scopurile sale destinate (găsirea sporturilor și
                        cluburilor)
                      </li>
                      <li>Completa quiz-ul AI Coach pentru recomandări personalizate</li>
                      <li>Vizualiza informații despre cluburi și specialiști</li>
                      <li>Contacta cluburi și specialiști prin platformă</li>
                    </ul>

                    <h3 className="bd-legal-subsection-title mb-15">4.2. Ce nu poți face</h3>
                    <ul className="mb-20">
                      <li>Utiliza platforma pentru scopuri ilegale sau frauduloase</li>
                      <li>Încerca să accesezi conturi sau zone restricționate ale platformei</li>
                      <li>Distribui malware, viruși sau cod dăunător</li>
                      <li>Harassa, amenința sau intimida alți utilizatori</li>
                      <li>Furniza informații false sau înșelătoare</li>
                      <li>Reproduce, copie sau distribuie conținutul platformei fără permisiune</li>
                      <li>Folosi datele platformei pentru spam sau marketing neautorizat</li>
                    </ul>

                    <h3 className="bd-legal-subsection-title mb-15">4.3. Consecințe</h3>
                    <p className="mb-20">
                      În cazul încălcării acestor reguli, ne rezervăm dreptul de a suspenda sau
                      șterge contul tău, fără notificare prealabilă și fără rambursare.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">5. Proprietate intelectuală</h2>
                    <h3 className="bd-legal-subsection-title mb-15">5.1. Conținutul Yuvoo</h3>
                    <p className="mb-20">
                      Toate drepturile asupra platformei Yuvoo, inclusiv design-ul, logo-urile,
                      textele, graficele și codul, aparțin Yuvoo sau licențiatorilor săi. Nu poți
                      reproduce, distribui sau crea lucrări derivate fără permisiunea scrisă a
                      Yuvoo.
                    </p>

                    <h3 className="bd-legal-subsection-title mb-15">
                      5.2. Conținutul utilizatorilor
                    </h3>
                    <p className="mb-15">
                      Prin furnizarea de conținut pe platformă (comentarii, recenzii, fotografii),
                      acordi Yuvoo o licență neexclusivă, gratuită și perpetua de a folosi,
                      reproduce și distribui acest conținut în scopul funcționării platformei.
                    </p>
                    <p className="mb-20">
                      Rămâi proprietarul conținutului tău și poți șterge sau modifica conținutul
                      oricând prin contul tău.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">6. Limitarea răspunderii</h2>
                    <h3 className="bd-legal-subsection-title mb-15">
                      6.1. Disponibilitatea serviciului
                    </h3>
                    <p className="mb-20">
                      Yuvoo încearcă să mențină platforma accesibilă 24/7, dar nu garantăm
                      disponibilitatea neîntreruptă. Platforma poate fi temporar indisponibilă din
                      cauza întreținerii, actualizărilor sau problemelor tehnice. Nu suntem
                      responsabili pentru daune rezultate din indisponibilitatea platformei.
                    </p>

                    <h3 className="bd-legal-subsection-title mb-15">6.2. Recomandări AI</h3>
                    <p className="mb-20">
                      Recomandările generate de AI Coach sunt sugestii bazate pe informațiile
                      furnizate de tine. Nu garantăm că aceste recomandări sunt perfecte sau
                      potrivite pentru copilul tău. Ești responsabil să evaluezi și să decizi ce
                      sporturi și cluburi sunt potrivite pentru copilul tău.
                    </p>

                    <h3 className="bd-legal-subsection-title mb-15">
                      6.3. Informații despre cluburi și specialiști
                    </h3>
                    <p className="mb-20">
                      Yuvoo verifică cluburile și specialiștii, dar nu garantăm calitatea
                      serviciilor lor. Nu suntem responsabili pentru acțiunile, serviciile sau
                      comportamentul cluburilor sau specialiștilor. Orice acord între tine și un
                      club sau specialist este între tine și respectivul furnizor de servicii.
                    </p>

                    <h3 className="bd-legal-subsection-title mb-15">6.4. Limitarea generală</h3>
                    <p className="mb-20">
                      În măsura permisă de lege, Yuvoo nu este responsabil pentru daune indirecte,
                      consecvențiale, speciale sau punitive rezultate din utilizarea sau
                      imposibilitatea de a utiliza platforma.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">7. Rezolvarea disputelor</h2>
                    <p className="mb-15">
                      Acești termeni sunt guvernați de legea română. Orice dispută legată de acești
                      termeni sau de utilizarea platformei va fi rezolvată de instanțele competente
                      din România.
                    </p>
                    <p className="mb-20">
                      Înainte de a iniția o acțiune în instanță, te încurajăm să ne contactezi la{" "}
                      <a href="mailto:contact@yuvoo.ro" className="text-primary">
                        contact@yuvoo.ro
                      </a>{" "}
                      pentru a rezolva disputa amiabil.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">8. Modificări ale termenilor</h2>
                    <p className="mb-20">
                      Ne rezervăm dreptul de a modifica acești termeni și condiții oricând. Te vom
                      notifica despre modificări importante prin email sau prin notificare pe
                      platformă. Continuarea utilizării platformei după modificări constituie
                      acceptarea noilor termeni. Dacă nu ești de acord cu modificările, poți șterge
                      contul tău.
                    </p>
                  </div>

                  <div className="bd-legal-section">
                    <h2 className="bd-legal-section-title mb-20">9. Contact</h2>
                    <p className="mb-15">
                      Pentru întrebări despre acești termeni și condiții, contactează-ne:
                    </p>
                    <p className="mb-15">
                      <strong>Operator servicii:</strong> Neorimia SRL (CUI: 51196719, Reg.
                      Comerțului: J2025005816003)
                    </p>
                    <ul className="mb-0">
                      <li>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:contact@yuvoo.ro" className="text-primary">
                          contact@yuvoo.ro
                        </a>
                      </li>
                      <li>
                        <strong>Telefon:</strong>{" "}
                        <a href="tel:+40746385038" className="text-primary">
                          +40 746 385 038
                        </a>
                      </li>
                      <li>
                        <strong>Adresă:</strong> București, România
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

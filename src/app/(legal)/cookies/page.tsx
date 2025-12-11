import { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import React from "react";

export const metadata: Metadata = {
  title: "Politică Cookies | Yuvoo",
  description:
    "Află cum folosim cookie-urile pe platforma Yuvoo. Tipuri de cookie-uri, scopul lor și cum poți gestiona preferințele tale.",
  keywords: ["cookies", "politică cookies", "cookie policy", "preferințe", "yuvoo"],
  openGraph: {
    title: "Politică Cookies | Yuvoo",
    description: "Află cum folosim cookie-urile pe platforma Yuvoo.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/cookies`,
    siteName: "Yuvoo",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Politică Cookies | Yuvoo",
    description: "Află cum folosim cookie-urile pe platforma Yuvoo.",
  },
  alternates: {
    canonical: "/cookies",
  },
};

export default function CookiePolicyPage() {
  const lastUpdated = new Date("2024-12-15").toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <BreadcrumbOne title="Politică Cookies" subTitle="Legal" />
      <section className="bd-legal-area pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bd-legal-content">
                <div className="bd-legal-header mb-40">
                  <h1 className="bd-legal-title mb-20">Politică Cookies</h1>
                  <p className="bd-legal-updated text-muted mb-0">
                    Ultima actualizare: {lastUpdated}
                  </p>
                </div>

                <div className="bd-legal-body">
                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">1. Ce sunt cookie-urile?</h2>
                    <p className="mb-20">
                      Cookie-urile sunt fișiere text mici stocate pe dispozitivul tău (computer,
                      tabletă, smartphone) când vizitezi un site web. Cookie-urile permit site-ului
                      să-și amintească acțiunile și preferințele tale pentru o perioadă de timp,
                      astfel încât să nu trebuiască să le reintroduci de fiecare dată când revii pe
                      site sau navighezi de la o pagină la alta.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">2. Cum folosim cookie-urile?</h2>
                    <p className="mb-20">
                      Yuvoo folosește cookie-uri pentru a îmbunătăți experiența ta pe platformă,
                      pentru a asigura funcționarea corectă a serviciilor și pentru a înțelege cum
                      este utilizată platforma.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">
                      3. Tipuri de cookie-uri folosite
                    </h2>
                    <h3 className="bd-legal-subsection-title mb-15">3.1. Cookie-uri esențiale</h3>
                    <p className="mb-15">
                      Aceste cookie-uri sunt necesare pentru funcționarea platformei și nu pot fi
                      dezactivate:
                    </p>
                    <ul className="mb-20">
                      <li>
                        <strong>Cookie-uri de autentificare:</strong> Mențin sesiunea ta activă când
                        ești logat, astfel încât să nu trebuiască să te autentifici la fiecare
                        pagină
                      </li>
                      <li>
                        <strong>Cookie-uri de securitate:</strong> Protejează împotriva atacurilor
                        și fraudelor
                      </li>
                      <li>
                        <strong>Cookie-uri de preferințe:</strong> Rețin setările tale (limbă, tema,
                        etc.)
                      </li>
                    </ul>

                    <h3 className="bd-legal-subsection-title mb-15">3.2. Cookie-uri de analiză</h3>
                    <p className="mb-15">
                      Aceste cookie-uri ne ajută să înțelegem cum utilizatorii interacționează cu
                      platforma:
                    </p>
                    <ul className="mb-20">
                      <li>
                        <strong>Cookie-uri de utilizare:</strong> Colectează informații despre
                        paginile pe care le vizitezi, timpul petrecut pe platformă, erorile
                        întâlnite
                      </li>
                      <li>
                        <strong>Cookie-uri de performanță:</strong> Măsoară viteza de încărcare a
                        paginilor și identifică probleme tehnice
                      </li>
                    </ul>
                    <p className="mb-20">
                      Aceste cookie-uri sunt folosite doar pentru îmbunătățirea platformei și nu
                      identifică utilizatorii individual.
                    </p>

                    <h3 className="bd-legal-subsection-title mb-15">3.3. Cookie-uri terțe</h3>
                    <p className="mb-15">
                      Unele servicii terțe folosite de Yuvoo pot seta propriile cookie-uri:
                    </p>
                    <ul className="mb-20">
                      <li>
                        <strong>Stack Auth:</strong> Cookie-uri pentru autentificare și gestionarea
                        sesiunilor
                      </li>
                      <li>
                        <strong>Cloudinary:</strong> Cookie-uri pentru optimizarea și livrarea
                        imaginilor
                      </li>
                    </ul>
                    <p className="mb-20">
                      Aceste servicii au propriile politici de confidențialitate și cookie-uri. Te
                      încurajăm să le consulți.
                    </p>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">4. Durata cookie-urilor</h2>
                    <ul className="mb-20">
                      <li>
                        <strong>Cookie-uri de sesiune:</strong> Se șterg automat când închizi
                        browserul
                      </li>
                      <li>
                        <strong>Cookie-uri persistente:</strong> Rămân pe dispozitivul tău pentru o
                        perioadă determinată (de obicei 30-365 de zile) sau până le ștergi manual
                      </li>
                    </ul>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">
                      5. Cum poți gestiona cookie-urile
                    </h2>
                    <h3 className="bd-legal-subsection-title mb-15">5.1. Setările browserului</h3>
                    <p className="mb-15">
                      Poți controla și șterge cookie-urile prin setările browserului tău. Iată cum
                      pentru browserele principale:
                    </p>
                    <ul className="mb-20">
                      <li>
                        <strong>Chrome:</strong> Setări → Confidențialitate și securitate →
                        Cookie-uri și alte date ale site-urilor
                      </li>
                      <li>
                        <strong>Firefox:</strong> Opțiuni → Confidențialitate și securitate →
                        Cookie-uri și date ale site-urilor
                      </li>
                      <li>
                        <strong>Safari:</strong> Preferințe → Confidențialitate → Cookie-uri și date
                        ale site-urilor web
                      </li>
                      <li>
                        <strong>Edge:</strong> Setări → Cookie-uri și permisiuni site → Cookie-uri
                        și date ale site-urilor
                      </li>
                    </ul>

                    <h3 className="bd-legal-subsection-title mb-15">
                      5.2. Impactul dezactivării cookie-urilor
                    </h3>
                    <p className="mb-20">
                      Dacă dezactivezi cookie-urile esențiale, unele funcții ale platformei pot să
                      nu funcționeze corect:
                    </p>
                    <ul className="mb-20">
                      <li>Nu vei putea rămâne autentificat între sesiuni</li>
                      <li>Preferințele tale nu vor fi salvate</li>
                      <li>Unele funcții interactive pot să nu funcționeze</li>
                    </ul>
                  </div>

                  <div className="bd-legal-section mb-40">
                    <h2 className="bd-legal-section-title mb-20">6. Modificări ale politicii</h2>
                    <p className="mb-20">
                      Ne rezervăm dreptul de a actualiza această politică de cookie-uri. Te vom
                      notifica despre modificări importante prin email sau prin notificare pe
                      platformă. Data ultimei actualizări este indicată în partea de sus a acestei
                      pagini.
                    </p>
                  </div>

                  <div className="bd-legal-section">
                    <h2 className="bd-legal-section-title mb-20">7. Contact</h2>
                    <p className="mb-15">
                      Pentru întrebări despre utilizarea cookie-urilor, contactează-ne:
                    </p>
                    <ul className="mb-0">
                      <li>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:contact@yuvoo.ro" className="text-primary">
                          contact@yuvoo.ro
                        </a>
                      </li>
                      <li>
                        <strong>Adresă:</strong> București, România
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

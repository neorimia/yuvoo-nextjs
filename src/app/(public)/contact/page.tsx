import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ContactInfoArea from "@/components/Info/ContactInfoArea";
import ContactFormMain from "@/components/Contact/ContactFormMain";
import SectionTitle from "@/components/shared/SectionTitle";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Contact - Contactează echipa Yuvoo",
  description:
    "Ai întrebări despre Yuvoo? Contactează-ne prin email, telefon sau formular. Suntem aici să te ajutăm să găsești activitățile sportive perfecte pentru copilul tău.",
  keywords: [
    "contact Yuvoo",
    "suport Yuvoo",
    "contactare Yuvoo",
    "email Yuvoo",
    "telefon Yuvoo",
    "ajutor sporturi copii",
    "contact platformă sport copii",
  ],
  openGraph: {
    title: "Contact - Contactează echipa Yuvoo",
    description:
      "Ai întrebări despre Yuvoo? Contactează-ne prin email, telefon sau formular. Suntem aici să te ajutăm să găsești activitățile sportive perfecte pentru copilul tău.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/contact`,
    siteName: "Yuvoo",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Contactează echipa Yuvoo",
    description: "Ai întrebări despre Yuvoo? Contactează-ne prin email, telefon sau formular.",
  },
  alternates: {
    canonical: "/contact",
  },
};

/**
 * Contact Page
 *
 * Public contact page for Yuvoo.
 * SEO-friendly route: /contact
 */
export default function ContactPage() {
  return (
    <>
      <BreadcrumbOne
        title="Contact"
        subTitle="Contact"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Contact", url: routes.contact },
        ]}
      />
      <ContactInfoArea />
      <ContactFormMain />
      {/* Related Links Section */}
      <section className="bd-contact-related pt-120 pb-70 theme-bg-7">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <SectionTitle
                title="Resurse utile"
                subtitle="Poți găsi răspunsuri rapide la întrebările tale în aceste pagini"
                className="mb-60"
                animationDelay=".2s"
              />
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-30">
                  <div
                    className="bd-contact-related-card text-center wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay=".3s"
                  >
                    <div className="bd-contact-related-icon mb-20">
                      <i className="fa-solid fa-circle-question"></i>
                    </div>
                    <h4 className="bd-contact-related-title mb-15">Întrebări frecvente</h4>
                    <p className="bd-contact-related-text mb-20">
                      Găsește răspunsuri la cele mai comune întrebări despre platformă, quiz,
                      cluburi și specialiști.
                    </p>
                    <Link href={routes.faq} className="bd-contact-related-link">
                      Vezi FAQ
                      <i className="fa-solid fa-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-30">
                  <div
                    className="bd-contact-related-card text-center wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay=".4s"
                  >
                    <div className="bd-contact-related-icon mb-20">
                      <i className="fa-solid fa-circle-info"></i>
                    </div>
                    <h4 className="bd-contact-related-title mb-15">Ajutor și suport</h4>
                    <p className="bd-contact-related-text mb-20">
                      Ghid complet pentru utilizarea platformei și toate funcționalitățile
                      disponibile.
                    </p>
                    <Link href={routes.help} className="bd-contact-related-link">
                      Vezi ajutor
                      <i className="fa-solid fa-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-30">
                  <div
                    className="bd-contact-related-card text-center wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay=".5s"
                  >
                    <div className="bd-contact-related-icon mb-20">
                      <i className="fa-solid fa-info-circle"></i>
                    </div>
                    <h4 className="bd-contact-related-title mb-15">Despre Yuvoo</h4>
                    <p className="bd-contact-related-text mb-20">
                      Află mai multe despre misiunea noastră, echipa și partenerii de încredere.
                    </p>
                    <Link href={routes.about} className="bd-contact-related-link">
                      Despre noi
                      <i className="fa-solid fa-arrow-right ms-2"></i>
                    </Link>
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

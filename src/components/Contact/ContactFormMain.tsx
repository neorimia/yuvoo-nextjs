import React from "react";
import Link from "next/link";
import ContactForm from "@/components/features/contact/ContactForm";
import SectionTitle from "@/components/shared/SectionTitle";
import { routes } from "@/lib/routes";

const ContactFormMain = () => {
  return (
    <section className="bd-contact-area pt-120 pb-70">
      <div className="container">
        <div className="row mb-60">
          <div className="col-lg-8 mx-auto">
            <SectionTitle
              title="Trimite-ne un mesaj"
              subtitle={
                <>
                  Ai întrebări despre Yuvoo,{" "}
                  <Link href={routes.quiz.intro} className="text-primary">
                    chestionarul AI
                  </Link>{" "}
                  sau{" "}
                  <Link href={routes.clubs.list} className="text-primary">
                    cluburile
                  </Link>
                  ? Completează formularul de mai jos și te vom contacta în cel mai scurt timp. Sau
                  verifică{" "}
                  <Link href={routes.faq} className="text-primary">
                    întrebările frecvente
                  </Link>{" "}
                  și{" "}
                  <Link href={routes.help} className="text-primary">
                    pagina de ajutor
                  </Link>
                  .
                </>
              }
              className="text-center mb-50"
              animationDelay=".2s"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8 mx-auto mb-60">
            <div
              className="bd-contact-form wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <ContactForm />
            </div>
          </div>
          {/* <div className="col-xl-10 mx-auto">
            <div
              className="bd-contact-map wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".4s"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2850.892489373652!2d26.09762361585209!3d44.43789807910244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff47c1d75eab%3A0x22d4c1e5c6c5c5c5!2sBucure%C8%99ti!5e0!3m2!1sro!2sro!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: "24px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Yuvoo - Mun. Focsani, România"
              ></iframe>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ContactFormMain;

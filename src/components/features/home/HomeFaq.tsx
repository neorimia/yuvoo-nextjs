import React from "react";

interface IFaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: IFaqItem[] = [
  {
    id: "faq1",
    question: "Este Yuvoo gratuit pentru părinți?",
    answer: "Da. Yuvoo este 100% gratuit pentru părinți. Vrem să alegi sportul fără presiune.",
  },
  {
    id: "faq2",
    question: "Cum verificați cluburile?",
    answer: "Analizăm documente, vizităm locații și discutăm cu antrenorii.",
  },
  {
    id: "faq3",
    question: "Datele copilului sunt în siguranță?",
    answer: "Da. Respectăm GDPR, nu partajăm date și nu publicăm informații sensibile.",
  },
  {
    id: "faq4",
    question: "Pot repeta quiz-ul?",
    answer: "Oricând. Copiii cresc, preferințele se schimbă.",
  },
];

const HomeFaq = () => {
  return (
    <section className="bd-faq-area pt-120 pb-95">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="bd-section-title-wrapper text-center mb-55 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <h2 className="bd-section-title mb-0">Întrebări frecvente</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="bd-faq-content bd-faq-content-4 mb-25 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".4s"
            >
              <div className="bd-faq">
                <div className="accordion" id="homeFaqAccordion">
                  {faqItems.map((item, index) => (
                    <div className="accordion-item" key={item.id}>
                      <h2 className="accordion-header" id={`heading${item.id}`}>
                        <button
                          className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${item.id}`}
                          aria-expanded={index === 0 ? "true" : "false"}
                          aria-controls={`collapse${item.id}`}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div
                        id={`collapse${item.id}`}
                        className={
                          index === 0
                            ? "accordion-collapse collapse show"
                            : "accordion-collapse collapse"
                        }
                        aria-labelledby={`heading${item.id}`}
                        data-bs-parent="#homeFaqAccordion"
                      >
                        <div className="accordion-body">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFaq;

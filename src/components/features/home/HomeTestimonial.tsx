import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import StarRating from "@/components/shared/StarRating";
import AvatarInitials from "@/components/shared/AvatarInitials";

/**
 * HomeTestimonial Component
 *
 * Displays a featured testimonial on the home page.
 * Uses reusable components (StarRating, AvatarInitials) and follows the design system.
 */

interface ITestimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  rating: number;
  initials: string;
}

const testimonials: ITestimonial[] = [
  {
    id: 1,
    quote:
      "Yuvoo ne-a ajutat să găsim clubul perfect pentru fetița noastră. Quiz-ul AI a surprins exact personalitatea ei și am descoperit sporturi pe care nu le-am considerat niciodată. Recomand cu căldură!",
    author: "Andreea M.",
    location: "București",
    rating: 5,
    initials: "AM",
  },
  {
    id: 2,
    quote:
      "Platforma este uimitoare! Am găsit un club de gimnastică verificat la doar 2 km de casă. Procesul de rezervare a fost simplu și rapid. Copilul meu este încântat!",
    author: "Mihai P.",
    location: "Cluj-Napoca",
    rating: 5,
    initials: "MP",
  },
  {
    id: 3,
    quote:
      "Ca părinte, siguranța este prioritatea mea. Yuvoo verifică toate cluburile și oferă informații detaliate despre antrenori și programe. Mă simt încredințat că aleg ce e mai bine pentru copilul meu.",
    author: "Elena D.",
    location: "Timișoara",
    rating: 5,
    initials: "ED",
  },
];

const HomeTestimonial = () => {
  // Show first testimonial for now (can be extended to show multiple or use a carousel)
  const featuredTestimonial = testimonials[0];

  return (
    <section className="bd-home-testimonial-area">
      <div className="container">
        <div className="row bd-home-testimonial-title-row">
          <div className="col-lg-8">
            <SectionTitle
              title="Ce spun părinții din Yuvoo"
              subtitle="Descoperă experiențele reale ale părinților care au găsit sporturile perfecte pentru copiii lor"
              className="bd-home-testimonial-title-wrapper"
              titleClassName="bd-home-testimonial-section-title"
              subtitleClassName="bd-home-testimonial-section-text"
            />
          </div>
        </div>
        <div className="row bd-home-testimonial-content-row">
          <div className="col-lg-8 col-md-10">
            <div
              className="bd-home-testimonial-card wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".4s"
            >
              <div className="bd-home-testimonial-avatar">
                <AvatarInitials
                  initials={featuredTestimonial.initials}
                  size="lg"
                  backgroundColor="var(--bd-theme-2)"
                  textColor="var(--bd-common-white)"
                />
              </div>
              <div className="bd-home-testimonial-quote">
                <p>&ldquo;{featuredTestimonial.quote}&rdquo;</p>
              </div>
              <div className="bd-home-testimonial-rating">
                <StarRating rating={featuredTestimonial.rating} size="lg" />
              </div>
              <div className="bd-home-testimonial-author">
                <h5 className="bd-home-testimonial-author-name">{featuredTestimonial.author}</h5>
                <p className="bd-home-testimonial-author-location">
                  <i className="fal fa-map-marker-alt"></i>
                  {featuredTestimonial.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonial;

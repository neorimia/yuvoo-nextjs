/**
 * Booking Form Section Component
 *
 * Wrapper component for the booking form that provides
 * a section layout consistent with other club detail sections.
 * Server Component wrapper for the client BookingForm.
 */

import React from "react";
import BookingForm from "./BookingForm";
import type { Club } from "@/modules/clubs/clubs.types";

interface BookingFormSectionProps {
  club: Club;
}

const BookingFormSection: React.FC<BookingFormSectionProps> = ({ club }) => {
  return (
    <section className="bd-booking-form-section pt-110 pb-70">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-8 col-lg-10">
            <div
              className="bd-booking-form-wrapper wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <BookingForm clubId={club.id} clubName={club.name} bookingType="club_trial" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingFormSection;

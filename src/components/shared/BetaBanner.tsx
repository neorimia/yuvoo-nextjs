"use client";

import React, { useState, useEffect } from "react";
import FeedbackModal from "./FeedbackModal";

/**
 * BetaBanner Component
 *
 * Displays a dismissible beta banner at the top of the page.
 * Respects Yuvoo brand guidelines with warm, supportive tone.
 * Uses localStorage to remember user's dismissal preference.
 */
const BetaBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner
    const dismissed = localStorage.getItem("beta-banner-dismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("beta-banner-dismissed", "true");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="bd-beta-banner">
        <div className="bd-beta-banner-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-beta-banner-wrapper d-flex align-items-center justify-content-between">
                <div className="bd-beta-banner-content d-flex align-items-center">
                  <div className="bd-beta-banner-icon">
                    <i className="flaticon-presentation"></i>
                  </div>
                  <div className="bd-beta-banner-text">
                    <p className="mb-0">
                      <strong>Versiune Beta:</strong> Yuvoo este în dezvoltare activă.{" "}
                      <span className="d-none d-md-inline">
                        Descoperă funcționalitățile noastre și ajută-ne să îmbunătățim platforma cu
                        feedback-ul tău.
                      </span>
                    </p>
                  </div>
                </div>
                <div className="bd-beta-banner-actions d-flex align-items-center">
                  <button
                    className="bd-beta-banner-feedback-btn"
                    onClick={handleOpenModal}
                    aria-label="Trimite feedback"
                    type="button"
                  >
                    <i className="fas fa-comment-alt me-2"></i>
                    <span className="d-none d-sm-inline">Trimite feedback</span>
                    <span className="d-inline d-sm-none">Feedback</span>
                  </button>
                  <button
                    className="bd-beta-banner-close"
                    onClick={handleDismiss}
                    aria-label="Închide banner-ul beta"
                    type="button"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeedbackModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default BetaBanner;

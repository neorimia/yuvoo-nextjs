"use client";

import React, { useState, useEffect } from "react";

interface ClubClaimProfileProps {
  clubId: string;
  clubSlug: string;
}

/**
 * Club Claim Profile Sticky Component
 *
 * Sticky button/zone displayed on club details page after user scrolls down.
 * Allows club representatives to claim their profile, correct data, or request profile hiding.
 * UI-only implementation - backend functionality to be added later.
 */
export default function ClubClaimProfile({ clubId, clubSlug }: ClubClaimProfileProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after user scrolls 300px down
      const scrollThreshold = 300;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  const handleClaimProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: Implement claim profile functionality
    // For now, mailto contact@yuvoo.ro for further instructions
    const subject = encodeURIComponent(`Revendicare profil club - ID: ${clubId}`);
    const body = encodeURIComponent(
      `Bună ziua,\n\nSunt reprezentantul acestui club și doresc să revendic profilul pentru a-l gestiona și actualiza.\n\n` +
        `ID Club: ${clubId}\n` +
        `Slug Club: ${clubSlug}\n\n` +
        `Vă rog să mă contactați pentru a continua cu procesul de revendicare și actualizare a datelor.\n\n` +
        `Mulțumesc,\n[Numele meu]`
    );
    window.location.href = `mailto:contact@yuvoo.ro?subject=${subject}&body=${body}`;
  };

  const handleCorrectData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: Implement correct data functionality
    // For now, mailto contact@yuvoo.ro for further instructions
    const subject = encodeURIComponent(`Corectare date club - ID: ${clubId}`);
    const body = encodeURIComponent(
      `Bună ziua,\n\nSunt reprezentantul acestui club și doresc să corectez informațiile afișate în profil.\n\n` +
        `ID Club: ${clubId}\n` +
        `Slug Club: ${clubSlug}\n\n` +
        `Datele care trebuie corectate:\n` +
        `[Vă rog să specificați aici ce informații trebuie actualizate]\n\n` +
        `Vă rog să actualizați datele conform informațiilor furnizate.\n\n` +
        `Mulțumesc,\n[Numele meu]`
    );
    window.location.href = `mailto:contact@yuvoo.ro?subject=${subject}&body=${body}`;
  };

  const handleRequestHide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: Implement request hide functionality
    // For now, mailto contact@yuvoo.ro for further instructions
    const subject = encodeURIComponent(`Solicitare ascundere profil - ID: ${clubId}`);
    const body = encodeURIComponent(
      `Bună ziua,\n\nSunt reprezentantul acestui club și doresc să solicit ascunderea profilului de pe platformă.\n\n` +
        `ID Club: ${clubId}\n` +
        `Slug Club: ${clubSlug}\n\n` +
        `Motivul solicitării:\n` +
        `[Vă rog să specificați aici motivul pentru care doriți să ascundeți profilul]\n\n` +
        `Vă rog să procesați această solicitare cât mai curând posibil.\n\n` +
        `Mulțumesc,\n[Numele meu]`
    );
    window.location.href = `mailto:contact@yuvoo.ro?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* Desktop Version - Bottom right sticky card */}
      <div
        className="d-none d-md-block position-fixed"
        style={{
          bottom: "20px",
          right: "20px",
          zIndex: 1000, // Above content, below modals (typically 1050+)
          maxWidth: "320px",
        }}
        role="complementary"
        aria-label="Acțiuni reprezentant club"
      >
        <div className="card shadow-lg border-0">
          <div className="card-body p-3">
            {/* Primary Message */}
            <p className="small mb-3 fw-semibold text-dark" style={{ lineHeight: "1.4" }}>
              <i className="fa-regular fa-building me-2 text-yuvoo-primary"></i>
              Ești reprezentantul acestui club? Revendică profilul
            </p>

            {/* Action Buttons */}
            <div className="d-flex flex-column gap-2">
              <button
                type="button"
                className="bd-btn bd-btn-sm w-100"
                onClick={handleClaimProfile}
                aria-label="Revendică profilul clubului"
              >
                <span className="bd-btn-inner">
                  <span className="bd-btn-normal">Revendică profilul</span>
                  <span className="bd-btn-hover">Revendică profilul</span>
                </span>
              </button>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="bd-btn bd-btn-secondary bd-btn-sm flex-fill"
                  onClick={handleCorrectData}
                  aria-label="Corectează datele clubului"
                >
                  <span className="bd-btn-inner">
                    <span className="bd-btn-normal">Corectează date</span>
                    <span className="bd-btn-hover">Corectează date</span>
                  </span>
                </button>

                <button
                  type="button"
                  className="bd-btn bd-btn-secondary bd-btn-sm flex-fill"
                  onClick={handleRequestHide}
                  aria-label="Solicită ascunderea profilului"
                >
                  <span className="bd-btn-inner">
                    <span className="bd-btn-normal">Solicită ascunderea</span>
                    <span className="bd-btn-hover">Solicită ascunderea</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version - Bottom fixed bar */}
      <div
        className="d-md-none position-fixed w-100"
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "white",
          borderTop: "1px solid #e6e6e6",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
        }}
        role="complementary"
        aria-label="Acțiuni reprezentant club"
      >
        <div className="container p-2">
          <p
            className="small mb-2 fw-semibold text-dark text-center"
            style={{ lineHeight: "1.4", fontSize: "0.75rem" }}
          >
            <i className="fa-regular fa-building me-1 text-yuvoo-primary"></i>
            Ești reprezentantul acestui club?
          </p>
          <div className="d-flex flex-column gap-1">
            <button
              type="button"
              className="bd-btn bd-btn-sm w-100 text-center d-flex justify-content-center"
              onClick={handleClaimProfile}
              aria-label="Revendică profilul clubului"
            >
              <span className="bd-btn-inner">
                <span className="bd-btn-normal">Revendică profilul</span>
                <span className="bd-btn-hover">Revendică profilul</span>
              </span>
            </button>
            <div className="d-flex gap-1">
              <button
                type="button"
                className="bd-btn bd-btn-secondary bd-btn-sm flex-fill text-center d-flex justify-content-center"
                onClick={handleCorrectData}
                aria-label="Corectează datele"
              >
                <span className="bd-btn-inner">
                  <span className="bd-btn-normal">Corectează date</span>
                  <span className="bd-btn-hover">Corectează date</span>
                </span>
              </button>
              <button
                type="button"
                className="bd-btn bd-btn-secondary bd-btn-sm flex-fill text-center d-flex justify-content-center"
                onClick={handleRequestHide}
                aria-label="Solicită ascunderea profilului"
              >
                <span className="bd-btn-inner">
                  <span className="bd-btn-normal">Ascunde</span>
                  <span className="bd-btn-hover">Ascunde</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import React from "react";

interface ClubClaimProfileProps {
  clubId: string;
  clubSlug: string;
}

/**
 * Club Claim Profile Section
 *
 * Section at the bottom of club details page. Allows club representatives to
 * claim their profile. Renders in document flow (not sticky/fixed).
 * UI-only implementation - backend functionality to be added later.
 */
export default function ClubClaimProfile({ clubId, clubSlug }: ClubClaimProfileProps) {
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

  const _handleCorrectData = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const _handleRequestHide = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <section
      className="mt-5 mb-4 wow fadeInUp"
      data-wow-duration="1s"
      data-wow-delay=".3s"
      role="complementary"
      aria-label="Acțiuni reprezentant club"
    >
      <div className="card shadow-sm border-0 w-100 mx-auto" style={{ maxWidth: "420px" }}>
        <div className="card-body p-3 p-md-4">
          <p className="mb-3 fw-semibold text-dark text-center" style={{ lineHeight: "1.4" }}>
            <i className="fa-regular fa-building me-2 text-yuvoo-primary" aria-hidden="true"></i>
            Ești reprezentantul acestui club?
          </p>
          <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
            <button
              type="button"
              className="bd-btn bd-btn-sm text-center"
              onClick={handleClaimProfile}
              aria-label="Revendică profilul clubului"
            >
              <span className="bd-btn-inner">
                <span className="bd-btn-normal">Revendică profilul</span>
                <span className="bd-btn-hover">Revendică profilul</span>
              </span>
            </button>
            <button
              type="button"
              className="bd-btn bd-btn-sm text-center"
              onClick={_handleCorrectData}
              aria-label="Corectează datele clubului"
            >
              <span className="bd-btn-inner">
                <span className="bd-btn-normal">Corectează datele</span>
                <span className="bd-btn-hover">Corectează datele</span>
              </span>
            </button>
            <button
              type="button"
              className="bd-btn bd-btn-sm text-center"
              onClick={_handleRequestHide}
              aria-label="Solicită ascunderea profilului clubului"
            >
              <span className="bd-btn-inner">
                <span className="bd-btn-normal">Solicită ascunderea</span>
                <span className="bd-btn-hover">Solicită ascunderea</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

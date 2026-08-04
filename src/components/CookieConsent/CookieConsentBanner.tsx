"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { acceptAllCookies, rejectNonEssentialCookies, hasConsented } from "@/lib/cookies";
import { initializePostHog } from "@/lib/analytics/posthog";

const CookieConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    if (!hasConsented()) {
      // Small delay to avoid flash of banner
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setShowBanner(false);
    // Initialize PostHog after consent
    initializePostHog();
  };

  const handleRejectNonEssential = () => {
    rejectNonEssentialCookies();
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="bd-cookie-consent-banner">
      <div className="bd-cookie-consent-content">
        <div className="bd-cookie-consent-text">
          <h3 className="bd-cookie-consent-title">
            Folosim cookie-uri pentru a îmbunătăți experiența ta
          </h3>
          <p className="bd-cookie-consent-description">
            Yuvoo folosește cookie-uri esențiale pentru funcționarea platformei și cookie-uri
            opționale pentru analiză. Poți accepta toate cookie-urile sau respinge cookie-urile
            opționale (analiză).{" "}
            <Link href={routes.cookies} className="bd-cookie-consent-link">
              Află mai multe
            </Link>
          </p>
        </div>
        <div className="bd-cookie-consent-actions">
          <button
            type="button"
            onClick={handleRejectNonEssential}
            className="bd-cookie-consent-btn bd-cookie-consent-btn-secondary"
            aria-label="Respinge cookie-urile opționale de analiză"
          >
            Respinge cookie-urile opționale
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="bd-cookie-consent-btn bd-cookie-consent-btn-primary"
          >
            Accept toate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;

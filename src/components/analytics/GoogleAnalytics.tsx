"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  GA_MEASUREMENT_ID,
  shouldLoadGoogleAnalytics,
  trackGaPageview,
} from "@/lib/analytics/gtag";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [enabled, setEnabled] = useState(false);

  const checkConsent = useCallback(() => {
    setEnabled(shouldLoadGoogleAnalytics());
  }, []);

  useEffect(() => {
    checkConsent();

    window.addEventListener(COOKIE_CONSENT_EVENT, checkConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, checkConsent);
  }, [checkConsent]);

  useEffect(() => {
    if (!enabled) return;

    const url = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

    trackGaPageview(url);
  }, [pathname, searchParams, enabled]);

  if (!enabled || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted'
          });
          gtag('config', '${GA_MEASUREMENT_ID}', {
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  );
}

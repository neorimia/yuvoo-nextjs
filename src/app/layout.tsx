import { Gabarito } from "next/font/google";
import GlobalVideoModal from "@/components/Popup/GlobalVideoModal";
import CookieConsentBanner from "@/components/CookieConsent/CookieConsentBanner";
import OrganizationSchema from "@/components/SEO/OrganizationSchema";
import { VideoProvider } from "@/provider/VideoProvider";
import AppProvider from "@/provider/AppProvider";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "swiper/css/bundle";
import "react-photo-view/dist/react-photo-view.css";
import "prismjs/themes/prism-tomorrow.css";
import ReduxProvider from "@/redux/provider";
import { PostHogProviderWrapper } from "@/lib/analytics/posthog";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { WebVitalsReporter } from "@/components/monitoring/WebVitalsReporter";
import "./globals.scss"; // Bootstrap + SCSS

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yuvoo - Descoperă sportul potrivit copilului tău",
  description:
    "Yuvoo este platforma AI care ajută părinții din România să găsească activitățile sportive potrivite pentru copiii lor (4-14 ani). Descoperă sporturi personalizate, cluburi verificate și specialiști pediatri.",
  keywords: [
    "sport copii",
    "cluburi sportive copii",
    "activități sportive",
    "sport pentru copii România",
    "specialiști pediatri sport",
    "recomandări sport AI",
  ],
  authors: [{ name: "Yuvoo" }],
  creator: "Yuvoo",
  publisher: "Yuvoo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yuvoo - Descoperă sportul potrivit copilului tău",
    description:
      "Platformă AI pentru descoperirea activităților sportive potrivite pentru copiii tăi. Cluburi verificate și specialiști pediatri.",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    siteName: "Yuvoo",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/assets/img/logo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yuvoo - Platformă AI pentru sporturi copii",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuvoo - Descoperă sportul potrivit copilului tău",
    description:
      "Platformă AI pentru descoperirea activităților sportive potrivite pentru copiii tăi.",
    images: ["/assets/img/logo/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Yuvoo",
  },
  // Note: Next.js 15 automatically detects icon.svg, icon.png, favicon.ico, and apple-icon.png
  // from src/app/ directory. The icons metadata above provides additional explicit links.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body suppressHydrationWarning className={`${gabarito.variable}`}>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <PostHogProviderWrapper>
              <WebVitalsReporter />
              <OrganizationSchema />
              <VideoProvider>
                <ReduxProvider>
                  <AppProvider>{children}</AppProvider>
                  <Toaster position="top-center" richColors />
                  <GlobalVideoModal />
                  <CookieConsentBanner />
                </ReduxProvider>
              </VideoProvider>
            </PostHogProviderWrapper>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}

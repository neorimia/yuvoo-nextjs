import { Gabarito } from "next/font/google";
import GlobalVideoModal from "@/components/Popup/GlobalVideoModal";
import { VideoProvider } from "@/provider/VideoProvider";
import AppProvider from "@/provider/AppProvider";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.scss"; // Bootstrap + SCSS (existing components)
import "./globals.css"; // Tailwind CSS (new components)
import "swiper/css/bundle";
import "react-photo-view/dist/react-photo-view.css";
import "prismjs/themes/prism-tomorrow.css";
import ReduxProvider from "@/redux/provider";

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
        url: "/assets/img/og-image.jpg", // TODO: Add OG image
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
    images: ["/assets/img/twitter-image.jpg"], // TODO: Add Twitter image
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body suppressHydrationWarning className={`${gabarito.variable}`}>
        <VideoProvider>
          <ReduxProvider>
            <AppProvider>{children}</AppProvider>
            <Toaster position="top-center" richColors />
            <GlobalVideoModal />
          </ReduxProvider>
        </VideoProvider>
      </body>
    </html>
  );
}

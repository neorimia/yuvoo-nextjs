import { Fredoka } from "next/font/google";
import GlobalVideoModal from "@/components/Popup/GlobalVideoModal";
import { VideoProvider } from "@/provider/VideoProvider";
import AppProvider from "@/provider/AppProvider";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.scss";
import "swiper/css/bundle";
import "react-photo-view/dist/react-photo-view.css";
import 'prismjs/themes/prism-tomorrow.css';
import ReduxProvider from "@/redux/provider";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kindedo - Kindergarten & School Next js Template",
  description:
    "Kindedo Next js Template is focused on preschool and daycare institutions, children groups, playschools, kindergartens, and kids stores. It has all the needed features for a kindergarten or a daycare website, as well as for a children’s goods store or childcare blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${fredoka.variable}`}>
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
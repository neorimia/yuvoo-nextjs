import PreLaunchPage from "@/components/features/early-access/PreLaunchPage";
import { PRE_LAUNCH_RESTRICTIONS_ENABLED } from "@/lib/config/pre-launch";
import type { Metadata } from "next";

/**
 * Search Page Layout
 *
 * Layout for search page to add metadata (noindex).
 * Since the search page is a client component, metadata must be defined in a layout.
 */
export const metadata: Metadata = {
  title: "Căutare - Yuvoo",
  description: "Caută cluburi sportive, doctori sau sporturi pe platforma Yuvoo.",
  robots: {
    index: false, // Search utility page - should not be indexed
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  if (PRE_LAUNCH_RESTRICTIONS_ENABLED) {
    return <PreLaunchPage routeType="dashboard" />;
  }
  return <>{children}</>;
}

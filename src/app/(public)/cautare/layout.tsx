import type { Metadata } from "next";
import { routes } from "@/lib/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "Căutare | Yuvoo",
  description: "Caută cluburi sportive, doctori sau sporturi pe platforma Yuvoo.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${getSiteUrl()}${routes.search}`,
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}

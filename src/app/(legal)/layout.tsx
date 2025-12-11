import YuvooHeader from "@/layouts/Header/YuvooHeader";
import FooterOne from "@/layouts/Footer/FooterOne";
import React from "react";
import Wrapper from "@/layouts/Wrapper";

/**
 * Public Routes Layout
 *
 * Layout for public app pages (no authentication required).
 * Includes: quiz, clubs, doctors, search
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <YuvooHeader />
      <main>{children}</main>
      <FooterOne />
    </Wrapper>
  );
}

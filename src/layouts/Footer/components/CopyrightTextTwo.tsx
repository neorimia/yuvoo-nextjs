"use cache";
import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
// import { cacheLife } from "next/cache";

const CopyrightTextTwo = async () => {
  // CACHED: Copyright year cached for 1 year (changes annually)
  // cacheLife('max') - year changes once per year, safe to cache long-term
  return (
    <div className="bd-footer-copyright pb-5 pt-25">
      <div className="bd-footer-copyright-wrap d-flex flex-column flex-md-row align-items-md-center justify-content-md-center gap-3">
        <div className="bd-footer-copyright-text is-white pb-20">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Yuvoo. Toate drepturile rezervate.
          </p>
        </div>
        <div className="bd-footer-legal-links d-flex flex-wrap align-items-center justify-content-center gap-3 pb-20">
          <Link href={routes.privacy} className="bd-footer-legal-link is-white">
            Politică de confidențialitate
          </Link>
          <span className="bd-footer-legal-separator is-white">|</span>
          <Link href={routes.terms} className="bd-footer-legal-link is-white">
            Termeni și condiții
          </Link>
          <span className="bd-footer-legal-separator is-white">|</span>
          <Link href={routes.cookies} className="bd-footer-legal-link is-white">
            Politică cookies
          </Link>
          <span className="bd-footer-legal-separator is-white">|</span>
          <Link href={routes.gdpr} className="bd-footer-legal-link is-white">
            GDPR pentru părinți
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CopyrightTextTwo;

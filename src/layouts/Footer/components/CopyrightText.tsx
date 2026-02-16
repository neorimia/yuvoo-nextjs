"use cache";
import React from "react";
import Link from "next/link";
import wave from "../../../../public/assets/img/shape/wave-line.png";
import Image, { StaticImageData } from "next/image";
import { routes } from "@/lib/routes";
// import { cacheLife } from "next/cache";

interface CopyrightTextProps {
  copyright_space?: string;
  copyright_shape?: StaticImageData;
}

const CopyrightText: React.FC<CopyrightTextProps> = async ({
  copyright_space,
  copyright_shape,
}) => {
  // CACHED: Copyright year cached for 1 year (changes annually)
  // cacheLife('max') - year changes once per year, safe to cache long-term
  return (
    <div className={`bd-footer-copyright ${copyright_space || "pb-5"}`}>
      <div className="bd-footer-copyright-line pb-20">
        <Image
          src={copyright_shape || wave}
          style={{ width: "100%", height: "auto" }}
          alt="img not found"
        />
      </div>
      <div className="container">
        <div className="bd-footer-copyright-wrap d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 pb-20">
          <div className="bd-footer-copyright-text">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Yuvoo. Toate drepturile rezervate.
            </p>
            <p className="mb-0 small text-body-secondary">
              Built &amp; maintained by{" "}
              <Link href={routes.neorimia} className="text-body-secondary">
                Neorimia
              </Link>
            </p>
          </div>
          <div className="bd-footer-legal-links d-flex flex-wrap align-items-center justify-content-center gap-3">
            <Link href={routes.privacy} className="bd-footer-legal-link">
              Politică de confidențialitate
            </Link>
            <span className="bd-footer-legal-separator">|</span>
            <Link href={routes.terms} className="bd-footer-legal-link">
              Termeni și condiții
            </Link>
            <span className="bd-footer-legal-separator">|</span>
            <Link href={routes.cookies} className="bd-footer-legal-link">
              Politică cookies
            </Link>
            <span className="bd-footer-legal-separator">|</span>
            <Link href={routes.gdpr} className="bd-footer-legal-link">
              GDPR pentru părinți
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightText;

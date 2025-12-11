"use cache";
import React from "react";
// import { cacheLife } from "next/cache";

const CopyrightTextTwo = async () => {
  // CACHED: Copyright year cached for 1 year (changes annually)
  // cacheLife('max') - year changes once per year, safe to cache long-term
  return (
    <div className="bd-footer-copyright pb-5 pt-25">
      <div className="bd-footer-copyright-wrap d-flex justify-content-center">
        <div className="bd-footer-copyright-text is-white pb-20">
          <p>&copy; {new Date().getFullYear()} Yuvoo. Toate drepturile rezervate.</p>
        </div>
      </div>
    </div>
  );
};

export default CopyrightTextTwo;

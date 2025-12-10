import React from "react";
import wave from "../../../../public/assets/img/shape/wave-line.png";
import Image, { StaticImageData } from "next/image";

interface CopyrightTextProps {
  copyright_space?: string;
  copyright_shape?: StaticImageData;
}

const CopyrightText: React.FC<CopyrightTextProps> = ({ copyright_space, copyright_shape }) => {
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
        <div className="bd-footer-copyright-wrap d-flex align-items-md-center justify-content-center">
          <div className="bd-footer-copyright-text pb-20">
            <p>&copy; {new Date().getFullYear()} Yuvoo. Toate drepturile rezervate.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightText;

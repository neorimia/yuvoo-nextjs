import Link from "next/link";
import React from "react";
import Image from "next/image";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import bg from "../../../public/assets/img/bg/breadcrumb-bg.jpg";
import line_1 from "../../../public/assets/img/shape/white-curved-line.png";
import line_2 from "../../../public/assets/img/shape/curved-line-2.png";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  title?: string;
  subTitle?: string;
  items?: BreadcrumbItem[]; // Optional: for BreadcrumbList schema
}

const BreadcrumbOne: React.FC<BreadcrumbProps> = ({ title, subTitle, items }) => {
  // Generate breadcrumb items if not provided
  // For listing pages (title === subTitle), just home + current page
  // For detail pages, items should be passed explicitly
  const breadcrumbItems: BreadcrumbItem[] =
    items ||
    (title
      ? [
          { name: "Yuvoo", url: "/" },
          { name: title, url: "" }, // Current page - empty URL indicates this is the current page
        ]
      : [{ name: "Yuvoo", url: "/" }]);

  return (
    <section className="bd-breadcrumb-area p-relative fix theme-bg">
      <BreadcrumbSchema items={breadcrumbItems} />
      <div className="bd-breadcrumb-bg" style={{ backgroundImage: `url(${bg.src})` }}></div>
      <div className="bd-breadcrumb-wrapper mb-60 p-relative">
        <div className="container">
          <div className="bd-breadcrumb-shape d-none d-sm-block p-relative">
            <div className="bd-breadcrumb-shape-1">
              <Image src={line_2} style={{ width: "100%", height: "100%" }} alt="img not found" />
            </div>
            <div className="bd-breadcrumb-shape-2">
              <Image src={line_1} style={{ width: "100%", height: "100%" }} alt="img not found" />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="bd-breadcrumb d-flex align-items-center justify-content-center">
                <div className="bd-breadcrumb-content text-center">
                  <h1 className="bd-breadcrumb-title">{title}</h1>
                  <div className="bd-breadcrumb-list">
                    <span>
                      <Link href="/">
                        <i className="flaticon-hut"></i>Yuvoo
                      </Link>
                    </span>
                    <span>{subTitle}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bd-wave-wrapper bd-wave-wrapper-3">
        <div className="bd-wave bd-wave-3"></div>
        <div className="bd-wave bd-wave-3"></div>
      </div>
    </section>
  );
};

export default BreadcrumbOne;

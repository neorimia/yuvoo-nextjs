"use client";

import React from "react";
import CountUpContent from "@/components/Common/CounterUp/CountUpContent";

/**
 * HomeStats Component
 *
 * Displays key statistics about Yuvoo platform with animated counters.
 * Used on the home page to build trust and show platform scale.
 */

interface StatItem {
  id: number;
  count: number;
  title: string;
  icon: string;
  text: string;
}

const statsData: StatItem[] = [
  {
    id: 1,
    count: 5000,
    title: "Familii",
    icon: "flaticon-friends",
    text: "+",
  },
  {
    id: 2,
    count: 500,
    title: "Cluburi sportive",
    icon: "flaticon-certificate",
    text: "+",
  },
  {
    id: 3,
    count: 50,
    title: "Specialiști pediatri",
    icon: "flaticon-teacher",
    text: "+",
  },
  {
    id: 4,
    count: 15,
    title: "Sporturi disponibile",
    icon: "flaticon-sports",
    text: "+",
  },
];

const HomeStats = () => {
  return (
    <section className="bd-stats-area">
      <div className="container">
        <div className="row bd-stats-title-row">
          <div className="col-lg-8">
            <div
              className="bd-stats-title-wrapper wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <h2 className="bd-stats-section-title">Yuvoo în cifre</h2>
              <p className="bd-stats-section-text">
                Platforma care conectează părinții cu cele mai bune opțiuni sportive pentru copiii
                lor
              </p>
            </div>
          </div>
        </div>
        <div className="row bd-stats-cards-row">
          {statsData.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-10 bd-stats-card-col" key={item.id}>
              <div
                className="bd-stats-card wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay={`${0.1 * (index + 1)}s`}
              >
                <div className="bd-stats-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="bd-stats-content">
                  <div className="bd-stats-number">
                    <CountUpContent number={item.count} add_style={false} text={item.text} />
                  </div>
                  <div className="bd-stats-text">
                    <span>{item.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;

import React from "react";
import TeacherSkills from "./TeacherSkills";
import TeacherInfo from "./TeacherInfo";
import Image from "next/image";
import { teacherData } from "@/data";

const TeacherDetailsMain = ({ id }: { id: number }) => {
  const teacher = teacherData.find((item) => item.id == id);
  return (
    <section className="bd-teacher-widget-area pb-70 pt-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-50">
            <div
              className="bd-teacher-widget wow fadeInLeft"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <div className="bd-teacher-widget-thumb p-relative">
                {teacher?.img && (
                  <Image
                    src={teacher?.img}
                    style={{ width: "100%", height: "100%" }}
                    alt="img not found"
                  />
                )}
                <div className="panel wow"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-50">
            <div
              className="bd-teacher-widget theme-bg-6 wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <div className="bd-teacher-widget-content">
                <h3 className="bd-teacher-widget-title">{teacher?.name}</h3>
                <span className="bd-teacher-widget-tag">{teacher?.designation}</span>
                <p>
                  The foundation of the Montessori philosophy is based upon the idea that children
                  should work at their own pace, according to their own strengths in surroundings
                  that help to develop their intelligence, keed the good work, will help kindedo.
                </p>
                <p>
                  Observers of Montessori children note that they are confident, caringperceptive,
                  independent.
                </p>
                {teacher?.social_links && (
                  <div className="bd-teacher-widget-social">
                    <span>Follow Me:</span>
                    <ul>
                      {teacher?.social_links.map((social, i) => (
                        <li key={i}>
                          <a target={social.target} href={social.link} rel="noreferrer">
                            <i className={social.icon}></i>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <TeacherSkills />
          <TeacherInfo />
        </div>
      </div>
    </section>
  );
};

export default TeacherDetailsMain;

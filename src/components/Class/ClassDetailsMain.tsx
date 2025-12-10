import { classData } from '@/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import class_img from "../../../public/assets/img/class/6.jpg";
import author_img from "../../../public/assets/img/program/author-1.png";

const ClassDetailsMain = ({ id }: { id: number }) => {
    const classItem = classData.find((item) => item.id == id);
    return (
        <section className="bd-class-details-widget pt-120 pb-70">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-12 mb-50">
                        <div className="bd-class-details-thumb p-relative wow fadeInLeft" data-wow-duration="1s"
                            data-wow-delay=".3s">
                            <Image src={classItem?.img ? classItem?.img : class_img} style={{ width: "100%", height: "100%" }} alt="img not found" />
                            <div className="panel wow"></div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 mb-50">
                        <div className="bd-class-details-widget-content theme-bg-6 wow fadeInRight" data-wow-duration="1s" data-wow-delay=".3s">
                            <h3 className="bd-class-details-widget-title mb-20">{classItem?.title}</h3>
                            <p className="mb-25">The foundation of the Montessori philosophy is based upon the idea that children
                                should work at their own pace, according to their own strengths in surroundings that help to
                                develop their intelligence, keed the good work, will help kindedo.</p>
                            <p className="mb-25">Observers of Montessori children note that they are confident, caringperceptive,
                                independent. Our multi-level kindergarten programs cater to the age group of 2-5 years.</p>
                            <div className="bd-class-details-author-wrapper mt-35">
                                <div className="bd-class-details-author">
                                    <div className="bd-class-details-author-thumb"><Image src={classItem?.authorImg ? classItem?.authorImg : author_img} style={{ width: "100%", height: "100%" }} alt="img not found" />
                                    </div>
                                    <div className="bd-class-details-author-name">
                                        <span>Class Teacher</span>
                                        <h5><Link href="/teachers">{classItem?.authorName ? classItem?.authorName : 'Alexia Honix'}</Link></h5>
                                    </div>
                                </div>
                                <div className="bd-class-details-cat">
                                    <span>Categories</span>
                                    <h5>Kindergarten</h5>
                                </div>
                                <div className="bd-class-details-cat">
                                    <span>Per/Month</span>
                                    <h5>${classItem?.price}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClassDetailsMain;
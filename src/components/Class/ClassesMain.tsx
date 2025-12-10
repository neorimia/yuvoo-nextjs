import { classData } from '@/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ClassesMain = () => {
    return (
        <section className="bd-class-area pt-110 pb-70">
            <div className="container">
                <div className="row">
                    {classData.slice(4, 10).map((item, index) => (
                        <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                            <div className="bd-class-3 fix radius-24 p-relative mb-50 wow fadeInUp" data-wow-duration="1s"
                                data-wow-delay={item.delay}>
                                <div className="bd-class-thumb">
                                    {item.img && <Image src={item.img} style={{ width: "100%", height: "100%" }} alt="img not found" />}
                                </div>
                                <div className="bd-class-content-3 theme-bg-6 ">
                                    <h3 className="bd-class-title-3"><Link href={`/class-details/${item.id}`}>{item.title}</Link></h3>
                                    <p className="mb-20">{item.teaser}</p>
                                    <div className="bd-class-meta-wrapper d-flex justify-content-between align-items-center flex-wrap">
                                        <div className="bd-class-meta d-flex align-items-center flex-wrap">
                                            <div className="bd-class-meta-thumb">
                                                <Link href={`/class-details/${item.id}`}>
                                                    {item.authorImg && <Image src={item.authorImg} style={{ width: "100%", height: "100%" }} alt="img not found" />}
                                                </Link>
                                            </div>
                                            <span><Link href="/teachers">{item.authorName}</Link></span>
                                        </div>
                                        <div className="bd-class-meta">
                                            <div className="bd-class-meta-price">
                                                <span>${item.price}/</span>month
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bd-class-btn-3 theme-bg-2 text-center">
                                    <Link href={`/class-details/${item.id}`}>{item.btn}</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClassesMain;
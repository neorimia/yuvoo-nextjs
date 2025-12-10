"use client";

import factData from '@/data/fact-data';
import React from 'react';
import CountUpContent from '../Common/CounterUp/CountUpContent';

const AboutFactArea = () => {
    return (
        <div className="bd-counter-area-2 pb-90">
            <div className="container">
                <div className="row justify-content-center">
                    {factData.slice(3, 6).map((item, index) => (
                        <div className="col-lg-4 col-md-10 col-sm-10" key={index}>
                            <div className="bd-counter-2 mb-30">
                                <div className="bd-counter-2-icon">
                                    <i className={item.icon}></i>
                                </div>
                                <div className="bd-counter-2-content">
                                    <div className="bd-counter-2-number">
                                        <CountUpContent number={item.count} add_style={false} text={item.text} />
                                    </div>
                                    <div className="bd-counter-2-text">
                                        <span>{item.title}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutFactArea;
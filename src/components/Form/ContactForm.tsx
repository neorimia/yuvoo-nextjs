"use client";
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import ErrorMsg from './ErrorMassage';

interface FormData {
    firstName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row justify-center">
                <div className="col-lg-6">
                    <div className="bd-contact-input mb-30">
                        <input
                            {...register("firstName", { required: "Full Name is required" })}
                            id="firstName"
                            type="text"
                            placeholder="Full Name"
                        />
                        <ErrorMsg error={errors?.firstName?.message} />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="bd-contact-input mb-30">
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address",
                                },
                            })}
                            id="email"
                            type="email"
                            placeholder="Email Address"
                        />
                        <ErrorMsg error={errors?.email?.message} />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="bd-contact-input mb-30">
                        <input
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^\+?[0-9\s\-()]{7,20}$/,
                                    message: "Invalid phone number",
                                },
                            })}
                            id="phoneNumber"
                            type="text"
                            placeholder="Your Phone Number"
                        />
                        <ErrorMsg error={errors?.phone?.message} />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="bd-contact-input mb-30">
                        <input
                            {...register("subject", { required: "Subject is required" })}
                            id="subject"
                            type="text"
                            placeholder="Subject"
                        />
                        <ErrorMsg error={errors?.subject?.message} />
                    </div>
                </div>

                <div className="col-xxl-12">
                    <div className="bd-contact-input mb-15">
                        <textarea
                            {...register("message", { required: "Write your message here" })}
                            id="message"
                            placeholder="Message"
                        ></textarea>
                        <ErrorMsg error={errors?.message?.message} />
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="bd-contact-agree d-flex align-items-center mb-20">
                        <input id="privacy-check" type="checkbox" />
                        <label htmlFor="privacy-check">I agree to {`Kindedo's`} <span
                            className="text-border-highlights"><Link href="/privacy-policy">
                                privacy policy</Link><span
                                    className="theme-white h-1px bottom-0"></span></span>..</label>
                    </div>
                </div>

                <div className="col-xxl-12">
                    <div className="bd-contact-agree-btn">
                        <button type="submit" className="bd-btn">
                            <span className="bd-btn-inner">
                                <span className="bd-btn-normal">Send now</span>
                                <span className="bd-btn-hover">Send now</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ContactForm;
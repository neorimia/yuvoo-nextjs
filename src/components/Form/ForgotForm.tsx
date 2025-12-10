"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import ErrorMsg from './ErrorMassage';
import { EmailSvgIcon } from '../SVG';

type ForgotFormData = {
    email: string;
};

const ForgotForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotFormData>();

    const onSubmit = (data: ForgotFormData) => {
        console.log("Password Reset Email Sent:", data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='login__input-wrapper'>
                <div className="login__input-item">
                    <div className="login__input">
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" }
                            })}
                            id="emailAddress"
                            type="email"
                            placeholder="Email Address"
                        />
                        <span>
                            <EmailSvgIcon />
                        </span>
                    </div>
                    <ErrorMsg error={errors.email?.message} />
                </div>
            </div>
            <div className="login__btn text-center">
                <button type="submit" className="bd-btn">
                    <span className="bd-btn-inner">
                        <span className="bd-btn-normal">Send Request</span>
                        <span className="bd-btn-hover">Send Request</span>
                    </span>
                </button>
            </div>
        </form>
    );
};

export default ForgotForm;
"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMsg from './ErrorMassage';
import { EmailSvgIcon, EyeCutSvgIcon, LockSvgIcon } from '../SVG';


type SignInFormData = {
    email: string;
    password: string;
};

const SignInForm = () => {
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

    const onSubmit = (data: SignInFormData) => {
        console.log("Form Submitted:", data);
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
                <div className="login__input-item">
                    <div className="login__input-item-inner p-relative">
                        <div className="login__input">
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                                })}
                                id="password"
                                type={showPass ? "text" : "password"}
                                placeholder="Your Password"
                                autoComplete="true"
                            />
                            <span>
                                <LockSvgIcon />
                            </span>
                        </div>
                        <span
                            className="login-input-eye"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <i className="fa-regular fa-eye"></i> : <EyeCutSvgIcon />}
                        </span>
                    </div>
                    <ErrorMsg error={errors.password?.message} />
                </div>
            </div>

            <div className="login__option mb-25 d-sm-flex justify-content-between">
                <div className="login__remember">
                    <input type="checkbox" id="tp-remember" />
                    <label htmlFor="tp-remember">Remember me</label>
                </div>
                <div className="login__forgot">
                    <Link href="/forgot-password">forgot password?</Link>
                </div>
            </div>
            <div className="login__btn text-center">
                <button type="submit" className="bd-btn">
                    <span className="bd-btn-inner">
                        <span className="bd-btn-normal">Login</span>
                        <span className="bd-btn-hover">Login</span>
                    </span>
                </button>
            </div>
        </form>
    );
};

export default SignInForm;
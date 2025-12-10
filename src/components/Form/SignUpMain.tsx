"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMsg from './ErrorMassage';
import { EmailSvgIcon, EyeCutSvgIcon, LockSvgIcon, UserSvgIcon } from '../SVG';

type SignUpFormData = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};
const SignUpForm = () => {
    const [showPass, setShowPass] = useState(false);
    const [showConPass, setShowConPass] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();

    const onSubmit = (data: SignUpFormData) => {
        console.log("Sign Up Successful:", data);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='login__input-wrapper'>
                    <div className="login__input-item">
                        <div className="login__input">
                            <input
                                {...register("name", {
                                    required: "Full Name is required",
                                    minLength: { value: 3, message: "Name must be at least 3 characters" }
                                })}
                                id="fullName"
                                type="text"
                                placeholder="Full Name"
                            />
                            <span>
                                <UserSvgIcon />
                            </span>
                        </div>
                        <ErrorMsg error={errors.name?.message} />
                    </div>
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
                    <div className="login__input-item">
                        <div className="login__input-item-inner p-relative">
                            <div className="login__input">
                                <input
                                    {...register("passwordConfirmation", {
                                        required: "Confirm Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                                    })}
                                    id="PasswordConfirmation"
                                    type={showConPass ? "text" : "password"}
                                    placeholder="Confirm Your Password"
                                    autoComplete="true"
                                />
                                <span>
                                    <LockSvgIcon />
                                </span>
                            </div>
                            <span
                                className="login-input-eye"
                                onClick={() => setShowConPass(!showConPass)}
                            >
                                {showConPass ? <i className="fa-regular fa-eye"></i> : <EyeCutSvgIcon />}
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
                </div>
                <div className="login__btn text-center">
                    <button type="submit" className="bd-btn">
                        <span className="bd-btn-inner">
                            <span className="bd-btn-normal">Register Now</span>
                            <span className="bd-btn-hover">Register Now</span>
                        </span>
                    </button>
                </div>
            </form>
        </>
    );
};

export default SignUpForm;
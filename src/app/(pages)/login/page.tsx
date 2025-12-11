import React from 'react';
import { Metadata } from 'next';
import HomeNewsletter from '@/components/Newsletter/HomeNewsletter';
import BreadcrumbOne from '@/components/Breadcrumb/BreadcrumbOne';
import LoginMain from '@/components/Auth/LoginMain';

export const metadata: Metadata = {
    title: "Login - Kindergarten & School Next js Template",
};

const Login = () => {
    return (
        <>
            <BreadcrumbOne title="Login" subTitle="Login" />
            <LoginMain />
            <HomeNewsletter />
        </>
    );
};

export default Login;

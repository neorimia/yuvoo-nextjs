import React from 'react';
import { Metadata } from 'next';
import HomeNewsletter from '@/components/Newsletter/HomeNewsletter';
import BreadcrumbOne from '@/components/Breadcrumb/BreadcrumbOne';
import RegisterMain from '@/components/Auth/RegisterMain';

export const metadata: Metadata = {
    title: "Register - Kindergarten & School Next js Template",
};

const Register = () => {
    return (
        <>
            <BreadcrumbOne title="Register" subTitle="Register" />
            <RegisterMain />
            <HomeNewsletter />
        </>
    );
};

export default Register;

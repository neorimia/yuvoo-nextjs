import React from 'react';
import { Metadata } from 'next';
import HomeNewsletter from '@/components/Newsletter/HomeNewsletter';
import BreadcrumbOne from '@/components/Breadcrumb/BreadcrumbOne';
import TeachersMain from '@/components/Teacher/TeachersMain';

export const metadata: Metadata = {
    title: "Our Teachers - Kindergarten & School Next js Template",
};

const Teachers = () => {
    return (
        <>
            <BreadcrumbOne title="Teachers" subTitle="Our Teachers" />
            <TeachersMain />
            <HomeNewsletter />
        </>
    );
};

export default Teachers;

import React from 'react';
import { Metadata } from 'next';
import HomeNewsletter from '@/components/Newsletter/HomeNewsletter';
import BreadcrumbOne from '@/components/Breadcrumb/BreadcrumbOne';
import ProgramPromotionArea from '@/components/Promotion/ProgramPromotionArea';
import FaqMain from '@/components/FAQ/FaqMain';
import FaqQuestions from '@/components/FAQ/FaqQuestions';

export const metadata: Metadata = {
    title: "FAQ - Kindergarten & School Next js Template",
};

const FAQ = () => {
    return (
        <>
            <BreadcrumbOne title="FAQ" subTitle="FAQ" />
            <FaqMain />
            <FaqQuestions />
            <ProgramPromotionArea />
            <HomeNewsletter />
        </>
    );
};

export default FAQ;

import React from 'react';
import { Metadata } from 'next';
import HomeNewsletter from '@/components/Newsletter/HomeNewsletter';
import BreadcrumbOne from '@/components/Breadcrumb/BreadcrumbOne';
import AboutTestimonialArea from '@/components/Testimonial/AboutTestimonialArea';
import ProgramPromotionArea from '@/components/Promotion/ProgramPromotionArea';
import ProgramsMain from '@/components/Program/ProgramsMain';

export const metadata: Metadata = {
    title: "Our Programs - Kindergarten & School Next js Template",
};

const Programs = () => {
    return (
        <>
            <BreadcrumbOne title="Programs" subTitle="Our Programs" />
            <ProgramsMain />
            <AboutTestimonialArea />
            <ProgramPromotionArea />
            <HomeNewsletter />
        </>
    );
};

export default Programs;

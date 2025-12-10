import React from 'react';
import { Metadata } from 'next';
import HomeNewsletter from '@/components/Newsletter/HomeNewsletter';
import BreadcrumbOne from '@/components/Breadcrumb/BreadcrumbOne';
import HomeBannerArea from '@/components/Banner/HomeBannerArea';
import MoreProgrammers from '@/components/Program/ProgramSlider';
import ClassDetailsMain from '@/components/Class/ClassDetailsMain';
import ClassCategories from '@/components/Categories/ClassCategories';
import ClassDetailsWidget from '@/components/Class/ClassDetailsWidget';
import LearningSchedule from '@/components/Class/LearningSchedule';
import ClassDetailsWidgetTwo from '@/components/Class/ClassDetailsWidgetTwo';

export const metadata: Metadata = {
    title: "Class Details - Kindergarten & School Next js Template",
};

const ClassDetails = () => {
    return (
        <>
            <BreadcrumbOne title="Class Details" subTitle="Class Details" />
            <ClassDetailsMain id={1} />
            <ClassCategories />
            <ClassDetailsWidget />
            <LearningSchedule />
            <ClassDetailsWidgetTwo />
            <HomeBannerArea />
            <MoreProgrammers />
            <HomeNewsletter />
        </>
    );
};

export default ClassDetails;

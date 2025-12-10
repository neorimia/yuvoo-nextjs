import React from 'react';
import { Metadata } from 'next';
import HomeNewsletter from '@/components/Newsletter/HomeNewsletter';
import BreadcrumbOne from '@/components/Breadcrumb/BreadcrumbOne';
import GalleryMain from '@/components/Gallery/GalleryMain';

export const metadata: Metadata = {
    title: "Gallery - Kindergarten & School Next js Template",
};

const Gallery = () => {
    return (
        <>
            <BreadcrumbOne title="Gallery" subTitle="Gallery" />
            <GalleryMain />
            <HomeNewsletter />
        </>
    );
};

export default Gallery;

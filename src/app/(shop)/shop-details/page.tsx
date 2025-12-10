import React from 'react';
import { Metadata } from 'next';
import HomeNewsletter from '@/components/Newsletter/HomeNewsletter';
import BreadcrumbOne from '@/components/Breadcrumb/BreadcrumbOne';
import ShopDetailsMain from '@/components/Shop/ShopDetailsMain';

export const metadata: Metadata = {
    title: "Shop Details - Kindergarten & School Next js Template",
};

const ShopDetails = () => {
    return (
        <>
            <BreadcrumbOne title="Shop Details" subTitle="Shop Details" />
            <ShopDetailsMain id={1} />
            <HomeNewsletter />
        </>
    );
};

export default ShopDetails;

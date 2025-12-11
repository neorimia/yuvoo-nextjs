import React from 'react';
import { Metadata } from 'next';
import HomeNewsletter from '@/components/Newsletter/HomeNewsletter';
import BreadcrumbOne from '@/components/Breadcrumb/BreadcrumbOne';
import ShopMain from '@/components/Shop/ShopMain';

export const metadata: Metadata = {
    title: "Shop - Kindergarten & School Next js Template",
};

const Shop = () => {
    return (
        <>
            <BreadcrumbOne title="Shop" subTitle="Shop" />
            <ShopMain />
            <HomeNewsletter />
        </>
    );
};

export default Shop;

import React from 'react';
import { Metadata } from 'next';
import HomeNewsletter from '@/components/Newsletter/HomeNewsletter';
import BreadcrumbOne from '@/components/Breadcrumb/BreadcrumbOne';
import CartMain from '@/components/Shop/CartMain';

export const metadata: Metadata = {
    title: "Cart - Kindergarten & School Next js Template",
};

const Cart = () => {
    return (
        <>
            <BreadcrumbOne title="Cart" subTitle="Cart" />
            <CartMain />
            <HomeNewsletter />
        </>
    );
};

export default Cart;

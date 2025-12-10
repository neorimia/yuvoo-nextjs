import React from 'react';
import { Metadata } from 'next';
import HomeNewsletter from '@/components/Newsletter/HomeNewsletter';
import BreadcrumbOne from '@/components/Breadcrumb/BreadcrumbOne';
import ContactInfoArea from '@/components/Info/ContactInfoArea';
import ContactFormMain from '@/components/Contact/ContactFormMain';

export const metadata: Metadata = {
    title: "Contact Us - Kindergarten & School Next js Template",
};

const Contact = () => {
    return (
        <>
            <BreadcrumbOne title="Contact Us" subTitle="Contact Us" />
            <ContactInfoArea />
            <ContactFormMain />
            <HomeNewsletter />
        </>
    );
};

export default Contact;

import FooterThree from '@/layouts/Footer/FooterThree';
import HeaderThree from '@/layouts/Header/HeaderThree';
import Wrapper from '@/layouts/Wrapper';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Wrapper>
                <HeaderThree />
                {children}
                <FooterThree />
            </Wrapper>
        </>
    )
}

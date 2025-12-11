import React from 'react';
import HomeTwoClassArea from '@/components/Class/HomeTwoClassArea';
import HeroHomeTwo from '@/components/HeroArea/HeroHomeTwo';
import HomePromotionArea from '@/components/Promotion/HomePromotionArea';
import { Metadata } from 'next';
import promoImgTwo from "../../../public/assets/img/promotion/2.png";
import HomeTwoProgramArea from '@/components/Program/HomeTwoProgramArea';
import HomeAboutArea from '@/components/About/HomeAboutArea';
import HomeTwoTeacherArea from '@/components/Teacher/HomeTwoTeacherArea';
import HomeTwoTestimonialArea from '@/components/Testimonial/HomeTwoTestimonialArea';
import HomeBannerArea from '@/components/Banner/HomeBannerArea';
import HomeBlogArea from '@/components/Blog/HomeBlogArea';
import HomeTwoGalleryArea from '@/components/Gallery/HomeTwoGalleryArea';

export const metadata: Metadata = {
    title: "Home Two - Kindergarten & School Next js Template",
};

const HomeTwo = () => {
    return (
        <>
            <HeroHomeTwo />
            <HomeTwoClassArea />
            <HomePromotionArea promoImg={promoImgTwo} />
            <HomeTwoProgramArea />
            <HomeAboutArea />
            <HomeTwoTeacherArea />
            <HomeTwoTestimonialArea />
            <HomeBannerArea />
            <HomeBlogArea blog_wrap="bd-blog-content-2" blog_date="bd-blog-date-2" />
            <HomeTwoGalleryArea />
        </>
    );
};

export default HomeTwo;
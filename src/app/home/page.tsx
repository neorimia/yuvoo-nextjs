import HomeAboutArea from '@/components/About/HomeAboutArea';
import HomeBannerArea from '@/components/Banner/HomeBannerArea';
import HomeBlogArea from '@/components/Blog/HomeBlogArea';
import HomeClassArea from '@/components/Class/HomeClassArea';
import HeroHomeOne from '@/components/HeroArea/HeroHomeOne';
import HomeNewsletter from '@/components/Newsletter/HomeNewsletter';
import HomeProgramArea from '@/components/Program/HomeProgramArea';
import HomePromotionArea from '@/components/Promotion/HomePromotionArea';
import HomeTeacherArea from '@/components/Teacher/HomeTeacherArea';
import HomeTestimonialArea from '@/components/Testimonial/HomeTestimonialArea';
import React from 'react';

export default function HomePage() {
    return (
        <>
            <HeroHomeOne />
            <HomeClassArea />
            <HomePromotionArea />
            <HomeProgramArea />
            <HomeAboutArea />
            <HomeBannerArea />
            <HomeTeacherArea />
            <HomeTestimonialArea />
            <HomeBlogArea />
            <HomeNewsletter />
        </>
    );
};

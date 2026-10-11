import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { FeaturedPackages } from '../components/home/FeaturedPackages';
import { WhyUsSection } from '../components/home/WhyUsSection';
import { RealTourMoments } from '../components/home/RealTourMoments';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { CustomTripCTA } from '../components/home/CustomTripCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <CategoryShowcase />
      <FeaturedPackages />
      <WhyUsSection />
      <RealTourMoments />
      <TestimonialsSection />
      <CustomTripCTA />
    </div>
  );
};

import { useState } from 'react';
import { LoadingScreen } from '../components/LoadingScreen';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { WorkSection } from '../components/WorkSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

const Index = () => {
  const [showMainContent, setShowMainContent] = useState(false);

  const handleLoadingComplete = () => {
    setShowMainContent(true);
  };

  if (!showMainContent) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;

import { useState } from 'react';
import { LoadingScreen } from '../components/LoadingScreen';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { WorkSection } from '../components/WorkSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

interface HeroCard {
  id: number;
  title: string;
  subtitle: string;
  isVisible: boolean;
}

const Index = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const [stackedCards, setStackedCards] = useState<HeroCard[]>([]);

  const handleLoadingComplete = (finalCards: HeroCard[]) => {
    setStackedCards(finalCards);
    setShowMainContent(true);
  };

  if (!showMainContent) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection stackedCards={stackedCards} />
      <ServicesSection />
      <WorkSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;

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
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  const handleLoadingComplete = (finalCards: HeroCard[]) => {
    setStackedCards(finalCards);
    setShowMainContent(true);
    // Pequeno delay para permitir o fade in suave
    setTimeout(() => {
      setIsAnimatingIn(true);
    }, 100);
  };

  if (!showMainContent) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`min-h-screen bg-background transition-all duration-1000 ${isAnimatingIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <HeroSection stackedCards={stackedCards} />
      <div className={`transition-all duration-1000 delay-200 ${isAnimatingIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <ServicesSection />
      </div>
      <div className={`transition-all duration-1000 delay-300 ${isAnimatingIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <WorkSection />
      </div>
      <div className={`transition-all duration-1000 delay-400 ${isAnimatingIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <TestimonialsSection />
      </div>
      <div className={`transition-all duration-1000 delay-500 ${isAnimatingIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <CTASection />
      </div>
      <div className={`transition-all duration-1000 delay-600 ${isAnimatingIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Footer />
      </div>
    </div>
  );
};

export default Index;

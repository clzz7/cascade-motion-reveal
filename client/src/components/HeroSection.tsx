import { useScrollReveal } from '../hooks/useScrollReveal';
import { StackedCards } from './StackedCards';

interface HeroCard {
  id: number;
  title: string;
  subtitle: string;
  isVisible: boolean;
}

interface HeroSectionProps {
  stackedCards?: HeroCard[];
}

export const HeroSection = ({ stackedCards = [] }: HeroSectionProps) => {
  const titleRef = useScrollReveal();
  const descRef = useScrollReveal();
  const buttonRef = useScrollReveal();

  return (
    <section className="min-h-screen flex items-center justify-center page-padding">
      <div className="w-full max-w-4xl">
        <div className="text-center space-y-8">
          <div ref={titleRef}>
            <h1 className="text-hero font-bold text-foreground leading-tight">
              Full Stack AI Solutions
            </h1>
          </div>
          
          <div ref={descRef}>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Criamos experiências digitais excepcionais que conectam marcas com pessoas através de design inteligente e tecnologia de ponta.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" ref={buttonRef}>
            <button className="bg-foreground text-background px-8 py-4 rounded-full font-medium hover-scale">
              Get Started
            </button>
            <button className="text-foreground font-medium flex items-center gap-2 hover-scale story-link">
              Learn more
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
        
        {/* Cards empilhados do loading */}
        {stackedCards.length > 0 && (
          <div className="mt-16 flex justify-start">
            <StackedCards cards={stackedCards} />
          </div>
        )}
      </div>
    </section>
  );
};
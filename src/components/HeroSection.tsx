import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface HeroCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  isVisible: boolean;
}

const heroCards: HeroCard[] = [
  {
    id: 1,
    title: "Train AI",
    subtitle: "Custom Model Training",
    description: "Build powerful AI models tailored to your specific business needs",
    isVisible: true
  },
  {
    id: 2,
    title: "Deploy AI",
    subtitle: "Scalable Infrastructure", 
    description: "Deploy AI solutions with enterprise-grade reliability and performance",
    isVisible: false
  },
  {
    id: 3,
    title: "Optimize AI",
    subtitle: "Performance Monitoring",
    description: "Continuously monitor and improve your AI systems for maximum efficiency",
    isVisible: false
  },
  {
    id: 4,
    title: "AI Studio",
    subtitle: "Full Stack AI Solutions",
    description: "Professional AI development and integration services for modern businesses",
    isVisible: false
  }
];

export const HeroSection = () => {
  const [cards, setCards] = useState(heroCards);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const animateCards = async () => {
      for (let i = 0; i < cards.length - 1; i++) {
        await new Promise(resolve => {
          timeoutId = setTimeout(() => {
            setCards(prev => prev.map((card, index) => {
              if (index === i) {
                return { ...card, isVisible: false };
              }
              if (index === i + 1) {
                return { ...card, isVisible: true };
              }
              return card;
            }));
            resolve(void 0);
          }, i === 0 ? 1000 : 300); // First delay longer, then faster cascade
        });
      }
      
      setTimeout(() => setAnimationComplete(true), 500);
    };

    animateCards();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const currentCard = cards.find(card => card.isVisible) || cards[cards.length - 1];

  return (
    <section className="min-h-screen flex items-center justify-center page-padding">
      <div className="w-full max-w-2xl text-center relative">
        {/* Hero Card Stack Container */}
        <div className="relative h-80 mb-8">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`hero-card ${!card.isVisible ? 'animate-out' : ''} 
                         bg-card border border-border rounded-2xl p-8
                         ${index === cards.length - 1 ? 'relative' : 'absolute'}`}
            >
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  {card.subtitle}
                </div>
                <h1 className="text-hero text-foreground">
                  {card.title}
                </h1>
                <p className="text-h3 text-muted-foreground max-w-md mx-auto">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons - Only show after animation */}
        <div className={`transition-opacity duration-500 ${animationComplete ? 'opacity-100' : 'opacity-0'} space-y-4`}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-3 font-medium"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="text-foreground hover:text-accent font-medium"
            >
              Learn more
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground mt-6">
            Trusted by innovative companies worldwide
          </div>
        </div>
      </div>
    </section>
  );
};
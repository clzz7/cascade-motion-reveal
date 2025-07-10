import { useState, useEffect } from 'react';

interface HeroCard {
  id: number;
  title: string;
  subtitle: string;
  isVisible: boolean;
}

const loadingCards: HeroCard[] = [
  {
    id: 1,
    title: "Neural Networks",
    subtitle: "Deep Learning Models",
    isVisible: true
  },
  {
    id: 2,
    title: "Computer Vision", 
    subtitle: "Image Recognition",
    isVisible: false
  },
  {
    id: 3,
    title: "Natural Language",
    subtitle: "Text Processing",
    isVisible: false
  },
  {
    id: 4,
    title: "Predictive Analytics",
    subtitle: "Data Insights",
    isVisible: false
  },
  {
    id: 5,
    title: "AI Studio",
    subtitle: "Full Stack AI Solutions",
    isVisible: false
  }
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [cards, setCards] = useState(loadingCards);
  const [counter, setCounter] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let cardTimeouts: NodeJS.Timeout[] = [];
    let counterInterval: NodeJS.Timeout;
    let completionTimeout: NodeJS.Timeout;

    // Animação das cartas
    const animateCards = () => {
      for (let i = 0; i < cards.length - 1; i++) {
        const timeout = setTimeout(() => {
          setCards(prev => prev.map((card, index) => {
            if (index === i) {
              return { ...card, isVisible: false };
            }
            if (index === i + 1) {
              return { ...card, isVisible: true };
            }
            return card;
          }));
        }, i === 0 ? 800 : i * 400); // Primeira mais longa, depois mais rápido
        
        cardTimeouts.push(timeout);
      }
    };

    // Contador não-linear (aleatório)
    const animateCounter = () => {
      let currentValue = 0;
      const targetValue = 100;
      const duration = 3000; // 3 segundos total
      const startTime = Date.now();

      counterInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (progress >= 1) {
          setCounter(targetValue);
          clearInterval(counterInterval);
          
          // Aguarda um pouco após 100% antes de completar
          completionTimeout = setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => onComplete(), 500);
          }, 800);
          return;
        }

        // Progresso não-linear com randomização
        let nonLinearProgress;
        if (progress < 0.3) {
          // Início mais lento
          nonLinearProgress = progress * 0.5;
        } else if (progress < 0.7) {
          // Meio acelerado com randomização
          const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
          nonLinearProgress = 0.15 + (progress - 0.3) * 1.5 * randomFactor;
        } else {
          // Final controlado para chegar em 100
          nonLinearProgress = 0.75 + (progress - 0.7) * 0.83;
        }

        // Adiciona variação aleatória pequena
        const randomVariation = (Math.random() - 0.5) * 0.02;
        const finalProgress = Math.min(Math.max(nonLinearProgress + randomVariation, 0), 1);
        
        currentValue = Math.floor(finalProgress * targetValue);
        setCounter(currentValue);
      }, 50); // Update a cada 50ms para fluidez
    };

    // Inicia as animações
    animateCards();
    setTimeout(() => animateCounter(), 500); // Começa o contador depois das cartas

    return () => {
      cardTimeouts.forEach(timeout => clearTimeout(timeout));
      if (counterInterval) clearInterval(counterInterval);
      if (completionTimeout) clearTimeout(completionTimeout);
    };
  }, [onComplete]);

  const currentCard = cards.find(card => card.isVisible) || cards[cards.length - 1];

  return (
    <div className={`min-h-screen bg-background flex flex-col transition-opacity duration-500 ${isComplete ? 'opacity-0' : 'opacity-100'}`}>
      {/* Cards Section - Top */}
      <div className="flex-1 flex items-center justify-center pt-20">
        <div className="relative h-80 w-full max-w-lg">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`hero-card ${!card.isVisible ? 'animate-out' : ''} 
                         bg-card border border-border rounded-2xl p-8 shadow-lg
                         ${index === cards.length - 1 ? 'relative' : 'absolute'}`}
            >
              <div className="text-center space-y-4">
                <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  {card.subtitle}
                </div>
                <h1 className="text-hero text-foreground">
                  {card.title}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Counter Section - Bottom Left */}
      <div className="pb-20 page-padding">
        <div className="flex items-end">
          <div className="space-y-2">
            <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground font-mono tracking-tight">
              {counter.toString().padStart(3, '0')}
            </div>
            <div className="text-sm text-muted-foreground font-medium tracking-widest uppercase">
              Loading AI Systems
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
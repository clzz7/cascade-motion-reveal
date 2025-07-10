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
    title: "Machine Learning",
    subtitle: "Pattern Recognition",
    isVisible: false
  },
  {
    id: 6,
    title: "Data Mining",
    subtitle: "Information Extraction",
    isVisible: false
  },
  {
    id: 7,
    title: "AI Automation",
    subtitle: "Process Optimization",
    isVisible: false
  },
  {
    id: 8,
    title: "AI Studio",
    subtitle: "Full Stack AI Solutions",
    isVisible: false
  }
];

interface LoadingScreenProps {
  onComplete: (finalCards: HeroCard[]) => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [cards, setCards] = useState(loadingCards);
  const [counter, setCounter] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isMovingToFinal, setIsMovingToFinal] = useState(false);

  useEffect(() => {
    const totalDuration = 4000; // 4 segundos total
    const cardAnimationDuration = 3200; // 3.2 segundos para cards
    const cardsCount = cards.length - 1; // Não animamos o último
    const cardInterval = cardAnimationDuration / cardsCount; // Tempo entre cards

    let cardTimeouts: NodeJS.Timeout[] = [];
    let counterInterval: NodeJS.Timeout;
    let completionTimeout: NodeJS.Timeout;

    // Animação sincronizada das cartas
    const animateCards = () => {
      for (let i = 0; i < cardsCount; i++) {
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
        }, i * cardInterval);
        
        cardTimeouts.push(timeout);
      }
    };

    // Contador sincronizado e não-linear
    const animateCounter = () => {
      const startTime = Date.now();

      counterInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);

        if (progress >= 1) {
          setCounter(100);
          clearInterval(counterInterval);
          
          // Inicia transição para posição final
          completionTimeout = setTimeout(() => {
            setIsMovingToFinal(true);
            setTimeout(() => {
              const finalCards = cards.map(card => ({ ...card, isVisible: true }));
              onComplete(finalCards);
            }, 1000);
          }, 300);
          return;
        }

        // Progresso não-linear mais suave
        let nonLinearProgress;
        if (progress < 0.2) {
          // Início bem lento
          nonLinearProgress = progress * 0.3;
        } else if (progress < 0.6) {
          // Aceleração no meio com randomização
          const randomFactor = 0.9 + Math.random() * 0.2;
          nonLinearProgress = 0.06 + (progress - 0.2) * 1.8 * randomFactor;
        } else if (progress < 0.9) {
          // Continuação acelerada
          nonLinearProgress = 0.78 + (progress - 0.6) * 0.6;
        } else {
          // Final controlado para chegar exatamente em 100
          nonLinearProgress = 0.96 + (progress - 0.9) * 0.4;
        }

        // Pequena variação aleatória
        const randomVariation = (Math.random() - 0.5) * 0.015;
        const finalProgress = Math.min(Math.max(nonLinearProgress + randomVariation, 0), 1);
        
        const currentValue = Math.floor(finalProgress * 100);
        setCounter(currentValue);
      }, 60);
    };

    // Inicia as animações simultaneamente
    animateCards();
    animateCounter();

    return () => {
      cardTimeouts.forEach(timeout => clearTimeout(timeout));
      if (counterInterval) clearInterval(counterInterval);
      if (completionTimeout) clearTimeout(completionTimeout);
    };
  }, [onComplete, cards.length]);

  const currentCard = cards.find(card => card.isVisible) || cards[cards.length - 1];

  return (
    <div className={`min-h-screen bg-background flex flex-col transition-all duration-1000 ${isComplete ? 'opacity-0' : 'opacity-100'}`}>
      {/* Cards Section */}
      <div className={`flex-1 flex items-center justify-center pt-20 transition-all duration-1000 ${isMovingToFinal ? 'transform translate-y-96' : ''}`}>
        <div className="relative">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`
                transition-all duration-300 bg-card border border-border rounded-xl p-6 shadow-lg
                ${!card.isVisible ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}
                ${index === cards.length - 1 ? 'relative' : 'absolute inset-0'}
                ${isMovingToFinal ? 'w-72 h-40' : 'w-80 h-48'}
              `}
              style={{
                zIndex: card.isVisible ? 10 : index,
                transform: isMovingToFinal ? `translateX(${(index - cards.length + 1) * 8}px) translateY(${(index - cards.length + 1) * 4}px)` : undefined
              }}
            >
              <div className="text-center space-y-3">
                <div className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                  {card.subtitle}
                </div>
                <h1 className={`font-bold text-foreground ${isMovingToFinal ? 'text-lg' : 'text-2xl'}`}>
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
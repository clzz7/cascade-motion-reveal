import { useState, useEffect } from 'react';

interface HeroCard {
  id: number;
  title: string;
  subtitle: string;
  isVisible: boolean;
}

interface StackedCardsProps {
  cards: HeroCard[];
}

export const StackedCards = ({ cards }: StackedCardsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animação de entrada suave
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX - startX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX - startX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50;
    if (currentX > threshold && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else if (currentX < -threshold && currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    
    setCurrentX(0);
  };

  const handleMouseUp = handleEnd;
  const handleTouchEnd = handleEnd;

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      if (isDragging) {
        setIsDragging(false);
        setCurrentX(0);
      }
    };

    document.addEventListener('mouseup', handleMouseUpGlobal);
    return () => document.removeEventListener('mouseup', handleMouseUpGlobal);
  }, [isDragging]);

  if (cards.length === 0) return null;

  return (
    <div className={`relative w-72 h-40 cursor-grab active:cursor-grabbing select-none transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="absolute inset-0 bg-card border border-border rounded-xl p-4 shadow-lg transition-all duration-500"
          style={{
            zIndex: cards.length - Math.abs(index - currentIndex),
            transform: `
              translateX(${(index - currentIndex) * 8 + (isDragging ? currentX * 0.1 : 0)}px) 
              translateY(${(index - currentIndex) * 4}px) 
              scale(${1 - Math.abs(index - currentIndex) * 0.02})
            `,
            opacity: Math.abs(index - currentIndex) > 2 ? 0 : 1 - Math.abs(index - currentIndex) * 0.1,
            transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="text-center space-y-2">
            <div className="inline-block px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
              {card.subtitle}
            </div>
            <h3 className="text-lg font-bold text-foreground">
              {card.title}
            </h3>
          </div>
        </div>
      ))}
      
      {/* Indicadores */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
              index === currentIndex ? 'bg-accent' : 'bg-border'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
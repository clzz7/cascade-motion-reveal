import { useEffect, useRef } from 'react';

export const useScrollReveal = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.8,
        rootMargin: '0px 0px -20% 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return elementRef;
};
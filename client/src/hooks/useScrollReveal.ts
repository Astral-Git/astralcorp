// client/src/hooks/useScrollReveal.ts
import { useEffect, useRef, RefObject } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  className?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  className = 'revealed',
  once = false,
}: ScrollRevealOptions = {}): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      console.warn('IntersectionObserver is not supported in this browser');
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observerOptions: IntersectionObserverInit = {
      threshold,
      rootMargin,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
          if (once) {
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, className, once]);

  return ref;
}
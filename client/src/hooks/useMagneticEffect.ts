// client/src/hooks/useMagneticEffect.ts
import { useEffect, useRef, RefObject } from "react";

interface MagneticEffectOptions {
  strength?: number;
  scale?: number;
  damping?: number;
  maxDistance?: number;
}

export function useMagneticEffect<T extends HTMLElement = HTMLElement>({
  strength = 0.1,
  scale = 1.05,
  damping = 0.8,
  maxDistance = 100,
}: MagneticEffectOptions = {}): RefObject<T> {
  const ref = useRef<T>(null);
  const animationFrameRef = useRef<number | null>(null);
  const currentTransform = useRef({ x: 0, y: 0, scale: 1 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameRef.current) return;

      animationFrameRef.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let x = (e.clientX - centerX) * strength;
        let y = (e.clientY - centerY) * strength;

        const distance = Math.sqrt(x * x + y * y);
        if (distance > maxDistance) {
          const angle = Math.atan2(y, x);
          x = Math.cos(angle) * maxDistance;
          y = Math.sin(angle) * maxDistance;
        }

        currentTransform.current.x += (x - currentTransform.current.x) * damping;
        currentTransform.current.y += (y - currentTransform.current.y) * damping;
        currentTransform.current.scale = scale;

        element.style.transform = `scale(${currentTransform.current.scale}) translateX(${currentTransform.current.x}px) translateY(${currentTransform.current.y}px)`;
        animationFrameRef.current = null;
      });
    };

    const handleMouseLeave = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      const reset = () => {
        currentTransform.current.x *= damping;
        currentTransform.current.y *= damping;
        currentTransform.current.scale = 1;

        if (Math.abs(currentTransform.current.x) < 0.1 && Math.abs(currentTransform.current.y) < 0.1) {
          element.style.transform = 'scale(1) translateX(0) translateY(0)';
          return;
        }

        element.style.transform = `scale(${currentTransform.current.scale}) translateX(${currentTransform.current.x}px) translateY(${currentTransform.current.y}px)`;
        animationFrameRef.current = requestAnimationFrame(reset);
      };

      animationFrameRef.current = requestAnimationFrame(reset);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [strength, scale, damping, maxDistance]);

  return ref;
}
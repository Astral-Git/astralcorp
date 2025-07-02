import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    const updatePosition = (e: MouseEvent) => {
      // Cancel previous RAF if it exists
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Use RAF for smooth position updates
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", updatePosition, { passive: true });
    
    // Add listeners for magnetic elements
    const magneticElements = document.querySelectorAll(".magnetic-element");
    magneticElements.forEach(element => {
      element.addEventListener("mouseenter", handleMouseEnter, { passive: true });
      element.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    });

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      magneticElements.forEach(element => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
      mediaQuery.removeEventListener('change', handleChange);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${
        prefersReducedMotion 
          ? '' 
          : 'transition-transform duration-200 ease-out'
      } ${isHovering ? 'scale-200 bg-purple-400' : ''}`}
      style={{
        left: position.x - 2,
        top: position.y - 2,
        transform: prefersReducedMotion ? 'none' : undefined,
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
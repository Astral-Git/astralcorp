import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  element: HTMLDivElement;
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: Particle[] = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      const element = document.createElement('div');
      element.className = 'particle';
      
      const particle: Particle = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        element: element
      };

      element.style.left = particle.x + 'px';
      element.style.top = particle.y + 'px';
      
      container.appendChild(element);
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Animation loop
    const animate = () => {
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.vy *= -1;
        }

        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      particles.forEach(particle => {
        if (particle.x > window.innerWidth) particle.x = window.innerWidth;
        if (particle.y > window.innerHeight) particle.y = window.innerHeight;
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up particles
      particles.forEach(particle => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="particle-container" />;
}

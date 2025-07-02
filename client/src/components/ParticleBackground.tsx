import { useEffect, useRef } from "react";
import { useAnimationFrame } from "framer-motion";

const PARTICLE_COUNT = 40;
const REPULSION_RADIUS = 100;
const REPULSION_STRENGTH = 0.5;
const PARTICLE_MIN_SIZE = 4;
const PARTICLE_MAX_SIZE = 10;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  element: HTMLDivElement;
};

function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const element = document.createElement("div");
      element.className = "particle";

      const size = Math.random() * (PARTICLE_MAX_SIZE - PARTICLE_MIN_SIZE) + PARTICLE_MIN_SIZE;
      const opacity = Math.random() * 0.4 + 0.2;
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.opacity = `${opacity}`;
      element.style.position = "absolute";
      element.style.borderRadius = "9999px";
      element.style.background = "radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.2) 70%)";

      const particle: Particle = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        baseVx: (Math.random() - 0.5) * 0.8,
        baseVy: (Math.random() - 0.5) * 0.8,
        element,
      };

      element.style.left = `${particle.x}px`;
      element.style.top = `${particle.y}px`;

      container.appendChild(element);
      particles.push(particle);
    }

    particlesRef.current = particles;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      particles.forEach((p) => {
        if (p.x > window.innerWidth) p.x = window.innerWidth;
        if (p.y > window.innerHeight) p.y = window.innerHeight;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      particles.forEach((p) => p.element.remove());
    };
  }, []);

  useAnimationFrame(() => {
    const particles = particlesRef.current;

    particles.forEach((p) => {
      const dx = p.x - mousePos.current.x;
      const dy = p.y - mousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < REPULSION_RADIUS) {
        const angle = Math.atan2(dy, dx);
        const force = (REPULSION_RADIUS - distance) / REPULSION_RADIUS;
        p.vx = p.baseVx + Math.cos(angle) * force * REPULSION_STRENGTH;
        p.vy = p.baseVy + Math.sin(angle) * force * REPULSION_STRENGTH;
      } else {
        p.vx = p.baseVx;
        p.vy = p.baseVy;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > window.innerWidth) {
        p.vx *= -0.8;
        p.x = Math.max(0, Math.min(p.x, window.innerWidth));
      }
      if (p.y < 0 || p.y > window.innerHeight) {
        p.vy *= -0.8;
        p.y = Math.max(0, Math.min(p.y, window.innerHeight));
      }

      p.element.style.left = `${p.x}px`;
      p.element.style.top = `${p.y}px`;
    });
  });

  return (
    <div
      ref={containerRef}
      className="particle-container fixed inset-0 pointer-events-none z-0"
    />
  );
}

export default ParticleBackground;

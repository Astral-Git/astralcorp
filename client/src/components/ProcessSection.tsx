import { memo, RefObject, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

type DomainButtonProps = {
  id: number;
  title: string;
  description: string;
  icon: string;
  delay: number;
  color: string;
  onClick: () => void;
};

type FloatingButton = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  element: HTMLDivElement | null;
};

const domains: DomainButtonProps[] = [
  {
    id: 1,
    title: "Web Design",
    description: "Custom websites that convert visitors into customers",
    icon: "🌐",
    delay: 0,
    color: "from-blue-500 to-cyan-500",
    onClick: () => console.log("Navigate to Web Design gallery")
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "User interfaces that delight and engage your audience",
    icon: "🎨",
    delay: 0.2,
    color: "from-purple-500 to-pink-500",
    onClick: () => console.log("Navigate to UI/UX gallery")
  },
  {
    id: 3,
    title: "Branding",
    description: "Complete brand identity that stands out from competition",
    icon: "✨",
    delay: 0.4,
    color: "from-orange-500 to-red-500",
    onClick: () => console.log("Navigate to Branding gallery")
  },
  {
    id: 4,
    title: "Mobile Apps",
    description: "Native and web apps that perform flawlessly",
    icon: "📱",
    delay: 0.6,
    color: "from-green-500 to-emerald-500",
    onClick: () => console.log("Navigate to Mobile Apps gallery")
  }
];

const DomainButton = memo(({ id, title, description, icon, delay, color, onClick }: DomainButtonProps) => {
  const revealRef = useScrollReveal() as RefObject<HTMLDivElement>;
  const magneticRef = useMagneticEffect<HTMLButtonElement>({ strength: 0.3, scale: 1.05 });

  return (
    <motion.div
      ref={revealRef}
      className="scroll-reveal group"
      style={{ animationDelay: `${delay}s` }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <button
        ref={magneticRef}
        onClick={onClick}
        className={`relative w-full p-8 rounded-2xl bg-gradient-to-br ${color} 
          hover:shadow-2xl hover:shadow-current/25 transition-all duration-500 
          group-hover:scale-105 overflow-hidden border border-white/10
          backdrop-blur-sm bg-opacity-90`}
      >
        {/* Glowing effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 
          group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
        
        {/* Content */}
        <div className="relative z-10 text-white">
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="text-2xl font-bold space-font mb-3">{title}</h3>
          <p className="text-white/90 text-base leading-relaxed">{description}</p>
        </div>

        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
          transition-opacity duration-500 bg-gradient-to-r from-transparent 
          via-white/20 to-transparent animate-pulse" />
      </button>
    </motion.div>
  );
});

const FloatingButtons = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [buttons, setButtons] = useState<FloatingButton[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Create floating buttons
    const newButtons: FloatingButton[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * (rect.width - 60),
      y: Math.random() * (rect.height - 60),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: 30 + Math.random() * 20,
      color: ['bg-blue-500/20', 'bg-purple-500/20', 'bg-pink-500/20', 'bg-green-500/20'][Math.floor(Math.random() * 4)],
      element: null
    }));

    // Create DOM elements for each button
    newButtons.forEach(button => {
      const element = document.createElement('div');
      element.className = `absolute rounded-full ${button.color} backdrop-blur-sm border border-white/10 
        transition-all duration-300 hover:scale-125 cursor-pointer`;
      element.style.width = `${button.size}px`;
      element.style.height = `${button.size}px`;
      element.style.left = `${button.x}px`;
      element.style.top = `${button.y}px`;
      element.style.boxShadow = '0 0 20px currentColor';
      
      button.element = element;
      container.appendChild(element);
    });

    setButtons(newButtons);

    // Animation loop
    const animate = () => {
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      
      setButtons(prevButtons => {
        return prevButtons.map(button => {
          if (!button.element) return button;

          let newX = button.x + button.vx;
          let newY = button.y + button.vy;
          let newVx = button.vx;
          let newVy = button.vy;

          // Collision with walls
          if (newX <= 0 || newX >= rect.width - button.size) {
            newVx = -newVx;
            newX = Math.max(0, Math.min(rect.width - button.size, newX));
          }
          if (newY <= 0 || newY >= rect.height - button.size) {
            newVy = -newVy;
            newY = Math.max(0, Math.min(rect.height - button.size, newY));
          }

          // Update element position
          button.element.style.left = `${newX}px`;
          button.element.style.top = `${newY}px`;

          return {
            ...button,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Clean up DOM elements
      newButtons.forEach(button => {
        if (button.element && container.contains(button.element)) {
          container.removeChild(button.element);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    />
  );
});

const ProcessSection = memo(() => {
  const revealRef = useScrollReveal() as RefObject<HTMLDivElement>;

  return (
    <section id="process" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          ref={revealRef}
          className="text-center mb-12 scroll-reveal"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold space-font mb-4 text-foreground">
            Our Domains
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Explore our specialized services and discover what we can create for you
          </p>
        </motion.div>

        {/* Floating buttons background */}
        <div className="relative h-[600px] mb-8">
          <FloatingButtons />
          
          {/* Domain buttons grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 h-full">
            {domains.map((domain) => (
              <DomainButton key={domain.id} {...domain} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default ProcessSection;

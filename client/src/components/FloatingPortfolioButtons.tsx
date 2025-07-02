import { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type FloatingButton = {
  id: number;
  title: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  element: HTMLDivElement | null;
};

const portfolioCategories = [
  { title: "Web Design", color: "bg-blue-500", textColor: "text-white" },
  { title: "Poster Design", color: "bg-purple-500", textColor: "text-white" },
  { title: "Logo Design", color: "bg-green-500", textColor: "text-white" },
  { title: "Product Design", color: "bg-orange-500", textColor: "text-white" },
  { title: "UI/UX Design", color: "bg-pink-500", textColor: "text-white" }
];

const FloatingPortfolioButtons = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [buttons, setButtons] = useState<FloatingButton[]>([]);
  const animationRef = useRef<number>();
  const revealRef = useScrollReveal();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Create floating buttons for each category
    const newButtons: FloatingButton[] = portfolioCategories.map((category, i) => ({
      id: i,
      title: category.title,
      x: Math.random() * (rect.width - 150),
      y: Math.random() * (rect.height - 60),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: 120 + Math.random() * 30,
      color: category.color,
      element: null
    }));

    // Create DOM elements for each button
    newButtons.forEach((button, index) => {
      const category = portfolioCategories[index];
      const element = document.createElement('div');
      element.className = `absolute rounded-full ${category.color} ${category.textColor} 
        flex items-center justify-center font-semibold text-sm cursor-pointer
        transition-all duration-300 hover:scale-110 hover:shadow-lg
        border-2 border-white/20 backdrop-blur-sm`;
      element.style.width = `${button.size}px`;
      element.style.height = `60px`;
      element.style.left = `${button.x}px`;
      element.style.top = `${button.y}px`;
      element.textContent = button.title;
      element.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
      
      // Add click handler
      element.addEventListener('click', () => {
        console.log(`Viewing ${button.title} portfolio`);
      });
      
      button.element = element;
      container.appendChild(element);
    });

    setButtons(newButtons);

    // Animation loop with collision detection
    const animate = () => {
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      
      setButtons(prevButtons => {
        return prevButtons.map((button, i) => {
          if (!button.element) return button;

          let newX = button.x + button.vx;
          let newY = button.y + button.vy;
          let newVx = button.vx;
          let newVy = button.vy;

          // Collision with walls
          if (newX <= 0 || newX >= rect.width - button.size) {
            newVx = -newVx * 0.8; // Add damping
            newX = Math.max(0, Math.min(rect.width - button.size, newX));
          }
          if (newY <= 0 || newY >= rect.height - 60) {
            newVy = -newVy * 0.8; // Add damping
            newY = Math.max(0, Math.min(rect.height - 60, newY));
          }

          // Collision with other buttons
          prevButtons.forEach((other, j) => {
            if (i !== j && other.element) {
              const dx = newX - other.x;
              const dy = newY - other.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance = (button.size + other.size) / 2 + 20;

              if (distance < minDistance && distance > 0) {
                // Calculate repulsion
                const force = (minDistance - distance) / minDistance;
                const repelX = (dx / distance) * force * 2;
                const repelY = (dy / distance) * force * 2;
                
                newVx += repelX;
                newVy += repelY;
                
                // Limit velocity
                const maxVel = 3;
                newVx = Math.max(-maxVel, Math.min(maxVel, newVx));
                newVy = Math.max(-maxVel, Math.min(maxVel, newVy));
              }
            }
          });

          // Apply slight friction
          newVx *= 0.995;
          newVy *= 0.995;

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
    <section id="work" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={revealRef}
          className="text-center mb-12 scroll-reveal"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold space-font mb-4 text-foreground">
            View Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Click on the floating buttons to explore different design categories
          </p>
        </motion.div>

        {/* Floating buttons container */}
        <div 
          ref={containerRef}
          className="relative h-[500px] overflow-hidden rounded-2xl 
            bg-gradient-to-br from-background to-muted/20 
            border border-border/50"
          style={{ minHeight: '500px' }}
        />
      </div>
    </section>
  );
});

export default FloatingPortfolioButtons;
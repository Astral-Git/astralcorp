import { useEffect, useRef, useState, memo, useCallback } from "react";
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
  const lastUpdateRef = useRef<number>(0);

  const handleCategoryClick = useCallback((category: string) => {
    // Navigate to individual gallery page
    console.log(`Opening ${category} gallery`);
    // In a real app, you would use router navigation here
    // For now, we'll simulate opening a gallery
    alert(`Opening ${category} Gallery\n\nThis would navigate to a dedicated page showing all ${category} projects.`);
  }, []);

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
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
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
        handleCategoryClick(button.title);
      });
      
      button.element = element;
      container.appendChild(element);
    });

    setButtons(newButtons);

    // Optimized animation loop with collision detection
    const animate = (currentTime: number) => {
      if (!container) return;
      
      // Throttle to 60fps for better performance
      if (currentTime - lastUpdateRef.current < 16) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastUpdateRef.current = currentTime;
      
      const rect = container.getBoundingClientRect();
      
      setButtons(prevButtons => {
        const updatedButtons = [...prevButtons];
        
        // Update positions and handle wall collisions
        updatedButtons.forEach((button, i) => {
          if (!button.element) return;

          let newX = button.x + button.vx;
          let newY = button.y + button.vy;
          let newVx = button.vx;
          let newVy = button.vy;

          // Wall collision detection
          if (newX <= 0 || newX >= rect.width - button.size) {
            newVx = -newVx;
            newX = Math.max(0, Math.min(rect.width - button.size, newX));
          }
          if (newY <= 0 || newY >= rect.height - 60) {
            newVy = -newVy;
            newY = Math.max(0, Math.min(rect.height - 60, newY));
          }

          // Update button data
          updatedButtons[i] = { ...button, x: newX, y: newY, vx: newVx, vy: newVy };
        });

        // Handle button-to-button collisions
        for (let i = 0; i < updatedButtons.length; i++) {
          for (let j = i + 1; j < updatedButtons.length; j++) {
            const buttonA = updatedButtons[i];
            const buttonB = updatedButtons[j];
            
            if (!buttonA.element || !buttonB.element) continue;

            const dx = buttonA.x - buttonB.x;
            const dy = buttonA.y - buttonB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = 140; // Minimum distance between button centers

            if (distance < minDistance && distance > 0) {
              // Calculate collision response
              const overlap = minDistance - distance;
              const separationX = (dx / distance) * overlap * 0.5;
              const separationY = (dy / distance) * overlap * 0.5;

              // Separate the buttons
              updatedButtons[i].x += separationX;
              updatedButtons[i].y += separationY;
              updatedButtons[j].x -= separationX;
              updatedButtons[j].y -= separationY;

              // Exchange velocity components (elastic collision)
              const tempVx = updatedButtons[i].vx;
              const tempVy = updatedButtons[i].vy;
              updatedButtons[i].vx = updatedButtons[j].vx;
              updatedButtons[i].vy = updatedButtons[j].vy;
              updatedButtons[j].vx = tempVx;
              updatedButtons[j].vy = tempVy;
            }
          }
        }

        // Update DOM elements and ensure minimum velocity
        updatedButtons.forEach(button => {
          if (!button.element) return;
          
          // Ensure minimum velocity for continuous movement
          if (Math.abs(button.vx) < 0.5) button.vx = button.vx < 0 ? -0.8 : 0.8;
          if (Math.abs(button.vy) < 0.5) button.vy = button.vy < 0 ? -0.8 : 0.8;

          // Update position with transform for better performance
          button.element.style.transform = `translate(${button.x}px, ${button.y}px)`;
          button.element.style.left = '0px';
          button.element.style.top = '0px';
        });

        return updatedButtons;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

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
            bg-black/20 backdrop-blur-sm"
          style={{ minHeight: '500px' }}
        />
      </div>
    </section>
  );
});

export default FloatingPortfolioButtons;
import { useEffect, useState } from "react";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

export default function FloatingNavigation() {
  const [activeSection, setActiveSection] = useState("home");
  const magneticRef = useMagneticEffect<HTMLButtonElement>();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "work", "process", "contact"];
      const scrollY = window.scrollY;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop - 100 && scrollY < offsetTop + offsetHeight - 100) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="floating-nav fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-8 py-4 rounded-full animate-breathing backdrop-blur-md bg-background/80 dark:bg-black/80 border border-border">
      <div className="flex items-center space-x-8">
        <div className="text-xl font-bold space-font tracking-wider text-foreground">APEX</div>
        <div className="flex space-x-6">
          {[
            { id: "home", label: "Home" },
            { id: "work", label: "Work" },
            { id: "process", label: "Process" },
            { id: "contact", label: "Contact" }
          ].map((item) => (
            <button
              key={item.id}
              ref={magneticRef}
              onClick={() => scrollToSection(item.id)}
              className={`magnetic-element hover:text-primary transition-colors text-foreground ${
                activeSection === item.id ? "text-primary" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

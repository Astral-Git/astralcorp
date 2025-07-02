import { useMagneticEffect } from "@/hooks/useMagneticEffect";

export default function Footer() {
  const magneticRef = useMagneticEffect<HTMLButtonElement>();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-2xl font-bold space-font text-foreground">Astral Corp</div>
          
          <div className="flex space-x-8">
            <button
              ref={magneticRef}
              onClick={() => scrollToSection("home")}
              className="magnetic-element hover:text-primary transition-colors text-foreground"
            >
              Home
            </button>
            <button
              ref={magneticRef}
              onClick={() => scrollToSection("work")}
              className="magnetic-element hover:text-primary transition-colors text-foreground"
            >
              Portfolio
            </button>
            <button
              ref={magneticRef}
              onClick={() => scrollToSection("contact")}
              className="magnetic-element hover:text-primary transition-colors text-foreground"
            >
              Contact
            </button>
          </div>
          
          <div className="text-muted-foreground">
            © 2025 Astral Corp. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

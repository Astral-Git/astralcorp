import { useMagneticEffect } from "@/hooks/useMagneticEffect";

export default function Footer() {
  const magneticRef = useMagneticEffect();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-2xl font-bold space-font">APEX</div>
          
          <div className="flex space-x-8">
            <button
              ref={magneticRef}
              onClick={() => scrollToSection("home")}
              className="magnetic-element hover:text-blue-400 transition-colors"
            >
              Home
            </button>
            <button
              ref={magneticRef}
              onClick={() => scrollToSection("work")}
              className="magnetic-element hover:text-blue-400 transition-colors"
            >
              Portfolio
            </button>
            <button
              ref={magneticRef}
              onClick={() => scrollToSection("contact")}
              className="magnetic-element hover:text-blue-400 transition-colors"
            >
              Contact
            </button>
          </div>
          
          <div className="text-gray-400">
            © 2025 Apex Studio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

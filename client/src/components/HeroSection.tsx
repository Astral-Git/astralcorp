import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function HeroSection() {
  const magneticRef1 = useMagneticEffect<HTMLButtonElement>();
  const magneticRef2 = useMagneticEffect<HTMLButtonElement>();
  const revealRef = useScrollReveal();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div ref={revealRef} className="text-center max-w-6xl mx-auto px-6 animate-breathing scroll-reveal">
        <div className="text-sm md:text-base text-muted-foreground mb-4 animate-breathing">
          Clean design. Thoughtful strategy. Real results.
        </div>
        <div className="floating-element">
          <h1 className="text-6xl md:text-8xl font-bold space-font mb-6 leading-tight text-foreground">
            We build websites and{" "}
            <span className="gradient-text">brands</span>{" "}
            that make an impact.
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          A creative studio specializing in web development and visual identity design.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            ref={magneticRef1}
            onClick={() => scrollToSection("work")}
            className="magnetic-element bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 animate-glow"
          >
            View Portfolio
          </button>
          <button
            ref={magneticRef2}
            onClick={() => scrollToSection("contact")}
            className="magnetic-element border-2 border-foreground hover:bg-foreground hover:text-background px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
          >
            Start a Project
          </button>
        </div>
      </div>
      
      {/* Floating Design Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-border rounded-full animate-float floating-element"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full animate-float floating-element" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 border-2 border-primary/30 rotate-45 animate-float floating-element" style={{animationDelay: '4s'}}></div>
    </section>
  );
}

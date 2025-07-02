import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import FloatingNavigation from "@/components/FloatingNavigation";
import HeroSection from "@/components/HeroSection";
import FloatingPortfolioButtons from "@/components/FloatingPortfolioButtons";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <CustomCursor />
      <ParticleBackground />
      <FloatingNavigation />
      
      <div className="content-wrapper">
        <HeroSection />
        <FloatingPortfolioButtons />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

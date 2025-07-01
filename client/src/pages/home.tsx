import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import FloatingNavigation from "@/components/FloatingNavigation";
import HeroSection from "@/components/HeroSection";
import WorkShowcase from "@/components/WorkShowcase";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <CustomCursor />
      <ParticleBackground />
      <FloatingNavigation />
      
      <div className="content-wrapper">
        <HeroSection />
        <WorkShowcase />
        <ProcessSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

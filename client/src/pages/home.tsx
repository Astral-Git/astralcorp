import { lazy, Suspense } from "react";

import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import FloatingNavigation from "@/components/FloatingNavigation";
import HeroSection from "@/components/HeroSection";
import FloatingPortfolioButtons from "@/components/FloatingPortfolioButtons";
import Footer from "@/components/Footer";

// ✅ React Lazy Loaded Sections
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <CustomCursor />
      <ParticleBackground />
      <FloatingNavigation />

      <main className="content-wrapper">
        <HeroSection />
        <FloatingPortfolioButtons />

        <Suspense fallback={<div className="min-h-[200px]">Loading Testimonials...</div>}>
          <TestimonialsSection />
        </Suspense>

        <Suspense fallback={<div className="min-h-[200px]">Loading About Section...</div>}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<div className="min-h-[200px]">Loading Contact Section...</div>}>
          <ContactSection />
        </Suspense>

        <Footer />
      </main>
    </div>
  );
}

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutSection() {
  const revealRef = useScrollReveal();

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div ref={revealRef} className="scroll-reveal space-y-12">
          <h2 className="text-5xl md:text-6xl font-bold space-font mb-4 text-foreground animate-fade-in-up">
            Who We Are
          </h2>

          <div className="space-y-6 text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-in-up delay-200">
            <p>We’re a remote team fueled by creativity and innovation.</p>
            <p>Our passion lies in clean design, thoughtful code, and meaningful collaboration.</p>
            <p>From creators to startups, we’ve helped shape unique digital experiences.</p>
            <p>No templates. No shortcuts. Just custom-crafted solutions for every project.</p>
          </div>

          <div
            className="mt-10 md:mt-16 px-6 md:px-12 py-8 border border-primary/30 bg-card rounded-2xl shadow-lg animate-fade-in-up delay-500"
          >
            <p className="text-2xl md:text-3xl font-semibold space-font gradient-text">
              “We believe in designing with intent and building with purpose.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

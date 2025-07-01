import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutSection() {
  const revealRef = useScrollReveal();

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div ref={revealRef} className="scroll-reveal">
          <h2 className="text-5xl md:text-6xl font-bold space-font mb-8 text-foreground">Who We Are</h2>
          
          <div className="space-y-8 text-xl text-muted-foreground leading-relaxed animate-breathing">
            <p>Professional design studio specializing in web development and brand identity</p>
            <p>5+ years of experience serving businesses across various industries</p>
            <p>Delivered 200+ successful projects for startups to enterprise clients</p>
            <p>Every solution is custom-built to match your unique business goals</p>
          </div>
          
          <div className="mt-12 p-8 border border-primary/30 rounded-2xl animate-breathing bg-card" style={{ animationDelay: '1s' }}>
            <p className="text-2xl font-semibold space-font gradient-text">
              "We transform businesses through exceptional design and cutting-edge technology."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

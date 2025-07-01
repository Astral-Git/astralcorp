import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutSection() {
  const revealRef = useScrollReveal();

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div ref={revealRef} className="scroll-reveal">
          <h2 className="text-5xl md:text-6xl font-bold space-font mb-8">Who We Are</h2>
          
          <div className="space-y-8 text-xl text-gray-300 leading-relaxed animate-breathing">
            <p>Small team based in Remote</p>
            <p>Passionate about clean design and quality code</p>
            <p>We've worked with creators, startups, and businesses</p>
            <p>Every project is built from scratch, no templates</p>
          </div>
          
          <div className="mt-12 p-8 border border-blue-400/30 rounded-2xl animate-breathing" style={{ animationDelay: '1s' }}>
            <p className="text-2xl font-semibold space-font gradient-text">
              "We believe in designing with intent and building with purpose."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

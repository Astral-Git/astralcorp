import { useScrollReveal } from "@/hooks/useScrollReveal";

const processSteps = [
  {
    id: 1,
    title: "Understand",
    description: "We begin by understanding your goals and requirements in detail. Through collaborative discussions, we align our vision with yours.",
    delay: "0s"
  },
  {
    id: 2,
    title: "Design",
    description: "We create initial designs or prototypes and get your feedback. Every element is crafted with purpose and intention.",
    delay: "0.5s"
  },
  {
    id: 3,
    title: "Build",
    description: "We develop the website or finalize the logo based on your feedback. Clean code meets beautiful design.",
    delay: "1s"
  },
  {
    id: 4,
    title: "Review",
    description: "You review the final version and suggest last-minute tweaks. Perfection is in the details.",
    delay: "1.5s"
  },
  {
    id: 5,
    title: "Deliver",
    description: "We deliver the final files with complete documentation and support. Your success is our priority.",
    delay: "2s"
  }
];

export default function ProcessSection() {
  const revealRef = useScrollReveal();

  return (
    <section id="process" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div ref={revealRef} className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl md:text-6xl font-bold space-font mb-6 text-foreground">Our Process</h2>
          <p className="text-xl text-muted-foreground">
            How we transform ideas into exceptional digital experiences
          </p>
        </div>
        
        <div className="space-y-12">
          {processSteps.map((step) => (
            <div key={step.id} ref={revealRef} className="process-step scroll-reveal">
              <div className="animate-breathing" style={{ animationDelay: step.delay }}>
                <h3 className="text-2xl font-semibold mb-3 space-font">
                  {step.id}. {step.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

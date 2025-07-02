import { memo, RefObject } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type ProcessStepProps = {
  id: number;
  title: string;
  description: string;
  delay: number;
};

const processSteps: ProcessStepProps[] = [
  {
    id: 1,
    title: "Understand",
    description:
      "We begin by understanding your goals and requirements in detail. Through collaborative discussions, we align our vision with yours.",
    delay: 0,
  },
  {
    id: 2,
    title: "Design",
    description:
      "We create initial designs or prototypes and get your feedback. Every element is crafted with purpose and intention.",
    delay: 0.2,
  },
  {
    id: 3,
    title: "Build",
    description:
      "We develop the website or finalize the logo based on your feedback. Clean code meets beautiful design.",
    delay: 0.4,
  },
  {
    id: 4,
    title: "Review",
    description:
      "You review the final version and suggest last-minute tweaks. Perfection is in the details.",
    delay: 0.6,
  },
  {
    id: 5,
    title: "Deliver",
    description:
      "We deliver the final files with complete documentation and support. Your success is our priority.",
    delay: 0.8,
  },
];

const ProcessStep = memo(({ id, title, description, delay }: ProcessStepProps) => {
  const revealRef = useScrollReveal() as RefObject<HTMLDivElement>;

  return (
    <div
      ref={revealRef}
      className="relative pl-16 scroll-reveal"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-foreground text-white flex items-center justify-center font-bold text-base">
        {id}
      </div>
      <div className="p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-semibold mb-2 space-font text-foreground">{title}</h3>
        <p className="text-muted-foreground text-base leading-relaxed">{description}</p>
      </div>
      {id < processSteps.length && (
        <div className="absolute left-4 top-8 h-[calc(100%-2rem)] w-0.5 bg-muted-foreground/30" />
      )}
    </div>
  );
});

const ProcessSection = memo(() => {
  const revealRef = useScrollReveal() as RefObject<HTMLDivElement>;

  return (
    <section id="process" className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={revealRef}
          className="text-center mb-12 scroll-reveal"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold space-font mb-4 text-foreground">
            Our Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            How we transform ideas into exceptional digital experiences
          </p>
        </motion.div>

        <div className="space-y-6">
          {processSteps.map((step) => (
            <ProcessStep key={step.id} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default ProcessSection;

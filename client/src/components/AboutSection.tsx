import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";

export default function AboutSection() {
  const revealRef = useScrollReveal();

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={revealRef} className="scroll-reveal">
          <motion.h2 
            className="text-5xl md:text-6xl font-display font-bold text-center mb-16 text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Who We Are
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Main content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p className="text-xl font-medium">
                  We're a <span className="text-primary font-semibold">creative powerhouse</span> dedicated to transforming ideas into stunning visual experiences.
                </p>
                <p>
                  Our remote team combines artistic vision with technical expertise, crafting custom solutions that make brands stand out in today's competitive market.
                </p>
                <p>
                  From startups to established businesses, we've helped countless clients achieve their design goals through innovative thinking and meticulous attention to detail.
                </p>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-2xl border border-primary/20">
                <p className="text-lg font-medium text-foreground">
                  💡 <span className="font-display font-semibold">Our Philosophy:</span> Every pixel matters, every interaction counts, and every project deserves a unique approach.
                </p>
              </div>
            </motion.div>

            {/* Right side - Stats & Features */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl border border-primary/10">
                <h3 className="font-display font-semibold text-xl mb-4 text-foreground">Our Core Values</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Innovation-driven design solutions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Transparent communication</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Deadline-focused delivery</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Continuous learning & growth</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-8 rounded-3xl border border-primary/20">
              <p className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-4">
                "We don't just create designs—we craft experiences that resonate."
              </p>
              <p className="text-muted-foreground">Ready to bring your vision to life? Let's create something amazing together.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
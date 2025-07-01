import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const revealRef = useScrollReveal();
  const magneticRef = useMagneticEffect<HTMLButtonElement>();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 section-blur">
      <div className="max-w-4xl mx-auto px-6">
        <div ref={revealRef} className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl md:text-6xl font-bold space-font mb-6 text-foreground">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground">
            Tell us about your idea. We'll make it real.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div ref={revealRef} className="space-y-8 scroll-reveal">
            <div className="animate-breathing">
              <h3 className="text-2xl font-semibold mb-4 space-font text-foreground">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-muted-foreground">your@email.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">WhatsApp</div>
                    <div className="text-muted-foreground">+91-XXXXXXXXXX</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-xl">🔗</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Social</div>
                    <div className="text-muted-foreground">[Instagram] [Behance] [GitHub]</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div ref={revealRef} className="scroll-reveal">
            <form onSubmit={handleSubmit} className="space-y-6 animate-breathing" style={{ animationDelay: '0.5s' }}>
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  rows={6}
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-white placeholder-gray-400 resize-none"
                />
              </div>
              <Button
                ref={magneticRef}
                type="submit"
                disabled={isSubmitting}
                className="magnetic-element w-full bg-blue-600 hover:bg-blue-500 p-4 rounded-xl font-semibold transition-all duration-300 animate-glow"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

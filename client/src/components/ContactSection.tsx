import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const revealRef = useScrollReveal();
  const magneticRef = useMagneticEffect<HTMLButtonElement>();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    project: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS (you'll need to set up EmailJS account)
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        address: formData.address,
        project_details: formData.project,
        to_email: "info.astralcorp@gmail.com"
      };

      // For now, create a mailto link as fallback
      const subject = `New Project Inquiry from ${formData.name}`;
      const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Location: ${formData.address}

Project Details:
${formData.project}
      `;
      
      const mailtoLink = `mailto:info.astralcorp@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, '_blank');
      
      toast({
        title: "Email client opened!",
        description: "Your default email app should open with the message pre-filled.",
      });
      
      setFormData({ name: "", email: "", phone: "", address: "", project: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
    
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
      <div className="max-w-7xl mx-auto px-6">
        <div ref={revealRef} className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl md:text-6xl font-bold font-display mb-6 text-foreground">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground font-body">
            Tell us about your idea. We'll make it real.
          </p>
        </div>
        
        {/* Centered Contact Form */}
        <div className="max-w-4xl mx-auto">
          <div ref={revealRef} className="scroll-reveal bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/20 shadow-2xl">
            
            {/* Contact Info Header */}
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold font-display mb-6 text-foreground">Get in Touch</h3>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-muted-foreground">info.astralcorp@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-xl">📱</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">WhatsApp</div>
                    <div className="text-muted-foreground">+91-7200021788</div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 animate-breathing" style={{ animationDelay: '0.5s' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-medium text-foreground mb-3 font-body">Full Name *</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-6 text-lg bg-card border-2 border-border rounded-2xl focus:border-primary focus:outline-none transition-colors font-body"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-foreground mb-3 font-body">Email Address *</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-6 text-lg bg-card border-2 border-border rounded-2xl focus:border-primary focus:outline-none transition-colors font-body"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-medium text-foreground mb-3 font-body">Phone Number</label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-6 text-lg bg-card border-2 border-border rounded-2xl focus:border-primary focus:outline-none transition-colors font-body"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-foreground mb-3 font-body">Location</label>
                  <Input
                    type="text"
                    name="address"
                    placeholder="City, Country"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-6 text-lg bg-card border-2 border-border rounded-2xl focus:border-primary focus:outline-none transition-colors font-body"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-foreground mb-3 font-body">Tell us about your project *</label>
                <Textarea
                  name="project"
                  rows={8}
                  placeholder="Describe your project goals, timeline, budget range, and any specific requirements..."
                  value={formData.project}
                  onChange={handleChange}
                  required
                  className="w-full p-6 text-lg bg-card border-2 border-border rounded-2xl focus:border-primary focus:outline-none transition-colors resize-none font-body"
                />
              </div>
              
              <div className="pt-4">
                <Button
                  ref={magneticRef}
                  type="submit"
                  disabled={isSubmitting}
                  className="magnetic-element w-full bg-primary hover:bg-primary/90 p-6 rounded-2xl text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl font-body"
                >
                  {isSubmitting ? "Opening Email Client..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

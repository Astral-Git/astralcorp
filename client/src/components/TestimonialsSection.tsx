import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    id: 1,
    rating: 5,
    content: "The website was clean, responsive, and delivered on time.",
    name: "Arjun",
    role: "Startup Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    delay: "0s"
  },
  {
    id: 2,
    rating: 5,
    content: "They perfectly captured the vibe of my brand through the logo.",
    name: "Sneha",
    role: "Designer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332e234?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    delay: "0.5s"
  },
  {
    id: 3,
    rating: 5,
    content: "Super smooth process from start to finish. Highly recommend.",
    name: "Ravi",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    delay: "1s"
  }
];

export default function TestimonialsSection() {
  const revealRef = useScrollReveal();

  return (
    <section className="py-20 section-blur">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={revealRef} className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl md:text-6xl font-bold space-font mb-6 text-foreground">What Our Clients Say</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              ref={revealRef}
              className="testimonial-card p-8 rounded-2xl animate-breathing scroll-reveal"
              style={{ animationDelay: testimonial.delay }}
            >
              <div className="mb-6">
                <div className="flex text-blue-400 mb-4">
                  {"★".repeat(testimonial.rating)}
                </div>
                <p className="text-lg mb-6 italic">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} profile`}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Website for Trendy",
    description: "Modern e-commerce platform with seamless UX",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    link: "#",
    delay: "0.5s"
  },
  {
    id: 2,
    title: "Creative Agency Portfolio",
    description: "Bold design with interactive animations",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    link: "#",
    delay: "0.7s"
  },
  {
    id: 3,
    title: "Mobile Banking App",
    description: "Intuitive financial app with clean UI",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    link: "#",
    delay: "0.9s"
  },
  {
    id: 4,
    title: "Logo Design – TechVerse",
    description: "Modern tech company brand identity",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    link: "#",
    delay: "1.1s"
  },
  {
    id: 5,
    title: "Analytics Dashboard",
    description: "Data visualization and user experience",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    link: "#",
    delay: "1.3s"
  },
  {
    id: 6,
    title: "Complete Brand Identity",
    description: "Comprehensive visual identity system",
    image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    link: "#",
    delay: "1.5s"
  }
];

export default function WorkShowcase() {
  const revealRef = useScrollReveal();
  const magneticRef = useMagneticEffect();

  return (
    <section id="work" className="py-20 section-blur">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={revealRef} className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl md:text-6xl font-bold space-font mb-6">Selected Work</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A showcase of our recent projects in web development and visual design
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              ref={revealRef}
              className="portfolio-card rounded-2xl overflow-hidden animate-breathing scroll-reveal"
              style={{ animationDelay: item.delay }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <a
                  ref={magneticRef}
                  href={item.link}
                  className="text-blue-400 hover:text-blue-300 magnetic-element"
                >
                  {item.title.includes("Logo") ? "View Case Study →" : "View Live →"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

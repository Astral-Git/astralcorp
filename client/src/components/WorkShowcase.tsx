import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    title: "TechFlow Solutions Website",
    description: "Enterprise SaaS platform with 300% engagement boost",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    link: "#",
    delay: "0.5s"
  },
  {
    id: 2,
    title: "Bella Vista Restaurant Chain",
    description: "Complete brand identity and digital presence",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    link: "#",
    delay: "0.7s"
  },
  {
    id: 3,
    title: "Urban Lifestyle E-commerce",
    description: "Fashion retail platform with 200% sales increase",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    link: "#",
    delay: "0.9s"
  },
  {
    id: 4,
    title: "FinanceFirst Logo & Branding",
    description: "Financial services brand identity design",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    link: "#",
    delay: "1.1s"
  },
  {
    id: 5,
    title: "HealthCare Analytics Dashboard",
    description: "Medical data visualization platform",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    link: "#",
    delay: "1.3s"
  },
  {
    id: 6,
    title: "Green Energy Corp Rebrand",
    description: "Sustainable energy company visual identity",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    link: "#",
    delay: "1.5s"
  }
];

export default function WorkShowcase() {
  const revealRef = useScrollReveal();
  const magneticRef = useMagneticEffect<HTMLButtonElement>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  // Auto-moving slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev + itemsToShow >= portfolioItems.length ? 0 : prev + 1
      );
    }, 4000); // Move every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsToShow >= portfolioItems.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(portfolioItems.length - itemsToShow, 0) : prev - 1
    );
  };

  return (
    <section id="work" className="py-20 section-blur">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={revealRef} className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl md:text-6xl font-bold space-font mb-6 text-foreground">Selected Work</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of our recent projects in web development and visual design
          </p>
        </div>
        
        {/* Gallery Slider */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {portfolioItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="portfolio-card rounded-2xl overflow-hidden animate-breathing bg-card dark:bg-card border border-border">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-card-foreground">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <a
                        href={item.link}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        {item.title.includes("Logo") ? "View Case Study →" : "View Live →"}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            ref={magneticRef}
            onClick={prevSlide}
            className="magnetic-element absolute left-4 top-1/2 -translate-y-1/2 bg-background dark:bg-black/80 backdrop-blur-md border border-border rounded-full p-3 hover:bg-accent transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            ref={magneticRef}
            onClick={nextSlide}
            className="magnetic-element absolute right-4 top-1/2 -translate-y-1/2 bg-background dark:bg-black/80 backdrop-blur-md border border-border rounded-full p-3 hover:bg-accent transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(portfolioItems.length / itemsToShow) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsToShow)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  Math.floor(currentIndex / itemsToShow) === index 
                    ? 'bg-primary' 
                    : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Static Grid for Mobile */}
        <div className="md:hidden mt-12 grid grid-cols-1 gap-8">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              ref={revealRef}
              className="portfolio-card rounded-2xl overflow-hidden animate-breathing scroll-reveal bg-card border border-border"
              style={{ animationDelay: item.delay }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <a
                  href={item.link}
                  className="text-primary hover:text-primary/80 transition-colors"
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

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { useIsMobile } from "@/hooks/useIsMobile";
import sreemeditec from "./sreemeditec.png";
import chillicken from "./008.png";


interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
  delay?: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "E-commerce Website – Sreemeditec",
    description: "Modern UI/UX with seamless checkout experience.",
    image: sreemeditec,
    link: "https://www.sreemeditec.in/",
    delay: "0.5s",
  },
  {
    id: 2,
    title: "Poster design – Sample",
    description: "",
    image: chillicken,
    delay: "0.7s",
  },
  {
    id: 3,
    title: "Portfolio Site – Ria Sharma",
    description: "Personal website with a custom content management system.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    link: "Live Site →",
    delay: "0.9s",
  },
  {
    id: 4,
    title: "Landing Page – TravelNow",
    description: "Responsive one-pager optimized for mobile lead generation.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    delay: "1.1s",
  },
  {
    id: 5,
    title: "Brand Identity – Creative Studio",
    description: "Complete visual identity system with logo, colors, and typography.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    delay: "1.3s",
  },
  {
    id: 6,
    title: "Web App – ProductFlow",
    description: "Modern productivity tool with clean design and intuitive workflow.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    link: "Live Site →",
    delay: "1.5s",
  },
];

export default function WorkShowcase() {
  const revealRef = useScrollReveal();
  const prevButtonRef = useMagneticEffect<HTMLButtonElement>();
  const nextButtonRef = useMagneticEffect<HTMLButtonElement>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const isMobile = useIsMobile();
  const itemsToShow = isMobile ? 1 : 3;
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedItem) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + itemsToShow >= portfolioItems.length ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [itemsToShow, selectedItem]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev + itemsToShow >= portfolioItems.length ? 0 : prev + 1
    );
  }, [itemsToShow]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(portfolioItems.length - itemsToShow, 0) : prev - 1
    );
  }, [itemsToShow]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") setSelectedItem(null);
    },
    [selectedItem, nextSlide, prevSlide]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item);
  };

  const closeGallery = () => {
    setSelectedItem(null);
  };

  return (
    <section id="work" className="py-20 section-blur">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={revealRef} className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl md:text-6xl font-bold space-font mb-6 text-foreground">
            Selected Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of our recent projects in web development and visual design
          </p>
        </div>

        {!isMobile && (
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
              >
                {portfolioItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 px-4 cursor-pointer"
                    style={{ width: `${100 / itemsToShow}%` }}
                    onClick={() => handleItemClick(item)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${item.title} details`}
                  >
                    <div className="portfolio-card rounded-2xl overflow-hidden animate-breathing bg-card border border-border hover:shadow-lg transition-shadow">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-card-foreground">{item.title}</h3>
                        <p className="text-muted-foreground mb-4">{item.description}</p>
                        {item.link && (
                          <a
                            href="#"
                            className="text-primary hover:text-primary/80 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {item.link}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              ref={prevButtonRef}
              onClick={prevSlide}
              className="magnetic-element absolute left-4 top-1/2 -translate-y-1/2 bg-background dark:bg-black/80 backdrop-blur-md border border-border rounded-full p-3 hover:bg-accent transition-colors disabled:opacity-50"
              disabled={currentIndex === 0}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              ref={nextButtonRef}
              onClick={nextSlide}
              className="magnetic-element absolute right-4 top-1/2 -translate-y-1/2 bg-background dark:bg-black/80 backdrop-blur-md border border-border rounded-full p-3 hover:bg-accent transition-colors disabled:opacity-50"
              disabled={currentIndex + itemsToShow >= portfolioItems.length}
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>

            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(portfolioItems.length / itemsToShow) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsToShow)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    Math.floor(currentIndex / itemsToShow) === index
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {isMobile && (
          <div className="grid grid-cols-1 gap-8">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                ref={revealRef}
                className="portfolio-card rounded-2xl overflow-hidden animate-breathing scroll-reveal bg-card border border-border"
                style={{ animationDelay: item.delay }}
                onClick={() => handleItemClick(item)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title} details`}
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
                  {item.link && (
                    <a
                      href="#"
                      className="text-primary hover:text-primary/80 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.link}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedItem && (
          <div
            ref={galleryRef}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeGallery}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio item gallery"
          >
            <div
              className="relative max-w-3xl w-full bg-card rounded-2xl overflow-hidden animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeGallery}
                className="absolute top-4 right-4 p-2 bg-background/80 rounded-full hover:bg-accent transition-colors"
                aria-label="Close gallery"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3 text-card-foreground">{selectedItem.title}</h3>
                <p className="text-muted-foreground mb-4">{selectedItem.description}</p>
                {selectedItem.link && (
                  <a
                    href="#"
                    className="text-primary hover:text-primary/80 transition-colors inline-block"
                  >
                    {selectedItem.link}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
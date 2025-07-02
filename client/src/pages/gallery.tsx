import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState, useMemo, useCallback, memo, useTransition } from "react";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const portfolioData: Record<string, GalleryItem[]> = {
  // Your optimized image URLs go here with f_auto,q_auto,w_800
 "Web Design": [
    {
      id: 1,
      title: "E-commerce Platform - TechStore",
      description: "Modern responsive e-commerce website with advanced filtering and checkout",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751482504/screencapture-sreemeditec-in-2025-07-02-23_59_42_zwjzhe.png",
      category: "Web Design",
    },
    {
      id: 2,
      title: "Portfolio Website - Creative Agency",
      description: "Minimalist portfolio showcasing creative work with smooth animations",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751485390/screencapture-sreekumar-career-github-io-react-2025-07-03-01_12_33_ezfdiq.png",
      category: "Web Design",
    },
  ],
  "UI/UX Design": [
    {
      id: 4,
      title: "Mobile Banking App",
      description: "Intuitive mobile banking interface with enhanced security features",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
      category: "UI/UX Design",
    },
    {
      id: 5,
      title: "Food Delivery App",
      description: "User-friendly food ordering app with seamless checkout flow",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      category: "UI/UX Design",
    },
  ],
  "Logo Design": [
    {
      id: 6,
      title: "Tech Startup Branding",
      description: "Modern logo design for innovative tech company",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751484362/WhatsApp_Image_2025-06-29_at_23.48.05_b1bbd7af_zax2bi_c_fill_w_600_h_600_ar_1_1_stdmby.jpg",
      category: "Logo Design",
    },
    {
      id: 7,
      title: "Restaurant Chain Identity",
      description: "Complete brand identity for premium restaurant chain",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751484637/transparent-logo__1_-removebg-preview_adocgy.png",
      category: "Logo Design",
    },
  ],
  "Poster Design": [
    {
      id: 81,
      title: "Festival Poster",
      description: "Vibrant poster design for summer music festival",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751482535/00672_jk5m1l.png",
      category: "Poster Design",
    },
    {
      id: 82,
      title: "Corporate Event Branding",
      description: "Professional poster series for corporate conference",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751482535/00772_iwpbnb.png",
      category: "Poster Design",
    },
    {
      id: 83,
      title: "Festival Poster 2",
      description: "Colorful design for youth concert",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751482520/01272_pgu5lw.png",
      category: "Poster Design",
    },
    {
      id: 84,
      title: "Corporate Event Design 2",
      description: "Poster series for business summit",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751482536/01372_rco7mx.png",
      category: "Poster Design",
    },
    {
      id: 85,
      title: "Festival Poster 3",
      description: "Modern visual for DJ night",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751482536/01572_bqbsrz.png",
      category: "Poster Design",
    },
    {
      id: 86,
      title: "Corporate Design 3",
      description: "Minimalistic conference poster",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751482505/01472_1_xxaaav.png",
      category: "Poster Design",
    },
    {
      id: 87,
      title: "Festival Poster 4",
      description: "Trendy youth party poster design",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751482520/00872_wue0yr.png",
      category: "Poster Design",
    },
    {
      id: 88,
      title: "Corporate Poster 4",
      description: "Elegant branding for business event",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751482504/00972_1_z6tiwp.png",
      category: "Poster Design",
    },
  ],
  "Product Design": [
    {
      id: 91,
      title: "Smart Home Controller",
      description: "Sleek interface design for IoT home automation system",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751482534/00172_wxpj9m.png",
      category: "Product Design",
    },
    {
      id: 92,
      title: "Fitness Tracker UI",
      description: "Health-focused wearable device interface design",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751482503/00272_1_ssek3h.png",
      category: "Product Design",
    },
    {
      id: 93,
      title: "Smart Controller v2",
      description: "Updated control panel UI",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751482503/00572_1_opwsli.png",
      category: "Product Design",
    },
    {
      id: 94,
      title: "Smart Controller v3",
      description: "Elegant interface redesign",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751482519/00472_gjlpxg.png",
      category: "Product Design",
    },
    {
      id: 95,
      title: "Fitness Tracker Pro",
      description: "Advanced wearable dashboard",
      image: "https://res.cloudinary.com/dulqlngkh/image/upload/v1751482519/00372_nhkn70.png",
      category: "Product Design",
    },
  ],
};

const debounce = <F extends (...args: any[]) => void>(func: F, wait: number) => {
  let timeout: number;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
};

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
  if (!element) return;

  const observer = new IntersectionObserver(
    ([entry]) => setIsIntersecting(entry.isIntersecting),
    { threshold: 0.1, ...options }
  );

  observer.observe(element);
  return () => observer.disconnect();
}, [element, options]);


  return [setElement, isIntersecting] as const;
};

const GalleryItem = ({ item }: { item: GalleryItem }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23f3f4f6'/%3E%3Ctext x='400' y='225' text-anchor='middle' dy='0.3em' fill='%236b7280' font-size='18' font-family='system-ui'%3EImage not available%3C/text%3E%3C/svg%3E";
  }, []);

  return (
    <article
      ref={ref}
      className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      role="img"
      aria-labelledby={`item-title-${item.id}`}
      aria-describedby={`item-desc-${item.id}`}
    >
      <div className="relative aspect-w-16 aspect-h-9">
        {isVisible && (
          <>
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={item.image}
              srcSet={`${item.image} 600w`}
              alt={`${item.title} - ${item.description}`}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ contentVisibility: 'auto' }}
            />
          </>
        )}
      </div>
      <div className="p-4">
        <h3 id={`item-title-${item.id}`} className="text-xl font-semibold font-display">{item.title}</h3>
        <p id={`item-desc-${item.id}`} className="text-muted-foreground font-body mt-2">{item.description}</p>
      </div>
    </article>
  );
};

const MemoizedGalleryItem = memo(GalleryItem, (prev, next) => prev.item.id === next.item.id);

const GalleryGrid = memo(({ items }: { items: GalleryItem[] }) => (
  <section
    aria-label="Gallery items"
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    {items.map((item) => <MemoizedGalleryItem key={item.id} item={item} />)}
  </section>
));

export default function Gallery() {
  const [, setLocation] = useLocation();
  const [category, setCategory] = useState("Web Design");
  const [isPending, startTransition] = useTransition();

  const debouncedSetCategory = useCallback(
    debounce((newCategory: string) => {
      startTransition(() => {
        setCategory(newCategory);
        const url = new URL(window.location.href);
        url.searchParams.set("category", newCategory);
        window.history.replaceState({}, '', url.toString());
      });
    }, 150),
    []
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    if (categoryParam && portfolioData[categoryParam]) {
      setCategory(categoryParam);
    }
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [category]);

  const currentItems = useMemo(() => portfolioData[category] || [], [category]);

  const categoryButtons = useMemo(() =>
    Object.keys(portfolioData).map((cat) => (
      <Button
        key={cat}
        onClick={() => debouncedSetCategory(cat)}
        variant={category === cat ? "default" : "outline"}
        className="font-body"
        aria-pressed={category === cat}
        aria-label={`View ${cat} gallery`}
      >
        {cat}
      </Button>
    ))
  , [category, debouncedSetCategory]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50">
        Skip to main content
      </a>

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <header className="flex items-center gap-4 mb-12">
            <Button onClick={() => setLocation("/")} variant="outline" size="lg" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Back to Home
            </Button>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-display">{category} Gallery</h1>
              <p className="text-lg text-muted-foreground font-body mt-2">Explore our {category.toLowerCase()} projects</p>
            </div>
          </header>

          <nav className="flex flex-wrap gap-4 mb-12 justify-center" aria-label="Gallery categories">
            {categoryButtons}
          </nav>

          {isPending && (
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                Loading {category.toLowerCase()} projects...
              </div>
            </div>
          )}

          <main id="main-content" className={`transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
            <GalleryGrid items={currentItems} />
            {currentItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No items found in this category.</p>
              </div>
            )}
          </main>

          <link rel="preload" as="image" href={currentItems[0]?.image} />
        </div>
      </div>
    </div>
  );
}

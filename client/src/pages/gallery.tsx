import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const portfolioData: Record<string, GalleryItem[]> = {
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

export default function Gallery() {
  const [, setLocation] = useLocation();
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category") || "Web Design";
    setCategory(categoryParam);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category]);

  const currentItems = portfolioData[category] || [];

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <Button
              onClick={() => setLocation("/")}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Button>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground">
                {category} Gallery
              </h1>
              <p className="text-lg text-muted-foreground font-body mt-2">
                Explore our {category.toLowerCase()} projects
              </p>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {Object.keys(portfolioData).map((cat) => (
              <Button
                key={cat}
                onClick={() => setCategory(cat)}
                variant={category === cat ? "default" : "outline"}
                className="font-body"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div
            key={category}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title || item.description}
                    loading="lazy"
                    decoding="async"
                    className="w-auto h-auto object-contain transition-transform duration-300"
                    onError={(e) =>
                      (e.currentTarget.src = "https://via.placeholder.com/800x450")
                    }
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold font-display">
                    {item.title || "Untitled"}
                  </h3>
                  <p className="text-muted-foreground font-body mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

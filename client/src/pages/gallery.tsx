import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";

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
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      category: "Web Design"
    },
    {
      id: 2,
      title: "Portfolio Website - Creative Agency",
      description: "Minimalist portfolio showcasing creative work with smooth animations",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      category: "Web Design"
    },
    {
      id: 3,
      title: "SaaS Dashboard - Analytics Pro",
      description: "Complex data visualization dashboard with real-time updates",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      category: "Web Design"
    }
  ],
  "UI/UX Design": [
    {
      id: 4,
      title: "Mobile Banking App",
      description: "Intuitive mobile banking interface with enhanced security features",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      category: "UI/UX Design"
    },
    {
      id: 5,
      title: "Food Delivery App",
      description: "User-friendly food ordering app with seamless checkout flow",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      category: "UI/UX Design"
    }
  ],
  "Logo Design": [
    {
      id: 6,
      title: "Tech Startup Branding",
      description: "Modern logo design for innovative tech company",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      category: "Logo Design"
    },
    {
      id: 7,
      title: "Restaurant Chain Identity",
      description: "Complete brand identity for premium restaurant chain",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop",
      category: "Logo Design"
    }
  ],
  "Poster Design": [
    {
      id: 8,
      title: "Music Festival Poster",
      description: "Vibrant poster design for summer music festival",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      category: "Poster Design"
    },
    {
      id: 9,
      title: "Corporate Event Branding",
      description: "Professional poster series for corporate conference",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
      category: "Poster Design"
    }
  ],
  "Product Design": [
    {
      id: 10,
      title: "Smart Home Controller",
      description: "Sleek interface design for IoT home automation system",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      category: "Product Design"
    },
    {
      id: 11,
      title: "Fitness Tracker UI",
      description: "Health-focused wearable device interface design",
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&h=600&fit=crop",
      category: "Product Design"
    }
  ]
};

export default function Gallery() {
  const [, setLocation] = useLocation();
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category") || "Web Design";
    setCategory(categoryParam);
  }, []);

  const currentItems = portfolioData[category] || [];

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <CustomCursor />
      <ParticleBackground />
      
      <div className="relative z-10 pt-20 pb-16">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/20"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold font-display mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/20">
              <h2 className="text-3xl font-bold font-display mb-4 text-foreground">
                Like what you see?
              </h2>
              <p className="text-lg text-muted-foreground font-body mb-6">
                Let's create something amazing together for your brand.
              </p>
              <Button
                onClick={() => setLocation("/?section=contact")}
                size="lg"
                className="font-body"
              >
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
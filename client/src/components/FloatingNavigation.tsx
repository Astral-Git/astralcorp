import { useEffect, useState } from "react";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import logo from "./logo.png"; // ✅ Import the image as a module

export default function FloatingNavigation() {
  const [activeSection, setActiveSection] = useState("home");
  const magneticRef = useMagneticEffect<HTMLButtonElement>();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "work", "contact"];
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollY >= offsetTop - 100 &&
            scrollY < offsetTop + offsetHeight - 100
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="floating-nav fixed top-10 left-10 z-[100]  opacity-0 px-6 py-3 rounded-full animate-breathing backdrop-blur-md bg-background/80 dark:bg-black/80 border border-border">
  <img
    src={logo} // ✅ Using the imported logo image
    alt="Logo"
    className="w-12 h-10 object-contain"
  />
</nav>

  );
}

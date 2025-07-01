import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const magneticRef = useMagneticEffect<HTMLButtonElement>();

  return (
    <button
      ref={magneticRef}
      onClick={toggleTheme}
      className="magnetic-element fixed top-6 right-6 z-50 p-3 rounded-full bg-black/20 dark:bg-white/10 backdrop-blur-md border border-white/10 hover:border-blue-400/50 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-blue-400" />
      )}
    </button>
  );
}
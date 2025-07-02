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
      className="magnetic-element fixed top-6 right-6 z-50 p-3 rounded-full bg-background/20 dark:bg-background/10 backdrop-blur-md border border-border hover:border-primary/50 transition-all duration-300"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-blue-400" />
      )}
    </button>
  );
}
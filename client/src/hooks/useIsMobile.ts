// client/src/hooks/useIsMobile.ts
import { useEffect, useState, useCallback } from "react";

interface UseIsMobileOptions {
  breakpoint?: number;
  debounceMs?: number;
}

export function useIsMobile({
  breakpoint = 768,
  debounceMs = 100,
}: UseIsMobileOptions = {}): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  let timeoutId: NodeJS.Timeout | null = null;

  const handleResize = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      setIsMobile(window.innerWidth < breakpoint);
    }, debounceMs);
  }, [breakpoint, debounceMs]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return () => {};
    }

    setIsMobile(window.innerWidth < breakpoint);

    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    mql.addEventListener("change", handleResize);

    return () => {
      mql.removeEventListener("change", handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [handleResize, breakpoint]);

  return isMobile;
}
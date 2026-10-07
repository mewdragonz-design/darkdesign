import { useState, useEffect, RefObject } from "react";

export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = ref.current.offsetHeight;
      
      // Calculate how far we've scrolled through the section
      // 0 = section just started, 1 = section ended
      const scrollableDistance = sectionHeight - windowHeight;
      const scrolled = -rect.top;
      
      const newProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
}

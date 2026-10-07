import { useEffect, useState } from "react";
import { resolveImageUrl } from "@/lib/assetResolver";

interface ProjectHeroProps {
  title: string;
  description?: string | null;
  role?: string | null;
  tags?: string[] | null;
  mainImage?: string | null;
}

const ProjectHero = ({ title, description, role, tags, mainImage }: ProjectHeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const mainImageUrl = resolveImageUrl(mainImage);

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-24">
      {/* Background Image Layer - Mirrored, low opacity with breathing animation */}
      {mainImageUrl && (
        <div 
          className={`absolute top-0 left-0 w-full h-full transition-all duration-[1500ms] ease-out ${
            isVisible ? "opacity-30 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            animation: isVisible ? "breathe 12s ease-in-out infinite" : "none",
          }}
        >
          <img
            src={mainImageUrl}
            alt=""
            className="w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
      )}

      {/* Dark Gradient Overlay - Reduced opacity to show background image */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-background/80 via-background/60 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-background/40 via-transparent to-background/20" />

      {/* Content Container */}
      <div className="relative z-10 min-h-[calc(100vh-6rem)] flex flex-col lg:flex-row">
        {/* Left Column - Content (35-40%) - Aligned to top of image */}
        <div className="order-2 lg:order-1 flex-[0.38] flex items-start px-8 md:px-16 py-8 lg:py-8">
          <div className="max-w-lg space-y-6">
            {/* Heading */}
            <h1 
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-foreground leading-[0.95] transition-all duration-700 ease-out ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              {title}
            </h1>
            
            {/* Description */}
            {description && (
              <p 
                className={`text-lg md:text-xl text-muted-foreground leading-relaxed transition-all duration-700 ease-out ${
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: "250ms" }}
              >
                {description}
              </p>
            )}
            
            {/* Tags */}
            {((role || (tags && tags.length > 0))) && (
              <div 
                className={`flex flex-wrap gap-2 pt-2 transition-all duration-700 ease-out ${
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                {role && (
                  <span className="px-4 py-2 bg-secondary/10 border border-border text-foreground text-sm transition-all duration-300 hover:bg-secondary/25 hover:border-foreground/30 cursor-default">
                    {role}
                  </span>
                )}
                {tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-secondary/10 border border-border text-muted-foreground text-sm transition-all duration-300 hover:bg-secondary/25 hover:text-foreground cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Main Image (60-65%) */}
        <div className="order-1 lg:order-2 flex-[0.62] relative min-h-[50vh] lg:min-h-[calc(100vh-6rem)] flex items-start justify-center p-4 lg:p-8 lg:pt-0">
          {mainImageUrl && (
            <div 
              className={`relative w-full h-full lg:h-[85vh] overflow-hidden transition-all duration-800 ease-out ${
                isVisible 
                  ? "opacity-100 translate-y-0 scale-100" 
                  : "opacity-0 translate-y-3 scale-[0.98]"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <img
                src={mainImageUrl}
                alt={title}
                className="w-full h-full object-cover transition-all duration-300 ease-out hover:scale-[1.02] hover:brightness-110 hover:contrast-105"
              />
            </div>
          )}
        </div>
      </div>

      {/* Breathing animation keyframes */}
      <style>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectHero;

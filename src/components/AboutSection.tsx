import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import PolaroidCard from "./PolaroidCard";
import aboutPhoto1 from "@/assets/about-1.jpg";
import aboutPhoto2 from "@/assets/about-2.jpg";
import aboutPhoto3 from "@/assets/about-3.jpg";
import aboutPhoto4 from "@/assets/about-4.jpg";

// Card configuration - exactly 4 cards
// Cards 1-3: no caption, Card 4: with caption (hero)
const cards = [
  { id: 1, image: aboutPhoto1, showCaption: false },
  { id: 2, image: aboutPhoto2, showCaption: false },
  { id: 3, image: aboutPhoto3, showCaption: false },
  { id: 4, image: aboutPhoto4, showCaption: true, name: "Emma Rose", subtitle: "The 3D Artist" },
];

// Helper to interpolate between two values
const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

// Clamp progress to 0-1 range
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);

  // Calculate card state based on scroll progress
  const getCardStyle = (cardIndex: number) => {
    // Card phases: each card has a 25% window
    // Card 1: 0-25%, Card 2: 25-50%, Card 3: 50-75%, Card 4: 75-100%
    const phaseStart = cardIndex * 0.25;
    const phaseEnd = (cardIndex + 1) * 0.25;
    
    // How far through this card's entrance phase (0-1)
    const entranceProgress = clamp((progress - phaseStart) / 0.25, 0, 1);
    
    // Has this card entered yet?
    const hasEntered = progress >= phaseStart;
    
    // How many cards have come after this one?
    const cardsAfter = Math.max(0, Math.floor((progress - phaseEnd) / 0.25) + (progress >= phaseEnd ? 1 : 0));
    
    // Is this card currently entering?
    const isEntering = progress >= phaseStart && progress < phaseEnd;
    
    // Calculate Y position
    let translateY: number;
    if (!hasEntered) {
      // Card hasn't started entering yet - below viewport
      translateY = 70;
    } else if (isEntering) {
      // Card is entering - animate from 70vh to 0
      translateY = lerp(70, 0, entranceProgress);
    } else {
      // Card has fully entered - stays at center
      translateY = 0;
    }
    
    // Calculate opacity
    let opacity: number;
    if (!hasEntered) {
      // Not entered yet
      opacity = 0.3;
    } else if (isEntering) {
      // Entering - fade in
      opacity = lerp(0.3, 1, entranceProgress);
    } else {
      // Has entered, now may be pushed back
      if (cardsAfter === 0) {
        opacity = 1;
      } else if (cardsAfter === 1) {
        // First level back
        const fadeProgress = clamp((progress - phaseEnd) / 0.25, 0, 1);
        opacity = lerp(1, 0.45, fadeProgress);
      } else {
        // Deeper levels
        opacity = 0.20;
      }
    }
    
    // Calculate rotation
    let rotation = 0;
    if (hasEntered && !isEntering) {
      // Card has fully entered and may be pushed back
      if (cardsAfter >= 1) {
        // Alternate rotation direction based on card index
        const rotationDirection = cardIndex % 2 === 0 ? -1 : 1;
        const fadeProgress = clamp((progress - phaseEnd) / 0.25, 0, 1);
        
        if (cardsAfter === 1) {
          rotation = lerp(0, rotationDirection * 6, fadeProgress);
        } else {
          // Deeper cards have slightly more rotation
          rotation = rotationDirection * (cardsAfter === 2 ? 8 : 10);
        }
      }
    }
    
    // Calculate slight offset for stacked cards (not for the last card)
    let translateX = 0;
    let offsetY = 0;
    if (hasEntered && !isEntering && cardsAfter >= 1 && cardIndex < cards.length - 1) {
      const offsetDirection = cardIndex % 2 === 0 ? -1 : 1;
      translateX = offsetDirection * (cardsAfter === 1 ? 10 : 15);
      offsetY = cardsAfter === 1 ? 10 : 15;
    }
    
    // Z-index: higher for cards that entered later
    const zIndex = hasEntered ? 10 + cardIndex : 1;
    
    return {
      transform: `translateX(${translateX}px) translateY(calc(${translateY}vh + ${offsetY - 50}px)) rotate(${rotation}deg)`,
      opacity,
      zIndex,
      transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
      willChange: "transform, opacity"
    };
  };

  return (
    <section 
      id="about"
      ref={sectionRef} 
      className="relative bg-background" 
      style={{ height: "350vh" }}
    >
      {/* Decorative grid lines - hidden on mobile */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 right-4 h-px bg-border" />
        <div className="absolute bottom-4 left-4 right-4 h-px bg-border" />
        <div className="absolute top-4 bottom-4 left-4 w-px bg-border" />
        <div className="absolute top-4 bottom-4 right-4 w-px bg-border" />
      </div>

      {/* Sticky content container */}
      <div className="sticky top-0 h-screen flex flex-col items-center overflow-hidden">
        {/* Text content */}
        <div className="text-center px-6 pt-16 md:pt-24 mb-8 md:mb-12">
          <span className="text-muted-foreground text-sm md:text-base mb-4 block">
            [ About Me ]
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground/90 max-w-3xl leading-tight lg:text-3xl">
            Bringing imagination to life
            <span className="text-muted-foreground">
              —crafting immersive 3D worlds that evoke emotion.
            </span>
          </h2>
        </div>

        {/* Card stack - centered */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="relative w-[280px] md:w-[340px] h-[360px] md:h-[440px]">
            {cards.map((card, index) => (
              <div 
                key={card.id} 
                className="absolute inset-0 flex items-center justify-center"
                style={getCardStyle(index)}
              >
                <PolaroidCard 
                  image={card.image} 
                  name={card.showCaption ? card.name : undefined}
                  subtitle={card.showCaption ? card.subtitle : undefined}
                  showCaption={card.showCaption}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
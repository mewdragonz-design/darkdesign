import { useEffect, useRef, useState } from "react";

type TimelineColumn = {
  step: string;
  title: string;
  duration: string;
  /** Card height for staircase effect */
  cardHeight: string;
};

const timelineColumns: TimelineColumn[] = [
  {
    step: "01",
    title: "Concept\nProposal",
    duration: "[ 1 week depending on the size of the design ]",
    cardHeight: "h-[280px]"
  },
  {
    step: "02",
    title: "Full 3D\nDesign",
    duration: "[ 2–4 weeks ]",
    cardHeight: "h-[340px]"
  },
  {
    step: "03",
    title: "Project\nDeliverables",
    duration: "[ 3 weeks ]",
    cardHeight: "h-[400px]"
  },
  {
    step: "04",
    title: "Project\nFinals",
    duration: "[ 1 week depending on the size of the design ]",
    cardHeight: "h-[460px]"
  }
];

const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-24 px-6 md:px-12 lg:px-20 bg-background"
    >
      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Horizontal lines at top */}
        <div className="absolute top-8 left-0 right-0 h-px bg-muted-foreground/10" />
        <div className="absolute top-12 left-0 right-0 h-px bg-muted-foreground/5" />

        {/* Horizontal lines at bottom */}
        <div className="absolute bottom-8 left-0 right-0 h-px bg-muted-foreground/10" />
        <div className="absolute bottom-12 left-0 right-0 h-px bg-muted-foreground/5" />

        {/* Vertical lines at left */}
        <div className="absolute top-0 bottom-0 left-8 w-px bg-muted-foreground/10" />
        <div className="absolute top-0 bottom-0 left-12 w-px bg-muted-foreground/5" />

        {/* Vertical lines at right */}
        <div className="absolute top-0 bottom-0 right-8 w-px bg-muted-foreground/10" />
        <div className="absolute top-0 bottom-0 right-12 w-px bg-muted-foreground/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top text area */}
        <div className="px-[30px] py-[30px] border-t border-l border-r border-border">
          {/* Timeline label with animation */}
          <span 
            className={`text-muted-foreground text-sm font-medium tracking-wide mb-6 block transition-all duration-700 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            }`}
          >
            [ Timeline ]
          </span>
          
          {/* Heading with animation - slight delay */}
          <h2 
            className={`text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed max-w-4xl text-foreground transition-all duration-700 ease-out delay-150 ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            From concept to final render—my streamlined process ensures every project is delivered with precision and care.
          </h2>
        </div>

        {/* 4-column grid - full height columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border overflow-hidden -mt-px">
          {timelineColumns.map((col, index) => (
            <div 
              key={col.step} 
              className={`relative lg:h-[520px] ${index > 0 ? "lg:border-l border-border" : ""} ${index > 0 ? "sm:border-l border-border sm:odd:border-l-0 lg:odd:border-l" : ""}`}
            >
              {/* Wrapper for number + card - positioned at bottom */}
              <div 
                className={`lg:absolute lg:left-0 lg:right-0 lg:bottom-0 flex flex-col transition-all duration-700 ease-out ${
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-10"
                }`}
                style={{ 
                  transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms" 
                }}
              >
                {/* Number holder - sits directly above card */}
                <div className="px-6 py-3">
                  <span className="font-mono text-sm text-muted-foreground">[ {col.step} ]</span>
                </div>

                {/* Card panel - anchored to bottom, varying heights */}
                <div className={`${col.cardHeight} bg-card/60 backdrop-blur-sm border-t-[3px] border-accent flex flex-col p-6`}>
                  <h3 className="font-sans text-3xl md:text-4xl font-medium tracking-tight text-muted-foreground whitespace-pre-line leading-tight">
                    {col.title}
                  </h3>

                  <p className="mt-auto font-mono text-sm text-muted-foreground max-w-[220px]">
                    {col.duration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

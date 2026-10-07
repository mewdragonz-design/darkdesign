import { Link } from "react-router-dom";
import secretProfile from "@/assets/secret-profile.jpg";
import secretStats from "@/assets/secret-stats.jpg";
import { Button } from "@/components/ui/button";

const experiences = [
  {
    years: "2023–now",
    role: "Freelance Designer",
    company: "Independent"
  },
  {
    years: "2020–2023",
    role: "Lead Visual Designer",
    company: "Oversight"
  },
  {
    years: "2017–2020",
    role: "Brand Designer",
    company: "Lovable"
  }
];

const SecretStuffSection = () => {
  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-[30px]">
          <span className="text-sm text-muted-foreground font-mono">[ Secret Stuff ]</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mt-4 max-w-4xl leading-tight">
            The numbers behind the scenes—experience, milestones, and kind words from amazing clients.
          </h2>
        </div>

        {/* 3-column grid with gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr] gap-[30px]">
          {/* Column 1 - Profile/Experience Card */}
          <div className="relative min-h-[500px] lg:min-h-[600px] overflow-hidden border border-border">
            <img src={secretProfile} alt="Profile" className="absolute inset-0 w-full h-full object-cover" />
            {/* Experience overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/80 to-transparent">
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <span className="text-foreground/70 w-20 shrink-0">{exp.years}</span>
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    <span className="text-foreground/90">{exp.role}</span>
                    <span className="text-foreground/50 ml-auto">{exp.company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 - Stats Card */}
          <div className="relative min-h-[500px] lg:min-h-[600px] overflow-hidden flex flex-col border border-border">
            <img src={secretStats} alt="Stats background" className="absolute inset-0 w-full h-full object-cover" />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-background/20" />
            
            {/* Centered content */}
            <div className="relative z-10 flex-1 flex-col flex items-center justify-start py-[100px]">
              <span className="text-sm text-primary/80 mb-2">Clients</span>
              <span 
                className="text-[100px] font-bold" 
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(153, 153, 153, 0.5) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                250+
              </span>
            </div>
            
            {/* Bottom-aligned button */}
            <div className="relative z-10 flex justify-center mb-8">
              <Button 
                variant="secondary" 
                className="bg-muted/60 text-background hover:bg-muted/80 font-mono"
                asChild
              >
                <Link to="/#projects">[ View Work ]</Link>
              </Button>
            </div>
          </div>

          {/* Column 3 - Testimonial Card */}
          <div className="relative min-h-[500px] lg:min-h-[600px] bg-card p-8 flex flex-col border border-border px-[20px] py-[20px]">
            {/* Top label */}
            <div className="flex items-center gap-2 mb-auto">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm text-foreground/70">Testimonial</span>
            </div>

            {/* Quote */}
            <div className="mt-auto">
              <p className="text-2xl md:text-3xl lg:text-2xl font-normal text-primary leading-relaxed mb-6 xl:text-2xl">
                "Emma transformed our brand vision into stunning 3D visuals that exceeded every expectation. Her attention to detail is unmatched."
              </p>
              <p className="text-sm text-foreground/60">
                Sarah Chen – Creative Director, Lumina Studios
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecretStuffSection;

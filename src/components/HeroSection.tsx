import Navbar from "./Navbar";
import ProjectCarousel from "./ProjectCarousel";
import backgroundLines from "@/assets/background-lines.svg";
const HeroSection = () => {
  return <section className="relative h-screen w-full overflow-hidden bg-card">
      {/* Background decorative lines */}
      <img src={backgroundLines} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col md:flex-row items-start md:items-end justify-between px-8 md:px-16 pt-32 md:pt-0 pb-[625px] md:pb-[465px]">
        {/* Left: Name */}
        <div className="flex-1">
          <h1 className="text-6xl sm:text-8xl leading-[0.9] tracking-tight text-foreground font-semibold md:text-9xl">
            Emma<br />Rose
          </h1>
        </div>
        
        {/* Right: Role */}
        <div className="flex-1 flex justify-end mt-8 md:mt-0">
          <p className="text-2xl sm:text-4xl md:text-[50px] font-medium text-foreground" style={{
          letterSpacing: '-0.05em'
        }}>
            [ 3D Designer ]
          </p>
        </div>
      </div>
      
      {/* Projects Carousel */}
      <ProjectCarousel />
    </section>;
};
export default HeroSection;
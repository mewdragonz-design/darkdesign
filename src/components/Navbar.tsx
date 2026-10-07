import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Only track active section on home page
      if (!isHomePage) return;
      
      const sections = ["contact", "about", "projects"];
      let current = "home";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/", id: "home" },
    { label: "About", href: "/#about", id: "about" },
    { label: "Projects", href: "/#projects", id: "projects" },
    { label: "Contact", href: "/#contact", id: "contact" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Linkedin", href: "https://linkedin.com" },
  ];

  const scrollToSection = (sectionId: string) => {
    // Small delay to ensure DOM is ready after navigation
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string; id: string }) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setActiveSection(link.id);

    if (link.href === "/") {
      // Navigate to home
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
    } else if (link.href.startsWith("/#")) {
      const sectionId = link.href.replace("/#", "");
      
      if (isHomePage) {
        // Already on home page, just scroll
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to home page first, then scroll
        navigate("/");
        scrollToSection(sectionId);
      }
    }
  };

  const handleSocialClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 md:px-16 transition-all duration-300 ${
          isScrolled && !isMenuOpen
            ? "bg-background/80 backdrop-blur-md border-b border-border/50" 
            : "bg-transparent"
        }`}
      >
        {/* Navbar Links - Hidden when menu is open */}
        <div 
          className={`flex items-center gap-8 md:gap-12 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <a 
            href="/#projects"
            onClick={(e) => handleNavClick(e, { href: "/#projects", id: "projects" })}
            className="text-foreground text-sm md:text-base font-medium tracking-wide hover:text-primary transition-colors"
          >
            Projects
          </a>
          <a 
            href="/#about"
            onClick={(e) => handleNavClick(e, { href: "/#about", id: "about" })}
            className="text-foreground text-sm md:text-base font-medium tracking-wide hover:text-primary transition-colors"
          >
            About
          </a>
          <a 
            href="/#contact"
            onClick={(e) => handleNavClick(e, { href: "/#contact", id: "contact" })}
            className="text-foreground text-sm md:text-base font-medium tracking-wide hover:text-primary transition-colors"
          >
            Contact
          </a>
        </div>
        
        {/* Menu Toggle Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-[60] flex flex-col items-center justify-center w-10 h-10 hover:opacity-70 transition-opacity"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span 
            className={`block w-8 h-0.5 bg-foreground transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-0.5" : ""
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 mt-1.5 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5 w-8" : ""
            }`}
          />
        </button>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Blurred Background */}
        <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
        
        {/* Menu Content */}
        <div className="relative h-full flex flex-col justify-between px-8 py-24 md:px-16">
          {/* Navigation Links - Right Aligned */}
          <nav className="flex-1 flex flex-col items-end justify-center gap-4 md:gap-6">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-4xl md:text-6xl lg:text-7xl transition-all duration-500 ${
                    isActive 
                      ? "font-medium text-foreground" 
                      : "font-light text-muted-foreground/60 hover:text-muted-foreground"
                  } ${
                    isMenuOpen 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 translate-x-8"
                  }`}
                  style={{ 
                    transitionDelay: isMenuOpen ? `${150 + index * 100}ms` : "0ms" 
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          
          {/* Social Links - Bottom Left */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSocialClick}
                className={`text-sm md:text-base text-muted-foreground hover:text-foreground transition-all duration-500 ${
                  isMenuOpen 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                }`}
                style={{ 
                  transitionDelay: isMenuOpen ? `${400 + index * 75}ms` : "0ms" 
                }}
              >
                [ {link.label} ]
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  /** "dark" = page behind the header is black; "light" = page is white */
  variant?: "dark" | "light";
}

const links = [
  { label: "Home", to: "/" },
  { label: "Highlights", to: "/highlights" },
  { label: "Demos", to: "/demos" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const SiteHeader = ({ variant = "dark" }: SiteHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  const dark = variant === "dark";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? dark
            ? "bg-background/85 backdrop-blur-md border-b border-border/60"
            : "bg-paper/85 backdrop-blur-md border-b border-ink/10"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Name / wordmark */}
        <Link
          to="/"
          className={cn(
            "text-sm md:text-base font-semibold tracking-tight transition-colors",
            dark ? "text-paper" : "text-ink"
          )}
        >
          Will Sumerfield
        </Link>

        {/* Section indicator nav */}
        <nav className="flex items-center gap-5 md:gap-8">
          {links.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "relative text-sm md:text-base font-medium tracking-wide transition-colors duration-300",
                  dark
                    ? active
                      ? "text-paper"
                      : "text-paper/40 hover:text-paper/80"
                    : active
                      ? "text-ink"
                      : "text-ink/40 hover:text-ink/80"
                )}
              >
                {link.label}
                {/* Section indicator */}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px transition-all duration-300",
                    dark ? "bg-paper" : "bg-ink",
                    active ? "w-full opacity-100" : "w-0 opacity-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;

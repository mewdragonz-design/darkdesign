import { MessageCircle } from "lucide-react";
import contactBg from "@/assets/contact-bg.jpg";

const ContactSection = () => {
  const navLinks = [
    { label: "Email", href: "mailto:hello@emmarose.design" },
    { label: "Call me", href: "tel:+15551234567" },
    { label: "Instagram", href: "https://instagram.com/emmarose" },
    { label: "Twitter", href: "https://twitter.com/emmarose" },
  ];

  return (
    <section id="contact" className="bg-background py-16 md:py-24 px-2 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        {/* Media Card */}
        <div className="relative w-[95%] md:w-[90%] aspect-[16/9] md:aspect-[21/9] overflow-hidden border border-border">
          {/* Background Image */}
          <img
            src={contactBg}
            alt="Contact background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-background/20" />
          
          {/* Content Container */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 px-4 md:px-0 py-8 md:py-0">
            {/* Liquid Glass Navigation Bar */}
            <div 
              className="flex items-center gap-4 md:gap-6 px-4 md:px-6 py-2.5 rounded-full border border-foreground/10"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 w-8 h-8 rounded-full flex items-center justify-center bg-foreground/10 hover:bg-foreground/20 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 text-foreground" />
              </a>
            </div>
            
            {/* Name with Apple-style Selection */}
            <div className="flex flex-col items-center">
              {/* Selection Wrapper */}
              <div 
                className="relative px-8 md:px-[52px] py-[5px] rounded-[4px]"
                style={{
                  backgroundColor: 'rgba(5, 147, 249, 0.23)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                {/* Left Handle */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#0593F9]">
                  {/* Top Circle */}
                  <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full bg-[#0593F9]" />
                </div>
                
                {/* Right Handle */}
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-[#0593F9]">
                  {/* Bottom Circle */}
                  <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full bg-[#0593F9]" />
                </div>
                
                {/* Name Text */}
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-foreground whitespace-nowrap">
                  Emma Rose
                </h2>
              </div>
              
              {/* Subtitle */}
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                The Designer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

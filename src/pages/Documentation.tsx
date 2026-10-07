import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Do I need to code anything?",
    answer: "No, everything is already set up. You can manage your content through the admin panel or by asking the AI to make changes for you."
  },
  {
    question: "How do I add new projects?",
    answer: "You can add projects through the built-in CMS at /admin, or simply ask the AI to add them for you by providing the images and details."
  },
  {
    question: "Can I remove sections I don't need?",
    answer: "Yes, all sections are modular and can be removed or rearranged. Just ask the AI to remove or hide any section you don't want."
  },
  {
    question: "Is this template mobile-friendly?",
    answer: "Yes, it's fully responsive. Desktop and mobile layouts have been optimized separately for the best experience on all devices."
  },
  {
    question: "Can I change the animations?",
    answer: "Yes, animations can be edited, adjusted, or disabled entirely. Just describe what you'd like to change."
  },
  {
    question: "Can I use this for commercial projects?",
    answer: "Yes, this template is licensed for commercial use. You can use it for client projects, personal portfolios, or any business purpose."
  },
  {
    question: "What if I break something?",
    answer: "You can always revert changes using the version history, or contact support for assistance at info@madebyoversight.com."
  },
  {
    question: "Can you customize this template for me?",
    answer: "Yes — contact info@madebyoversight.com for custom features, layout changes, or any modifications you need."
  }
];

const FAQAccordion = ({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) => (
  <div className="border-b border-border">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-5 text-left hover:text-primary transition-colors"
    >
      <span className="text-lg md:text-xl font-light text-foreground">{item.question}</span>
      <ChevronDown 
        className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
      />
    </button>
    <div 
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-40 pb-5" : "max-h-0"
      }`}
    >
      <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
    </div>
  </div>
);

const Documentation = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </button>

          {/* Hero / Page Intro */}
          <section className="mb-20">
            <span className="text-sm text-muted-foreground tracking-widest mb-4 block">
              [ Documentation ]
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
              How to Use This Template
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              This page explains how to customize, manage, and publish your portfolio using this template.
            </p>
          </section>

          {/* Getting Started */}
          <section className="mb-16 border-t border-border pt-12">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
              Getting Started
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                This template is fully customizable and everything is already connected and ready to use. 
                No complex setup required — you can start editing right away.
              </p>
              <p>
                The design system, animations, and responsive layouts are pre-configured, 
                so you can focus on adding your content and making it yours.
              </p>
            </div>
          </section>

          {/* Managing Projects */}
          <section className="mb-16 border-t border-border pt-12">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
              Managing Your Projects
            </h2>
            
            {/* Option 1 */}
            <div className="mb-10">
              <h3 className="text-lg md:text-xl text-foreground mb-4">
                Option 1: Using the Built-in CMS
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  This template includes an integrated CMS (Content Management System) that allows you 
                  to manage all your projects without touching any code.
                </p>
                <p className="font-medium text-foreground">To access the admin panel:</p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>First, publish your template to a live link</li>
                  <li>Navigate to <code className="bg-card px-2 py-1 text-sm font-mono">/admin</code> on your published site</li>
                  <li>If it's your first time, go to <code className="bg-card px-2 py-1 text-sm font-mono">/admin/register</code> to create an account</li>
                </ol>
                <p className="mt-4">From the admin panel, you can:</p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Add new projects</li>
                  <li>Edit existing projects</li>
                  <li>Delete projects</li>
                  <li>Upload thumbnails and gallery images</li>
                  <li>Change titles, categories, and descriptions</li>
                  <li>Reorder your project display</li>
                </ul>
              </div>
            </div>

            {/* Option 2 */}
            <div className="bg-card border border-border p-6 md:p-8">
              <h3 className="text-lg md:text-xl text-foreground mb-4">
                Option 2: Using AI (Fastest Way)
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  For the fastest workflow, you can use the AI to manage your projects:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Drag & drop all your project images into the chat</li>
                  <li>Tell the AI: "Add these as projects with these names, categories, and descriptions"</li>
                  <li>Ask the AI to reorder, rename, or remove projects</li>
                  <li>Request batch updates to multiple projects at once</li>
                </ul>
                <p className="mt-4 text-foreground">
                  This is the fastest way to update large batches of content.
                </p>
              </div>
            </div>
          </section>

          {/* Editing Content */}
          <section className="mb-16 border-t border-border pt-12">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
              Editing Text & Layout
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                All text on the site is editable directly. Headings, descriptions, buttons, 
                labels, and tags can be changed easily by asking the AI or editing through the code.
              </p>
              <p>
                Sections can be rearranged or removed as needed. Animations and layouts are already 
                set up — no need to rebuild anything from scratch.
              </p>
            </div>
          </section>

          {/* Responsive Behavior */}
          <section className="mb-16 border-t border-border pt-12">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
              Mobile & Responsiveness
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The template is fully responsive and has been designed to look great on all devices.
              </p>
              <p>
                Desktop and mobile layouts are optimized separately. Some elements behave differently 
                on mobile for better usability — filter bars are simplified, spacing is adjusted, 
                and touch interactions are enhanced.
              </p>
            </div>
          </section>

          {/* Publishing */}
          <section className="mb-16 border-t border-border pt-12">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
              Publishing
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Once you're finished customizing, you can publish your site to make it live. 
                Use the publish button in the Lovable interface to deploy your portfolio.
              </p>
              <p className="text-foreground font-medium">
                Important: The admin panel only works on a published link. Always test /admin after publishing.
              </p>
            </div>
          </section>

          {/* Support */}
          <section className="mb-16 border-t border-border pt-12">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
              Need Help?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                If you need help, customization, or have questions, feel free to reach out:
              </p>
              <a 
                href="mailto:info@madebyoversight.com"
                className="inline-block text-foreground hover:text-primary transition-colors text-lg"
              >
                info@madebyoversight.com
              </a>
              <p className="mt-4">We're happy to help with:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Custom features and integrations</li>
                <li>Layout changes and design tweaks</li>
                <li>CMS and admin panel assistance</li>
                <li>Performance optimization</li>
              </ul>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="border-t border-border pt-12">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            <div>
              {faqItems.map((item, index) => (
                <FAQAccordion
                  key={index}
                  item={item}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;

import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";

const About = () => {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader variant="light" />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-ink-muted mb-6">
            [ About ]
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-12">
            Will Sumerfield
          </h1>

          <div className="prose prose-neutral max-w-none prose-a:text-ink prose-a:underline prose-a:underline-offset-4">
            <p className="text-lg md:text-xl text-ink-muted leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. I'm a
              researcher writing about my work, my ideas, and the experiments in
              between.
            </p>
            <p>
              This site collects my research and thoughts in the form of blog
              posts — structured, visual, and with working demos where possible.
              Replace this text with your real bio.
            </p>
          </div>

          <div className="mt-16 flex flex-wrap gap-4">
            <Link
              to="/cv"
              className="px-8 py-3 text-sm font-medium bg-ink text-paper hover:bg-ink/80 transition-colors"
            >
              View CV
            </Link>
            <Link
              to="/"
              className="px-8 py-3 text-sm font-medium border border-ink/20 text-ink hover:border-ink/50 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;

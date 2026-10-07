import SiteHeader from "@/components/SiteHeader";

const Contact = () => {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader variant="light" />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-ink-muted mb-6">
            [ Contact ]
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-12">
            Get in touch
          </h1>

          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-ink-muted font-mono mb-2">
                Email
              </p>
              <a
                href="mailto:will@example.com"
                className="text-lg md:text-xl underline underline-offset-4 hover:text-ink-muted transition-colors"
              >
                will@example.com
              </a>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-ink-muted font-mono mb-2">
                Elsewhere
              </p>
              <ul className="space-y-2 text-lg">
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-ink-muted transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-ink-muted transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <p className="text-sm text-ink-muted pt-8 border-t border-ink/10">
              These are placeholders — swap in your real email and profiles.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;

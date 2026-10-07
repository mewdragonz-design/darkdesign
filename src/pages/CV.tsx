import SiteHeader from "@/components/SiteHeader";

const cvSections = [
  {
    title: "Education",
    items: [
      {
        heading: "Ph.D. in Lorem Ipsum",
        detail: "University of Lorem Ipsum — 2024",
      },
      {
        heading: "B.S. in Dolor Sit Amet",
        detail: "Consectetur University — 2019",
      },
    ],
  },
  {
    title: "Publications",
    items: [
      {
        heading: "S. Will, “Adipiscing elit, 2026”",
        detail: "Journal of Lorem Ipsum, 2026",
      },
      {
        heading: "S. Will et al., “Sed do eiusmod”",
        detail: "Proceedings of Tempor Incidunt, 2023",
      },
    ],
  },
  {
    title: "Experience",
    items: [
      {
        heading: "Research Assistant",
        detail: "Lorem Lab — 2021–2024",
      },
    ],
  },
];

const CV = () => {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader variant="light" />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-ink-muted mb-6">
            [ CV ]
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-12">
            Curriculum Vitae
          </h1>

          <div className="space-y-14">
            {cvSections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xs tracking-widest uppercase text-ink-muted font-mono mb-6 pb-2 border-b border-ink/10">
                  {section.title}
                </h2>
                <ul className="space-y-5">
                  {section.items.map((item) => (
                    <li key={item.heading}>
                      <p className="font-medium">{item.heading}</p>
                      <p className="text-ink-muted text-sm mt-1">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="text-sm text-ink-muted mt-16 pt-8 border-t border-ink/10">
            Placeholder entries — send me your real education, publications, and
            experience and I'll fill them in.
          </p>
        </div>
      </main>
    </div>
  );
};

export default CV;

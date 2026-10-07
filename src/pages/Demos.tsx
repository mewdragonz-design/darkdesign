import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import { usePosts } from "@/hooks/usePosts";
import { demoRegistry } from "@/demos/registry";

const Demos = () => {
  const { data: posts } = usePosts();

  // Posts linked to a coded demo (demo_path = "/demos/<slug>")
  const demoPosts = (posts || [])
    .map((p) => {
      const slug = p.demo_path?.split("/").pop() || null;
      return slug && demoRegistry[slug] ? { post: p, slug } : null;
    })
    .filter(Boolean) as { post: NonNullable<typeof posts>[number]; slug: string }[];

  const unlinkedDemos = Object.entries(demoRegistry).filter(
    ([slug]) => !demoPosts.some((d) => d.slug === slug)
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="dark" />

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-foreground/50 mb-6">
            [ Demos ]
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground max-w-3xl mb-16">
            Interactive experiments — each one built to be played with, not just
            read about.
          </h1>

          <div className="grid gap-6 md:grid-cols-2">
            {demoPosts.map(({ post, slug }) => (
              <Link
                key={post.id}
                to={`/demos/${slug}`}
                className="group border border-border p-8 hover:border-foreground/40 transition-colors"
              >
                <p className="text-xs tracking-widest uppercase text-foreground/40 font-mono mb-4">
                  Demo
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  {demoRegistry[slug].title}
                </h2>
                <p className="mt-3 text-muted-foreground line-clamp-2">
                  {demoRegistry[slug].description}
                </p>
                <span className="mt-6 inline-block text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  Open demo →
                </span>
              </Link>
            ))}

            {unlinkedDemos.map(([slug, entry]) => (
              <Link
                key={slug}
                to={`/demos/${slug}`}
                className="group border border-border p-8 hover:border-foreground/40 transition-colors"
              >
                <p className="text-xs tracking-widest uppercase text-foreground/40 font-mono mb-4">
                  Demo
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  {entry.title}
                </h2>
                <p className="mt-3 text-muted-foreground line-clamp-2">
                  {entry.description}
                </p>
                <span className="mt-6 inline-block text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  Open demo →
                </span>
              </Link>
            ))}
          </div>

          {demoPosts.length === 0 && unlinkedDemos.length === 0 && (
            <p className="text-muted-foreground py-20 text-center">
              No demos yet.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Demos;

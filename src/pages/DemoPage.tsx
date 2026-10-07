import { Link, useParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import { demoRegistry } from "@/demos/registry";

const DemoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? demoRegistry[slug] : undefined;
  const Demo = entry?.component;

  return (
    <div className="h-screen flex flex-col bg-background">
      <SiteHeader variant="dark" />

      {/* Caption bar — framed stage */}
      <div className="pt-16 shrink-0 border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
              {entry?.title ?? "Demo"}
            </h1>
            {entry && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {entry.description}
              </p>
            )}
          </div>
          <Link
            to="/demos"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            ← All demos
          </Link>
        </div>
      </div>

      {/* Stage — demo fills the rest */}
      <div className="flex-1 min-h-0">
        {Demo ? (
          <Demo />
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-xl text-foreground/60">Demo not found</p>
            <p className="text-sm text-muted-foreground">
              This demo hasn't been built yet — check back soon.
            </p>
            <Link
              to="/demos"
              className="text-sm text-foreground/80 hover:text-foreground underline underline-offset-4"
            >
              Browse existing demos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoPage;

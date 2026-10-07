import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import { usePosts, type Post } from "@/hooks/usePosts";
import { resolveImageUrl } from "@/lib/assetResolver";
import { ArrowDown } from "lucide-react";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Index = () => {
  const { data: posts, isLoading } = usePosts();

  return (
    <SiteHeader variant="dark">
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-background">
        {/* Hero — black, high contrast */}
        <section className="relative h-screen snap-start flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <div className="max-w-5xl">
            <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-foreground/50 mb-6">
              Research & Writing
            </p>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-foreground font-semibold">
              Will
              <br />
              Sumerfield
            </h1>
            <p className="mt-8 text-lg md:text-2xl text-foreground/70 max-w-2xl leading-relaxed">
              Lorem ipsum dolor sit amet — research, ideas, and interactive
              experiments, written down.
            </p>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground/40">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>
        </section>

        {/* Full-screen post teasers */}
        {isLoading && (
          <section className="h-screen snap-start flex items-center justify-center">
            <p className="text-muted-foreground">Loading posts…</p>
          </section>
        )}

        {posts?.map((post) => (
          <Teaser key={post.id} post={post} />
        ))}

        {!isLoading && posts?.length === 0 && (
          <section className="h-screen snap-start flex flex-col items-center justify-center px-8">
            <p className="text-xl text-foreground/50">No posts yet.</p>
            <Link
              to="/admin"
              className="mt-4 text-sm text-foreground/70 hover:text-foreground underline underline-offset-4"
            >
              Write the first one
            </Link>
          </section>
        )}
      </div>
    </SiteHeader>
  );
};

const Teaser = ({ post }: { post: Post }) => {
  const image = resolveImageUrl(post.hero_image);

  return (
    <section className="relative h-screen snap-start flex items-center overflow-hidden bg-background">
      {/* Optional hero image, kept uncrowded on the right */}
      {image && (
        <div className="absolute inset-0 md:left-1/2">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-30 md:opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent md:from-background md:via-background/40 md:to-background/20" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto w-full px-8 md:px-16 lg:px-24">
        <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-foreground/50 mb-6">
          {formatDate(post.created_at)}
        </p>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-foreground max-w-4xl">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-6 text-base md:text-xl text-foreground/70 max-w-2xl leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <div className="mt-10 flex items-center gap-4">
          <Link
            to={`/blog/${post.slug || post.id}`}
            className="inline-flex items-center gap-3 px-8 py-3 text-sm font-medium bg-paper text-ink hover:bg-foreground/90 hover:text-paper transition-colors"
          >
            Read
          </Link>
          {post.demo_path && (
            <Link
              to={post.demo_path}
              className="inline-flex items-center gap-3 px-8 py-3 text-sm font-medium border border-border text-foreground/80 hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              Demo
            </Link>
          )}
        </div>
      </div>

      {/* Post counter */}
      <div className="absolute bottom-8 right-8 md:right-16 text-xs tracking-widest text-foreground/30 font-mono">
        {post.is_highlight ? "★" : ""}
      </div>
    </section>
  );
};

export default Index;

import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import { usePosts, type Post } from "@/hooks/usePosts";
import { resolveImageUrl } from "@/lib/assetResolver";

const Highlights = () => {
  const { data: posts, isLoading } = usePosts();
  const highlights = (posts || []).filter((p) => p.is_highlight);
  const [first, ...rest] = highlights;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="dark" />

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-foreground/50 mb-6">
            [ Highlights ]
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground max-w-3xl mb-16">
            The posts worth your time, picked by hand.
          </h1>

          {isLoading ? (
            <p className="text-muted-foreground py-20 text-center">
              Loading…
            </p>
          ) : highlights.length === 0 ? (
            <p className="text-muted-foreground py-20 text-center">
              No highlights yet.
            </p>
          ) : (
            <div className="grid gap-6">
              {/* One big highlight */}
              <BigHighlight post={first} />
              {/* 2–3 smaller ones */}
              {rest.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <SmallHighlight key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const BigHighlight = ({ post }: { post: Post }) => {
  const image = resolveImageUrl(post.hero_image);

  const text = (
    <>
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
        {post.title}
      </h2>
      {post.excerpt && (
        <p className="mt-4 max-w-2xl text-foreground/70 md:text-lg line-clamp-2">
          {post.excerpt}
        </p>
      )}
      <span className="mt-6 inline-block text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
        Read →
      </span>
    </>
  );

  if (!image) {
    return (
      <Link
        to={`/blog/${post.slug || post.id}`}
        className="group block border border-border bg-card p-8 md:p-12"
      >
        {text}
      </Link>
    );
  }

  return (
    <Link
      to={`/blog/${post.slug || post.id}`}
      className="group relative block overflow-hidden border border-border"
    >
      <div className="aspect-[21/9] overflow-hidden">
        <img
          src={image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">{text}</div>
    </Link>
  );
};

const SmallHighlight = ({ post }: { post: Post }) => {
  const image = resolveImageUrl(post.hero_image);
  return (
    <Link
      to={`/blog/${post.slug || post.id}`}
      className="group block border border-border overflow-hidden bg-card"
    >
      {image && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-sm text-foreground/60 line-clamp-2">
            {post.excerpt}
          </p>
        )}
        <span className="mt-4 inline-block text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
          Read →
        </span>
      </div>
    </Link>
  );
};

export default Highlights;

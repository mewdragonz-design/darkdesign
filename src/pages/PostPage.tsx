import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SiteHeader from "@/components/SiteHeader";
import { usePosts } from "@/hooks/usePosts";
import { resolveImageUrl } from "@/lib/assetResolver";

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: posts, isLoading } = usePosts();
  const post = posts?.find((p) => p.slug === slug || p.id === slug);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-paper">
        <SiteHeader variant="light" />
        <div className="pt-32 text-center text-ink-muted">Loading…</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-paper">
        <SiteHeader variant="light" />
        <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto text-center">
          <p className="text-2xl text-ink">Post not found</p>
          <Link
            to="/"
            className="mt-4 inline-block text-ink-muted hover:text-ink underline underline-offset-4"
          >
            Back home
          </Link>
        </div>
      </div>
    );
  }

  const hero = resolveImageUrl(post.hero_image);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader variant="light" />

      <article className="pt-32 pb-24 px-6">
        {/* Header */}
        <header className="max-w-3xl mx-auto mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-ink-muted mb-6">
            {formatDate(post.created_at)}
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-6 text-lg md:text-xl text-ink-muted leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Main demo / picture */}
        {hero && (
          <figure className="max-w-5xl mx-auto mb-14">
            <img
              src={hero}
              alt={post.title}
              className="w-full border border-ink/10"
            />
          </figure>
        )}

        {post.demo_path && (
          <div className="max-w-3xl mx-auto mb-14">
            <Link
              to={post.demo_path}
              className="inline-flex items-center gap-3 px-8 py-3 text-sm font-medium bg-ink text-paper hover:bg-ink/80 transition-colors"
            >
              Open interactive demo
            </Link>
          </div>
        )}

        {/* Body — structured article */}
        <div
          className="prose prose-neutral max-w-3xl mx-auto prose-headings:tracking-tight
            prose-a:text-ink prose-a:underline prose-a:underline-offset-4
            prose-img:border prose-img:border-ink/10
            prose-blockquote:border-ink/40"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content || ""}
          </ReactMarkdown>
        </div>

        {/* Footer nav */}
        <div className="max-w-3xl mx-auto mt-20 pt-8 border-t border-ink/10 flex justify-between text-sm">
          <Link
            to="/"
            className="text-ink-muted hover:text-ink transition-colors"
          >
            ← All posts
          </Link>
          {post.demo_path && (
            <Link
              to={post.demo_path}
              className="text-ink-muted hover:text-ink transition-colors"
            >
              Interactive demo →
            </Link>
          )}
        </div>
      </article>
    </div>
  );
};

export default PostPage;

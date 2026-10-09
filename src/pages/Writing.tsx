import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { usePosts } from "@/hooks/usePosts";
import { postLink } from "@/components/HomeExhibit";

const Writing = () => {
  const { data: posts, isLoading, isError } = usePosts();
  return <div className="min-h-screen bg-paper text-ink">
    <SiteHeader variant="light" />
    <main className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24">
      <h1 className="text-5xl md:text-6xl font-medium mb-16">Topics</h1>
      {isLoading && <p className="text-ink-muted">Loading…</p>}
      {isError && <p className="text-ink-muted">Topics are unavailable right now. Please try again.</p>}
      {posts?.length === 0 && <p className="text-ink-muted">No published posts yet.</p>}
      {posts?.map(post => <Link key={post.id} to={postLink(post)} className="group grid md:grid-cols-[140px_1fr_auto] gap-3 md:gap-8 py-8 border-t border-ink/20">
        <time className="font-mono text-xs text-ink-muted pt-1" dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}</time>
        <div><h2 className="text-xl md:text-2xl font-medium group-hover:text-ink-muted transition-colors">{post.title}</h2><p className="mt-3 text-ink-muted leading-relaxed max-w-2xl">{post.excerpt}</p></div>
        <ArrowUpRight className="h-5 w-5 hidden md:block" />
      </Link>)}
    </main>
  </div>;
};
export default Writing;
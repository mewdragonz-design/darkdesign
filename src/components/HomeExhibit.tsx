import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResearchFigure from "@/components/ResearchFigure";
import { demoRegistry } from "@/demos/registry";
import type { Post } from "@/hooks/usePosts";
import { exhibitionPresentation } from "@/lib/exhibition";

export const postLink = (post: Post) => `/blog/${post.slug || post.id}`;

const HomeExhibit = ({ post, index }: { post: Post; index: number }) => {
  const slug = post.demo_path?.split("/").pop();
  const entry = slug ? demoRegistry[slug] : undefined;
  const live = exhibitionPresentation(post, Boolean(entry)) === "demo";
  const Demo = live ? entry?.component : undefined;
  return (
    <section data-theme={live ? "dark" : "light"} className={`exhibition-screen relative flex flex-col ${live ? "bg-background text-paper" : "bg-paper text-ink"}`}>
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 pt-24 md:pt-28 flex items-center justify-between shrink-0">
        <span className="font-mono text-xs opacity-50">{String(index + 1).padStart(2, "0")} / {live ? "EXPERIMENT" : "RESEARCH NOTE"}</span>
        <span className="font-mono text-xs opacity-50">{new Date(post.created_at).getFullYear()}</span>
      </div>
      <div className="flex-1 min-h-0 w-full mx-auto max-w-7xl px-6 md:px-12 py-6 md:py-8">
        {Demo ? <Demo /> : <ResearchFigure post={post} />}
      </div>
      <div className={`shrink-0 mx-auto w-full max-w-7xl px-6 md:px-12 pb-10 md:pb-14 ${live ? "text-paper" : "text-ink"}`}>
        <div className={`border-t pt-5 grid md:grid-cols-[1fr_1fr_auto] gap-4 md:gap-10 items-start ${live ? "border-paper/20" : "border-ink/20"}`}>
          <h2 className="text-2xl md:text-3xl font-medium leading-tight">{post.title}</h2>
          <p className="text-sm md:text-base leading-relaxed opacity-70 max-w-xl">{post.home_summary || post.excerpt}</p>
          <Button asChild variant="ghost" className="px-0 justify-start bg-transparent hover:bg-transparent hover:opacity-60 text-inherit">
            <Link to={postLink(post)}>Full post <ArrowUpRight /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default HomeExhibit;
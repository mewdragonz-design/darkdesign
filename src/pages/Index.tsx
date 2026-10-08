import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import ResearchFigure from "@/components/ResearchFigure";
import HomeExhibit, { postLink } from "@/components/HomeExhibit";
import { usePosts } from "@/hooks/usePosts";
import { openingHighlights, orderedExhibits } from "@/lib/exhibition";

const Index = () => {
  const { data: posts = [], isLoading, isError } = usePosts();
  const highlights = openingHighlights(posts);
  const exhibits = orderedExhibits(posts);
  const [featured, ...smaller] = highlights;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setTheme(entry.target.getAttribute("data-theme") === "light" ? "light" : "dark");
      }
    }, { root, rootMargin: "-15% 0px -75% 0px", threshold: 0 });
    root.querySelectorAll("section[data-theme]").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [posts]);

  return <div className="bg-background">
    <SiteHeader variant={theme} scrolled={scrolled} />
    <div ref={scrollRef} onScroll={event => setScrolled(event.currentTarget.scrollTop > 40)} className="h-dvh overflow-y-auto snap-y snap-mandatory" aria-label="Research exhibition">
      <section data-theme="dark" className="exhibition-screen opening-screen relative bg-background text-paper px-6 md:px-12 lg:px-20">
        <div className="opening-grid max-w-7xl mx-auto w-full grid lg:grid-cols-[.8fr_1.2fr] gap-8 lg:gap-16 items-center">
          <div className="self-center">
            <p className="text-xs font-mono text-paper/50 mb-5">RESEARCH & WRITING</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium leading-[1.02]">Will<br className="hidden lg:block" /> Sumerfield</h1>
            <p className="mt-5 md:mt-8 text-base md:text-lg text-paper/60 max-w-sm leading-relaxed">Lorem ipsum dolor sit amet — research, ideas, and interactive experiments, written down.</p>
          </div>
          <div className="min-w-0">
            {featured && <Link to={postLink(featured)} className="group block">
              <div className="opening-main-figure text-paper/70 overflow-hidden"><ResearchFigure post={featured} /></div>
              <div className="flex items-start gap-4 justify-between border-t border-paper/20 pt-3">
                <div><h2 className="text-lg md:text-xl font-medium leading-tight group-hover:text-paper/70">{featured.title}</h2><p className="text-sm text-paper/50 mt-2 max-w-lg line-clamp-2">{featured.home_summary || featured.excerpt}</p></div>
                <ArrowUpRight className="w-5 h-5 shrink-0 mt-1" />
              </div>
            </Link>}
            <div className="grid grid-cols-2 gap-5 md:gap-8 mt-5 md:mt-7">
              {smaller.map(post => <Link key={post.id} to={postLink(post)} className="group min-w-0">
                <div className="opening-small-figure text-paper/60"><ResearchFigure post={post} /></div>
                <h2 className="border-t border-paper/20 pt-3 text-sm md:text-base font-medium leading-snug group-hover:text-paper/70">{post.title} <ArrowUpRight className="inline h-3 w-3" /></h2>
              </Link>)}
            </div>
            {isLoading && <p className="text-paper/50">Loading…</p>}
            {isError && <p className="text-paper/50">Work is unavailable right now. Please try again.</p>}
          </div>
        </div>
        {exhibits.length > 0 && <Button variant="ghost" size="icon" aria-label="Next exhibit" className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 text-paper/50 hover:bg-transparent hover:text-paper" onClick={() => scrollRef.current?.querySelectorAll("section")[1]?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}><ArrowDown /></Button>}
      </section>
      {exhibits.map((post, index) => <HomeExhibit key={post.id} post={post} index={index} />)}
    </div>
  </div>;
};
export default Index;

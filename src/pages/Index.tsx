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
  const [activeScreen, setActiveScreen] = useState(0);
  const screenTitles = ["Introduction", ...exhibits.map(post => post.title)];
  const goToScreen = (index: number) => {
    const sections = scrollRef.current?.querySelectorAll("section[data-theme]");
    sections?.[index]?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  useEffect(() => {
    if (document.querySelector('link[data-site-font]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono&display=swap";
    link.dataset.siteFont = "true";
    document.head.appendChild(link);
  }, []);

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
    <nav aria-label="Exhibition screens" className={`exhibition-scrollbar ${theme === "dark" ? "text-paper" : "text-ink"}`}>
      {screenTitles.map((title, index) => <Button key={`${index}-${title}`} variant="ghost" size="icon" aria-label={`Go to ${title}`} aria-current={activeScreen === index ? "step" : undefined} title={title} className="exhibition-scroll-step" onClick={() => goToScreen(index)} onKeyDown={event => {
        const next = event.key === "ArrowDown" ? index + 1 : event.key === "ArrowUp" ? index - 1 : event.key === "Home" ? 0 : event.key === "End" ? screenTitles.length - 1 : undefined;
        if (next === undefined) return;
        event.preventDefault();
        const target = Math.max(0, Math.min(screenTitles.length - 1, next));
        goToScreen(target);
        event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button")[target]?.focus();
      }}><span className="exhibition-scroll-mark" /></Button>)}
    </nav>
    <div ref={scrollRef} onScroll={event => {
      const root = event.currentTarget;
      setScrolled(root.scrollTop > 40);
      const sections = Array.from(root.querySelectorAll<HTMLElement>("section[data-theme]"));
      const closest = sections.reduce((best, section, index) => Math.abs(section.offsetTop - root.scrollTop) < Math.abs((sections[best]?.offsetTop ?? 0) - root.scrollTop) ? index : best, 0);
      setActiveScreen(closest);
    }} className="exhibition-scroll-container h-dvh overflow-y-auto snap-y snap-mandatory" aria-label="Research exhibition">
      <section data-theme="dark" className="exhibition-screen opening-screen relative bg-background text-paper px-6 md:px-12 lg:px-20">
        <div className="opening-grid max-w-7xl mx-auto w-full grid lg:grid-cols-[.8fr_1.2fr] gap-8 lg:gap-16 items-center">
          <div className="self-center">
            <p className="text-xs font-mono text-paper/50 mb-5">RESEARCH & WRITING</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium leading-[1.02]">Will<br className="hidden lg:block" /> Sumerfield</h1>
            <p className="mt-5 md:mt-8 text-base md:text-lg text-paper/60 max-w-sm leading-relaxed">Lorem ipsum dolor sit amet — research, ideas, and interactive experiments, written down.</p>
             <div className="mt-5 md:mt-8 text-xs text-paper/50 flex flex-wrap items-center gap-x-5 gap-y-2">
               <a href="mailto:will@example.com" className="underline underline-offset-4 hover:text-paper">Email (placeholder)</a>
               <Link to="/cv" className="underline underline-offset-4 hover:text-paper">CV <ArrowUpRight className="inline h-3 w-3" /></Link>
             </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-4 mb-4 md:mb-5">
              <h2 className="text-[11px] md:text-xs font-mono font-medium uppercase tracking-[0.24em] text-paper">Key works</h2>
              <span aria-hidden="true" className="h-px flex-1 bg-paper/20" />
            </div>
            {featured && <Link to={postLink(featured)} className="group block">
              <div className="opening-main-figure text-paper/70 overflow-hidden ring-1 ring-paper/15"><ResearchFigure post={featured} /></div>
              <div className="flex items-start gap-4 justify-between border-t border-paper/25 pt-3">
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-medium leading-tight group-hover:text-paper/70"><span className="font-mono text-sm md:text-base text-paper/40 mr-3 tabular-nums">01</span>{featured.title}</h3>
                  <p className="text-sm text-paper/50 mt-2 max-w-lg line-clamp-3 lg:line-clamp-2">{featured.home_summary || featured.excerpt}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 shrink-0 mt-1" />
              </div>
            </Link>}
            <div className="grid grid-cols-2 gap-5 md:gap-8 mt-5 md:mt-7">
              {smaller.map((post, i) => <Link key={post.id} to={postLink(post)} className="group min-w-0">
                <div className="opening-small-figure text-paper/60"><ResearchFigure post={post} /></div>
                <h3 className="border-t border-paper/20 pt-3 text-[13px] md:text-base font-medium leading-snug group-hover:text-paper/70"><span className="font-mono text-xs text-paper/40 mr-2 tabular-nums">{String(i + 2).padStart(2, "0")}</span>{post.title} <ArrowUpRight className="inline h-3 w-3" /></h3>
              </Link>)}
            </div>
            {isLoading && <p className="text-paper/50">Loading…</p>}
            {isError && <p className="text-paper/50">Work is unavailable right now. Please try again.</p>}
          </div>
        </div>
        {exhibits.length > 0 && <Button variant="ghost" size="icon" aria-label="Next exhibit" className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 text-paper/50 hover:bg-transparent hover:text-paper" onClick={() => goToScreen(1)}><ArrowDown /></Button>}
      </section>
      {exhibits.map((post, index) => <HomeExhibit key={post.id} post={post} index={index} />)}
    </div>
  </div>;
};
export default Index;

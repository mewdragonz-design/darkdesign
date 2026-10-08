import type { Post } from "@/hooks/usePosts";
import { resolveImageUrl } from "@/lib/assetResolver";

/** Sample scientific figures until the author supplies a cover figure. */
const ResearchFigure = ({ post, className = "" }: { post: Post; className?: string }) => {
  const image = resolveImageUrl(post.hero_image);
  if (image) return <img src={image} alt={post.title} className={`h-full w-full object-contain ${className}`} />;
  const waves = post.slug?.includes("interference") || post.slug?.includes("fields");
  const reading = post.slug?.includes("reading");
  return (
    <svg viewBox="0 0 800 440" role="img" aria-label={waves ? "Two wave sources and their overlapping wavefronts" : reading ? "Three passes through a research paper: overview, figures, then details" : "The same data presented as scattered points and a clear trend"} className={`h-full w-full ${className}`}>
      {waves ? <>
        {[0, 1].map(source => <g key={source} className={source === 0 ? "text-figure-a" : "text-figure-b"} fill="none" stroke="currentColor" strokeWidth="1.5">
          {Array.from({ length: 13 }, (_, i) => <circle key={i} cx={source === 0 ? 290 : 510} cy="220" r={18 + i * 19} opacity={1 - i * .055} />)}
          <circle cx={source === 0 ? 290 : 510} cy="220" r="5" fill="currentColor" />
        </g>)}
        <text x="280" y="405" fill="currentColor" fontSize="13">SOURCE A</text><text x="500" y="405" fill="currentColor" fontSize="13">SOURCE B</text>
      </> : reading ? <>
        {[0,1,2].map((n) => <g key={n} transform={`translate(${85 + n * 235},60)`}>
          <rect width="160" height="240" fill="none" stroke="currentColor" opacity=".3" />
          <rect x="22" y="24" width="116" height="8" className="fill-figure-a" opacity={n === 0 ? 1 : .25} />
          <rect x="22" y="58" width="116" height="65" className="fill-figure-b" opacity={n === 1 ? .8 : .15} />
          {[0,1,2,3,4,5].map(i => <path key={i} d={`M22 ${145+i*11} h${i%2 ? 92 : 116}`} stroke="currentColor" opacity={n === 2 ? .7 : .18} />)}
          <text x="0" y="282" fill="currentColor" fontSize="15">0{n+1} / {['OVERVIEW','FIGURES','DETAILS'][n]}</text>
        </g>)}
      </> : <>
        {[0,1].map(n => <g key={n} transform={`translate(${70 + n*390},65)`}>
          <path d="M0 0 V260 H270" fill="none" stroke="currentColor" opacity=".3" />
          {Array.from({length:25},(_,i) => <circle key={i} cx={20+i*9} cy={225-i*7+Math.sin(i*2)*30} r="4" className={n ? "fill-figure-a" : "fill-figure-b"} opacity={n ? .35 : .8} />)}
          {n === 1 && <path d="M15 230 L255 45" fill="none" className="stroke-figure-a" strokeWidth="4" />}
          <text x="0" y="300" fill="currentColor" fontSize="15">{n ? 'REVEAL THE RELATIONSHIP' : 'SHOW THE OBSERVATIONS'}</text>
        </g>)}
      </>}
    </svg>
  );
};
export default ResearchFigure;
import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { cn } from "@/lib/utils";
import { resolveImageUrl } from "@/lib/assetResolver";
import { 
  Grid2X2, 
  Columns2, 
  Sparkles, 
  Box, 
  Lightbulb, 
  LayoutGrid, 
  Brush,
  ChevronDown,
  Check
} from "lucide-react";

type LayoutMode = "4col" | "2col";
type SortMode = "newest" | "oldest" | "az" | "featured";

// Category config with icons
const categoryConfig: Record<string, { icon: React.ElementType; label: string }> = {
  All: { icon: Sparkles, label: "All" },
  Product: { icon: Box, label: "Product" },
  "3D": { icon: Box, label: "3D" },
  Concept: { icon: Lightbulb, label: "Concept" },
  UI: { icon: LayoutGrid, label: "UI" },
  Art: { icon: Brush, label: "Art" },
};

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "A–Z" },
  { value: "featured", label: "Featured" },
];

const ProjectsSection = () => {
  const { data: projects, isLoading } = useProjects();
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("4col");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Extract unique categories from all project tags
  const categories = useMemo(() => {
    if (!projects) return ["All"];
    const allTags = projects.flatMap((p) => p.tags || []);
    const uniqueTags = [...new Set(allTags)];
    return ["All", ...uniqueTags];
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    let result = projects.filter((p) => p.is_visible);

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.tags?.includes(selectedCategory));
    }

    // Sort
    switch (sortMode) {
      case "newest":
        result = [...result].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "oldest":
        result = [...result].sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        break;
      case "az":
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "featured":
        result = [...result].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
        break;
    }
    return result;
  }, [projects, selectedCategory, sortMode]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort: SortMode) => {
    setSortMode(sort);
    setIsSortOpen(false);
  };

  return (
    <section id="projects" className="min-h-screen py-24 px-6 md:px-12 lg:px-20 bg-card">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <span className="text-muted-foreground text-sm font-medium tracking-wide mb-6 block">
          [ Projects ]
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed max-w-4xl text-foreground">
          A curated collection of 3D renders, brand visuals, and creative
          experiments that push the boundaries of design.
        </h2>
      </div>

      {/* Premium Filters Bar */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {/* Grid Layout Toggle - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-1 p-1 bg-secondary/10 border border-border">
            <button
              onClick={() => setLayoutMode("4col")}
              className={cn(
                "relative p-2.5 transition-all duration-300 ease-out",
                "hover:bg-secondary/30",
                layoutMode === "4col"
                  ? "bg-secondary/40 text-foreground"
                  : "text-muted-foreground/60 hover:text-muted-foreground"
              )}
              aria-label="4 column grid"
            >
              <Grid2X2 className="w-4 h-4" />
              {layoutMode === "4col" && (
                <span className="absolute inset-0 ring-1 ring-border/50" />
              )}
            </button>
            <button
              onClick={() => setLayoutMode("2col")}
              className={cn(
                "relative p-2.5 transition-all duration-300 ease-out",
                "hover:bg-secondary/30",
                layoutMode === "2col"
                  ? "bg-secondary/40 text-foreground"
                  : "text-muted-foreground/60 hover:text-muted-foreground"
              )}
              aria-label="2 column grid"
            >
              <Columns2 className="w-4 h-4" />
              {layoutMode === "2col" && (
                <span className="absolute inset-0 ring-1 ring-border/50" />
              )}
            </button>
          </div>

          {/* Separator */}
          <div className="hidden md:block w-px h-6 bg-border/50" />

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
            {categories.map((category) => {
              const config = categoryConfig[category] || {
                icon: Sparkles,
                label: category,
              };
              const Icon = config.icon;
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={cn(
                    "group relative flex items-center gap-2 px-4 py-2 text-sm font-medium",
                    "transition-all duration-300 ease-out",
                    "border border-border",
                    isActive
                      ? "bg-secondary/30 text-foreground"
                      : "bg-secondary/10 text-muted-foreground hover:text-foreground hover:bg-secondary/20"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5 transition-all duration-300",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground/50 group-hover:text-muted-foreground/70"
                    )}
                  />
                  <span>{category === "All" ? "All" : `#${category}`}</span>
                  
                  {/* Active glow effect */}
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-transparent opacity-50 blur-sm -z-10" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Spacer - Hidden on mobile */}
          <div className="hidden md:block flex-1" />

          {/* Sort Dropdown - Hidden on mobile */}
          <div ref={sortRef} className="relative hidden md:block">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm font-medium",
                "bg-secondary/10 border border-border",
                "text-muted-foreground hover:text-foreground hover:bg-secondary/20",
                "transition-all duration-300 ease-out",
                isSortOpen && "bg-secondary/30 text-foreground"
              )}
            >
              <span>{sortOptions.find((o) => o.value === sortMode)?.label}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform duration-300",
                  isSortOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown Panel */}
            <div
              className={cn(
                "absolute right-0 top-full mt-2 min-w-[160px] z-50",
                "bg-card border border-border",
                "shadow-xl shadow-background/20",
                "transition-all duration-300 ease-out origin-top-right",
                isSortOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              )}
            >
              <div className="p-1.5">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value as SortMode)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 text-sm",
                      "transition-all duration-200",
                      sortMode === option.value
                        ? "bg-secondary/50 text-foreground"
                        : "text-muted-foreground hover:bg-secondary/30 hover:text-foreground"
                    )}
                  >
                    <span>{option.label}</span>
                    {sortMode === option.value && (
                      <Check className="w-4 h-4 text-foreground" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Masonry Grid with Animation */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="text-center text-muted-foreground py-20">
            Loading projects...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            No projects found.
          </div>
        ) : (
          <div
            className={cn(
              "columns-1 gap-4 md:gap-6 transition-all duration-500 ease-out",
              layoutMode === "4col"
                ? "sm:columns-2 lg:columns-3 xl:columns-4"
                : "sm:columns-2"
            )}
            style={{ columnFill: "balance" }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    main_image: string | null;
    tags: string[];
    slug?: string | null;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const slug = (project as any).slug || project.id;
  const firstTag = project.tags?.[0];
  const imageUrl = resolveImageUrl(project.main_image);

  return (
    <Link
      to={`/projects/${slug}`}
      className="block mb-4 md:mb-6 break-inside-avoid group animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
    >
      <div className="relative overflow-hidden">
        {/* Image with blur + zoom on hover */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
          />
        ) : (
          <div className="w-full aspect-[4/3] bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No image</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-between p-4 md:p-5 opacity-0 group-hover:opacity-100">
          {/* Top: Category Tag + Title */}
          <div className="space-y-2">
            {firstTag && (
              <span className="text-sm font-medium text-white/80">
                #{firstTag}
              </span>
            )}
            <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-tight">
              {project.title}
            </h3>
          </div>

          {/* Bottom: View Button */}
          <div>
            <span className="inline-block px-8 py-2 text-sm font-medium bg-muted/60 text-background hover:bg-muted/70 transition-colors">
              [ View ]
            </span>
          </div>
        </div>

        {/* Mobile: Always show title overlay */}
        <div className="absolute inset-0 p-4 bg-black/50 flex flex-col justify-between md:hidden">
          <div className="space-y-2">
            {firstTag && (
              <span className="text-sm font-medium text-white/80">
                #{firstTag}
              </span>
            )}
            <h3 className="text-lg font-medium text-white">{project.title}</h3>
          </div>
          <div>
            <span className="inline-block px-8 py-2 text-sm font-medium bg-muted/60 text-background">
              [ View ]
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectsSection;

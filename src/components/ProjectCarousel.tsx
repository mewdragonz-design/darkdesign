import ProjectCard from "./ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveImageUrl } from "@/lib/assetResolver";

// Fallback images for projects without main_image
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const fallbackImages = [project1, project2, project3, project4];

const ProjectCarousel = () => {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden pb-4 md:pb-6">
        <div className="flex gap-6" style={{ width: 'max-content' }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-[280px] md:w-[320px] h-[340px] md:h-[400px]" />
          ))}
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return null;
  }

  // Duplicate the projects array to create seamless loop
  const duplicatedProjects = [...projects, ...projects];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden pb-4 md:pb-6">
      <div 
        className="flex gap-6 animate-scroll-left hover:[animation-play-state:paused]"
        style={{ width: 'max-content' }}
      >
        {duplicatedProjects.map((project, index) => {
          const resolvedImage = resolveImageUrl(project.main_image);
          return (
            <ProjectCard
              key={`${project.id}-${index}`}
              image={resolvedImage || fallbackImages[index % fallbackImages.length]}
              title={project.title}
              tag={project.tags?.[0] ? `#${project.tags[0]}` : ""}
              slug={(project as any).slug}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectCarousel;

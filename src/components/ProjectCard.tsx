import { Link } from "react-router-dom";

interface ProjectCardProps {
  image: string;
  title: string;
  tag: string;
  slug?: string;
}

const ProjectCard = ({ image, title, tag, slug }: ProjectCardProps) => {
  const content = (
    <div className="relative flex-shrink-0 w-[280px] md:w-[320px] h-[340px] md:h-[400px] group cursor-pointer">
      <div className="w-full h-full overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <span className="px-4 py-2 bg-card/90 backdrop-blur-sm text-card-foreground text-sm font-medium">
          {title}
        </span>
        <span className="px-3 py-2 bg-card/90 backdrop-blur-sm text-card-foreground text-sm font-medium">
          {tag}
        </span>
      </div>
    </div>
  );

  if (slug) {
    return <Link to={`/projects/${slug}`}>{content}</Link>;
  }

  return content;
};

export default ProjectCard;

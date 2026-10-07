import { useParams, Link } from "react-router-dom";
import { useProject } from "@/hooks/useProject";
import { useAdjacentProjects } from "@/hooks/useAdjacentProjects";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectHero from "@/components/ProjectHero";
import ProjectInfo from "@/components/ProjectInfo";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectNavigation from "@/components/ProjectNavigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { data: project, isLoading, error } = useProject(slug);
  const { data: adjacentProjects } = useAdjacentProjects(slug);
  const { isAdmin } = useAdminCheck();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Project not found</h1>
        <Button asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Admin Edit Button - Fixed Position */}
      {isAdmin && (
        <div className="fixed top-4 right-20 z-50">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/admin/projects/${project.id}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>
      )}

      {/* Project Hero Section */}
      <ProjectHero
        title={project.title}
        description={project.short_description}
        role={project.role}
        tags={project.tags}
        mainImage={project.main_image}
      />

      {/* Project Info Section - Description, Year, Role */}
      <ProjectInfo
        longDescription={project.long_description}
        year={project.year}
        role={project.role}
      />

      {/* More Renders Gallery Section */}
      <ProjectGallery 
        images={project.additional_images} 
        projectTitle={project.title} 
      />

      {/* Project Navigation - Previous/Next */}
      <ProjectNavigation 
        previousProject={adjacentProjects?.previous}
        nextProject={adjacentProjects?.next}
      />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectDetail;

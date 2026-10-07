import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectNavigationProps {
  previousProject?: {
    slug: string;
    title: string;
  } | null;
  nextProject?: {
    slug: string;
    title: string;
  } | null;
}

const ProjectNavigation = ({ previousProject, nextProject }: ProjectNavigationProps) => {
  return (
    <section className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-12 md:py-16">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <div className="flex-1">
            {previousProject ? (
              <Link 
                to={`/projects/${previousProject.slug}`}
                className="group inline-flex flex-col items-start gap-1"
              >
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Previous</span>
                <span className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span className="text-sm md:text-base">{previousProject.title}</span>
                </span>
              </Link>
            ) : (
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                <Link to="/#projects">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  All Projects
                </Link>
              </Button>
            )}
          </div>

          {/* Center - Back to All */}
          <div className="hidden md:block">
            <Link 
              to="/#projects" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              [ All Projects ]
            </Link>
          </div>

          {/* Next Button */}
          <div className="flex-1 flex justify-end">
            {nextProject ? (
              <Link 
                to={`/projects/${nextProject.slug}`}
                className="group inline-flex flex-col items-end gap-1"
              >
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Next</span>
                <span className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors">
                  <span className="text-sm md:text-base">{nextProject.title}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ) : (
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                <Link to="/#projects">
                  All Projects
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectNavigation;

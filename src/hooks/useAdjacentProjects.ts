import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface AdjacentProjects {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export const useAdjacentProjects = (currentSlug: string | undefined) => {
  return useQuery({
    queryKey: ["adjacent-projects", currentSlug],
    queryFn: async (): Promise<AdjacentProjects> => {
      if (!currentSlug) return { previous: null, next: null };
      
      // Get all visible projects ordered by display_order
      const { data: projects, error } = await supabase
        .from("projects")
        .select("slug, title, display_order")
        .eq("is_visible", true)
        .order("display_order", { ascending: true });

      if (error || !projects) return { previous: null, next: null };

      const currentIndex = projects.findIndex(p => p.slug === currentSlug);
      
      if (currentIndex === -1) return { previous: null, next: null };

      const previous = currentIndex > 0 
        ? { slug: projects[currentIndex - 1].slug!, title: projects[currentIndex - 1].title }
        : null;
      
      const next = currentIndex < projects.length - 1 
        ? { slug: projects[currentIndex + 1].slug!, title: projects[currentIndex + 1].title }
        : null;

      return { previous, next };
    },
    enabled: !!currentSlug,
  });
};
